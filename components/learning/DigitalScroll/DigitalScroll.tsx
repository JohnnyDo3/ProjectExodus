'use client'

// ============================================
// THE DIGITAL SCROLL
// "In the beginning was the Word..."
// Ancient manuscript meets digital revelation
// ============================================

import { useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { sanitizeHtml } from '@/lib/utils/sanitize'
import { X, Volume2, VolumeX, Maximize2, Minimize2, ChevronLeft, ChevronRight, GripVertical, MessageCircle } from 'lucide-react'

// Scroll components
import ScrollContainer, { ScrollWrapper, PageContainer, ScrollSpine, PageEdges } from './ScrollContainer'
import { ScrollCover, InsideCover } from './ScrollCover'
import { RibbonBookmarks } from './RibbonBookmarks'
import { ScrollPage, PageContent, VerseHeader, ChapterDivider } from './ScrollPage'
import { PageFlip, RapidPageFlip, usePageTurnSound } from './PageFlip'
import { ScrollOpenAnimation } from './ScrollOpenAnimation'
import { useScrollState } from './useScrollState'
import { ScrollGameSelector, GradedQuiz } from './ScrollGames'

// Game item type for interactive activities
interface GameItem {
  id: string
  term: string
  definition: string
  hint?: string
}

// Import term extraction utilities
import { extractTermsFromModule, KEY_TERMS_BY_TOPIC } from '@/lib/learning/termExtractor'
import {
  GUARDIAN_RIBBONS,
  RIBBON_ORDER,
  A11Y_CONFIG,
  getDeviceType,
  CORE_TOPIC_ICONS,
} from './scrollConstants'

// Learning data
import type { Module, TopicDefinition, CoreTopic } from '@/types/modules'
import type { LearningLevel } from '@/types/learning'

// ============================================
// TYPES
// ============================================

interface DigitalScrollProps {
  topic: TopicDefinition
  modules: Module[]
  initialLevel?: LearningLevel
  initialChapter?: number
  onClose: () => void
  className?: string
}

interface ScrollContent {
  type: 'cover' | 'inside-cover' | 'toc' | 'learning-mission' | 'chapter-divider' | 'chapter-intro' | 'verse' | 'content' | 'chapter-review' | 'notes-enhanced' | 'games' | 'quiz'
  chapterIndex?: number
  verseIndex?: number
  pageIndex?: number
  content?: ReactNode
  title?: string
  subtitle?: string
  module?: Module
  gameItems?: GameItem[]
  // Additional data for enriched pages
  keyTerms?: Array<{ term: string; definition: string }>
  funFacts?: string[]
  realWorldExamples?: Array<{ title: string; description: string; icon: string }>
  summaryPoints?: string[]
}

// ============================================
// ANCIENT DECORATIVE ELEMENTS
// ============================================

function AncientBorder({ className }: { className?: string }) {
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

function HieroglyphicDivider({ color, index = 0 }: { color?: string; index?: number }) {
  // Ancient-inspired decorative symbols — deterministic selection based on index
  const symbols = ['☥', '𓂀', '☀', '✦', '◈', '❋', '⚜']
  const randomSymbol = symbols[Math.abs(index) % symbols.length]

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
        {randomSymbol}
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

// ============================================
// MAIN DIGITAL TEXTBOOK COMPONENT
// ============================================

export function DigitalScroll({
  topic,
  modules,
  initialLevel = 'HIGH_SCHOOL',
  initialChapter,
  onClose,
  className,
}: DigitalScrollProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>(initialLevel)
  const [showOpenAnimation, setShowOpenAnimation] = useState(true)
  const [isRapidFlipping, setIsRapidFlipping] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  // Toggle body class to hide site header when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add('textbook-fullscreen')
    } else {
      document.body.classList.remove('textbook-fullscreen')
    }
    return () => {
      document.body.classList.remove('textbook-fullscreen')
    }
  }, [isExpanded])

  const scrollState = useScrollState()
  const playPageTurn = usePageTurnSound(scrollState.preferences.soundEnabled)

  // Notes state - persisted to localStorage
  const [pageNotes, setPageNotes] = useState<Record<string, string>>({})

  // Game completion tracking per chapter (required to unlock quiz)
  const [completedGames, setCompletedGames] = useState<Record<number, boolean>>({})

  // Discussion modal state
  const [showDiscussion, setShowDiscussion] = useState(false)
  const [discussionPosition, setDiscussionPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`book-notes-${topic.id}`)
    if (savedNotes) {
      try {
        setPageNotes(JSON.parse(savedNotes))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [topic.id])

  // Save note for a specific page
  const saveNote = useCallback((pageKey: string, content: string) => {
    setPageNotes(prev => {
      const updated = { ...prev, [pageKey]: content }
      localStorage.setItem(`book-notes-${topic.id}`, JSON.stringify(updated))
      return updated
    })
  }, [topic.id])

  // ============================================
  // RESPONSIVE
  // ============================================

  useEffect(() => {
    function updateDevice() {
      setDeviceType(getDeviceType())
    }
    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  const isDesktop = deviceType === 'desktop'

  // ============================================
  // BOOK CONTENT STRUCTURE
  // Maps modules (chapters) and lessons (verses) to book pages
  // ============================================

  const bookPages = useMemo(() => {
    const pages: ScrollContent[] = []

    // ============================================
    // OPENING SPREAD 1: Title + Select Path
    // ============================================
    // Cover page (LEFT) - Title page with topic icon
    pages.push({ type: 'cover' })

    // Inside cover (RIGHT) - Level selection / "Select Your Path"
    pages.push({ type: 'inside-cover' })

    // ============================================
    // OPENING SPREAD 2: Table of Contents + Learning Mission
    // ============================================
    // Table of Contents (LEFT)
    pages.push({ type: 'toc' })

    // Learning Mission (RIGHT) - Place for initial reflections
    pages.push({ type: 'learning-mission' })

    // Build chapters from modules (max 7 for the 7 Guardian ribbons)
    const chaptersToShow = modules.slice(0, 7)

    chaptersToShow.forEach((module, chapterIndex) => {
      // ============================================
      // CHAPTER SPREAD LAYOUT (Learning Flow):
      // 1. Chapter divider + intro (spread)
      // 2. ONE full-width content page (all lessons, scrollable)
      // 3. Review + Reflect (spread)
      // 4. Games + Quiz (spread)
      // ============================================

      // Generate game items from module content using term extraction
      const extractedTerms = extractTermsFromModule(module, selectedLevel, 12)
      const fallbackTerms = KEY_TERMS_BY_TOPIC[topic.id] || []

      const chapterGameItems: GameItem[] = extractedTerms.length >= 5
        ? extractedTerms.map(t => ({
            id: t.id,
            term: t.term,
            definition: t.definition,
            hint: t.hint || module.title,
          }))
        : [...extractedTerms, ...fallbackTerms.slice(0, 12 - extractedTerms.length)].map(t => ({
            id: t.id,
            term: t.term,
            definition: t.definition,
            hint: t.hint || module.title,
          }))

      // Chapter divider page (LEFT of spread)
      pages.push({
        type: 'chapter-divider',
        chapterIndex,
        module,
        title: module.title,
      })

      // Chapter intro page (RIGHT of spread)
      pages.push({
        type: 'chapter-intro',
        chapterIndex,
        module,
        title: module.title,
      })

      // ============================================
      // SINGLE FULL-WIDTH CONTENT PAGE
      // All lessons combined into one scrollable page
      // ============================================
      const allLessonContent = module.lessons.map((lesson, verseIndex) => {
        const content = lesson.content[selectedLevel] || lesson.content.HIGH_SCHOOL
        const verseHeader = `<div class="verse-header"><h2>${lesson.title}</h2></div>`
        return verseHeader + content
      }).join('<hr class="lesson-divider" />')

      pages.push({
        type: 'content',
        chapterIndex,
        verseIndex: 0,
        pageIndex: 0,
        content: allLessonContent,
        title: module.title,
        module,
      })

      // ============================================
      // REVIEW + NOTES SPREAD
      // ============================================

      // Chapter Review page (LEFT)
      pages.push({
        type: 'chapter-review',
        chapterIndex,
        module,
        keyTerms: chapterGameItems.slice(0, 6).map(item => ({
          term: item.term,
          definition: item.definition,
        })),
        funFacts: generateFunFacts(module, selectedLevel, topic.id).slice(0, 3),
        summaryPoints: generateSummaryPoints(module, selectedLevel).slice(0, 3),
      })

      // Enhanced Notes page (RIGHT)
      pages.push({
        type: 'notes-enhanced',
        chapterIndex,
        module,
        realWorldExamples: generateRealWorldExamples(module, selectedLevel, topic.id),
      })

      // ============================================
      // GAMES + QUIZ SPREAD
      // ============================================

      // Games page (LEFT)
      pages.push({
        type: 'games',
        chapterIndex,
        module,
        gameItems: chapterGameItems,
      })

      // Quiz page (RIGHT)
      pages.push({
        type: 'quiz',
        chapterIndex,
        module,
        gameItems: chapterGameItems,
      })
    })

    return pages
  }, [modules, selectedLevel, topic.id])

  // ============================================
  // NAVIGATION STATE
  // ============================================

  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const totalPages = bookPages.length

  const currentPage = bookPages[currentPageIndex]
  const currentChapter = currentPage?.chapterIndex ?? 0

  // Get the ribbon for current chapter
  const currentRibbon = RIBBON_ORDER[currentChapter]
    ? GUARDIAN_RIBBONS[RIBBON_ORDER[currentChapter]]
    : null

  // ============================================
  // LAYOUT HELPERS
  // Content pages display as full-width single pages on desktop
  // All other pages display as two-page spreads
  // ============================================

  const isContentPage = useCallback((pageIndex: number): boolean => {
    return bookPages[pageIndex]?.type === 'content'
  }, [bookPages])

  const isSinglePageMode = useMemo(() => {
    return isDesktop && isContentPage(currentPageIndex)
  }, [isDesktop, currentPageIndex, isContentPage])

  // ============================================
  // NAVIGATION HANDLERS
  // Dynamically adjusts increment based on current page layout
  // ============================================

  const goToPage = useCallback((pageIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(pageIndex, totalPages - 1))
    setCurrentPageIndex(clampedIndex)
    playPageTurn()
  }, [totalPages, playPageTurn])

  const nextPage = useCallback(() => {
    if (!isDesktop) {
      // Mobile: always advance by 1
      if (currentPageIndex < totalPages - 1) {
        goToPage(currentPageIndex + 1)
      }
      return
    }

    if (isContentPage(currentPageIndex)) {
      // Currently on a single content page → advance by 1
      if (currentPageIndex < totalPages - 1) {
        goToPage(currentPageIndex + 1)
      }
    } else {
      // Currently on a spread → advance by 2
      if (currentPageIndex < totalPages - 2) {
        goToPage(currentPageIndex + 2)
      }
    }
  }, [currentPageIndex, totalPages, goToPage, isDesktop, isContentPage])

  const prevPage = useCallback(() => {
    if (!isDesktop) {
      if (currentPageIndex > 0) {
        goToPage(currentPageIndex - 1)
      }
      return
    }

    const prevIdx = currentPageIndex - 1
    if (prevIdx < 0) return

    if (isContentPage(prevIdx)) {
      // Previous page is content (single) → go back by 1
      goToPage(prevIdx)
    } else {
      // Previous page is part of a spread → go back by 2 to the spread start
      goToPage(Math.max(currentPageIndex - 2, 0))
    }
  }, [currentPageIndex, goToPage, isDesktop, isContentPage])

  const goToChapter = useCallback((chapterIndex: number) => {
    // Find the chapter divider page for this chapter
    const pageIndex = bookPages.findIndex(
      (page) => page.type === 'chapter-divider' && page.chapterIndex === chapterIndex
    )
    if (pageIndex !== -1) {
      // Chapter dividers are spread pages, so use directly
      const clampedIndex = Math.max(0, Math.min(pageIndex, totalPages - 1))

      // Use rapid flip if jumping more than 5 pages
      if (Math.abs(clampedIndex - currentPageIndex) > 5) {
        setIsRapidFlipping(true)
        setTimeout(() => {
          setCurrentPageIndex(clampedIndex)
          setIsRapidFlipping(false)
        }, 1000)
      } else {
        goToPage(clampedIndex)
      }
    }
  }, [bookPages, currentPageIndex, goToPage, totalPages])

  const continueReading = useCallback(() => {
    const position = scrollState.getContinuePosition(topic.id)
    // Convert position to page index
    const pageIndex = bookPages.findIndex(
      (page) =>
        page.type === 'content' &&
        page.chapterIndex === position.chapter &&
        page.verseIndex === position.verse &&
        page.pageIndex === position.page
    )
    if (pageIndex !== -1) {
      goToPage(pageIndex)
    }
  }, [scrollState, topic.id, bookPages, goToPage])

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (A11Y_CONFIG.keyboardNav.closeScroll.includes(e.key)) {
      e.preventDefault()
      onClose()
    } else if (A11Y_CONFIG.keyboardNav.nextPage.includes(e.key)) {
      e.preventDefault()
      nextPage()
    } else if (A11Y_CONFIG.keyboardNav.prevPage.includes(e.key)) {
      e.preventDefault()
      prevPage()
    } else if (A11Y_CONFIG.keyboardNav.continueReading.includes(e.key)) {
      e.preventDefault()
      continueReading()
    } else {
      // Jump to chapter by number
      const chapterNum = parseInt(e.key, 10)
      if (chapterNum >= 1 && chapterNum <= 7) {
        e.preventDefault()
        goToChapter(chapterNum - 1)
      }
    }
  }, [onClose, nextPage, prevPage, continueReading, goToChapter])

  // ============================================
  // UNLOCK & OPEN ANIMATION
  // ============================================

  // Unlock and open on mount — only depends on topic.id and stable function refs
  // to avoid infinite re-render loops (scrollState object changes on every state update)
  useEffect(() => {
    if (!scrollState.unlockState.isUnlocked) {
      scrollState.unlockScroll(topic.id)
    }
    scrollState.openScroll(topic.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id])

  const handleAnimationComplete = useCallback(() => {
    setShowOpenAnimation(false)

    // If initialChapter is explicitly provided:
    // - initialChapter > 0: navigate to that specific chapter
    // - initialChapter === 0: explicitly go to first page (cover), ignore continue position
    if (initialChapter !== undefined) {
      if (initialChapter > 0) {
        goToChapter(initialChapter)
      } else {
        // initialChapter === 0 means "start fresh from cover page"
        setCurrentPageIndex(0)
      }
    } else {
      // No initialChapter specified - use continue position if exists
      const position = scrollState.getContinuePosition(topic.id)
      if (position.chapter > 0 || position.verse > 0 || position.page > 0) {
        continueReading()
      } else {
        // Start at cover page (spread shows cover + level selection)
        setCurrentPageIndex(0)
      }
    }
  }, [scrollState, topic.id, continueReading, initialChapter, goToChapter])

  // ============================================
  // SAVE POSITION ON PAGE CHANGE
  // ============================================

  useEffect(() => {
    const page = bookPages[currentPageIndex]
    if (page && page.type === 'content') {
      scrollState.goToPosition({
        chapter: page.chapterIndex ?? 0,
        verse: page.verseIndex ?? 0,
        page: page.pageIndex ?? 0,
      })
    }
  }, [currentPageIndex, bookPages, scrollState])

  // ============================================
  // RENDER PAGE CONTENT
  // ============================================

  const renderPageContent = (page: ScrollContent, side: 'left' | 'right') => {
    switch (page.type) {
      case 'cover':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center px-4">
              <span className="text-7xl block mb-6">{CORE_TOPIC_ICONS[topic.id] || '📖'}</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: currentRibbon?.colors.from }}>
                {topic.title}
              </h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-4 italic">
                A Journey of Knowledge
              </p>
            </div>
          </div>
        )

      case 'inside-cover':
        return (
          <div className="w-full h-full">
            <InsideCover
              topicSlug={topic.id}
              topicTitle={topic.title}
              chapterCount={Math.min(modules.length, 7)}
              verseCount={modules.reduce((acc, m) => acc + m.lessons.length, 0)}
              pageCount={totalPages}
              selectedLevel={selectedLevel}
              onLevelSelect={(level) => setSelectedLevel(level as LearningLevel)}
              onStartReading={() => goToPage(4)}
            />
          </div>
        )

      case 'toc':
        return (
          <div className="w-full h-full flex flex-col px-2">
            <AncientBorder />
            {/* TOC Header */}
            <div className="text-center py-2 shrink-0">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--book-text,var(--foreground))] mb-0.5">
                Table of Contents
              </h2>
              <p className="text-[10px] text-[var(--muted-foreground)] italic font-serif">
                The Seven Paths of Knowledge
              </p>
            </div>
            <HieroglyphicDivider color={currentRibbon?.colors.from} />
            {/* Chapter List - compact to fit without scrolling */}
            <div className="flex-1 min-h-0 flex flex-col justify-evenly py-1">
              {modules.slice(0, 7).map((module, i) => {
                const ribbon = RIBBON_ORDER[i] ? GUARDIAN_RIBBONS[RIBBON_ORDER[i]] : null
                return (
                  <button
                    key={module.id}
                    onClick={() => goToChapter(i)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors text-left group"
                  >
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-sm shrink-0"
                      style={{ background: ribbon?.colors.gradient }}
                    >
                      {i + 1}
                    </div>
                    <span className="flex-1 text-xs font-serif font-medium text-[var(--book-text,var(--foreground))] group-hover:text-[var(--primary)] transition-colors truncate">
                      {module.title}
                    </span>
                    <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
                  </button>
                )
              })}
            </div>
            {/* Footer */}
            <div className="text-center py-1 shrink-0">
              <p className="text-[9px] text-[var(--muted-foreground)]">
                Click a chapter to begin reading
              </p>
            </div>
          </div>
        )

      case 'learning-mission':
        // Learning Mission page - fill-in-the-blank intentions
        const missionColor = currentRibbon?.colors.from || 'var(--primary)'
        return (
          <div className="w-full h-full flex flex-col relative">
            <AncientBorder />

            {/* Header - compact */}
            <div className="text-center pt-3 pb-1 shrink-0">
              <span className="text-lg">🎯</span>
              <h3 className="text-sm font-serif font-bold text-[var(--book-text,var(--foreground))]">
                Set Your Intentions
              </h3>
              <p className="text-[8px] text-[var(--muted-foreground)] italic">
                Complete each statement to define your learning goals
              </p>
            </div>

            {/* Divider */}
            <div
              className="w-1/2 h-px mx-auto mb-2 shrink-0"
              style={{
                background: `linear-gradient(to right, transparent, ${missionColor}60, transparent)`,
              }}
            />

            {/* Fill-in-the-blank Intentions - evenly distributed */}
            <div className="flex-1 min-h-0 px-3 pb-2 flex flex-col justify-evenly">
              {/* Intention 1: What I hope to learn */}
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[10px]">✨</span>
                  <p className="text-[9px] font-medium text-[var(--book-text,var(--foreground))]">
                    By studying {topic.title}, I hope to learn...
                  </p>
                </div>
                <input
                  type="text"
                  className={cn(
                    "w-full px-2 py-1 text-xs font-serif",
                    "bg-transparent border-b-2 border-dashed",
                    "text-[var(--book-text,var(--foreground))]",
                    "placeholder:text-[var(--muted-foreground)]/40 placeholder:italic",
                    "focus:outline-none focus:border-solid transition-all"
                  )}
                  style={{ borderColor: `${missionColor}40` }}
                  placeholder="what you want to discover..."
                  value={pageNotes['mission-hope-to-learn'] || ''}
                  onChange={(e) => saveNote('mission-hope-to-learn', e.target.value)}
                />
              </div>

              {/* Intention 2: What I already know */}
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[10px]">💭</span>
                  <p className="text-[9px] font-medium text-[var(--book-text,var(--foreground))]">
                    What I already know about this topic is...
                  </p>
                </div>
                <input
                  type="text"
                  className={cn(
                    "w-full px-2 py-1 text-xs font-serif",
                    "bg-transparent border-b-2 border-dashed",
                    "text-[var(--book-text,var(--foreground))]",
                    "placeholder:text-[var(--muted-foreground)]/40 placeholder:italic",
                    "focus:outline-none focus:border-solid transition-all"
                  )}
                  style={{ borderColor: `${missionColor}40` }}
                  placeholder="your existing knowledge..."
                  value={pageNotes['mission-already-know'] || ''}
                  onChange={(e) => saveNote('mission-already-know', e.target.value)}
                />
              </div>

              {/* Intention 3: How I will apply */}
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[10px]">🌱</span>
                  <p className="text-[9px] font-medium text-[var(--book-text,var(--foreground))]">
                    I plan to apply this knowledge by...
                  </p>
                </div>
                <input
                  type="text"
                  className={cn(
                    "w-full px-2 py-1 text-xs font-serif",
                    "bg-transparent border-b-2 border-dashed",
                    "text-[var(--book-text,var(--foreground))]",
                    "placeholder:text-[var(--muted-foreground)]/40 placeholder:italic",
                    "focus:outline-none focus:border-solid transition-all"
                  )}
                  style={{ borderColor: `${missionColor}40` }}
                  placeholder="how you'll use what you learn..."
                  value={pageNotes['mission-apply-knowledge'] || ''}
                  onChange={(e) => saveNote('mission-apply-knowledge', e.target.value)}
                />
              </div>
            </div>

            {/* Footer hint */}
            <div className="shrink-0 text-center py-1.5 border-t border-[var(--border)]/20">
              <p className="text-[8px] text-[var(--muted-foreground)]">
                Turn the page to begin Chapter 1 →
              </p>
            </div>
          </div>
        )

      case 'chapter-divider':
        return (
          <div className="w-full h-full">
            <ChapterDivider
              chapterIndex={page.chapterIndex ?? 0}
              chapterTitle={page.title || ''}
              versesCount={page.module?.lessons.length ?? 0}
              guardianQuote={getGuardianQuote(page.chapterIndex ?? 0)}
            />
          </div>
        )

      case 'chapter-intro':
        // Right side of chapter spread - shows COMPLETE curriculum outline with accreditation info
        const introRibbon = page.chapterIndex !== undefined && RIBBON_ORDER[page.chapterIndex]
          ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex]]
          : null
        const introColor = introRibbon?.colors.from || 'var(--primary)'
        const chapterModule = page.module
        const allLessons = chapterModule?.lessons || []
        const allActivities = chapterModule?.activities || []
        const chapterGame = chapterModule?.game
        const chapterQuiz = chapterModule?.quiz
        const chapterAccreditation = chapterModule?.accreditation
        const totalDuration = chapterModule?.duration?.[selectedLevel] ||
          allLessons.reduce((sum, l) => sum + (l.duration || 0), 0)
        const showAccreditation = chapterAccreditation && (selectedLevel === 'UNDERGRADUATE' || selectedLevel === 'GRADUATE' || selectedLevel === 'PHD')

        return (
          <div className="w-full h-full flex flex-col relative px-4 py-3">
            <AncientBorder />

            {/* Header with Accreditation Badge */}
            <div className="text-center pb-2 shrink-0">
              {showAccreditation ? (
                <>
                  <h3 className="text-sm font-serif font-bold text-[var(--book-text,var(--foreground))] leading-tight">
                    {chapterAccreditation.courseTitle}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ background: introColor }}
                    >
                      {chapterAccreditation.creditHours} Credit Hrs
                    </span>
                    <span className="text-[10px] text-[var(--muted-foreground)]">
                      {chapterAccreditation.totalLearningHours}h total
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                      style={{ borderColor: introColor, color: introColor }}
                    >
                      {chapterAccreditation.academicLevel === 'graduate' ? 'Graduate' : 'Upper-Division'}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))]">
                    Chapter {(page.chapterIndex ?? 0) + 1}
                  </h3>
                  <p className="text-base font-medium text-[var(--book-text,var(--foreground))] mt-1">
                    {chapterModule?.title}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {totalDuration} min • {allLessons.length} lessons
                  </p>
                </>
              )}
              <div
                className="w-16 h-0.5 mx-auto mt-3"
                style={{
                  background: `linear-gradient(to right, transparent, ${introColor}, transparent)`,
                }}
              />
            </div>

            {/* Full Curriculum Outline - fills available space */}
            <div className="flex-1 min-h-0 flex flex-col justify-evenly overflow-hidden gap-1">

              {/* LEARNING OBJECTIVES - shown for undergrad/graduate levels */}
              {showAccreditation && chapterAccreditation.learningObjectives.length > 0 && (
                <div className="min-h-0">
                  <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <span className="text-xs">🎯</span> Learning Objectives
                  </p>
                  <div className="space-y-0.5">
                    {chapterAccreditation.learningObjectives.slice(0, 4).map((objective, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1 px-1 text-[9px] leading-tight"
                      >
                        <span
                          className="w-3 h-3 rounded-full flex items-center justify-center text-white text-[7px] font-bold shrink-0 mt-px"
                          style={{ background: introColor }}
                        >
                          {idx + 1}
                        </span>
                        <p className="text-[var(--book-text,var(--foreground))] line-clamp-2">
                          {objective}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LESSONS SECTION */}
              <div className="min-h-0">
                <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <span className="text-xs">📚</span> Lessons
                </p>
                <div className="space-y-0.5">
                  {allLessons.slice(0, showAccreditation ? 4 : 5).map((lesson, idx) => (
                    <div
                      key={lesson.id || idx}
                      className="flex items-center gap-1.5 py-0.5 px-1.5 rounded bg-[var(--muted)]/15"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold shrink-0"
                        style={{ background: introColor }}
                      >
                        {idx + 1}
                      </div>
                      <p className="flex-1 text-[10px] font-medium text-[var(--book-text,var(--foreground))] truncate">
                        {lesson.title}
                      </p>
                      <span className="text-[9px] text-[var(--muted-foreground)] shrink-0">
                        {lesson.duration}m
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ASSESSMENT ROW - replaces game/quiz for accredited levels */}
              {showAccreditation ? (
                <div className="flex gap-2">
                  <div className="flex-1 p-2 rounded-lg bg-[var(--muted)]/20">
                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase flex items-center gap-1 mb-0.5">
                      <span className="text-xs">📝</span> Assessment
                    </p>
                    <p className="text-[10px] text-[var(--book-text,var(--foreground))]">
                      {chapterQuiz?.questions?.length || 10} questions • {chapterAccreditation.assessmentFramework.passingThreshold}% to pass
                    </p>
                  </div>
                  <div className="flex-1 p-2 rounded-lg bg-[var(--muted)]/20">
                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase flex items-center gap-1 mb-0.5">
                      <span className="text-xs">🔬</span> Project
                    </p>
                    <p className="text-[10px] text-[var(--book-text,var(--foreground))] truncate">
                      {chapterAccreditation.finalProject.title}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  {/* Game */}
                  {chapterGame && (
                    <div className="flex-1 p-3 rounded-lg bg-[var(--muted)]/20">
                      <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase flex items-center gap-1 mb-1">
                        <span className="text-base">🎮</span> Game
                      </p>
                      <p className="text-sm font-medium text-[var(--book-text,var(--foreground))]">
                        {chapterGame.title}
                      </p>
                    </div>
                  )}

                  {/* Quiz */}
                  {chapterQuiz && (
                    <div className="flex-1 p-3 rounded-lg bg-[var(--muted)]/20">
                      <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase flex items-center gap-1 mb-1">
                        <span className="text-base">✅</span> Quiz
                      </p>
                      <p className="text-sm font-medium text-[var(--book-text,var(--foreground))]">
                        {chapterQuiz.questions?.length || 0} questions
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Module Description / Course Info */}
              {showAccreditation ? (
                <div className="p-2 rounded-lg bg-[var(--muted)]/10 border-l-3" style={{ borderColor: introColor }}>
                  <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-0.5">
                    {chapterAccreditation.discipline}
                  </p>
                  <p className="text-[10px] italic text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
                    {chapterAccreditation.courseDescription.slice(0, 200)}...
                  </p>
                  {chapterAccreditation.institutionalPartner && (
                    <p className="text-[9px] font-semibold mt-1" style={{ color: introColor }}>
                      Partner: {chapterAccreditation.institutionalPartner}
                    </p>
                  )}
                </div>
              ) : chapterModule?.description ? (
                <div className="p-3 rounded-lg bg-[var(--muted)]/10 border-l-3" style={{ borderColor: introColor }}>
                  <p className="text-sm italic text-[var(--muted-foreground)] leading-relaxed">
                    {typeof chapterModule.description === 'string'
                      ? chapterModule.description
                      : chapterModule.description[selectedLevel] || chapterModule.description.HIGH_SCHOOL}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="shrink-0 text-center pt-3 border-t border-[var(--border)]/20">
              <p className="text-xs text-[var(--muted-foreground)]">
                {showAccreditation ? 'ACE Credit Recommended • Turn the page to begin →' : 'Turn the page to begin →'}
              </p>
            </div>
          </div>
        )

      case 'games':
        // Interactive learning games page
        const gamesRibbon = page.chapterIndex !== undefined && RIBBON_ORDER[page.chapterIndex]
          ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex]]
          : null
        const gameItems = page.gameItems || []
        const chapterIdx = page.chapterIndex ?? 0
        const gamesCompleted = completedGames[chapterIdx] ?? false
        return (
          <div className="w-full h-full flex flex-col relative">
            {/* Header - compact */}
            <div className="text-center pt-1 pb-1 shrink-0">
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <span className="text-sm">{gamesCompleted ? '✅' : '🎮'}</span>
                <h3 className="text-xs font-serif font-bold text-[var(--book-text,var(--foreground))]">
                  Practice Activities
                </h3>
              </div>
              <p className="text-[8px] text-[var(--muted-foreground)]">
                {gamesCompleted ? 'Completed! Quiz unlocked →' : `Complete to unlock Chapter ${chapterIdx + 1} Quiz`}
              </p>
            </div>

            {/* Games selector - scrolls internally within ScrollPage's scroll area */}
            <div className="flex-1 min-h-0 px-1 pb-1">
              {gameItems.length > 0 ? (
                <ScrollGameSelector
                  items={gameItems}
                  topicColor={gamesRibbon?.colors.from}
                  level={selectedLevel}
                  onComplete={(score) => {
                    // Mark games as completed for this chapter
                    setCompletedGames(prev => ({ ...prev, [chapterIdx]: true }))
                    // Game completed — score tracked in completedGames state
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Activities coming soon...
                  </p>
                </div>
              )}
            </div>
          </div>
        )

      case 'verse':
        const verseRibbon = RIBBON_ORDER[page.chapterIndex ?? 0] ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex ?? 0]] : null
        return (
          <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <AncientBorder />
            {/* Verse presentation - centered on page */}
            <div className="text-center w-full max-w-sm">
              {/* Chapter indicator */}
              <div
                className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider mb-4"
                style={{
                  background: verseRibbon ? `${verseRibbon.colors.from}20` : 'var(--muted)',
                  color: verseRibbon?.colors.from || 'var(--muted-foreground)',
                }}
              >
                Chapter {(page.chapterIndex ?? 0) + 1}
              </div>

              {/* Decorative element */}
              <div
                className="w-12 h-0.5 mx-auto mb-6"
                style={{
                  background: verseRibbon
                    ? `linear-gradient(to right, transparent, ${verseRibbon.colors.from}, transparent)`
                    : 'var(--border)',
                }}
              />

              {/* Verse number */}
              <div className="text-xs text-[var(--muted-foreground)] tracking-[0.3em] uppercase mb-3">
                Verse {(page.verseIndex ?? 0) + 1}
              </div>

              {/* Verse title */}
              <h2
                className="text-2xl sm:text-3xl font-serif font-bold mb-4"
                style={{ color: verseRibbon?.colors.from || 'var(--foreground)' }}
              >
                {page.title}
              </h2>

              {/* Description if available */}
              {page.module && (
                <p className="text-sm text-[var(--muted-foreground)] font-serif italic leading-relaxed mb-6">
                  {typeof page.module.description === 'string'
                    ? page.module.description
                    : page.module.description[selectedLevel] || page.module.description.HIGH_SCHOOL}
                </p>
              )}

              {/* Decorative element */}
              <div
                className="w-12 h-0.5 mx-auto"
                style={{
                  background: verseRibbon
                    ? `linear-gradient(to right, transparent, ${verseRibbon.colors.from}, transparent)`
                    : 'var(--border)',
                }}
              />

              {/* Continue prompt */}
              <p className="mt-6 text-xs text-[var(--muted-foreground)]">
                Turn the page to begin →
              </p>
            </div>
          </div>
        )

      case 'content':
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

        return (
          <div className="w-full h-full flex flex-col">
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
              {typeof page.content === 'string' ? (
                <div
                  className="lesson-content"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.content as string) }}
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
          </div>
        )

      case 'chapter-review':
        // Combined Chapter Review: Key Terms + Fun Facts + Summary on ONE page
        // For accredited levels: shows learning objectives achieved + assessment info
        const reviewRibbon = page.chapterIndex !== undefined && RIBBON_ORDER[page.chapterIndex]
          ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex]]
          : null
        const reviewColor = reviewRibbon?.colors.from || 'var(--primary)'
        const reviewModule = page.chapterIndex !== undefined && page.chapterIndex < modules.length
          ? modules[page.chapterIndex]
          : null
        const reviewAccreditation = reviewModule?.accreditation
        const showAccreditedReview = reviewAccreditation && (selectedLevel === 'UNDERGRADUATE' || selectedLevel === 'GRADUATE' || selectedLevel === 'PHD')
        return (
          <div className="w-full h-full flex flex-col relative px-3 py-2">
            <AncientBorder />

            {/* Header */}
            <div className="text-center pb-2 shrink-0">
              <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))] flex items-center justify-center gap-2">
                <span className="text-xl">{showAccreditedReview ? '🎓' : '📚'}</span>
                {showAccreditedReview ? 'Module Assessment' : 'Chapter Review'}
              </h3>
              <div
                className="w-16 h-0.5 mx-auto mt-2"
                style={{ background: `linear-gradient(to right, transparent, ${reviewColor}, transparent)` }}
              />
            </div>

            {/* Content fills available space evenly */}
            <div className="flex-1 min-h-0 flex flex-col justify-evenly overflow-hidden">

              {/* Accredited Review: Learning Objectives Achieved */}
              {showAccreditedReview ? (
                <>
                  {/* Objectives Checklist */}
                  <div>
                    <p className="text-xs font-bold text-[var(--muted-foreground)] mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="text-sm">🎯</span> Learning Objectives Demonstrated
                    </p>
                    <div className="space-y-1 max-h-[100px] overflow-y-auto pr-1">
                      {reviewAccreditation.learningObjectives.slice(0, 4).map((objective, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 py-0.5">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] shrink-0 mt-0.5"
                            style={{ background: reviewColor }}
                          >
                            ✓
                          </span>
                          <p className="text-[10px] text-[var(--book-text,var(--foreground))] leading-tight">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assessment Requirements */}
                  <div>
                    <p className="text-xs font-bold text-[var(--muted-foreground)] mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="text-sm">📝</span> Assessment Requirements
                    </p>
                    <div className="space-y-1.5">
                      {reviewAccreditation.assessmentFramework.summativeAssessments.map((assessment, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg border-l-3 text-[10px] text-[var(--book-text,var(--foreground))] leading-relaxed"
                          style={{ borderColor: reviewColor, background: `${reviewColor}10` }}
                        >
                          {assessment}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Project Preview */}
                  <div>
                    <p className="text-xs font-bold text-[var(--muted-foreground)] mb-1.5 flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="text-sm">🔬</span> Applied Project
                    </p>
                    <div className="p-2 rounded-lg bg-[var(--muted)]/20">
                      <p className="text-xs font-bold text-[var(--book-text,var(--foreground))]">
                        {reviewAccreditation.finalProject.title}
                      </p>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5 line-clamp-2">
                        {reviewAccreditation.finalProject.description}
                      </p>
                      <p className="text-[9px] font-semibold mt-1" style={{ color: reviewColor }}>
                        {reviewAccreditation.finalProject.deliverables.length} deliverables required
                      </p>
                    </div>
                  </div>

                  {/* Credit Info */}
                  <div className="flex gap-2">
                    <div className="flex-1 p-2 rounded-lg bg-[var(--muted)]/15 text-center">
                      <p className="text-[10px] text-[var(--muted-foreground)]">Credit Hours</p>
                      <p className="text-sm font-bold" style={{ color: reviewColor }}>{reviewAccreditation.creditHours}</p>
                    </div>
                    <div className="flex-1 p-2 rounded-lg bg-[var(--muted)]/15 text-center">
                      <p className="text-[10px] text-[var(--muted-foreground)]">Pass Threshold</p>
                      <p className="text-sm font-bold" style={{ color: reviewColor }}>{reviewAccreditation.assessmentFramework.passingThreshold}%</p>
                    </div>
                    <div className="flex-1 p-2 rounded-lg bg-[var(--muted)]/15 text-center">
                      <p className="text-[10px] text-[var(--muted-foreground)]">Level</p>
                      <p className="text-[10px] font-bold" style={{ color: reviewColor }}>
                        {reviewAccreditation.academicLevel === 'graduate' ? 'Grad' : 'Upper-Div'}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Key Terms Section */}
                  <div className="min-h-0">
                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] mb-1 flex items-center gap-1 uppercase tracking-wider">
                      <span className="text-xs">📖</span> Key Terms
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(page.keyTerms || []).slice(0, 4).map((item, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded-lg bg-[var(--muted)]/20"
                        >
                          <p className="text-xs font-bold text-[var(--book-text,var(--foreground))] leading-tight">{item.term}</p>
                          <p className="text-[10px] text-[var(--muted-foreground)] line-clamp-2 leading-tight">{item.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fun Facts Section */}
                  <div className="min-h-0">
                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] mb-1 flex items-center gap-1 uppercase tracking-wider">
                      <span className="text-xs">💡</span> Did You Know?
                    </p>
                    <div className="space-y-1">
                      {(page.funFacts || []).slice(0, 2).map((fact, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded-lg border-l-2 text-[10px] text-[var(--book-text,var(--foreground))] leading-snug"
                          style={{ borderColor: reviewColor, background: `${reviewColor}10` }}
                        >
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="min-h-0">
                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] mb-1 flex items-center gap-1 uppercase tracking-wider">
                      <span className="text-xs">✓</span> Key Takeaways
                    </p>
                    <div className="space-y-1">
                      {(page.summaryPoints || []).slice(0, 2).map((point, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] shrink-0 mt-0.5"
                            style={{ background: reviewColor }}
                          >
                            ✓
                          </span>
                          <p className="text-[10px] text-[var(--book-text,var(--foreground))] leading-snug">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 px-3 pt-2 border-t border-[var(--border)]/20">
              {showAccreditedReview ? (
                <p className="text-[9px] text-[var(--muted-foreground)] text-center">
                  ACE Credit Recommended • {reviewAccreditation.institutionalPartner || 'Institutional Review Pending'}
                </p>
              ) : (
                <p className="text-xs text-[var(--muted-foreground)] italic text-center leading-relaxed">
                  &ldquo;{getGuardianQuote(page.chapterIndex ?? 0)}&rdquo;
                </p>
              )}
            </div>
          </div>
        )

      case 'notes-enhanced':
        // Enhanced Notes: Real World Actions + Notes + Discussion on ONE page
        const enhancedRibbon = page.chapterIndex !== undefined && RIBBON_ORDER[page.chapterIndex]
          ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex]]
          : null
        const enhancedColor = enhancedRibbon?.colors.from || 'var(--primary)'
        const enhancedChapterTitle = page.chapterIndex !== undefined && page.chapterIndex < modules.length
          ? modules[page.chapterIndex].title
          : 'General'
        const enhancedNoteKey = `chapter-${page.chapterIndex ?? 'general'}-notes`
        return (
          <div className="w-full h-full flex flex-col relative px-2 py-1">
            <AncientBorder />

            {/* Header - compact */}
            <div className="text-center pb-1 shrink-0">
              <h3 className="text-sm font-serif font-bold text-[var(--book-text,var(--foreground))] flex items-center justify-center gap-1.5">
                <span className="text-base">🎯</span> Apply & Reflect
              </h3>
              <p className="text-[10px] text-[var(--muted-foreground)]">{enhancedChapterTitle}</p>
              <div
                className="w-12 h-px mx-auto mt-1"
                style={{ background: `linear-gradient(to right, transparent, ${enhancedColor}, transparent)` }}
              />
            </div>

            {/* Real World Actions - compact */}
            <div className="mb-2 shrink-0">
              <p className="text-[10px] font-bold text-[var(--muted-foreground)] mb-1 uppercase tracking-wider flex items-center gap-1">
                <span className="text-xs">🌍</span> Try This:
              </p>
              <div className="flex gap-1.5">
                {(page.realWorldExamples || []).slice(0, 3).map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex-1 p-2 rounded-lg bg-[var(--muted)]/20 text-center"
                  >
                    <span className="text-lg block mb-0.5">{ex.icon}</span>
                    <p className="text-[10px] font-medium text-[var(--book-text,var(--foreground))] leading-tight">{ex.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes textarea - fills remaining space */}
            <div className="flex-1 min-h-0 flex flex-col">
              <p className="text-[10px] font-bold text-[var(--muted-foreground)] mb-1 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <span className="text-xs">📝</span> Your Notes:
              </p>
              <textarea
                className={cn(
                  "flex-1 w-full resize-none",
                  "bg-transparent",
                  "border border-dashed border-[var(--border)]/40 rounded-lg",
                  "p-2 text-xs font-serif",
                  "text-[var(--book-text,var(--foreground))]",
                  "placeholder:text-[var(--muted-foreground)]/50 placeholder:italic",
                  "focus:outline-none focus:border-[var(--primary)]/50"
                )}
                placeholder="Write your reflections and thoughts here..."
                value={pageNotes[enhancedNoteKey] || ''}
                onChange={(e) => saveNote(enhancedNoteKey, e.target.value)}
                style={{
                  lineHeight: '1.5em',
                  backgroundImage: 'linear-gradient(to bottom, transparent 90%, var(--border) 90%, var(--border) 92%, transparent 92%)',
                  backgroundSize: '100% 1.5em',
                  backgroundPosition: '0 0.2em',
                }}
              />
            </div>

            {/* Discussion Button - compact */}
            <div className="shrink-0 pt-1.5 mt-1">
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg",
                  "bg-[var(--muted)]/30 hover:bg-[var(--muted)]/50",
                  "text-[var(--book-text,var(--foreground))] text-[10px] font-medium",
                  "transition-colors"
                )}
                onClick={() => setShowDiscussion(true)}
              >
                <MessageCircle className="w-3 h-3" />
                <span>Join Discussion</span>
              </button>
            </div>
          </div>
        )

      case 'quiz':
        // Graded 5-question quiz for assessment
        const quizRibbon = page.chapterIndex !== undefined && RIBBON_ORDER[page.chapterIndex]
          ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex]]
          : null
        const quizItems = page.gameItems || []
        const quizChapterIdx = page.chapterIndex ?? 0
        const isQuizUnlocked = completedGames[quizChapterIdx] ?? false

        return (
          <div className="w-full h-full flex flex-col relative">
            {/* Header - compact */}
            <div className="text-center pt-1 pb-1 shrink-0">
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <span className="text-sm">{isQuizUnlocked ? '📝' : '🔒'}</span>
                <h3 className="text-xs font-serif font-bold text-[var(--book-text,var(--foreground))]">
                  Chapter Quiz
                </h3>
              </div>
              <p className="text-[8px] text-[var(--muted-foreground)]">
                {isQuizUnlocked ? '5 Questions • Graded Assessment' : 'Complete Practice Activities to unlock'}
              </p>
            </div>

            {/* Quiz Component - scrolls internally within ScrollPage's scroll area */}
            <div className="flex-1 min-h-0 px-1 pb-1">
              {!isQuizUnlocked ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center mb-3">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h4 className="text-xs font-bold text-[var(--book-text,var(--foreground))] mb-1.5">
                    Quiz Locked
                  </h4>
                  <p className="text-[9px] text-[var(--muted-foreground)] mb-3 max-w-[180px]">
                    Complete at least one Practice Activity to unlock this chapter&apos;s graded quiz.
                  </p>
                  <button
                    onClick={() => prevPage()}
                    className="px-3 py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-medium"
                  >
                    ← Go to Practice Activities
                  </button>
                </div>
              ) : quizItems.length >= 5 ? (
                <GradedQuiz
                  items={quizItems}
                  topicColor={quizRibbon?.colors.from}
                  level={selectedLevel}
                  chapterIndex={quizChapterIdx}
                  onComplete={(score, total) => {
                    const percentage = Math.round((score / total) * 100)
                    // Quiz completed — persist via API below

                    // Mark chapter as complete in local scroll state if passing score (>=70%)
                    if (percentage >= 70 && quizChapterIdx !== undefined) {
                      scrollState.markChapterComplete(quizChapterIdx)
                    }

                    // Persist quiz result to the progress API (fire-and-forget)
                    fetch('/api/learn/progress', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        action: 'submit_quiz',
                        moduleId: modules[quizChapterIdx]?.slug,
                        quizId: `${topic.id}-ch${quizChapterIdx}-quiz`,
                        score: percentage,
                        passed: percentage >= 70,
                      }),
                    }).catch((err) => console.error('Failed to save quiz progress:', err))
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-[10px] text-[var(--muted-foreground)]">
                    Quiz requires at least 5 terms...
                  </p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return <div className="w-full h-full" />
    }
  }

  // ============================================
  // GET PAGES FOR CURRENT SPREAD/SINGLE
  // In single-page mode: only leftPage is shown (full-width)
  // In spread mode: leftPage + rightPage shown side by side
  // ============================================

  const leftPage = bookPages[currentPageIndex]
  const rightPage = (isDesktop && !isSinglePageMode) ? bookPages[currentPageIndex + 1] : null
  const prevLeftPage = bookPages[currentPageIndex - 2]
  const prevRightPage = bookPages[currentPageIndex - 1]
  const nextLeftPage = isSinglePageMode ? bookPages[currentPageIndex + 1] : bookPages[currentPageIndex + 2]
  const nextRightPage = isSinglePageMode ? bookPages[currentPageIndex + 2] : bookPages[currentPageIndex + 3]

  // ============================================
  // COMPLETED CHAPTERS
  // ============================================

  const completedChapters = useMemo(() => {
    const progress = scrollState.topicProgress[topic.id]
    return progress?.completedChapters || []
  }, [scrollState.topicProgress, topic.id])

  // ============================================
  // PAGE FRAME WRAPPER
  // Wraps page content in ScrollPage for consistent framing
  // Cover & inside-cover are full-bleed (no frame)
  // ============================================

  const wrapPageContent = (page: ScrollContent | undefined | null, side: 'left' | 'right', absolutePageIndex: number) => {
    if (!page) return <div />

    const content = renderPageContent(page, side)

    // Cover and inside-cover: no page frame
    if (page.type === 'cover' || page.type === 'inside-cover') {
      return content
    }

    // Scroll behavior is context-aware:
    // - Content pages (lessons): always scrollable (textbook content)
    // - Games/quiz: scrollable only in minimized view
    // - Everything else: never scrollable (must fit the page)
    const isContent = page.type === 'content'
    const isInteractive = page.type === 'games' || page.type === 'quiz'
    const allowScroll = isContent || (isInteractive && !isExpanded)

    return (
      <ScrollPage
        pageNumber={absolutePageIndex + 1}
        totalPages={totalPages}
        chapterIndex={page.chapterIndex ?? 0}
        side={side}
        allowScroll={allowScroll}
        showWatermark={page.type !== 'toc' && page.type !== 'learning-mission'}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        isFirstPage={absolutePageIndex === 0}
        isLastPage={absolutePageIndex >= totalPages - 1}
      >
        {content}
      </ScrollPage>
    )
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      {/* Opening Animation */}
      <AnimatePresence>
        {showOpenAnimation && (
          <ScrollOpenAnimation
            topicSlug={topic.id}
            topicTitle={topic.title}
            topicDescription={topic.description}
            onAnimationComplete={handleAnimationComplete}
            reducedMotion={scrollState.preferences.reducedMotion}
          />
        )}
      </AnimatePresence>

      {/* Rapid Flip Animation */}
      <AnimatePresence>
        {isRapidFlipping && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[var(--book-paper,var(--card))]/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <RapidPageFlip
              fromSpread={Math.floor(currentPageIndex / 2)}
              toSpread={Math.floor(currentPageIndex / 2)}
              onComplete={() => setIsRapidFlipping(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Book */}
      {!showOpenAnimation && (
        <ScrollContainer
          isOpen={scrollState.isScrollOpen}
          isExpanded={isExpanded}
          onKeyDown={handleKeyDown}
          className={className}
        >
          {/* Book Wrapper */}
          <ScrollWrapper>
            {/* Ribbon Bookmarks - inside the book so they emerge from pages */}
            <RibbonBookmarks
              currentChapter={currentChapter}
              completedChapters={completedChapters}
              onChapterClick={goToChapter}
              onContinueClick={continueReading}
              continuePosition={scrollState.currentPosition || undefined}
              isExpanded={isExpanded}
              isFlipping={isFlipping || isRapidFlipping}
            />

            {/* Page Flip Container */}
            <PageFlip
              singlePageMode={isSinglePageMode}
              leftPage={
                isSinglePageMode ? (
                  // Single page mode: full-width page with balanced padding
                  <PageContainer side="left" className="!pl-6 !pr-6">
                    {wrapPageContent(leftPage, 'left', currentPageIndex)}
                  </PageContainer>
                ) : (
                  <PageContainer side="left">
                    {wrapPageContent(leftPage, 'left', currentPageIndex)}
                  </PageContainer>
                )
              }
              rightPage={
                <PageContainer side="right">
                  {wrapPageContent(rightPage, 'right', currentPageIndex + 1)}
                </PageContainer>
              }
              nextLeftPage={
                nextLeftPage ? (
                  <PageContainer side="left">
                    {wrapPageContent(nextLeftPage, 'left', isSinglePageMode ? currentPageIndex + 1 : currentPageIndex + 2)}
                  </PageContainer>
                ) : undefined
              }
              nextRightPage={
                nextRightPage ? (
                  <PageContainer side="right">
                    {wrapPageContent(nextRightPage, 'right', isSinglePageMode ? currentPageIndex + 2 : currentPageIndex + 3)}
                  </PageContainer>
                ) : undefined
              }
              prevLeftPage={
                prevLeftPage ? (
                  <PageContainer side="left">
                    {wrapPageContent(prevLeftPage, 'left', currentPageIndex - 2)}
                  </PageContainer>
                ) : undefined
              }
              prevRightPage={
                prevRightPage ? (
                  <PageContainer side="right">
                    {wrapPageContent(prevRightPage, 'right', currentPageIndex - 1)}
                  </PageContainer>
                ) : undefined
              }
              currentSpread={currentPageIndex}
              totalSpreads={totalPages}
              onFlipStart={() => setIsFlipping(true)}
              onFlipComplete={(direction) => {
                setIsFlipping(false)
                if (direction === 'next') {
                  nextPage()
                } else {
                  prevPage()
                }
              }}
            />

            {/* Book Spine - hidden in single page mode */}
            {!isSinglePageMode && <ScrollSpine />}

            {/* Page Edges */}
            <PageEdges pageCount={totalPages} />
          </ScrollWrapper>

          {/* Top Control Bar */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 z-30">
            {/* Sound Toggle */}
            <button
              onClick={() => scrollState.updatePreferences({ soundEnabled: !scrollState.preferences.soundEnabled })}
              className="p-2 rounded-full bg-[var(--card)]/90 text-[var(--book-text,var(--foreground))] hover:bg-[var(--muted)] border border-[var(--border)] transition-all"
              aria-label={scrollState.preferences.soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            >
              {scrollState.preferences.soundEnabled ? (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Expand/Minimize Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full bg-[var(--card)]/90 text-[var(--book-text,var(--foreground))] hover:bg-[var(--muted)] border border-[var(--border)] transition-all"
              aria-label={isExpanded ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                scrollState.closeScroll()
                onClose()
              }}
              className="p-2 rounded-full bg-red-500/90 text-white hover:bg-red-600 transition-all"
              aria-label="Close scroll"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </ScrollContainer>
      )}

      {/* Draggable Discussion Modal - Digital Scroll Community */}
      <AnimatePresence>
        {showDiscussion && (
          <motion.div
            className="fixed z-[60] bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden"
            style={{
              left: discussionPosition.x,
              top: discussionPosition.y,
              width: 'min(600px, 60vw)',
              height: 'min(500px, 60vh)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            drag
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false)
              setDiscussionPosition(prev => ({
                x: prev.x + info.offset.x,
                y: prev.y + info.offset.y,
              }))
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Escape') {
                e.stopPropagation()
                setShowDiscussion(false)
              }
            }}
            role="dialog"
            aria-label={`${topic.title} Discussion`}
          >
            {/* Drag Handle Header */}
            <div
              className={cn(
                "flex items-center justify-between px-4 py-3 bg-[var(--muted)] border-b border-[var(--border)]",
                "cursor-move select-none"
              )}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-[var(--muted-foreground)]" />
                <div>
                  <span className="text-sm font-bold text-[var(--book-text,var(--foreground))]">
                    {topic.title} Discussion
                  </span>
                  <p className="text-[10px] text-[var(--muted-foreground)]">
                    Connect with fellow Digital Scroll learners
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDiscussion(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--background)] transition-colors"
                aria-label="Close discussion"
              >
                <X className="w-4 h-4 text-[var(--muted-foreground)]" />
              </button>
            </div>

            {/* Discussion Content */}
            <div className="flex flex-col h-[calc(100%-60px)]">
              {/* Messages Area - Empty state for real discussions */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-[var(--muted-foreground)]" />
                  </div>
                  <h4 className="text-base font-bold text-[var(--book-text,var(--foreground))] mb-2">
                    Digital Scroll Discussions
                  </h4>
                  <p className="text-sm text-[var(--muted-foreground)] max-w-[300px] mb-4">
                    Share insights, ask questions, and connect with others studying {topic.title}.
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]/70">
                    Discussions sync with the community forum
                  </p>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[var(--border)] bg-[var(--muted)]/30">
                <div className="flex gap-3">
                  <textarea
                    placeholder="Share your thoughts on this chapter..."
                    aria-label="Discussion message"
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] resize-none"
                    rows={2}
                  />
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => window.open(`/community/forum?topic=${topic.id}`, '_blank')}
                      className="px-4 py-2 text-xs font-medium rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]"
                    >
                      Post
                    </button>
                    <button
                      onClick={() => window.open(`/community/forum?topic=${topic.id}`, '_blank')}
                      className="px-4 py-2 text-xs font-medium rounded-lg border border-[var(--border)] text-[var(--book-text,var(--foreground))] hover:bg-[var(--muted)]"
                    >
                      Open Forum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function splitContentIntoPages(content: string, charsPerPage: number): string[] {
  if (!content) return ['']

  const pages: string[] = []
  let remaining = content

  while (remaining.length > 0) {
    if (remaining.length <= charsPerPage) {
      pages.push(remaining)
      break
    }

    // Priority 1: Find section breaks (headers like <h2>, <h3>, <h4>)
    // These represent major topic changes - ideal split points
    let breakPoint = -1
    const headerMatch = remaining.slice(0, charsPerPage).match(/<\/h[2-4]>[^]*?(?=<h[2-4])/i)
    if (headerMatch && headerMatch.index !== undefined) {
      const afterHeader = headerMatch.index + headerMatch[0].length
      if (afterHeader > charsPerPage * 0.4) {
        breakPoint = afterHeader
      }
    }

    // Priority 2: Find paragraph breaks (multiple paragraphs together)
    // Try to break after 2+ complete paragraphs for better context grouping
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.4) {
      // Find the last </p> within our limit
      const lastParagraph = remaining.lastIndexOf('</p>', charsPerPage)
      if (lastParagraph !== -1 && lastParagraph > charsPerPage * 0.4) {
        breakPoint = lastParagraph + 4 // Include </p>
      }
    }

    // Priority 3: Break at sentence boundary
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.4) {
      breakPoint = remaining.lastIndexOf('. ', charsPerPage)
      if (breakPoint !== -1) breakPoint += 2 // Include the period and space
    }

    // Priority 4: Last resort - break at word boundary
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.4) {
      breakPoint = remaining.lastIndexOf(' ', charsPerPage)
    }
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.4) {
      breakPoint = charsPerPage
    }

    const pageContent = remaining.slice(0, breakPoint).trim()
    if (pageContent) {
      pages.push(pageContent)
    }
    remaining = remaining.slice(breakPoint).trim()
  }

  return pages.length > 0 ? pages : ['']
}

function getGuardianQuote(chapterIndex: number): string {
  const quotes: Record<number, string> = {
    0: "Stand firm in the face of challenge, for strength is found in perseverance.",
    1: "Truth reveals itself to those who seek with open hearts.",
    2: "In healing others, we discover our own wholeness.",
    3: "Wisdom is not the accumulation of knowledge, but its application in love.",
    4: "Love connects all beings as threads in the great tapestry of existence.",
    5: "Beauty reveals the divine in the ordinary, transforming vision into wonder.",
    6: "Mercy is the bridge between justice and grace, where healing begins.",
  }
  return quotes[chapterIndex] || "The journey of a thousand miles begins with a single step."
}

// Generate summary points based on level
function generateSummaryPoints(module: Module, level: LearningLevel): string[] {
  const basePoints = [
    `${module.title} is essential for sustainable living`,
    `Key concepts covered in this chapter will help you understand real-world applications`,
    `Practice activities reinforce your learning`,
  ]

  const levelSpecific: Record<LearningLevel, string[]> = {
    ELEMENTARY: [
      '🌟 You learned something amazing today!',
      '🎯 Remember the key words from this chapter',
      '🌱 Small actions make big differences',
      '💡 Share what you learned with friends and family',
    ],
    MIDDLE_SCHOOL: [
      'Understanding the basics helps build stronger knowledge',
      'Real-world examples show how this applies to daily life',
      'Critical thinking helps us make better decisions',
      'Every expert was once a beginner',
    ],
    HIGH_SCHOOL: [
      'Systems thinking reveals interconnected relationships',
      'Data and evidence support informed decision-making',
      'Historical context provides perspective on current challenges',
      'Innovation requires both creativity and scientific understanding',
    ],
    UNDERGRADUATE: [
      'Interdisciplinary approaches yield comprehensive solutions',
      'Policy implications extend beyond immediate applications',
      'Economic factors influence adoption and scalability',
      'Research methodology strengthens analytical capabilities',
    ],
    GRADUATE: [
      'Advanced analysis reveals nuanced relationships',
      'Peer-reviewed literature provides foundational evidence',
      'Methodological rigor ensures valid conclusions',
      'Synthesis of multiple perspectives enhances understanding',
    ],
    PHD: [
      'Cutting-edge research pushes boundaries of knowledge',
      'Theoretical frameworks guide empirical investigation',
      'Publication contributes to the broader scientific discourse',
      'Mentorship extends impact beyond individual research',
    ],
  }

  return [...basePoints, ...levelSpecific[level].slice(0, 2)]
}

// Generate fun facts based on topic and level
function generateFunFacts(module: Module, level: LearningLevel, topicId: string): string[] {
  const funFactsByTopic: Record<string, Record<LearningLevel, string[]>> = {
    'renewable-energy': {
      ELEMENTARY: [
        '☀️ The sun produces enough energy in ONE SECOND to power Earth for 500,000 years!',
        '💨 Wind turbines can be as tall as the Statue of Liberty!',
        '🌊 The ocean has enough energy to power millions of homes!',
        '🔋 A single solar panel can power a refrigerator for a whole day!',
        '🦅 Birds can fly between wind turbine blades safely!',
      ],
      MIDDLE_SCHOOL: [
        'Solar panels on just 0.6% of the US could power the entire country',
        'Wind energy has been used for over 5,000 years, starting with sailboats',
        'The largest solar farm covers 56 square kilometers in India',
        'One wind turbine can power 1,500 homes for a year',
        'Germany sometimes produces so much renewable energy they PAY people to use it!',
      ],
      HIGH_SCHOOL: [
        'Solar panel efficiency has improved from 6% in 1954 to over 47% in lab conditions today',
        'Offshore wind turbines can generate up to 15 megawatts each',
        'The energy payback time for solar panels is now under 2 years',
        'Renewable energy jobs grew 500% faster than total US employment in 2019',
        'Perovskite solar cells could revolutionize the industry with lower costs',
      ],
      UNDERGRADUATE: [
        'Levelized cost of solar dropped 89% between 2010-2020, faster than any energy source in history',
        'Floating offshore wind platforms can access winds 60% stronger than near-shore installations',
        'Bifacial solar panels can increase energy yield by 10-20% by capturing reflected light',
        'Grid-scale battery storage costs fell 87% in the last decade',
        'Agrivoltaics (combining farming and solar) can increase land productivity by 160%',
      ],
      GRADUATE: [
        'Tandem perovskite-silicon cells have achieved 29.8% efficiency, approaching theoretical limits',
        'Machine learning optimization has improved wind farm output by 20% in field trials',
        'Power-to-X technologies enable seasonal storage of renewable energy as hydrogen or ammonia',
        'Virtual power plants aggregate distributed resources to provide grid services',
        'Wake steering in wind farms can increase total output by 3-4% through coordinated control',
      ],
      PHD: [
        'Hot carrier solar cells could theoretically achieve 66% efficiency by harvesting excess photon energy',
        'Topological insulators show promise for lossless energy transmission',
        'Quantum dots enable tunable bandgaps for multi-junction solar cells',
        'Metamaterial wind turbine blades could reduce noise while increasing efficiency',
        'Thermophotovoltaic systems can achieve 40%+ efficiency converting heat to electricity',
      ],
    },
    'zero-waste': {
      ELEMENTARY: [
        '♻️ Recycling one aluminum can saves enough energy to run a TV for 3 hours!',
        '🐢 Plastic bags can take 1,000 years to break down!',
        '🍌 Banana peels make great plant food!',
        '📦 Cardboard can be recycled 7 times before the fibers get too short!',
        '🌍 If everyone composted, we could reduce trash by 30%!',
      ],
      MIDDLE_SCHOOL: [
        'The average person generates 4.5 pounds of trash daily',
        'Glass can be recycled forever without losing quality',
        'Landfills are the third-largest source of methane emissions in the US',
        'Japan recycles 84% of its plastic, one of the highest rates globally',
        'A single reusable bag can replace 700 disposable bags over its lifetime',
      ],
      HIGH_SCHOOL: [
        'Circular economy principles could unlock $4.5 trillion in economic growth by 2030',
        'Extended Producer Responsibility laws exist in 400+ jurisdictions worldwide',
        'Sweden imports trash from other countries to fuel its waste-to-energy plants',
        'Microplastics have been found in 94% of tap water samples in the US',
        'Zero-waste grocery stores have grown 300% in the last 5 years',
      ],
      UNDERGRADUATE: [
        'Life Cycle Assessment reveals that product disposal accounts for only 5% of total environmental impact',
        'Industrial symbiosis in Kalundborg, Denmark saves 635,000 tons of CO2 annually',
        'Pyrolysis can convert plastic waste back into fuel oil with 80% efficiency',
        'Chemical recycling technologies can process mixed plastics previously destined for landfills',
        'Blockchain is enabling transparent waste tracking and recycling verification',
      ],
      GRADUATE: [
        'Material flow analysis of global plastic shows only 9% has ever been recycled',
        'Enzymatic plastic degradation using PETase shows promise for biological recycling',
        'Urban mining recovers more gold per ton than traditional ore mining',
        'Decentralized waste processing with IoT optimization reduces collection emissions by 40%',
        'Bioplastic end-of-life pathways require careful system design to avoid contamination',
      ],
      PHD: [
        'Thermochemical conversion of mixed waste streams achieves 85% carbon utilization efficiency',
        'Machine learning contamination detection improves recycling stream purity to 99.5%',
        'Closed-loop textile recycling using ionic liquids preserves fiber quality across cycles',
        'Cradle-to-cradle certification requires full material health assessment and recyclability planning',
        'Agent-based modeling reveals optimal intervention points for circular economy transitions',
      ],
    },
  }

  // Default facts if topic not found
  const defaultFacts: Record<LearningLevel, string[]> = {
    ELEMENTARY: [
      '🌍 Our planet is amazing and needs our help!',
      '🌱 Small changes can make a big difference!',
      '💚 Nature has incredible solutions to problems!',
      '🤝 Working together helps everyone!',
    ],
    MIDDLE_SCHOOL: [
      'Sustainable practices have been used by indigenous cultures for thousands of years',
      'Young people are leading many environmental movements today',
      'Technology is making sustainable solutions more accessible than ever',
      'Every action, no matter how small, contributes to positive change',
    ],
    HIGH_SCHOOL: [
      'The UN Sustainable Development Goals guide global environmental efforts',
      'Green jobs are among the fastest-growing employment sectors',
      'Biomimicry draws inspiration from nature to solve human challenges',
      'Systems thinking reveals how everything is connected',
    ],
    UNDERGRADUATE: [
      'Transdisciplinary approaches are essential for addressing complex sustainability challenges',
      'Social license to operate increasingly depends on environmental performance',
      'Natural capital accounting is being integrated into national GDP calculations',
      'Behavioral economics insights improve environmental program effectiveness',
    ],
    GRADUATE: [
      'Planetary boundaries framework identifies nine critical Earth system thresholds',
      'Doughnut economics provides a visual model for sustainable development',
      'Environmental justice research reveals disproportionate impacts on marginalized communities',
      'Transition management theory guides societal shifts toward sustainability',
    ],
    PHD: [
      'Earth system models integrate human and natural systems at global scales',
      'Leverage points analysis identifies high-impact intervention opportunities',
      'Post-normal science addresses issues with high stakes and high uncertainty',
      'Sustainability science is emerging as a distinct transdisciplinary field',
    ],
  }

  return funFactsByTopic[topicId]?.[level] || defaultFacts[level]
}

// Generate real-world examples based on topic and level
function generateRealWorldExamples(module: Module, level: LearningLevel, topicId: string): Array<{ title: string; description: string; icon: string }> {
  const examplesByLevel: Record<LearningLevel, Array<{ title: string; description: string; icon: string }>> = {
    ELEMENTARY: [
      { title: 'At Home', description: 'Turn off lights when you leave a room to save energy!', icon: '🏠' },
      { title: 'At School', description: 'Use both sides of paper and recycle when done!', icon: '🏫' },
      { title: 'Outside', description: 'Plant a tree or start a small garden!', icon: '🌳' },
    ],
    MIDDLE_SCHOOL: [
      { title: 'Community Projects', description: 'Join local clean-up events or start a recycling program at school.', icon: '🤝' },
      { title: 'Smart Shopping', description: 'Choose products with less packaging and bring reusable bags.', icon: '🛒' },
      { title: 'Tech Solutions', description: 'Use apps to track your carbon footprint and find ways to reduce it.', icon: '📱' },
    ],
    HIGH_SCHOOL: [
      { title: 'Career Exploration', description: 'Green jobs in engineering, science, and policy are growing rapidly.', icon: '💼' },
      { title: 'Civic Engagement', description: 'Advocate for sustainable policies in your local government.', icon: '🗳️' },
      { title: 'Innovation', description: 'Enter sustainability competitions or start an eco-business.', icon: '💡' },
    ],
    UNDERGRADUATE: [
      { title: 'Research Opportunities', description: 'Join labs working on sustainability solutions and contribute to publications.', icon: '🔬' },
      { title: 'Internships', description: 'Gain experience with renewable energy companies or environmental NGOs.', icon: '📋' },
      { title: 'Consulting', description: 'Help organizations measure and reduce their environmental impact.', icon: '📊' },
    ],
    GRADUATE: [
      { title: 'Policy Analysis', description: 'Evaluate effectiveness of environmental regulations and propose improvements.', icon: '📜' },
      { title: 'Industry Leadership', description: 'Drive sustainability initiatives within corporations and supply chains.', icon: '🏢' },
      { title: 'Academic Contribution', description: 'Publish research that advances the field and informs practice.', icon: '📚' },
    ],
    PHD: [
      { title: 'Breakthrough Research', description: 'Develop novel technologies or frameworks that transform the field.', icon: '🧬' },
      { title: 'Expert Advisory', description: 'Advise governments, international bodies, and major corporations.', icon: '🌐' },
      { title: 'Knowledge Transfer', description: 'Bridge academia and practice through partnerships and entrepreneurship.', icon: '🔗' },
    ],
  }

  return examplesByLevel[level]
}

export default DigitalScroll
