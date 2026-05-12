'use client'

/**
 * Floating annotated guide for the article preview/edit view. Shown
 * automatically the first time a user lands in preview mode after
 * pasting/uploading content; can be reopened any time via a help
 * button. Pure annotations on top of the existing UI — the page is
 * still fully clickable underneath (dim is light, no spotlight).
 *
 * Anchors are discovered at runtime via `[data-tour-id]` attributes
 * on the elements being annotated, so the host page doesn't need to
 * thread refs around.
 */

import { useEffect, useLayoutEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Sparkles, X, Pencil } from 'lucide-react'

export interface GuideAnnotation {
  /** Matches `data-tour-id` on the target element. */
  id: string
  /** Short label shown in the callout header. */
  label: string
  /** Friendly description shown beneath the label. */
  description: string
  /** Which side of the target the callout sits on. Auto if omitted. */
  side?: 'left' | 'right' | 'top' | 'bottom'
}

interface PublishLayoutGuideProps {
  annotations: GuideAnnotation[]
  isOpen: boolean
  onClose: () => void
}

interface ResolvedAnnotation extends GuideAnnotation {
  rect: DOMRect
}

export function PublishLayoutGuide({ annotations, isOpen, onClose }: PublishLayoutGuideProps) {
  const [resolved, setResolved] = useState<ResolvedAnnotation[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Recompute anchor positions whenever the overlay opens, the window
  // resizes, or the user scrolls. Cheap — just getBoundingClientRect.
  const recompute = useCallback(() => {
    if (!isOpen) return
    const next: ResolvedAnnotation[] = []
    for (const a of annotations) {
      const el = document.querySelector<HTMLElement>(`[data-tour-id="${a.id}"]`)
      if (el) next.push({ ...a, rect: el.getBoundingClientRect() })
    }
    setResolved(next)
  }, [annotations, isOpen])

  useLayoutEffect(() => {
    if (!isOpen) return
    recompute()
    const onResize = () => recompute()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, true)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize, true)
    }
  }, [isOpen, recompute])

  // Lock body scroll while overlay is open so callouts don't drift.
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[120] pointer-events-none">
      {/* Light dim — page still legible underneath. Clicks pass through
          to the page so users can still interact with their content. */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Top banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[var(--card)] border-2 border-theme-primary shadow-2xl">
          <Sparkles className="w-5 h-5 text-theme-primary" />
          <div className="text-sm">
            <span className="font-black">Preview mode</span>
            <span className="text-theme-muted"> — this is exactly how readers will see it.</span>
          </div>
          <button
            onClick={onClose}
            className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-primary text-black text-xs font-black hover:opacity-90"
          >
            Got it
          </button>
          <button
            onClick={onClose}
            aria-label="Close guide"
            className="p-1 rounded text-theme-muted hover:text-theme-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Callouts — one per annotation, anchored to their target */}
      {resolved.map(a => (
        <Callout key={a.id} annotation={a} />
      ))}
    </div>,
    document.body,
  )
}

function Callout({ annotation }: { annotation: ResolvedAnnotation }) {
  const { rect, label, description } = annotation
  const side = annotation.side ?? autoSide(rect)

  // Position the callout relative to the target's viewport rect. Sized
  // to ~260px wide; arrow points at the edge of the target.
  const style: React.CSSProperties = (() => {
    const gap = 16
    switch (side) {
      case 'left':
        return { top: rect.top + rect.height / 2, left: rect.left - gap, transform: 'translate(-100%, -50%)' }
      case 'right':
        return { top: rect.top + rect.height / 2, left: rect.right + gap, transform: 'translateY(-50%)' }
      case 'top':
        return { top: rect.top - gap, left: rect.left + rect.width / 2, transform: 'translate(-50%, -100%)' }
      case 'bottom':
      default:
        return { top: rect.bottom + gap, left: rect.left + rect.width / 2, transform: 'translateX(-50%)' }
    }
  })()

  return (
    <>
      {/* Highlight ring around the target */}
      <div
        className="absolute rounded-lg pointer-events-none border-2 border-theme-primary shadow-[0_0_0_4px_color-mix(in_srgb,var(--primary)_30%,transparent)] animate-pulse"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
        }}
      />
      {/* Callout card */}
      <div className="absolute pointer-events-auto" style={style}>
        <div className="w-[260px] px-4 py-3 rounded-xl bg-[var(--card)] border-2 border-theme-primary shadow-2xl">
          <div className="flex items-center gap-1.5 mb-1">
            <Pencil className="w-3.5 h-3.5 text-theme-primary" />
            <span className="text-xs font-black uppercase tracking-wider text-theme-primary">{label}</span>
          </div>
          <p className="text-xs text-theme-muted leading-relaxed">{description}</p>
        </div>
      </div>
    </>
  )
}

/** Choose the side that has the most room around the target. */
function autoSide(rect: DOMRect): 'left' | 'right' | 'top' | 'bottom' {
  const vw = window.innerWidth
  const rightRoom = vw - rect.right
  const leftRoom = rect.left
  // Prefer horizontal placement when there's space, else fall back below.
  if (rightRoom >= 300) return 'right'
  if (leftRoom >= 300) return 'left'
  return 'bottom'
}
