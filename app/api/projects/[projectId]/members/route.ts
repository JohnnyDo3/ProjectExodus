import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Get all project members
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const search = searchParams.get('search')

    const whereClause: any = { projectId }

    if (role) {
      whereClause.role = role
    }

    const members = await prisma.projectMember.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            
            image: true,
            bio: true,
          },
        },
        recognitions: {
          select: {
            id: true,
            badge: true,
            earnedAt: true,
          },
        },
      },
      orderBy: [
        { role: 'asc' }, // Owners first
        { contributionScore: 'desc' },
      ],
    })

    // Filter by search if provided
    let filteredMembers = members
    if (search) {
      const searchLower = search.toLowerCase()
      filteredMembers = members.filter(
        (m: typeof members[number]) =>
          m.user.name?.toLowerCase().includes(searchLower) ||
          m.user.email?.toLowerCase().includes(searchLower)
      )
    }

    // Get role counts
    const roleCounts = await prisma.projectMember.groupBy({
      by: ['role'],
      where: { projectId },
      _count: { role: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        members: filteredMembers,
        roleCounts: Object.fromEntries(
          roleCounts.map((r: { role: string; _count: { role: number } }) => [r.role, r._count.role])
        ),
        total: members.length,
      },
    })
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

// POST - Join project or invite member
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
    const { userId, role } = body

    // If no userId provided, user is joining themselves
    const targetUserId = userId || session.user.id
    const isSelfJoin = targetUserId === session.user.id

    // Check if already a member
    const existingMember = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: targetUserId,
        },
      },
    })

    if (existingMember) {
      return NextResponse.json(
        { success: false, error: 'User is already a member' },
        { status: 400 }
      )
    }

    if (isSelfJoin) {
      // User joining themselves - check prerequisites
      const prerequisites = await prisma.projectPrerequisite.findMany({
        where: { projectId },
      })

      if (prerequisites.length > 0) {
        // Redirect to prerequisite check
        return NextResponse.json({
          success: false,
          error: 'Please complete prerequisites first',
          requiresPrerequisites: true,
        })
      }

      // Join as viewer initially
      const member = await prisma.projectMember.create({
        data: {
          projectId,
          userId: targetUserId,
          role: 'VIEWER',
          joinedAt: new Date(),
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

      return NextResponse.json({
        success: true,
        data: member,
        message: 'Joined project successfully',
      })
    }

    // Admin inviting someone
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

    const isAdmin =
      project?.creatorId === session.user.id ||
      membership?.role === 'ADMIN' ||
      membership?.role === 'OWNER'

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can invite members' },
        { status: 403 }
      )
    }

    const member = await prisma.projectMember.create({
      data: {
        projectId,
        userId: targetUserId,
        role: role || 'CONTRIBUTOR',
        joinedAt: new Date(),
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

    return NextResponse.json({
      success: true,
      data: member,
      message: 'Member added successfully',
    })
  } catch (error) {
    console.error('Error adding member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add member' },
      { status: 500 }
    )
  }
}

// PUT - Update member role
export async function PUT(
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
    const { memberId, role } = body

    if (!memberId || !role) {
      return NextResponse.json(
        { success: false, error: 'Member ID and role required' },
        { status: 400 }
      )
    }

    // Check if admin
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
    const isAdmin = isOwner || membership?.role === 'ADMIN' || membership?.role === 'OWNER'

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can change roles' },
        { status: 403 }
      )
    }

    // Get member to update
    const memberToUpdate = await prisma.projectMember.findUnique({
      where: { id: memberId },
    })

    if (!memberToUpdate || memberToUpdate.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Member not found' },
        { status: 404 }
      )
    }

    // Can't change owner's role unless you're the owner
    if (memberToUpdate.role === 'OWNER' && !isOwner) {
      return NextResponse.json(
        { success: false, error: 'Cannot change owner role' },
        { status: 403 }
      )
    }

    // Can't make someone else an owner
    if (role === 'OWNER' && !isOwner) {
      return NextResponse.json(
        { success: false, error: 'Only the owner can transfer ownership' },
        { status: 403 }
      )
    }

    const updatedMember = await prisma.projectMember.update({
      where: { id: memberId },
      data: { role },
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

    return NextResponse.json({
      success: true,
      data: updatedMember,
    })
  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update member' },
      { status: 500 }
    )
  }
}

// DELETE - Remove member
export async function DELETE(
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
    const memberId = searchParams.get('id')

    if (!memberId) {
      return NextResponse.json(
        { success: false, error: 'Member ID required' },
        { status: 400 }
      )
    }

    const memberToRemove = await prisma.projectMember.findUnique({
      where: { id: memberId },
    })

    if (!memberToRemove || memberToRemove.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Member not found' },
        { status: 404 }
      )
    }

    const isLeavingSelf = memberToRemove.userId === session.user.id

    if (!isLeavingSelf) {
      // Check if admin
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

      const isAdmin =
        project?.creatorId === session.user.id ||
        membership?.role === 'ADMIN' ||
        membership?.role === 'OWNER'

      if (!isAdmin) {
        return NextResponse.json(
          { success: false, error: 'Only admins can remove members' },
          { status: 403 }
        )
      }
    }

    // Can't remove the owner
    if (memberToRemove.role === 'OWNER') {
      return NextResponse.json(
        { success: false, error: 'Cannot remove the project owner' },
        { status: 400 }
      )
    }

    // Remove member and related data
    await prisma.$transaction([
      prisma.projectMemberRecognition.deleteMany({
        where: { projectId, userId: memberToRemove.userId },
      }),
      prisma.projectNotification.deleteMany({
        where: { projectId, userId: memberToRemove.userId },
      }),
      prisma.projectMember.delete({
        where: { id: memberId },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: isLeavingSelf ? 'Left project' : 'Member removed',
    })
  } catch (error) {
    console.error('Error removing member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove member' },
      { status: 500 }
    )
  }
}
