import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { LearningLevel, LEARNING_LEVELS, LEARNING_LEVEL_ORDER } from '@/types/learning'

// Type for level content result from Prisma query
type LevelContentResult = {
  level: string
  estimatedMinutes: number
  readingLevel: string | null
}

// GET /api/learning/modules/[articleId]/levels
// Get available levels for a module
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { articleId } = await params

    // Check if article exists and is a learning module
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: {
        id: true,
        title: true,
        slug: true,
        moduleType: true,
        levelContents: {
          select: {
            level: true,
            estimatedMinutes: true,
            readingLevel: true
          }
        }
      }
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

    // Get available levels with metadata
    const availableLevels = article.levelContents.map((lc: LevelContentResult) => ({
      level: lc.level as LearningLevel,
      meta: LEARNING_LEVELS[lc.level as LearningLevel],
      estimatedMinutes: lc.estimatedMinutes,
      readingLevel: lc.readingLevel
    }))

    // Sort by level order
    availableLevels.sort((a: { level: LearningLevel }, b: { level: LearningLevel }) =>
      LEARNING_LEVEL_ORDER.indexOf(a.level) - LEARNING_LEVEL_ORDER.indexOf(b.level)
    )

    return NextResponse.json({
      success: true,
      data: {
        moduleId: article.id,
        moduleTitle: article.title,
        moduleSlug: article.slug,
        availableLevels,
        allLevels: LEARNING_LEVEL_ORDER.map(level => ({
          level,
          meta: LEARNING_LEVELS[level],
          isAvailable: availableLevels.some((al: { level: LearningLevel }) => al.level === level)
        }))
      }
    })

  } catch (error) {
    console.error('Error fetching module levels:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch module levels' },
      { status: 500 }
    )
  }
}
