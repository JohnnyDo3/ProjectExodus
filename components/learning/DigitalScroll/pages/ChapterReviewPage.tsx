'use client'

import type { ScrollContent } from './types'
import { AncientBorder, getLearningStageQuote } from '../DecorativeElements'
import { LEARNING_STAGE_RIBBONS, STAGE_ORDER } from '../scrollConstants'

interface ChapterReviewPageProps {
  page: ScrollContent
}

export function ChapterReviewPage({ page }: ChapterReviewPageProps) {
  const stageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
  const reviewRibbon = stageKey ? LEARNING_STAGE_RIBBONS[stageKey] : null
  const reviewColor = reviewRibbon?.colors.from || 'var(--primary)'

  return (
    <div className="w-full h-full flex flex-col relative px-3 py-2 bg-[var(--book-paper,var(--card))] text-[var(--book-text,var(--foreground))]">
      <AncientBorder />

      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))] flex items-center justify-center gap-2">
          <span className="text-xl">📚</span> Chapter Review
        </h3>
        <div
          className="w-16 h-0.5 mx-auto mt-2"
          style={{ background: `linear-gradient(to right, transparent, ${reviewColor}, transparent)` }}
        />
      </div>

      {/* Content fills available space evenly */}
      <div className="flex-1 min-h-0 flex flex-col justify-evenly overflow-hidden">
        {/* Key Terms Section */}
        <div>
          <p className="text-xs font-bold text-[var(--muted-foreground)] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <span className="text-sm">📖</span> Key Terms
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(page.keyTerms || []).slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-[var(--muted)]/20"
              >
                <p className="text-sm font-bold text-[var(--book-text,var(--foreground))]">{item.term}</p>
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts Section */}
        <div>
          <p className="text-xs font-bold text-[var(--muted-foreground)] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <span className="text-sm">💡</span> Did You Know?
          </p>
          <div className="space-y-2">
            {(page.funFacts || []).slice(0, 2).map((fact, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg border-l-3 text-sm text-[var(--book-text,var(--foreground))] leading-relaxed"
                style={{ borderColor: reviewColor, background: `${reviewColor}10` }}
              >
                {fact}
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div>
          <p className="text-xs font-bold text-[var(--muted-foreground)] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <span className="text-sm">✓</span> Key Takeaways
          </p>
          <div className="space-y-2">
            {(page.summaryPoints || []).slice(0, 2).map((point, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5"
                  style={{ background: reviewColor }}
                >
                  ✓
                </span>
                <p className="text-sm text-[var(--book-text,var(--foreground))] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="shrink-0 px-3 pt-2 border-t border-[var(--border)]/20">
        <p className="text-xs text-[var(--muted-foreground)] italic text-center leading-relaxed">
          &ldquo;{getLearningStageQuote(page.chapterIndex ?? 0)}&rdquo;
        </p>
      </div>
    </div>
  )
}
