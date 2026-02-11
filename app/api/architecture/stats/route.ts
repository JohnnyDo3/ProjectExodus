import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// GET /api/architecture/stats - Get user's overall stats and progress
export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's progress with all relations
    const progress = await prisma.architectureProgress.findUnique({
      where: { userId: session.user.id },
      include: {
        streak: true,
        gameSessions: {
          orderBy: { startedAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!progress) {
      return NextResponse.json({
        progress: null,
        recentGames: [],
        stats: {
          totalGames: 0,
          totalQuestions: 0,
          totalCorrect: 0,
          accuracy: 0,
          totalTime: 0,
          totalXp: 0,
          currentLevel: 1,
          currentStreak: 0,
          longestStreak: 0,
          personalBest: null,
        },
      })
    }

    // Calculate per-game-mode stats
    const gameModeStats = await prisma.architectureGameSession.groupBy({
      by: ['gameMode'],
      where: { userId: session.user.id },
      _count: { id: true },
      _avg: { accuracy: true, totalTimeMs: true, score: true },
      _max: { score: true, maxStreak: true },
    })

    // Get perfect score count
    const perfectScoreCount = await prisma.architectureGameSession.count({
      where: { userId: session.user.id, perfectScore: true },
    })

    // Get recent achievements
    const recentBadges = await prisma.architectureUserBadge.findMany({
      where: { progressId: progress.id },
      orderBy: { earnedAt: 'desc' },
      take: 5,
    })

    return NextResponse.json({
      progress,
      stats: {
        totalGames: progress.totalGamesPlayed,
        totalQuestions: progress.totalQuestionsAnswered,
        totalCorrect: progress.totalCorrectAnswers,
        accuracy: progress.overallAccuracy || 0,
        totalTime: progress.totalTimeSpent,
        totalXp: progress.totalXp,
        currentLevel: progress.currentLevel,
        currentStreak: progress.streak?.currentStreak || 0,
        longestStreak: progress.streak?.longestStreak || 0,
        personalBest: progress.personalBestTime,
        perfectScores: perfectScoreCount,
      },
      gameModeStats: gameModeStats.map((stat: any) => ({
        gameMode: stat.gameMode,
        gamesPlayed: stat._count.id,
        avgAccuracy: stat._avg.accuracy,
        avgTime: stat._avg.totalTimeMs,
        avgScore: stat._avg.score,
        highScore: stat._max.score,
        bestStreak: stat._max.maxStreak,
      })),
      recentBadges,
    })
  } catch (error) {
    console.error('Error fetching architecture stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
