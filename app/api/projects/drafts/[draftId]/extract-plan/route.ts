import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { z } from 'zod'
import { callGeminiStructured } from '@/lib/projects/ai/geminiStructured'
import {
  buildPlanExtractionPrompt,
  trimPlanForExtraction,
  ABSOLUTE_MAX_PLAN_CHARS,
} from '@/lib/projects/ai/sageExtractionPrompt'
import {
  extractedFieldsSchema,
  GEMINI_RESPONSE_SCHEMA,
  type ExtractedFields,
} from '@/lib/projects/ai/extractedFieldsSchema'

const requestSchema = z.object({
  planText: z.string()
    .min(40, 'The plan needs to be at least a few sentences long.')
    .max(ABSOLUTE_MAX_PLAN_CHARS, 'That plan is enormous — trim it down or paste the most important sections.'),
  filename: z.string().max(255).optional(),
})

const MAX_DRAFT_ATTEMPTS = 3

// POST /api/projects/drafts/:draftId/extract-plan
// Body: { planText: string, filename?: string }
// → runs Sage extraction, merges fields into the draft, returns the
//   updated extractedFields and the draft.
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ draftId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Per-user hourly cap on extraction (covers both paste and file paths
  // since they share this endpoint).
  const limit = await rateLimit(req, { id: 'plan-extract', limit: 5, windowSeconds: 3600 })
  if (!limit.success) return rateLimitResponse(limit.reset)

  const { draftId } = await context.params
  const draft = await prisma.initiativeDraft.findFirst({
    where: { id: draftId, userId: session.user.id },
  })
  if (!draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
  }
  if (draft.draftAttempts >= MAX_DRAFT_ATTEMPTS) {
    return NextResponse.json(
      { error: `Sage has already drafted this initiative ${MAX_DRAFT_ATTEMPTS} times. Edit fields manually or start a new draft.` },
      { status: 429 }
    )
  }

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Validation failed' }, { status: 400 })
  }

  const { text: trimmed, truncated } = trimPlanForExtraction(parsed.data.planText)

  let raw: unknown
  try {
    raw = await callGeminiStructured({
      systemPrompt: buildPlanExtractionPrompt(trimmed),
      userMessage: 'Extract the initiative fields from the plan above and return them as JSON matching the schema.',
      responseSchema: GEMINI_RESPONSE_SCHEMA,
      maxOutputTokens: 2048,
      temperature: 0.4,
    })
  } catch (err) {
    console.error('Plan extraction failed:', err)
    const message = err instanceof Error ? err.message : 'unknown error'
    // Pass the underlying message through if it's a safety / recitation
    // block so the user can see what actually happened (and edit the
    // input). Otherwise return the generic "couldn't process" copy.
    const looksLikeKnownIssue =
      message.startsWith("Sage's safety filter") ||
      message.startsWith('Sage stopped') ||
      message.startsWith('Sage is over') ||
      message.startsWith("Sage isn't connected") ||
      message.startsWith('Gemini is having trouble')
    const status =
      message.startsWith('Sage is over') ? 429 :
      message.startsWith("Sage isn't connected") ? 503 :
      502
    return NextResponse.json(
      {
        error: looksLikeKnownIssue
          ? message
          : 'Sage couldn\'t process that plan. Try a shorter excerpt or a different format.',
        detail: message.slice(0, 240),
      },
      { status }
    )
  }

  // Validate (and silently drop unknown fields) using zod.
  const validated = extractedFieldsSchema.safeParse(raw)
  if (!validated.success) {
    console.error('Extracted fields failed schema validation:', validated.error.issues)
    return NextResponse.json(
      { error: 'Sage returned an unexpected response. Try again in a moment.' },
      { status: 502 }
    )
  }

  // Merge with whatever was already in the draft (mostly empty for the
  // paste path, but matters for the future hybrid path).
  const currentFields = (draft.extractedFields as Record<string, unknown> | null) ?? {}
  const mergedFields: ExtractedFields = { ...(currentFields as ExtractedFields), ...validated.data }

  const updated = await prisma.initiativeDraft.update({
    where: { id: draftId },
    data: {
      path: draft.path === 'BRAINSTORM' ? 'HYBRID' : 'PASTE',
      originalPlanText: trimmed,
      originalPlanFilename: parsed.data.filename ?? draft.originalPlanFilename,
      extractedFields: mergedFields,
      draftAttempts: { increment: 1 },
      title: validated.data.name?.slice(0, 150) || draft.title,
    },
  })

  return NextResponse.json({
    draft: updated,
    extractedFields: mergedFields,
    truncated,
    attemptsRemaining: Math.max(0, MAX_DRAFT_ATTEMPTS - updated.draftAttempts),
  })
}
