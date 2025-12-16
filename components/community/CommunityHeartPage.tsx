'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Crown, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CommunityDropdownMenu } from './CommunityDropdownMenu'
import { BusinessCardThemeShowcase } from './BusinessCardThemeShowcase'
import { FeaturedGuardiansCarousel } from './FeaturedGuardiansCarousel'
import { AnimatedStatsBar } from './AnimatedStatsBar'
import { LiveActivityStream } from './LiveActivityStream'
import { AmbientBackground } from './AmbientBackground'

interface CommunityHeartPageProps {
  isAuthenticated: boolean
}

export function CommunityHeartPage({ isAuthenticated }: CommunityHeartPageProps) {
  return (
    <div className="h-[calc(100vh-4rem)] bg-[var(--background)] relative overflow-hidden flex flex-col">
      {/* Ambient animated background */}
      <AmbientBackground />

      {/* Header bar with dropdown and CTAs */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[var(--border)]/50 bg-[var(--background)]/80 backdrop-blur-sm"
      >
        {/* Left: Dropdown menu */}
        <CommunityDropdownMenu isAuthenticated={isAuthenticated} />

        {/* Center: Tagline */}
        <motion.div
          className="hidden md:flex items-center gap-2"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-sm font-medium text-[var(--foreground)]">
            Where ideas become action
          </span>
        </motion.div>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-2">
          <Link href="/auth/signin">
            <Button size="sm" variant="ghost" className="px-3 py-1.5 text-xs font-medium">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="px-4 py-1.5 text-xs font-semibold">
              Join Free
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </motion.header>

      {/* Main content - fills viewport */}
      <div className="flex-1 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 sm:p-4 overflow-hidden">
        {/* Left column: Business Card Showcase + Volition Marketing */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-3 min-h-0"
        >
          {/* Business Card Theme Showcase */}
          <div className="flex-1 bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-2xl p-4 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--primary)]" />
                Digital Business Card
              </h2>
              <motion.span
                className="text-[10px] px-2 py-0.5 bg-[var(--primary)]/10 rounded-full text-[var(--primary)] font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                7 Themes
              </motion.span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mb-3">
              Define your identity. Choose your theme.
            </p>
            <div className="flex-1 min-h-0 overflow-hidden">
              <BusinessCardThemeShowcase />
            </div>
          </div>

          {/* Volition Marketing Card - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] rounded-2xl p-4 text-white relative overflow-hidden"
          >
            {/* Animated shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold text-sm">Your Volition Dashboard</h3>
              </div>
              <p className="text-xs opacity-90 mb-3 leading-relaxed">
                Track your stock in Project Exodus. See your impact grow with every contribution.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="text-[10px] opacity-80">Impact Tracking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="text-[10px] opacity-80">Badge Progress</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Center column: Live Activity Stream */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4 bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col min-h-0"
        >
          <LiveActivityStream />
        </motion.div>

        {/* Right column: Featured Guardians + Trust */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3 flex flex-col gap-3 min-h-0"
        >
          {/* Featured Guardians */}
          <div className="flex-1 bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-2xl p-4 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[var(--foreground)]">
                Featured Members
              </h2>
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex-1 min-h-0 flex items-center">
              <FeaturedGuardiansCarousel />
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-[var(--card)]/60 backdrop-blur-sm border border-[var(--border)] rounded-xl p-3"
          >
            <div className="flex items-center justify-around">
              <motion.div
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] text-[var(--muted-foreground)]">
                  Safe & Private
                </span>
              </motion.div>
              <div className="w-px h-4 bg-[var(--border)]" />
              <motion.div
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] text-[var(--muted-foreground)]">
                  Always Free
                </span>
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
