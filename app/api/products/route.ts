import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { z } from 'zod'

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

// Schema for product creation with proper validation
const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name must be less than 200 characters').trim(),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug must be less than 200 characters').trim()
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Description is required').max(5000, 'Description must be less than 5000 characters').trim(),
  specifications: z.string().max(10000, 'Specifications must be less than 10000 characters').optional(),
  price: z.number().min(0, 'Price must be positive').max(1000000, 'Price is too large').optional().nullable(),
  purchaseLink: z.string().url('Invalid purchase link URL').max(2000, 'URL is too long').optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  featured: z.boolean().optional(),
  categoryId: z.string().cuid('Invalid category ID'),
  vendorId: z.string().cuid('Invalid vendor ID').optional().nullable(),
})

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has permission (ADMIN, EDITOR, or SUPER_ADMIN)
    const allowedRoles = ['ADMIN', 'EDITOR', 'SUPER_ADMIN']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validate and sanitize input
    const validatedData = createProductSchema.parse(body)

    // Check for slug uniqueness
    const existingProduct = await prisma.product.findUnique({
      where: { slug: validatedData.slug }
    })

    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: 'A product with this slug already exists' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        slug: validatedData.slug,
        description: validatedData.description,
        specifications: validatedData.specifications || null,
        price: validatedData.price || null,
        purchaseLink: validatedData.purchaseLink || null,
        status: validatedData.status || 'DRAFT',
        featured: validatedData.featured || false,
        categoryId: validatedData.categoryId,
        vendorId: validatedData.vendorId || null,
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
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0]
      return NextResponse.json(
        {
          success: false,
          error: firstIssue?.message || 'Validation failed',
          field: firstIssue?.path?.[0] || null,
          details: error.issues
        },
        { status: 400 }
      )
    }

    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
