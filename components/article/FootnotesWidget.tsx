'use client'

/**
 * Sidebar widget that lists the article's footnotes. Sourced from
 * lib/article/extractFootnotes.ts — the parent component pulls them
 * out of the article body so they don't render twice. Sits above the
 * ReferencesWidget on the article page sidebar.
 */

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ChevronDown, ChevronUp, BookMarked } from 'lucide-react'
import type { ExtractedFootnote } from '@/lib/article/extractFootnotes'

interface FootnotesWidgetProps {
  footnotes: ExtractedFootnote[]
}

export function FootnotesWidget({ footnotes }: FootnotesWidgetProps) {
  const [expanded, setExpanded] = useState(true)

  // Auto-expand whenever a reader clicks an in-body footnote marker
  // (e.g. <a href="#footnote-3">). Without this, a collapsed widget
  // would silently swallow the scroll-into-view jump because the
  // target element isn't in the DOM tree.
  useEffect(() => {
    if (!footnotes || footnotes.length === 0) return
    const anchors = new Set(footnotes.map(f => `#${f.anchorId}`))

    const expandIfTargetingFootnote = (hash: string) => {
      if (!hash) return
      if (!anchors.has(hash)) return
      setExpanded(true)
      // After React paints the expanded list, re-scroll the target into
      // view — the initial browser jump landed before the entry was
      // rendered.
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }

    // Hash-based jumps (clicks on <a href="#footnote-N"> with the same
    // origin, or pasted URLs landing on the page).
    const onHashChange = () => expandIfTargetingFootnote(window.location.hash)
    window.addEventListener('hashchange', onHashChange)

    // Same-hash clicks (clicking the same marker twice doesn't fire
    // hashchange) — catch via global click delegation.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (anchors.has(href)) {
        // Don't preventDefault — let the browser handle the scroll, we
        // just ensure the widget is open before that lands.
        expandIfTargetingFootnote(href)
      }
    }
    document.addEventListener('click', onClick)

    // Initial mount: if the URL already targets a footnote (e.g.
    // someone shared a #footnote-3 link), expand immediately.
    expandIfTargetingFootnote(window.location.hash)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onClick)
    }
  }, [footnotes])

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
                key={fn.anchorId}
                // Use the anchorId derived from the source so in-body
                // markers like <a href="#footnote-0"> scroll to the
                // matching entry. Display is still 1-indexed via fn.number.
                id={fn.anchorId}
                className="flex gap-2 text-theme-muted leading-relaxed scroll-mt-24"
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
