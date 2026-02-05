import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/documents/[documentId]/comments - Get all comments for a document
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await context.params

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

    // Get comments with replies and reactions
    const comments = await prisma.documentComment.findMany({
      where: {
        documentId,
        parentId: null, // Only top-level comments
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
        replies: {
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
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: comments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST /api/documents/[documentId]/comments - Create a new comment
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ documentId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId } = await context.params
    const body = await request.json()
    const { content, position, parentId, quotedText } = body

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

    // Create comment
    const comment = await prisma.documentComment.create({
      data: {
        documentId,
        authorId: session.user.id,
        content: content.trim(),
        position: position || null,
        parentId: parentId || null,
        quotedText: quotedText || null,
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
        replies: true,
      },
    })

    // Update collaborator comment count if applicable
    if (collaborator) {
      await prisma.documentCollaborator.update({
        where: { id: collaborator.id },
        data: { commentsCount: { increment: 1 } },
      })
    }

    return NextResponse.json({ success: true, data: comment }, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
