'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, X, Trash2, Edit2, Check, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { formatDistanceToNow } from 'date-fns'
import type { ScrollBookmark } from '@/hooks/useScrollBookmarks'

const BOOKMARK_COLORS = {
  yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-600' },
  green: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-600' },
  blue: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-600' },
  pink: { bg: 'bg-pink-500/20', border: 'border-pink-500', text: 'text-pink-600' },
}

interface BookmarksListProps {
  bookmarks: ScrollBookmark[]
  isOpen: boolean
  onClose: () => void
  onBookmarkClick: (bookmark: ScrollBookmark) => void
  onDeleteBookmark: (id: string) => void
  onUpdateNote: (id: string, note: string) => void
  onUpdateColor: (id: string, color: ScrollBookmark['color']) => void
}

export function BookmarksList({
  bookmarks,
  isOpen,
  onClose,
  onBookmarkClick,
  onDeleteBookmark,
  onUpdateNote,
  onUpdateColor,
}: BookmarksListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNote, setEditNote] = useState('')

  const startEditing = (bookmark: ScrollBookmark) => {
    setEditingId(bookmark.id)
    setEditNote(bookmark.note || '')
  }

  const saveNote = () => {
    if (editingId) {
      onUpdateNote(editingId, editNote)
      setEditingId(null)
      setEditNote('')
    }
  }

  const sortedBookmarks = [...bookmarks].sort((a, b) => b.createdAt - a.createdAt)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="relative w-full max-w-md bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden"
          initial={{ y: -20, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: -20, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="font-medium text-[var(--foreground)]">Bookmarks</h2>
              <span className="text-xs text-[var(--muted-foreground)]">
                ({bookmarks.length})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-[var(--muted)] transition-colors"
            >
              <X className="w-5 h-5 text-[var(--muted-foreground)]" />
            </button>
          </div>

          {/* Bookmarks list */}
          <div className="max-h-96 overflow-y-auto">
            {sortedBookmarks.length > 0 ? (
              <div className="p-2 space-y-2">
                {sortedBookmarks.map(bookmark => {
                  const colors = BOOKMARK_COLORS[bookmark.color]
                  const isEditing = editingId === bookmark.id

                  return (
                    <div
                      key={bookmark.id}
                      className={cn(
                        'rounded-lg border-l-4 p-3',
                        colors.bg,
                        colors.border
                      )}
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => onBookmarkClick(bookmark)}
                          className="flex-1 text-left group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="w-4 h-4 text-[var(--muted-foreground)]" />
                            <span className="text-xs text-[var(--muted-foreground)]">
                              Chapter {bookmark.chapterIndex + 1} · Lesson {bookmark.lessonIndex + 1}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                            {bookmark.title}
                          </p>
                        </button>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEditing(bookmark)}
                            className="p-1 rounded hover:bg-[var(--background)] transition-colors"
                            title="Edit note"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                          </button>
                          <button
                            onClick={() => onDeleteBookmark(bookmark.id)}
                            className="p-1 rounded hover:bg-[var(--background)] transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                          </button>
                        </div>
                      </div>

                      {/* Note section */}
                      {isEditing ? (
                        <div className="mt-2">
                          <textarea
                            value={editNote}
                            onChange={e => setEditNote(e.target.value)}
                            placeholder="Add a note..."
                            className="w-full px-2 py-1.5 text-xs rounded bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] resize-none"
                            rows={2}
                            autoFocus
                          />
                          <div className="flex items-center justify-between mt-2">
                            {/* Color picker */}
                            <div className="flex gap-1">
                              {(Object.keys(BOOKMARK_COLORS) as ScrollBookmark['color'][]).map(color => (
                                <button
                                  key={color}
                                  onClick={() => onUpdateColor(bookmark.id, color)}
                                  className={cn(
                                    'w-5 h-5 rounded-full border-2 transition-transform',
                                    color === 'yellow' && 'bg-yellow-500',
                                    color === 'green' && 'bg-green-500',
                                    color === 'blue' && 'bg-blue-500',
                                    color === 'pink' && 'bg-pink-500',
                                    bookmark.color === color
                                      ? 'border-white scale-110'
                                      : 'border-transparent hover:scale-110'
                                  )}
                                />
                              ))}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-2 py-1 text-xs rounded bg-[var(--muted)] text-[var(--foreground)]"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={saveNote}
                                className="px-2 py-1 text-xs rounded bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : bookmark.note ? (
                        <p className="mt-2 text-xs text-[var(--muted-foreground)] italic">
                          {bookmark.note}
                        </p>
                      ) : null}

                      {/* Timestamp */}
                      <p className="mt-2 text-[10px] text-[var(--muted-foreground)]">
                        {formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bookmark className="w-8 h-8 text-[var(--muted-foreground)] mx-auto mb-2 opacity-50" />
                <p className="text-sm text-[var(--muted-foreground)]">
                  No bookmarks yet
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  Click the bookmark icon on any page to save it
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {bookmarks.length > 0 && (
            <div className="p-3 border-t border-[var(--border)] text-center">
              <p className="text-xs text-[var(--muted-foreground)]">
                Click a bookmark to jump to that page
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
