'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  Reply, MoreHorizontal, Edit2, Trash2, CheckCircle, XCircle,
  ThumbsUp, Heart, Smile, PartyPopper, Frown, Eye
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CommentAuthor {
  id: string
  name: string | null
  image: string | null
}

interface CommentReaction {
  id: string
  emoji: string
  userId: string
  user: CommentAuthor
}

interface Comment {
  id: string
  content: string
  quotedText?: string | null
  position?: { from: number; to: number } | null
  author: CommentAuthor
  authorId: string
  createdAt: Date | string
  updatedAt: Date | string
  isEdited: boolean
  isResolved: boolean
  resolvedBy?: CommentAuthor | null
  resolvedAt?: Date | string | null
  reactions: CommentReaction[]
  replies?: Comment[]
  parentId?: string | null
}

interface CommentThreadProps {
  comment: Comment
  currentUserId?: string
  isDocumentOwner?: boolean
  onReply?: (commentId: string, content: string) => Promise<void>
  onEdit?: (commentId: string, content: string) => Promise<void>
  onDelete?: (commentId: string) => Promise<void>
  onResolve?: (commentId: string) => Promise<void>
  onUnresolve?: (commentId: string) => Promise<void>
  onReact?: (commentId: string, emoji: string) => Promise<void>
  onRemoveReaction?: (commentId: string, emoji: string) => Promise<void>
  onScrollToPosition?: (position: { from: number; to: number }) => void
  isCompact?: boolean
}

const REACTION_EMOJIS = [
  { emoji: '👍', icon: ThumbsUp },
  { emoji: '❤️', icon: Heart },
  { emoji: '😄', icon: Smile },
  { emoji: '🎉', icon: PartyPopper },
  { emoji: '😕', icon: Frown },
  { emoji: '👀', icon: Eye },
]

