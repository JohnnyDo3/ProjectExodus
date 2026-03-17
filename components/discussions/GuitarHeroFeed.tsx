'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Activity, Zap, TrendingUp, Hash } from 'lucide-react'
import Link from 'next/link'
import type { ActivityItem } from './ActivityCard'
import { GuitarHeroNote, LANE_CONFIG, getLaneCategory } from './GuitarHeroNote'
import { NoteOverlay } from './NoteOverlay'

// ── Types ──────────────────────────────────────────────────────────────────

interface HubData {
  items: ActivityItem[]
  categoryCounts: Record<string, number>
  hourlyActivity: number[]
  trending: { tag: string; count: number }[]
  totalActivity: number
  weeklyActivity: number
  latestAt: string | null
}

interface ActiveNote {
  id: string
  item: ActivityItem
  laneCategory: string
  key: number // unique key for React
}

interface SplashEffect {
  id: number
  lane: number
  color: string
}

// ── Constants ──────────────────────────────────────────────────────────────

const LANE_NAMES = ['Posts', 'Articles', 'Projects', 'Events', 'Members', 'Discussions', 'Stats', 'Network']
const LANE_KEYS = ['posts', 'articles', 'projects', 'events', 'members', 'discussions', 'stats', 'network']
const NOTE_FALL_DURATION = 12 // seconds to fall from top to bottom
const NOTE_SPAWN_INTERVAL = 2500 // ms between spawning notes
const REFETCH_THRESHOLD = 5 // refetch when queue has fewer items

// ── Component ──────────────────────────────────────────────────────────────

