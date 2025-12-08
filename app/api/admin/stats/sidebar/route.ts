import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

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

    // Get counts for sidebar badges
    const [pendingProducts, openReports] = await Promise.all([
      prisma.userProduct.count({
        where: { approvalStatus: 'PENDING' }
      }),
      prisma.report.count({
        where: { status: { in: ['PENDING', 'REVIEWING'] } }
      })
    ])

    return NextResponse.json({
      pendingProducts,
      openReports
    })
  } catch (error) {
    console.error('Failed to fetch sidebar stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
