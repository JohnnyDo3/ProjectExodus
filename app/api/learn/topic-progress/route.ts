import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { TOPICS, CoreTopic } from '@/data/modules'

// Type for topic structure
type TopicModule = { slug: string }
type Topic = { id: CoreTopic; modules: TopicModule[] }

export interface TopicProgress {
  topicId: CoreTopic
  totalModules: number
  completedModules: number
  progressPercent: number
  isGraduated: boolean
}

export async function GET() {
  try {
    const session = await auth()

    // If not logged in, return empty progress
    if (!session?.user?.id) {
      const emptyProgress: TopicProgress[] = TOPICS.map((topic: Topic) => ({
        topicId: topic.id,
        totalModules: topic.modules.length,
        completedModules: 0,
        progressPercent: 0,
        isGraduated: false
      }))

      return NextResponse.json({
        success: true,
        data: emptyProgress
      })
    }

    const userId = session.user.id

    // Get all completed learning progress for this user
    // We consider a module "completed" when quizPassed is true
    const completedProgress = await prisma.userLearningProgress.findMany({
      where: {
        userId,
        quizPassed: true
      },
      select: {
        articleId: true,
        article: {
          select: {
            slug: true
          }
        }
      }
    })

    // Create a set of completed module slugs
    const completedSlugs = new Set(
      completedProgress
        .map((p: { article: { slug: string } | null }) => p.article?.slug)
        .filter((slug: string | undefined): slug is string => Boolean(slug))
    )

    // Calculate progress for each topic
    const topicProgress: TopicProgress[] = TOPICS.map((topic: Topic) => {
      const completedInTopic = topic.modules.filter((m: TopicModule) =>
        completedSlugs.has(m.slug)
      ).length

      const progressPercent = Math.round((completedInTopic / topic.modules.length) * 100)

      return {
        topicId: topic.id,
        totalModules: topic.modules.length,
        completedModules: completedInTopic,
        progressPercent,
        isGraduated: progressPercent === 100
      }
    })

    return NextResponse.json({
      success: true,
      data: topicProgress
    })
  } catch (error) {
    console.error('Error fetching topic progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch topic progress' },
      { status: 500 }
    )
  }
}
