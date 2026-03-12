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
      prisma.userFollow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      }),
      prisma.userFollow.findMany({
        where: { followingId: userId },
        select: { followerId: true },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          image: true,
          fishCustomization: true,
          _count: {
            select: {
              createdProjects: true,
              articles: true,
              moduleProgress: { where: { completed: true } },
              followers: true,
              sentConnections: { where: { status: 'ACCEPTED' } },
              receivedConnections: { where: { status: 'ACCEPTED' } },
            },
          },
        },
      }),
    ])

    const followingIds = new Set(following.map((f: { followingId: string }) => f.followingId))
    const followerIds = new Set(followers.map((f: { followerId: string }) => f.followerId))

    // Compute stock score dynamically (same formula used on profile pages)
    const counts = (currentUser as any)?._count || {}
    const computedStockScore =
      (counts.createdProjects || 0) * 10 +
      (counts.articles || 0) * 5 +
      (counts.moduleProgress || 0) * 3 +
      (counts.followers || 0) * 1 +
      ((counts.sentConnections || 0) + (counts.receivedConnections || 0)) * 2

    // Mutual connections: people user follows AND who follow user back
    const mutualIds = [...followingIds].filter(id => followerIds.has(id))

    // Get all unique connection IDs (following + followers)
    const allConnectionIds = new Set([...followingIds, ...followerIds])

    // Fetch user data for all connections with counts for stock score computation
    const connections = await prisma.user.findMany({
      where: {
        id: { in: Array.from(allConnectionIds) },
        name: { not: null },
      },
      select: {
        id: true,
        name: true,
        image: true,
        fishCustomization: true,
        _count: {
          select: {
            createdProjects: true,
            articles: true,
            moduleProgress: { where: { completed: true } },
            followers: true,
            sentConnections: { where: { status: 'ACCEPTED' } },
            receivedConnections: { where: { status: 'ACCEPTED' } },
          },
        },
      },
    })

    // Tag each connection with their relationship and computed stock score
    const taggedConnections = connections.map((u: any) => {
      const c = u._count || {}
      const score =
        (c.createdProjects || 0) * 10 +
        (c.articles || 0) * 5 +
        (c.moduleProgress || 0) * 3 +
        (c.followers || 0) * 1 +
        ((c.sentConnections || 0) + (c.receivedConnections || 0)) * 2
      return {
        id: u.id,
        name: u.name,
        image: u.image,
        fishCustomization: u.fishCustomization,
        stockScore: score,
        isMutual: mutualIds.includes(u.id),
        isFollowing: followingIds.has(u.id),
        isFollower: followerIds.has(u.id),
      }
    }).sort((a: any, b: any) => b.stockScore - a.stockScore)

    // Build user object with computed stock score
    const userData = currentUser ? {
      id: currentUser.id,
      name: currentUser.name,
      image: currentUser.image,
      fishCustomization: currentUser.fishCustomization,
      stockScore: computedStockScore,
    } : null

    return NextResponse.json({
      success: true,
      data: {
        user: userData,
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
