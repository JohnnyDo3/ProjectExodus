'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { CheckCircle2, Clock, BookOpen } from 'lucide-react'

interface ReadingProgressProps {
  articleSlug: string
  estimatedReadTime: number // in minutes
  className?: string
}

export function ReadingProgress({ articleSlug, estimatedReadTime, className }: ReadingProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = Math.min(100, (scrolled / documentHeight) * 100)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Save progress to API (debounced)
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (scrollProgress > 5) { // Only save if user has scrolled a bit
        try {
          await fetch(`/api/articles/${articleSlug}/progress`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              scrollProgress,
              timeSpent,
              completed: scrollProgress >= 90
            })
          })
        } catch (error) {
          console.error('Error saving progress:', error)
        }
      }
    }, 2000) // Debounce 2 seconds

    return () => clearTimeout(timeout)
  }, [scrollProgress, timeSpent, articleSlug])

  // Mark as completed when progress >= 90%
  useEffect(() => {
    if (scrollProgress >= 90 && !isCompleted) {
      setIsCompleted(true)
      setShowCompletion(true)
      setTimeout(() => setShowCompletion(false), 5000)
    }
  }, [scrollProgress, isCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Fixed Progress Bar at Top */}
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-1 bg-[var(--muted)]',
          className
        )}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Progress Info */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {/* Progress Circle */}
        <div className="relative w-10 h-10">
          <svg className="w-10 h-10 transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="16"
              className="stroke-[var(--muted)]"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              className="stroke-[var(--primary)]"
              strokeWidth="3"
              fill="none"
              strokeDasharray={100}
              strokeDashoffset={100 - scrollProgress}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
            {Math.round(scrollProgress)}%
          </div>
        </div>

        {/* Time Info */}
        <div className="flex flex-col text-xs">
          <span className="flex items-center gap-1 text-[var(--muted-foreground)]">
            <Clock className="w-3 h-3" />
            {formatTime(timeSpent)}
          </span>
          <span className="flex items-center gap-1 text-[var(--primary)]">
            <BookOpen className="w-3 h-3" />
            ~{estimatedReadTime}m read
          </span>
        </div>
      </motion.div>

      {/* Completion Celebration */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[var(--card)] border-2 border-[var(--primary)] rounded-2xl p-8 shadow-2xl text-center"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                Article Completed!
              </h3>
              <p className="text-[var(--muted-foreground)]">
                You earned <span className="text-[var(--primary)] font-bold">+10 points</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
