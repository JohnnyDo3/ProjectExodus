'use client'

import { Heart, MessageCircle } from 'lucide-react'

interface TablePostCardProps {
  post: any
  style?: React.CSSProperties
  onClick?: () => void
}

export function TablePostCard({ post, style, onClick }: TablePostCardProps) {
  return (
    <div
      className="w-[150px] sm:w-[170px] cursor-pointer group transition-transform duration-200 hover:scale-110 hover:z-50"
      style={style}
      onClick={onClick}
    >
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-2.5 shadow-lg shadow-black/30 backdrop-blur-sm hover:border-[var(--primary)] transition-colors">
        {/* Author */}
        <div className="flex items-center gap-1.5 mb-1.5">
          {post.user?.image ? (
            <img
              src={post.user.image}
              alt=""
              className="w-5 h-5 rounded-full object-cover border border-[var(--border)]"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">
                {(post.user?.name || '?')[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-[9px] font-bold text-[var(--foreground)] truncate flex-1">
            {post.user?.name || 'Anonymous'}
          </span>
        </div>

        {/* Content preview */}
        <p className="text-[10px] text-[var(--foreground)]/70 leading-snug line-clamp-2 mb-1.5">
          {post.content?.substring(0, 60)}{post.content?.length > 60 ? '...' : ''}
        </p>

        {/* Engagement */}
        <div className="flex items-center gap-2.5 text-[9px] text-[var(--foreground)]/40">
          <div className="flex items-center gap-0.5">
            <Heart className="w-2.5 h-2.5" />
            <span>{post._count?.likes || 0}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <MessageCircle className="w-2.5 h-2.5" />
            <span>{post._count?.comments || 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
