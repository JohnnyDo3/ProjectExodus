'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookOpen, Feather, Compass } from 'lucide-react'
import { BookIllustration } from './BookIllustration'
import {
  SketchSun, SketchCloud, SketchTree, SketchMountains, SketchGround,
  SketchWater, SketchLeaf, SketchFlower, SketchAnnotation, PageDivider,
  CrossHatch, Stipple, SketchCompass
} from './NaturalistIllustrations'

// A soulful learning landscape that feels like pages from a naturalist's journal
// Each page is a work of art - hand-drawn, aged, and full of wonder

const handwritten = "font-['Caveat',_cursive]"

// ===========================================
// PAGE BACKGROUNDS - Each unique and beautiful
// ===========================================

interface PageBackgroundProps {
  variant: 'meadow' | 'forest' | 'ocean' | 'mountain' | 'garden' | 'sky'
  children: ReactNode
}

function PageBackground({ variant, children }: PageBackgroundProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Aged parchment base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f4e9] via-[#f5f0e1] to-[#efe8d8]" />

      {/* Paper texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Vintage stains and aging */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-amber-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-amber-300/10 rounded-full blur-2xl" />
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-amber-400/5 rounded-full blur-xl" />
      </div>

      {/* Decorative landscape SVG based on variant */}
      <svg
        className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20"
        viewBox="0 0 800 200"
        preserveAspectRatio="xMidYMax slice"
      >
        {variant === 'meadow' && (
          <g>
            <SketchGround x={0} y={180} width={800} depth={20} />
            {[50, 150, 300, 500, 650, 750].map((x, i) => (
              <SketchTree key={i} x={x} y={180} height={40 + Math.random() * 30} />
            ))}
            {[100, 200, 400, 600].map((x, i) => (
              <SketchFlower key={`f-${i}`} x={x} y={175} size={10} petals={5} />
            ))}
          </g>
        )}
        {variant === 'forest' && (
          <g>
            <SketchMountains x={0} y={200} width={800} maxHeight={100} />
            {[30, 100, 200, 350, 500, 650, 780].map((x, i) => (
              <SketchTree key={i} x={x} y={180} height={50 + Math.random() * 40} style="conifer" />
            ))}
          </g>
        )}
        {variant === 'ocean' && (
          <g>
            <SketchWater x={0} y={120} width={800} height={80} />
            {[100, 250, 500, 700].map((x, i) => (
              <SketchCloud key={i} x={x} y={30 + i * 10} width={40 + Math.random() * 30} />
            ))}
          </g>
        )}
        {variant === 'mountain' && (
          <g>
            <SketchMountains x={0} y={200} width={800} maxHeight={150} />
            <SketchCloud x={200} y={40} width={60} />
            <SketchCloud x={600} y={50} width={50} />
          </g>
        )}
        {variant === 'garden' && (
          <g>
            <SketchGround x={0} y={180} width={800} depth={20} />
            {[80, 200, 400, 600, 720].map((x, i) => (
              <g key={i}>
                <SketchFlower x={x} y={175} size={15} petals={6} />
                <SketchLeaf x={x + 15} y={178} size={20} rotation={-30} />
              </g>
            ))}
          </g>
        )}
        {variant === 'sky' && (
          <g>
            <SketchSun x={700} y={50} size={50} />
            {[100, 300, 500].map((x, i) => (
              <SketchCloud key={i} x={x} y={80 + i * 20} width={60} />
            ))}
          </g>
        )}
      </svg>

      {/* Page content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(139, 69, 19, 0.08) 100%)'
        }}
      />
    </div>
  )
}

// ===========================================
// JOURNAL PAGE COMPONENT
// ===========================================

interface JournalPageProps {
  title?: string
  subtitle?: string
  content: ReactNode
  illustration?: ReactNode
  marginNotes?: string[]
  pageNumber?: number
  background?: 'meadow' | 'forest' | 'ocean' | 'mountain' | 'garden' | 'sky'
  layout?: 'centered' | 'split' | 'illustration-focus'
}

export function JournalPage({
  title,
  subtitle,
  content,
  illustration,
  marginNotes = [],
  pageNumber,
  background = 'meadow',
  layout = 'centered'
}: JournalPageProps) {
  return (
    <PageBackground variant={background}>
      <div className="h-full flex flex-col p-6 sm:p-8">
        {/* Page header with decorative elements */}
        {title && (
          <header className="text-center mb-6 relative">
            {/* Decorative header line */}
            <svg className="w-full h-6 mb-3" viewBox="0 0 400 20">
              <PageDivider x={50} y={10} width={300} variant="flourish" />
            </svg>

            <h1 className={`${handwritten} text-4xl sm:text-5xl text-amber-900`}>
              {title}
            </h1>

            {subtitle && (
              <p className={`${handwritten} text-xl text-amber-700/70 mt-2 italic`}>
                {subtitle}
              </p>
            )}

            {/* Decorative underline */}
            <svg className="w-40 h-3 mx-auto mt-3" viewBox="0 0 160 12">
              <path
                d="M0,6 Q40,2 80,6 Q120,10 160,6"
                fill="none"
                stroke="#92400e"
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>
          </header>
        )}

        {/* Main content area */}
        <div className={`flex-1 ${
          layout === 'split' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' :
          layout === 'illustration-focus' ? 'flex flex-col items-center' :
          'flex flex-col items-center justify-center'
        }`}>
          {/* Text content */}
          <div className={`${
            layout === 'illustration-focus' ? 'w-full max-w-2xl mb-6' : 'max-w-2xl'
          }`}>
            {content}
          </div>

          {/* Illustration */}
          {illustration && (
            <div className={`${
              layout === 'illustration-focus' ? 'w-full max-w-3xl' : ''
            }`}>
              {illustration}
            </div>
          )}
        </div>

        {/* Margin notes - rendered on the side */}
        {marginNotes.length > 0 && (
          <div className="hidden lg:block absolute right-4 top-1/4 w-32 space-y-4">
            {marginNotes.map((note, i) => (
              <div
                key={i}
                className="transform rotate-2 bg-amber-50/80 border border-amber-200/50 rounded p-2"
              >
                <p className={`${handwritten} text-sm text-amber-700 italic`}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Page footer */}
        <footer className="mt-auto pt-4">
          <div className="flex items-center justify-between text-amber-700/40">
            {/* Botanical ornament */}
            <svg width="60" height="20" viewBox="0 0 60 20" className="opacity-50">
              <SketchLeaf x={10} y={18} size={15} rotation={-20} />
              <SketchLeaf x={30} y={18} size={12} rotation={0} />
              <SketchLeaf x={50} y={18} size={15} rotation={20} />
            </svg>

            {/* Page number */}
            {pageNumber && (
              <span className={`${handwritten} text-lg`}>
                — {pageNumber} —
              </span>
            )}

            {/* Compass ornament */}
            <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-30">
              <SketchCompass x={20} y={20} size={30} />
            </svg>
          </div>
        </footer>
      </div>
    </PageBackground>
  )
}

// ===========================================
// CONTENT BLOCKS - Styled text elements
// ===========================================

interface ContentBlockProps {
  children: ReactNode
  variant?: 'paragraph' | 'quote' | 'callout' | 'list' | 'definition'
}

export function ContentBlock({ children, variant = 'paragraph' }: ContentBlockProps) {
  if (variant === 'quote') {
    return (
      <blockquote className="relative pl-6 py-2 my-4">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-300/50 rounded" />
        <div className={`${handwritten} text-xl text-amber-800 italic leading-relaxed`}>
          {children}
        </div>
        <svg className="absolute -left-2 top-0 w-8 h-8 text-amber-300/50" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"
          />
        </svg>
      </blockquote>
    )
  }

  if (variant === 'callout') {
    return (
      <div className="relative bg-amber-50/50 border border-amber-200/50 rounded-lg p-4 my-4">
        <div className="absolute -top-3 left-4">
          <Feather className="w-6 h-6 text-amber-600/60" />
        </div>
        <div className={`${handwritten} text-lg text-amber-800 leading-relaxed`}>
          {children}
        </div>
      </div>
    )
  }

  if (variant === 'definition') {
    return (
      <div className="border-b border-dashed border-amber-300/50 pb-3 my-3">
        <div className={`${handwritten} text-lg text-amber-900`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`${handwritten} text-xl text-amber-800/90 leading-relaxed my-3`}>
      {children}
    </div>
  )
}

// Styled list component
export function JournalList({
  items,
  variant = 'bullet'
}: {
  items: string[]
  variant?: 'bullet' | 'numbered' | 'botanical'
}) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          {variant === 'numbered' && (
            <span className={`${handwritten} text-xl text-amber-600 w-6`}>
              {i + 1}.
            </span>
          )}
          {variant === 'bullet' && (
            <span className="mt-2 w-2 h-2 rounded-full bg-amber-400/60 flex-shrink-0" />
          )}
          {variant === 'botanical' && (
            <svg width="20" height="20" viewBox="0 0 20 20" className="flex-shrink-0 opacity-50 mt-1">
              <SketchLeaf x={10} y={18} size={15} rotation={-10} />
            </svg>
          )}
          <span className={`${handwritten} text-lg text-amber-800`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

// ===========================================
// ILLUSTRATION CONTAINERS
// ===========================================

interface IllustrationFrameProps {
  children: ReactNode
  caption?: string
  plate?: number
}

export function IllustrationFrame({ children, caption, plate }: IllustrationFrameProps) {
  return (
    <figure className="my-6">
      {/* Frame with vintage styling */}
      <div className="relative bg-[#faf8f3] border-2 border-amber-200/50 rounded p-4">
        {/* Corner decorations */}
        {['tl', 'tr', 'bl', 'br'].map((corner) => (
          <svg
            key={corner}
            className={`absolute w-8 h-8 text-amber-300/40 ${
              corner === 'tl' ? 'top-1 left-1' :
              corner === 'tr' ? 'top-1 right-1 -scale-x-100' :
              corner === 'bl' ? 'bottom-1 left-1 -scale-y-100' :
              'bottom-1 right-1 -scale-x-100 -scale-y-100'
            }`}
            viewBox="0 0 30 30"
          >
            <path
              d="M5,5 L5,20 M5,5 L20,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="5" cy="5" r="2" fill="currentColor" />
          </svg>
        ))}

        {/* Illustration content */}
        <div className="relative" style={{ filter: 'sepia(0.1)' }}>
          {children}
        </div>
      </div>

      {/* Caption */}
      {(caption || plate) && (
        <figcaption className="mt-2 text-center">
          {plate && (
            <span className={`${handwritten} text-sm text-amber-600/60 block`}>
              Plate {plate}
            </span>
          )}
          {caption && (
            <span className={`${handwritten} text-base text-amber-700/80 italic`}>
              {caption}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

// ===========================================
// PAGE NAVIGATION
// ===========================================

interface LandscapeNavigationProps {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
  canGoBack: boolean
  nextLabel?: string
}

export function LandscapeNavigation({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  canGoBack,
  nextLabel = 'Continue'
}: LandscapeNavigationProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-t from-amber-50/80 to-transparent">
      {/* Previous button */}
      <motion.button
        onClick={onPrevious}
        disabled={!canGoBack}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          canGoBack
            ? 'bg-amber-100/80 text-amber-800 hover:bg-amber-200/80 border border-amber-300/50'
            : 'bg-amber-50/50 text-amber-400 cursor-not-allowed border border-amber-200/30'
        }`}
        whileHover={canGoBack ? { x: -3 } : {}}
        whileTap={canGoBack ? { scale: 0.98 } : {}}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className={`${handwritten} text-lg`}>Back</span>
      </motion.button>

      {/* Page indicator - book style */}
      <div className="flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-amber-600/50" />
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentPage - 1
                  ? 'w-6 bg-amber-600'
                  : i < currentPage - 1
                  ? 'w-2 bg-amber-400'
                  : 'w-2 bg-amber-200'
              }`}
              animate={{
                scale: i === currentPage - 1 ? 1.2 : 1
              }}
            />
          ))}
        </div>
        <span className={`${handwritten} text-base text-amber-600/60`}>
          {currentPage} of {totalPages}
        </span>
      </div>

      {/* Next button */}
      <motion.button
        onClick={onNext}
        className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-700 text-amber-50 hover:bg-amber-800 transition-all border border-amber-600"
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className={`${handwritten} text-lg`}>{nextLabel}</span>
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  )
}

// ===========================================
// MAIN LANDSCAPE COMPONENT
// ===========================================

interface Page {
  id: string
  title?: string
  subtitle?: string
  content: ReactNode
  illustration?: ReactNode
  background?: 'meadow' | 'forest' | 'ocean' | 'mountain' | 'garden' | 'sky'
  layout?: 'centered' | 'split' | 'illustration-focus'
  marginNotes?: string[]
}

interface LearningLandscapeProps {
  pages: Page[]
  onComplete?: () => void
  initialPage?: number
}

export function LearningLandscape({
  pages,
  onComplete,
  initialPage = 0
}: LearningLandscapeProps) {
  const [currentIndex, setCurrentIndex] = useState(initialPage)
  const currentPage = pages[currentIndex]

  const goToNext = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete?.()
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const nextLabel = currentIndex === pages.length - 1 ? 'Complete' : 'Continue'

  return (
    <div className="h-full flex flex-col bg-amber-900/5">
      {/* Page content with animation */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="h-full"
          >
            <JournalPage
              title={currentPage.title}
              subtitle={currentPage.subtitle}
              content={currentPage.content}
              illustration={currentPage.illustration}
              background={currentPage.background}
              layout={currentPage.layout}
              marginNotes={currentPage.marginNotes}
              pageNumber={currentIndex + 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <LandscapeNavigation
        currentPage={currentIndex + 1}
        totalPages={pages.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
        canGoBack={currentIndex > 0}
        nextLabel={nextLabel}
      />
    </div>
  )
}

export default LearningLandscape
