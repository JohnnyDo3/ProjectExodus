import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'
import { LearningGameConfig, GameState, GameResults, calculateStars, getPassingScoreForLevel, LearningLevel } from '@/types/learning'

// POST /api/learning/[progressId]/game
// Start a new game session
export async function POST(
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

    // Get user progress
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId },
      include: {
        article: {
          include: {
            levelContents: {
              where: { level: undefined } // Will be filtered below
            }
          }
        }
      }
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

    // Get level content
    const levelContent = await prisma.moduleLevelContent.findUnique({
      where: {
        articleId_level: {
          articleId: progress.articleId,
          level: progress.selectedLevel
        }
      }
    })

    if (!levelContent) {
      return NextResponse.json(
        { success: false, error: 'Level content not found' },
        { status: 404 }
      )
    }

    const gameConfig = levelContent.learningGame as LearningGameConfig

    // Create new game session
    const gameSession = await prisma.gameSession.create({
      data: {
        progressId,
        totalRounds: gameConfig.totalRounds,
        lives: gameConfig.livesCount,
        maxLives: gameConfig.livesCount
      }
    })

    const initialState: GameState = {
      sessionId: gameSession.id,
      currentRound: 0,
      totalRounds: gameConfig.totalRounds,
      lives: gameConfig.livesCount,
      maxLives: gameConfig.livesCount,
      score: 0,
      streak: 0,
      maxStreak: 0,
      timeStarted: Date.now(),
      answers: []
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: gameSession.id,
        gameConfig,
        initialState
      }
    })

  } catch (error) {
    console.error('Error starting game:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to start game' },
      { status: 500 }
    )
  }
}

// GET /api/learning/[progressId]/game
// Get current game state
export async function GET(
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

    // Get progress and active game session
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId },
      include: {
        gameSessions: {
          where: { completed: false },
          orderBy: { startedAt: 'desc' },
          take: 1
        }
      }
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

    const activeSession = progress.gameSessions[0]

    if (!activeSession) {
      return NextResponse.json({
        success: true,
        data: {
          hasActiveSession: false,
          bestScore: progress.gameHighScore,
          bestStars: progress.gameStars,
          passed: progress.gamePassed
        }
      })
    }

    const gameState: GameState = {
      sessionId: activeSession.id,
      currentRound: activeSession.currentRound,
      totalRounds: activeSession.totalRounds,
      lives: activeSession.lives,
      maxLives: activeSession.maxLives,
      score: activeSession.score,
      streak: activeSession.streak,
      maxStreak: activeSession.maxStreak,
      timeStarted: activeSession.startedAt.getTime(),
      answers: (activeSession.answers as GameState['answers']) || []
    }

    return NextResponse.json({
      success: true,
      data: {
        hasActiveSession: true,
        gameState,
        bestScore: progress.gameHighScore,
        bestStars: progress.gameStars,
        passed: progress.gamePassed
      }
    })

  } catch (error) {
    console.error('Error getting game state:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get game state' },
      { status: 500 }
    )
  }
}
