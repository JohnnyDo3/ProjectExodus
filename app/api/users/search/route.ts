import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// GET /api/users/search - Search and filter users
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const skills = searchParams.get('skills')?.split(',').filter(Boolean) || []
    const interests = searchParams.get('interests')?.split(',').filter(Boolean) || []
    const location = searchParams.get('location') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Build filter conditions
    const where: any = {
      // Exclude current user
      id: {
        not: session.user.id,
      },
    }

    // Search by name, email, or headline
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { headline: { contains: query, mode: 'insensitive' } },
      ]
    }

    // Filter by location
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      }
    }

    // Filter by skills (if user has any of the specified skills)
    if (skills.length > 0) {
      where.expertise = {
        hasSome: skills,
      }
    }

    // Filter by interests (if user has any of the specified interests)
    if (interests.length > 0) {
      where.interests = {
        hasSome: interests,
      }
    }

    // Get users and total count
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
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
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count({ where }),
    ])

    // Get follow/connection status for each user
    const usersWithStatus = await Promise.all(
      users.map(async (user: any) => {
        const [follower, connection] = await Promise.all([
          prisma.follower.findUnique({
            where: {
              followerId_followingId: {
                followerId: session.user.id,
                followingId: user.id,
              },
            },
          }),
          prisma.connection.findFirst({
            where: {
              OR: [
                { userId: session.user.id, connectedUserId: user.id },
                { userId: user.id, connectedUserId: session.user.id },
              ],
            },
          }),
        ])

        let connectionStatus = 'none'
        if (connection) {
          if (connection.status === 'ACCEPTED') {
            connectionStatus = 'connected'
          } else if (connection.status === 'PENDING') {
            connectionStatus =
              connection.userId === session.user.id ? 'pending_sent' : 'pending_received'
          }
        }

        return {
          ...user,
          isFollowing: !!follower,
          connectionStatus,
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        users: usersWithStatus,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error searching users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search users' },
      { status: 500 }
    )
  }
}
