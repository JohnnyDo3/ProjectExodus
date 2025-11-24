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
      projects
    } = body

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        headline,
        bio,
        location,
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
        projects
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
