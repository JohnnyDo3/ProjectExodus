import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { hasPermission } from '@/lib/permissions'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canView = await hasPermission(session.user.id, 'audit.view')
    if (!canView) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const action = searchParams.get('action') // Filter by action type
    const userId = searchParams.get('userId') // Filter by admin user
    const targetType = searchParams.get('targetType') // Filter by target type
    const search = searchParams.get('search') // Search in description
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {}

    if (action) {
      where.action = action
    }

    if (userId) {
      where.userId = userId
    }

    if (targetType) {
      where.metadata = {
        path: ['targetType'],
        equals: targetType
      }
    }

    if (search) {
      where.description = {
        contains: search,
        mode: 'insensitive'
      }
    }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate + 'T23:59:59.999Z')
      }
    }

    const [logs, total] = await Promise.all([
      prisma.adminLog.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true
            }
          }
        }
      }),
      prisma.adminLog.count({ where })
    ])

    // Get action type stats
    const actionStats = await prisma.adminLog.groupBy({
      by: ['action'],
      _count: { action: true },
      orderBy: { _count: { action: 'desc' } },
      take: 10
    })

    // Get admin users for filter dropdown
    const adminUsers = await prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'SUPER_ADMIN', 'MODERATOR'] }
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      actionStats: actionStats.map((s: { action: string; _count: { action: number } }) => ({
        action: s.action,
        count: s._count.action
      })),
      adminUsers
    })
  } catch (error) {
    console.error('Failed to fetch audit logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    )
  }
}
