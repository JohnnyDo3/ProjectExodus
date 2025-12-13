'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Zap, Droplet, Sprout, Recycle, Home, Leaf,
  ChevronRight, Clock, BookOpen, CheckCircle2,
  ArrowLeft, GraduationCap, LucideIcon, Book, LayoutList,
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

// Dynamically import the DigitalTextbook to reduce initial bundle size
const DigitalTextbook = dynamic(
  () => import('@/components/learning/DigitalTextbook').then(mod => mod.DigitalTextbook),
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
  const viewParam = searchParams.get('view') // 'books' or 'list'
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(
    levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'
  )
  // Default to book view
  const [viewMode, setViewMode] = useState<'books' | 'list'>(
    viewParam === 'list' ? 'list' : 'books'
  )

  // Sacred Digital Textbook state
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [isBookUnlocked, setIsBookUnlocked] = useState(false)

  // Check if book experience is unlocked
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = localStorage.getItem('exodus_book_experience_unlocked') === 'true'
      setIsBookUnlocked(unlocked)
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

                {/* Sacred Book Button */}
                <Button
                  onClick={() => setIsBookOpen(true)}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold shadow-lg"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isBookUnlocked ? 'Open Sacred Book' : 'Start Learning'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Digital Textbook Modal */}
      <AnimatePresence>
        {isBookOpen && topic && (
          <DigitalTextbook
            topic={topic}
            modules={topic.modules.slice(0, 7)} // Max 7 chapters for 7 Guardian ribbons
            initialLevel={selectedLevel}
            onClose={() => {
              setIsBookOpen(false)
              setIsBookUnlocked(true)
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

          {/* View Mode Toggle */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setViewMode('books')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'books'
                  ? 'bg-[var(--primary)] text-white shadow-lg'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
              }`}
            >
              <Book className="w-4 h-4" />
              Book View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-[var(--primary)] text-white shadow-lg'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
              }`}
            >
              <LayoutList className="w-4 h-4" />
              List View
            </button>
          </div>

          {/* Book View */}
          {viewMode === 'books' && (
            <TopicBookBrowser
              topicSlug={slug}
              selectedLevel={selectedLevel}
              completedModules={completedModules}
            />
          )}

          {/* List View - Hierarchical: Learning Module > Lesson > Pages */}
          {viewMode === 'list' && (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - Organized by Learning Module (category) - uses natural page scroll */}
            <div className="lg:col-span-2 space-y-8">
              {/* Group lessons by category into Learning Modules */}
              {(() => {
                // Group modules (lessons) by category into Learning Modules
                const learningModules: Record<string, typeof topic.modules> = {}
                topic.modules.forEach(module => {
                  const learningModuleName = module.category || 'General'
                  if (!learningModules[learningModuleName]) {
                    learningModules[learningModuleName] = []
                  }
                  learningModules[learningModuleName].push(module)
                })

                // Convert to sorted array
                const sortedLearningModules = Object.entries(learningModules)
                  .map(([name, lessons]) => ({ name, lessons }))
                  .sort((a, b) => a.name.localeCompare(b.name))

                return sortedLearningModules.map((learningModule, lmIdx) => {
                  const totalPages = learningModule.lessons.reduce((acc, m) => acc + m.lessons.length, 0)
                  const completedLessonsInModule = learningModule.lessons.filter(l => completedModules.includes(l.id)).length
                  const moduleProgress = learningModule.lessons.length > 0
                    ? Math.round((completedLessonsInModule / learningModule.lessons.length) * 100)
                    : 0
                  const isModuleComplete = moduleProgress === 100

                  return (
                    <section key={learningModule.name} className={`p-4 rounded-xl border-2 ${isModuleComplete ? 'border-green-400 bg-green-50/50 dark:bg-green-950/20' : 'border-[var(--border)] bg-[var(--card)]'}`}>
                      {/* Learning Module Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${isModuleComplete ? 'bg-green-500' : 'bg-[var(--primary)]'} flex items-center justify-center`}>
                              {isModuleComplete ? (
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              ) : (
                                <span className="text-lg font-black text-white">{lmIdx + 1}</span>
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-0.5">
                                Learning Module {lmIdx + 1}
                              </p>
                              <h2 className="text-xl font-black text-[var(--foreground)]">{learningModule.name}</h2>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${isModuleComplete ? 'bg-green-500' : 'bg-amber-500'} rounded-full`}
                                  style={{ width: `${moduleProgress}%` }}
                                />
                              </div>
                              <span className={`text-xs font-bold ${isModuleComplete ? 'text-green-600' : 'text-theme-muted'}`}>
                                {moduleProgress}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-theme-muted ml-13">
                          <span>{learningModule.lessons.length} lesson{learningModule.lessons.length !== 1 ? 's' : ''}</span>
                          <span>{totalPages} page{totalPages !== 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      {/* Lessons within this Learning Module */}
                      <div className="space-y-3 pl-4 border-l-2 border-[var(--border)]">
                        {learningModule.lessons.map((lesson, lessonIdx) => {
                          const isLessonCompleted = completedModules.includes(lesson.id)
                          const isMasterclass = lesson.isMasterclass
                          const lessonNumber = `${lmIdx + 1}.${lessonIdx + 1}`

                          return (
                            <Link
                              key={lesson.id}
                              href={`/learn/modules/${lesson.slug}?level=${selectedLevel.toLowerCase()}&topic=${topic.id}`}
                              className={`block p-3 rounded-lg border ${isLessonCompleted ? 'border-green-400 bg-green-50 dark:bg-green-950/30' : 'border-[var(--border)] bg-[var(--background)]'} hover:shadow-md transition-all group`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full ${isLessonCompleted ? 'bg-green-500' : 'bg-[var(--primary)]'} flex items-center justify-center flex-shrink-0`}>
                                  {isLessonCompleted ? (
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  ) : (
                                    <span className="text-xs font-black text-white">{lessonNumber}</span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    {isMasterclass && (
                                      <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] font-black rounded">
                                        MASTERCLASS
                                      </span>
                                    )}
                                    <span className="px-2 py-0.5 bg-[var(--muted)] text-theme-muted text-[10px] font-bold rounded">
                                      LESSON
                                    </span>
                                    {isLessonCompleted && (
                                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">
                                        COMPLETE
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="text-base font-black text-[var(--foreground)] group-hover:text-theme-primary">
                                    {lesson.title}
                                  </h3>
                                  <p className="text-theme-muted text-xs line-clamp-2 mb-2">
                                    {lesson.description[selectedLevel]}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs text-theme-muted">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {lesson.duration[selectedLevel]} min
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <BookOpen className="w-3 h-3" />
                                      {lesson.lessons.length} page{lesson.lessons.length !== 1 ? 's' : ''}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-theme-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </section>
                  )
                })
              })()}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Progress Card */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black mb-3 text-[var(--foreground)]">Your Progress</h3>

                  {/* Learning Modules Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-theme-muted">Learning Modules</span>
                      <span className="font-bold text-[var(--foreground)]">
                        {(() => {
                          const lms: Record<string, typeof topic.modules> = {}
                          topic.modules.forEach(m => {
                            const name = m.category || 'General'
                            if (!lms[name]) lms[name] = []
                            lms[name].push(m)
                          })
                          const completed = Object.values(lms).filter(lessons =>
                            lessons.every(l => completedModules.includes(l.id))
                          ).length
                          return `${completed} / ${Object.keys(lms).length}`
                        })()}
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: (() => {
                            const lms: Record<string, typeof topic.modules> = {}
                            topic.modules.forEach(m => {
                              const name = m.category || 'General'
                              if (!lms[name]) lms[name] = []
                              lms[name].push(m)
                            })
                            const completed = Object.values(lms).filter(lessons =>
                              lessons.every(l => completedModules.includes(l.id))
                            ).length
                            return `${Object.keys(lms).length > 0 ? (completed / Object.keys(lms).length) * 100 : 0}%`
                          })()
                        }}
                      />
                    </div>
                  </div>

                  {/* Lessons Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-theme-muted">Total Lessons</span>
                      <span className="font-bold text-[var(--foreground)]">{completedCount} / {totalModules}</span>
                    </div>
                    <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {!isGraduated && topic.modules.length > 0 && (
                    <Link href={`/learn/modules/${topic.modules[completedCount]?.slug || topic.modules[0].slug}?level=${selectedLevel.toLowerCase()}&topic=${topic.id}`}>
                      <Button className="w-full font-bold" size="sm">
                        {completedCount === 0 ? 'Start Learning' : 'Continue'}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                  {isGraduated && (
                    <div className="text-center py-2 px-3 bg-green-500/10 rounded-lg text-green-600 font-bold text-sm">
                      🎉 Topic Complete!
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Related Topics */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-black mb-4 text-[var(--foreground)]">Related Topics</h3>
                  <div className="space-y-2">
                    {relatedTopicSlugs.map((relatedSlug) => {
                      const related = getTopic(relatedSlug)
                      if (!related) return null
                      const RelatedIcon = iconMap[related.icon] || BookOpen
                      return (
                        <Link key={relatedSlug} href={`/learn/topics/${relatedSlug}?level=${selectedLevel.toLowerCase()}`}>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)] hover:bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center">
                              <RelatedIcon className="w-5 h-5 text-theme-primary" />
                            </div>
                            <span className="font-bold text-[var(--foreground)]">{related.title}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
