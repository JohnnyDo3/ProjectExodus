'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Book, BookOpen, ChevronRight, ChevronDown, Clock,
  CheckCircle2, Lock, Bookmark, GraduationCap
} from 'lucide-react'
import { Module, CoreTopic, getTopic, DEFAULT_CLASSROOMS, Classroom } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// Handwritten font
const handwritten = "font-['Caveat',_cursive]"

// Book color themes
const BOOK_COLORS = [
  { spine: 'bg-amber-700', cover: 'bg-amber-100', text: 'text-amber-900', accent: 'border-amber-300' },
  { spine: 'bg-emerald-700', cover: 'bg-emerald-100', text: 'text-emerald-900', accent: 'border-emerald-300' },
  { spine: 'bg-blue-700', cover: 'bg-blue-100', text: 'text-blue-900', accent: 'border-blue-300' },
  { spine: 'bg-purple-700', cover: 'bg-purple-100', text: 'text-purple-900', accent: 'border-purple-300' },
  { spine: 'bg-rose-700', cover: 'bg-rose-100', text: 'text-rose-900', accent: 'border-rose-300' },
]

interface TopicBookProps {
  topicSlug: CoreTopic
  selectedLevel: LearningLevel
  completedModules?: string[]
}

// Group modules into "books" by their classroom or category
function groupModulesIntoBooks(modules: Module[]): { book: Classroom; modules: Module[] }[] {
  const groups: Record<string, Module[]> = {}

  modules.forEach(module => {
    const classroomId = module.classroom || 'fundamentals'
    if (!groups[classroomId]) {
      groups[classroomId] = []
    }
    groups[classroomId].push(module)
  })

  // Map to classroom definitions and sort by order
  return DEFAULT_CLASSROOMS
    .filter(classroom => groups[classroom.id]?.length > 0)
    .map(classroom => ({
      book: classroom,
      modules: groups[classroom.id]
    }))
    .sort((a, b) => a.book.order - b.book.order)
}

// Individual Book Component
function TopicBook({
  book,
  modules,
  colorIndex,
  selectedLevel,
  topicSlug,
  completedModules = [],
  isExpanded,
  onToggle
}: {
  book: Classroom
  modules: Module[]
  colorIndex: number
  selectedLevel: LearningLevel
  topicSlug: CoreTopic
  completedModules: string[]
  isExpanded: boolean
  onToggle: () => void
}) {
  const colors = BOOK_COLORS[colorIndex % BOOK_COLORS.length]

  // Count all lessons across modules in this book
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedCount = modules.filter(m => completedModules.includes(m.id)).length
  const progress = modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0

  return (
    <motion.div
      layout
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Book Cover */}
      <button
        onClick={onToggle}
        className={`w-full ${colors.cover} ${colors.accent} border-2 rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden`}
      >
        {/* Spine decoration */}
        <div className={`absolute left-0 top-0 bottom-0 w-4 ${colors.spine} rounded-l-lg`} />

        <div className="pl-8 pr-4 py-4">
          <div className="flex items-start justify-between">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <Book className={`w-5 h-5 ${colors.text}`} />
                <span className={`text-xs font-bold uppercase tracking-wide ${colors.text} opacity-70`}>
                  Volume {colorIndex + 1}
                </span>
              </div>
              <h3 className={`${handwritten} text-2xl ${colors.text}`}>
                {book.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {book.description}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <ChevronDown
                className={`w-5 h-5 ${colors.text} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
              {progress > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-green-600">{progress}%</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span>{modules.length} modules</span>
            <span>{totalLessons} chapters</span>
          </div>
        </div>
      </button>

      {/* Expanded Chapters List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`mt-2 ${colors.cover} ${colors.accent} border-2 rounded-lg p-4`}>
              <div className="space-y-3">
                {modules.map((module, moduleIdx) => {
                  const isCompleted = completedModules.includes(module.id)

                  return (
                    <div key={module.id} className="space-y-2">
                      {/* Module as a Section Header */}
                      <div className="flex items-center gap-2">
                        <Bookmark className={`w-4 h-4 ${colors.text}`} />
                        <span className={`font-bold ${colors.text}`}>{module.title}</span>
                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      </div>

                      {/* Lessons as Chapters */}
                      <div className="pl-6 space-y-1">
                        {module.lessons.map((lesson, lessonIdx) => (
                          <Link
                            key={lesson.id}
                            href={`/learn/modules/${module.slug}?level=${selectedLevel.toLowerCase()}&topic=${topicSlug}&lesson=${lessonIdx}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors group"
                          >
                            <span className={`w-6 h-6 rounded-full ${colors.spine} text-white text-xs flex items-center justify-center font-bold`}>
                              {lessonIdx + 1}
                            </span>
                            <div className="flex-1">
                              <span className={`${handwritten} text-lg ${colors.text} group-hover:underline`}>
                                Chapter {lessonIdx + 1}: {lesson.title}
                              </span>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration} min</span>
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
                          </Link>
                        ))}
                      </div>
                    </div>
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
  const [expandedBook, setExpandedBook] = useState<string | null>(null)

  const topic = getTopic(topicSlug)
  if (!topic) return null

  const books = groupModulesIntoBooks(topic.modules)

  // If no books/classrooms defined, create a single "book" with all modules
  const displayBooks = books.length > 0 ? books : [{
    book: { id: 'all', name: topic.title, description: 'All lessons in this topic', icon: 'Book', order: 1 },
    modules: topic.modules
  }]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="w-8 h-8 text-[var(--primary)]" />
          <h2 className={`${handwritten} text-4xl text-gray-800`}>
            {topic.title} Library
          </h2>
        </div>
        <p className="text-gray-600">
          Select a book to explore its chapters
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>Level: {LEARNING_LEVELS[selectedLevel].icon} {LEARNING_LEVELS[selectedLevel].label}</span>
        </div>
      </div>

      {/* Bookshelf */}
      <div className="grid gap-4">
        {displayBooks.map((item, idx) => (
          <TopicBook
            key={item.book.id}
            book={item.book}
            modules={item.modules}
            colorIndex={idx}
            selectedLevel={selectedLevel}
            topicSlug={topicSlug}
            completedModules={completedModules}
            isExpanded={expandedBook === item.book.id}
            onToggle={() => setExpandedBook(
              expandedBook === item.book.id ? null : item.book.id
            )}
          />
        ))}
      </div>

      {/* Reading Progress Summary */}
      <div className="mt-8 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Bookmark className="w-5 h-5 text-amber-600" />
          <span className={`${handwritten} text-xl text-amber-800`}>Your Reading Progress</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all"
              style={{
                width: `${topic.modules.length > 0
                  ? Math.round((completedModules.filter(id =>
                      topic.modules.some(m => m.id === id)
                    ).length / topic.modules.length) * 100)
                  : 0}%`
              }}
            />
          </div>
          <span className="text-sm font-bold text-amber-800">
            {completedModules.filter(id => topic.modules.some(m => m.id === id)).length} / {topic.modules.length} complete
          </span>
        </div>
      </div>
    </div>
  )
}
