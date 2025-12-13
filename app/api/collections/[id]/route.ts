import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    id: string
  }>
}

type CollectionArticleItem = {
  article: Record<string, unknown>
  note: string | null
  order: number
  addedAt: Date
}

// GET /api/collections/[id] - Get a single collection with articles
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const session = await auth()
    const { id } = await params

    // Try to find by ID first, then by slug
    let collection = await prisma.readingCollection.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            guardianArchetype: true
          }
        },
        articles: {
          orderBy: { order: 'asc' },
          include: {
            article: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    guardianArchetype: true
                  }
                },
                category: true
              }
            }
          }
        },
        _count: {
          select: {
            articles: true,
            followers: true
          }
        }
      }
    })

    if (!collection) {
      // Try by slug
      collection = await prisma.readingCollection.findUnique({
        where: { slug: id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              bio: true,
              guardianArchetype: true
            }
          },
          articles: {
            orderBy: { order: 'asc' },
            include: {
              article: {
                include: {
                  author: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                      guardianArchetype: true
                    }
                  },
                  category: true
                }
              }
            }
          },
          _count: {
            select: {
              articles: true,
              followers: true
            }
          }
        }
      })
    }

    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    // Check if user can view (public or owner)
    const isOwner = session?.user?.id === collection.userId
    if (!collection.isPublic && !isOwner) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    // Check if user follows this collection
    let isFollowing = false
    if (session?.user?.id && !isOwner) {
      const follow = await prisma.collectionFollow.findUnique({
        where: {
          userId_collectionId: {
            userId: session.user.id,
            collectionId: collection.id
          }
        }
      })
      isFollowing = !!follow
    }

    return NextResponse.json({
      success: true,
      data: {
        ...collection,
        articles: collection.articles.map((ca: CollectionArticleItem) => ({
          ...ca.article,
          note: ca.note,
          order: ca.order,
          addedAt: ca.addedAt
        })),
        articleCount: collection._count.articles,
        followerCount: collection._count.followers,
        isFollowing,
        isOwner,
        _count: undefined
      }
    })
  } catch (error) {
    console.error('Error fetching collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collection' },
      { status: 500 }
    )
  }
}

// PUT /api/collections/[id] - Update a collection
export async function PUT(
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

    const { id } = await params
    const body = await request.json()

    // Check ownership
    const collection = await prisma.readingCollection.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    if (collection.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const { name, description, coverImage, isPublic } = body

    const updated = await prisma.readingCollection.update({
      where: { id },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        description: description !== undefined ? description : undefined,
        coverImage: coverImage !== undefined ? coverImage : undefined,
        isPublic: isPublic !== undefined ? isPublic : undefined
      },
      include: {
        _count: {
          select: {
            articles: true,
            followers: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...updated,
        articleCount: updated._count.articles,
        followerCount: updated._count.followers,
        _count: undefined
      }
    })
  } catch (error) {
    console.error('Error updating collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update collection' },
      { status: 500 }
    )
  }
}

// DELETE /api/collections/[id] - Delete a collection
export async function DELETE(
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

    const { id } = await params

    // Check ownership
    const collection = await prisma.readingCollection.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    if (collection.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    await prisma.readingCollection.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Collection deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete collection' },
      { status: 500 }
    )
  }
}
