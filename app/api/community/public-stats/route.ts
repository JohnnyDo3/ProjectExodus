import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/community/public-stats - Returns real community statistics (PUBLIC)
export async function GET() {
  try {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Fetch all stats in parallel
    const [
      totalMembers,
      membersThisWeek,
      totalProjects,
      projectsThisWeek,
      totalArticles,
      articlesThisWeek,
      totalCourses,
      activeDiscussions
    ] = await Promise.all([
      // Total members
      prisma.user.count(),
      // New members this week
      prisma.user.count({
        where: { createdAt: { gte: oneWeekAgo } }
      }),
      // Active projects
      prisma.project.count({
        where: { status: { in: ['ACTIVE', 'PLANNING'] } }
      }),
      // New projects this week
      prisma.project.count({
        where: {
          status: { in: ['ACTIVE', 'PLANNING'] },
          createdAt: { gte: oneWeekAgo }
        }
      }),
      // Published articles
      prisma.article.count({
        where: { status: 'PUBLISHED' }
      }),
      // New articles this week
      prisma.article.count({
        where: {
          status: 'PUBLISHED',
          publishedAt: { gte: oneWeekAgo }
        }
      }),
      // Total learning modules/courses
      prisma.article.count({
        where: {
          status: 'PUBLISHED',
          isLearningModule: true
        }
      }),
      // Active discussions (posts from last 7 days)
      prisma.socialPost.count({
        where: {
          visibility: 'PUBLIC',
          createdAt: { gte: oneWeekAgo }
        }
      })
    ])

    return NextResponse.json({
      success: true,
      data: {
        members: {
          total: totalMembers,
          thisWeek: membersThisWeek
        },
        projects: {
          total: totalProjects,
          thisWeek: projectsThisWeek
        },
        articles: {
          total: totalArticles,
          thisWeek: articlesThisWeek
        },
        courses: {
          total: totalCourses
        },
        discussions: {
          activeThisWeek: activeDiscussions
        }
      }
    })
  } catch (error) {
    console.error('Error fetching public stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch community stats' },
      { status: 500 }
    )
  }
}
