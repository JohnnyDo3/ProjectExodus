import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

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
    // Check authentication and admin permission
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const allowedRoles = ['ADMIN', 'EDITOR', 'SUPER_ADMIN']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()

    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, slug' },
        { status: 400 }
      )
    }

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

// DELETE /api/tags?id=xxx - Delete tag
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication and admin permission
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing tag ID' },
        { status: 400 }
      )
    }

    // Delete all junction table entries first
    await prisma.productTag.deleteMany({
      where: { tagId: id },
    })

    await prisma.articleTag.deleteMany({
      where: { tagId: id },
    })

    // Then delete the tag
    await prisma.tag.delete({
      where: { id },
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
