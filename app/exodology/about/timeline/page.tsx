'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { ArrowLeft, Globe, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { exodologyTimeline } from '@/data/exodology-founding'

const eraColors = [
  'from-slate-500 to-slate-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-blue-600'
]

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/exodology/research"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research Hub
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">{exodologyTimeline.title}</h1>
                <p className="text-xl text-white/80">
                  {exodologyTimeline.subtitle}
                </p>
              </div>
            </div>

            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              Exodology emerges from decades of scholarship across multiple disciplines.
              This timeline traces the intellectual lineage and key milestones in the development of the field.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 via-purple-300 to-cyan-300 dark:from-slate-600 dark:via-purple-600 dark:to-cyan-600" />

            {exodologyTimeline.eras.map((era, eraIndex) => (
              <motion.div
                key={era.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: eraIndex * 0.2 }}
                className="mb-16 last:mb-0"
              >
                {/* Era Header */}
                <div className={`relative flex items-center gap-4 mb-8 ${eraIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-gradient-to-br ${eraColors[eraIndex]} -translate-x-1/2 z-10 ring-4 ring-[var(--background)]`} />

                  <div className={`pl-20 md:pl-0 md:w-1/2 ${eraIndex % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-br ${eraColors[eraIndex]} text-white text-sm font-bold mb-2`}>
                      {era.period}
                    </div>
                    <h2 className="text-2xl font-black text-[var(--foreground)]">{era.name}</h2>
                    <p className="text-[var(--muted-foreground)] mt-1">{era.description}</p>
                  </div>
                </div>

                {/* Era Events */}
                <div className="space-y-4 pl-20 md:pl-0">
                  {era.events.map((event, eventIndex) => (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0, x: eraIndex % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: eraIndex * 0.2 + eventIndex * 0.1 }}
                      className={`relative ${eraIndex % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:text-right' : 'md:pl-[calc(50%+2rem)]'}`}
                    >
                      {/* Connection dot */}
                      <div className="absolute left-[-3rem] md:left-1/2 top-4 w-3 h-3 rounded-full bg-[var(--muted)] -translate-x-1/2 z-10" />

                      <Card className="border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all">
                        <CardContent className="p-4">
                          <div className={`flex items-start gap-3 ${eraIndex % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--muted)]/50 flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-[var(--muted-foreground)]" />
                            </div>
                            <div className={`flex-1 ${eraIndex % 2 === 0 ? 'md:text-right' : ''}`}>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`text-sm font-bold bg-gradient-to-r ${eraColors[eraIndex]} bg-clip-text text-transparent`}>
                                  {event.year}
                                </span>
                                <span className="font-bold text-[var(--foreground)]">{event.title}</span>
                              </div>
                              <p className="text-sm text-[var(--muted-foreground)]">{event.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-16"
          >
            <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-black text-[var(--foreground)] mb-4">
                  Be Part of the Story
                </h3>
                <p className="text-[var(--muted-foreground)] mb-6 max-w-2xl mx-auto">
                  Exodology is an emerging discipline, and its future is being written now.
                  Through study, practice, and contribution, you can help shape the next chapter.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/exodology/paths">
                    <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
                      Begin Learning <ChevronRight className="w-4 h-4 inline ml-1" />
                    </button>
                  </Link>
                  <Link href="/exodology/research/case-studies">
                    <button className="px-6 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-lg font-bold hover:border-cyan-500/50 transition-colors">
                      Explore Case Studies
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Documents */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: '/exodology/about/charter', title: 'Charter', desc: 'Founding principles' },
              { href: '/exodology/about/ethics', title: 'Ethics Guidelines', desc: 'Professional standards' },
              { href: '/exodology/about/style-guide', title: 'Style Guide', desc: 'Academic conventions' }
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.1 }}
              >
                <Link href={item.href}>
                  <Card className="border border-[var(--border)] hover:border-cyan-500/50 transition-all cursor-pointer h-full">
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
