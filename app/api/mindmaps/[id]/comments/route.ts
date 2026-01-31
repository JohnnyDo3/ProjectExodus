/**
 * Mind Map Comments API - GET, POST
 *
 * /api/mindmaps/[id]/comments
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  CreateCommentSchema,
  type ApiResponse,
  type CommentResponse,
  type PaginatedResponse,
  NotFoundError,
  UnauthorizedError,
  ValidationError
} from '@/lib/types/mindmap'
import {
  assertMindMapAccess,
  updateContributorActivity,
  logActivity
} from '@/lib/mindmap/permissions'
import { broadcastCommentAdded } from '@/lib/mindmap/realtime'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id]/comments - Get comments
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<PaginatedResponse<CommentResponse>>>> {
  try {
    const session = await auth()
    const { id } = await params
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view comments')
    }

    await assertMindMapAccess(id, session.user.id, 'VIEW')

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const nodeId = searchParams.get('nodeId')
    const connectionId = searchParams.get('connectionId')
    const isResolved = searchParams.get('isResolved')

    // Build where clause
    const where: any = {
      mindMapId: id
    }

    if (nodeId) where.nodeId = nodeId
    if (connectionId) where.connectionId = connectionId
    if (isResolved !== null && isResolved !== undefined) {
      where.isResolved = isResolved === 'true'
    }

    // Get total count
    const total = await prisma.mindMapNodeComment.count({ where })

    // Get comments with pagination
    const comments = await prisma.mindMapNodeComment.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            replies: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        data: comments as CommentResponse[],
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages
        }
      }
    })
  } catch (error) {
    console.error('Error fetching comments:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/mindmaps/[id]/comments - Create comment
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<CommentResponse>>> {
  try {
    const session = await auth()
    const { id } = await params
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to add comments')
    }

    // Check comment permission
    await assertMindMapAccess(id, session.user.id, 'COMMENT')

    const body = await request.json()
    const validatedData = CreateCommentSchema.parse(body)

    // Validate that at least one of nodeId or connectionId is provided
    if (!validatedData.nodeId && !validatedData.connectionId) {
      throw new ValidationError('Comment must be associated with either a node or a connection')
    }

    // Validate that both are not provided
    if (validatedData.nodeId && validatedData.connectionId) {
      throw new ValidationError('Comment cannot be associated with both a node and a connection')
    }

    // Verify the target (node or connection) exists and belongs to this mind map
    if (validatedData.nodeId) {
      const node = await prisma.mindMapNode.findFirst({
        where: {
          id: validatedData.nodeId,
          mindMapId: id
        }
      })
      if (!node) {
        throw new NotFoundError('Node')
      }
    }

    if (validatedData.connectionId) {
      const connection = await prisma.mindMapConnection.findFirst({
        where: {
          id: validatedData.connectionId,
          mindMapId: id
        }
      })
      if (!connection) {
        throw new NotFoundError('Connection')
      }
    }

    const comment = await prisma.mindMapNodeComment.create({
      data: {
        ...validatedData,
        mindMapId: id,
        userId: session.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            replies: true
          }
        }
      }
    })

    // Update contributor stats
    await updateContributorActivity(id, session.user.id, {
      // commentsAdded: 1
    })

    // Log activity
    await logActivity(
      id,
      session.user.id,
      'COMMENT_ADDED',
      {
        targetType: validatedData.nodeId ? 'node' : 'connection',
        targetId: validatedData.nodeId || validatedData.connectionId
      },
      'comment',
      comment.id
    )

    // Broadcast real-time event
    await broadcastCommentAdded(
      id,
      comment as CommentResponse,
      session.user.id,
      session.user.name || null
    )

    return NextResponse.json({
      success: true,
      data: comment as CommentResponse,
      message: 'Comment added successfully'
    })
  } catch (error) {
    console.error('Error creating comment:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      )
    }

    if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
