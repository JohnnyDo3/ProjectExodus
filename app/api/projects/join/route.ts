import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// POST /api/projects/join - Join a project
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please sign in to join projects' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { projectId } = body

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: projectId' },
        { status: 400 }
      )
    }

    // Check if already a member
    const existingMember = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    if (existingMember) {
      return NextResponse.json(
        { success: false, error: 'You are already a member of this project' },
        { status: 400 }
      )
    }

    // Add user as member
    const member = await prisma.projectMember.create({
      data: {
        projectId,
        userId: session.user.id,
        role: 'MEMBER', // Default role for new joiners
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
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

    return NextResponse.json({
      success: true,
      data: member,
      message: 'Successfully joined the project!',
    })
  } catch (error) {
    console.error('Error joining project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to join project' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/join - Leave a project
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameter: projectId' },
        { status: 400 }
      )
    }

    // Check if member exists
    const member = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    if (!member) {
      return NextResponse.json(
        { success: false, error: 'You are not a member of this project' },
        { status: 400 }
      )
    }

    // Don't allow OWNER to leave
    if (member.role === 'OWNER') {
      return NextResponse.json(
        { success: false, error: 'Project owners cannot leave. Transfer ownership first.' },
        { status: 400 }
      )
    }

    // Remove membership
    await prisma.projectMember.delete({
      where: {
        projectId_userId: {
          projectId,
          userId: session.user.id,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully left the project',
    })
  } catch (error) {
    console.error('Error leaving project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to leave project' },
      { status: 500 }
    )
  }
}
