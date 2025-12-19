'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, BookOpen, Pen, AlertCircle, FileText, Quote } from 'lucide-react'
import Link from 'next/link'
import { exodologyStyleGuide } from '@/data/exodology-founding'

const sectionIcons = [
  BookOpen,      // General Principles
  Pen,           // Key Terminology
  Quote,         // Citation Practices
  FileText,      // Case Study Writing
  GraduationCap, // Formatting Standards
  AlertCircle    // Avoiding Common Errors
]

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/exodology/research"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research Hub
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">{exodologyStyleGuide.title}</h1>
                <p className="text-xl text-white/80">
                  {exodologyStyleGuide.subtitle}
                </p>
              </div>
            </div>

            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              This guide establishes conventions for scholarly writing in Exodology,
              ensuring clarity, consistency, and academic rigor across all publications.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border border-[var(--border)] mb-12">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">Contents</h2>
                <nav className="grid sm:grid-cols-2 gap-2">
                  {exodologyStyleGuide.sections.map((section, i) => (
                    <a
                      key={section.title}
                      href={`#section-${i}`}
                      className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-amber-600 transition-colors"
                    >
                      <span className="w-6 h-6 rounded bg-amber-500/10 text-amber-600 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {section.title}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {exodologyStyleGuide.sections.map((section, i) => {
              const Icon = sectionIcons[i] || BookOpen
              return (
                <motion.div
                  key={section.title}
                  id={`section-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Card className="border border-[var(--border)] overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-5 border-b border-[var(--border)]">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-xl font-black text-[var(--foreground)]">
                            {i + 1}. {section.title}
                          </h2>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="prose prose-sm max-w-none text-[var(--muted-foreground)]">
                          {section.content.split('\n\n').map((paragraph, pi) => (
                            <div key={pi} className="mb-4 last:mb-0">
                              {paragraph.split('\n').map((line, li) => {
                                // Handle bold headers
                                if (line.startsWith('**') && line.includes('**:')) {
                                  const match = line.match(/\*\*(.+?)\*\*:(.*)/)
                                  if (match) {
                                    return (
                                      <p key={li} className="mb-2">
                                        <strong className="text-[var(--foreground)]">{match[1]}:</strong>
                                        {match[2]}
                                      </p>
                                    )
                                  }
                                }
                                // Handle numbered items
                                if (/^\d+\./.test(line)) {
                                  return (
                                    <p key={li} className="mb-2 ml-4">
                                      {line.replace(/\*\*(.+?)\*\*/g, (_, text) => text)}
                                    </p>
                                  )
                                }
                                return <p key={li} className="mb-2">{line}</p>
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Quick Reference Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-black text-[var(--foreground)] mb-4">
                  Quick Reference: Key Terms
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { term: 'Transition', def: 'Fundamental system transformation, not mere change' },
                    { term: 'Regime', def: 'The dominant, stable system configuration' },
                    { term: 'Niche', def: 'Protected space for alternative practices' },
                    { term: 'Landscape', def: 'Broader contextual factors beyond actor control' },
                    { term: 'Lock-in', def: 'System resistance to change from accumulated dependencies' },
                    { term: 'Stewardship', def: 'Intentional guidance of transitions' }
                  ].map((item) => (
                    <div key={item.term} className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      <span className="font-bold text-amber-600">{item.term}:</span>
                      <span className="text-sm text-[var(--muted-foreground)] ml-2">{item.def}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Documents */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: '/exodology/about/charter', title: 'Charter', desc: 'Founding principles' },
              { href: '/exodology/about/timeline', title: 'Timeline', desc: 'History of the discipline' },
              { href: '/exodology/about/ethics', title: 'Ethics Guidelines', desc: 'Professional standards' }
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.1 }}
              >
                <Link href={item.href}>
                  <Card className="border border-[var(--border)] hover:border-amber-500/50 transition-all cursor-pointer h-full">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-[var(--foreground)]">{item.title}</h3>
                      <p className="text-sm text-[var(--muted-foreground)]">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
