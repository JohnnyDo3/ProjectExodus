'use client'

import { useState } from 'react'
import { LearningLevel, LEARNING_LEVELS, LEARNING_LEVEL_ORDER, LevelMeta } from '@/types/learning'
import { cn } from '@/lib/utils/cn'

interface LevelSelectorProps {
  currentLevel: LearningLevel
  availableLevels?: LearningLevel[]
  onLevelChange: (level: LearningLevel) => void
  variant?: 'tabs' | 'dropdown' | 'cards'
  showDescriptions?: boolean
  disabled?: boolean
  className?: string
}

export function LevelSelector({
  currentLevel,
  availableLevels,
  onLevelChange,
  variant = 'tabs',
  showDescriptions = false,
  disabled = false,
  className
}: LevelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const levels = availableLevels || LEARNING_LEVEL_ORDER
  const currentMeta = LEARNING_LEVELS[currentLevel]

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
            'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
            'hover:bg-gray-50 dark:hover:bg-gray-700',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className="text-xl">{currentMeta.icon}</span>
          <span className="font-medium">{currentMeta.label}</span>
          <svg
            className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
              {levels.map((level) => {
                const meta = LEARNING_LEVELS[level]
                const isSelected = level === currentLevel
                const isAvailable = !availableLevels || availableLevels.includes(level)

                return (
                  <button
                    key={level}
                    onClick={() => {
                      if (isAvailable) {
                        onLevelChange(level)
                        setIsOpen(false)
                      }
                    }}
                    disabled={!isAvailable}
                    className={cn(
                      'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors',
                      'first:rounded-t-lg last:rounded-b-lg',
                      isSelected && 'bg-primary/10',
                      !isSelected && isAvailable && 'hover:bg-gray-50 dark:hover:bg-gray-700',
                      !isAvailable && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <span className="text-2xl">{meta.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{meta.label}</span>
                        <span className="text-xs text-gray-500">({meta.ageRange})</span>
                        {isSelected && (
                          <span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      {showDescriptions && (
                        <p className="text-sm text-gray-500 mt-0.5">{meta.description}</p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3', className)}>
        {levels.map((level) => {
          const meta = LEARNING_LEVELS[level]
          const isSelected = level === currentLevel
          const isAvailable = !availableLevels || availableLevels.includes(level)

          return (
            <button
              key={level}
              onClick={() => isAvailable && onLevelChange(level)}
              disabled={disabled || !isAvailable}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                isSelected
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
                !isAvailable && 'opacity-50 cursor-not-allowed',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className="text-3xl">{meta.icon}</span>
              <span className="font-medium text-sm">{meta.shortLabel}</span>
              <span className="text-xs text-gray-500">{meta.ageRange}</span>
              {!isAvailable && (
                <span className="text-xs text-gray-400">Coming soon</span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Default: tabs variant
  return (
    <div className={cn('flex flex-wrap gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg', className)}>
      {levels.map((level) => {
        const meta = LEARNING_LEVELS[level]
        const isSelected = level === currentLevel
        const isAvailable = !availableLevels || availableLevels.includes(level)

        return (
          <button
            key={level}
            onClick={() => isAvailable && onLevelChange(level)}
            disabled={disabled || !isAvailable}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all',
              isSelected
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'hover:bg-white/50 dark:hover:bg-gray-700/50',
              !isAvailable && 'opacity-50 cursor-not-allowed',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            title={meta.description}
          >
            <span>{meta.icon}</span>
            <span className="hidden sm:inline">{meta.shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}

// Badge component for showing level
interface LevelBadgeProps {
  level: LearningLevel
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function LevelBadge({
  level,
  size = 'md',
  showLabel = true,
  className
}: LevelBadgeProps) {
  const meta = LEARNING_LEVELS[level]

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  }

  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        sizeClasses[size],
        colorClasses[meta.color],
        className
      )}
    >
      <span>{meta.icon}</span>
      {showLabel && <span>{meta.shortLabel}</span>}
    </span>
  )
}