export function GuitarHeroFeed() {
  const { data: session } = useSession()
  const [hubData, setHubData] = useState<HubData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeNotes, setActiveNotes] = useState<ActiveNote[]>([])
  const [splashes, setSplashes] = useState<SplashEffect[]>([])
  const [totalSplashed, setTotalSplashed] = useState(0)
  const [streak, setStreak] = useState(0)
  const [combo, setCombo] = useState(0)
  const [selectedItem, setSelectedItem] = useState<{ item: import('./ActivityCard').ActivityItem; lane: string } | null>(null)

  const queueRef = useRef<ActivityItem[]>([])
  const noteKeyRef = useRef(0)
  const splashKeyRef = useRef(0)
  const streakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFetchingRef = useRef(false)

  // ── Data fetching ──────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true
    try {
      const res = await fetch('/api/discussions/hub?limit=80')
      if (!res.ok) return
      const json = await res.json()
      if (json.success) {
        setHubData(json.data)
        // Shuffle all items for variety
        const shuffled = [...json.data.items].sort(() => Math.random() - 0.5)
        queueRef.current = [...queueRef.current, ...shuffled]
      }
    } catch (err) {
      console.error('GH fetch error:', err)
    } finally {
      setIsLoading(false)
      isFetchingRef.current = false
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ── Note spawner ───────────────────────────────────────────────────────

  useEffect(() => {
    if (isLoading || selectedItem) return // Pause spawner when overlay is open

    const interval = setInterval(() => {
      // Refetch if queue is low
      if (queueRef.current.length <= REFETCH_THRESHOLD) {
        fetchData()
      }

      // Pop an item from the queue
      const item = queueRef.current.shift()
      if (!item) return

      const laneCategory = getLaneCategory(item)
      const key = ++noteKeyRef.current

      setActiveNotes(prev => [...prev, { id: item.id, item, laneCategory, key }])
    }, NOTE_SPAWN_INTERVAL)

    return () => clearInterval(interval)
  }, [isLoading, fetchData, selectedItem])

  // ── Splash handler ─────────────────────────────────────────────────────

  const handleSplash = useCallback((noteKey: number, laneCategory: string) => {
    // Remove note
    setActiveNotes(prev => prev.filter(n => n.key !== noteKey))

    // Add splash effect
    const config = LANE_CONFIG[laneCategory] || LANE_CONFIG.posts
    const splashId = ++splashKeyRef.current
    setSplashes(prev => [...prev, { id: splashId, lane: config.lane, color: config.color }])
    setTimeout(() => {
      setSplashes(prev => prev.filter(s => s.id !== splashId))
    }, 800)

    // Update counters
    setTotalSplashed(prev => prev + 1)
    setCombo(prev => prev + 1)

    // Streak: reset after 5s of no splashes
    if (streakTimerRef.current) clearTimeout(streakTimerRef.current)
    setStreak(prev => prev + 1)
    streakTimerRef.current = setTimeout(() => {
      setStreak(0)
      setCombo(0)
    }, 5000)
  }, [])

  // ── Pusher real-time ───────────────────────────────────────────────────

  useEffect(() => {
    let pusherClient: any = null
    let channel: any = null

    async function setupPusher() {
      try {
        const { getPusherClient } = await import('@/lib/pusher')
        pusherClient = getPusherClient()
        if (!pusherClient) return
        channel = pusherClient.subscribe('activity')
        channel.bind('new-activity', (newItem: ActivityItem) => {
          queueRef.current.unshift(newItem)
        })
      } catch {
        // Pusher not configured, rely on refetch
      }
    }
    setupPusher()

    return () => {
      if (channel) channel.unbind_all()
      if (pusherClient) {
        try { pusherClient.unsubscribe('activity') } catch {}
      }
    }
  }, [])

  // ── Loading state ──────────────────────────────────────────────────────

  if (isLoading || !hubData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-ping opacity-30" />
            <div className="absolute inset-2 rounded-full border border-purple-500 animate-ping opacity-30" style={{ animationDelay: '0.3s' }} />
            <Activity className="absolute inset-4 w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-sm font-bold text-white/50 tracking-widest uppercase">Tuning frequencies...</p>
        </div>
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className={`min-h-screen bg-black overflow-hidden relative select-none ${selectedItem ? 'gh-frozen' : ''}`}>
      {/* Background grid */}
      <div className="absolute inset-0 gh-grid-bg opacity-20" />

      {/* ═══ TOP STATS BAR ═══ */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link href="/community" className="text-white/30 hover:text-white/60 transition-colors text-xs font-bold uppercase tracking-wider">
            Community
          </Link>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-black text-white/80 tracking-wide">LIVE FEED</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Combo counter */}
          {combo > 2 && (
            <div className="flex items-center gap-1 animate-pulse">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-black text-yellow-400">{combo}x COMBO</span>
            </div>
          )}

          {/* Activity count */}
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold text-white/50">
              {hubData.totalActivity} total
            </span>
          </div>

          {/* Splash counter */}
          <div className="text-xs font-black text-white/60 tabular-nums">
            {totalSplashed} <span className="text-white/30">played</span>
          </div>

          {/* Trending tags */}
          {hubData.trending.length > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <Hash className="w-3 h-3 text-white/20" />
              {hubData.trending.slice(0, 3).map(t => (
                <span key={t.tag} className="text-[10px] font-bold text-white/30">
                  {t.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ═══ LANE HEADERS ═══ */}
      <div className="relative z-10 flex border-b border-white/5 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {LANE_KEYS.map((key, i) => {
          const config = LANE_CONFIG[key]
          return (
            <div
              key={key}
              className="min-w-[120px] flex-1 text-center py-2 border-r border-white/5 last:border-r-0 flex-shrink-0"
            >
              <span
                className="text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ color: `${config.color}90` }}
              >
                {LANE_NAMES[i]}
              </span>
            </div>
          )
        })}
      </div>

      {/* ═══ THE FRETBOARD (main area) ═══ */}
      <div className="relative flex overflow-x-auto scrollbar-hide" style={{ height: 'calc(100vh - 130px)', scrollbarWidth: 'none' }}>
        {/* Lane columns */}
        {LANE_KEYS.map((key, laneIndex) => {
          const config = LANE_CONFIG[key]
          const laneNotes = activeNotes.filter(n => n.laneCategory === key)
          const laneSplashes = splashes.filter(s => s.lane === laneIndex)

          return (
            <div
              key={key}
              className="min-w-[120px] flex-1 relative border-r border-white/[0.03] last:border-r-0 overflow-hidden flex-shrink-0"
            >
              {/* Lane center line (subtle) */}
              <div
                className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 opacity-[0.04]"
                style={{ background: `linear-gradient(180deg, transparent 0%, ${config.color} 50%, transparent 100%)` }}
              />

              {/* Notes falling in this lane */}
              {laneNotes.map(note => (
                <GuitarHeroNote
                  key={note.key}
                  item={note.item}
                  laneCategory={note.laneCategory}
                  animationDuration={NOTE_FALL_DURATION}
                  onSplash={() => handleSplash(note.key, note.laneCategory)}
                  onSelect={(item, lane) => setSelectedItem({ item, lane })}
                />
              ))}

              {/* Hit zone glow (bottom) */}
              <div className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none">
                <div
                  className="absolute inset-0 gh-hit-zone-glow"
                  style={{
                    background: `linear-gradient(0deg, ${config.color}25 0%, transparent 100%)`,
                  }}
                />
                {/* Hit bar */}
                <div
                  className="absolute bottom-2 left-2 right-2 h-1 rounded-full gh-hit-bar"
                  style={{
                    background: config.color,
                    boxShadow: config.glow,
                  }}
                />
              </div>

              {/* Splash effects */}
              {laneSplashes.map(splash => (
                <div
                  key={splash.id}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                >
                  {/* Central flash */}
                  <div
                    className="w-4 h-4 rounded-full gh-splash-flash"
                    style={{ background: splash.color, boxShadow: `0 0 30px ${splash.color}, 0 0 60px ${splash.color}80` }}
                  />
                  {/* Particle ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(8)].map((_, pi) => (
                      <div
                        key={pi}
                        className="absolute w-1.5 h-1.5 rounded-full gh-splash-particle"
                        style={{
                          background: splash.color,
                          '--particle-angle': `${pi * 45}deg`,
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        })}

        {/* Horizontal hit zone line across all lanes */}
        <div className="absolute bottom-6 left-0 right-0 h-px z-5 pointer-events-none" style={{ background: 'linear-gradient(90deg, #FF6B6B30, #4ECDC430, #45B7D130, #A78BFA30, #F472B630, #FBBF2430, #34D39930, #818CF830)' }} />
      </div>

      {/* ═══ STREAK INDICATOR ═══ */}
      {streak > 5 && (
        <div className="fixed top-20 right-6 z-30 pointer-events-none">
          <div className="text-right animate-pulse">
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
              {streak}
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400/60">
              streak
            </p>
          </div>
        </div>
      )}

      {/* ═══ NOTE PREVIEW OVERLAY ═══ */}
      <NoteOverlay
        item={selectedItem?.item ?? null}
        laneCategory={selectedItem?.lane ?? 'posts'}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}
