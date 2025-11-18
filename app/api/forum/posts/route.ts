import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
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

    const post = await prisma.forumPost.create({
      data: {
        title: body.title,
        content: body.content,
        categoryId: body.categoryId,
        authorId: session.user.id,
        pinned: false,
        locked: false,
      },
      include: {
        category: true,
        author: {
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
