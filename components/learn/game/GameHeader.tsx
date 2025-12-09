'use client'

import { cn } from '@/lib/utils/cn'

interface GameHeaderProps {
  lives: number
  maxLives: number
  score: number
  streak: number
  currentRound: number
  totalRounds: number
  countdown: number | null
  onClose: () => void
}

export function GameHeader({
  lives,
  maxLives,
  score,
  streak,
  currentRound,
  totalRounds,
  countdown,
  onClose
}: GameHeaderProps) {
  const progressPercentage = (currentRound / totalRounds) * 100

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Lives */}
          <div className="flex items-center gap-1">
            {Array.from({ length: maxLives }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'text-xl transition-all',
                  i < lives ? 'opacity-100 scale-100' : 'opacity-30 scale-90'
                )}
              >
                ❤️
              </span>
            ))}
          </div>

          {/* Score & Streak */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-xs text-gray-500">Points</div>
            </div>
            {streak > 1 && (
              <div className="text-center animate-pulse">
                <div className="text-xl font-bold text-orange-500 flex items-center gap-1">
                  🔥 {streak}
                </div>
                <div className="text-xs text-gray-500">Streak!</div>
              </div>
            )}
          </div>

          {/* Timer & Round */}
          <div className="flex items-center gap-4">
            {countdown !== null && (
              <div className={cn(
                'flex items-center gap-1 px-3 py-1 rounded-full',
                countdown <= 5
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse'
                  : 'bg-gray-100 dark:bg-gray-800'
              )}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-mono font-bold">{countdown}s</span>
              </div>
            )}
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {currentRound + 1}
              </span>
              /{totalRounds}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
