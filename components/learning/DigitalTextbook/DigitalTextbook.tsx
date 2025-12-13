'use client'

// ============================================
// THE SACRED DIGITAL TEXTBOOK
// "In the beginning was the Word..."
// Ancient manuscript meets digital revelation
// ============================================

import { useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { X, Volume2, VolumeX, Maximize2, Minimize2, ChevronLeft, ChevronRight, GripVertical, MessageCircle } from 'lucide-react'

// Book components
import BookContainer, { BookWrapper, PageContainer, BookSpine, PageEdges } from './BookContainer'
import { BookCover, InsideCover } from './BookCover'
import { RibbonBookmarks } from './RibbonBookmarks'
import { BookPage, PageContent, VerseHeader, ChapterDivider } from './BookPage'
import { PageFlip, RapidPageFlip, usePageTurnSound } from './PageFlip'
import { BookOpenAnimation } from './BookOpenAnimation'
import { useBookState } from './useBookState'
import { BookGameSelector, GradedQuiz } from './BookGames'
import { CrosswordPuzzle } from './CrosswordPuzzle'

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
} from './bookConstants'

// Learning data
import type { Module, TopicDefinition, CoreTopic } from '@/data/modules'
import type { LearningLevel } from '@/types/learning'

// ============================================
// TYPES
// ============================================

interface DigitalTextbookProps {
  topic: TopicDefinition
  modules: Module[]
  initialLevel?: LearningLevel
  onClose: () => void
  className?: string
}

interface BookContent {
  type: 'cover' | 'inside-cover' | 'toc' | 'learning-mission' | 'chapter-divider' | 'chapter-intro' | 'verse' | 'content' | 'blank' | 'games' | 'quiz'
  chapterIndex?: number
  verseIndex?: number
  pageIndex?: number
  content?: ReactNode
  title?: string
  subtitle?: string
  module?: Module
  gameItems?: GameItem[]
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

export function DigitalTextbook({
  topic,
  modules,
  initialLevel = 'HIGH_SCHOOL',
  onClose,
  className,
}: DigitalTextbookProps) {
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

  const bookState = useBookState()
  const playPageTurn = usePageTurnSound(bookState.preferences.soundEnabled)

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
    const pages: BookContent[] = []

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
      if (pages.length % 2 !== 0) {
        pages.push({
          type: 'blank',
          chapterIndex: chapterIndex > 0 ? chapterIndex - 1 : undefined,
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
        const contentChunks = splitContentIntoPages(content, 450)

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
      // STEP 2: GAMES (Reinforce & Ingrain)
      // After reading, practice with interactive games
      // ============================================

      // Ensure games land on a good spread position
      if (pages.length % 2 !== 0) {
        pages.push({
          type: 'blank',
          chapterIndex,
          module,
        })
      }

      // Notes page - LEFT side for personal notes while playing
      pages.push({
        type: 'blank',
        chapterIndex,
        module,
      })

      // Games page - RIGHT page (practice what you learned)
      pages.push({
        type: 'games',
        chapterIndex,
        module,
        gameItems: chapterGameItems,
      })

      // ============================================
      // STEP 3: GRADED QUIZ (Assessment)
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

  // Get the ribbon for current chapter
  const currentRibbon = RIBBON_ORDER[currentChapter]
    ? GUARDIAN_RIBBONS[RIBBON_ORDER[currentChapter]]
    : null

  // ============================================
  // NAVIGATION HANDLERS
  // ============================================

  const goToPage = useCallback((pageIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(pageIndex, totalPages - 1))
    setCurrentPageIndex(clampedIndex)
    playPageTurn()
  }, [totalPages, playPageTurn])

  const nextPage = useCallback(() => {
    if (currentPageIndex < totalPages - 1) {
      goToPage(currentPageIndex + 1)
    }
  }, [currentPageIndex, totalPages, goToPage])

  const prevPage = useCallback(() => {
    if (currentPageIndex > 0) {
      goToPage(currentPageIndex - 1)
    }
  }, [currentPageIndex, goToPage])

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
    const position = bookState.getContinuePosition(topic.id)
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
  }, [bookState, topic.id, bookPages, goToPage])

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (A11Y_CONFIG.keyboardNav.closeBook.includes(e.key)) {
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
    if (!bookState.unlockState.isUnlocked) {
      bookState.unlockBook(topic.id)
    }
    bookState.openBook(topic.id)
  }, [topic.id, bookState])

