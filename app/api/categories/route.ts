import { NextRequest, NextResponse } from 'next/server'
import { handlePrismaError } from '@/lib/utils/prisma-errors'
import { prisma } from '@/lib/db'
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
    })
    return NextResponse.json({
      success: true,
      data: categories,
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
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
    const body = await request.json()
    // Validate required fields
    if (!body.name || !body.slug) {
        { success: false, error: 'Missing required fields: name, slug' },
        { status: 400 }
    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        icon: body.icon || null,
        parentId: body.parentId || null,
          select: { products: true },
      data: category,
    console.error('Error creating category:', error)
      { success: false, error: 'Failed to create category' },
// DELETE /api/categories?id=xxx - Delete category
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
        { success: false, error: 'Missing category ID' },
    // Check if category has products
    const productCount = await prisma.product.count({
      where: { categoryId: id },
    if (productCount > 0) {
        { success: false, error: `Cannot delete category with ${productCount} products. Reassign products first.` },
    await prisma.category.delete({
      where: { id },
      message: 'Category deleted successfully',
    console.error('Error deleting category:', error)
      { success: false, error: 'Failed to delete category' },
