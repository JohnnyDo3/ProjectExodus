'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Zap, Droplet, Sprout, Recycle, Home, Leaf,
  ChevronRight, Clock, BookOpen, CheckCircle2,
  ArrowLeft, GraduationCap, LucideIcon, Book, LayoutList
} from 'lucide-react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { getTopic, CoreTopic } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS, LEARNING_LEVEL_ORDER } from '@/types/learning'
import { TopicBookBrowser } from '@/components/learning/TopicBookBrowser'
import { DEFAULT_CLASSROOMS, Classroom, Module } from '@/data/modules'

// Learning Module definitions for each core topic - exactly 7 modules per topic
const LEARNING_MODULE_MAPPING: Record<string, { name: string; categories: string[] }[]> = {
  'renewable-energy': [
    { name: 'Solar Energy Systems', categories: ['SOLAR'] },
    { name: 'Wind, Hydro & Ocean Power', categories: ['WIND', 'HYDRO', 'OCEAN'] },
    { name: 'Alternative Energy Sources', categories: ['GEOTHERMAL', 'BIOMASS', 'HYDROGEN'] },
    { name: 'Energy Storage & Grid', categories: ['STORAGE', 'GRID', 'MICROGRIDS', 'DISTRIBUTED'] },
    { name: 'Transportation & Buildings', categories: ['TRANSPORTATION', 'BUILDINGS', 'EFFICIENCY', 'HYBRID'] },
    { name: 'Community & Policy', categories: ['COMMUNITY', 'POLICY', 'FINANCE', 'EQUITY'] },
    { name: 'Energy Transition', categories: ['TRANSITION', 'RESILIENCE'] },
  ],
  'water-systems': [
    { name: 'Water Collection & Harvesting', categories: ['COLLECTION', 'STORMWATER', 'GREEN'] },
    { name: 'Treatment & Reuse', categories: ['TREATMENT', 'REUSE', 'GROUNDWATER'] },
    { name: 'Irrigation & Aquaculture', categories: ['IRRIGATION', 'AQUACULTURE'] },
    { name: 'Ecosystems & Conservation', categories: ['ECOSYSTEMS', 'CONSERVATION'] },
    { name: 'Monitoring & Technology', categories: ['MONITORING', 'TECHNOLOGY'] },
    { name: 'Policy & Economics', categories: ['POLICY', 'ECONOMICS', 'ECONOMY', 'GOVERNANCE'] },
    { name: 'Future Water Systems', categories: ['INTEGRATED', 'SECURITY', 'RESILIENCE', 'CLIMATE', 'URBAN', 'NEXUS', 'TRADITIONAL', 'FUTURES'] },
  ],
  'regenerative-agriculture': [
    { name: 'Soil Health Fundamentals', categories: ['SOIL HEALTH', 'SOIL_HEALTH', 'SOIL_MANAGEMENT'] },
    { name: 'Cover Crops & Rotation', categories: ['COVER CROPS', 'TILLAGE', 'ROTATION'] },
    { name: 'Composting & Organic Matter', categories: ['COMPOSTING'] },
    { name: 'Agroforestry & Perennials', categories: ['AGROFORESTRY', 'PERENNIALS', 'PERENNIAL'] },
    { name: 'Livestock & Grazing', categories: ['LIVESTOCK', 'GRAZING'] },
    { name: 'Pest & Water Management', categories: ['PEST MANAGEMENT', 'PEST_MANAGEMENT', 'WATER', 'BIODIVERSITY'] },
    { name: 'Economics & Future Systems', categories: ['ECONOMICS', 'SEEDS', 'CARBON', 'SYSTEMS', 'COMMUNITY', 'MONITORING', 'CLIMATE', 'LANDSCAPE', 'FUTURE'] },
  ],
  'zero-waste': [
    { name: 'Composting & Food Waste', categories: ['COMPOSTING', 'FOOD WASTE'] },
    { name: 'Recycling & Materials', categories: ['RECYCLING', 'MATERIALS', 'PLASTICS'] },
    { name: 'Design & Prevention', categories: ['DESIGN', 'PREVENTION'] },
    { name: 'Circular Economy', categories: ['CIRCULAR ECONOMY', 'CIRCULAR', 'REUSE'] },
    { name: 'Industry & Technology', categories: ['INDUSTRY', 'TECHNOLOGY', 'ELECTRONICS', 'TEXTILES'] },
    { name: 'Community & Policy', categories: ['COMMUNITY', 'POLICY', 'SAFETY', 'DATA', 'CAREERS'] },
    { name: 'Systems & Future', categories: ['SYSTEMS', 'MASTERCLASS', 'FUTURE'] },
  ],
  'green-building': [
    { name: 'Passive Design Principles', categories: ['PASSIVE DESIGN'] },
    { name: 'Sustainable Materials', categories: ['MATERIALS'] },
    { name: 'Energy & Efficiency', categories: ['ENERGY', 'EFFICIENCY', 'NET ZERO', 'LIGHTING'] },
    { name: 'Water & Landscaping', categories: ['WATER', 'LANDSCAPING', 'LANDSCAPE'] },
    { name: 'Health & Wellness', categories: ['HEALTH', 'WELLNESS', 'QUALITY', 'COMFORT'] },
    { name: 'Certification & Carbon', categories: ['CERTIFICATION', 'CARBON', 'MASTERCLASS'] },
    { name: 'Renovation & Future', categories: ['RENOVATION', 'RESILIENCE', 'TECHNOLOGY', 'PRESERVATION', 'OPERATIONS', 'FUTURE'] },
  ],
  'food-sovereignty': [
    { name: 'Foundations & Philosophy', categories: ['FOUNDATIONS', 'FOOD JUSTICE', 'EQUITY'] },
    { name: 'Urban Agriculture', categories: ['URBAN AGRICULTURE'] },
    { name: 'Seed & Production Systems', categories: ['SEED SYSTEMS', 'PRODUCTION', 'AGROECOLOGY'] },
    { name: 'Local Markets & Cooperatives', categories: ['LOCAL MARKETS', 'COOPERATIVES', 'COOPERATIVE', 'LOCAL FOOD'] },
    { name: 'Preservation & Processing', categories: ['PRESERVATION', 'PROCESSING', 'WASTE'] },
    { name: 'Indigenous & Cultural Knowledge', categories: ['INDIGENOUS SYSTEMS', 'INDIGENOUS', 'CULTURE'] },
    { name: 'Policy & Future', categories: ['POLICY', 'EDUCATION', 'CLIMATE', 'BIODIVERSITY', 'REGENERATIVE', 'RESILIENCE', 'FINANCE', 'FUTURES'] },
  ],
}

