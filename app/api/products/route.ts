import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

// GET /api/products - List all products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {
      status: 'PUBLISHED',
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (featured === 'true') {
      where.featured = true
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          vendor: true,
          images: true,
          sustainabilityMetric: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Add authentication check here
    // For now, allowing all requests (will secure later)

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        specifications: body.specifications,
        price: body.price ? parseFloat(body.price) : null,
        purchaseLink: body.purchaseLink,
        status: body.status || 'DRAFT',
        featured: body.featured || false,
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
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
