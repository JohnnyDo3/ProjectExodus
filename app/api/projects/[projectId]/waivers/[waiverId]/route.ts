import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Get single waiver details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; waiverId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, waiverId } = await params

    const waiver = await prisma.projectPrerequisiteWaiver.findUnique({
      where: { id: waiverId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            
            image: true,
            stockScore: true,
            bio: true,
            expertise: true,
            interests: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    if (!waiver || waiver.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Waiver not found' },
        { status: 404 }
      )
    }

    // Check access - user can see own waiver, admins can see all
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
    const isOwnWaiver = waiver.userId === session.user.id

    if (!isOwner && !isAdmin && !isOwnWaiver) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      data: waiver,
    })
  } catch (error) {
    console.error('Error fetching waiver:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch waiver' },
      { status: 500 }
    )
  }
}

// PUT - Review waiver (Admin only) - Approve, Deny, or Request More Info
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; waiverId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, waiverId } = await params
    const body = await request.json()
    const { action, reviewNotes, aiRecommendation } = body

    if (!['APPROVED', 'DENIED', 'REQUEST_INFO'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be APPROVED, DENIED, or REQUEST_INFO' },
        { status: 400 }
      )
    }

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

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can review waiver requests' },
        { status: 403 }
      )
    }

    // Get the waiver
    const waiver = await prisma.projectPrerequisiteWaiver.findUnique({
      where: { id: waiverId },
    })

    if (!waiver || waiver.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Waiver not found' },
        { status: 404 }
      )
    }

    if (waiver.status !== 'PENDING') {
      return NextResponse.json(
        { success: false, error: 'This waiver has already been reviewed' },
        { status: 400 }
      )
    }

    // Update waiver status
    const updatedWaiver = await prisma.projectPrerequisiteWaiver.update({
      where: { id: waiverId },
      data: {
        status: action === 'REQUEST_INFO' ? 'PENDING' : action,
        reviewedBy: session.user.id,
        reviewedAt: new Date(),
        reviewNotes: reviewNotes?.trim() || null,
        aiRecommendation: aiRecommendation || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            
            email: true,
          },
        },
      },
    })

    // If approved, update user's membership to CONTRIBUTOR
    if (action === 'APPROVED') {
      // Check if user is already a member
      const existingMembership = await prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId,
            userId: waiver.userId,
          },
        },
      })

      if (existingMembership) {
        // Update role if they were a VIEWER
        if (existingMembership.role === 'VIEWER') {
          await prisma.projectMember.update({
            where: { id: existingMembership.id },
            data: { role: 'CONTRIBUTOR' },
          })
        }
      } else {
        // Create new membership as CONTRIBUTOR
        await prisma.projectMember.create({
          data: {
            projectId,
            userId: waiver.userId,
            role: 'CONTRIBUTOR',
            joinedAt: new Date(),
          },
        })
      }
    }

    // TODO: Send notification to user about waiver decision
    // This would integrate with Phase 8: Notifications

    return NextResponse.json({
      success: true,
      data: updatedWaiver,
      message: action === 'REQUEST_INFO'
        ? 'Additional information requested'
        : `Waiver ${action.toLowerCase()}`,
    })
  } catch (error) {
    console.error('Error reviewing waiver:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to review waiver' },
      { status: 500 }
    )
  }
}

// DELETE - Cancel waiver request (only by requester if pending)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; waiverId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, waiverId } = await params

    const waiver = await prisma.projectPrerequisiteWaiver.findUnique({
      where: { id: waiverId },
    })

    if (!waiver || waiver.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Waiver not found' },
        { status: 404 }
      )
    }

    // Only the requester can delete their pending waiver
    if (waiver.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only cancel your own waiver request' },
        { status: 403 }
      )
    }

    if (waiver.status !== 'PENDING') {
      return NextResponse.json(
        { success: false, error: 'Can only cancel pending waiver requests' },
        { status: 400 }
      )
    }

    await prisma.projectPrerequisiteWaiver.delete({
      where: { id: waiverId },
    })

    return NextResponse.json({
      success: true,
      message: 'Waiver request cancelled',
    })
  } catch (error) {
    console.error('Error cancelling waiver:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to cancel waiver request' },
      { status: 500 }
    )
  }
}
