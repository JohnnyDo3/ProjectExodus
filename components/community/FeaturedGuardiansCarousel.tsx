'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

// Guardian archetype colors (matching the business card themes)
const archetypeColors: Record<string, { gradient: string; glow: string }> = {
  GUARDIAN_OF_COURAGE: { gradient: 'from-red-500 via-orange-500 to-amber-500', glow: 'shadow-red-500/20' },
  GUARDIAN_OF_TRANSCENDENCE: { gradient: 'from-sky-400 via-blue-500 to-cyan-500', glow: 'shadow-sky-500/20' },
  GUARDIAN_OF_NATURE: { gradient: 'from-emerald-400 via-teal-500 to-green-500', glow: 'shadow-emerald-500/20' },
  GUARDIAN_OF_WISDOM: { gradient: 'from-amber-400 via-yellow-500 to-orange-400', glow: 'shadow-amber-500/20' },
  GUARDIAN_OF_HUMANITY: { gradient: 'from-pink-400 via-rose-500 to-red-400', glow: 'shadow-pink-500/20' },
  GUARDIAN_OF_TEMPERANCE: { gradient: 'from-violet-400 via-purple-500 to-fuchsia-500', glow: 'shadow-violet-500/20' },
  GUARDIAN_OF_JUSTICE: { gradient: 'from-indigo-400 via-blue-600 to-purple-500', glow: 'shadow-indigo-500/20' },
}

const defaultColors = { gradient: 'from-slate-400 via-slate-500 to-slate-600', glow: 'shadow-slate-500/20' }

interface LeaderboardUser {
  userId: string
  name: string | null
  image: string | null
  guardianArchetype: string | null
  points: number
  level: number
  rank: number
}

// Shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function FeaturedGuardiansCarousel() {
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // Fetch leaderboard data
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/gamification/leaderboard?type=all-time&limit=10')
        const data = await res.json()

        if (data.success && data.data?.leaderboard) {
          const shuffled = shuffleArray<LeaderboardUser>(data.data.leaderboard)
          setUsers(shuffled)
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  // Auto-advance through users
  useEffect(() => {
    if (users.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % users.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [users.length])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Users className="w-6 h-6 mx-auto mb-1 text-[var(--muted-foreground)] opacity-50" />
          <p className="text-[10px] text-[var(--muted-foreground)]">Be the first!</p>
        </div>
      </div>
    )
  }

  // Show 3 profile cards in a row, cycling through
  const visibleUsers = []
  for (let i = 0; i < Math.min(3, users.length); i++) {
    const index = (activeIndex + i) % users.length
    visibleUsers.push({ ...users[index], position: i })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Profile cards grid */}
      <div className="flex-1 flex items-center justify-center gap-2 px-1">
        <AnimatePresence mode="popLayout">
          {visibleUsers.map((user) => {
            const colors = user.guardianArchetype
              ? archetypeColors[user.guardianArchetype] || defaultColors
              : defaultColors
            const isCenter = user.position === 1 || users.length < 3

            return (
              <motion.div
                key={`${user.userId}-${user.position}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{
                  opacity: isCenter ? 1 : 0.7,
                  scale: isCenter ? 1 : 0.9,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex-1 max-w-[100px]"
              >
                <Link href={`/profile/${user.userId}`}>
                  <motion.div
                    className={`bg-[var(--card)] border border-[var(--border)] rounded-lg p-2 shadow-md ${colors.glow} cursor-pointer`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    animate={isCenter ? {
                      boxShadow: ['0 2px 10px rgba(0,0,0,0.1)', '0 4px 15px rgba(0,0,0,0.15)', '0 2px 10px rgba(0,0,0,0.1)'],
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {/* Avatar with gradient border */}
                    <div className="relative mx-auto mb-1.5">
                      <motion.div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.gradient} p-0.5 mx-auto`}
                        animate={isCenter ? { rotate: [0, 2, 0, -2, 0] } : {}}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        {user.image ? (
                          <img
                            src={user.image}
                            alt=""
                            className="w-full h-full rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-md bg-[var(--card)] flex items-center justify-center">
                            <span className="text-sm font-semibold text-[var(--foreground)]">
                              {user.name?.[0]?.toUpperCase() || '?'}
                            </span>
                          </div>
                        )}
                      </motion.div>

                      {/* Guardian badge */}
                      {user.guardianArchetype && (
                        <motion.div
                          className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
                          animate={isCenter ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Shield className="w-2 h-2 text-white" />
                        </motion.div>
                      )}

                      {/* Rank badge */}
                      <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-[var(--primary)] flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">#{user.rank}</span>
                      </div>
                    </div>

                    {/* Name */}
                    <p className="text-[10px] font-medium text-[var(--foreground)] text-center truncate">
                      {user.name || 'Anonymous'}
                    </p>

                    {/* Level & Points */}
                    <div className="flex items-center justify-center gap-1 mt-0.5">
                      <TrendingUp className="w-2 h-2 text-[var(--muted-foreground)]" />
                      <span className="text-[8px] text-[var(--muted-foreground)]">
                        Lvl {user.level}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1 py-2">
        {users.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="w-1 h-1 rounded-full bg-[var(--muted-foreground)]"
            animate={{
              scale: index === activeIndex ? 1.5 : 1,
              opacity: index === activeIndex ? 1 : 0.3,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}
