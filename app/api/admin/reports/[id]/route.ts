import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { hasPermission } from '@/lib/permissions'
import { logReportResolution } from '@/lib/audit'

// Get single report details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canView = await hasPermission(session.user.id, 'reports.view')
    if (!canView) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const report = await prisma.report.findUnique({
      where: { id },
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
    })

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    // Fetch the reported content details
    let reportedContent = null
    try {
      switch (report.contentType) {
        case 'user':
          reportedContent = await prisma.user.findUnique({
            where: { id: report.contentId },
            select: { id: true, name: true, email: true, image: true, bio: true }
          })
          break
        case 'product':
          reportedContent = await prisma.userProduct.findUnique({
            where: { id: report.contentId },
            select: { id: true, name: true, description: true, images: true, seller: { select: { id: true, name: true } } }
          })
          break
        case 'article':
          reportedContent = await prisma.article.findUnique({
            where: { id: report.contentId },
            select: { id: true, title: true, excerpt: true, author: { select: { id: true, name: true } } }
          })
          break
        case 'comment':
          reportedContent = await prisma.comment.findUnique({
            where: { id: report.contentId },
            select: { id: true, content: true, author: { select: { id: true, name: true } } }
          })
          break
        case 'post':
          reportedContent = await prisma.socialPost.findUnique({
            where: { id: report.contentId },
            select: { id: true, content: true, author: { select: { id: true, name: true } } }
          })
          break
      }
    } catch (e) {
      console.error('Failed to fetch reported content:', e)
    }

    return NextResponse.json({ report, reportedContent })
  } catch (error) {
    console.error('Failed to fetch report:', error)
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    )
  }
}

// Update report (assign, change status, resolve)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canResolve = await hasPermission(session.user.id, 'reports.resolve')
    if (!canResolve) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { status, assignedToId, priority, resolutionNote } = body

    const updateData: any = {}

    if (status) {
      updateData.status = status
      if (status === 'RESOLVED' || status === 'DISMISSED') {
        updateData.resolvedAt = new Date()
        updateData.resolvedById = session.user.id
      }
    }

    if (assignedToId !== undefined) {
      updateData.assignedToId = assignedToId || null
      // If being assigned and status is PENDING, move to REVIEWING
      if (assignedToId) {
        const currentReport = await prisma.report.findUnique({
          where: { id },
          select: { status: true }
        })
        if (currentReport?.status === 'PENDING') {
          updateData.status = 'REVIEWING'
        }
      }
    }

    if (priority) {
      updateData.priority = priority
    }

    if (resolutionNote !== undefined) {
      updateData.resolutionNote = resolutionNote
    }

    const report = await prisma.report.update({
      where: { id },
      data: updateData,
      include: {
        reporter: {
          select: { id: true, name: true, email: true, image: true }
        },
        assignedTo: {
          select: { id: true, name: true, email: true, image: true }
        }
      }
    })

    // Log if resolved/dismissed
    if (status === 'RESOLVED' || status === 'DISMISSED') {
      await logReportResolution(
        session.user.id,
        id,
        status === 'RESOLVED' ? 'resolved' : 'dismissed',
        resolutionNote,
        request.headers.get('x-forwarded-for') || undefined
      )
    }

    return NextResponse.json({ success: true, report })
  } catch (error) {
    console.error('Failed to update report:', error)
    return NextResponse.json(
      { error: 'Failed to update report' },
      { status: 500 }
    )
  }
}

// Delete report (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only SUPER_ADMIN can delete reports
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.report.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete report:', error)
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    )
  }
}
