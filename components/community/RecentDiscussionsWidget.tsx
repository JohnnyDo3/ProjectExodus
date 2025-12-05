'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, ChevronRight, Heart, MessageCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Discussion {
  id: string
  content: string
  createdAt: Date | string
  user: {
    id: string
    name: string | null
    image: string | null
  }
  _count: {
    comments: number
    likes: number
  }
  isLiked?: boolean
}

interface Props {
  initialDiscussions: Discussion[]
}

export function RecentDiscussionsWidget({ initialDiscussions }: Props) {
  const [filter, setFilter] = useState<'newest' | 'oldest' | 'popular'>('newest')
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions)

  useEffect(() => {
    const sorted = [...initialDiscussions]
    if (filter === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (filter === 'oldest') {
      sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else if (filter === 'popular') {
      sorted.sort((a, b) => (b._count.likes + b._count.comments) - (a._count.likes + a._count.comments))
    }
    setDiscussions(sorted)
  }, [filter, initialDiscussions])

  function getTimeAgo(dateString: Date | string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-[var(--card)] rounded-3xl border-4 border-theme-accent/30 shadow-lg overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <div className="p-5 border-b border-[var(--border)] relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--foreground)]">Open Discussions</h2>
              <p className="text-xs font-semibold text-theme-muted">Join the conversation</p>
            </div>
          </div>
          <Link href="/community/feed">
            <Button variant="ghost" size="sm" className="font-bold text-sm rounded-full hover:bg-[var(--muted)]">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mt-4">
          {[
            { id: 'newest', label: 'Newest' },
            { id: 'oldest', label: 'Oldest' },
            { id: 'popular', label: 'Popular' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                filter === tab.id
                  ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 text-white shadow-md'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions Grid */}
      <div className="p-5">
        {discussions.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
            <p className="text-sm font-bold text-theme-muted">No discussions yet</p>
            <p className="text-xs font-medium text-theme-muted mt-1">Be the first to start a conversation!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {discussions.map((discussion, index) => (
              <Link key={discussion.id} href={`/community/discussions/${discussion.id}`}>
                <div className={`group relative p-4 rounded-2xl transition-all hover:shadow-lg cursor-pointer border-2 border-transparent hover:border-theme-accent/30 h-full ${
                  index === 0 ? 'bg-gradient-to-br from-[var(--accent)]/5 to-[var(--accent)]/10' : 'bg-[var(--muted)]/50 hover:bg-[var(--muted)]'
                }`}>
                  {/* Featured badge for first item */}
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 rounded-full shadow-md">
                      <span className="text-[9px] font-black text-white uppercase">Latest</span>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {discussion.user.image ? (
                        <img
                          src={discussion.user.image}
                          alt={discussion.user.name || 'User'}
                          className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                          <span className="text-sm font-bold text-white">{discussion.user.name?.[0]?.toUpperCase() || '?'}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-[var(--foreground)] line-clamp-2 leading-snug group-hover:text-theme-accent transition-colors">
                        {discussion.content.substring(0, 120)}{discussion.content.length > 120 ? '...' : ''}
                      </p>
                      <p className="text-xs font-semibold text-theme-muted mt-1.5">
                        {discussion.user.name || 'Anonymous'} • {getTimeAgo(discussion.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[var(--border)]">
                    <div className={`flex items-center gap-1.5 ${discussion.isLiked ? 'text-red-500' : 'text-theme-muted'}`}>
                      <Heart className={`w-3.5 h-3.5 ${discussion.isLiked ? 'fill-red-500' : ''}`} />
                      <span className="text-xs font-bold">{discussion._count.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-theme-muted">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">{discussion._count.comments}</span>
                    </div>
                    <div className="ml-auto">
                      <ChevronRight className="w-4 h-4 text-theme-muted group-hover:text-theme-accent group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
