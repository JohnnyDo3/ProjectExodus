import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// Type for article query results
interface ArticleQueryResult {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  coverImage: string | null
  readTime: number | null
  views: number
  featured: boolean
  status: string
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  authorId: string
  categoryId: string
  category: {
    id: string
    name: string
    slug: string
  }
  author: {
    id: string
    name: string | null
    image: string | null
    guardianArchetype: string | null
  }
  tags: Array<{
    tag: {
      id: string
      name: string
      slug: string
    }
  }>
  _count: {
    comments: number
    readBy: number
  }
}

// GET /api/articles - List all articles with filters
export async function GET(request: NextRequest) {
  try {
    console.log('[API /articles] Request received')

    // Auth is optional - used for read tracking only
    let session = null
    try {
      session = await auth()
      console.log('[API /articles] Auth completed, user:', session?.user?.id || 'anonymous')
    } catch (authError) {
      console.error('[API /articles] Auth error (continuing without auth):', authError)
      // Continue without auth - articles are public
    }

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const sort = searchParams.get('sort') || 'newest' // newest, oldest, most_read, read
    const search = searchParams.get('search') || ''
    const authorId = searchParams.get('authorId')

    const where: any = {
      status: 'PUBLISHED',
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (authorId) {
      where.authorId = authorId
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Determine ordering based on sort parameter
    let orderBy: any = { publishedAt: 'desc' }
    if (sort === 'oldest') {
      orderBy = { publishedAt: 'asc' }
    } else if (sort === 'most_read') {
      orderBy = { views: 'desc' }
    }

    // For "read" filter, we need to filter articles the current user has read
    if (sort === 'read' && session?.user?.id) {
      const readArticleIds = await prisma.articleRead.findMany({
        where: { userId: session.user.id },
        select: { articleId: true },
      })
      where.id = { in: readArticleIds.map((r: { articleId: string }) => r.articleId) }
      orderBy = { publishedAt: 'desc' }
    }

    console.log('[API /articles] Starting database query...')
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              guardianArchetype: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: {
              comments: true,
              readBy: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy,
      }) as Promise<ArticleQueryResult[]>,
      prisma.article.count({ where }),
    ])
    console.log('[API /articles] Database query complete, found', articles.length, 'articles')

    // If user is logged in, mark which articles they've read
    let readArticleIds: string[] = []
    if (session?.user?.id) {
      const reads = await prisma.articleRead.findMany({
        where: {
          userId: session.user.id,
          articleId: { in: articles.map((a: { id: string }) => a.id) },
        },
        select: { articleId: true },
      })
      readArticleIds = reads.map((r: { articleId: string }) => r.articleId)
    }

    const articlesWithReadStatus = articles.map(article => ({
      ...article,
      hasRead: readArticleIds.includes(article.id),
    }))

    return NextResponse.json({
      success: true,
      data: articlesWithReadStatus,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Create new article (any logged-in user can create)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Generate slug from title if not provided
    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now()

    // Calculate read time from content (roughly 200 words per minute)
    const wordCount = body.content?.split(/\s+/).length || 0
    const readTime = body.readTime || Math.max(1, Math.ceil(wordCount / 200))

    // Get or create a default category if none provided
    let categoryId = body.categoryId
    if (!categoryId) {
      // Find or create "General" category
      let generalCategory = await prisma.articleCategory.findFirst({
        where: { slug: 'general' },
      })
      if (!generalCategory) {
        generalCategory = await prisma.articleCategory.create({
          data: {
            name: 'General',
            slug: 'general',
            description: 'General articles from the community',
          },
        })
      }
      categoryId = generalCategory.id
    }

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt || body.content?.substring(0, 200) + '...',
        content: body.content,
        coverImage: body.coverImage || null,
        readTime,
        status: body.status || 'PUBLISHED', // Default to published for user articles
        featured: false, // Only admins can feature articles
        publishedAt: body.status === 'DRAFT' ? null : new Date(),
        categoryId,
        authorId: session.user.id,
        seoTitle: body.seoTitle || body.title,
        seoDescription: body.seoDescription || body.excerpt,
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            guardianArchetype: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
