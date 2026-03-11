import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'
import {
  LearningGameConfig,
  GameState,
  GameResults,
  GameRoundResult,
  calculateStars,
  getPassingScoreForLevel,
  LearningLevel
} from '@/types/learning'
import { incrementStockScore, STOCK_POINTS } from '@/lib/stockScore'

// POST /api/learning/[progressId]/game/answer
// Submit an answer for the current round
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
    const body = await request.json()
    const { sessionId, roundId, answer, timeTaken } = body

    if (!sessionId || !roundId || answer === undefined) {
      return NextResponse.json(
        { success: false, error: 'Session ID, round ID, and answer are required' },
        { status: 400 }
      )
    }

    // Get progress and game session
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId },
      include: {
        gameSessions: {
          where: { id: sessionId }
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

    const gameSession = progress.gameSessions[0]
    if (!gameSession) {
      return NextResponse.json(
        { success: false, error: 'Game session not found' },
        { status: 404 }
      )
    }

    if (gameSession.completed) {
      return NextResponse.json(
        { success: false, error: 'Game session already completed' },
        { status: 400 }
      )
    }

    // Get level content for game config
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
    const currentRound = gameConfig.rounds[gameSession.currentRound]

    if (!currentRound || currentRound.id !== roundId) {
      return NextResponse.json(
        { success: false, error: 'Invalid round' },
        { status: 400 }
      )
    }

    // Check answer
    const isCorrect = Array.isArray(currentRound.correctAnswer)
      ? Array.isArray(answer) &&
        answer.length === currentRound.correctAnswer.length &&
        answer.every((a, i) => a === currentRound.correctAnswer[i])
      : answer === currentRound.correctAnswer

    // Calculate points
    let pointsEarned = 0
    let timeBonus = 0

    if (isCorrect) {
      pointsEarned = currentRound.points

      // Streak bonus
      const newStreak = gameSession.streak + 1
      if (newStreak > 1) {
        pointsEarned += Math.floor(currentRound.points * (newStreak - 1) * gameConfig.streakMultiplier * 0.1)
      }

      // Time bonus
      if (gameConfig.timeBonusEnabled && timeTaken && currentRound.timeLimit) {
        const timeRemaining = currentRound.timeLimit - timeTaken
        if (timeRemaining > 0) {
          timeBonus = Math.floor(timeRemaining * gameConfig.timeBonusPointsPerSecond)
          pointsEarned += timeBonus
        }
      }
    }

    // Update game state
    const newScore = gameSession.score + pointsEarned
    const newStreak = isCorrect ? gameSession.streak + 1 : 0
    const newMaxStreak = Math.max(gameSession.maxStreak, newStreak)
    const newLives = isCorrect ? gameSession.lives : gameSession.lives - 1
    const newRound = gameSession.currentRound + 1

    // Record this answer
    const roundResult: GameRoundResult = {
      roundId,
      userAnswer: answer,
      isCorrect,
      pointsEarned,
      timeBonus,
      timeTaken: timeTaken || 0
    }

    const existingAnswers = (gameSession.answers as GameRoundResult[]) || []
    const updatedAnswers = [...existingAnswers, roundResult]

    // Check if game is over
    const isLastRound = newRound >= gameConfig.totalRounds
    const isOutOfLives = newLives <= 0
    const isGameOver = isLastRound || isOutOfLives

    // Update game session
    await prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        currentRound: newRound,
        score: newScore,
        streak: newStreak,
        maxStreak: newMaxStreak,
        lives: newLives,
        answers: updatedAnswers,
        completed: isGameOver,
        completedAt: isGameOver ? new Date() : undefined,
        finalScore: isGameOver ? newScore : undefined,
        passed: isGameOver ? newScore >= calculatePassingScore(gameConfig, progress.selectedLevel as LearningLevel) : undefined,
        starsEarned: isGameOver ? calculateStars(newScore, calculateMaxScore(gameConfig), gameConfig.starThresholds) : undefined,
        timeTaken: isGameOver ? Math.floor((Date.now() - gameSession.startedAt.getTime()) / 1000) : undefined
      }
    })

    // Prepare response
    const newState: GameState = {
      sessionId,
      currentRound: newRound,
      totalRounds: gameConfig.totalRounds,
      lives: newLives,
      maxLives: gameSession.maxLives,
      score: newScore,
      streak: newStreak,
      maxStreak: newMaxStreak,
      timeStarted: gameSession.startedAt.getTime(),
      answers: updatedAnswers
    }

    let results: GameResults | undefined

    if (isGameOver) {
      const maxPossibleScore = calculateMaxScore(gameConfig)
      const percentage = Math.round((newScore / maxPossibleScore) * 100)
      const stars = calculateStars(newScore, maxPossibleScore, gameConfig.starThresholds)
      const passed = percentage >= getPassingScoreForLevel(progress.selectedLevel as LearningLevel)

      results = {
        sessionId,
        finalScore: newScore,
        maxPossibleScore,
        percentage,
        stars,
        passed,
        correctAnswers: updatedAnswers.filter((a: GameRoundResult) => a.isCorrect).length,
        totalRounds: updatedAnswers.length,
        longestStreak: newMaxStreak,
        totalTimeTaken: Math.floor((Date.now() - gameSession.startedAt.getTime()) / 1000),
        roundResults: updatedAnswers
      }

      // Update user progress if this is the best score
      if (!progress.gameHighScore || newScore > progress.gameHighScore) {
        await prisma.userLearningProgress.update({
          where: { id: progressId },
          data: {
            gameHighScore: newScore,
            gameStars: stars,
            gamePassed: passed || progress.gamePassed,
            status: passed ? 'COMPLETED' : progress.status,
            completedAt: passed && !progress.completedAt ? new Date() : progress.completedAt
          }
        })
      } else if (passed && !progress.gamePassed) {
        // User passed but didn't beat high score
        await prisma.userLearningProgress.update({
          where: { id: progressId },
          data: {
            gamePassed: true,
            status: 'COMPLETED',
            completedAt: progress.completedAt || new Date()
          }
        })
      }

      // Award stock points when game is passed for the first time
      if (passed && !progress.gamePassed) {
        incrementStockScore(session.user.id, STOCK_POINTS.MODULE_COMPLETED).catch(() => {})
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        isCorrect,
        correctAnswer: currentRound.correctAnswer,
        explanation: currentRound.explanation,
        pointsEarned,
        timeBonus,
        newState,
        isGameOver,
        results
      }
    })

  } catch (error) {
    console.error('Error submitting game answer:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit answer' },
      { status: 500 }
    )
  }
}

function calculateMaxScore(gameConfig: LearningGameConfig): number {
  // Base points for all rounds + theoretical max streak bonus
  let maxScore = 0
  let streak = 0

  for (const round of gameConfig.rounds) {
    streak++
    let roundScore = round.points
    if (streak > 1) {
      roundScore += Math.floor(round.points * (streak - 1) * gameConfig.streakMultiplier * 0.1)
    }
    // Add max time bonus if enabled
    if (gameConfig.timeBonusEnabled && round.timeLimit) {
      roundScore += Math.floor(round.timeLimit * gameConfig.timeBonusPointsPerSecond)
    }
    maxScore += roundScore
  }

  return maxScore
}

function calculatePassingScore(gameConfig: LearningGameConfig, level: LearningLevel): number {
  const maxScore = calculateMaxScore(gameConfig)
  const passingPercentage = getPassingScoreForLevel(level, gameConfig.passingScore)
  return Math.floor(maxScore * (passingPercentage / 100))
}
