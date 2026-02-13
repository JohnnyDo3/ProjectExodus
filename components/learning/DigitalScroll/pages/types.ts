import type { ReactNode } from 'react'
import type { Module, TopicDefinition } from '@/data/modules'
import type { LearningLevel } from '@/types/learning'

// Game item type for interactive activities
export interface GameItem {
  id: string
  term: string
  definition: string
  hint?: string
}

// Ribbon configuration
export interface RibbonConfig {
  name: string
  description: string
  icon: string
  colors: {
    from: string
    to: string
    gradient: string
  }
}

// Page content structure
export interface ScrollContent {
  type: 'cover' | 'inside-cover' | 'toc' | 'learning-mission' | 'chapter-divider' | 'chapter-intro' | 'verse' | 'content' | 'chapter-review' | 'notes-enhanced' | 'games' | 'quiz'
  chapterIndex?: number
  verseIndex?: number
  pageIndex?: number
  content?: ReactNode
  title?: string
  subtitle?: string
  module?: Module
  gameItems?: GameItem[]
  keyTerms?: Array<{ term: string; definition: string }>
  funFacts?: string[]
  realWorldExamples?: Array<{ title: string; description: string; icon: string }>
  summaryPoints?: string[]
}

// Common props for all page components
export interface BasePageProps {
  topic: TopicDefinition
  modules: Module[]
  selectedLevel: LearningLevel
  currentRibbon: RibbonConfig | null
  totalPages: number
  currentPageIndex: number
}

// Props for pages that need notes functionality
export interface NotesPageProps extends BasePageProps {
  pageNotes: Record<string, string>
  saveNote: (key: string, value: string) => void
}

// Props for pages that need navigation
export interface NavigablePageProps extends BasePageProps {
  goToPage: (index: number) => void
  goToChapter: (index: number) => void
}

// Props for game/quiz pages
export interface GamePageProps extends BasePageProps {
  page: ScrollContent
  completedGames: Record<number, boolean>
  setCompletedGames: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
  prevPage: () => void
}
