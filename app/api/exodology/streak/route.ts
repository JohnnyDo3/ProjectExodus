import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

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

// GET - Fetch user's streak data
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let streak = await prisma.exodologyStreak.findUnique({
      where: { userId: session.user.id }
    })

    // Initialize streak if not exists
    if (!streak) {
      streak = await prisma.exodologyStreak.create({
        data: {
          userId: session.user.id,
          currentStreak: 0,
          longestStreak: 0,
          totalLearningDays: 0
        }
      })
    }

    // Check if streak has broken (no activity yesterday or today)
    const today = new Date()
    if (streak.lastActivityDate) {
      const lastActivity = new Date(streak.lastActivityDate)
      const isActiveToday = isSameDay(lastActivity, today)
      const wasActiveYesterday = isYesterday(lastActivity, today)

      // Streak broken if last activity was before yesterday
      if (!isActiveToday && !wasActiveYesterday && streak.currentStreak > 0) {
        streak = await prisma.exodologyStreak.update({
          where: { userId: session.user.id },
          data: {
            currentStreak: 0,
            streakStartDate: null
          }
        })
      }
    }

    return NextResponse.json({
      streak: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        totalLearningDays: streak.totalLearningDays,
        lastActivityDate: streak.lastActivityDate,
        streakStartDate: streak.streakStartDate,
        isActiveToday: streak.lastActivityDate ? isSameDay(new Date(streak.lastActivityDate), today) : false
      }
    })

  } catch (error) {
    console.error('Error fetching streak:', error)
    return NextResponse.json({ error: 'Failed to fetch streak' }, { status: 500 })
  }
}

// POST - Update streak (called when user completes a lesson or activity)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { activityType } = body // 'lesson_completed', 'lesson_started', 'assessment_passed'

    const today = new Date()

    // Get or create streak record
    let streak = await prisma.exodologyStreak.findUnique({
      where: { userId: session.user.id }
    })

    if (!streak) {
      // First activity - create streak
      streak = await prisma.exodologyStreak.create({
        data: {
          userId: session.user.id,
          currentStreak: 1,
          longestStreak: 1,
          totalLearningDays: 1,
          lastActivityDate: today,
          streakStartDate: today
        }
      })
      return NextResponse.json({
        streak,
        message: 'Streak started!',
        activityType
      })
    }

    // Check last activity date
    const lastActivity = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null
    const isActiveToday = lastActivity ? isSameDay(lastActivity, today) : false
    const wasActiveYesterday = lastActivity ? isYesterday(lastActivity, today) : false

    let newCurrentStreak = streak.currentStreak
    let newLongestStreak = streak.longestStreak
    let newTotalDays = streak.totalLearningDays
    let streakStartDate = streak.streakStartDate

    if (!isActiveToday) {
      // New day activity
      newTotalDays++

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
    }

    // Update streak
    streak = await prisma.exodologyStreak.update({
      where: { userId: session.user.id },
      data: {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        totalLearningDays: newTotalDays,
        lastActivityDate: today,
        streakStartDate: streakStartDate
      }
    })

    return NextResponse.json({
      streak: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        totalLearningDays: streak.totalLearningDays,
        lastActivityDate: streak.lastActivityDate,
        streakStartDate: streak.streakStartDate,
        isActiveToday: true
      },
      message: !isActiveToday ? (wasActiveYesterday ? 'Streak continued!' : 'New streak started!') : 'Already active today',
      activityType
    })

  } catch (error) {
    console.error('Error updating streak:', error)
    return NextResponse.json({ error: 'Failed to update streak' }, { status: 500 })
  }
}