  const handleAnimationComplete = useCallback(() => {
    setShowOpenAnimation(false)
    // Jump to continue position if exists
    const position = bookState.getContinuePosition(topic.id)
    if (position.chapter > 0 || position.verse > 0 || position.page > 0) {
      continueReading()
    } else {
      // Start at cover page (spread shows cover + level selection)
      setCurrentPageIndex(0)
    }
  }, [bookState, topic.id, continueReading])

  // ============================================
  // SAVE POSITION ON PAGE CHANGE
  // ============================================

  useEffect(() => {
    const page = bookPages[currentPageIndex]
    if (page && page.type === 'content') {
      bookState.goToPosition({
        chapter: page.chapterIndex ?? 0,
        verse: page.verseIndex ?? 0,
        page: page.pageIndex ?? 0,
      })
    }
  }, [currentPageIndex, bookPages, bookState])

  // ============================================
  // RENDER PAGE CONTENT
  // ============================================

  const renderPageContent = (page: BookContent, side: 'left' | 'right') => {
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
                A Sacred Journey of Knowledge
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
            <div className="text-center py-4 shrink-0">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--foreground)] mb-1">
                Table of Contents
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] italic font-serif">
                The Seven Paths of Knowledge
              </p>
            </div>
            <HieroglyphicDivider color={currentRibbon?.colors.from} />
            {/* Chapter List - fills available space with scroll if needed */}
            <div className="flex-1 overflow-y-auto space-y-2 py-2">
              {modules.slice(0, 7).map((module, i) => {
                const ribbon = RIBBON_ORDER[i] ? GUARDIAN_RIBBONS[RIBBON_ORDER[i]] : null
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
                      <span className="font-serif text-base text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate block">
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
        // Learning Mission page - initial reflections before beginning
        const missionNoteKey = 'learning-mission-reflection'
        return (
          <div className="w-full h-full flex flex-col relative overflow-hidden">
            <AncientBorder />

            {/* Header */}
            <div className="text-center pt-6 pb-3 shrink-0">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-1">
                Learning Mission
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] italic max-w-[250px] mx-auto">
                Before you begin, take a moment to reflect on your learning journey
              </p>
            </div>

            {/* Divider */}
            <div
              className="w-3/4 h-px mx-auto mb-4 shrink-0"
              style={{
                background: `linear-gradient(to right, transparent, ${currentRibbon?.colors.from || 'var(--border)'}60, transparent)`,
              }}
            />

            {/* Mission Prompts */}
            <div className="px-4 mb-3 shrink-0">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm">✨</span>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    What do you hope to learn from {topic.title}?
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm">💭</span>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    What do you already know about this topic?
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm">🌱</span>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    How will you apply this knowledge?
                  </p>
                </div>
              </div>
            </div>

            {/* Reflection textarea */}
            <div className="flex-1 px-4 pb-4 min-h-0">
              <textarea
                className={cn(
                  "w-full h-full resize-none",
                  "bg-transparent",
                  "border border-dashed border-[var(--border)]/40 rounded-lg",
                  "p-3 text-sm font-serif",
                  "text-[var(--foreground)]",
                  "placeholder:text-[var(--muted-foreground)]/40 placeholder:italic",
                  "focus:outline-none focus:border-[var(--primary)]/50",
                  "transition-colors"
                )}
                placeholder="Write your intentions, goals, and starting thoughts here..."
                value={pageNotes[missionNoteKey] || ''}
                onChange={(e) => saveNote(missionNoteKey, e.target.value)}
                style={{
                  lineHeight: '1.75em',
                  backgroundImage: 'linear-gradient(to bottom, transparent 90%, var(--border) 90%, var(--border) 92%, transparent 92%)',
                  backgroundSize: '100% 1.75em',
                  backgroundPosition: '0 0.25em',
                }}
              />
            </div>

            {/* Footer hint */}
            <div className="shrink-0 text-center pb-4">
              <p className="text-[9px] text-[var(--muted-foreground)]">
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
        // Right side of chapter spread - shows learning objectives and chapter overview
        const introRibbon = page.chapterIndex !== undefined && RIBBON_ORDER[page.chapterIndex]
          ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex]]
          : null
        const introColor = introRibbon?.colors.from || 'var(--primary)'
        return (
          <div className="w-full h-full flex flex-col relative overflow-hidden">
            <AncientBorder />

            {/* Header */}
            <div className="text-center pt-6 pb-4 shrink-0">
              <h3 className="text-lg font-serif font-bold text-[var(--foreground)] mb-2">
                What You&apos;ll Learn
              </h3>
              <div
                className="w-24 h-0.5 mx-auto"
                style={{
                  background: `linear-gradient(to right, transparent, ${introColor}, transparent)`,
                }}
              />
            </div>

            {/* Learning objectives list */}
            <div className="flex-1 px-4 overflow-y-auto">
              <div className="space-y-3">
                {page.module?.lessons.slice(0, 6).map((lesson, idx) => (
                  <div
                    key={lesson.id || idx}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                      style={{ background: introColor }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        {lesson.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Module description */}
              {page.module && (
                <div className="mt-6 p-3 rounded-lg bg-[var(--muted)]/30 border border-[var(--border)]/30">
                  <p className="text-xs italic text-[var(--muted-foreground)] leading-relaxed">
                    {typeof page.module.description === 'string'
                      ? page.module.description
                      : page.module.description[selectedLevel] || page.module.description.HIGH_SCHOOL}
                  </p>
                </div>
              )}
            </div>

            {/* Footer prompt */}
            <div className="shrink-0 text-center py-4">
              <div
                className="w-16 h-0.5 mx-auto mb-3"
                style={{
                  background: `linear-gradient(to right, transparent, ${introColor}, transparent)`,
                }}
              />
              <p className="text-xs text-[var(--muted-foreground)]">
                Turn the page to begin your journey →
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
          <div className="w-full h-full flex flex-col relative overflow-hidden">
            <AncientBorder />

            {/* Header */}
            <div className="text-center pt-3 pb-2 shrink-0">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-base">{gamesCompleted ? '✅' : '🎮'}</span>
                <h3 className="text-sm font-serif font-bold text-[var(--foreground)]">
                  Practice Activities
                </h3>
              </div>
              <p className="text-[9px] text-[var(--muted-foreground)]">
                {gamesCompleted ? 'Completed! Quiz unlocked →' : `Complete to unlock Chapter ${chapterIdx + 1} Quiz`}
              </p>
            </div>

            {/* Games selector */}
            <div className="flex-1 min-h-0 px-2 pb-2">
              {gameItems.length > 0 ? (
                <BookGameSelector
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
        return (
          <BookPage
            pageNumber={currentPageIndex + 1}
            totalPages={totalPages}
            chapterIndex={page.chapterIndex ?? 0}
            side={side}
          >
            {/* Content area - fills full page width */}
            <div
              className={cn(
                "w-full h-full",
                "prose prose-xs sm:prose-sm dark:prose-invert max-w-none",
                "font-serif",
                // Typography for book-like appearance - compact sizing
                "prose-p:text-xs sm:prose-p:text-sm prose-p:leading-relaxed prose-p:mb-3 prose-p:text-justify prose-p:hyphens-auto",
                "prose-headings:font-bold prose-headings:mb-2",
                "prose-h2:text-lg sm:prose-h2:text-xl prose-h3:text-base sm:prose-h3:text-lg",
                "prose-strong:font-bold",
                "prose-ul:space-y-0.5 prose-ol:space-y-0.5",
                "prose-li:text-xs sm:prose-li:text-sm prose-li:leading-relaxed",
                // First paragraph drop cap effect - smaller
                "[&>div>p:first-of-type]:first-letter:float-left [&>div>p:first-of-type]:first-letter:text-3xl sm:[&>div>p:first-of-type]:first-letter:text-4xl [&>div>p:first-of-type]:first-letter:font-bold [&>div>p:first-of-type]:first-letter:mr-1.5 [&>div>p:first-of-type]:first-letter:mt-0.5",
                "[&>div>p:first-of-type]:first-letter:text-[var(--primary)]",
              )}
            >
              {typeof page.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
              ) : (
                page.content
              )}
            </div>
          </BookPage>
        )

      case 'blank':
        // Interactive blank page with notes and discussion
        const blankRibbon = page.chapterIndex !== undefined && RIBBON_ORDER[page.chapterIndex]
          ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex]]
          : null
        const chapterTitle = page.chapterIndex !== undefined && page.chapterIndex < modules.length
          ? modules[page.chapterIndex].title
          : 'General'
        const noteKey = `chapter-${page.chapterIndex ?? 'general'}-notes`
        return (
          <div className="w-full h-full flex flex-col relative overflow-hidden">
            <AncientBorder />

            {/* Header */}
            <div className="text-center pt-4 pb-2 shrink-0">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg">📝</span>
                <h3 className="text-sm font-serif font-bold text-[var(--foreground)]">
                  Personal Notes
                </h3>
              </div>
              <p className="text-[10px] text-[var(--muted-foreground)] italic">
                Reflections on {chapterTitle}
              </p>
            </div>

            {/* Divider */}
            <div
              className="w-3/4 h-px mx-auto mb-3 shrink-0"
              style={{
                background: `linear-gradient(to right, transparent, ${blankRibbon?.colors.from || 'var(--border)'}60, transparent)`,
              }}
            />

            {/* Notes textarea */}
            <div className="flex-1 px-4 pb-2 min-h-0">
              <textarea
                className={cn(
                  "w-full h-full resize-none",
                  "bg-transparent",
                  "border border-dashed border-[var(--border)]/40 rounded-lg",
                  "p-3 text-sm font-serif",
                  "text-[var(--foreground)]",
                  "placeholder:text-[var(--muted-foreground)]/40 placeholder:italic",
                  "focus:outline-none focus:border-[var(--primary)]/50",
                  "transition-colors"
                )}
                placeholder="Write your thoughts, insights, and reflections here..."
                value={pageNotes[noteKey] || ''}
                onChange={(e) => saveNote(noteKey, e.target.value)}
                style={{
                  lineHeight: '1.75em',
                  // Lined paper effect - text sits above the line
                  backgroundImage: 'linear-gradient(to bottom, transparent 90%, var(--border) 90%, var(--border) 92%, transparent 92%)',
                  backgroundSize: '100% 1.75em',
                  backgroundPosition: '0 0.25em', // Offset to align text above lines
                }}
              />
            </div>

            {/* Discussion Section */}
            <div className="shrink-0 px-4 pb-4">
              <div
                className="w-full h-px mb-3"
                style={{
                  background: `linear-gradient(to right, transparent, ${blankRibbon?.colors.from || 'var(--border)'}60, transparent)`,
                }}
              />

              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg",
                  "bg-[var(--muted)]/50 hover:bg-[var(--muted)]",
                  "border border-[var(--border)]/50",
                  "text-[var(--foreground)] text-xs font-medium",
                  "transition-all hover:scale-[1.01]"
                )}
                onClick={() => setShowDiscussion(true)}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open Discussion</span>
              </button>

              <p className="text-[9px] text-center text-[var(--muted-foreground)]/60 mt-2 italic">
                Discuss with fellow learners
              </p>
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
          <div className="w-full h-full flex flex-col relative overflow-hidden">
            <AncientBorder />

            {/* Header */}
            <div className="text-center pt-3 pb-2 shrink-0">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-base">{isQuizUnlocked ? '📝' : '🔒'}</span>
                <h3 className="text-sm font-serif font-bold text-[var(--foreground)]">
                  Chapter Quiz
                </h3>
              </div>
              <p className="text-[9px] text-[var(--muted-foreground)]">
                {isQuizUnlocked ? '5 Questions • Graded Assessment' : 'Complete Practice Activities to unlock'}
              </p>
            </div>

            {/* Quiz Component */}
            <div className="flex-1 min-h-0 px-2 pb-2">
              {!isQuizUnlocked ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">
                    Quiz Locked
                  </h4>
                  <p className="text-xs text-[var(--muted-foreground)] mb-4 max-w-[200px]">
                    Complete at least one Practice Activity to unlock this chapter&apos;s graded quiz.
                  </p>
                  <button
                    onClick={() => prevPage()}
                    className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-medium"
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
                  <p className="text-xs text-[var(--muted-foreground)]">
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
    const progress = bookState.topicProgress[topic.id]
    return progress?.completedChapters || []
  }, [bookState.topicProgress, topic.id])

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      {/* Opening Animation */}
      <AnimatePresence>
        {showOpenAnimation && (
          <BookOpenAnimation
            topicSlug={topic.id}
            topicTitle={topic.title}
            topicDescription={topic.description}
            targetPage={currentPageIndex}
            onAnimationComplete={handleAnimationComplete}
            reducedMotion={bookState.preferences.reducedMotion}
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
        <BookContainer
          isOpen={bookState.isBookOpen}
          isExpanded={isExpanded}
          onKeyDown={handleKeyDown}
          className={className}
        >
          {/* Ribbon Bookmarks */}
          <RibbonBookmarks
            currentChapter={currentChapter}
            completedChapters={completedChapters}
            onChapterClick={goToChapter}
            onContinueClick={continueReading}
            continuePosition={bookState.currentPosition || undefined}
            isExpanded={isExpanded}
          />

          {/* Book Wrapper */}
          <BookWrapper>
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
            <BookSpine />

            {/* Page Edges */}
            <PageEdges pageCount={totalPages} />
          </BookWrapper>

          {/* Navigation Footer - Minimal, shows on hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 opacity-30 hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevPage}
              disabled={currentPageIndex === 0}
              className="p-1.5 rounded-full bg-[var(--card)]/80 text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] disabled:opacity-20 transition-all border border-[var(--border)]/50"
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
              className="p-1.5 rounded-full bg-[var(--card)]/80 text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] disabled:opacity-20 transition-all border border-[var(--border)]/50"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Top Control Bar */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 z-30">
            {/* Sound Toggle */}
            <button
              onClick={() => bookState.updatePreferences({ soundEnabled: !bookState.preferences.soundEnabled })}
              className="p-2 rounded-full bg-[var(--card)]/90 text-[var(--foreground)] hover:bg-[var(--muted)] border border-[var(--border)] transition-all"
              aria-label={bookState.preferences.soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            >
              {bookState.preferences.soundEnabled ? (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Expand/Minimize Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full bg-[var(--card)]/90 text-[var(--foreground)] hover:bg-[var(--muted)] border border-[var(--border)] transition-all"
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
                bookState.closeBook()
                onClose()
              }}
              className="p-2 rounded-full bg-red-500/90 text-white hover:bg-red-600 transition-all"
              aria-label="Close book"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </BookContainer>
      )}

      {/* Draggable Discussion Modal - Sacred Book Community */}
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
                  <span className="text-sm font-bold text-[var(--foreground)]">
                    {topic.title} Discussion
                  </span>
                  <p className="text-[10px] text-[var(--muted-foreground)]">
                    Connect with fellow sacred book learners
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
                  <h4 className="text-base font-bold text-[var(--foreground)] mb-2">
                    Sacred Book Discussions
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
                      className="px-4 py-2 text-xs font-medium rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
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

    // Find a good break point (end of paragraph preferred)
    let breakPoint = remaining.lastIndexOf('</p>', charsPerPage)
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.3) {
      // Try to break at a sentence
      breakPoint = remaining.lastIndexOf('. ', charsPerPage)
      if (breakPoint !== -1) breakPoint += 2 // Include the period and space
    }
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.3) {
      // Last resort: break at word boundary
      breakPoint = remaining.lastIndexOf(' ', charsPerPage)
    }
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.3) {
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

export default DigitalTextbook
