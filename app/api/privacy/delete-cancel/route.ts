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
      id: 'privacy-delete-cancel',
      limit: 5,
      windowSeconds: 60,
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        deletionRequestedAt: null,
        deletionScheduledFor: null,
        deletionStatus: 'CANCELED',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Deletion request canceled.',
    })
  } catch (error) {
    console.error('Privacy delete cancel error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to cancel deletion' },
      { status: 500 }
    )
  }
}
