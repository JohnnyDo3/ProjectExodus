'use client'

import { useState, useEffect } from 'react'
import { DiscussionWithReplies, DiscussionReply } from '@/types/learning'
import { LevelBadge } from '../levels/LevelSelector'
import { HelpfulButton } from './HelpfulButton'
import { ReplyForm } from './ReplyForm'
import { cn } from '@/lib/utils/cn'

interface DiscussionThreadProps {
  discussionId: string
  onBack: () => void
  className?: string
}

export function DiscussionThread({
  discussionId,
  onBack,
  className
}: DiscussionThreadProps) {
  const [discussion, setDiscussion] = useState<DiscussionWithReplies | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  useEffect(() => {
    fetchDiscussion()
  }, [discussionId])

  const fetchDiscussion = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/learning/discussions/${discussionId}`)
      if (!response.ok) throw new Error('Failed to fetch discussion')

      const data = await response.json()
      setDiscussion(data.data)
    } catch (error) {
      console.error('Error fetching discussion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReplyAdded = (newReply: DiscussionReply) => {
    if (!discussion) return

    if (newReply.parentReplyId) {
      // Add as child reply
      setDiscussion({
        ...discussion,
        replies: discussion.replies.map(reply =>
          reply.id === newReply.parentReplyId
            ? { ...reply, childReplies: [...(reply.childReplies || []), newReply] }
            : reply
        )
      })
    } else {
      // Add as top-level reply
      setDiscussion({
        ...discussion,
        replies: [...discussion.replies, newReply],
        replyCount: discussion.replyCount + 1
      })
    }
    setShowReplyForm(false)
    setReplyingTo(null)
  }

  const handleMarkResolved = async () => {
    if (!discussion) return

    try {
      const response = await fetch(`/api/learning/discussions/${discussionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isResolved: !discussion.isResolved })
      })

      if (!response.ok) throw new Error('Failed to update discussion')

      setDiscussion({
        ...discussion,
        isResolved: !discussion.isResolved
      })
    } catch (error) {
      console.error('Error updating discussion:', error)
    }
  }

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (!discussion) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">Discussion not found</p>
        <button onClick={onBack} className="text-primary mt-2">
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to discussions
      </button>

      {/* Original post */}
      <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-start gap-4">
          <img
            src={discussion.author.image || '/default-avatar.png'}
            alt={discussion.author.name || 'User'}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{discussion.author.name}</span>
              <LevelBadge level={discussion.level} size="sm" />
              {discussion.author.hasCompletedModule && (
                <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                  Completed
                </span>
              )}
              {discussion.isResolved && (
                <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  Resolved
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">{discussion.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {discussion.content}
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
              <span>{discussion.viewCount} views</span>
              <button
                onClick={handleMarkResolved}
                className="text-primary hover:underline"
              >
                {discussion.isResolved ? 'Mark as unresolved' : 'Mark as resolved'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reply form toggle */}
      {!showReplyForm && (
        <button
          onClick={() => setShowReplyForm(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Add Reply
        </button>
      )}

      {/* Reply form */}
      {showReplyForm && !replyingTo && (
        <ReplyForm
          discussionId={discussionId}
          onSubmit={handleReplyAdded}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {/* Replies */}
      <div className="space-y-4">
        <h3 className="font-semibold">
          {discussion.replyCount} {discussion.replyCount === 1 ? 'Reply' : 'Replies'}
        </h3>

        {discussion.replies.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No replies yet. Be the first to help!
          </p>
        ) : (
          discussion.replies.map((reply) => (
            <div key={reply.id} className="space-y-3">
              <ReplyCard
                reply={reply}
                discussionId={discussionId}
                onReplyClick={() => setReplyingTo(reply.id)}
                isReplying={replyingTo === reply.id}
                onReplyAdded={handleReplyAdded}
                onCancelReply={() => setReplyingTo(null)}
              />
              {/* Child replies */}
              {reply.childReplies && reply.childReplies.length > 0 && (
                <div className="ml-8 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  {reply.childReplies.map((childReply) => (
                    <ReplyCard
                      key={childReply.id}
                      reply={childReply}
                      discussionId={discussionId}
                      isNested
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

interface ReplyCardProps {
  reply: DiscussionReply
  discussionId: string
  onReplyClick?: () => void
  isReplying?: boolean
  onReplyAdded?: (reply: DiscussionReply) => void
  onCancelReply?: () => void
  isNested?: boolean
}

function ReplyCard({
  reply,
  discussionId,
  onReplyClick,
  isReplying,
  onReplyAdded,
  onCancelReply,
  isNested
}: ReplyCardProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg border',
      reply.isAcceptedAnswer
        ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10'
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
    )}>
      <div className="flex items-start gap-3">
        <img
          src={reply.author.image || '/default-avatar.png'}
          alt={reply.author.name || 'User'}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{reply.author.name}</span>
            {reply.isFromCompleter && (
              <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                Completed
              </span>
            )}
            {reply.isAcceptedAnswer && (
              <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded flex items-center gap-1">
                ✓ Accepted
              </span>
            )}
            <span className="text-xs text-gray-500">
              {new Date(reply.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
            {reply.content}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <HelpfulButton
              replyId={reply.id}
              helpfulCount={reply.helpfulCount}
              hasVoted={reply.hasUserVotedHelpful}
            />
            {!isNested && onReplyClick && (
              <button
                onClick={onReplyClick}
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                Reply
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nested reply form */}
      {isReplying && onReplyAdded && onCancelReply && (
        <div className="mt-4 ml-11">
          <ReplyForm
            discussionId={discussionId}
            parentReplyId={reply.id}
            onSubmit={onReplyAdded}
            onCancel={onCancelReply}
          />
        </div>
      )}
    </div>
  )
}
