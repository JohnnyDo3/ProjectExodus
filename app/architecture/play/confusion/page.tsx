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
    <div className="min-h-screen lg:h-screen bg-[var(--background)] flex flex-col lg:overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] sticky top-0 z-10 flex-shrink-0">
        <div className="container mx-auto" style={{ padding: 'clamp(0.5rem, 1vh, 1rem)' }}>
          <div
            className="flex items-center justify-between flex-wrap"
            style={{ gap: 'clamp(0.5rem, 1vw, 1rem)' }}
          >
            <div
              className="flex items-center"
              style={{ gap: 'clamp(0.5rem, 1vw, 1rem)' }}
            >
              <Link href="/architecture/play">
                <Button
                  variant="ghost"
                  size="sm"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    padding: 'clamp(0.25rem, 0.5vh, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)'
                  }}
                >
                  <ArrowLeft style={{ width: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(0.75rem, 1.5vw, 1rem)', marginRight: 'clamp(0.25rem, 0.5vw, 0.5rem)' }} />
                  Back
                </Button>
              </Link>
              <div>
                <h1
                  className="font-bold text-[var(--foreground)] flex items-center"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    gap: 'clamp(0.25rem, 0.5vw, 0.5rem)'
                  }}
                >
                  <Brain
                    className="text-purple-500"
                    style={{
                      width: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                      height: 'clamp(1.25rem, 2.5vw, 1.5rem)'
                    }}
                  />
                  Confusion Buster
                </h1>
                <p
                  className="text-[var(--muted-foreground)]"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                >
                  Master commonly confused pairs
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="text-right">
              <p
                className="font-semibold text-[var(--foreground)]"
                style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
              >
                Set {currentSetIndex + 1} of {allSets.length}
              </p>
              <p
                className="text-[var(--muted-foreground)]"
                style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.75rem)' }}
              >
                {currentSet.difficulty} • {currentSet.category}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto max-w-7xl lg:flex-1 lg:overflow-y-auto lg:min-h-0"
        style={{
          padding: 'clamp(0.75rem, 2vh, 1.5rem)',
          paddingBottom: 'clamp(2rem, 5vh, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.75rem, 1.5vh, 1.5rem)'
        }}
      >
        {/* Mode Toggle */}
        <div className="flex justify-center" style={{ gap: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
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
            <div
              className="flex justify-between items-center flex-wrap"
              style={{
                marginTop: 'clamp(1rem, 2vh, 2rem)',
                gap: 'clamp(0.5rem, 1vw, 0.75rem)'
              }}
            >
              <Button
                variant="outline"
                onClick={() => setCurrentSetIndex(Math.max(0, currentSetIndex - 1))}
                disabled={currentSetIndex === 0}
                style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                }}
              >
                ← Previous Pair
              </Button>

              <Button
                onClick={() => setMode('quiz')}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                }}
              >
                Test Your Knowledge →
              </Button>

              <Button
                variant="outline"
                onClick={handleNextSet}
                disabled={currentSetIndex === allSets.length - 1}
                style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                }}
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
            <div style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1.5rem)' }}>
              <div
                className="flex justify-between text-[var(--muted-foreground)]"
                style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)'
                }}
              >
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span>{correctCount} correct</span>
              </div>
              <div
                className="bg-[var(--muted)] rounded-full overflow-hidden"
                style={{ height: 'clamp(0.375rem, 0.8vh, 0.5rem)' }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Show comparison reference */}
            <div
              className="border-2 border-purple-500/30 bg-purple-500/5 rounded-lg"
              style={{ marginBottom: 'clamp(0.75rem, 1.5vh, 1.5rem)' }}
            >
              <div style={{ padding: 'clamp(0.5rem, 1vh, 1rem) clamp(0.75rem, 2vh, 1.5rem) 0' }}>
                <p
                  className="text-[var(--muted-foreground)] text-center"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    marginBottom: 'clamp(0.5rem, 1vh, 1rem)'
                  }}
                >
                  💡 Reference the comparison below to answer
                </p>
              </div>
              <ArchitectureComparison comparisonSet={currentSet} mode="study" />
            </div>

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
              <CardContent
                className="text-center"
                style={{ padding: 'clamp(1rem, 3vh, 2rem)' }}
              >
                <Trophy
                  className="mx-auto text-amber-500"
                  style={{
                    width: 'clamp(2.5rem, 6vw, 4rem)',
                    height: 'clamp(2.5rem, 6vw, 4rem)',
                    marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
                  }}
                />
                <h2
                  className="font-bold"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                    marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)'
                  }}
                >
                  Quiz Complete!
                </h2>
                <p
                  className="font-bold text-purple-500"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    marginBottom: 'clamp(0.75rem, 1.5vh, 1rem)'
                  }}
                >
                  {scorePercent}%
                </p>
                <p
                  className="text-[var(--muted-foreground)]"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                    marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
                  }}
                >
                  You got {correctCount} out of {totalQuestions} correct
                </p>

                {scorePercent >= 80 && (
                  <div
                    className="bg-green-500/10 border border-green-500/30 rounded-lg"
                    style={{
                      padding: 'clamp(0.75rem, 1.5vh, 1rem)',
                      marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
                    }}
                  >
                    <CheckCircle2
                      className="mx-auto text-green-500"
                      style={{
                        width: 'clamp(1.5rem, 3vw, 2rem)',
                        height: 'clamp(1.5rem, 3vw, 2rem)',
                        marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)'
                      }}
                    />
                    <p
                      className="font-semibold text-green-600 dark:text-green-400"
                      style={{ fontSize: 'clamp(0.875rem, 1.75vw, 1rem)' }}
                    >
                      Excellent! You've mastered this comparison!
                    </p>
                  </div>
                )}

                {scorePercent < 80 && (
                  <div
                    className="bg-amber-500/10 border border-amber-500/30 rounded-lg"
                    style={{
                      padding: 'clamp(0.75rem, 1.5vh, 1rem)',
                      marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
                    }}
                  >
                    <XCircle
                      className="mx-auto text-amber-500"
                      style={{
                        width: 'clamp(1.5rem, 3vw, 2rem)',
                        height: 'clamp(1.5rem, 3vw, 2rem)',
                        marginBottom: 'clamp(0.25rem, 0.5vh, 0.5rem)'
                      }}
                    />
                    <p
                      className="font-semibold text-amber-600 dark:text-amber-400"
                      style={{ fontSize: 'clamp(0.875rem, 1.75vw, 1rem)' }}
                    >
                      Review the comparison and try again!
                    </p>
                  </div>
                )}

                <div
                  className="flex justify-center flex-wrap"
                  style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}
                >
                  <Button
                    variant="outline"
                    onClick={handleRetakeQuiz}
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                    }}
                  >
                    <RefreshCw style={{ width: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(0.75rem, 1.5vw, 1rem)', marginRight: 'clamp(0.25rem, 0.5vw, 0.5rem)' }} />
                    Retake Quiz
                  </Button>

                  {currentSetIndex < allSets.length - 1 && (
                    <Button
                      onClick={handleNextSet}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                      style={{
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                      }}
                    >
                      Next Confusion Pair
                      <ChevronRight style={{ width: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(0.75rem, 1.5vw, 1rem)', marginLeft: 'clamp(0.25rem, 0.5vw, 0.5rem)' }} />
                    </Button>
                  )}

                  {currentSetIndex === allSets.length - 1 && (
                    <Link href="/architecture/play">
                      <Button
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                        style={{
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                          padding: 'clamp(0.375rem, 1vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)'
                        }}
                      >
                        <Trophy style={{ width: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(0.75rem, 1.5vw, 1rem)', marginRight: 'clamp(0.25rem, 0.5vw, 0.5rem)' }} />
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
      <CardContent style={{ padding: 'clamp(0.75rem, 2vh, 1.5rem)' }}>
        <h3
          className="font-bold text-[var(--foreground)]"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)'
          }}
        >
          {question.question}
        </h3>

        <div style={{ display: 'grid', gap: 'clamp(0.5rem, 1vh, 0.75rem)' }}>
          {question.answers.map((answer) => {
            const isSelected = selectedAnswer === answer
            const isWrong = answered && isSelected && !isCorrect
            const isRight = answered && answer === question.correctAnswer

            return (
              <button
                key={answer}
                onClick={() => handleSelect(answer)}
                disabled={answered}
                className={`rounded-lg border-2 text-left font-semibold transition-all ${
                  isRight
                    ? 'border-green-500 bg-green-500/10 text-green-600 dark:text-green-400'
                    : isWrong
                    ? 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
                    : isSelected
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-[var(--border)] hover:border-purple-500/50'
                } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                style={{
                  padding: 'clamp(0.75rem, 1.5vh, 1rem)',
                  fontSize: 'clamp(0.875rem, 1.75vw, 1rem)'
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{answer}</span>
                  {isRight && <CheckCircle2 style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />}
                  {isWrong && <XCircle style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />}
                </div>
              </button>
            )
          })}
        </div>

        {answered && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-500/10 border border-purple-500/30 rounded-lg"
            style={{
              marginTop: 'clamp(0.75rem, 1.5vh, 1rem)',
              padding: 'clamp(0.75rem, 1.5vh, 1rem)'
            }}
          >
            <p
              className="font-semibold text-purple-600 dark:text-purple-400"
              style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
            >
              💡 Tip: Look at the "{question.featureHighlight}" row in the comparison table above!
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
