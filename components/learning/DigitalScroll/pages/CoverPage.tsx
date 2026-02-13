'use client'

import type { TopicDefinition } from '@/data/modules'
import type { RibbonConfig } from './types'
import { CORE_TOPIC_ICONS } from '../scrollConstants'

interface CoverPageProps {
  topic: TopicDefinition
  currentRibbon: RibbonConfig | null
}

export function CoverPage({ topic, currentRibbon }: CoverPageProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center px-4">
        <span className="text-7xl block mb-6">
          {CORE_TOPIC_ICONS[topic.id] || '📖'}
        </span>
        <h1
          className="text-3xl sm:text-4xl font-serif font-bold"
          style={{ color: currentRibbon?.colors.from }}
        >
          {topic.title}
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-4 italic">
          A Journey of Knowledge
        </p>
      </div>
    </div>
  )
}
