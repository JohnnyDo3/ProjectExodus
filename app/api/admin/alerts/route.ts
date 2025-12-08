import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
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

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN' && user.role !== 'MODERATOR')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const unreadOnly = searchParams.get('unread') === 'true'

    const where: any = {
      OR: [
        { userId: session.user.id },
        { userId: null } // Alerts for all admins
      ]
    }

    if (unreadOnly) {
      where.read = false
    }

    const alerts = await prisma.adminAlert.findMany({
      where,
      take: limit,
      orderBy: [
        { read: 'asc' },
        { priority: 'desc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        type: true,
        priority: true,
        title: true,
        message: true,
        link: true,
        read: true,
        createdAt: true,
      }
    })

    const unreadCount = await prisma.adminAlert.count({
      where: {
        ...where,
        read: false
      }
    })

    return NextResponse.json({
      alerts,
      unreadCount
    })
  } catch (error) {
    console.error('Failed to fetch admin alerts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}
