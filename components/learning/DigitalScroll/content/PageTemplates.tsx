'use client'

// ============================================
// PAGE TEMPLATES
// Specialized layouts for intentional learning
// Each template serves a different purpose
// ============================================

import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { ContentSegment } from './ContentParser'
import {
  OrnamentalDivider,
  KeyConceptCard,
  PullQuote,
  InsightCallout,
  ReflectionPrompt,
  CognitiveLoadIndicator,
  PageTurnHint,
  SectionHeader,
} from './ContentElements'

// ============================================
// CONCEPT INTRO TEMPLATE
// For introducing new ideas/sections
// Large centered concept, brief explanation
// ============================================

interface ConceptIntroTemplateProps {
  title: string
  subtitle?: string
  introText?: string
  color?: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
}

export function ConceptIntroTemplate({
  title,
  subtitle,
  introText,
  color = 'var(--primary)',
  icon,
  children,
  className
}: ConceptIntroTemplateProps) {
  return (
    <div className={cn('w-full h-full flex flex-col items-center justify-center text-center px-4', className)}>
      {/* Icon */}
      {icon && (
        <div
          className="mb-3 text-3xl"
          style={{ color }}
        >
          {icon}
        </div>
      )}

      {/* Main Title */}
      <h2
        className="text-xl sm:text-2xl font-serif font-bold mb-2"
        style={{ color }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-[var(--muted-foreground)] italic mb-4">
          {subtitle}
        </p>
      )}

      <OrnamentalDivider color={color} symbol="✦" />

      {/* Intro text */}
      {introText && (
        <p className="text-sm text-[var(--book-text,var(--foreground))] leading-relaxed max-w-xs mt-3">
          {introText}
        </p>
      )}

      {/* Additional content */}
      {children && (
        <div className="mt-4 w-full">
          {children}
        </div>
      )}

      {/* Teaser */}
      <p className="absolute bottom-4 text-[9px] text-[var(--muted-foreground)]">
        ✦ Turn the page to begin ✦
      </p>
    </div>
  )
}

// ============================================
// DEEP DIVE TEMPLATE
// For detailed explanations
// Structured sections, callouts, terms
// ============================================

interface DeepDiveTemplateProps {
  segments: ContentSegment[]
  color?: string
  complexity?: 1 | 2 | 3
  nextTopic?: string
  onSaveNote?: (key: string, value: string) => void
  className?: string
}

export function DeepDiveTemplate({
  segments,
  color = 'var(--primary)',
  complexity = 2,
  nextTopic,
  onSaveNote,
  className
}: DeepDiveTemplateProps) {
  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      {/* Complexity indicator */}
      <div className="flex justify-end mb-2">
        <CognitiveLoadIndicator level={complexity} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="prose prose-xs max-w-none font-serif">
          {segments.map((segment, index) => (
            <SegmentRenderer
              key={segment.id}
              segment={segment}
              color={color}
              isFirst={index === 0}
              onSaveNote={onSaveNote}
            />
          ))}
        </div>
      </div>

      {/* Page turn hint */}
      {nextTopic && <PageTurnHint nextTopic={nextTopic} />}
    </div>
  )
}

// ============================================
// INSIGHT TEMPLATE
// For key insights/facts
// Large, centered, impactful
// ============================================

interface InsightTemplateProps {
  insight: string
  source?: string
  author?: string
  supportingText?: string
  color?: string
  className?: string
}

export function InsightTemplate({
  insight,
  source,
  author,
  supportingText,
  color = 'var(--primary)',
  className
}: InsightTemplateProps) {
  return (
    <div className={cn('w-full h-full flex flex-col items-center justify-center px-4', className)}>
      {/* Decorative top */}
      <div
        className="mb-4 text-2xl opacity-30"
        style={{ color }}
      >
        ❈
      </div>

      {/* Main insight */}
      <PullQuote
        quote={insight}
        author={author}
        source={source}
        color={color}
      />

      {/* Supporting context */}
      {supportingText && (
        <p className="mt-4 text-xs text-[var(--muted-foreground)] text-center max-w-xs leading-relaxed">
          {supportingText}
        </p>
      )}

      {/* Decorative bottom */}
      <div
        className="mt-4 text-2xl opacity-30"
        style={{ color }}
      >
        ❈
      </div>
    </div>
  )
}

