import { NextRequest, NextResponse } from 'next/server'
import { handlePrismaError } from '@/lib/utils/prisma-errors'
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
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
    const body = await request.json()
    if (!body.name || !body.slug) {
        { success: false, error: 'Missing required fields: name, slug' },
        { status: 400 }
    const vendor = await prisma.vendor.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        website: body.website || null,
        logo: body.logo || null,
      {
        success: true,
        data: vendor,
      { status: 201 }
    console.error('Error creating vendor:', error)
      { success: false, error: 'Failed to create vendor' },
// DELETE /api/vendors?id=xxx - Delete vendor
export async function DELETE(request: NextRequest) {
    const allowedRoles = ['ADMIN', 'SUPER_ADMIN']
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
        { success: false, error: 'Missing vendor ID' },
    // Check if vendor has products
    const productCount = await prisma.product.count({
      where: { vendorId: id },
    if (productCount > 0) {
        { success: false, error: `Cannot delete vendor with ${productCount} products. Reassign products first.` },
    await prisma.vendor.delete({
      where: { id },
      message: 'Vendor deleted successfully',
    console.error('Error deleting vendor:', error)
      { success: false, error: 'Failed to delete vendor' },
