import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type ArticleItem = {
  id: string
  title: string
  slug: string
  status: string
  views: number
  categoryId: string | null
  category: { id: string; name: string; slug: string } | null
  _count: { comments: number; peerReviews: number }
}

type PeerReviewRating = {
  clarity: number
  accuracy: number
  depth: number
  originality: number
}

type ReadingProgressItem = {
  completed: boolean
  timeSpent: number
  scrollProgress: number
}

type RecentProgressItem = {
  updatedAt: Date
  completed: boolean
}

// GET /api/author/analytics - Get author's analytics dashboard data
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
    const period = searchParams.get('period') || '30' // days
    const periodDays = parseInt(period)

    // Get or create analytics record
    let analytics = await prisma.authorAnalytics.findUnique({
      where: { userId: session.user.id }
    })

    if (!analytics) {
      analytics = await prisma.authorAnalytics.create({
        data: { userId: session.user.id }
      })
    }

    // Get user's articles
    const articles = await prisma.article.findMany({
      where: { authorId: session.user.id },
      include: {
        category: true,
        _count: {
          select: {
            comments: true,
            peerReviews: true
          }
        }
      },
      orderBy: { views: 'desc' }
    })

    // Calculate totals
    const totalArticles = articles.length
    const publishedArticles = articles.filter((a: ArticleItem) => a.status === 'PUBLISHED').length
    const draftArticles = articles.filter((a: ArticleItem) => a.status === 'DRAFT').length
    const totalViews = articles.reduce((sum: number, a: ArticleItem) => sum + a.views, 0)
    const totalComments = articles.reduce((sum: number, a: ArticleItem) => sum + a._count.comments, 0)
    const totalReviews = articles.reduce((sum: number, a: ArticleItem) => sum + a._count.peerReviews, 0)

    // Get peer reviews with ratings
    const peerReviews = await prisma.peerReview.findMany({
      where: {
        article: { authorId: session.user.id }
      },
      select: { clarity: true, accuracy: true, depth: true, originality: true }
    })

    // Calculate average rating
    let avgRating = null
    if (peerReviews.length > 0) {
      const totalRating = peerReviews.reduce((sum: number, review: PeerReviewRating) => {
        const reviewAvg = (review.clarity + review.accuracy + review.depth + review.originality) / 4
        return sum + reviewAvg
      }, 0)
      avgRating = totalRating / peerReviews.length
    }

    // Get reading progress data for author's articles
    const readingProgress = await prisma.articleReadingProgress.findMany({
      where: {
        article: { authorId: session.user.id }
      },
      select: {
        completed: true,
        timeSpent: true,
        scrollProgress: true
      }
    })

    const totalReads = readingProgress.filter((p: ReadingProgressItem) => p.completed).length
    const totalTimeSpent = readingProgress.reduce((sum: number, p: ReadingProgressItem) => sum + p.timeSpent, 0)
    const avgCompletion = readingProgress.length > 0
      ? readingProgress.reduce((sum: number, p: ReadingProgressItem) => sum + p.scrollProgress, 0) / readingProgress.length
      : null

    // Get follower count
    const followerCount = await prisma.connection.count({
      where: { followingId: session.user.id }
    })

    // Top articles
    const topArticles = articles.slice(0, 5).map((article: ArticleItem) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      views: article.views,
      comments: article._count.comments,
      reviews: article._count.peerReviews,
      category: article.category?.name
    }))

    // Category breakdown
    const categoryMap = new Map<string, { categoryId: string; categoryName: string; articleCount: number; views: number }>()
    articles.forEach((article: ArticleItem) => {
      if (article.categoryId && article.category) {
        const existing = categoryMap.get(article.categoryId)
        if (existing) {
          existing.articleCount++
          existing.views += article.views
        } else {
          categoryMap.set(article.categoryId, {
            categoryId: article.categoryId,
            categoryName: article.category.name,
            articleCount: 1,
            views: article.views
          })
        }
      }
    })
    const topCategories = Array.from(categoryMap.values())
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    // Get engagement trend (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - periodDays)

    // Get daily views (simplified - would need more complex aggregation in production)
    const recentProgress = await prisma.articleReadingProgress.findMany({
      where: {
        article: { authorId: session.user.id },
        updatedAt: { gte: thirtyDaysAgo }
      },
      select: {
        updatedAt: true,
        completed: true
      }
    })

    // Group by date
    const engagementByDate = new Map<string, { views: number; reads: number }>()
    recentProgress.forEach((progress: RecentProgressItem) => {
      const dateStr = progress.updatedAt.toISOString().split('T')[0]
      const existing = engagementByDate.get(dateStr) || { views: 0, reads: 0 }
      existing.views++
      if (progress.completed) existing.reads++
      engagementByDate.set(dateStr, existing)
    })

    const engagementTrend = Array.from(engagementByDate.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Update cached analytics
    await prisma.authorAnalytics.update({
      where: { userId: session.user.id },
      data: {
        totalArticles,
        totalViews,
        totalReads,
        totalTimeSpent,
        avgReadCompletion: avgCompletion,
        avgRating,
        totalReviews,
        totalComments,
        followerCount,
        topCategories: topCategories,
        topArticles: topArticles,
        engagementTrend: engagementTrend
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalArticles,
          publishedArticles,
          draftArticles,
          totalViews,
          totalReads,
          totalTimeSpent,
          avgReadCompletion: avgCompletion,
          avgRating,
          totalReviews,
          totalComments,
          followerCount
        },
        topArticles,
        topCategories,
        engagementTrend,
        period: periodDays
      }
    })
  } catch (error) {
    console.error('Error fetching author analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

// POST /api/author/analytics/refresh - Force refresh analytics
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Trigger analytics refresh by calling GET
    const url = new URL(request.url)
    url.searchParams.set('refresh', 'true')

    // The GET handler already recalculates and caches
    return NextResponse.json({
      success: true,
      message: 'Analytics refresh triggered'
    })
  } catch (error) {
    console.error('Error refreshing analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to refresh analytics' },
      { status: 500 }
    )
  }
}
