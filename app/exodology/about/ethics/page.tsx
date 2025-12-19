'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Shield, Scale, AlertTriangle, Heart, Eye, GraduationCap, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { exodologyEthics } from '@/data/exodology-founding'

const principleIcons = [
  Eye,       // Informed Engagement
  Scale,     // Distributive Justice
  Users,     // Procedural Justice
  AlertTriangle, // Precaution
  Shield,    // Systemic Responsibility
  Heart,     // Intellectual Honesty
  GraduationCap  // Professional Competence
]

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-16 bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 text-white">
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
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black">{exodologyEthics.title}</h1>
                <p className="text-xl text-white/80">
                  {exodologyEthics.subtitle}
                </p>
              </div>
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
            <Card className="border-2 border-rose-500/30 bg-gradient-to-br from-rose-500/5 to-pink-500/5 mb-12">
              <CardContent className="p-8">
                <p className="text-lg text-[var(--muted-foreground)] italic leading-relaxed">
                  {exodologyEthics.preamble}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Principles */}
          <h2 className="text-2xl font-black text-[var(--foreground)] mb-6">Core Ethical Principles</h2>
          <div className="space-y-6 mb-12">
            {exodologyEthics.principles.map((principle, i) => {
              const Icon = principleIcons[i] || Shield
              return (
                <motion.div
                  key={principle.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Card className="border border-[var(--border)] overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 p-5 border-b border-[var(--border)]">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[var(--foreground)]">{principle.name}</h3>
                            <p className="text-[var(--muted-foreground)]">{principle.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-3">
                          Guidelines
                        </h4>
                        <ul className="space-y-2">
                          {principle.guidelines.map((guideline, gi) => (
                            <li key={gi} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                              <span className="text-[var(--muted-foreground)]">{guideline}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Conflict Resolution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="border border-[var(--border)] mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
                  {exodologyEthics.conflictResolution.title}
                </h3>
                <div className="text-[var(--muted-foreground)] prose prose-sm max-w-none">
                  {exodologyEthics.conflictResolution.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-3 last:mb-0 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enforcement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="border border-[var(--border)]">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
                  {exodologyEthics.enforcement.title}
                </h3>
                <div className="text-[var(--muted-foreground)] prose prose-sm max-w-none">
                  {exodologyEthics.enforcement.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-3 last:mb-0 whitespace-pre-line">
                      {paragraph}
                    </p>
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
              { href: '/exodology/about/style-guide', title: 'Style Guide', desc: 'Academic conventions' }
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <Link href={item.href}>
                  <Card className="border border-[var(--border)] hover:border-rose-500/50 transition-all cursor-pointer h-full">
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
