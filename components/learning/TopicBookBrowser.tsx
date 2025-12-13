'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, ChevronRight, ChevronDown, Clock,
  CheckCircle2, Bookmark, GraduationCap, BookMarked, Layers
} from 'lucide-react'
import { Module, CoreTopic, getTopic } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// Handwritten font
const handwritten = "font-['Caveat',_cursive]"

// Learning Module color themes
const MODULE_COLORS = [
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

// Group lessons (modules in code) into Learning Modules by their category
function groupLessonsIntoLearningModules(modules: Module[]): { learningModule: string; lessons: Module[] }[] {
  const groups: Record<string, Module[]> = {}

  modules.forEach(module => {
    // Use category as the learning module name
    const learningModule = module.category || 'General'
    if (!groups[learningModule]) {
      groups[learningModule] = []
    }
    groups[learningModule].push(module)
  })

  // Convert to array and sort alphabetically
  return Object.entries(groups)
    .map(([learningModule, lessons]) => ({ learningModule, lessons }))
    .sort((a, b) => a.learningModule.localeCompare(b.learningModule))
}

// Learning Module Section Component (themed group containing lessons)
function LearningModuleSection({
  learningModuleName,
  moduleNumber,
  lessons,
  moduleIndex,
  selectedLevel,
  topicSlug,
  completedLessons = [],
  isExpanded,
  onToggle
}: {
  learningModuleName: string
  moduleNumber: number
  lessons: Module[]
  moduleIndex: number
  selectedLevel: LearningLevel
  topicSlug: CoreTopic
  completedLessons: string[]
  isExpanded: boolean
  onToggle: () => void
}) {
  const colors = MODULE_COLORS[moduleIndex % MODULE_COLORS.length]

  // Calculate progress for this learning module
  const completedCount = lessons.filter(m => completedLessons.includes(m.id)).length
  const totalPages = lessons.reduce((acc, m) => acc + m.lessons.length, 0)
  const progress = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0
  const isModuleComplete = progress === 100

  return (
    <motion.div
      layout
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Learning Module Header */}
      <button
        onClick={onToggle}
        className={`w-full ${colors.bg} ${colors.border} border-2 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden ${isModuleComplete ? 'ring-2 ring-green-500' : ''}`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${isModuleComplete ? 'bg-green-600' : colors.accent} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {isModuleComplete ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <span className="text-white font-bold text-lg">{moduleNumber}</span>
                )}
              </div>
              <div className="text-left">
                <p className={`text-xs font-bold uppercase tracking-wider ${colors.text} opacity-60 mb-0.5`}>
                  Learning Module {moduleNumber}
                </p>
                <h3 className={`${handwritten} text-xl sm:text-2xl ${colors.text}`}>
                  {learningModuleName}
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
              <div className="flex items-center gap-1.5">
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isModuleComplete ? 'bg-green-500' : 'bg-amber-500'} rounded-full transition-all`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${isModuleComplete ? 'text-green-600' : 'text-gray-600'}`}>
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Lessons within this Learning Module */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`mt-2 ${colors.light} ${colors.border} border-2 rounded-xl p-3 sm:p-4 max-h-[400px] overflow-y-auto`}>
              <div className="grid gap-3">
                {lessons.map((lesson, lessonIdx) => {
                  const isLessonCompleted = completedLessons.includes(lesson.id)
                  const lessonPages = lesson.lessons.length
                  const lessonDuration = lesson.duration[selectedLevel]

                  return (
                    <Link
                      key={lesson.id}
                      href={`/learn/modules/${lesson.slug}?level=${selectedLevel.toLowerCase()}&topic=${topicSlug}`}
                      className={`${colors.bg} border ${colors.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-all group ${isLessonCompleted ? 'ring-1 ring-green-400' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Lesson number badge */}
                        <div className={`w-8 h-8 ${isLessonCompleted ? 'bg-green-500' : colors.accent} rounded-full text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                          {isLessonCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span>{moduleNumber}.{lessonIdx + 1}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`${handwritten} text-lg sm:text-xl font-bold ${colors.text} group-hover:underline`}>
                              {lesson.title}
                            </h4>
                            {isLessonCompleted && (
                              <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                                COMPLETE
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                            {lesson.description[selectedLevel]}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Layers className="w-3 h-3" />
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
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  const topic = getTopic(topicSlug)
  if (!topic) return null

  const learningModules = groupLessonsIntoLearningModules(topic.modules)

  // Calculate total stats
  const totalLessons = topic.modules.length
  const totalPages = topic.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessonCount = completedModules.filter(id => topic.modules.some(m => m.id === id)).length
  const progressPercent = totalLessons > 0 ? Math.round((completedLessonCount / totalLessons) * 100) : 0

  // Calculate completed learning modules
  const completedLearningModules = learningModules.filter(lm =>
    lm.lessons.every(lesson => completedModules.includes(lesson.id))
  ).length

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
          {learningModules.length} learning module{learningModules.length !== 1 ? 's' : ''} • {totalLessons} lesson{totalLessons !== 1 ? 's' : ''} • {totalPages} page{totalPages !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>Level: {LEARNING_LEVELS[selectedLevel].icon} {LEARNING_LEVELS[selectedLevel].label}</span>
        </div>
      </div>

      {/* Learning Path Visualization */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border-2 border-amber-200 dark:border-amber-700">
        <p className="text-center text-xs sm:text-sm text-amber-800 dark:text-amber-200 mb-3 font-medium">
          Complete all lessons within a Learning Module to unlock the next
        </p>
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {learningModules.map((lm, idx) => {
            const isComplete = lm.lessons.every(lesson => completedModules.includes(lesson.id))
            const isInProgress = lm.lessons.some(lesson => completedModules.includes(lesson.id))
            return (
              <div key={lm.learningModule} className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                    isComplete
                      ? 'bg-green-500 text-white'
                      : isInProgress
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  title={lm.learningModule}
                >
                  {isComplete ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : idx + 1}
                </div>
                {idx < learningModules.length - 1 && (
                  <div className={`w-4 sm:w-8 h-0.5 ${isComplete ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Learning Module Sections */}
      <div className="grid gap-3 sm:gap-4">
        {learningModules.map((group, idx) => (
          <LearningModuleSection
            key={group.learningModule}
            learningModuleName={group.learningModule}
            moduleNumber={idx + 1}
            lessons={group.lessons}
            moduleIndex={idx}
            selectedLevel={selectedLevel}
            topicSlug={topicSlug}
            completedLessons={completedModules}
            isExpanded={expandedModule === group.learningModule}
            onToggle={() => setExpandedModule(
              expandedModule === group.learningModule ? null : group.learningModule
            )}
          />
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
          <span className={`${handwritten} text-lg sm:text-xl text-amber-800 dark:text-amber-200`}>Your Progress</span>
        </div>

        {/* Learning Modules Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
            <span className="text-amber-700 dark:text-amber-300">Learning Modules</span>
            <span className="font-bold text-amber-800 dark:text-amber-200">
              {completedLearningModules} / {learningModules.length}
            </span>
          </div>
          <div className="h-2 bg-amber-200 dark:bg-amber-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${learningModules.length > 0 ? (completedLearningModules / learningModules.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Lessons Progress */}
        <div>
          <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
            <span className="text-amber-700 dark:text-amber-300">Total Lessons</span>
            <span className="font-bold text-amber-800 dark:text-amber-200">
              {completedLessonCount} / {totalLessons}
            </span>
          </div>
          <div className="h-2 bg-amber-200 dark:bg-amber-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-amber-700 dark:text-amber-300 mt-3">
          {progressPercent === 100 ? '🎉 Congratulations! You have completed this topic!' :
           completedLearningModules > 0 ? `${learningModules.length - completedLearningModules} learning module${learningModules.length - completedLearningModules !== 1 ? 's' : ''} remaining.` :
           'Begin your learning journey through this topic.'}
        </p>
      </div>
    </div>
  )
}
