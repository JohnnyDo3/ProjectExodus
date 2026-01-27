import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// Type for peer review with like count
interface PeerReviewWithCount {
  id: string
  _count: { likes: number }
  [key: string]: any
}

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
            email: true,
            image: true,
            bio: true,
            headline: true,
            location: true,
            phone: true,
            showPhone: true,
            showEmail: true,
            interests: true,
            expertise: true,
            guardianArchetype: true,
            declaration: true,
            _count: {
              select: {
                followers: true,
                following: true,
                projectMemberships: true,
                articles: true,
                createdProjects: true,
              }
            }
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
            _count: {
              select: { likes: true }
            }
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

    // Get session for user's like status
    const session = await auth()

    // Track unique user views - only increment if this user hasn't viewed before
    if (session?.user?.id) {
      // For authenticated users, check if they've already viewed this article
      const existingRead = await prisma.articleRead.findUnique({
        where: {
          userId_articleId: {
            userId: session.user.id,
            articleId: article.id,
          },
        },
      })

      // Only increment view count for new unique viewers
      if (!existingRead) {
        await Promise.all([
          prisma.article.update({
            where: { id: article.id },
            data: { views: { increment: 1 } },
          }),
          prisma.articleRead.create({
            data: {
              userId: session.user.id,
              articleId: article.id,
            },
          }),
        ])
      }
    } else {
      // For anonymous users, still increment (but this is less precise)
      // Could track by IP or session if needed, but for now just increment
      await prisma.article.update({
        where: { id: article.id },
        data: { views: { increment: 1 } },
      })
    }

    // Get user's liked review IDs if logged in
    let userLikedReviewIds: Set<string> = new Set()
    if (session?.user?.id && article.peerReviews.length > 0) {
      const userLikes = await prisma.reviewLike.findMany({
        where: {
          reviewId: { in: article.peerReviews.map((r: PeerReviewWithCount) => r.id) },
          userId: session.user.id
        },
        select: { reviewId: true }
      })
      userLikedReviewIds = new Set(userLikes.map((l: { reviewId: string }) => l.reviewId))
    }

    // Process peer reviews to include likeCount and liked status
    // Get session for user's like status
    const session = await auth()

    // Get user's liked review IDs if logged in
    let userLikedReviewIds: Set<string> = new Set()
    if (session?.user?.id && article.peerReviews.length > 0) {
      const userLikes = await prisma.reviewLike.findMany({
        where: {
          reviewId: { in: article.peerReviews.map((r: PeerReviewWithCount) => r.id) },
          userId: session.user.id
        },
        select: { reviewId: true }
      })
      userLikedReviewIds = new Set(userLikes.map((l: { reviewId: string }) => l.reviewId))
    }

    // Process peer reviews to include likeCount and liked status
    const processedPeerReviews = article.peerReviews.map((review: PeerReviewWithCount) => ({
      ...review,
      likeCount: review._count?.likes || 0,
      liked: userLikedReviewIds.has(review.id),
      _count: undefined
    }))

    // Filter author's private data based on privacy settings
    const filteredArticle = {
      ...article,
      peerReviews: processedPeerReviews,
      author: {
        ...article.author,
        email: article.author.showEmail ? article.author.email : undefined,
        phone: article.author.showPhone ? article.author.phone : undefined,
        showEmail: undefined,
        showPhone: undefined,
      },
    }

    return NextResponse.json({
      success: true,
      data: filteredArticle,
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
