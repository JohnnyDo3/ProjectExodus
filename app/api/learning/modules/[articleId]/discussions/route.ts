import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// Type for discussion with author and reply count
type DiscussionWithAuthor = {
  id: string
  title: string
  content: string
  level: string
  articleId: string
  authorId: string
  isPinned: boolean
  isResolved: boolean
  viewCount: number
  createdAt: Date
  updatedAt: Date
  author: {
    id: string
    name: string | null
    image: string | null
  }
  _count: {
    replies: number
  }
}

// GET /api/learning/modules/[articleId]/discussions
// Get discussions for a module, optionally filtered by level
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { articleId } = await params
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')?.toUpperCase() as LearningLevel | undefined
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sort = searchParams.get('sort') || 'recent'

    // Build where clause
    const where: Record<string, unknown> = { articleId }
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
        orderBy = [{ isPinned: 'desc' }, { createdAt: 'desc' }]
    }

    // Get discussions with pagination
    const [discussions, total] = await Promise.all([
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
          _count: {
            select: { replies: true }
          }
        }
      }),
      prisma.moduleDiscussion.count({ where })
    ])

    // Get user's completion status for badge display
    const session = await auth()
    let userCompletions: Record<string, boolean> = {}

    if (session?.user?.id) {
      const completions = await prisma.userLearningProgress.findMany({
        where: {
          articleId,
          userId: session.user.id,
          status: 'COMPLETED'
        },
        select: { selectedLevel: true }
      })
      userCompletions = completions.reduce((acc: Record<string, boolean>, c: { selectedLevel: string }) => {
        acc[c.selectedLevel] = true
        return acc
      }, {} as Record<string, boolean>)
    }

    // Format discussions
    const formattedDiscussions = discussions.map((d: DiscussionWithAuthor) => ({
      id: d.id,
      articleId: d.articleId,
      level: d.level,
      levelMeta: LEARNING_LEVELS[d.level as LearningLevel],
      author: {
        ...d.author,
        hasCompletedModule: !!userCompletions[d.level]
      },
      title: d.title,
      content: d.content,
      isResolved: d.isResolved,
      isPinned: d.isPinned,
      viewCount: d.viewCount,
      replyCount: d._count.replies,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString()
    }))

    return NextResponse.json({
      success: true,
      data: formattedDiscussions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching discussions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}

// POST /api/learning/modules/[articleId]/discussions
// Create a new discussion
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { articleId } = await params
    const body = await request.json()
    const { level, title, content } = body

    // Validate input
    if (!level || !title || !content) {
      return NextResponse.json(
        { success: false, error: 'Level, title, and content are required' },
        { status: 400 }
      )
    }

    const levelUpper = level.toUpperCase() as LearningLevel
    if (!LEARNING_LEVELS[levelUpper]) {
      return NextResponse.json(
        { success: false, error: 'Invalid learning level' },
        { status: 400 }
      )
    }

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true, moduleType: true }
    })

    if (!article || !article.moduleType) {
      return NextResponse.json(
        { success: false, error: 'Module not found' },
        { status: 404 }
      )
    }

    // Create discussion
    const discussion = await prisma.moduleDiscussion.create({
      data: {
        articleId,
        level: levelUpper,
        authorId: session.user.id,
        title: title.trim(),
        content: content.trim()
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        id: discussion.id,
        articleId: discussion.articleId,
        level: discussion.level,
        levelMeta: LEARNING_LEVELS[discussion.level as LearningLevel],
        author: discussion.author,
        title: discussion.title,
        content: discussion.content,
        isResolved: discussion.isResolved,
        isPinned: discussion.isPinned,
        viewCount: discussion.viewCount,
        replyCount: 0,
        createdAt: discussion.createdAt.toISOString(),
        updatedAt: discussion.updatedAt.toISOString()
      },
      message: 'Discussion created successfully'
    })

  } catch (error) {
    console.error('Error creating discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create discussion' },
      { status: 500 }
    )
  }
}
