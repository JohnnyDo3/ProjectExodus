import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// Helper to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    + '-' + Date.now().toString(36)
}

// GET /api/collections - Get collections (public or user's own)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'public' // 'public', 'mine', 'featured', 'following'
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const offset = parseInt(searchParams.get('offset') || '0')
    const userId = searchParams.get('userId') // For getting a specific user's public collections

    let whereClause: any = {}
    let orderBy: any = { createdAt: 'desc' }

    switch (type) {
      case 'mine':
        if (!session?.user?.id) {
          return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
          )
        }
        whereClause = { userId: session.user.id }
        break
      case 'featured':
        whereClause = { isPublic: true, isFeatured: true }
        orderBy = { followers: { _count: 'desc' } }
        break
      case 'following':
        if (!session?.user?.id) {
          return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
          )
        }
        whereClause = {
          followers: { some: { userId: session.user.id } }
        }
        break
      case 'user':
        if (!userId) {
          return NextResponse.json(
            { success: false, error: 'User ID required for user collections' },
            { status: 400 }
          )
        }
        whereClause = { userId, isPublic: true }
        break
      default: // public
        whereClause = { isPublic: true }
    }

    const collections = await prisma.readingCollection.findMany({
      where: whereClause,
      orderBy,
      take: limit,
      skip: offset,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            guardianArchetype: true
          }
        },
        _count: {
          select: {
            articles: true,
            followers: true
          }
        },
        articles: {
          take: 4,
          orderBy: { order: 'asc' },
          include: {
            article: {
              select: {
                id: true,
                title: true,
                coverImage: true,
                slug: true
              }
            }
          }
        }
      }
    })

    // Get total count for pagination
    const total = await prisma.readingCollection.count({ where: whereClause })

    // Check if user follows each collection
    let followedIds: Set<string> = new Set()
    if (session?.user?.id) {
      const follows = await prisma.collectionFollow.findMany({
        where: {
          userId: session.user.id,
          collectionId: { in: collections.map(c => c.id) }
        },
        select: { collectionId: true }
      })
      followedIds = new Set(follows.map(f => f.collectionId))
    }

    const collectionsWithMeta = collections.map(collection => ({
      ...collection,
      articleCount: collection._count.articles,
      followerCount: collection._count.followers,
      isFollowing: followedIds.has(collection.id),
      isOwner: session?.user?.id === collection.userId,
      previewArticles: collection.articles.map(ca => ca.article),
      _count: undefined,
      articles: undefined
    }))

    return NextResponse.json({
      success: true,
      data: {
        collections: collectionsWithMeta,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      }
    })
  } catch (error) {
    console.error('Error fetching collections:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}

// POST /api/collections - Create a new collection
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, coverImage, isPublic } = body

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Collection name is required' },
        { status: 400 }
      )
    }

    const slug = generateSlug(name)

    const collection = await prisma.readingCollection.create({
      data: {
        userId: session.user.id,
        name: name.trim(),
        slug,
        description: description || null,
        coverImage: coverImage || null,
        isPublic: isPublic || false
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
            articles: true,
            followers: true
          }
        }
      }
    })

    // Award points for creating a collection
    await awardPoints(session.user.id, 'COLLECTION_CREATED', 5, `Created collection: ${name}`)

    return NextResponse.json({
      success: true,
      data: {
        ...collection,
        articleCount: collection._count.articles,
        followerCount: collection._count.followers,
        _count: undefined
      }
    })
  } catch (error) {
    console.error('Error creating collection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create collection' },
      { status: 500 }
    )
  }
}

// Helper function to award points
async function awardPoints(userId: string, reason: string, amount: number, description: string) {
  try {
    const userPoints = await prisma.userPoints.upsert({
      where: { userId },
      create: {
        userId,
        totalPoints: amount,
        currentPoints: amount,
        level: 1,
        levelProgress: amount
      },
      update: {
        totalPoints: { increment: amount },
        currentPoints: { increment: amount },
        levelProgress: { increment: amount }
      }
    })

    await prisma.pointTransaction.create({
      data: {
        userPointsId: userPoints.id,
        amount,
        reason: reason as any,
        description
      }
    })
  } catch (error) {
    console.error('Error awarding points:', error)
  }
}
