'use client'

// ============================================
// INTENTIONAL LEARNING CONTENT ELEMENTS
// Illuminated manuscript-inspired components
// for meaningful content presentation
// ============================================

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Sparkles, Lightbulb, BookOpen, Quote, HelpCircle, CheckCircle2 } from 'lucide-react'

// ============================================
// DROP CAP - Illuminated first letter
// ============================================

interface DropCapProps {
  letter: string
  color?: string
  className?: string
}

export function DropCap({ letter, color = 'var(--primary)', className }: DropCapProps) {
  return (
    <span
      className={cn(
        'float-left font-serif font-bold leading-none mr-2',
        'text-5xl sm:text-6xl',
        className
      )}
      style={{
        color,
        textShadow: `0 2px 4px ${color}20`,
      }}
    >
      {letter}
    </span>
  )
}

// ============================================
// ORNAMENTAL DIVIDER - Section separator
// ============================================

interface OrnamentalDividerProps {
  color?: string
  symbol?: '✦' | '❧' | '✿' | '◆' | '❈' | '※'
  className?: string
}

export function OrnamentalDivider({
  color = 'var(--primary)',
  symbol = '✦',
  className
}: OrnamentalDividerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-3 my-4', className)}>
      <div
        className="flex-1 h-px max-w-16"
        style={{ background: `linear-gradient(to right, transparent, ${color}40)` }}
      />
      <span
        className="text-sm opacity-60"
        style={{ color }}
      >
        {symbol}
      </span>
      <div
        className="flex-1 h-px max-w-16"
        style={{ background: `linear-gradient(to left, transparent, ${color}40)` }}
      />
    </div>
  )
}

// ============================================
// KEY CONCEPT CARD - Highlighted insight box
// ============================================

interface KeyConceptCardProps {
  title?: string
  children: ReactNode
  color?: string
  icon?: ReactNode
  className?: string
}

