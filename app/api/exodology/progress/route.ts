import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// Type for progress record
type ProgressRecord = {
  pathId: string
  lessonId: string
  status: string
}

// Helper to check if two dates are on the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// Helper to check if date1 is yesterday relative to date2
function isYesterday(date1: Date, date2: Date): boolean {
  const yesterday = new Date(date2)
  yesterday.setDate(yesterday.getDate() - 1)
  return isSameDay(date1, yesterday)
}

// Helper to update streak
async function updateStreak(userId: string, activityType: string) {
  const today = new Date()

  // Get or create streak record
  let streak = await prisma.exodologyStreak.findUnique({
    where: { userId }
  })

  if (!streak) {
    // First activity - create streak
    await prisma.exodologyStreak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        totalLearningDays: 1,
        lastActivityDate: today,
        streakStartDate: today
      }
    })
    return
  }

  // Check last activity date
  const lastActivity = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null
  const isActiveToday = lastActivity ? isSameDay(lastActivity, today) : false
  const wasActiveYesterday = lastActivity ? isYesterday(lastActivity, today) : false

  if (isActiveToday) {
    // Already active today, no update needed
    return
  }

  let newCurrentStreak = streak.currentStreak
  let newLongestStreak = streak.longestStreak
  let newTotalDays = streak.totalLearningDays + 1
  let streakStartDate = streak.streakStartDate

  if (wasActiveYesterday || !lastActivity) {
    // Continuing streak
    newCurrentStreak++
    if (newCurrentStreak > newLongestStreak) {
      newLongestStreak = newCurrentStreak
    }
    if (!streakStartDate) {
      streakStartDate = today
    }
  } else {
    // Streak broken - start new streak
    newCurrentStreak = 1
    streakStartDate = today
  }

  // Update streak
  await prisma.exodologyStreak.update({
    where: { userId },
    data: {
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      totalLearningDays: newTotalDays,
      lastActivityDate: today,
      streakStartDate: streakStartDate
    }
  })
}

// Helper to schedule a spaced repetition review
async function scheduleReview(userId: string, pathId: string, lessonId: string) {
  const INITIAL_INTERVAL = 1 // days
  const DEFAULT_EASE_FACTOR = 2.5

  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + INITIAL_INTERVAL)

  // Only create if doesn't exist (don't overwrite existing review schedule)
  const existing = await prisma.exodologyReview.findUnique({
    where: {
      userId_pathId_lessonId: {
        userId,
        pathId,
        lessonId
      }
    }
  })

  if (!existing) {
    await prisma.exodologyReview.create({
      data: {
        userId,
        pathId,
        lessonId,
        nextReviewDate,
        interval: INITIAL_INTERVAL,
        easeFactor: DEFAULT_EASE_FACTOR,
        reviewCount: 0
      }
    })
  }
}

// GET - Fetch user's progress for a path or all paths
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pathId = searchParams.get('pathId')
    const lessonId = searchParams.get('lessonId')

    // If specific lesson requested
    if (pathId && lessonId) {
      const progress = await prisma.exodologyProgress.findUnique({
        where: {
          userId_pathId_lessonId: {
            userId: session.user.id,
            pathId,
            lessonId
          }
        }
      })
      return NextResponse.json({ progress })
    }

    // If path requested, get all progress for that path
    if (pathId) {
      const progress = await prisma.exodologyProgress.findMany({
        where: {
          userId: session.user.id,
          pathId
        },
        orderBy: { lastAccessedAt: 'desc' }
      })

      // Calculate path statistics
      const completed = progress.filter((p: ProgressRecord) => p.status === 'COMPLETED').length
      const inProgress = progress.filter((p: ProgressRecord) => p.status === 'IN_PROGRESS').length
      const total = progress.length

      return NextResponse.json({
        progress,
        stats: { completed, inProgress, total }
      })
    }

    // Get all progress across all paths
    const progress = await prisma.exodologyProgress.findMany({
      where: { userId: session.user.id },
      orderBy: { lastAccessedAt: 'desc' }
    })

    // Group by path
    const byPath = progress.reduce((acc: Record<string, { completed: number; inProgress: number; total: number }>, p: ProgressRecord) => {
      if (!acc[p.pathId]) {
        acc[p.pathId] = { completed: 0, inProgress: 0, total: 0 }
      }
      acc[p.pathId].total++
      if (p.status === 'COMPLETED') acc[p.pathId].completed++
      if (p.status === 'IN_PROGRESS') acc[p.pathId].inProgress++
      return acc
    }, {} as Record<string, { completed: number; inProgress: number; total: number }>)

    return NextResponse.json({ progress, byPath })

  } catch (error) {
    console.error('Error fetching exodology progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

// POST - Update or create progress for a lesson
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { pathId, lessonId, status, completionData } = body

    if (!pathId || !lessonId) {
      return NextResponse.json({ error: 'pathId and lessonId are required' }, { status: 400 })
    }

    // Upsert progress
    const progress = await prisma.exodologyProgress.upsert({
      where: {
        userId_pathId_lessonId: {
          userId: session.user.id,
          pathId,
          lessonId
        }
      },
      update: {
        status: status || undefined,
        completionData: completionData || undefined,
        lastAccessedAt: new Date(),
        startedAt: status === 'IN_PROGRESS' ? new Date() : undefined,
        completedAt: status === 'COMPLETED' ? new Date() : undefined
      },
      create: {
        userId: session.user.id,
        pathId,
        lessonId,
        status: status || 'IN_PROGRESS',
        completionData: completionData || null,
        startedAt: new Date(),
        lastAccessedAt: new Date()
      }
    })

    // Update streak on any progress (completion counts more)
    try {
      await updateStreak(session.user.id, status === 'COMPLETED' ? 'lesson_completed' : 'lesson_started')
    } catch (streakError) {
      console.error('Error updating streak:', streakError)
      // Don't fail the request if streak update fails
    }

    // Schedule spaced repetition review when lesson is completed
    if (status === 'COMPLETED') {
      try {
        await scheduleReview(session.user.id, pathId, lessonId)
      } catch (reviewError) {
        console.error('Error scheduling review:', reviewError)
        // Don't fail the request if review scheduling fails
      }
    }

    // Check if path is complete (for certification)
    if (status === 'COMPLETED') {
      const pathProgress = await prisma.exodologyProgress.findMany({
        where: {
          userId: session.user.id,
          pathId
        }
      })

      // Get total lessons for this path (we'll need to check curriculum data)
      const completedCount = pathProgress.filter((p: ProgressRecord) => p.status === 'COMPLETED').length

      return NextResponse.json({
        progress,
        pathStats: {
          completed: completedCount,
          total: pathProgress.length
        }
      })
    }

    return NextResponse.json({ progress })

  } catch (error) {
    console.error('Error updating exodology progress:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}
