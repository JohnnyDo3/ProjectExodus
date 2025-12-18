'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, Crown, Sparkles, TrendingUp,
  User, Briefcase, FileText, BookOpen, Users, MessageCircle, Leaf,
  Star, Lock, Globe, Zap, Heart, ArrowRight, GraduationCap, Gamepad2, Brain, Target, Award,
  Droplet, Sprout, Recycle, Home
} from 'lucide-react'
import Link from 'next/link'
import { BusinessCardThemeShowcase } from './BusinessCardThemeShowcase'
import { FeaturedGuardiansCarousel } from './FeaturedGuardiansCarousel'
import { AnimatedStatsBar } from './AnimatedStatsBar'
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

      {/* Main content - extended widgets section */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 sm:p-4 min-h-[55vh] lg:min-h-[60vh]">
        {/* Left column: BizID Showcase - Flip Card */}
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
            {/* Front Side - BizID Features with Ivy Mural */}
            <GlowingBorder className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
              <motion.div
                className="relative h-full bg-gradient-to-br from-stone-100/95 via-[var(--card)]/95 to-amber-50/90 dark:from-stone-900/95 dark:via-[var(--card)]/95 dark:to-amber-950/90 backdrop-blur-md border border-stone-300/30 dark:border-stone-700/30 rounded-xl p-3 overflow-hidden flex flex-col"
              >
                {/* Ancient Scroll / Ivy Mural Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Parchment texture gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-stone-200/20 dark:from-amber-900/10 dark:to-stone-800/10" />

                  {/* Ivy vine - left side */}
                  <svg className="absolute left-0 top-0 h-full w-10 opacity-20" viewBox="0 0 40 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="ivyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#166534"/>
                        <stop offset="100%" stopColor="#15803d"/>
                      </linearGradient>
                    </defs>
                    {/* Main vine */}
                    <path d="M5 0 Q15 30 8 60 Q2 90 12 120 Q18 150 6 180 Q3 195 8 200" fill="none" stroke="#166534" strokeWidth="2"/>
                    {/* Ivy leaves */}
                    <path d="M8 25 Q15 20 12 30 Q8 35 8 25" fill="url(#ivyGreen)"/>
                    <path d="M6 55 Q-2 50 2 60 Q6 68 6 55" fill="url(#ivyGreen)"/>
                    <path d="M10 85 Q18 78 15 90 Q10 98 10 85" fill="url(#ivyGreen)"/>
                    <path d="M14 115 Q22 110 18 122 Q12 128 14 115" fill="url(#ivyGreen)"/>
                    <path d="M8 145 Q0 140 4 152 Q10 158 8 145" fill="url(#ivyGreen)"/>
                    <path d="M5 175 Q12 168 10 180 Q4 188 5 175" fill="url(#ivyGreen)"/>
                  </svg>

                  {/* Ivy vine - right side */}
                  <svg className="absolute right-0 top-0 h-full w-10 opacity-15" viewBox="0 0 40 200" preserveAspectRatio="none">
                    <path d="M35 0 Q25 25 32 55 Q38 85 28 115 Q22 145 34 175 Q37 190 32 200" fill="none" stroke="#166534" strokeWidth="1.5"/>
                    <path d="M32 30 Q25 25 28 35 Q34 40 32 30" fill="#15803d"/>
                    <path d="M30 70 Q38 65 35 75 Q28 82 30 70" fill="#15803d"/>
                    <path d="M26 110 Q18 105 22 115 Q28 122 26 110" fill="#15803d"/>
                    <path d="M32 150 Q40 145 36 155 Q30 162 32 150" fill="#15803d"/>
                  </svg>

                  {/* Decorative Greek key border - top */}
                  <svg className="absolute top-0 left-8 right-8 h-3 opacity-10" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <pattern id="greekKey" patternUnits="userSpaceOnUse" width="24" height="12">
                      <path d="M0 6 L6 6 L6 0 L12 0 L12 6 L18 6 L18 12 L24 12 M24 6 L18 6" fill="none" stroke="#78716c" strokeWidth="1"/>
                    </pattern>
                    <rect x="0" y="0" width="200" height="12" fill="url(#greekKey)"/>
                  </svg>

                  {/* Soft golden corner glow */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-amber-300/10 dark:bg-amber-600/10 blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-emerald-300/10 dark:bg-emerald-700/10 blur-xl" />
                </div>

                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />
                <CornerOrnament position="bl" />
                <CornerOrnament position="br" />

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
                      animate={{
                        scale: [1, 1.02, 1],
                        borderColor: ['rgba(var(--primary-rgb), 0.2)', 'rgba(var(--primary-rgb), 0.4)', 'rgba(var(--primary-rgb), 0.2)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      7 Themes
                    </motion.span>
                  </div>
                  <DecorativeDivider className="mb-2" />
                </div>

                {/* Features row - enhanced */}
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
                        <motion.div
                          className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--muted)] to-[var(--muted)]/50 flex items-center justify-center border border-[var(--border)]/50 shadow-sm group-hover:shadow-md group-hover:border-[var(--primary)]/30 transition-all"
                          whileHover={{
                            background: 'linear-gradient(135deg, var(--primary)/20, var(--accent)/20)'
                          }}
                        >
                          <Icon className="w-3.5 h-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
                        </motion.div>
                        <span className="text-[7px] text-[var(--muted-foreground)] font-medium">{feature.label}</span>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Fake User ID Previews - Showcasing different archetypes */}
                <div className="relative z-10 flex-1 min-h-0 flex flex-col">
                  {/* Theme selector dots */}
                  <div className="flex justify-center gap-1.5 mb-2">
                    {fakeUserPreviews.map((user, index) => (
                      <motion.button
                        key={user.theme}
                        onClick={() => setActiveUserIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${user.gradient} transition-all duration-300`}
                        animate={{
                          scale: index === activeUserIndex ? 1.4 : 1,
                          opacity: index === activeUserIndex ? 1 : 0.4,
                        }}
                        whileHover={{ scale: 1.3, opacity: 0.8 }}
                      />
                    ))}
                  </div>

                  {/* User ID Card Preview */}
                  <div className="flex-1 flex items-center justify-center min-h-0">
                    <motion.div
                      key={activeUserIndex}
                      initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="relative w-full max-w-[200px]"
                    >
                      {/* Ambient glow */}
                      <motion.div
                        className={`absolute inset-2 rounded-xl blur-xl opacity-30 bg-gradient-to-br ${fakeUserPreviews[activeUserIndex].gradient}`}
                        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Card */}
                      <div className="relative bg-[var(--card)] border border-[var(--border)]/50 rounded-xl overflow-hidden shadow-lg">
                        {/* Gradient header */}
                        <div className={`h-10 bg-gradient-to-r ${fakeUserPreviews[activeUserIndex].gradient} relative overflow-hidden`}>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                          />
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Shield className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>

                        {/* Avatar overlapping header */}
                        <div className="relative -mt-5 px-2.5">
                          <motion.div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${fakeUserPreviews[activeUserIndex].gradient} p-0.5 shadow-md`}
                            animate={{ boxShadow: ['0 4px 15px rgba(0,0,0,0.15)', '0 6px 20px rgba(0,0,0,0.25)', '0 4px 15px rgba(0,0,0,0.15)'] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          >
                            <div className="w-full h-full rounded-md bg-[var(--card)] flex items-center justify-center">
                              <User className={`w-4 h-4 ${fakeUserPreviews[activeUserIndex].accentColor}`} />
                            </div>
                          </motion.div>
                        </div>

                        {/* Content */}
                        <div className="p-2.5 pt-1">
                          <p className="font-bold text-xs text-[var(--foreground)] mb-0.5">{fakeUserPreviews[activeUserIndex].name}</p>
                          <p className={`text-[9px] ${fakeUserPreviews[activeUserIndex].accentColor} italic mb-1.5 flex items-center gap-1`}>
                            <Star className="w-2 h-2" />
                            <span>"{fakeUserPreviews[activeUserIndex].declaration}"</span>
                          </p>
                          <div className={`flex items-center justify-between py-1 px-1.5 rounded bg-gradient-to-r ${fakeUserPreviews[activeUserIndex].gradient}/10`}>
                            <span className="text-[9px] font-medium text-[var(--muted-foreground)]">STOCK</span>
                            <div className="flex items-center gap-0.5">
                              <TrendingUp className={`w-2.5 h-2.5 ${fakeUserPreviews[activeUserIndex].accentColor}`} />
                              <span className={`text-[10px] font-bold ${fakeUserPreviews[activeUserIndex].accentColor}`}>{fakeUserPreviews[activeUserIndex].stock}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Tagline */}
                  <p className="text-[9px] text-center text-[var(--muted-foreground)] mt-1">
                    7 Guardian Themes • Express Your Values
                  </p>
                </div>

              </motion.div>
            </GlowingBorder>

            {/* Back Side - BizID Philosophy (Larger text with internal scroll) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50/80 to-stone-100 dark:from-stone-900 dark:via-amber-950/80 dark:to-stone-900 rounded-xl p-3 overflow-hidden border border-amber-300/30 dark:border-amber-700/30"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {/* Decorative glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-300/10 via-transparent to-emerald-300/10 dark:from-amber-600/10 dark:to-emerald-600/10"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-amber-500/20 dark:bg-amber-600/30 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--foreground)]">Guardian Identity</h3>
                    <p className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold uppercase tracking-wide">Your Values Define You</p>
                  </div>
                </div>

                {/* Decorative divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-2 flex-shrink-0" />

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
                  <p className="text-xs text-[var(--foreground)] leading-relaxed">
                    Choose from <span className="font-semibold text-amber-600 dark:text-amber-400">7 Guardian archetypes</span> that reflect your core values: Steward, Pioneer, Sage, Warrior, Healer, Creator, or Connector.
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    Each archetype represents a unique approach to building a sustainable future. Your theme colors, badges, and visual identity all flow from this foundational choice.
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    Your BizID becomes your declaration—a living statement of purpose that evolves with your journey. Connect with others who share your values and build meaningful relationships grounded in shared vision.
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    The STOCK score tracks your growth across all platform activities, creating a holistic picture of your contribution to the sustainability movement.
                  </p>
                </div>

                {/* Footer badges */}
                <div className="flex items-center justify-center gap-3 pt-2 mt-2 border-t border-amber-500/20 flex-shrink-0">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-rose-500/10">
                    <Heart className="w-3 h-3 text-rose-500" />
                    <span className="text-[10px] font-medium text-rose-600 dark:text-rose-400">Values-First</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10">
                    <Users className="w-3 h-3 text-blue-500" />
                    <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">Community</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center column: Learning Academy + Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-3 min-h-[260px] lg:min-h-[360px]"
        >
          {/* Learning Academy - Flip Card with Philosophy */}
          <div
            className="relative flex-[2] min-h-[180px] lg:min-h-[220px]"
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
                className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-[var(--card)]/95 to-sky-50/90 dark:from-emerald-950/90 dark:via-[var(--card)]/95 dark:to-sky-950/90 backdrop-blur-md border border-emerald-200/30 dark:border-emerald-800/30 rounded-xl p-3 overflow-hidden flex flex-col"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Zen Garden Mural Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Soft gradient sky */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 via-transparent to-emerald-100/20 dark:from-sky-900/20 dark:to-emerald-900/20" />

                  {/* Bamboo stalks - left side */}
                  <svg className="absolute left-0 top-0 h-full w-12 opacity-20" viewBox="0 0 48 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="bambooGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e"/>
                        <stop offset="50%" stopColor="#16a34a"/>
                        <stop offset="100%" stopColor="#22c55e"/>
                      </linearGradient>
                    </defs>
                    {/* Bamboo stalk 1 */}
                    <rect x="8" y="0" width="6" height="200" fill="url(#bambooGreen)" rx="3"/>
                    <line x1="8" y1="30" x2="14" y2="30" stroke="#15803d" strokeWidth="1"/>
                    <line x1="8" y1="70" x2="14" y2="70" stroke="#15803d" strokeWidth="1"/>
                    <line x1="8" y1="110" x2="14" y2="110" stroke="#15803d" strokeWidth="1"/>
                    <line x1="8" y1="150" x2="14" y2="150" stroke="#15803d" strokeWidth="1"/>
                    {/* Bamboo stalk 2 */}
                    <rect x="22" y="20" width="5" height="180" fill="url(#bambooGreen)" rx="2.5"/>
                    <line x1="22" y1="50" x2="27" y2="50" stroke="#15803d" strokeWidth="1"/>
                    <line x1="22" y1="90" x2="27" y2="90" stroke="#15803d" strokeWidth="1"/>
                    <line x1="22" y1="130" x2="27" y2="130" stroke="#15803d" strokeWidth="1"/>
                    {/* Bamboo leaves */}
                    <path d="M14 25 Q20 20 26 28" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
                    <path d="M14 65 Q22 58 30 68" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
                    <path d="M27 85 Q35 78 40 90" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
                  </svg>

                  {/* Cherry blossom branch - top right */}
                  <svg className="absolute right-0 top-0 w-24 h-20 opacity-25" viewBox="0 0 100 80">
                    {/* Branch */}
                    <path d="M100 10 Q70 15 50 30 Q35 40 20 35" fill="none" stroke="#78350f" strokeWidth="2"/>
                    <path d="M50 30 Q45 45 35 50" fill="none" stroke="#78350f" strokeWidth="1.5"/>
                    {/* Blossoms */}
                    <circle cx="48" cy="28" r="6" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="0.5"/>
                    <circle cx="35" cy="36" r="5" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="0.5"/>
                    <circle cx="55" cy="22" r="4" fill="#fbcfe8" stroke="#f9a8d4" strokeWidth="0.5"/>
                    <circle cx="25" cy="32" r="5" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="0.5"/>
                    <circle cx="40" cy="48" r="4" fill="#fbcfe8" stroke="#f9a8d4" strokeWidth="0.5"/>
                    {/* Blossom centers */}
                    <circle cx="48" cy="28" r="1.5" fill="#fda4af"/>
                    <circle cx="35" cy="36" r="1.5" fill="#fda4af"/>
                    <circle cx="25" cy="32" r="1.5" fill="#fda4af"/>
                  </svg>

                  {/* Zen sand ripples - bottom */}
                  <svg className="absolute bottom-0 left-0 right-0 h-16 opacity-10" viewBox="0 0 400 60" preserveAspectRatio="none">
                    <defs>
                      <pattern id="sandRipple" patternUnits="userSpaceOnUse" width="40" height="20">
                        <path d="M0 10 Q10 5 20 10 Q30 15 40 10" fill="none" stroke="#a16207" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="400" height="60" fill="url(#sandRipple)"/>
                    {/* Zen stone */}
                    <ellipse cx="350" cy="40" rx="15" ry="8" fill="#78716c" opacity="0.5"/>
                    <ellipse cx="330" cy="45" rx="10" ry="5" fill="#a8a29e" opacity="0.4"/>
                  </svg>

                  {/* Distant mountains silhouette */}
                  <svg className="absolute bottom-8 left-0 right-0 h-12 opacity-[0.07]" viewBox="0 0 400 50" preserveAspectRatio="none">
                    <path d="M0 50 L30 25 L60 40 L100 15 L150 35 L200 10 L250 30 L300 20 L350 35 L400 25 L400 50 Z" fill="#1e3a5f"/>
                  </svg>

                  {/* Floating lotus - bottom right */}
                  <svg className="absolute bottom-2 right-8 w-14 h-10 opacity-20" viewBox="0 0 60 40">
                    {/* Water ripple */}
                    <ellipse cx="30" cy="35" rx="25" ry="4" fill="none" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.5"/>
                    {/* Lotus petals */}
                    <path d="M30 30 Q25 20 30 10 Q35 20 30 30" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="0.3"/>
                    <path d="M30 30 Q20 25 15 18 Q25 22 30 30" fill="#fbcfe8" stroke="#f9a8d4" strokeWidth="0.3"/>
                    <path d="M30 30 Q40 25 45 18 Q35 22 30 30" fill="#fbcfe8" stroke="#f9a8d4" strokeWidth="0.3"/>
                    <path d="M30 30 Q18 28 12 24 Q22 27 30 30" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="0.3"/>
                    <path d="M30 30 Q42 28 48 24 Q38 27 30 30" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="0.3"/>
                    {/* Lotus center */}
                    <circle cx="30" cy="25" r="3" fill="#fcd34d"/>
                  </svg>

                  {/* Koi fish - subtle */}
                  <svg className="absolute bottom-4 left-1/4 w-8 h-5 opacity-15" viewBox="0 0 40 25">
                    <path d="M5 12 Q15 5 30 12 Q35 12 38 15 Q35 12 30 12 Q15 19 5 12" fill="#f97316"/>
                    <circle cx="8" cy="11" r="1" fill="#1f2937"/>
                    <path d="M32 8 Q38 5 35 12 Q38 19 32 16" fill="#f97316" opacity="0.8"/>
                  </svg>
                </div>

                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-1.5 flex-shrink-0">
                  <h2 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                    <motion.div
                      className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <GraduationCap className="w-3 h-3 text-white" />
                    </motion.div>
                    Exodus Academy
                  </h2>
                  <motion.span
                    className="text-[9px] px-2 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    6 Levels
                  </motion.span>
                </div>

                <DecorativeDivider className="mb-1.5 flex-shrink-0" />

                {/* Grade Levels - Horizontal Timeline */}
                <div className="relative z-10 mb-1.5 flex-shrink-0">
                  <p className="text-[8px] text-[var(--muted-foreground)] font-medium mb-1 uppercase tracking-wide">Grade Levels</p>
                  <div className="relative flex items-center justify-between px-1">
                    {/* Timeline connector line */}
                    <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-gradient-to-r from-green-400 via-purple-400 to-indigo-500 opacity-30 -translate-y-1/2" />

                    {gradeLevels.map((level, i) => (
                      <motion.div
                        key={level.id}
                        className="relative flex flex-col items-center z-10"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center shadow-sm`}>
                          <span className="text-[9px]">{level.icon}</span>
                        </div>
                        <p className="text-[6px] font-medium text-[var(--muted-foreground)] mt-0.5 text-center leading-tight">{level.ages}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Core Learn Topics - From Learn Page */}
                <div className="relative z-10 flex-1 min-h-0 mb-1.5 overflow-hidden">
                  <p className="text-[8px] text-[var(--muted-foreground)] font-medium mb-1 uppercase tracking-wide flex-shrink-0">Core Topics</p>
                  <div className="grid grid-cols-2 gap-1 overflow-y-auto">
                    {coreLearnTopics.map((topic, i) => {
                      const Icon = topic.icon
                      return (
                        <motion.div
                          key={topic.name}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${topic.bgColor} border border-[var(--border)]/20`}
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

                {/* Key Features - Inline compact row */}
                <div className="relative z-10 flex items-center justify-center gap-2 py-1 bg-[var(--muted)]/30 rounded-lg flex-shrink-0">
                  <div className="flex items-center gap-0.5">
                    <Gamepad2 className="w-2.5 h-2.5 text-amber-500" />
                    <span className="text-[6px] font-medium text-[var(--muted-foreground)]">Games</span>
                  </div>
                  <div className="w-px h-2 bg-[var(--border)]" />
                  <div className="flex items-center gap-0.5">
                    <Brain className="w-2.5 h-2.5 text-cyan-500" />
                    <span className="text-[6px] font-medium text-[var(--muted-foreground)]">Adaptive</span>
                  </div>
                  <div className="w-px h-2 bg-[var(--border)]" />
                  <div className="flex items-center gap-0.5">
                    <Award className="w-2.5 h-2.5 text-purple-500" />
                    <span className="text-[6px] font-medium text-[var(--muted-foreground)]">Certs</span>
                  </div>
                </div>
              </div>

              {/* Back Side - Learning Philosophy (Larger text with internal scroll) */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-emerald-50/95 via-sky-50/90 to-emerald-50/95 dark:from-emerald-950/95 dark:via-sky-950/90 dark:to-emerald-950/95 rounded-xl p-3 overflow-hidden border border-sky-300/30 dark:border-sky-700/30"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* Decorative glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-sky-300/10 via-transparent to-emerald-300/10 dark:from-sky-600/10 dark:to-emerald-600/10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-sky-500/20 dark:bg-sky-600/30 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--foreground)]">Learning Philosophy</h3>
                      <p className="text-[10px] text-sky-700 dark:text-sky-300 font-semibold uppercase tracking-wide">Education Without Boundaries</p>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent mb-2 flex-shrink-0" />

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
                    <p className="text-xs text-[var(--foreground)] leading-relaxed">
                      Exodus Academy believes sustainability education should meet every learner where they are. From <span className="font-semibold text-sky-600 dark:text-sky-400">elementary explorers</span> to <span className="font-semibold text-sky-600 dark:text-sky-400">doctoral researchers</span>.
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Our adaptive curriculum grows with you—adjusting complexity, depth, and delivery to match your unique learning journey. No one gets left behind or held back.
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Learn through interactive games, hands-on simulations, and real-world projects that create tangible environmental impact.
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      Every completed module earns certificates that build your STOCK score—proof of your growing expertise and commitment to our planet.
                    </p>
                  </div>

                  {/* Footer badges */}
                  <div className="flex items-center justify-center gap-2 pt-2 mt-2 border-t border-sky-500/20 flex-shrink-0">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10">
                      <Gamepad2 className="w-3 h-3 text-amber-500" />
                      <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">Interactive</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10">
                      <Target className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Adaptive</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10">
                      <Award className="w-3 h-3 text-purple-500" />
                      <span className="text-[10px] font-medium text-purple-600 dark:text-purple-400">Certified</span>
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
            className="relative flex-1"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setIsVolitionFlipped(true)}
            onMouseLeave={() => setIsVolitionFlipped(false)}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isVolitionFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              {/* Front Side - Features with Forest Mural */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-800 via-emerald-900/90 to-slate-900 rounded-xl p-3 text-white overflow-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Forest Mural Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Soft gradient sky */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-700/40 via-transparent to-emerald-950/30" />

                  {/* Distant mountains */}
                  <svg className="absolute bottom-0 left-0 right-0 h-24 opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <path d="M0 100 L20 60 L40 80 L70 40 L100 70 L140 30 L170 55 L200 45 L200 100 Z" fill="#1e3a5f"/>
                    <path d="M0 100 L30 75 L60 85 L90 65 L130 80 L160 70 L200 80 L200 100 Z" fill="#374151" opacity="0.7"/>
                  </svg>

                  {/* Pine tree silhouettes - left */}
                  <svg className="absolute left-0 bottom-0 w-16 h-28 opacity-25" viewBox="0 0 60 100">
                    <path d="M15 100 L15 70 L5 70 L15 55 L8 55 L15 40 L10 40 L17 20 L24 40 L19 40 L26 55 L19 55 L29 70 L19 70 L19 100 Z" fill="#064e3b"/>
                    <path d="M35 100 L35 75 L28 75 L35 62 L30 62 L37 45 L44 62 L39 62 L46 75 L39 75 L39 100 Z" fill="#065f46"/>
                  </svg>

                  {/* Pine tree silhouettes - right */}
                  <svg className="absolute right-0 bottom-0 w-14 h-24 opacity-20" viewBox="0 0 50 90">
                    <path d="M25 90 L25 65 L18 65 L25 50 L20 50 L27 30 L34 50 L29 50 L36 65 L29 65 L29 90 Z" fill="#064e3b"/>
                  </svg>

                  {/* Flying birds */}
                  <svg className="absolute top-4 right-8 w-12 h-8 opacity-30" viewBox="0 0 50 30">
                    <path d="M5 15 Q10 10 15 15 Q20 10 25 15" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M25 10 Q30 5 35 10 Q40 5 45 10" fill="none" stroke="#e2e8f0" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M12 22 Q16 18 20 22 Q24 18 28 22" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeLinecap="round"/>
                  </svg>

                  {/* Soft sun glow */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-amber-200/10 blur-xl" />

                  {/* Subtle stars */}
                  <svg className="absolute top-3 left-6 w-20 h-16 opacity-20" viewBox="0 0 80 60">
                    <circle cx="10" cy="10" r="0.8" fill="#fef3c7"/>
                    <circle cx="35" cy="5" r="0.6" fill="#fef3c7"/>
                    <circle cx="60" cy="12" r="0.7" fill="#fef3c7"/>
                    <circle cx="25" cy="20" r="0.5" fill="#fef3c7"/>
                    <circle cx="70" cy="25" r="0.6" fill="#fef3c7"/>
                  </svg>

                  {/* Ground foliage hint */}
                  <svg className="absolute bottom-0 left-0 right-0 h-6 opacity-15" viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M0 20 Q10 15 20 20 Q30 12 40 20 Q50 14 60 20 Q70 16 80 20 Q90 13 100 20 Q110 17 120 20 Q130 14 140 20 Q150 16 160 20 Q170 12 180 20 Q190 15 200 20 Z" fill="#059669"/>
                  </svg>
                </div>

                {/* Corner ornaments - more subtle */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="br" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with icon badge */}
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      className="w-6 h-6 rounded-lg bg-emerald-700/50 flex items-center justify-center backdrop-blur-sm border border-emerald-600/30"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-200" />
                    </motion.div>
                    <h3 className="font-bold text-sm tracking-tight text-emerald-50">Volition</h3>
                  </div>

                  {/* Description */}
                  <p className="text-[9px] text-emerald-200/70 mb-2 leading-relaxed pl-0.5">
                    Track your stock in Project Exodus
                  </p>

                  {/* Decorative line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-2" />

                  {/* 7 Lanes Grid - Muted colors */}
                  <div className="flex-1 grid grid-cols-2 gap-1">
                    {volitionLanes.map((lane, i) => {
                      const Icon = lane.icon
                      return (
                        <motion.div
                          key={lane.label}
                          className="flex items-center gap-1.5 bg-slate-800/50 rounded-lg px-2 py-1 border border-emerald-800/30 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                        >
                          <Icon className={`w-3 h-3 ${lane.color}`} />
                          <span className="text-[9px] font-medium text-slate-200">{lane.label}</span>
                        </motion.div>
                      )
                    })}
                    {/* Extra slot for Impact highlight */}
                    <motion.div
                      className="col-span-2 flex items-center justify-center gap-1.5 bg-emerald-900/40 rounded-lg py-1.5 border border-emerald-700/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[9px] font-semibold text-emerald-200">Environmental Impact</span>
                      <Leaf className="w-2.5 h-2.5 text-emerald-400" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Back Side - Philosophy (Larger text with internal scroll) */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-800 via-emerald-900/80 to-slate-900 rounded-xl p-3 overflow-hidden border border-emerald-700/30"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* Decorative glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                    <motion.div
                      className="w-7 h-7 rounded-full bg-emerald-600/30 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-sm text-emerald-100">You Are The Asset</h3>
                      <p className="text-[9px] text-emerald-300 font-semibold uppercase tracking-wide">Beyond Traditional Metrics</p>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-2 flex-shrink-0" />

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-2">
                    <p className="text-[11px] text-emerald-50 leading-relaxed">
                      Traditional systems measure what you <span className="font-semibold text-emerald-400">have</span>. Volition measures who you are <span className="font-semibold text-emerald-400">becoming</span>.
                    </p>
                    <p className="text-[11px] text-slate-300/90 leading-relaxed">
                      Your STOCK score captures growth across 7 interconnected lanes of life: Identity, Projects, Articles, Learning, Network, Feed, and Impact.
                    </p>
                    <p className="text-[11px] text-slate-300/90 leading-relaxed">
                      Every connection made, lesson learned, and impact created adds to your evolving value. Sustainable change starts with investing in yourself.
                    </p>
                  </div>

                  {/* Footer badges */}
                  <div className="flex items-center justify-center gap-2 pt-2 mt-1 border-t border-emerald-500/20 flex-shrink-0">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20">
                      <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                      <span className="text-[9px] font-medium text-emerald-300">Growth</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20">
                      <Leaf className="w-2.5 h-2.5 text-green-400" />
                      <span className="text-[9px] font-medium text-green-300">Impact</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Trust Indicators - with subtle leaf artwork */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative bg-gradient-to-r from-[var(--card)]/90 via-emerald-50/5 to-[var(--card)]/90 dark:from-[var(--card)]/90 dark:via-emerald-950/10 dark:to-[var(--card)]/90 backdrop-blur-md border border-[var(--border)]/50 rounded-xl p-2.5 overflow-hidden"
          >
            {/* Subtle leaf artwork */}
            <svg className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 opacity-10" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.2 0 2.3-.2 3.4-.6-2.8-1.5-4.8-4.4-5.2-7.8-.4-3.4 1-6.8 3.6-9C13 3.4 12.5 3 12 2z" fill="#10b981"/>
              <path d="M16 4c-3.6 2.2-5 5.4-4.6 8.6.4 3.2 2.6 6 5.6 7.4 3-3 4.6-7.2 3.6-11.4C19.6 5.6 17.8 4 16 4z" fill="#059669"/>
            </svg>
            <svg className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 opacity-10 scale-x-[-1]" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.2 0 2.3-.2 3.4-.6-2.8-1.5-4.8-4.4-5.2-7.8-.4-3.4 1-6.8 3.6-9C13 3.4 12.5 3 12 2z" fill="#10b981"/>
              <path d="M16 4c-3.6 2.2-5 5.4-4.6 8.6.4 3.2 2.6 6 5.6 7.4 3-3 4.6-7.2 3.6-11.4C19.6 5.6 17.8 4 16 4z" fill="#059669"/>
            </svg>

            <div className="relative z-10 flex items-center justify-around">
              <div className="flex items-center gap-1.5 px-2 py-1">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[9px] text-[var(--foreground)] font-medium">Safe & Private</span>
              </div>

              {/* Decorative divider */}
              <div className="w-px h-4 bg-[var(--border)]/50" />

              <div className="flex items-center gap-1.5 px-2 py-1">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[9px] text-[var(--foreground)] font-medium">Always Free</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Banner - Directly under the fold */}
      <div className="relative z-20 border-y border-[var(--border)]/20 bg-[var(--muted)]/30 backdrop-blur-sm">
        <AnimatedStatsBar />
      </div>
    </div>
  )
}
