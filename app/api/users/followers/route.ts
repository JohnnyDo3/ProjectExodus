import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/users/followers - Get users who follow the current user
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const followers = await prisma.userFollow.findMany({
      where: {
        followingId: session.user.id,
      },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true,
            headline: true,
            location: true,
            phone: true,
            interests: true,
            expertise: true,
            guardianArchetype: true,
            declaration: true,
            createdAt: true,
            _count: {
              select: {
                followers: true,
                following: true,
                projectMemberships: true,
                articles: true,
                createdProjects: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const followerUsers = followers.map((f: any) => f.follower)

    return NextResponse.json({
      success: true,
      data: followerUsers,
    })
  } catch (error) {
    console.error('Error fetching followers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch followers' },
      { status: 500 }
    )
  }
}
