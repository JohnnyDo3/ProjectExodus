import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

type Params = {
  params: Promise<{
    id: string
  }>
}

// POST /api/collections/[id]/follow - Follow a collection
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

    const { id } = await params

    // Check if collection exists and is public
    const collection = await prisma.readingCollection.findUnique({
      where: { id },
      select: { id: true, userId: true, isPublic: true, name: true }
    })

    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    // Can't follow your own collection
    if (collection.userId === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Cannot follow your own collection' },
        { status: 400 }
      )
    }

    // Can't follow private collection
    if (!collection.isPublic) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      )
    }

    // Check if already following
    const existing = await prisma.collectionFollow.findUnique({
      where: {
        userId_collectionId: {
          userId: session.user.id,
          collectionId: id
        }
      }
    })

    if (existing) {
      return NextResponse.json({
        success: true,
        data: { following: true, message: 'Already following this collection' }
      })
    }

    // Create follow
    await prisma.collectionFollow.create({
      data: {
        userId: session.user.id,
        collectionId: id
      }
    })

    // Get updated follower count
    const followerCount = await prisma.collectionFollow.count({
      where: { collectionId: id }
    })

    return NextResponse.json({
      success: true,
      data: {
        following: true,
        followerCount
      }
    })
  } catch (error) {
    console.error('Error following collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to follow collection' },
      { status: 500 }
    )
  }
}

// DELETE /api/collections/[id]/follow - Unfollow a collection
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

    // Delete follow if exists
    try {
      await prisma.collectionFollow.delete({
        where: {
          userId_collectionId: {
            userId: session.user.id,
            collectionId: id
          }
        }
      })
    } catch (e) {
      // Follow didn't exist, that's fine
    }

    // Get updated follower count
    const followerCount = await prisma.collectionFollow.count({
      where: { collectionId: id }
    })

    return NextResponse.json({
      success: true,
      data: {
        following: false,
        followerCount
      }
    })
  } catch (error) {
    console.error('Error unfollowing collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unfollow collection' },
      { status: 500 }
    )
  }
}
