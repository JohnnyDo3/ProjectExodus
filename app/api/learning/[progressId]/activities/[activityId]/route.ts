import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/auth'
import { ActivityConfig, LearningLevel } from '@/types/learning'
import { ActivityProgress } from '@prisma/client'

// POST /api/learning/[progressId]/activities/[activityId]
// Submit an activity
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ progressId: string; activityId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { progressId, activityId } = await params
    const body = await request.json()
    const { submissionData, timeSpent } = body

    // Get progress
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId }
    })

    if (!progress) {
      return NextResponse.json(
        { success: false, error: 'Progress record not found' },
        { status: 404 }
      )
    }

    if (progress.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 403 }
      )
    }

    // Get level content
    const levelContent = await prisma.moduleLevelContent.findUnique({
      where: {
        articleId_level: {
          articleId: progress.articleId,
          level: progress.selectedLevel
        }
      }
    })

    if (!levelContent) {
      return NextResponse.json(
        { success: false, error: 'Level content not found' },
        { status: 404 }
      )
    }

    // Find the activity
    const activities = levelContent.activities as ActivityConfig[]
    const activity = activities.find(a => a.id === activityId)

    if (!activity) {
      return NextResponse.json(
        { success: false, error: 'Activity not found' },
        { status: 404 }
      )
    }

    // Validate and score the submission based on activity type
    const result = validateActivitySubmission(activity, submissionData)

    // Get or create activity progress
    const existingProgress = await prisma.activityProgress.findUnique({
      where: {
        progressId_activityId: {
          progressId,
          activityId
        }
      }
    })

    // Update or create activity progress
    const activityProgress = await prisma.activityProgress.upsert({
      where: {
        progressId_activityId: {
          progressId,
          activityId
        }
      },
      update: {
        attempts: { increment: 1 },
        score: result.score,
        bestScore: existingProgress
          ? Math.max(existingProgress.bestScore || 0, result.score)
          : result.score,
        completed: result.passed || existingProgress?.completed || false,
        timeSpent: (existingProgress?.timeSpent || 0) + (timeSpent || 0),
        submissionData
      },
      create: {
        progressId,
        activityId,
        attempts: 1,
        score: result.score,
        bestScore: result.score,
        completed: result.passed,
        timeSpent: timeSpent || 0,
        submissionData
      }
    })

    // Update overall progress percentage
    const allActivityProgress = await prisma.activityProgress.findMany({
      where: { progressId }
    })

    const requiredActivities = activities.filter(a => a.required)
    const completedRequired = allActivityProgress.filter((ap: ActivityProgress) =>
      requiredActivities.some(ra => ra.id === ap.activityId && ap.completed)
    ).length

    const progressPercentage = requiredActivities.length > 0
      ? Math.round((completedRequired / requiredActivities.length) * 100)
      : 100

    await prisma.userLearningProgress.update({
      where: { id: progressId },
      data: { progressPercentage }
    })

    return NextResponse.json({
      success: true,
      data: {
        score: result.score,
        maxScore: activity.points,
        passed: result.passed,
        feedback: result.feedback,
        correctAnswers: result.correctAnswers,
        attempts: activityProgress.attempts,
        bestScore: activityProgress.bestScore,
        progressPercentage
      }
    })

  } catch (error) {
    console.error('Error submitting activity:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit activity' },
      { status: 500 }
    )
  }
}

// GET /api/learning/[progressId]/activities/[activityId]
// Get activity progress
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ progressId: string; activityId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { progressId, activityId } = await params

    // Get progress
    const progress = await prisma.userLearningProgress.findUnique({
      where: { id: progressId }
    })

    if (!progress) {
      return NextResponse.json(
        { success: false, error: 'Progress record not found' },
        { status: 404 }
      )
    }

    if (progress.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 403 }
      )
    }

    const activityProgress = await prisma.activityProgress.findUnique({
      where: {
        progressId_activityId: {
          progressId,
          activityId
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: activityProgress || {
        attempts: 0,
        completed: false,
        score: null,
        bestScore: null
      }
    })

  } catch (error) {
    console.error('Error getting activity progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get activity progress' },
      { status: 500 }
    )
  }
}

interface ValidationResult {
  score: number
  passed: boolean
  feedback: string
  correctAnswers?: Record<string, unknown>
}

function validateActivitySubmission(
  activity: ActivityConfig,
  submission: Record<string, unknown>
): ValidationResult {
  const passingThreshold = 0.7 // 70% to pass

  switch (activity.type) {
    case 'DRAG_DROP':
      return validateDragDrop(activity, submission, passingThreshold)
    case 'SIMULATION':
      return validateSimulation(activity, submission, passingThreshold)
    case 'PUZZLE':
      return validatePuzzle(activity, submission, passingThreshold)
    case 'SCENARIO':
      return validateScenario(activity, submission)
    case 'STEP_GUIDED':
      return validateStepGuided(activity, submission, passingThreshold)
    case 'TIMED_CHALLENGE':
      return validateTimedChallenge(activity, submission, passingThreshold)
    default:
      return {
        score: 0,
        passed: false,
        feedback: 'Unknown activity type'
      }
  }
}

