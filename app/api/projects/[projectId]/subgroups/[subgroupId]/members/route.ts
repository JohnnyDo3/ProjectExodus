import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Get subgroup members
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    const { projectId, subgroupId } = await params

    // Check subgroup exists
    const subgroup = await prisma.projectSubgroup.findUnique({
      where: { id: subgroupId },
    })

    if (!subgroup || subgroup.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Subgroup not found' },
        { status: 404 }
      )
    }

    // For private subgroups, check membership
    if (subgroup.isPrivate && session?.user?.id) {
      const membership = await prisma.subgroupMember.findUnique({
        where: {
          subgroupId_userId: {
            subgroupId,
            userId: session.user.id,
          },
        },
      })

      if (!membership) {
        return NextResponse.json(
          { success: false, error: 'Access denied to private subgroup' },
          { status: 403 }
        )
      }
    }

    // Get members with leader status
    const members = await prisma.subgroupMember.findMany({
      where: { subgroupId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            bio: true,
          },
        },
      },
      orderBy: { joinedAt: 'asc' },
    })

    // Get leaders
    const leaders = await prisma.subgroupLeader.findMany({
      where: { subgroupId },
    })

    const leaderUserIds = new Set(leaders.map((l: { userId: string }) => l.userId))

    const membersWithLeaderStatus = members.map((m: typeof members[number]) => ({
      ...m,
      isLeader: leaderUserIds.has(m.userId),
    }))

    return NextResponse.json({
      success: true,
      data: membersWithLeaderStatus,
    })
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

// POST - Add leader or promote member (Leaders only)
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
    const { userId, makeLeader } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }

    // Check if requester is a leader
    const isLeader = await prisma.subgroupLeader.findFirst({
      where: {
        subgroupId,
        userId: session.user.id,
        isLeader: true,
      },
    })

    // Also check if project admin
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { creatorId: true },
    })

    const projectMembership = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    const isProjectAdmin =
      project?.creatorId === session.user.id ||
      projectMembership?.role === 'ADMIN' ||
      projectMembership?.role === 'OWNER'

    if (!isLeader && !isProjectAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only leaders can manage members' },
        { status: 403 }
      )
    }

    // Check if user is already a member
    const existingMember = await prisma.subgroupMember.findUnique({
      where: {
        subgroupId_userId: {
          subgroupId,
          userId,
        },
      },
    })

    if (!existingMember) {
      return NextResponse.json(
        { success: false, error: 'User is not a member of this subgroup' },
        { status: 400 }
      )
    }

    if (makeLeader) {
      // Check if already a leader
      const existingLeader = await prisma.subgroupLeader.findFirst({
        where: { subgroupId, userId },
      })

      if (existingLeader) {
        return NextResponse.json(
          { success: false, error: 'User is already a leader' },
          { status: 400 }
        )
      }

      // Add as leader
      await prisma.subgroupLeader.create({
        data: {
          subgroupId,
          userId,
          isLeader: true,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'User promoted to leader',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'No action taken',
    })
  } catch (error) {
    console.error('Error managing member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to manage member' },
      { status: 500 }
    )
  }
}

// DELETE - Remove member or leave subgroup
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

    const { projectId, subgroupId } = await params
    const { searchParams } = new URL(request.url)
    const userIdToRemove = searchParams.get('userId') || session.user.id
    const removeAsLeader = searchParams.get('removeLeader') === 'true'

    const isRemovingSelf = userIdToRemove === session.user.id

    if (!isRemovingSelf) {
      // Check if requester is a leader
      const isLeader = await prisma.subgroupLeader.findFirst({
        where: {
          subgroupId,
          userId: session.user.id,
          isLeader: true,
        },
      })

      // Also check if project admin
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { creatorId: true },
      })

      const projectMembership = await prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId,
            userId: session.user.id,
          },
        },
      })

      const isProjectAdmin =
        project?.creatorId === session.user.id ||
        projectMembership?.role === 'ADMIN' ||
        projectMembership?.role === 'OWNER'

      if (!isLeader && !isProjectAdmin) {
        return NextResponse.json(
          { success: false, error: 'Only leaders can remove other members' },
          { status: 403 }
        )
      }
    }

    if (removeAsLeader) {
      // Just remove leader status, keep as member
      await prisma.subgroupLeader.deleteMany({
        where: {
          subgroupId,
          userId: userIdToRemove,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Leader status removed',
      })
    }

    // Remove from subgroup entirely
    await prisma.$transaction([
      prisma.subgroupLeader.deleteMany({
        where: { subgroupId, userId: userIdToRemove },
      }),
      prisma.subgroupMember.deleteMany({
        where: { subgroupId, userId: userIdToRemove },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: isRemovingSelf ? 'Left subgroup' : 'Member removed',
    })
  } catch (error) {
    console.error('Error removing member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove member' },
      { status: 500 }
    )
  }
}
