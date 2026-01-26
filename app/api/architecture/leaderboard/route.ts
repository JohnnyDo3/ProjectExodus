import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET /api/architecture/leaderboard - Get leaderboard rankings
export async function GET(req: Request) {
  try {
    const session = await auth()

    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || 'fastest_flashcard'
    const timeframe = searchParams.get('timeframe') || 'all_time'
    const gameMode = searchParams.get('gameMode')
    const limit = parseInt(searchParams.get('limit') || '100')

    // Build where clause
    const where: any = { category, timeframe }
    if (gameMode) {
      where.gameMode = gameMode
    }

    // Get leaderboard entries
    const entries = await prisma.architectureLeaderboard.findMany({
      where,
      orderBy: { rank: 'asc' },
      take: limit,
      include: {
        progress: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                headline: true,
              },
            },
          },
        },
      },
    })

    // If user is logged in, get their rank
    let userRank = null
    if (session?.user?.id) {
      const progress = await prisma.architectureProgress.findUnique({
        where: { userId: session.user.id },
      })

      if (progress) {
        userRank = await prisma.architectureLeaderboard.findFirst({
          where: {
            progressId: progress.id,
            category,
            timeframe,
            ...(gameMode ? { gameMode } : {}),
          },
        })
      }
    }

    return NextResponse.json({
      leaderboard: entries.map((entry: any) => ({
        rank: entry.rank,
        userId: entry.progress.user.id,
        name: entry.progress.user.name,
        image: entry.progress.user.image,
        headline: entry.progress.user.headline,
        score: entry.score,
        metadata: entry.metadata,
        achievedAt: entry.achievedAt,
      })),
      userRank: userRank
        ? {
            rank: userRank.rank,
            score: userRank.score,
            metadata: userRank.metadata,
          }
        : null,
      category,
      timeframe,
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

// POST /api/architecture/leaderboard - Update leaderboard entry
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const { category, timeframe, gameMode, score, metadata } = data

    // Get user's progress
    const progress = await prisma.architectureProgress.findUnique({
      where: { userId: session.user.id },
    })

    if (!progress) {
      return NextResponse.json(
        { error: 'Architecture progress not found' },
        { status: 404 }
      )
    }

    // Upsert leaderboard entry
    const entry = await prisma.architectureLeaderboard.upsert({
      where: {
        userId_category_timeframe_gameMode: {
          userId: session.user.id,
          category,
          timeframe,
          gameMode: gameMode || null,
        },
      },
      update: {
        score,
        metadata,
        lastUpdated: new Date(),
      },
      create: {
        userId: session.user.id,
        progressId: progress.id,
        category,
        timeframe,
        gameMode: gameMode || null,
        score,
        metadata,
      },
    })

    // Recalculate ranks for this leaderboard
    const allEntries = await prisma.architectureLeaderboard.findMany({
      where: { category, timeframe, gameMode: gameMode || null },
      orderBy: [
        // For time-based categories, lower is better
        category.includes('fastest') ? { score: 'asc' } : { score: 'desc' },
        { achievedAt: 'asc' }, // tie-breaker: earlier achievement wins
      ],
    })

    // Update ranks
    for (let i = 0; i < allEntries.length; i++) {
      await prisma.architectureLeaderboard.update({
        where: { id: allEntries[i].id },
        data: { rank: i + 1 },
      })
    }

    return NextResponse.json({ success: true, entry })
  } catch (error) {
    console.error('Error updating leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to update leaderboard' },
      { status: 500 }
    )
  }
}
