'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { CheckCircle, XCircle, RotateCcw, ArrowLeft } from 'lucide-react'

interface QuizQuestion {
  question: string
  type: 'multiple_choice' | 'true_false'
  options: string[]
  correctAnswer: string
}

interface QuizComponentProps {
  questions: QuizQuestion[]
  progressId: string
  onComplete: () => void
  onBackToModule: () => void
  attempts: number
}

export function QuizComponent({
  questions,
  progressId,
  onComplete,
  onBackToModule,
  attempts,
}: QuizComponentProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizResult, setQuizResult] = useState<any>(null)

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[questionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (userAnswers.some((answer) => !answer)) {
      alert('Please answer all questions before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/learning/${progressId}/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: userAnswers }),
      })

      const data = await response.json()

      if (data.success) {
        setQuizResult(data.data)

        // If perfect score, call onComplete
        if (data.data.isPerfectScore) {
          setTimeout(() => {
            onComplete()
          }, 3000) // 3 second delay to show success message
        }
      } else {
        alert(data.error || 'Failed to submit quiz')
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
      alert('An error occurred while submitting the quiz')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetake = () => {
    setUserAnswers(new Array(questions.length).fill(''))
    setQuizResult(null)
  }

  // If quiz has been submitted, show results
  if (quizResult) {
    const { score, totalQuestions, isPerfectScore, results } = quizResult

    return (
      <div className="space-y-6">
        {/* Result Header */}
        <Card
          className={`border-4 ${
            isPerfectScore
              ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950'
              : 'border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950'
          }`}
        >
          <CardContent className="p-8 text-center">
            {isPerfectScore ? (
              <>
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-4xl font-black text-green-600 dark:text-green-400 mb-2">
                  🎉 PERFECT SCORE!
                </h2>
                <p className="text-xl font-bold text-[var(--foreground)] mb-4">
                  {score}/{totalQuestions} Correct
                </p>
                <p className="text-lg font-semibold text-theme-muted">
                  Module Completed! Well done!
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
                <h2 className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-2">
                  TRY AGAIN
                </h2>
                <p className="text-xl font-bold text-[var(--foreground)] mb-4">
                  {score}/{totalQuestions} Correct
                </p>
                <p className="text-lg font-semibold text-theme-muted mb-2">
                  You need a perfect score (5/5) to complete this module
                </p>
                <p className="text-sm font-medium text-theme-muted">
                  Attempt #{quizResult.attempts}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
          {results.map((result: any, index: number) => (
            <Card
              key={index}
              className={`border-2 ${
                result.isCorrect ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {result.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-[var(--foreground)] mb-2">
                      Question {index + 1}: {result.question}
                    </p>
                    <p className="text-sm font-semibold text-theme-muted">
                      Your answer:{' '}
                      <span
                        className={result.isCorrect ? 'text-green-600' : 'text-red-600'}
                      >
                        {result.userAnswer}
                      </span>
                    </p>
                    {!result.isCorrect && (
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                        Correct answer: {result.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        {!isPerfectScore && (
          <div className="flex gap-3">
            <Button
              onClick={onBackToModule}
              variant="outline"
              className="flex-1 font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Review Module
            </Button>
            <Button onClick={handleRetake} className="flex-1 font-bold">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Quiz form
  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card className="border-4 border-theme-primary">
        <CardContent className="p-6">
          <h2 className="text-2xl font-black text-theme-primary mb-2">MODULE QUIZ</h2>
          <p className="text-sm font-semibold text-theme-muted mb-1">
            Answer all {questions.length} questions to complete this module
          </p>
          <p className="text-xs font-bold text-orange-600 dark:text-orange-400">
            ⚠️ You need a perfect score ({questions.length}/{questions.length}) to pass
          </p>
          {attempts > 0 && (
            <p className="text-xs font-medium text-theme-muted mt-2">
              Previous attempts: {attempts}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Questions - Scrollable */}
      <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
        {questions.map((question, index) => (
          <Card key={index} className="border-2 border-theme-primary">
            <CardContent className="p-5">
              <h3 className="text-base font-black text-[var(--foreground)] mb-4">
                {index + 1}. {question.question}
              </h3>

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      userAnswers[index] === option
                        ? 'border-theme-primary bg-[var(--primary)]/10'
                        : 'border-[var(--border)] hover:border-theme-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={userAnswers[index] === option}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="w-4 h-4 text-theme-primary"
                    />
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || userAnswers.some((a) => !a)}
        className="w-full py-4 text-lg font-black"
      >
        {isSubmitting ? 'SUBMITTING...' : 'SUBMIT QUIZ'}
      </Button>
    </div>
  )
}
