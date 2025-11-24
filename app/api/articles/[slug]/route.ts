import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// GET /api/articles/[slug] - Get single article
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { slug } = await params
    const article = await prisma.article.findUnique({
      where: {
        slug: slug,
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          where: {
            parentId: null, // Only top-level comments
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            replies: {
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
                createdAt: 'asc',
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      data: article,
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}
