import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// POST /api/architecture/games - Save a completed game session
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const {
      gameMode,
      learningPath = 'RANDOM',
      questionCount,
      correctAnswers,
      incorrectAnswers,
      totalTimeMs,
      score,
      maxStreak,
      accuracy,
      xpEarned,
      beatPersonalBest,
      previousBestTime,
      questionTimes,
      diagramStructureId,
      comparisonSetIds,
      periodFilters = [],
      regionFilters = [],
      categoryFilters = [],
    } = data

    // Get or create user's architecture progress
    let progress = await prisma.architectureProgress.findUnique({
      where: { userId: session.user.id },
    })

    if (!progress) {
      progress = await prisma.architectureProgress.create({
        data: {
          userId: session.user.id,
          preferredGameMode: gameMode,
        },
      })
    }

    // Create the game session
    const gameSession = await prisma.architectureGameSession.create({
      data: {
        progressId: progress.id,
        userId: session.user.id,
        gameMode,
        learningPath,
        questionCount,
        correctAnswers,
        incorrectAnswers,
        score: score || 0,
        maxStreak: maxStreak || 0,
        perfectScore: correctAnswers === questionCount,
        totalTimeMs,
        accuracy,
        xpEarned: xpEarned || 0,
        beatPersonalBest: beatPersonalBest || false,
        previousBestTime,
        questionTimes: questionTimes || [],
        diagramStructureId,
        comparisonSetIds: comparisonSetIds || [],
        periodFilters,
        regionFilters,
        categoryFilters,
        completedAt: new Date(),
      },
    })

    // Update overall progress stats
    await prisma.architectureProgress.update({
      where: { id: progress.id },
      data: {
        totalGamesPlayed: { increment: 1 },
        totalQuestionsAnswered: { increment: questionCount },
        totalCorrectAnswers: { increment: correctAnswers },
        totalTimeSpent: { increment: Math.floor(totalTimeMs / 1000) },
        totalXp: { increment: xpEarned || 0 },
        overallAccuracy: {
          set:
            ((progress.totalCorrectAnswers + correctAnswers) /
              (progress.totalQuestionsAnswered + questionCount)) *
            100,
        },
      },
    })

    // Update personal best if applicable
    if (beatPersonalBest && totalTimeMs) {
      await prisma.architectureProgress.update({
        where: { id: progress.id },
        data: { personalBestTime: totalTimeMs },
      })
    }

    // Update or create streak
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let streak = await prisma.architectureStreak.findUnique({
      where: { progressId: progress.id },
    })

    if (!streak) {
      streak = await prisma.architectureStreak.create({
        data: {
          progressId: progress.id,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate: new Date(),
          streakStartDate: new Date(),
          daysActiveThisWeek: 1,
          gamesThisWeek: 1,
        },
      })
    } else {
      const lastActivity = streak.lastActivityDate
        ? new Date(streak.lastActivityDate)
        : null
      lastActivity?.setHours(0, 0, 0, 0)

      let newStreak = streak.currentStreak
      if (lastActivity && lastActivity.getTime() === today.getTime()) {
        // Same day, don't increment streak
        newStreak = streak.currentStreak
      } else if (
        lastActivity &&
        lastActivity.getTime() === today.getTime() - 24 * 60 * 60 * 1000
      ) {
        // Yesterday, increment streak
        newStreak = streak.currentStreak + 1
      } else {
        // Streak broken, start new
        newStreak = 1
      }

      await prisma.architectureStreak.update({
        where: { id: streak.id },
        data: {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, streak.longestStreak),
          lastActivityDate: new Date(),
          gamesThisWeek: { increment: 1 },
        },
      })
    }

    return NextResponse.json({
      success: true,
      gameSession,
      progress: await prisma.architectureProgress.findUnique({
        where: { id: progress.id },
        include: { streak: true },
      }),
    })
  } catch (error) {
    console.error('Error saving game session:', error)
    return NextResponse.json(
      { error: 'Failed to save game session' },
      { status: 500 }
    )
  }
}

// GET /api/architecture/games - Get user's game history
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const gameMode = searchParams.get('gameMode')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = { userId: session.user.id }
    if (gameMode) {
      where.gameMode = gameMode
    }

    const [games, total] = await Promise.all([
      prisma.architectureGameSession.findMany({
        where,
        orderBy: { startedAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.architectureGameSession.count({ where }),
    ])

    return NextResponse.json({ games, total })
  } catch (error) {
    console.error('Error fetching game history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch game history' },
      { status: 500 }
    )
  }
}
