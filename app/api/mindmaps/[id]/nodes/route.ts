/**
 * Mind Map Nodes API - GET, POST, PUT (bulk), DELETE (bulk)
 *
 * /api/mindmaps/[id]/nodes
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  CreateNodeSchema,
  BulkCreateNodesSchema,
  BulkUpdateNodesSchema,
  BulkDeleteNodesSchema,
  type ApiResponse,
  type NodeResponse,
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
import { broadcastNodeCreated } from '@/lib/mindmap/realtime'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id]/nodes - Get all nodes
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<PaginatedResponse<NodeResponse>>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view nodes')
    }

    await assertMindMapAccess(params.id, session.user.id, 'VIEW')

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const assignedToId = searchParams.get('assignedToId')

    // Build where clause
    const where: any = {
      mindMapId: params.id
    }

    if (type) where.type = type
    if (status) where.status = status
    if (assignedToId) where.assignedToId = assignedToId

    // Get total count
    const total = await prisma.mindMapNode.count({ where })

    // Get nodes with pagination
    const nodes = await prisma.mindMapNode.findMany({
      where,
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
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        data: nodes as NodeResponse[],
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
    console.error('Error fetching nodes:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch nodes' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/mindmaps/[id]/nodes - Create node(s)
 * Supports both single and bulk creation
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<NodeResponse | NodeResponse[]>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to create nodes')
    }

    await assertMindMapAccess(params.id, session.user.id, 'EDIT')

    const body = await request.json()

    // Check if bulk creation
    if (body.nodes && Array.isArray(body.nodes)) {
      const validatedData = BulkCreateNodesSchema.parse(body)

      const createdNodes = await prisma.$transaction(
        validatedData.nodes.map(nodeData =>
          prisma.mindMapNode.create({
            data: {
              ...nodeData,
              mindMapId: params.id,
              createdById: session.user.id
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
        )
      )

      // Update mind map node count
      await prisma.mindMap.update({
        where: { id: params.id },
        data: {
          nodeCount: { increment: createdNodes.length },
          lastEditedById: session.user.id
        }
      })

      // Update contributor stats
      await updateContributorActivity(params.id, session.user.id, {
        nodesCreated: createdNodes.length
      })

      // Log activities
      for (const node of createdNodes) {
        await logActivity(
          params.id,
          session.user.id,
          'NODE_CREATED',
          { nodeType: node.type, label: node.label },
          'node',
          node.id
        )

        // Broadcast real-time event
        await broadcastNodeCreated(
          params.id,
          node as NodeResponse,
          session.user.id,
          session.user.name || null
        )
      }

      return NextResponse.json({
        success: true,
        data: createdNodes as NodeResponse[],
        message: `${createdNodes.length} nodes created successfully`
      })
    } else {
      // Single node creation
      const validatedData = CreateNodeSchema.parse(body)

      const node = await prisma.mindMapNode.create({
        data: {
          ...validatedData,
          mindMapId: params.id,
          createdById: session.user.id
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

      // Update mind map node count
      await prisma.mindMap.update({
        where: { id: params.id },
        data: {
          nodeCount: { increment: 1 },
          lastEditedById: session.user.id
        }
      })

      // Update contributor stats
      await updateContributorActivity(params.id, session.user.id, {
        nodesCreated: 1
      })

      // Log activity
      await logActivity(
        params.id,
        session.user.id,
        'NODE_CREATED',
        { nodeType: node.type, label: node.label },
        'node',
        node.id
      )

      // Broadcast real-time event
      await broadcastNodeCreated(
        params.id,
        node as NodeResponse,
        session.user.id,
        session.user.name || null
      )

      return NextResponse.json({
        success: true,
        data: node as NodeResponse,
        message: 'Node created successfully'
      })
    }
  } catch (error) {
    console.error('Error creating node:', error)

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
      { success: false, error: 'Failed to create node' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/mindmaps/[id]/nodes - Bulk update nodes
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<NodeResponse[]>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to update nodes')
    }

    await assertMindMapAccess(params.id, session.user.id, 'EDIT')

    const body = await request.json()
    const validatedData = BulkUpdateNodesSchema.parse(body)

    const updatedNodes = await prisma.$transaction(
      validatedData.updates.map(({ id, data }) =>
        prisma.mindMapNode.update({
          where: { id, mindMapId: params.id },
          data: {
            ...data,
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
      )
    )

    // Update mind map last edited
    await prisma.mindMap.update({
      where: { id: params.id },
      data: {
        lastEditedById: session.user.id
      }
    })

    // Log activities
    for (const node of updatedNodes) {
      await logActivity(
        params.id,
        session.user.id,
        'NODE_UPDATED',
        { label: node.label },
        'node',
        node.id
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedNodes as NodeResponse[],
      message: `${updatedNodes.length} nodes updated successfully`
    })
  } catch (error) {
    console.error('Error updating nodes:', error)

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
      { success: false, error: 'Failed to update nodes' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/mindmaps/[id]/nodes - Bulk delete nodes
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to delete nodes')
    }

    await assertMindMapAccess(params.id, session.user.id, 'EDIT')

    const body = await request.json()
    const validatedData = BulkDeleteNodesSchema.parse(body)

    // Delete nodes
    const deleteResult = await prisma.mindMapNode.deleteMany({
      where: {
        id: { in: validatedData.nodeIds },
        mindMapId: params.id
      }
    })

    // Update mind map node count
    await prisma.mindMap.update({
      where: { id: params.id },
      data: {
        nodeCount: { decrement: deleteResult.count },
        lastEditedById: session.user.id
      }
    })

    // Log activities
    for (const nodeId of validatedData.nodeIds) {
      await logActivity(
        params.id,
        session.user.id,
        'NODE_DELETED',
        {},
        'node',
        nodeId
      )
    }

    return NextResponse.json({
      success: true,
      message: `${deleteResult.count} nodes deleted successfully`
    })
  } catch (error) {
    console.error('Error deleting nodes:', error)

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
      { success: false, error: 'Failed to delete nodes' },
      { status: 500 }
    )
  }
}
