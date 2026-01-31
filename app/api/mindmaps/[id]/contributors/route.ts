/**
 * Mind Map Contributors API - GET, POST
 *
 * /api/mindmaps/[id]/contributors
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  AddContributorSchema,
  type ApiResponse,
  type ContributorResponse,
  NotFoundError,
  UnauthorizedError,
  ValidationError
} from '@/lib/types/mindmap'
import { assertMindMapAccess, logActivity } from '@/lib/mindmap/permissions'
import { ZodError } from 'zod'

/**
 * GET /api/mindmaps/[id]/contributors - Get all contributors
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<ContributorResponse[]>>> {
  try {
    const session = await auth()
    const { id } = await params
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view contributors')
    }

    await assertMindMapAccess(id, session.user.id, 'VIEW')

    const contributors = await prisma.mindMapContributor.findMany({
      where: {
        mindMapId: id
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
      },
      orderBy: { joinedAt: 'asc' }
    })

    return NextResponse.json({
      success: true,
      data: contributors as ContributorResponse[]
    })
  } catch (error) {
    console.error('Error fetching contributors:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch contributors' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/mindmaps/[id]/contributors - Add contributor
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<ContributorResponse>>> {
  try {
    const session = await auth()
    const { id } = await params
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to add contributors')
    }

    // Only admins can add contributors
    await assertMindMapAccess(id, session.user.id, 'ADMIN')

    const body = await request.json()
    const validatedData = AddContributorSchema.parse(body)

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId }
    })

    if (!user) {
      throw new NotFoundError('User')
    }

    // Check if user is already a contributor
    const existingContributor = await prisma.mindMapContributor.findUnique({
      where: {
        mindMapId_userId: {
          mindMapId: id,
          userId: validatedData.userId
        }
      }
    })

    if (existingContributor) {
      throw new ValidationError('User is already a contributor')
    }

    const contributor = await prisma.mindMapContributor.create({
      data: {
        mindMapId: id,
        userId: validatedData.userId,
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
      'CONTRIBUTOR_ADDED',
      {
        contributorId: validatedData.userId,
        permission: validatedData.permission
      }
    )

    return NextResponse.json({
      success: true,
      data: contributor as ContributorResponse,
      message: 'Contributor added successfully'
    })
  } catch (error) {
    console.error('Error adding contributor:', error)

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
      { success: false, error: 'Failed to add contributor' },
      { status: 500 }
    )
  }
}
