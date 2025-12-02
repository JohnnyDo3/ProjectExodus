import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    slug: string
  }>
}

// POST /api/articles/[slug]/mark-read - Mark article as read by current user
export async function POST(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { slug } = await params

    // Find the article by slug or ID
    let article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (!article) {
      // Try finding by ID
      article = await prisma.article.findUnique({
        where: { id: slug },
        select: { id: true }
      })
    }

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      )
    }

    // Create or update the read record
    await prisma.articleRead.upsert({
      where: {
        userId_articleId: {
          userId: session.user.id,
          articleId: article.id,
        },
      },
      create: {
        userId: session.user.id,
        articleId: article.id,
      },
      update: {
        readAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Article marked as read',
    })
  } catch (error) {
    console.error('Error marking article as read:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to mark article as read' },
      { status: 500 }
    )
  }
}
