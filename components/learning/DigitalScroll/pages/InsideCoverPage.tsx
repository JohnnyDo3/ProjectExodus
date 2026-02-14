'use client'

import type { Module, TopicDefinition } from '@/data/modules'
import type { LearningLevel } from '@/types/learning'
import { InsideCover } from '../ScrollCover'

interface InsideCoverPageProps {
  topic: TopicDefinition
  modules: Module[]
  totalPages: number
  selectedLevel: LearningLevel
  onLevelSelect: (level: LearningLevel) => void
  goToPage: (index: number) => void
}

export function InsideCoverPage({
  topic,
  modules,
  totalPages,
  selectedLevel,
  onLevelSelect,
  goToPage,
}: InsideCoverPageProps) {
  return (
    <div className="w-full h-full bg-[var(--book-paper,var(--card))] text-[var(--book-text,var(--foreground))]">
      <InsideCover
        topicSlug={topic.id}
        topicTitle={topic.title}
        chapterCount={Math.min(modules.length, 7)}
        verseCount={modules.reduce((acc, m) => acc + m.lessons.length, 0)}
        pageCount={totalPages}
        selectedLevel={selectedLevel}
        onLevelSelect={(level) => onLevelSelect(level as LearningLevel)}
        onStartReading={() => goToPage(4)}
      />
    </div>
  )
}
