import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/gamification/streaks - Get user's reading streak
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let streak = await prisma.readingStreak.findUnique({
      where: { userId: session.user.id }
    })

    // Create streak record if doesn't exist
    if (!streak) {
      streak = await prisma.readingStreak.create({
        data: {
          userId: session.user.id,
          currentStreak: 0,
          longestStreak: 0,
          totalDaysRead: 0,
          freezesUsed: 0,
          freezesAvailable: 2
        }
      })
    }

    // Check if streak should be broken (more than 1 day since last read)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let streakBroken = false
    let daysUntilBreak = null

    if (streak.lastReadDate) {
      const lastRead = new Date(streak.lastReadDate)
      lastRead.setHours(0, 0, 0, 0)
      const diffDays = Math.floor((today.getTime() - lastRead.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === 0) {
        // Read today, streak is safe
        daysUntilBreak = 1
      } else if (diffDays === 1) {
        // Didn't read today but read yesterday - still safe but needs reading
        daysUntilBreak = 0 // Must read today to maintain
      } else if (diffDays === 2 && streak.freezesAvailable > streak.freezesUsed) {
        // Missed yesterday, can use freeze
        daysUntilBreak = 0
      } else if (diffDays > 1) {
        // Streak broken if not already handled
        if (streak.currentStreak > 0) {
          streakBroken = true
          // Reset the streak
          await prisma.readingStreak.update({
            where: { userId: session.user.id },
            data: { currentStreak: 0 }
          })
          streak.currentStreak = 0
        }
      }
    }

    // Calculate week progress (days read this week)
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Sunday

    // Get completion ring data
    const completionRing = {
      current: streak.currentStreak,
      target: 7, // Weekly target
      percentage: Math.min(100, Math.round((streak.currentStreak / 7) * 100))
    }

    // Calculate milestones
    const milestones = [7, 14, 30, 60, 100, 365]
    const nextMilestone = milestones.find(m => m > streak.currentStreak) || milestones[milestones.length - 1]
    const progressToMilestone = Math.round((streak.currentStreak / nextMilestone) * 100)

    return NextResponse.json({
      success: true,
      data: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        totalDaysRead: streak.totalDaysRead,
        lastReadDate: streak.lastReadDate,
        freezesUsed: streak.freezesUsed,
        freezesAvailable: streak.freezesAvailable,
        freezesRemaining: streak.freezesAvailable - streak.freezesUsed,
        streakBroken,
        daysUntilBreak,
        completionRing,
        milestone: {
          next: nextMilestone,
          progress: progressToMilestone,
          remaining: nextMilestone - streak.currentStreak
        },
        readToday: streak.lastReadDate ? (
          new Date(streak.lastReadDate).setHours(0, 0, 0, 0) === today.getTime()
        ) : false
      }
    })
  } catch (error) {
    console.error('Error fetching streak:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch streak' },
      { status: 500 }
    )
  }
}

// POST /api/gamification/streaks - Use a streak freeze
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
    const { action } = body

    if (action !== 'use_freeze') {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }

    const streak = await prisma.readingStreak.findUnique({
      where: { userId: session.user.id }
    })

    if (!streak) {
      return NextResponse.json(
        { success: false, error: 'No streak record found' },
        { status: 404 }
      )
    }

    if (streak.freezesUsed >= streak.freezesAvailable) {
      return NextResponse.json(
        { success: false, error: 'No freezes available' },
        { status: 400 }
      )
    }

    // Use a freeze to protect the streak
    const updated = await prisma.readingStreak.update({
      where: { userId: session.user.id },
      data: {
        freezesUsed: { increment: 1 },
        lastReadDate: new Date() // Set to today to "preserve" streak
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        freezesRemaining: updated.freezesAvailable - updated.freezesUsed,
        message: 'Streak freeze used successfully'
      }
    })
  } catch (error) {
    console.error('Error using streak freeze:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to use streak freeze' },
      { status: 500 }
    )
  }
}