export function CommentThread({
  comment,
  currentUserId,
  isDocumentOwner = false,
  onReply,
  onEdit,
  onDelete,
  onResolve,
  onUnresolve,
  onReact,
  onRemoveReaction,
  onScrollToPosition,
  isCompact = false,
}: CommentThreadProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [editContent, setEditContent] = useState(comment.content)
  const [showReactions, setShowReactions] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isAuthor = currentUserId === comment.authorId
  const canResolve = isDocumentOwner || isAuthor
  const createdAt = new Date(comment.createdAt)

  // Group reactions by emoji
  const groupedReactions = comment.reactions.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = []
    }
    acc[reaction.emoji].push(reaction)
    return acc
  }, {} as Record<string, CommentReaction[]>)

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || !onReply) return

    setIsSubmitting(true)
    try {
      await onReply(comment.id, replyContent)
      setReplyContent('')
      setIsReplying(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitEdit = async () => {
    if (!editContent.trim() || !onEdit) return

    setIsSubmitting(true)
    try {
      await onEdit(comment.id, editContent)
      setIsEditing(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReact = async (emoji: string) => {
    const existingReaction = comment.reactions.find(
      (r) => r.userId === currentUserId && r.emoji === emoji
    )

    if (existingReaction) {
      await onRemoveReaction?.(comment.id, emoji)
    } else {
      await onReact?.(comment.id, emoji)
    }
    setShowReactions(false)
  }

  return (
    <div className={`group ${comment.isResolved ? 'opacity-60' : ''}`}>
      {/* Quoted text */}
      {comment.quotedText && (
        <button
          onClick={() => comment.position && onScrollToPosition?.(comment.position)}
          className="mb-2 w-full text-left"
        >
          <div className="px-3 py-2 bg-yellow-100/50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 text-sm text-[var(--muted)] italic rounded-r hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
            "{comment.quotedText.length > 100
              ? comment.quotedText.substring(0, 100) + '...'
              : comment.quotedText}"
          </div>
        </button>
      )}

      {/* Main comment */}
      <div className={`flex gap-3 ${isCompact ? 'items-start' : ''}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.author.image ? (
            <img
              src={comment.author.image}
              alt={comment.author.name || 'User'}
              className={`rounded-full object-cover ${isCompact ? 'w-6 h-6' : 'w-8 h-8'}`}
            />
          ) : (
            <div className={`rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold ${isCompact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}>
              {comment.author.name?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm truncate">
              {comment.author.name || 'Anonymous'}
            </span>
            <span className="text-xs text-[var(--muted)]">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </span>
            {comment.isEdited && (
              <span className="text-xs text-[var(--muted)]">(edited)</span>
            )}
            {comment.isResolved && (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="w-3 h-3" />
                Resolved
              </span>
            )}
          </div>

          {/* Comment body */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none"
                rows={3}
                autoFocus
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleSubmitEdit}
                  disabled={isSubmitting || !editContent.trim()}
                  className="text-xs"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false)
                    setEditContent(comment.content)
                  }}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          )}

          {/* Reactions */}
          {Object.keys(groupedReactions).length > 0 && (
            <div className="flex flex-wrap items-center gap-1 mt-2">
              {Object.entries(groupedReactions).map(([emoji, reactions]) => {
                const hasReacted = reactions.some((r) => r.userId === currentUserId)
                return (
                  <button
                    key={emoji}
                    onClick={() => handleReact(emoji)}
                    className={`flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border transition-colors ${
                      hasReacted
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)]/30'
                        : 'bg-[var(--secondary)]/10 border-[var(--border)] hover:border-[var(--primary)]/30'
                    }`}
                    title={reactions.map((r) => r.user.name).join(', ')}
                  >
                    <span>{emoji}</span>
                    <span>{reactions.length}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onReply && !comment.parentId && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsReplying(!isReplying)}
                  className="h-6 px-2 text-xs"
                >
                  <Reply className="w-3 h-3 mr-1" />
                  Reply
                </Button>
              )}

              {/* Reaction picker */}
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowReactions(!showReactions)}
                  className="h-6 w-6 p-0"
                >
                  <Smile className="w-3 h-3" />
                </Button>
                {showReactions && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowReactions(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg p-1 flex gap-1 z-50">
                      {REACTION_EMOJIS.map(({ emoji }) => (
                        <button
                          key={emoji}
                          onClick={() => handleReact(emoji)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[var(--secondary)]/20 rounded transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* More options */}
              {(isAuthor || canResolve) && (
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowMenu(!showMenu)}
                    className="h-6 w-6 p-0"
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                  {showMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                      />
                      <div className="absolute top-full left-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                        {isAuthor && (
                          <>
                            <button
                              onClick={() => {
                                setIsEditing(true)
                                setShowMenu(false)
                              }}
                              className="w-full px-3 py-1.5 text-left text-xs hover:bg-[var(--secondary)]/20 flex items-center gap-2"
                            >
                              <Edit2 className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                await onDelete?.(comment.id)
                                setShowMenu(false)
                              }}
                              className="w-full px-3 py-1.5 text-left text-xs hover:bg-red-500/10 text-red-500 flex items-center gap-2"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </>
                        )}
                        {canResolve && !comment.parentId && (
                          <button
                            onClick={async () => {
                              if (comment.isResolved) {
                                await onUnresolve?.(comment.id)
                              } else {
                                await onResolve?.(comment.id)
                              }
                              setShowMenu(false)
                            }}
                            className="w-full px-3 py-1.5 text-left text-xs hover:bg-[var(--secondary)]/20 flex items-center gap-2"
                          >
                            {comment.isResolved ? (
                              <>
                                <XCircle className="w-3 h-3" />
                                Re-open
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                Resolve
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Reply input */}
          {isReplying && (
            <div className="mt-3 space-y-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none"
                rows={2}
                autoFocus
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleSubmitReply}
                  disabled={isSubmitting || !replyContent.trim()}
                  className="text-xs"
                >
                  {isSubmitting ? 'Posting...' : 'Reply'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsReplying(false)
                    setReplyContent('')
                  }}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Nested replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-[var(--border)] space-y-3">
              {comment.replies.map((reply) => (
                <CommentThread
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  isDocumentOwner={isDocumentOwner}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReact={onReact}
                  onRemoveReaction={onRemoveReaction}
                  isCompact
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentThread
