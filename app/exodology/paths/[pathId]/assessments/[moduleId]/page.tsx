'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Award, CheckCircle2, XCircle,
  Clock, Lock, ChevronRight, Trophy, Loader2, RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import { notFound, useParams, useRouter } from 'next/navigation'
import { moduleAssessments } from '@/data/exodology-curriculum'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface AssessmentQuestion {
  id: string
  question: string
  options: Array<{
    id: string
    text: string
    isCorrect: boolean
  }>
  explanation: string
}

interface Assessment {
  id: string
  title: string
  description: string
  passingScore: number
  questions: AssessmentQuestion[]
}

// ============================================================================
// PATH DATA
// ============================================================================

const pathMeta = {
  foundations: {
    title: 'Foundations of Exodology',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600'
  },
  applied: {
    title: 'Applied Exodology',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600'
  },
  strategic: {
    title: 'Strategic Exodology',
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600'
  }
}

// ============================================================================
// ASSESSMENT COMPONENT
// ============================================================================

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()

  const pathId = params.pathId as string
  const moduleId = params.moduleId as string

  // Assessment state
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [saving, setSaving] = useState(false)

  const meta = pathMeta[pathId as keyof typeof pathMeta]

  // Get assessment data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assessmentData: Assessment | undefined = (moduleAssessments as any)?.[moduleId]

  if (!meta) {
    notFound()
  }

  // Show sign-in prompt for unauthenticated users
  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <header className={`py-6 bg-gradient-to-r ${meta.gradient} text-white`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href={`/exodology/paths/${pathId}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {meta.title}
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20">
                    LOCKED
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black">Module Assessment</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-4 border-[var(--primary)]/30 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${meta.gradient}`} />
              <CardContent className="p-8 sm:p-12 text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center"
                >
                  <Lock className="w-10 h-10 text-[var(--primary)]" />
                </motion.div>

                <h2 className="text-3xl font-black text-[var(--foreground)] mb-4">
                  Sign In to Take Assessment
                </h2>
                <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
                  Create a free account to take assessments, track your progress, and earn certifications.
                </p>

                <div className="space-y-4">
                  <Link href="/auth/signin">
                    <Button className={`w-full font-bold text-lg py-6 bg-gradient-to-r ${meta.gradient}`}>
                      Sign In to Continue <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>

                  <p className="text-sm text-[var(--muted-foreground)]">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-[var(--primary)] font-bold hover:underline">
                      Register for free
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // If no assessment data, show placeholder
  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <header className={`py-6 bg-gradient-to-r ${meta.gradient} text-white`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href={`/exodology/paths/${pathId}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {meta.title}
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20">
                    ASSESSMENT
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black">Module Assessment</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-2 border-[var(--border)]">
              <CardContent className="p-12">
                <Award className={`w-16 h-16 text-${meta.color}-500 mx-auto mb-4`} />
                <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
                  Assessment Coming Soon
                </h2>
                <p className="text-[var(--muted-foreground)] mb-6">
                  This module assessment is being prepared. Complete all lessons in the module first, then return to take the assessment.
                </p>
                <Link href={`/exodology/paths/${pathId}`}>
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Return to Path
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  const questions = assessmentData.questions
  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isLastQuestion = currentQuestion === questions.length - 1

  const handleAnswer = (optionId: string) => {
    if (showResults) return
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionId }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Calculate score
    let correct = 0
    questions.forEach(q => {
      const selectedOption = q.options.find(o => o.id === answers[q.id])
      if (selectedOption?.isCorrect) {
        correct++
      }
    })

    const finalScore = Math.round((correct / questions.length) * 100)
    setScore(finalScore)
    setShowResults(true)

    // Save to API
    setSaving(true)
    try {
      await fetch('/api/exodology/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pathId,
          lessonId: `${moduleId}-assessment`,
          status: finalScore >= assessmentData.passingScore ? 'COMPLETED' : 'IN_PROGRESS',
          completionData: {
            score: finalScore,
            answers,
            passed: finalScore >= assessmentData.passingScore
          }
        })
      })
    } catch (error) {
      console.error('Error saving assessment:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
  }

  // Results view
  if (showResults) {
    const passed = score >= assessmentData.passingScore

    return (
      <div className="min-h-screen bg-[var(--background)]">
        <header className={`py-6 bg-gradient-to-r ${passed ? 'from-green-500 to-emerald-600' : meta.gradient} text-white`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href={`/exodology/paths/${pathId}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {meta.title}
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  {passed ? <Trophy className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20">
                    {passed ? 'PASSED' : 'TRY AGAIN'}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black">{assessmentData.title}</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Card className={`border-4 ${passed ? 'border-green-500/30' : 'border-amber-500/30'} overflow-hidden`}>
                <div className={`h-2 bg-gradient-to-r ${passed ? 'from-green-500 to-emerald-500' : 'from-amber-500 to-orange-500'}`} />
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    passed ? 'bg-green-500/20' : 'bg-amber-500/20'
                  }`}>
                    {passed ? (
                      <Trophy className="w-12 h-12 text-green-500" />
                    ) : (
                      <RefreshCw className="w-12 h-12 text-amber-500" />
                    )}
                  </div>

                  <h2 className="text-4xl font-black text-[var(--foreground)] mb-2">
                    {score}%
                  </h2>
                  <p className="text-lg text-[var(--muted-foreground)] mb-2">
                    {passed ? 'Congratulations! You passed!' : `You need ${assessmentData.passingScore}% to pass`}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] mb-8">
                    {questions.filter(q => q.options.find(o => o.id === answers[q.id])?.isCorrect).length} of {questions.length} correct
                  </p>

                  <div className="flex gap-4 justify-center">
                    {!passed && (
                      <Button onClick={handleRetry} variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                    )}
                    <Link href={`/exodology/paths/${pathId}`}>
                      <Button className={`bg-gradient-to-r ${passed ? 'from-green-500 to-emerald-500' : meta.gradient}`}>
                        {passed ? 'Continue Learning' : 'Review Module'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Review Answers */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-black text-[var(--foreground)]">Review Answers</h3>
              {questions.map((q, i) => {
                const selectedOption = q.options.find(o => o.id === answers[q.id])
                const isCorrect = selectedOption?.isCorrect

                return (
                  <Card key={q.id} className="border-2 border-[var(--border)]">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[var(--foreground)] mb-2">
                            {i + 1}. {q.question}
                          </p>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            <strong>Your answer:</strong> {selectedOption?.text || 'Not answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 mt-1">
                              <strong>Correct:</strong> {q.options.find(o => o.isCorrect)?.text}
                            </p>
                          )}
                          <p className="text-sm text-[var(--muted-foreground)] mt-2 p-2 bg-[var(--muted)]/30 rounded">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Question view
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className={`py-6 bg-gradient-to-r ${meta.gradient} text-white`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/exodology/paths/${pathId}`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {meta.title}
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20">
                    ASSESSMENT
                  </span>
                  <span className="flex items-center gap-1 text-sm opacity-80">
                    <Clock className="w-4 h-4" />
                    {questions.length} questions
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black">{assessmentData.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--muted-foreground)]">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="font-bold text-[var(--foreground)]">{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${meta.gradient}`}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
                    {currentQ.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQ.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(option.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          answers[currentQ.id] === option.id
                            ? `bg-[var(--primary)]/20 border-[var(--primary)]`
                            : 'bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            answers[currentQ.id] === option.id
                              ? 'border-[var(--primary)] bg-[var(--primary)]'
                              : 'border-[var(--muted-foreground)]'
                          }`}>
                            {answers[currentQ.id] === option.id && (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="font-medium text-[var(--foreground)]">{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                className={`bg-gradient-to-r ${meta.gradient}`}
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < questions.length || saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Assessment
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Question dots */}
          <div className="flex justify-center gap-2 mt-8">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentQuestion
                    ? `bg-gradient-to-r ${meta.gradient} scale-125`
                    : answers[q.id]
                    ? 'bg-[var(--primary)]/50'
                    : 'bg-[var(--muted)]'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
