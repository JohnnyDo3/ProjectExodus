import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { incrementStockScore, STOCK_POINTS } from '@/lib/stockScore'
import {
  validateArticleContent,
  sanitizeHtml,
  escapeHtml,
  isValidUrl,
  CONTENT_LIMITS,
} from '@/lib/article/contentSecurity'
import {
  isCloudStorageAvailable,
  uploadArticleContent,
} from '@/lib/article/contentStorage'

/** Strip HTML tags from plain-text fields to prevent stored XSS */
function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim()
}

/** Sanitize a URL to only allow safe protocols, returns empty string for dangerous ones */
function sanitizeUrl(url: string): string {
  return isValidUrl(url) ? url : ''
}

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

// Helper to add timeout to promises
function withTimeout<T>(promise: Promise<T>, ms: number, name: string): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`${name} timed out after ${ms}ms`)), ms)
  )
  return Promise.race([promise, timeout])
}

// GET /api/articles - List all articles with filters
export async function GET(request: NextRequest) {
  const startTime = Date.now()
  try {
    // Auth is optional - used for read tracking only (with 5s timeout)
    let session = null
    try {
      session = await withTimeout(auth(), 5000, 'Auth')
    } catch (authError) {
      console.error('[API /articles] Auth error (continuing without auth):', authError)
      // Continue without auth - articles are public
    }

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50') || 50, 100)
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

    const [articles, total] = await withTimeout(
      Promise.all([
        prisma.article.findMany({
          where,
          // Omit heavy content fields from listing — only needed on detail page
          omit: {
            content: true,
            contentUrl: true,
            contentPublicId: true,
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
      ]),
      10000,
      'Database query'
    )
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

    const articlesWithReadStatus = articles.map((article: ArticleQueryResult) => ({
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

    // ============================================
    // SERVER-SIDE SECURITY VALIDATION
    // ============================================

    // Validate required fields
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    if (body.title.length > CONTENT_LIMITS.MAX_TITLE_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Title must be under ${CONTENT_LIMITS.MAX_TITLE_LENGTH} characters` },
        { status: 400 }
      )
    }

    if (!body.content || typeof body.content !== 'string' || body.content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      )
    }

    // Validate status enum if provided
    if (body.status && !['DRAFT', 'PUBLISHED'].includes(body.status)) {
      return NextResponse.json(
        { success: false, error: 'Status must be DRAFT or PUBLISHED' },
        { status: 400 }
      )
    }

    // Validate categoryId is a string if provided
    if (body.categoryId && typeof body.categoryId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Enforce length limits and strip HTML from plain-text fields
    const title = stripHtml(body.title.slice(0, CONTENT_LIMITS.MAX_TITLE_LENGTH))
    const excerpt = stripHtml((body.excerpt || '').slice(0, CONTENT_LIMITS.MAX_EXCERPT_LENGTH))
    const content = body.content.slice(0, CONTENT_LIMITS.MAX_CONTENT_LENGTH)

    // Full content validation
    const validation = validateArticleContent({
      title,
      excerpt,
      content,
      references: body.references?.slice(0, CONTENT_LIMITS.MAX_REFERENCES),
    })

    // Block if security violations detected
    const securityErrors = validation.errors.filter(e => e.includes('Security') || e.includes('Dangerous'))
    if (securityErrors.length > 0) {
      console.error('[API /articles] Security violation blocked:', securityErrors)
      return NextResponse.json(
        { success: false, error: 'Content validation failed due to security concerns' },
        { status: 400 }
      )
    }

    // For publishing, enforce minimum word count (no maximum - accept papers of any length)
    const isPublishing = body.status !== 'DRAFT'
    if (isPublishing && validation.stats.wordCount < CONTENT_LIMITS.MIN_WORDS) {
      return NextResponse.json(
        { success: false, error: `Article must have at least ${CONTENT_LIMITS.MIN_WORDS} words to publish` },
        { status: 400 }
      )
    }

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content)

    // ============================================
    // END SECURITY VALIDATION
    // ============================================

    // Generate slug from title if not provided
    const slug = (body.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 100) + '-' + Date.now()

    // Use validated word count
    const readTime = body.readTime || Math.max(1, Math.ceil(validation.stats.wordCount / 200))

    // Get or create a default category if none provided
    let categoryId = body.categoryId

    // The frontend sends category slug (like 'sustainability'), not the database ID
    // We need to look up the actual category by slug
    if (categoryId) {
      const existingCategory = await prisma.articleCategory.findFirst({
        where: {
          OR: [
            { id: categoryId },
            { slug: categoryId },
            { name: { equals: categoryId, mode: 'insensitive' } },
          ]
        },
      })
      if (existingCategory) {
        categoryId = existingCategory.id
      } else {
        // Category doesn't exist, create it
        const safeCategoryName = stripHtml(categoryId).slice(0, 100)
        const newCategory = await prisma.articleCategory.create({
          data: {
            name: safeCategoryName.charAt(0).toUpperCase() + safeCategoryName.slice(1),
            slug: safeCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            description: `Articles about ${safeCategoryName}`,
          },
        })
        categoryId = newCategory.id
      }
    } else {
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

    // Build references data if provided
    const referencesData = Array.isArray(body.references)
      ? body.references.slice(0, CONTENT_LIMITS.MAX_REFERENCES).map((ref: any, index: number) => ({
          title: stripHtml(String(ref.title || 'Untitled')).slice(0, CONTENT_LIMITS.MAX_REFERENCE_TITLE),
          authors: ref.authors ? stripHtml(String(ref.authors)).slice(0, 500) : null,
          year: ref.year ? String(ref.year).replace(/[^0-9\-\/\s]/g, '').slice(0, 10) : null,
          url: ref.url ? sanitizeUrl(String(ref.url).slice(0, CONTENT_LIMITS.MAX_REFERENCE_URL)) || null : null,
          publisher: ref.publisher ? stripHtml(String(ref.publisher)).slice(0, 300) : null,
          format: ref.format ? stripHtml(String(ref.format)).slice(0, 20) : null,
          order: index,
        }))
      : []

    // Process tags - find or create Tag records
    const tagNames: string[] = Array.isArray(body.tags)
      ? body.tags.filter((t: any) => typeof t === 'string' && t.trim()).slice(0, 20)
      : []

    const tagConnections: { articleId: string; tagId: string }[] = []

    if (tagNames.length > 0) {
      for (const tagName of tagNames) {
        const trimmed = stripHtml(tagName.trim()).slice(0, 50)
        if (!trimmed) continue

        const tagSlug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

        // Upsert: find existing tag or create new one
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: {
            name: trimmed,
            slug: tagSlug,
          },
        })

        tagConnections.push({ articleId: '', tagId: tag.id }) // articleId filled after create
      }
    }

    // Upload content to cloud storage if available, otherwise store in DB
    let contentUrl: string | null = null
    let contentPublicId: string | null = null
    let dbContent = sanitizedContent // Fallback: full content in DB

    if (isCloudStorageAvailable()) {
      try {
        const cloudResult = await uploadArticleContent(slug, sanitizedContent)
        contentUrl = cloudResult.contentUrl
        contentPublicId = cloudResult.publicId
        // Store a truncated preview in DB (first 500 chars) for search/SEO,
        // full content lives in cloud
        dbContent = sanitizedContent.slice(0, 500)
      } catch (cloudErr) {
        console.warn('Cloud storage upload failed, falling back to DB:', cloudErr)
        // Fallback: store full content in DB
      }
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt: excerpt || sanitizedContent.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        content: dbContent,
        contentUrl,
        contentPublicId,
        coverImage: body.coverImage ? sanitizeUrl(String(body.coverImage)) || null : null,
        readTime,
        status: body.status || 'PUBLISHED',
        featured: false, // Only admins can feature articles
        publishedAt: body.status === 'DRAFT' ? null : new Date(),
        categoryId,
        authorId: session.user.id,
        seoTitle: stripHtml(String(body.seoTitle || title)).slice(0, CONTENT_LIMITS.MAX_TITLE_LENGTH),
        seoDescription: stripHtml(String(body.seoDescription || excerpt)).slice(0, CONTENT_LIMITS.MAX_EXCERPT_LENGTH),
        references: referencesData.length > 0 ? {
          create: referencesData,
        } : undefined,
        tags: tagConnections.length > 0 ? {
          create: tagConnections.map(tc => ({ tagId: tc.tagId })),
        } : undefined,
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
        references: true,
        tags: {
          include: { tag: true },
        },
      },
    })

    // Award stock points for published articles
    if (article.status === 'PUBLISHED') {
      incrementStockScore(session.user.id, STOCK_POINTS.ARTICLE).catch(() => {})
    }

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
