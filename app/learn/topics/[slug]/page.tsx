'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Zap, Droplet, Sprout, Recycle, Home, Leaf,
  ChevronRight, Clock, BookOpen, CheckCircle2,
  ArrowLeft, GraduationCap, LucideIcon,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { getTopic, CoreTopic } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS, LEARNING_LEVEL_ORDER } from '@/types/learning'
import { TopicBookBrowser } from '@/components/learning/TopicBookBrowser'
import { DEFAULT_CLASSROOMS, Classroom, Module } from '@/data/modules'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useDigitalScrollContext } from '@/components/learning/DigitalScroll/DigitalScrollContext'

// Dynamically import the DigitalScroll to reduce initial bundle size
const DigitalScroll = dynamic(
  () => import('@/components/learning/DigitalScroll').then(mod => mod.DigitalScroll),
  { ssr: false }
)

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  Zap, Droplet, Sprout, Recycle, Home, Leaf
}

// Hero emoji mapping
const heroEmojis: Record<CoreTopic, string> = {
  'renewable-energy': '⚡',
  'water-systems': '💧',
  'regenerative-agriculture': '🌱',
  'zero-waste': '♻️',
  'green-building': '🏠',
  'food-sovereignty': '🥬'
}

export default function TopicPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = params.slug as CoreTopic

  // Get level from URL or default to HIGH_SCHOOL
  const levelParam = searchParams.get('level')?.toUpperCase() as LearningLevel | undefined
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(
    levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'
  )

  // Digital Scroll state
  const [isScrollOpen, setIsScrollOpen] = useState(false)
  const [isScrollUnlocked, setIsScrollUnlocked] = useState(false)
  const [initialChapter, setInitialChapter] = useState<number>(0)
  const { setScrollOpen } = useDigitalScrollContext()

  // Handler for opening Digital Scroll to a specific chapter
  const handleOpenDigitalScroll = (chapterIndex: number = 0) => {
    setInitialChapter(chapterIndex)
    setIsScrollOpen(true)
    setScrollOpen(true) // Notify context to hide header
  }

  // Check if scroll experience is unlocked
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = localStorage.getItem('exodus_book_experience_unlocked') === 'true'
      setIsScrollUnlocked(unlocked)
    }
  }, [])

  // Mock progress state - in production this would come from API
  // TODO: Replace with actual API call to fetch user's progress
  const [completedModules] = useState<string[]>([])

  const topic = getTopic(slug)

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Topic Not Found</h1>
          <Link href="/learn">
            <Button>Back to Learn</Button>
          </Link>
        </div>
      </div>
    )
  }

  const heroEmoji = heroEmojis[topic.id]
  const totalModules = topic.modules.length
  const completedCount = completedModules.length
  const progressPercent = Math.round((completedCount / totalModules) * 100)
  const isGraduated = progressPercent === 100

  // Calculate total duration for selected level
  const totalDuration = topic.modules.reduce((acc, m) => acc + m.duration[selectedLevel], 0)
  const totalHours = Math.round(totalDuration / 60)

  // Get related topics
  const relatedTopicSlugs: CoreTopic[] = topic.id === 'renewable-energy'
    ? ['green-building', 'zero-waste']
    : topic.id === 'water-systems'
    ? ['regenerative-agriculture', 'green-building']
    : topic.id === 'regenerative-agriculture'
    ? ['food-sovereignty', 'zero-waste']
    : topic.id === 'zero-waste'
    ? ['food-sovereignty', 'regenerative-agriculture']
    : topic.id === 'green-building'
    ? ['renewable-energy', 'water-systems']
    : ['regenerative-agriculture', 'zero-waste']

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

                {/* Digital Scroll Button */}
                <Button
                  onClick={() => handleOpenDigitalScroll(0)}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold shadow-lg"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isScrollUnlocked ? 'Open Digital Scroll' : 'Start Learning'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Scroll Modal */}
      <AnimatePresence>
        {isScrollOpen && topic && (
          <DigitalScroll
            topic={topic}
            modules={topic.modules.slice(0, 7)} // Max 7 chapters for 7 Guardian ribbons
            initialLevel={selectedLevel}
            initialChapter={initialChapter}
            onClose={() => {
              setIsScrollOpen(false)
              setIsScrollUnlocked(true)
              setInitialChapter(0) // Reset for next open
              setScrollOpen(false) // Notify context to show header
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
            selectedLevel={selectedLevel}
            completedModules={completedModules}
            onOpenDigitalScroll={handleOpenDigitalScroll}
          />
        </div>
      </div>
    </div>
  )
}
