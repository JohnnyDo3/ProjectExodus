'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Guardian archetype colors (matching the business card themes)
const archetypeColors: Record<string, { gradient: string; glow: string }> = {
  GUARDIAN_OF_COURAGE: {
    gradient: 'from-red-500 via-orange-500 to-amber-500',
    glow: 'shadow-red-500/30',
  },
  GUARDIAN_OF_TRANSCENDENCE: {
    gradient: 'from-sky-400 via-blue-500 to-cyan-500',
    glow: 'shadow-sky-500/30',
  },
  GUARDIAN_OF_NATURE: {
    gradient: 'from-emerald-400 via-teal-500 to-green-500',
    glow: 'shadow-emerald-500/30',
  },
  GUARDIAN_OF_WISDOM: {
    gradient: 'from-amber-400 via-yellow-500 to-orange-400',
    glow: 'shadow-amber-500/30',
  },
  GUARDIAN_OF_HUMANITY: {
    gradient: 'from-pink-400 via-rose-500 to-red-400',
    glow: 'shadow-pink-500/30',
  },
  GUARDIAN_OF_TEMPERANCE: {
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    glow: 'shadow-violet-500/30',
  },
  GUARDIAN_OF_JUSTICE: {
    gradient: 'from-indigo-400 via-blue-600 to-purple-500',
    glow: 'shadow-indigo-500/30',
  },
}

const defaultColors = {
  gradient: 'from-slate-400 via-slate-500 to-slate-600',
  glow: 'shadow-slate-500/30',
}

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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Fetch leaderboard data
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/gamification/leaderboard?type=all-time&limit=10')
        const data = await res.json()

        if (data.success && data.data?.leaderboard) {
          // Shuffle the leaderboard
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

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || users.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % users.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, users.length])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + users.length) % users.length)
  }, [users.length])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % users.length)
  }, [users.length])

  if (isLoading) {
    return (
      <div className="h-32 flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-6 text-[var(--muted-foreground)] text-sm">
        Be the first to join the leaderboard!
      </div>
    )
  }

  // Show 3 cards at a time on desktop
  const visibleUsers = []
  for (let i = -1; i <= 1; i++) {
    const index = (activeIndex + i + users.length) % users.length
    visibleUsers.push({ ...users[index], offset: i })
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-[var(--foreground)]" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-[var(--foreground)]" />
      </button>

      {/* Carousel container */}
      <div className="overflow-hidden px-10">
        <div className="flex items-center justify-center gap-3 h-36">
          <AnimatePresence mode="popLayout">
            {visibleUsers.map((user) => {
              const colors = user.guardianArchetype
                ? archetypeColors[user.guardianArchetype] || defaultColors
                : defaultColors

              const isCenter = user.offset === 0

              return (
                <motion.div
                  key={`${user.userId}-${user.offset}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.6,
                    scale: isCenter ? 1 : 0.85,
                    zIndex: isCenter ? 10 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <Link href={`/profile/${user.userId}`}>
                    <motion.div
                      className={`relative bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 w-28 cursor-pointer shadow-lg ${colors.glow}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      animate={
                        isCenter
                          ? {
                              boxShadow: [
                                '0 4px 20px rgba(0,0,0,0.1)',
                                '0 8px 30px rgba(0,0,0,0.15)',
                                '0 4px 20px rgba(0,0,0,0.1)',
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {/* Avatar */}
                      <div className="relative mx-auto mb-2">
                        <motion.div
                          className={`w-14 h-14 rounded-lg bg-gradient-to-br ${colors.gradient} p-0.5`}
                          animate={
                            isCenter
                              ? {
                                  rotate: [0, 2, 0, -2, 0],
                                }
                              : {}
                          }
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {user.image ? (
                            <img
                              src={user.image}
                              alt=""
                              className="w-full h-full rounded-md object-cover"
                            />
                          ) : (
                            <div className="w-full h-full rounded-md bg-[var(--card)] flex items-center justify-center">
                              <span className="text-lg font-semibold text-[var(--foreground)]">
                                {user.name?.[0]?.toUpperCase() || '?'}
                              </span>
                            </div>
                          )}
                        </motion.div>

                        {/* Guardian badge */}
                        {user.guardianArchetype && (
                          <motion.div
                            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
                            animate={
                              isCenter
                                ? {
                                    scale: [1, 1.1, 1],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            <Shield className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>

                      {/* Name */}
                      <div className="text-center">
                        <div className="text-xs font-medium text-[var(--foreground)] truncate">
                          {user.name || 'Anonymous'}
                        </div>

                        {/* Level & Points */}
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <TrendingUp className="w-3 h-3 text-[var(--muted-foreground)]" />
                          <span className="text-[10px] text-[var(--muted-foreground)]">
                            Lvl {user.level}
                          </span>
                        </div>
                      </div>

                      {/* Rank badge for center card */}
                      {isCenter && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring' }}
                        >
                          <span className="text-[10px] font-bold text-white">
                            #{user.rank}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {users.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="w-1.5 h-1.5 rounded-full bg-[var(--muted-foreground)]"
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
