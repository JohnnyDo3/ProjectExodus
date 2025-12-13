import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    id: string
  }>
}

// POST /api/collections/[id]/articles - Add article to collection
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

    const { id } = await params
    const body = await request.json()
    const { articleId, note } = body

    if (!articleId) {
      return NextResponse.json(
        { success: false, error: 'Article ID is required' },
        { status: 400 }
      )
    }

    // Check ownership
    const collection = await prisma.readingCollection.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    if (collection.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true, status: true }
    })

    if (!article || article.status !== 'PUBLISHED') {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Get current max order
    const maxOrder = await prisma.collectionArticle.aggregate({
      where: { collectionId: id },
      _max: { order: true }
    })

    // Add article to collection
    const collectionArticle = await prisma.collectionArticle.create({
      data: {
        collectionId: id,
        articleId,
        note: note || null,
        order: (maxOrder._max.order || 0) + 1
      },
      include: {
        article: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            category: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...collectionArticle.article,
        note: collectionArticle.note,
        order: collectionArticle.order,
        addedAt: collectionArticle.addedAt
      }
    })
  } catch (error: any) {
    // Handle duplicate entry
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Article already in collection' },
        { status: 409 }
      )
    }
    console.error('Error adding article to collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add article to collection' },
      { status: 500 }
    )
  }
}

// PUT /api/collections/[id]/articles - Reorder articles in collection
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

    const { id } = await params
    const body = await request.json()
    const { articleOrder } = body // Array of { articleId, order }

    if (!articleOrder || !Array.isArray(articleOrder)) {
      return NextResponse.json(
        { success: false, error: 'Article order array is required' },
        { status: 400 }
      )
    }

    // Check ownership
    const collection = await prisma.readingCollection.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    if (collection.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Update order for each article
    await prisma.$transaction(
      articleOrder.map((item: { articleId: string; order: number }) =>
        prisma.collectionArticle.updateMany({
          where: {
            collectionId: id,
            articleId: item.articleId
          },
          data: { order: item.order }
        })
      )
    )

    return NextResponse.json({
      success: true,
      message: 'Article order updated successfully'
    })
  } catch (error) {
    console.error('Error reordering articles:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reorder articles' },
      { status: 500 }
    )
  }
}

// DELETE /api/collections/[id]/articles - Remove article from collection
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

    const { id } = await params
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('articleId')

    if (!articleId) {
      return NextResponse.json(
        { success: false, error: 'Article ID is required' },
        { status: 400 }
      )
    }

    // Check ownership
    const collection = await prisma.readingCollection.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    if (collection.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Remove article from collection
    await prisma.collectionArticle.delete({
      where: {
        collectionId_articleId: {
          collectionId: id,
          articleId
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Article removed from collection'
    })
  } catch (error) {
    console.error('Error removing article from collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove article from collection' },
      { status: 500 }
    )
  }
}
