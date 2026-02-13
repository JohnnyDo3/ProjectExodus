'use client'

import { cn } from '@/lib/utils/cn'
import type { TopicDefinition } from '@/data/modules'
import type { RibbonConfig } from './types'
import { AncientBorder } from '../DecorativeElements'

interface LearningMissionPageProps {
  topic: TopicDefinition
  currentRibbon: RibbonConfig | null
  pageNotes: Record<string, string>
  saveNote: (key: string, value: string) => void
}

export function LearningMissionPage({
  topic,
  currentRibbon,
  pageNotes,
  saveNote,
}: LearningMissionPageProps) {
  const missionColor = currentRibbon?.colors.from || 'var(--primary)'

  return (
    <div className="w-full h-full flex flex-col relative">
      <AncientBorder />

      {/* Header - compact */}
      <div className="text-center pt-3 pb-1 shrink-0">
        <span className="text-lg">🎯</span>
        <h3 className="text-sm font-serif font-bold text-[var(--book-text,var(--foreground))]">
          Set Your Intentions
        </h3>
        <p className="text-[8px] text-[var(--muted-foreground)] italic">
          Complete each statement to define your learning goals
        </p>
      </div>

      {/* Divider */}
      <div
        className="w-1/2 h-px mx-auto mb-2 shrink-0"
        style={{
          background: `linear-gradient(to right, transparent, ${missionColor}60, transparent)`,
        }}
      />

      {/* Fill-in-the-blank Intentions - evenly distributed */}
      <div className="flex-1 min-h-0 px-3 pb-2 flex flex-col justify-evenly">
        {/* Intention 1: What I hope to learn */}
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[10px]">✨</span>
            <p className="text-[9px] font-medium text-[var(--book-text,var(--foreground))]">
              By studying {topic.title}, I hope to learn...
            </p>
          </div>
          <input
            type="text"
            className={cn(
              "w-full px-2 py-1 text-xs font-serif",
              "bg-transparent border-b-2 border-dashed",
              "text-[var(--book-text,var(--foreground))]",
              "placeholder:text-[var(--muted-foreground)]/40 placeholder:italic",
              "focus:outline-none focus:border-solid transition-all"
            )}
            style={{ borderColor: `${missionColor}40` }}
            placeholder="what you want to discover..."
            value={pageNotes['mission-hope-to-learn'] || ''}
            onChange={(e) => saveNote('mission-hope-to-learn', e.target.value)}
          />
        </div>

        {/* Intention 2: What I already know */}
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[10px]">💭</span>
            <p className="text-[9px] font-medium text-[var(--book-text,var(--foreground))]">
              What I already know about this topic is...
            </p>
          </div>
          <input
            type="text"
            className={cn(
              "w-full px-2 py-1 text-xs font-serif",
              "bg-transparent border-b-2 border-dashed",
              "text-[var(--book-text,var(--foreground))]",
              "placeholder:text-[var(--muted-foreground)]/40 placeholder:italic",
              "focus:outline-none focus:border-solid transition-all"
            )}
            style={{ borderColor: `${missionColor}40` }}
            placeholder="your existing knowledge..."
            value={pageNotes['mission-already-know'] || ''}
            onChange={(e) => saveNote('mission-already-know', e.target.value)}
          />
        </div>

        {/* Intention 3: How I will apply */}
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[10px]">🌱</span>
            <p className="text-[9px] font-medium text-[var(--book-text,var(--foreground))]">
              I plan to apply this knowledge by...
            </p>
          </div>
          <input
            type="text"
            className={cn(
              "w-full px-2 py-1 text-xs font-serif",
              "bg-transparent border-b-2 border-dashed",
              "text-[var(--book-text,var(--foreground))]",
              "placeholder:text-[var(--muted-foreground)]/40 placeholder:italic",
              "focus:outline-none focus:border-solid transition-all"
            )}
            style={{ borderColor: `${missionColor}40` }}
            placeholder="how you'll use what you learn..."
            value={pageNotes['mission-apply-knowledge'] || ''}
            onChange={(e) => saveNote('mission-apply-knowledge', e.target.value)}
          />
        </div>
      </div>

      {/* Footer hint */}
      <div className="shrink-0 text-center py-1.5 border-t border-[var(--border)]/20">
        <p className="text-[8px] text-[var(--muted-foreground)]">
          Turn the page to begin Chapter 1 →
        </p>
      </div>
    </div>
  )
}
