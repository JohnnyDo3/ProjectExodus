import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'
import { LearningLevel, LEARNING_LEVELS, LevelContent } from '@/types/learning'
import { ActivityProgress } from '@prisma/client'

// GET /api/learning/modules/[articleId]/levels/[level]
// Get level-specific content for a module
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string; level: string }> }
) {
  try {
    const { articleId, level } = await params

    // Validate level
    const levelUpper = level.toUpperCase() as LearningLevel
    if (!LEARNING_LEVELS[levelUpper]) {
      return NextResponse.json(
        { success: false, error: 'Invalid learning level' },
        { status: 400 }
      )
    }

    // Get the level content
    const levelContent = await prisma.moduleLevelContent.findUnique({
      where: {
        articleId_level: {
          articleId,
          level: levelUpper
        }
      },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            moduleType: true
          }
        }
      }
    })

    if (!levelContent) {
      return NextResponse.json(
        { success: false, error: 'Content not available for this level' },
        { status: 404 }
      )
    }

    // Get user progress if authenticated
    const session = await auth()
    let userProgress = null

    if (session?.user?.id) {
      userProgress = await prisma.userLearningProgress.findUnique({
        where: {
          userId_articleId_selectedLevel: {
            userId: session.user.id,
            articleId,
            selectedLevel: levelUpper
          }
        },
        include: {
          activityProgress: true,
          gameSessions: {
            where: { completed: true },
            orderBy: { finalScore: 'desc' },
            take: 1
          }
        }
      })
    }

    // Parse JSON fields
    const content: LevelContent = {
      level: levelUpper,
      introduction: levelContent.introduction,
      sections: levelContent.sections as LevelContent['sections'],
      summary: levelContent.summary,
      objectives: levelContent.objectives as string[],
      keyTerms: levelContent.keyTerms as LevelContent['keyTerms'],
      activities: levelContent.activities as LevelContent['activities'],
      learningGame: levelContent.learningGame as LevelContent['learningGame'],
      estimatedMinutes: levelContent.estimatedMinutes,
      readingLevel: levelContent.readingLevel || undefined
    }

    return NextResponse.json({
      success: true,
      data: {
        module: levelContent.article,
        content,
        levelMeta: LEARNING_LEVELS[levelUpper],
        userProgress: userProgress ? {
          id: userProgress.id,
          status: userProgress.status,
          progressPercentage: userProgress.progressPercentage,
          currentSectionId: userProgress.currentSectionId,
          completedActivities: userProgress.activityProgress
            .filter((ap: ActivityProgress) => ap.completed)
            .map((ap: ActivityProgress) => ap.activityId),
          gameHighScore: userProgress.gameHighScore,
          gameStars: userProgress.gameStars,
          gamePassed: userProgress.gamePassed
        } : null
      }
    })

  } catch (error) {
    console.error('Error fetching level content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch level content' },
      { status: 500 }
    )
  }
}
