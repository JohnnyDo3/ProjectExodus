import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/author/analytics/articles - Get detailed analytics for all author's articles
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
    const sortBy = searchParams.get('sortBy') || 'views' // views, reads, reviews, date
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const status = searchParams.get('status') // PUBLISHED, DRAFT, all
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const whereClause: any = { authorId: session.user.id }
    if (status && status !== 'all') {
      whereClause.status = status
    }

    // Build order by
    let orderBy: any = {}
    switch (sortBy) {
      case 'reads':
        // Can't directly sort by read count, will sort after fetch
        orderBy = { views: 'desc' }
        break
      case 'reviews':
        orderBy = { peerReviews: { _count: sortOrder } }
        break
      case 'date':
        orderBy = { publishedAt: sortOrder }
        break
      default:
        orderBy = { views: sortOrder }
    }

    const articles = await prisma.article.findMany({
      where: whereClause,
      orderBy,
      take: limit,
      skip: offset,
      include: {
        category: true,
        _count: {
          select: {
            comments: true,
            peerReviews: true,
            readingProgress: true
          }
        }
      }
    })

    // Get reading progress stats for each article
    const articleIds = articles.map(a => a.id)
    const readingStats = await prisma.articleReadingProgress.groupBy({
      by: ['articleId'],
      where: { articleId: { in: articleIds } },
      _count: { id: true },
      _sum: { timeSpent: true },
      _avg: { scrollProgress: true }
    })

    const completedReads = await prisma.articleReadingProgress.groupBy({
      by: ['articleId'],
      where: {
        articleId: { in: articleIds },
        completed: true
      },
      _count: { id: true }
    })

    // Get peer review ratings
    const reviewRatings = await prisma.peerReview.groupBy({
      by: ['articleId'],
      where: { articleId: { in: articleIds } },
      _avg: {
        clarity: true,
        accuracy: true,
        depth: true,
        originality: true
      }
    })

    // Map stats to articles
    const statsMap = new Map(readingStats.map(s => [s.articleId, s]))
    const completedMap = new Map(completedReads.map(s => [s.articleId, s._count.id]))
    const ratingsMap = new Map(reviewRatings.map(r => [r.articleId, {
      clarity: r._avg.clarity,
      accuracy: r._avg.accuracy,
      depth: r._avg.depth,
      originality: r._avg.originality,
      overall: ((r._avg.clarity || 0) + (r._avg.accuracy || 0) + (r._avg.depth || 0) + (r._avg.originality || 0)) / 4
    }]))

    const articlesWithStats = articles.map(article => {
      const stats = statsMap.get(article.id)
      const completed = completedMap.get(article.id) || 0
      const ratings = ratingsMap.get(article.id)

      return {
        id: article.id,
        title: article.title,
        slug: article.slug,
        status: article.status,
        publishedAt: article.publishedAt,
        coverImage: article.coverImage,
        category: article.category ? {
          id: article.category.id,
          name: article.category.name
        } : null,
        readTime: article.readTime,
        stats: {
          views: article.views,
          uniqueReaders: stats?._count?.id || 0,
          completedReads: completed,
          avgScrollProgress: stats?._avg?.scrollProgress || 0,
          totalTimeSpent: stats?._sum?.timeSpent || 0,
          avgTimeSpent: stats?._count?.id
            ? Math.round((stats._sum?.timeSpent || 0) / stats._count.id)
            : 0,
          comments: article._count.comments,
          reviews: article._count.peerReviews
        },
        ratings: ratings || null
      }
    })

    // Get total count
    const total = await prisma.article.count({ where: whereClause })

    return NextResponse.json({
      success: true,
      data: {
        articles: articlesWithStats,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
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
