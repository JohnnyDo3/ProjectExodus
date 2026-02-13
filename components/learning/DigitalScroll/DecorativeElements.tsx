'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils/cn'

// Ancient border with corner flourishes
export function AncientBorder({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {/* Corner flourishes */}
      <svg className="absolute top-2 left-2 w-12 h-12 text-[var(--primary)]/20" viewBox="0 0 48 48">
        <path
          d="M4 24 L4 4 L24 4 M4 4 L16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
      <svg className="absolute top-2 right-2 w-12 h-12 text-[var(--primary)]/20 rotate-90" viewBox="0 0 48 48">
        <path
          d="M4 24 L4 4 L24 4 M4 4 L16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-2 left-2 w-12 h-12 text-[var(--primary)]/20 -rotate-90" viewBox="0 0 48 48">
        <path
          d="M4 24 L4 4 L24 4 M4 4 L16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-2 right-2 w-12 h-12 text-[var(--primary)]/20 rotate-180" viewBox="0 0 48 48">
        <path
          d="M4 24 L4 4 L24 4 M4 4 L16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
    </div>
  )
}

// Decorative divider with stable symbol (fixed flicker issue)
export function HieroglyphicDivider({ color, seed = 0 }: { color?: string; seed?: number }) {
  const symbol = useMemo(() => {
    const symbols = ['☥', '𓂀', '☀', '✦', '◈', '❋', '⚜']
    return symbols[Math.abs(seed) % symbols.length]
  }, [seed])

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${color || 'var(--border)'}, transparent)`,
        }}
      />
      <span
        className="text-xl opacity-40"
        style={{ color: color || 'var(--muted-foreground)' }}
      >
        {symbol}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(to left, transparent, ${color || 'var(--border)'}, transparent)`,
        }}
      />
    </div>
  )
}

// Page number display (Arabic numerals, not Roman)
export function PageNumber({ number, total }: { number: number; total: number }) {
  return (
    <div className="text-center text-xs text-[var(--muted-foreground)]/60 font-serif">
      <span>{number}</span>
      <span className="mx-2 opacity-30">of</span>
      <span>{total}</span>
    </div>
  )
}

// Learning stage quote (replaced guardian quotes)
export function getLearningStageQuote(chapterIndex: number): string {
  const quotes: Record<number, string> = {
    0: "Every expert was once a beginner. The foundation you build today supports everything that follows.",
    1: "Growth happens at the edge of comfort. Embrace the challenge of new understanding.",
    2: "Knowledge becomes powerful when we see how ideas connect across boundaries.",
    3: "Theory without practice is empty. Apply what you learn to make it real.",
    4: "Mastery isn't perfection—it's the confidence to navigate complexity.",
    5: "Innovation emerges when we question assumptions and explore new possibilities.",
    6: "The greatest learning comes from teaching others. Share what you know.",
  }
  return quotes[chapterIndex] || "Learning is a journey, not a destination."
}
