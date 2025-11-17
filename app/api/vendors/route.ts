import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

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
    const body = await request.json()

    // TODO: Add authentication and authorization check

    const vendor = await prisma.vendor.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        website: body.website,
        logo: body.logo,
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
