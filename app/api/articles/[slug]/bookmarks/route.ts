import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/articles/[slug]/bookmarks - Get user's bookmarks for an article
export async function GET(
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

    const { slug } = await params

    // Find article by slug
    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    const bookmarks = await prisma.articleBookmark.findMany({
      where: {
        userId: session.user.id,
        articleId: article.id
      },
      orderBy: {
        position: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: bookmarks
    })
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookmarks' },
      { status: 500 }
    )
  }
}

// POST /api/articles/[slug]/bookmarks - Add a new bookmark
export async function POST(
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

    const { slug } = await params
    const body = await request.json()

    // Find article by slug
    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    const { position, title, note } = body

    if (position === undefined || position === null) {
      return NextResponse.json(
        { success: false, error: 'Position is required' },
        { status: 400 }
      )
    }

    const bookmark = await prisma.articleBookmark.create({
      data: {
        userId: session.user.id,
        articleId: article.id,
        position,
        title: title || null,
        note: note || null
      }
    })

    // Award points for adding a bookmark
    await awardPoints(session.user.id, 'BOOKMARK_ADDED', 2, `Added bookmark in article: ${slug}`)

    return NextResponse.json({
      success: true,
      data: bookmark
    })
  } catch (error) {
    console.error('Error creating bookmark:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create bookmark' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[slug]/bookmarks - Delete a bookmark
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

    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const bookmarkId = searchParams.get('id')

    if (!bookmarkId) {
      return NextResponse.json(
        { success: false, error: 'Bookmark ID is required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const bookmark = await prisma.articleBookmark.findFirst({
      where: {
        id: bookmarkId,
        userId: session.user.id
      }
    })

    if (!bookmark) {
      return NextResponse.json(
        { success: false, error: 'Bookmark not found' },
        { status: 404 }
      )
    }

    await prisma.articleBookmark.delete({
      where: { id: bookmarkId }
    })

    return NextResponse.json({
      success: true,
      message: 'Bookmark deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting bookmark:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete bookmark' },
      { status: 500 }
    )
  }
}

// Helper function to award points
async function awardPoints(userId: string, reason: string, amount: number, description: string) {
  try {
    const userPoints = await prisma.userPoints.upsert({
      where: { userId },
      create: {
        userId,
        totalPoints: amount,
        currentPoints: amount,
        level: 1,
        levelProgress: amount
      },
      update: {
        totalPoints: { increment: amount },
        currentPoints: { increment: amount },
        levelProgress: { increment: amount }
      }
    })

    await prisma.pointTransaction.create({
      data: {
        userPointsId: userPoints.id,
        amount,
        reason: reason as any,
        description
      }
    })
  } catch (error) {
    console.error('Error awarding points:', error)
  }
}
