/**
 * Individual Comment API - GET, PATCH, DELETE
 *
 * /api/mindmaps/[id]/comments/[commentId]
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  UpdateCommentSchema,
  type ApiResponse,
  type CommentResponse,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError
} from '@/lib/types/mindmap'
import { assertMindMapAccess, logActivity } from '@/lib/mindmap/permissions'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id]/comments/[commentId] - Get comment details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } }
): Promise<NextResponse<ApiResponse<CommentResponse>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view comments')
    }

    await assertMindMapAccess(params.id, session.user.id, 'VIEW')

    const comment = await prisma.mindMapNodeComment.findFirst({
      where: {
        id: params.commentId,
        mindMapId: params.id
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

    if (!comment) {
      throw new NotFoundError('Comment')
    }

    return NextResponse.json({
      success: true,
      data: comment as CommentResponse
    })
  } catch (error) {
    console.error('Error fetching comment:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch comment' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/mindmaps/[id]/comments/[commentId] - Update comment
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } }
): Promise<NextResponse<ApiResponse<CommentResponse>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to update comments')
    }

    await assertMindMapAccess(params.id, session.user.id, 'COMMENT')

    // Get the comment to check ownership
    const existingComment = await prisma.mindMapNodeComment.findFirst({
      where: {
        id: params.commentId,
        mindMapId: params.id
      }
    })

    if (!existingComment) {
      throw new NotFoundError('Comment')
    }

    // Only the author can edit the comment content
    const body = await request.json()
    const validatedData = UpdateCommentSchema.parse(body)

    if (validatedData.content && existingComment.userId !== session.user.id) {
      throw new ForbiddenError('You can only edit your own comments')
    }

    const comment = await prisma.mindMapNodeComment.update({
      where: {
        id: params.commentId,
        mindMapId: params.id
      },
      data: validatedData,
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

    // Log activity
    await logActivity(
      params.id,
      session.user.id,
      'COMMENT_UPDATED',
      { changes: validatedData },
      'comment',
      comment.id
    )

    return NextResponse.json({
      success: true,
      data: comment as CommentResponse,
      message: 'Comment updated successfully'
    })
  } catch (error) {
    console.error('Error updating comment:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    if (error instanceof NotFoundError || error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/mindmaps/[id]/comments/[commentId] - Delete comment
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } }
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to delete comments')
    }

    await assertMindMapAccess(params.id, session.user.id, 'COMMENT')

    // Get the comment to check ownership
    const existingComment = await prisma.mindMapNodeComment.findFirst({
      where: {
        id: params.commentId,
        mindMapId: params.id
      }
    })

    if (!existingComment) {
      throw new NotFoundError('Comment')
    }

    // Only the author or admin can delete the comment
    if (existingComment.userId !== session.user.id) {
      // Check if user has ADMIN permission
      await assertMindMapAccess(params.id, session.user.id, 'ADMIN')
    }

    // Delete comment (cascade deletes replies)
    await prisma.mindMapNodeComment.delete({
      where: {
        id: params.commentId,
        mindMapId: params.id
      }
    })

    // Log activity
    await logActivity(
      params.id,
      session.user.id,
      'COMMENT_DELETED',
      {},
      'comment',
      params.commentId
    )

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting comment:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError || error instanceof ForbiddenError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}
