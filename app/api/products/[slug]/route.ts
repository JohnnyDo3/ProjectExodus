import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/products/[slug] - Get single product
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        vendor: true,
        images: {
          orderBy: {
            order: 'asc',
          },
        },
        sustainabilityMetric: true,
        tags: {
          include: {
            tag: true,
          },
        },
        reviews: {
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
            createdAt: 'desc',
          },
          take: 10,
        },
        certifications: {
          include: {
            certification: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.product.update({
      where: { id: product.id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[slug] - Update product
export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    // Authentication and authorization check
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const userRole = session.user.role
    if (!['ADMIN', 'SUPER_ADMIN', 'EDITOR'].includes(userRole || '')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin or Editor role required' },
        { status: 403 }
      )
    }

    const { slug } = await params
    const body = await request.json()

    const product = await prisma.product.update({
      where: { slug: slug },
      data: {
        name: body.name,
        description: body.description,
        specifications: body.specifications,
        price: body.price ? parseFloat(body.price) : null,
        purchaseLink: body.purchaseLink,
        status: body.status,
        featured: body.featured,
        categoryId: body.categoryId,
        vendorId: body.vendorId,
      },
      include: {
        category: true,
        vendor: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[slug] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    // Authentication and authorization check
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const userRole = session.user.role
    if (!['ADMIN', 'SUPER_ADMIN'].includes(userRole || '')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin role required' },
        { status: 403 }
      )
    }

    const { slug } = await params

    await prisma.product.delete({
      where: { slug: slug },
    })

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
