import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'

const MAX_ACTIVE_DRAFTS_PER_USER = 5

// GET /api/projects/drafts — list this user's active drafts (most-recent first)
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const drafts = await prisma.initiativeDraft.findMany({
    where: { userId: session.user.id, status: 'ACTIVE' },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      path: true,
      originalPlanFilename: true,
      chatMessageCount: true,
      draftAttempts: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return NextResponse.json({ drafts })
}

// POST /api/projects/drafts — create a new blank draft (path defaults BLANK
// and is updated as the user picks a path on Step 0)
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const limit = await rateLimit(req, { id: 'draft-create', limit: 10, windowSeconds: 3600 })
  if (!limit.success) return rateLimitResponse(limit.reset)

  const activeCount = await prisma.initiativeDraft.count({
    where: { userId: session.user.id, status: 'ACTIVE' },
  })
  if (activeCount >= MAX_ACTIVE_DRAFTS_PER_USER) {
    return NextResponse.json(
      { error: `You already have ${MAX_ACTIVE_DRAFTS_PER_USER} active drafts. Discard or promote one before starting a new one.` },
      { status: 409 }
    )
  }

  const draft = await prisma.initiativeDraft.create({
    data: {
      userId: session.user.id,
      title: 'Untitled draft',
    },
    select: { id: true, title: true, path: true, createdAt: true, updatedAt: true },
  })

  return NextResponse.json({ draft }, { status: 201 })
}
