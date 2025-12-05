import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// POST /api/forum/like - Toggle like on post or reply
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to like' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type, id } = body // type: 'post' or 'reply', id: postId or replyId

    if (!type || !id) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: type, id' },
        { status: 400 }
      )
    }

    if (type === 'post') {
      // Check if already liked
      const existing = await prisma.postLike.findUnique({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: id,
          },
        },
      })

      if (existing) {
        // Unlike
        await prisma.postLike.delete({
          where: {
            userId_postId: {
              userId: session.user.id,
              postId: id,
            },
          },
        })

        return NextResponse.json({
          success: true,
          action: 'unliked',
        })
      } else {
        // Like
        await prisma.postLike.create({
          data: {
            userId: session.user.id,
            postId: id,
          },
        })

        return NextResponse.json({
          success: true,
          action: 'liked',
        })
      }
    } else if (type === 'reply') {
      // Check if already liked
      const existing = await prisma.replyLike.findUnique({
        where: {
          userId_replyId: {
            userId: session.user.id,
            replyId: id,
          },
        },
      })

      if (existing) {
        // Unlike
        await prisma.replyLike.delete({
          where: {
            userId_replyId: {
              userId: session.user.id,
              replyId: id,
            },
          },
        })

        return NextResponse.json({
          success: true,
          action: 'unliked',
        })
      } else {
        // Like
        await prisma.replyLike.create({
          data: {
            userId: session.user.id,
            replyId: id,
          },
        })

        return NextResponse.json({
          success: true,
          action: 'liked',
        })
      }
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid type - must be "post" or "reply"' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}
