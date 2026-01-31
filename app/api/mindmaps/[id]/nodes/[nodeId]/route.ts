/**
 * Individual Node API - GET, PATCH, DELETE
 *
 * /api/mindmaps/[id]/nodes/[nodeId]
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  UpdateNodeSchema,
  type ApiResponse,
  type NodeResponse,
  NotFoundError,
  UnauthorizedError
} from '@/lib/types/mindmap'
import {
  assertMindMapAccess,
  logActivity
} from '@/lib/mindmap/permissions'
import {
  broadcastNodeUpdated,
  broadcastNodeDeleted
} from '@/lib/mindmap/realtime'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id]/nodes/[nodeId] - Get node details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; nodeId: string }> }
): Promise<NextResponse<ApiResponse<NodeResponse>>> {
  try {
    const { id, nodeId } = await params
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view nodes')
    }

    await assertMindMapAccess(id, session.user.id, 'VIEW')

    const node = await prisma.mindMapNode.findFirst({
      where: {
        id: nodeId,
        mindMapId: id
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    if (!node) {
      throw new NotFoundError('Node')
    }

    return NextResponse.json({
      success: true,
      data: node as NodeResponse
    })
  } catch (error) {
    console.error('Error fetching node:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch node' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/mindmaps/[id]/nodes/[nodeId] - Update node
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; nodeId: string }> }
): Promise<NextResponse<ApiResponse<NodeResponse>>> {
  try {
    const { id, nodeId } = await params
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to update nodes')
    }

    await assertMindMapAccess(id, session.user.id, 'EDIT')

    const body = await request.json()
    const validatedData = UpdateNodeSchema.parse(body)

    const node = await prisma.mindMapNode.update({
      where: {
        id: nodeId,
        mindMapId: id
      },
      data: {
        ...validatedData,
        lastEditedById: session.user.id,
        lastEditedAt: new Date()
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true
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
      where: { id: id },
      data: {
        lastEditedById: session.user.id
      }
    })

    // Log activity
    await logActivity(
      id,
      session.user.id,
      'NODE_UPDATED',
      { label: node.label, changes: validatedData },
      'node',
      node.id
    )

    // Broadcast real-time update
    await broadcastNodeUpdated(
      id,
      node as NodeResponse,
      session.user.id,
      session.user.name || null
    )

    return NextResponse.json({
      success: true,
      data: node as NodeResponse,
      message: 'Node updated successfully'
    })
  } catch (error) {
    console.error('Error updating node:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
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
      { success: false, error: 'Failed to update node' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/mindmaps/[id]/nodes/[nodeId] - Delete node
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; nodeId: string }> }
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    const { id, nodeId } = await params
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to delete nodes')
    }

    await assertMindMapAccess(id, session.user.id, 'EDIT')

    // Get node before deletion for broadcast
    const node = await prisma.mindMapNode.findFirst({
      where: {
        id: nodeId,
        mindMapId: id
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    if (!node) {
      throw new NotFoundError('Node')
    }

    // Delete node (cascade deletes comments and connections)
    await prisma.mindMapNode.delete({
      where: {
        id: nodeId,
        mindMapId: id
      }
    })

    // Update mind map node count
    await prisma.mindMap.update({
      where: { id: id },
      data: {
        nodeCount: { decrement: 1 },
        lastEditedById: session.user.id
      }
    })

    // Log activity
    await logActivity(
      id,
      session.user.id,
      'NODE_DELETED',
      { label: node.label, type: node.type },
      'node',
      node.id
    )

    // Broadcast real-time deletion
    await broadcastNodeDeleted(
      id,
      node as NodeResponse,
      session.user.id,
      session.user.name || null
    )

    return NextResponse.json({
      success: true,
      message: 'Node deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting node:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete node' },
      { status: 500 }
    )
  }
}
