'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ChevronRight, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Module } from '@/data/modules'
import type { LearningLevel } from '@/types/learning'

interface SearchResult {
  chapterIndex: number
  lessonIndex: number
  chapterTitle: string
  lessonTitle: string
  snippet: string
  matchCount: number
}

interface SearchPanelProps {
  modules: Module[]
  selectedLevel: LearningLevel
  isOpen: boolean
  onClose: () => void
  onResultClick: (chapterIndex: number, lessonIndex: number) => void
}

export function SearchPanel({
  modules,
  selectedLevel,
  isOpen,
  onClose,
  onResultClick,
}: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('scroll-recent-searches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  // Save search to recent
  const saveRecentSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== searchQuery)
      const updated = [searchQuery, ...filtered].slice(0, 5)
      localStorage.setItem('scroll-recent-searches', JSON.stringify(updated))
      return updated
    })
  }, [])

  // Build search index
  const searchIndex = useMemo(() => {
    return modules.flatMap((module, chapterIndex) =>
      module.lessons.map((lesson, lessonIndex) => {
        const content = typeof lesson.content === 'string'
          ? lesson.content
          : lesson.content[selectedLevel] || lesson.content.HIGH_SCHOOL || ''

        return {
          chapterIndex,
          lessonIndex,
          chapterTitle: module.title,
          lessonTitle: lesson.title,
          content: content.toLowerCase(),
          rawContent: content,
        }
      })
    )
  }, [modules, selectedLevel])

  // Search results
  const results = useMemo((): SearchResult[] => {
    if (!query.trim() || query.length < 2) return []

    const lowerQuery = query.toLowerCase()
    const matches: SearchResult[] = []

    for (const item of searchIndex) {
      const titleMatch = item.lessonTitle.toLowerCase().includes(lowerQuery)
      const contentMatch = item.content.includes(lowerQuery)

      if (titleMatch || contentMatch) {
        // Count matches
        const regex = new RegExp(lowerQuery, 'gi')
        const matchCount = (item.content.match(regex) || []).length +
          (item.lessonTitle.toLowerCase().match(regex) || []).length

        // Extract snippet around first match
        let snippet = ''
        const contentIndex = item.content.indexOf(lowerQuery)
        if (contentIndex !== -1) {
          const start = Math.max(0, contentIndex - 40)
          const end = Math.min(item.rawContent.length, contentIndex + query.length + 60)
          snippet = (start > 0 ? '...' : '') +
            item.rawContent.slice(start, end).replace(/<[^>]*>/g, '') +
            (end < item.rawContent.length ? '...' : '')
        } else {
          snippet = item.rawContent.slice(0, 100).replace(/<[^>]*>/g, '') + '...'
        }

        matches.push({
          chapterIndex: item.chapterIndex,
          lessonIndex: item.lessonIndex,
          chapterTitle: item.chapterTitle,
          lessonTitle: item.lessonTitle,
          snippet,
          matchCount,
        })
      }
    }

    // Sort by match count (most relevant first)
    return matches.sort((a, b) => b.matchCount - a.matchCount)
  }, [query, searchIndex])

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(query)
    onResultClick(result.chapterIndex, result.lessonIndex)
    onClose()
  }

  // Handle recent search click
  const handleRecentClick = (recentQuery: string) => {
    setQuery(recentQuery)
  }

  // Clear recent searches
  const clearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem('scroll-recent-searches')
  }

  // Highlight matches in text
  const highlightMatch = (text: string) => {
    if (!query.trim()) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300/50 text-inherit rounded px-0.5">{part}</mark>
      ) : (
        part
      )
    )
  }

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
          className="relative w-full max-w-lg bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden"
          initial={{ y: -20, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: -20, scale: 0.95 }}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
            <Search className="w-5 h-5 text-[var(--muted-foreground)]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search lessons, topics, keywords..."
              className="flex-1 bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded hover:bg-[var(--muted)] transition-colors"
              >
                <X className="w-4 h-4 text-[var(--muted-foreground)]" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              ESC
            </button>
          </div>

          {/* Results or recent searches */}
          <div className="max-h-96 overflow-y-auto">
            {query.length >= 2 ? (
              // Search results
              results.length > 0 ? (
                <div className="p-2">
                  <p className="text-xs text-[var(--muted-foreground)] px-2 py-1">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="space-y-1">
                    {results.map((result, idx) => (
                      <button
                        key={`${result.chapterIndex}-${result.lessonIndex}-${idx}`}
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left p-3 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="w-4 h-4 text-[var(--primary)]" />
                          <span className="text-xs text-[var(--muted-foreground)]">
                            Chapter {result.chapterIndex + 1}
                          </span>
                          <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)]" />
                          <span className="text-sm font-medium text-[var(--foreground)] truncate">
                            {highlightMatch(result.lessonTitle)}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 pl-6">
                          {highlightMatch(result.snippet)}
                        </p>
                        <div className="flex items-center gap-2 mt-1 pl-6">
                          <span className="text-[10px] text-[var(--muted-foreground)]">
                            {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-8 h-8 text-[var(--muted-foreground)] mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-[var(--muted-foreground)]">
                    No results found for "{query}"
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    Try different keywords
                  </p>
                </div>
              )
            ) : (
              // Recent searches
              <div className="p-4">
                {recentSearches.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                        Recent Searches
                      </p>
                      <button
                        onClick={clearRecent}
                        className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((recent, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRecentClick(recent)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors flex items-center gap-2"
                        >
                          <Search className="w-4 h-4 text-[var(--muted-foreground)]" />
                          <span className="text-sm text-[var(--foreground)]">{recent}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Search className="w-8 h-8 text-[var(--muted-foreground)] mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Search across all lessons
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      Type at least 2 characters
                    </p>
                  </div>
                )}

                {/* Keyboard hints */}
                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--muted-foreground)] mb-2">Keyboard shortcuts</p>
                  <div className="flex gap-4 text-xs text-[var(--muted-foreground)]">
                    <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--muted)] font-mono">↑↓</kbd> Navigate</span>
                    <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--muted)] font-mono">Enter</kbd> Select</span>
                    <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--muted)] font-mono">Esc</kbd> Close</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
