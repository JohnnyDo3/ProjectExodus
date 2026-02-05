import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// POST /api/documents/[documentId]/comments/[commentId]/resolve - Resolve a comment
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

    // Only top-level comments can be resolved
    if (comment.parentId) {
      return NextResponse.json(
        { success: false, error: 'Only top-level comments can be resolved' },
        { status: 400 }
      )
    }

    const isAuthor = comment.authorId === session.user.id
    const isDocumentOwner = comment.document.creatorId === session.user.id
    const isAdmin = comment.document.collaborators.some((c: { permission: string }) => c.permission === 'ADMIN')

    // Only author, document owner, or admin can resolve
    if (!isAuthor && !isDocumentOwner && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Resolve the comment
    const updatedComment = await prisma.documentComment.update({
      where: { id: commentId },
      data: {
        isResolved: true,
        resolvedById: session.user.id,
        resolvedAt: new Date(),
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
        resolvedBy: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: updatedComment })
  } catch (error) {
    console.error('Error resolving comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to resolve comment' },
      { status: 500 }
    )
  }
}

// DELETE /api/documents/[documentId]/comments/[commentId]/resolve - Unresolve a comment
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
    const isResolver = comment.resolvedById === session.user.id

    // Only author, resolver, document owner, or admin can unresolve
    if (!isAuthor && !isResolver && !isDocumentOwner && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Unresolve the comment
    const updatedComment = await prisma.documentComment.update({
      where: { id: commentId },
      data: {
        isResolved: false,
        resolvedById: null,
        resolvedAt: null,
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
      },
    })

    return NextResponse.json({ success: true, data: updatedComment })
  } catch (error) {
    console.error('Error unresolving comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unresolve comment' },
      { status: 500 }
    )
  }
}
