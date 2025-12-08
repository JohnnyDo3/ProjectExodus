import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Mark alert as read
    await prisma.adminAlert.update({
      where: { id },
      data: { read: true }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to mark alert as read:', error)
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    )
  }
}
