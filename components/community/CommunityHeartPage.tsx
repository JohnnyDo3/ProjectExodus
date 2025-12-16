'use client'

import { motion } from 'framer-motion'
import {
  Shield, Crown, Sparkles, TrendingUp,
  User, Briefcase, FileText, BookOpen, Users, MessageCircle, Leaf,
  Star, Lock, Globe
} from 'lucide-react'
import { BusinessCardThemeShowcase } from './BusinessCardThemeShowcase'
import { FeaturedGuardiansCarousel } from './FeaturedGuardiansCarousel'
import { AnimatedStatsBar } from './AnimatedStatsBar'
import { LiveActivityStream } from './LiveActivityStream'
import { AmbientBackground } from './AmbientBackground'

interface CommunityHeartPageProps {
  isAuthenticated: boolean
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
  return (
    <div className="h-[calc(100vh-5rem)] bg-[var(--background)] relative overflow-hidden flex flex-col">
      {/* Ambient animated background */}
      <AmbientBackground />

      {/* Tagline bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[var(--primary)]/5 via-[var(--accent)]/5 to-[var(--secondary)]/5 border-b border-[var(--border)]/30"
      >
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-sm font-medium text-[var(--foreground)]">
            Where ideas become action
          </span>
          <Sparkles className="w-4 h-4 text-[var(--primary)]" />
        </motion.div>
      </motion.div>

      {/* Main content - fills viewport */}
      <div className="flex-1 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-2 p-2 sm:p-3 overflow-hidden min-h-0">
        {/* Left column: Business Card Showcase (Enhanced) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-4 bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-xl p-3 overflow-hidden flex flex-col min-h-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[var(--primary)]" />
              Digital Business Card
            </h2>
            <motion.span
              className="text-[9px] px-1.5 py-0.5 bg-[var(--primary)]/10 rounded-full text-[var(--primary)] font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              7 Themes
            </motion.span>
          </div>

          {/* Features row */}
          <div className="flex items-center justify-between mb-2 px-1">
            {businessCardFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.label}
                  className="flex flex-col items-center gap-0.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-md bg-[var(--muted)] flex items-center justify-center">
                    <Icon className="w-3 h-3 text-[var(--muted-foreground)]" />
                  </div>
                  <span className="text-[8px] text-[var(--muted-foreground)]">{feature.label}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Card showcase */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <BusinessCardThemeShowcase />
          </div>

          {/* Bottom tagline */}
          <motion.p
            className="text-[9px] text-center text-[var(--muted-foreground)] mt-1 pt-1 border-t border-[var(--border)]"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Values-first networking • Your professional identity
          </motion.p>
        </motion.div>

        {/* Center column: Featured Members (Top 10 Grid) + Activity (compact) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-2 min-h-0"
        >
          {/* Featured Members - Top 10 Grid */}
          <div className="flex-[2] bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-xl p-3 overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-[var(--foreground)]">
                Top 10 Members
              </h2>
              <motion.div className="flex items-center gap-1">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[9px] text-[var(--muted-foreground)]">Leaderboard</span>
              </motion.div>
            </div>
            <div className="flex-1 min-h-0">
              <FeaturedGuardiansCarousel />
            </div>
          </div>

          {/* Live Activity - compact */}
          <div className="flex-1 bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-xl overflow-hidden flex flex-col min-h-0 max-h-[160px]">
            <LiveActivityStream />
          </div>
        </motion.div>

        {/* Right column: Volition Marketing (Enhanced) + Trust */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3 flex flex-col gap-2 min-h-0"
        >
          {/* Volition Marketing Card - Enhanced with all lanes */}
          <motion.div
            className="flex-1 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] rounded-xl p-3 text-white relative overflow-hidden"
          >
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
            />

            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-4 h-4" />
                <h3 className="font-semibold text-xs">Your Volition Dashboard</h3>
              </div>

              {/* Description */}
              <p className="text-[9px] opacity-80 mb-2 leading-relaxed">
                Track your stock in Project Exodus. Your central hub for everything.
              </p>

              {/* 7 Lanes Grid */}
              <div className="flex-1 grid grid-cols-2 gap-1">
                {volitionLanes.map((lane, i) => {
                  const Icon = lane.icon
                  return (
                    <motion.div
                      key={lane.label}
                      className="flex items-center gap-1.5 bg-white/10 rounded-md px-1.5 py-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <Icon className={`w-3 h-3 ${lane.color}`} />
                      <span className="text-[9px] font-medium opacity-90">{lane.label}</span>
                    </motion.div>
                  )
                })}
                {/* Extra slot for Impact highlight */}
                <motion.div
                  className="col-span-2 flex items-center justify-center gap-1 bg-white/15 rounded-md py-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Globe className="w-3 h-3 text-emerald-300" />
                  <span className="text-[9px] font-medium">Environmental Impact Tracking</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-[var(--card)]/60 backdrop-blur-sm border border-[var(--border)] rounded-xl p-2"
          >
            <div className="flex items-center justify-around">
              <motion.div
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="w-3 h-3 text-emerald-500" />
                <span className="text-[8px] text-[var(--muted-foreground)]">Safe & Private</span>
              </motion.div>
              <div className="w-px h-3 bg-[var(--border)]" />
              <motion.div
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Crown className="w-3 h-3 text-amber-500" />
                <span className="text-[8px] text-[var(--muted-foreground)]">Always Free</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer: Stats Bar */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-20 border-t border-[var(--border)]/50 bg-[var(--card)]/80 backdrop-blur-sm"
      >
        <AnimatedStatsBar />
      </motion.footer>
    </div>
  )
}
