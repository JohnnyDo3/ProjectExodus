'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils/cn'
import type { ScrollContent } from './types'
import { ScrollPage } from '../ScrollPage'
import { sanitizeHtml } from '@/lib/utils/sanitizeHtml'

interface ContentPageProps {
  page: ScrollContent
  currentPageIndex: number
  totalPages: number
  bookPages: ScrollContent[]
  side: 'left' | 'right'
}

export function ContentPage({
  page,
  currentPageIndex,
  totalPages,
  bookPages,
  side,
}: ContentPageProps) {
  // Calculate cognitive complexity based on content length
  const contentText = typeof page.content === 'string' ? page.content : ''
  const wordCount = contentText.split(/\s+/).length
  const contentComplexity: 1 | 2 | 3 = wordCount > 300 ? 3 : wordCount > 150 ? 2 : 1
  const complexityLabels = ['Quick read', 'Moderate', 'Deep dive']

  // Get next page info for anticipation hint
  const nextPageInList = bookPages[currentPageIndex + 1]
  const nextTopicHint = nextPageInList?.type === 'content'
    ? undefined
    : nextPageInList?.type === 'chapter-review'
      ? 'Chapter Review'
      : nextPageInList?.type === 'games'
        ? 'Practice Games'
        : nextPageInList?.type === 'quiz'
          ? 'Knowledge Check'
          : undefined

  // Sanitize HTML content
  const sanitizedContent = useMemo(() => {
    if (typeof page.content === 'string') {
      return sanitizeHtml(page.content)
    }
    return null
  }, [page.content])

  return (
    <ScrollPage
      pageNumber={currentPageIndex + 1}
      totalPages={totalPages}
      chapterIndex={page.chapterIndex ?? 0}
      side={side}
      allowScroll={true}
    >
      {/* Cognitive load indicator */}
      <div className="flex justify-end mb-1 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  i <= contentComplexity ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'
                )}
              />
            ))}
          </div>
          <span className="text-[8px] text-[var(--muted-foreground)]">
            {complexityLabels[contentComplexity - 1]}
          </span>
        </div>
      </div>

      {/* Content area - styled by lesson-content CSS classes */}
      <div className="flex-1 min-h-0">
        {sanitizedContent ? (
          <div
            className="lesson-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        ) : (
          <div className="lesson-content">
            {page.content}
          </div>
        )}
      </div>

      {/* Page turn anticipation hint */}
      {nextTopicHint && (
        <div className="shrink-0 flex justify-end pt-1">
          <div className="flex items-center gap-1 text-[8px] text-[var(--muted-foreground)] opacity-60">
            <span>Next:</span>
            <span className="font-medium text-[var(--primary)]">{nextTopicHint}</span>
            <span>→</span>
          </div>
        </div>
      )}
    </ScrollPage>
  )
}
