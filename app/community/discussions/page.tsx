'use client'

import { useState, useEffect, useCallback } from 'react'
import { BackButton } from '@/components/navigation/BackButton'
import { Button } from '@/components/ui/Button'
import { PulseHeader } from '@/components/discussions/PulseHeader'
import { Archipelago } from '@/components/discussions/Archipelago'
import { ActivityRiver } from '@/components/discussions/ActivityRiver'
import { ConstellationMap } from '@/components/discussions/ConstellationMap'
import type { ActivityItem } from '@/components/discussions/ActivityCard'
import { MessageSquare, Network } from 'lucide-react'
import Link from 'next/link'

type HubView = 'river' | 'constellation'

interface HubData {
  items: ActivityItem[]
  categoryCounts: Record<string, number>
  hourlyActivity: number[]
  trending: { tag: string; count: number }[]
  totalActivity: number
  weeklyActivity: number
  latestAt: string | null
}

const EMPTY_HUB: HubData = {
  items: [],
  categoryCounts: {},
  hourlyActivity: new Array(24).fill(0),
  trending: [],
  totalActivity: 0,
  weeklyActivity: 0,
  latestAt: null,
}

export default function DiscussionsHubPage() {
  const [data, setData] = useState<HubData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [hubView, setHubView] = useState<HubView>('river')
  const [newItems, setNewItems] = useState<Set<string>>(new Set())

  // ── Fetch hub data ─────────────────────────────────────────────────────

  const fetchData = useCallback(async (category?: string) => {
    try {
      const params = new URLSearchParams({ limit: '40' })
      if (category && category !== 'all') {
        params.set('category', category)
      }
      const res = await fetch(`/api/discussions/hub?${params}`)
      if (!res.ok) throw new Error('Failed')
      const json = await res.json()
      if (json.success) {
        setData(json.data)
      } else {
        setData(prev => prev ?? EMPTY_HUB)
      }
    } catch (err) {
      console.error('Hub fetch error:', err)
      setData(prev => prev ?? EMPTY_HUB)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Refetch when category changes
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
    fetchData(category)
  }, [fetchData])

  // ── Pusher real-time ───────────────────────────────────────────────────

  useEffect(() => {
    let pusherClient: any = null
    let channel: any = null

    async function setupPusher() {
      try {
        const { getPusherClient } = await import('@/lib/pusher')
        pusherClient = getPusherClient()
        if (!pusherClient) return

        // Subscribe to a general activity channel
        channel = pusherClient.subscribe('activity')

        channel.bind('new-activity', (newItem: ActivityItem) => {
          setData(prev => {
            if (!prev) return prev
            // Prepend new item, remove dupes, cap at 40
            const filtered = prev.items.filter(i => i.id !== newItem.id)
            const updated = [newItem, ...filtered].slice(0, 40)

            // Recount categories
            const categoryCounts: Record<string, number> = {}
            for (const item of updated) {
              categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
            }

            return {
              ...prev,
              items: updated,
              categoryCounts,
              totalActivity: prev.totalActivity + 1,
            }
          })

          // Mark as new for ripple animation
          setNewItems(prev => new Set(prev).add(newItem.id))
          setTimeout(() => {
            setNewItems(prev => {
              const next = new Set(prev)
              next.delete(newItem.id)
              return next
            })
          }, 2000)
        })
      } catch {
        // Pusher not configured — fall back to polling
        const interval = setInterval(() => fetchData(activeCategory), 30000)
        return () => clearInterval(interval)
      }
    }

    setupPusher()

    return () => {
      if (channel) channel.unbind_all()
      if (pusherClient) {
        try { pusherClient.unsubscribe('activity') } catch {}
      }
    }
  }, [activeCategory, fetchData])

  // ── Loading state ──────────────────────────────────────────────────────

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--primary)] pulse-ring" />
            <div className="absolute inset-4 rounded-full border border-[var(--primary)] pulse-ring" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-8 rounded-full bg-[var(--primary)] opacity-30 pulse-ring" style={{ animationDelay: '1s' }} />
          </div>
          <p className="font-body-serif italic text-sm text-[var(--muted-foreground)]">Tuning into the community pulse...</p>
        </div>
      </div>
    )
  }

  const dateline = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* ═══ MASTHEAD ═══ */}
      <header className="border-b border-[var(--foreground)] bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="mb-4">
            <BackButton label="Back to Community" fallbackUrl="/community" />
          </div>

          <div className="border-t-2 border-b border-[var(--foreground)] py-1 mb-3">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
              <span>Live Hub</span>
              <span>{dateline}</span>
              <span>All Channels</span>
            </div>
          </div>

          <h1 className="font-headline text-center text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.9] text-[var(--foreground)]">
            The Living Pulse
          </h1>
          <p className="font-body-serif italic text-center text-sm text-[var(--muted-foreground)] mt-2 mb-3">
            Every discussion, article, project, and connection — alive in real time
          </p>

          <div className="border-t border-b-2 border-[var(--foreground)] py-1">
            <div className="flex items-center justify-center gap-6 text-[10px] font-bold tracking-wider uppercase text-[var(--muted-foreground)]">
              <span>
                {data.weeklyActivity > 0
                  ? `${data.weeklyActivity} updates this week`
                  : data.latestAt
                    ? `Latest activity: ${new Date(data.latestAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : `${data.totalActivity} total updates`}
              </span>
              {data.trending.length > 0 && (
                <>
                  <span className="text-[var(--border)]">|</span>
                  <span>Trending: #{data.trending[0]?.tag}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ═══ ZONE 1: THE PULSE ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PulseHeader
          totalActivity={data.totalActivity}
          hourlyActivity={data.hourlyActivity}
          tickerItems={data.items.slice(0, 15).map(i => ({
            id: i.id, title: i.title, userName: i.userName, type: i.type,
          }))}
        />
      </section>

      {/* ═══ ZONE 2: THE ARCHIPELAGO ═══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
        <Archipelago
          categoryCounts={data.categoryCounts}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      {/* ═══ VIEW TOGGLE ═══ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHubView('river')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors rounded-full ${
              hubView === 'river'
                ? 'bg-[var(--foreground)] text-[var(--background)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            River
          </button>
          <button
            onClick={() => setHubView('constellation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors rounded-full ${
              hubView === 'constellation'
                ? 'bg-[var(--foreground)] text-[var(--background)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Constellation
          </button>
        </div>

        {data.trending.length > 0 && (
          <div className="hidden sm:flex items-center gap-2">
            {data.trending.slice(0, 4).map(t => (
              <span key={t.tag} className="text-[10px] font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)] cursor-pointer transition-colors">
                #{t.tag}
                <span className="text-[8px] ml-0.5 opacity-60">{t.count}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ═══ ZONE 3 or 4: MAIN CONTENT ═══ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {hubView === 'river' && (
          <ActivityRiver items={data.items} />
        )}

        {hubView === 'constellation' && (
          <ConstellationMap items={data.items} />
        )}
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[var(--foreground)] bg-[var(--muted)]">
        <div className="wave-top bg-[var(--background)] h-6" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="font-headline text-2xl font-black text-[var(--foreground)] mb-2">
            Join the Conversation
          </h2>
          <p className="font-body-serif italic text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">
            Every voice adds to the living pulse of this community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/social">
              <Button className="font-bold text-xs uppercase tracking-wider">
                Share a Post
              </Button>
            </Link>
            <Link href="/community/forum">
              <Button variant="outline" className="font-bold text-xs uppercase tracking-wider">
                Browse Forums
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
