'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Bookmark, BookmarkPlus, X, ChevronRight, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Bookmark {
  id: string
  position: number
  title: string | null
  note: string | null
  createdAt: string
}

interface BookmarksPanelProps {
  articleSlug: string
  isOpen: boolean
  onClose: () => void
  onBookmarkClick?: (position: number) => void
  className?: string
}

export function BookmarksPanel({
  articleSlug,
  isOpen,
  onClose,
  onBookmarkClick,
  className
}: BookmarksPanelProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [newBookmarkTitle, setNewBookmarkTitle] = useState('')

  // Fetch bookmarks
  useEffect(() => {
    async function fetchBookmarks() {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/articles/${articleSlug}/bookmarks`)
        const data = await res.json()
        if (data.success) {
          setBookmarks(data.data)
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      fetchBookmarks()
    }
  }, [articleSlug, isOpen])

  // Add bookmark at current position
  const addBookmark = async () => {
    const scrollPosition = Math.round(window.scrollY)
    const title = newBookmarkTitle.trim() || `Position ${scrollPosition}`

    try {
      const res = await fetch(`/api/articles/${articleSlug}/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position: scrollPosition,
          title
        })
      })
      const data = await res.json()
      if (data.success) {
        setBookmarks((prev) => [...prev, data.data].sort((a, b) => a.position - b.position))
        setNewBookmarkTitle('')
        setIsAdding(false)
      }
    } catch (error) {
      console.error('Error adding bookmark:', error)
    }
  }

  // Delete bookmark
  const deleteBookmark = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${articleSlug}/bookmarks?id=${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        setBookmarks((prev) => prev.filter((b) => b.id !== id))
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error)
    }
  }

  // Navigate to bookmark position
  const navigateToBookmark = (position: number) => {
    window.scrollTo({ top: position, behavior: 'smooth' })
    onBookmarkClick?.(position)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={cn(
              'fixed right-0 top-0 bottom-0 z-50 w-80 bg-[var(--card)] border-l border-[var(--border)] shadow-xl',
              className
            )}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[var(--primary)]" />
                <h2 className="font-bold text-[var(--foreground)]">Bookmarks</h2>
                <span className="px-2 py-0.5 text-xs bg-[var(--muted)] rounded-full">
                  {bookmarks.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-[var(--muted)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--muted-foreground)]" />
              </button>
            </div>

            {/* Add Bookmark */}
            <div className="p-4 border-b border-[var(--border)]">
              {isAdding ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Bookmark title (optional)"
                    value={newBookmarkTitle}
                    onChange={(e) => setNewBookmarkTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addBookmark()
                      if (e.key === 'Escape') setIsAdding(false)
                    }}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addBookmark} className="flex-1">
                      Add
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setIsAdding(true)}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  Add Bookmark Here
                </Button>
              )}
            </div>

            {/* Bookmarks List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {isLoading ? (
                <div className="text-center text-[var(--muted-foreground)] py-8">
                  Loading...
                </div>
              ) : bookmarks.length === 0 ? (
                <div className="text-center text-[var(--muted-foreground)] py-8">
                  <Bookmark className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No bookmarks yet</p>
                  <p className="text-xs mt-1">Add bookmarks to save your place</p>
                </div>
              ) : (
                bookmarks.map((bookmark) => (
                  <motion.div
                    key={bookmark.id}
                    className="group flex items-center gap-2 p-3 rounded-lg bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors cursor-pointer"
                    onClick={() => navigateToBookmark(bookmark.position)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Bookmark className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)] truncate">
                        {bookmark.title || `Position ${bookmark.position}`}
                      </p>
                      {bookmark.note && (
                        <p className="text-xs text-[var(--muted-foreground)] truncate">
                          {bookmark.note}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteBookmark(bookmark.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)]" />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Floating Bookmark Button Component
export function BookmarkButton({
  articleSlug,
  onClick,
  className
}: {
  articleSlug: string
  onClick: () => void
  className?: string
}) {
  const [bookmarkCount, setBookmarkCount] = useState(0)

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch(`/api/articles/${articleSlug}/bookmarks`)
        const data = await res.json()
        if (data.success) {
          setBookmarkCount(data.data.length)
        }
      } catch (error) {
        console.error('Error fetching bookmark count:', error)
      }
    }
    fetchCount()
  }, [articleSlug])

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-full shadow-lg hover:shadow-xl transition-shadow',
        className
      )}
    >
      <Bookmark className="w-4 h-4 text-[var(--primary)]" />
      <span className="text-sm font-medium">{bookmarkCount}</span>
    </button>
  )
}
