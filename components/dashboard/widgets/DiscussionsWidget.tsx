'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MessageCircle, Plus, Edit2, Trash2 } from 'lucide-react'
import { WidgetWrapper } from '../WidgetWrapper'

interface DeckCard {
  id: string
  title: string
  subtitle?: string
  date?: Date
}

interface DiscussionsWidgetProps {
  feedPosts: any[]
  userId?: string
  onRemove?: () => void
  filter?: string
  onFilterChange?: (filter: string) => void
  onDeletePost?: (id: string) => void
}

export function DiscussionsWidget({
  feedPosts,
  userId,
  onRemove,
  filter = 'recent',
  onFilterChange,
  onDeletePost,
}: DiscussionsWidgetProps) {
  const router = useRouter()
  const [discussionCards, setDiscussionCards] = useState<DeckCard[]>([])

  useEffect(() => {
    if (feedPosts.length > 0) {
      let sortedPosts = [...feedPosts]

      // Apply filter
      if (filter === 'recent' || filter === 'oldest') {
        sortedPosts.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          return filter === 'recent' ? dateB - dateA : dateA - dateB
        })
      } else if (filter === 'popular') {
        sortedPosts.sort((a, b) => {
          const popularityA = (a._count?.likes || 0) + (a._count?.comments || 0)
          const popularityB = (b._count?.likes || 0) + (b._count?.comments || 0)
          return popularityB - popularityA
        })
      }

      const cards: DeckCard[] = sortedPosts.map(post => ({
        id: post.id,
        title: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''),
        subtitle: `${post._count?.likes || 0} likes • ${post._count?.comments || 0} comments`,
        date: new Date(post.createdAt),
      }))
      setDiscussionCards(cards)
    } else {
      setDiscussionCards([])
    }
  }, [feedPosts, filter])

  const handleEditDiscussion = (id: string) => {
    router.push(`/community/discussions/${id}?edit=true`)
  }

  const filterButtons = (
    <div className="flex gap-1">
      {['recent', 'oldest', 'popular'].map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange?.(f)}
          className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
            filter === f
              ? 'bg-[var(--primary)] text-white'
              : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )

  return (
    <WidgetWrapper
      id="discussions"
      title="My Feed Posts"
      icon={MessageCircle}
      theme="primary"
      onRemove={onRemove}
      showRemove={!!onRemove}
      headerActions={
        <Link href="/community/feed">
          <button className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--accent)] transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </Link>
      }
    >
      <div className="flex flex-col h-full">
        {/* Filters */}
        <div className="px-3 py-2 border-b border-[var(--border)]">
          {filterButtons}
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {discussionCards.map(card => (
            <div key={card.id} className="relative group">
              <Link href={`/community/discussions/${card.id}`}>
                <div className="p-2.5 bg-gradient-to-br from-[var(--primary)]/5 to-transparent border border-[var(--primary)]/20 rounded-lg cursor-pointer hover:shadow-sm transition-all">
                  <h3 className="text-sm font-medium text-[var(--foreground)] line-clamp-2 pr-8">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <p className="text-xs text-[var(--foreground)]/60 mt-1">{card.subtitle}</p>
                  )}
                  {card.date && (
                    <p className="text-[10px] text-[var(--foreground)]/40 mt-1">
                      {card.date.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
              {/* Owner actions */}
              <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleEditDiscussion(card.id)
                  }}
                  className="w-5 h-5 bg-[var(--primary)] text-white rounded hover:bg-[var(--accent)] transition-colors flex items-center justify-center"
                  title="Edit"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDeletePost?.(card.id)
                  }}
                  className="w-5 h-5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                  title="Delete"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          ))}
          {discussionCards.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-10 h-10 text-[var(--foreground)]/20 mx-auto mb-2" />
              <p className="text-sm font-medium text-[var(--foreground)]/50">No posts yet</p>
              <Link href="/community/feed">
                <button className="mt-3 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-xs font-medium hover:bg-[var(--accent)] transition-colors">
                  Create Post
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  )
}
