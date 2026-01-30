/**
 * Individual Connection API - GET, PATCH, DELETE
 *
 * /api/mindmaps/[id]/connections/[connectionId]
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  UpdateConnectionSchema,
  type ApiResponse,
  type ConnectionResponse,
  NotFoundError,
  UnauthorizedError
} from '@/lib/types/mindmap'
import { assertMindMapAccess, logActivity } from '@/lib/mindmap/permissions'
import { broadcastConnectionDeleted } from '@/lib/mindmap/realtime'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id]/connections/[connectionId] - Get connection details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; connectionId: string } }
): Promise<NextResponse<ApiResponse<ConnectionResponse>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view connections')
    }

    await assertMindMapAccess(params.id, session.user.id, 'VIEW')

    const connection = await prisma.mindMapConnection.findFirst({
      where: {
        id: params.connectionId,
        mindMapId: params.id
      },
      include: {
        sourceNode: {
          select: {
            id: true,
            label: true,
            type: true
          }
        },
        targetNode: {
          select: {
            id: true,
            label: true,
            type: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    if (!connection) {
      throw new NotFoundError('Connection')
    }

    return NextResponse.json({
      success: true,
      data: connection as ConnectionResponse
    })
  } catch (error) {
    console.error('Error fetching connection:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch connection' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/mindmaps/[id]/connections/[connectionId] - Update connection
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; connectionId: string } }
): Promise<NextResponse<ApiResponse<ConnectionResponse>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to update connections')
    }

    await assertMindMapAccess(params.id, session.user.id, 'EDIT')

    const body = await request.json()
    const validatedData = UpdateConnectionSchema.parse(body)

    const connection = await prisma.mindMapConnection.update({
      where: {
        id: params.connectionId,
        mindMapId: params.id
      },
      data: validatedData,
      include: {
        sourceNode: {
          select: {
            id: true,
            label: true,
            type: true
          }
        },
        targetNode: {
          select: {
            id: true,
            label: true,
            type: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    // Update mind map last edited
    await prisma.mindMap.update({
      where: { id: params.id },
      data: {
        lastEditedById: session.user.id
      }
    })

    // Log activity
    await logActivity(
      params.id,
      session.user.id,
      'CONNECTION_UPDATED',
      { changes: validatedData },
      'connection',
      connection.id
    )

    return NextResponse.json({
      success: true,
      data: connection as ConnectionResponse,
      message: 'Connection updated successfully'
    })
  } catch (error) {
    console.error('Error updating connection:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update connection' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/mindmaps/[id]/connections/[connectionId] - Delete connection
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; connectionId: string } }
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to delete connections')
    }

    await assertMindMapAccess(params.id, session.user.id, 'EDIT')

    // Get connection before deletion for broadcast
    const connection = await prisma.mindMapConnection.findFirst({
      where: {
        id: params.connectionId,
        mindMapId: params.id
      },
      include: {
        sourceNode: {
          select: {
            id: true,
            label: true,
            type: true
          }
        },
        targetNode: {
          select: {
            id: true,
            label: true,
            type: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    if (!connection) {
      throw new NotFoundError('Connection')
    }

    // Delete connection
    await prisma.mindMapConnection.delete({
      where: {
        id: params.connectionId,
        mindMapId: params.id
      }
    })

    // Update mind map connection count
    await prisma.mindMap.update({
      where: { id: params.id },
      data: {
        connectionCount: { decrement: 1 },
        lastEditedById: session.user.id
      }
    })

    // Log activity
    await logActivity(
      params.id,
      session.user.id,
      'CONNECTION_DELETED',
      { type: connection.type },
      'connection',
      connection.id
    )

    // Broadcast real-time deletion
    await broadcastConnectionDeleted(
      params.id,
      connection as ConnectionResponse,
      session.user.id,
      session.user.name || null
    )

    return NextResponse.json({
      success: true,
      message: 'Connection deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting connection:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete connection' },
      { status: 500 }
    )
  }
}
