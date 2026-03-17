'use client'

import { Heart, MessageCircle } from 'lucide-react'

interface TablePostCardProps {
  post: any
  style?: React.CSSProperties
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function TablePostCard({ post, style, onClick, onMouseEnter, onMouseLeave }: TablePostCardProps) {
  return (
    <div
      className="absolute w-[160px] sm:w-[180px] cursor-pointer group transition-transform duration-200 hover:scale-105"
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-lg shadow-black/20 backdrop-blur-sm hover:border-[var(--primary)] transition-colors">
        {/* Author */}
        <div className="flex items-center gap-2 mb-2">
          {post.user?.image ? (
            <img
              src={post.user.image}
              alt=""
              className="w-6 h-6 rounded-full object-cover border border-[var(--border)]"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">
                {(post.user?.name || '?')[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-[10px] font-bold text-[var(--foreground)] truncate flex-1">
            {post.user?.name || 'Anonymous'}
          </span>
        </div>

        {/* Content preview */}
        <p className="text-xs text-[var(--foreground)]/80 leading-snug line-clamp-3 mb-2">
          {post.content?.substring(0, 80)}{post.content?.length > 80 ? '...' : ''}
        </p>

        {/* Engagement */}
        <div className="flex items-center gap-3 text-[10px] text-[var(--foreground)]/50">
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
