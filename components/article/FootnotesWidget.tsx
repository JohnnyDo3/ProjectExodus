'use client'

/**
 * Sidebar widget that lists the article's footnotes. Sourced from
 * lib/article/extractFootnotes.ts — the parent component pulls them
 * out of the article body so they don't render twice. Sits above the
 * ReferencesWidget on the article page sidebar.
 */

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChevronDown, ChevronUp, BookMarked } from 'lucide-react'
import type { ExtractedFootnote } from '@/lib/article/extractFootnotes'

interface FootnotesWidgetProps {
  footnotes: ExtractedFootnote[]
}

export function FootnotesWidget({ footnotes }: FootnotesWidgetProps) {
  const [expanded, setExpanded] = useState(true)

  if (!footnotes || footnotes.length === 0) return null

  return (
    <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
      <CardHeader className="pb-3">
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-between text-left"
        >
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-theme-primary" />
            Footnotes
            <span className="text-xs font-medium text-theme-muted">
              ({footnotes.length})
            </span>
          </CardTitle>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-theme-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-theme-muted" />
          )}
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0">
          <ol className="space-y-3 text-sm">
            {footnotes.map(fn => (
              <li
                key={fn.number}
                id={`footnote-${fn.number}`}
                className="flex gap-2 text-theme-muted leading-relaxed"
              >
                <span className="shrink-0 font-black text-theme-primary tabular-nums">
                  {fn.number}.
                </span>
                <span
                  className="flex-1 [&_a]:text-theme-primary [&_a]:underline"
                  // Footnote HTML went through the article body's
                  // sanitizer before being persisted, so it's safe to
                  // render here.
                  dangerouslySetInnerHTML={{ __html: fn.html }}
                />
              </li>
            ))}
          </ol>
        </CardContent>
      )}
    </Card>
  )
}
