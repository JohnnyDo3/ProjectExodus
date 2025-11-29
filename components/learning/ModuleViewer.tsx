'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  ChevronLeft, ChevronRight, CheckCircle2, Circle,
  BookOpen, Trophy, Clock, Target, ArrowLeft, Play
} from 'lucide-react'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  content: string
  order: number
}

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizQuestion {
  id: string
  question: string
  explanation?: string
  options: QuizOption[]
}

interface Quiz {
  id: string
  passingScore: number
  questions: QuizQuestion[]
}

interface Module {
  id: string
  title: string
  slug: string
  description: string
  category: string
  duration?: number
  color?: string
  lessons: Lesson[]
  quiz?: Quiz
}

interface ModuleViewerProps {
  module: Module
  userId?: string
  initialProgress?: {
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
    progressPercent: number
    completedLessons: string[]
  }
}

export function ModuleViewer({ module, userId, initialProgress }: ModuleViewerProps) {
  const [currentTab, setCurrentTab] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(initialProgress?.completedLessons || [])
  )
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [started, setStarted] = useState(initialProgress?.status !== 'NOT_STARTED')

  const totalLessons = module.lessons.length
  const progressPercent = Math.round((completedLessons.size / totalLessons) * 100)
  const currentLesson = module.lessons[currentTab]
  const hasQuiz = module.quiz && module.quiz.questions.length > 0

  // Mark lesson as complete
  const markLessonComplete = async (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]))

    if (userId) {
      try {
        await fetch('/api/learn/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId: module.id,
            lessonId,
            action: 'complete_lesson'
          })
        })
      } catch (error) {
        console.error('Error saving progress:', error)
      }
    }
  }

  // Start module
  const handleStart = async () => {
    setStarted(true)

    if (userId) {
      try {
        await fetch('/api/learn/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId: module.id,
            action: 'start'
          })
        })
      } catch (error) {
        console.error('Error starting module:', error)
      }
    }
  }

  // Navigate lessons
  const goToNext = () => {
    if (!completedLessons.has(currentLesson.id)) {
      markLessonComplete(currentLesson.id)
    }

    if (currentTab < totalLessons - 1) {
      setCurrentTab(currentTab + 1)
    } else if (hasQuiz) {
      setShowQuiz(true)
    }
  }

  const goToPrevious = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1)
    }
  }

  // Quiz handling
  const handleQuizAnswer = (questionId: string, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  const submitQuiz = async () => {
    if (!module.quiz) return

    let correct = 0
    module.quiz.questions.forEach(question => {
      const selectedOption = question.options.find(o => o.id === quizAnswers[question.id])
      if (selectedOption?.isCorrect) correct++
    })

    const score = Math.round((correct / module.quiz.questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)

    if (userId) {
      try {
        await fetch('/api/learn/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId: module.id,
            quizId: module.quiz.id,
            score,
            passed: score >= module.quiz.passingScore,
            answers: quizAnswers,
            action: 'submit_quiz'
          })
        })
      } catch (error) {
        console.error('Error submitting quiz:', error)
      }
    }
  }

  // Start screen
  if (!started) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-earth-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/learn" className="inline-flex items-center gap-2 text-moss-600 dark:text-moss-400 font-bold mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>

          <Card className="border-4 border-moss-400 dark:border-moss-600 overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-moss-500 to-ocean-500" />
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-moss-100 dark:bg-moss-900 text-moss-700 dark:text-moss-300 font-bold text-sm mb-6">
                {module.category}
              </div>

              <h1 className="text-4xl font-black text-earth-900 dark:text-sand-100 mb-4">
                {module.title}
              </h1>

              <p className="text-lg text-earth-700 dark:text-sand-300 mb-8 max-w-2xl mx-auto">
                {module.description}
              </p>

              <div className="flex items-center justify-center gap-8 mb-10 text-earth-600 dark:text-sand-400">
                <span className="flex items-center gap-2 font-bold">
                  <BookOpen className="w-5 h-5" />
                  {totalLessons} Lessons
                </span>
                {module.duration && (
                  <span className="flex items-center gap-2 font-bold">
                    <Clock className="w-5 h-5" />
                    {module.duration} min
                  </span>
                )}
                {hasQuiz && (
                  <span className="flex items-center gap-2 font-bold">
                    <Target className="w-5 h-5" />
                    Quiz Included
                  </span>
                )}
              </div>

              <Button
                size="lg"
                onClick={handleStart}
                className="text-xl px-12 py-6 rounded-xl font-black shadow-xl"
              >
                <Play className="w-6 h-6 mr-3" />
                START MODULE
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Quiz screen
  if (showQuiz && module.quiz) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-earth-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-4 border-ocean-400 dark:border-ocean-600 overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-ocean-500 to-moss-500" />
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Trophy className="w-16 h-16 text-ocean-600 dark:text-ocean-400 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-earth-900 dark:text-sand-100 mb-2">
                  {quizSubmitted ? 'Quiz Complete!' : 'Knowledge Check'}
                </h2>
                {quizSubmitted && quizScore !== null && (
                  <div className={`text-5xl font-black ${quizScore >= module.quiz.passingScore ? 'text-moss-600' : 'text-terra-600'}`}>
                    {quizScore}%
                  </div>
                )}
                {quizSubmitted && (
                  <p className={`text-lg font-bold mt-2 ${quizScore && quizScore >= module.quiz.passingScore ? 'text-moss-600' : 'text-terra-600'}`}>
                    {quizScore && quizScore >= module.quiz.passingScore
                      ? 'Congratulations! You passed!'
                      : `You need ${module.quiz.passingScore}% to pass. Try again!`}
                  </p>
                )}
              </div>

              <div className="space-y-8">
                {module.quiz.questions.map((question, qIndex) => {
                  const selectedAnswer = quizAnswers[question.id]
                  const correctOption = question.options.find(o => o.isCorrect)

                  return (
                    <div key={question.id} className="p-6 bg-white dark:bg-earth-800 rounded-xl border-2 border-sand-300 dark:border-earth-600">
                      <p className="text-lg font-bold text-earth-900 dark:text-sand-100 mb-4">
                        {qIndex + 1}. {question.question}
                      </p>

                      <div className="space-y-3">
                        {question.options.map((option) => {
                          const isSelected = selectedAnswer === option.id
                          const showResult = quizSubmitted

                          let optionClass = 'border-sand-300 dark:border-earth-600 hover:border-moss-400'
                          if (showResult) {
                            if (option.isCorrect) {
                              optionClass = 'border-moss-500 bg-moss-50 dark:bg-moss-900/30'
                            } else if (isSelected && !option.isCorrect) {
                              optionClass = 'border-terra-500 bg-terra-50 dark:bg-terra-900/30'
                            }
                          } else if (isSelected) {
                            optionClass = 'border-ocean-500 bg-ocean-50 dark:bg-ocean-900/30'
                          }

                          return (
                            <button
                              key={option.id}
                              onClick={() => !quizSubmitted && handleQuizAnswer(question.id, option.id)}
                              disabled={quizSubmitted}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${optionClass}`}
                            >
                              <span className="font-medium text-earth-900 dark:text-sand-100">
                                {option.text}
                              </span>
                              {showResult && option.isCorrect && (
                                <CheckCircle2 className="inline-block w-5 h-5 text-moss-600 ml-2" />
                              )}
                            </button>
                          )
                        })}
                      </div>

                      {quizSubmitted && question.explanation && (
                        <div className="mt-4 p-4 bg-ocean-50 dark:bg-ocean-900/30 rounded-lg border border-ocean-200 dark:border-ocean-700">
                          <p className="text-sm font-medium text-ocean-800 dark:text-ocean-200">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowQuiz(false)
                    setQuizSubmitted(false)
                    setQuizAnswers({})
                    setQuizScore(null)
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Lessons
                </Button>

                {!quizSubmitted ? (
                  <Button
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < module.quiz.questions.length}
                    className="font-bold"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Link href="/learn">
                    <Button className="font-bold">
                      Continue Learning
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Lesson viewer
  return (
    <div className="min-h-screen bg-sand-50 dark:bg-earth-900 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/learn" className="inline-flex items-center gap-2 text-moss-600 dark:text-moss-400 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-earth-600 dark:text-sand-400">
              {progressPercent}% Complete
            </span>
            <div className="w-32 h-2 bg-sand-300 dark:bg-earth-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-moss-500 to-ocean-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Module Title */}
        <div className="mb-6">
          <span className="text-sm font-bold text-moss-600 dark:text-moss-400">{module.category}</span>
          <h1 className="text-2xl font-black text-earth-900 dark:text-sand-100">{module.title}</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.has(lesson.id)
            const isCurrent = index === currentTab

            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentTab(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-moss-600 text-white'
                    : isCompleted
                    ? 'bg-moss-100 dark:bg-moss-900 text-moss-700 dark:text-moss-300'
                    : 'bg-sand-200 dark:bg-earth-700 text-earth-600 dark:text-sand-400 hover:bg-sand-300 dark:hover:bg-earth-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                {index + 1}. {lesson.title}
              </button>
            )
          })}
          {hasQuiz && (
            <button
              onClick={() => setShowQuiz(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap bg-ocean-100 dark:bg-ocean-900 text-ocean-700 dark:text-ocean-300 hover:bg-ocean-200 dark:hover:bg-ocean-800 transition-all"
            >
              <Trophy className="w-4 h-4" />
              Quiz
            </button>
          )}
        </div>

        {/* Lesson Content */}
        <Card className="border-2 border-sand-300 dark:border-earth-600 mb-6">
          <CardContent className="p-8">
            <h2 className="text-2xl font-black text-earth-900 dark:text-sand-100 mb-6">
              {currentLesson.title}
            </h2>

            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentTab === 0}
            className="font-bold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={goToNext}
            className="font-bold"
          >
            {currentTab === totalLessons - 1 ? (
              hasQuiz ? 'Take Quiz' : 'Complete Module'
            ) : (
              'Next'
            )}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
