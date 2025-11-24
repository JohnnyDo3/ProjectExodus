import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// GET /api/network/suggestions - Get smart connection suggestions
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const currentUserId = session.user.id
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')

    // Get current user's profile
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
      select: {
        expertise: true,
        interests: true,
        location: true,
        company: true,
      },
    })

    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Get users the current user is already following
    const existingFollows = await prisma.follower.findMany({
      where: { followerId: currentUserId },
      select: { followingId: true },
    })
    const followingIds = existingFollows.map((f: any) => f.followingId)

    // Get users with pending or accepted connections
    const existingConnections = await prisma.connection.findMany({
      where: {
        OR: [
          { userId: currentUserId },
          { connectedUserId: currentUserId },
        ],
      },
      select: { userId: true, connectedUserId: true },
    })
    const connectedUserIds = existingConnections.map((c: any) =>
      c.userId === currentUserId ? c.connectedUserId : c.userId
    )

    // Combine all users to exclude
    const excludeIds = [...followingIds, ...connectedUserIds, currentUserId]

    // Find potential matches
    const allUsers = await prisma.user.findMany({
      where: {
        id: {
          notIn: excludeIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        headline: true,
        bio: true,
        location: true,
        company: true,
        jobTitle: true,
        expertise: true,
        interests: true,
        createdAt: true,
      },
      take: 100, // Get more users for scoring
    })

    // Smart matching algorithm - score each user
    interface ScoredUser {
      user: typeof allUsers[0]
      score: number
      matchReasons: string[]
    }

    const scoredUsers: ScoredUser[] = allUsers.map((user: any) => {
      let score = 0
      const matchReasons: string[] = []

      // Shared interests (high priority)
      const sharedInterests =
        currentUser.interests?.filter((interest: any) =>
          user.interests?.includes(interest)
        ) || []
      if (sharedInterests.length > 0) {
        score += sharedInterests.length * 3
        matchReasons.push(
          `${sharedInterests.length} shared interest${sharedInterests.length > 1 ? 's' : ''}: ${sharedInterests.slice(0, 2).join(', ')}`
        )
      }

      // Shared skills (medium priority)
      const sharedSkills =
        currentUser.expertise?.filter((skill: any) =>
          user.expertise?.includes(skill)
        ) || []
      if (sharedSkills.length > 0) {
        score += sharedSkills.length * 2
        matchReasons.push(
          `${sharedSkills.length} shared skill${sharedSkills.length > 1 ? 's' : ''}: ${sharedSkills.slice(0, 2).join(', ')}`
        )
      }

      // Complementary skills (users have skills the other doesn't have)
      const complementarySkills =
        user.expertise?.filter(
          (skill: any) => !currentUser.expertise?.includes(skill)
        ) || []
      if (complementarySkills.length > 0 && currentUser.expertise && currentUser.expertise.length > 0) {
        score += Math.min(complementarySkills.length, 3) * 1.5
        matchReasons.push(
          `Complementary skills: ${complementarySkills.slice(0, 2).join(', ')}`
        )
      }

      // Same location (medium priority)
      if (
        currentUser.location &&
        user.location &&
        currentUser.location.toLowerCase() === user.location.toLowerCase()
      ) {
        score += 2
        matchReasons.push(`Based in ${user.location}`)
      }

      // Same company (low-medium priority)
      if (
        currentUser.company &&
        user.company &&
        currentUser.company.toLowerCase() === user.company.toLowerCase()
      ) {
        score += 1.5
        matchReasons.push(`Works at ${user.company}`)
      }

      // Has headline and bio (shows engaged user)
      if (user.headline && user.bio) {
        score += 0.5
      }

      // Has skills and interests (shows complete profile)
      if (
        user.expertise &&
        user.expertise.length > 0 &&
        user.interests &&
        user.interests.length > 0
      ) {
        score += 0.5
      }

      // Newer users (slight boost to help new members)
      const daysSinceJoined = Math.floor(
        (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      if (daysSinceJoined < 30) {
        score += 0.3
      }

      return {
        user,
        score,
        matchReasons,
      }
    })

    // Sort by score and take top matches
    const topMatches = scoredUsers
      .filter((su: any) => su.score > 0) // Only show users with some match
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, limit)

    // Format response
    const suggestions = topMatches.map(({ user, score, matchReasons }: any) => ({
      ...user,
      matchScore: Math.round(score * 10) / 10,
      matchReasons,
    }))

    return NextResponse.json({
      success: true,
      data: {
        suggestions,
        total: suggestions.length,
      },
    })
  } catch (error) {
    console.error('Error getting connection suggestions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get suggestions' },
      { status: 500 }
    )
  }
}
