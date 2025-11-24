import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    console.log('[API /discussions] Request received')

    const session = await auth()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    console.log('[API /discussions] Session user ID:', session?.user?.id)
    console.log('[API /discussions] Requested user ID:', userId)

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // If userId is provided, filter by that user, otherwise use the logged-in user
    const targetUserId = userId || session.user.id

    console.log('[API /discussions] Fetching discussions for user:', targetUserId)

    // Fetch forum posts created by the user with reply counts
    const discussions = await prisma.forumPost.findMany({
      where: {
        userId: targetUserId,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        views: true,
        pinned: true,
        locked: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    console.log('[API /discussions] Found', discussions.length, 'discussions')

    // Transform to match the expected format
    const transformedDiscussions = discussions.map((discussion) => ({
      id: discussion.id,
      title: discussion.title,
      slug: discussion.slug,
      content: discussion.content,
      views: discussion.views,
      pinned: discussion.pinned,
      locked: discussion.locked,
      replies: discussion._count.replies,
      likes: discussion._count.likes,
      category: discussion.category,
      createdAt: discussion.createdAt,
      updatedAt: discussion.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      data: transformedDiscussions,
    })
  } catch (error) {
    console.error('[API /discussions] ERROR:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}
