import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get the user's following and followers
    const [following, followers, currentUser] = await Promise.all([
      prisma.follows.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      }),
      prisma.follows.findMany({
        where: { followingId: userId },
        select: { followerId: true },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, stockScore: true, image: true, fishCustomization: true },
      }),
    ])

    const followingIds = new Set(following.map((f: { followingId: string }) => f.followingId))
    const followerIds = new Set(followers.map((f: { followerId: string }) => f.followerId))

    // Mutual connections: people user follows AND who follow user back
    const mutualIds = [...followingIds].filter(id => followerIds.has(id))

    // Get all unique connection IDs (following + followers)
    const allConnectionIds = new Set([...followingIds, ...followerIds])

    // Fetch user data for all connections
    const connections = await prisma.user.findMany({
      where: {
        id: { in: Array.from(allConnectionIds) },
        name: { not: null },
      },
      select: {
        id: true,
        name: true,
        stockScore: true,
        image: true,
      },
      orderBy: { stockScore: 'desc' },
    })

    // Tag each connection with their relationship
    const taggedConnections = connections.map((u: { id: string; name: string | null; stockScore: number | null; image: string | null }) => ({
      ...u,
      isMutual: mutualIds.includes(u.id),
      isFollowing: followingIds.has(u.id),
      isFollower: followerIds.has(u.id),
    }))

    return NextResponse.json({
      success: true,
      data: {
        user: currentUser,
        connections: taggedConnections,
        stats: {
          following: followingIds.size,
          followers: followerIds.size,
          mutual: mutualIds.length,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching personal fishbowl:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch personal fishbowl data' },
      { status: 500 }
    )
  }
}
