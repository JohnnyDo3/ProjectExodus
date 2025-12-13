import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { handlePrismaError } from '@/lib/utils/prisma-errors'
import {
  checkRateLimit,
  RATE_LIMITS,
  isValidUUID,
  detectBot,
} from '@/lib/security'

// POST /api/users/[id]/follow - Follow a user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Bot detection
    const botCheck = detectBot(request)
    if (botCheck.isBot && !botCheck.isLegitimateBot && botCheck.confidence === 'high') {
      return NextResponse.json(
        { success: false, error: 'Request blocked' },
        { status: 403 }
      )
    }

    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rate limiting - 30 follows per minute
    const rateLimitResult = checkRateLimit(session.user.id, 'follow', RATE_LIMITS.follow)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many follow requests. Please try again in ${rateLimitResult.retryAfter} seconds.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    const targetUserId = id
    const currentUserId = session.user.id

    // Validate UUID format
    if (!isValidUUID(targetUserId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID format' },
        { status: 400 }
      )
    }

    // Can't follow yourself
    if (targetUserId === currentUserId) {
      return NextResponse.json(
        { success: false, error: 'Cannot follow yourself' },
        { status: 400 }
      )
    }

    // Check if already following
    const existingFollow = await prisma.userFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    })

    if (existingFollow) {
      return NextResponse.json(
        { success: false, error: 'Already following this user' },
        { status: 400 }
      )
    }

    // Create follow relationship
    const follower = await prisma.userFollow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    })

    return NextResponse.json({
      success: true,
      data: follower,
      message: 'Successfully followed user',
    })
  } catch (error) {
    return handlePrismaError(error, 'follow user')
  }
}

// DELETE /api/users/[id]/follow - Unfollow a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rate limiting - 30 unfollows per minute
    const rateLimitResult = checkRateLimit(session.user.id, 'follow', RATE_LIMITS.follow)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please try again in ${rateLimitResult.retryAfter} seconds.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
          },
        }
      )
    }

    const targetUserId = id
    const currentUserId = session.user.id

    // Validate UUID format
    if (!isValidUUID(targetUserId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID format' },
        { status: 400 }
      )
    }

    // Delete follow relationship
    await prisma.userFollow.delete({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unfollowed user',
    })
  } catch (error) {
    return handlePrismaError(error, 'unfollow user')
  }
}

// GET /api/users/[id]/follow - Get follow status and counts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params
    const targetUserId = id
    const currentUserId = session?.user?.id

    // Get follower and following counts
    const [followersCount, followingCount] = await Promise.all([
      prisma.userFollow.count({
        where: { followingId: targetUserId },
      }),
      prisma.userFollow.count({
        where: { followerId: targetUserId },
      }),
    ])

    let isFollowing = false
    let isFollower = false

    if (currentUserId) {
      const [following, follower] = await Promise.all([
        prisma.userFollow.findUnique({
          where: {
            followerId_followingId: {
              followerId: currentUserId,
              followingId: targetUserId,
            },
          },
        }),
        prisma.userFollow.findUnique({
          where: {
            followerId_followingId: {
              followerId: targetUserId,
              followingId: currentUserId,
            },
          },
        }),
      ])

      isFollowing = !!following
      isFollower = !!follower
    }

    return NextResponse.json({
      success: true,
      data: {
        followersCount,
        followingCount,
        isFollowing,
        isFollower,
        mutualFollow: isFollowing && isFollower,
      },
    })
  } catch (error) {
    return handlePrismaError(error, 'get follow status')
  }
}
