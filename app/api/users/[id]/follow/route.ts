import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// POST /api/users/[id]/follow - Follow a user
export async function POST(
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

    const targetUserId = id
    const currentUserId = session.user.id

    // Can't follow yourself
    if (targetUserId === currentUserId) {
      return NextResponse.json(
        { success: false, error: 'Cannot follow yourself' },
        { status: 400 }
      )
    }

    // Check if already following
    const existingFollow = await prisma.follower.findUnique({
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
    const follower = await prisma.follower.create({
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
    console.error('Error following user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to follow user' },
      { status: 500 }
    )
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

    const targetUserId = id
    const currentUserId = session.user.id

    // Delete follow relationship
    await prisma.follower.delete({
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
    console.error('Error unfollowing user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unfollow user' },
      { status: 500 }
    )
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
      prisma.follower.count({
        where: { followingId: targetUserId },
      }),
      prisma.follower.count({
        where: { followerId: targetUserId },
      }),
    ])

    let isFollowing = false
    let isFollower = false

    if (currentUserId) {
      const [following, follower] = await Promise.all([
        prisma.follower.findUnique({
          where: {
            followerId_followingId: {
              followerId: currentUserId,
              followingId: targetUserId,
            },
          },
        }),
        prisma.follower.findUnique({
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
    console.error('Error getting follow status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get follow status' },
      { status: 500 }
    )
  }
}
