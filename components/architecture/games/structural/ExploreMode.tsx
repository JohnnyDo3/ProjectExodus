'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List, X, ChevronRight, Check } from 'lucide-react'
import { getAllStructuralElements, STRUCTURAL_SETS, GameProps } from './shared'

export function ExploreMode({ onBack }: GameProps) {
  const allElements = useMemo(() => getAllStructuralElements(), [])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedElement, setSelectedElement] = useState<typeof allElements[0] | null>(null)

  // Filter elements based on search and category
  const filteredElements = useMemo(() => {
    let results = allElements

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(el =>
        el.name.toLowerCase().includes(query) ||
        el.categoryName.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory) {
      results = results.filter(el => el.category === selectedCategory)
    }

    return results
  }, [allElements, searchQuery, selectedCategory])

  // Get unique categories
  const categories = useMemo(() => {
    return STRUCTURAL_SETS.map(set => ({
      id: set.id,
      name: set.title,
      count: set.elements.length
    }))
  }, [])

  // Get element description from the comparison set's features
  const getElementDescription = (element: typeof allElements[0]) => {
    const set = STRUCTURAL_SETS.find(s => s.id === element.category)
    if (!set) return ''
    // Get the first feature's value for this element as a brief description
    const firstFeature = set.features[0]
    return firstFeature?.values?.[element.id] || set.subtitle || ''
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search structural elements..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View mode toggle */}
        <div className="flex gap-1 border border-border rounded-lg p-1 self-start">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-blue-600 text-white'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All ({allElements.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredElements.length} of {allElements.length} elements
      </p>

      {/* Elements Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredElements.map((element) => (
            <motion.button
              key={element.id}
              onClick={() => setSelectedElement(element)}
              className="group p-4 rounded-xl bg-muted/50 border-2 border-transparent hover:border-blue-500/50 hover:bg-muted transition-all text-left"
              whileHover={{ y: -2 }}
            >
              <div className="w-full aspect-square rounded-lg bg-background border border-border p-3 mb-3 group-hover:border-blue-500/30 transition-colors">
                <element.component showHalo={false} />
              </div>
              <h4 className="font-bold text-sm truncate group-hover:text-blue-500 transition-colors">
                {element.name}
              </h4>
              <p className="text-xs text-muted-foreground truncate">{element.categoryName}</p>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredElements.map((element) => (
            <motion.button
              key={element.id}
              onClick={() => setSelectedElement(element)}
              className="w-full group p-4 rounded-xl bg-muted/50 border-2 border-transparent hover:border-blue-500/50 hover:bg-muted transition-all text-left flex items-center gap-4"
              whileHover={{ x: 4 }}
            >
              <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-background border border-border p-2 group-hover:border-blue-500/30 transition-colors">
                <element.component showHalo={false} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold group-hover:text-blue-500 transition-colors">
                  {element.name}
                </h4>
                <p className="text-sm text-muted-foreground truncate">{element.categoryName}</p>
                <p className="text-xs text-muted-foreground/70 truncate mt-1">
                  {getElementDescription(element)}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filteredElements.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="font-bold text-lg mb-2">No elements found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Element Detail Modal */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedElement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl border border-border shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-blue-500 font-medium mb-1">
                      {selectedElement.categoryName}
                    </p>
                    <h2 className="text-2xl font-black">{selectedElement.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedElement(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Large SVG display */}
                <div className="w-full aspect-square max-w-xs mx-auto rounded-2xl bg-background border-4 border-blue-500/20 p-6 mb-6">
                  <selectedElement.component showHalo={true} />
                </div>

                {/* Element info from features */}
                <div className="space-y-4">
                  {(() => {
                    const set = STRUCTURAL_SETS.find(s => s.id === selectedElement.category)
                    if (!set) return null

                    // Get features for this element
                    const elementFeatures = set.features.map(feature => ({
                      label: feature.label,
                      value: feature.values[selectedElement.id],
                      highlighted: feature.highlighted
                    })).filter(f => f.value)

                    return (
                      <>
                        {/* Set description as intro */}
                        {set.description && (
                          <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <p className="text-sm text-muted-foreground">{set.description}</p>
                          </div>
                        )}

                        {/* Features list */}
                        {elementFeatures.length > 0 && (
                          <div>
                            <h4 className="font-bold text-sm text-muted-foreground mb-3">Characteristics</h4>
                            <div className="space-y-3">
                              {elementFeatures.map((feature, i) => (
                                <div
                                  key={i}
                                  className={`p-3 rounded-lg ${feature.highlighted ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-muted/30'}`}
                                >
                                  <p className="text-xs font-bold text-muted-foreground mb-1">{feature.label}</p>
                                  <p className="text-sm">{feature.value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border bg-muted/30">
                <button
                  onClick={() => setSelectedElement(null)}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
