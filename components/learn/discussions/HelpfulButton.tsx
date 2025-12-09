'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HelpfulButtonProps {
  replyId: string
  helpfulCount: number
  hasVoted: boolean
}

export function HelpfulButton({
  replyId,
  helpfulCount: initialCount,
  hasVoted: initialVoted
}: HelpfulButtonProps) {
  const [count, setCount] = useState(initialCount)
  const [hasVoted, setHasVoted] = useState(initialVoted)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)

    // Optimistic update
    setCount(prev => hasVoted ? prev - 1 : prev + 1)
    setHasVoted(prev => !prev)

    try {
      const response = await fetch(`/api/learning/replies/${replyId}/helpful`, {
        method: 'POST'
      })

      if (!response.ok) {
        // Revert on error
        setCount(prev => hasVoted ? prev + 1 : prev - 1)
        setHasVoted(prev => !prev)
        throw new Error('Failed to update vote')
      }

      const data = await response.json()
      setCount(data.data.helpfulCount)
      setHasVoted(data.data.hasUserVotedHelpful)
    } catch (error) {
      console.error('Error toggling helpful vote:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-colors',
        hasVoted
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
      )}
    >
      <svg
        className={cn('w-3.5 h-3.5', hasVoted && 'fill-current')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
      <span>{count > 0 ? count : 'Helpful'}</span>
    </button>
  )
}
