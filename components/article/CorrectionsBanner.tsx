'use client'

/**
 * Editorial correction / editor's note banner shown above an
 * article's body content when the author has set a correction. Plain
 * text only — surfaces transparency about post-publish edits. Sits
 * above the body so it can't be missed.
 */

import { AlertCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'

interface CorrectionsBannerProps {
  note: string
  noteAt?: string | null
}

export function CorrectionsBanner({ note, noteAt }: CorrectionsBannerProps) {
  if (!note || !note.trim()) return null

  return (
    <aside
      role="note"
      aria-label="Editor's note"
      className="mb-6 rounded-xl border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Editor&apos;s note
            </span>
            {noteAt && (
              <span className="text-xs text-amber-700/70 dark:text-amber-300/70">
                · <time dateTime={noteAt}>{formatDate(new Date(noteAt))}</time>
              </span>
            )}
          </div>
          <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed whitespace-pre-line">
            {note}
          </p>
        </div>
      </div>
    </aside>
  )
}
