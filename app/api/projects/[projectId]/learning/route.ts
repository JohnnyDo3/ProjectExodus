import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// GET - Get project learning modules
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth()
    const { projectId } = await params

    const modules = await prisma.projectLearningModule.findMany({
      where: { projectId },
      include: {
        _count: {
          select: {
            progress: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    })

    // If logged in, get user's progress
    let modulesWithProgress = modules

    if (session?.user?.id) {
      const userProgress = await prisma.projectModuleProgress.findMany({
        where: {
          userId: session.user.id,
          moduleId: { in: modules.map((m: { id: string }) => m.id) },
        },
      })

      const progressMap = new Map(
        userProgress.map((p: { moduleId: string }) => [p.moduleId, p])
      )

      modulesWithProgress = modules.map((m: typeof modules[number]) => ({
        ...m,
        userProgress: progressMap.get(m.id) || null,
      })) as typeof modules
    }

    return NextResponse.json({
      success: true,
      data: modulesWithProgress,
    })
  } catch (error) {
    console.error('Error fetching learning modules:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch learning modules' },
      { status: 500 }
    )
  }
}

// POST - Create learning module (Admin only)
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
    const { title, description, content, videoUrl, estimatedMinutes, order } = body

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    // Validate video URL if provided
    if (videoUrl) {
      try {
        const parsed = new URL(videoUrl)
        if (parsed.protocol !== 'https:') {
          return NextResponse.json(
            { success: false, error: 'Video URL must use HTTPS' },
            { status: 400 }
          )
        }
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid video URL' },
          { status: 400 }
        )
      }
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

    const isAdmin =
      project?.creatorId === session.user.id ||
      membership?.role === 'ADMIN' ||
      membership?.role === 'OWNER'

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Only admins can create learning modules' },
        { status: 403 }
      )
    }

    // Get max order if not provided
    let moduleOrder = order
    if (moduleOrder === undefined) {
      const maxOrder = await prisma.projectLearningModule.aggregate({
        where: { projectId },
        _max: { order: true },
      })
      moduleOrder = (maxOrder._max.order || 0) + 1
    }

    const learningModule = await prisma.projectLearningModule.create({
      data: {
        projectId,
        title: title.trim(),
        description: description?.trim() || null,
        textContent: content?.trim() || null,
        videoUrl: videoUrl?.trim() || null,
        estimatedMinutes: estimatedMinutes || null,
        order: moduleOrder,
      },
    })

    return NextResponse.json({
      success: true,
      data: learningModule,
    })
  } catch (error) {
    console.error('Error creating learning module:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create learning module' },
      { status: 500 }
    )
  }
}
