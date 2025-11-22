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

    const users = await prisma.user.findMany({
      where: {
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
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        location: true,
        interests: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
            projectMemberships: true,
            forumPosts: true,
          },
        },
      },
      take: 50,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: users,
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
