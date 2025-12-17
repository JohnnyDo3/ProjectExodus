'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, Crown, Sparkles, TrendingUp,
  User, Briefcase, FileText, BookOpen, Users, MessageCircle, Leaf,
  Star, Lock, Globe, Zap, Heart, ArrowRight
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
function GlowingBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
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

export function CommunityHeartPage({ isAuthenticated }: CommunityHeartPageProps) {
  const [isVolitionFlipped, setIsVolitionFlipped] = useState(false)

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
        {/* Left column: BizID Showcase (Enhanced with decorations) */}
        <GlowingBorder className="lg:col-span-4 min-h-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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

            {/* Bottom tagline with decorative elements */}
            <div className="relative z-10 mt-1 pt-1">
              <DecorativeDivider className="mb-1" />
              <motion.p
                className="text-[9px] text-center text-[var(--muted-foreground)] flex items-center justify-center gap-1"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Heart className="w-2.5 h-2.5 text-pink-400" />
                Values-first networking
                <Heart className="w-2.5 h-2.5 text-pink-400" />
              </motion.p>
            </div>
          </motion.div>
        </GlowingBorder>

        {/* Center column: Featured Members (Top 10 Grid) + Activity (compact) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-2 min-h-0"
        >
          {/* Featured Members - Top 10 Grid with decorations */}
          <div className="relative flex-[2] bg-[var(--card)]/90 backdrop-blur-md border border-[var(--border)]/50 rounded-xl p-3 overflow-hidden flex flex-col min-h-0">
            {/* Decorative pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Header with crown decoration */}
            <div className="relative z-10 flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                <motion.div
                  className="relative"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Crown className="w-4 h-4 text-amber-500" />
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
                Top 10 Members
              </h2>
              <motion.div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">Leaderboard</span>
              </motion.div>
            </div>

            <DecorativeDivider className="mb-2" />

            {/* Featured members grid */}
            <div className="relative z-10 flex-1 min-h-0">
              <FeaturedGuardiansCarousel />
            </div>

            {/* Bottom decorative element */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent"
              animate={{ width: ['20%', '40%', '20%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
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
