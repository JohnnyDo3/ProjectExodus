import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Get join requests (Leaders only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, subgroupId } = await params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'PENDING'

    // Check if user is a leader
    const leader = await prisma.subgroupLeader.findFirst({
      where: {
        subgroupId,
        userId: session.user.id,
        isLeader: true,
      },
    })

    if (!leader) {
      return NextResponse.json(
        { success: false, error: 'Only leaders can view join requests' },
        { status: 403 }
      )
    }

    const requests = await prisma.subgroupJoinRequest.findMany({
      where: {
        subgroupId,
        status,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            
            image: true,
            bio: true,
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
      data: requests,
    })
  } catch (error) {
    console.error('Error fetching join requests:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch join requests' },
      { status: 500 }
    )
  }
}

// POST - Request to join a subgroup
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, subgroupId } = await params
    const body = await request.json()
    const { message } = body

    // Check subgroup exists and get privacy settings
    const subgroup = await prisma.projectSubgroup.findUnique({
      where: { id: subgroupId },
    })

    if (!subgroup || subgroup.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Subgroup not found' },
        { status: 404 }
      )
    }

    // Check if user is already a member
    const existingMembership = await prisma.subgroupMember.findUnique({
      where: {
        subgroupId_userId: {
          subgroupId,
          userId: session.user.id,
        },
      },
    })

    if (existingMembership) {
      return NextResponse.json(
        { success: false, error: 'You are already a member of this subgroup' },
        { status: 400 }
      )
    }

    // For public subgroups, add directly
    if (!subgroup.isPrivate) {
      const membership = await prisma.subgroupMember.create({
        data: {
          subgroupId,
          userId: session.user.id,
        },
      })

      return NextResponse.json({
        success: true,
        data: membership,
        message: 'Joined subgroup successfully',
      })
    }

    // For private subgroups, check for pending request
    const existingRequest = await prisma.subgroupJoinRequest.findFirst({
      where: {
        subgroupId,
        userId: session.user.id,
        status: 'PENDING',
      },
    })

    if (existingRequest) {
      return NextResponse.json(
        { success: false, error: 'You already have a pending join request' },
        { status: 400 }
      )
    }

    // Create join request
    const joinRequest = await prisma.subgroupJoinRequest.create({
      data: {
        subgroupId,
        userId: session.user.id,
        message: message?.trim() || null,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      data: joinRequest,
      message: 'Join request submitted',
    })
  } catch (error) {
    console.error('Error creating join request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit join request' },
      { status: 500 }
    )
  }
}

// PUT - Review join request (Approve/Deny) - Leaders only
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { subgroupId } = await params
    const body = await request.json()
    const { requestId, action, reviewNotes } = body

    if (!requestId) {
      return NextResponse.json(
        { success: false, error: 'Request ID required' },
        { status: 400 }
      )
    }

    if (!['APPROVED', 'DENIED'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }

    // Check if user is a leader
    const leader = await prisma.subgroupLeader.findFirst({
      where: {
        subgroupId,
        userId: session.user.id,
        isLeader: true,
      },
    })

    if (!leader) {
      return NextResponse.json(
        { success: false, error: 'Only leaders can review join requests' },
        { status: 403 }
      )
    }

    // Get the request
    const joinRequest = await prisma.subgroupJoinRequest.findUnique({
      where: { id: requestId },
    })

    if (!joinRequest || joinRequest.subgroupId !== subgroupId) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      )
    }

    if (joinRequest.status !== 'PENDING') {
      return NextResponse.json(
        { success: false, error: 'Request has already been reviewed' },
        { status: 400 }
      )
    }

    // Update request
    const updatedRequest = await prisma.subgroupJoinRequest.update({
      where: { id: requestId },
      data: {
        status: action,
        reviewedBy: session.user.id,
        reviewedAt: new Date(),
        reviewNotes: reviewNotes?.trim() || null,
      },
    })

    // If approved, add as member
    if (action === 'APPROVED') {
      await prisma.subgroupMember.create({
        data: {
          subgroupId,
          userId: joinRequest.userId,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: updatedRequest,
      message: `Request ${action.toLowerCase()}`,
    })
  } catch (error) {
    console.error('Error reviewing join request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to review request' },
      { status: 500 }
    )
  }
}

// DELETE - Cancel join request (Requester only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { subgroupId } = await params
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('id')

    if (!requestId) {
      return NextResponse.json(
        { success: false, error: 'Request ID required' },
        { status: 400 }
      )
    }

    const joinRequest = await prisma.subgroupJoinRequest.findUnique({
      where: { id: requestId },
    })

    if (!joinRequest || joinRequest.subgroupId !== subgroupId) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      )
    }

    if (joinRequest.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only cancel your own requests' },
        { status: 403 }
      )
    }

    if (joinRequest.status !== 'PENDING') {
      return NextResponse.json(
        { success: false, error: 'Can only cancel pending requests' },
        { status: 400 }
      )
    }

    await prisma.subgroupJoinRequest.delete({
      where: { id: requestId },
    })

    return NextResponse.json({
      success: true,
      message: 'Join request cancelled',
    })
  } catch (error) {
    console.error('Error cancelling join request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to cancel request' },
      { status: 500 }
    )
  }
}
