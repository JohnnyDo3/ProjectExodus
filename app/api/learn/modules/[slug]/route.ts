import { NextRequest, NextResponse } from 'next/server'
import { getAllModules, getModuleContentForLevel } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// GET /api/learn/modules/[slug]?level=HIGH_SCHOOL
// Returns full module content for a specific level
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const searchParams = request.nextUrl.searchParams
    const levelParam = searchParams.get('level')?.toUpperCase() as LearningLevel | undefined
    const level: LearningLevel = levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'

    const allModules = getAllModules()
    const module = allModules.find(m => m.slug === slug)

    if (!module) {
      return NextResponse.json(
        { success: false, error: 'Module not found' },
        { status: 404 }
      )
    }

    // Return full module data + level-adapted content
    const levelContent = getModuleContentForLevel(module, level)

    return NextResponse.json({
      success: true,
      data: {
        module,
        levelContent,
        currentLevel: level,
      }
    })
  } catch (error) {
    console.error('Error fetching module:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch module' },
      { status: 500 }
    )
  }
}
