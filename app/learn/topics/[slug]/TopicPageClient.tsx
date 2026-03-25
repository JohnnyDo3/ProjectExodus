'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Clock, BookOpen,
  ArrowLeft, GraduationCap,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import type { CoreTopic, TopicDefinition } from '@/types/modules'
import { LearningLevel, LEARNING_LEVELS, LEARNING_LEVEL_ORDER } from '@/types/learning'
import { TopicBookBrowser } from '@/components/learning/TopicBookBrowser'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useDigitalScrollContext } from '@/components/learning/DigitalScroll/DigitalScrollContext'

// Dynamically import the DigitalScroll to reduce initial bundle size
const DigitalScroll = dynamic(
  () => import('@/components/learning/DigitalScroll').then(mod => mod.DigitalScroll),
  { ssr: false }
)

// Hero emoji mapping
const heroEmojis: Record<CoreTopic, string> = {
  'renewable-energy': '⚡',
  'water-systems': '💧',
  'regenerative-agriculture': '🌱',
  'zero-waste': '♻️',
  'green-building': '🏠',
  'food-sovereignty': '🥬'
}

interface TopicPageClientProps {
  topic: TopicDefinition
  initialLevel: LearningLevel
}

export default function TopicPageClient({ topic, initialLevel }: TopicPageClientProps) {
  const slug = topic.id
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(initialLevel)

  // Digital Scroll state
  const [isScrollOpen, setIsScrollOpen] = useState(false)
  const [isScrollUnlocked, setIsScrollUnlocked] = useState(false)
  const [initialChapter, setInitialChapter] = useState<number>(0)
  const { setScrollOpen } = useDigitalScrollContext()

  // Handler for opening Digital Scroll to a specific chapter
  const handleOpenDigitalScroll = (chapterIndex: number = 0) => {
    setInitialChapter(chapterIndex)
    setIsScrollOpen(true)
    setScrollOpen(true)
  }

  // Check if scroll experience is unlocked
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = localStorage.getItem('exodus_book_experience_unlocked') === 'true'
      setIsScrollUnlocked(unlocked)
    }
  }, [])

  // User's completed modules for this topic, fetched from the progress API
  const [completedModules, setCompletedModules] = useState<string[]>([])

  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch('/api/learn/topic-progress')
        const data = await res.json()
        if (data.success && Array.isArray(data.data)) {
          const topicData = data.data.find(
            (tp: { topicId: string }) => tp.topicId === slug
          )
          if (topicData && topicData.completedModules > 0) {
            const progressRes = await fetch('/api/learn/progress')
            const progressData = await progressRes.json()
            if (progressData.success && Array.isArray(progressData.data?.completed)) {
              setCompletedModules(
                progressData.data.completed.map((m: { moduleId: string }) => m.moduleId)
              )
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch learning progress:', error)
      }
    }
    fetchProgress()
  }, [slug])

  const heroEmoji = heroEmojis[topic.id]
  const totalModules = topic.modules.length
  const completedCount = completedModules.length
  const progressPercent = Math.round((completedCount / totalModules) * 100)
  const isGraduated = progressPercent === 100

  // Calculate total duration for selected level
  const totalDuration = topic.modules.reduce((acc, m) => acc + m.duration[selectedLevel], 0)
  const totalHours = Math.round(totalDuration / 60)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Simple Header */}
      <section className="py-12 bg-[var(--muted)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link href="/learn" className="inline-flex items-center gap-2 text-theme-muted hover:text-theme-primary mb-6 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back to Learn
            </Link>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{heroEmoji}</div>
                <div>
                  <h1 className="text-3xl font-black text-[var(--foreground)]">{topic.title}</h1>
                  <p className="text-theme-muted font-medium">{topic.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-sm text-theme-muted">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {totalModules} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    ~{totalHours}h
                  </span>
                </div>
                {progressPercent > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-theme-primary">{progressPercent}%</span>
                    {isGraduated && (
                      <span className="text-green-600 text-xs font-black">COMPLETE</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Prominent Digital Scroll Button - Centered */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => handleOpenDigitalScroll(0)}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-black shadow-2xl shadow-amber-500/30 text-lg px-8 py-6 rounded-2xl border-2 border-amber-400/50 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/50"
                size="lg"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                {isScrollUnlocked ? 'Open Digital Scroll' : 'Begin Your Journey'}
                <BookOpen className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Scroll Modal */}
      <AnimatePresence>
        {isScrollOpen && topic && (
          <DigitalScroll
            topic={topic}
            modules={topic.modules.slice(0, 7)}
            initialLevel={selectedLevel}
            initialChapter={initialChapter}
            onClose={() => {
              setIsScrollOpen(false)
              setIsScrollUnlocked(true)
              setInitialChapter(0)
              setScrollOpen(false)
              if (typeof window !== 'undefined') {
                localStorage.setItem('exodus_book_experience_unlocked', 'true')
              }
            }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Level Selector */}
          <div className="mb-8">
            <div className="bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] rounded-2xl p-6 border-2 border-theme-primary">
              <div className="flex items-center justify-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-theme-primary" />
                <span className="font-black text-theme-primary">SELECT YOUR LEVEL</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {LEARNING_LEVEL_ORDER.map((level) => {
                  const meta = LEARNING_LEVELS[level]
                  const isSelected = level === selectedLevel
                  return (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg scale-105'
                          : 'bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--primary)]/20 border border-[var(--border)]'
                      }`}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.shortLabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Book Browser - Shows lessons as book covers, opens Digital Scroll on click */}
          <TopicBookBrowser
            topicSlug={slug}
            topic={topic}
            selectedLevel={selectedLevel}
            completedModules={completedModules}
            onOpenDigitalScroll={handleOpenDigitalScroll}
          />
        </div>
      </div>
    </div>
  )
}
