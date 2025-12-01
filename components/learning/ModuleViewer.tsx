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
      <div className="min-h-screen bg-[var(--background)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/learn" className="inline-flex items-center gap-2 text-theme-primary font-bold mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>

          <Card className="border-4 border-theme-primary overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary font-bold text-sm mb-6">
                {module.category}
              </div>

              <h1 className="text-4xl font-black text-[var(--foreground)] mb-4">
                {module.title}
              </h1>

              <p className="text-lg text-theme-muted mb-8 max-w-2xl mx-auto">
                {module.description}
              </p>

              <div className="flex items-center justify-center gap-8 mb-10 text-theme-muted">
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
      <div className="min-h-screen bg-[var(--background)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-4 border-theme-accent overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]" />
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Trophy className="w-16 h-16 text-theme-accent mx-auto mb-4" />
                <h2 className="text-3xl font-black text-[var(--foreground)] mb-2">
                  {quizSubmitted ? 'Quiz Complete!' : 'Knowledge Check'}
                </h2>
                {quizSubmitted && quizScore !== null && (
                  <div className={`text-5xl font-black ${quizScore >= module.quiz.passingScore ? 'text-theme-primary' : 'text-theme-secondary'}`}>
                    {quizScore}%
                  </div>
                )}
                {quizSubmitted && (
                  <p className={`text-lg font-bold mt-2 ${quizScore && quizScore >= module.quiz.passingScore ? 'text-theme-primary' : 'text-theme-secondary'}`}>
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
                    <div key={question.id} className="p-6 bg-[var(--card)] rounded-xl border-2 border-[var(--border)]">
                      <p className="text-lg font-bold text-[var(--foreground)] mb-4">
                        {qIndex + 1}. {question.question}
                      </p>

                      <div className="space-y-3">
                        {question.options.map((option) => {
                          const isSelected = selectedAnswer === option.id
                          const showResult = quizSubmitted

                          let optionClass = 'border-[var(--border)] hover:border-[var(--primary)]'
                          if (showResult) {
                            if (option.isCorrect) {
                              optionClass = 'border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))]'
                            } else if (isSelected && !option.isCorrect) {
                              optionClass = 'border-[var(--secondary)] bg-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]'
                            }
                          } else if (isSelected) {
                            optionClass = 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_15%,var(--background))]'
                          }

                          return (
                            <button
                              key={option.id}
                              onClick={() => !quizSubmitted && handleQuizAnswer(question.id, option.id)}
                              disabled={quizSubmitted}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${optionClass}`}
                            >
                              <span className="font-medium text-[var(--foreground)]">
                                {option.text}
                              </span>
                              {showResult && option.isCorrect && (
                                <CheckCircle2 className="inline-block w-5 h-5 text-theme-primary ml-2" />
                              )}
                            </button>
                          )
                        })}
                      </div>

                      {quizSubmitted && question.explanation && (
                        <div className="mt-4 p-4 bg-[color-mix(in_srgb,var(--accent)_15%,var(--background))] rounded-lg border border-[var(--accent)]">
                          <p className="text-sm font-medium text-[var(--foreground)]">
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

  // Check if module is completed (all lessons done + quiz passed if applicable)
  const allLessonsComplete = completedLessons.size === totalLessons
  const quizPassed = quizSubmitted && quizScore !== null && module.quiz && quizScore >= module.quiz.passingScore
  const moduleComplete = hasQuiz ? (allLessonsComplete && quizPassed) : allLessonsComplete

  // Lesson viewer
  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/learn" className="inline-flex items-center gap-2 text-theme-primary font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-theme-muted">
              {progressPercent}% Complete
            </span>
            <div className="w-32 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Module Title */}
        <div className="mb-3">
          <span className="text-sm font-bold text-theme-primary">{module.category}</span>
          <h1 className="text-2xl font-black text-[var(--foreground)]">{module.title}</h1>
        </div>

        {/* Tab Navigation - Compact */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.has(lesson.id)
            const isCurrent = index === currentTab

            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentTab(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : isCompleted
                    ? 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary'
                    : 'bg-[var(--muted)] text-theme-muted hover:bg-[color-mix(in_srgb,var(--primary)_10%,var(--muted))]'
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                quizPassed
                  ? 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent'
                  : 'bg-[color-mix(in_srgb,var(--accent)_15%,var(--background))] text-theme-accent hover:bg-[color-mix(in_srgb,var(--accent)_25%,var(--background))]'
              }`}
            >
              {quizPassed ? <CheckCircle2 className="w-4 h-4" /> : <Trophy className="w-4 h-4" />}
              Quiz
            </button>
          )}
        </div>

        {/* Lesson Content */}
        <Card className="border-2 border-[var(--border)] mb-4">
          <CardContent className="p-8">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6">
              {currentLesson.title}
            </h2>

            <div
              className="prose prose-lg max-w-none text-[var(--foreground)]
                         prose-headings:text-[var(--foreground)]
                         prose-p:text-[var(--foreground)]
                         prose-li:text-[var(--foreground)]
                         prose-strong:text-[var(--foreground)]
                         prose-a:text-theme-primary prose-a:font-semibold
                         prose-blockquote:border-[var(--primary)] prose-blockquote:text-theme-muted"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />
          </CardContent>
        </Card>

        {/* Navigation with Completion Text */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentTab === 0}
            className="font-bold"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {/* Engraved completion text - centered */}
          <p className="text-sm font-medium text-theme-muted opacity-70 text-center px-4" style={{
            textShadow: '0 1px 0 rgba(255,255,255,0.1)',
            letterSpacing: '0.02em'
          }}>
            {moduleComplete
              ? 'Module complete! You can revisit this material anytime.'
              : 'Complete the quiz to finish this module at 100%.'
            }
          </p>

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
