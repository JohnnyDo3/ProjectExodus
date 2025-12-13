'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, ChevronRight, ChevronDown, Clock,
  CheckCircle2, Bookmark, GraduationCap, BookMarked
} from 'lucide-react'
import { Module, CoreTopic, getTopic } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// Handwritten font
const handwritten = "font-['Caveat',_cursive]"

// Chapter color themes
const CHAPTER_COLORS = [
  { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-900', accent: 'bg-amber-700', light: 'bg-amber-100' },
  { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-900', accent: 'bg-emerald-700', light: 'bg-emerald-100' },
  { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-900', accent: 'bg-blue-700', light: 'bg-blue-100' },
  { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-900', accent: 'bg-purple-700', light: 'bg-purple-100' },
  { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-900', accent: 'bg-rose-700', light: 'bg-rose-100' },
  { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-900', accent: 'bg-cyan-700', light: 'bg-cyan-100' },
  { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-900', accent: 'bg-orange-700', light: 'bg-orange-100' },
]

interface TopicBookProps {
  topicSlug: CoreTopic
  selectedLevel: LearningLevel
  completedModules?: string[]
}

// Group modules by their category (chapters)
function groupModulesIntoChapters(modules: Module[]): { chapter: string; lessons: Module[] }[] {
  const groups: Record<string, Module[]> = {}

  modules.forEach(module => {
    const chapter = module.category || 'General'
    if (!groups[chapter]) {
      groups[chapter] = []
    }
    groups[chapter].push(module)
  })

  // Convert to array and sort alphabetically by chapter name
  return Object.entries(groups)
    .map(([chapter, lessons]) => ({ chapter, lessons }))
    .sort((a, b) => a.chapter.localeCompare(b.chapter))
}

// Chapter Section Component
function ChapterSection({
  chapter,
  chapterNumber,
  lessons,
  chapterIndex,
  selectedLevel,
  topicSlug,
  completedModules = [],
  isExpanded,
  onToggle
}: {
  chapter: string
  chapterNumber: number
  lessons: Module[]
  chapterIndex: number
  selectedLevel: LearningLevel
  topicSlug: CoreTopic
  completedModules: string[]
  isExpanded: boolean
  onToggle: () => void
}) {
  const colors = CHAPTER_COLORS[chapterIndex % CHAPTER_COLORS.length]

  // Calculate progress for this chapter
  const completedCount = lessons.filter(m => completedModules.includes(m.id)).length
  const totalPages = lessons.reduce((acc, m) => acc + m.lessons.length, 0)
  const progress = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0

  return (
    <motion.div
      layout
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Chapter Header */}
      <button
        onClick={onToggle}
        className={`w-full ${colors.bg} ${colors.border} border-2 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${colors.accent} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-lg">{chapterNumber}</span>
              </div>
              <div className="text-left">
                <p className={`text-xs font-bold uppercase tracking-wider ${colors.text} opacity-60 mb-0.5`}>
                  Chapter {chapterNumber}
                </p>
                <h3 className={`${handwritten} text-xl sm:text-2xl ${colors.text}`}>
                  {chapter}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} • {totalPages} page{totalPages !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <ChevronDown
                className={`w-5 h-5 ${colors.text} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
              {progress > 0 && (
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-green-600">{progress}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Lessons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`mt-2 ${colors.light} ${colors.border} border-2 rounded-xl p-3 sm:p-4`}>
              <div className="grid gap-3">
                {lessons.map((lesson, lessonIdx) => {
                  const isLessonCompleted = completedModules.includes(lesson.id)
                  const lessonPages = lesson.lessons.length
                  const lessonDuration = lesson.duration[selectedLevel]

                  return (
                    <Link
                      key={lesson.id}
                      href={`/learn/modules/${lesson.slug}?level=${selectedLevel.toLowerCase()}&topic=${topicSlug}`}
                      className={`${colors.bg} border ${colors.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-all group`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Lesson number badge */}
                        <div className={`w-8 h-8 ${colors.accent} rounded-full text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                          {chapterNumber}.{lessonIdx + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`${handwritten} text-lg sm:text-xl font-bold ${colors.text} group-hover:underline`}>
                              {lesson.title}
                            </h4>
                            {isLessonCompleted && (
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                            {lesson.description[selectedLevel]}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {lessonPages} page{lessonPages !== 1 ? 's' : ''}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lessonDuration} min
                            </span>
                          </div>
                        </div>

                        <ChevronRight className={`w-5 h-5 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main Topic Book Browser
export function TopicBookBrowser({ topicSlug, selectedLevel, completedModules = [] }: TopicBookProps) {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null)

  const topic = getTopic(topicSlug)
  if (!topic) return null

  const chapters = groupModulesIntoChapters(topic.modules)

  // Calculate total stats
  const totalLessons = topic.modules.length
  const totalPages = topic.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessonCount = completedModules.filter(id => topic.modules.some(m => m.id === id)).length
  const progressPercent = totalLessons > 0 ? Math.round((completedLessonCount / totalLessons) * 100) : 0

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookMarked className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary)]" />
          <h2 className={`${handwritten} text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-gray-200`}>
            {topic.title}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {chapters.length} chapter{chapters.length !== 1 ? 's' : ''} • {totalLessons} lesson{totalLessons !== 1 ? 's' : ''} • {totalPages} page{totalPages !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>Level: {LEARNING_LEVELS[selectedLevel].icon} {LEARNING_LEVELS[selectedLevel].label}</span>
        </div>
      </div>

      {/* Chapter Sections */}
      <div className="grid gap-3 sm:gap-4">
        {chapters.map((group, idx) => (
          <ChapterSection
            key={group.chapter}
            chapter={group.chapter}
            chapterNumber={idx + 1}
            lessons={group.lessons}
            chapterIndex={idx}
            selectedLevel={selectedLevel}
            topicSlug={topicSlug}
            completedModules={completedModules}
            isExpanded={expandedChapter === group.chapter}
            onToggle={() => setExpandedChapter(
              expandedChapter === group.chapter ? null : group.chapter
            )}
          />
        ))}
      </div>

      {/* Reading Progress Summary */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
          <span className={`${handwritten} text-lg sm:text-xl text-amber-800 dark:text-amber-200`}>Your Progress</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex-1 h-2 bg-amber-200 dark:bg-amber-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-200 whitespace-nowrap">
            {completedLessonCount} / {totalLessons}
          </span>
        </div>
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
          {progressPercent === 100 ? 'Congratulations! You have completed all lessons.' :
           progressPercent > 0 ? `${100 - progressPercent}% remaining to complete this topic.` :
           'Begin your learning journey through this topic.'}
        </p>
      </div>
    </div>
  )
}
