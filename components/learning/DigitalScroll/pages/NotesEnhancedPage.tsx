'use client'

import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Module } from '@/data/modules'
import type { ScrollContent } from './types'
import { AncientBorder } from '../DecorativeElements'
import { LEARNING_STAGE_RIBBONS, STAGE_ORDER } from '../scrollConstants'

interface NotesEnhancedPageProps {
  page: ScrollContent
  modules: Module[]
  pageNotes: Record<string, string>
  saveNote: (key: string, value: string) => void
  onOpenDiscussion: () => void
}

export function NotesEnhancedPage({
  page,
  modules,
  pageNotes,
  saveNote,
  onOpenDiscussion,
}: NotesEnhancedPageProps) {
  const stageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
  const enhancedRibbon = stageKey ? LEARNING_STAGE_RIBBONS[stageKey] : null
  const enhancedColor = enhancedRibbon?.colors.from || 'var(--primary)'

  const enhancedChapterTitle = page.chapterIndex !== undefined && page.chapterIndex < modules.length
    ? modules[page.chapterIndex].title
    : 'General'
  const enhancedNoteKey = `chapter-${page.chapterIndex ?? 'general'}-notes`

  return (
    <div className="w-full h-full flex flex-col relative px-3 py-2">
      <AncientBorder />

      {/* Header */}
      <div className="text-center pb-2 shrink-0">
        <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))]">
          🎯 Apply & Reflect
        </h3>
        <p className="text-sm text-[var(--muted-foreground)]">{enhancedChapterTitle}</p>
        <div
          className="w-16 h-0.5 mx-auto mt-2"
          style={{ background: `linear-gradient(to right, transparent, ${enhancedColor}, transparent)` }}
        />
      </div>

      {/* Real World Actions */}
      <div className="mb-3 shrink-0">
        <p className="text-xs font-bold text-[var(--muted-foreground)] mb-2 uppercase tracking-wider flex items-center gap-1.5">
          <span className="text-sm">🌍</span> Try This:
        </p>
        <div className="flex gap-2">
          {(page.realWorldExamples || []).slice(0, 3).map((ex, idx) => (
            <div
              key={idx}
              className="flex-1 p-3 rounded-lg bg-[var(--muted)]/20 text-center"
            >
              <span className="text-2xl block mb-1">{ex.icon}</span>
              <p className="text-sm font-medium text-[var(--book-text,var(--foreground))]">{ex.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes textarea - fills remaining space */}
      <div className="flex-1 min-h-0 flex flex-col">
        <p className="text-xs font-bold text-[var(--muted-foreground)] mb-2 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
          <span className="text-sm">📝</span> Your Notes:
        </p>
        <textarea
          className={cn(
            "flex-1 w-full resize-none",
            "bg-transparent",
            "border border-dashed border-[var(--border)]/40 rounded-lg",
            "p-3 text-sm font-serif",
            "text-[var(--book-text,var(--foreground))]",
            "placeholder:text-[var(--muted-foreground)]/50 placeholder:italic",
            "focus:outline-none focus:border-[var(--primary)]/50"
          )}
          placeholder="Write your reflections and thoughts here..."
          value={pageNotes[enhancedNoteKey] || ''}
          onChange={(e) => saveNote(enhancedNoteKey, e.target.value)}
          style={{
            lineHeight: '1.6em',
            backgroundImage: 'linear-gradient(to bottom, transparent 90%, var(--border) 90%, var(--border) 92%, transparent 92%)',
            backgroundSize: '100% 1.6em',
            backgroundPosition: '0 0.2em',
          }}
        />
      </div>

      {/* Discussion Button */}
      <div className="shrink-0 pt-3 border-t border-[var(--border)]/20 mt-2">
        <button
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg",
            "bg-[var(--muted)]/30 hover:bg-[var(--muted)]/50",
            "text-[var(--book-text,var(--foreground))] text-sm font-medium",
            "transition-colors"
          )}
          onClick={onOpenDiscussion}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Join Discussion</span>
        </button>
      </div>
    </div>
  )
}
