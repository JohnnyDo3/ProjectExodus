import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/articles/[slug]/progress - Get user's reading progress
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params

    // Find article by slug
    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    const progress = await prisma.articleReadingProgress.findUnique({
      where: {
        userId_articleId: {
          userId: session.user.id,
          articleId: article.id
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: progress || {
        scrollProgress: 0,
        timeSpent: 0,
        lastPosition: null,
        completed: false,
        completedAt: null
      }
    })
  } catch (error) {
    console.error('Error fetching reading progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reading progress' },
      { status: 500 }
    )
  }
}

// POST /api/articles/[slug]/progress - Update reading progress
export async function POST(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const body = await request.json()

    // Find article by slug
    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    const { scrollProgress, timeSpent, lastPosition, completed } = body

    // Upsert progress record
    const progress = await prisma.articleReadingProgress.upsert({
      where: {
        userId_articleId: {
          userId: session.user.id,
          articleId: article.id
        }
      },
      create: {
        userId: session.user.id,
        articleId: article.id,
        scrollProgress: scrollProgress ?? 0,
        timeSpent: timeSpent ?? 0,
        lastPosition: lastPosition ?? null,
        completed: completed ?? false,
        completedAt: completed ? new Date() : null
      },
      update: {
        scrollProgress: scrollProgress !== undefined ? scrollProgress : undefined,
        timeSpent: timeSpent !== undefined
          ? { increment: timeSpent }
          : undefined,
        lastPosition: lastPosition !== undefined ? lastPosition : undefined,
        completed: completed !== undefined ? completed : undefined,
        completedAt: completed ? new Date() : undefined
      }
    })

    // Update reading streak if article completed
    if (completed) {
      await updateReadingStreak(session.user.id)
      // Award points for completing an article
      await awardPoints(session.user.id, 'ARTICLE_READ', 10, `Completed article: ${slug}`)
    }

    return NextResponse.json({
      success: true,
      data: progress
    })
  } catch (error) {
    console.error('Error updating reading progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update reading progress' },
      { status: 500 }
    )
  }
}

// Helper function to update reading streak
async function updateReadingStreak(userId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const streak = await prisma.readingStreak.findUnique({
    where: { userId }
  })

  if (!streak) {
    // Create new streak
    await prisma.readingStreak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastReadDate: today,
        totalDaysRead: 1
      }
    })
    return
  }

  const lastRead = streak.lastReadDate
  if (!lastRead) {
    // First read ever
    await prisma.readingStreak.update({
      where: { userId },
      data: {
        currentStreak: 1,
        longestStreak: Math.max(1, streak.longestStreak),
        lastReadDate: today,
        totalDaysRead: { increment: 1 }
      }
    })
    return
  }

  const lastReadDate = new Date(lastRead)
  lastReadDate.setHours(0, 0, 0, 0)

  const diffDays = Math.floor((today.getTime() - lastReadDate.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    // Already read today, no update needed
    return
  } else if (diffDays === 1) {
    // Consecutive day - increment streak
    const newStreak = streak.currentStreak + 1
    await prisma.readingStreak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, streak.longestStreak),
        lastReadDate: today,
        totalDaysRead: { increment: 1 }
      }
    })
  } else if (diffDays === 2 && streak.freezesAvailable > streak.freezesUsed) {
    // Missed one day but can use a freeze
    const newStreak = streak.currentStreak + 1
    await prisma.readingStreak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, streak.longestStreak),
        lastReadDate: today,
        totalDaysRead: { increment: 1 },
        freezesUsed: { increment: 1 }
      }
    })
  } else {
    // Streak broken - reset
    await prisma.readingStreak.update({
      where: { userId },
      data: {
        currentStreak: 1,
        lastReadDate: today,
        totalDaysRead: { increment: 1 }
      }
    })
  }
}

// Helper function to award points
async function awardPoints(userId: string, reason: string, amount: number, description: string) {
  // Get or create user points
  const userPoints = await prisma.userPoints.upsert({
    where: { userId },
    create: {
      userId,
      totalPoints: amount,
      currentPoints: amount,
      level: 1,
      levelProgress: amount
    },
    update: {
      totalPoints: { increment: amount },
      currentPoints: { increment: amount },
      levelProgress: { increment: amount }
    }
  })

  // Create transaction record
  await prisma.pointTransaction.create({
    data: {
      userPointsId: userPoints.id,
      amount,
      reason: reason as any,
      description
    }
  })

  // Check for level up (every 100 points)
  const newLevel = Math.floor(userPoints.totalPoints / 100) + 1
  if (newLevel > userPoints.level) {
    await prisma.userPoints.update({
      where: { userId },
      data: {
        level: newLevel,
        levelProgress: userPoints.totalPoints % 100
      }
    })
  }
}
