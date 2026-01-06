'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Search, Filter, Grid, List, Bookmark, BookmarkCheck,
  ChevronRight, Clock, MapPin, Info, X, Star, Home,
  Columns, ArrowUpDown, Calendar, Globe, Tag, BookOpen
} from 'lucide-react'
import type { ArchitecturalElement } from '@/data/architecture/types'
import { ALL_ELEMENTS } from '@/data/architecture/elements'
import { ArchitectureSVG } from './ArchitectureSVG'

// Historical periods for timeline view
const HISTORICAL_PERIODS = [
  { id: 'ancient', name: 'Ancient', years: '3000 BCE - 500 CE', color: 'from-amber-600 to-orange-700' },
  { id: 'medieval', name: 'Medieval', years: '500 - 1400 CE', color: 'from-stone-600 to-stone-700' },
  { id: 'renaissance', name: 'Renaissance', years: '1400 - 1600 CE', color: 'from-emerald-600 to-teal-700' },
  { id: 'baroque', name: 'Baroque', years: '1600 - 1750 CE', color: 'from-purple-600 to-violet-700' },
  { id: 'neoclassical', name: 'Neoclassical', years: '1750 - 1850 CE', color: 'from-blue-600 to-indigo-700' },
  { id: 'modern', name: 'Modern', years: '1850 - 1970 CE', color: 'from-gray-600 to-slate-700' },
  { id: 'contemporary', name: 'Contemporary', years: '1970 - Present', color: 'from-cyan-600 to-teal-700' },
]

// Categories with icons
const CATEGORIES = [
  { id: 'COLUMN', name: 'Columns', icon: Columns },
  { id: 'ARCH', name: 'Arches', icon: ArrowUpDown },
  { id: 'DOME', name: 'Domes', icon: Globe },
  { id: 'WINDOW', name: 'Windows', icon: Grid },
  { id: 'ROOF', name: 'Roofs', icon: Home },
  { id: 'VAULT', name: 'Vaults', icon: ArrowUpDown },
  { id: 'RELIGIOUS', name: 'Religious', icon: Star },
  { id: 'FORTIFICATION', name: 'Fortification', icon: Tag },
  { id: 'DOOR', name: 'Doors', icon: ChevronRight },
  { id: 'DECORATIVE', name: 'Decorative', icon: Star },
  { id: 'INTERIOR', name: 'Interior', icon: Home },
  { id: 'FACADE', name: 'Facade', icon: Grid },
  { id: 'FLOOR', name: 'Floor', icon: Grid },
  { id: 'CEILING', name: 'Ceiling', icon: ArrowUpDown },
  { id: 'WALL', name: 'Wall', icon: Columns },
  { id: 'GARDEN', name: 'Garden', icon: Globe },
  { id: 'URBAN', name: 'Urban', icon: MapPin },
]

interface ExploreState {
  view: 'grid' | 'list' | 'timeline'
  searchQuery: string
  selectedCategory: string | null
  selectedPeriod: string | null
  sortBy: 'name' | 'category' | 'period' | 'difficulty'
  sortOrder: 'asc' | 'desc'
  selectedElement: ArchitecturalElement | null
  bookmarks: string[]
}

interface ExploreGameProps {
  onExit?: () => void
}

