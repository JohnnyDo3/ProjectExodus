'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Compass, Map, Target, Award,
  BookOpen, Layers, Shield, ChevronRight, Check, Play,
  Lightbulb, Zap, Globe, Users, GraduationCap
} from 'lucide-react'
import Link from 'next/link'

const guideSteps = [
  {
    id: 'welcome',
    title: 'Welcome to Exodology',
    subtitle: 'The Science of Ethical Transitions',
    content: 'Exodology is the systematic study of how complex systems transform. While sustainability focuses on improving existing systems, Exodology focuses on guiding ethical exits when systems can no longer serve people or the planet.',
    visual: 'intro',
    icon: Compass
  },
  {
    id: 'trinity',
    title: 'The Exodology Trinity',
    subtitle: 'Three pillars of mastery',
    content: 'Complete mastery requires understanding across three domains: Literacy (why systems fail), Application (building alternatives), and Stewardship (leading transitions).',
    visual: 'trinity',
    icon: Award
  },
  {
    id: 'paths',
    title: 'Choose Your Path',
    subtitle: 'Structured learning journeys',
    content: 'Each path builds progressively. Start with Foundations if you\'re new, or dive into Applied or Strategic if you have experience. All paths lead to certification.',
    visual: 'paths',
    icon: Map
  },
  {
    id: 'features',
    title: 'Your Learning Experience',
    subtitle: 'Tools to help you succeed',
    content: 'Track your progress, earn certifications, take notes, and engage with a community of practitioners. Everything you need to master transition science.',
    visual: 'features',
    icon: Lightbulb
  },
  {
    id: 'start',
    title: 'Ready to Begin?',
    subtitle: 'Take the first step',
    content: 'Take our quick quiz to find the right starting path, or explore the curriculum at your own pace. Your journey toward transition mastery starts now.',
    visual: 'cta',
    icon: Play
  }
]

export default function GuidePage() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const step = guideSteps[currentStep]
  const progress = ((currentStep + 1) / guideSteps.length) * 100

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Link
          href="/exodology"
          className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <Link
          href="/exodology/start"
          className="text-sm text-[var(--primary)] font-medium hover:underline"
        >
          Skip to quiz
        </Link>
      </header>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 py-4">
        {guideSteps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentStep
                ? 'w-8 bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500'
                : i < currentStep
                ? 'bg-[var(--primary)]'
                : 'bg-[var(--muted)]'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Visual */}
              <div className="mb-8">
                {step.visual === 'intro' && <IntroVisual />}
                {step.visual === 'trinity' && <TrinityVisual />}
                {step.visual === 'paths' && <PathsVisual />}
                {step.visual === 'features' && <FeaturesVisual />}
                {step.visual === 'cta' && <CTAVisual />}
              </div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] mb-2">
                  {step.title}
                </h1>
                <p className="text-lg text-[var(--muted-foreground)] mb-4">
                  {step.subtitle}
                </p>
                <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
                  {step.content}
                </p>
              </motion.div>

              {/* CTA for final step */}
              {step.visual === 'cta' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Link href="/exodology/start">
                    <Button size="lg" className="bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500 text-white border-0 px-8">
                      Find My Path
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/exodology/paths">
                    <Button variant="outline" size="lg" className="px-8">
                      Explore Curriculum
                    </Button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <footer className="p-4 flex justify-between items-center max-w-4xl mx-auto w-full">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          className={currentStep === 0 ? 'invisible' : ''}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep < guideSteps.length - 1 ? (
          <Button onClick={nextStep}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <div />
        )}
      </footer>
    </div>
  )
}

// Visual Components
function IntroVisual() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-40 h-40 mx-auto"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500 via-teal-500 to-purple-500 animate-pulse opacity-20" />
      <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-amber-500 via-teal-500 to-purple-500 flex items-center justify-center">
        <Compass className="w-16 h-16 text-white" />
      </div>
    </motion.div>
  )
}

function TrinityVisual() {
  const pillars = [
    { icon: BookOpen, color: 'from-amber-500 to-orange-600', label: 'Literacy' },
    { icon: Layers, color: 'from-teal-500 to-cyan-600', label: 'Application' },
    { icon: Shield, color: 'from-purple-500 to-indigo-600', label: 'Stewardship' }
  ]

  return (
    <div className="flex justify-center gap-4">
      {pillars.map((pillar, i) => (
        <motion.div
          key={pillar.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex flex-col items-center"
        >
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg`}>
            <pillar.icon className="w-8 h-8 text-white" />
          </div>
          <span className="mt-2 text-sm font-bold text-[var(--foreground)]">{pillar.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function PathsVisual() {
  const paths = [
    { icon: Compass, color: 'from-amber-500 to-orange-600', name: 'Foundations' },
    { icon: Map, color: 'from-teal-500 to-cyan-600', name: 'Applied' },
    { icon: Target, color: 'from-purple-500 to-indigo-600', name: 'Strategic' }
  ]

  return (
    <div className="flex justify-center items-center gap-2">
      {paths.map((path, i) => (
        <motion.div
          key={path.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center"
        >
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center shadow-lg`}>
            <path.icon className="w-7 h-7 text-white" />
          </div>
          {i < paths.length - 1 && (
            <ChevronRight className="w-5 h-5 text-[var(--muted-foreground)] mx-1" />
          )}
        </motion.div>
      ))}
    </div>
  )
}

function FeaturesVisual() {
  const features = [
    { icon: Zap, label: 'Progress' },
    { icon: Award, label: 'Certifications' },
    { icon: BookOpen, label: 'Resources' },
    { icon: Users, label: 'Community' }
  ]

  return (
    <div className="grid grid-cols-4 gap-4 max-w-xs mx-auto">
      {features.map((feature, i) => (
        <motion.div
          key={feature.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center">
            <feature.icon className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <span className="mt-1 text-xs text-[var(--muted-foreground)]">{feature.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function CTAVisual() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-32 h-32 mx-auto"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border-4 border-dashed border-[var(--primary)]/30"
      />
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-500 via-teal-500 to-purple-500 flex items-center justify-center">
        <GraduationCap className="w-12 h-12 text-white" />
      </div>
    </motion.div>
  )
}
