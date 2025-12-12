'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, Wrench, Microscope, Globe, Hammer,
  ChevronRight, Clock, GraduationCap, Play, CheckCircle2,
  Folder, FolderOpen
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import {
  Module,
  Classroom,
  CoreTopic,
  getModulesByClassroom,
  getTopicClassrooms,
  DEFAULT_CLASSROOMS
} from '@/data/modules'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'

// Icon mapping for classrooms
const CLASSROOM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'fundamentals': BookOpen,
  'practical-skills': Wrench,
  'deep-dive': Microscope,
  'real-world': Globe,
  'projects': Hammer,
}

interface ClassroomBrowserProps {
  topicSlug: CoreTopic
  topicTitle: string
  selectedLevel: LearningLevel
  completedModules?: Set<string>
}

export function ClassroomBrowser({
  topicSlug,
  topicTitle,
  selectedLevel,
  completedModules = new Set()
}: ClassroomBrowserProps) {
  const [expandedClassroom, setExpandedClassroom] = useState<string | null>('fundamentals')

  const classrooms = getTopicClassrooms(topicSlug)
  const modulesByClassroom = getModulesByClassroom(topicSlug)

  // If no classrooms with modules, show all modules flat
  if (classrooms.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Folder className="w-6 h-6 text-theme-primary" />
        <h2 className="text-xl font-black text-[var(--foreground)]">
          Explore {topicTitle} Classrooms
        </h2>
      </div>

      <div className="space-y-3">
        {classrooms.map((classroom) => {
          const Icon = CLASSROOM_ICONS[classroom.id] || BookOpen
          const modules = modulesByClassroom[classroom.id] || []
          const isExpanded = expandedClassroom === classroom.id
          const completedCount = modules.filter(m => completedModules.has(m.id)).length

          return (
            <div key={classroom.id} className="rounded-xl border-2 border-[var(--border)] overflow-hidden">
              {/* Classroom Header */}
              <button
                onClick={() => setExpandedClassroom(isExpanded ? null : classroom.id)}
                className={`w-full flex items-center justify-between p-4 transition-colors ${
                  isExpanded
                    ? 'bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]'
                    : 'bg-[var(--card)] hover:bg-[var(--muted)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isExpanded
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--muted)] text-theme-muted'
                  }`}>
                    {isExpanded ? <FolderOpen className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <h3 className={`font-bold ${isExpanded ? 'text-theme-primary' : 'text-[var(--foreground)]'}`}>
                      {classroom.name}
                    </h3>
                    <p className="text-sm text-theme-muted">{classroom.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-bold text-theme-muted">
                      {modules.length} lesson{modules.length !== 1 ? 's' : ''}
                    </span>
                    {completedCount > 0 && (
                      <span className="text-xs text-green-500 block">
                        {completedCount} completed
                      </span>
                    )}
                  </div>
                  <ChevronRight className={`w-5 h-5 text-theme-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </button>

              {/* Modules List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 space-y-3 bg-[var(--muted)]/30">
                      {modules.map((module, idx) => {
                        const isCompleted = completedModules.has(module.id)
                        const duration = module.duration[selectedLevel]

                        return (
                          <Link
                            key={module.id}
                            href={`/learn/topics/${topicSlug}/modules/${module.slug}?level=${selectedLevel.toLowerCase()}`}
                          >
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center gap-3 p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all group"
                            >
                              {/* Module Number/Status */}
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                isCompleted
                                  ? 'bg-green-500 text-white'
                                  : 'bg-[var(--primary)] text-white'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  idx + 1
                                )}
                              </div>

                              {/* Module Info */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[var(--foreground)] group-hover:text-theme-primary transition-colors truncate">
                                  {module.title}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-theme-muted">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {duration} min
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    {module.lessons.length} parts
                                  </span>
                                  {module.isMasterclass && (
                                    <span className="px-1.5 py-0.5 bg-yellow-400 text-yellow-900 rounded text-[10px] font-black">
                                      MASTERCLASS
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Play Button */}
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Play className="w-4 h-4 ml-0.5" />
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Level indicator */}
      <div className="flex items-center justify-center gap-2 mt-6 text-sm text-theme-muted">
        <GraduationCap className="w-4 h-4" />
        <span>
          Viewing for {LEARNING_LEVELS[selectedLevel].icon} {LEARNING_LEVELS[selectedLevel].label}
        </span>
      </div>
    </div>
  )
}

// Compact version for sidebar or widget use
export function ClassroomQuickNav({
  topicSlug,
  selectedLevel,
  currentModuleSlug
}: {
  topicSlug: CoreTopic
  selectedLevel: LearningLevel
  currentModuleSlug?: string
}) {
  const classrooms = getTopicClassrooms(topicSlug)
  const modulesByClassroom = getModulesByClassroom(topicSlug)

  if (classrooms.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-[var(--foreground)] flex items-center gap-2">
        <Folder className="w-4 h-4 text-theme-primary" />
        Quick Navigation
      </h3>

      <div className="space-y-2">
        {classrooms.map(classroom => {
          const modules = modulesByClassroom[classroom.id] || []
          const Icon = CLASSROOM_ICONS[classroom.id] || BookOpen

          return (
            <div key={classroom.id}>
              <div className="flex items-center gap-2 text-sm font-bold text-theme-muted mb-1">
                <Icon className="w-3 h-3" />
                {classroom.name}
              </div>
              <div className="pl-5 space-y-1">
                {modules.map(module => (
                  <Link
                    key={module.id}
                    href={`/learn/topics/${topicSlug}/modules/${module.slug}?level=${selectedLevel.toLowerCase()}`}
                    className={`block text-sm truncate transition-colors ${
                      module.slug === currentModuleSlug
                        ? 'text-theme-primary font-bold'
                        : 'text-theme-muted hover:text-[var(--foreground)]'
                    }`}
                  >
                    {module.title}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
