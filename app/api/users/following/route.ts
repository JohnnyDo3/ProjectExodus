import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/users/following - Get users the current user is following
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const following = await prisma.userFollow.findMany({
      where: {
        followerId: session.user.id,
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true,
            location: true,
            interests: true,
          },
        },
      },
    })

    const followingUsers = following.map((f) => f.following)

    return NextResponse.json({
      success: true,
      data: followingUsers,
    })
  } catch (error) {
    console.error('Error fetching following users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch following users' },
      { status: 500 }
    )
  }
}
