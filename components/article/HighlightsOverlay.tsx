'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Highlighter, MessageSquare, X, Trash2, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Highlight {
  id: string
  startPos: number
  endPos: number
  text: string
  color: string
  note: string | null
  createdAt: string
}

const HIGHLIGHT_COLORS = [
  { name: 'yellow', class: 'bg-yellow-200/60 dark:bg-yellow-500/30', border: 'border-yellow-400' },
  { name: 'green', class: 'bg-green-200/60 dark:bg-green-500/30', border: 'border-green-400' },
  { name: 'blue', class: 'bg-blue-200/60 dark:bg-blue-500/30', border: 'border-blue-400' },
  { name: 'pink', class: 'bg-pink-200/60 dark:bg-pink-500/30', border: 'border-pink-400' },
  { name: 'purple', class: 'bg-purple-200/60 dark:bg-purple-500/30', border: 'border-purple-400' },
]

interface HighlightsOverlayProps {
  articleSlug: string
  contentRef: React.RefObject<HTMLElement>
  className?: string
}

export function HighlightsOverlay({ articleSlug, contentRef, className }: HighlightsOverlayProps) {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [showToolbar, setShowToolbar] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState('')
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null)
  const [selectedColor, setSelectedColor] = useState('yellow')
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [activeHighlight, setActiveHighlight] = useState<Highlight | null>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  // Fetch highlights
  useEffect(() => {
    async function fetchHighlights() {
      try {
        const res = await fetch(`/api/articles/${articleSlug}/highlights`)
        const data = await res.json()
        if (data.success) {
          setHighlights(data.data)
        }
      } catch (error) {
        console.error('Error fetching highlights:', error)
      }
    }
    fetchHighlights()
  }, [articleSlug])

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) {
        setTimeout(() => {
          if (!toolbarRef.current?.contains(document.activeElement)) {
            setShowToolbar(false)
            setShowNoteInput(false)
          }
        }, 200)
        return
      }

      const text = selection.toString().trim()
      if (!text || text.length < 3) return

      // Check if selection is within content area
      const range = selection.getRangeAt(0)
      if (!contentRef.current?.contains(range.commonAncestorContainer)) return

      const rect = range.getBoundingClientRect()
      setToolbarPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      })

      // Calculate positions relative to content
      const contentText = contentRef.current?.textContent || ''
      const startPos = contentText.indexOf(text)
      if (startPos !== -1) {
        setSelectionRange({ start: startPos, end: startPos + text.length })
      }

      setSelectedText(text)
      setShowToolbar(true)
      setShowNoteInput(false)
    }

    document.addEventListener('mouseup', handleSelection)
    return () => document.removeEventListener('mouseup', handleSelection)
  }, [contentRef])

  // Create highlight
  const createHighlight = async () => {
    if (!selectionRange || !selectedText) return

    try {
      const res = await fetch(`/api/articles/${articleSlug}/highlights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startPos: selectionRange.start,
          endPos: selectionRange.end,
          text: selectedText,
          color: selectedColor,
          note: noteText || null
        })
      })
      const data = await res.json()
      if (data.success) {
        setHighlights((prev) => [...prev, data.data])
        setShowToolbar(false)
        setShowNoteInput(false)
        setNoteText('')
        window.getSelection()?.removeAllRanges()
      }
    } catch (error) {
      console.error('Error creating highlight:', error)
    }
  }

  // Update highlight
  const updateHighlight = async (id: string, color?: string, note?: string) => {
    try {
      const res = await fetch(`/api/articles/${articleSlug}/highlights`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, color, note })
      })
      const data = await res.json()
      if (data.success) {
        setHighlights((prev) =>
          prev.map((h) => (h.id === id ? data.data : h))
        )
      }
    } catch (error) {
      console.error('Error updating highlight:', error)
    }
  }

  // Delete highlight
  const deleteHighlight = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${articleSlug}/highlights?id=${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        setHighlights((prev) => prev.filter((h) => h.id !== id))
        setActiveHighlight(null)
      }
    } catch (error) {
      console.error('Error deleting highlight:', error)
    }
  }

  const getColorClass = (colorName: string) => {
    return HIGHLIGHT_COLORS.find((c) => c.name === colorName)?.class || HIGHLIGHT_COLORS[0].class
  }

  return (
    <>
      {/* Selection Toolbar */}
      <AnimatePresence>
        {showToolbar && (
          <motion.div
            ref={toolbarRef}
            className="fixed z-50 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-2"
            style={{
              left: toolbarPosition.x,
              top: toolbarPosition.y,
              transform: 'translate(-50%, -100%)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {showNoteInput ? (
              <div className="w-64 space-y-2">
                <textarea
                  placeholder="Add a note..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={createHighlight} className="flex-1 gap-1">
                    <Check className="w-3 h-3" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowNoteInput(false)
                      setNoteText('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Color Picker */}
                <div className="flex gap-1">
                  {HIGHLIGHT_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 transition-transform',
                        color.class,
                        selectedColor === color.name
                          ? `${color.border} scale-110`
                          : 'border-transparent hover:scale-105'
                      )}
                    />
                  ))}
                </div>

                <div className="w-px h-6 bg-[var(--border)]" />

                {/* Actions */}
                <button
                  onClick={createHighlight}
                  className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                  title="Highlight"
                >
                  <Highlighter className="w-4 h-4 text-[var(--foreground)]" />
                </button>
                <button
                  onClick={() => setShowNoteInput(true)}
                  className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                  title="Add Note"
                >
                  <MessageSquare className="w-4 h-4 text-[var(--foreground)]" />
                </button>
                <button
                  onClick={() => setShowToolbar(false)}
                  className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                >
                  <X className="w-4 h-4 text-[var(--muted-foreground)]" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Highlight Popup (when clicking on highlight) */}
      <AnimatePresence>
        {activeHighlight && (
          <motion.div
            className="fixed z-50 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-4 max-w-sm"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={cn('px-2 py-1 rounded text-xs font-medium', getColorClass(activeHighlight.color))}>
                Highlight
              </span>
              <button
                onClick={() => setActiveHighlight(null)}
                className="p-1 rounded hover:bg-[var(--muted)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-[var(--foreground)] mb-3 italic">
              "{activeHighlight.text.slice(0, 100)}..."
            </p>
            {activeHighlight.note && (
              <p className="text-sm text-[var(--muted-foreground)] mb-3 p-2 bg-[var(--muted)] rounded">
                {activeHighlight.note}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-red-500 hover:bg-red-500/10"
                onClick={() => deleteHighlight(activeHighlight.id)}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Export highlights count badge
export function HighlightsCount({ articleSlug }: { articleSlug: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch(`/api/articles/${articleSlug}/highlights`)
        const data = await res.json()
        if (data.success) {
          setCount(data.data.length)
        }
      } catch (error) {
        console.error('Error fetching highlights count:', error)
      }
    }
    fetchCount()
  }, [articleSlug])

  if (count === 0) return null

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-200/60 dark:bg-yellow-500/30 rounded-full text-xs font-medium">
      <Highlighter className="w-3 h-3" />
      {count}
    </span>
  )
}
