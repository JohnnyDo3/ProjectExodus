'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Activity, Zap, TrendingUp, Hash, Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import type { ActivityItem } from './ActivityCard'
import { GuitarHeroNote, LANE_CONFIG, getLaneCategory } from './GuitarHeroNote'
import { NoteOverlay } from './NoteOverlay'
import { GameModePicker, type GameMode } from './GameModePicker'
import { GameHUD } from './GameHUD'
import { HitFeedback, type HitGrade, type HitFeedbackItem } from './HitFeedback'
import { GameOverModal, type GameStats } from './GameOverModal'

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
  key: number
}

interface SplashEffect {
  id: number
  lane: number
  color: string
}

// ── Constants ──────────────────────────────────────────────────────────────

const LANE_NAMES = ['Posts', 'Articles', 'Projects', 'Events', 'Members', 'Discussions', 'Stats', 'Network']
const LANE_KEYS = ['posts', 'articles', 'projects', 'events', 'members', 'discussions', 'stats', 'network']
const NOTE_FALL_DURATION = 12
const NOTE_SPAWN_INTERVAL = 2500
const REFETCH_THRESHOLD = 5

// Hit zone: notes within this many px from the bottom of the lane are hittable
const HIT_ZONE_PX = 80
const PERFECT_ZONE_PX = 20
const GREAT_ZONE_PX = 45

