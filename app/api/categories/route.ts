import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { auth } from '@/auth'

// GET /api/categories - List all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: {
              where: {
                status: 'PUBLISHED',
              },
            },
          },
        },
        children: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Create new category
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

    const allowedRoles = ['ADMIN', 'SUPER_ADMIN']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, slug' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        icon: body.icon || null,
        parentId: body.parentId || null,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: category,
    })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

// DELETE /api/categories?id=xxx - Delete category
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
        { success: false, error: 'Missing category ID' },
        { status: 400 }
      )
    }

    // Check if category has products
    const productCount = await prisma.product.count({
      where: { categoryId: id },
    })

    if (productCount > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete category with ${productCount} products. Reassign products first.` },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
