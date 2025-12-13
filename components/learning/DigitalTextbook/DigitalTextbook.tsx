'use client'

// ============================================
// THE SACRED DIGITAL TEXTBOOK
// "In the beginning was the Word..."
// Ancient manuscript meets digital revelation
// ============================================

import { useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { X, Volume2, VolumeX, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

// Book components
import BookContainer, { BookWrapper, PageContainer, BookSpine, PageEdges } from './BookContainer'
import { BookCover, InsideCover } from './BookCover'
import { RibbonBookmarks } from './RibbonBookmarks'
import { BookPage, PageContent, VerseHeader, ChapterDivider } from './BookPage'
import { PageFlip, RapidPageFlip, usePageTurnSound } from './PageFlip'
import { BookOpenAnimation } from './BookOpenAnimation'
import { useBookState } from './useBookState'
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
  type: 'cover' | 'inside-cover' | 'toc' | 'chapter-divider' | 'verse' | 'content'
  chapterIndex?: number
  verseIndex?: number
  pageIndex?: number
  content?: ReactNode
  title?: string
  subtitle?: string
  module?: Module
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
  const [showSettings, setShowSettings] = useState(false)

  const bookState = useBookState()
  const playPageTurn = usePageTurnSound(bookState.preferences.soundEnabled)

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

    // Cover page
    pages.push({ type: 'cover' })

    // Inside cover with level selection
    pages.push({ type: 'inside-cover' })

    // Table of Contents
    pages.push({ type: 'toc' })

    // Build chapters from modules (max 7 for the 7 Guardian ribbons)
    const chaptersToShow = modules.slice(0, 7)

    chaptersToShow.forEach((module, chapterIndex) => {
      // Chapter divider page
      pages.push({
        type: 'chapter-divider',
        chapterIndex,
        module,
        title: module.title,
      })

      // Verses (lessons) within chapter
      module.lessons.forEach((lesson, verseIndex) => {
        // Verse header page
        pages.push({
          type: 'verse',
          chapterIndex,
          verseIndex,
          title: lesson.title,
          module,
        })

        // Content pages for this verse
        // Split long content into multiple pages (smaller chunks for better readability)
        const content = lesson.content[selectedLevel] || lesson.content.HIGH_SCHOOL
        const contentChunks = splitContentIntoPages(content, 450)

        contentChunks.forEach((chunk, pageIndex) => {
          pages.push({
            type: 'content',
            chapterIndex,
            verseIndex,
            pageIndex,
            content: chunk,
            module,
          })
        })
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
      // Start at inside cover for level selection
      setCurrentPageIndex(1)
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
            <div className="text-center">
              <span className="text-6xl">{CORE_TOPIC_ICONS[topic.id] || '📖'}</span>
              <h1 className="text-2xl font-serif font-bold mt-4" style={{ color: currentRibbon?.colors.from }}>
                {topic.title}
              </h1>
            </div>
          </div>
        )

      case 'inside-cover':
        return (
          <InsideCover
            topicSlug={topic.id}
            topicTitle={topic.title}
            chapterCount={Math.min(modules.length, 7)}
            verseCount={modules.reduce((acc, m) => acc + m.lessons.length, 0)}
            pageCount={totalPages}
            selectedLevel={selectedLevel}
            onLevelSelect={(level) => setSelectedLevel(level as LearningLevel)}
            onStartReading={() => goToPage(3)} // Go to first chapter
          />
        )

      case 'toc':
        return (
          <div className="w-full h-full flex flex-col p-6">
            <AncientBorder />
            {/* TOC Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-[var(--foreground)] mb-2">
                Table of Contents
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] italic font-serif">
                The Seven Paths of Knowledge
              </p>
            </div>
            <HieroglyphicDivider color={currentRibbon?.colors.from} />
            {/* Chapter List - fills available space */}
            <div className="flex-1 flex flex-col justify-center space-y-4 py-4">
              {modules.slice(0, 7).map((module, i) => {
                const ribbon = RIBBON_ORDER[i] ? GUARDIAN_RIBBONS[RIBBON_ORDER[i]] : null
                return (
                  <button
                    key={module.id}
                    onClick={() => goToChapter(i)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--muted)] transition-colors text-left group border border-transparent hover:border-[var(--border)]"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-base font-bold shadow-md"
                      style={{ background: ribbon?.colors.gradient }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] block mb-0.5">
                        Chapter {i + 1}
                      </span>
                      <span className="font-serif text-lg text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {module.title}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
                  </button>
                )
              })}
            </div>
            {/* Footer */}
            <div className="text-center pt-4 border-t border-[var(--border)]/20">
              <p className="text-xs text-[var(--muted-foreground)]">
                Click a chapter to begin reading
              </p>
            </div>
          </div>
        )

      case 'chapter-divider':
        return (
          <ChapterDivider
            chapterIndex={page.chapterIndex ?? 0}
            chapterTitle={page.title || ''}
            versesCount={page.module?.lessons.length ?? 0}
            guardianQuote={getGuardianQuote(page.chapterIndex ?? 0)}
          />
        )

      case 'verse':
        const verseRibbon = RIBBON_ORDER[page.chapterIndex ?? 0] ? GUARDIAN_RIBBONS[RIBBON_ORDER[page.chapterIndex ?? 0]] : null
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            <AncientBorder />
            {/* Verse presentation - fills the page */}
            <div className="text-center max-w-md">
              {/* Chapter indicator */}
              <div
                className="inline-block px-4 py-1 rounded-full text-xs uppercase tracking-wider mb-6"
                style={{
                  background: verseRibbon ? `${verseRibbon.colors.from}20` : 'var(--muted)',
                  color: verseRibbon?.colors.from || 'var(--muted-foreground)',
                }}
              >
                Chapter {(page.chapterIndex ?? 0) + 1}
              </div>

              {/* Decorative element */}
              <div
                className="w-16 h-0.5 mx-auto mb-8"
                style={{
                  background: verseRibbon
                    ? `linear-gradient(to right, transparent, ${verseRibbon.colors.from}, transparent)`
                    : 'var(--border)',
                }}
              />

              {/* Verse number */}
              <div className="text-sm text-[var(--muted-foreground)] tracking-[0.3em] uppercase mb-4">
                Verse {(page.verseIndex ?? 0) + 1}
              </div>

              {/* Verse title */}
              <h2
                className="text-3xl sm:text-4xl font-serif font-bold mb-6"
                style={{ color: verseRibbon?.colors.from || 'var(--foreground)' }}
              >
                {page.title}
              </h2>

              {/* Description if available */}
              {page.module && (
                <p className="text-base text-[var(--muted-foreground)] font-serif italic leading-relaxed mb-8">
                  {typeof page.module.description === 'string'
                    ? page.module.description
                    : page.module.description[selectedLevel] || page.module.description.HIGH_SCHOOL}
                </p>
              )}

              {/* Decorative element */}
              <div
                className="w-16 h-0.5 mx-auto"
                style={{
                  background: verseRibbon
                    ? `linear-gradient(to right, transparent, ${verseRibbon.colors.from}, transparent)`
                    : 'var(--border)',
                }}
              />

              {/* Continue prompt */}
              <p className="mt-8 text-sm text-[var(--muted-foreground)]">
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
            <div className="h-full flex flex-col justify-between">
              {/* Content area - fills the page */}
              <div
                className={cn(
                  "flex-1",
                  "prose prose-lg dark:prose-invert max-w-none",
                  "font-serif",
                  // Typography for book-like appearance
                  "prose-p:text-[1.1rem] prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-justify prose-p:hyphens-auto",
                  "prose-headings:font-bold prose-headings:mb-4",
                  "prose-h2:text-2xl prose-h3:text-xl",
                  "prose-strong:font-bold",
                  "prose-ul:space-y-2 prose-ol:space-y-2",
                  "prose-li:text-base prose-li:leading-relaxed",
                  // First paragraph drop cap effect
                  "[&>div>p:first-of-type]:first-letter:float-left [&>div>p:first-of-type]:first-letter:text-5xl [&>div>p:first-of-type]:first-letter:font-bold [&>div>p:first-of-type]:first-letter:mr-2 [&>div>p:first-of-type]:first-letter:mt-1",
                  "[&>div>p:first-of-type]:first-letter:text-[var(--primary)]",
                )}
              >
                {typeof page.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: page.content }} />
                ) : (
                  page.content
                )}
              </div>
              {/* Page number at bottom */}
              <div className="pt-4 border-t border-[var(--border)]/20">
                <AncientPageNumber number={currentPageIndex + 1} total={totalPages} />
              </div>
            </div>
          </BookPage>
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

          {/* Navigation Footer - Higher contrast */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-6 z-30 bg-[var(--card)]/95 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-[var(--border)] shadow-lg">
            <button
              onClick={prevPage}
              disabled={currentPageIndex === 0}
              className="p-2 sm:p-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-80 disabled:opacity-30 disabled:bg-[var(--muted)] transition-all"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <span className="text-[var(--foreground)] text-sm sm:text-base font-bold min-w-[80px] text-center">
              {currentPageIndex + 1} / {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPageIndex >= totalPages - 1}
              className="p-2 sm:p-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-80 disabled:opacity-30 disabled:bg-[var(--muted)] transition-all"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
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

            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full bg-[var(--card)]/90 text-[var(--foreground)] hover:bg-[var(--muted)] border border-[var(--border)] transition-all"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
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
