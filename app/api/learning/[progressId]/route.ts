import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

/**
 * DELETE /api/learning/[progressId]
 * Remove a module from user's learning list
 */
export async function DELETE(
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

    // Verify ownership
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId },
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

    // Delete progress record
    await prisma.userLearningProgress.delete({
      where: { id: progressId },
    })

    return NextResponse.json({
      success: true,
      message: 'Module removed from your learning list',
    })
  } catch (error) {
    console.error('Error deleting learning progress:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
