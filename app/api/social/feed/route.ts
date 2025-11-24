import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Get posts from followed users + public posts
    let whereClause: any = {
      visibility: 'PUBLIC'
    }

    if (session?.user?.id) {
      // Get user's following list
      const following = await prisma.userFollow.findMany({
        where: { followerId: session.user.id },
        select: { followingId: true }
      })

      const followingIds = following.map((f: any) => f.followingId)

      // Include posts from followed users or public posts
      whereClause = {
        OR: [
          { visibility: 'PUBLIC' },
          {
            AND: [
              { userId: { in: followingIds } },
              { visibility: 'FOLLOWERS_ONLY' }
            ]
          },
          { userId: session.user.id } // User's own posts
        ]
      }
    }

    const posts = await prisma.socialPost.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            headline: true,
            expertise: true
          }
        },
        media: {
          orderBy: { order: 'asc' }
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 3
        },
        likes: session?.user?.id ? {
          where: { userId: session.user.id }
        } : false,
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    })

    // Get total count for pagination
    const totalPosts = await prisma.socialPost.count({ where: whereClause })

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total: totalPosts,
          totalPages: Math.ceil(totalPosts / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching social feed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}
