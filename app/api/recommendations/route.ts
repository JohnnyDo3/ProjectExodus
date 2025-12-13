import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/recommendations - Get personalized article recommendations
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
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)
    const reason = searchParams.get('reason') // Filter by reason type

    const now = new Date()

    // Get active recommendations (not expired, not dismissed)
    const whereClause: any = {
      userId: session.user.id,
      dismissed: false,
      expiresAt: { gt: now }
    }

    if (reason) {
      whereClause.reason = reason
    }

    const recommendations = await prisma.articleRecommendation.findMany({
      where: whereClause,
      orderBy: { score: 'desc' },
      take: limit,
      include: {
        article: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
                guardianArchetype: true
              }
            },
            category: true,
            _count: {
              select: {
                comments: true,
                peerReviews: true
              }
            }
          }
        }
      }
    })

    // If not enough recommendations, generate new ones
    if (recommendations.length < limit) {
      await generateRecommendations(session.user.id)

      // Fetch again
      const newRecommendations = await prisma.articleRecommendation.findMany({
        where: whereClause,
        orderBy: { score: 'desc' },
        take: limit,
        include: {
          article: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  guardianArchetype: true
                }
              },
              category: true,
              _count: {
                select: {
                  comments: true,
                  peerReviews: true
                }
              }
            }
          }
        }
      })

      return formatRecommendations(newRecommendations)
    }

    return formatRecommendations(recommendations)
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recommendations' },
      { status: 500 }
    )
  }
}

// POST /api/recommendations - Track recommendation interaction
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
    const { articleId, action } = body // action: 'seen', 'clicked', 'dismissed'

    if (!articleId || !action) {
      return NextResponse.json(
        { success: false, error: 'Article ID and action are required' },
        { status: 400 }
      )
    }

    const validActions = ['seen', 'clicked', 'dismissed']
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Update recommendation
    await prisma.articleRecommendation.updateMany({
      where: {
        userId: session.user.id,
        articleId
      },
      data: {
        [action]: true
      }
    })

    return NextResponse.json({
      success: true,
      message: `Recommendation marked as ${action}`
    })
  } catch (error) {
    console.error('Error tracking recommendation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track recommendation' },
      { status: 500 }
    )
  }
}

// Helper to format recommendations response
function formatRecommendations(recommendations: any[]) {
  return NextResponse.json({
    success: true,
    data: {
      recommendations: recommendations.map(rec => ({
        id: rec.id,
        score: rec.score,
        reason: rec.reason,
        reasonLabel: getReasonLabel(rec.reason),
        seen: rec.seen,
        clicked: rec.clicked,
        article: {
          ...rec.article,
          commentCount: rec.article._count?.comments || 0,
          reviewCount: rec.article._count?.peerReviews || 0,
          _count: undefined
        }
      })),
      count: recommendations.length
    }
  })
}

// Convert reason code to human-readable label
function getReasonLabel(reason: string): string {
  const labels: Record<string, string> = {
    similar_content: 'Similar to articles you liked',
    popular_in_category: 'Popular in categories you follow',
    followed_author: 'From an author you follow',
    trending: 'Trending now',
    new_release: 'New release',
    highly_rated: 'Highly rated',
    based_on_reading_history: 'Based on your reading history',
    curated_pick: 'Editor\'s pick',
    completing_series: 'Continue reading',
    related_topic: 'Related to your interests'
  }
  return labels[reason] || 'Recommended for you'
}

// Generate new recommendations for a user
async function generateRecommendations(userId: string) {
  try {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days

    // Get user's reading history
    const readProgress = await prisma.articleReadingProgress.findMany({
      where: { userId },
      include: {
        article: {
          select: {
            id: true,
            categoryId: true,
            authorId: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
      take: 20
    })

    // Get categories and authors the user has engaged with
    const engagedCategories = [...new Set(readProgress.map(p => p.article.categoryId).filter(Boolean))]
    const engagedAuthors = [...new Set(readProgress.map(p => p.article.authorId))]
    const readArticleIds = readProgress.map(p => p.articleId)

    // Get users the current user follows
    const following = await prisma.connection.findMany({
      where: { followerId: userId },
      select: { followingId: true }
    })
    const followedUserIds = following.map(f => f.followingId)

    // Recommendations pool
    const recommendations: { articleId: string; score: number; reason: string }[] = []

    // 1. Articles from followed authors
    if (followedUserIds.length > 0) {
      const followedAuthorArticles = await prisma.article.findMany({
        where: {
          authorId: { in: followedUserIds },
          status: 'PUBLISHED',
          id: { notIn: readArticleIds }
        },
        orderBy: { publishedAt: 'desc' },
        take: 10,
        select: { id: true }
      })

      followedAuthorArticles.forEach((article, index) => {
        recommendations.push({
          articleId: article.id,
          score: 0.9 - (index * 0.02),
          reason: 'followed_author'
        })
      })
    }

    // 2. Popular articles in engaged categories
    if (engagedCategories.length > 0) {
      const categoryArticles = await prisma.article.findMany({
        where: {
          categoryId: { in: engagedCategories as string[] },
          status: 'PUBLISHED',
          id: { notIn: readArticleIds }
        },
        orderBy: { views: 'desc' },
        take: 10,
        select: { id: true }
      })

      categoryArticles.forEach((article, index) => {
        if (!recommendations.find(r => r.articleId === article.id)) {
          recommendations.push({
            articleId: article.id,
            score: 0.8 - (index * 0.02),
            reason: 'popular_in_category'
          })
        }
      })
    }

    // 3. Trending articles (high views in last 7 days)
    const trendingArticles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
        id: { notIn: readArticleIds }
      },
      orderBy: { views: 'desc' },
      take: 10,
      select: { id: true }
    })

    trendingArticles.forEach((article, index) => {
      if (!recommendations.find(r => r.articleId === article.id)) {
        recommendations.push({
          articleId: article.id,
          score: 0.7 - (index * 0.02),
          reason: 'trending'
        })
      }
    })

    // 4. Highly rated articles
    const highlyRatedArticles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        id: { notIn: readArticleIds }
      },
      orderBy: [
        { views: 'desc' }
      ],
      take: 10,
      select: { id: true }
    })

    highlyRatedArticles.forEach((article, index) => {
      if (!recommendations.find(r => r.articleId === article.id)) {
        recommendations.push({
          articleId: article.id,
          score: 0.6 - (index * 0.02),
          reason: 'highly_rated'
        })
      }
    })

    // Save recommendations (upsert to avoid duplicates)
    for (const rec of recommendations) {
      try {
        await prisma.articleRecommendation.upsert({
          where: {
            userId_articleId: {
              userId,
              articleId: rec.articleId
            }
          },
          create: {
            userId,
            articleId: rec.articleId,
            score: rec.score,
            reason: rec.reason,
            expiresAt
          },
          update: {
            score: rec.score,
            reason: rec.reason,
            expiresAt,
            seen: false,
            clicked: false,
            dismissed: false
          }
        })
      } catch (e) {
        // Skip if article doesn't exist
      }
    }
  } catch (error) {
    console.error('Error generating recommendations:', error)
  }
}
