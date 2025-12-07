import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// Whitelist of fields that can be updated
const ALLOWED_UPDATE_FIELDS = [
  'name',
  'bio',
  'headline',
  'location',
  'phone',
  'company',
  'jobTitle',
  'website',
  'linkedin',
  'twitter',
  'interests',
  'expertise',
  'experience',
  'education',
  'skills',
  'languages',
  'certifications',
  'volunteer',
  'publications',
  'honors',
  'projects',
  'guardianArchetype',
  'declaration',
  'showEmail',
  'showPhone',
  'privacySettings',
  'notificationPreferences',
  'resume',
  'banner',
  'image',
]

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    // Must be logged in
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Can only update own profile
    if (session.user.id !== id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Filter to only allowed fields
    const updateData: Record<string, any> = {}
    for (const key of ALLOWED_UPDATE_FIELDS) {
      if (body[key] !== undefined) {
        updateData[key] = body[key]
      }
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        headline: true,
        location: true,
        phone: true,
        company: true,
        jobTitle: true,
        website: true,
        linkedin: true,
        twitter: true,
        interests: true,
        expertise: true,
        experience: true,
        education: true,
        guardianArchetype: true,
        declaration: true,
        showEmail: true,
        showPhone: true,
        privacySettings: true,
        notificationPreferences: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedUser,
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

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
        headline: true,
        location: true,
        phone: true,
        company: true,
        jobTitle: true,
        website: true,
        linkedin: true,
        twitter: true,
        interests: true,
        expertise: true,
        experience: true,
        education: true,
        guardianArchetype: true,
        declaration: true,
        showEmail: true,
        showPhone: true,
        privacySettings: true,
        notificationPreferences: true,
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
        articles: {
          where: {
            status: 'PUBLISHED'
          },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImage: true,
            createdAt: true,
            _count: {
              select: {
                comments: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            followers: true,
            following: true,
            projectMemberships: true,
            articles: true
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
