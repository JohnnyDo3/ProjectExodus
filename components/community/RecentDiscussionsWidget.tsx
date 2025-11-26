'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, ChevronRight } from 'lucide-react'
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
}

interface Props {
  initialDiscussions: Discussion[]
}

export function RecentDiscussionsWidget({ initialDiscussions }: Props) {
  const [filter, setFilter] = useState<'newest' | 'oldest'>('newest')
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions)

  useEffect(() => {
    const sorted = [...initialDiscussions]
    if (filter === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else {
      sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    setDiscussions(sorted)
  }, [filter, initialDiscussions])

  return (
    <div className="p-5 bg-[var(--card)] rounded-3xl border-3 border-theme-accent/40 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-base font-black text-[var(--foreground)]">Recent Discussions</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <button
              onClick={() => setFilter('newest')}
              className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors ${
                filter === 'newest'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setFilter('oldest')}
              className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors ${
                filter === 'oldest'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
              }`}
            >
              Oldest
            </button>
          </div>
          <Link href="/community/feed">
            <Button variant="ghost" size="sm" className="font-bold text-xs rounded-full hover:bg-[var(--muted)]">
              View all <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {discussions.map((discussion) => (
          <Link key={discussion.id} href="/community/feed">
            <div className="p-4 bg-[var(--muted)]/50 rounded-2xl hover:bg-[var(--muted)] transition-all hover:shadow-md cursor-pointer border-2 border-transparent hover:border-theme-accent/30 h-full">
              <div className="flex items-start gap-2.5 mb-2">
                {discussion.user.image ? (
                  <img src={discussion.user.image} alt={discussion.user.name || 'User'} className="w-7 h-7 rounded-full flex-shrink-0" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-white">{discussion.user.name?.[0]?.toUpperCase() || '?'}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[var(--foreground)] mb-1 line-clamp-2">
                    {discussion.content.substring(0, 100)}{discussion.content.length > 100 ? '...' : ''}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-theme-muted">
                <span>{discussion.user.name || 'Anonymous'}</span>
                <div className="flex items-center gap-2">
                  <span><span title="Likes">❤️</span> {discussion._count.likes}</span>
                  <span><span title="Comments">💬</span> {discussion._count.comments}</span>
                  <span className="px-2 py-0.5 bg-theme-accent/20 text-theme-accent rounded-full">
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
