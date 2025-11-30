import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

/**
 * PATCH /api/learning/[progressId]/mark-read
 * Mark small learning module as read/completed
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

    // Verify ownership and module type
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId },
      include: {
        article: {
          select: {
            moduleType: true,
          },
        },
      },
    })

    if (!progress) {
      return NextResponse.json(
        { success: false, error: 'Progress record not found' },
        { status: 404 }
      )
    }

    if (progress.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    if (progress.article.moduleType !== 'SMALL') {
      return NextResponse.json(
        { success: false, error: 'This is not a small module. Use quiz completion instead.' },
        { status: 400 }
      )
    }

    // Mark as completed
    const updated = await prisma.userLearningProgress.update({
      where: { id: progressId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        progressPercentage: 100,
      },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: updated,
      message: '✓ Module marked as read',
    })
  } catch (error) {
    console.error('Error marking module as read:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
