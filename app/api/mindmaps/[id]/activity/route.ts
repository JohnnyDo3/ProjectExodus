/**
 * Mind Map Activity API - GET
 *
 * /api/mindmaps/[id]/activity
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import {
  type ApiResponse,
  type ActivityResponse,
  type PaginatedResponse,
  NotFoundError,
  UnauthorizedError
} from '@/lib/types/mindmap'
import { assertMindMapAccess } from '@/lib/mindmap/permissions'

/**
 * GET /api/mindmaps/[id]/activity - Get activity log
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<PaginatedResponse<ActivityResponse>>>> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new UnauthorizedError('Please sign in to view activity')
    }

    await assertMindMapAccess(params.id, session.user.id, 'VIEW')

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const type = searchParams.get('type')
    const userId = searchParams.get('userId')

    // Build where clause
    const where: any = {
      mindMapId: params.id
    }

    if (type) where.type = type
    if (userId) where.userId = userId

    // Get total count
    const total = await prisma.mindMapActivity.count({ where })

    // Get activities with pagination
    const activities = await prisma.mindMapActivity.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
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
        data: activities as ActivityResponse[],
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
    console.error('Error fetching activity:', error)

    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch activity' },
      { status: 500 }
    )
  }
}
