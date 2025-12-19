'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, BookOpen, Search, ExternalLink, ChevronDown, ChevronUp,
  Filter, FileText, Book, Newspaper
} from 'lucide-react'
import Link from 'next/link'
import { bibliographyEntries, readingLists, bibliographyTopics, BibliographyEntry, ReadingList } from '@/data/exodology-bibliography'

const typeIcons: Record<string, React.ElementType> = {
  book: Book,
  article: Newspaper,
  chapter: FileText,
  report: FileText,
  thesis: FileText,
  'working-paper': FileText
}

export default function BibliographyPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)
  const [expandedList, setExpandedList] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'entries' | 'lists'>('lists')

  const filteredEntries = bibliographyEntries.filter(entry => {
    if (selectedLevel && entry.level !== selectedLevel) return false
    if (selectedTopic && !entry.topics.includes(selectedTopic)) return false
    return true
  })

  const filteredLists = readingLists.filter(list => {
    if (selectedLevel && list.level !== selectedLevel) return false
    if (selectedTopic && !list.topics.includes(selectedTopic)) return false
    return true
  })

  const levels = ['foundational', 'intermediate', 'advanced']

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/exodology/research"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research Hub
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">Academic Bibliography</h1>
                <p className="text-xl text-white/80">
                  Foundational texts and curated reading lists for Exodological study
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{bibliographyEntries.length}</div>
                <div className="text-sm text-white/70">Bibliography Entries</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{readingLists.length}</div>
                <div className="text-sm text-white/70">Reading Lists</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{Object.keys(bibliographyTopics).length}</div>
                <div className="text-sm text-white/70">Topic Areas</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <Card className="border border-[var(--border)] mb-8">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">Filter:</span>
                </div>

                {/* Level Filter */}
                <div className="flex gap-2">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedLevel === level
                          ? level === 'foundational' ? 'bg-green-500 text-white' :
                            level === 'intermediate' ? 'bg-amber-500 text-white' :
                            'bg-purple-500 text-white'
                          : 'bg-[var(--muted)]/50 text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                {/* Topic Filter */}
                <select
                  value={selectedTopic || ''}
                  onChange={(e) => setSelectedTopic(e.target.value || null)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] text-sm border border-[var(--border)]"
                >
                  <option value="">All topics</option>
                  {Object.entries(bibliographyTopics).map(([key, topic]) => (
                    <option key={key} value={key}>{topic.name}</option>
                  ))}
                </select>

                {(selectedLevel || selectedTopic) && (
                  <button
                    onClick={() => { setSelectedLevel(null); setSelectedTopic(null); }}
                    className="text-sm text-[var(--primary)] hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('lists')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'lists'
                  ? 'bg-teal-500 text-white'
                  : 'bg-[var(--muted)]/50 text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
              }`}
            >
              Reading Lists ({filteredLists.length})
            </button>
            <button
              onClick={() => setActiveTab('entries')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'entries'
                  ? 'bg-teal-500 text-white'
                  : 'bg-[var(--muted)]/50 text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
              }`}
            >
              All Entries ({filteredEntries.length})
            </button>
          </div>

          {/* Reading Lists Tab */}
          {activeTab === 'lists' && (
            <div className="space-y-4">
              {filteredLists.map((list, i) => {
                const isExpanded = expandedList === list.id
                const listEntries = bibliographyEntries.filter(e => list.entries.includes(e.id))

                return (
                  <motion.div
                    key={list.id}
                    id={list.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="border border-[var(--border)]">
                      <CardContent className="p-0">
                        <button
                          onClick={() => setExpandedList(isExpanded ? null : list.id)}
                          className="w-full p-6 text-left flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                                list.level === 'foundational' ? 'bg-green-500/10 text-green-600' :
                                list.level === 'intermediate' ? 'bg-amber-500/10 text-amber-600' :
                                'bg-purple-500/10 text-purple-600'
                              }`}>
                                {list.level}
                              </span>
                              <span className="text-sm text-[var(--muted-foreground)]">
                                {list.entries.length} texts
                              </span>
                            </div>
                            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                              {list.name}
                            </h2>
                            <p className="text-[var(--muted-foreground)]">{list.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {list.topics.map(topic => (
                                <span
                                  key={topic}
                                  className="text-xs px-2 py-1 rounded bg-[var(--muted)]/50 text-[var(--muted-foreground)]"
                                >
                                  {bibliographyTopics[topic as keyof typeof bibliographyTopics]?.name || topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-[var(--muted-foreground)]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)]" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="border-t border-[var(--border)] p-6 space-y-4">
                            {listEntries.map(entry => (
                              <EntryCard key={entry.id} entry={entry} compact />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* All Entries Tab */}
          {activeTab === 'entries' && (
            <div className="space-y-4">
              {filteredEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <EntryCard
                    entry={entry}
                    expanded={expandedEntry === entry.id}
                    onToggle={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Topic Guide */}
          <section className="mt-16">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6">Topic Areas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(bibliographyTopics).map(([key, topic]) => {
                const count = bibliographyEntries.filter(e => e.topics.includes(key)).length
                return (
                  <button
                    key={key}
                    onClick={() => { setSelectedTopic(key); setActiveTab('entries'); }}
                    className="p-4 rounded-xl border border-[var(--border)] text-left hover:border-teal-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-[var(--foreground)]">{topic.name}</h3>
                      <span className="text-sm text-teal-600 font-medium">{count}</span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">{topic.description}</p>
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

// Entry Card Component
function EntryCard({ entry, expanded, onToggle, compact }: {
  entry: BibliographyEntry
  expanded?: boolean
  onToggle?: () => void
  compact?: boolean
}) {
  const TypeIcon = typeIcons[entry.type] || FileText

  if (compact) {
    return (
      <div className="p-4 rounded-lg bg-[var(--muted)]/30 border border-[var(--border)]">
        <div className="flex items-start gap-3">
          <TypeIcon className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[var(--foreground)] text-sm mb-1">{entry.title}</h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              {entry.authors.join(', ')} ({entry.year})
            </p>
            {entry.publication && (
              <p className="text-xs text-[var(--muted-foreground)] italic">{entry.publication}</p>
            )}
            <p className="text-sm text-[var(--muted-foreground)] mt-2 line-clamp-2">{entry.relevance}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="border border-[var(--border)]">
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="w-full p-5 text-left flex items-start gap-4"
        >
          <TypeIcon className="w-6 h-6 text-teal-500 mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                entry.level === 'foundational' ? 'bg-green-500/10 text-green-600' :
                entry.level === 'intermediate' ? 'bg-amber-500/10 text-amber-600' :
                'bg-purple-500/10 text-purple-600'
              }`}>
                {entry.level}
              </span>
              <span className="text-xs text-[var(--muted-foreground)] capitalize">{entry.type}</span>
            </div>
            <h3 className="font-bold text-[var(--foreground)] mb-1">{entry.title}</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              {entry.authors.join(', ')} ({entry.year})
            </p>
            {entry.publication && (
              <p className="text-sm text-[var(--muted-foreground)] italic">{entry.publication}</p>
            )}
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0" />
          )}
        </button>

        {expanded && (
          <div className="border-t border-[var(--border)] p-5 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">Abstract</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{entry.abstract}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">Relevance to Exodology</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{entry.relevance}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">Key Insights</h4>
              <ul className="space-y-1">
                {entry.keyInsights.map((insight, i) => (
                  <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                    <span className="text-teal-500 mt-1">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {entry.topics.map(topic => (
                <span
                  key={topic}
                  className="text-xs px-2 py-1 rounded bg-[var(--muted)]/50 text-[var(--muted-foreground)]"
                >
                  {bibliographyTopics[topic as keyof typeof bibliographyTopics]?.name || topic}
                </span>
              ))}
            </div>
            {(entry.doi || entry.url) && (
              <div className="flex gap-3 pt-2">
                {entry.doi && (
                  <a
                    href={`https://doi.org/${entry.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    DOI
                  </a>
                )}
                {entry.url && (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read Online
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
