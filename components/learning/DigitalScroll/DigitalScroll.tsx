'use client'

// ============================================
// THE DIGITAL SCROLL
// "In the beginning was the Word..."
// Ancient manuscript meets digital revelation
// ============================================

import { useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { X, Volume2, VolumeX, Maximize2, Minimize2, ChevronLeft, ChevronRight, GripVertical, MessageCircle, Search, Bookmark } from 'lucide-react'

// Scroll components
import ScrollContainer, { ScrollWrapper, PageContainer, ScrollSpine, PageEdges } from './ScrollContainer'
import { ScrollCover, InsideCover } from './ScrollCover'
import { RibbonBookmarks } from './RibbonBookmarks'
import { ScrollPage, PageContent, VerseHeader, ChapterDivider } from './ScrollPage'
import { PageFlip, RapidPageFlip, usePageTurnSound } from './PageFlip'
import { ScrollOpenAnimation } from './ScrollOpenAnimation'
import { useScrollState } from './useScrollState'
import { ScrollGameSelector, GradedQuiz } from './ScrollGames'
import { CrosswordPuzzle } from './CrosswordPuzzle'
import { ActivitySelector } from './ActivitySelector'
import { getLearningStageQuote } from './DecorativeElements'

// Feature components
import { SearchPanel } from './SearchPanel'
import { BookmarksList } from './BookmarksList'
import { TextToSpeechControl } from './TextToSpeechControl'
import { useScrollBookmarks } from '@/hooks/useScrollBookmarks'

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
  LEARNING_STAGE_RIBBONS,
  STAGE_ORDER,
  getStageForChapter,
  A11Y_CONFIG,
  getDeviceType,
  CORE_TOPIC_ICONS,
  // Deprecated - kept for backwards compatibility
  GUARDIAN_RIBBONS,
  RIBBON_ORDER,
} from './scrollConstants'

// Learning data
import type { Module, TopicDefinition, CoreTopic } from '@/data/modules'
import type { LearningLevel } from '@/types/learning'
import { getFunFacts, getRealWorldExamples, getSummaryPoints } from '@/data/learning/funFacts'

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

function HieroglyphicDivider({ color }: { color?: string }) {
  // Ancient-inspired decorative symbols
  const symbols = ['☥', '𓂀', '☀', '✦', '◈', '❋', '⚜']
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]

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