// Scoring
const SCORE_PERFECT = 300
const SCORE_GREAT = 200
const SCORE_GOOD = 100

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
  const [selectedItem, setSelectedItem] = useState<{ item: ActivityItem; lane: string } | null>(null)

  // ── Game mode state ────────────────────────────────────────────────────
  const [showModePicker, setShowModePicker] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [gameScore, setGameScore] = useState(0)
  const [gameCombo, setGameCombo] = useState(0)
  const [gameHits, setGameHits] = useState(0)
  const [gameMisses, setGameMisses] = useState(0)
  const [gameMaxCombo, setGameMaxCombo] = useState(0)
  const [gameMaxStreak, setGameMaxStreak] = useState(0)
  const [gameStreak, setGameStreak] = useState(0)
  const [gamePerfects, setGamePerfects] = useState(0)
  const [gameGreats, setGameGreats] = useState(0)
  const [gameGoods, setGameGoods] = useState(0)
  const [gameTimeLeft, setGameTimeLeft] = useState<number | null>(null)
  const [gameNotesLeft, setGameNotesLeft] = useState<number | null>(null)
  const [gameNotesPassed, setGameNotesPassed] = useState(0)
  const [hitFeedbacks, setHitFeedbacks] = useState<HitFeedbackItem[]>([])
  const [showGameOver, setShowGameOver] = useState(false)
  const [gameOverStats, setGameOverStats] = useState<GameStats | null>(null)
  const [pressedLanes, setPressedLanes] = useState<Set<number>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [leaderboardRank, setLeaderboardRank] = useState<number | null>(null)

  const queueRef = useRef<ActivityItem[]>([])
  const noteKeyRef = useRef(0)
  const splashKeyRef = useRef(0)
  const streakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFetchingRef = useRef(false)
  const feedbackKeyRef = useRef(0)
  const fretboardRef = useRef<HTMLDivElement>(null)
  const gameStartTimeRef = useRef<number>(0)
  const gameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalNotesForGameRef = useRef(0)

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

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ── Note spawner ───────────────────────────────────────────────────────

  useEffect(() => {
    if (isLoading || selectedItem || countdown !== null) return

    const interval = setInterval(() => {
      if (queueRef.current.length <= REFETCH_THRESHOLD) {
        fetchData()
      }

      const item = queueRef.current.shift()
      if (!item) return

      const laneCategory = getLaneCategory(item)
      const key = ++noteKeyRef.current

      setActiveNotes(prev => [...prev, { id: item.id, item, laneCategory, key }])
    }, NOTE_SPAWN_INTERVAL)

    return () => clearInterval(interval)
  }, [isLoading, fetchData, selectedItem, countdown])

  // ── Passive splash handler (non-game mode) ────────────────────────────

  const handleNoteSplash = useCallback((noteKey: number, laneCategory: string) => {
    if (gameActive) {
      // In game mode: note reached bottom without being hit = MISS
      setActiveNotes(prev => prev.filter(n => n.key !== noteKey))
      setGameMisses(prev => prev + 1)
      setGameCombo(0)
      setGameStreak(0)

      // Track notes for note-count mode
      setGameNotesPassed(prev => prev + 1)

      // Show miss feedback
      const config = LANE_CONFIG[laneCategory] || LANE_CONFIG.posts
      const fbId = ++feedbackKeyRef.current
      setHitFeedbacks(prev => [...prev, { id: fbId, grade: 'miss' as HitGrade, lane: config.lane, color: '#FF4444' }])
      setTimeout(() => setHitFeedbacks(prev => prev.filter(f => f.id !== fbId)), 600)
      return
    }

    // Passive mode: normal splash
    setActiveNotes(prev => prev.filter(n => n.key !== noteKey))

    const config = LANE_CONFIG[laneCategory] || LANE_CONFIG.posts
    const splashId = ++splashKeyRef.current
    setSplashes(prev => [...prev, { id: splashId, lane: config.lane, color: config.color }])
    setTimeout(() => setSplashes(prev => prev.filter(s => s.id !== splashId)), 800)

    setTotalSplashed(prev => prev + 1)
    setCombo(prev => prev + 1)

    if (streakTimerRef.current) clearTimeout(streakTimerRef.current)
    setStreak(prev => prev + 1)
    streakTimerRef.current = setTimeout(() => {
      setStreak(0)
      setCombo(0)
    }, 5000)
  }, [gameActive])

  // ── Game: hit detection ────────────────────────────────────────────────

  const hitLane = useCallback((laneIndex: number) => {
    if (!gameActive || !fretboardRef.current) return

    const laneKey = LANE_KEYS[laneIndex]
    if (!laneKey) return

    // Find notes in this lane
    const laneNotes = activeNotes.filter(n => n.laneCategory === laneKey)
    if (laneNotes.length === 0) {
      // No note in this lane = miss
      setGameMisses(prev => prev + 1)
      setGameCombo(0)
      setGameStreak(0)
      const fbId = ++feedbackKeyRef.current
      setHitFeedbacks(prev => [...prev, { id: fbId, grade: 'miss' as HitGrade, lane: laneIndex, color: '#FF4444' }])
      setTimeout(() => setHitFeedbacks(prev => prev.filter(f => f.id !== fbId)), 600)
      return
    }

    // Get fretboard dimensions
    const fretboardHeight = fretboardRef.current.clientHeight

    // Find the note closest to the hit zone (bottom)
    let bestNote: ActiveNote | null = null
    let bestDistance = Infinity

    for (const note of laneNotes) {
      // Calculate note position based on animation progress
      // Note falls from -140px to (fretboardHeight - 20px) over NOTE_FALL_DURATION seconds
      const noteEl = fretboardRef.current.querySelector(`[data-note-key="${note.key}"]`) as HTMLElement | null
      if (!noteEl) continue

      const noteRect = noteEl.getBoundingClientRect()
      const fretboardRect = fretboardRef.current.getBoundingClientRect()
      const noteBottom = noteRect.bottom - fretboardRect.top
      const distanceFromBottom = fretboardHeight - noteBottom

      if (distanceFromBottom < HIT_ZONE_PX && distanceFromBottom > -20) {
        if (Math.abs(distanceFromBottom) < bestDistance) {
          bestDistance = Math.abs(distanceFromBottom)
          bestNote = note
        }
      }
    }

    if (!bestNote) {
      // No note in hit zone
      setGameMisses(prev => prev + 1)
      setGameCombo(0)
      setGameStreak(0)
      const fbId = ++feedbackKeyRef.current
      setHitFeedbacks(prev => [...prev, { id: fbId, grade: 'miss' as HitGrade, lane: laneIndex, color: '#FF4444' }])
      setTimeout(() => setHitFeedbacks(prev => prev.filter(f => f.id !== fbId)), 600)
      return
    }

    // Determine grade based on distance
    let grade: HitGrade
    let points: number
    if (bestDistance <= PERFECT_ZONE_PX) {
      grade = 'perfect'
      points = SCORE_PERFECT
      setGamePerfects(prev => prev + 1)
    } else if (bestDistance <= GREAT_ZONE_PX) {
      grade = 'great'
      points = SCORE_GREAT
      setGameGreats(prev => prev + 1)
    } else {
      grade = 'good'
      points = SCORE_GOOD
      setGameGoods(prev => prev + 1)
    }

    // Update game state
    const newCombo = gameCombo + 1
    const multiplier = Math.min(Math.floor(newCombo / 5) + 1, 8)
    const earnedPoints = points * multiplier

    setGameScore(prev => prev + earnedPoints)
    setGameCombo(newCombo)
    setGameMaxCombo(prev => Math.max(prev, newCombo))
    setGameHits(prev => prev + 1)
    setGameStreak(prev => {
      const newStreak = prev + 1
      setGameMaxStreak(old => Math.max(old, newStreak))
      return newStreak
    })
    setGameNotesPassed(prev => prev + 1)

    // Remove the hit note
    setActiveNotes(prev => prev.filter(n => n.key !== bestNote!.key))

    // Splash effect
    const config = LANE_CONFIG[bestNote.laneCategory] || LANE_CONFIG.posts
    const splashId = ++splashKeyRef.current
    setSplashes(prev => [...prev, { id: splashId, lane: config.lane, color: config.color }])
    setTimeout(() => setSplashes(prev => prev.filter(s => s.id !== splashId)), 800)

    // Hit feedback
    const fbId = ++feedbackKeyRef.current
    setHitFeedbacks(prev => [...prev, { id: fbId, grade, lane: laneIndex, color: config.color }])
    setTimeout(() => setHitFeedbacks(prev => prev.filter(f => f.id !== fbId)), 600)
  }, [gameActive, activeNotes, gameCombo])

  // ── Keyboard listener ──────────────────────────────────────────────────

  useEffect(() => {
    if (!gameActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyNum = parseInt(e.key)
      if (keyNum >= 1 && keyNum <= 8) {
        e.preventDefault()
        const laneIndex = keyNum - 1
        setPressedLanes(prev => new Set(prev).add(laneIndex))
        hitLane(laneIndex)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyNum = parseInt(e.key)
      if (keyNum >= 1 && keyNum <= 8) {
        setPressedLanes(prev => {
          const next = new Set(prev)
          next.delete(keyNum - 1)
          return next
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameActive, hitLane])

  // ── Game timer (for timed mode) ────────────────────────────────────────

  useEffect(() => {
    if (!gameActive || !gameMode) return

    if (gameMode.type === 'timed') {
      setGameTimeLeft(gameMode.seconds)
      gameTimerRef.current = setInterval(() => {
        setGameTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (gameTimerRef.current) clearInterval(gameTimerRef.current)
      }
    }
  }, [gameActive, gameMode])

  // ── Check note count end condition ─────────────────────────────────────

  useEffect(() => {
    if (!gameActive || !gameMode || gameMode.type !== 'notes') return
    const target = gameMode.count
    setGameNotesLeft(Math.max(0, target - gameNotesPassed))
    if (gameNotesPassed >= target) {
      endGame()
    }
  }, [gameActive, gameMode, gameNotesPassed])

  // ── Game lifecycle ─────────────────────────────────────────────────────

  const startGame = useCallback((mode: GameMode) => {
    setShowModePicker(false)
    setGameMode(mode)

    // Countdown 3-2-1
    setCountdown(3)
    let count = 3
    const countInterval = setInterval(() => {
      count--
      if (count <= 0) {
        clearInterval(countInterval)
        setCountdown(null)

        // Actually start the game
        setGameActive(true)
        setGameScore(0)
        setGameCombo(0)
        setGameHits(0)
        setGameMisses(0)
        setGameMaxCombo(0)
        setGameMaxStreak(0)
        setGameStreak(0)
        setGamePerfects(0)
        setGameGreats(0)
        setGameGoods(0)
        setGameNotesPassed(0)
        setGameNotesLeft(mode.type === 'notes' ? mode.count : null)
        setGameTimeLeft(mode.type === 'timed' ? mode.seconds : null)
        gameStartTimeRef.current = Date.now()
        totalNotesForGameRef.current = 0
      } else {
        setCountdown(count)
      }
    }, 1000)
  }, [])

  const endGame = useCallback(() => {
    setGameActive(false)
    if (gameTimerRef.current) clearInterval(gameTimerRef.current)

    const duration = (Date.now() - gameStartTimeRef.current) / 1000
    const totalAttempts = gameHits + gameMisses
    const accuracy = totalAttempts > 0 ? (gameHits / totalAttempts) * 100 : 0

    const stats: GameStats = {
      score: gameScore,
      hits: gameHits,
      misses: gameMisses,
      maxCombo: gameMaxCombo,
      maxStreak: gameMaxStreak,
      accuracy,
      perfectCount: gamePerfects,
      greatCount: gameGreats,
      goodCount: gameGoods,
      mode: gameMode!,
      duration,
    }

    setGameOverStats(stats)
    setShowGameOver(true)
    setSubmitted(false)
    setLeaderboardRank(null)

    // Submit score to leaderboard
    if (session?.user && gameScore > 0) {
      submitScore(stats)
    }
  }, [gameScore, gameHits, gameMisses, gameMaxCombo, gameMaxStreak, gamePerfects, gameGreats, gameGoods, gameMode, session])

  const submitScore = async (stats: GameStats) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/architecture/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'guitar_hero',
          timeframe: 'all_time',
          gameMode: stats.mode.type === 'endless' ? 'endless' :
                    stats.mode.type === 'timed' ? `timed_${stats.mode.seconds}` :
                    `notes_${stats.mode.count}`,
          score: stats.score,
          metadata: {
            hits: stats.hits,
            misses: stats.misses,
            accuracy: stats.accuracy,
            maxCombo: stats.maxCombo,
            maxStreak: stats.maxStreak,
            perfectCount: stats.perfectCount,
            greatCount: stats.greatCount,
            goodCount: stats.goodCount,
            duration: stats.duration,
          },
        }),
      })
      const data = await res.json()
      if (data.success && data.data?.rank) {
        setLeaderboardRank(data.data.rank)
      }
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit score:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

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
        // Pusher not configured
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

  // ── Computed values ────────────────────────────────────────────────────

  const gameMultiplier = Math.min(Math.floor(gameCombo / 5) + 1, 8)
  const gameTotalAttempts = gameHits + gameMisses
  const gameAccuracy = gameTotalAttempts > 0 ? (gameHits / gameTotalAttempts) * 100 : 100

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
          {/* Game-specific counters (combo, played, streak, Play button) shown
              only on lg+ — the game itself is laptop-only. Mobile keeps the
              ambient passive animation + community stats. */}
          {!gameActive && (
            <>
              {combo > 2 && (
                <div className="hidden lg:flex items-center gap-1 animate-pulse">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-black text-yellow-400">{combo}x COMBO</span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-bold text-white/50">
                  {hubData.totalActivity} total
                </span>
              </div>

              <div className="hidden lg:block text-xs font-black text-white/60 tabular-nums">
                {totalSplashed} <span className="text-white/30">played</span>
              </div>

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
            </>
          )}

          {/* Play button (lg+ only — game is laptop-exclusive) */}
          {!gameActive && countdown === null && !showModePicker && (
            <button
              onClick={() => setShowModePicker(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-black uppercase tracking-wider hover:from-cyan-500/30 hover:to-purple-500/30 transition-all"
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden sm:inline">Play</span>
            </button>
          )}
        </div>
      </div>

      {/* ═══ GAME HUD (only during game) ═══ */}
      {gameActive && gameMode && (
        <GameHUD
          score={gameScore}
          combo={gameCombo}
          multiplier={gameMultiplier}
          accuracy={gameAccuracy}
          hits={gameHits}
          misses={gameMisses}
          mode={gameMode}
          timeLeft={gameTimeLeft}
          notesLeft={gameNotesLeft}
          onStop={endGame}
        />
      )}

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

      {/* ═══ THE FRETBOARD ═══ */}
      <div
        ref={fretboardRef}
        className="relative flex overflow-x-auto scrollbar-hide"
        style={{ height: 'calc(100vh - 130px)', scrollbarWidth: 'none' }}
      >
        {LANE_KEYS.map((key, laneIndex) => {
          const config = LANE_CONFIG[key]
          const laneNotes = activeNotes.filter(n => n.laneCategory === key)
          const laneSplashes = splashes.filter(s => s.lane === laneIndex)
          const laneFeedbacks = hitFeedbacks.filter(f => f.lane === laneIndex)
          const isPressed = pressedLanes.has(laneIndex)

          return (
            <div
              key={key}
              className="min-w-[120px] flex-1 relative border-r border-white/[0.03] last:border-r-0 overflow-hidden flex-shrink-0"
            >
              {/* Lane center line */}
              <div
                className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 opacity-[0.04]"
                style={{ background: `linear-gradient(180deg, transparent 0%, ${config.color} 50%, transparent 100%)` }}
              />

              {/* Lane flash on key press (game mode) */}
              {gameActive && isPressed && (
                <div
                  className="absolute inset-0 z-5 pointer-events-none transition-opacity duration-75"
                  style={{ background: `${config.color}10` }}
                />
              )}

              {/* Notes */}
              {laneNotes.map(note => (
                <GuitarHeroNote
                  key={note.key}
                  item={note.item}
                  laneCategory={note.laneCategory}
                  animationDuration={NOTE_FALL_DURATION}
                  onSplash={() => handleNoteSplash(note.key, note.laneCategory)}
                  onSelect={gameActive ? undefined : (item, lane) => setSelectedItem({ item, lane })}
                  dataKey={note.key}
                />
              ))}

              {/* Hit zone */}
              <div className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none">
                <div
                  className="absolute inset-0 gh-hit-zone-glow"
                  style={{
                    background: `linear-gradient(0deg, ${config.color}25 0%, transparent 100%)`,
                  }}
                />
                <div
                  className="absolute bottom-2 left-2 right-2 h-1 rounded-full gh-hit-bar"
                  style={{
                    background: config.color,
                    boxShadow: isPressed ? `${config.glow}, 0 0 20px ${config.color}` : config.glow,
                    transform: isPressed ? 'scaleY(2)' : 'scaleY(1)',
                    transition: 'transform 0.05s, box-shadow 0.05s',
                  }}
                />
              </div>

              {/* Key indicator (game mode) */}
              {gameActive && (
                <div
                  className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm transition-all duration-75 ${
                    isPressed
                      ? 'scale-90 brightness-150'
                      : 'scale-100'
                  }`}
                  style={{
                    background: isPressed ? config.color : `${config.color}30`,
                    border: `2px solid ${isPressed ? config.color : `${config.color}60`}`,
                    color: isPressed ? '#000' : config.color,
                    boxShadow: isPressed ? `0 0 20px ${config.color}80` : 'none',
                  }}
                >
                  {laneIndex + 1}
                </div>
              )}

              {/* Mobile tap zone (game mode) */}
              {gameActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 z-15 sm:pointer-events-none"
                  onTouchStart={(e) => {
                    e.preventDefault()
                    setPressedLanes(prev => new Set(prev).add(laneIndex))
                    hitLane(laneIndex)
                  }}
                  onTouchEnd={() => {
                    setPressedLanes(prev => {
                      const next = new Set(prev)
                      next.delete(laneIndex)
                      return next
                    })
                  }}
                />
              )}

              {/* Splash effects */}
              {laneSplashes.map(splash => (
                <div
                  key={splash.id}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                >
                  <div
                    className="w-4 h-4 rounded-full gh-splash-flash"
                    style={{ background: splash.color, boxShadow: `0 0 30px ${splash.color}, 0 0 60px ${splash.color}80` }}
                  />
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

              {/* Hit feedback text */}
              <HitFeedback feedbacks={laneFeedbacks} />
            </div>
          )
        })}

        {/* Horizontal hit zone line */}
        <div className="absolute bottom-6 left-0 right-0 h-px z-5 pointer-events-none" style={{ background: 'linear-gradient(90deg, #FF6B6B30, #4ECDC430, #45B7D130, #A78BFA30, #F472B630, #FBBF2430, #34D39930, #818CF830)' }} />
      </div>

      {/* ═══ STREAK INDICATOR (passive mode, lg+ only — game UI is laptop-exclusive) ═══ */}
      {!gameActive && streak > 5 && (
        <div className="hidden lg:block fixed top-20 right-6 z-30 pointer-events-none">
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

      {/* ═══ COUNTDOWN ═══ */}
      {countdown !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-8xl font-black text-white gh-countdown-number" key={countdown}>
              {countdown}
            </p>
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest mt-2">Get Ready</p>
          </div>
        </div>
      )}

      {/* ═══ GAME MODE PICKER ═══ */}
      {showModePicker && (
        <GameModePicker
          onSelect={startGame}
          onCancel={() => setShowModePicker(false)}
        />
      )}

      {/* ═══ GAME OVER MODAL ═══ */}
      {showGameOver && gameOverStats && (
        <GameOverModal
          stats={gameOverStats}
          onClose={() => setShowGameOver(false)}
          onPlayAgain={() => {
            setShowGameOver(false)
            setShowModePicker(true)
          }}
          isSubmitting={isSubmitting}
          submitted={submitted}
          rank={leaderboardRank}
        />
      )}

      {/* ═══ NOTE PREVIEW OVERLAY (passive mode only) ═══ */}
      {!gameActive && (
        <NoteOverlay
          item={selectedItem?.item ?? null}
          laneCategory={selectedItem?.lane ?? 'posts'}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
