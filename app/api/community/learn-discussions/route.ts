import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// GET /api/community/learn-discussions
// Get all learning module discussions for the community page
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const moduleId = searchParams.get('moduleId')
    const level = searchParams.get('level')?.toUpperCase() as LearningLevel | undefined
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sort = searchParams.get('sort') || 'recent'

    // Build where clause
    const where: Record<string, unknown> = {}
    if (moduleId) {
      where.articleId = moduleId
    }
    if (level && LEARNING_LEVELS[level]) {
      where.level = level
    }

    // Build order clause
    let orderBy: Record<string, string>[] = []
    switch (sort) {
      case 'popular':
        orderBy = [{ viewCount: 'desc' }, { replyCount: 'desc' }]
        break
      case 'unanswered':
        orderBy = [{ replyCount: 'asc' }, { createdAt: 'desc' }]
        break
      case 'recent':
      default:
        orderBy = [{ createdAt: 'desc' }]
    }

    // Get discussions with pagination
    const [discussions, total, modules] = await Promise.all([
      prisma.moduleDiscussion.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          article: {
            select: {
              id: true,
              title: true,
              slug: true,
              coverImage: true
            }
          },
          _count: {
            select: { replies: true }
          }
        }
      }),
      prisma.moduleDiscussion.count({ where }),
      // Get list of modules with discussions for filter dropdown
      prisma.article.findMany({
        where: {
          moduleDiscussions: {
            some: {}
          }
        },
        select: {
          id: true,
          title: true,
          slug: true,
          _count: {
            select: { moduleDiscussions: true }
          }
        },
        orderBy: { title: 'asc' }
      })
    ])

    // Format discussions for community display
    const formattedDiscussions = discussions.map(d => ({
      id: d.id,
      type: 'learn' as const,
      articleId: d.articleId,
      module: {
        id: d.article.id,
        title: d.article.title,
        slug: d.article.slug,
        coverImage: d.article.coverImage
      },
      level: d.level,
      levelMeta: LEARNING_LEVELS[d.level as LearningLevel],
      author: d.author,
      title: d.title,
      content: d.content,
      excerpt: d.content.length > 200 ? d.content.slice(0, 200) + '...' : d.content,
      isResolved: d.isResolved,
      isPinned: d.isPinned,
      viewCount: d.viewCount,
      replyCount: d._count.replies,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString()
    }))

    // Get level counts for filter
    const levelCounts = await prisma.moduleDiscussion.groupBy({
      by: ['level'],
      _count: true
    })

    return NextResponse.json({
      success: true,
      data: formattedDiscussions,
      filters: {
        modules: modules.map(m => ({
          id: m.id,
          title: m.title,
          slug: m.slug,
          discussionCount: m._count.moduleDiscussions
        })),
        levels: Object.keys(LEARNING_LEVELS).map(level => ({
          level,
          meta: LEARNING_LEVELS[level as LearningLevel],
          count: levelCounts.find(lc => lc.level === level)?._count || 0
        }))
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching learn discussions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}
