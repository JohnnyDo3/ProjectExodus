import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/documents/[documentId]/comments/[commentId]/replies - Get all replies for a comment
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ documentId: string; commentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId, commentId } = await context.params

    // Check if user has access to document
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        collaborators: {
          where: { userId: session.user.id },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    const isCreator = document.creatorId === session.user.id
    const isCollaborator = document.collaborators.length > 0

    if (!isCreator && !isCollaborator && !document.isPublic) {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    // Check if parent comment exists
    const parentComment = await prisma.documentComment.findUnique({
      where: { id: commentId },
    })

    if (!parentComment || parentComment.documentId !== documentId) {
      return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 })
    }

    // Get replies
    const replies = await prisma.documentComment.findMany({
      where: {
        parentId: commentId,
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
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ success: true, data: replies })
  } catch (error) {
    console.error('Error fetching replies:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch replies' },
      { status: 500 }
    )
  }
}

// POST /api/documents/[documentId]/comments/[commentId]/replies - Create a reply to a comment
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
    const { content } = body

    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      )
    }

    // Check if user has access to document
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        collaborators: {
          where: { userId: session.user.id },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 })
    }

    const isCreator = document.creatorId === session.user.id
    const collaborator = document.collaborators[0]
    const canComment = isCreator ||
      (collaborator && ['COMMENT', 'SUGGEST', 'EDIT', 'ADMIN'].includes(collaborator.permission))

    if (!canComment && !document.allowComments) {
      return NextResponse.json({ success: false, error: 'Comments not allowed' }, { status: 403 })
    }

    // Check if parent comment exists and is a top-level comment
    const parentComment = await prisma.documentComment.findUnique({
      where: { id: commentId },
    })

    if (!parentComment || parentComment.documentId !== documentId) {
      return NextResponse.json({ success: false, error: 'Parent comment not found' }, { status: 404 })
    }

    // Only allow replies to top-level comments (prevent deep nesting)
    if (parentComment.parentId) {
      return NextResponse.json(
        { success: false, error: 'Cannot reply to a reply. Please reply to the original comment.' },
        { status: 400 }
      )
    }

    // Create reply
    const reply = await prisma.documentComment.create({
      data: {
        documentId,
        authorId: session.user.id,
        content: content.trim(),
        parentId: commentId,
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
        reactions: true,
      },
    })

    // Update collaborator comment count if applicable
    if (collaborator) {
      await prisma.documentCollaborator.update({
        where: { id: collaborator.id },
        data: { commentsCount: { increment: 1 } },
      })
    }

    return NextResponse.json({ success: true, data: reply }, { status: 201 })
  } catch (error) {
    console.error('Error creating reply:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create reply' },
      { status: 500 }
    )
  }
}
