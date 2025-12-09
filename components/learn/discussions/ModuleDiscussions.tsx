'use client'

import { useState, useEffect } from 'react'
import { LearningLevel, LEARNING_LEVELS, ModuleDiscussion } from '@/types/learning'
import { LevelBadge } from '../levels/LevelSelector'
import { DiscussionThread } from './DiscussionThread'
import { NewDiscussionForm } from './NewDiscussionForm'
import { cn } from '@/lib/utils'

interface ModuleDiscussionsProps {
  articleId: string
  currentLevel: LearningLevel
  className?: string
}

export function ModuleDiscussions({
  articleId,
  currentLevel,
  className
}: ModuleDiscussionsProps) {
  const [discussions, setDiscussions] = useState<ModuleDiscussion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel | 'all'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent')
  const [showNewForm, setShowNewForm] = useState(false)
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchDiscussions()
  }, [articleId, selectedLevel, sortBy, page])

  const fetchDiscussions = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        sort: sortBy,
        page: page.toString(),
        limit: '10'
      })
      if (selectedLevel !== 'all') {
        params.set('level', selectedLevel)
      }

      const response = await fetch(
        `/api/learning/modules/${articleId}/discussions?${params}`
      )
      if (!response.ok) throw new Error('Failed to fetch discussions')

      const data = await response.json()
      setDiscussions(data.data)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching discussions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscussionCreated = (newDiscussion: ModuleDiscussion) => {
    setDiscussions(prev => [newDiscussion, ...prev])
    setShowNewForm(false)
  }

  if (selectedDiscussion) {
    return (
      <DiscussionThread
        discussionId={selectedDiscussion}
        onBack={() => setSelectedDiscussion(null)}
        className={className}
      />
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Discussions</h3>
        <button
          onClick={() => setShowNewForm(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Ask a Question
        </button>
      </div>

      {/* New Discussion Form */}
      {showNewForm && (
        <NewDiscussionForm
          articleId={articleId}
          currentLevel={currentLevel}
          onSubmit={handleDiscussionCreated}
          onCancel={() => setShowNewForm(false)}
        />
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value as LearningLevel | 'all')}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="all">All Levels</option>
          {Object.entries(LEARNING_LEVELS).map(([level, meta]) => (
            <option key={level} value={level}>
              {meta.icon} {meta.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="unanswered">Unanswered</option>
        </select>
      </div>

      {/* Discussion List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : discussions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-4xl mb-2">💬</p>
          <p>No discussions yet. Be the first to ask a question!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {discussions.map((discussion) => (
            <button
              key={discussion.id}
              onClick={() => setSelectedDiscussion(discussion.id)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <img
                  src={discussion.author.image || '/default-avatar.png'}
                  alt={discussion.author.name || 'User'}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <LevelBadge level={discussion.level} size="sm" showLabel={false} />
                    {discussion.isResolved && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                        Resolved
                      </span>
                    )}
                    {discussion.isPinned && (
                      <span className="text-xs">📌</span>
                    )}
                  </div>
                  <h4 className="font-medium truncate">{discussion.title}</h4>
                  <p className="text-sm text-gray-500 truncate">
                    {discussion.content}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>{discussion.author.name}</span>
                    <span>·</span>
                    <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>{discussion.replyCount} replies</span>
                    <span>·</span>
                    <span>{discussion.viewCount} views</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
