import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

/**
 * PATCH /api/learning/[progressId]/update
 * Update learning progress (tab navigation, percentage)
 * Auto-saves as user navigates through tabs
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ progressId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { progressId } = await params
    const body = await request.json()
    const { currentTabIndex, progressPercentage } = body

    // Verify ownership
    const existing = await prisma.userLearningProgress.findUnique({
      where: { id: progressId },
      include: {
        article: {
          select: {
            moduleTabs: true,
          },
        },
      },
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Progress record not found' },
        { status: 404 }
      )
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Calculate progress percentage if not provided
    let calculatedProgress = progressPercentage
    if (currentTabIndex !== undefined && !progressPercentage) {
      const moduleTabs = existing.article.moduleTabs as any[]
      if (moduleTabs && moduleTabs.length > 0) {
        calculatedProgress = Math.round(((currentTabIndex + 1) / moduleTabs.length) * 100)
      }
    }

    // Update progress
    const updated = await prisma.userLearningProgress.update({
      where: { id: progressId },
      data: {
        ...(currentTabIndex !== undefined && { currentTabIndex }),
        ...(calculatedProgress !== undefined && { progressPercentage: calculatedProgress }),
        lastAccessedAt: new Date(),
      },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true,
            moduleType: true,
            moduleTabs: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    console.error('Error updating learning progress:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
