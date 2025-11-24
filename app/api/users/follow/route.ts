import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { handlePrismaError } from '@/lib/utils/prisma-errors'

// POST /api/users/follow - Follow a user
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }

    if (userId === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Cannot follow yourself' },
        { status: 400 }
      )
    }

    // Check if already following
    const existing = await prisma.userFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Already following this user' },
        { status: 400 }
      )
    }

    await prisma.userFollow.create({
      data: {
        followerId: session.user.id,
        followingId: userId,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully followed user',
    })
  } catch (error) {
    return handlePrismaError(error, 'follow user')
  }
}

// DELETE /api/users/follow - Unfollow a user
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }

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
      message: 'Successfully unfollowed user',
    })
  } catch (error) {
    return handlePrismaError(error, 'unfollow user')
  }
}
