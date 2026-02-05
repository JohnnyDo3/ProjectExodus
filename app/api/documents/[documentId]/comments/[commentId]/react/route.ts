import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// POST /api/documents/[documentId]/comments/[commentId]/react - Add a reaction
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ documentId: string; commentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId, commentId } = await context.params
    const body = await request.json()
    const { emoji } = body

    if (!emoji) {
      return NextResponse.json(
        { success: false, error: 'Emoji is required' },
        { status: 400 }
      )
    }

    // Validate emoji (must be one of the allowed ones)
    const allowedEmojis = ['👍', '❤️', '😄', '🎉', '😕', '👀']
    if (!allowedEmojis.includes(emoji)) {
      return NextResponse.json(
        { success: false, error: 'Invalid emoji' },
        { status: 400 }
      )
    }

    // Check if comment exists and user has access
    const comment = await prisma.documentComment.findUnique({
      where: { id: commentId },
      include: {
        document: {
          include: {
            collaborators: {
              where: { userId: session.user.id },
            },
          },
        },
      },
    })

    if (!comment || comment.documentId !== documentId) {
      return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 })
    }

    const isCreator = comment.document.creatorId === session.user.id
    const isCollaborator = comment.document.collaborators.length > 0

    if (!isCreator && !isCollaborator && !comment.document.isPublic) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Check if reaction already exists
    const existingReaction = await prisma.commentReaction.findUnique({
      where: {
        commentId_userId_emoji: {
          commentId,
          userId: session.user.id,
          emoji,
        },
      },
    })

    if (existingReaction) {
      return NextResponse.json(
        { success: false, error: 'Reaction already exists' },
        { status: 409 }
      )
    }

    // Create reaction
    const reaction = await prisma.commentReaction.create({
      data: {
        commentId,
        userId: session.user.id,
        emoji,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: reaction }, { status: 201 })
  } catch (error) {
    console.error('Error adding reaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add reaction' },
      { status: 500 }
    )
  }
}

// DELETE /api/documents/[documentId]/comments/[commentId]/react - Remove a reaction
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ documentId: string; commentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId, commentId } = await context.params
    const url = new URL(request.url)
    const emoji = url.searchParams.get('emoji')

    if (!emoji) {
      return NextResponse.json(
        { success: false, error: 'Emoji is required' },
        { status: 400 }
      )
    }

    // Check if comment exists
    const comment = await prisma.documentComment.findUnique({
      where: { id: commentId },
    })

    if (!comment || comment.documentId !== documentId) {
      return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 })
    }

    // Delete reaction
    await prisma.commentReaction.delete({
      where: {
        commentId_userId_emoji: {
          commentId,
          userId: session.user.id,
          emoji,
        },
      },
    })

    return NextResponse.json({ success: true, message: 'Reaction removed' })
  } catch (error) {
    console.error('Error removing reaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove reaction' },
      { status: 500 }
    )
  }
}
