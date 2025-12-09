'use client'

import { useEffect, useState } from 'react'
import { GameResults as GameResultsType, LearningGameConfig } from '@/types/learning'
import { cn } from '@/lib/utils'

interface GameResultsProps {
  results: GameResultsType
  config: LearningGameConfig
  onClose: () => void
  onRetry: () => void
}

export function GameResults({
  results,
  config,
  onClose,
  onRetry
}: GameResultsProps) {
  const [showConfetti, setShowConfetti] = useState(results.passed)
  const [animatedScore, setAnimatedScore] = useState(0)

  // Animate score counting
  useEffect(() => {
    const duration = 1500
    const startTime = Date.now()
    const targetScore = results.finalScore

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // Ease out cubic

      setAnimatedScore(Math.floor(targetScore * eased))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [results.finalScore])

  // Hide confetti after a few seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  const renderStars = () => {
    return (
      <div className="flex justify-center gap-2 my-6">
        {[1, 2, 3].map((star) => (
          <div
            key={star}
            className={cn(
              'text-5xl transition-all duration-500',
              star <= results.stars
                ? 'animate-bounce text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            )}
            style={{ animationDelay: `${star * 0.2}s` }}
          >
            ⭐
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <span
                className="text-2xl"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                {['🎉', '✨', '🌟', '🎊', '💫'][Math.floor(Math.random() * 5)]}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className={cn(
          'px-6 py-8 text-center',
          results.passed
            ? 'bg-gradient-to-br from-green-400 to-emerald-500'
            : 'bg-gradient-to-br from-orange-400 to-amber-500'
        )}>
          <div className="text-6xl mb-4">
            {results.passed ? '🏆' : '💪'}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {results.passed ? 'Congratulations!' : 'Good Effort!'}
          </h2>
          <p className="text-white/80">
            {results.passed
              ? 'You passed the learning game!'
              : 'Keep practicing to pass the game'}
          </p>
        </div>

        {/* Stars */}
        {renderStars()}

        {/* Score */}
        <div className="px-6 pb-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-primary mb-1">
              {animatedScore}
            </div>
            <div className="text-gray-500">
              out of {results.maxPossibleScore} points
            </div>
            <div className={cn(
              'text-lg font-semibold mt-2',
              results.percentage >= 80 ? 'text-green-500' :
              results.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
            )}>
              {results.percentage}%
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-500">
                {results.correctAnswers}
              </div>
              <div className="text-xs text-gray-500">Correct</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">
                🔥 {results.longestStreak}
              </div>
              <div className="text-xs text-gray-500">Best Streak</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">
                {Math.floor(results.totalTimeTaken / 60)}:{(results.totalTimeTaken % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-500">Time</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {results.passed ? (
              <button
                onClick={onClose}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Continue Learning
              </button>
            ) : (
              <>
                <button
                  onClick={onRetry}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Review Content
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  )
}
