'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Library, Filter, Globe, Clock, CheckCircle2,
  ChevronRight, Zap, Building, Leaf, Factory, Landmark, Cpu
} from 'lucide-react'
import Link from 'next/link'
import { caseStudies, caseStudyCategories } from '@/data/exodology-case-studies'

const categoryIcons = {
  energy: Zap,
  urban: Building,
  agricultural: Leaf,
  industrial: Factory,
  institutional: Landmark,
  technological: Cpu
}

const categoryColors = {
  energy: 'amber',
  urban: 'blue',
  agricultural: 'green',
  industrial: 'slate',
  institutional: 'purple',
  technological: 'cyan'
}

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedScale, setSelectedScale] = useState<string | null>(null)

  const filteredStudies = caseStudies.filter(study => {
    if (selectedCategory && study.category !== selectedCategory) return false
    if (selectedScale && study.scale !== selectedScale) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/exodology/research"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research Hub
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Library className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-black">Case Study Library</h1>
                <p className="text-white/80">
                  {caseStudies.length} documented system transitions analyzed through the Exodological framework
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-[var(--muted-foreground)]">
                <Filter className="w-4 h-4 inline mr-1" />
                Category:
              </span>
              <Button
                variant={selectedCategory === null ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {Object.entries(caseStudyCategories).map(([key, cat]) => {
                const Icon = categoryIcons[key as keyof typeof categoryIcons]
                return (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(key)}
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {cat.name}
                  </Button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-[var(--muted-foreground)]">
                <Globe className="w-4 h-4 inline mr-1" />
                Scale:
              </span>
              {['local', 'regional', 'national', 'global'].map(scale => (
                <Button
                  key={scale}
                  variant={selectedScale === scale ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedScale(selectedScale === scale ? null : scale)}
                >
                  {scale.charAt(0).toUpperCase() + scale.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-[var(--muted-foreground)] mb-6">
            Showing {filteredStudies.length} of {caseStudies.length} case studies
          </p>

          {/* Case Studies Grid */}
          <div className="space-y-6">
            {filteredStudies.map((study, i) => {
              const Icon = categoryIcons[study.category as keyof typeof categoryIcons] || Library
              const color = categoryColors[study.category as keyof typeof categoryColors] || 'gray'

              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/exodology/research/case-studies/${study.id}`}>
                    <Card className="border-2 border-[var(--border)] hover:border-[var(--primary)]/50 transition-all cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                          {/* Icon */}
                          <div className={`w-16 h-16 rounded-xl bg-${color}-500/10 flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-8 h-8 text-${color}-500`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-xs font-bold uppercase tracking-wider text-${color}-600 bg-${color}-500/10 px-2 py-1 rounded`}>
                                {study.category}
                              </span>
                              <span className="text-xs text-[var(--muted-foreground)] bg-[var(--muted)]/50 px-2 py-1 rounded">
                                {study.scale}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                study.status === 'completed' ? 'bg-green-500/10 text-green-600' :
                                study.status === 'ongoing' ? 'bg-amber-500/10 text-amber-600' :
                                'bg-blue-500/10 text-blue-600'
                              }`}>
                                {study.status}
                              </span>
                            </div>

                            <h2 className="text-xl font-black text-[var(--foreground)] mb-1">
                              {study.title}
                            </h2>
                            <p className="text-[var(--primary)] font-medium text-sm mb-2">
                              {study.subtitle}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)] mb-3">
                              <span className="flex items-center gap-1">
                                <Globe className="w-4 h-4" />
                                {study.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {study.duration}
                              </span>
                            </div>

                            <p className="text-[var(--muted-foreground)] line-clamp-2">
                              {study.summary}
                            </p>

                            {/* Key Lessons Preview */}
                            <div className="mt-4 flex flex-wrap gap-2">
                              {study.lessonsLearned.slice(0, 2).map((lesson, j) => (
                                <span
                                  key={j}
                                  className="text-xs bg-[var(--muted)]/50 text-[var(--muted-foreground)] px-2 py-1 rounded flex items-center gap-1"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  {lesson.length > 50 ? lesson.slice(0, 50) + '...' : lesson}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-6 h-6 text-[var(--muted-foreground)] hidden lg:block" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {filteredStudies.length === 0 && (
            <Card className="border-2 border-dashed border-[var(--border)]">
              <CardContent className="p-12 text-center">
                <Library className="w-16 h-16 mx-auto mb-4 text-[var(--muted-foreground)]" />
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">No case studies match your filters</h3>
                <p className="text-[var(--muted-foreground)] mb-4">Try adjusting your category or scale filters</p>
                <Button onClick={() => { setSelectedCategory(null); setSelectedScale(null); }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
