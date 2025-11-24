import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/articles - List all articles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

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
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: articles,
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

// POST /api/articles - Create new article
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

    // Check if user has permission (ADMIN, EDITOR, or SUPER_ADMIN)
    const allowedRoles = ['ADMIN', 'EDITOR', 'SUPER_ADMIN']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage || null,
        readTime: body.readTime || null,
        status: body.status || 'DRAFT',
        featured: body.featured || false,
        publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
        categoryId: body.categoryId,
        authorId: session.user.id,
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
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