// Group lessons into exactly 7 Learning Modules using the mapping
function groupLessonsIntoLearningModules(modules: Module[], topicSlug: string): { name: string; lessons: Module[] }[] {
  const mapping = LEARNING_MODULE_MAPPING[topicSlug]

  if (!mapping) {
    const groups: Record<string, Module[]> = {}
    modules.forEach(module => {
      const learningModule = module.category || 'General'
      if (!groups[learningModule]) groups[learningModule] = []
      groups[learningModule].push(module)
    })
    return Object.entries(groups)
      .map(([name, lessons]) => ({ name, lessons }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  const result: { name: string; lessons: Module[] }[] = []
  const assignedModuleIds = new Set<string>()

  mapping.forEach(({ name, categories }) => {
    const lessonsInModule = modules.filter(m => {
      const cat = (m.category || '').toUpperCase()
      return categories.some(c => c.toUpperCase() === cat) && !assignedModuleIds.has(m.id)
    })
    lessonsInModule.forEach(m => assignedModuleIds.add(m.id))
    if (lessonsInModule.length > 0) {
      result.push({ name, lessons: lessonsInModule })
    }
  })

  const unassigned = modules.filter(m => !assignedModuleIds.has(m.id))
  if (unassigned.length > 0) {
    if (result.length > 0) {
      result[result.length - 1].lessons.push(...unassigned)
    } else {
      result.push({ name: 'Additional Topics', lessons: unassigned })
    }
  }

  return result
}

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
  const viewParam = searchParams.get('view') // 'books' or 'list'
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(
    levelParam && LEARNING_LEVELS[levelParam] ? levelParam : 'HIGH_SCHOOL'
  )
  // Default to book view
  const [viewMode, setViewMode] = useState<'books' | 'list'>(
    viewParam === 'list' ? 'list' : 'books'
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
    <div className="h-screen flex flex-col bg-[var(--background)] overflow-hidden">
      {/* Compact Header */}
      <section className="shrink-0 py-4 sm:py-6 bg-[var(--muted)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link href="/learn" className="inline-flex items-center gap-2 text-theme-muted hover:text-theme-primary mb-3 font-bold text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Learn
            </Link>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl sm:text-4xl">{heroEmoji}</div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-[var(--foreground)]">{topic.title}</h1>
                  <p className="text-theme-muted font-medium text-sm hidden sm:block">{topic.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-theme-muted">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {totalModules} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ~{totalHours}h
                  </span>
                </div>
                {progressPercent > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-16 sm:w-20 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-theme-primary">{progressPercent}%</span>
                    {isGraduated && (
                      <span className="text-green-600 text-[10px] font-black">COMPLETE</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Flex 1 to fill remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 h-full flex flex-col">
          <div className="max-w-6xl mx-auto w-full flex-1 min-h-0 flex flex-col">
            {/* Level Selector - Compact */}
            <div className="shrink-0 mb-3">
              <div className="bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] rounded-xl p-3 border-2 border-theme-primary">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-theme-primary" />
                    <span className="font-bold text-theme-primary text-sm">LEVEL:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {LEARNING_LEVEL_ORDER.map((level) => {
                      const meta = LEARNING_LEVELS[level]
                      const isSelected = level === selectedLevel
                      return (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1 ${
                            isSelected
                              ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                              : 'bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--primary)]/20 border border-[var(--border)]'
                          }`}
                        >
                          <span>{meta.icon}</span>
                          <span className="hidden sm:inline">{meta.shortLabel}</span>
                        </button>
                      )
                    })}
                  </div>
                  {/* View Mode Toggle - Inline */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewMode('books')}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg font-medium transition-all text-xs ${
                        viewMode === 'books'
                          ? 'bg-[var(--primary)] text-white shadow-md'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
                      }`}
                    >
                      <Book className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Book</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg font-medium transition-all text-xs ${
                        viewMode === 'list'
                          ? 'bg-[var(--primary)] text-white shadow-md'
                          : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]'
                      }`}
                    >
                      <LayoutList className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">List</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Book View - Scrollable container */}
            {viewMode === 'books' && (
              <div className="flex-1 min-h-0 overflow-y-auto">
                <TopicBookBrowser
                  topicSlug={slug}
                  selectedLevel={selectedLevel}
                  completedModules={completedModules}
                />
              </div>
            )}

            {/* List View - Hierarchical: Learning Module > Lesson > Pages */}
            {viewMode === 'list' && (
              <div className="flex-1 min-h-0 grid lg:grid-cols-3 gap-6 overflow-hidden">
            {/* Main Content - Organized by Learning Module (7 per topic) */}
            <div className="lg:col-span-2 space-y-4 overflow-y-auto pr-2">
              {/* Group lessons into 7 Learning Modules using mapping */}
              {(() => {
                const sortedLearningModules = groupLessonsIntoLearningModules(topic.modules, topic.id)

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

            {/* Sidebar - Scrollable */}
            <div className="space-y-4 overflow-y-auto">
              {/* Progress Card */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black mb-3 text-[var(--foreground)]">Your Progress</h3>

                  {/* Learning Modules Progress */}
                  {(() => {
                    const lms = groupLessonsIntoLearningModules(topic.modules, topic.id)
                    const completedLms = lms.filter(lm =>
                      lm.lessons.every(l => completedModules.includes(l.id))
                    ).length
                    const progressWidth = lms.length > 0 ? (completedLms / lms.length) * 100 : 0

                    return (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-theme-muted">Learning Modules</span>
                          <span className="font-bold text-[var(--foreground)]">
                            {completedLms} / {lms.length}
                          </span>
                        </div>
                        <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${progressWidth}%` }}
                          />
                        </div>
                      </div>
                    )
                  })()}

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
    </div>
  )
}
