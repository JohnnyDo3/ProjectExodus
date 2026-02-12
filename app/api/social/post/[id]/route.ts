import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    const post = await prisma.socialPost.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            headline: true
          }
        },
        media: {
          orderBy: { order: 'asc' }
        },
        likes: session?.user?.id ? {
          where: { userId: session.user.id }
        } : false,
        comments: {
          where: { parentId: null },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                headline: true
              }
            },
            children: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true
                  }
                },
                children: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        image: true
                      }
                    }
                  },
                  orderBy: { createdAt: 'asc' }
                }
              },
              orderBy: { createdAt: 'asc' }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...post,
        isLiked: session?.user?.id ? post.likes && post.likes.length > 0 : false
      }
    })
  } catch (error) {
    console.error('Error fetching discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussion' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user owns the post
    const post = await prisma.socialPost.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    if (post.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { content, visibility } = body

    const updated = await prisma.socialPost.update({
      where: { id },
      data: {
        content: content?.trim(),
        visibility: visibility || undefined
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: updated
    })
  } catch (error) {
    console.error('Error updating discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update discussion' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user owns the post
    const post = await prisma.socialPost.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      )
    }

    if (post.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    await prisma.socialPost.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Discussion deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting discussion:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete discussion' },
      { status: 500 }
    )
  }
}
