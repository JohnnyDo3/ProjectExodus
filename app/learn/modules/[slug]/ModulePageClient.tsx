'use client'

import { useState } from 'react'
import { LearningCanvas } from '@/components/learning/LearningCanvas'
import { InteractiveTextbook } from '@/components/learning/InteractiveTextbook'
import { LearningLevel, LEARNING_LEVELS } from '@/types/learning'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, LayoutGrid, BookOpen } from 'lucide-react'
import type { Module } from '@/types/modules'

interface ModulePageClientProps {
  module: Module
  initialLevel: LearningLevel
  initialView: 'canvas' | 'classic'
  topicSlug: string | null
}

// Inline the level content adaptation to avoid importing from data/modules
function adaptModuleForLevel(module: Module, level: LearningLevel) {
  return {
    ...module,
    description: module.description[level],
    duration: module.duration[level],
    lessons: module.lessons.map(lesson => ({
      ...lesson,
      content: lesson.content[level]
    })),
    activities: module.activities.map(activity => ({
      ...activity,
      title: activity.title[level],
      description: activity.description[level],
      config: activity.config[level]
    })),
    quiz: {
      ...module.quiz,
      questions: module.quiz.questions.map(q => ({
        ...q,
        question: q.question[level],
        options: q.options[level],
        explanation: q.explanation[level]
      }))
    }
  }
}

export default function ModulePageClient({ module, initialLevel, initialView, topicSlug }: ModulePageClientProps) {
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(initialLevel)
  const [viewMode, setViewMode] = useState<'canvas' | 'classic'>(initialView)

  // Get content adapted for the selected level
  const levelContent = adaptModuleForLevel(module, selectedLevel)

  // Use the revolutionary LearningCanvas by default
  if (viewMode === 'canvas') {
    return (
      <div className="h-screen overflow-hidden">
        {/* View Toggle - small button in corner */}
        <button
          onClick={() => setViewMode('classic')}
          className="fixed top-20 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg text-xs font-medium text-gray-600 hover:bg-white transition-colors"
          title="Switch to classic view"
        >
          <BookOpen className="w-4 h-4" />
          Classic View
        </button>
        <LearningCanvas
          module={module}
          levelContent={levelContent}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          topicSlug={topicSlug || module.topic}
        />
      </div>
    )
  }

  // Classic InteractiveTextbook view
  return (
    <div className="h-screen overflow-hidden">
      {/* View Toggle - small button in corner */}
      <button
        onClick={() => setViewMode('canvas')}
        className="fixed top-20 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg text-xs font-medium text-gray-600 hover:bg-white transition-colors"
        title="Switch to discovery board"
      >
        <LayoutGrid className="w-4 h-4" />
        Discovery Board
      </button>
      <InteractiveTextbook
        module={module}
        levelContent={levelContent}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        topicSlug={topicSlug || module.topic}
      />
    </div>
  )
}
