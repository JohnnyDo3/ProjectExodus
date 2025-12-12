'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CompactLiveImpactStats } from '@/components/learn/CompactLiveImpactStats'
import { TreeBranches } from '@/components/decorative/TreeBranches'
import { FlyingBirds } from '@/components/decorative/FlyingBirds'
import { LearningLevel, LEARNING_LEVELS, LEARNING_LEVEL_ORDER } from '@/types/learning'
import {
  BookOpen, Calculator, Download, Zap, Leaf,
  GraduationCap, Clock, ChevronRight,
  Lightbulb, Play, FileText, Droplet,
  Recycle, Home, Sprout, Globe
} from 'lucide-react'
import Link from 'next/link'
import type { TopicProgress } from '@/app/api/learn/topic-progress/route'
import type { CoreTopic } from '@/data/modules'

export default function LearnPage() {
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>('HIGH_SCHOOL')
  const [topicProgress, setTopicProgress] = useState<Map<CoreTopic, TopicProgress>>(new Map())

  // Fetch topic progress on mount
  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch('/api/learn/topic-progress')
        const data = await response.json()
        if (data.success && Array.isArray(data.data)) {
          const progressMap = new Map<CoreTopic, TopicProgress>()
          data.data.forEach((p: TopicProgress) => {
            progressMap.set(p.topicId, p)
          })
          setTopicProgress(progressMap)
        }
      } catch (error) {
        console.error('Failed to fetch topic progress:', error)
      }
    }
    fetchProgress()
  }, [])
  // Auto-scroll handlers
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const learningPaths = [
    {
      id: 'beginner',
      title: 'SUSTAINABILITY 101',
      subtitle: 'Start Your Journey',
      description: 'Perfect for newcomers. Learn the fundamentals of sustainable living, understand key concepts, and take your first steps toward a greener lifestyle.',
      level: 'Beginner',
      duration: '4 weeks',
      modules: 8,
      color: 'moss',
      icon: Sprout,
      topics: ['Basic Concepts', 'Carbon Footprint', 'Daily Habits', 'Waste Reduction']
    },
    {
      id: 'intermediate',
      title: 'HOME & LIFESTYLE',
      subtitle: 'Transform Your Space',
      description: 'Ready to level up? Dive into sustainable home practices, energy efficiency, water conservation, and creating an eco-friendly living environment.',
      level: 'Intermediate',
      duration: '6 weeks',
      modules: 12,
      color: 'ocean',
      icon: Home,
      topics: ['Energy Efficiency', 'Water Systems', 'Green Cleaning', 'Sustainable Design']
    },
    {
      id: 'advanced',
      title: 'SYSTEMS THINKING',
      subtitle: 'Lead The Change',
      description: 'For committed changemakers. Explore regenerative systems, community organizing, policy advocacy, and building sustainable infrastructure.',
      level: 'Advanced',
      duration: '8 weeks',
      modules: 16,
      color: 'terra',
      icon: Globe,
      topics: ['Regenerative Design', 'Community Building', 'Policy & Advocacy', 'Systems Change']
    }
  ]

  const quickFacts = [
    { fact: 'The average person generates 4.4 lbs of trash per day', source: 'EPA' },
    { fact: 'Solar energy costs have dropped 89% since 2010', source: 'IRENA' },
    { fact: 'Composting can divert 30% of household waste from landfills', source: 'USDA' },
    { fact: 'A single tree absorbs 48 lbs of CO2 per year', source: 'Arbor Day Foundation' },
    { fact: 'Regenerative agriculture can sequester 3-6 tons of carbon per acre annually', source: 'Rodale Institute' },
    { fact: 'LED bulbs use 75% less energy than incandescent lighting', source: 'DOE' }
  ]

  const topics = [
    { title: 'RENEWABLE ENERGY', desc: 'Solar, wind, and clean energy systems for homes and communities', icon: Zap, slug: 'renewable-energy', color: 'moss', modules: 33 },
    { title: 'WATER SYSTEMS', desc: 'Conservation, harvesting, and sustainable water management', icon: Droplet, slug: 'water-systems', color: 'ocean', modules: 33 },
    { title: 'REGENERATIVE AGRICULTURE', desc: 'Farming practices that restore ecosystems and sequester carbon', icon: Sprout, slug: 'regenerative-agriculture', color: 'terra', modules: 33 },
    { title: 'ZERO WASTE LIVING', desc: 'Practical strategies to minimize waste and live lighter', icon: Recycle, slug: 'zero-waste', color: 'moss', modules: 33 },
    { title: 'GREEN BUILDING', desc: 'Sustainable architecture, materials, and energy-efficient design', icon: Home, slug: 'green-building', color: 'ocean', modules: 33 },
    { title: 'FOOD SOVEREIGNTY', desc: 'Local food systems, gardening, and community nutrition', icon: Leaf, slug: 'food-sovereignty', color: 'terra', modules: 33 },
  ]

  const resourceTypes = [
    { type: 'Video Tutorials', count: 150, icon: Play, color: 'moss' },
    { type: 'Written Guides', count: 200, icon: FileText, color: 'ocean' },
    { type: 'Worksheets & Templates', count: 75, icon: Download, color: 'terra' },
    { type: 'Interactive Calculators', count: 12, icon: Calculator, color: 'moss' }
  ]

  return (
    <div className="min-h-screen relative">
      {/* Decorative Elements */}
      <TreeBranches />
      <FlyingBirds />

      {/* Hero Section - Clean and Focused */}
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[var(--muted)] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Professor Sage Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] border-2 border-theme-primary">
              <span className="text-3xl">🦉</span>
              <span className="text-lg font-black text-theme-primary">PROFESSOR SAGE&apos;S CLASSROOM</span>
            </div>

            <h1 className="text-[var(--foreground)]" style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1
            }}>
              LEARN SUSTAINABILITY
            </h1>
            <p className="text-2xl font-bold text-theme-muted">
              Knowledge that <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900
              }}>empowers</span> real change
            </p>

            {/* Welcome Statement */}
            <div className="max-w-3xl mx-auto">
              <p className="text-xl font-semibold text-theme-muted">
                Welcome to the most comprehensive sustainability education platform.
                Interactive lessons, hands-on activities, and expert knowledge—your journey to
                becoming an environmental changemaker starts here.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-xl font-black shadow-xl"
                onClick={() => scrollToSection('core-topics')}
              >
                <Play className="w-5 h-5 mr-2" />
                START LEARNING
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-xl font-bold border-2"
                onClick={() => scrollToSection('learning-paths')}
              >
                VIEW LEARNING PATHS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Planet in Numbers - Compact Stats */}
      <section className="flex items-center justify-center bg-[var(--background)] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-orange-500/20 rounded-full border-2 border-orange-500 mb-4">
                <span className="text-xs font-black text-orange-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  CALCULATED FROM ANNUAL DATA
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #ef4444, #f97316, #eab308)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                THE PLANET IN NUMBERS
              </h2>
              <p className="text-base font-semibold text-theme-muted max-w-3xl mx-auto">
                Statistics calculated from latest annual reports. Click any card to verify the source data.
              </p>
            </div>

            <CompactLiveImpactStats />
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="learning-paths" className="py-24 bg-[var(--background)] scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[var(--foreground)]">LEARNING PATHS</h2>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-theme-muted px-4">
              Structured courses designed to take you from curious to expert
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {learningPaths.map((path) => (
              <Link key={path.id} href={`/learn/paths/${path.id}`}>
                <Card
                  className="h-full border-4 border-theme-primary hover:border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[var(--background)] transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="h-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center">
                        <path.icon className="w-8 h-8 text-theme-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-black text-theme-primary">{path.level}</span>
                        <h3 className="text-xl font-black text-[var(--foreground)]">{path.title}</h3>
                      </div>
                    </div>

                    <p className="text-base font-medium text-theme-muted mb-6">
                      {path.description}
                    </p>

                    <div className="flex items-center gap-6 mb-6 text-sm font-bold text-theme-muted">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {path.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {path.modules} modules
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {path.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-bold bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <Button className="w-full font-bold">
                      START PATH <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts Marquee */}
      <section className="py-12 bg-[var(--primary)] overflow-hidden">
        <div className="flex gap-12 animate-scroll">
          {[...quickFacts, ...quickFacts].map((item, i) => (
            <div key={i} className="flex items-center gap-4 whitespace-nowrap">
              <Lightbulb className="w-6 h-6 text-[var(--primary-foreground)] opacity-70" />
              <span className="text-lg font-bold text-[var(--primary-foreground)]">{item.fact}</span>
              <span className="text-sm font-medium text-[var(--primary-foreground)] opacity-70">— {item.source}</span>
              <span className="text-[var(--primary-foreground)] opacity-50 mx-4">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Topics - Main Learning Hub with Level Selector */}
      <section id="core-topics" className="py-24 bg-[var(--background)] scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[var(--foreground)]">CORE TOPICS</h2>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-theme-muted px-4 mb-8">
              Choose your classroom level and explore our comprehensive curriculum
            </p>

            {/* Learning Level Selector - Moved here */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] rounded-2xl p-6 border-2 border-theme-primary">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-theme-primary" />
                  <span className="text-lg font-black text-theme-primary">SELECT YOUR CLASSROOM LEVEL</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {LEARNING_LEVEL_ORDER.map((level) => {
                    const meta = LEARNING_LEVELS[level]
                    const isSelected = level === selectedLevel
                    return (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg scale-105 ring-2 ring-offset-2 ring-[var(--primary)]'
                            : 'bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--primary)]/20 hover:scale-102 border border-[var(--border)]'
                        }`}
                      >
                        <span className="text-xl">{meta.icon}</span>
                        <div className="text-left">
                          <div className="font-black">{meta.shortLabel}</div>
                          <div className="text-xs opacity-70">{meta.ageRange}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-sm text-theme-muted mt-4">
                  All modules adapt to your level: <span className="font-black text-theme-primary">{LEARNING_LEVELS[selectedLevel].icon} {LEARNING_LEVELS[selectedLevel].label}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {topics.map((topic) => {
              const progress = topicProgress.get(topic.slug as CoreTopic)
              const progressPercent = progress?.progressPercent || 0
              const isGraduated = progress?.isGraduated || false

              return (
                <Link key={topic.title} href={`/learn/topics/${topic.slug}?level=${selectedLevel.toLowerCase()}`}>
                  <Card className="h-full border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[var(--background)] transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <topic.icon className="w-8 h-8 text-theme-primary" />
                        </div>
                        <div className="flex items-center gap-2">
                          {isGraduated && (
                            <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-600 text-xs font-black flex items-center gap-1">
                              <GraduationCap className="w-3 h-3" />
                              COMPLETE
                            </div>
                          )}
                          <div className="px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--primary)_15%,var(--background))] text-xs font-bold text-theme-primary flex items-center gap-1">
                            <span>{LEARNING_LEVELS[selectedLevel].icon}</span>
                            <span>{LEARNING_LEVELS[selectedLevel].shortLabel}</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-black mb-3 text-[var(--foreground)] group-hover:text-theme-primary transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-base font-medium mb-4 text-theme-muted">
                        {topic.desc}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-theme-muted flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {topic.modules} modules
                          </span>
                          {progressPercent > 0 && (
                            <span className="text-sm font-black text-theme-primary">
                              {progressPercent}%
                            </span>
                          )}
                        </div>
                        <span className="text-theme-primary font-black text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          {isGraduated ? 'REVIEW' : progressPercent > 0 ? 'CONTINUE' : 'EXPLORE'}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>

                      {/* Minimal Progress Bar - only show if started */}
                      {progressPercent > 0 && (
                        <div className="mt-3 h-1 bg-[var(--muted)] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500 bg-[var(--primary)]"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-24 bg-[var(--muted)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[var(--foreground)]">INTERACTIVE TOOLS</h2>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-theme-muted px-4">
              Learn by doing with hands-on resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {resourceTypes.map((resource, i) => (
              <Card key={i} className="border-2 border-[var(--border)] bg-[var(--card)] hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center">
                    <resource.icon className="w-8 h-8 text-theme-primary" />
                  </div>
                  <h3 className="text-lg font-black mb-2 text-[var(--foreground)]">{resource.type}</h3>
                  <div className="text-3xl font-black text-theme-primary">
                    {resource.count}+
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: Calculator, title: 'CARBON CALCULATOR', desc: 'Calculate your environmental footprint and get personalized reduction tips', cta: 'CALCULATE NOW', href: '/tools/carbon-calculator' },
              { icon: Droplet, title: 'WATER CALCULATOR', desc: 'Discover your total water footprint including hidden virtual water', cta: 'CALCULATE NOW', href: '/tools/water-calculator' },
              { icon: Play, title: 'VIDEO LIBRARY', desc: 'Curated educational videos from trusted sources on sustainability topics', cta: 'WATCH VIDEOS', href: '/videos' },
              { icon: Download, title: 'RESOURCE LIBRARY', desc: 'PDFs, worksheets, checklists, and templates for sustainable living', cta: 'BROWSE RESOURCES', href: '/resources' }
            ].map((tool, i) => (
              <Link key={i} href={tool.href}>
                <Card className="h-full border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[var(--background)] transform hover:scale-105 transition-all cursor-pointer">
                  <CardContent className="p-10 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] flex items-center justify-center">
                      <tool.icon className="w-12 h-12 text-theme-primary" />
                    </div>
                    <h3 className="text-xl font-black mb-3 text-[var(--foreground)]">{tool.title}</h3>
                    <p className="font-medium mb-6 text-theme-muted">{tool.desc}</p>
                    <Button variant="outline" className="font-bold border-2">
                      {tool.cta}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="text-5xl sm:text-6xl md:text-7xl">🎓</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--primary-foreground)] px-4">READY TO BECOME A SUSTAINABILITY EXPERT?</h2>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--primary-foreground)] opacity-90 px-4">
              Join thousands of learners transforming knowledge into action.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-xl px-12 py-8 bg-[var(--primary-foreground)] text-[var(--primary)] hover:opacity-90 font-black shadow-2xl rounded-2xl">
                START YOUR JOURNEY
              </Button>
              <Link href="/community">
                <Button size="lg" variant="outline" className="text-xl px-12 py-8 border-4 border-[var(--primary-foreground)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] font-black rounded-2xl">
                  JOIN THE COMMUNITY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
