'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { LearningLevel } from '@/types/learning'
import type { ScrollContent } from './types'
import { GradedQuiz } from '../ScrollGames'
import { AncientBorder } from '../DecorativeElements'
import { LEARNING_STAGE_RIBBONS, STAGE_ORDER } from '../scrollConstants'

interface QuizPageProps {
  page: ScrollContent
  selectedLevel: LearningLevel
  completedGames: Record<number, boolean>
  setCompletedGames: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
  prevPage: () => void
  onQuizComplete?: (chapterIndex: number, score: number, total: number) => void
}

export function QuizPage({
  page,
  selectedLevel,
  completedGames,
  setCompletedGames,
  prevPage,
  onQuizComplete,
}: QuizPageProps) {
  const [showSkipWarning, setShowSkipWarning] = useState(false)
  const stageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
  const quizRibbon = stageKey ? LEARNING_STAGE_RIBBONS[stageKey] : null
  const quizColor = quizRibbon?.colors.from || 'var(--primary)'
  const chapterIdx = page.chapterIndex ?? 0

  const isQuizUnlocked = completedGames[chapterIdx] === true

  const handleSkipPractice = () => {
    setCompletedGames(prev => ({ ...prev, [chapterIdx]: true }))
    setShowSkipWarning(false)
  }

  const handleQuizComplete = (score: number, total: number) => {
    onQuizComplete?.(chapterIdx, score, total)
  }

  // Quiz is locked - show unlock prompt
  if (!isQuizUnlocked) {
    return (
      <div className="w-full h-full flex flex-col relative px-3 py-2">
        <AncientBorder />

        {/* Header */}
        <div className="text-center pb-2 shrink-0">
          <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))] flex items-center justify-center gap-2">
            <span className="text-xl">🔒</span> Knowledge Check
          </h3>
          <div
            className="w-16 h-0.5 mx-auto mt-2"
            style={{ background: `linear-gradient(to right, transparent, ${quizColor}, transparent)` }}
          />
        </div>

        {/* Unlock message */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 rounded-full bg-[var(--muted)]/30 flex items-center justify-center mb-4">
            <span className="text-4xl">🎮</span>
          </div>
          <h4 className="text-lg font-bold text-[var(--book-text,var(--foreground))] mb-2">
            Complete Practice Activities First
          </h4>
          <p className="text-sm text-[var(--muted-foreground)] mb-6 max-w-xs">
            Practice with the games on the previous page to unlock this quiz. This helps reinforce your learning!
          </p>

          {/* Go back button */}
          <button
            onClick={prevPage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: quizColor }}
          >
            <ChevronLeft className="w-4 h-4" />
            Go to Practice Games
          </button>

          {/* Skip option */}
          {!showSkipWarning ? (
            <button
              onClick={() => setShowSkipWarning(true)}
              className="mt-4 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline"
            >
              Skip practice (not recommended)
            </button>
          ) : (
            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 max-w-xs">
              <p className="text-xs text-amber-700 mb-2">
                Practice activities help reinforce learning. Are you sure you want to skip?
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setShowSkipWarning(false)}
                  className="px-3 py-1 text-xs rounded bg-[var(--muted)] text-[var(--foreground)]"
                >
                  Go Back
                </button>
                <button
                  onClick={handleSkipPractice}
                  className="px-3 py-1 text-xs rounded bg-amber-500 text-white"
                >
                  Skip Anyway
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Quiz is unlocked - show quiz
  return (
    <div className="w-full h-full flex flex-col relative px-3 py-2">
      <AncientBorder />

      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))] flex items-center justify-center gap-2">
          <span className="text-xl">✅</span> Knowledge Check
        </h3>
        <p className="text-xs text-[var(--muted-foreground)]">
          Chapter {chapterIdx + 1} Quiz
        </p>
        <div
          className="w-16 h-0.5 mx-auto mt-2"
          style={{ background: `linear-gradient(to right, transparent, ${quizColor}, transparent)` }}
        />
      </div>

      {/* Quiz fills remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {(page.gameItems?.length ?? 0) >= 5 ? (
          <GradedQuiz
            items={page.gameItems || []}
            topicColor={quizColor}
            level={selectedLevel}
            chapterIndex={chapterIdx}
            onComplete={handleQuizComplete}
            className="h-full"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Not enough terms for quiz (need at least 5)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
