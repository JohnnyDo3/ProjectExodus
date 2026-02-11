import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// GET - Fetch project prerequisites
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    const prerequisites = await prisma.projectPrerequisite.findMany({
      where: { projectId },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({
      success: true,
      data: prerequisites,
    })
  } catch (error) {
    console.error('Error fetching prerequisites:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prerequisites' },
      { status: 500 }
    )
  }
}

// POST - Create new prerequisite (Admin only)
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
    const { type, exodusCourseId, projectModuleId, requiredTags, stockLevel, description } = body

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
    const isAdmin = membership?.role === 'ADMIN' || membership?.role === 'OWNER'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can manage prerequisites' },
        { status: 403 }
      )
    }

    // Get current max order
    const maxOrder = await prisma.projectPrerequisite.aggregate({
      where: { projectId },
      _max: { order: true },
    })

    const prerequisite = await prisma.projectPrerequisite.create({
      data: {
        projectId,
        type,
        exodusCourseId,
        projectModuleId,
        requiredTags: requiredTags || [],
        stockLevel,
        description,
        order: (maxOrder._max.order || 0) + 1,
      },
    })

    return NextResponse.json({
      success: true,
      data: prerequisite,
    })
  } catch (error) {
    console.error('Error creating prerequisite:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create prerequisite' },
      { status: 500 }
    )
  }
}

// PUT - Update prerequisite order or details (Admin only)
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
    const { id, type, exodusCourseId, projectModuleId, requiredTags, stockLevel, description, order, isRequired } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Prerequisite ID required' },
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
    const isAdmin = membership?.role === 'ADMIN' || membership?.role === 'OWNER'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can manage prerequisites' },
        { status: 403 }
      )
    }

    const prerequisite = await prisma.projectPrerequisite.update({
      where: { id },
      data: {
        ...(type && { type }),
        ...(exodusCourseId !== undefined && { exodusCourseId }),
        ...(projectModuleId !== undefined && { projectModuleId }),
        ...(requiredTags && { requiredTags }),
        ...(stockLevel !== undefined && { stockLevel }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
        ...(isRequired !== undefined && { isRequired }),
      },
    })

    return NextResponse.json({
      success: true,
      data: prerequisite,
    })
  } catch (error) {
    console.error('Error updating prerequisite:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update prerequisite' },
      { status: 500 }
    )
  }
}

// DELETE - Remove prerequisite (Admin only)
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
    const prerequisiteId = searchParams.get('id')

    if (!prerequisiteId) {
      return NextResponse.json(
        { success: false, error: 'Prerequisite ID required' },
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
    const isAdmin = membership?.role === 'ADMIN' || membership?.role === 'OWNER'

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can manage prerequisites' },
        { status: 403 }
      )
    }

    await prisma.projectPrerequisite.delete({
      where: { id: prerequisiteId },
    })

    return NextResponse.json({
      success: true,
      message: 'Prerequisite deleted',
    })
  } catch (error) {
    console.error('Error deleting prerequisite:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete prerequisite' },
      { status: 500 }
    )
  }
}
