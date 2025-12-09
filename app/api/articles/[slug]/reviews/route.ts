import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// Recursive function to build nested reply structure
function buildReplyTree(reviews: any[], parentId: string | null = null): any[] {
  return reviews
    .filter(review => review.parentId === parentId)
    .map(review => ({
      ...review,
      replies: buildReplyTree(reviews, review.id)
    }))
}

// GET /api/articles/[slug]/reviews - Get all peer reviews for an article
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    const { slug } = await params

    // Find article by slug or ID
    let article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, authorId: true }
    })

    if (!article) {
      // Try finding by ID
      article = await prisma.article.findUnique({
        where: { id: slug },
        select: { id: true, authorId: true }
      }).catch(() => null)
    }

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Fetch all reviews with like counts
    const allReviews = await prisma.articlePeerReview.findMany({
      where: { articleId: article.id },
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
      orderBy: { createdAt: 'desc' },
    })

    // Get user's likes if logged in
    let userLikedReviewIds: Set<string> = new Set()
    if (session?.user?.id) {
      const userLikes = await prisma.reviewLike.findMany({
        where: {
          reviewId: { in: allReviews.map((r: { id: string }) => r.id) },
          userId: session.user.id
        },
        select: { reviewId: true }
      })
      userLikedReviewIds = new Set(userLikes.map((l: { reviewId: string }) => l.reviewId))
    }

    // Add like info to reviews
    const reviewsWithLikes = allReviews.map((review: any) => ({
      ...review,
      likeCount: review._count.likes,
      liked: userLikedReviewIds.has(review.id),
      _count: undefined // Remove _count from response
    }))

    // Build nested tree structure
    const reviewTree = buildReplyTree(reviewsWithLikes)

    // Calculate stats for top-level reviews only
    const topLevelReviews = allReviews.filter((r: { parentId: string | null, rating: number | null }) => !r.parentId && r.rating)
    const averageRating = topLevelReviews.length > 0
      ? topLevelReviews.reduce((sum: number, r: { rating: number | null }) => sum + (r.rating || 0), 0) / topLevelReviews.length
      : 0

    return NextResponse.json({
      success: true,
      data: {
        reviews: reviewTree,
        stats: {
          totalReviews: topLevelReviews.length,
          totalReplies: allReviews.length - topLevelReviews.length,
          averageRating: Math.round(averageRating * 10) / 10,
        },
        articleAuthorId: article.authorId,
      },
    })
  } catch (error) {
    console.error('Error fetching peer reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch peer reviews' },
      { status: 500 }
    )
  }
}

// POST /api/articles/[slug]/reviews - Create a new peer review or reply
export async function POST(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to submit a review' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const body = await request.json()
    const { content, rating, accuracy, clarity, relevance, parentId } = body

    // Validate content
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Review content is required' },
        { status: 400 }
      )
    }

    // Find article by slug or ID
    let article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, authorId: true }
    })

    if (!article) {
      article = await prisma.article.findUnique({
        where: { id: slug },
        select: { id: true, authorId: true }
      }).catch(() => null)
    }

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Validate rating if provided
    if (rating !== undefined && rating !== null && rating !== 0) {
      if (rating < 1 || rating > 5) {
        return NextResponse.json(
          { success: false, error: 'Rating must be between 1 and 5' },
          { status: 400 }
        )
      }
    }

    // If it's a reply, verify parent exists
    if (parentId) {
      const parentReview = await prisma.articlePeerReview.findUnique({
        where: { id: parentId },
        select: { articleId: true }
      })

      if (!parentReview || parentReview.articleId !== article.id) {
        return NextResponse.json(
          { success: false, error: 'Parent review not found' },
          { status: 404 }
        )
      }
    }

    // Check if user already has a RATED review (can only submit one rated review per article)
    // Users can submit unlimited comments (reviews without ratings)
    const hasRating = rating !== undefined && rating !== null && rating > 0
    if (!parentId && hasRating) {
      const existingRatedReview = await prisma.articlePeerReview.findFirst({
        where: {
          articleId: article.id,
          userId: session.user.id,
          parentId: null,
          rating: { not: null, gt: 0 } // Only check for rated reviews
        }
      })

      if (existingRatedReview) {
        return NextResponse.json(
          { success: false, error: 'You have already submitted a rated review for this article. You can still add comments.' },
          { status: 400 }
        )
      }
    }

    // Create the review/reply
    const review = await prisma.articlePeerReview.create({
      data: {
        articleId: article.id,
        userId: session.user.id,
        content: content.trim(),
        parentId: parentId || null,
        // Only set ratings for top-level reviews with ratings
        rating: parentId ? null : (hasRating ? rating : null),
        accuracy: parentId ? null : (hasRating ? (accuracy || null) : null),
        clarity: parentId ? null : (hasRating ? (clarity || null) : null),
        relevance: parentId ? null : (hasRating ? (relevance || null) : null),
      },
      include: {
        user: {
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
      data: {
        ...review,
        replies: [], // New review has no replies yet
      },
    })
  } catch (error) {
    console.error('Error creating peer review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create peer review' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[slug]/reviews - Delete a peer review (only own reviews)
export async function DELETE(
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

    const { searchParams } = new URL(request.url)
    const reviewId = searchParams.get('reviewId')

    if (!reviewId) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      )
    }

    // Find the review
    const review = await prisma.articlePeerReview.findUnique({
      where: { id: reviewId },
      select: { userId: true }
    })

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      )
    }

    // Check ownership
    if (review.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - You can only delete your own reviews' },
        { status: 403 }
      )
    }

    // Delete the review (cascades to replies due to schema)
    await prisma.articlePeerReview.delete({
      where: { id: reviewId }
    })

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting peer review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete peer review' },
      { status: 500 }
    )
  }
}
