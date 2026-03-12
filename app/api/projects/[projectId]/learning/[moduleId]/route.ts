import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { checkAndAwardBadges } from '@/lib/projects/recognition'

// GET - Get single learning module with content
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; moduleId: string }> }
) {
  try {
    const session = await auth()
    const { projectId, moduleId } = await params

    const learningModule = await prisma.projectLearningModule.findUnique({
      where: { id: moduleId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,

            image: true,
          },
        },
        _count: {
          select: {
            progress: true,
          },
        },
      },
    })

    if (!learningModule || learningModule.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Module not found' },
        { status: 404 }
      )
    }

    // Get user's progress if logged in
    let userProgress = null
    if (session?.user?.id) {
      userProgress = await prisma.projectLearningProgress.findUnique({
        where: {
          moduleId_userId: {
            moduleId,
            userId: session.user.id,
          },
        },
      })

      // If no progress exists, create it (started)
      if (!userProgress) {
        userProgress = await prisma.projectLearningProgress.create({
          data: {
            moduleId,
            userId: session.user.id,
            progress: 0,
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...learningModule,
        userProgress,
      },
    })
  } catch (error) {
    console.error('Error fetching module:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch module' },
      { status: 500 }
    )
  }
}

// PUT - Update module or progress
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; moduleId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, moduleId } = await params
    const body = await request.json()
    const { action, progress, title, description, content, videoUrl, estimatedMinutes, order } = body

    const learningModule = await prisma.projectLearningModule.findUnique({
      where: { id: moduleId },
    })

    if (!learningModule || learningModule.projectId !== projectId) {
      return NextResponse.json(
        { success: false, error: 'Module not found' },
        { status: 404 }
      )
    }

    // Update progress
    if (action === 'updateProgress') {
      const existingProgress = await prisma.projectLearningProgress.findUnique({
        where: {
          moduleId_userId: {
            moduleId,
            userId: session.user.id,
          },
        },
      })

      const updatedProgress = await prisma.projectLearningProgress.upsert({
        where: {
          moduleId_userId: {
            moduleId,
            userId: session.user.id,
          },
        },
        update: {
          progress: progress || 0,
          completedAt: progress >= 100 ? new Date() : null,
        },
        create: {
          moduleId,
          userId: session.user.id,
          progress: progress || 0,
          completedAt: progress >= 100 ? new Date() : null,
        },
      })

      // If just completed (wasn't completed before)
      if (progress >= 100 && (!existingProgress || !existingProgress.completedAt)) {
        // Award contribution points
        const membership = await prisma.projectMember.findUnique({
          where: {
            projectId_userId: {
              projectId,
              userId: session.user.id,
            },
          },
        })

        if (membership) {
          await prisma.projectContribution.create({
            data: {
              projectId,
              userId: session.user.id,
              type: 'LEARNING',
              description: `Completed module: ${learningModule.title}`,
              points: 10,
              referenceId: moduleId,
            },
          })

          await prisma.projectMember.update({
            where: { id: membership.id },
            data: {
              contributionScore: { increment: 10 },
            },
          })

          // Check for Scholar badge
          await checkAndAwardBadges(projectId, session.user.id)
        }
      }

      return NextResponse.json({
        success: true,
        data: updatedProgress,
      })
    }

    // Update module content (admin only)
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
        { success: false, error: 'Only admins can edit modules' },
        { status: 403 }
      )
    }

    const updatedModule = await prisma.projectLearningModule.update({
      where: { id: moduleId },
      data: {
        ...(title && { title: title.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(content !== undefined && { content: content?.trim() || null }),
        ...(videoUrl !== undefined && { videoUrl: videoUrl?.trim() || null }),
        ...(estimatedMinutes !== undefined && { estimatedMinutes }),
        ...(order !== undefined && { order }),
      },
      include: {
        creator: {
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
      data: updatedModule,
    })
  } catch (error) {
    console.error('Error updating module:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update module' },
      { status: 500 }
    )
  }
}

// DELETE - Delete module (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; moduleId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { projectId, moduleId } = await params

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
        { success: false, error: 'Only admins can delete modules' },
        { status: 403 }
      )
    }

    // Delete progress and module
    await prisma.$transaction([
      prisma.projectLearningProgress.deleteMany({
        where: { moduleId },
      }),
      prisma.projectContribution.deleteMany({
        where: { referenceId: moduleId, type: 'LEARNING' },
      }),
      prisma.projectLearningModule.delete({
        where: { id: moduleId },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Module deleted',
    })
  } catch (error) {
    console.error('Error deleting module:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete module' },
      { status: 500 }
    )
  }
}
