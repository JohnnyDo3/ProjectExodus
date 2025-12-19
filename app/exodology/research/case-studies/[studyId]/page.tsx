'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Globe, Clock, Users, Target, TrendingUp,
  AlertTriangle, CheckCircle2, Lightbulb, BookOpen, ChevronRight,
  Download, Share2, Zap
} from 'lucide-react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { caseStudies } from '@/data/exodology-case-studies'

export default function CaseStudyPage() {
  const params = useParams()
  const studyId = params.studyId as string

  const study = caseStudies.find(s => s.id === studyId)

  if (!study) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="py-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/exodology/research/case-studies"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Case Studies
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded">
                {study.category}
              </span>
              <span className="text-xs bg-white/10 px-2 py-1 rounded">
                {study.scale}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                study.status === 'completed' ? 'bg-green-500/30' :
                study.status === 'ongoing' ? 'bg-amber-500/30' :
                'bg-blue-500/30'
              }`}>
                {study.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black mb-2">{study.title}</h1>
            <p className="text-xl text-white/90 mb-4">{study.subtitle}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {study.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {study.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {study.contributors.length} contributors
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Summary */}
          <Card className="border-2 border-[var(--border)] mb-8">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-black text-[var(--foreground)] mb-4">Summary</h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                {study.summary}
              </p>
            </CardContent>
          </Card>

          {/* Context & Background */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[var(--primary)]" />
              Context & Background
            </h2>

            <div className="space-y-6">
              <Card className="border border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Historical Background</h3>
                  <p className="text-[var(--muted-foreground)]">{study.context.background}</p>
                </CardContent>
              </Card>

              <Card className="border border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Initial System Configuration</h3>
                  <p className="text-[var(--muted-foreground)]">{study.context.initialSystem}</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-[var(--border)]">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Pressures
                    </h3>
                    <ul className="space-y-2">
                      {study.context.pressures.map((pressure, i) => (
                        <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                          {pressure}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-[var(--border)]">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      Key Stakeholders
                    </h3>
                    <ul className="space-y-2">
                      {study.context.stakeholders.map((stakeholder, i) => (
                        <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          {stakeholder}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Exodological Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-500" />
              Exodological Analysis
            </h2>

            <Card className="border-2 border-purple-500/30 bg-purple-500/5 mb-6">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2">Transition Type</h3>
                    <p className="text-[var(--foreground)] font-medium">{study.exodologicalAnalysis.transitionType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2">Phase Identification</h3>
                    <p className="text-[var(--muted-foreground)] text-sm">{study.exodologicalAnalysis.phaseIdentification}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    Key Mechanisms
                  </h3>
                  <ul className="space-y-2">
                    {study.exodologicalAnalysis.keyMechanisms.map((mechanism, i) => (
                      <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {mechanism}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-[var(--border)]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    Resistance Patterns
                  </h3>
                  <ul className="space-y-2">
                    {study.exodologicalAnalysis.resistancePatterns.map((pattern, i) => (
                      <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-[var(--border)] mt-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Catalytic Events
                </h3>
                <div className="space-y-3">
                  {study.exodologicalAnalysis.catalyticEvents.map((event, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-[var(--muted-foreground)]">{event}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Implementation Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-teal-500" />
              Implementation
            </h2>

            <Card className="border border-[var(--border)] mb-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-3">Approach</h3>
                <p className="text-[var(--muted-foreground)]">{study.implementation.approach}</p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {study.implementation.timeline.map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    {i < study.implementation.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-teal-500/30 my-2" />
                    )}
                  </div>
                  <Card className="flex-1 border border-[var(--border)]">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-bold text-[var(--foreground)]">{phase.phase}</h4>
                        <span className="text-xs text-[var(--muted-foreground)] bg-[var(--muted)]/50 px-2 py-0.5 rounded">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)]">{phase.activities}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Outcomes */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              Outcomes
            </h2>

            {/* Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {study.outcomes.metrics.map((metric, i) => (
                <Card key={i} className="border border-[var(--border)]">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1">{metric.label}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-red-500 line-through">{metric.before}</span>
                      <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)]" />
                      <span className="text-sm font-bold text-green-600">{metric.after}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-green-500/30 bg-green-500/5">
                <CardContent className="p-6">
                  <h3 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Successes
                  </h3>
                  <ul className="space-y-2">
                    {study.outcomes.successes.map((success, i) => (
                      <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {success}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-6">
                  <h3 className="font-bold text-amber-600 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Limitations
                  </h3>
                  <ul className="space-y-2">
                    {study.outcomes.limitations.map((limitation, i) => (
                      <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Lessons Learned */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              Lessons Learned
            </h2>

            <Card className="border-2 border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {study.lessonsLearned.map((lesson, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)]"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-[var(--muted-foreground)]">{lesson}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Implications */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6">Broader Implications</h2>
            <Card className="border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5">
              <CardContent className="p-6">
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {study.implications}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* References */}
          <section className="mb-12">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[var(--primary)]" />
              References
            </h2>
            <Card className="border border-[var(--border)]">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {study.references.map((ref, i) => (
                    <li key={i} className="text-sm text-[var(--muted-foreground)]">
                      <span className="text-[var(--foreground)]">{ref.author}</span> ({ref.year}).{' '}
                      <em>{ref.title}</em>.{' '}
                      <span className="text-xs text-[var(--muted-foreground)]">[{ref.type}]</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Contributors & Meta */}
          <Card className="border border-[var(--border)]">
            <CardContent className="p-6">
              <div className="flex flex-wrap justify-between gap-4 text-sm text-[var(--muted-foreground)]">
                <div>
                  <span className="font-bold text-[var(--foreground)]">Contributors:</span>{' '}
                  {study.contributors.join(', ')}
                </div>
                <div>
                  <span className="font-bold text-[var(--foreground)]">Last Updated:</span>{' '}
                  {new Date(study.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
