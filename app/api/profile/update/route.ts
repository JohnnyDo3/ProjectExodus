import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      name,
      headline,
      bio,
      location,
      phone,
      company,
      jobTitle,
      website,
      linkedin,
      twitter,
      image,
      banner,
      interests,
      expertise,
      experience,
      education,
      skills,
      languages,
      certifications,
      volunteer,
      publications,
      honors,
      projects,
      guardianArchetype,
      declaration
    } = body

    // Update user profile - only whitelisted fields
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        headline,
        bio,
        location,
        phone,
        company,
        jobTitle,
        website,
        linkedin,
        twitter,
        image,
        banner,
        interests,
        expertise,
        experience,
        education,
        skills,
        languages,
        certifications,
        volunteer,
        publications,
        honors,
        projects,
        guardianArchetype,
        declaration
      },
      select: {
        id: true,
        name: true,
        headline: true,
        bio: true,
        location: true,
        company: true,
        jobTitle: true,
        website: true,
        linkedin: true,
        twitter: true,
        image: true,
        banner: true,
        interests: true,
        expertise: true,
        guardianArchetype: true,
        declaration: true,
        updatedAt: true,
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedUser
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
