import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/articles/[slug]/highlights - Get user's highlights for an article
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

    const highlights = await prisma.articleHighlight.findMany({
      where: {
        userId: session.user.id,
        articleId: article.id
      },
      orderBy: {
        startPos: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: highlights
    })
  } catch (error) {
    console.error('Error fetching highlights:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch highlights' },
      { status: 500 }
    )
  }
}

// POST /api/articles/[slug]/highlights - Add a new highlight
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

    const { startPos, endPos, text, color, note } = body

    // Validate required fields
    if (startPos === undefined || endPos === undefined || !text) {
      return NextResponse.json(
        { success: false, error: 'startPos, endPos, and text are required' },
        { status: 400 }
      )
    }

    // Validate color if provided
    const validColors = ['yellow', 'green', 'blue', 'pink', 'purple']
    const highlightColor = validColors.includes(color) ? color : 'yellow'

    const highlight = await prisma.articleHighlight.create({
      data: {
        userId: session.user.id,
        articleId: article.id,
        startPos,
        endPos,
        text,
        color: highlightColor,
        note: note || null
      }
    })

    // Award points for adding a highlight
    await awardPoints(session.user.id, 'HIGHLIGHT_ADDED', 2, `Added highlight in article: ${slug}`)

    return NextResponse.json({
      success: true,
      data: highlight
    })
  } catch (error) {
    console.error('Error creating highlight:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create highlight' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[slug]/highlights - Update a highlight (note or color)
export async function PUT(
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

    const body = await request.json()
    const { id, color, note } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Highlight ID is required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const existingHighlight = await prisma.articleHighlight.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!existingHighlight) {
      return NextResponse.json(
        { success: false, error: 'Highlight not found' },
        { status: 404 }
      )
    }

    // Validate color if provided
    const validColors = ['yellow', 'green', 'blue', 'pink', 'purple']
    const updateData: { color?: string; note?: string | null } = {}

    if (color !== undefined) {
      updateData.color = validColors.includes(color) ? color : existingHighlight.color
    }
    if (note !== undefined) {
      updateData.note = note || null
    }

    const highlight = await prisma.articleHighlight.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      data: highlight
    })
  } catch (error) {
    console.error('Error updating highlight:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update highlight' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[slug]/highlights - Delete a highlight
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
    const highlightId = searchParams.get('id')

    if (!highlightId) {
      return NextResponse.json(
        { success: false, error: 'Highlight ID is required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const highlight = await prisma.articleHighlight.findFirst({
      where: {
        id: highlightId,
        userId: session.user.id
      }
    })

    if (!highlight) {
      return NextResponse.json(
        { success: false, error: 'Highlight not found' },
        { status: 404 }
      )
    }

    await prisma.articleHighlight.delete({
      where: { id: highlightId }
    })

    return NextResponse.json({
      success: true,
      message: 'Highlight deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting highlight:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete highlight' },
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
