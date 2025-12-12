'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Zap, Droplet, Sprout, Recycle, Home, Leaf,
  ChevronRight, Clock, BookOpen, CheckCircle2,
  ArrowLeft, GraduationCap, Trophy, Star, LucideIcon
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
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/learn" className="inline-flex items-center gap-2 text-[var(--primary-foreground)]/80 hover:text-[var(--primary-foreground)] mb-6 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back to Learn
            </Link>

            <div className="flex items-center gap-6 mb-6">
              <div className="text-8xl">{heroEmoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-5xl font-black">{topic.title}</h1>
                  {isGraduated && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full">
                      <Trophy className="w-5 h-5" />
                      <span className="font-black">GRADUATED!</span>
                    </div>
                  )}
                </div>
                <p className="text-xl font-medium opacity-90">{topic.description}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Your Progress
                </span>
                <span className="font-black text-2xl">{progressPercent}%</span>
              </div>
              <div className="h-4 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-3 text-sm opacity-80">
                <span>{completedCount} of {totalModules} modules completed</span>
                {isGraduated ? (
                  <span className="flex items-center gap-1 font-bold">
                    <Star className="w-4 h-4 fill-current" /> Topic Mastered!
                  </span>
                ) : (
                  <span>{totalModules - completedCount} modules remaining</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold">{totalModules} Modules</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-bold">~{totalHours} hours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-lg">{LEARNING_LEVELS[selectedLevel].icon}</span>
                <span className="font-bold">{LEARNING_LEVELS[selectedLevel].label}</span>
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
              <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[var(--background)]">
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-[var(--muted)]"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${progressPercent * 3.52} 352`}
                        className="text-theme-primary transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isGraduated ? (
                        <Trophy className="w-12 h-12 text-yellow-500" />
                      ) : (
                        <span className="text-3xl font-black">{progressPercent}%</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-2 text-[var(--foreground)]">
                    {isGraduated ? '🎓 Congratulations!' : 'Keep Going!'}
                  </h3>
                  <p className="text-theme-muted mb-4">
                    {isGraduated
                      ? `You've mastered all ${totalModules} modules in ${topic.title}!`
                      : `Complete ${totalModules - completedCount} more module${totalModules - completedCount !== 1 ? 's' : ''} to graduate`
                    }
                  </p>
                  {!isGraduated && topic.modules.length > 0 && (
                    <Link href={`/learn/modules/${topic.modules[completedCount]?.slug || topic.modules[0].slug}?level=${selectedLevel.toLowerCase()}&topic=${topic.id}`}>
                      <Button className="w-full font-bold">
                        {completedCount === 0 ? 'Start Learning' : 'Continue Learning'}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
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
