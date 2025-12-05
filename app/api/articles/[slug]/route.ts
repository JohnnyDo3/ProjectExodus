import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/articles/[slug] - Get single article
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    const article = await prisma.article.findUnique({
      where: {
        slug: slug,
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          where: {
            parentId: null, // Only top-level comments
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        peerReviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[slug] - Update an article
export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const body = await request.json()

    // Find article by slug or ID
    let article = await prisma.article.findUnique({
      where: { id: slug },
      select: { id: true, authorId: true }
    }).catch(() => null)

    if (!article) {
      article = await prisma.article.findUnique({
        where: { slug: slug },
        select: { id: true, authorId: true }
      })
    }

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Check ownership
    if (article.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - You can only edit your own articles' },
        { status: 403 }
      )
    }

    // Calculate read time if content changed
    let readTime = body.readTime
    if (body.content && !body.readTime) {
      const wordCount = body.content.split(/\s+/).length
      readTime = Math.max(1, Math.ceil(wordCount / 200))
    }

    const updatedArticle = await prisma.article.update({
      where: { id: article.id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        readTime,
        status: body.status,
        publishedAt: body.status === 'PUBLISHED' && !body.publishedAt ? new Date() : undefined,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
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
      data: updatedArticle,
    })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[slug] - Delete an article (accepts slug or ID)
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params

    // Try to find by ID first, then by slug
    let article = await prisma.article.findUnique({
      where: { id: slug },
      select: { id: true, authorId: true }
    }).catch(() => null)

    if (!article) {
      article = await prisma.article.findUnique({
        where: { slug: slug },
        select: { id: true, authorId: true }
      })
    }

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    if (article.authorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - You can only delete your own articles' },
        { status: 403 }
      )
    }

    // Delete the article
    await prisma.article.delete({
      where: { id: article.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}
