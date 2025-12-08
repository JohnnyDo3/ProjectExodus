import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { generateCSV, userColumns, productColumns, articleColumns, auditLogColumns, reportColumns } from '@/lib/exports'

export async function POST(request: NextRequest) {
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

    if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { type, format, filters = {} } = body

    if (!type || !format) {
      return NextResponse.json(
        { error: 'Missing type or format' },
        { status: 400 }
      )
    }

    let data: any[] = []
    let columns: any[] = []
    let filename = ''

    switch (type) {
      case 'users': {
        const where: any = {}
        if (filters.role) where.role = filters.role
        if (filters.search) {
          where.OR = [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { email: { contains: filters.search, mode: 'insensitive' } }
          ]
        }

        const users = await prisma.user.findMany({
          where,
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10000
        })

        // Add status based on ban status
        const userBans = await prisma.userBan.findMany({
          where: {
            userId: { in: users.map((u: { id: string }) => u.id) },
            active: true
          },
          select: { userId: true }
        })
        const bannedUserIds = new Set(userBans.map((b: { userId: string }) => b.userId))

        data = users.map((u: { id: string; name: string | null; email: string | null; role: string; createdAt: Date }) => ({
          ...u,
          status: bannedUserIds.has(u.id) ? 'Banned' : 'Active'
        }))
        columns = userColumns
        filename = `users-export-${new Date().toISOString().split('T')[0]}`
        break
      }

      case 'products': {
        const where: any = {}
        if (filters.status) where.approvalStatus = filters.status

        const products = await prisma.userProduct.findMany({
          where,
          select: {
            id: true,
            name: true,
            price: true,
            category: true,
            approvalStatus: true,
            createdAt: true,
            seller: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10000
        })

        data = products
        columns = productColumns
        filename = `products-export-${new Date().toISOString().split('T')[0]}`
        break
      }

      case 'articles': {
        const where: any = {}
        if (filters.published !== undefined) where.published = filters.published

        const articles = await prisma.article.findMany({
          where,
          select: {
            id: true,
            title: true,
            published: true,
            views: true,
            createdAt: true,
            author: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10000
        })

        data = articles
        columns = articleColumns
        filename = `articles-export-${new Date().toISOString().split('T')[0]}`
        break
      }

      case 'audit': {
        const where: any = {}
        if (filters.action) where.action = filters.action
        if (filters.userId) where.userId = filters.userId
        if (filters.startDate) {
          where.createdAt = { ...where.createdAt, gte: new Date(filters.startDate) }
        }
        if (filters.endDate) {
          where.createdAt = { ...where.createdAt, lte: new Date(filters.endDate + 'T23:59:59.999Z') }
        }

        const logs = await prisma.adminLog.findMany({
          where,
          select: {
            id: true,
            action: true,
            description: true,
            metadata: true,
            createdAt: true,
            user: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10000
        })

        data = logs
        columns = auditLogColumns
        filename = `audit-log-${new Date().toISOString().split('T')[0]}`
        break
      }

      case 'reports': {
        const where: any = {}
        if (filters.status) where.status = filters.status
        if (filters.priority) where.priority = filters.priority

        const reports = await prisma.report.findMany({
          where,
          select: {
            id: true,
            contentType: true,
            contentId: true,
            reason: true,
            status: true,
            priority: true,
            createdAt: true,
            resolvedAt: true,
            reporter: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10000
        })

        data = reports
        columns = reportColumns
        filename = `reports-export-${new Date().toISOString().split('T')[0]}`
        break
      }

      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        )
    }

    if (format === 'csv') {
      const csv = generateCSV(data, columns)
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}.csv"`,
        },
      })
    }

    // For JSON export (can be used for debugging or other purposes)
    if (format === 'json') {
      return NextResponse.json({
        data,
        count: data.length,
        filename
      })
    }

    return NextResponse.json(
      { error: 'Invalid format. Use csv or json.' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Export failed:', error)
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    )
  }
}
