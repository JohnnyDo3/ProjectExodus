'use client'

import { BookOpen, Clock, CheckCircle, PlayCircle } from 'lucide-react'
import Link from 'next/link'

interface LearningCardProps {
  module: {
    id: string
    moduleId?: string
    title?: string
    progress?: number
    completed?: boolean
    module?: {
      id: string
      title: string
      description?: string
      duration?: number
      category?: string
    }
    updatedAt?: string | Date
  }
  isCompact?: boolean
  className?: string
}

export function LearningCard({
  module,
  isCompact = false,
  className = '',
}: LearningCardProps) {
  const title = module.title || module.module?.title || 'Learning Module'
  const description = module.module?.description
  const duration = module.module?.duration
  const progress = module.progress || 0
  const isCompleted = module.completed || progress >= 100
  const isInProgress = progress > 0 && !isCompleted
  const moduleId = module.moduleId || module.module?.id || module.id

  if (isCompact) {
    return (
      <Link
        href={`/learn/${moduleId}`}
        className={`block bg-[var(--muted)] rounded-xl p-3 hover:bg-[var(--muted)]/80 transition-colors ${className}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isCompleted
                ? 'bg-[var(--accent)]/10'
                : isInProgress
                ? 'bg-[var(--primary)]/10'
                : 'bg-[var(--foreground)]/10'
            }`}
          >
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-[var(--accent)]" />
            ) : isInProgress ? (
              <PlayCircle className="w-5 h-5 text-[var(--primary)]" />
            ) : (
              <BookOpen className="w-5 h-5 text-[var(--foreground)]/60" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-[var(--foreground)] truncate text-sm">{title}</h4>
            {isInProgress && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[var(--primary)]">{progress}%</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className={`bg-[var(--muted)] rounded-xl overflow-hidden ${className}`}>
      {/* Header with status */}
      <div
        className={`px-4 py-3 flex items-center justify-between ${
          isCompleted
            ? 'bg-[var(--accent)]/10'
            : isInProgress
            ? 'bg-[var(--primary)]/10'
            : ''
        }`}
      >
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-[var(--accent)]" />
          ) : isInProgress ? (
            <PlayCircle className="w-5 h-5 text-[var(--primary)]" />
          ) : (
            <BookOpen className="w-5 h-5 text-[var(--foreground)]/60" />
          )}
          <span
            className={`text-xs font-bold uppercase ${
              isCompleted
                ? 'text-[var(--accent)]'
                : isInProgress
                ? 'text-[var(--primary)]'
                : 'text-[var(--foreground)]/60'
            }`}
          >
            {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
          </span>
        </div>
        {duration && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground)]/50">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration} min</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="text-base font-bold text-[var(--foreground)] mb-2 line-clamp-2">
          {title}
        </h4>

        {description && (
          <p className="text-sm text-[var(--foreground)]/60 line-clamp-2 mb-3">
            {description}
          </p>
        )}

        {/* Progress bar */}
        {!isCompleted && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[var(--foreground)]/50">Progress</span>
              <span className="font-bold text-[var(--primary)]">{progress}%</span>
            </div>
            <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action button */}
        <Link
          href={`/learn/${moduleId}`}
          className={`block w-full text-center py-2.5 rounded-xl font-bold text-sm transition-colors ${
            isCompleted
              ? 'bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20'
              : isInProgress
              ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90'
              : 'bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20'
          }`}
        >
          {isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}
        </Link>
      </div>
    </div>
  )
}
