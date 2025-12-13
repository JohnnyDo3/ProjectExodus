import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    articleId: string
  }>
}

type ReadingProgressItem = {
  scrollProgress: number
  timeSpent: number
  completed: boolean
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

type PeerReviewItem = {
  clarity: number
  accuracy: number
  depth: number
  originality: number
  summary: string | null
  strengths: string | null
  improvements: string | null
  createdAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
    guardianArchetype: string | null
  }
}

// GET /api/author/analytics/[articleId] - Get detailed analytics for a single article
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { articleId } = await params
    const { searchParams } = new URL(request.url)
    const period = parseInt(searchParams.get('period') || '30') // days

    // Get article and verify ownership
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        category: true,
        author: {
          select: { id: true }
        },
        _count: {
          select: {
            comments: true,
            peerReviews: true
          }
        }
      }
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    if (article.author.id !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Get reading progress data
    const readingProgress = await prisma.articleReadingProgress.findMany({
      where: { articleId },
      select: {
        scrollProgress: true,
        timeSpent: true,
        completed: true,
        completedAt: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const totalReaders = readingProgress.length
    const completedReads = readingProgress.filter((p: ReadingProgressItem) => p.completed).length
    const avgScrollProgress = totalReaders > 0
      ? readingProgress.reduce((sum: number, p: ReadingProgressItem) => sum + p.scrollProgress, 0) / totalReaders
      : 0
    const totalTimeSpent = readingProgress.reduce((sum: number, p: ReadingProgressItem) => sum + p.timeSpent, 0)
    const avgTimeSpent = totalReaders > 0 ? Math.round(totalTimeSpent / totalReaders) : 0

    // Get peer reviews with ratings
    const peerReviews = await prisma.peerReview.findMany({
      where: { articleId },
      select: {
        clarity: true,
        accuracy: true,
        depth: true,
        originality: true,
        summary: true,
        strengths: true,
        improvements: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            guardianArchetype: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate rating distribution
    const ratingBuckets = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    peerReviews.forEach((review: PeerReviewItem) => {
      const avg = (review.clarity + review.accuracy + review.depth + review.originality) / 4
      const bucket = Math.round(avg) as 1 | 2 | 3 | 4 | 5
      if (ratingBuckets[bucket] !== undefined) {
        ratingBuckets[bucket]++
      }
    })

    // Calculate average ratings
    const avgRatings = peerReviews.length > 0 ? {
      clarity: peerReviews.reduce((sum: number, r: PeerReviewItem) => sum + r.clarity, 0) / peerReviews.length,
      accuracy: peerReviews.reduce((sum: number, r: PeerReviewItem) => sum + r.accuracy, 0) / peerReviews.length,
      depth: peerReviews.reduce((sum: number, r: PeerReviewItem) => sum + r.depth, 0) / peerReviews.length,
      originality: peerReviews.reduce((sum: number, r: PeerReviewItem) => sum + r.originality, 0) / peerReviews.length,
      overall: peerReviews.reduce((sum: number, r: PeerReviewItem) =>
        sum + (r.clarity + r.accuracy + r.depth + r.originality) / 4, 0
      ) / peerReviews.length
    } : null

    // Get engagement over time
    const periodStart = new Date()
    periodStart.setDate(periodStart.getDate() - period)

    const recentProgress = readingProgress.filter((p: ReadingProgressItem) => p.updatedAt >= periodStart)
    const engagementByDate = new Map<string, { views: number; reads: number; timeSpent: number }>()

    recentProgress.forEach((progress: ReadingProgressItem) => {
      const dateStr = progress.updatedAt.toISOString().split('T')[0]
      const existing = engagementByDate.get(dateStr) || { views: 0, reads: 0, timeSpent: 0 }
      existing.views++
      if (progress.completed) existing.reads++
      existing.timeSpent += progress.timeSpent
      engagementByDate.set(dateStr, existing)
    })

    const engagementTrend = Array.from(engagementByDate.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Get scroll progress distribution (for heatmap/funnel)
    const scrollBuckets = {
      '0-10': 0,
      '10-25': 0,
      '25-50': 0,
      '50-75': 0,
      '75-90': 0,
      '90-100': 0
    }

    readingProgress.forEach((p: ReadingProgressItem) => {
      const progress = p.scrollProgress
      if (progress <= 10) scrollBuckets['0-10']++
      else if (progress <= 25) scrollBuckets['10-25']++
      else if (progress <= 50) scrollBuckets['25-50']++
      else if (progress <= 75) scrollBuckets['50-75']++
      else if (progress <= 90) scrollBuckets['75-90']++
      else scrollBuckets['90-100']++
    })

    // Get comments
    const comments = await prisma.comment.findMany({
      where: { articleId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    // Get bookmarks and highlights count
    const bookmarkCount = await prisma.articleBookmark.count({
      where: { articleId }
    })

    const highlightCount = await prisma.articleHighlight.count({
      where: { articleId }
    })

    // Collections containing this article
    const inCollections = await prisma.collectionArticle.count({
      where: { articleId }
    })

    return NextResponse.json({
      success: true,
      data: {
        article: {
          id: article.id,
          title: article.title,
          slug: article.slug,
          status: article.status,
          publishedAt: article.publishedAt,
          category: article.category,
          readTime: article.readTime
        },
        overview: {
          views: article.views,
          uniqueReaders: totalReaders,
          completedReads,
          completionRate: totalReaders > 0 ? Math.round((completedReads / totalReaders) * 100) : 0,
          avgScrollProgress: Math.round(avgScrollProgress),
          totalTimeSpent,
          avgTimeSpent,
          comments: article._count.comments,
          reviews: article._count.peerReviews,
          bookmarks: bookmarkCount,
          highlights: highlightCount,
          inCollections
        },
        ratings: avgRatings,
        ratingDistribution: ratingBuckets,
        scrollDistribution: scrollBuckets,
        engagementTrend,
        recentReviews: peerReviews.slice(0, 5).map(review => ({
          ...review,
          avgRating: (review.clarity + review.accuracy + review.depth + review.originality) / 4
        })),
        recentComments: comments,
        period
      }
    })
  } catch (error) {
    console.error('Error fetching article analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article analytics' },
      { status: 500 }
    )
  }
}
