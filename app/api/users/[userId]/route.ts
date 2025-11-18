import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        createdAt: true,
        badges: {
          include: {
            badge: true
          }
        },
        forumPosts: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            category: {
              select: { name: true, slug: true }
            },
            _count: {
              select: { replies: true, likes: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        forumReplies: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            post: {
              select: {
                id: true,
                title: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        projects: {
          include: {
            project: {
              select: {
                id: true,
                title: true,
                description: true,
                status: true
              }
            }
          }
        },
        _count: {
          select: {
            forumPosts: true,
            forumReplies: true,
            followers: true,
            following: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
