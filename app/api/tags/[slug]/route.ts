import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/tags/[slug] - Get single tag
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    const tag = await prisma.tag.findUnique({
      where: {
        slug: slug,
      },
      include: {
        products: {
          where: {
            product: {
              status: 'PUBLISHED',
            },
          },
          include: {
            product: {
              include: {
                category: true,
                vendor: true,
                sustainabilityMetric: true,
              },
            },
          },
          take: 20,
        },
        articles: {
          where: {
            article: {
              status: 'PUBLISHED',
            },
          },
          include: {
            article: {
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
            },
          },
          take: 20,
        },
        _count: {
          select: {
            products: true,
            articles: true,
          },
        },
      },
    })

    if (!tag) {
      return NextResponse.json(
        { success: false, error: 'Tag not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: tag,
    })
  } catch (error) {
    console.error('Error fetching tag:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tag' },
      { status: 500 }
    )
  }
}

// PUT /api/tags/[slug] - Update tag
export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    const body = await request.json()

    // TODO: Add authentication and authorization check

    const tag = await prisma.tag.update({
      where: { slug: slug },
      data: {
        name: body.name,
      },
    })

    return NextResponse.json({
      success: true,
      data: tag,
    })
  } catch (error) {
    console.error('Error updating tag:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update tag' },
      { status: 500 }
    )
  }
}

// DELETE /api/tags/[slug] - Delete tag
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    // TODO: Add authentication and authorization check

    await prisma.tag.delete({
      where: { slug: slug },
    })

    return NextResponse.json({
      success: true,
      message: 'Tag deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting tag:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete tag' },
      { status: 500 }
    )
  }
}
