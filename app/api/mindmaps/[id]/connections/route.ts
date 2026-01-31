/**
 * Mind Map Connections API - GET, POST, DELETE (bulk)
 *
 * /api/mindmaps/[id]/connections
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  CreateConnectionSchema,
  BulkCreateConnectionsSchema,
  BulkDeleteConnectionsSchema,
  type ApiResponse,
  type ConnectionResponse,
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
import { broadcastConnectionCreated } from '@/lib/mindmap/realtime'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id]/connections - Get all connections
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<PaginatedResponse<ConnectionResponse>>>> {
  try {
    const session = await auth()
    const { id } = await params
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view connections')
    }

    await assertMindMapAccess(id, session.user.id, 'VIEW')

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')
    const type = searchParams.get('type')
    const nodeId = searchParams.get('nodeId')

    // Build where clause
    const where: any = {
      mindMapId: id
    }

    if (type) where.type = type
    if (nodeId) {
      where.OR = [
        { sourceNodeId: nodeId },
        { targetNodeId: nodeId }
      ]
    }

    // Get total count
    const total = await prisma.mindMapConnection.count({ where })

    // Get connections with pagination
    const connections = await prisma.mindMapConnection.findMany({
      where,
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
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        data: connections as ConnectionResponse[],
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
    console.error('Error fetching connections:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch connections' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/mindmaps/[id]/connections - Create connection(s)
 * Supports both single and bulk creation
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<ConnectionResponse | ConnectionResponse[]>>> {
  try {
    const session = await auth()
    const { id } = await params
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to create connections')
    }

    await assertMindMapAccess(id, session.user.id, 'EDIT')

    const body = await request.json()

    // Check if bulk creation
    if (body.connections && Array.isArray(body.connections)) {
      const validatedData = BulkCreateConnectionsSchema.parse(body)

      // Verify all nodes exist and belong to this mind map
      const nodeIds = new Set<string>()
      validatedData.connections.forEach(conn => {
        nodeIds.add(conn.sourceNodeId)
        nodeIds.add(conn.targetNodeId)
      })

      const nodes = await prisma.mindMapNode.findMany({
        where: {
          id: { in: Array.from(nodeIds) },
          mindMapId: id
        }
      })

      if (nodes.length !== nodeIds.size) {
        throw new ValidationError('Some nodes do not exist or belong to a different mind map')
      }

      const createdConnections = await prisma.$transaction(
        validatedData.connections.map(connData =>
          prisma.mindMapConnection.create({
            data: {
              ...connData,
              mindMapId: id
            },
            include: {
              fromNode: {
                select: {
                  id: true,
                  label: true,
                  type: true
                }
              },
              toNode: {
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
        )
      )

      // Update mind map connection count
      await prisma.mindMap.update({
        where: { id: id },
        data: {
          connectionCount: { increment: createdConnections.length },
          lastEditedById: session.user.id
        }
      })

      // Update contributor stats
      await updateContributorActivity(id, session.user.id, {
        connectionsCreated: createdConnections.length
      })

      // Log activities
      for (const connection of createdConnections) {
        await logActivity(
          id,
          session.user.id,
          'CONNECTION_CREATED',
          { type: connection.type, from: connection.sourceNodeId, to: connection.targetNodeId },
          'connection',
          connection.id
        )

        // Broadcast real-time event
        await broadcastConnectionCreated(
          id,
          connection as ConnectionResponse,
          session.user.id,
          session.user.name || null
        )
      }

      return NextResponse.json({
        success: true,
        data: createdConnections as ConnectionResponse[],
        message: `${createdConnections.length} connections created successfully`
      })
    } else {
      // Single connection creation
      const validatedData = CreateConnectionSchema.parse(body)

      // Verify nodes exist and belong to this mind map
      const nodes = await prisma.mindMapNode.findMany({
        where: {
          id: { in: [validatedData.sourceNodeId, validatedData.targetNodeId] },
          mindMapId: id
        }
      })

      if (nodes.length !== 2) {
        throw new ValidationError('One or both nodes do not exist or belong to a different mind map')
      }

      // Prevent self-connections
      if (validatedData.sourceNodeId === validatedData.targetNodeId) {
        throw new ValidationError('Cannot create a connection from a node to itself')
      }

      const connection = await prisma.mindMapConnection.create({
        data: {
          ...validatedData,
          mindMapId: id
        },
        include: {
          fromNode: {
            select: {
              id: true,
              label: true,
              type: true
            }
          },
          toNode: {
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

      // Update mind map connection count
      await prisma.mindMap.update({
        where: { id: id },
        data: {
          connectionCount: { increment: 1 },
          lastEditedById: session.user.id
        }
      })

      // Update contributor stats
      await updateContributorActivity(id, session.user.id, {
        connectionsCreated: 1
      })

      // Log activity
      await logActivity(
        id,
        session.user.id,
        'CONNECTION_CREATED',
        { type: connection.type, from: connection.fromNodeId, to: connection.toNodeId },
        'connection',
        connection.id
      )

      // Broadcast real-time event
      await broadcastConnectionCreated(
        id,
        connection as ConnectionResponse,
        session.user.id,
        session.user.name || null
      )

      return NextResponse.json({
        success: true,
        data: connection as ConnectionResponse,
        message: 'Connection created successfully'
      })
    }
  } catch (error) {
    console.error('Error creating connection:', error)

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
      { success: false, error: 'Failed to create connection' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/mindmaps/[id]/connections - Bulk delete connections
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    const session = await auth()
    const { id } = await params
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to delete connections')
    }

    await assertMindMapAccess(id, session.user.id, 'EDIT')

    const body = await request.json()
    const validatedData = BulkDeleteConnectionsSchema.parse(body)

    // Delete connections
    const deleteResult = await prisma.mindMapConnection.deleteMany({
      where: {
        id: { in: validatedData.connectionIds },
        mindMapId: id
      }
    })

    // Update mind map connection count
    await prisma.mindMap.update({
      where: { id: id },
      data: {
        connectionCount: { decrement: deleteResult.count },
        lastEditedById: session.user.id
      }
    })

    // Log activities
    for (const connectionId of validatedData.connectionIds) {
      await logActivity(
        id,
        session.user.id,
        'CONNECTION_DELETED',
        {},
        'connection',
        connectionId
      )
    }

    return NextResponse.json({
      success: true,
      message: `${deleteResult.count} connections deleted successfully`
    })
  } catch (error) {
    console.error('Error deleting connections:', error)

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
      { success: false, error: 'Failed to delete connections' },
      { status: 500 }
    )
  }
}
