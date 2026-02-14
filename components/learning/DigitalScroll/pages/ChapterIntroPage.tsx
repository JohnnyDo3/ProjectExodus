'use client'

import type { LearningLevel } from '@/types/learning'
import type { ScrollContent } from './types'
import { AncientBorder } from '../DecorativeElements'
import { LEARNING_STAGE_RIBBONS, STAGE_ORDER } from '../scrollConstants'

interface ChapterIntroPageProps {
  page: ScrollContent
  selectedLevel: LearningLevel
}

export function ChapterIntroPage({ page, selectedLevel }: ChapterIntroPageProps) {
  const stageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
  const introRibbon = stageKey ? LEARNING_STAGE_RIBBONS[stageKey] : null
  const introColor = introRibbon?.colors.from || 'var(--primary)'

  const chapterModule = page.module
  const allLessons = chapterModule?.lessons || []
  const chapterGame = chapterModule?.game
  const chapterQuiz = chapterModule?.quiz
  const totalDuration = chapterModule?.duration?.[selectedLevel] ||
    allLessons.reduce((sum, l) => sum + (l.duration || 0), 0)

  return (
    <div className="w-full h-full flex flex-col relative px-3 py-2 bg-[var(--book-paper,var(--card))] text-[var(--book-text,var(--foreground))]">
      <AncientBorder />

      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))]">
          Chapter {(page.chapterIndex ?? 0) + 1} Outline
        </h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          {totalDuration} min · {allLessons.length} lessons
        </p>
        {introRibbon && (
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            {introRibbon.icon} {introRibbon.name}: {introRibbon.description}
          </p>
        )}
        <div
          className="w-16 h-0.5 mx-auto mt-2"
          style={{
            background: `linear-gradient(to right, transparent, ${introColor}, transparent)`,
          }}
        />
      </div>

      {/* Full Curriculum Outline - fills available space */}
      <div className="flex-1 min-h-0 flex flex-col justify-evenly overflow-hidden">
        {/* LESSONS SECTION */}
        <div>
          <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="text-sm">📚</span> Lessons
          </p>
          <div className="space-y-1.5">
            {allLessons.slice(0, 5).map((lesson, idx) => (
              <div
                key={lesson.id || idx}
                className="flex items-center gap-2 py-1.5 px-2 rounded bg-[var(--muted)]/15"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: introColor }}
                >
                  {idx + 1}
                </div>
                <p className="flex-1 text-sm font-medium text-[var(--book-text,var(--foreground))] truncate">
                  {lesson.title}
                </p>
                <span className="text-xs text-[var(--muted-foreground)] shrink-0">
                  {lesson.duration}m
                </span>
                {lesson.hasActivity && (
                  <span className="text-sm" title="Includes activity">⚡</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* GAME & QUIZ ROW */}
        <div className="flex gap-3">
          {/* Game */}
          {chapterGame && (
            <div className="flex-1 p-3 rounded-lg bg-[var(--muted)]/20">
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase flex items-center gap-1 mb-1">
                <span className="text-base">🎮</span> Game
              </p>
              <p className="text-sm font-medium text-[var(--book-text,var(--foreground))]">
                {chapterGame.title}
              </p>
            </div>
          )}

          {/* Quiz */}
          {chapterQuiz && (
            <div className="flex-1 p-3 rounded-lg bg-[var(--muted)]/20">
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase flex items-center gap-1 mb-1">
                <span className="text-base">✅</span> Quiz
              </p>
              <p className="text-sm font-medium text-[var(--book-text,var(--foreground))]">
                {chapterQuiz.questions?.length || 0} questions
              </p>
            </div>
          )}
        </div>

        {/* Module Description */}
        {chapterModule?.description && (
          <div className="p-3 rounded-lg bg-[var(--muted)]/10 border-l-3" style={{ borderColor: introColor }}>
            <p className="text-sm italic text-[var(--muted-foreground)] leading-relaxed">
              {typeof chapterModule.description === 'string'
                ? chapterModule.description
                : chapterModule.description[selectedLevel] || chapterModule.description.HIGH_SCHOOL}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 text-center pt-2 border-t border-[var(--border)]/20">
        <p className="text-xs text-[var(--muted-foreground)]">
          Turn the page to begin →
        </p>
      </div>
    </div>
  )
}
