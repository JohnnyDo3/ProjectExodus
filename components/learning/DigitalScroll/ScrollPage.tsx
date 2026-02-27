'use client'

// ============================================
// BOOK PAGE
// The sacred container for knowledge
import { sanitizeHtml } from '@/lib/utils/sanitize'
// Each page: paper texture, content area, watermark
// ============================================

import { motion } from 'framer-motion'
import { forwardRef, ReactNode, useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import {
  WATERMARK_CONFIG,
  GUARDIAN_RIBBONS,
  RIBBON_ORDER,
  A11Y_CONFIG,
  getDeviceType,
} from './scrollConstants'

// ============================================
// TYPES
// ============================================

interface ScrollPageProps {
  children: ReactNode
  pageNumber: number
  totalPages: number
  chapterIndex: number
  side: 'left' | 'right'
  showWatermark?: boolean
  allowScroll?: boolean // For quizzes/games only, learning content should fit the page
  className?: string
}

interface PageContentProps {
  title?: string
  subtitle?: string
  content?: string | ReactNode
  references?: Reference[]
  citations?: Citation[]
  quotes?: Quote[]
  illustrations?: Illustration[]
  className?: string
}

interface Reference {
  id: string
  number: number
  text: string
  url?: string
}

interface Citation {
  id: string
  author: string
  year: number
  title: string
  source: string
  url?: string
}

interface Quote {
  id: string
  text: string
  author: string
  source?: string
}

interface Illustration {
  id: string
  type: 'diagram' | 'chart' | 'image' | 'carved' | 'etched'
  component?: ReactNode
  src?: string
  alt: string
  caption?: string
}

// ============================================
// BOOK PAGE COMPONENT
// ============================================

export const ScrollPage = forwardRef<HTMLDivElement, ScrollPageProps>(
  function ScrollPage(
    { children, pageNumber, totalPages, chapterIndex, side, showWatermark = true, allowScroll = false, className },
    ref
  ) {
    const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Reset scroll position to top when page changes
    useEffect(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
    }, [pageNumber])

    useEffect(() => {
      function updateDevice() {
        setDeviceType(getDeviceType())
      }
      updateDevice()
      window.addEventListener('resize', updateDevice)
      return () => window.removeEventListener('resize', updateDevice)
    }, [])

    const isDesktop = deviceType === 'desktop'
    const ribbon = RIBBON_ORDER[chapterIndex] ? GUARDIAN_RIBBONS[RIBBON_ORDER[chapterIndex]] : null
    const WatermarkIcon = ribbon?.icon

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full h-full',
          'flex flex-col',
          'bg-[var(--book-paper,var(--card))]',
          'text-[var(--book-text,var(--foreground))]',
          className
        )}
        style={{
          // Paper texture using subtle gradient
          backgroundImage: `
            radial-gradient(circle at 100% 0%, rgba(0,0,0,0.02) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(0,0,0,0.01) 0%, transparent 50%)
          `,
        }}
        role="article"
        aria-label={A11Y_CONFIG.ariaLabels.pageNumber(pageNumber, totalPages)}
      >
        {/* Page header with chapter indicator */}
        <div
          className={cn(
            'shrink-0 py-2 border-b border-[var(--border)]/30',
            'flex items-center justify-between',
            'text-xs text-[var(--muted-foreground)]'
          )}
        >
          {side === 'left' ? (
            <>
              <span className="font-medium">Page {pageNumber}</span>
              <span className="italic opacity-60">verso</span>
            </>
          ) : (
            <>
              <span className="italic opacity-60">recto</span>
              <span className="font-medium">Page {pageNumber}</span>
            </>
          )}
        </div>

        {/* Main content area - scroll only when allowScroll is true (quizzes/games) */}
        <div
          ref={scrollContainerRef}
          className={cn(
            'flex-1 min-h-0 py-2 overflow-x-hidden',
            allowScroll ? 'overflow-y-auto' : 'overflow-y-hidden',
            // Add right padding on left pages to prevent text hitting scrollbar
            side === 'left' && allowScroll && 'pr-3'
          )}
        >
          {children}
        </div>

        {/* Page footer */}
        <div
          className={cn(
            'shrink-0 py-1.5 border-t border-[var(--border)]/20',
            'flex items-center justify-center',
            'text-[10px] text-[var(--muted-foreground)]/50'
          )}
        >
          {ribbon && (
            <span className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: ribbon.colors.gradient }}
              />
              <span>Chapter {chapterIndex + 1}</span>
            </span>
          )}
        </div>

        {/* Guardian Watermark Easter Egg */}
        {showWatermark && WatermarkIcon && (
          <div
            className="absolute bottom-12 right-8 pointer-events-none"
            style={{
              width: WATERMARK_CONFIG.size,
              height: WATERMARK_CONFIG.size,
              opacity: WATERMARK_CONFIG.opacity,
              transform: `rotate(${WATERMARK_CONFIG.rotation}deg)`,
              filter: `blur(${WATERMARK_CONFIG.blur})`,
            }}
          >
            <WatermarkIcon
              className="w-full h-full"
              style={{ color: ribbon?.colors.from }}
              strokeWidth={0.5}
            />
          </div>
        )}

        {/* Page fold shadow effect */}
        {isDesktop && (
          <div
            className={cn(
              'absolute inset-y-0 w-8 pointer-events-none',
              side === 'left' ? 'right-0' : 'left-0'
            )}
            style={{
              background:
                side === 'left'
                  ? 'linear-gradient(to right, transparent, rgba(0,0,0,0.03))'
                  : 'linear-gradient(to left, transparent, rgba(0,0,0,0.05))',
            }}
          />
        )}
      </div>
    )
  }
)

