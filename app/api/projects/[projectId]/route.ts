import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        _count: {
          select: {
            members: true,
            messages: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is the creator
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { creatorId: true }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    if (project.creatorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Only the project creator can edit this project' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, description, goal, status } = body

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: name?.trim() || undefined,
        description: description?.trim() || undefined,
        goal: goal?.trim() || undefined,
        status: status || undefined
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            members: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: updated
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is the creator
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { creatorId: true }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    if (project.creatorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Only the project creator can delete this project' },
        { status: 403 }
      )
    }

    // Delete project (cascades to members, messages)
    await prisma.project.delete({
      where: { id: projectId }
    })

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
