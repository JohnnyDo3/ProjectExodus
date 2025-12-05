import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

/**
 * GET /api/learning/user?filter=in_progress|completed
 * Get user's learning modules with optional filter
 */
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
    const filter = searchParams.get('filter') // 'in_progress' or 'completed'

    // Build query
    const whereClause: any = {
      userId: session.user.id,
    }

    if (filter === 'in_progress') {
      whereClause.status = 'IN_PROGRESS'
    } else if (filter === 'completed') {
      whereClause.status = 'COMPLETED'
    }

    // Fetch progress records
    const progress = await prisma.userLearningProgress.findMany({
      where: whereClause,
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImage: true,
            moduleType: true,
            moduleTabs: true,
            quizQuestions: true,
            estimatedTime: true,
            difficulty: true,
            readTime: true,
          },
        },
      },
      orderBy: {
        lastAccessedAt: 'desc',
      },
    })

    // Transform data for frontend
    const transformedData = progress.map((p: any) => {
      const moduleTabs = p.article.moduleTabs as any[]
      const totalTabs = moduleTabs ? moduleTabs.length : 0

      return {
        id: p.id,
        status: p.status,
        progressPercentage: p.progressPercentage,
        currentTabIndex: p.currentTabIndex,
        currentTab: totalTabs > 0 ? p.currentTabIndex + 1 : null,
        totalTabs,
        quizAttempts: p.quizAttempts,
        quizScore: p.quizScore,
        quizPassed: p.quizPassed,
        startedAt: p.startedAt,
        completedAt: p.completedAt,
        lastAccessedAt: p.lastAccessedAt,
        article: p.article,
      }
    })

    return NextResponse.json({
      success: true,
      data: transformedData,
      count: transformedData.length,
    })
  } catch (error) {
    console.error('Error fetching user learning modules:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
