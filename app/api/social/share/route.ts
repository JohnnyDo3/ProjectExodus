import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { postId } = body

    if (!postId) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      )
    }

    // Increment the share count
    const post = await prisma.socialPost.update({
      where: { id: postId },
      data: {
        shares: {
          increment: 1
        }
      },
      select: {
        id: true,
        shares: true
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        postId: post.id,
        shares: post.shares
      }
    })
  } catch (error) {
    console.error('Error sharing post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to share post' },
      { status: 500 }
    )
  }
}
