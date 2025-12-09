import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// PATCH /api/learning/[progressId]/level
// Change the selected learning level
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ progressId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { progressId } = await params
    const body = await request.json()
    const { level } = body

    // Validate level
    const levelUpper = level?.toUpperCase() as LearningLevel
    if (!levelUpper || !LEARNING_LEVELS[levelUpper]) {
      return NextResponse.json(
        { success: false, error: 'Invalid learning level' },
        { status: 400 }
      )
    }

    // Get current progress
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId }
    })

    if (!progress) {
      return NextResponse.json(
        { success: false, error: 'Progress record not found' },
        { status: 404 }
      )
    }

    if (progress.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 403 }
      )
    }

    // Check if user already has progress at the new level
    const existingProgress = await prisma.userLearningProgress.findUnique({
      where: {
        userId_articleId_selectedLevel: {
          userId: session.user.id,
          articleId: progress.articleId,
          selectedLevel: levelUpper
        }
      }
    })

    if (existingProgress && existingProgress.id !== progressId) {
      // Return existing progress instead
      return NextResponse.json({
        success: true,
        data: {
          progressId: existingProgress.id,
          selectedLevel: levelUpper,
          isExisting: true,
          progress: existingProgress
        },
        message: 'Switched to existing progress at this level'
      })
    }

    // Check if level content exists
    const levelContent = await prisma.moduleLevelContent.findUnique({
      where: {
        articleId_level: {
          articleId: progress.articleId,
          level: levelUpper
        }
      }
    })

    if (!levelContent) {
      return NextResponse.json(
        { success: false, error: 'Content not available for this level' },
        { status: 400 }
      )
    }

    // Create new progress record at the new level
    const newProgress = await prisma.userLearningProgress.create({
      data: {
        userId: session.user.id,
        articleId: progress.articleId,
        selectedLevel: levelUpper,
        status: 'IN_PROGRESS',
        progressPercentage: 0
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        progressId: newProgress.id,
        selectedLevel: levelUpper,
        isExisting: false,
        progress: newProgress
      },
      message: 'Started learning at new level'
    })

  } catch (error) {
    console.error('Error changing level:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to change level' },
      { status: 500 }
    )
  }
}
