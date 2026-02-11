import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// GET - Get user's project notifications
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')

    const whereClause: any = {
      projectId,
      userId: session.user.id,
    }

    if (unreadOnly) {
      whereClause.read = false
    }

    const notifications = await prisma.projectNotification.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    // Get unread count
    const unreadCount = await prisma.projectNotification.count({
      where: {
        projectId,
        userId: session.user.id,
        read: false,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        notifications,
        unreadCount,
      },
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// PUT - Mark notifications as read
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params
    const body = await request.json()
    const { notificationIds, markAllRead } = body

    if (markAllRead) {
      // Mark all notifications as read
      await prisma.projectNotification.updateMany({
        where: {
          projectId,
          userId: session.user.id,
          read: false,
        },
        data: { read: true },
      })

      return NextResponse.json({
        success: true,
        message: 'All notifications marked as read',
      })
    }

    if (notificationIds && notificationIds.length > 0) {
      // Mark specific notifications as read
      await prisma.projectNotification.updateMany({
        where: {
          id: { in: notificationIds },
          projectId,
          userId: session.user.id,
        },
        data: { read: true },
      })

      return NextResponse.json({
        success: true,
        message: 'Notifications marked as read',
      })
    }

    return NextResponse.json(
      { success: false, error: 'No notifications specified' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update notifications' },
      { status: 500 }
    )
  }
}

// DELETE - Clear old notifications
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params
    const { searchParams } = new URL(request.url)
    const clearAll = searchParams.get('clearAll') === 'true'

    if (clearAll) {
      // Delete all read notifications older than 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      await prisma.projectNotification.deleteMany({
        where: {
          projectId,
          userId: session.user.id,
          read: true,
          createdAt: { lt: thirtyDaysAgo },
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Old notifications cleared',
      })
    }

    return NextResponse.json(
      { success: false, error: 'No action specified' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error deleting notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete notifications' },
      { status: 500 }
    )
  }
}
