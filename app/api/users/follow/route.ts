import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// POST /api/users/follow - Follow a user
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to follow users' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId } = body // ID of user to follow

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: userId' },
        { status: 400 }
      )
    }

    // Can't follow yourself
    if (userId === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You cannot follow yourself' },
        { status: 400 }
      )
    }

    // Check if already following
    const existingFollow = await prisma.userFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    })

    if (existingFollow) {
      // Unfollow
      await prisma.userFollow.delete({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: userId,
          },
        },
      })

      return NextResponse.json({
        success: true,
        action: 'unfollowed',
        message: 'Successfully unfollowed user',
      })
    } else {
      // Follow
      await prisma.userFollow.create({
        data: {
          followerId: session.user.id,
          followingId: userId,
        },
      })

      return NextResponse.json({
        success: true,
        action: 'followed',
        message: 'Successfully followed user',
      })
    }
  } catch (error) {
    console.error('Error toggling follow:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to toggle follow' },
      { status: 500 }
    )
  }
}
