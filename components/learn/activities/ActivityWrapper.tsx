'use client'

import { useState, ReactNode } from 'react'
import { ActivityConfig, ACTIVITY_TYPES } from '@/types/learning'
import { cn } from '@/lib/utils'

interface ActivityWrapperProps {
  activity: ActivityConfig
  onComplete: (score: number, maxScore: number, passed: boolean) => void
  children: ReactNode
  className?: string
}

export function ActivityWrapper({
  activity,
  onComplete,
  children,
  className
}: ActivityWrapperProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<{
    score: number
    maxScore: number
    passed: boolean
    feedback: string
  } | null>(null)

  const meta = ACTIVITY_TYPES[activity.type]

  const handleComplete = (score: number, maxScore: number, passed: boolean, feedback?: string) => {
    setIsCompleted(true)
    setResult({
      score,
      maxScore,
      passed,
      feedback: feedback || (passed ? 'Great job!' : 'Keep trying!')
    })
    onComplete(score, maxScore, passed)
  }

  if (!isStarted) {
    return (
      <div className={cn(
        'rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden',
        className
      )}>
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{meta.icon}</span>
            <div>
              <h3 className="font-semibold text-lg">{activity.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{meta.label}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-sm font-medium text-primary">
                {activity.points} points
              </div>
              {activity.required && (
                <span className="text-xs text-orange-600 dark:text-orange-400">Required</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {activity.instructions}
          </p>
          <button
            onClick={() => setIsStarted(true)}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Start Activity
          </button>
        </div>
      </div>
    )
  }

  if (isCompleted && result) {
    return (
      <div className={cn(
        'rounded-xl border overflow-hidden',
        result.passed
          ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
          : 'border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20',
        className
      )}>
        <div className="p-6 text-center">
          <div className="text-5xl mb-4">
            {result.passed ? '🎉' : '💪'}
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {result.passed ? 'Activity Complete!' : 'Keep Going!'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {result.feedback}
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {result.score}
              </div>
              <div className="text-sm text-gray-500">Points</div>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-400">
                {result.maxScore}
              </div>
              <div className="text-sm text-gray-500">Max Points</div>
            </div>
          </div>
          {!result.passed && (
            <button
              onClick={() => {
                setIsCompleted(false)
                setResult(null)
              }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      'rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden',
      className
    )}>
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{meta.icon}</span>
          <span className="font-medium">{activity.title}</span>
        </div>
        <div className="text-sm text-gray-500">
          {activity.points} points possible
        </div>
      </div>
      <div className="p-6">
        {/* Render children with handleComplete callback */}
        {typeof children === 'function'
          ? (children as (onComplete: typeof handleComplete) => ReactNode)(handleComplete)
          : children}
      </div>
    </div>
  )
}
