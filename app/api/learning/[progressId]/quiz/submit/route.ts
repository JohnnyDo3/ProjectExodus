import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { incrementStockScore, STOCK_POINTS } from '@/lib/stockScore'

/**
 * POST /api/learning/[progressId]/quiz/submit
 * Submit quiz answers and calculate score
 * Must achieve perfect score (5/5) to complete large modules
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ progressId: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { progressId } = await params
    const body = await request.json()
    const { answers } = body // Array of user answers: ['answer1', 'answer2', ...]

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { success: false, error: 'Answers array is required' },
        { status: 400 }
      )
    }

    // Verify ownership and get quiz questions
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId },
      include: {
        article: {
          select: {
            quizQuestions: true,
            moduleType: true,
          },
        },
      },
    })

    if (!progress) {
      return NextResponse.json(
        { success: false, error: 'Progress record not found' },
        { status: 404 }
      )
    }

    if (progress.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    if (progress.article.moduleType !== 'LARGE') {
      return NextResponse.json(
        { success: false, error: 'This module does not have a quiz' },
        { status: 400 }
      )
    }

    const quizQuestions = progress.article.quizQuestions as any[]

    if (!quizQuestions || quizQuestions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No quiz questions found' },
        { status: 400 }
      )
    }

    if (answers.length !== quizQuestions.length) {
      return NextResponse.json(
        { success: false, error: `Expected ${quizQuestions.length} answers` },
        { status: 400 }
      )
    }

    // Calculate score
    let correctCount = 0
    const results = quizQuestions.map((question, index) => {
      const userAnswer = answers[index]
      const correctAnswer = question.correctAnswer
      const isCorrect = userAnswer === correctAnswer

      if (isCorrect) correctCount++

      return {
        questionIndex: index,
        question: question.question,
        userAnswer,
        correctAnswer,
        isCorrect,
      }
    })

    const score = correctCount
    const isPerfectScore = score === quizQuestions.length
    const newAttempts = progress.quizAttempts + 1

    // Update progress
    const updated = await prisma.userLearningProgress.update({
      where: { id: progressId },
      data: {
        quizScore: score,
        quizAttempts: newAttempts,
        quizPassed: isPerfectScore,
        status: isPerfectScore ? 'COMPLETED' : 'IN_PROGRESS',
        completedAt: isPerfectScore ? new Date() : null,
        progressPercentage: isPerfectScore ? 100 : progress.progressPercentage,
      },
    })

    // Award stock points when quiz is passed (module completed)
    if (isPerfectScore && !progress.quizPassed) {
      incrementStockScore(session.user.id, STOCK_POINTS.MODULE_COMPLETED).catch(() => {})
    }

    return NextResponse.json({
      success: true,
      data: {
        score,
        totalQuestions: quizQuestions.length,
        isPerfectScore,
        passed: isPerfectScore,
        attempts: newAttempts,
        results,
        progress: updated,
      },
      message: isPerfectScore
        ? '🎉 Perfect score! Module completed!'
        : `Score: ${score}/${quizQuestions.length}. You need a perfect score to complete this module. Try again!`,
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
