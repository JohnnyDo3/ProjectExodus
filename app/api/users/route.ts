import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/users - Get all users for networking
export async function GET(request: NextRequest) {
  try {
    console.log('[API /users] Request received')
    const session = await auth()
    console.log('[API /users] Session user ID:', session?.user?.id || 'not logged in')

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const interest = searchParams.get('interest')
    console.log('[API /users] Search params:', { search, interest })

    console.log('[API /users] Fetching users from database...')
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
      take: 50,
      orderBy: { createdAt: 'desc' },
    })

    console.log('[API /users] Found', users.length, 'users')

    // Filter email/phone based on privacy settings
    const filteredUsers = users.map(user => {
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

    console.log('[API /users] Returning success response')

    return NextResponse.json({
      success: true,
      data: filteredUsers,
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
