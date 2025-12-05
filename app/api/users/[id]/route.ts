import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        phone: true,
        showEmail: true,
        showPhone: true,
        createdAt: true,
        userBadges: {
          include: {
            badge: true
          }
        },
        projectMemberships: {
          include: {
            project: {
              select: {
                id: true,
                name: true,
                description: true,
                status: true
              }
            }
          }
        },
        _count: {
          select: {
            followers: true,
            following: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Filter email/phone based on privacy settings
    const isOwnProfile = session?.user?.id === user.id
    const filteredUser = {
      ...user,
      email: (user.showEmail || isOwnProfile) ? user.email : undefined,
      phone: (user.showPhone || isOwnProfile) ? user.phone : undefined,
      // Remove privacy flags from response
      showEmail: undefined,
      showPhone: undefined,
    }

    return NextResponse.json({
      success: true,
      data: filteredUser
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
