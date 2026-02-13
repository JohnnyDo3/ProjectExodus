'use client'

import { ChevronRight } from 'lucide-react'
import type { Module } from '@/data/modules'
import type { RibbonConfig } from './types'
import { AncientBorder, HieroglyphicDivider } from '../DecorativeElements'
import { LEARNING_STAGE_RIBBONS, STAGE_ORDER } from '../scrollConstants'

interface TOCPageProps {
  modules: Module[]
  currentRibbon: RibbonConfig | null
  goToChapter: (index: number) => void
}

export function TOCPage({ modules, currentRibbon, goToChapter }: TOCPageProps) {
  return (
    <div className="w-full h-full flex flex-col px-2">
      <AncientBorder />
      {/* TOC Header */}
      <div className="text-center py-4 shrink-0">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--book-text,var(--foreground))] mb-1">
          Table of Contents
        </h2>
        <p className="text-xs text-[var(--muted-foreground)] italic font-serif">
          Your Learning Journey
        </p>
      </div>
      <HieroglyphicDivider color={currentRibbon?.colors.from} seed={0} />
      {/* Chapter List - fills available space with scroll if needed */}
      <div className="flex-1 overflow-y-auto space-y-2 py-2">
        {modules.slice(0, 7).map((module, i) => {
          const stageKey = STAGE_ORDER[i]
          const ribbon = stageKey ? LEARNING_STAGE_RIBBONS[stageKey] : null
          return (
            <button
              key={module.id}
              onClick={() => goToChapter(i)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--muted)] transition-colors text-left group border border-transparent hover:border-[var(--border)]"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0"
                style={{ background: ribbon?.colors.gradient }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] block">
                  Chapter {i + 1} {ribbon && `· ${ribbon.name}`}
                </span>
                <span className="font-serif text-base text-[var(--book-text,var(--foreground))] group-hover:text-[var(--primary)] transition-colors truncate block">
                  {module.title}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
            </button>
          )
        })}
      </div>
      {/* Footer */}
      <div className="text-center py-2 border-t border-[var(--border)]/20 shrink-0">
        <p className="text-[10px] text-[var(--muted-foreground)]">
          Click a chapter to begin reading
        </p>
      </div>
    </div>
  )
}
