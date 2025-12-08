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

    const canView = await hasPermission(session.user.id, 'reports.view')
    if (!canView) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') // PENDING, REVIEWING, RESOLVED, DISMISSED
    const contentType = searchParams.get('contentType') // user, product, article, comment
    const priority = searchParams.get('priority') // LOW, MEDIUM, HIGH, CRITICAL
    const assignedToMe = searchParams.get('assignedToMe') === 'true'

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (contentType) {
      where.contentType = contentType
    }

    if (priority) {
      where.priority = priority
    }

    if (assignedToMe) {
      where.assignedToId = session.user.id
    }

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: [
          { status: 'asc' }, // PENDING first
          { priority: 'desc' }, // High priority first
          { createdAt: 'desc' },
        ],
        include: {
          reporter: {
            select: { id: true, name: true, email: true, image: true }
          },
          assignedTo: {
            select: { id: true, name: true, email: true, image: true }
          },
          resolvedBy: {
            select: { id: true, name: true, image: true }
          }
        }
      }),
      prisma.report.count({ where })
    ])

    // Get stats
    const [pendingCount, reviewingCount, resolvedToday] = await Promise.all([
      prisma.report.count({ where: { status: 'PENDING' } }),
      prisma.report.count({ where: { status: 'REVIEWING' } }),
      prisma.report.count({
        where: {
          status: { in: ['RESOLVED', 'DISMISSED'] },
          resolvedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      })
    ])

    return NextResponse.json({
      reports,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        pending: pendingCount,
        reviewing: reviewingCount,
        resolvedToday
      }
    })
  } catch (error) {
    console.error('Failed to fetch reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

// Create a new report (internal use or public report submission)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { contentType, contentId, reason, priority } = body

    if (!contentType || !contentId || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if already reported by this user
    const existingReport = await prisma.report.findFirst({
      where: {
        contentType,
        contentId,
        reporterId: session.user.id,
        status: { in: ['PENDING', 'REVIEWING'] }
      }
    })

    if (existingReport) {
      return NextResponse.json(
        { error: 'You have already reported this content' },
        { status: 400 }
      )
    }

    const report = await prisma.report.create({
      data: {
        contentType,
        contentId,
        reason,
        priority: priority || 'MEDIUM',
        reporterId: session.user.id,
      }
    })

    return NextResponse.json({ success: true, report })
  } catch (error) {
    console.error('Failed to create report:', error)
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    )
  }
}
