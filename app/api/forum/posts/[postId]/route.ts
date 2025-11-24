import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params

    const post = await prisma.forumPost.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            _count: {
              select: { likes: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        _count: {
          select: { replies: true, likes: true }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error fetching forum post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch forum post' },
      { status: 500 }
    )
  }
}

// DELETE /api/forum/posts/[postId] - Delete a forum post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { postId } = await params

    // Check if post exists and user owns it
    const post = await prisma.forumPost.findUnique({
      where: { id: postId },
      select: { userId: true }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    if (post.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - You can only delete your own posts' },
        { status: 403 }
      )
    }

    // Delete the post (replies will be cascade deleted based on schema)
    await prisma.forumPost.delete({
      where: { id: postId }
    })

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting forum post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete forum post' },
      { status: 500 }
    )
  }
}
