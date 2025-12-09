'use client'

import { useState, useEffect } from 'react'
import { LearningLevel, LEARNING_LEVELS, CommunityDiscussionItem } from '@/types/learning'
import { LevelBadge } from '../levels/LevelSelector'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

interface LearnDiscussionsFilterProps {
  className?: string
}

interface ModuleFilter {
  id: string
  title: string
  slug: string
  discussionCount: number
}

interface LevelFilter {
  level: LearningLevel
  meta: typeof LEARNING_LEVELS[LearningLevel]
  count: number
}

export function LearnDiscussionsFilter({ className }: LearnDiscussionsFilterProps) {
  const [discussions, setDiscussions] = useState<CommunityDiscussionItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modules, setModules] = useState<ModuleFilter[]>([])
  const [levels, setLevels] = useState<LevelFilter[]>([])
  const [selectedModule, setSelectedModule] = useState<string>('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchDiscussions()
  }, [selectedModule, selectedLevel, sortBy, page])

  const fetchDiscussions = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        sort: sortBy,
        page: page.toString(),
        limit: '10'
      })
      if (selectedModule) params.set('moduleId', selectedModule)
      if (selectedLevel) params.set('level', selectedLevel)

      const response = await fetch(`/api/community/learn-discussions?${params}`)
      if (!response.ok) throw new Error('Failed to fetch discussions')

      const data = await response.json()
      setDiscussions(data.data)
      setModules(data.filters.modules)
      setLevels(data.filters.levels)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching learn discussions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedModule}
          onChange={(e) => {
            setSelectedModule(e.target.value)
            setPage(1)
          }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="">All Modules</option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {module.title} ({module.discussionCount})
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value)
            setPage(1)
          }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="">All Levels</option>
          {levels.map((levelFilter) => (
            <option key={levelFilter.level} value={levelFilter.level}>
              {levelFilter.meta.icon} {levelFilter.meta.label} ({levelFilter.count})
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as typeof sortBy)
            setPage(1)
          }}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="unanswered">Unanswered</option>
        </select>
      </div>

      {/* Discussion List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : discussions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-lg font-medium mb-1">No learning discussions found</p>
          <p className="text-sm">
            {selectedModule || selectedLevel
              ? 'Try adjusting your filters'
              : 'Start a discussion in any learning module'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Link
              key={discussion.id}
              href={`/learn/modules/${discussion.module.slug}?discussion=${discussion.id}`}
              className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Module thumbnail */}
                {discussion.module.coverImage && (
                  <img
                    src={discussion.module.coverImage}
                    alt={discussion.module.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {discussion.module.title}
                    </span>
                    <LevelBadge level={discussion.level} size="sm" />
                    {discussion.isResolved && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                        Resolved
                      </span>
                    )}
                  </div>

                  {/* Title & excerpt */}
                  <h4 className="font-medium mb-1 truncate">{discussion.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {discussion.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <img
                        src={discussion.author.image || '/default-avatar.png'}
                        alt={discussion.author.name || 'User'}
                        className="w-4 h-4 rounded-full"
                      />
                      {discussion.author.name}
                    </span>
                    <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                    <span>{discussion.replyCount} replies</span>
                    <span>{discussion.viewCount} views</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
