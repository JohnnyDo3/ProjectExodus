import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ categorySlug: string }> }
) {
  try {
    const { categorySlug } = await params

    // Get category by slug
    const category = await prisma.forumCategory.findUnique({
      where: { slug: categorySlug },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      )
    }

    // Get posts in this category
    const posts = await prisma.forumPost.findMany({
      where: { categoryId: category.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: { replies: true, likes: true }
        }
      },
      orderBy: [
        { pinned: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({
      success: true,
      data: {
        category,
        posts
      }
    })
  } catch (error) {
    console.error('Error fetching category posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category posts' },
      { status: 500 }
    )
  }
}
