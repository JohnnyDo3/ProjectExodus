'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { ArrowLeft, ScrollText, Download, Share2 } from 'lucide-react'
import Link from 'next/link'
import { exodologyCharter } from '@/data/exodology-founding'

export default function CharterPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white">
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
                <ScrollText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">{exodologyCharter.title}</h1>
                <p className="text-xl text-white/80">
                  {exodologyCharter.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 text-sm text-white/70">
              <span>Version {exodologyCharter.version}</span>
              <span>•</span>
              <span>Adopted {new Date(exodologyCharter.adoptedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Preamble */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2 border-[var(--border)] mb-8">
              <CardContent className="p-8">
                <h2 className="text-lg font-black text-[var(--foreground)] uppercase tracking-wider mb-4">
                  Preamble
                </h2>
                <div className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line text-lg italic">
                  {exodologyCharter.preamble}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Articles */}
          <div className="space-y-6">
            {exodologyCharter.articles.map((article, i) => (
              <motion.div
                key={article.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Card className="border border-[var(--border)]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                        {article.number}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-black text-[var(--foreground)] mb-3">
                          Article {article.number}: {article.title}
                        </h2>
                        <div className="text-[var(--muted-foreground)] leading-relaxed prose prose-sm max-w-none">
                          {article.content.split('\n\n').map((paragraph, pi) => (
                            <p key={pi} className="mb-3 last:mb-0 whitespace-pre-line">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + exodologyCharter.articles.length * 0.1 }}
          >
            <Card className="border-2 border-[var(--border)] mt-8">
              <CardContent className="p-8">
                <h2 className="text-lg font-black text-[var(--foreground)] uppercase tracking-wider mb-4">
                  Closing Statement
                </h2>
                <div className="text-[var(--muted-foreground)] leading-relaxed text-lg italic">
                  {exodologyCharter.closing}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Documents */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { href: '/exodology/about/timeline', title: 'Historical Timeline', desc: 'Evolution of the discipline' },
              { href: '/exodology/about/ethics', title: 'Ethics Guidelines', desc: 'Professional standards' },
              { href: '/exodology/about/style-guide', title: 'Style Guide', desc: 'Academic conventions' }
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <Link href={item.href}>
                  <Card className="border border-[var(--border)] hover:border-purple-500/50 transition-all cursor-pointer h-full">
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
