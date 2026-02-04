import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

// GET - Get single subgroup details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; subgroupId: string }> }
) {
  try {
    const session = await auth()
    const { projectId, subgroupId } = await params

    const subgroup = await prisma.projectSubgroup.findUnique({
      where: { id: subgroupId },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        leaders: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                
                image: true,
              },
            },
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                
                image: true,
              },
            },
          },
          take: 10,
        },
        _count: {
          select: {
            members: true,
            discussions: true,
          },
        },
      },
    })

    if (!subgroup || subgroup.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Subgroup not found' },
        { status: 404 }
      )
    }

    // Check access for private subgroups
    if (subgroup.isPrivate && session?.user?.id) {
      const membership = await prisma.subgroupMember.findUnique({
        where: {
          subgroupId_userId: {
            subgroupId,
            userId: session.user.id,
          },
        },
      })

      const isLeader = subgroup.leaders.some(
        (l: { userId: string }) => l.userId === session.user.id
      )

      if (!membership && !isLeader) {
        // Return limited info for non-members
        return NextResponse.json({
          success: true,
          data: {
            id: subgroup.id,
            name: subgroup.name,
            description: subgroup.description,
            isPrivate: true,
            _count: subgroup._count,
            canRequestJoin: true,
            entryRequirements: subgroup.entryRequirements,
          },
        })
      }
    }

    // Add user's membership status if logged in
    let userMembership = null
    let isLeader = false

    if (session?.user?.id) {
      const membership = await prisma.subgroupMember.findUnique({
        where: {
          subgroupId_userId: {
            subgroupId,
            userId: session.user.id,
          },
        },
      })
      userMembership = membership

      isLeader = subgroup.leaders.some((l: { userId: string }) => l.userId === session.user.id)
    }

    return NextResponse.json({
      success: true,
      data: {
        ...subgroup,
        userMembership,
        isLeader,
      },
    })
  } catch (error) {
    console.error('Error fetching subgroup:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subgroup' },
      { status: 500 }
    )
  }
}

// PUT - Update subgroup (Leaders only)
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

    const { projectId, subgroupId } = await params
    const body = await request.json()
    const { name, description, goal, isPrivate, entryRequirements } = body

    // Check if user is a leader of the subgroup
    const leader = await prisma.subgroupLeader.findFirst({
      where: {
        subgroupId,
        userId: session.user.id,
        isLeader: true,
      },
    })

    // Also check if user is project admin
    const projectMembership = await prisma.projectMember.findUnique({
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

    const isProjectAdmin =
      project?.creatorId === session.user.id ||
      projectMembership?.role === 'ADMIN' ||
      projectMembership?.role === 'OWNER'

    if (!leader && !isProjectAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only subgroup leaders can edit the subgroup' },
        { status: 403 }
      )
    }

    const updatedSubgroup = await prisma.projectSubgroup.update({
      where: { id: subgroupId },
      data: {
        ...(name && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(goal !== undefined && { goal: goal?.trim() || null }),
        ...(isPrivate !== undefined && { isPrivate }),
        ...(entryRequirements !== undefined && {
          entryRequirements: entryRequirements?.trim() || null,
        }),
      },
      include: {
        leaders: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            discussions: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedSubgroup,
    })
  } catch (error) {
    console.error('Error updating subgroup:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update subgroup' },
      { status: 500 }
    )
  }
}

// DELETE - Delete subgroup (Leaders or project admin only)
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

    // Check if user is a leader or project admin
    const leader = await prisma.subgroupLeader.findFirst({
      where: {
        subgroupId,
        userId: session.user.id,
        isLeader: true,
      },
    })

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

    if (!leader && !isProjectAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only subgroup leaders or project admins can delete subgroups' },
        { status: 403 }
      )
    }

    // Delete all related data first
    await prisma.$transaction([
      prisma.subgroupJoinRequest.deleteMany({ where: { subgroupId } }),
      prisma.subgroupDiscussionReply.deleteMany({
        where: { discussion: { subgroupId } },
      }),
      prisma.subgroupDiscussion.deleteMany({ where: { subgroupId } }),
      prisma.subgroupLeader.deleteMany({ where: { subgroupId } }),
      prisma.subgroupMember.deleteMany({ where: { subgroupId } }),
      prisma.projectSubgroup.delete({ where: { id: subgroupId } }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Subgroup deleted',
    })
  } catch (error) {
    console.error('Error deleting subgroup:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete subgroup' },
      { status: 500 }
    )
  }
}
