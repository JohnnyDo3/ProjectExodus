'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Search, BookOpen, Layers, Settings, Users, Scale,
  ChevronDown, ChevronUp, ExternalLink, Hash
} from 'lucide-react'
import Link from 'next/link'
import { glossaryTerms, glossaryCategories, GlossaryTerm } from '@/data/exodology-glossary'

const categoryIcons: Record<string, React.ElementType> = {
  'core': BookOpen,
  'framework': Layers,
  'systems': Settings,
  'practice': Users,
  'governance': Users,
  'justice': Scale
}

const levelColors = {
  'foundational': 'bg-green-500/10 text-green-600 border-green-500/30',
  'intermediate': 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  'advanced': 'bg-purple-500/10 text-purple-600 border-purple-500/30'
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  // Group terms alphabetically
  const groupedTerms = useMemo(() => {
    let filtered = glossaryTerms

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(t =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }

    if (selectedLevel) {
      filtered = filtered.filter(t => t.level === selectedLevel)
    }

    // Group by first letter
    const grouped: Record<string, GlossaryTerm[]> = {}
    filtered.forEach(term => {
      const letter = term.term[0].toUpperCase()
      if (!grouped[letter]) grouped[letter] = []
      grouped[letter].push(term)
    })

    // Sort each group alphabetically
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.term.localeCompare(b.term))
    })

    return grouped
  }, [searchQuery, selectedCategory, selectedLevel])

  const alphabet = Object.keys(groupedTerms).sort()
  const totalTerms = Object.values(groupedTerms).flat().length

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/exodology"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exodology
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">Glossary</h1>
                <p className="text-xl text-white/80">
                  Essential terminology for the science of transitions
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{glossaryTerms.length}</div>
                <div className="text-sm text-white/70">Terms</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{Object.keys(glossaryCategories).length}</div>
                <div className="text-sm text-white/70">Categories</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">3</div>
                <div className="text-sm text-white/70">Levels</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>

              {/* Alphabet Index */}
              <Card className="border border-[var(--border)]">
                <CardContent className="p-4">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Jump to</h3>
                  <div className="flex flex-wrap gap-1">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
                      const hasTerms = groupedTerms[letter]?.length > 0
                      return (
                        <button
                          key={letter}
                          onClick={() => hasTerms && scrollToLetter(letter)}
                          disabled={!hasTerms}
                          className={`w-7 h-7 rounded text-sm font-bold transition-colors ${
                            hasTerms
                              ? 'bg-teal-500/10 text-teal-600 hover:bg-teal-500/20'
                              : 'bg-[var(--muted)]/30 text-[var(--muted-foreground)]/50 cursor-not-allowed'
                          }`}
                        >
                          {letter}
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="border border-[var(--border)]">
                <CardContent className="p-4">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Categories</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === null
                          ? 'bg-teal-500 text-white'
                          : 'hover:bg-[var(--muted)]/50 text-[var(--muted-foreground)]'
                      }`}
                    >
                      All Categories
                    </button>
                    {Object.entries(glossaryCategories).map(([key, cat]) => {
                      const count = glossaryTerms.filter(t => t.category === key).length
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedCategory(key)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                            selectedCategory === key
                              ? 'bg-teal-500 text-white'
                              : 'hover:bg-[var(--muted)]/50 text-[var(--muted-foreground)]'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs opacity-70">{count}</span>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Levels */}
              <Card className="border border-[var(--border)]">
                <CardContent className="p-4">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Complexity Level</h3>
                  <div className="space-y-2">
                    {['foundational', 'intermediate', 'advanced'].map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          selectedLevel === level
                            ? levelColors[level as keyof typeof levelColors]
                            : 'border-[var(--border)] hover:border-teal-500/30 text-[var(--muted-foreground)]'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Terms List */}
            <div className="lg:col-span-3">
              {/* Active filters */}
              {(searchQuery || selectedCategory || selectedLevel) && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-[var(--muted-foreground)]">
                    Showing {totalTerms} {totalTerms === 1 ? 'term' : 'terms'}
                  </span>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory(null)
                      setSelectedLevel(null)
                    }}
                    className="text-sm text-teal-600 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {/* Terms by letter */}
              {alphabet.length > 0 ? (
                <div className="space-y-8">
                  {alphabet.map(letter => (
                    <div key={letter} id={`letter-${letter}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-black text-lg">
                          {letter}
                        </div>
                        <div className="flex-1 h-px bg-[var(--border)]" />
                      </div>

                      <div className="space-y-3">
                        {groupedTerms[letter].map((term, i) => {
                          const isExpanded = expandedTerm === term.id
                          const CategoryIcon = categoryIcons[term.category] || BookOpen

                          return (
                            <motion.div
                              key={term.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.02 }}
                            >
                              <Card className="border border-[var(--border)]">
                                <CardContent className="p-0">
                                  <button
                                    onClick={() => setExpandedTerm(isExpanded ? null : term.id)}
                                    className="w-full p-4 text-left flex items-start gap-4"
                                  >
                                    <div className="w-10 h-10 rounded-lg bg-[var(--muted)]/50 flex items-center justify-center flex-shrink-0">
                                      <CategoryIcon className="w-5 h-5 text-teal-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 className="font-bold text-[var(--foreground)]">{term.term}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded border ${levelColors[term.level]}`}>
                                          {term.level}
                                        </span>
                                      </div>
                                      <p className={`text-sm text-[var(--muted-foreground)] ${isExpanded ? '' : 'line-clamp-2'}`}>
                                        {term.definition}
                                      </p>
                                    </div>
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0" />
                                    )}
                                  </button>

                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="p-4 pt-0 border-t border-[var(--border)] space-y-4">
                                          {/* Full definition */}
                                          <div>
                                            <p className="text-[var(--muted-foreground)]">{term.definition}</p>
                                          </div>

                                          {/* Examples */}
                                          {term.examples && term.examples.length > 0 && (
                                            <div>
                                              <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">Examples</h4>
                                              <ul className="space-y-1">
                                                {term.examples.map((example, ei) => (
                                                  <li key={ei} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                                                    <span className="text-teal-500 mt-1">•</span>
                                                    {example}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}

                                          {/* Related terms */}
                                          {term.seeAlso && term.seeAlso.length > 0 && (
                                            <div>
                                              <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">See Also</h4>
                                              <div className="flex flex-wrap gap-2">
                                                {term.seeAlso.map(relatedId => {
                                                  const relatedTerm = glossaryTerms.find(t => t.id === relatedId)
                                                  if (!relatedTerm) return null
                                                  return (
                                                    <button
                                                      key={relatedId}
                                                      onClick={(e) => {
                                                        e.stopPropagation()
                                                        setExpandedTerm(relatedId)
                                                        // Scroll to the term
                                                        setTimeout(() => {
                                                          const letter = relatedTerm.term[0].toUpperCase()
                                                          scrollToLetter(letter)
                                                        }, 100)
                                                      }}
                                                      className="text-sm px-3 py-1 rounded-lg bg-teal-500/10 text-teal-600 hover:bg-teal-500/20 transition-colors flex items-center gap-1"
                                                    >
                                                      <Hash className="w-3 h-3" />
                                                      {relatedTerm.term}
                                                    </button>
                                                  )
                                                })}
                                              </div>
                                            </div>
                                          )}

                                          {/* Category */}
                                          <div className="pt-2 flex items-center gap-2">
                                            <span className="text-xs text-[var(--muted-foreground)]">Category:</span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-[var(--muted)]/50 text-[var(--muted-foreground)]">
                                              {glossaryCategories[term.category as keyof typeof glossaryCategories]?.name}
                                            </span>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="border border-[var(--border)]">
                  <CardContent className="p-8 text-center">
                    <Search className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-4" />
                    <h3 className="font-bold text-[var(--foreground)] mb-2">No terms found</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Try adjusting your search or filters.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
