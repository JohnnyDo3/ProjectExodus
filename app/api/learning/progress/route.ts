import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // If userId is provided, filter by that user, otherwise use the logged-in user
    const targetUserId = userId || session.user.id

    // Fetch saved articles count (articles the user has bookmarked/saved)
    const savedArticlesCount = await prisma.savedArticle.count({
      where: {
        userId: targetUserId,
      },
    })

    // Fetch articles authored by the user
    const authoredArticlesCount = await prisma.article.count({
      where: {
        authorId: targetUserId,
        status: 'PUBLISHED',
      },
    })

    // Fetch completed projects (projects where user is a member and status is COMPLETED)
    const completedProjectsCount = await prisma.projectMember.count({
      where: {
        userId: targetUserId,
        project: {
          status: 'COMPLETED',
        },
      },
    })

    // Calculate total learning hours based on:
    // - Saved articles: assume 5 minutes per article
    // - Authored articles: assume 2 hours per article (research + writing)
    // - Completed projects: assume 20 hours per project
    const articlesReadHours = (savedArticlesCount * 5) / 60 // 5 min per article
    const articlesWrittenHours = authoredArticlesCount * 2 // 2 hours per article
    const projectHours = completedProjectsCount * 20 // 20 hours per project
    const totalHours = Math.round(articlesReadHours + articlesWrittenHours + projectHours)

    const learningProgress = {
      articlesRead: savedArticlesCount,
      articlesAuthored: authoredArticlesCount,
      coursesCompleted: completedProjectsCount, // Using completed projects as "courses"
      totalHours: totalHours,
    }

    return NextResponse.json({
      success: true,
      data: learningProgress,
    })
  } catch (error) {
    console.error('[API /learning/progress] ERROR:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch learning progress' },
      { status: 500 }
    )
  }
}
