'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  ExternalLink,
  MessageCircle,
  Clock,
  Eye,
  Share2,
  Bookmark,
  MoreHorizontal,
  Edit,
  Trash2,
  Pin,
  Tag
} from 'lucide-react'

interface ResearchPostData {
  id: string
  heading: string
  summary: string
  fullContent?: string
  sourceUrl?: string
  sourceTitle?: string
  tags: string[]
  isPinned: boolean
  viewCount: number
  author: {
    id: string
    name: string
    image?: string
    headline?: string
  }
  _count: {
    comments: number
  }
  createdAt: Date
  updatedAt: Date
}

interface ResearchPostProps {
  post: ResearchPostData
  projectSlug: string
  isAuthor?: boolean
  isAdmin?: boolean
  className?: string
}

export function ResearchPost({
  post,
  projectSlug,
  isAuthor = false,
  isAdmin = false,
  className = ''
}: ResearchPostProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const canEdit = isAuthor || isAdmin
  const timeAgo = getTimeAgo(new Date(post.createdAt))

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {post.author.image ? (
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <span className="text-lg font-medium text-[var(--primary)]">
                  {post.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <Link
                href={`/profile/${post.author.id}`}
                className="font-medium hover:text-[var(--primary)] transition-colors"
              >
                {post.author.name}
              </Link>
              {post.author.headline && (
                <p className="text-sm text-[var(--muted-foreground)] line-clamp-1">
                  {post.author.headline}
                </p>
              )}
              <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-2 mt-0.5">
                <Clock className="w-3 h-3" />
                {timeAgo}
                {post.isPinned && (
                  <span className="flex items-center gap-1 text-amber-500">
                    <Pin className="w-3 h-3" />
                    Pinned
                  </span>
                )}
              </p>
            </div>
          </div>

          {canEdit && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-10">
                  <Link
                    href={`/community/projects/${projectSlug}/research/${post.id}/edit`}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  {isAdmin && (
                    <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[var(--muted)] transition-colors">
                      <Pin className="w-4 h-4" />
                      {post.isPinned ? 'Unpin' : 'Pin'}
                    </button>
                  )}
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        {/* Heading */}
        <Link
          href={`/community/projects/${projectSlug}/research/${post.id}`}
          className="block"
        >
          <h2 className="text-xl font-semibold mb-3 hover:text-[var(--primary)] transition-colors">
            {post.heading}
          </h2>
        </Link>

        {/* Summary */}
        <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
          <p className="text-[var(--foreground)]/90 whitespace-pre-wrap">
            {post.summary}
          </p>
        </div>

        {/* Source Link */}
        {post.sourceUrl && (
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-[var(--muted)]/50 border border-[var(--border)] rounded-lg hover:border-[var(--primary)]/50 transition-colors mb-4"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-1">
                {post.sourceTitle || 'View Source'}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] line-clamp-1">
                {new URL(post.sourceUrl).hostname}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--muted-foreground)]" />
          </a>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {post.viewCount}
          </span>
          <Link
            href={`/community/projects/${projectSlug}/research/${post.id}#comments`}
            className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {post._count.comments}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-lg transition-colors ${
              bookmarked
                ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                : 'hover:bg-[var(--muted)]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

// Compact card version for lists
export function ResearchPostCard({
  post,
  projectSlug
}: {
  post: ResearchPostData
  projectSlug: string
}) {
  const timeAgo = getTimeAgo(new Date(post.createdAt))

  return (
    <Link
      href={`/community/projects/${projectSlug}/research/${post.id}`}
      className="block p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 transition-colors"
    >
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-[var(--primary)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {post.isPinned && (
              <Pin className="w-3 h-3 text-amber-500" />
            )}
            <h3 className="font-medium line-clamp-1">{post.heading}</h3>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-2">
            {post.summary}
          </p>
          <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
            <span>{post.author.name}</span>
            <span>{timeAgo}</span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {post._count.comments}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString()
}

export default ResearchPost
