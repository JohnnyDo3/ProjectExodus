import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/articles/progress - Get user's reading progress for multiple articles
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const articleIds = searchParams.get('articleIds')?.split(',').filter(Boolean) || []

    if (articleIds.length === 0) {
      // Return all reading progress for the user
      const allProgress = await prisma.articleReadingProgress.findMany({
        where: { userId: session.user.id },
        select: {
          articleId: true,
          scrollProgress: true,
          timeSpent: true,
          completed: true,
          completedAt: true
        }
      })

      const progressMap: Record<string, {
        scrollProgress: number
        timeSpent: number
        completed: boolean
        completedAt: Date | null
      }> = {}

      allProgress.forEach((p: { articleId: string; scrollProgress: number; timeSpent: number; completed: boolean; completedAt: Date | null }) => {
        progressMap[p.articleId] = {
          scrollProgress: p.scrollProgress,
          timeSpent: p.timeSpent,
          completed: p.completed,
          completedAt: p.completedAt
        }
      })

      return NextResponse.json({
        success: true,
        data: progressMap
      })
    }

    // Get progress for specific articles
    const progress = await prisma.articleReadingProgress.findMany({
      where: {
        userId: session.user.id,
        articleId: { in: articleIds }
      },
      select: {
        articleId: true,
        scrollProgress: true,
        timeSpent: true,
        completed: true,
        completedAt: true
      }
    })

    const progressMap: Record<string, {
      scrollProgress: number
      timeSpent: number
      completed: boolean
      completedAt: Date | null
    }> = {}

    progress.forEach((p: { articleId: string; scrollProgress: number; timeSpent: number; completed: boolean; completedAt: Date | null }) => {
      progressMap[p.articleId] = {
        scrollProgress: p.scrollProgress,
        timeSpent: p.timeSpent,
        completed: p.completed,
        completedAt: p.completedAt
      }
    })

    return NextResponse.json({
      success: true,
      data: progressMap
    })
  } catch (error) {
    console.error('Error fetching reading progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reading progress' },
      { status: 500 }
    )
  }
}
