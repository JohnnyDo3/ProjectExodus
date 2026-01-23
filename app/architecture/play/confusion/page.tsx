'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowLeft, CheckCircle2, XCircle, Brain, Trophy, RefreshCw, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ArchitectureComparison from '@/components/architecture/comparison/ArchitectureComparison'
import {
  getAllComparisonSets,
  getComparisonSetById,
  type ComparisonSet,
} from '@/lib/architecture/comparisonSets'

type QuizQuestion = {
  id: string
  question: string
  answers: string[]
  correctAnswer: string
  featureHighlight?: string
}

export default function ConfusionBusterPage() {
  const allSets = getAllComparisonSets()
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [mode, setMode] = useState<'study' | 'quiz'>('study')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({})
  const [showResults, setShowResults] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const currentSet = allSets[currentSetIndex]
  const quizQuestions = generateQuizQuestions(currentSet)

  function generateQuizQuestions(set: ComparisonSet): QuizQuestion[] {
    const questions: QuizQuestion[] = []

    // Generate questions from features
    set.features.filter(f => f.highlighted).forEach((feature, index) => {
      const elementIds = set.elements.map(e => e.id)

      // Find which element has unique/distinguishing feature
      questions.push({
        id: `${set.id}-${index}`,
        question: `Which ${set.category.slice(0, -1)} has: "${feature.label.toLowerCase()}"?`,
        answers: set.elements.map(e => e.name),
        correctAnswer: set.elements[0].name, // Simplified - would need better logic
        featureHighlight: feature.label,
      })
    })

    return questions.slice(0, 5) // Limit to 5 questions per set
  }

  function handleQuizAnswer(questionId: string, isCorrect: boolean) {
    setQuizAnswers(prev => ({ ...prev, [questionId]: isCorrect }))

    // Auto-advance after brief delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setShowResults(true)
      }
    }, 1000)
  }

  function handleNextSet() {
    if (currentSetIndex < allSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1)
      setMode('study')
      setQuizAnswers({})
      setShowResults(false)
      setCurrentQuestionIndex(0)
    }
  }

  function handleRetakeQuiz() {
    setMode('quiz')
    setQuizAnswers({})
    setShowResults(false)
    setCurrentQuestionIndex(0)
  }

  const correctCount = Object.values(quizAnswers).filter(Boolean).length
  const totalQuestions = quizQuestions.length
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/architecture/play">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-500" />
                  Confusion Buster
                </h1>
                <p className="text-sm text-[var(--muted-foreground)]">Master commonly confused pairs</p>
              </div>
            </div>

            {/* Progress */}
            <div className="text-right">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Set {currentSetIndex + 1} of {allSets.length}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {currentSet.difficulty} • {currentSet.category}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Mode Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={mode === 'study' ? 'primary' : 'outline'}
            onClick={() => setMode('study')}
            className="flex-1 max-w-xs"
          >
            📖 Study Mode
          </Button>
          <Button
            variant={mode === 'quiz' ? 'primary' : 'outline'}
            onClick={() => setMode('quiz')}
            className="flex-1 max-w-xs"
            disabled={mode === 'quiz' && Object.keys(quizAnswers).length > 0}
          >
            🎯 Quiz Mode
          </Button>
        </div>

        {/* Study Mode */}
        {mode === 'study' && (
          <motion.div
            key="study"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ArchitectureComparison comparisonSet={currentSet} mode="study" />

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentSetIndex(Math.max(0, currentSetIndex - 1))}
                disabled={currentSetIndex === 0}
              >
                ← Previous Pair
              </Button>

              <Button
                onClick={() => setMode('quiz')}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
              >
                Test Your Knowledge →
              </Button>

              <Button
                variant="outline"
                onClick={handleNextSet}
                disabled={currentSetIndex === allSets.length - 1}
              >
                Next Pair →
              </Button>
            </div>
          </motion.div>
        )}

        {/* Quiz Mode */}
        {mode === 'quiz' && !showResults && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Quiz Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-[var(--muted-foreground)] mb-2">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span>{correctCount} correct</span>
              </div>
              <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Show comparison reference */}
            <Card className="mb-6 border-purple-500/30 bg-purple-500/5">
              <CardContent className="p-4">
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  💡 Reference the comparison above to answer:
                </p>
                <ArchitectureComparison comparisonSet={currentSet} mode="study" />
              </CardContent>
            </Card>

            {/* Current Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <QuizQuestion
                  question={quizQuestions[currentQuestionIndex]}
                  onAnswer={handleQuizAnswer}
                  answered={quizQuestions[currentQuestionIndex].id in quizAnswers}
                  isCorrect={quizAnswers[quizQuestions[currentQuestionIndex].id]}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Quiz Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-2 border-purple-500">
              <CardContent className="p-8 text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-amber-500" />
                <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-4xl font-bold text-purple-500 mb-4">{scorePercent}%</p>
                <p className="text-lg text-[var(--muted-foreground)] mb-6">
                  You got {correctCount} out of {totalQuestions} correct
                </p>

                {scorePercent >= 80 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      Excellent! You've mastered this comparison!
                    </p>
                  </div>
                )}

                {scorePercent < 80 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                    <XCircle className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                    <p className="font-semibold text-amber-600 dark:text-amber-400">
                      Review the comparison and try again!
                    </p>
                  </div>
                )}

                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={handleRetakeQuiz}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>

                  {currentSetIndex < allSets.length - 1 && (
                    <Button
                      onClick={handleNextSet}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                    >
                      Next Confusion Pair
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}

                  {currentSetIndex === allSets.length - 1 && (
                    <Link href="/architecture/play">
                      <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                        <Trophy className="w-4 h-4 mr-2" />
                        Complete!
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Quiz Question Component
function QuizQuestion({
  question,
  onAnswer,
  answered,
  isCorrect,
}: {
  question: QuizQuestion
  onAnswer: (id: string, isCorrect: boolean) => void
  answered: boolean
  isCorrect?: boolean
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  function handleSelect(answer: string) {
    if (answered) return
    setSelectedAnswer(answer)
    const correct = answer === question.correctAnswer
    onAnswer(question.id, correct)
  }

  return (
    <Card className="border-2 border-[var(--border)]">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6 text-[var(--foreground)]">
          {question.question}
        </h3>

        <div className="grid gap-3">
          {question.answers.map((answer) => {
            const isSelected = selectedAnswer === answer
            const isWrong = answered && isSelected && !isCorrect
            const isRight = answered && answer === question.correctAnswer

            return (
              <button
                key={answer}
                onClick={() => handleSelect(answer)}
                disabled={answered}
                className={`p-4 rounded-lg border-2 text-left font-semibold transition-all ${
                  isRight
                    ? 'border-green-500 bg-green-500/10 text-green-600 dark:text-green-400'
                    : isWrong
                    ? 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
                    : isSelected
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-[var(--border)] hover:border-purple-500/50'
                } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{answer}</span>
                  {isRight && <CheckCircle2 className="w-5 h-5" />}
                  {isWrong && <XCircle className="w-5 h-5" />}
                </div>
              </button>
            )
          })}
        </div>

        {answered && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg"
          >
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              💡 Tip: Look at the "{question.featureHighlight}" row in the comparison table above!
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
