import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || !['ADMIN', 'SUPER_ADMIN', 'MODERATOR'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30' // days
    const daysBack = parseInt(range)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)
    startDate.setHours(0, 0, 0, 0)

    // Get user signups over time
    const users = await prisma.user.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true }
    })

    // Group by day
    const usersByDay: Record<string, number> = {}
    users.forEach((u: { createdAt: Date }) => {
      const day = u.createdAt.toISOString().split('T')[0]
      usersByDay[day] = (usersByDay[day] || 0) + 1
    })

    // Get content created over time
    const [articles, products, projects] = await Promise.all([
      prisma.article.findMany({
        where: { createdAt: { gte: startDate } },
        select: { createdAt: true, published: true }
      }),
      prisma.userProduct.findMany({
        where: { createdAt: { gte: startDate } },
        select: { createdAt: true, approvalStatus: true }
      }),
      prisma.project.findMany({
        where: { createdAt: { gte: startDate } },
        select: { createdAt: true }
      })
    ])

    // Group content by day
    const contentByDay: Record<string, { articles: number; products: number; projects: number }> = {}
    const initDay = (day: string) => {
      if (!contentByDay[day]) {
        contentByDay[day] = { articles: 0, products: 0, projects: 0 }
      }
    }

    articles.forEach((a: { createdAt: Date }) => {
      const day = a.createdAt.toISOString().split('T')[0]
      initDay(day)
      contentByDay[day].articles++
    })

    products.forEach((p: { createdAt: Date }) => {
      const day = p.createdAt.toISOString().split('T')[0]
      initDay(day)
      contentByDay[day].products++
    })

    projects.forEach((p: { createdAt: Date }) => {
      const day = p.createdAt.toISOString().split('T')[0]
      initDay(day)
      contentByDay[day].projects++
    })

    // Get user roles distribution
    const roleDistribution = await prisma.user.groupBy({
      by: ['role'],
      _count: { role: true }
    })

    // Get top viewed articles
    const topArticles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { views: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        views: true,
        author: { select: { name: true } }
      }
    })

    // Get report statistics
    const reportStats = await prisma.report.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    // Calculate averages and totals
    const totalUsers = await prisma.user.count()
    const totalArticles = await prisma.article.count()
    const totalProducts = await prisma.userProduct.count()
    const totalProjects = await prisma.project.count()

    // Get engagement metrics (article reads in date range)
    const articleReads = await prisma.articleRead.count({
      where: { createdAt: { gte: startDate } }
    })

    // Generate date array for charts
    const dates: string[] = []
    for (let i = 0; i <= daysBack; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }

    // Format user signups for chart
    const userSignupsData = dates.map(date => ({
      date,
      signups: usersByDay[date] || 0
    }))

    // Calculate cumulative users
    let cumulative = totalUsers - users.length
    const cumulativeUsersData = userSignupsData.map(d => {
      cumulative += d.signups
      return { date: d.date, total: cumulative }
    })

    // Format content for chart
    const contentData = dates.map(date => ({
      date,
      articles: contentByDay[date]?.articles || 0,
      products: contentByDay[date]?.products || 0,
      projects: contentByDay[date]?.projects || 0
    }))

    // Format role distribution
    const rolesData = roleDistribution.map((r: { role: string; _count: { role: number } }) => ({
      role: r.role,
      count: r._count.role
    }))

    // Report resolution stats
    const reportsData = reportStats.map((r: { status: string; _count: { status: number } }) => ({
      status: r.status,
      count: r._count.status
    }))

    return NextResponse.json({
      summary: {
        totalUsers,
        totalArticles,
        totalProducts,
        totalProjects,
        newUsersInRange: users.length,
        articleReadsInRange: articleReads
      },
      charts: {
        userSignups: userSignupsData,
        cumulativeUsers: cumulativeUsersData,
        content: contentData,
        roleDistribution: rolesData,
        reportStatus: reportsData,
        topArticles: topArticles.map((a: { title: string; views: number; author: { name: string | null } }) => ({
          title: a.title.length > 40 ? a.title.substring(0, 40) + '...' : a.title,
          views: a.views,
          author: a.author.name || 'Unknown'
        }))
      }
    })
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
