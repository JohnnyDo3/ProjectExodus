'use client'

import { useState } from 'react'
import { GameRound } from '@/types/learning'
import { cn } from '@/lib/utils'

interface GameQuestionProps {
  round: GameRound
  onAnswer: (answer: string | string[]) => void
  feedback: {
    isCorrect: boolean
    correctAnswer: string | string[]
  } | null
  isSubmitting: boolean
}

export function GameQuestion({
  round,
  onAnswer,
  feedback,
  isSubmitting
}: GameQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null)
  const [inputAnswer, setInputAnswer] = useState('')

  const handleSelect = (option: string) => {
    if (feedback || isSubmitting) return

    if (round.type === 'multiple_choice' || round.type === 'true_false' || round.type === 'image_choice') {
      setSelectedAnswer(option)
      onAnswer(option)
    }
  }

  const handleSubmitInput = () => {
    if (feedback || isSubmitting || !inputAnswer.trim()) return
    onAnswer(inputAnswer.trim())
  }

  const getOptionStyle = (option: string) => {
    const isSelected = selectedAnswer === option
    const isCorrect = feedback && (
      Array.isArray(feedback.correctAnswer)
        ? feedback.correctAnswer.includes(option)
        : feedback.correctAnswer === option
    )
    const isWrong = feedback && isSelected && !isCorrect

    return cn(
      'w-full p-4 rounded-xl border-2 text-left transition-all',
      !feedback && !isSubmitting && 'hover:border-primary hover:bg-primary/5 cursor-pointer',
      isSelected && !feedback && 'border-primary bg-primary/10',
      isCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/20',
      isWrong && 'border-red-500 bg-red-50 dark:bg-red-900/20',
      !isSelected && !isCorrect && feedback && 'opacity-50',
      (feedback || isSubmitting) && 'cursor-not-allowed'
    )
  }

  return (
    <div className="space-y-6">
      {/* Media */}
      {round.media && (
        <div className="flex justify-center">
          {round.media.type === 'image' && (
            <img
              src={round.media.url}
              alt={round.media.alt || 'Question image'}
              className="max-h-48 rounded-lg"
            />
          )}
          {round.media.type === 'video' && (
            <video
              src={round.media.url}
              controls
              className="max-h-48 rounded-lg"
            />
          )}
        </div>
      )}

      {/* Question */}
      <h3 className="text-xl font-semibold text-center">
        {round.question}
      </h3>

      {/* Answer options based on type */}
      {(round.type === 'multiple_choice' || round.type === 'image_choice') && round.options && (
        <div className="grid gap-3">
          {round.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={!!feedback || isSubmitting}
              className={getOptionStyle(option)}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 font-semibold text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {feedback && (
                  Array.isArray(feedback.correctAnswer)
                    ? feedback.correctAnswer.includes(option)
                    : feedback.correctAnswer === option
                ) && (
                  <span className="text-green-500">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {round.type === 'true_false' && (
        <div className="grid grid-cols-2 gap-4">
          {['True', 'False'].map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!feedback || isSubmitting}
              className={cn(
                getOptionStyle(option),
                'text-center py-6 text-lg font-semibold'
              )}
            >
              <span className="text-3xl mb-2 block">
                {option === 'True' ? '✓' : '✗'}
              </span>
              {option}
            </button>
          ))}
        </div>
      )}

      {round.type === 'fill_blank' && (
        <div className="space-y-4">
          <input
            type="text"
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitInput()}
            disabled={!!feedback || isSubmitting}
            placeholder="Type your answer..."
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 text-lg',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              feedback
                ? feedback.isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-300 dark:border-gray-600'
            )}
          />
          {!feedback && (
            <button
              onClick={handleSubmitInput}
              disabled={!inputAnswer.trim() || isSubmitting}
              className={cn(
                'w-full py-3 rounded-xl font-semibold transition-colors',
                inputAnswer.trim()
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              )}
            >
              {isSubmitting ? 'Checking...' : 'Submit Answer'}
            </button>
          )}
          {feedback && !feedback.isCorrect && (
            <p className="text-center text-sm text-gray-500">
              Correct answer: <span className="font-semibold text-green-600">{feedback.correctAnswer}</span>
            </p>
          )}
        </div>
      )}

      {/* Loading indicator */}
      {isSubmitting && (
        <div className="flex justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  )
}
