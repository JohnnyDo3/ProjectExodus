import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'

// Type for progress record
type ProgressRecord = {
  pathId: string
  lessonId: string
  status: string
}

// GET - Fetch user's progress for a path or all paths
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const pathId = searchParams.get('pathId')
    const lessonId = searchParams.get('lessonId')

    // If specific lesson requested
    if (pathId && lessonId) {
      const progress = await prisma.exodologyProgress.findUnique({
        where: {
          userId_pathId_lessonId: {
            userId: session.user.id,
            pathId,
            lessonId
          }
        }
      })
      return NextResponse.json({ progress })
    }

    // If path requested, get all progress for that path
    if (pathId) {
      const progress = await prisma.exodologyProgress.findMany({
        where: {
          userId: session.user.id,
          pathId
        },
        orderBy: { lastAccessedAt: 'desc' }
      })

      // Calculate path statistics
      const completed = progress.filter((p: ProgressRecord) => p.status === 'COMPLETED').length
      const inProgress = progress.filter((p: ProgressRecord) => p.status === 'IN_PROGRESS').length
      const total = progress.length

      return NextResponse.json({
        progress,
        stats: { completed, inProgress, total }
      })
    }

    // Get all progress across all paths
    const progress = await prisma.exodologyProgress.findMany({
      where: { userId: session.user.id },
      orderBy: { lastAccessedAt: 'desc' }
    })

    // Group by path
    const byPath = progress.reduce((acc: Record<string, { completed: number; inProgress: number; total: number }>, p: ProgressRecord) => {
      if (!acc[p.pathId]) {
        acc[p.pathId] = { completed: 0, inProgress: 0, total: 0 }
      }
      acc[p.pathId].total++
      if (p.status === 'COMPLETED') acc[p.pathId].completed++
      if (p.status === 'IN_PROGRESS') acc[p.pathId].inProgress++
      return acc
    }, {} as Record<string, { completed: number; inProgress: number; total: number }>)

    return NextResponse.json({ progress, byPath })

  } catch (error) {
    console.error('Error fetching exodology progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

// POST - Update or create progress for a lesson
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { pathId, lessonId, status, completionData } = body

    if (!pathId || !lessonId) {
      return NextResponse.json({ error: 'pathId and lessonId are required' }, { status: 400 })
    }

    // Upsert progress
    const progress = await prisma.exodologyProgress.upsert({
      where: {
        userId_pathId_lessonId: {
          userId: session.user.id,
          pathId,
          lessonId
        }
      },
      update: {
        status: status || undefined,
        completionData: completionData || undefined,
        lastAccessedAt: new Date(),
        startedAt: status === 'IN_PROGRESS' ? new Date() : undefined,
        completedAt: status === 'COMPLETED' ? new Date() : undefined
      },
      create: {
        userId: session.user.id,
        pathId,
        lessonId,
        status: status || 'IN_PROGRESS',
        completionData: completionData || null,
        startedAt: new Date(),
        lastAccessedAt: new Date()
      }
    })

    // Check if path is complete (for certification)
    if (status === 'COMPLETED') {
      const pathProgress = await prisma.exodologyProgress.findMany({
        where: {
          userId: session.user.id,
          pathId
        }
      })

      // Get total lessons for this path (we'll need to check curriculum data)
      const completedCount = pathProgress.filter((p: ProgressRecord) => p.status === 'COMPLETED').length

      return NextResponse.json({
        progress,
        pathStats: {
          completed: completedCount,
          total: pathProgress.length
        }
      })
    }

    return NextResponse.json({ progress })

  } catch (error) {
    console.error('Error updating exodology progress:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}
