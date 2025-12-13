import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type AchievementItem = {
  id: string
  name: string
  description: string
  icon: string | null
  category: string
  rarity: string
  points: number
  secret: boolean
  requirement: number
  createdAt: Date
}

type UserAchievementItem = {
  id: string
  achievementId: string
  userId: string
  progress: number
  completed: boolean
  completedAt: Date | null
  notified: boolean
}

type AchievementWithProgress = AchievementItem & {
  userProgress: {
    progress: number
    completed: boolean
    completedAt: Date | null
    notified: boolean
  } | null
}

// GET /api/gamification/achievements - Get all achievements and user progress
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const unlockedOnly = searchParams.get('unlocked') === 'true'

    // Get all achievements
    const whereClause: any = {}
    if (category) {
      whereClause.category = category
    }
    // Don't show secret achievements unless unlocked
    if (!session?.user?.id) {
      whereClause.secret = false
    }

    const achievements = await prisma.achievement.findMany({
      where: whereClause,
      orderBy: [
        { category: 'asc' },
        { rarity: 'asc' },
        { name: 'asc' }
      ]
    })

    // If user is logged in, get their progress
    let userAchievements: any[] = []
    if (session?.user?.id) {
      userAchievements = await prisma.userAchievement.findMany({
        where: {
          userId: session.user.id,
          ...(unlockedOnly ? { completed: true } : {})
        }
      })
    }

    // Map user progress to achievements
    const userProgressMap = new Map<string, UserAchievementItem>(
      userAchievements.map((ua: UserAchievementItem) => [ua.achievementId, ua])
    )

    const achievementsWithProgress = achievements
      .filter((achievement: AchievementItem) => {
        // Filter out secret achievements the user hasn't unlocked
        if (achievement.secret) {
          const progress = userProgressMap.get(achievement.id)
          return progress?.completed
        }
        return true
      })
      .map((achievement: AchievementItem) => {
        const userProgress = userProgressMap.get(achievement.id)
        return {
          ...achievement,
          userProgress: userProgress ? {
            progress: userProgress.progress,
            completed: userProgress.completed,
            completedAt: userProgress.completedAt,
            notified: userProgress.notified
          } : null
        }
      })

    // Filter to only unlocked if requested
    const finalAchievements = unlockedOnly
      ? achievementsWithProgress.filter((a: AchievementWithProgress) => a.userProgress?.completed)
      : achievementsWithProgress

    // Group by category
    const grouped = finalAchievements.reduce((acc: Record<string, AchievementWithProgress[]>, achievement: AchievementWithProgress) => {
      const cat = achievement.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(achievement)
      return acc
    }, {} as Record<string, AchievementWithProgress[]>)

    // Calculate stats
    const totalAchievements = achievements.filter((a: AchievementItem) => !a.secret).length
    const unlockedCount = userAchievements.filter((ua: UserAchievementItem) => ua.completed).length
    const totalPoints = userAchievements
      .filter((ua: UserAchievementItem) => ua.completed)
      .reduce((sum: number, ua: UserAchievementItem) => {
        const achievement = achievements.find((a: AchievementItem) => a.id === ua.achievementId)
        return sum + (achievement?.points || 0)
      }, 0)

    return NextResponse.json({
      success: true,
      data: {
        achievements: finalAchievements,
        grouped,
        stats: {
          total: totalAchievements,
          unlocked: unlockedCount,
          percentage: Math.round((unlockedCount / totalAchievements) * 100) || 0,
          pointsEarned: totalPoints
        }
      }
    })
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}

// POST /api/gamification/achievements - Mark achievement notification as seen
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { achievementId } = body

    if (!achievementId) {
      return NextResponse.json(
        { success: false, error: 'Achievement ID is required' },
        { status: 400 }
      )
    }

    // Mark as notified
    await prisma.userAchievement.updateMany({
      where: {
        userId: session.user.id,
        achievementId,
        completed: true
      },
      data: {
        notified: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Achievement notification marked as seen'
    })
  } catch (error) {
    console.error('Error updating achievement notification:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update achievement notification' },
      { status: 500 }
    )
  }
}
