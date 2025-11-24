import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/vendors/[slug] - Get single vendor
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    const vendor = await prisma.vendor.findUnique({
      where: {
        slug: slug,
      },
      include: {
        products: {
          where: {
            status: 'PUBLISHED',
          },
          include: {
            category: true,
            sustainabilityMetric: true,
            images: {
              orderBy: {
                order: 'asc',
              },
              take: 1,
            },
          },
          take: 20,
          orderBy: {
            createdAt: 'desc',
          },
        },
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
    })

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: vendor,
    })
  } catch (error) {
    console.error('Error fetching vendor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendor' },
      { status: 500 }
    )
  }
}

// PUT /api/vendors/[slug] - Update vendor
export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    const body = await request.json()

    // TODO: Add authentication and authorization check

    const vendor = await prisma.vendor.update({
      where: { slug: slug },
      data: {
        name: body.name,
        description: body.description,
        website: body.website,
        logo: body.logo,
      },
    })

    return NextResponse.json({
      success: true,
      data: vendor,
    })
  } catch (error) {
    console.error('Error updating vendor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update vendor' },
      { status: 500 }
    )
  }
}

// DELETE /api/vendors/[slug] - Delete vendor
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    // TODO: Add authentication and authorization check

    await prisma.vendor.delete({
      where: { slug: slug },
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
