import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { z } from 'zod'
import { callGeminiStructured } from '@/lib/projects/ai/geminiStructured'
import {
  getBrainstormSystemPrompt,
  BRAINSTORM_RESPONSE_SCHEMA,
  type BrainstormResponse,
} from '@/lib/projects/ai/sageBrainstormPrompt'
import {
  extractedFieldsSchema,
  type ExtractedFields,
} from '@/lib/projects/ai/extractedFieldsSchema'

const MAX_CHAT_MESSAGES = 100
const MAX_USER_MESSAGE_CHARS = 4000

const requestSchema = z.object({
  // The new user message that just came in.
  userMessage: z.string().min(1).max(MAX_USER_MESSAGE_CHARS),
})

interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
  ts?: number
}

// POST /api/projects/drafts/:draftId/brainstorm
// Append a new user message, call Sage, persist the new turns + updated
// extractedFields, return Sage's reply and the latest extractedFields.
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ draftId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 30 messages/min/user — generous but blocks runaway loops.
  const limit = await rateLimit(req, { id: 'sage-brainstorm', limit: 30, windowSeconds: 60 })
  if (!limit.success) return rateLimitResponse(limit.reset)

  const { draftId } = await context.params
  const draft = await prisma.initiativeDraft.findFirst({
    where: { id: draftId, userId: session.user.id },
  })
  if (!draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
  }

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Validation failed' }, { status: 400 })
  }

  const existingHistory = (draft.chatHistory as ChatTurn[] | null) ?? []
  if (existingHistory.length >= MAX_CHAT_MESSAGES) {
    return NextResponse.json(
      { error: 'This brainstorm has reached its message limit. Click "Draft my initiative" to continue.' },
      { status: 429 }
    )
  }

  const newUserTurn: ChatTurn = {
    role: 'user',
    content: parsed.data.userMessage,
    ts: Date.now(),
  }
  const historyForPrompt: ChatTurn[] = [...existingHistory, newUserTurn]

  // Build a transcript Sage can read. Keeping it human-readable so the
  // structured-output prompt can attend to context easily.
  const transcript = historyForPrompt
    .map(t => `${t.role === 'user' ? 'USER' : 'SAGE'}: ${t.content}`)
    .join('\n\n')

  let raw: BrainstormResponse
  try {
    raw = await callGeminiStructured<BrainstormResponse>({
      systemPrompt: getBrainstormSystemPrompt(),
      userMessage: `Conversation so far:\n\n${transcript}\n\nProduce your next reply and the current extractedFields snapshot.`,
      responseSchema: BRAINSTORM_RESPONSE_SCHEMA,
      maxOutputTokens: 2048,
      temperature: 0.7,
    })
  } catch (err) {
    console.error('Brainstorm call failed:', err)
    return NextResponse.json(
      { error: 'Sage hit a snag. Try again in a moment.' },
      { status: 502 }
    )
  }

  if (typeof raw.reply !== 'string' || !raw.reply.trim()) {
    return NextResponse.json({ error: 'Sage returned an empty reply.' }, { status: 502 })
  }

  // Validate extractedFields; on failure, keep the old snapshot.
  const validatedFields = extractedFieldsSchema.safeParse(raw.extractedFields)
  const nextFields: ExtractedFields = validatedFields.success
    ? validatedFields.data
    : ((draft.extractedFields as ExtractedFields | null) ?? {})

  const newAssistantTurn: ChatTurn = {
    role: 'assistant',
    content: raw.reply.trim(),
    ts: Date.now(),
  }
  const newHistory = [...historyForPrompt, newAssistantTurn]

  const updated = await prisma.initiativeDraft.update({
    where: { id: draftId },
    data: {
      path: draft.path === 'PASTE' ? 'HYBRID' : (draft.path === 'BLANK' ? 'BRAINSTORM' : draft.path),
      chatHistory: newHistory,
      chatMessageCount: newHistory.length,
      extractedFields: nextFields,
      title: nextFields.name?.slice(0, 150) || draft.title,
    },
  })

  return NextResponse.json({
    reply: newAssistantTurn.content,
    extractedFields: nextFields,
    chatMessageCount: updated.chatMessageCount,
  })
}
