'use client'

import Link from 'next/link'
import { BookOpen, Plus, CheckCircle } from 'lucide-react'
import { WidgetWrapper } from '../WidgetWrapper'

interface LearningWidgetProps {
  learningModules: any[]
  onRemove?: () => void
  filter?: string
  onFilterChange?: (filter: string) => void
}

export function LearningWidget({
  learningModules,
  onRemove,
  filter = 'all',
  onFilterChange,
}: LearningWidgetProps) {
  const filterButtons = (
    <div className="flex gap-1">
      {[
        { id: 'all', label: 'All' },
        { id: 'in_progress', label: 'Active' },
        { id: 'completed', label: 'Done' },
      ].map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange?.(f.id)}
          className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
            filter === f.id
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)]/20'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )

  return (
    <WidgetWrapper
      id="learning"
      title="My Learning"
      icon={BookOpen}
      theme="accent"
      onRemove={onRemove}
      showRemove={!!onRemove}
      headerActions={
        <Link href="/learn">
          <button className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </Link>
      }
    >
      <div className="flex flex-col h-full">
        {/* Filters */}
        <div className="px-3 py-2 border-b border-[var(--border)]">
          {filterButtons}
        </div>

        {/* Modules */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {learningModules.map((module) => (
            <Link key={module.id} href={`/learn/${module.article.slug}`}>
              <div className="p-2.5 bg-gradient-to-br from-[var(--accent)]/5 to-transparent border border-[var(--accent)]/20 rounded-lg cursor-pointer hover:shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-medium text-[var(--foreground)] line-clamp-1 flex-1 pr-2">
                    {module.article.title}
                  </h3>
                  {module.status === 'COMPLETED' && (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                </div>

                {/* Progress Bar for Large Modules */}
                {module.article.moduleType === 'LARGE' && module.status === 'IN_PROGRESS' && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] transition-all"
                        style={{ width: `${module.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Module Info */}
                <div className="flex items-center gap-2 mt-1.5">
                  {module.article.moduleType === 'LARGE' && (
                    <span className="text-[10px] font-semibold text-[var(--accent)]">
                      {module.progressPercentage}%
                    </span>
                  )}
                  {module.article.estimatedTime && (
                    <span className="text-[10px] text-[var(--foreground)]/50">
                      {module.article.estimatedTime}m
                    </span>
                  )}
                </div>

                {/* Quiz Status for Large Modules */}
                {module.article.moduleType === 'LARGE' && module.quizAttempts > 0 && !module.quizPassed && (
                  <div className="mt-2 text-[10px] font-medium text-orange-500">
                    Quiz: {module.quizAttempts} attempts - {module.quizScore}/5
                  </div>
                )}
              </div>
            </Link>
          ))}
          {learningModules.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-10 h-10 text-[var(--foreground)]/20 mx-auto mb-2" />
              <p className="text-sm font-medium text-[var(--foreground)]/50">
                {filter === 'completed'
                  ? 'No completed modules yet'
                  : filter === 'in_progress'
                  ? 'No modules in progress'
                  : 'Start learning!'}
              </p>
              <Link href="/learn#featured-modules">
                <button className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-xs font-medium hover:bg-[var(--primary)] transition-colors">
                  Browse Modules
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  )
}
