import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

/**
 * POST /api/learning/save
 * Save/start a learning module
 * Creates a UserLearningProgress record
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { articleId } = body

    if (!articleId) {
      return NextResponse.json(
        { success: false, error: 'Article ID is required' },
        { status: 400 }
      )
    }

    // Check if article exists and is a learning module
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: {
        id: true,
        moduleType: true,
        moduleTabs: true,
      },
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Module not found' },
        { status: 404 }
      )
    }

    if (!article.moduleType) {
      return NextResponse.json(
        { success: false, error: 'This article is not a learning module' },
        { status: 400 }
      )
    }

    // Check if progress already exists
    const existingProgress = await prisma.userLearningProgress.findUnique({
      where: {
        userId_articleId: {
          userId: session.user.id,
          articleId: articleId,
        },
      },
    })

    if (existingProgress) {
      return NextResponse.json({
        success: true,
        data: existingProgress,
        message: 'Module already in your learning list',
      })
    }

    // Create new progress record
    const progress = await prisma.userLearningProgress.create({
      data: {
        userId: session.user.id,
        articleId: articleId,
        status: 'IN_PROGRESS',
        progressPercentage: 0,
        currentTabIndex: 0,
      },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImage: true,
            moduleType: true,
            moduleTabs: true,
            quizQuestions: true,
            estimatedTime: true,
            difficulty: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: progress,
      message: 'Module added to your learning list',
    })
  } catch (error) {
    console.error('Error saving learning module:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
