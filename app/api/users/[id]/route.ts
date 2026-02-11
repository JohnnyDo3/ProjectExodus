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

    // ---- Input validation ----

    // String field length limits
    const stringLimits: Record<string, number> = {
      name: 100,
      bio: 1000,
      headline: 200,
      location: 200,
      phone: 30,
      company: 200,
      jobTitle: 200,
      website: 500,
      linkedin: 500,
      twitter: 500,
      guardianArchetype: 100,
      declaration: 2000,
    }

    for (const [field, maxLen] of Object.entries(stringLimits)) {
      if (updateData[field] !== undefined && updateData[field] !== null) {
        if (typeof updateData[field] !== 'string') {
          return NextResponse.json(
            { success: false, error: `${field} must be a string` },
            { status: 400 }
          )
        }
        if (updateData[field].length > maxLen) {
          return NextResponse.json(
            { success: false, error: `${field} must be under ${maxLen} characters` },
            { status: 400 }
          )
        }
      }
    }

    // Name must not be empty if provided
    if (updateData.name !== undefined && typeof updateData.name === 'string' && updateData.name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name cannot be empty' },
        { status: 400 }
      )
    }

    // Website URL format validation
    if (updateData.website && typeof updateData.website === 'string' && updateData.website.trim().length > 0) {
      try {
        new URL(updateData.website)
      } catch {
        return NextResponse.json(
          { success: false, error: 'Website must be a valid URL (e.g. https://example.com)' },
          { status: 400 }
        )
      }
    }

    // LinkedIn URL format validation
    if (updateData.linkedin && typeof updateData.linkedin === 'string' && updateData.linkedin.trim().length > 0) {
      try {
        new URL(updateData.linkedin)
      } catch {
        return NextResponse.json(
          { success: false, error: 'LinkedIn must be a valid URL' },
          { status: 400 }
        )
      }
    }

    // Boolean field type validation
    for (const field of ['showEmail', 'showPhone']) {
      if (updateData[field] !== undefined && typeof updateData[field] !== 'boolean') {
        return NextResponse.json(
          { success: false, error: `${field} must be a boolean` },
          { status: 400 }
        )
      }
    }

    // Array field validation (interests, expertise, skills, languages, certifications)
    for (const field of ['interests', 'expertise', 'skills', 'languages', 'certifications']) {
      if (updateData[field] !== undefined && updateData[field] !== null) {
        if (!Array.isArray(updateData[field])) {
          return NextResponse.json(
            { success: false, error: `${field} must be an array` },
            { status: 400 }
          )
        }
        if (updateData[field].length > 50) {
          return NextResponse.json(
            { success: false, error: `${field} can have at most 50 items` },
            { status: 400 }
          )
        }
      }
    }

    // ---- End input validation ----

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
