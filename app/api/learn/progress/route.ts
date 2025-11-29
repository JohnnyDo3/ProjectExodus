import { NextResponse } from 'next/server'
import { auth } from '@/auth'
// import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const body = await request.json()
    const { moduleId, lessonId, quizId, score, passed, answers, action } = body

    switch (action) {
      case 'start':
        // Start a module - create or update progress record
        // await prisma.userModuleProgress.upsert({
        //   where: { userId_moduleId: { userId, moduleId } },
        //   create: {
        //     userId,
        //     moduleId,
        //     status: 'IN_PROGRESS',
        //     progressPercent: 0,
        //     startedAt: new Date(),
        //     lastAccessedAt: new Date()
        //   },
        //   update: {
        //     status: 'IN_PROGRESS',
        //     lastAccessedAt: new Date()
        //   }
        // })

        return NextResponse.json({
          success: true,
          message: 'Module started',
          data: { moduleId, status: 'IN_PROGRESS' }
        })

      case 'complete_lesson':
        // Mark a lesson as complete
        // await prisma.userLessonProgress.upsert({
        //   where: { userId_lessonId: { userId, lessonId } },
        //   create: {
        //     userId,
        //     lessonId,
        //     completed: true,
        //     completedAt: new Date()
        //   },
        //   update: {
        //     completed: true,
        //     completedAt: new Date()
        //   }
        // })

        // Update module progress percentage
        // const module = await prisma.learningModule.findUnique({
        //   where: { id: moduleId },
        //   include: { lessons: true }
        // })
        // const completedLessons = await prisma.userLessonProgress.count({
        //   where: {
        //     userId,
        //     lesson: { moduleId },
        //     completed: true
        //   }
        // })
        // const progressPercent = Math.round((completedLessons / module.lessons.length) * 100)

        // await prisma.userModuleProgress.update({
        //   where: { userId_moduleId: { userId, moduleId } },
        //   data: {
        //     progressPercent,
        //     lastAccessedAt: new Date()
        //   }
        // })

        return NextResponse.json({
          success: true,
          message: 'Lesson completed',
          data: { lessonId, completed: true }
        })

      case 'submit_quiz':
        // Record quiz attempt
        // await prisma.quizAttempt.create({
        //   data: {
        //     userId,
        //     quizId,
        //     score,
        //     passed,
        //     answers
        //   }
        // })

        // If passed, mark module as complete
        // if (passed) {
        //   await prisma.userModuleProgress.update({
        //     where: { userId_moduleId: { userId, moduleId } },
        //     data: {
        //       status: 'COMPLETED',
        //       progressPercent: 100,
        //       completedAt: new Date(),
        //       lastAccessedAt: new Date()
        //     }
        //   })
        // }

        return NextResponse.json({
          success: true,
          message: passed ? 'Quiz passed! Module completed.' : 'Quiz submitted',
          data: { quizId, score, passed }
        })

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const moduleId = searchParams.get('moduleId')

    if (moduleId) {
      // Get progress for a specific module
      // const progress = await prisma.userModuleProgress.findUnique({
      //   where: { userId_moduleId: { userId, moduleId } },
      //   include: {
      //     module: {
      //       include: {
      //         lessons: true
      //       }
      //     }
      //   }
      // })
      // const completedLessons = await prisma.userLessonProgress.findMany({
      //   where: {
      //     userId,
      //     lesson: { moduleId },
      //     completed: true
      //   }
      // })

      return NextResponse.json({
        success: true,
        data: {
          moduleId,
          status: 'NOT_STARTED',
          progressPercent: 0,
          completedLessons: []
        }
      })
    }

    // Get all module progress for user
    // const allProgress = await prisma.userModuleProgress.findMany({
    //   where: { userId },
    //   include: {
    //     module: true
    //   },
    //   orderBy: { lastAccessedAt: 'desc' }
    // })

    return NextResponse.json({
      success: true,
      data: {
        inProgress: [],
        completed: []
      }
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
