/**
 * Mind Map API - GET, PATCH, DELETE
 *
 * /api/mindmaps/[id]
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  UpdateMindMapSchema,
  type ApiResponse,
  type MindMapResponse,
  NotFoundError,
  UnauthorizedError,
  ValidationError
} from '@/lib/types/mindmap'
import {
  assertMindMapAccess,
  getMindMapWithPermission,
  logActivity
} from '@/lib/mindmap/permissions'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id] - Get mind map details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<MindMapResponse>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view mind maps')
    }

    const mindMap = await getMindMapWithPermission(
      params.id,
      session.user.id,
      'VIEW'
    )

    if (!mindMap) {
      throw new NotFoundError('Mind map')
    }

    return NextResponse.json({
      success: true,
      data: mindMap as MindMapResponse
    })
  } catch (error) {
    console.error('Error fetching mind map:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch mind map' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/mindmaps/[id] - Update mind map
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<MindMapResponse>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to update mind maps')
    }

    // Check EDIT permission
    await assertMindMapAccess(params.id, session.user.id, 'EDIT')

    const body = await request.json()
    const validatedData = UpdateMindMapSchema.parse(body)

    const mindMap = await prisma.mindMap.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        lastEditedById: session.user.id
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        lastEditedBy: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    // Log activity
    await logActivity(
      params.id,
      session.user.id,
      'SETTINGS_UPDATED',
      { changes: validatedData }
    )

    return NextResponse.json({
      success: true,
      data: mindMap as MindMapResponse,
      message: 'Mind map updated successfully'
    })
  } catch (error) {
    console.error('Error updating mind map:', error)

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
      { success: false, error: 'Failed to update mind map' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/mindmaps/[id] - Delete mind map
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to delete mind maps')
    }

    // Check ADMIN permission (only admins can delete)
    await assertMindMapAccess(params.id, session.user.id, 'ADMIN')

    // Delete all related data (cascade)
    await prisma.mindMap.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Mind map deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting mind map:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete mind map' },
      { status: 500 }
    )
  }
}
