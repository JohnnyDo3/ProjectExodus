'use client'

import { Heart, MessageCircle } from 'lucide-react'

interface TablePostCardProps {
  post: any
  style?: React.CSSProperties
  onClick?: () => void
}

/**
 * A discussion card "seated" at the conference table.
 * Wider than the old orbiting card — shows more content.
 */
export function TablePostCard({ post, style, onClick }: TablePostCardProps) {
  return (
    <div
      className="w-full cursor-pointer group transition-all duration-200 hover:scale-[1.03] hover:z-50"
      style={style}
      onClick={onClick}
    >
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]/95 p-3 sm:p-3.5 shadow-lg shadow-black/20 backdrop-blur-sm hover:border-[var(--primary)]/60 hover:shadow-xl transition-all">
        {/* Author row */}
        <div className="flex items-center gap-2 mb-2">
          {post.user?.image ? (
            <img
              src={post.user.image}
              alt=""
              className="w-6 h-6 rounded-full object-cover border border-[var(--border)]"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-bold text-white">
                {(post.user?.name || '?')[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-[11px] sm:text-xs font-bold text-[var(--foreground)] truncate flex-1">
            {post.user?.name || 'Anonymous'}
          </span>
          <span className="text-[9px] text-[var(--foreground)]/30 flex-shrink-0">
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
          </span>
        </div>

        {/* Content preview */}
        <p className="text-[11px] sm:text-xs text-[var(--foreground)]/70 leading-relaxed line-clamp-3 mb-2">
          {post.content?.substring(0, 120)}{post.content?.length > 120 ? '...' : ''}
        </p>

        {/* Engagement */}
        <div className="flex items-center gap-3 text-[10px] text-[var(--foreground)]/40">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{post._count?.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            <span>{post._count?.comments || 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
