'use client'

import { Eye, Clock, MoreHorizontal, Edit, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    coverImage?: string | null
    status: string
    views?: number
    readTime?: number
    createdAt: string | Date
    publishedAt?: string | Date | null
  }
  isCompact?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export function ArticleCard({
  article,
  isCompact = false,
  onEdit,
  onDelete,
  className = '',
}: ArticleCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const isPublished = article.status === 'PUBLISHED'
  const isDraft = article.status === 'DRAFT'

  if (isCompact) {
    return (
      <div className={`bg-[var(--muted)] rounded-xl p-3 ${className}`}>
        <div className="flex items-center justify-between mb-1">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              isPublished
                ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                : 'bg-[var(--foreground)]/10 text-[var(--foreground)]/60'
            }`}
          >
            {article.status}
          </span>
          {article.views !== undefined && (
            <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/50">
              <Eye className="w-3 h-3" />
              <span>{article.views}</span>
            </div>
          )}
        </div>
        <Link href={isPublished ? `/articles/${article.slug}` : `/articles/write?edit=${article.id}`}>
          <h4 className="font-bold text-[var(--foreground)] line-clamp-2 hover:text-[var(--primary)] transition-colors">
            {article.title}
          </h4>
        </Link>
      </div>
    )
  }

  return (
    <div className={`bg-[var(--muted)] rounded-xl overflow-hidden ${className}`}>
      {/* Cover image */}
      {article.coverImage && (
        <div className="relative h-32 bg-[var(--background)]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span
            className={`absolute top-2 left-2 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
              isPublished
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--foreground)]/80 text-white'
            }`}
          >
            {article.status}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {!article.coverImage && (
          <div className="flex items-center justify-between mb-2">
            <span
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                isPublished
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'bg-[var(--foreground)]/10 text-[var(--foreground)]/60'
              }`}
            >
              {article.status}
            </span>

            {/* Menu */}
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
                  <div className="absolute right-0 top-full mt-1 z-20 bg-[var(--card)] rounded-lg shadow-lg border border-[var(--border)] py-1 min-w-[140px]">
                    {isPublished && (
                      <Link
                        href={`/articles/${article.slug}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--muted)] transition-colors"
                        onClick={() => setShowMenu(false)}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </Link>
                    )}
                    <Link
                      href={`/articles/write?edit=${article.id}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--muted)] transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    {onDelete && (
                      <button
                        onClick={() => {
                          setShowMenu(false)
                          onDelete(article.id)
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
          </div>
        )}

        <h4 className="text-base font-bold text-[var(--foreground)] mb-2 line-clamp-2">
          {article.title}
        </h4>

        {article.excerpt && (
          <p className="text-sm text-[var(--foreground)]/60 line-clamp-2 mb-3">
            {article.excerpt}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-[var(--foreground)]/50">
          {article.views !== undefined && (
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>{article.views} views</span>
            </div>
          )}
          {article.readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime} min</span>
            </div>
          )}
        </div>

        {/* Action buttons with cover image */}
        {article.coverImage && (
          <div className="flex items-center gap-2 mt-3">
            {isPublished && (
              <Link
                href={`/articles/${article.slug}`}
                className="flex-1 text-center py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold hover:bg-[var(--primary)]/20 transition-colors"
              >
                View
              </Link>
            )}
            <Link
              href={`/articles/write?edit=${article.id}`}
              className="flex-1 text-center py-2 rounded-lg bg-[var(--muted)] text-[var(--foreground)] text-xs font-bold hover:bg-[var(--background)] transition-colors"
            >
              Edit
            </Link>
            {onDelete && (
              <button
                onClick={() => onDelete(article.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