export function ExploreGame({ onExit }: ExploreGameProps) {
  // State
  const [state, setState] = useState<ExploreState>({
    view: 'grid',
    searchQuery: '',
    selectedCategory: null,
    selectedPeriod: null,
    sortBy: 'name',
    sortOrder: 'asc',
    selectedElement: null,
    bookmarks: [],
  })

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('architecture-bookmarks')
    if (saved) {
      setState(prev => ({ ...prev, bookmarks: JSON.parse(saved) }))
    }
  }, [])

  // Save bookmarks to localStorage
  const toggleBookmark = useCallback((elementId: string) => {
    setState(prev => {
      const newBookmarks = prev.bookmarks.includes(elementId)
        ? prev.bookmarks.filter(id => id !== elementId)
        : [...prev.bookmarks, elementId]

      localStorage.setItem('architecture-bookmarks', JSON.stringify(newBookmarks))
      return { ...prev, bookmarks: newBookmarks }
    })
  }, [])

  // Filtered elements based on search, category, period
  const filteredElements = useMemo(() => {
    let elements = ALL_ELEMENTS

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase()
      elements = elements.filter(e =>
        e.name.toLowerCase().includes(query) ||
        Object.values(e.description).some(d => d.toLowerCase().includes(query)) ||
        e.category.toLowerCase().includes(query)
      )
    }

    if (state.selectedCategory) {
      elements = elements.filter(e => e.category === state.selectedCategory)
    }

    if (state.selectedPeriod) {
      elements = elements.filter(e =>
        e.periods?.some(p => p.toLowerCase().includes(state.selectedPeriod!.toLowerCase()))
      )
    }

    return elements
  }, [state.searchQuery, state.selectedCategory, state.selectedPeriod])

  // Bookmarked elements
  const bookmarkedElements = useMemo(() =>
    ALL_ELEMENTS.filter(e => state.bookmarks.includes(e.id)),
    [state.bookmarks]
  )

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    ALL_ELEMENTS.forEach(el => {
      counts[el.category] = (counts[el.category] || 0) + 1
    })
    return counts
  }, [])

  // Render element card
  const renderElementCard = (element: ArchitecturalElement, size: 'small' | 'medium' | 'large' = 'medium') => {
    const isBookmarked = state.bookmarks.includes(element.id)

    return (
      <motion.div
        key={element.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -4 }}
        onClick={() => setState(prev => ({ ...prev, selectedElement: element }))}
        className={`
          relative bg-[var(--card)] rounded-xl border border-[var(--border)]
          cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all
          ${size === 'small' ? 'p-3' : size === 'large' ? 'p-6' : 'p-4'}
        `}
      >
        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleBookmark(element.id)
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-[var(--background)]/80 hover:bg-[var(--background)] transition-colors"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-teal-500" />
          ) : (
            <Bookmark className="w-4 h-4 text-[var(--muted-foreground)]" />
          )}
        </button>

        {/* SVG Illustration */}
        <div className={`
          flex items-center justify-center bg-[var(--muted)]/30 rounded-lg mb-3
          ${size === 'small' ? 'h-20' : size === 'large' ? 'h-40' : 'h-28'}
        `}>
          <ArchitectureSVG
            category={element.category}
            elementId={element.id}
            size={size === 'small' ? 60 : size === 'large' ? 120 : 80}
          />
        </div>

        {/* Element info */}
        <h3 className={`
          font-bold text-[var(--foreground)] mb-1
          ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base'}
        `}>
          {element.name}
        </h3>

        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <span className="px-2 py-0.5 rounded-full bg-[var(--muted)]">
            {element.category}
          </span>
          {element.periods?.[0] && (
            <span className="truncate">{element.periods[0]}</span>
          )}
        </div>

        {size !== 'small' && (
          <p className="mt-2 text-sm text-[var(--muted-foreground)] line-clamp-2">
            {element.description.HIGH_SCHOOL.split('.')[0]}.
          </p>
        )}

        {/* Difficulty indicator */}
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(level => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                level <= element.difficultyScore
                  ? 'bg-teal-500'
                  : 'bg-[var(--muted)]'
              }`}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  // Element detail modal
  const renderElementDetail = () => {
    if (!state.selectedElement) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={() => setState(prev => ({ ...prev, selectedElement: null }))}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--card)] rounded-2xl shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={() => setState(prev => ({ ...prev, selectedElement: null }))}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[var(--muted)] hover:bg-[var(--muted)]/80 transition-colors"
          >
            <X className="w-5 h-5 text-[var(--foreground)]" />
          </button>

          {/* Header with SVG */}
          <div className="relative h-48 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
            <ArchitectureSVG
              category={state.selectedElement.category}
              elementId={state.selectedElement.id}
              size={140}
              showHalo
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Title and meta */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-medium">
                  {state.selectedElement.category}
                </span>
                <button
                  onClick={() => toggleBookmark(state.selectedElement!.id)}
                  className="p-1"
                >
                  {state.bookmarks.includes(state.selectedElement.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-teal-500" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-[var(--muted-foreground)]" />
                  )}
                </button>
              </div>

              <h2 className="text-3xl font-black text-[var(--foreground)] mb-2">
                {state.selectedElement.name}
              </h2>

              {state.selectedElement.periods?.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Clock className="w-4 h-4" />
                  <span>{state.selectedElement.periods.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm dark:prose-invert">
              <p className="text-[var(--foreground)] leading-relaxed">
                {state.selectedElement.description.HIGH_SCHOOL}
              </p>
            </div>

            {/* Characteristics */}
            {state.selectedElement.characteristics && state.selectedElement.characteristics.length > 0 && (
              <div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">Key Features</h3>
                <ul className="space-y-2">
                  {state.selectedElement.characteristics.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                      <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Famous examples */}
            {state.selectedElement.famousExamples && state.selectedElement.famousExamples.length > 0 && (
              <div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">Famous Examples</h3>
                <div className="flex flex-wrap gap-2">
                  {state.selectedElement.famousExamples.map((example, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-[var(--muted)] text-sm text-[var(--foreground)]"
                    >
                      {example.name} ({example.location})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related elements */}
            <div>
              <h3 className="font-bold text-[var(--foreground)] mb-2">
                More in {state.selectedElement.category}
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {ALL_ELEMENTS
                  .filter(e => e.category === state.selectedElement!.category && e.id !== state.selectedElement!.id)
                  .slice(0, 5)
                  .map(e => (
                    <button
                      key={e.id}
                      onClick={() => setState(prev => ({ ...prev, selectedElement: e }))}
                      className="flex-shrink-0 w-24 p-2 rounded-lg bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors"
                    >
                      <div className="h-16 flex items-center justify-center">
                        <ArchitectureSVG category={e.category} elementId={e.id} size={48} />
                      </div>
                      <p className="text-xs text-center text-[var(--foreground)] truncate mt-1">
                        {e.name}
                      </p>
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--muted)]/20 to-[var(--background)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Title and back */}
            <div className="flex items-center gap-3">
              {onExit && (
                <Button variant="ghost" size="sm" onClick={onExit}>
                  <Home className="w-4 h-4" />
                </Button>
              )}
              <h1 className="text-xl font-black text-[var(--foreground)]">
                Explore Architecture
              </h1>
              <span className="text-sm text-[var(--muted-foreground)]">
                {filteredElements.length} elements
              </span>
            </div>

            {/* View toggles */}
            <div className="flex items-center gap-2">
              {(['grid', 'list', 'timeline'] as const).map(view => (
                <Button
                  key={view}
                  variant={state.view === view ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setState(prev => ({ ...prev, view }))}
                  className={state.view === view ? 'bg-teal-500 text-white' : ''}
                >
                  {view === 'grid' ? <Grid className="w-4 h-4" /> :
                   view === 'list' ? <List className="w-4 h-4" /> :
                   <Calendar className="w-4 h-4" />}
                </Button>
              ))}
            </div>
          </div>

          {/* Search and filters */}
          <div className="mt-4 flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search elements..."
                value={state.searchQuery}
                onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Category filter */}
            <select
              value={state.selectedCategory || ''}
              onChange={(e) => setState(prev => ({ ...prev, selectedCategory: e.target.value || null }))}
              className="px-4 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({categoryCounts[cat.id] || 0})
                </option>
              ))}
            </select>

            {/* Bookmarks filter */}
            <Button
              variant={state.bookmarks.length > 0 ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => {
                // Toggle showing only bookmarked
              }}
              className="gap-2"
            >
              <Bookmark className="w-4 h-4" />
              <span>{state.bookmarks.length}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Grid view */}
        {state.view === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredElements.map(element => renderElementCard(element, 'medium'))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* List view */}
        {state.view === 'list' && (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredElements.map(element => (
                <motion.div
                  key={element.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={() => setState(prev => ({ ...prev, selectedElement: element }))}
                  className="flex items-center gap-4 p-4 bg-[var(--card)] rounded-xl border border-[var(--border)] cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-[var(--muted)]/30 rounded-lg flex items-center justify-center">
                    <ArchitectureSVG category={element.category} elementId={element.id} size={48} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--foreground)]">{element.name}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] truncate">
                      {element.description.HIGH_SCHOOL.split('.')[0]}.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-[var(--muted)] text-xs">
                      {element.category}
                    </span>
                    <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Timeline view */}
        {state.view === 'timeline' && (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-cyan-500" />

            {/* Periods */}
            <div className="space-y-6">
              {HISTORICAL_PERIODS.map((period, index) => {
                const periodElements = ALL_ELEMENTS.filter(e =>
                  e.periods?.some(p => p.toLowerCase().includes(period.id))
                )

                return (
                  <motion.div
                    key={period.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Period marker */}
                    <div className={`absolute left-4 w-8 h-8 rounded-full bg-gradient-to-br ${period.color} flex items-center justify-center shadow-lg`}>
                      <Clock className="w-4 h-4 text-white" />
                    </div>

                    {/* Period content */}
                    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-[var(--foreground)]">{period.name}</h3>
                          <p className="text-sm text-[var(--muted-foreground)]">{period.years}</p>
                        </div>
                        <span className="text-sm text-[var(--muted-foreground)]">
                          {periodElements.length} elements
                        </span>
                      </div>

                      {/* Elements in this period */}
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {periodElements.slice(0, 8).map(element => (
                          <button
                            key={element.id}
                            onClick={() => setState(prev => ({ ...prev, selectedElement: element }))}
                            className="flex-shrink-0 w-20 p-2 rounded-lg bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors"
                          >
                            <div className="h-12 flex items-center justify-center">
                              <ArchitectureSVG category={element.category} elementId={element.id} size={40} />
                            </div>
                            <p className="text-xs text-center text-[var(--foreground)] truncate mt-1">
                              {element.name}
                            </p>
                          </button>
                        ))}
                        {periodElements.length > 8 && (
                          <div className="flex-shrink-0 w-20 p-2 rounded-lg bg-[var(--muted)]/30 flex items-center justify-center">
                            <span className="text-sm text-[var(--muted-foreground)]">
                              +{periodElements.length - 8}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredElements.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--muted-foreground)]" />
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
              No elements found
            </h3>
            <p className="text-[var(--muted-foreground)]">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Element detail modal */}
      <AnimatePresence>
        {state.selectedElement && renderElementDetail()}
      </AnimatePresence>
    </div>
  )
}
