'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, Users, Crown } from 'lucide-react'
import Link from 'next/link'

// Guardian archetype colors (matching the business card themes)
const archetypeColors: Record<string, { gradient: string; border: string }> = {
  GUARDIAN_OF_COURAGE: { gradient: 'from-red-500 to-orange-500', border: 'border-red-500/30' },
  GUARDIAN_OF_TRANSCENDENCE: { gradient: 'from-sky-400 to-blue-500', border: 'border-sky-500/30' },
  GUARDIAN_OF_NATURE: { gradient: 'from-emerald-400 to-teal-500', border: 'border-emerald-500/30' },
  GUARDIAN_OF_WISDOM: { gradient: 'from-amber-400 to-yellow-500', border: 'border-amber-500/30' },
  GUARDIAN_OF_HUMANITY: { gradient: 'from-pink-400 to-rose-500', border: 'border-pink-500/30' },
  GUARDIAN_OF_TEMPERANCE: { gradient: 'from-violet-400 to-purple-500', border: 'border-violet-500/30' },
  GUARDIAN_OF_JUSTICE: { gradient: 'from-indigo-400 to-blue-600', border: 'border-indigo-500/30' },
}

const defaultColors = { gradient: 'from-slate-400 to-slate-500', border: 'border-slate-500/30' }

interface LeaderboardUser {
  userId: string
  name: string | null
  image: string | null
  guardianArchetype: string | null
  points: number
  level: number
  rank: number
}

export function FeaturedGuardiansCarousel() {
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch leaderboard data
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/gamification/leaderboard?type=all-time&limit=10')
        const data = await res.json()

        if (data.success && data.data?.leaderboard) {
          setUsers(data.data.leaderboard)
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full"
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
          <Users className="w-5 h-5 mx-auto mb-1 text-[var(--muted-foreground)] opacity-50" />
          <p className="text-[9px] text-[var(--muted-foreground)]">Be the first to join!</p>
        </div>
      </div>
    )
  }

  // Get rank badge color
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { bg: 'bg-amber-500', icon: Crown }
    if (rank === 2) return { bg: 'bg-slate-400', icon: null }
    if (rank === 3) return { bg: 'bg-amber-700', icon: null }
    return { bg: 'bg-[var(--muted)]', icon: null }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Grid of all 10 profiles - 5x2 layout */}
      <div className="flex-1 grid grid-cols-5 grid-rows-2 gap-1.5 p-1">
        {users.slice(0, 10).map((user, index) => {
          const colors = user.guardianArchetype
            ? archetypeColors[user.guardianArchetype] || defaultColors
            : defaultColors
          const rankBadge = getRankBadge(user.rank)
          const RankIcon = rankBadge.icon

          return (
            <motion.div
              key={user.userId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link href={`/profile/${user.userId}`}>
                <motion.div
                  className={`relative bg-[var(--card)] border ${colors.border} rounded-lg p-1.5 h-full flex flex-col items-center cursor-pointer`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  animate={index < 3 ? {
                    boxShadow: ['0 1px 5px rgba(0,0,0,0.1)', '0 2px 8px rgba(0,0,0,0.15)', '0 1px 5px rgba(0,0,0,0.1)'],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Rank badge */}
                  <div className={`absolute -top-1 -left-1 w-4 h-4 ${rankBadge.bg} rounded-full flex items-center justify-center z-10`}>
                    {RankIcon ? (
                      <RankIcon className="w-2 h-2 text-white" />
                    ) : (
                      <span className="text-[7px] font-bold text-white">{user.rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <motion.div
                    className={`w-8 h-8 rounded-md bg-gradient-to-br ${colors.gradient} p-0.5 mb-1`}
                    animate={index < 3 ? { rotate: [0, 1, 0, -1, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt=""
                        className="w-full h-full rounded object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded bg-[var(--card)] flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-[var(--foreground)]">
                          {user.name?.[0]?.toUpperCase() || '?'}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Guardian badge */}
                  {user.guardianArchetype && (
                    <div className={`absolute top-5 right-0 w-3 h-3 rounded-sm bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
                      <Shield className="w-1.5 h-1.5 text-white" />
                    </div>
                  )}

                  {/* Name */}
                  <p className="text-[8px] font-medium text-[var(--foreground)] text-center truncate w-full">
                    {user.name?.split(' ')[0] || 'Anon'}
                  </p>

                  {/* Level */}
                  <div className="flex items-center gap-0.5">
                    <TrendingUp className="w-2 h-2 text-[var(--muted-foreground)]" />
                    <span className="text-[7px] text-[var(--muted-foreground)]">
                      L{user.level}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}

        {/* Fill remaining slots if less than 10 users */}
        {Array.from({ length: Math.max(0, 10 - users.length) }).map((_, i) => (
          <motion.div
            key={`empty-${i}`}
            className="bg-[var(--muted)]/30 rounded-lg border border-dashed border-[var(--border)] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: (users.length + i) * 0.05 }}
          >
            <span className="text-[8px] text-[var(--muted-foreground)]">?</span>
          </motion.div>
        ))}
      </div>

      {/* View all link */}
      <motion.div
        className="text-center pt-1 border-t border-[var(--border)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/community/leaderboard"
          className="text-[9px] text-[var(--primary)] hover:underline"
        >
          View full leaderboard →
        </Link>
      </motion.div>
    </div>
  )
}
