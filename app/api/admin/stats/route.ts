import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { subDays, startOfDay, endOfDay } from 'date-fns'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const now = new Date()
    const weekAgo = subDays(now, 7)
    const monthAgo = subDays(now, 30)

    // Fetch all stats in parallel
    const [
      // User stats
      totalUsers,
      newUsersThisWeek,
      usersByRole,

      // Product stats
      totalProducts,
      pendingProducts,
      approvedProducts,
      rejectedProducts,

      // Article stats
      totalArticles,
      publishedArticles,
      draftArticles,

      // Report stats
      openReports,
      resolvedReports,

      // Activity stats
      recentActivity,

      // User signups by day (last 30 days)
      userSignups,

      // Projects
      activeProjects,
    ] = await Promise.all([
      // Users
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: weekAgo } }
      }),
      prisma.user.groupBy({
        by: ['role'],
        _count: true
      }),

      // Products
      prisma.product.count(),
      prisma.userProduct.count({
        where: { approvalStatus: 'PENDING' }
      }),
      prisma.userProduct.count({
        where: { approvalStatus: 'APPROVED' }
      }),
      prisma.userProduct.count({
        where: { approvalStatus: 'REJECTED' }
      }),

      // Articles
      prisma.article.count(),
      prisma.article.count({
        where: { status: 'PUBLISHED' }
      }),
      prisma.article.count({
        where: { status: 'DRAFT' }
      }),

      // Reports
      prisma.report.count({
        where: { status: { in: ['PENDING', 'REVIEWING'] } }
      }),
      prisma.report.count({
        where: { status: { in: ['RESOLVED', 'DISMISSED'] } }
      }),

      // Recent admin activity
      prisma.adminLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, image: true }
          }
        }
      }),

      // User signups by day
      prisma.$queryRaw<{ date: Date; count: bigint }[]>`
        SELECT DATE(created_at) as date, COUNT(*) as count
        FROM users
        WHERE created_at >= ${monthAgo}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `.catch(() => []), // Fallback if query fails

      // Projects
      prisma.project.count({
        where: { status: 'ACTIVE' }
      }),
    ])

    // Transform user signups for chart
    const signupsData = (userSignups as any[]).map(row => ({
      date: row.date,
      count: Number(row.count)
    }))

    // Transform roles count
    const rolesCounts: Record<string, number> = {}
    usersByRole.forEach((r: { role: string; _count: number }) => {
      rolesCounts[r.role] = r._count
    })

    return NextResponse.json({
      users: {
        total: totalUsers,
        newThisWeek: newUsersThisWeek,
        byRole: rolesCounts
      },
      products: {
        total: totalProducts,
        pending: pendingProducts,
        approved: approvedProducts,
        rejected: rejectedProducts
      },
      articles: {
        total: totalArticles,
        published: publishedArticles,
        drafts: draftArticles
      },
      reports: {
        open: openReports,
        resolved: resolvedReports
      },
      projects: {
        active: activeProjects
      },
      activity: {
        recent: recentActivity.map((a: any) => ({
          id: a.id,
          action: a.action,
          description: a.description,
          metadata: a.metadata,
          createdAt: a.createdAt,
          user: a.user
        }))
      },
      charts: {
        userSignups: signupsData
      }
    })
  } catch (error) {
    console.error('Failed to fetch admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
