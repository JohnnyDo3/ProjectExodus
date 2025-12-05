import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// POST /api/forum/replies - Create new forum reply
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to reply' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate required fields
    if (!body.content || !body.postId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: content, postId' },
        { status: 400 }
      )
    }

    const reply = await prisma.forumReply.create({
      data: {
        content: body.content,
        postId: body.postId,
        userId: session.user.id,
        parentId: body.parentId || null, // For nested replies
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: reply,
    })
  } catch (error) {
    console.error('Error creating forum reply:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create forum reply' },
      { status: 500 }
    )
  }
}
