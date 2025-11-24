import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// POST /api/forum/posts - Create new forum post
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to create posts' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.content || !body.categoryId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, content, categoryId' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const baseSlug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60)

    // Add timestamp to ensure uniqueness
    const slug = `${baseSlug}-${Date.now()}`

    const post = await prisma.forumPost.create({
      data: {
        title: body.title,
        slug: slug,
        content: body.content,
        categoryId: body.categoryId,
        userId: session.user.id,
        pinned: false,
        locked: false,
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error('Error creating forum post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create forum post' },
      { status: 500 }
    )
  }
}
