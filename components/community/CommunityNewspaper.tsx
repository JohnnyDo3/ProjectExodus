'use client'

import Link from 'next/link'
import {
  Newspaper, Radio, Clock, Users, Rocket, MessageSquare,
  BookOpen, TrendingUp, Heart, MessageCircle, ChevronRight,
  Zap, Activity, Calendar, MapPin, Award, Eye, Flame,
  Target, Shield, Sparkles, Globe, Compass, AlertCircle, PenTool,
  Leaf, Sprout, Wind, Waves, Sun, Moon, Star, Hexagon, Network,
  Wifi, RefreshCw, TreePine, Sunrise, Home
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GuitarHeroFeed } from '@/components/discussions/GuitarHeroFeed'
import { SustainableTechBillboard } from '@/components/community/SustainableTechBillboard'
import { useEffect, useState } from 'react'

import { COMMANDMENT_LIST, resolveCommandment } from '@/lib/commandments'

interface CommunityNewspaperProps {
  user: any
  suggestedUsers: any[]
  activeProjects: any[]
  recentDiscussions: any[]
  recentActivity: any[]
  communityStats: {
    totalMembers: number
    activeProjects: number
    knowledgeArticles: number
    totalArticles: number
    totalProjects: number
  }
}

function getTimeAgo(dateString: Date | string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function CommunityNewspaper({
  user,
  suggestedUsers,
  activeProjects,
  recentDiscussions,
  recentActivity,
  communityStats
}: CommunityNewspaperProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const userArchetype = user?.guardianArchetype ? resolveCommandment(user.guardianArchetype) : null
  const ArchetypeIcon = userArchetype?.icon || Compass

  // Featured content
  const featuredDiscussion = recentDiscussions[0]
  const featuredProject = activeProjects[0]
  const topDiscussions = recentDiscussions.slice(1, 4)
  const topProjects = activeProjects.slice(1, 4)
  const latestActivity = recentActivity?.slice(0, 5) || []

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* EXODOLOGY HUB - Bio-Digital Interface */}
      <div className="flex flex-col">

        {/* ============================================ */}
        {/* MASTHEAD - Vintage Newspaper Header */}
        {/* ============================================ */}
        <div className="relative overflow-hidden bg-[var(--background)] border-b-4 border-double border-[var(--foreground)]">
          {/* Aged paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              var(--foreground) 0px,
              transparent 1px,
              transparent 2px,
              var(--foreground) 3px
            )`,
            backgroundSize: '100% 3px'
          }} />

          {/* Top Border - Ornamental */}
          <div className="relative border-b-2 border-[var(--foreground)] bg-[var(--card)]">
            <div className="max-w-7xl mx-auto px-4 py-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <span className="text-[var(--foreground)]">Est. 2026</span>
                  <span className="text-theme-muted">•</span>
                  <span className="text-theme-muted">
                    {currentTime.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-theme-muted hidden sm:inline">Vol. {Math.floor((Date.now() - new Date('2026-01-01').getTime()) / (365 * 24 * 60 * 60 * 1000)) + 1}</span>
                  <span className="text-theme-muted hidden sm:inline">•</span>
                  <span className="text-[var(--foreground)]">No. {Math.floor(Date.now() / 86400000) % 365}</span>
                  <span className="text-theme-muted hidden md:inline">•</span>
                  <span className="text-theme-muted hidden md:inline">FREE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Masthead */}
          <div className="relative px-4 py-8 border-b-2 border-[var(--foreground)]">
            <div className="max-w-7xl mx-auto">
              {/* Decorative Top Border */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--foreground)] to-transparent" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rotate-45 border border-[var(--foreground)]" />
                  ))}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--foreground)] to-transparent" />
              </div>

              {/* Newspaper Title - Classic Serif Style */}
              <div className="text-center space-y-3">
                {/* Pre-title ornament */}
                <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-theme-muted">
                  <span>⚜</span>
                  <span>The Daily</span>
                  <span>⚜</span>
                </div>

                {/* Main Title - Gothic Newspaper Style */}
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[var(--foreground)] tracking-tight leading-none" style={{
                  textShadow: '2px 2px 0px var(--muted)',
                  letterSpacing: '0.02em'
                }}>
                  <div className="relative inline-block">
                    EXODUS
                    {/* Decorative underline */}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[var(--foreground)]" />
                    <div className="absolute -bottom-3 left-0 right-0 h-px bg-[var(--foreground)]" />
                  </div>
                </h1>

                {/* Subtitle */}
                <div className="flex items-center justify-center gap-3">
                  <div className="hidden sm:block h-px w-12 bg-[var(--foreground)]" />
                  <p className="font-serif text-lg sm:text-xl md:text-2xl font-bold italic text-[var(--foreground)]">
                    Chronicle
                  </p>
                  <div className="hidden sm:block h-px w-12 bg-[var(--foreground)]" />
                </div>

                {/* Tagline - Old Newspaper Style */}
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-theme-muted border-t border-b border-[var(--border)] py-2 max-w-2xl mx-auto">
                  "All The News That's Fit For A Sustainable Future"
                </p>

                {/* Location & Circulation Info */}
                <div className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-wider text-theme-muted pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>Global Edition</span>
                  </div>
                  <span className="hidden sm:inline">|</span>
                  <div className="hidden sm:flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    <span>{communityStats.totalMembers.toLocaleString()} Readers</span>
                  </div>
                  <span className="hidden md:inline">|</span>
                  <div className="hidden md:flex items-center gap-2">
                    <Newspaper className="w-3 h-3" />
                    <span>Daily Circulation</span>
                  </div>
                </div>
              </div>

              {/* Decorative Bottom Border */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--foreground)] to-transparent" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rotate-45 border border-[var(--foreground)]" />
                  ))}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--foreground)] to-transparent" />
              </div>
            </div>
          </div>

          {/* Section Headers - Classic Newspaper Departments */}
          <div className="relative border-b border-[var(--border)] bg-[var(--card)]">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Link href="/community/discussions">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-4 text-xs font-bold uppercase tracking-wide border border-transparent hover:border-[var(--foreground)] transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-2" />
                      Op-Ed
                    </Button>
                  </Link>
                  <span className="text-theme-muted">|</span>
                  <Link href="/community/projects">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-4 text-xs font-bold uppercase tracking-wide border border-transparent hover:border-[var(--foreground)] transition-all"
                    >
                      <Rocket className="w-3.5 h-3.5 mr-2" />
                      Business
                    </Button>
                  </Link>
                  <span className="text-theme-muted hidden sm:inline">|</span>
                  <Link href="/community/users" className="hidden sm:block">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-4 text-xs font-bold uppercase tracking-wide border border-transparent hover:border-[var(--foreground)] transition-all"
                    >
                      <Users className="w-3.5 h-3.5 mr-2" />
                      Society
                    </Button>
                  </Link>
                  <span className="text-theme-muted hidden md:inline">|</span>
                  <Link href="/articles" className="hidden md:block">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-4 text-xs font-bold uppercase tracking-wide border border-transparent hover:border-[var(--foreground)] transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5 mr-2" />
                      Features
                    </Button>
                  </Link>
                </div>

                {/* Weather/Status Widget */}
                <div className="flex items-center gap-3 px-3 py-1.5 border border-[var(--border)] text-[10px] font-bold uppercase tracking-wide flex-shrink-0 ml-4">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 hidden sm:inline">Community: Thriving</span>
                    <span className="text-emerald-600 sm:hidden">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* PULSE STREAM - Live Activity Feed */}
        {/* ============================================ */}
        <div className="relative overflow-hidden border-b border-[var(--border)]/30 bg-gradient-to-r from-[var(--primary)]/5 via-[var(--accent)]/5 to-[var(--secondary)]/5">
          {/* Flowing energy lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent animate-pulse" />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2.5">
              {/* Pulse Indicator */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase flex-shrink-0 backdrop-blur-sm">
                <div className="relative">
                  <Zap className="w-3.5 h-3.5" />
                  <div className="absolute inset-0 bg-emerald-500 blur-sm rounded-full animate-pulse" />
                </div>
                <span>Live Pulse</span>
              </div>

              {/* Activity Stream */}
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap text-sm font-medium text-[var(--foreground)]">
                  {latestActivity.map((activity: any, i: number) => (
                    <span key={i} className="inline-flex items-center mr-12">
                      <Hexagon className="w-3 h-3 text-theme-primary mr-2 inline-block" style={{ fill: 'var(--primary)', fillOpacity: 0.2 }} />
                      {activity.message}
                      <Sparkles className="w-3 h-3 text-theme-accent mx-3 inline-block" />
                    </span>
                  ))}
                  {latestActivity.length === 0 && (
                    <span className="inline-flex items-center">
                      <Hexagon className="w-3 h-3 text-theme-primary mr-2" style={{ fill: 'var(--primary)', fillOpacity: 0.2 }} />
                      Welcome to the Exodus Chronicle — Where ideas become reality
                      <Sparkles className="w-3 h-3 text-theme-accent mx-3" />
                      Join the Round Table • Launch Initiatives • Connect with Changemakers
                      <Sparkles className="w-3 h-3 text-theme-accent mx-3" />
                      Building tomorrow's regenerative civilization, today
                    </span>
                  )}
                </div>
              </div>

              {/* Energy indicator */}
              <div className="hidden lg:flex items-center gap-1.5 text-[10px] text-theme-muted font-mono">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span className="font-semibold">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* MAIN CONTENT - Bio-Digital 3 Column Grid */}
        {/* ============================================ */}
        {/* ============================================ */}
        {/* GUITAR HERO LIVE FEED - visual animation only */}
        {/* (game UI hidden inside the component itself) */}
        {/* ============================================ */}
        <GuitarHeroFeed />

        {/* ============================================ */}
        {/* SUSTAINABLE TECH BILLBOARD */}
        {/* ============================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SustainableTechBillboard />
        </div>

        {/* ============================================ */}
        {/* LIVING ARCHIVES & FOOTER */}
        {/* ============================================ */}
        <div className="flex-1 relative">
          {/* Ambient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--muted)]/10" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

            {/* ============================================ */}
            {/* BOTTOM GRID - Living Archives */}
            {/* ============================================ */}
            <div className="mt-12 pt-10 border-t-2 border-[var(--border)]/40">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)]/50 to-transparent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-theme-muted">Living Archives</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)]/50 to-transparent" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8">

                {/* Trending Streams - Guardian of Nature */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)]/50">
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-emerald-500/5 to-transparent" />

                  <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-4 py-3 flex items-center justify-center gap-2">
                    <TrendingUp className="w-5 h-5 text-white" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                      Trending Streams
                    </h3>
                  </div>

                  <div className="p-4 space-y-2.5">
                    {[
                      { topic: 'Direct Air Capture', tag: 'Carbon removal tech scaling globally' },
                      { topic: 'Hempcrete Building', tag: 'Carbon-negative construction materials' },
                      { topic: 'Regenerative Agriculture', tag: 'Soil health & carbon sequestration' },
                      { topic: 'Circular Economy', tag: 'Zero-waste product lifecycles' },
                      { topic: 'Ocean Cleanup Tech', tag: 'Microplastics & debris interception' },
                    ].map((item, i) => (
                      <div key={i} className="group relative p-3 rounded-lg bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                              {i + 1}
                            </div>
                            <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-lg" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <p className="text-xs font-bold text-[var(--foreground)] truncate">
                              #{item.topic}
                            </p>
                            <p className="text-[9px] text-theme-muted font-mono">
                              {item.tag}
                            </p>
                          </div>
                          <Sparkles className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guardian Achievements - Guardian of Justice */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)]/50">
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-500/5 to-transparent" />

                  <div className="relative bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 px-4 py-3 flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 text-white" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                      Recent Milestones
                    </h3>
                  </div>

                  <div className="p-4 space-y-2.5">
                    {[
                      { badge: 'Community Members', user: 'total registered', count: communityStats.totalMembers, icon: Users },
                      { badge: 'Published Articles', user: 'knowledge pieces', count: communityStats.totalArticles, icon: Eye },
                      { badge: 'Active Initiatives', user: 'projects underway', count: communityStats.activeProjects, icon: Rocket },
                      { badge: 'Learning Modules', user: 'courses available', count: communityStats.knowledgeArticles, icon: BookOpen },
                      { badge: 'Total Projects', user: 'created to date', count: communityStats.totalProjects, icon: Zap },
                    ].map((achievement, i) => {
                      const Icon = achievement.icon
                      return (
                        <div key={i} className="group relative p-3 rounded-lg bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-lg" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <p className="text-xs font-bold text-[var(--foreground)]">
                                {achievement.badge}
                              </p>
                              <p className="text-[9px] text-theme-muted font-mono">
                                {achievement.count} {achievement.user}
                              </p>
                            </div>
                            <Star className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Temporal Cycles - Guardian of Transcendence */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)]/50">
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-indigo-500/5 to-transparent" />

                  <div className="relative bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-3 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5 text-white" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                      This Cycle
                    </h3>
                  </div>

                  <div className="p-4 space-y-2.5">
                    {[
                      { day: '2025', event: 'Climeworks Mammoth Goes Live', detail: 'Iceland — 36K tons CO₂/yr', icon: Wind },
                      { day: '2024', event: 'Solar Foods Factory 01 Opens', detail: 'Vantaa, Finland — Solein production', icon: Sun },
                      { day: '2024', event: 'EU Hemp Building Code Updated', detail: 'Hempcrete approved in 12 nations', icon: Home },
                      { day: '2023', event: '$1.4T Climate Tech Investment', detail: 'Record global investment', icon: TrendingUp },
                      { day: '2023', event: 'Seabin Reaches 860+ Units', detail: '3,250+ tons marine litter removed', icon: Waves },
                    ].map((item, i) => {
                      const Icon = item.icon
                      return (
                        <div key={i} className="group relative p-3 rounded-lg bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="relative flex-shrink-0">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 via-blue-500 to-cyan-500 flex items-center justify-center text-white">
                                <span className="text-[9px] font-bold uppercase">{item.day}</span>
                              </div>
                              <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-lg" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className="text-xs font-bold text-[var(--foreground)] line-clamp-1 flex items-center gap-1.5">
                                <Icon className="w-3 h-3 text-theme-muted" />
                                {item.event}
                              </p>
                              <p className="text-[9px] text-theme-muted flex items-center gap-1 font-mono">
                                <Clock className="w-2.5 h-2.5" />
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Wisdom Transmission - Exodology Quote */}
              <div className="mt-12 relative rounded-2xl overflow-hidden border border-[var(--border)]/20">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 via-[var(--accent)]/5 to-[var(--secondary)]/5" />
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-3xl" />
                <div className="absolute top-0 right-1/4 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-3xl" />

                <div className="relative max-w-3xl mx-auto text-center px-8 py-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-theme-primary opacity-50" />
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
                    <Sparkles className="w-5 h-5 text-theme-accent opacity-50" />
                  </div>

                  <blockquote className="text-lg font-medium text-[var(--foreground)] leading-relaxed mb-4">
                    "The future is not something we enter. The future is something we <span className="text-theme-primary font-bold">create</span> — through <span className="text-theme-accent font-bold">conscious action</span>, <span className="text-theme-secondary font-bold">collective wisdom</span>, and unwavering commitment to <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent font-bold">regeneration</span>."
                  </blockquote>

                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-theme-muted uppercase tracking-wider">
                    <Hexagon className="w-3 h-3" />
                    <span>Core Tenet of Exodology</span>
                    <Hexagon className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* FOOTER - Bio-Digital Signature */}
        {/* ============================================ */}
        <div className="relative border-t-2 border-[var(--border)]/30 bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--card)] mt-16">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `
              linear-gradient(to right, var(--primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} />

          <div className="relative max-w-7xl mx-auto px-4 py-6">
            {/* Guardian Constellation Divider */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)]/50 to-[var(--border)]/50" />
              <div className="flex gap-1.5">
                {COMMANDMENT_LIST.map((c) => (
                  <div key={c.id} className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${c.gradient} opacity-40`} />
                ))}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)]/50 via-[var(--border)]/50 to-transparent" />
            </div>

            {/* Main Footer Content */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-[10px] text-theme-muted font-medium">
                <div className="flex items-center gap-2">
                  <Hexagon className="w-3.5 h-3.5 text-theme-primary" />
                  <span className="font-bold text-[var(--foreground)]">Project Exodus</span>
                </div>
                <span className="hidden sm:inline opacity-50">•</span>
                <span className="font-mono">Chronicle v1.0</span>
                <span className="hidden sm:inline opacity-50">•</span>
                <span className="hidden sm:inline">Est. 2026</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <div className="relative">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    <div className="absolute inset-0 bg-emerald-500/20 blur-sm rounded-full animate-pulse" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    All Systems Optimal
                  </span>
                </div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="text-center mt-4 pt-4 border-t border-[var(--border)]/20">
              <div className="flex items-center justify-center gap-3 text-[9px] text-theme-muted font-mono">
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3 h-3" />
                  <span>Solar Sync Active</span>
                </div>
                <span className="opacity-50">•</span>
                <span>{currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="opacity-50">•</span>
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-3 h-3 text-emerald-500" />
                  <span>Carbon Neutral Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
