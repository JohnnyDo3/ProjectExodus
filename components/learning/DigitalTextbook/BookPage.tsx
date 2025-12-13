'use client'

// ============================================
// BOOK PAGE
// The sacred container for knowledge
// Each page: paper texture, content area, watermark
// ============================================

import { motion, AnimatePresence } from 'framer-motion'
import { forwardRef, ReactNode, useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import {
  WATERMARK_CONFIG,
  GUARDIAN_RIBBONS,
  RIBBON_ORDER,
  A11Y_CONFIG,
  getDeviceType,
} from './bookConstants'

// ============================================
// TYPES
// ============================================

interface BookPageProps {
  children: ReactNode
  pageNumber: number
  totalPages: number
  chapterIndex: number
  side: 'left' | 'right'
  showWatermark?: boolean
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

export const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  function BookPage(
    { children, pageNumber, totalPages, chapterIndex, side, showWatermark = true, className },
    ref
  ) {
    const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

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

        {/* Main content area - full width, PageContainer handles edge padding */}
        <div className="flex-1 min-h-0 overflow-auto py-2">
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
            <div dangerouslySetInnerHTML={{ __html: content }} />
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
// ============================================

interface VerseHeaderProps {
  verseNumber: number
  verseName: string
  chapterIndex: number
}

export function VerseHeader({ verseNumber, verseName, chapterIndex }: VerseHeaderProps) {
  const ribbon = RIBBON_ORDER[chapterIndex] ? GUARDIAN_RIBBONS[RIBBON_ORDER[chapterIndex]] : null

  return (
    <div className="text-center py-8 space-y-3">
      {/* Decorative line */}
      <div
        className="w-24 h-0.5 mx-auto"
        style={{
          background: ribbon
            ? `linear-gradient(to right, transparent, ${ribbon.colors.from}, transparent)`
            : 'linear-gradient(to right, transparent, var(--primary), transparent)',
        }}
      />

      {/* Verse number */}
      <div className="text-sm text-[var(--muted-foreground)] tracking-widest uppercase">
        Verse {verseNumber}
      </div>

      {/* Verse name */}
      <h3 className="text-xl font-serif font-bold text-[var(--foreground)]">
        {verseName}
      </h3>

      {/* Decorative line */}
      <div
        className="w-24 h-0.5 mx-auto"
        style={{
          background: ribbon
            ? `linear-gradient(to right, transparent, ${ribbon.colors.from}, transparent)`
            : 'linear-gradient(to right, transparent, var(--primary), transparent)',
        }}
      />
    </div>
  )
}

// ============================================
// CHAPTER DIVIDER PAGE
// ============================================

interface ChapterDividerProps {
  chapterIndex: number
  chapterTitle: string
  versesCount: number
  guardianQuote?: string
}

export function ChapterDivider({
  chapterIndex,
  chapterTitle,
  versesCount,
  guardianQuote,
}: ChapterDividerProps) {
  const ribbon = RIBBON_ORDER[chapterIndex] ? GUARDIAN_RIBBONS[RIBBON_ORDER[chapterIndex]] : null
  const Icon = ribbon?.icon

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      {/* Guardian Icon */}
      {Icon && (
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: ribbon?.colors.gradient }}
        >
          <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )}

      {/* Chapter number */}
      <div className="text-sm text-[var(--muted-foreground)] tracking-[0.3em] uppercase mb-2">
        Chapter {chapterIndex + 1}
      </div>

      {/* Chapter title */}
      <h2
        className="text-3xl sm:text-4xl font-serif font-bold mb-4"
        style={{ color: ribbon?.colors.from || 'var(--foreground)' }}
      >
        {chapterTitle}
      </h2>

      {/* Guardian name */}
      {ribbon && (
        <div className="text-sm text-[var(--muted-foreground)] mb-6">
          The Way of <span className="font-bold">{ribbon.value}</span>
        </div>
      )}

      {/* Decorative line */}
      <div
        className="w-32 h-0.5 mb-6"
        style={{
          background: ribbon
            ? `linear-gradient(to right, transparent, ${ribbon.colors.from}, ${ribbon.colors.to}, transparent)`
            : 'var(--border)',
        }}
      />

      {/* Guardian quote */}
      {guardianQuote && (
        <blockquote className="text-sm italic text-[var(--muted-foreground)] max-w-sm">
          "{guardianQuote}"
        </blockquote>
      )}

      {/* Verse count */}
      <div className="mt-8 text-xs text-[var(--muted-foreground)]">
        {versesCount} Verses to explore
      </div>
    </div>
  )
}

export default BookPage
