'use client'

import type { LearningLevel } from '@/types/learning'
import type { ScrollContent } from './types'
import { ScrollGameSelector } from '../ScrollGames'
import { AncientBorder } from '../DecorativeElements'
import { LEARNING_STAGE_RIBBONS, STAGE_ORDER } from '../scrollConstants'

interface GamesPageProps {
  page: ScrollContent
  selectedLevel: LearningLevel
  completedGames: Record<number, boolean>
  setCompletedGames: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
}

export function GamesPage({
  page,
  selectedLevel,
  completedGames,
  setCompletedGames,
}: GamesPageProps) {
  const stageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
  const gamesRibbon = stageKey ? LEARNING_STAGE_RIBBONS[stageKey] : null
  const gamesColor = gamesRibbon?.colors.from || 'var(--primary)'
  const chapterIdx = page.chapterIndex ?? 0

  const handleGameComplete = (score: number) => {
    if (score >= 60) {
      setCompletedGames(prev => ({ ...prev, [chapterIdx]: true }))
    }
  }

  return (
    <div className="w-full h-full flex flex-col relative px-3 py-2">
      <AncientBorder />

      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))] flex items-center justify-center gap-2">
          <span className="text-xl">🎮</span> Practice Activities
        </h3>
        <p className="text-xs text-[var(--muted-foreground)]">
          Test your knowledge with interactive games
        </p>
        <div
          className="w-16 h-0.5 mx-auto mt-2"
          style={{ background: `linear-gradient(to right, transparent, ${gamesColor}, transparent)` }}
        />
      </div>

      {/* Games selector fills remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {(page.gameItems?.length ?? 0) > 0 ? (
          <ScrollGameSelector
            items={page.gameItems || []}
            topicColor={gamesColor}
            level={selectedLevel}
            onComplete={handleGameComplete}
            className="h-full"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Activities coming soon...
            </p>
          </div>
        )}
      </div>

      {/* Game completion indicator */}
      {completedGames[chapterIdx] && (
        <div className="shrink-0 text-center py-2 border-t border-[var(--border)]/20">
          <p className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
            <span>✓</span> Games Completed - Quiz Unlocked!
          </p>
        </div>
      )}
    </div>
  )
}
