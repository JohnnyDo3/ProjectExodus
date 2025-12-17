'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MessageSquare,
  Pin,
  Lock,
  Clock,
  MessageCircle,
  Eye,
  Search,
  Plus,
  Filter,
  SortAsc
} from 'lucide-react'

interface Discussion {
  id: string
  title: string
  content: string
  isPinned: boolean
  isLocked: boolean
  viewCount: number
  author: {
    id: string
    name: string
    image?: string
  }
  _count: {
    replies: number
  }
  createdAt: Date
  updatedAt: Date
}

interface DiscussionListProps {
  projectSlug: string
  discussions: Discussion[]
  canCreateDiscussion: boolean
  className?: string
}

type SortOption = 'newest' | 'oldest' | 'mostReplies' | 'mostViewed'
type FilterOption = 'all' | 'pinned' | 'unanswered'

export function DiscussionList({
  projectSlug,
  discussions,
  canCreateDiscussion,
  className = ''
}: DiscussionListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')

  // Filter and sort discussions
  const filteredDiscussions = discussions
    .filter(d => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return d.title.toLowerCase().includes(query) ||
               d.content.toLowerCase().includes(query) ||
               d.author.name.toLowerCase().includes(query)
      }
      return true
    })
    .filter(d => {
      // Category filter
      if (filterBy === 'pinned') return d.isPinned
      if (filterBy === 'unanswered') return d._count.replies === 0
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'mostReplies':
          return b._count.replies - a._count.replies
        case 'mostViewed':
          return b.viewCount - a.viewCount
        default: // newest
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  // Separate pinned discussions
  const pinnedDiscussions = filteredDiscussions.filter(d => d.isPinned)
  const regularDiscussions = filteredDiscussions.filter(d => !d.isPinned)

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Discussions</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            {discussions.length} discussion{discussions.length !== 1 ? 's' : ''}
          </p>
        </div>
        {canCreateDiscussion && (
          <Link
            href={`/community/projects/${projectSlug}/discussions/new`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Discussion
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as FilterOption)}
            className="px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          >
            <option value="all">All</option>
            <option value="pinned">Pinned</option>
            <option value="unanswered">Unanswered</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostReplies">Most Replies</option>
            <option value="mostViewed">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-3">
        {/* Pinned Discussions */}
        {pinnedDiscussions.length > 0 && filterBy !== 'pinned' && (
          <div className="mb-4">
            <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase mb-2 flex items-center gap-1">
              <Pin className="w-3 h-3" />
              Pinned
            </p>
            {pinnedDiscussions.map((discussion, index) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                projectSlug={projectSlug}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Regular or All Discussions */}
        {(filterBy === 'pinned' ? pinnedDiscussions : regularDiscussions).map((discussion, index) => (
          <DiscussionCard
            key={discussion.id}
            discussion={discussion}
            projectSlug={projectSlug}
            index={index + pinnedDiscussions.length}
          />
        ))}

        {filteredDiscussions.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 mx-auto text-[var(--muted-foreground)]/50 mb-4" />
            <p className="text-[var(--muted-foreground)]">
              {searchQuery ? 'No discussions match your search' : 'No discussions yet'}
            </p>
            {canCreateDiscussion && !searchQuery && (
              <Link
                href={`/community/projects/${projectSlug}/discussions/new`}
                className="inline-block mt-4 text-[var(--primary)] hover:underline"
              >
                Start the first discussion
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface DiscussionCardProps {
  discussion: Discussion
  projectSlug: string
  index: number
}

function DiscussionCard({ discussion, projectSlug, index }: DiscussionCardProps) {
  const timeAgo = getTimeAgo(new Date(discussion.createdAt))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/community/projects/${projectSlug}/discussions/${discussion.id}`}
        className="block p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 transition-colors"
      >
        <div className="flex gap-4">
          {/* Author Avatar */}
          <div className="flex-shrink-0">
            {discussion.author.image ? (
              <img
                src={discussion.author.image}
                alt={discussion.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <span className="text-sm font-medium text-[var(--primary)]">
                  {discussion.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium line-clamp-1 flex items-center gap-2">
                {discussion.isPinned && (
                  <Pin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                )}
                {discussion.isLocked && (
                  <Lock className="w-4 h-4 text-[var(--muted-foreground)] flex-shrink-0" />
                )}
                {discussion.title}
              </h3>
            </div>

            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mt-1">
              {discussion.content.slice(0, 150)}...
            </p>

            <div className="flex items-center gap-4 mt-3 text-xs text-[var(--muted-foreground)]">
              <span>{discussion.author.name}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeAgo}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {discussion._count.replies} replies
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {discussion.viewCount} views
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
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
  return date.toLocaleDateString()
}

export default DiscussionList