function AncientPageNumber({ number, total }: { number: number; total: number }) {
  // Roman numeral conversion for page numbers
  const toRoman = (num: number): string => {
    const romanNumerals: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ]
    let result = ''
    for (const [value, symbol] of romanNumerals) {
      while (num >= value) {
        result += symbol
        num -= value
      }
    }
    return result
  }

  return (
    <div className="text-center text-xs text-[var(--muted-foreground)]/60 font-serif">
      <span className="tracking-widest">{toRoman(number)}</span>
      <span className="mx-2 opacity-30">·</span>
      <span className="tracking-widest">{toRoman(total)}</span>
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
  const [isExpanded, setIsExpanded] = useState(false)

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

  // Feature panel states
  const [showSearch, setShowSearch] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)

  // Bookmarks hook
  const {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmarkNote,
    updateBookmarkColor,
    toggleBookmark,
  } = useScrollBookmarks(topic.id)

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
      // 1. Chapter divider on LEFT page (even index)
      // 2. Chapter intro on RIGHT page (same spread)
      // 3. CONTENT PAGES (Information FIRST - read and learn)
      // 4. Games page (reinforce and ingrain knowledge)
      // 5. Graded Quiz (5 questions for assessment)
      // ============================================

      // Ensure chapter divider lands on LEFT page (even index)
      // Use previous chapter's review page as padding if needed
      if (pages.length % 2 !== 0) {
        const prevChapter = chapterIndex > 0 ? chapterIndex - 1 : 0
        const prevModule = modules[prevChapter]
        const prevGameItems = extractTermsFromModule(prevModule, selectedLevel, 6)
        pages.push({
          type: 'chapter-review',
          chapterIndex: prevChapter,
          module: prevModule,
          keyTerms: prevGameItems.map(t => ({ term: t.term, definition: t.definition })),
          funFacts: getFunFacts(topic.id, selectedLevel).slice(0, 2),
          summaryPoints: getSummaryPoints(topic.id, selectedLevel).slice(0, 2),
        })
      }

      // Generate game items from module content using term extraction
      // First try to extract terms from actual content, then fall back to predefined terms
      const extractedTerms = extractTermsFromModule(module, selectedLevel, 12)
      const fallbackTerms = KEY_TERMS_BY_TOPIC[topic.id] || []

      // Combine extracted terms with fallbacks, prioritizing extracted
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

      // Chapter divider page - LEFT page of spread
      pages.push({
        type: 'chapter-divider',
        chapterIndex,
        module,
        title: module.title,
      })

      // Chapter intro page - RIGHT page of same spread
      pages.push({
        type: 'chapter-intro',
        chapterIndex,
        module,
        title: module.title,
      })

      // ============================================
      // STEP 1: CONTENT PAGES (Information First!)
      // Users read and absorb information before games
      // ============================================
      module.lessons.forEach((lesson, verseIndex) => {
        // Content pages for this verse
        // Split long content into multiple pages
        const content = lesson.content[selectedLevel] || lesson.content.HIGH_SCHOOL
        // Use larger chunks (1800 chars ~300 words) to reduce page flips
        // Internal scroll handles overflow for contextually related content
        const contentChunks = splitContentIntoPages(content, 1800)

        // First chunk gets verse header integrated
        contentChunks.forEach((chunk, pageIndex) => {
          pages.push({
            type: 'content',
            chapterIndex,
            verseIndex,
            pageIndex,
            content: chunk,
            title: pageIndex === 0 ? lesson.title : undefined,
            module,
          })
        })
      })

      // ============================================
      // STEP 2: CHAPTER REVIEW + NOTES (Condensed Enrichment)
      // Single review page combines: Key Terms, Fun Facts, Summary
      // Enhanced notes page includes: Real World Actions + Notes
      // ============================================

      // Ensure review pages land on a good spread position
      if (pages.length % 2 !== 0) {
        // Add chapter review on odd page to make it land on left
        pages.push({
          type: 'chapter-review',
          chapterIndex,
          module,
          keyTerms: chapterGameItems.slice(0, 6).map(item => ({
            term: item.term,
            definition: item.definition,
          })),
          funFacts: getFunFacts(topic.id, selectedLevel).slice(0, 3),
          summaryPoints: getSummaryPoints(topic.id, selectedLevel).slice(0, 3),
        })
      }

      // Chapter Review page (LEFT) - combines Key Terms, Fun Facts, Summary
      pages.push({
        type: 'chapter-review',
        chapterIndex,
        module,
        keyTerms: chapterGameItems.slice(0, 6).map(item => ({
          term: item.term,
          definition: item.definition,
        })),
        funFacts: getFunFacts(topic.id, selectedLevel).slice(0, 3),
        summaryPoints: getSummaryPoints(topic.id, selectedLevel).slice(0, 3),
      })

      // Enhanced Notes page (RIGHT) - includes Real World Actions + Notes + Discussion
      pages.push({
        type: 'notes-enhanced',
        chapterIndex,
        module,
        realWorldExamples: getRealWorldExamples(topic.id),
      })

      // ============================================
      // STEP 3: GAMES (Reinforce & Ingrain)
      // After reading, practice with interactive games
      // ============================================

      // Games page - RIGHT page (practice what you learned)
      pages.push({
        type: 'games',
        chapterIndex,
        module,
        gameItems: chapterGameItems,
      })

      // ============================================
      // STEP 4: GRADED QUIZ (Assessment)
      // 5-question quiz graded for percentage accuracy
      // ============================================

      // Quiz page - graded assessment
      pages.push({
        type: 'quiz',
        chapterIndex,
        module,
        gameItems: chapterGameItems, // Use same terms for quiz questions
      })
    })

    return pages
  }, [modules, selectedLevel])

  // ============================================
  // NAVIGATION STATE
  // ============================================

  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const totalPages = bookPages.length

  const currentPage = bookPages[currentPageIndex]
  const currentChapter = currentPage?.chapterIndex ?? 0

  // Get the learning stage ribbon for current chapter
  const currentRibbon = getStageForChapter(currentChapter)

  // Extract text content for TTS from current page
  const currentPageTextContent = useMemo(() => {
    if (!currentPage) return ''
    // Handle string content
    if (typeof currentPage.content === 'string') {
      // Strip HTML tags for plain text
      return currentPage.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    }
    // For non-content pages, provide contextual text
    if (currentPage.title) {
      return `${currentPage.title}. ${currentPage.subtitle || ''}`
    }
    return ''
  }, [currentPage])

  // ============================================
  // NAVIGATION HANDLERS
  // ============================================

  const goToPage = useCallback((pageIndex: number) => {
    // On desktop, ensure we always land on an even index (left page of spread)
    let targetIndex = pageIndex
    if (isDesktop && pageIndex % 2 !== 0) {
      targetIndex = pageIndex - 1 // Snap to left page of spread
    }
    const clampedIndex = Math.max(0, Math.min(targetIndex, totalPages - 1))
    setCurrentPageIndex(clampedIndex)
    playPageTurn()
  }, [totalPages, playPageTurn, isDesktop])

  // Navigate by full spread on desktop (2 pages), single page on mobile
  const nextPage = useCallback(() => {
    const increment = isDesktop ? 2 : 1
    if (currentPageIndex < totalPages - increment) {
      goToPage(currentPageIndex + increment)
    }
  }, [currentPageIndex, totalPages, goToPage, isDesktop])

  const prevPage = useCallback(() => {
    const decrement = isDesktop ? 2 : 1
    if (currentPageIndex >= decrement) {
      goToPage(currentPageIndex - decrement)
    }
  }, [currentPageIndex, goToPage, isDesktop])

  const goToChapter = useCallback((chapterIndex: number) => {
    // Find the chapter divider page for this chapter
    const pageIndex = bookPages.findIndex(
      (page) => page.type === 'chapter-divider' && page.chapterIndex === chapterIndex
    )
    if (pageIndex !== -1) {
      // Use rapid flip if jumping more than 5 pages
      if (Math.abs(pageIndex - currentPageIndex) > 5) {
        setIsRapidFlipping(true)
        setTimeout(() => {
          setCurrentPageIndex(pageIndex)
          setIsRapidFlipping(false)
        }, 1000)
      } else {
        goToPage(pageIndex)
      }
    }
  }, [bookPages, currentPageIndex, goToPage])

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
    // Search shortcut: Cmd+K / Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setShowSearch(true)
      return
    }

    // Bookmarks shortcut: Cmd+B / Ctrl+B
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault()
      setShowBookmarks(prev => !prev)
      return
    }

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

  useEffect(() => {
    if (!scrollState.unlockState.isUnlocked) {
      scrollState.unlockScroll(topic.id)
    }
    scrollState.openScroll(topic.id)
  }, [topic.id, scrollState])

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
        // Use ribbon color with fallback to primary for proper theme support
        const coverTitleColor = currentRibbon?.colors.from || 'var(--primary)'
        return (
          <div className="w-full h-full flex items-center justify-center bg-[var(--book-paper,var(--card))] text-[var(--book-text,var(--foreground))]">
            <div className="text-center px-4">
              <span className="text-7xl block mb-6">{CORE_TOPIC_ICONS[topic.id] || '📖'}</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: coverTitleColor }}>
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
        // Use ribbon color with fallback for divider
        const tocDividerColor = currentRibbon?.colors.from || 'var(--primary)'
        return (
          <div className="w-full h-full flex flex-col px-2 bg-[var(--book-paper,var(--card))] text-[var(--book-text,var(--foreground))]">
            <AncientBorder />
            {/* TOC Header */}
            <div className="text-center py-4 shrink-0">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--book-text,var(--foreground))] mb-1">
                Table of Contents
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] italic font-serif">
                The Seven Paths of Knowledge
              </p>
            </div>
            <HieroglyphicDivider color={tocDividerColor} />
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
                        Chapter {i + 1}
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

      case 'learning-mission':
        // Learning Mission page - fill-in-the-blank intentions
        const missionColor = currentRibbon?.colors.from || 'var(--primary)'
        return (
          <div className="w-full h-full flex flex-col relative bg-[var(--book-paper,var(--card))] text-[var(--book-text,var(--foreground))]">
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
              stageQuote={getLearningStageQuote(page.chapterIndex ?? 0)}
            />
          </div>
        )

      case 'chapter-intro':
        // Right side of chapter spread - shows COMPLETE curriculum outline
        const introStageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
        const introRibbon = introStageKey ? LEARNING_STAGE_RIBBONS[introStageKey] : null
        const introColor = introRibbon?.colors.from || 'var(--primary)'
        const chapterModule = page.module
        const allLessons = chapterModule?.lessons || []
        const allActivities = chapterModule?.activities || []
        const chapterGame = chapterModule?.game
        const chapterQuiz = chapterModule?.quiz
        const totalDuration = chapterModule?.duration?.[selectedLevel] ||
          allLessons.reduce((sum, l) => sum + (l.duration || 0), 0)

        return (
          <div className="w-full h-full flex flex-col relative px-3 py-2">
            <AncientBorder />

            {/* Header */}
            <div className="text-center pb-2 shrink-0">
              <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))]">
                Chapter {(page.chapterIndex ?? 0) + 1} Outline
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {totalDuration} min • {allLessons.length} lessons
              </p>
              <div
                className="w-16 h-0.5 mx-auto mt-2"
                style={{
                  background: `linear-gradient(to right, transparent, ${introColor}, transparent)`,
                }}
              />
            </div>

            {/* Full Curriculum Outline - fills available space */}
            <div className="flex-1 min-h-0 flex flex-col justify-evenly overflow-hidden">
              {/* LESSONS SECTION */}
              <div>
                <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="text-sm">📚</span> Lessons
                </p>
                <div className="space-y-1.5">
                  {allLessons.slice(0, 5).map((lesson, idx) => (
                    <div
                      key={lesson.id || idx}
                      className="flex items-center gap-2 py-1.5 px-2 rounded bg-[var(--muted)]/15"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: introColor }}
                      >
                        {idx + 1}
                      </div>
                      <p className="flex-1 text-sm font-medium text-[var(--book-text,var(--foreground))] truncate">
                        {lesson.title}
                      </p>
                      <span className="text-xs text-[var(--muted-foreground)] shrink-0">
                        {lesson.duration}m
                      </span>
                      {lesson.hasActivity && (
                        <span className="text-sm" title="Includes activity">⚡</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* GAME & QUIZ ROW */}
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

              {/* Module Description */}
              {chapterModule?.description && (
                <div className="p-3 rounded-lg bg-[var(--muted)]/10 border-l-3" style={{ borderColor: introColor }}>
                  <p className="text-sm italic text-[var(--muted-foreground)] leading-relaxed">
                    {typeof chapterModule.description === 'string'
                      ? chapterModule.description
                      : chapterModule.description[selectedLevel] || chapterModule.description.HIGH_SCHOOL}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 text-center pt-2 border-t border-[var(--border)]/20">
              <p className="text-xs text-[var(--muted-foreground)]">
                Turn the page to begin →
              </p>
            </div>
          </div>
        )

      case 'games':
        // Interactive learning games page
        const gamesStageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
        const gamesRibbon = gamesStageKey ? LEARNING_STAGE_RIBBONS[gamesStageKey] : null
        const gameItems = page.gameItems || []
        const chapterIdx = page.chapterIndex ?? 0
        const gamesCompleted = completedGames[chapterIdx] ?? false
        return (
          <div className="w-full h-full flex flex-col relative">
            <AncientBorder />

            {/* Header - compact */}
            <div className="text-center pt-2 pb-1 shrink-0">
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

            {/* Games selector - allows internal scroll */}
            <div className="flex-1 min-h-0 px-2 pb-1 overflow-y-auto">
              {gameItems.length > 0 ? (
                <ScrollGameSelector
                  items={gameItems}
                  topicColor={gamesRibbon?.colors.from}
                  level={selectedLevel}
                  onComplete={(score) => {
                    // Mark games as completed for this chapter
                    setCompletedGames(prev => ({ ...prev, [chapterIdx]: true }))
                    console.log(`Game completed with score: ${score}`)
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
        const verseStageKey = STAGE_ORDER[page.chapterIndex ?? 0]
        const verseRibbon = verseStageKey ? LEARNING_STAGE_RIBBONS[verseStageKey] : null
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
              {typeof page.content === 'string' ? (
                <div
                  className="lesson-content"
                  dangerouslySetInnerHTML={{ __html: page.content }}
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

      case 'chapter-review':
        // Combined Chapter Review: Key Terms + Fun Facts + Summary on ONE page
        const reviewStageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
        const reviewRibbon = reviewStageKey ? LEARNING_STAGE_RIBBONS[reviewStageKey] : null
        const reviewColor = reviewRibbon?.colors.from || 'var(--primary)'
        return (
          <div className="w-full h-full flex flex-col relative px-3 py-2">
            <AncientBorder />

            {/* Header */}
            <div className="text-center pb-2 shrink-0">
              <h3 className="text-lg font-serif font-bold text-[var(--book-text,var(--foreground))] flex items-center justify-center gap-2">
                <span className="text-xl">📚</span> Chapter Review
              </h3>
              <div
                className="w-16 h-0.5 mx-auto mt-2"
                style={{ background: `linear-gradient(to right, transparent, ${reviewColor}, transparent)` }}
              />
            </div>

            {/* Content fills available space evenly */}
            <div className="flex-1 min-h-0 flex flex-col justify-evenly overflow-hidden">
              {/* Key Terms Section */}
              <div>
                <p className="text-xs font-bold text-[var(--muted-foreground)] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="text-sm">📖</span> Key Terms
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(page.keyTerms || []).slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-[var(--muted)]/20"
                    >
                      <p className="text-sm font-bold text-[var(--book-text,var(--foreground))]">{item.term}</p>
                      <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts Section */}
              <div>
                <p className="text-xs font-bold text-[var(--muted-foreground)] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="text-sm">💡</span> Did You Know?
                </p>
                <div className="space-y-2">
                  {(page.funFacts || []).slice(0, 2).map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg border-l-3 text-sm text-[var(--book-text,var(--foreground))] leading-relaxed"
                      style={{ borderColor: reviewColor, background: `${reviewColor}10` }}
                    >
                      {fact}
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Section */}
              <div>
                <p className="text-xs font-bold text-[var(--muted-foreground)] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="text-sm">✓</span> Key Takeaways
                </p>
                <div className="space-y-2">
                  {(page.summaryPoints || []).slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5"
                        style={{ background: reviewColor }}
                      >
                        ✓
                      </span>
                      <p className="text-sm text-[var(--book-text,var(--foreground))] leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Quote */}
            <div className="shrink-0 px-3 pt-2 border-t border-[var(--border)]/20">
              <p className="text-xs text-[var(--muted-foreground)] italic text-center leading-relaxed">
                &ldquo;{getLearningStageQuote(page.chapterIndex ?? 0)}&rdquo;
              </p>
            </div>
          </div>
        )

      case 'notes-enhanced':
        // Enhanced Notes: Real World Actions + Notes + Discussion on ONE page
        const enhancedStageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
        const enhancedRibbon = enhancedStageKey ? LEARNING_STAGE_RIBBONS[enhancedStageKey] : null
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
                onClick={() => setShowDiscussion(true)}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Discussion</span>
              </button>
            </div>
          </div>
        )

      case 'quiz':
        // Graded 5-question quiz for assessment
        const quizStageKey = page.chapterIndex !== undefined ? STAGE_ORDER[page.chapterIndex] : undefined
        const quizRibbon = quizStageKey ? LEARNING_STAGE_RIBBONS[quizStageKey] : null
        const quizItems = page.gameItems || []
        const quizChapterIdx = page.chapterIndex ?? 0
        const isQuizUnlocked = completedGames[quizChapterIdx] ?? false

        return (
          <div className="w-full h-full flex flex-col relative">
            <AncientBorder />

            {/* Header - compact */}
            <div className="text-center pt-2 pb-1 shrink-0">
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

            {/* Quiz Component - allows internal scroll */}
            <div className="flex-1 min-h-0 px-2 pb-1 overflow-y-auto">
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
                    console.log(`Quiz completed: ${score}/${total} (${percentage}%)`)
                    // TODO: Save quiz result for badge progress
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
  // GET PAGES FOR CURRENT SPREAD
  // ============================================

  const leftPage = bookPages[currentPageIndex]
  const rightPage = isDesktop ? bookPages[currentPageIndex + 1] : null
  const prevLeftPage = bookPages[currentPageIndex - 2]
  const prevRightPage = bookPages[currentPageIndex - 1]
  const nextLeftPage = bookPages[currentPageIndex + 2]
  const nextRightPage = bookPages[currentPageIndex + 3]

  // ============================================
  // COMPLETED CHAPTERS
  // ============================================

  const completedChapters = useMemo(() => {
    const progress = scrollState.topicProgress[topic.id]
    return progress?.completedChapters || []
  }, [scrollState.topicProgress, topic.id])

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
            targetPage={currentPageIndex}
            onAnimationComplete={handleAnimationComplete}
            reducedMotion={scrollState.preferences.reducedMotion}
          />
        )}
      </AnimatePresence>

      {/* Rapid Flip Animation */}
      <AnimatePresence>
        {isRapidFlipping && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            />

            {/* Page Flip Container */}
            <PageFlip
              leftPage={
                <PageContainer side="left">
                  {leftPage && renderPageContent(leftPage, 'left')}
                </PageContainer>
              }
              rightPage={
                <PageContainer side="right">
                  {rightPage ? renderPageContent(rightPage, 'right') : <div />}
                </PageContainer>
              }
              nextLeftPage={
                nextLeftPage ? (
                  <PageContainer side="left">
                    {renderPageContent(nextLeftPage, 'left')}
                  </PageContainer>
                ) : undefined
              }
              nextRightPage={
                nextRightPage ? (
                  <PageContainer side="right">
                    {renderPageContent(nextRightPage, 'right')}
                  </PageContainer>
                ) : undefined
              }
              prevLeftPage={
                prevLeftPage ? (
                  <PageContainer side="left">
                    {renderPageContent(prevLeftPage, 'left')}
                  </PageContainer>
                ) : undefined
              }
              prevRightPage={
                prevRightPage ? (
                  <PageContainer side="right">
                    {renderPageContent(prevRightPage, 'right')}
                  </PageContainer>
                ) : undefined
              }
              currentSpread={Math.floor(currentPageIndex / 2)}
              totalSpreads={Math.ceil(totalPages / 2)}
              onFlipComplete={(direction) => {
                if (direction === 'next') {
                  setCurrentPageIndex((prev) => Math.min(prev + (isDesktop ? 2 : 1), totalPages - 1))
                } else {
                  setCurrentPageIndex((prev) => Math.max(prev - (isDesktop ? 2 : 1), 0))
                }
              }}
            />

            {/* Book Spine */}
            <ScrollSpine />

            {/* Page Edges */}
            <PageEdges pageCount={totalPages} />
          </ScrollWrapper>

          {/* Navigation Footer - Minimal, shows on hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 opacity-30 hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevPage}
              disabled={currentPageIndex === 0}
              className="p-1.5 rounded-full bg-[var(--card)]/80 text-[var(--book-text,var(--foreground))] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] disabled:opacity-20 transition-all border border-[var(--border)]/50"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-[var(--muted-foreground)] text-[10px] font-medium min-w-[50px] text-center">
              {currentPageIndex + 1}/{totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPageIndex >= totalPages - 1}
              className="p-1.5 rounded-full bg-[var(--card)]/80 text-[var(--book-text,var(--foreground))] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] disabled:opacity-20 transition-all border border-[var(--border)]/50"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Top Control Bar */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 z-30">
            {/* Text-to-Speech Control (when page has text content) */}
            {currentPageTextContent && (
              <div className="relative bg-[var(--card)]/90 rounded-full border border-[var(--border)]">
                <TextToSpeechControl content={currentPageTextContent} />
              </div>
            )}

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
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] resize-none"
                    rows={2}
                  />
                  <div className="flex flex-col gap-2">
                    <button
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

      {/* Search Panel - Cmd+K */}
      <SearchPanel
        modules={modules}
        selectedLevel={selectedLevel}
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onResultClick={(chapterIndex, lessonIndex) => {
          // Find the page index for this chapter/lesson
          const pageIndex = bookPages.findIndex(
            p => p.chapterIndex === chapterIndex && p.verseIndex === lessonIndex
          )
          if (pageIndex !== -1) {
            goToPage(pageIndex)
            setShowSearch(false)
          }
        }}
      />

      {/* Bookmarks List */}
      <BookmarksList
        bookmarks={bookmarks}
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        onBookmarkClick={(bookmark) => {
          const pageIndex = bookPages.findIndex(
            p => p.chapterIndex === bookmark.chapterIndex &&
                 p.verseIndex === bookmark.lessonIndex
          )
          if (pageIndex !== -1) {
            goToPage(pageIndex)
            setShowBookmarks(false)
          }
        }}
        onDeleteBookmark={removeBookmark}
        onUpdateNote={updateBookmarkNote}
        onUpdateColor={updateBookmarkColor}
      />

      {/* Floating Action Buttons (FABs) in corner */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Bookmark FAB */}
        <button
          onClick={() => setShowBookmarks(prev => !prev)}
          className={cn(
            'w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center',
            showBookmarks
              ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
              : 'bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] border border-[var(--border)]'
          )}
          title="Bookmarks (Cmd+B)"
        >
          <Bookmark className="w-5 h-5" />
          {bookmarks.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs rounded-full flex items-center justify-center">
              {bookmarks.length}
            </span>
          )}
        </button>

        {/* Search FAB */}
        <button
          onClick={() => setShowSearch(true)}
          className="w-12 h-12 rounded-full bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] border border-[var(--border)] shadow-lg transition-all flex items-center justify-center"
          title="Search (Cmd+K)"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
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

// Legacy inline generators removed - now using external data from @/data/learning/funFacts

export default DigitalScroll
