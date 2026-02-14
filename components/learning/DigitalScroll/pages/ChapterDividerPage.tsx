'use client'

import type { ScrollContent } from './types'
import { ChapterDivider } from '../ScrollPage'
import { getLearningStageQuote } from '../DecorativeElements'

interface ChapterDividerPageProps {
  page: ScrollContent
}

export function ChapterDividerPage({ page }: ChapterDividerPageProps) {
  return (
    <div className="w-full h-full bg-[var(--book-paper,var(--card))] text-[var(--book-text,var(--foreground))]">
      <ChapterDivider
        chapterIndex={page.chapterIndex ?? 0}
        chapterTitle={page.title || ''}
        versesCount={page.module?.lessons.length ?? 0}
        guardianQuote={getLearningStageQuote(page.chapterIndex ?? 0)}
      />
    </div>
  )
}
