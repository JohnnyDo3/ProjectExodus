/**
 * Individual Contributor API - PATCH, DELETE
 *
 * /api/mindmaps/[id]/contributors/[userId]
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  UpdateContributorSchema,
  type ApiResponse,
  type ContributorResponse,
  NotFoundError,
  UnauthorizedError,
  ValidationError
} from '@/lib/types/mindmap'
import { assertMindMapAccess, logActivity } from '@/lib/mindmap/permissions'
import { ZodError } from 'zod'

/**
 * PATCH /api/mindmaps/[id]/contributors/[userId] - Update contributor permission
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
): Promise<NextResponse<ApiResponse<ContributorResponse>>> {
  try {
    const { id, userId } = await params
    const session = await auth()
    
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to update contributors')
    }

    // Only admins can update contributor permissions
    await assertMindMapAccess(id, session.user.id, 'ADMIN')

    const body = await request.json()
    const validatedData = UpdateContributorSchema.parse(body)

    // Verify contributor exists
    const existingContributor = await prisma.mindMapContributor.findUnique({
      where: {
        mindMapId_userId: {
          mindMapId: id,
          userId: userId
        }
      }
    })

    if (!existingContributor) {
      throw new NotFoundError('Contributor')
    }

    // Prevent changing the creator's permission
    const mindMap = await prisma.mindMap.findUnique({
      where: { id: id },
      select: { creatorId: true }
    })

    if (mindMap?.creatorId === userId) {
      throw new ValidationError('Cannot change the creator\'s permission')
    }

    const contributor = await prisma.mindMapContributor.update({
      where: {
        mindMapId_userId: {
          mindMapId: id,
          userId: userId
        }
      },
      data: {
        permission: validatedData.permission
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    // Log activity
    await logActivity(
      id,
      session.user.id,
      'CONTRIBUTOR_UPDATED',
      {
        contributorId: userId,
        newPermission: validatedData.permission
      }
    )

    return NextResponse.json({
      success: true,
      data: contributor as ContributorResponse,
      message: 'Contributor permission updated successfully'
    })
  } catch (error) {
    console.error('Error updating contributor:', error)

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
      { success: false, error: 'Failed to update contributor' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/mindmaps/[id]/contributors/[userId] - Remove contributor
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> }
): Promise<NextResponse<ApiResponse<void>>> {
  try {
    const { id, userId } = await params
    const session = await auth()
    
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to remove contributors')
    }

    // Only admins can remove contributors
    await assertMindMapAccess(id, session.user.id, 'ADMIN')

    // Verify contributor exists
    const existingContributor = await prisma.mindMapContributor.findUnique({
      where: {
        mindMapId_userId: {
          mindMapId: id,
          userId: userId
        }
      }
    })

    if (!existingContributor) {
      throw new NotFoundError('Contributor')
    }

    // Prevent removing the creator
    const mindMap = await prisma.mindMap.findUnique({
      where: { id: id },
      select: { creatorId: true }
    })

    if (mindMap?.creatorId === userId) {
      throw new ValidationError('Cannot remove the creator from contributors')
    }

    // Remove contributor
    await prisma.mindMapContributor.delete({
      where: {
        mindMapId_userId: {
          mindMapId: id,
          userId: userId
        }
      }
    })

    // Log activity
    await logActivity(
      id,
      session.user.id,
      'CONTRIBUTOR_REMOVED',
      {
        contributorId: userId
      }
    )

    return NextResponse.json({
      success: true,
      message: 'Contributor removed successfully'
    })
  } catch (error) {
    console.error('Error removing contributor:', error)

    if (error instanceof ValidationError || error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to remove contributor' },
      { status: 500 }
    )
  }
}
