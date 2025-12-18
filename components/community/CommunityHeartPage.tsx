'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, Crown, Sparkles, TrendingUp,
  User, Briefcase, FileText, BookOpen, Users, MessageCircle, Leaf,
  Star, Lock, Globe, Zap, Heart, ArrowRight, GraduationCap, Gamepad2, Brain, Target, Award,
  Droplet, Sprout, Recycle, Home, FlaskConical, Play, Puzzle, Calculator, Map, Trophy
} from 'lucide-react'
import Link from 'next/link'
import { BusinessCardThemeShowcase } from './BusinessCardThemeShowcase'
import { FeaturedGuardiansCarousel } from './FeaturedGuardiansCarousel'
import { AnimatedStatsBar } from './AnimatedStatsBar'
import { LiveActivityStream } from './LiveActivityStream'
import { AmbientBackground } from './AmbientBackground'

interface CommunityHeartPageProps {
  isAuthenticated: boolean
}

// Decorative corner ornament component
function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: 0, tr: 90, bl: -90, br: 180 }
  const positions = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }

  return (
    <motion.div
      className={`absolute ${positions[position]} w-8 h-8 pointer-events-none`}
      style={{ transform: `rotate(${rotations[position]}deg)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <motion.path
          d="M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z"
          fill="var(--primary)"
          fillOpacity="0.3"
          animate={{ fillOpacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="6"
          cy="6"
          r="1.5"
          fill="var(--primary)"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  )
}

// Decorative divider component
function DecorativeDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles className="w-3 h-3 text-[var(--primary)]/50" />
      </motion.div>
      <motion.div
        className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  )
}

// Glowing border component
function GlowingBorder({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative ${className}`} style={style}>
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[var(--primary)]/20 via-[var(--accent)]/20 to-[var(--secondary)]/20 blur-sm"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          background: [
            'linear-gradient(90deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)',
            'linear-gradient(90deg, var(--secondary) 0%, var(--primary) 50%, var(--accent) 100%)',
            'linear-gradient(90deg, var(--accent) 0%, var(--secondary) 50%, var(--primary) 100%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {children}
    </div>
  )
}

// Volition lane icons and labels
const volitionLanes = [
  { icon: User, label: 'Identity', color: 'text-blue-400' },
  { icon: Briefcase, label: 'Projects', color: 'text-orange-400' },
  { icon: FileText, label: 'Articles', color: 'text-purple-400' },
  { icon: BookOpen, label: 'Learning', color: 'text-emerald-400' },
  { icon: Users, label: 'Network', color: 'text-cyan-400' },
  { icon: MessageCircle, label: 'Feed', color: 'text-pink-400' },
  { icon: Leaf, label: 'Impact', color: 'text-green-400' },
]

// Business card features
const businessCardFeatures = [
  { icon: Shield, label: 'Guardian Theme' },
  { icon: Star, label: 'Declaration' },
  { icon: TrendingUp, label: 'STOCK Score' },
  { icon: Lock, label: 'Privacy Controls' },
]

// Grade levels data
const gradeLevels = [
  { id: 'ELEMENTARY', label: 'Elementary', color: 'from-green-400 to-emerald-500', icon: '🌱', ages: 'K-5' },
  { id: 'MIDDLE_SCHOOL', label: 'Middle School', color: 'from-blue-400 to-cyan-500', icon: '📚', ages: '6-8' },
  { id: 'HIGH_SCHOOL', label: 'High School', color: 'from-purple-400 to-violet-500', icon: '🎓', ages: '9-12' },
  { id: 'UNDERGRADUATE', label: 'Undergraduate', color: 'from-orange-400 to-amber-500', icon: '🏛️', ages: 'College' },
  { id: 'GRADUATE', label: 'Graduate', color: 'from-rose-400 to-pink-500', icon: '📖', ages: 'Masters' },
  { id: 'PHD', label: 'PhD', color: 'from-indigo-400 to-blue-600', icon: '🔬', ages: 'Doctoral' },
]

