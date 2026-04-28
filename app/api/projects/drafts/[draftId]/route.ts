import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'
import { extractedFieldsSchema } from '@/lib/projects/ai/extractedFieldsSchema'

const patchSchema = z.object({
  title: z.string().min(1).max(150).optional(),
  extractedFields: extractedFieldsSchema.partial().optional(),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    ts: z.number().optional(),
  })).optional(),
  status: z.enum(['ACTIVE', 'DISCARDED']).optional(),
})

async function loadOwnedDraft(userId: string, draftId: string) {
  return prisma.initiativeDraft.findFirst({
    where: { id: draftId, userId },
  })
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ draftId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { draftId } = await context.params
  const draft = await loadOwnedDraft(session.user.id, draftId)
  if (!draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
  }
  return NextResponse.json({ draft })
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ draftId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { draftId } = await context.params
  const draft = await loadOwnedDraft(session.user.id, draftId)
  if (!draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
  }

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 })
  }

  const { title, extractedFields, chatHistory, status } = parsed.data
  const data: Record<string, unknown> = {}
  if (title !== undefined) data.title = title
  if (extractedFields !== undefined) {
    // Merge over existing fields rather than replace.
    const current = (draft.extractedFields as Record<string, unknown> | null) ?? {}
    data.extractedFields = { ...current, ...extractedFields }
  }
  if (chatHistory !== undefined) {
    data.chatHistory = chatHistory
    data.chatMessageCount = chatHistory.length
  }
  if (status !== undefined) data.status = status

  const updated = await prisma.initiativeDraft.update({
    where: { id: draftId },
    data,
  })
  return NextResponse.json({ draft: updated })
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ draftId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { draftId } = await context.params
  const draft = await loadOwnedDraft(session.user.id, draftId)
  if (!draft) {
    return NextResponse.json({ error: 'Draft not found' }, { status: 404 })
  }
  await prisma.initiativeDraft.update({
    where: { id: draftId },
    data: { status: 'DISCARDED' },
  })
  return NextResponse.json({ ok: true })
}