// ============================================
// PAGE CONTENT RENDERER
// Handles structured content with references, citations, quotes
// ============================================

export function PageContent({
  title,
  subtitle,
  content,
  references,
  citations,
  quotes,
  illustrations,
  className,
}: PageContentProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Title */}
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--foreground)] leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-[var(--muted-foreground)] mt-1 italic">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Featured Quote (if any) */}
      {quotes && quotes.length > 0 && (
        <QuoteBlock quote={quotes[0]} featured />
      )}

      {/* Main Content */}
      {content && (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content as string) }} />
          ) : (
            content
          )}
        </div>
      )}

      {/* Illustrations */}
      {illustrations && illustrations.length > 0 && (
        <div className="space-y-4">
          {illustrations.map((illustration) => (
            <IllustrationBlock key={illustration.id} illustration={illustration} />
          ))}
        </div>
      )}

      {/* Additional Quotes */}
      {quotes && quotes.length > 1 && (
        <div className="space-y-3 mt-6">
          {quotes.slice(1).map((quote) => (
            <QuoteBlock key={quote.id} quote={quote} />
          ))}
        </div>
      )}

      {/* In-text Citations Section */}
      {citations && citations.length > 0 && (
        <div className="mt-8 pt-4 border-t border-[var(--border)]/30">
          <h4 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
            Citations
          </h4>
          <div className="space-y-2">
            {citations.map((citation) => (
              <CitationBlock key={citation.id} citation={citation} />
            ))}
          </div>
        </div>
      )}

      {/* References Section */}
      {references && references.length > 0 && (
        <div className="mt-6 pt-4 border-t border-[var(--border)]/30">
          <h4 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
            References
          </h4>
          <div className="space-y-1">
            {references.map((ref) => (
              <ReferenceBlock key={ref.id} reference={ref} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================
// QUOTE BLOCK
// ============================================

interface QuoteBlockProps {
  quote: Quote
  featured?: boolean
}

function QuoteBlock({ quote, featured }: QuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        'relative pl-4 border-l-2 border-[var(--primary)]/40',
        featured && 'py-4 bg-[var(--muted)]/30 rounded-r-lg pr-4'
      )}
    >
      <p
        className={cn(
          'italic text-[var(--foreground)]',
          featured ? 'text-lg leading-relaxed' : 'text-sm'
        )}
      >
        "{quote.text}"
      </p>
      <footer className="mt-2 text-xs text-[var(--muted-foreground)]">
        — <span className="font-medium">{quote.author}</span>
        {quote.source && <span>, {quote.source}</span>}
      </footer>
    </blockquote>
  )
}

// ============================================
// CITATION BLOCK
// ============================================

interface CitationBlockProps {
  citation: Citation
}

function CitationBlock({ citation }: CitationBlockProps) {
  return (
    <div className="text-xs text-[var(--muted-foreground)] leading-relaxed">
      <span className="font-medium">{citation.author}</span>
      <span className="mx-1">({citation.year}).</span>
      <span className="italic">{citation.title}.</span>
      <span className="ml-1">{citation.source}.</span>
      {citation.url && (
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-[var(--primary)] hover:underline"
        >
          [Link]
        </a>
      )}
    </div>
  )
}

// ============================================
// REFERENCE BLOCK
// ============================================

interface ReferenceBlockProps {
  reference: Reference
}

function ReferenceBlock({ reference }: ReferenceBlockProps) {
  return (
    <div className="text-xs text-[var(--muted-foreground)] flex gap-2">
      <span className="font-mono text-[var(--primary)]">[{reference.number}]</span>
      <span>
        {reference.text}
        {reference.url && (
          <a
            href={reference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-[var(--primary)] hover:underline"
          >
            ↗
          </a>
        )}
      </span>
    </div>
  )
}

// ============================================
// ILLUSTRATION BLOCK
// Carved, Etched, Sculpted visual style
// ============================================

interface IllustrationBlockProps {
  illustration: Illustration
}

function IllustrationBlock({ illustration }: IllustrationBlockProps) {
  const isCarved = illustration.type === 'carved' || illustration.type === 'etched'

  return (
    <figure
      className={cn(
        'relative my-6',
        isCarved && 'p-4 bg-[var(--muted)]/20 rounded-lg border border-[var(--border)]/30'
      )}
    >
      {/* Illustration content */}
      {illustration.component ? (
        <div
          className={cn(
            'w-full flex justify-center',
            isCarved && 'filter sepia-[0.1] contrast-[1.05]'
          )}
        >
          {illustration.component}
        </div>
      ) : illustration.src ? (
        <img
          src={illustration.src}
          alt={illustration.alt}
          className={cn(
            'w-full h-auto rounded',
            isCarved && 'filter sepia-[0.15] contrast-[1.1]'
          )}
        />
      ) : null}

      {/* Caption */}
      {illustration.caption && (
        <figcaption className="mt-3 text-xs text-center text-[var(--muted-foreground)] italic">
          {illustration.caption}
        </figcaption>
      )}

      {/* Carved/Etched effect overlay */}
      {isCarved && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            background: `
              linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(0,0,0,0.02) 100%)
            `,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.05)',
          }}
        />
      )}
    </figure>
  )
}

