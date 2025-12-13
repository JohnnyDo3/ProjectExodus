import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// Type definitions
type LeaderboardEntry = {
  id: string
  userId: string
  totalPoints: number
  currentPoints: number
  weeklyPoints: number
  monthlyPoints: number
  allTimePoints: number
  level: number
  levelProgress: number
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
    guardianArchetype: string | null
  }
}

type StreakEntry = {
  id: string
  userId: string
  currentStreak: number
  longestStreak: number
  lastReadDate: Date | null
  totalDaysRead: number
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
    guardianArchetype: string | null
  }
}

// GET /api/gamification/leaderboard - Get points leaderboard
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all-time' // 'weekly', 'monthly', 'all-time'
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)

    // Determine which field to sort by
    let orderByField: string
    switch (type) {
      case 'weekly':
        orderByField = 'weeklyPoints'
        break
      case 'monthly':
        orderByField = 'monthlyPoints'
        break
      default:
        orderByField = 'totalPoints'
    }

    // Get top users
    const topUsers = await prisma.userPoints.findMany({
      orderBy: { [orderByField]: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            guardianArchetype: true
          }
        }
      }
    })

    // Format leaderboard entries
    const leaderboard = topUsers.map((entry: LeaderboardEntry, index: number) => ({
      rank: index + 1,
      userId: entry.user.id,
      name: entry.user.name,
      image: entry.user.image,
      guardianArchetype: entry.user.guardianArchetype,
      points: type === 'weekly'
        ? entry.weeklyPoints
        : type === 'monthly'
          ? entry.monthlyPoints
          : entry.totalPoints,
      level: entry.level,
      totalPoints: entry.totalPoints
    }))

    // Get current user's rank if logged in
    let userRank = null
    if (session?.user?.id) {
      const userPoints = await prisma.userPoints.findUnique({
        where: { userId: session.user.id }
      })

      if (userPoints) {
        const userPointsValue = type === 'weekly'
          ? userPoints.weeklyPoints
          : type === 'monthly'
            ? userPoints.monthlyPoints
            : userPoints.totalPoints

        // Count users with more points
        const usersAbove = await prisma.userPoints.count({
          where: {
            [orderByField]: { gt: userPointsValue }
          }
        })

        userRank = {
          rank: usersAbove + 1,
          points: userPointsValue,
          level: userPoints.level,
          totalPoints: userPoints.totalPoints
        }
      }
    }

    // Get leaderboard stats
    const stats = await prisma.userPoints.aggregate({
      _count: true,
      _sum: {
        totalPoints: true,
        weeklyPoints: true,
        monthlyPoints: true
      },
      _avg: {
        totalPoints: true,
        level: true
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        type,
        leaderboard,
        userRank,
        stats: {
          totalParticipants: stats._count,
          totalPointsAwarded: stats._sum.totalPoints || 0,
          averagePoints: Math.round(stats._avg.totalPoints || 0),
          averageLevel: Math.round(stats._avg.level || 1)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

// GET /api/gamification/leaderboard/streaks - Get reading streak leaderboard
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()
    const { type } = body // 'current' or 'longest'
    const limit = Math.min(body.limit || 50, 100)

    const orderByField = type === 'longest' ? 'longestStreak' : 'currentStreak'

    // Get top streaks
    const topStreaks = await prisma.readingStreak.findMany({
      where: {
        [orderByField]: { gt: 0 }
      },
      orderBy: { [orderByField]: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            guardianArchetype: true
          }
        }
      }
    })

    // Format leaderboard
    const leaderboard = topStreaks.map((entry: StreakEntry, index: number) => ({
      rank: index + 1,
      userId: entry.user.id,
      name: entry.user.name,
      image: entry.user.image,
      guardianArchetype: entry.user.guardianArchetype,
      streak: type === 'longest' ? entry.longestStreak : entry.currentStreak,
      longestStreak: entry.longestStreak,
      currentStreak: entry.currentStreak,
      totalDaysRead: entry.totalDaysRead
    }))

    // Get current user's rank
    let userRank = null
    if (session?.user?.id) {
      const userStreak = await prisma.readingStreak.findUnique({
        where: { userId: session.user.id }
      })

      if (userStreak) {
        const userStreakValue = type === 'longest'
          ? userStreak.longestStreak
          : userStreak.currentStreak

        const usersAbove = await prisma.readingStreak.count({
          where: {
            [orderByField]: { gt: userStreakValue }
          }
        })

        userRank = {
          rank: usersAbove + 1,
          streak: userStreakValue,
          longestStreak: userStreak.longestStreak,
          currentStreak: userStreak.currentStreak,
          totalDaysRead: userStreak.totalDaysRead
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        type: type || 'current',
        leaderboard,
        userRank
      }
    })
  } catch (error) {
    console.error('Error fetching streak leaderboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch streak leaderboard' },
      { status: 500 }
    )
  }
}
