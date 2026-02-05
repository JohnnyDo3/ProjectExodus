import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const rateLimitResult = await rateLimit(request, {
      id: 'privacy-status',
      limit: 10,
      windowSeconds: 60,
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        deletionRequestedAt: true,
        deletionScheduledFor: true,
        deletionStatus: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Privacy status error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch status' },
      { status: 500 }
    )
  }
}