// ============================================
// VERSE HEADER
// For starting a new verse (lesson) within a chapter
// Enhanced with sacred scroll animations
// ============================================

interface VerseHeaderProps {
  verseNumber: number
  verseName: string
  chapterIndex: number
  animated?: boolean
}

export function VerseHeader({ verseNumber, verseName, chapterIndex, animated = true }: VerseHeaderProps) {
  const ribbon = RIBBON_ORDER[chapterIndex] ? GUARDIAN_RIBBONS[RIBBON_ORDER[chapterIndex]] : null
  const color = ribbon?.colors.from || 'var(--primary)'

  if (!animated) {
    return (
      <div className="text-center py-8 space-y-3">
        <div
          className="w-24 h-0.5 mx-auto"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          }}
        />
        <div className="text-sm text-[var(--muted-foreground)] tracking-widest uppercase">
          Verse {verseNumber}
        </div>
        <h3 className="text-xl font-serif font-bold text-[var(--foreground)]">
          {verseName}
        </h3>
        <div
          className="w-24 h-0.5 mx-auto"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          }}
        />
      </div>
    )
  }

  return (
    <motion.div
      className="text-center py-8 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top decorative SVG flourish */}
      <motion.svg
        className="w-48 h-8 mx-auto"
        viewBox="0 0 192 32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Left line */}
        <motion.path
          d="M8 16 L56 16"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        {/* Left decorative curl */}
        <motion.path
          d="M56 16 Q64 8 72 16 Q64 24 56 16"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
        {/* Center ornament */}
        <motion.circle
          cx="96" cy="16" r="6"
          fill={`${color}20`}
          stroke={color}
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5, type: 'spring' }}
        />
        <motion.circle
          cx="96" cy="16" r="3"
          fill={color}
          opacity={0.6}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6, type: 'spring' }}
        />
        {/* Right decorative curl */}
        <motion.path
          d="M136 16 Q128 8 120 16 Q128 24 136 16"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
        {/* Right line */}
        <motion.path
          d="M136 16 L184 16"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.svg>

      {/* Verse number with decorative frame */}
      <motion.div
        className="inline-flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-lg opacity-40" style={{ color }}>❧</span>
        <span
          className="text-sm tracking-[0.3em] uppercase font-medium"
          style={{ color }}
        >
          Verse {verseNumber}
        </span>
        <span className="text-lg opacity-40 rotate-180" style={{ color }}>❧</span>
      </motion.div>

      {/* Verse name with reveal animation */}
      <motion.h3
        className="text-xl sm:text-2xl font-serif font-bold text-[var(--foreground)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {verseName}
      </motion.h3>

      {/* Bottom decorative element */}
      <motion.div
        className="flex items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="w-8 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${color})` }}
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: color, opacity: 0.5 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.65, type: 'spring' }}
        />
        <motion.div
          className="w-8 h-px"
          style={{ background: `linear-gradient(to left, transparent, ${color})` }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

// ============================================
// CHAPTER DIVIDER PAGE
// Enhanced with sacred manuscript styling
// ============================================

interface ChapterDividerProps {
  chapterIndex: number
  chapterTitle: string
  versesCount: number
  guardianQuote?: string
  animated?: boolean
}

export function ChapterDivider({
  chapterIndex,
  chapterTitle,
  versesCount,
  guardianQuote,
  animated = true,
}: ChapterDividerProps) {
  const ribbon = RIBBON_ORDER[chapterIndex] ? GUARDIAN_RIBBONS[RIBBON_ORDER[chapterIndex]] : null
  const Icon = ribbon?.icon
  const color = ribbon?.colors.from || 'var(--primary)'

  const MotionWrapper = animated ? motion.div : 'div'
  const wrapperProps = animated ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  } : {}

  return (
    <MotionWrapper
      className="w-full h-full flex flex-col items-center justify-evenly text-center relative px-4 py-6 overflow-hidden"
      {...wrapperProps}
    >
      {/* Corner decorations - smaller */}
      {animated && (
        <>
          <motion.svg
            className="absolute top-2 left-2 w-10 h-10"
            viewBox="0 0 64 64"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.path
              d="M4 40 L4 4 L40 4"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <circle cx="8" cy="8" r="3" fill={color} opacity={0.4} />
          </motion.svg>
          <motion.svg
            className="absolute top-2 right-2 w-10 h-10"
            viewBox="0 0 64 64"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.path
              d="M60 40 L60 4 L24 4"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <circle cx="56" cy="8" r="3" fill={color} opacity={0.4} />
          </motion.svg>
          <motion.svg
            className="absolute bottom-2 left-2 w-10 h-10"
            viewBox="0 0 64 64"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.path
              d="M4 24 L4 60 L40 60"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <circle cx="8" cy="56" r="3" fill={color} opacity={0.4} />
          </motion.svg>
          <motion.svg
            className="absolute bottom-2 right-2 w-10 h-10"
            viewBox="0 0 64 64"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.path
              d="M60 24 L60 60 L24 60"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <circle cx="56" cy="56" r="3" fill={color} opacity={0.4} />
          </motion.svg>
        </>
      )}

      {/* Top section: decorative border */}
      <div className="shrink-0">
        {animated ? (
          <motion.svg
            className="w-48 h-4"
            viewBox="0 0 256 24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.path
              d="M8 12 L80 12"
              stroke={color}
              strokeWidth="1"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.circle
              cx="128" cy="12" r="4"
              fill={color}
              opacity={0.5}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
            />
            <motion.path
              d="M176 12 L248 12"
              stroke={color}
              strokeWidth="1"
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.svg>
        ) : (
          <div className="w-48 h-4" />
        )}
      </div>

      {/* Guardian Icon - smaller */}
      {Icon && (
        <div className="shrink-0">
          {animated ? (
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                  transform: 'scale(1.5)',
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                style={{ background: ribbon?.colors.gradient }}
              >
                <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </motion.div>
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
              style={{ background: ribbon?.colors.gradient }}
            >
              <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          )}
        </div>
      )}

      {/* Chapter number and title */}
      <div className="shrink-0 space-y-1">
        {animated ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="text-base opacity-40" style={{ color }}>✦</span>
              <span className="text-xs tracking-[0.2em] uppercase font-medium text-[var(--muted-foreground)]">
                Chapter {chapterIndex + 1}
              </span>
              <span className="text-base opacity-40" style={{ color }}>✦</span>
            </span>
          </motion.div>
        ) : (
          <div className="text-xs text-[var(--muted-foreground)] tracking-[0.2em] uppercase">
            Chapter {chapterIndex + 1}
          </div>
        )}

        {animated ? (
          <motion.h2
            className="text-2xl font-serif font-bold"
            style={{ color }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {chapterTitle}
          </motion.h2>
        ) : (
          <h2 className="text-2xl font-serif font-bold" style={{ color }}>
            {chapterTitle}
          </h2>
        )}

        {ribbon && (
          animated ? (
            <motion.div
              className="text-sm text-[var(--muted-foreground)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              The Way of <span className="font-bold" style={{ color }}>{ribbon.value}</span>
            </motion.div>
          ) : (
            <div className="text-sm text-[var(--muted-foreground)]">
              The Way of <span className="font-bold" style={{ color }}>{ribbon.value}</span>
            </div>
          )
        )}
      </div>

      {/* Decorative divider */}
      <div className="shrink-0">
        {animated ? (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <motion.div
              className="w-10 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${color})` }}
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
            <motion.div
              className="w-2 h-2 rotate-45 border"
              style={{ borderColor: color, opacity: 0.5 }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 45 }}
              transition={{ delay: 0.85, type: 'spring' }}
            />
            <motion.div
              className="w-10 h-px"
              style={{ background: `linear-gradient(to left, transparent, ${color})` }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
          </motion.div>
        ) : (
          <div
            className="w-24 h-0.5"
            style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
          />
        )}
      </div>

      {/* Guardian quote - compact */}
      {guardianQuote && (
        <div className="shrink-0 max-w-xs">
          {animated ? (
            <motion.blockquote
              className="text-sm italic text-[var(--muted-foreground)] font-serif leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-lg opacity-30 mr-0.5" style={{ color }}>"</span>
              {guardianQuote}
              <span className="text-lg opacity-30 ml-0.5" style={{ color }}>"</span>
            </motion.blockquote>
          ) : (
            <blockquote className="text-sm italic text-[var(--muted-foreground)] font-serif">
              "{guardianQuote}"
            </blockquote>
          )}
        </div>
      )}

      {/* Verse count badge */}
      <div className="shrink-0">
        {animated ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: `${color}15`,
                color: color,
                border: `1px solid ${color}30`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              {versesCount} Verses to explore
            </span>
          </motion.div>
        ) : (
          <div className="text-xs text-[var(--muted-foreground)]">
            {versesCount} Verses to explore
          </div>
        )}
      </div>
    </MotionWrapper>
  )
}

export default ScrollPage
