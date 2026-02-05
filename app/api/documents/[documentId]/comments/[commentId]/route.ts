import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// PATCH /api/documents/[documentId]/comments/[commentId] - Update a comment
export async function PATCH(
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
    const { content } = body

    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      )
    }

    // Get the comment
    const comment = await prisma.documentComment.findUnique({
      where: { id: commentId },
    })

    if (!comment || comment.documentId !== documentId) {
      return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 })
    }

    // Only author can edit
    if (comment.authorId !== session.user.id) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Update comment
    const updatedComment = await prisma.documentComment.update({
      where: { id: commentId },
      data: {
        content: content.trim(),
        isEdited: true,
        editedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: updatedComment })
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}

// DELETE /api/documents/[documentId]/comments/[commentId] - Delete a comment
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

    // Get the comment and document
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

    const isAuthor = comment.authorId === session.user.id
    const isDocumentOwner = comment.document.creatorId === session.user.id
    const isAdmin = comment.document.collaborators.some((c: { permission: string }) => c.permission === 'ADMIN')

    // Only author, document owner, or admin can delete
    if (!isAuthor && !isDocumentOwner && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Delete comment (replies will be cascade deleted)
    await prisma.documentComment.delete({
      where: { id: commentId },
    })

    return NextResponse.json({ success: true, message: 'Comment deleted' })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}
