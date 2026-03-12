import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// POST /api/articles/[slug]/reviews/like - Toggle like on a review
export async function POST(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to like reviews' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { reviewId } = body

    if (!reviewId) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      )
    }

    // Verify the review exists
    const review = await prisma.articlePeerReview.findUnique({
      where: { id: reviewId },
      select: { id: true }
    })

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      )
    }

    // Check if user already liked this review
    const existingLike = await prisma.reviewLike.findUnique({
      where: {
        reviewId_userId: {
          reviewId,
          userId: session.user.id
        }
      }
    })

    let liked: boolean
    let likeCount: number

    if (existingLike) {
      // Unlike - remove the like
      await prisma.reviewLike.delete({
        where: { id: existingLike.id }
      })
      liked = false
    } else {
      // Like - create new like
      await prisma.reviewLike.create({
        data: {
          reviewId,
          userId: session.user.id
        }
      })
      liked = true
    }

    // Get updated like count
    likeCount = await prisma.reviewLike.count({
      where: { reviewId }
    })

    return NextResponse.json({
      success: true,
      data: {
        liked,
        likeCount
      }
    })
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}

// GET /api/articles/[slug]/reviews/like - Get like status for reviews
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const reviewIds = searchParams.get('reviewIds')?.split(',').filter(Boolean) || []

    if (reviewIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: {}
      })
    }

    // Get like counts for all requested reviews
    const likeCounts = await prisma.reviewLike.groupBy({
      by: ['reviewId'],
      where: {
        reviewId: { in: reviewIds }
      },
      _count: {
        reviewId: true
      }
    })

    // Build counts map
    const countsMap: Record<string, number> = {}
    likeCounts.forEach((item: { reviewId: string; _count: { reviewId: number } }) => {
      countsMap[item.reviewId] = item._count.reviewId
    })

    // If user is logged in, get their likes
    const userLikesMap: Record<string, boolean> = {}
    if (session?.user?.id) {
      const userLikes = await prisma.reviewLike.findMany({
        where: {
          reviewId: { in: reviewIds },
          userId: session.user.id
        },
        select: { reviewId: true }
      })
      userLikes.forEach((like: { reviewId: string }) => {
        userLikesMap[like.reviewId] = true
      })
    }

    // Combine data
    const result: Record<string, { likeCount: number; liked: boolean }> = {}
    reviewIds.forEach((id: string) => {
      result[id] = {
        likeCount: countsMap[id] || 0,
        liked: userLikesMap[id] || false
      }
    })

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error fetching like data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch like data' },
      { status: 500 }
    )
  }
}
