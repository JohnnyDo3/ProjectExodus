'use client'

import { useState, useMemo } from 'react'
import { MessageSquare, Filter, Plus, Search, CheckCircle, Clock, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CommentThread } from './CommentThread'

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

type CommentFilter = 'all' | 'open' | 'resolved'

interface CommentsSidebarProps {
  comments: Comment[]
  currentUserId?: string
  isDocumentOwner?: boolean
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  onAddComment?: () => void
  onReply?: (commentId: string, content: string) => Promise<void>
  onEdit?: (commentId: string, content: string) => Promise<void>
  onDelete?: (commentId: string) => Promise<void>
  onResolve?: (commentId: string) => Promise<void>
  onUnresolve?: (commentId: string) => Promise<void>
  onReact?: (commentId: string, emoji: string) => Promise<void>
  onRemoveReaction?: (commentId: string, emoji: string) => Promise<void>
  onScrollToPosition?: (position: { from: number; to: number }) => void
}

export function CommentsSidebar({
  comments,
  currentUserId,
  isDocumentOwner = false,
  isCollapsed = false,
  onToggleCollapse,
  onAddComment,
  onReply,
  onEdit,
  onDelete,
  onResolve,
  onUnresolve,
  onReact,
  onRemoveReaction,
  onScrollToPosition,
}: CommentsSidebarProps) {
  const [filter, setFilter] = useState<CommentFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // Organize comments into threads (top-level only, replies are nested)
  const topLevelComments = useMemo(() => {
    return comments.filter((c) => !c.parentId)
  }, [comments])

  // Apply filters
  const filteredComments = useMemo(() => {
    let result = topLevelComments

    // Filter by status
    if (filter === 'open') {
      result = result.filter((c) => !c.isResolved)
    } else if (filter === 'resolved') {
      result = result.filter((c) => c.isResolved)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (c) =>
          c.content.toLowerCase().includes(term) ||
          c.author.name?.toLowerCase().includes(term) ||
          c.quotedText?.toLowerCase().includes(term) ||
          c.replies?.some(
            (r) =>
              r.content.toLowerCase().includes(term) ||
              r.author.name?.toLowerCase().includes(term)
          )
      )
    }

    return result
  }, [topLevelComments, filter, searchTerm])

  // Count stats
  const stats = useMemo(() => {
    const open = topLevelComments.filter((c) => !c.isResolved).length
    const resolved = topLevelComments.filter((c) => c.isResolved).length
    return { total: topLevelComments.length, open, resolved }
  }, [topLevelComments])

  if (isCollapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-[var(--secondary)]/10 rounded-lg transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="font-semibold text-sm">Comments</span>
        {stats.open > 0 && (
          <span className="ml-auto px-2 py-0.5 text-xs bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
            {stats.open}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="font-bold text-sm">Comments</span>
          <span className="text-xs text-[var(--muted)]">({stats.total})</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowSearch(!showSearch)}
            className="h-7 w-7 p-0"
          >
            <Search className="w-4 h-4" />
          </Button>
          {onToggleCollapse && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleCollapse}
              className="h-7 w-7 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="p-2 border-b border-[var(--border)]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search comments..."
            className="w-full px-3 py-1.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
            autoFocus
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-1 p-2 border-b border-[var(--border)]">
        <Button
          size="sm"
          variant={filter === 'all' ? 'primary' : 'ghost'}
          onClick={() => setFilter('all')}
          className="h-7 px-2 text-xs flex-1"
        >
          All ({stats.total})
        </Button>
        <Button
          size="sm"
          variant={filter === 'open' ? 'primary' : 'ghost'}
          onClick={() => setFilter('open')}
          className="h-7 px-2 text-xs flex-1"
        >
          <Clock className="w-3 h-3 mr-1" />
          Open ({stats.open})
        </Button>
        <Button
          size="sm"
          variant={filter === 'resolved' ? 'primary' : 'ghost'}
          onClick={() => setFilter('resolved')}
          className="h-7 px-2 text-xs flex-1"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          Resolved ({stats.resolved})
        </Button>
      </div>

      {/* Add comment button */}
      {onAddComment && (
        <div className="p-2 border-b border-[var(--border)]">
          <Button
            onClick={onAddComment}
            className="w-full h-8 text-xs font-bold"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Comment
          </Button>
        </div>
      )}

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto">
        {filteredComments.length > 0 ? (
          <div className="divide-y divide-[var(--border)]">
            {filteredComments.map((comment) => (
              <div key={comment.id} className="p-3 hover:bg-[var(--secondary)]/5">
                <CommentThread
                  comment={comment}
                  currentUserId={currentUserId}
                  isDocumentOwner={isDocumentOwner}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onResolve={onResolve}
                  onUnresolve={onUnresolve}
                  onReact={onReact}
                  onRemoveReaction={onRemoveReaction}
                  onScrollToPosition={onScrollToPosition}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-3 text-[var(--muted)] opacity-50" />
            <p className="text-sm text-[var(--muted)]">
              {searchTerm
                ? 'No comments match your search'
                : filter === 'open'
                ? 'No open comments'
                : filter === 'resolved'
                ? 'No resolved comments'
                : 'No comments yet'}
            </p>
            {!searchTerm && filter === 'all' && onAddComment && (
              <Button
                size="sm"
                variant="outline"
                onClick={onAddComment}
                className="mt-3 text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Start a conversation
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentsSidebar
