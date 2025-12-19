'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  Compass, Map, Target, BookOpen, Droplet, Zap, Wheat,
  ChevronRight, Award, CheckCircle2, Lock, ArrowRight,
  Users, Globe, Shield, Layers, GitBranch, Scale
} from 'lucide-react'
import Link from 'next/link'

// Exodology learning paths data
const exodologyPaths = [
  {
    id: 'foundations',
    title: 'FOUNDATIONS OF EXODOLOGY',
    subtitle: 'Exodological Literacy',
    description: 'Understanding exit as a social, ethical, and systems-level phenomenon, especially where sustainability efforts reach structural limits.',
    level: 'Beginner',
    duration: '4 weeks',
    modules: 8,
    icon: Compass,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-600',
    topics: [
      'Exit vs reform vs collapse',
      'Why people leave systems',
      'Historical and modern exoduses',
      'Food, water, and energy system failures',
      'Ethics of departure'
    ]
  },
  {
    id: 'applied',
    title: 'APPLIED EXODOLOGY',
    subtitle: 'Exodological Application',
    description: 'Designing and evaluating exit-capable systems, with emphasis on decentralized food, water, and energy solutions.',
    level: 'Intermediate',
    duration: '6 weeks',
    modules: 12,
    icon: Map,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    textColor: 'text-teal-600',
    topics: [
      'Designing exit-ready systems',
      'Decentralized food networks',
      'Water autonomy models',
      'Microgrids and energy independence',
      'Managing partial exits'
    ]
  },
  {
    id: 'strategic',
    title: 'STRATEGIC EXODOLOGY',
    subtitle: 'Exodological Stewardship',
    description: 'Guiding large-scale, ethical transitions and policy-aware exits without causing instability or harm.',
    level: 'Expert',
    duration: '8 weeks',
    modules: 16,
    icon: Target,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-600',
    topics: [
      'Scaling exits without collapse',
      'Exit-compatible governance',
      'Managing backlash and risk',
      'Equity and access',
      'Measuring successful transitions'
    ]
  }
]

// Trinity pillars
const trinityPillars = [
  { name: 'Literacy', icon: BookOpen, description: 'Understanding why systems fail' },
  { name: 'Application', icon: Layers, description: 'Building exit-capable alternatives' },
  { name: 'Stewardship', icon: Shield, description: 'Leading ethical transitions' }
]

