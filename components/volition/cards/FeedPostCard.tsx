'use client'

import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2, Eye, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface FeedPostCardProps {
  post: {
    id: string
    content: string
    createdAt: string | Date
    userId: string
    user?: {
      id: string
      name?: string | null
      image?: string | null
    }
    _count?: {
      likes?: number
      comments?: number
    }
    likes?: any[]
    images?: string[]
  }
  currentUserId?: string
  isCompact?: boolean
  onDelete?: (id: string) => void
  onLike?: (id: string) => void
  className?: string
}

export function FeedPostCard({
  post,
  currentUserId,
  isCompact = false,
  onDelete,
  onLike,
  className = '',
}: FeedPostCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const isOwner = post.userId === currentUserId
  const isLiked = post.likes?.some((like: any) => like.userId === currentUserId)
  const likesCount = post._count?.likes || post.likes?.length || 0
  const commentsCount = post._count?.comments || 0

  const formatDate = (date: string | Date) => {
    const d = new Date(date)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return d.toLocaleDateString()
  }

  if (isCompact) {
    return (
      <div className={`bg-[var(--muted)] rounded-xl p-3 ${className}`}>
        <p className="text-sm text-[var(--foreground)] line-clamp-2 mb-2">{post.content}</p>
        <div className="flex items-center justify-between text-xs text-[var(--foreground)]/50">
          <span>{formatDate(post.createdAt)}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className={`w-3 h-3 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              {likesCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {commentsCount}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-[var(--muted)] rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 pb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.user?.id || post.userId}`} className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center overflow-hidden">
              {post.user?.image ? (
                <img src={post.user.image} alt={post.user.name || ''} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
          </Link>
          <div>
            <Link href={`/profile/${post.user?.id || post.userId}`}>
              <p className="font-bold text-[var(--foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                {post.user?.name || 'User'}
              </p>
            </Link>
            <p className="text-xs text-[var(--foreground)]/50">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        {/* Menu */}
        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg hover:bg-[var(--background)] transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-[var(--foreground)]/60" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 z-20 bg-[var(--card)] rounded-lg shadow-lg border border-[var(--border)] py-1 min-w-[120px]">
                  <Link
                    href={`/community/feed/${post.id}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--muted)] transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  {onDelete && (
                    <button
                      onClick={() => {
                        setShowMenu(false)
                        onDelete(post.id)
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-[var(--foreground)] whitespace-pre-wrap line-clamp-4">{post.content}</p>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="px-4 pb-3">
          <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-lg overflow-hidden bg-[var(--background)]"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-6">
        <button
          onClick={() => onLike?.(post.id)}
          className={`flex items-center gap-2 text-sm transition-colors ${
            isLiked ? 'text-red-500' : 'text-[var(--foreground)]/60 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span className="font-medium">{likesCount}</span>
        </button>

        <Link
          href={`/community/feed/${post.id}`}
          className="flex items-center gap-2 text-sm text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-medium">{commentsCount}</span>
        </Link>

        <button className="flex items-center gap-2 text-sm text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors ml-auto">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
