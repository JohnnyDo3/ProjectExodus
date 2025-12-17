'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, Crown, Sparkles, TrendingUp,
  User, Briefcase, FileText, BookOpen, Users, MessageCircle, Leaf,
  Star, Lock, Globe, Zap, Heart, ArrowRight, GraduationCap, Gamepad2, Brain, Target, Award
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

// Curriculum highlights
const curriculumHighlights = [
  { name: 'Food Sovereignty', icon: Leaf, color: 'text-emerald-500' },
  { name: 'Sustainable Living', icon: Globe, color: 'text-blue-500' },
  { name: 'Environmental Science', icon: Brain, color: 'text-purple-500' },
]

export function CommunityHeartPage({ isAuthenticated }: CommunityHeartPageProps) {
  const [isVolitionFlipped, setIsVolitionFlipped] = useState(false)
  const [isBizIDFlipped, setIsBizIDFlipped] = useState(false)
  const [isLearningFlipped, setIsLearningFlipped] = useState(false)

  return (
    <div className="h-[calc(100vh-5rem)] bg-[var(--background)] relative overflow-hidden flex flex-col">
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

      {/* Main content - fills viewport */}
      <div className="flex-1 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-2 p-2 sm:p-3 overflow-hidden min-h-0">
        {/* Left column: BizID Showcase - Flip Card */}
        <div
          className="lg:col-span-4 min-h-0"
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
                className="relative h-full bg-[var(--card)]/90 backdrop-blur-md border border-[var(--border)]/50 rounded-xl p-3 overflow-hidden flex flex-col"
              >
                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />
                <CornerOrnament position="bl" />
                <CornerOrnament position="br" />

                {/* Inner glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, var(--primary)/5 0%, transparent 70%)',
                  }}
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

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

                {/* Card showcase */}
                <div className="relative z-10 flex-1 min-h-0 overflow-hidden">
                  <BusinessCardThemeShowcase />
                </div>

                {/* Bottom - Get Started CTA */}
                <div className="relative z-10 mt-1 pt-1">
                  <DecorativeDivider className="mb-1" />
                  <Link href="/auth/signup" className="block">
                    <motion.div
                      className="flex items-center justify-center gap-1 text-[9px] font-semibold text-[var(--primary)] bg-[var(--primary)]/10 rounded-md py-1 border border-[var(--primary)]/20"
                      whileHover={{ scale: 1.02, backgroundColor: 'var(--primary)/20' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </GlowingBorder>

            {/* Back Side - BizID Philosophy */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--muted)] to-[var(--card)] rounded-xl p-3 overflow-hidden border border-[var(--primary)]/30"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {/* Decorative glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Corner ornaments */}
              <CornerOrnament position="tl" />
              <CornerOrnament position="br" />

              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-sm text-[var(--foreground)] tracking-tight">The Philosophy</h3>
                </div>

                <DecorativeDivider className="mb-2" />

                {/* Philosophy content */}
                <div className="flex-1 space-y-2 overflow-hidden">
                  <motion.div
                    className="bg-[var(--primary)]/10 rounded-lg p-2 border border-[var(--primary)]/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-[10px] font-semibold text-[var(--primary)] mb-1 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Guardian Identity
                    </p>
                    <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                      Choose from 7 archetypes that reflect your values and approach to sustainability - not labels, but expressions of who you are.
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-[var(--accent)]/10 rounded-lg p-2 border border-[var(--accent)]/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-[10px] font-semibold text-[var(--accent)] mb-1 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Your Declaration
                    </p>
                    <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                      A personal statement of purpose - your commitment to the cause, visible to those who share your vision.
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-pink-500/10 rounded-lg p-2 border border-pink-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-[10px] font-semibold text-pink-600 dark:text-pink-400 mb-1 flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      Values-First Connection
                    </p>
                    <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                      Network with people who share your principles. Your BizID is your introduction to a community aligned by purpose.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center column: Learning Academy + Activity (compact) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-2 min-h-0"
        >
          {/* Learning Academy - Flip Card with Philosophy */}
          <div
            className="relative flex-[2] min-h-0"
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
                <div className="relative z-10 flex items-center justify-between mb-2">
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

                <DecorativeDivider className="mb-2" />

                {/* Grade Levels Grid */}
                <div className="relative z-10 mb-3">
                  <p className="text-[9px] text-[var(--muted-foreground)] font-medium mb-1.5 uppercase tracking-wide">Grade Levels</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {gradeLevels.map((level, i) => (
                      <motion.div
                        key={level.id}
                        className={`relative px-2 py-1.5 rounded-lg bg-gradient-to-r ${level.color} shadow-sm cursor-pointer overflow-hidden`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.05, y: -1 }}
                      >
                        <div className="absolute inset-0 bg-white/10" />
                        <div className="relative flex items-center gap-1">
                          <span className="text-sm">{level.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[8px] font-bold text-white truncate">{level.label}</p>
                            <p className="text-[7px] text-white/70">{level.ages}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Curriculum Highlights */}
                <div className="relative z-10 mb-3">
                  <p className="text-[9px] text-[var(--muted-foreground)] font-medium mb-1.5 uppercase tracking-wide">Curriculum</p>
                  <div className="flex flex-wrap gap-1.5">
                    {curriculumHighlights.map((item, i) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.name}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--muted)]/50 border border-[var(--border)]/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Icon className={`w-3 h-3 ${item.color}`} />
                          <span className="text-[9px] font-medium text-[var(--foreground)]">{item.name}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Key Features */}
                <div className="relative z-10 flex-1 flex items-center justify-around">
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[8px] font-medium text-[var(--muted-foreground)]">Games</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-sm">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[8px] font-medium text-[var(--muted-foreground)]">Adaptive</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-sm">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[8px] font-medium text-[var(--muted-foreground)]">Goals</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center shadow-sm">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[8px] font-medium text-[var(--muted-foreground)]">Certificates</span>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <div className="relative z-10 mt-2 pt-1">
                  <DecorativeDivider className="mb-1" />
                  <Link href="/learn" className="block">
                    <motion.div
                      className="flex items-center justify-center gap-1 text-[9px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-md py-1.5 border border-blue-500/20"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BookOpen className="w-3 h-3" />
                      Explore Courses
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </Link>
                </div>
              </div>

              {/* Back Side - Learning Philosophy */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--muted)] to-[var(--card)] rounded-xl p-3 overflow-hidden border border-blue-500/30"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* Decorative glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="br" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-sm text-[var(--foreground)] tracking-tight">Learning Philosophy</h3>
                  </div>

                  <DecorativeDivider className="mb-2" />

                  {/* Philosophy content */}
                  <div className="flex-1 space-y-2 overflow-auto">
                    <motion.div
                      className="bg-blue-500/10 rounded-lg p-2 border border-blue-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        Education for All Ages
                      </p>
                      <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                        From K-5 to PhD, we believe sustainability education should be accessible at every stage of life. Content adapts to your level.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-purple-500/10 rounded-lg p-2 border border-purple-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        Adaptive Learning
                      </p>
                      <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                        Our system learns your pace and style. Games, simulations, and interactive content meet you where you are.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-emerald-500/10 rounded-lg p-2 border border-emerald-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Real-World Application
                      </p>
                      <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                        Every lesson connects to actionable change. Learn food sovereignty, then grow your own garden. Theory meets practice.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-amber-500/10 rounded-lg p-2 border border-amber-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Recognition & Growth
                      </p>
                      <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                        Earn certificates, badges, and track your impact. Your learning journey contributes to your STOCK score.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Live Activity - compact with decorations */}
          <div className="relative flex-1 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--border)]/50 rounded-xl overflow-hidden flex flex-col min-h-0 max-h-[160px]">
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
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[var(--card)] to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right column: Volition Marketing (Enhanced) + Trust */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3 flex flex-col gap-2 min-h-0"
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
                className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] rounded-xl p-3 text-white overflow-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Decorative corner elements */}
                <svg className="absolute top-0 left-0 w-12 h-12 opacity-20" viewBox="0 0 48 48">
                  <motion.path
                    d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z"
                    fill="white"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </svg>
                <svg className="absolute bottom-0 right-0 w-12 h-12 opacity-20 rotate-180" viewBox="0 0 48 48">
                  <motion.path
                    d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z"
                    fill="white"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  />
                </svg>

                {/* Animated shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                />

                {/* Floating sparkles */}
                <motion.div
                  className="absolute top-3 right-6"
                  animate={{ y: [0, -5, 0], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-white/50" />
                </motion.div>
                <motion.div
                  className="absolute bottom-6 left-4"
                  animate={{ y: [0, 5, 0], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <Star className="w-2.5 h-2.5 text-white/40" />
                </motion.div>

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header with icon badge */}
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        boxShadow: ['0 0 0 0 rgba(255,255,255,0.2)', '0 0 10px 2px rgba(255,255,255,0.3)', '0 0 0 0 rgba(255,255,255,0.2)']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                    </motion.div>
                    <h3 className="font-bold text-sm tracking-tight">Volition</h3>
                  </div>

                  {/* Description */}
                  <p className="text-[9px] opacity-80 mb-2 leading-relaxed pl-0.5">
                    Track your stock in Project Exodus
                  </p>

                  {/* Decorative line */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-white/30 via-white/50 to-white/30 mb-2"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* 7 Lanes Grid - Enhanced */}
                  <div className="flex-1 grid grid-cols-2 gap-1">
                    {volitionLanes.map((lane, i) => {
                      const Icon = lane.icon
                      return (
                        <motion.div
                          key={lane.label}
                          className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1 border border-white/5 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                        >
                          <Icon className={`w-3 h-3 ${lane.color}`} />
                          <span className="text-[9px] font-medium opacity-95">{lane.label}</span>
                        </motion.div>
                      )
                    })}
                    {/* Extra slot for Impact highlight */}
                    <motion.div
                      className="col-span-2 flex items-center justify-center gap-1.5 bg-white/15 rounded-lg py-1.5 border border-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <Globe className="w-3.5 h-3.5 text-emerald-300" />
                      </motion.div>
                      <span className="text-[9px] font-semibold">Environmental Impact</span>
                      <Zap className="w-2.5 h-2.5 text-yellow-300" />
                    </motion.div>
                  </div>

                  {/* Get Started CTA - always visible */}
                  <Link href="/auth/signup" className="block mt-1">
                    <motion.div
                      className="flex items-center justify-center gap-1 text-[9px] font-semibold text-white/90 bg-white/15 rounded-md py-1 border border-white/20"
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.25)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* Back Side - Philosophy */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--card)] via-[var(--muted)] to-[var(--card)] rounded-xl p-3 overflow-hidden border border-[var(--primary)]/30"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                {/* Decorative glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Corner ornaments */}
                <CornerOrnament position="tl" />
                <CornerOrnament position="br" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-sm text-[var(--foreground)] tracking-tight">The Philosophy</h3>
                  </div>

                  <DecorativeDivider className="mb-2" />

                  {/* Philosophy content */}
                  <div className="flex-1 space-y-2 overflow-hidden">
                    <motion.div
                      className="bg-[var(--primary)]/10 rounded-lg p-2 border border-[var(--primary)]/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-[10px] font-semibold text-[var(--primary)] mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        You Are The Asset
                      </p>
                      <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                        Your STOCK score reflects your growth, contributions, and impact within the community.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-[var(--accent)]/10 rounded-lg p-2 border border-[var(--accent)]/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-[10px] font-semibold text-[var(--accent)] mb-1 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        7 Lanes of Life
                      </p>
                      <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                        A Kanban dashboard organizing your identity, projects, learning, network, and environmental impact.
                      </p>
                    </motion.div>

                    <motion.div
                      className="bg-emerald-500/10 rounded-lg p-2 border border-emerald-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        Meaningful Progress
                      </p>
                      <p className="text-[8px] text-[var(--muted-foreground)] leading-relaxed">
                        Track real growth that matters - not vanity metrics, but genuine sustainable impact.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Trust Indicators - Enhanced */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative bg-[var(--card)]/80 backdrop-blur-md border border-[var(--border)]/50 rounded-xl p-2.5 overflow-hidden"
          >
            {/* Subtle shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 5 }}
            />

            <div className="relative z-10 flex items-center justify-around">
              <motion.div
                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[var(--muted)]/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                </motion.div>
                <span className="text-[9px] text-[var(--foreground)] font-medium">Safe & Private</span>
              </motion.div>

              {/* Decorative divider */}
              <motion.div
                className="w-px h-4 bg-gradient-to-b from-transparent via-[var(--border)] to-transparent"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.div
                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[var(--muted)]/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                </motion.div>
                <span className="text-[9px] text-[var(--foreground)] font-medium">Always Free</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer: Stats Bar - Enhanced */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-20 border-t border-[var(--border)]/30 bg-[var(--card)]/90 backdrop-blur-md overflow-hidden"
      >
        {/* Decorative top edge glow */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Subtle animated shine */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/3 to-transparent pointer-events-none"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 10, repeat: Infinity, repeatDelay: 5 }}
        />

        <AnimatedStatsBar />
      </motion.footer>
    </div>
  )
}
