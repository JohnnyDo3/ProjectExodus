import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/users - Get all users for networking
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const interest = searchParams.get('interest')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50') || 50, 100)
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {
      AND: [
        // Exclude current user
        session?.user?.id ? { id: { not: session.user.id } } : {},
        // Search by name or location
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { location: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        // Filter by interest
        interest ? {
          interests: { has: interest },
        } : {},
      ],
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          bio: true,
          headline: true,
          location: true,
          phone: true,
          interests: true,
          expertise: true,
          guardianArchetype: true,
          declaration: true,
          showEmail: true,
          showPhone: true,
          createdAt: true,
          _count: {
            select: {
              followers: true,
              following: true,
              projectMemberships: true,
              articles: true,
              createdProjects: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ])

    // Filter email/phone based on privacy settings
    const filteredUsers = users.map((user: typeof users[number]) => {
      const isOwnProfile = session?.user?.id === user.id

      return {
        ...user,
        email: (user.showEmail || isOwnProfile) ? user.email : undefined,
        phone: (user.showPhone || isOwnProfile) ? user.phone : undefined,
        // Remove privacy flags from response
        showEmail: undefined,
        showPhone: undefined,
      }
    })

    return NextResponse.json({
      success: true,
      data: filteredUsers,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('[API /users] ERROR:', error)
    console.error('[API /users] Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
