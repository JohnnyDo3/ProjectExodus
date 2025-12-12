'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Zap, Droplet, Sprout, Recycle, Home, Leaf,
  ChevronRight, Clock, BookOpen, CheckCircle2,
  ArrowLeft, GraduationCap, LucideIcon
} from 'lucide-react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { getTopic, CoreTopic } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS, LEARNING_LEVEL_ORDER } from '@/types/learning'

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
  const slug = params.slug as CoreTopic

  // Get level from URL or default to HIGH_SCHOOL
  const levelParam = searchParams.get('level')?.toUpperCase() as LearningLevel | undefined
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(
    levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'
  )

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
                    {totalModules} modules
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
          </div>
        </div>
      </section>

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

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - Modules List */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-[var(--foreground)]">All Modules</h2>
                  <span className="text-sm font-bold text-theme-muted">
                    {totalModules} total
                  </span>
                </div>

                <div className="space-y-4">
                  {topic.modules.map((module, i) => {
                    const isCompleted = completedModules.includes(module.id)
                    const isMasterclass = module.isMasterclass

                    return (
                      <Link
                        key={module.id}
                        href={`/learn/modules/${module.slug}?level=${selectedLevel.toLowerCase()}&topic=${topic.id}`}
                      >
                        <Card className={`border-2 ${isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-[var(--border)]'} ${isMasterclass ? 'ring-2 ring-yellow-400' : ''} hover:border-theme-primary transition-all cursor-pointer group`}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl ${isCompleted ? 'bg-green-500' : 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))]'} flex items-center justify-center flex-shrink-0`}>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-6 h-6 text-white" />
                                ) : (
                                  <span className="text-xl font-black text-theme-primary">{i + 1}</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {isMasterclass && (
                                    <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-black rounded">
                                      MASTERCLASS
                                    </span>
                                  )}
                                  <span className="px-2 py-0.5 bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary text-xs font-bold rounded">
                                    {module.category}
                                  </span>
                                </div>
                                <h3 className="text-lg font-black text-[var(--foreground)] group-hover:text-theme-primary transition-colors">
                                  {module.title}
                                </h3>
                                <p className="text-theme-muted text-sm mb-2">
                                  {module.description[selectedLevel]}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-theme-muted">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {module.duration[selectedLevel]} min
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                                  </span>
                                  {isCompleted && (
                                    <span className="flex items-center gap-1 text-green-600 font-bold">
                                      <CheckCircle2 className="w-4 h-4" />
                                      Completed
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="w-6 h-6 text-theme-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Progress Card */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black mb-3 text-[var(--foreground)]">Your Progress</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-theme-primary">{progressPercent}%</span>
                  </div>
                  <p className="text-sm text-theme-muted mb-4">
                    {completedCount} of {totalModules} modules completed
                  </p>
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
                      Topic Complete
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
        </div>
      </div>
    </div>
  )
}