// ============================================
// EXAMPLE TEMPLATE
// For real-world applications
// Case study format
// ============================================

interface ExampleTemplateProps {
  title: string
  scenario: string
  steps?: string[]
  outcome?: string
  tryThis?: string
  color?: string
  className?: string
}

export function ExampleTemplate({
  title,
  scenario,
  steps,
  outcome,
  tryThis,
  color = 'var(--primary)',
  className
}: ExampleTemplateProps) {
  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      <SectionHeader
        title={title}
        icon="🔍"
        color={color}
      />

      {/* Scenario */}
      <div className="mb-3">
        <p className="text-xs text-[var(--book-text,var(--foreground))] leading-relaxed">
          {scenario}
        </p>
      </div>

      {/* Steps */}
      {steps && steps.length > 0 && (
        <div className="mb-3">
          <p className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase mb-1">
            How it works:
          </p>
          <ol className="space-y-1">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-[var(--book-text,var(--foreground))]"
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                  style={{ background: color }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Outcome */}
      {outcome && (
        <InsightCallout type="tip">
          <strong>Result:</strong> {outcome}
        </InsightCallout>
      )}

      {/* Try this */}
      {tryThis && (
        <KeyConceptCard title="Try This!" color={color} icon="🌱">
          {tryThis}
        </KeyConceptCard>
      )}
    </div>
  )
}

// ============================================
// REFLECTION TEMPLATE
// For pause and absorb moments
// Journal/discussion prompts
// ============================================

interface ReflectionTemplateProps {
  question: string
  context?: string
  noteKey: string
  savedValue?: string
  onSave?: (value: string) => void
  color?: string
  className?: string
}

export function ReflectionTemplate({
  question,
  context,
  noteKey,
  savedValue = '',
  onSave,
  color = 'var(--primary)',
  className
}: ReflectionTemplateProps) {
  return (
    <div className={cn('w-full h-full flex flex-col items-center justify-center px-4', className)}>
      {/* Pause indicator */}
      <div className="mb-4 text-center">
        <span className="text-2xl">🌿</span>
        <p className="text-[9px] text-[var(--muted-foreground)] uppercase tracking-wider mt-1">
          Moment of Reflection
        </p>
      </div>

      <OrnamentalDivider color={color} symbol="❧" />

      {/* Context */}
      {context && (
        <p className="text-xs text-[var(--muted-foreground)] italic text-center max-w-xs mb-4 mt-3">
          {context}
        </p>
      )}

      {/* Reflection prompt with journal */}
      <div className="w-full max-w-sm">
        <ReflectionPrompt
          question={question}
          placeholder="Take a moment to reflect..."
          savedValue={savedValue}
          onSave={onSave}
        />
      </div>

      {/* Continue hint */}
      <p className="absolute bottom-4 text-[9px] text-[var(--muted-foreground)]">
        Your thoughts are saved • Turn the page when ready
      </p>
    </div>
  )
}

// ============================================
// SUMMARY TEMPLATE
// For consolidating learning
// Bullet takeaways, recap
// ============================================

interface SummaryTemplateProps {
  title?: string
  takeaways: string[]
  keyTerms?: Array<{ term: string; definition: string }>
  color?: string
  className?: string
}

export function SummaryTemplate({
  title = 'Key Takeaways',
  takeaways,
  keyTerms,
  color = 'var(--primary)',
  className
}: SummaryTemplateProps) {
  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      <SectionHeader
        title={title}
        icon="✓"
        color={color}
        subtitle="What we covered"
      />

      {/* Takeaways */}
      <div className="flex-1">
        <ul className="space-y-2">
          {takeaways.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2"
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 mt-0.5"
                style={{ background: color }}
              >
                ✓
              </span>
              <span className="text-xs text-[var(--book-text,var(--foreground))] leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* Key Terms recap */}
        {keyTerms && keyTerms.length > 0 && (
          <div className="mt-4">
            <p className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase mb-2">
              📖 Remember these terms
            </p>
            <div className="grid grid-cols-2 gap-1">
              {keyTerms.slice(0, 4).map((kt, i) => (
                <div
                  key={i}
                  className="p-1.5 rounded bg-[var(--muted)]/20 border border-[var(--border)]/20"
                >
                  <p className="text-[9px] font-bold" style={{ color }}>{kt.term}</p>
                  <p className="text-[8px] text-[var(--muted-foreground)] line-clamp-1">
                    {kt.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next section hint */}
      <OrnamentalDivider color={color} symbol="❈" />
    </div>
  )
}

// ============================================
// SEGMENT RENDERER
// Renders individual content segments with styling
// ============================================

interface SegmentRendererProps {
  segment: ContentSegment
  color?: string
  isFirst?: boolean
  onSaveNote?: (key: string, value: string) => void
}

function SegmentRenderer({
  segment,
  color = 'var(--primary)',
  isFirst = false,
  onSaveNote
}: SegmentRendererProps) {
  switch (segment.type) {
    case 'heading':
      const HeadingTag = `h${segment.level || 3}` as keyof JSX.IntrinsicElements
      return (
        <HeadingTag
          className={cn(
            'font-serif font-bold text-[var(--book-text,var(--foreground))]',
            segment.level === 2 && 'text-lg mt-4 mb-2',
            segment.level === 3 && 'text-base mt-3 mb-1.5',
            segment.level === 4 && 'text-sm mt-2 mb-1'
          )}
          style={segment.level === 2 ? { color } : undefined}
        >
          {segment.content}
        </HeadingTag>
      )

    case 'paragraph':
      return (
        <p
          className={cn(
            'text-xs leading-relaxed text-[var(--book-text,var(--foreground))] mb-2',
            // Drop cap for first paragraph
            isFirst && '[&::first-letter]:float-left [&::first-letter]:text-3xl [&::first-letter]:font-bold [&::first-letter]:mr-1.5 [&::first-letter]:mt-0.5',
            isFirst && '[&::first-letter]:text-[var(--primary)]'
          )}
          dangerouslySetInnerHTML={{ __html: segment.content }}
        />
      )

    case 'list':
      return (
        <div
          className="text-xs leading-relaxed text-[var(--book-text,var(--foreground))] mb-2 [&_li]:mb-1 [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: segment.content }}
        />
      )

    case 'quote':
      return (
        <PullQuote
          quote={segment.content}
          author={segment.metadata?.author}
          source={segment.metadata?.source}
          color={color}
        />
      )

    case 'key-concept':
      return (
        <KeyConceptCard
          title={segment.metadata?.caption || 'Key Concept'}
          color={color}
        >
          <div dangerouslySetInnerHTML={{ __html: segment.content }} />
        </KeyConceptCard>
      )

    case 'image':
      return (
        <div className="my-3 p-3 rounded-lg bg-[var(--muted)]/20 border border-dashed border-[var(--border)]/50 text-center">
          <div className="text-2xl mb-2">🖼️</div>
          <p className="text-[9px] text-[var(--muted-foreground)] italic">
            {segment.metadata?.caption || 'Illustration'}
          </p>
        </div>
      )

    case 'table':
      return (
        <div
          className="my-3 text-xs overflow-x-auto [&_table]:w-full [&_th]:bg-[var(--muted)]/30 [&_th]:p-1.5 [&_th]:text-left [&_th]:font-bold [&_td]:p-1.5 [&_td]:border-b [&_td]:border-[var(--border)]/30"
          dangerouslySetInnerHTML={{ __html: segment.content }}
        />
      )

    case 'reflection':
      return (
        <ReflectionPrompt
          question={segment.content}
          onSave={(value) => onSaveNote?.(segment.id, value)}
        />
      )

    case 'divider':
      return <OrnamentalDivider color={color} />

    default:
      return (
        <div
          className="text-xs text-[var(--book-text,var(--foreground))] mb-2"
          dangerouslySetInnerHTML={{ __html: segment.content }}
        />
      )
  }
}
