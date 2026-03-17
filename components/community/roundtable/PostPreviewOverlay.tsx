'use client'

import { X, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

interface PostPreviewOverlayProps {
  post: any | null
  onClose: () => void
}

export function PostPreviewOverlay({ post, onClose }: PostPreviewOverlayProps) {
  useEffect(() => {
    if (!post) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [post, onClose])

  if (!post) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border-2 border-[var(--border)] animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            {post.user?.image ? (
              <img
                src={post.user.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary)]/30"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {(post.user?.name || '?')[0]?.toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                {post.user?.name || 'Anonymous'}
              </p>
              <p className="text-xs text-[var(--foreground)]/50">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
          >
            <X className="w-5 h-5 text-[var(--foreground)]/50" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {post.image && (
            <img
              src={post.image}
              alt=""
              className="mt-4 rounded-xl w-full max-h-[300px] object-cover"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-sm text-[var(--foreground)]/60 hover:text-rose-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="font-semibold">{post._count?.likes || 0}</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-[var(--foreground)]/60 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold">{post._count?.comments || 0}</span>
            </button>
          </div>
          <Link
            href={`/community/feed`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Thread
          </Link>
        </div>
      </div>
    </div>
  )
}
