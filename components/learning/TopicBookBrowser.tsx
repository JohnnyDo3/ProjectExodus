'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, ChevronRight, ChevronDown, Clock,
  CheckCircle2, Bookmark, GraduationCap, FolderOpen
} from 'lucide-react'
import { Module, CoreTopic, getTopic } from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// Handwritten font
const handwritten = "font-['Caveat',_cursive]"

// Sub-topic color themes
const SUBTOPIC_COLORS = [
  { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-900', accent: 'bg-amber-600', light: 'bg-amber-100' },
  { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-900', accent: 'bg-emerald-600', light: 'bg-emerald-100' },
  { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-900', accent: 'bg-blue-600', light: 'bg-blue-100' },
  { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-900', accent: 'bg-purple-600', light: 'bg-purple-100' },
  { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-900', accent: 'bg-rose-600', light: 'bg-rose-100' },
  { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-900', accent: 'bg-cyan-600', light: 'bg-cyan-100' },
]

interface TopicBookProps {
  topicSlug: CoreTopic
  selectedLevel: LearningLevel
  completedModules?: string[]
}

// Group modules by their category (sub-topic)
function groupModulesBySubtopic(modules: Module[]): { subtopic: string; modules: Module[] }[] {
  const groups: Record<string, Module[]> = {}

  modules.forEach(module => {
    const subtopic = module.category || 'General'
    if (!groups[subtopic]) {
      groups[subtopic] = []
    }
    groups[subtopic].push(module)
  })

  // Convert to array and sort alphabetically by subtopic name
  return Object.entries(groups)
    .map(([subtopic, mods]) => ({ subtopic, modules: mods }))
    .sort((a, b) => a.subtopic.localeCompare(b.subtopic))
}

// Sub-topic Section Component
function SubtopicSection({
  subtopic,
  modules,
  subtopicIndex,
  selectedLevel,
  topicSlug,
  completedModules = [],
  isExpanded,
  onToggle
}: {
  subtopic: string
  modules: Module[]
  subtopicIndex: number
  selectedLevel: LearningLevel
  topicSlug: CoreTopic
  completedModules: string[]
  isExpanded: boolean
  onToggle: () => void
}) {
  const colors = SUBTOPIC_COLORS[subtopicIndex % SUBTOPIC_COLORS.length]

  // Calculate progress for this subtopic
  const completedCount = modules.filter(m => completedModules.includes(m.id)).length
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const progress = modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 0

  return (
    <motion.div
      layout
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Sub-topic Header */}
      <button
        onClick={onToggle}
        className={`w-full ${colors.bg} ${colors.border} border-2 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center`}>
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className={`${handwritten} text-xl sm:text-2xl ${colors.text}`}>
                  {subtopic}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {modules.length} module{modules.length !== 1 ? 's' : ''} • {totalLessons} lesson{totalLessons !== 1 ? 's' : ''}
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

      {/* Expanded Modules */}
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
                {modules.map((module, moduleIdx) => {
                  const isModuleCompleted = completedModules.includes(module.id)
                  const moduleLessons = module.lessons.length
                  const moduleDuration = module.duration[selectedLevel]

                  return (
                    <Link
                      key={module.id}
                      href={`/learn/modules/${module.slug}?level=${selectedLevel.toLowerCase()}&topic=${topicSlug}`}
                      className={`${colors.bg} border ${colors.border} rounded-lg p-3 sm:p-4 hover:shadow-md transition-all group`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Module number badge */}
                        <div className={`w-8 h-8 ${colors.accent} rounded-lg text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                          {moduleIdx + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`${handwritten} text-lg sm:text-xl font-bold ${colors.text} group-hover:underline truncate`}>
                              {module.title}
                            </h4>
                            {isModuleCompleted && (
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                            {module.description[selectedLevel]}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {moduleLessons} lesson{moduleLessons !== 1 ? 's' : ''}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {moduleDuration} min
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
  const [expandedSubtopic, setExpandedSubtopic] = useState<string | null>(null)

  const topic = getTopic(topicSlug)
  if (!topic) return null

  const subtopicGroups = groupModulesBySubtopic(topic.modules)

  // Calculate total stats
  const totalModules = topic.modules.length
  const totalLessons = topic.modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedModuleCount = completedModules.filter(id => topic.modules.some(m => m.id === id)).length
  const progressPercent = totalModules > 0 ? Math.round((completedModuleCount / totalModules) * 100) : 0

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary)]" />
          <h2 className={`${handwritten} text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-gray-200`}>
            {topic.title}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {subtopicGroups.length} sub-topic{subtopicGroups.length !== 1 ? 's' : ''} • {totalModules} module{totalModules !== 1 ? 's' : ''} • {totalLessons} lesson{totalLessons !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
          <GraduationCap className="w-4 h-4" />
          <span>Level: {LEARNING_LEVELS[selectedLevel].icon} {LEARNING_LEVELS[selectedLevel].label}</span>
        </div>
      </div>

      {/* Sub-topic Sections */}
      <div className="grid gap-3 sm:gap-4">
        {subtopicGroups.map((group, idx) => (
          <SubtopicSection
            key={group.subtopic}
            subtopic={group.subtopic}
            modules={group.modules}
            subtopicIndex={idx}
            selectedLevel={selectedLevel}
            topicSlug={topicSlug}
            completedModules={completedModules}
            isExpanded={expandedSubtopic === group.subtopic}
            onToggle={() => setExpandedSubtopic(
              expandedSubtopic === group.subtopic ? null : group.subtopic
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
            {completedModuleCount} / {totalModules}
          </span>
        </div>
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
          {progressPercent === 100 ? 'Congratulations! You have completed all modules.' :
           progressPercent > 0 ? `${100 - progressPercent}% remaining to complete this topic.` :
           'Begin your learning journey through this topic.'}
        </p>
      </div>
    </div>
  )
}