function validateDragDrop(
  activity: ActivityConfig,
  submission: Record<string, unknown>,
  threshold: number
): ValidationResult {
  const config = (activity as { config: { correctPlacements: Record<string, string>; feedback: { correct: string; incorrect: string } } }).config
  const placements = submission.placements as Record<string, string> || {}

  let correct = 0
  const total = Object.keys(config.correctPlacements).length

  for (const [itemId, zoneId] of Object.entries(config.correctPlacements)) {
    if (placements[itemId] === zoneId) {
      correct++
    }
  }

  const percentage = total > 0 ? correct / total : 0
  const score = Math.round(percentage * activity.points)
  const passed = percentage >= threshold

  return {
    score,
    passed,
    feedback: passed ? config.feedback.correct : config.feedback.incorrect,
    correctAnswers: config.correctPlacements
  }
}

function validateSimulation(
  activity: ActivityConfig,
  submission: Record<string, unknown>,
  threshold: number
): ValidationResult {
  const config = (activity as { config: { targetRange: { min: number; max: number }; explanation: string } }).config
  const result = submission.result as number

  const inRange = result >= config.targetRange.min && result <= config.targetRange.max
  const score = inRange ? activity.points : 0

  return {
    score,
    passed: inRange,
    feedback: config.explanation,
    correctAnswers: { targetRange: config.targetRange }
  }
}

function validatePuzzle(
  activity: ActivityConfig,
  submission: Record<string, unknown>,
  threshold: number
): ValidationResult {
  const config = (activity as { config: { puzzleType: string; data: Record<string, unknown[]> } }).config
  let correct = 0
  let total = 0

  if (config.puzzleType === 'matching') {
    const pairs = config.data.matching as { id: string; left: string; right: string }[]
    const matches = submission.matches as Record<string, string> || {}
    total = pairs.length
    for (const pair of pairs) {
      if (matches[pair.left] === pair.right) {
        correct++
      }
    }
  } else if (config.puzzleType === 'sorting') {
    const items = config.data.sorting as { id: string; correctPosition: number }[]
    const order = submission.order as string[] || []
    total = items.length
    for (let i = 0; i < items.length; i++) {
      const item = items.find(it => it.id === order[i])
      if (item && item.correctPosition === i) {
        correct++
      }
    }
  }

  const percentage = total > 0 ? correct / total : 0
  const score = Math.round(percentage * activity.points)

  return {
    score,
    passed: percentage >= threshold,
    feedback: percentage >= threshold ? 'Great job!' : 'Keep trying!'
  }
}

function validateScenario(
  activity: ActivityConfig,
  submission: Record<string, unknown>
): ValidationResult {
  const config = (activity as { config: { choices: { id: string; points: number; isOptimal: boolean }[] } }).config
  const choiceId = submission.choiceId as string
  const choice = config.choices.find(c => c.id === choiceId)

  if (!choice) {
    return { score: 0, passed: false, feedback: 'Invalid choice' }
  }

  return {
    score: choice.points,
    passed: choice.isOptimal,
    feedback: choice.isOptimal ? 'Excellent choice!' : 'Consider the alternatives...'
  }
}

function validateStepGuided(
  activity: ActivityConfig,
  submission: Record<string, unknown>,
  threshold: number
): ValidationResult {
  const config = (activity as { config: { steps: { id: string }[] } }).config
  const completedSteps = submission.completedSteps as string[] || []

  const percentage = config.steps.length > 0
    ? completedSteps.length / config.steps.length
    : 0

  return {
    score: Math.round(percentage * activity.points),
    passed: percentage >= threshold,
    feedback: percentage >= 1 ? 'All steps completed!' : 'Complete all steps to finish'
  }
}

function validateTimedChallenge(
  activity: ActivityConfig,
  submission: Record<string, unknown>,
  threshold: number
): ValidationResult {
  const config = (activity as { config: { questions: { id: string; correctAnswer: string; points: number }[] } }).config
  const answers = submission.answers as Record<string, string> || {}

  let score = 0
  let correct = 0

  for (const question of config.questions) {
    if (answers[question.id] === question.correctAnswer) {
      score += question.points
      correct++
    }
  }

  const percentage = config.questions.length > 0
    ? correct / config.questions.length
    : 0

  return {
    score,
    passed: percentage >= threshold,
    feedback: `${correct}/${config.questions.length} correct`
  }
}
