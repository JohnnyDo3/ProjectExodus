import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { sanitizeHtml, isValidUrl } from '@/lib/article/contentSecurity'
import {
  resolveArticleContent,
  isCloudStorageAvailable,
  updateArticleContent,
  deleteArticleContent,
} from '@/lib/article/contentStorage'
import { incrementStockScore, STOCK_POINTS } from '@/lib/stockScore'

/** Strip HTML tags from plain-text fields */
function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim()
}

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
    // Get the session up front — we need to know who's asking so we can
    // serve drafts to their author. The previous version hard-filtered on
    // status: PUBLISHED which 404'd a user trying to see their own draft.
    const session = await auth()

    const article = await prisma.article.findUnique({
      where: { slug },
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
            // Used by the published article's minimal author card to
            // render the user's fishbowl fish as the default avatar
            // when they don't have a profile image set.
            stockScore: true,
            fishCustomization: true,
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
              take: 10,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 30,
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
        references: {
          orderBy: {
            order: 'asc',
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

    // Access control: published articles are public. Anything else (DRAFT,
    // ARCHIVED, etc.) is only visible to the author.
    const isPublished = article.status === 'PUBLISHED'
    const isAuthor = session?.user?.id && session.user.id === article.authorId
    if (!isPublished && !isAuthor) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

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

        // Award stock points for every 5 articles read
        const totalReads = await prisma.articleRead.count({
          where: { userId: session.user.id },
        })
        if (totalReads % 5 === 0) {
          incrementStockScore(session.user.id, STOCK_POINTS.ARTICLE_READS_PER_5).catch(() => {})
        }
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
    const processedPeerReviews = article.peerReviews.map((review: PeerReviewWithCount) => ({
      ...review,
      likeCount: review._count?.likes || 0,
      liked: userLikedReviewIds.has(review.id),
      _count: undefined
    }))

    // Resolve content from cloud storage (CDN) or fall back to DB content
    const resolvedContent = await resolveArticleContent(article)

    // Filter author's private data based on privacy settings
    const filteredArticle = {
      ...article,
      content: resolvedContent, // Always return full content from best source
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
      select: { id: true, slug: true, authorId: true, contentPublicId: true }
    }).catch(() => null)

    if (!article) {
      article = await prisma.article.findUnique({
        where: { slug: slug },
        select: { id: true, slug: true, authorId: true, contentPublicId: true }
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

    // If content changed, update cloud storage
    let contentUrl: string | undefined
    let contentPublicId: string | undefined
    let dbContent: string | undefined

    if (body.content) {
      const sanitized = sanitizeHtml(body.content)
      if (isCloudStorageAvailable()) {
        try {
          const cloudResult = await updateArticleContent(
            article.slug,
            sanitized,
            article.contentPublicId
          )
          contentUrl = cloudResult.contentUrl
          contentPublicId = cloudResult.publicId
          dbContent = sanitized.slice(0, 500) // Truncated preview in DB
        } catch {
          dbContent = sanitized // Fallback to DB
        }
      } else {
        dbContent = sanitized
      }
    }

    const updatedArticle = await prisma.article.update({
      where: { id: article.id },
      data: {
        title: body.title ? stripHtml(body.title) : undefined,
        excerpt: body.excerpt ? stripHtml(body.excerpt) : undefined,
        content: dbContent,
        contentUrl,
        contentPublicId,
        coverImage: body.coverImage ? (isValidUrl(body.coverImage) ? body.coverImage : null) : undefined,
        readTime,
        status: body.status,
        publishedAt: body.status === 'PUBLISHED' && !body.publishedAt ? new Date() : undefined,
        seoTitle: body.seoTitle ? stripHtml(body.seoTitle) : undefined,
        seoDescription: body.seoDescription ? stripHtml(body.seoDescription) : undefined,
        // Editorial correction / editor's note. Always strip HTML —
        // this surfaces as a banner, not free-form rich text. Empty
        // string clears the note. The timestamp is set whenever the
        // note text changes (including being cleared).
        ...(body.correctionsNote !== undefined
          ? {
              correctionsNote: stripHtml(String(body.correctionsNote)).slice(0, 1500) || null,
              correctionsNoteAt: new Date(),
            }
          : {}),
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
      select: { id: true, authorId: true, contentPublicId: true }
    }).catch(() => null)

    if (!article) {
      article = await prisma.article.findUnique({
        where: { slug: slug },
        select: { id: true, authorId: true, contentPublicId: true }
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

    // Delete cloud content if it exists
    if (article.contentPublicId) {
      deleteArticleContent(article.contentPublicId).catch((err) => {
        console.warn('Failed to delete cloud content:', err.message)
      })
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
