import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

// GET /api/tags - List all tags
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') // 'product' or 'article'
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {}

    const tags = await prisma.tag.findMany({
      where,
      include: {
        _count: {
          select: {
            products: type === 'product' || !type ? {
              where: {
                product: {
                  status: 'PUBLISHED',
                },
              },
            } : false,
            articles: type === 'article' || !type ? {
              where: {
                article: {
                  status: 'PUBLISHED',
                },
              },
            } : false,
          },
        },
      },
      take: limit,
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      data: tags,
    })
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}

// POST /api/tags - Create new tag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Add authentication and authorization check

    const tag = await prisma.tag.create({
      data: {
        name: body.name,
        slug: body.slug,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: tag,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating tag:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create tag' },
      { status: 500 }
    )
  }
}
