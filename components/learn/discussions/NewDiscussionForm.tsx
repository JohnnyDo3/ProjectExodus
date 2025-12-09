'use client'

import { useState } from 'react'
import { LearningLevel, LEARNING_LEVELS, ModuleDiscussion } from '@/types/learning'
import { cn } from '@/lib/utils/cn'

interface NewDiscussionFormProps {
  articleId: string
  currentLevel: LearningLevel
  onSubmit: (discussion: ModuleDiscussion) => void
  onCancel: () => void
}

export function NewDiscussionForm({
  articleId,
  currentLevel,
  onSubmit,
  onCancel
}: NewDiscussionFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [level, setLevel] = useState<LearningLevel>(currentLevel)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/learning/modules/${articleId}/discussions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, level })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create discussion')
      }

      const data = await response.json()
      onSubmit(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4"
    >
      <h4 className="font-semibold">Ask a Question</h4>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Learning Level</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as LearningLevel)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          {Object.entries(LEARNING_LEVELS).map(([lvl, meta]) => (
            <option key={lvl} value={lvl}>
              {meta.icon} {meta.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Select the level this question relates to
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Question Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What would you like to know?"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          maxLength={200}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Details</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Provide more details about your question..."
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none"
          maxLength={2000}
        />
        <p className="text-xs text-gray-500 mt-1 text-right">
          {content.length}/2000
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !content.trim()}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-colors',
            isSubmitting || !title.trim() || !content.trim()
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          {isSubmitting ? 'Posting...' : 'Post Question'}
        </button>
      </div>
    </form>
  )
}
