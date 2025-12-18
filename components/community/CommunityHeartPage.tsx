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

      {/* Main content - extended widgets section to fold */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 sm:p-4 flex-1 min-h-[calc(100vh-8rem)]">
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
            {/* Front Side - BizID Features */}
            <GlowingBorder className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
              <motion.div
                className="relative h-full bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--muted)]/50 backdrop-blur-md border border-[var(--border)]/30 rounded-xl p-3 overflow-hidden flex flex-col"
              >
                {/* Subtle decorative background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Theme-aware texture gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5" />

                  {/* Soft corner glows using theme colors */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[var(--primary)]/10 blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[var(--accent)]/10 blur-xl" />
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
              className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--muted)]/80 to-[var(--card)] rounded-xl p-3 overflow-hidden border border-[var(--border)]/30"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {/* Decorative glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Shield className="w-4 h-4 text-[var(--primary)]" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--foreground)]">Guardian Identity</h3>
                    <p className="text-[10px] text-[var(--primary)] font-semibold uppercase tracking-wide">Your Values Define You</p>
                  </div>
                </div>

                {/* Decorative divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent mb-2 flex-shrink-0" />

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
                  <p className="text-xs text-[var(--foreground)] leading-relaxed">
                    Choose from <span className="font-semibold text-[var(--primary)]">7 Guardian archetypes</span> that reflect your core values: Steward, Pioneer, Sage, Warrior, Healer, Creator, or Connector.
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
                <div className="flex items-center justify-center gap-3 pt-2 mt-2 border-t border-[var(--primary)]/20 flex-shrink-0">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--primary)]/10">
                    <Heart className="w-3 h-3 text-[var(--primary)]" />
                    <span className="text-[10px] font-medium text-[var(--primary)]">Values-First</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--accent)]/10">
                    <Users className="w-3 h-3 text-[var(--accent)]" />
                    <span className="text-[10px] font-medium text-[var(--accent)]">Community</span>
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
              {/* Front Side - Learning Features */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--muted)]/50 backdrop-blur-md border border-[var(--border)]/30 rounded-xl p-3 overflow-hidden flex flex-col"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Subtle decorative background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Theme-aware gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 via-transparent to-[var(--primary)]/5" />

                  {/* Soft corner glows using theme colors */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[var(--accent)]/10 blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[var(--primary)]/10 blur-xl" />
                </div>

                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-1.5 flex-shrink-0">
                  <h2 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                    <motion.div
                      className="w-5 h-5 rounded-md bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-sm"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <GraduationCap className="w-3 h-3 text-white" />
                    </motion.div>
                    Exodus Academy
                  </h2>
                  <motion.span
                    className="text-[9px] px-2 py-0.5 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-full text-[var(--primary)] font-semibold border border-[var(--primary)]/20"
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
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--muted)]/80 to-[var(--card)] rounded-xl p-3 overflow-hidden border border-[var(--border)]/30"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* Decorative glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--primary)]/10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--foreground)]">Learning Philosophy</h3>
                      <p className="text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wide">Education Without Boundaries</p>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent mb-2 flex-shrink-0" />

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
                    <p className="text-xs text-[var(--foreground)] leading-relaxed">
                      Exodus Academy believes sustainability education should meet every learner where they are. From <span className="font-semibold text-[var(--accent)]">elementary explorers</span> to <span className="font-semibold text-[var(--accent)]">doctoral researchers</span>.
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
                  <div className="flex items-center justify-center gap-2 pt-2 mt-2 border-t border-[var(--accent)]/20 flex-shrink-0">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--primary)]/10">
                      <Gamepad2 className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[10px] font-medium text-[var(--primary)]">Interactive</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--accent)]/10">
                      <Target className="w-3 h-3 text-[var(--accent)]" />
                      <span className="text-[10px] font-medium text-[var(--accent)]">Adaptive</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--primary)]/10">
                      <Award className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[10px] font-medium text-[var(--primary)]">Certified</span>
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
              {/* Front Side - Features */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--muted)]/50 rounded-xl p-3 overflow-hidden border border-[var(--border)]/30"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Decorative background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {/* Theme-aware gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5" />

                  {/* Soft corner glows */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[var(--primary)]/10 blur-xl" />
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[var(--accent)]/10 blur-2xl" />
                </div>

                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="br" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with icon badge */}
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      className="w-6 h-6 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center backdrop-blur-sm border border-[var(--primary)]/30"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)]" />
                    </motion.div>
                    <h3 className="font-bold text-sm tracking-tight text-[var(--foreground)]">Volition</h3>
                  </div>

                  {/* Description */}
                  <p className="text-[9px] text-[var(--muted-foreground)] mb-2 leading-relaxed pl-0.5">
                    Track your stock in Project Exodus
                  </p>

                  {/* Decorative line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent mb-2" />

                  {/* 7 Lanes Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-1">
                    {volitionLanes.map((lane, i) => {
                      const Icon = lane.icon
                      return (
                        <motion.div
                          key={lane.label}
                          className="flex items-center gap-1.5 bg-[var(--muted)]/50 rounded-lg px-2 py-1 border border-[var(--border)]/30 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                        >
                          <Icon className={`w-3 h-3 ${lane.color}`} />
                          <span className="text-[9px] font-medium text-[var(--foreground)]">{lane.label}</span>
                        </motion.div>
                      )
                    })}
                    {/* Extra slot for Impact highlight */}
                    <motion.div
                      className="col-span-2 flex items-center justify-center gap-1.5 bg-[var(--primary)]/10 rounded-lg py-1.5 border border-[var(--primary)]/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Globe className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <span className="text-[9px] font-semibold text-[var(--primary)]">Environmental Impact</span>
                      <Leaf className="w-2.5 h-2.5 text-[var(--primary)]" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Back Side - Philosophy (Larger text with internal scroll) */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--muted)]/80 to-[var(--card)] rounded-xl p-3 overflow-hidden border border-[var(--border)]/30"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* Decorative glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                    <motion.div
                      className="w-7 h-7 rounded-full bg-[var(--primary)]/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--foreground)]">You Are The Asset</h3>
                      <p className="text-[9px] text-[var(--primary)] font-semibold uppercase tracking-wide">Beyond Traditional Metrics</p>
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent mb-2 flex-shrink-0" />

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-2">
                    <p className="text-[11px] text-[var(--foreground)] leading-relaxed">
                      Traditional systems measure what you <span className="font-semibold text-[var(--primary)]">have</span>. Volition measures who you are <span className="font-semibold text-[var(--primary)]">becoming</span>.
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
                      Your STOCK score captures growth across 7 interconnected lanes of life: Identity, Projects, Articles, Learning, Network, Feed, and Impact.
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
                      Every connection made, lesson learned, and impact created adds to your evolving value. Sustainable change starts with investing in yourself.
                    </p>
                  </div>

                  {/* Footer badges */}
                  <div className="flex items-center justify-center gap-2 pt-2 mt-1 border-t border-[var(--primary)]/20 flex-shrink-0">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--primary)]/20">
                      <TrendingUp className="w-2.5 h-2.5 text-[var(--primary)]" />
                      <span className="text-[9px] font-medium text-[var(--primary)]">Growth</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--accent)]/20">
                      <Leaf className="w-2.5 h-2.5 text-[var(--accent)]" />
                      <span className="text-[9px] font-medium text-[var(--accent)]">Impact</span>
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
      <div className="relative z-20 mt-[100px] border-y border-[var(--border)]/20 bg-[var(--muted)]/30 backdrop-blur-sm">
        <AnimatedStatsBar />
      </div>
    </div>
  )
}