export function KeyConceptCard({
  title = 'Key Concept',
  children,
  color = 'var(--primary)',
  icon,
  className
}: KeyConceptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative my-4 p-3 rounded-lg',
        'border-l-4',
        'bg-[var(--muted)]/30',
        className
      )}
      style={{ borderLeftColor: color }}
    >
      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-8 h-8 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, transparent 50%)`,
          borderTopRightRadius: '0.5rem',
        }}
      />

      <div className="flex items-start gap-2">
        <span className="text-lg shrink-0" style={{ color }}>
          {icon || <Lightbulb className="w-4 h-4" />}
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color }}>
            {title}
          </p>
          <div className="text-xs text-[var(--book-text,var(--foreground))] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// INSIGHT CALLOUT - Eye-catching important point
// ============================================

interface InsightCalloutProps {
  children: ReactNode
  type?: 'insight' | 'warning' | 'tip' | 'note'
  className?: string
}

const calloutConfig = {
  insight: { icon: '💡', color: '#f59e0b', label: 'Insight' },
  warning: { icon: '⚠️', color: '#ef4444', label: 'Important' },
  tip: { icon: '✨', color: '#10b981', label: 'Pro Tip' },
  note: { icon: '📝', color: '#6366f1', label: 'Note' },
}

export function InsightCallout({
  children,
  type = 'insight',
  className
}: InsightCalloutProps) {
  const config = calloutConfig[type]

  return (
    <div
      className={cn(
        'my-3 p-2.5 rounded-md',
        'flex items-start gap-2',
        'bg-gradient-to-r from-[var(--muted)]/40 to-transparent',
        className
      )}
    >
      <span className="text-base shrink-0">{config.icon}</span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[8px] font-bold uppercase tracking-wider mb-0.5"
          style={{ color: config.color }}
        >
          {config.label}
        </p>
        <div className="text-xs text-[var(--book-text,var(--foreground))] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

// ============================================
// PULL QUOTE - Emphasized quotation
// ============================================

interface PullQuoteProps {
  quote: string
  author?: string
  source?: string
  color?: string
  className?: string
}

export function PullQuote({
  quote,
  author,
  source,
  color = 'var(--primary)',
  className
}: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        'relative my-4 py-3 px-4',
        'border-l-2 border-r-2',
        'bg-gradient-to-r from-[var(--muted)]/20 via-transparent to-[var(--muted)]/20',
        className
      )}
      style={{ borderColor: `${color}60` }}
    >
      {/* Decorative quote mark */}
      <span
        className="absolute -top-2 -left-1 text-3xl font-serif opacity-20"
        style={{ color }}
      >
        "
      </span>

      <p className="text-sm font-serif italic text-[var(--book-text,var(--foreground))] leading-relaxed text-center">
        {quote}
      </p>

      {(author || source) && (
        <footer className="mt-2 text-center">
          <cite className="text-[9px] text-[var(--muted-foreground)] not-italic">
            — {author}{source && `, ${source}`}
          </cite>
        </footer>
      )}

      {/* Decorative quote mark */}
      <span
        className="absolute -bottom-4 -right-1 text-3xl font-serif opacity-20 rotate-180"
        style={{ color }}
      >
        "
      </span>
    </blockquote>
  )
}

// ============================================
// TERM HIGHLIGHT - Interactive definition
// ============================================

interface TermHighlightProps {
  term: string
  definition: string
  color?: string
  className?: string
}

export function TermHighlight({
  term,
  definition,
  color = 'var(--primary)',
  className
}: TermHighlightProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <span className={cn('relative inline', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'font-semibold underline decoration-dotted underline-offset-2',
          'cursor-pointer hover:opacity-80 transition-opacity'
        )}
        style={{
          color,
          textDecorationColor: `${color}60`,
        }}
      >
        {term}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            className={cn(
              'absolute left-0 top-full mt-1 z-20',
              'w-48 p-2 rounded-md shadow-lg',
              'bg-[var(--card)] border border-[var(--border)]',
              'text-xs text-[var(--book-text,var(--foreground))]'
            )}
          >
            <span className="font-bold" style={{ color }}>{term}:</span>{' '}
            {definition}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

// ============================================
// REFLECTION PROMPT - Journal/discussion moment
// ============================================

interface ReflectionPromptProps {
  question: string
  placeholder?: string
  onSave?: (value: string) => void
  savedValue?: string
  className?: string
}

export function ReflectionPrompt({
  question,
  placeholder = 'Write your thoughts...',
  onSave,
  savedValue = '',
  className
}: ReflectionPromptProps) {
  const [value, setValue] = useState(savedValue)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    onSave?.(value)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div
      className={cn(
        'my-4 p-3 rounded-lg',
        'bg-gradient-to-br from-[var(--muted)]/30 to-[var(--muted)]/10',
        'border border-dashed border-[var(--border)]/50',
        className
      )}
    >
      <div className="flex items-start gap-2 mb-2">
        <HelpCircle className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-[var(--book-text,var(--foreground))]">
          {question}
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full p-2 rounded text-xs font-serif',
          'bg-[var(--book-paper,var(--card))]',
          'border border-[var(--border)]/30',
          'text-[var(--book-text,var(--foreground))]',
          'placeholder:text-[var(--muted-foreground)]/50',
          'focus:outline-none focus:border-[var(--primary)]/50',
          'resize-none'
        )}
        rows={2}
      />

      <div className="flex justify-end mt-2">
        <button
          onClick={handleSave}
          className={cn(
            'px-3 py-1 rounded text-[10px] font-medium',
            'bg-[var(--primary)]/10 text-[var(--primary)]',
            'hover:bg-[var(--primary)]/20 transition-colors',
            'flex items-center gap-1'
          )}
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-3 h-3" />
              Saved!
            </>
          ) : (
            'Save thought'
          )}
        </button>
      </div>
    </div>
  )
}

// ============================================
// COGNITIVE LOAD INDICATOR
// ============================================

interface CognitiveLoadProps {
  level: 1 | 2 | 3
  className?: string
}

export function CognitiveLoadIndicator({ level, className }: CognitiveLoadProps) {
  const labels = ['Quick read', 'Moderate', 'Deep dive']

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              i <= level ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'
            )}
          />
        ))}
      </div>
      <span className="text-[8px] text-[var(--muted-foreground)]">
        {labels[level - 1]}
      </span>
    </div>
  )
}

// ============================================
// PAGE TURN ANTICIPATION
// ============================================

interface PageTurnHintProps {
  nextTopic: string
  className?: string
}

export function PageTurnHint({ nextTopic, className }: PageTurnHintProps) {
  return (
    <div
      className={cn(
        'absolute bottom-2 right-2',
        'flex items-center gap-1',
        'text-[8px] text-[var(--muted-foreground)]',
        'opacity-60 hover:opacity-100 transition-opacity',
        className
      )}
    >
      <span>Next:</span>
      <span className="font-medium text-[var(--primary)]">{nextTopic}</span>
      <span>→</span>
    </div>
  )
}

// ============================================
// PROGRESS CELEBRATION
// ============================================

interface ProgressCelebrationProps {
  show: boolean
  message?: string
  className?: string
}

export function ProgressCelebration({
  show,
  message = 'Great progress!',
  className
}: ProgressCelebrationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className={cn(
            'fixed bottom-20 left-1/2 -translate-x-1/2 z-50',
            'px-4 py-2 rounded-full',
            'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]',
            'text-white text-sm font-medium',
            'shadow-lg',
            'flex items-center gap-2',
            className
          )}
        >
          <Sparkles className="w-4 h-4" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================
// SECTION HEADER - For content sections
// ============================================

interface SectionHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  color?: string
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  icon,
  color = 'var(--primary)',
  className
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-3', className)}>
      <div className="flex items-center gap-2 mb-1">
        {icon && (
          <span style={{ color }} className="text-base">
            {icon}
          </span>
        )}
        <h3
          className="text-base font-serif font-bold"
          style={{ color }}
        >
          {title}
        </h3>
      </div>
      {subtitle && (
        <p className="text-[10px] text-[var(--muted-foreground)] italic">
          {subtitle}
        </p>
      )}
      <div
        className="mt-2 h-0.5 w-12"
        style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
      />
    </div>
  )
}