export default function ExodologyPage() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated' && !!session?.user
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[var(--background)] to-purple-900/20" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--muted)] border border-[var(--border)] mb-6"
            >
              <GitBranch className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-[var(--foreground)]">Advanced Discipline</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500 bg-clip-text text-transparent"
            >
              EXODOLOGY
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl font-semibold text-[var(--muted-foreground)] mb-8"
            >
              The Science of Ethical Exits
            </motion.p>

            {/* Philosophy statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-2xl mx-auto mb-12"
            >
              <div className="absolute -left-4 top-0 text-4xl text-amber-500/30">"</div>
              <p className="text-lg text-[var(--foreground)] italic px-8">
                Sustainability focuses on improving systems. Exodology focuses on designing ethical exits from systems that no longer serve people or the planet.
              </p>
              <div className="absolute -right-4 bottom-0 text-4xl text-purple-500/30">"</div>
            </motion.div>

            {/* Key focus areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {[
                { icon: Wheat, label: 'Food Systems', color: 'text-amber-500' },
                { icon: Droplet, label: 'Water Systems', color: 'text-teal-500' },
                { icon: Zap, label: 'Energy Systems', color: 'text-purple-500' }
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--border)]">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="font-semibold text-[var(--foreground)]">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Relationship to Sustainability */}
      <section className="py-16 bg-[var(--muted)]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sustainability */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-[var(--card)] border-2 border-[var(--primary)]/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-xl font-black text-[var(--foreground)]">Sustainability</h3>
                </div>
                <p className="text-[var(--muted-foreground)] mb-4">
                  Focuses on <strong className="text-[var(--foreground)]">improving and maintaining</strong> existing systems to reduce harm and increase efficiency.
                </p>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                    Reform from within
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                    Incremental improvement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                    System optimization
                  </li>
                </ul>
              </motion.div>

              {/* Exodology */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-[var(--card)] border-2 border-amber-500/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Compass className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-black text-[var(--foreground)]">Exodology</h3>
                </div>
                <p className="text-[var(--muted-foreground)] mb-4">
                  Focuses on <strong className="text-[var(--foreground)]">designing ethical transitions</strong> away from systems that have reached their structural limits.
                </p>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    Strategic departure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    Building alternatives
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    System transcendence
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-[var(--muted-foreground)] mt-8"
            >
              <strong className="text-[var(--foreground)]">Exodology complements sustainability</strong> by providing frameworks for when reform is no longer viable.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trinity Certification Visual */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4"
            >
              THE EXODOLOGY TRINITY
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto"
            >
              Master all three pillars to earn your Certified Exodologist credential
            </motion.p>
          </div>

          {/* Trinity Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-lg mx-auto mb-16"
          >
            {/* Triangle connecting lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 350" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="trinityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="rgb(20, 184, 166)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {/* Triangle */}
              <path
                d="M200 50 L350 280 L50 280 Z"
                fill="none"
                stroke="url(#trinityGradient)"
                strokeWidth="3"
                strokeDasharray="10,5"
              />
              {/* Center circle */}
              <circle cx="200" cy="190" r="40" fill="url(#trinityGradient)" opacity="0.2" />
            </svg>

            {/* Pillar nodes */}
            <div className="relative h-[350px]">
              {/* Top - Literacy */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <span className="mt-2 font-bold text-amber-500">Literacy</span>
              </motion.div>

              {/* Bottom Left - Application */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-0 left-8 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Layers className="w-10 h-10 text-white" />
                </div>
                <span className="mt-2 font-bold text-teal-500">Application</span>
              </motion.div>

              {/* Bottom Right - Stewardship */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-0 right-8 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <span className="mt-2 font-bold text-purple-500">Stewardship</span>
              </motion.div>

              {/* Center - Certification */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 via-teal-500 to-purple-500 flex items-center justify-center shadow-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <span className="mt-2 text-sm font-bold text-[var(--foreground)]">Certified</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-[var(--muted)]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4"
            >
              EXODOLOGY LEARNING PATHS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto"
            >
              Three structured courses that build upon each other
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {exodologyPaths.map((path, index) => {
              const Icon = path.icon
              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  onMouseEnter={() => setHoveredPath(path.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  <Link href={`/exodology/paths/${path.id}`}>
                    <Card className={`h-full border-2 ${path.borderColor} hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}>
                      {/* Header gradient */}
                      <div className={`h-2 bg-gradient-to-r ${path.color}`} />

                      <CardContent className="p-6">
                        {/* Icon and level */}
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            animate={hoveredPath === path.id ? { rotate: [0, -10, 10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <span className={`text-xs font-bold uppercase tracking-wide ${path.textColor} px-3 py-1 rounded-full ${path.bgColor}`}>
                            {path.level}
                          </span>
                        </div>

                        {/* Title and subtitle */}
                        <h3 className="text-lg font-black text-[var(--foreground)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                          {path.title}
                        </h3>
                        <p className={`text-sm font-semibold ${path.textColor} mb-3`}>
                          {path.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-3">
                          {path.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4 text-xs text-[var(--muted-foreground)]">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {path.modules} modules
                          </span>
                          <span>{path.duration}</span>
                        </div>

                        {/* Topics preview */}
                        <div className="space-y-1.5 mb-4">
                          {path.topics.slice(0, 3).map((topic, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${path.textColor}`} />
                              <span>{topic}</span>
                            </div>
                          ))}
                          {path.topics.length > 3 && (
                            <span className="text-xs text-[var(--muted-foreground)] pl-5">
                              +{path.topics.length - 3} more topics
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <div className={`flex items-center gap-2 font-bold ${path.textColor} group-hover:gap-3 transition-all`}>
                          <span>Explore Path</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-4 border-amber-500/50 bg-gradient-to-br from-amber-500/10 via-[var(--card)] to-purple-500/10 overflow-hidden">
              <CardContent className="p-8 sm:p-12 text-center">
                {/* Badge */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 via-teal-500 to-purple-500 flex items-center justify-center shadow-2xl"
                >
                  <Award className="w-12 h-12 text-white" />
                </motion.div>

                <h3 className="text-3xl font-black text-[var(--foreground)] mb-2">
                  CERTIFIED EXODOLOGIST
                </h3>
                <p className="text-lg text-[var(--muted-foreground)] mb-6">
                  The Exodology Trinity Certification
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {trinityPillars.map(({ name, icon: Icon, description }) => (
                    <div key={name} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--muted)] border border-[var(--border)]">
                      <Icon className="w-4 h-4 text-[var(--primary)]" />
                      <span className="font-semibold text-[var(--foreground)]">{name}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[var(--muted-foreground)] mb-8 max-w-xl mx-auto">
                  Complete all three Exodology learning paths to earn your certification badge,
                  downloadable certificate, and unlock advanced community features.
                </p>

                {isAuthenticated ? (
                  <Link href="/exodology/paths/foundations">
                    <Button size="lg" className="font-bold text-lg px-8 py-6 bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600">
                      Begin Your Journey
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <Button size="lg" className="font-bold text-lg px-8 py-6">
                      Sign In to Start
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Cross-link to Sustainability */}
      <section className="py-12 bg-[var(--muted)]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--muted-foreground)] mb-4">
              New to sustainability concepts?
            </p>
            <Link href="/learn" className="inline-flex items-center gap-2 text-[var(--primary)] font-bold hover:underline">
              Start with our Sustainability Learning Paths
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
