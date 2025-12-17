import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

interface PrerequisiteCheckResult {
  prerequisiteId: string
  type: string
  description: string | null
  met: boolean
  details?: string
}

// GET - Check if current user meets all prerequisites
export async function GET(
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
    const userId = session.user.id

    // Get all prerequisites for the project
    const prerequisites = await prisma.projectPrerequisite.findMany({
      where: { projectId },
      orderBy: { order: 'asc' },
    })

    if (prerequisites.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          allMet: true,
          hasWaiver: false,
          results: [],
        },
      })
    }

    // Check if user has an approved waiver
    const waiver = await prisma.projectPrerequisiteWaiver.findFirst({
      where: {
        projectId,
        userId,
        status: 'APPROVED',
      },
    })

    if (waiver) {
      return NextResponse.json({
        success: true,
        data: {
          allMet: true,
          hasWaiver: true,
          waiverId: waiver.id,
          results: [],
        },
      })
    }

    // Get user's progress data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        stockScore: true,
        interests: true,
        expertise: true,
        learningProgress: {
          include: {
            module: true,
          },
        },
      },
    })

    // Get user's project learning progress
    const projectLearningProgress = await prisma.projectLearningProgress.findMany({
      where: {
        userId,
        module: {
          projectId,
        },
      },
      include: {
        module: true,
      },
    })

    const results: PrerequisiteCheckResult[] = []

    for (const prereq of prerequisites) {
      let met = false
      let details = ''

      switch (prereq.type) {
        case 'EXODUS_COURSE':
          if (prereq.exodusCourseId) {
            const courseProgress = user?.learningProgress?.find(
              (p: { moduleId: string; completedAt: Date | null }) => p.moduleId === prereq.exodusCourseId && p.completedAt !== null
            )
            met = !!courseProgress
            details = met
              ? `Completed ${(courseProgress as { module?: { title?: string } })?.module?.title || 'course'}`
              : 'Course not completed'
          }
          break

        case 'PROJECT_MODULE':
          if (prereq.projectModuleId) {
            const moduleProgress = projectLearningProgress.find(
              (p: { moduleId: string; completedAt: Date | null }) => p.moduleId === prereq.projectModuleId && p.completedAt !== null
            )
            met = !!moduleProgress
            details = met
              ? `Completed ${moduleProgress?.module?.title || 'module'}`
              : 'Module not completed'
          }
          break

        case 'TAG_MATCH':
          if (prereq.requiredTags && prereq.requiredTags.length > 0) {
            const userTags = [...(user?.interests || []), ...(user?.expertise || [])]
            const matchedTags = prereq.requiredTags.filter((tag: string) =>
              userTags.some(
                (ut: string) => ut.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(ut.toLowerCase())
              )
            )
            // Need at least 1 tag match
            met = matchedTags.length > 0
            details = met
              ? `Matched tags: ${matchedTags.join(', ')}`
              : `No matching tags. Required: ${prereq.requiredTags.join(', ')}`
          } else {
            met = true
            details = 'No tags required'
          }
          break

        case 'STOCK_LEVEL':
          if (prereq.stockLevel !== null && prereq.stockLevel !== undefined) {
            const userStock = user?.stockScore || 0
            met = userStock >= prereq.stockLevel
            details = met
              ? `STOCK score ${userStock} meets requirement of ${prereq.stockLevel}`
              : `STOCK score ${userStock} below required ${prereq.stockLevel}`
          }
          break

        default:
          met = true
          details = 'Unknown prerequisite type'
      }

      // If prerequisite is optional, mark as met
      if (!prereq.isRequired) {
        results.push({
          prerequisiteId: prereq.id,
          type: prereq.type,
          description: prereq.description,
          met: true,
          details: `Optional: ${details}`,
        })
      } else {
        results.push({
          prerequisiteId: prereq.id,
          type: prereq.type,
          description: prereq.description,
          met,
          details,
        })
      }
    }

    const allMet = results.every((r: { met: boolean }) => r.met)

    return NextResponse.json({
      success: true,
      data: {
        allMet,
        hasWaiver: false,
        results,
        canRequestWaiver: !allMet,
      },
    })
  } catch (error) {
    console.error('Error checking prerequisites:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check prerequisites' },
      { status: 500 }
    )
  }
}
