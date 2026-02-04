import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Fetch waivers (admin sees all, user sees own)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // PENDING, APPROVED, DENIED

    // Check if user is admin/owner of the project
    const membership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { creatorId: true },
    })

    const isOwner = project?.creatorId === session.user.id
    const isAdmin = membership?.role === 'ADMIN' || membership?.role === 'OWNER' || membership?.role === 'MODERATOR'

    // Build query based on role
    const whereClause: any = { projectId }

    if (!isOwner && !isAdmin) {
      // Non-admins can only see their own waivers
      whereClause.userId = session.user.id
    }

    if (status) {
      whereClause.status = status
    }

    const waivers = await prisma.projectPrerequisiteWaiver.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            
            image: true,
            stockScore: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: waivers,
    })
  } catch (error) {
    console.error('Error fetching waivers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch waivers' },
      { status: 500 }
    )
  }
}

// POST - Request a waiver
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId } = await params
    const body = await request.json()
    const { reason, qualifications } = body

    if (!reason?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Reason for waiver is required' },
        { status: 400 }
      )
    }

    // Check if user already has a pending waiver
    const existingWaiver = await prisma.projectPrerequisiteWaiver.findFirst({
      where: {
        projectId,
        userId: session.user.id,
        status: 'PENDING',
      },
    })

    if (existingWaiver) {
      return NextResponse.json(
        { success: false, error: 'You already have a pending waiver request' },
        { status: 400 }
      )
    }

    // Check if user already has an approved waiver
    const approvedWaiver = await prisma.projectPrerequisiteWaiver.findFirst({
      where: {
        projectId,
        userId: session.user.id,
        status: 'APPROVED',
      },
    })

    if (approvedWaiver) {
      return NextResponse.json(
        { success: false, error: 'You already have an approved waiver' },
        { status: 400 }
      )
    }

    // Get user's profile for AI analysis context
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        stockScore: true,
        expertise: true,
        interests: true,
        bio: true,
        learningProgress: {
          include: { module: true },
          where: { completedAt: { not: null } },
        },
      },
    })

    // Build user profile summary for AI analysis
    const userProfileSummary = {
      stockScore: user?.stockScore || 0,
      expertise: user?.expertise || [],
      interests: user?.interests || [],
      completedCourses: user?.learningProgress?.length || 0,
      bio: user?.bio || '',
    }

    const waiver = await prisma.projectPrerequisiteWaiver.create({
      data: {
        projectId,
        userId: session.user.id,
        reason: reason.trim(),
        qualifications: qualifications?.trim() || null,
        userProfileSnapshot: userProfileSummary,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            
            image: true,
          },
        },
      },
    })

    // Notify project admins (if notification system exists)
    // This would integrate with Phase 8: Notifications

    return NextResponse.json({
      success: true,
      data: waiver,
      message: 'Waiver request submitted successfully',
    })
  } catch (error) {
    console.error('Error creating waiver request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit waiver request' },
      { status: 500 }
    )
  }
}
