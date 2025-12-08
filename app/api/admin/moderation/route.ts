import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { hasAnyPermission } from '@/lib/permissions'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has any moderation-related permission
    const canModerate = await hasAnyPermission(session.user.id, [
      'products.approve',
      'reports.view',
      'comments.delete',
    ])
    if (!canModerate) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'products', 'reports', 'comments', 'all'
    const limit = parseInt(searchParams.get('limit') || '50')

    const items: any[] = []

    // Fetch pending products
    if (!type || type === 'all' || type === 'products') {
      const pendingProducts = await prisma.userProduct.findMany({
        where: { approvalStatus: 'PENDING' },
        take: type === 'products' ? limit : 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          images: true,
          createdAt: true,
          seller: {
            select: { id: true, name: true, email: true, image: true }
          }
        }
      })

      items.push(...pendingProducts.map((p: any) => ({
        id: p.id,
        type: 'product' as const,
        title: p.name,
        description: p.description.substring(0, 200) + (p.description.length > 200 ? '...' : ''),
        image: p.images?.[0] || null,
        author: p.seller,
        createdAt: p.createdAt,
        priority: 'MEDIUM',
        metadata: { price: p.price }
      })))
    }

    // Fetch pending reports
    if (!type || type === 'all' || type === 'reports') {
      const pendingReports = await prisma.report.findMany({
        where: { status: { in: ['PENDING', 'REVIEWING'] } },
        take: type === 'reports' ? limit : 15,
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' }
        ],
        select: {
          id: true,
          reason: true,
          contentType: true,
          contentId: true,
          priority: true,
          status: true,
          createdAt: true,
          reporter: {
            select: { id: true, name: true, email: true, image: true }
          },
          assignedTo: {
            select: { id: true, name: true, image: true }
          }
        }
      })

      items.push(...pendingReports.map((r: any) => ({
        id: r.id,
        type: 'report' as const,
        title: `${r.contentType.charAt(0).toUpperCase() + r.contentType.slice(1)} Report`,
        description: r.reason.substring(0, 200) + (r.reason.length > 200 ? '...' : ''),
        image: null,
        author: r.reporter,
        createdAt: r.createdAt,
        priority: r.priority,
        status: r.status,
        metadata: {
          contentType: r.contentType,
          contentId: r.contentId,
          assignedTo: r.assignedTo
        }
      })))
    }

    // Fetch flagged comments (if we had a flagged field - simulate with recent comments for now)
    // This could be expanded when comment flagging is implemented

    // Sort all items by priority and date
    const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
    items.sort((a, b) => {
      const priorityDiff = (priorityOrder[a.priority as keyof typeof priorityOrder] || 2) -
                          (priorityOrder[b.priority as keyof typeof priorityOrder] || 2)
      if (priorityDiff !== 0) return priorityDiff
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    // Get counts
    const [pendingProducts, pendingReports, reviewingReports] = await Promise.all([
      prisma.userProduct.count({ where: { approvalStatus: 'PENDING' } }),
      prisma.report.count({ where: { status: 'PENDING' } }),
      prisma.report.count({ where: { status: 'REVIEWING' } }),
    ])

    return NextResponse.json({
      items: items.slice(0, limit),
      counts: {
        products: pendingProducts,
        reports: pendingReports + reviewingReports,
        total: pendingProducts + pendingReports + reviewingReports
      }
    })
  } catch (error) {
    console.error('Failed to fetch moderation queue:', error)
    return NextResponse.json(
      { error: 'Failed to fetch moderation queue' },
      { status: 500 }
    )
  }
}
