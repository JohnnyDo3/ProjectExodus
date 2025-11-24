import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/vendors - List all vendors
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
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
        },
        take: limit,
        skip: offset,
        orderBy: {
          name: 'asc',
        },
      }),
      prisma.vendor.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: vendors,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
}

// POST /api/vendors - Create new vendor
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

    const vendor = await prisma.vendor.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        website: body.website || null,
        logo: body.logo || null,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: vendor,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating vendor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create vendor' },
      { status: 500 }
    )
  }
}

// DELETE /api/vendors?id=xxx - Delete vendor
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
        { success: false, error: 'Missing vendor ID' },
        { status: 400 }
      )
    }

    // Check if vendor has products
    const productCount = await prisma.product.count({
      where: { vendorId: id },
    })

    if (productCount > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete vendor with ${productCount} products. Reassign products first.` },
        { status: 400 }
      )
    }

    await prisma.vendor.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Vendor deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting vendor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete vendor' },
      { status: 500 }
    )
  }
}
