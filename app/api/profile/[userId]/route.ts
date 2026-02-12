import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET /api/profile/[userId] - Get a user's public profile
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const session = await auth()

    // Fetch user profile data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        headline: true,
        bio: true,
        location: true,
        phone: true,
        company: true,
        jobTitle: true,
        expertise: true,
        interests: true,
        website: true,
        linkedin: true,
        twitter: true,
        experience: true,
        education: true,
        skills: true,
        resume: true,
        certifications: true,
        volunteer: true,
        publications: true,
        honors: true,
        projects: true,
        guardianArchetype: true,
        declaration: true,
        showEmail: true,
        showPhone: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Filter email/phone based on privacy settings
    const isOwnProfile = session?.user?.id === userId
    const { showEmail, showPhone, email, phone, ...rest } = user
    const filteredUser = {
      ...rest,
      ...(showEmail || isOwnProfile ? { email } : {}),
      ...(showPhone || isOwnProfile ? { phone } : {}),
    }

    return NextResponse.json({
      success: true,
      data: filteredUser,
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}
