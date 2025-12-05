import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/article-categories - List all article categories
export async function GET() {
  try {
    const categories = await prisma.articleCategory.findMany({
      include: {
        _count: {
          select: {
            articles: {
              where: {
                status: 'PUBLISHED',
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error('Error fetching article categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article categories' },
      { status: 500 }
    )
  }
}
