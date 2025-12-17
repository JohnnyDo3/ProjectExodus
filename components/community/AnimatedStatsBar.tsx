'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Users, Rocket, BookOpen, MessageSquare, TrendingUp } from 'lucide-react'

interface StatData {
  members: { total: number; thisWeek: number }
  projects: { total: number; thisWeek: number }
  articles: { total: number; thisWeek: number }
  courses: { total: number }
  discussions: { activeThisWeek: number }
}

// Animated counter component
function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: number
  duration?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const animationFrame = useRef<number | undefined>(undefined)

  useEffect(() => {
    startTime.current = null

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrame.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [value, duration])

  return <span>{displayValue.toLocaleString()}</span>
}

// Pulsing growth badge
function GrowthBadge({ value, label }: { value: number; label: string }) {
  if (value <= 0) return null

  return (
    <motion.div
      className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
      <span className="text-[9px] font-medium text-emerald-600">
        +{value} {label}
      </span>
    </motion.div>
  )
}

export function AnimatedStatsBar() {
  const [stats, setStats] = useState<StatData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/community/public-stats')
        const data = await res.json()

        if (data.success) {
          setStats(data.data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center gap-6 py-3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          >
            <div className="w-8 h-8 rounded-full bg-[var(--muted)]/50" />
            <div className="w-12 h-2 rounded bg-[var(--muted)]/30" />
            <div className="w-8 h-1.5 rounded bg-[var(--muted)]/20" />
          </motion.div>
        ))}
      </div>
    )
  }

  const statItems = [
    {
      icon: Users,
      label: 'Members',
      value: stats.members.total,
      growth: stats.members.thisWeek,
      growthLabel: 'this week',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Rocket,
      label: 'Projects',
      value: stats.projects.total,
      growth: stats.projects.thisWeek,
      growthLabel: 'new',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: BookOpen,
      label: 'Articles',
      value: stats.articles.total,
      growth: stats.articles.thisWeek,
      growthLabel: 'new',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: MessageSquare,
      label: 'Active Discussions',
      value: stats.discussions.activeThisWeek,
      growth: 0,
      growthLabel: '',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  return (
    <motion.div
      className="flex items-center justify-center gap-3 sm:gap-6 py-2 px-4 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {statItems.map((stat, index) => {
        const Icon = stat.icon

        return (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center min-w-[70px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            {/* Icon with pulsing background */}
            <motion.div
              className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-1.5`}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
                ease: 'easeInOut',
              }}
            >
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </motion.div>

            {/* Value with animated counter */}
            <div className="text-lg font-bold text-[var(--foreground)]">
              <AnimatedCounter value={stat.value} duration={2000 + index * 300} />
            </div>

            {/* Label */}
            <div className="text-[10px] text-[var(--muted-foreground)] whitespace-nowrap">
              {stat.label}
            </div>

            {/* Growth badge */}
            <div className="h-5 mt-0.5">
              <GrowthBadge value={stat.growth} label={stat.growthLabel} />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
