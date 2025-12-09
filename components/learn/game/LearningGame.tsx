'use client'

import { useState, useEffect, useCallback } from 'react'
import { LearningGameConfig, GameState, GameResults, GameRound } from '@/types/learning'
import { cn } from '@/lib/utils/cn'
import { GameHeader } from './GameHeader'
import { GameQuestion } from './GameQuestion'
import { GameResults as GameResultsDisplay } from './GameResults'

interface LearningGameProps {
  config: LearningGameConfig
  progressId: string
  onComplete: (results: GameResults) => void
  onClose: () => void
}

export function LearningGame({
  config,
  progressId,
  onComplete,
  onClose
}: LearningGameProps) {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean
    explanation: string
    correctAnswer: string | string[]
    pointsEarned: number
  } | null>(null)
  const [results, setResults] = useState<GameResults | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  // Start game session
  useEffect(() => {
    startGame()
  }, [])

  const startGame = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/learning/${progressId}/game`, {
        method: 'POST'
      })

      if (!response.ok) throw new Error('Failed to start game')

      const data = await response.json()
      setSessionId(data.data.sessionId)
      setGameState(data.data.initialState)
      setCurrentRound(config.rounds[0])
      setIsLoading(false)

      // Start countdown
      if (config.rounds[0]?.timeLimit) {
        setCountdown(config.rounds[0].timeLimit)
      }
    } catch (error) {
      console.error('Error starting game:', error)
      setIsLoading(false)
    }
  }

  // Countdown timer
  useEffect(() => {
    if (countdown === null || countdown <= 0 || feedback) return

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, feedback])

  // Auto-submit when time runs out
  useEffect(() => {
    if (countdown === 0 && !feedback && currentRound) {
      handleAnswer('') // Submit empty answer
    }
  }, [countdown])

  const handleAnswer = async (answer: string | string[]) => {
    if (!sessionId || !currentRound || !gameState || isSubmitting) return

    setIsSubmitting(true)
    const timeTaken = currentRound.timeLimit
      ? currentRound.timeLimit - (countdown || 0)
      : 0

    try {
      const response = await fetch(`/api/learning/${progressId}/game/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          roundId: currentRound.id,
          answer,
          timeTaken
        })
      })

      if (!response.ok) throw new Error('Failed to submit answer')

      const data = await response.json()

      // Show feedback
      setFeedback({
        isCorrect: data.data.isCorrect,
        explanation: data.data.explanation,
        correctAnswer: data.data.correctAnswer,
        pointsEarned: data.data.pointsEarned
      })

      // Update game state
      setGameState(data.data.newState)

      // Check if game is over
      if (data.data.isGameOver) {
        setTimeout(() => {
          setResults(data.data.results)
          onComplete(data.data.results)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNextRound = () => {
    if (!gameState) return

    setFeedback(null)
    const nextRoundIndex = gameState.currentRound
    const nextRound = config.rounds[nextRoundIndex]

    if (nextRound) {
      setCurrentRound(nextRound)
      if (nextRound.timeLimit) {
        setCountdown(nextRound.timeLimit)
      } else {
        setCountdown(null)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Starting Game...</h3>
          <p className="text-gray-500">{config.title}</p>
        </div>
      </div>
    )
  }

  if (results) {
    return (
      <GameResultsDisplay
        results={results}
        config={config}
        onClose={onClose}
        onRetry={startGame}
      />
    )
  }

  if (!gameState || !currentRound) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <GameHeader
          lives={gameState.lives}
          maxLives={gameState.maxLives}
          score={gameState.score}
          streak={gameState.streak}
          currentRound={gameState.currentRound}
          totalRounds={gameState.totalRounds}
          countdown={countdown}
          onClose={onClose}
        />

        {/* Question */}
        <div className="flex-1 overflow-y-auto p-6">
          <GameQuestion
            round={currentRound}
            onAnswer={handleAnswer}
            feedback={feedback}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Feedback overlay */}
        {feedback && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className={cn(
              'p-4 rounded-lg mb-4',
              feedback.isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            )}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{feedback.isCorrect ? '✅' : '❌'}</span>
                <span className="font-semibold">
                  {feedback.isCorrect ? 'Correct!' : 'Not quite...'}
                </span>
                {feedback.pointsEarned > 0 && (
                  <span className="ml-auto text-green-600 dark:text-green-400 font-bold">
                    +{feedback.pointsEarned} pts
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feedback.explanation}
              </p>
            </div>
            <button
              onClick={handleNextRound}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {gameState.currentRound >= config.totalRounds ? 'See Results' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
