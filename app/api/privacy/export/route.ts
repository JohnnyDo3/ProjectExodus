import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const rateLimitResult = await rateLimit(request, {
      id: 'privacy-export',
      limit: 3,
      windowSeconds: 60,
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.reset)
    }

    const userId = session.user.id

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
        skills: true,
        languages: true,
        certifications: true,
        volunteer: true,
        publications: true,
        honors: true,
        projects: true,
        guardianArchetype: true,
        declaration: true,
        privacySettings: true,
        notificationPreferences: true,
        resume: true,
        ageConfirmedAt: true,
        parentalConsent: true,
        deletionRequestedAt: true,
        deletionScheduledFor: true,
        deletionStatus: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            articles: true,
            comments: true,
            followers: true,
            following: true,
            projectMemberships: true,
            createdProjects: true,
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

    const payload = {
      exportedAt: new Date().toISOString(),
      user,
    }

    const filename = `project-exodus-data-${userId}.json`

    return new NextResponse(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Privacy export error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to export data' },
      { status: 500 }
    )
  }
}
