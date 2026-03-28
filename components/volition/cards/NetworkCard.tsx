'use client'

import { User, UserPlus, MessageCircle, Check, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ViewMode } from '@/hooks/useVolitionLayout'

interface NetworkCardProps {
  user: {
    id: string
    name?: string | null
    image?: string | null
    headline?: string | null
    matchReasons?: string[]
    isFollowing?: boolean
  }
  type?: 'suggestion' | 'following' | 'follower'
  viewMode?: ViewMode
  onFollow?: (userId: string) => void
  onMessage?: (userId: string) => void
  className?: string
}

export function NetworkCard({
  user,
  type = 'suggestion',
  viewMode = 'expanded',
  onFollow,
  onMessage,
  className = '',
}: NetworkCardProps) {
  const isCompact = viewMode === 'compact'
  const isMinimal = viewMode === 'minimal'
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await onFollow?.(user.id)
      setIsFollowing(true)
    } catch (error) {
      console.error('Follow error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Minimal view - compact one-liner with type indicator
  if (isMinimal) {
    return (
      <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors ${className}`}>
        <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 overflow-hidden">
          {user.image ? (
            <Image src={user.image} alt="" fill unoptimized sizes="100%" className="object-cover" />
          ) : (
            <Users className="w-2 h-2 text-white" />
          )}
        </div>
        <span className="text-[11px] font-medium text-[var(--foreground)] truncate flex-1">{user.name || 'User'}</span>
        <span className={`text-[9px] font-bold uppercase flex-shrink-0 ${type === 'following' ? 'text-blue-500' : 'text-[var(--foreground)]/40'}`}>
          {type === 'following' ? 'Following' : 'Suggested'}
        </span>
      </div>
    )
  }

  if (isCompact) {
    return (
      <div className={`bg-[var(--muted)] rounded-xl p-3 ${className}`}>
        <div className="flex items-center gap-3">
          <Link href={`/profile/${user.id}`} className="flex-shrink-0">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center overflow-hidden">
              {user.image ? (
                <Image src={user.image} alt={user.name || ''} fill unoptimized sizes="100%" className="object-cover" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
          </Link>
          <div className="min-w-0 flex-1">
            <Link href={`/profile/${user.id}`}>
              <p className="font-bold text-[var(--foreground)] truncate hover:text-[var(--primary)] transition-colors text-sm">
                {user.name || 'User'}
              </p>
            </Link>
            {user.headline && (
              <p className="text-xs text-[var(--foreground)]/50 truncate">{user.headline}</p>
            )}
          </div>
          {!isFollowing && onFollow && (
            <button
              onClick={handleFollow}
              disabled={isLoading}
              className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-[var(--muted)] rounded-xl p-4 ${className}`}>
      {/* Avatar and basic info */}
      <div className="flex items-start gap-3 mb-3">
        <Link href={`/profile/${user.id}`} className="flex-shrink-0">
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center overflow-hidden">
            {user.image ? (
              <Image src={user.image} alt={user.name || ''} fill unoptimized sizes="100%" className="object-cover" />
            ) : (
              <User className="w-7 h-7 text-white" />
            )}
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={`/profile/${user.id}`}>
            <h4 className="font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              {user.name || 'User'}
            </h4>
          </Link>
          {user.headline && (
            <p className="text-sm text-[var(--foreground)]/60 line-clamp-2">{user.headline}</p>
          )}
        </div>
      </div>

      {/* Match reasons (for suggestions) */}
      {type === 'suggestion' && user.matchReasons && user.matchReasons.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {user.matchReasons.slice(0, 2).map((reason, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-[var(--primary)]/10 text-[var(--primary)]"
            >
              {reason}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isFollowing ? (
          <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
            <Check className="w-4 h-4" />
            <span className="text-sm font-bold">Following</span>
          </div>
        ) : (
          onFollow && (
            <button
              onClick={handleFollow}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              Follow
            </button>
          )
        )}

        {onMessage && (
          <button
            onClick={() => onMessage(user.id)}
            className="p-2 rounded-lg bg-[var(--muted)] hover:bg-[var(--background)] transition-colors border border-[var(--border)]"
          >
            <MessageCircle className="w-4 h-4 text-[var(--foreground)]" />
          </button>
        )}

        <Link
          href={`/profile/${user.id}`}
          className="px-3 py-2 rounded-lg bg-[var(--muted)] hover:bg-[var(--background)] transition-colors border border-[var(--border)] text-sm font-medium text-[var(--foreground)]"
        >
          View
        </Link>
      </div>
    </div>
  )
}
