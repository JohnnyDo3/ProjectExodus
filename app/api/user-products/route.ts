import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, price, category, materials, externalUrl, images } = body

    // Validation
    if (!name || !description || !price || !category || !materials || !externalUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (price <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      )
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: 'At least one product image is required' },
        { status: 400 }
      )
    }

    // Create user product
    const userProduct = await prisma.userProduct.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        materials,
        externalUrl,
        images,
        sellerId: session.user.id,
        approvalStatus: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      product: userProduct,
    })
  } catch (error) {
    console.error('Error creating user product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'APPROVED'
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {
      approvalStatus: status,
    }

    if (category && category !== 'all') {
      where.category = category
    }

    const products = await prisma.userProduct.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      products,
    })
  } catch (error) {
    console.error('Error fetching user products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
