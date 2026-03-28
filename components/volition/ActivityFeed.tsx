'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  MessageCircle,
  Briefcase,
  UserPlus,
  BookOpen,
  Loader2,
} from 'lucide-react'

interface FeedItem {
  id: string
  type: 'article' | 'post' | 'project' | 'follower' | 'learning'
  title: string
  author: { name: string | null; image: string | null }
  createdAt: string
  href: string
}

const typeIcons: Record<FeedItem['type'], typeof FileText> = {
  article: FileText,
  post: MessageCircle,
  project: Briefcase,
  follower: UserPlus,
  learning: BookOpen,
}

const typeLabels: Record<FeedItem['type'], string> = {
  article: 'Published an article',
  post: 'Shared a post',
  project: 'Created a project',
  follower: 'New follower',
  learning: 'Learning milestone',
}

function formatRelativeTime(dateStr: string): string {
  const now = Date.now()
  const date = new Date(dateStr).getTime()
  const diff = now - date
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return new Date(dateStr).toLocaleDateString()
}

function getInitial(name: string | null): string {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
}

const avatarColors = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
  '#3b82f6',
]

function getAvatarColor(name: string | null): string {
  if (!name) return avatarColors[0]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

function SkeletonItem() {
  return (
    <div style={{ display: 'flex', gap: '12px', padding: '14px 16px' }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'var(--muted)',
          flexShrink: 0,
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: 12,
            width: '40%',
            background: 'var(--muted)',
            borderRadius: 4,
            marginBottom: 8,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: 14,
            width: '80%',
            background: 'var(--muted)',
            borderRadius: 4,
            marginBottom: 6,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: 10,
            width: '25%',
            background: 'var(--muted)',
            borderRadius: 4,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}

export function ActivityFeed() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch('/api/users/activity-feed')
        if (!res.ok) throw new Error('Failed to load feed')
        const json = await res.json()
        if (json.success) {
          setItems(json.data)
        } else {
          throw new Error(json.error || 'Unknown error')
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchFeed()
  }, [])

  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border)',
          fontWeight: 600,
          fontSize: 15,
          color: 'var(--foreground)',
        }}
      >
        Activity Feed
      </div>

      {/* Feed content */}
      <div
        style={{
          maxHeight: 520,
          overflowY: 'auto',
        }}
      >
        {loading && (
          <>
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </>
        )}

        {!loading && error && (
          <div
            style={{
              padding: '32px 16px',
              textAlign: 'center',
              color: 'var(--muted-foreground, var(--muted))',
              fontSize: 14,
            }}
          >
            Something went wrong. Please try again later.
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div
            style={{
              padding: '40px 24px',
              textAlign: 'center',
              color: 'var(--muted-foreground, var(--muted))',
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            No recent activity from your network. Follow people to see their
            updates here!
          </div>
        )}

        {!loading &&
          !error &&
          items.map((item) => {
            const Icon = typeIcons[item.type]
            const label = typeLabels[item.type]
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '14px 16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderBottom: '1px solid var(--border)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    'var(--muted, rgba(128,128,128,0.08))')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'transparent')
                }
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: item.author.image
                      ? `url(${item.author.image}) center/cover`
                      : getAvatarColor(item.author.name),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {!item.author.image && getInitial(item.author.name)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Author + type label */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 2,
                      fontSize: 12,
                      color: 'var(--muted-foreground, var(--muted))',
                    }}
                  >
                    <Icon size={13} style={{ flexShrink: 0 }} />
                    <span
                      style={{
                        fontWeight: 600,
                        color: 'var(--foreground)',
                      }}
                    >
                      {item.author.name || 'Anonymous'}
                    </span>
                    <span>&middot;</span>
                    <span>{label}</span>
                  </div>

                  {/* Title / preview */}
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--foreground)',
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.title}
                  </div>

                  {/* Timestamp */}
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--muted-foreground, var(--muted))',
                      marginTop: 4,
                    }}
                  >
                    {formatRelativeTime(item.createdAt)}
                  </div>
                </div>
              </Link>
            )
          })}
      </div>

      {/* Pulse animation for skeletons */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  )
}
