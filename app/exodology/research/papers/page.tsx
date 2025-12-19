'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, FileText, Download, Filter, Calendar, Users,
  ChevronDown, ChevronUp, Tag, CheckCircle, Clock, Edit
} from 'lucide-react'
import Link from 'next/link'
import { researchPapers, paperTypes, paperStatuses, ResearchPaper } from '@/data/exodology-papers'

const statusColors = {
  'draft': 'bg-gray-500/10 text-gray-600',
  'peer-review': 'bg-amber-500/10 text-amber-600',
  'published': 'bg-green-500/10 text-green-600',
  'archived': 'bg-slate-500/10 text-slate-600'
}

const statusIcons = {
  'draft': Edit,
  'peer-review': Clock,
  'published': CheckCircle,
  'archived': FileText
}

export default function ResearchPapersPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null)

  const filteredPapers = researchPapers.filter(paper => {
    if (selectedType && paper.type !== selectedType) return false
    if (selectedStatus && paper.status !== selectedStatus) return false
    return true
  })

  const featuredPapers = researchPapers.filter(p => p.featured)
  const totalDownloads = researchPapers.reduce((sum, p) => sum + (p.downloads || 0), 0)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 text-white">
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
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">Research Repository</h1>
                <p className="text-xl text-white/80">
                  Working papers, theses, and research documents
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{researchPapers.length}</div>
                <div className="text-sm text-white/70">Documents</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{featuredPapers.length}</div>
                <div className="text-sm text-white/70">Featured Papers</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{totalDownloads}</div>
                <div className="text-sm text-white/70">Total Downloads</div>
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

                {/* Type Filter */}
                <select
                  value={selectedType || ''}
                  onChange={(e) => setSelectedType(e.target.value || null)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] text-sm border border-[var(--border)]"
                >
                  <option value="">All types</option>
                  {Object.entries(paperTypes).map(([key, type]) => (
                    <option key={key} value={key}>{type.name}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus || ''}
                  onChange={(e) => setSelectedStatus(e.target.value || null)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--muted)]/50 text-[var(--foreground)] text-sm border border-[var(--border)]"
                >
                  <option value="">All statuses</option>
                  {Object.entries(paperStatuses).map(([key, status]) => (
                    <option key={key} value={key}>{status.name}</option>
                  ))}
                </select>

                {(selectedType || selectedStatus) && (
                  <button
                    onClick={() => { setSelectedType(null); setSelectedStatus(null); }}
                    className="text-sm text-[var(--primary)] hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Featured Papers */}
          {!selectedType && !selectedStatus && featuredPapers.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-black text-[var(--foreground)] mb-4">Featured Papers</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredPapers.map((paper, i) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusColors[paper.status]}`}>
                            {paperStatuses[paper.status].name}
                          </span>
                          <span className="text-xs text-[var(--muted-foreground)]">
                            {paperTypes[paper.type].name}
                          </span>
                        </div>
                        <h3 className="font-bold text-[var(--foreground)] mb-2 line-clamp-2">{paper.title}</h3>
                        <p className="text-sm text-[var(--muted-foreground)] mb-2">
                          {paper.authors.join(', ')}
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)] line-clamp-3">
                          {paper.abstract}
                        </p>
                        {paper.downloads && (
                          <div className="flex items-center gap-1 mt-3 text-sm text-purple-600">
                            <Download className="w-4 h-4" />
                            {paper.downloads} downloads
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* All Papers */}
          <section>
            <h2 className="text-xl font-black text-[var(--foreground)] mb-4">
              {selectedType || selectedStatus ? 'Filtered Papers' : 'All Papers'} ({filteredPapers.length})
            </h2>
            <div className="space-y-4">
              {filteredPapers.map((paper, i) => {
                const isExpanded = expandedPaper === paper.id
                const StatusIcon = statusIcons[paper.status]

                return (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.03 }}
                  >
                    <Card className="border border-[var(--border)]">
                      <CardContent className="p-0">
                        <button
                          onClick={() => setExpandedPaper(isExpanded ? null : paper.id)}
                          className="w-full p-5 text-left flex items-start gap-4"
                        >
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                            <StatusIcon className="w-5 h-5 text-purple-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusColors[paper.status]}`}>
                                {paperStatuses[paper.status].name}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded bg-[var(--muted)]/50 text-[var(--muted-foreground)]">
                                {paperTypes[paper.type].name}
                              </span>
                              <span className="text-xs text-[var(--muted-foreground)]">
                                {paper.year}
                              </span>
                            </div>
                            <h3 className="font-bold text-[var(--foreground)] mb-1">{paper.title}</h3>
                            <p className="text-sm text-[var(--muted-foreground)]">
                              {paper.authors.join(', ')}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 flex-shrink-0">
                            {paper.downloads && (
                              <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                {paper.downloads}
                              </span>
                            )}
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-[var(--muted-foreground)]" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)]" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-[var(--border)] p-5 space-y-4">
                            <div>
                              <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">Abstract</h4>
                              <p className="text-sm text-[var(--muted-foreground)]">{paper.abstract}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {paper.keywords.map(keyword => (
                                <span
                                  key={keyword}
                                  className="text-xs px-2 py-1 rounded bg-[var(--muted)]/50 text-[var(--muted-foreground)] flex items-center gap-1"
                                >
                                  <Tag className="w-3 h-3" />
                                  {keyword}
                                </span>
                              ))}
                            </div>
                            {paper.relatedPaths && paper.relatedPaths.length > 0 && (
                              <div>
                                <h4 className="text-sm font-bold text-[var(--foreground)] mb-2">Related Learning Paths</h4>
                                <div className="flex flex-wrap gap-2">
                                  {paper.relatedPaths.map(path => (
                                    <Link
                                      key={path}
                                      href={`/exodology/paths/${path}`}
                                      className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 transition-colors"
                                    >
                                      View Path
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="pt-2">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Download className="w-4 h-4" />
                                Download PDF
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* Submission CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-black text-[var(--foreground)] mb-4">
                  Contribute to Research
                </h3>
                <p className="text-[var(--muted-foreground)] mb-6 max-w-2xl mx-auto">
                  The Exodology research repository welcomes submissions of working papers,
                  case studies, and methodological contributions. All submissions undergo
                  peer review to maintain academic standards.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/exodology/about/style-guide">
                    <Button variant="outline">
                      View Style Guide
                    </Button>
                  </Link>
                  <Link href="/exodology/research/case-studies">
                    <Button variant="outline">
                      Case Study Template
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
