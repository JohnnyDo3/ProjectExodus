import { NextResponse } from 'next/server'
import { getAllModules } from '@/data/modules'

// GET /api/learn/modules - Returns module list (metadata only, no lesson content)
export async function GET() {
  try {
    const modules = getAllModules()

    // Return only metadata — no lesson content, no quiz content
    const moduleMeta = modules.map(m => ({
      id: m.id,
      slug: m.slug,
      title: m.title,
      description: m.description,
      topic: m.topic,
      category: m.category,
      classroom: m.classroom,
      icon: m.icon,
      color: m.color,
      duration: m.duration,
      isMasterclass: m.isMasterclass,
      hasVideo: m.hasVideo,
      lessonCount: m.lessons.length,
      activityCount: m.activities.length,
      quizQuestionCount: m.quiz.questions.length,
      externalResources: m.externalResources,
    }))

    return NextResponse.json({ success: true, data: moduleMeta })
  } catch (error) {
    console.error('Error fetching modules:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch modules' },
      { status: 500 }
    )
  }
}
