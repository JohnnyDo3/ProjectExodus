'use client'

import Link from 'next/link'
import {
  Newspaper, Radio, Clock, Users, Rocket, MessageSquare,
  BookOpen, TrendingUp, Heart, MessageCircle, ChevronRight,
  Zap, Activity, Calendar, MapPin, Award, Eye, Flame,
  Target, Shield, Sparkles, Globe, Compass, AlertCircle, PenTool,
  Leaf, Sprout, Wind, Waves, Sun, Moon, Star, Hexagon, Network,
  Wifi, RefreshCw, TreePine, Sunrise
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useEffect, useState } from 'react'

// Guardian archetype icons - Exodology's Seven Virtues
const archetypeConfig: Record<string, { icon: any, gradient: string, name: string, color: string }> = {
  GUARDIAN_OF_TEMPERANCE: { icon: Shield, gradient: 'from-blue-500 via-cyan-400 to-teal-500', name: 'Guardian of Temperance', color: 'text-cyan-400' },
  GUARDIAN_OF_WISDOM: { icon: Eye, gradient: 'from-violet-500 via-purple-400 to-fuchsia-500', name: 'Guardian of Wisdom', color: 'text-violet-400' },
  GUARDIAN_OF_COURAGE: { icon: Flame, gradient: 'from-orange-500 via-red-400 to-pink-500', name: 'Guardian of Courage', color: 'text-orange-400' },
  GUARDIAN_OF_JUSTICE: { icon: Target, gradient: 'from-amber-500 via-yellow-400 to-orange-400', name: 'Guardian of Justice', color: 'text-amber-400' },
  GUARDIAN_OF_HUMANITY: { icon: Heart, gradient: 'from-pink-500 via-rose-400 to-red-400', name: 'Guardian of Humanity', color: 'text-rose-400' },
  GUARDIAN_OF_TRANSCENDENCE: { icon: Sparkles, gradient: 'from-indigo-500 via-blue-400 to-cyan-500', name: 'Guardian of Transcendence', color: 'text-indigo-400' },
  GUARDIAN_OF_NATURE: { icon: Globe, gradient: 'from-emerald-500 via-green-400 to-teal-500', name: 'Guardian of Nature', color: 'text-emerald-400' },
}

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

  const userArchetype = user?.guardianArchetype ? archetypeConfig[user.guardianArchetype] : null
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
                  <Link href="/community/feed">
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
        <div className="flex-1 relative">
          {/* Ambient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--muted)]/10" />

          <div className="relative max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-12 gap-6">

              {/* ======================================== */}
              {/* LEFT COLUMN - Round Table (Discussions) */}
              {/* Guardian of Humanity - Heart */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-4 space-y-5">
                {/* Section Header - Bio-Digital Style */}
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 via-rose-400 to-red-400 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 blur-lg opacity-30 rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-[var(--foreground)] tracking-tight">
                        Round Table
                      </h2>
                      <p className="text-[10px] text-theme-muted font-medium uppercase tracking-wider">
                        Guardian of Humanity
                      </p>
                    </div>
                  </div>
                  {/* Connecting line */}
                  <div className="absolute top-5 left-5 w-px h-full bg-gradient-to-b from-rose-500/30 to-transparent" />
                </div>

                {/* Featured Discussion - Holographic Card */}
                {featuredDiscussion && (
                  <Link href={`/community/feed`}>
                    <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)]/50 hover:border-rose-500/50 transition-all duration-300 backdrop-blur-sm">
                      {/* Holographic shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative p-5 space-y-4">
                        {/* Author info with holographic avatar */}
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {featuredDiscussion.user.image ? (
                              <img
                                src={featuredDiscussion.user.image}
                                alt=""
                                className="w-11 h-11 rounded-full object-cover border-2 border-rose-500/30"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 flex items-center justify-center border-2 border-rose-500/30">
                                <span className="text-sm font-bold text-white">{featuredDiscussion.user.name?.[0]}</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-rose-500/20 blur-md rounded-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[var(--foreground)] truncate">
                              {featuredDiscussion.user.name}
                            </p>
                            <p className="text-[10px] text-theme-muted font-mono">
                              {getTimeAgo(featuredDiscussion.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/30">
                            <Flame className="w-3 h-3 text-rose-500 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase text-rose-600 dark:text-rose-400">
                              Hot
                            </span>
                          </div>
                        </div>

                        {/* Content with subtle glow */}
                        <div className="relative space-y-3">
                          <p className="text-sm text-[var(--foreground)] leading-relaxed line-clamp-4">
                            {featuredDiscussion.content.substring(0, 180)}{featuredDiscussion.content.length > 180 ? '...' : ''}
                          </p>
                        </div>

                        {/* Engagement Stats with icons */}
                        <div className="flex items-center gap-4 pt-3 border-t border-[var(--border)]/30">
                          <div className="flex items-center gap-1.5 text-xs text-theme-muted hover:text-rose-500 transition-colors">
                            <div className="relative">
                              <Heart className="w-4 h-4" />
                              <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/20 blur-sm rounded-full transition-all" />
                            </div>
                            <span className="font-semibold">{featuredDiscussion._count.likes}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-theme-muted hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="font-semibold">{featuredDiscussion._count.comments}</span>
                          </div>
                          <div className="flex-1" />
                          <ChevronRight className="w-4 h-4 text-theme-muted group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* More Discussions - Compact List */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)]/50 to-[var(--border)]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
                      More Voices
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)]/50 via-[var(--border)]/50 to-transparent" />
                  </div>

                  <div className="space-y-2">
                    {topDiscussions.map((discussion: any, idx: number) => (
                      <Link key={discussion.id} href="/community/feed">
                        <div className="group relative p-3 rounded-lg bg-[var(--card)]/30 border border-[var(--border)]/30 hover:border-rose-500/30 hover:bg-[var(--card)]/60 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30 flex items-center justify-center text-xs font-bold text-rose-500">
                              {idx + 2}
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className="text-xs text-[var(--foreground)] leading-snug line-clamp-2">
                                {discussion.content.substring(0, 100)}{discussion.content.length > 100 ? '...' : ''}
                              </p>
                              <div className="flex items-center gap-2 text-[9px] text-theme-muted font-mono">
                                <span className="truncate">{discussion.user.name}</span>
                                <span>•</span>
                                <span>{getTimeAgo(discussion.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Action Card - Join Discussion */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-red-500/10 border border-rose-500/20 p-5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl" />
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                        <PenTool className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--foreground)]">
                        Your Voice Matters
                      </h3>
                    </div>
                    <p className="text-xs text-theme-muted leading-relaxed">
                      Every perspective enriches our collective wisdom. Share your insights with the community.
                    </p>
                    <Link href="/community/discussions">
                      <Button size="sm" className="w-full h-9 text-xs font-semibold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-lg">
                        Join the Round Table
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* ======================================== */}
              {/* CENTER COLUMN - Active Initiatives */}
              {/* Guardian of Courage - Flame */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-4 space-y-5">
                {/* Section Header - Bio-Digital Style */}
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 via-red-400 to-pink-500 flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 blur-lg opacity-30 rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-[var(--foreground)] tracking-tight">
                        Active Initiatives
                      </h2>
                      <p className="text-[10px] text-theme-muted font-medium uppercase tracking-wider">
                        Guardian of Courage
                      </p>
                    </div>
                  </div>
                  {/* Connecting line */}
                  <div className="absolute top-5 left-5 w-px h-full bg-gradient-to-b from-orange-500/30 to-transparent" />
                </div>

                {/* Featured Initiative - Hero Card */}
                {featuredProject && (
                  <Link href={`/community/projects/${featuredProject.slug}`}>
                    <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)]/50 hover:border-orange-500/50 transition-all duration-300">
                      {/* Holographic effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Feature Badge */}
                      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-4 py-3 flex items-center justify-center gap-2">
                        <Flame className="w-5 h-5 text-white animate-pulse" />
                        <span className="text-xs font-bold uppercase text-white tracking-widest">
                          Featured Initiative
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 to-red-600/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="relative p-5 space-y-4">
                        <h3 className="text-lg font-bold text-[var(--foreground)] leading-tight">
                          {featuredProject.name}
                        </h3>

                        <p className="text-sm text-theme-muted leading-relaxed">
                          {featuredProject.description}
                        </p>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]/30">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {[...Array(Math.min(3, featuredProject._count.members))].map((_, i) => (
                                <div key={i} className="relative">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-[var(--card)] flex items-center justify-center">
                                    <Users className="w-3 h-3 text-white" />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <span className="text-xs font-bold text-theme-muted">
                              {featuredProject._count.members}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                            <Zap className="w-3 h-3 text-emerald-500" />
                            <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                              {featuredProject.status}
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="absolute bottom-5 right-5 w-5 h-5 text-theme-muted group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                )}

                {/* More Initiatives - Compact Grid */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)]/50 to-[var(--border)]/50" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
                      More Initiatives
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)]/50 via-[var(--border)]/50 to-transparent" />
                  </div>

                  <div className="space-y-2">
                    {topProjects.map((project: any, idx: number) => (
                      <Link key={project.id} href={`/community/projects/${project.slug}`}>
                        <div className="group relative p-3 rounded-lg bg-[var(--card)]/30 border border-[var(--border)]/30 hover:border-orange-500/30 hover:bg-[var(--card)]/60 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="relative flex-shrink-0">
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
                                <Rocket className="w-4 h-4 text-white" />
                              </div>
                              <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-lg" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1.5">
                              <p className="text-sm font-bold text-[var(--foreground)] line-clamp-1">
                                {project.name}
                              </p>
                              <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed">
                                {project.description}
                              </p>
                              <div className="flex items-center gap-2 text-[10px]">
                                <div className="flex items-center gap-1 text-theme-muted">
                                  <Users className="w-3 h-3" />
                                  <span className="font-semibold">{project._count.members}</span>
                                </div>
                                <span className="text-theme-muted">•</span>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                                  {project.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Action Card - Launch Initiative */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-orange-500/10 via-red-500/5 to-pink-500/10 border border-orange-500/20 p-5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center">
                          <Rocket className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-lg" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--foreground)]">
                        Launch Your Vision
                      </h3>
                    </div>
                    <p className="text-xs text-theme-muted leading-relaxed">
                      Transform ideas into reality. Rally the community around your sustainable initiative.
                    </p>
                    <Link href="/community/projects/new">
                      <Button size="sm" className="w-full h-9 text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg">
                        Start Initiative
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* ======================================== */}
              {/* RIGHT COLUMN - Collective Intelligence */}
              {/* Guardian of Wisdom - Eye */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-4 space-y-5">
                {/* Section Header - Bio-Digital Style */}
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 via-purple-400 to-fuchsia-500 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 blur-lg opacity-30 rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-[var(--foreground)] tracking-tight">
                        Collective Pulse
                      </h2>
                      <p className="text-[10px] text-theme-muted font-medium uppercase tracking-wider">
                        Guardian of Wisdom
                      </p>
                    </div>
                  </div>
                  {/* Connecting line */}
                  <div className="absolute top-5 left-5 w-px h-full bg-gradient-to-b from-violet-500/30 to-transparent" />
                </div>

                {/* Impact Metrics - Data Visualization */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)]/50">
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-violet-500/5 to-transparent" />

                  <div className="relative p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hexagon className="w-4 h-4 text-violet-500" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-theme-muted">
                        Ecosystem Metrics
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Guardians Count */}
                      <div className="relative group p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/10 rounded-full blur-xl" />
                        <div className="relative space-y-1">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            {communityStats.totalMembers.toLocaleString()}
                          </div>
                          <div className="text-[9px] font-semibold text-theme-muted uppercase tracking-wide">
                            Guardians
                          </div>
                        </div>
                      </div>

                      {/* Initiatives Count */}
                      <div className="relative group p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/10 rounded-full blur-xl" />
                        <div className="relative space-y-1">
                          <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {communityStats.totalProjects}
                          </div>
                          <div className="text-[9px] font-semibold text-theme-muted uppercase tracking-wide">
                            Initiatives
                          </div>
                        </div>
                      </div>

                      {/* Wisdom Count */}
                      <div className="relative group p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl" />
                        <div className="relative space-y-1">
                          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            {communityStats.totalArticles}
                          </div>
                          <div className="text-[9px] font-semibold text-theme-muted uppercase tracking-wide">
                            Wisdom
                          </div>
                        </div>
                      </div>

                      {/* Active Status */}
                      <div className="relative group p-3 rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 hover:border-violet-500/40 transition-all">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-violet-500/10 rounded-full blur-xl" />
                        <div className="relative space-y-1">
                          <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                            {communityStats.activeProjects}
                          </div>
                          <div className="text-[9px] font-semibold text-theme-muted uppercase tracking-wide">
                            Active Now
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mycelium Network - Connected Guardians */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)]/50">
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-500/5 to-transparent" />

                  <div className="relative p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Network className="w-4 h-4 text-purple-500" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-theme-muted">
                        Mycelium Network
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {suggestedUsers.slice(0, 5).map((suggestedUser: any) => {
                        const config = suggestedUser.guardianArchetype ? archetypeConfig[suggestedUser.guardianArchetype] : null
                        const Icon = config?.icon || Compass
                        return (
                          <Link key={suggestedUser.id} href={`/profile/${suggestedUser.id}`}>
                            <div className="group relative p-2.5 rounded-lg bg-[var(--muted)]/20 border border-[var(--border)]/30 hover:border-purple-500/30 hover:bg-[var(--card)]/50 transition-all">
                              <div className="flex items-center gap-3">
                                <div className="relative flex-shrink-0">
                                  {suggestedUser.image ? (
                                    <img
                                      src={suggestedUser.image}
                                      alt=""
                                      className={`w-9 h-9 rounded-full object-cover border-2 ${config ? `border-${config.color.split('-')[1]}-500/40` : 'border-[var(--border)]'}`}
                                    />
                                  ) : (
                                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${config?.gradient || 'from-gray-400 to-gray-600'} flex items-center justify-center border-2 ${config ? 'border-white/20' : 'border-[var(--border)]'}`}>
                                      <span className="text-xs font-bold text-white">{suggestedUser.name?.[0]}</span>
                                    </div>
                                  )}
                                  {config && (
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${config.gradient} border-2 border-[var(--card)] flex items-center justify-center`}>
                                      <Icon className="w-2.5 h-2.5 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0 space-y-0.5">
                                  <p className="text-xs font-bold text-[var(--foreground)] truncate">
                                    {suggestedUser.name}
                                  </p>
                                  <div className="flex items-center gap-2 text-[9px] text-theme-muted font-mono">
                                    <span className="flex items-center gap-1">
                                      <Users className="w-2.5 h-2.5" />
                                      {suggestedUser._count.followers}
                                    </span>
                                    {suggestedUser._count.articles > 0 && (
                                      <>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                          <BookOpen className="w-2.5 h-2.5" />
                                          {suggestedUser._count.articles}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-theme-muted group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>

                    <Link href="/community/users">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full h-8 text-xs font-semibold rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-500/30 border border-transparent transition-all"
                      >
                        View Network
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Action Card - Share Wisdom */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-green-500/10 border border-emerald-500/20 p-5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-lg" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--foreground)]">
                        Share Wisdom
                      </h3>
                    </div>
                    <p className="text-xs text-theme-muted leading-relaxed">
                      Contribute to our collective knowledge. Your insights shape our future.
                    </p>
                    <Link href="/articles/write">
                      <Button size="sm" className="w-full h-9 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg">
                        Write Article
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Quick Navigation - Hexagonal Grid */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)]/50">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-theme-primary" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-theme-muted">
                        Navigate
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/community/leaderboard">
                        <div className="group relative p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative flex flex-col items-center gap-2 text-center">
                            <Award className="w-5 h-5 text-amber-500" />
                            <span className="text-[10px] font-bold text-[var(--foreground)]">Champions</span>
                          </div>
                        </div>
                      </Link>
                      <Link href="/articles">
                        <div className="group relative p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative flex flex-col items-center gap-2 text-center">
                            <BookOpen className="w-5 h-5 text-emerald-500" />
                            <span className="text-[10px] font-bold text-[var(--foreground)]">Wisdom</span>
                          </div>
                        </div>
                      </Link>
                      <Link href="/community/projects">
                        <div className="group relative p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative flex flex-col items-center gap-2 text-center">
                            <Rocket className="w-5 h-5 text-orange-500" />
                            <span className="text-[10px] font-bold text-[var(--foreground)]">Initiatives</span>
                          </div>
                        </div>
                      </Link>
                      <Link href="/community/discussions">
                        <div className="group relative p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative flex flex-col items-center gap-2 text-center">
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                            <span className="text-[10px] font-bold text-[var(--foreground)]">Round Table</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* BOTTOM GRID - Living Archives */}
            {/* ============================================ */}
            <div className="mt-10 pt-8 border-t border-[var(--border)]/30">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

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
                    {['Regenerative Systems', 'Circular Economy', 'Community Resilience', 'Bio-Integration', 'Future Ethics'].map((topic, i) => (
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
                              #{topic}
                            </p>
                            <p className="text-[9px] text-theme-muted font-mono">
                              {Math.floor(Math.random() * 500) + 100} active
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
                      { badge: 'First Light', user: 'New Guardians', count: 12, icon: Sunrise },
                      { badge: 'Collective Force', user: 'Contributors', count: 8, icon: Users },
                      { badge: 'Wisdom Keeper', user: 'Authors', count: 5, icon: Eye },
                      { badge: 'Catalyst', user: 'Innovators', count: 3, icon: Zap },
                      { badge: 'Pillar', user: 'Leaders', count: 2, icon: Shield }
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
                      { day: 'MON', event: 'Community Convergence', time: '2:00 PM', icon: Users },
                      { day: 'TUE', event: 'Initiative Launch', time: '4:00 PM', icon: Rocket },
                      { day: 'WED', event: 'Wisdom Circle', time: '3:00 PM', icon: BookOpen },
                      { day: 'THU', event: 'Regeneration Forum', time: '5:00 PM', icon: RefreshCw },
                      { day: 'FRI', event: 'Reflection & Recognition', time: '6:00 PM', icon: Star }
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
                                {item.time}
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
              <div className="mt-8 relative rounded-xl overflow-hidden">
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
        <div className="relative border-t border-[var(--border)]/30 bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--card)] mt-10">
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
                {Object.values(archetypeConfig).map((config, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${config.gradient} opacity-40`} />
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
