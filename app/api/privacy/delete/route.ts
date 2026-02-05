import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const rateLimitResult = await rateLimit(request, {
      id: 'privacy-delete',
      limit: 2,
      windowSeconds: 60,
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    const body = await request.json()
    const confirm = typeof body?.confirm === 'string' ? body.confirm : ''

    if (confirm !== 'DELETE') {
      return NextResponse.json(
        { success: false, error: 'Confirmation phrase is required' },
        { status: 400 }
      )
    }

    const now = new Date()
    const scheduledFor = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        deletionRequestedAt: now,
        deletionScheduledFor: scheduledFor,
        deletionStatus: 'REQUESTED',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Deletion requested. Your account will be deleted after the grace period.',
      data: {
        deletionRequestedAt: now,
        deletionScheduledFor: scheduledFor,
      }
    })
  } catch (error) {
    console.error('Privacy delete error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}
