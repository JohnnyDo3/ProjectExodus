'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, BookOpen, FileText, Library, ScrollText, Users,
  Globe, ChevronRight, Search, Lightbulb, GraduationCap
} from 'lucide-react'
import Link from 'next/link'
import { caseStudies } from '@/data/exodology-case-studies'
import { bibliographyEntries, readingLists } from '@/data/exodology-bibliography'

const researchSections = [
  {
    id: 'case-studies',
    title: 'Case Study Library',
    description: 'Documented system transitions analyzed through the Exodological framework',
    icon: Library,
    count: caseStudies.length,
    href: '/exodology/research/case-studies',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'bibliography',
    title: 'Academic Bibliography',
    description: 'Curated reading lists connecting to established fields',
    icon: BookOpen,
    count: bibliographyEntries.length,
    href: '/exodology/research/bibliography',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'papers',
    title: 'Research Repository',
    description: 'Working papers, theses, and research documents',
    icon: FileText,
    count: 12,
    href: '/exodology/research/papers',
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600'
  }
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white">
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
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">Research Hub</h1>
                <p className="text-xl text-white/80">
                  Scholarly resources for the study of system transitions
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{caseStudies.length}</div>
                <div className="text-sm text-white/70">Case Studies</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{bibliographyEntries.length}</div>
                <div className="text-sm text-white/70">Bibliography Entries</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10">
                <div className="text-3xl font-black">{readingLists.length}</div>
                <div className="text-sm text-white/70">Reading Lists</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Research Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {researchSections.map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={section.href}>
                  <Card className="h-full border-2 border-[var(--border)] hover:border-[var(--primary)]/50 transition-all group cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4`}>
                        <section.icon className="w-7 h-7 text-white" />
                      </div>
                      <h2 className="text-xl font-black text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-[var(--muted-foreground)] text-sm mb-4">
                        {section.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[var(--primary)]">
                          {section.count} resources
                        </span>
                        <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Featured Case Studies */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-[var(--foreground)] flex items-center gap-2">
                <Library className="w-6 h-6 text-amber-500" />
                Featured Case Studies
              </h2>
              <Link href="/exodology/research/case-studies">
                <Button variant="outline" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudies.slice(0, 4).map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link href={`/exodology/research/case-studies/${study.id}`}>
                    <Card className="h-full border border-[var(--border)] hover:border-amber-500/50 transition-all cursor-pointer">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-2 py-1 rounded">
                            {study.category}
                          </span>
                          <span className="text-xs text-[var(--muted-foreground)]">
                            {study.location} • {study.duration}
                          </span>
                        </div>
                        <h3 className="font-bold text-[var(--foreground)] mb-1">{study.title}</h3>
                        <p className="text-sm text-[var(--muted-foreground)] mb-3">{study.subtitle}</p>
                        <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
                          {study.summary}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Reading Lists */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-[var(--foreground)] flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-teal-500" />
                Curated Reading Lists
              </h2>
              <Link href="/exodology/research/bibliography">
                <Button variant="outline" size="sm">
                  Full Bibliography <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {readingLists.slice(0, 6).map((list, i) => (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <Link href={`/exodology/research/bibliography#${list.id}`}>
                    <Card className="border border-[var(--border)] hover:border-teal-500/50 transition-all cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            list.level === 'foundational' ? 'bg-green-500/10 text-green-600' :
                            list.level === 'intermediate' ? 'bg-amber-500/10 text-amber-600' :
                            'bg-purple-500/10 text-purple-600'
                          }`}>
                            {list.level}
                          </span>
                        </div>
                        <h3 className="font-bold text-[var(--foreground)] text-sm mb-1">{list.name}</h3>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {list.entries.length} texts
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* About Exodology Links */}
          <section>
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <ScrollText className="w-6 h-6 text-purple-500" />
              Founding Documents
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: '/exodology/about/charter', title: 'Charter of Exodology', desc: 'Founding principles', icon: ScrollText },
                { href: '/exodology/about/timeline', title: 'Historical Timeline', desc: 'Evolution of the discipline', icon: Globe },
                { href: '/exodology/about/ethics', title: 'Ethics Guidelines', desc: 'Professional standards', icon: Users },
                { href: '/exodology/about/style-guide', title: 'Style Guide', desc: 'Academic conventions', icon: GraduationCap }
              ].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                >
                  <Link href={item.href}>
                    <Card className="border border-[var(--border)] hover:border-purple-500/50 transition-all cursor-pointer">
                      <CardContent className="p-4">
                        <item.icon className="w-8 h-8 text-purple-500 mb-2" />
                        <h3 className="font-bold text-[var(--foreground)] text-sm">{item.title}</h3>
                        <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
