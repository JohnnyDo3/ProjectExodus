import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// SM-2 Algorithm Parameters
const MIN_EASE_FACTOR = 1.3
const DEFAULT_EASE_FACTOR = 2.5
const INITIAL_INTERVAL = 1 // days

// GET - Fetch user's reviews (upcoming, due, or all)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'due' // 'due', 'upcoming', 'all'
    const pathId = searchParams.get('pathId')

    const now = new Date()

    // Build query
    const where: {
      userId: string
      pathId?: string
      nextReviewDate?: { lte?: Date; gt?: Date }
    } = { userId: session.user.id }

    if (pathId) where.pathId = pathId

    if (filter === 'due') {
      where.nextReviewDate = { lte: now }
    } else if (filter === 'upcoming') {
      where.nextReviewDate = { gt: now }
    }

    const reviews = await prisma.exodologyReview.findMany({
      where,
      orderBy: { nextReviewDate: 'asc' }
    })

    // Get stats
    const dueCount = await prisma.exodologyReview.count({
      where: {
        userId: session.user.id,
        nextReviewDate: { lte: now }
      }
    })

    const upcomingCount = await prisma.exodologyReview.count({
      where: {
        userId: session.user.id,
        nextReviewDate: { gt: now }
      }
    })

    return NextResponse.json({
      reviews,
      stats: {
        due: dueCount,
        upcoming: upcomingCount,
        total: dueCount + upcomingCount
      }
    })

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// POST - Schedule a new review or update after completing a review
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { pathId, lessonId, quality, action } = body

    if (!pathId || !lessonId) {
      return NextResponse.json({ error: 'pathId and lessonId are required' }, { status: 400 })
    }

    // Action can be 'schedule' (when completing a lesson) or 'review' (when reviewing)
    if (action === 'schedule') {
      // Schedule initial review for tomorrow
      const nextReviewDate = new Date()
      nextReviewDate.setDate(nextReviewDate.getDate() + INITIAL_INTERVAL)

      const review = await prisma.exodologyReview.upsert({
        where: {
          userId_pathId_lessonId: {
            userId: session.user.id,
            pathId,
            lessonId
          }
        },
        update: {
          // If already exists, don't change (they can review it normally)
        },
        create: {
          userId: session.user.id,
          pathId,
          lessonId,
          nextReviewDate,
          interval: INITIAL_INTERVAL,
          easeFactor: DEFAULT_EASE_FACTOR,
          reviewCount: 0
        }
      })

      return NextResponse.json({ review, message: 'Review scheduled' })
    }

    // Handle review completion with quality rating (0-5)
    // 0-2: Failed recall, reset interval
    // 3: Hard but recalled, slight increase
    // 4: Good recall, normal increase
    // 5: Easy recall, larger increase

    if (quality === undefined || quality < 0 || quality > 5) {
      return NextResponse.json({ error: 'Quality must be 0-5' }, { status: 400 })
    }

    // Get existing review
    const existingReview = await prisma.exodologyReview.findUnique({
      where: {
        userId_pathId_lessonId: {
          userId: session.user.id,
          pathId,
          lessonId
        }
      }
    })

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    // Calculate new ease factor using SM-2 algorithm
    let newEaseFactor = existingReview.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    newEaseFactor = Math.max(MIN_EASE_FACTOR, newEaseFactor)

    // Calculate new interval
    let newInterval: number

    if (quality < 3) {
      // Failed - reset to 1 day
      newInterval = 1
    } else {
      if (existingReview.reviewCount === 0) {
        newInterval = 1
      } else if (existingReview.reviewCount === 1) {
        newInterval = 6
      } else {
        newInterval = Math.round(existingReview.interval * newEaseFactor)
      }
    }

    // Calculate next review date
    const nextReviewDate = new Date()
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval)

    // Update review
    const review = await prisma.exodologyReview.update({
      where: {
        userId_pathId_lessonId: {
          userId: session.user.id,
          pathId,
          lessonId
        }
      },
      data: {
        interval: newInterval,
        easeFactor: newEaseFactor,
        nextReviewDate,
        reviewCount: existingReview.reviewCount + 1,
        lastReviewDate: new Date()
      }
    })

    return NextResponse.json({
      review,
      message: quality >= 3 ? 'Great job! Review scheduled.' : 'Keep practicing! Review scheduled soon.'
    })

  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

// DELETE - Remove a review from the schedule
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pathId = searchParams.get('pathId')
    const lessonId = searchParams.get('lessonId')

    if (!pathId || !lessonId) {
      return NextResponse.json({ error: 'pathId and lessonId are required' }, { status: 400 })
    }

    await prisma.exodologyReview.deleteMany({
      where: {
        userId: session.user.id,
        pathId,
        lessonId
      }
    })

    return NextResponse.json({ deleted: true })

  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
