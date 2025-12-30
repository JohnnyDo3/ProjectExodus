'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Filter, X, ChevronRight, ArrowLeft, Grid, List,
  Clock, Globe, Layers, GraduationCap, Volume2, BookOpen
} from 'lucide-react'
import Link from 'next/link'
import { ALL_ELEMENTS, searchElements, getElementsByCategory, getElementsByPeriod, getElementsByRegion } from '@/data/architecture/elements'
import { CATEGORIES } from '@/data/architecture/categories'
import { PERIODS } from '@/data/architecture/periods'
import { REGIONS } from '@/data/architecture/regions'
import type { ArchitecturalElement, LearningLevel } from '@/data/architecture/types'

const learningLevels: { id: LearningLevel; name: string }[] = [
  { id: 'ELEMENTARY', name: 'Elementary' },
  { id: 'MIDDLE_SCHOOL', name: 'Middle School' },
  { id: 'HIGH_SCHOOL', name: 'High School' },
  { id: 'UNDERGRADUATE', name: 'Undergraduate' },
  { id: 'GRADUATE', name: 'Graduate' },
  { id: 'PHD', name: 'PhD' },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>('MIDDLE_SCHOOL')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedElement, setSelectedElement] = useState<ArchitecturalElement | null>(null)

  // Filter elements
  const filteredElements = useMemo(() => {
    let results = ALL_ELEMENTS

    // Search query
    if (searchQuery.trim()) {
      results = searchElements(searchQuery)
    }

    // Category filter
    if (selectedCategory) {
      results = results.filter(e => e.category === selectedCategory)
    }

    // Period filter
    if (selectedPeriod) {
      results = results.filter(e => e.periods.includes(selectedPeriod as any))
    }

    // Region filter
    if (selectedRegion) {
      results = results.filter(e => e.regions.includes(selectedRegion as any))
    }

    return results
  }, [searchQuery, selectedCategory, selectedPeriod, selectedRegion])

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedPeriod(null)
    setSelectedRegion(null)
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedPeriod || selectedRegion

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/architecture">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-black text-[var(--foreground)]">Explore Elements</h1>
            <span className="text-sm text-[var(--muted-foreground)]">
              {filteredElements.length} of {ALL_ELEMENTS.length}
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search elements, styles, or terms..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[var(--muted)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-[var(--primary)]/10' : ''}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </Button>
            <div className="hidden sm:flex gap-1 border border-[var(--border)] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[var(--muted)]' : ''}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[var(--muted)]' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-4">
                  {/* Categories */}
                  <div>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)] mb-2 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(CATEGORIES).slice(0, 8).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                          className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                            selectedCategory === cat.id
                              ? 'border-amber-500 bg-amber-500/10 text-amber-600'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Periods */}
                  <div>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)] mb-2 block">Period</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(PERIODS).slice(0, 8).map((period) => (
                        <button
                          key={period.id}
                          onClick={() => setSelectedPeriod(selectedPeriod === period.id ? null : period.id)}
                          className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                            selectedPeriod === period.id
                              ? 'border-teal-500 bg-teal-500/10 text-teal-600'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          {period.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Learning Level */}
                  <div>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)] mb-2 block">Learning Level</label>
                    <div className="flex flex-wrap gap-2">
                      {learningLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setSelectedLevel(level.id)}
                          className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                            selectedLevel === level.id
                              ? 'border-purple-500 bg-purple-500/10 text-purple-600'
                              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                          }`}
                        >
                          {level.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="w-4 h-4 mr-2" />
                      Clear all filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        {filteredElements.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">No elements found</h3>
            <p className="text-[var(--muted-foreground)] mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
            : 'space-y-2'
          }>
            {filteredElements.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.5) }}
              >
                {viewMode === 'grid' ? (
                  <button
                    onClick={() => setSelectedElement(element)}
                    className="w-full text-left"
                  >
                    <Card className="h-full border border-[var(--border)] hover:border-[var(--primary)]/50 hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                      {/* Image placeholder */}
                      <div className="aspect-square bg-[var(--muted)] relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-4xl">
                          {element.category === 'STRUCTURAL' ? '🏛️' :
                           element.category === 'DECORATIVE' ? '🎨' :
                           element.category === 'RELIGIOUS' ? '⛪' :
                           element.category === 'FORTIFICATION' ? '🏰' : '🏠'}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <span className="text-xs text-white/80">{element.category}</span>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-bold text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
                          {element.name}
                        </h3>
                        <p className="text-xs text-[var(--muted-foreground)] truncate">
                          {element.periods[0]?.replace(/_/g, ' ')}
                        </p>
                      </CardContent>
                    </Card>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedElement(element)}
                    className="w-full text-left"
                  >
                    <Card className="border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all cursor-pointer group">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[var(--muted)] flex items-center justify-center text-2xl shrink-0">
                          {element.category === 'STRUCTURAL' ? '🏛️' :
                           element.category === 'DECORATIVE' ? '🎨' :
                           element.category === 'RELIGIOUS' ? '⛪' :
                           element.category === 'FORTIFICATION' ? '🏰' : '🏠'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                            {element.name}
                          </h3>
                          <p className="text-sm text-[var(--muted-foreground)] truncate">
                            {element.description[selectedLevel].slice(0, 80)}...
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] shrink-0" />
                      </CardContent>
                    </Card>
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Element Detail Modal */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelectedElement(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--card)] rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Header Image */}
              <div className="h-48 bg-[var(--muted)] relative shrink-0">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {selectedElement.category === 'STRUCTURAL' ? '🏛️' :
                   selectedElement.category === 'DECORATIVE' ? '🎨' :
                   selectedElement.category === 'RELIGIOUS' ? '⛪' :
                   selectedElement.category === 'FORTIFICATION' ? '🏰' : '🏠'}
                </div>
                <button
                  onClick={() => setSelectedElement(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h2 className="text-2xl font-black text-white">{selectedElement.name}</h2>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>{selectedElement.pronunciation.phonetic}</span>
                    <button className="p-1 rounded-full hover:bg-white/20">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Level Selector */}
                <div className="flex flex-wrap gap-1">
                  {learningLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`px-2 py-1 text-xs rounded-full border transition-all ${
                        selectedLevel === level.id
                          ? 'border-purple-500 bg-purple-500/10 text-purple-600'
                          : 'border-[var(--border)]'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Description
                  </h3>
                  <p className="text-[var(--muted-foreground)]">
                    {selectedElement.description[selectedLevel]}
                  </p>
                </div>

                {/* History */}
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    History
                  </h3>
                  <p className="text-[var(--muted-foreground)]">
                    {selectedElement.history[selectedLevel]}
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-2">
                  {selectedElement.periods.map((period) => (
                    <span key={period} className="px-2 py-1 text-xs rounded-full bg-amber-500/10 text-amber-600">
                      {period.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {selectedElement.regions.map((region) => (
                    <span key={region} className="px-2 py-1 text-xs rounded-full bg-teal-500/10 text-teal-600">
                      {region.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>

                {/* Famous Examples */}
                {selectedElement.famousExamples.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Famous Examples
                    </h3>
                    <div className="space-y-2">
                      {selectedElement.famousExamples.map((example, i) => (
                        <div key={i} className="p-3 rounded-lg bg-[var(--muted)]">
                          <p className="font-semibold text-[var(--foreground)]">{example.name}</p>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            {example.location} • {example.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confusion Pairs */}
                {selectedElement.confusionPairs.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Often Confused With
                    </h3>
                    {selectedElement.confusionPairs.map((pair, i) => (
                      <div key={i} className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <p className="font-semibold text-purple-600">{pair.elementId}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{pair.reason}</p>
                        <p className="text-sm text-[var(--foreground)] mt-1">
                          <strong>Key difference:</strong> {pair.distinction}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