// Core learning topics from the Learn page
const coreLearnTopics = [
  { name: 'Renewable Energy', icon: Zap, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  { name: 'Water Systems', icon: Droplet, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
  { name: 'Regenerative Ag', icon: Sprout, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
  { name: 'Zero Waste', icon: Recycle, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { name: 'Green Building', icon: Home, color: 'text-teal-500', bgColor: 'bg-teal-500/10' },
  { name: 'Food Sovereignty', icon: Leaf, color: 'text-lime-500', bgColor: 'bg-lime-500/10' },
]

// Interactive learning tools
const interactiveTools = [
  { name: 'Simulations', icon: FlaskConical, color: 'text-purple-500' },
  { name: 'Video Lessons', icon: Play, color: 'text-rose-500' },
  { name: 'Challenges', icon: Puzzle, color: 'text-orange-500' },
  { name: 'Calculators', icon: Calculator, color: 'text-blue-500' },
  { name: 'Virtual Tours', icon: Map, color: 'text-teal-500' },
  { name: 'Achievements', icon: Trophy, color: 'text-amber-500' },
]

// Fake user ID previews to showcase different guardian archetypes
const fakeUserPreviews = [
  {
    name: 'Maya Chen',
    declaration: 'Building bridges to tomorrow',
    theme: 'strength',
    gradient: 'from-red-500 via-orange-500 to-amber-500',
    accentColor: 'text-red-400',
    stock: 847
  },
  {
    name: 'Jordan Rivers',
    declaration: 'Knowledge lights the way',
    theme: 'revelation',
    gradient: 'from-sky-400 via-blue-500 to-cyan-500',
    accentColor: 'text-sky-400',
    stock: 562
  },
  {
    name: 'Sage Willows',
    declaration: 'Healing the world together',
    theme: 'healing',
    gradient: 'from-emerald-400 via-teal-500 to-green-500',
    accentColor: 'text-emerald-400',
    stock: 723
  },
  {
    name: 'Phoenix Hart',
    declaration: 'Wisdom guides every step',
    theme: 'wisdom',
    gradient: 'from-amber-400 via-yellow-500 to-orange-400',
    accentColor: 'text-amber-400',
    stock: 491
  },
  {
    name: 'River Stone',
    declaration: 'Love conquers all barriers',
    theme: 'love',
    gradient: 'from-pink-400 via-rose-500 to-red-400',
    accentColor: 'text-pink-400',
    stock: 634
  },
  {
    name: 'Luna Grace',
    declaration: 'Beauty in sustainability',
    theme: 'beauty',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    accentColor: 'text-violet-400',
    stock: 578
  },
  {
    name: 'Kai Mercer',
    declaration: 'Compassion drives change',
    theme: 'mercy',
    gradient: 'from-indigo-400 via-blue-600 to-purple-500',
    accentColor: 'text-indigo-400',
    stock: 412
  },
]

export function CommunityHeartPage({ isAuthenticated }: CommunityHeartPageProps) {
  const [isVolitionFlipped, setIsVolitionFlipped] = useState(false)
  const [isBizIDFlipped, setIsBizIDFlipped] = useState(false)
  const [isLearningFlipped, setIsLearningFlipped] = useState(false)
  const [activeUserIndex, setActiveUserIndex] = useState(0)

  // Auto-cycle through fake user previews
  useEffect(() => {
    if (isBizIDFlipped) return
    const interval = setInterval(() => {
      setActiveUserIndex((prev) => (prev + 1) % fakeUserPreviews.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isBizIDFlipped])

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-y-auto flex flex-col">
      {/* Ambient animated background */}
      <AmbientBackground />

      {/* Tagline bar with auth buttons */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[var(--primary)]/5 via-[var(--accent)]/10 to-[var(--secondary)]/5 border-b border-[var(--border)]/30 overflow-hidden"
      >
        {/* Animated background line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Join Free button */}
        <Link href="/auth/signup" className="relative z-10">
          <motion.button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Free
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </Link>

        {/* Center tagline */}
        <motion.div
          className="relative flex items-center gap-3"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
          </motion.div>

          <span className="text-sm font-semibold text-[var(--foreground)] tracking-wide hidden sm:block">
            Where ideas become action
          </span>

          <motion.div
            animate={{ rotate: [360, 180, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
          </motion.div>
        </motion.div>

        {/* Sign In button */}
        <Link href="/auth/signin" className="relative z-10">
          <motion.button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[var(--primary)] text-[var(--primary)] text-xs font-semibold hover:bg-[var(--primary)]/10 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </Link>
      </motion.div>

      {/* Main content - extended widgets section to fold */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 sm:p-4 flex-1 min-h-[calc(100vh-8rem)]">
        {/* Left column: BizID Showcase + Network Activity - Flip Card */}
        <div
          className="lg:col-span-4 min-h-[260px] lg:min-h-[360px] h-full"
          style={{ perspective: '1000px' }}
          onMouseEnter={() => setIsBizIDFlipped(true)}
          onMouseLeave={() => setIsBizIDFlipped(false)}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: isBizIDFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front Side - BizID Features + Network Activity */}
            <GlowingBorder className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
              <div className="relative h-full flex flex-col gap-2">
                {/* BizID Card - Top Section with Ivy Mural */}
                <motion.div
                  className="relative flex-[3] bg-gradient-to-br from-[var(--card)]/95 via-[var(--muted)]/50 to-[var(--card)]/90 backdrop-blur-md border border-[var(--border)]/30 rounded-xl p-3 overflow-hidden flex flex-col"
                >
                  {/* Ancient Scroll / Ivy Mural Background */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                    {/* Parchment texture gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--muted)]/20" />

                    {/* Ivy vine - left side - using theme colors */}
                    <div className="absolute left-0 top-0 h-full w-10 text-[var(--primary)] opacity-20">
                      <svg className="h-full w-full" viewBox="0 0 40 200" preserveAspectRatio="none">
                        {/* Main vine */}
                        <path d="M5 0 Q15 30 8 60 Q2 90 12 120 Q18 150 6 180 Q3 195 8 200" fill="none" stroke="currentColor" strokeWidth="2"/>
                        {/* Ivy leaves */}
                        <path d="M8 25 Q15 20 12 30 Q8 35 8 25" fill="currentColor"/>
                        <path d="M6 55 Q-2 50 2 60 Q6 68 6 55" fill="currentColor"/>
                        <path d="M10 85 Q18 78 15 90 Q10 98 10 85" fill="currentColor"/>
                        <path d="M14 115 Q22 110 18 122 Q12 128 14 115" fill="currentColor"/>
                        <path d="M8 145 Q0 140 4 152 Q10 158 8 145" fill="currentColor"/>
                        <path d="M5 175 Q12 168 10 180 Q4 188 5 175" fill="currentColor"/>
                      </svg>
                    </div>

                    {/* Ivy vine - right side */}
                    <div className="absolute right-0 top-0 h-full w-10 text-[var(--primary)] opacity-15">
                      <svg className="h-full w-full" viewBox="0 0 40 200" preserveAspectRatio="none">
                        <path d="M35 0 Q25 25 32 55 Q38 85 28 115 Q22 145 34 175 Q37 190 32 200" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M32 30 Q25 25 28 35 Q34 40 32 30" fill="currentColor"/>
                        <path d="M30 70 Q38 65 35 75 Q28 82 30 70" fill="currentColor"/>
                        <path d="M26 110 Q18 105 22 115 Q28 122 26 110" fill="currentColor"/>
                        <path d="M32 150 Q40 145 36 155 Q30 162 32 150" fill="currentColor"/>
                      </svg>
                    </div>

                    {/* Decorative Greek key border - top */}
                    <div className="absolute top-0 left-8 right-8 h-3 text-[var(--muted-foreground)] opacity-10">
                      <svg className="h-full w-full" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <pattern id="greekKey" patternUnits="userSpaceOnUse" width="24" height="12">
                          <path d="M0 6 L6 6 L6 0 L12 0 L12 6 L18 6 L18 12 L24 12 M24 6 L18 6" fill="none" stroke="currentColor" strokeWidth="1"/>
                        </pattern>
                        <rect x="0" y="0" width="200" height="12" fill="url(#greekKey)"/>
                      </svg>
                    </div>

                    {/* Soft corner glows - theme aware */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[var(--primary)]/10 blur-2xl" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[var(--accent)]/10 blur-xl" />
                  </div>

                  {/* Corner ornaments */}
                  <CornerOrnament position="tl" />
                  <CornerOrnament position="tr" />

                  {/* Header with decorative underline */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                        <motion.div
                          className="w-5 h-5 rounded-md bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-sm"
                          animate={{ rotate: [0, 5, 0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Shield className="w-3 h-3 text-white" />
                        </motion.div>
                        BizID
                      </h2>
                      <motion.span
                        className="text-[9px] px-2 py-0.5 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-full text-[var(--primary)] font-semibold border border-[var(--primary)]/20"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        7 Themes
                      </motion.span>
                    </div>
                    <DecorativeDivider className="mb-2" />
                  </div>

                  {/* Features row - compact */}
                  <div className="relative z-10 flex items-center justify-between mb-2 px-1">
                    {businessCardFeatures.map((feature, i) => {
                      const Icon = feature.icon
                      return (
                        <motion.div
                          key={feature.label}
                          className="flex flex-col items-center gap-0.5 group cursor-pointer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <motion.div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--muted)] to-[var(--muted)]/50 flex items-center justify-center border border-[var(--border)]/50 shadow-sm group-hover:shadow-md group-hover:border-[var(--primary)]/30 transition-all">
                            <Icon className="w-3 h-3 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
                          </motion.div>
                          <span className="text-[6px] text-[var(--muted-foreground)] font-medium">{feature.label}</span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* User ID Card Preview - Compact */}
                  <div className="relative z-10 flex-1 min-h-0 flex flex-col">
                    {/* Theme selector dots */}
                    <div className="flex justify-center gap-1 mb-1">
                      {fakeUserPreviews.map((user, index) => (
                        <motion.button
                          key={user.theme}
                          onClick={() => setActiveUserIndex(index)}
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${user.gradient} transition-all duration-300`}
                          animate={{
                            scale: index === activeUserIndex ? 1.3 : 1,
                            opacity: index === activeUserIndex ? 1 : 0.4,
                          }}
                          whileHover={{ scale: 1.2, opacity: 0.8 }}
                        />
                      ))}
                    </div>

                    {/* User ID Card Preview */}
                    <div className="flex-1 flex items-center justify-center min-h-0">
                      <motion.div
                        key={activeUserIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-[180px]"
                      >
                        {/* Card */}
                        <div className="relative bg-[var(--card)] border border-[var(--border)]/50 rounded-lg overflow-hidden shadow-lg">
                          {/* Gradient header */}
                          <div className={`h-8 bg-gradient-to-r ${fakeUserPreviews[activeUserIndex].gradient} relative overflow-hidden`}>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                            />
                          </div>

                          {/* Avatar overlapping header */}
                          <div className="relative -mt-4 px-2">
                            <motion.div
                              className={`w-8 h-8 rounded-md bg-gradient-to-br ${fakeUserPreviews[activeUserIndex].gradient} p-0.5 shadow-md`}
                            >
                              <div className="w-full h-full rounded bg-[var(--card)] flex items-center justify-center">
                                <User className={`w-3.5 h-3.5 ${fakeUserPreviews[activeUserIndex].accentColor}`} />
                              </div>
                            </motion.div>
                          </div>

                          {/* Content */}
                          <div className="p-2 pt-0.5">
                            <p className="font-bold text-[10px] text-[var(--foreground)]">{fakeUserPreviews[activeUserIndex].name}</p>
                            <p className={`text-[8px] ${fakeUserPreviews[activeUserIndex].accentColor} italic truncate`}>
                              "{fakeUserPreviews[activeUserIndex].declaration}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Network Activity - Bottom Section */}
                <div className="relative flex-[2] bg-gradient-to-br from-[var(--card)]/95 via-[var(--accent)]/5 to-[var(--card)]/95 backdrop-blur-md border border-[var(--border)]/50 rounded-xl overflow-hidden">
                  {/* Subtle wave artwork - theme aware */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl text-[var(--accent)]">
                    <svg className="absolute bottom-0 left-0 right-0 h-8 opacity-[0.12]" viewBox="0 0 400 30" preserveAspectRatio="none">
                      <path d="M0 20 Q50 10 100 20 Q150 30 200 20 Q250 10 300 20 Q350 30 400 20 L400 30 L0 30 Z" fill="currentColor"/>
                      <path d="M0 25 Q50 18 100 25 Q150 32 200 25 Q250 18 300 25 Q350 32 400 25 L400 30 L0 30 Z" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </div>

                  {/* Pulsing corner indicator */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 z-20"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 0.4, 0.8],
                      boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 6px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0.4)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <LiveActivityStream />

                  {/* Gradient fade at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[var(--card)] to-transparent pointer-events-none" />
                </div>
              </div>
            </GlowingBorder>

            {/* Back Side - Full Height BizID Philosophy with Ivy Mural */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--muted)]/50 to-[var(--card)] rounded-xl p-4 overflow-hidden border border-[var(--border)]/30"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {/* Ivy Mural Background - Full */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                {/* Parchment texture - theme aware */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--muted)]/30" />

                {/* Ivy vine - left side - fuller - theme aware */}
                <div className="absolute left-0 top-0 h-full w-12 text-[var(--primary)] opacity-25">
                  <svg className="h-full w-full" viewBox="0 0 48 300" preserveAspectRatio="none">
                    <path d="M5 0 Q18 40 8 80 Q2 120 15 160 Q22 200 8 240 Q3 270 10 300" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M10 35 Q20 28 16 42 Q10 50 10 35" fill="currentColor"/>
                    <path d="M6 75 Q-4 68 2 82 Q8 92 6 75" fill="currentColor"/>
                    <path d="M14 115 Q24 106 20 120 Q14 130 14 115" fill="currentColor"/>
                    <path d="M18 155 Q28 148 24 162 Q16 172 18 155" fill="currentColor"/>
                    <path d="M10 195 Q0 188 6 202 Q14 212 10 195" fill="currentColor"/>
                    <path d="M6 235 Q16 228 12 242 Q4 252 6 235" fill="currentColor"/>
                    <path d="M12 275 Q22 268 18 282 Q10 292 12 275" fill="currentColor"/>
                  </svg>
                </div>

                {/* Ivy vine - right side - fuller - theme aware */}
                <div className="absolute right-0 top-0 h-full w-12 text-[var(--primary)] opacity-20">
                  <svg className="h-full w-full" viewBox="0 0 48 300" preserveAspectRatio="none">
                    <path d="M40 0 Q28 35 38 75 Q44 115 32 155 Q26 195 40 235 Q44 270 36 300" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M38 45 Q28 38 32 52 Q40 60 38 45" fill="currentColor"/>
                    <path d="M34 95 Q44 88 40 102 Q32 112 34 95" fill="currentColor"/>
                    <path d="M30 145 Q20 138 26 152 Q34 162 30 145" fill="currentColor"/>
                    <path d="M38 195 Q48 188 44 202 Q36 212 38 195" fill="currentColor"/>
                    <path d="M32 245 Q22 238 28 252 Q36 262 32 245" fill="currentColor"/>
                  </svg>
                </div>

                {/* Greek key border - top - theme aware */}
                <div className="absolute top-0 left-10 right-10 h-4 text-[var(--muted-foreground)] opacity-15">
                  <svg className="h-full w-full" viewBox="0 0 200 16" preserveAspectRatio="none">
                    <pattern id="greekKeyBack" patternUnits="userSpaceOnUse" width="24" height="12">
                      <path d="M0 6 L6 6 L6 0 L12 0 L12 6 L18 6 L18 12 L24 12 M24 6 L18 6" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                    <rect x="0" y="0" width="200" height="12" fill="url(#greekKeyBack)"/>
                  </svg>
                </div>

                {/* Soft glows - theme aware */}
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[var(--primary)]/15 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[var(--accent)]/15 blur-2xl" />
              </div>

              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3 flex-shrink-0">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Shield className="w-5 h-5 text-[var(--primary)]" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-base text-[var(--foreground)]">Guardian Identity</h3>
                    <p className="text-[11px] text-[var(--primary)] font-semibold uppercase tracking-wide">Your Values Define You</p>
                  </div>
                </div>

                {/* Decorative divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent mb-3 flex-shrink-0" />

                {/* Scrollable content - larger text */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    Choose from <span className="font-semibold text-[var(--primary)]">7 Guardian archetypes</span> that reflect your core values: Steward, Pioneer, Sage, Warrior, Healer, Creator, or Connector.
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Each archetype represents a unique approach to building a sustainable future. Your theme colors, badges, and visual identity all flow from this foundational choice.
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Your BizID becomes your declaration—a living statement of purpose that evolves with your journey. Connect with others who share your values and build meaningful relationships grounded in shared vision.
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    The STOCK score tracks your growth across all platform activities, creating a holistic picture of your contribution to the sustainability movement.
                  </p>
                </div>

                {/* Footer badges */}
                <div className="flex items-center justify-center gap-4 pt-3 mt-3 border-t border-[var(--primary)]/30 flex-shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent)]/15">
                    <Heart className="w-4 h-4 text-[var(--accent)]" />
                    <span className="text-xs font-medium text-[var(--accent)]">Values-First</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--primary)]/15">
                    <Users className="w-4 h-4 text-[var(--primary)]" />
                    <span className="text-xs font-medium text-[var(--primary)]">Community</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center column: Learning Academy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-3 min-h-[260px] lg:min-h-[360px]"
        >
          {/* Learning Academy - Flip Card with Philosophy - Now Full Height */}
          <div
            className="relative flex-1"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setIsLearningFlipped(true)}
            onMouseLeave={() => setIsLearningFlipped(false)}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isLearningFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {/* Front Side - Learning Features with Zen Garden Mural */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)]/90 via-[var(--muted)]/40 to-[var(--card)]/90 backdrop-blur-md border border-[var(--border)]/30 rounded-xl p-4 overflow-hidden flex flex-col"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Zen Garden Mural Background - Theme Aware */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Soft gradient sky - theme aware */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 via-transparent to-[var(--primary)]/10" />

                  {/* Bamboo stalks - left side - theme aware */}
                  <div className="absolute left-0 top-0 h-full w-14 text-[var(--primary)] opacity-20">
                    <svg className="h-full w-full" viewBox="0 0 56 300" preserveAspectRatio="none">
                      {/* Bamboo stalk 1 */}
                      <rect x="8" y="0" width="7" height="300" fill="currentColor" rx="3.5"/>
                      <line x1="8" y1="40" x2="15" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                      <line x1="8" y1="90" x2="15" y2="90" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                      <line x1="8" y1="140" x2="15" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                      <line x1="8" y1="190" x2="15" y2="190" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                      <line x1="8" y1="240" x2="15" y2="240" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                      {/* Bamboo stalk 2 */}
                      <rect x="26" y="30" width="6" height="270" fill="currentColor" rx="3" opacity="0.8"/>
                      <line x1="26" y1="70" x2="32" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <line x1="26" y1="120" x2="32" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <line x1="26" y1="170" x2="32" y2="170" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <line x1="26" y1="220" x2="32" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      {/* Bamboo leaves */}
                      <path d="M15 35 Q25 28 32 40" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M15 85 Q28 75 38 90" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M32 115 Q42 105 48 120" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M15 185 Q25 175 35 188" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>

                  {/* Cherry blossom branch - top right - theme aware */}
                  <div className="absolute right-0 top-0 w-32 h-28 opacity-25">
                    <svg className="w-full h-full" viewBox="0 0 130 110">
                      {/* Branch - using muted foreground */}
                      <path d="M130 12 Q90 18 65 38 Q45 52 25 45" fill="none" className="stroke-[var(--muted-foreground)]" strokeWidth="2.5"/>
                      <path d="M65 38 Q58 58 45 65" fill="none" className="stroke-[var(--muted-foreground)]" strokeWidth="2"/>
                      {/* Blossoms - using accent with opacity */}
                      <circle cx="62" cy="35" r="8" className="fill-[var(--accent)]/30 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                      <circle cx="45" cy="46" r="7" className="fill-[var(--accent)]/30 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                      <circle cx="72" cy="28" r="6" className="fill-[var(--accent)]/20 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                      <circle cx="30" cy="42" r="7" className="fill-[var(--accent)]/30 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                      <circle cx="52" cy="62" r="6" className="fill-[var(--accent)]/20 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                      <circle cx="85" cy="22" r="5" className="fill-[var(--accent)]/15 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                      {/* Blossom centers */}
                      <circle cx="62" cy="35" r="2" className="fill-[var(--primary)]" opacity="0.6"/>
                      <circle cx="45" cy="46" r="2" className="fill-[var(--primary)]" opacity="0.6"/>
                      <circle cx="30" cy="42" r="2" className="fill-[var(--primary)]" opacity="0.6"/>
                    </svg>
                  </div>

                  {/* Zen sand ripples - bottom - theme aware */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 text-[var(--muted-foreground)] opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 500 80" preserveAspectRatio="none">
                      <defs>
                        <pattern id="sandRipple" patternUnits="userSpaceOnUse" width="50" height="25">
                          <path d="M0 12 Q12.5 6 25 12 Q37.5 18 50 12" fill="none" stroke="currentColor" strokeWidth="0.8"/>
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="500" height="80" fill="url(#sandRipple)"/>
                      {/* Zen stones - theme aware */}
                      <ellipse cx="420" cy="55" rx="20" ry="10" fill="currentColor" opacity="0.4"/>
                      <ellipse cx="395" cy="62" rx="14" ry="7" fill="currentColor" opacity="0.3"/>
                      <ellipse cx="450" cy="60" rx="10" ry="5" fill="currentColor" opacity="0.25"/>
                    </svg>
                  </div>

                  {/* Distant mountains silhouette - theme aware */}
                  <div className="absolute bottom-16 left-0 right-0 h-16 text-[var(--foreground)] opacity-[0.06]">
                    <svg className="w-full h-full" viewBox="0 0 500 60" preserveAspectRatio="none">
                      <path d="M0 60 L40 30 L80 50 L130 18 L190 42 L260 12 L330 35 L400 22 L460 40 L500 30 L500 60 Z" fill="currentColor"/>
                    </svg>
                  </div>

                  {/* Floating lotus - bottom right - theme aware */}
                  <div className="absolute bottom-4 right-10 w-18 h-14 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 75 55">
                      {/* Water ripple */}
                      <ellipse cx="38" cy="48" rx="32" ry="5" fill="none" className="stroke-[var(--accent)]" strokeWidth="0.8" opacity="0.5"/>
                      {/* Lotus petals */}
                      <path d="M38 42 Q32 28 38 12 Q44 28 38 42" className="fill-[var(--accent)]/25 stroke-[var(--accent)]/40" strokeWidth="0.5"/>
                      <path d="M38 42 Q24 34 18 24 Q30 30 38 42" className="fill-[var(--accent)]/20 stroke-[var(--accent)]/40" strokeWidth="0.5"/>
                      <path d="M38 42 Q52 34 58 24 Q46 30 38 42" className="fill-[var(--accent)]/20 stroke-[var(--accent)]/40" strokeWidth="0.5"/>
                      <path d="M38 42 Q20 38 14 32 Q26 36 38 42" className="fill-[var(--accent)]/15 stroke-[var(--accent)]/40" strokeWidth="0.5"/>
                      <path d="M38 42 Q56 38 62 32 Q50 36 38 42" className="fill-[var(--accent)]/15 stroke-[var(--accent)]/40" strokeWidth="0.5"/>
                      {/* Lotus center */}
                      <circle cx="38" cy="32" r="4" className="fill-[var(--primary)]" opacity="0.5"/>
                    </svg>
                  </div>

                  {/* Koi fish - subtle - theme aware */}
                  <div className="absolute bottom-6 left-1/3 w-12 h-8 text-[var(--accent)] opacity-15">
                    <svg className="w-full h-full" viewBox="0 0 50 32">
                      <path d="M6 16 Q18 6 38 16 Q44 16 48 20 Q44 16 38 16 Q18 26 6 16" fill="currentColor"/>
                      <circle cx="10" cy="14" r="1.5" className="fill-[var(--foreground)]" opacity="0.5"/>
                      <path d="M40 10 Q48 6 44 16 Q48 26 40 22" fill="currentColor" opacity="0.8"/>
                    </svg>
                  </div>

                  {/* Soft corner glows - theme aware */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[var(--accent)]/10 blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-[var(--primary)]/10 blur-xl" />
                </div>

                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />
                <CornerOrnament position="bl" />
                <CornerOrnament position="br" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-2 flex-shrink-0">
                  <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                    <motion.div
                      className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                    Exodus Academy
                  </h2>
                  <motion.span
                    className="text-[10px] px-2.5 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    6 Levels
                  </motion.span>
                </div>

                <DecorativeDivider className="mb-2 flex-shrink-0" />

                {/* Grade Levels - Horizontal Timeline - Larger */}
                <div className="relative z-10 mb-3 flex-shrink-0">
                  <p className="text-[9px] text-[var(--muted-foreground)] font-medium mb-1.5 uppercase tracking-wide">Grade Levels</p>
                  <div className="relative flex items-center justify-between px-2">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] opacity-40 -translate-y-1/2" />

                    {gradeLevels.map((level, i) => (
                      <motion.div
                        key={level.id}
                        className="relative flex flex-col items-center z-10"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center shadow-md`}>
                          <span className="text-sm">{level.icon}</span>
                        </div>
                        <p className="text-[7px] font-medium text-[var(--muted-foreground)] mt-1 text-center leading-tight">{level.ages}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Core Topics and Interactive Tools - Two column layout */}
                <div className="relative z-10 flex-1 min-h-0 mb-2 grid grid-cols-2 gap-3">
                  {/* Core Learn Topics - Left column */}
                  <div className="flex flex-col min-h-0">
                    <p className="text-[9px] text-[var(--muted-foreground)] font-medium mb-1.5 uppercase tracking-wide flex-shrink-0">Core Topics</p>
                    <div className="flex-1 min-h-0 flex flex-col gap-1 overflow-y-auto pr-1">
                      {coreLearnTopics.map((topic, i) => {
                        const Icon = topic.icon
                        return (
                          <motion.div
                            key={topic.name}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${topic.bgColor} border border-[var(--border)]/20`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <Icon className={`w-3.5 h-3.5 ${topic.color} flex-shrink-0`} />
                            <span className="text-[8px] font-semibold text-[var(--foreground)] truncate">{topic.name}</span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Interactive Tools - Right column */}
                  <div className="flex flex-col min-h-0">
                    <p className="text-[9px] text-[var(--muted-foreground)] font-medium mb-1.5 uppercase tracking-wide flex-shrink-0">Interactive Tools</p>
                    <div className="flex-1 min-h-0 flex flex-col gap-1 overflow-y-auto pr-1">
                      {interactiveTools.map((tool, i) => {
                        const Icon = tool.icon
                        return (
                          <motion.div
                            key={tool.name}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[var(--muted)]/40 border border-[var(--border)]/20"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            whileHover={{ scale: 1.02, backgroundColor: 'var(--muted)' }}
                          >
                            <Icon className={`w-3.5 h-3.5 ${tool.color} flex-shrink-0`} />
                            <span className="text-[8px] font-semibold text-[var(--foreground)] truncate">{tool.name}</span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Key Features - Larger row */}
                <div className="relative z-10 flex items-center justify-center gap-4 py-2 bg-[var(--muted)]/30 rounded-lg flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <Gamepad2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span className="text-[8px] font-medium text-[var(--muted-foreground)]">Games</span>
                  </div>
                  <div className="w-px h-3 bg-[var(--border)]" />
                  <div className="flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="text-[8px] font-medium text-[var(--muted-foreground)]">Adaptive</span>
                  </div>
                  <div className="w-px h-3 bg-[var(--border)]" />
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-[8px] font-medium text-[var(--muted-foreground)]">Certs</span>
                  </div>
                </div>
              </div>

              {/* Back Side - Learning Philosophy with Zen Mural */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)]/95 via-[var(--muted)]/40 to-[var(--card)]/95 rounded-xl p-4 overflow-hidden border border-[var(--border)]/30"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* Zen Mural Background for back - theme aware */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/15 via-transparent to-[var(--primary)]/10" />

                  {/* Bamboo on back - theme aware */}
                  <div className="absolute left-0 top-0 h-full w-10 text-[var(--primary)] opacity-15">
                    <svg className="w-full h-full" viewBox="0 0 40 300" preserveAspectRatio="none">
                      <rect x="8" y="0" width="6" height="300" fill="currentColor" rx="3"/>
                      <rect x="22" y="20" width="5" height="280" fill="currentColor" rx="2.5" opacity="0.8"/>
                    </svg>
                  </div>

                  {/* Cherry blossoms scattered - theme aware */}
                  <div className="absolute right-0 top-0 w-24 h-20 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 80">
                      <circle cx="48" cy="28" r="6" className="fill-[var(--accent)]/30 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                      <circle cx="35" cy="36" r="5" className="fill-[var(--accent)]/30 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                      <circle cx="65" cy="22" r="4" className="fill-[var(--accent)]/20 stroke-[var(--accent)]/50" strokeWidth="0.5"/>
                    </svg>
                  </div>

                  {/* Soft glows - theme aware */}
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[var(--accent)]/15 blur-2xl" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[var(--primary)]/15 blur-2xl" />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3 flex-shrink-0">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-base text-[var(--foreground)]">Learning Philosophy</h3>
                      <p className="text-[11px] text-[var(--accent)] font-semibold uppercase tracking-wide">Education Without Boundaries</p>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent mb-3 flex-shrink-0" />

                  {/* Scrollable content - larger text */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">
                      Exodus Academy believes sustainability education should meet every learner where they are. From <span className="font-semibold text-[var(--accent)]">elementary explorers</span> to <span className="font-semibold text-[var(--accent)]">doctoral researchers</span>.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Our adaptive curriculum grows with you—adjusting complexity, depth, and delivery to match your unique learning journey. No one gets left behind or held back.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Learn through interactive games, hands-on simulations, and real-world projects that create tangible environmental impact.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Every completed module earns certificates that build your STOCK score—proof of your growing expertise and commitment to our planet.
                    </p>
                  </div>

                  {/* Footer badges - larger */}
                  <div className="flex items-center justify-center gap-3 pt-3 mt-3 border-t border-[var(--accent)]/30 flex-shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--primary)]/15">
                      <Gamepad2 className="w-4 h-4 text-[var(--primary)]" />
                      <span className="text-xs font-medium text-[var(--primary)]">Interactive</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent)]/15">
                      <Target className="w-4 h-4 text-[var(--accent)]" />
                      <span className="text-xs font-medium text-[var(--accent)]">Adaptive</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--secondary)]/15">
                      <Award className="w-4 h-4 text-[var(--secondary)]" />
                      <span className="text-xs font-medium text-[var(--secondary)]">Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>

        {/* Right column: Volition Marketing (Enhanced) + Trust */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3 flex flex-col gap-3 min-h-[260px] lg:min-h-[360px]"
        >
          {/* Volition Marketing Card - Flip Card with Philosophy */}
          <div
            className="relative flex-1 min-h-0"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setIsVolitionFlipped(true)}
            onMouseLeave={() => setIsVolitionFlipped(false)}
          >
            <motion.div
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isVolitionFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {/* Front Side - Features with Forest Mural */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)]/90 via-[var(--muted)]/40 to-[var(--card)]/90 rounded-xl p-4 overflow-hidden border border-[var(--border)]/30"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Forest Mural Background - Theme Aware */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Night sky gradient - theme aware */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 via-transparent to-[var(--muted)]/20" />

                  {/* Twinkling stars - top area - theme aware */}
                  <div className="absolute top-0 left-0 right-0 h-20 text-[var(--primary)] opacity-20 dark:opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 200 80">
                      <circle cx="25" cy="15" r="1" fill="currentColor"/>
                      <circle cx="60" cy="25" r="0.8" fill="currentColor" opacity="0.8"/>
                      <circle cx="95" cy="12" r="1.2" fill="currentColor"/>
                      <circle cx="130" cy="30" r="0.6" fill="currentColor" opacity="0.7"/>
                      <circle cx="165" cy="18" r="1" fill="currentColor" opacity="0.8"/>
                      <circle cx="45" cy="40" r="0.7" fill="currentColor" opacity="0.9"/>
                      <circle cx="110" cy="45" r="0.9" fill="currentColor"/>
                      <circle cx="175" cy="38" r="0.8" fill="currentColor" opacity="0.8"/>
                      <circle cx="80" cy="55" r="0.6" fill="currentColor" opacity="0.7"/>
                      <circle cx="150" cy="50" r="1" fill="currentColor"/>
                    </svg>
                  </div>

                  {/* Distant mountains silhouette - theme aware */}
                  <div className="absolute bottom-12 left-0 right-0 h-20 text-[var(--accent)] opacity-[0.12]">
                    <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                      <path d="M0 80 L20 45 L45 60 L70 30 L100 50 L130 25 L160 55 L180 40 L200 55 L200 80 Z" fill="currentColor"/>
                      <path d="M0 80 L30 55 L60 65 L90 45 L120 60 L150 42 L200 60 L200 80 Z" fill="currentColor" opacity="0.7"/>
                    </svg>
                  </div>

                  {/* Pine trees - left side - theme aware */}
                  <div className="absolute left-0 bottom-0 h-32 w-16 text-[var(--primary)] opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 64 130">
                      {/* Tree 1 - tall */}
                      <path d="M20 130 L20 85 L8 95 L20 75 L6 88 L20 65 L4 80 L20 50 L14 58 L20 40 L26 58 L20 50 L36 80 L20 65 L34 88 L20 75 L32 95 L20 85 L20 130" fill="currentColor" opacity="0.9"/>
                      <rect x="18" y="115" width="4" height="15" className="fill-[var(--muted-foreground)]" opacity="0.4"/>
                      {/* Tree 2 - shorter */}
                      <path d="M45 130 L45 100 L38 108 L45 90 L36 100 L45 78 L42 84 L45 70 L48 84 L45 78 L54 100 L45 90 L52 108 L45 100 L45 130" fill="currentColor" opacity="0.8"/>
                      <rect x="43" y="120" width="4" height="10" className="fill-[var(--muted-foreground)]" opacity="0.4"/>
                    </svg>
                  </div>

                  {/* Pine trees - right side - theme aware */}
                  <div className="absolute right-0 bottom-0 h-28 w-14 text-[var(--primary)] opacity-15">
                    <svg className="w-full h-full" viewBox="0 0 56 115">
                      {/* Tree 1 */}
                      <path d="M35 115 L35 82 L26 92 L35 70 L24 84 L35 58 L30 66 L35 48 L40 66 L35 58 L46 84 L35 70 L44 92 L35 82 L35 115" fill="currentColor" opacity="0.9"/>
                      <rect x="33" y="105" width="4" height="10" className="fill-[var(--muted-foreground)]" opacity="0.4"/>
                      {/* Tree 2 - smaller */}
                      <path d="M15 115 L15 95 L10 100 L15 85 L8 92 L15 75 L12 80 L15 68 L18 80 L15 75 L22 92 L15 85 L20 100 L15 95 L15 115" fill="currentColor" opacity="0.7"/>
                      <rect x="13" y="108" width="4" height="7" className="fill-[var(--muted-foreground)]" opacity="0.4"/>
                    </svg>
                  </div>

                  {/* Flying birds - V formation - theme aware */}
                  <div className="absolute top-8 right-8 w-16 h-10 text-[var(--foreground)] opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 65 40">
                      <path d="M5 20 Q10 15 15 20 Q10 17 5 20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M20 15 Q26 9 32 15 Q26 11 20 15" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M35 22 Q40 17 45 22 Q40 19 35 22" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M50 12 Q54 8 58 12 Q54 9 50 12" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <path d="M28 28 Q32 24 36 28 Q32 25 28 28" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>

                  {/* Soft corner glows - theme aware */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[var(--accent)]/15 blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-18 h-18 rounded-full bg-[var(--primary)]/10 blur-xl" />
                </div>

                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />
                <CornerOrnament position="bl" />
                <CornerOrnament position="br" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with icon badge - Larger */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-sm"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <TrendingUp className="w-4 h-4 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-base tracking-tight text-[var(--foreground)]">Volition</h3>
                    </div>
                    <motion.span
                      className="text-[10px] px-2.5 py-1 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-full text-[var(--primary)] font-semibold border border-[var(--primary)]/20"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      7 Lanes
                    </motion.span>
                  </div>

                  {/* Description - Larger */}
                  <p className="text-xs text-[var(--muted-foreground)] mb-2 leading-relaxed">
                    Track your stock in Project Exodus
                  </p>

                  {/* Decorative divider */}
                  <DecorativeDivider className="mb-3" />

                  {/* 7 Lanes Grid - Larger */}
                  <div className="flex-1 grid grid-cols-2 gap-1.5">
                    {volitionLanes.map((lane, i) => {
                      const Icon = lane.icon
                      return (
                        <motion.div
                          key={lane.label}
                          className="flex items-center gap-2 bg-[var(--muted)]/50 rounded-lg px-2.5 py-2 border border-[var(--border)]/30 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Icon className={`w-4 h-4 ${lane.color}`} />
                          <span className="text-[10px] font-semibold text-[var(--foreground)]">{lane.label}</span>
                        </motion.div>
                      )
                    })}
                    {/* Extra slot for Impact highlight */}
                    <motion.div
                      className="col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--primary)]/15 to-[var(--accent)]/15 rounded-lg py-2 border border-[var(--primary)]/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Globe className="w-4 h-4 text-[var(--primary)]" />
                      <span className="text-[10px] font-bold text-[var(--primary)]">Environmental Impact</span>
                      <Leaf className="w-3 h-3 text-[var(--accent)]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Back Side - Philosophy with Forest Mural (Larger text with internal scroll) */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)]/95 via-[var(--muted)]/30 to-[var(--card)]/95 rounded-xl p-4 border border-[var(--border)]/30 flex flex-col"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* Forest Mural Background for back - theme aware */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/15 via-transparent to-[var(--muted)]/20" />

                  {/* Stars for back - theme aware */}
                  <div className="absolute top-0 left-0 right-0 h-16 text-[var(--primary)] opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 200 65">
                      <circle cx="20" cy="12" r="0.8" fill="currentColor"/>
                      <circle cx="55" cy="20" r="1" fill="currentColor" opacity="0.8"/>
                      <circle cx="90" cy="8" r="0.7" fill="currentColor" opacity="0.9"/>
                      <circle cx="125" cy="25" r="0.9" fill="currentColor"/>
                      <circle cx="160" cy="15" r="0.8" fill="currentColor" opacity="0.8"/>
                      <circle cx="180" cy="30" r="0.6" fill="currentColor" opacity="0.9"/>
                    </svg>
                  </div>

                  {/* Pine trees silhouette - back - theme aware */}
                  <div className="absolute left-0 bottom-0 h-24 w-12 text-[var(--primary)] opacity-15">
                    <svg className="w-full h-full" viewBox="0 0 48 100">
                      <path d="M16 100 L16 70 L8 78 L16 60 L6 72 L16 48 L12 54 L16 38 L20 54 L16 48 L26 72 L16 60 L24 78 L16 70 L16 100" fill="currentColor"/>
                      <rect x="14" y="90" width="4" height="10" className="fill-[var(--muted-foreground)]" opacity="0.4"/>
                    </svg>
                  </div>

                  <div className="absolute right-0 bottom-0 h-20 w-10 text-[var(--primary)] opacity-[0.12]">
                    <svg className="w-full h-full" viewBox="0 0 40 80">
                      <path d="M25 80 L25 58 L19 64 L25 48 L17 56 L25 38 L22 43 L25 30 L28 43 L25 38 L33 56 L25 48 L31 64 L25 58 L25 80" fill="currentColor"/>
                      <rect x="23" y="72" width="4" height="8" className="fill-[var(--muted-foreground)]" opacity="0.4"/>
                    </svg>
                  </div>

                  {/* Soft glows - theme aware */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[var(--accent)]/20 blur-2xl" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-[var(--primary)]/15 blur-xl" />
                </div>

                <div className="relative z-10 h-full flex flex-col overflow-hidden">
                  {/* Header - Larger */}
                  <div className="flex items-center gap-3 mb-3 flex-shrink-0">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-base text-[var(--foreground)]">You Are The Asset</h3>
                      <p className="text-[11px] text-[var(--accent)] font-semibold uppercase tracking-wide">Beyond Traditional Metrics</p>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent mb-3 flex-shrink-0" />

                  {/* Scrollable content - with explicit overflow */}
                  <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 space-y-3">
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">
                      Traditional systems measure what you <span className="font-semibold text-[var(--accent)]">have</span>. Volition measures who you are <span className="font-semibold text-[var(--accent)]">becoming</span>.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Your STOCK score captures growth across 7 interconnected lanes of life: Identity, Projects, Articles, Learning, Network, Feed, and Impact.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Every connection made, lesson learned, and impact created adds to your evolving value. Sustainable change starts with investing in yourself.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Watch your personal stock rise as you engage authentically with a community dedicated to positive transformation.
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Join thousands of guardians who have discovered that true wealth comes from contribution, connection, and continuous growth.
                    </p>
                  </div>

                  {/* Footer badges - Larger */}
                  <div className="flex items-center justify-center gap-3 pt-3 mt-auto border-t border-[var(--accent)]/30 flex-shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent)]/15">
                      <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
                      <span className="text-xs font-medium text-[var(--accent)]">Growth</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--primary)]/15">
                      <Leaf className="w-4 h-4 text-[var(--primary)]" />
                      <span className="text-xs font-medium text-[var(--primary)]">Impact</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative bg-gradient-to-r from-[var(--card)]/90 via-[var(--muted)]/20 to-[var(--card)]/90 backdrop-blur-md border border-[var(--border)]/50 rounded-xl p-2.5 overflow-hidden"
          >
            {/* Subtle decorative glows */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--primary)]/10 blur-md" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--accent)]/10 blur-md" />

            <div className="relative z-10 flex items-center justify-around">
              <div className="flex items-center gap-1.5 px-2 py-1">
                <Shield className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="text-[9px] text-[var(--foreground)] font-medium">Safe & Private</span>
              </div>

              {/* Decorative divider */}
              <div className="w-px h-4 bg-[var(--border)]/50" />

              <div className="flex items-center gap-1.5 px-2 py-1">
                <Crown className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="text-[9px] text-[var(--foreground)] font-medium">Always Free</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Banner - Directly under the fold */}
      <div className="relative z-20 mt-[90px] border-y border-[var(--border)]/20 bg-[var(--muted)]/30 backdrop-blur-sm">
        <AnimatedStatsBar />
      </div>
    </div>
  )
}
