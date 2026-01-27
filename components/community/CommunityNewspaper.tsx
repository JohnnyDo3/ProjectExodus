'use client'

import Link from 'next/link'
import {
  Newspaper, Radio, Clock, Users, Rocket, MessageSquare,
  BookOpen, TrendingUp, Heart, MessageCircle, ChevronRight,
  Zap, Activity, Calendar, MapPin, Award, Eye, Flame,
  Target, Shield, Sparkles, Globe, Compass, AlertCircle, PenTool
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useEffect, useState } from 'react'

// Guardian archetype icons
const archetypeConfig: Record<string, { icon: any, gradient: string, name: string }> = {
  GUARDIAN_OF_TEMPERANCE: { icon: Shield, gradient: 'from-blue-500 to-cyan-500', name: 'Guardian of Temperance' },
  GUARDIAN_OF_WISDOM: { icon: Eye, gradient: 'from-violet-500 to-purple-500', name: 'Guardian of Wisdom' },
  GUARDIAN_OF_COURAGE: { icon: Flame, gradient: 'from-orange-500 to-red-500', name: 'Guardian of Courage' },
  GUARDIAN_OF_JUSTICE: { icon: Target, gradient: 'from-amber-500 to-yellow-500', name: 'Guardian of Justice' },
  GUARDIAN_OF_HUMANITY: { icon: Heart, gradient: 'from-pink-500 to-rose-500', name: 'Guardian of Humanity' },
  GUARDIAN_OF_TRANSCENDENCE: { icon: Sparkles, gradient: 'from-indigo-500 to-blue-500', name: 'Guardian of Transcendence' },
  GUARDIAN_OF_NATURE: { icon: Globe, gradient: 'from-emerald-500 to-green-500', name: 'Guardian of Nature' },
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
      {/* NEWSPAPER CONTAINER - Scrollable like a traditional newspaper page */}
      <div className="flex flex-col">

        {/* ============================================ */}
        {/* MASTHEAD - Classic Newspaper Header */}
        {/* ============================================ */}
        <div className="border-b-4 border-double border-[var(--border)] bg-[var(--card)]">
          {/* Top ribbon - Date & Edition info */}
          <div className="border-b border-[var(--border)] px-4 py-1 bg-[var(--muted)]/30">
            <div className="max-w-6xl mx-auto flex items-center justify-between text-[10px] text-theme-muted">
              <div className="flex items-center gap-3">
                <span className="font-semibold">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-3 h-3 text-green-500" />
                <span className="font-bold uppercase text-green-600">Live Edition</span>
              </div>
            </div>
          </div>

          {/* Newspaper Title */}
          <div className="px-4 py-4 border-b border-[var(--border)]">
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-[var(--border)]" />
                <Newspaper className="w-6 h-6 text-theme-primary" />
                <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--border)] via-[var(--border)] to-transparent" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] tracking-tight" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
                THE PROJECT EXODUS CHRONICLE
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1.5">
                <div className="h-px w-12 bg-[var(--border)]" />
                <p className="text-[11px] text-theme-muted italic font-serif">
                  "Building Tomorrow's Sustainable Future, Together"
                </p>
                <div className="h-px w-12 bg-[var(--border)]" />
              </div>
              <p className="text-[9px] text-theme-muted mt-2 font-semibold tracking-wide">
                EST. 2026 • VOL. 1 • NO. {Math.floor(Date.now() / 86400000) % 365}
              </p>
            </div>
          </div>

          {/* Navigation Ribbon - Newspaper Sections */}
          <div className="px-4 py-2 bg-[var(--muted)]/20 border-b border-[var(--border)]">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                <Link href="/community/feed">
                  <Button size="sm" variant="ghost" className="h-7 px-3 text-xs font-bold uppercase tracking-wide">
                    <MessageSquare className="w-3 h-3 mr-1.5" />
                    Discussions
                  </Button>
                </Link>
                <span className="text-theme-muted">|</span>
                <Link href="/community/projects">
                  <Button size="sm" variant="ghost" className="h-7 px-3 text-xs font-bold uppercase tracking-wide">
                    <Rocket className="w-3 h-3 mr-1.5" />
                    Projects
                  </Button>
                </Link>
                <span className="text-theme-muted">|</span>
                <Link href="/community/users">
                  <Button size="sm" variant="ghost" className="h-7 px-3 text-xs font-bold uppercase tracking-wide">
                    <Users className="w-3 h-3 mr-1.5" />
                    Network
                  </Button>
                </Link>
                <span className="text-theme-muted hidden sm:inline">|</span>
                <Link href="/articles" className="hidden sm:block">
                  <Button size="sm" variant="ghost" className="h-7 px-3 text-xs font-bold uppercase tracking-wide">
                    <BookOpen className="w-3 h-3 mr-1.5" />
                    Articles
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-theme-muted">
                <Users className="w-3 h-3" />
                <span className="hidden sm:inline">{communityStats.totalMembers.toLocaleString()} Members</span>
                <span className="sm:hidden">{communityStats.totalMembers.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* BREAKING NEWS TICKER */}
        {/* ============================================ */}
        <div className="border-b-2 border-[var(--border)] bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 shadow-inner">
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase flex-shrink-0 shadow-md">
                <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                Breaking News
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap text-sm font-bold text-[var(--foreground)]" style={{ fontFamily: 'Georgia, serif' }}>
                  {latestActivity.map((activity: any, i: number) => (
                    <span key={i} className="inline-block mr-12">
                      {activity.message}
                      <span className="mx-3 text-theme-muted">★</span>
                    </span>
                  ))}
                  {latestActivity.length === 0 && (
                    <span>Welcome to Project Exodus Community ★ Join discussions, launch projects, connect with changemakers ★ Building a sustainable future together</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* NEWSPAPER CONTENT - 3 Column Layout */}
        {/* ============================================ */}
        <div className="flex-1 bg-gradient-to-b from-[var(--background)] to-[var(--muted)]/20">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-12 gap-5">

              {/* ======================================== */}
              {/* LEFT COLUMN - Headlines (Discussions) */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-4 space-y-4 border-r lg:border-r-2 lg:border-[var(--border)] lg:pr-5">
                {/* Section Header with Ornament */}
                <div className="relative">
                  <div className="border-t-4 border-b-2 border-double border-[var(--border)] py-2">
                    <h2 className="text-base font-black uppercase tracking-wider text-[var(--foreground)] text-center" style={{ fontFamily: 'Georgia, serif' }}>
                      ◆ Community Headlines ◆
                    </h2>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-[var(--foreground)]" />
                </div>

                {/* Featured Discussion - Large Lead Story */}
                {featuredDiscussion && (
                  <Link href={`/community/feed`}>
                    <div className="border-4 border-double border-[var(--border)] p-4 hover:bg-[var(--muted)]/40 transition-all hover:shadow-lg bg-[var(--card)]">
                      {/* Byline */}
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]">
                        {featuredDiscussion.user.image ? (
                          <img
                            src={featuredDiscussion.user.image}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border-2 border-[var(--border)]"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center border-2 border-[var(--border)]">
                            <span className="text-xs font-bold text-white">{featuredDiscussion.user.name?.[0]}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-bold text-theme-muted uppercase tracking-wider">
                            By {featuredDiscussion.user.name}
                          </p>
                          <p className="text-[9px] text-theme-muted">
                            {getTimeAgo(featuredDiscussion.createdAt)}
                          </p>
                        </div>
                        <div className="text-[9px] font-black uppercase text-red-600 px-2 py-1 bg-red-50 dark:bg-red-950/30 rounded">
                          Breaking
                        </div>
                      </div>

                      {/* Headline with Drop Cap effect */}
                      <div className="relative">
                        <h3 className="text-lg font-bold text-[var(--foreground)] leading-snug mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                          <span className="float-left text-5xl font-black mr-2 mt-1 leading-none text-theme-primary" style={{ fontFamily: 'Georgia, serif' }}>
                            {featuredDiscussion.content.charAt(0)}
                          </span>
                          {featuredDiscussion.content.substring(1, 120)}{featuredDiscussion.content.length > 120 ? '...' : ''}
                        </h3>
                      </div>

                      {/* Engagement Stats */}
                      <div className="flex items-center gap-4 text-[10px] text-theme-muted font-bold border-t border-[var(--border)] pt-2">
                        <span className="flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" />
                          {featuredDiscussion._count.likes}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {featuredDiscussion._count.comments}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* More Headlines - News Briefs Style */}
                <div className="space-y-3">
                  <div className="border-t border-b border-[var(--border)] py-1.5">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-theme-muted text-center">
                      More Stories
                    </h3>
                  </div>
                  {topDiscussions.map((discussion: any, idx: number) => (
                    <Link key={discussion.id} href="/community/feed">
                      <div className="border-l-4 border-[var(--border)] pl-3 py-2 hover:border-theme-primary hover:bg-[var(--muted)]/20 transition-all">
                        <div className="flex items-start gap-2">
                          <span className="text-lg font-black text-theme-muted/30 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                            {idx + 2}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-[var(--foreground)] leading-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                              {discussion.content.substring(0, 90)}{discussion.content.length > 90 ? '...' : ''}
                            </p>
                            <p className="text-[9px] text-theme-muted font-semibold">
                              {discussion.user.name} • {getTimeAgo(discussion.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Opinion Box */}
                <div className="border-2 border-dashed border-[var(--border)] p-3 bg-[var(--muted)]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <PenTool className="w-4 h-4 text-theme-accent" />
                    <h3 className="text-xs font-black uppercase text-theme-muted">Your Voice Matters</h3>
                  </div>
                  <p className="text-[10px] text-theme-muted leading-relaxed mb-3">
                    Share your thoughts, ideas, and solutions with the community. Every voice contributes to our collective wisdom.
                  </p>
                  <Link href="/community/feed">
                    <Button size="sm" className="w-full h-8 text-xs font-bold">
                      Join the Discussion
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* ======================================== */}
              {/* CENTER COLUMN - Featured Project */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-4 space-y-4 border-r lg:border-r-2 lg:border-[var(--border)] lg:pr-5">
                {/* Section Header with Ornament */}
                <div className="relative">
                  <div className="border-t-4 border-b-2 border-double border-[var(--border)] py-2">
                    <h2 className="text-base font-black uppercase tracking-wider text-[var(--foreground)] text-center" style={{ fontFamily: 'Georgia, serif' }}>
                      ◆ Active Initiatives ◆
                    </h2>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-[var(--foreground)]" />
                </div>

                {/* Featured Project - Magazine Style */}
                {featuredProject && (
                  <Link href={`/community/projects/${featuredProject.slug}`}>
                    <div className="border-4 border-double border-[var(--border)] overflow-hidden hover:shadow-xl transition-all bg-[var(--card)]">
                      {/* Feature Badge */}
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 flex items-center justify-center gap-2">
                        <Rocket className="w-5 h-5 text-white" />
                        <span className="text-xs font-black uppercase text-white tracking-widest">Featured Initiative</span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-xl font-black text-[var(--foreground)] leading-tight mb-3 border-b-2 border-[var(--border)] pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                          {featuredProject.name}
                        </h3>

                        <p className="text-sm text-theme-muted leading-relaxed mb-4" style={{ textAlign: 'justify' }}>
                          {featuredProject.description}
                        </p>

                        {/* Project Stats */}
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {[...Array(Math.min(3, featuredProject._count.members))].map((_, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] border-2 border-[var(--card)] flex items-center justify-center">
                                  <Users className="w-3 h-3 text-white" />
                                </div>
                              ))}
                            </div>
                            <span className="text-xs font-bold text-theme-muted">
                              {featuredProject._count.members} members
                            </span>
                          </div>
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wide">
                            {featuredProject.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* More Projects - List Style */}
                <div className="space-y-3">
                  <div className="border-t border-b border-[var(--border)] py-1.5">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-theme-muted text-center">
                      More Initiatives
                    </h3>
                  </div>

                  <div className="grid gap-2">
                    {topProjects.map((project: any, idx: number) => (
                      <Link key={project.id} href={`/community/projects/${project.slug}`}>
                        <div className="border border-[var(--border)] p-3 hover:bg-[var(--muted)]/30 hover:border-orange-500 transition-all">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                              <Rocket className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-[var(--foreground)] line-clamp-1 mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                                {project.name}
                              </p>
                              <p className="text-[10px] text-theme-muted line-clamp-2 leading-relaxed">
                                {project.description}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[9px] text-theme-muted flex items-center gap-1">
                                  <Users className="w-2.5 h-2.5" />
                                  {project._count.members}
                                </span>
                                <span className="text-[9px] text-theme-muted">•</span>
                                <span className="text-[9px] font-bold text-emerald-600 uppercase">
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

                {/* Classified Ad Style - Launch Project */}
                <div className="border-4 border-double border-[var(--border)] p-4 bg-gradient-to-br from-[var(--muted)]/30 to-[var(--card)]">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mb-3">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-black uppercase text-[var(--foreground)] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                      Launch Your Vision
                    </h3>
                    <p className="text-[10px] text-theme-muted mb-3 leading-relaxed">
                      Turn your ideas into action. Start a project and rally the community.
                    </p>
                    <Link href="/community/projects/new">
                      <Button size="sm" className="w-full h-9 text-xs font-bold">
                        Start a Project
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* ======================================== */}
              {/* RIGHT COLUMN - Community Pulse & Sidebar */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-4 space-y-4">
                {/* Section Header with Ornament */}
                <div className="relative">
                  <div className="border-t-4 border-b-2 border-double border-[var(--border)] py-2">
                    <h2 className="text-base font-black uppercase tracking-wider text-[var(--foreground)] text-center" style={{ fontFamily: 'Georgia, serif' }}>
                      ◆ Community Pulse ◆
                    </h2>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-[var(--foreground)]" />
                </div>

                {/* Stats Grid - Newspaper Box Score Style */}
                <div className="border-4 border-double border-[var(--border)] bg-[var(--card)]">
                  <div className="bg-[var(--muted)]/30 px-3 py-2 border-b-2 border-[var(--border)]">
                    <h3 className="text-[10px] font-black uppercase tracking-wider text-center text-theme-muted">
                      Community Statistics
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border)]">
                    <div className="p-3 text-center hover:bg-[var(--muted)]/20 transition-colors">
                      <div className="text-2xl font-black text-theme-primary mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                        {communityStats.totalMembers.toLocaleString()}
                      </div>
                      <div className="text-[9px] font-black text-theme-muted uppercase tracking-wide">Members</div>
                    </div>
                    <div className="p-3 text-center hover:bg-[var(--muted)]/20 transition-colors">
                      <div className="text-2xl font-black text-orange-500 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                        {communityStats.totalProjects}
                      </div>
                      <div className="text-[9px] font-black text-theme-muted uppercase tracking-wide">Projects</div>
                    </div>
                    <div className="p-3 text-center hover:bg-[var(--muted)]/20 transition-colors">
                      <div className="text-2xl font-black text-emerald-500 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                        {communityStats.totalArticles}
                      </div>
                      <div className="text-[9px] font-black text-theme-muted uppercase tracking-wide">Articles</div>
                    </div>
                    <div className="p-3 text-center hover:bg-[var(--muted)]/20 transition-colors">
                      <div className="text-2xl font-black text-purple-500 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                        {communityStats.activeProjects}
                      </div>
                      <div className="text-[9px] font-black text-theme-muted uppercase tracking-wide">Active</div>
                    </div>
                  </div>
                </div>

                {/* Community Directory - Roll Call Style */}
                <div className="border-4 border-double border-[var(--border)] bg-[var(--card)]">
                  <div className="bg-[var(--muted)]/30 px-3 py-2 border-b-2 border-[var(--border)]">
                    <h3 className="text-[10px] font-black uppercase tracking-wider text-center text-theme-muted">
                      Notable Changemakers
                    </h3>
                  </div>
                  <div className="p-3 space-y-2">
                    {suggestedUsers.slice(0, 5).map((suggestedUser: any) => {
                      const config = suggestedUser.guardianArchetype ? archetypeConfig[suggestedUser.guardianArchetype] : null
                      const Icon = config?.icon || Compass
                      return (
                        <Link key={suggestedUser.id} href={`/profile/${suggestedUser.id}`}>
                          <div className="flex items-center gap-2 hover:bg-[var(--muted)]/40 p-2 rounded border border-transparent hover:border-[var(--border)] transition-all">
                            {suggestedUser.image ? (
                              <img
                                src={suggestedUser.image}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover border-2 border-[var(--border)]"
                              />
                            ) : (
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${config?.gradient || 'from-gray-400 to-gray-600'} flex items-center justify-center border-2 border-[var(--border)]`}>
                                <span className="text-xs font-bold text-white">{suggestedUser.name?.[0]}</span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold text-[var(--foreground)] truncate">{suggestedUser.name}</p>
                              <div className="flex items-center gap-1.5">
                                <p className="text-[9px] text-theme-muted">{suggestedUser._count.followers} followers</p>
                                {suggestedUser._count.articles > 0 && (
                                  <>
                                    <span className="text-[9px] text-theme-muted">•</span>
                                    <p className="text-[9px] text-theme-muted">{suggestedUser._count.articles} articles</p>
                                  </>
                                )}
                              </div>
                            </div>
                            {config && (
                              <Icon className="w-4 h-4 text-theme-muted flex-shrink-0" />
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <div className="border-t-2 border-[var(--border)] p-2">
                    <Link href="/community/users">
                      <Button size="sm" variant="ghost" className="w-full h-8 text-[10px] font-bold">
                        View All Members
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Classified Ad Style - Write Article */}
                <div className="border-4 border-double border-[var(--border)] p-4 bg-gradient-to-br from-[var(--card)] to-[var(--muted)]/30">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 mb-3">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-black uppercase text-[var(--foreground)] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                      Share Your Wisdom
                    </h3>
                    <p className="text-[10px] text-theme-muted mb-3 leading-relaxed">
                      Contribute to our knowledge base. Write an article and inspire others.
                    </p>
                    <Link href="/articles/write">
                      <Button size="sm" className="w-full h-9 text-xs font-bold">
                        Write Article
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Weather Widget Style - Quick Links */}
                <div className="border-2 border-[var(--border)] bg-[var(--card)]">
                  <div className="bg-[var(--muted)]/30 px-3 py-1.5 border-b border-[var(--border)]">
                    <h3 className="text-[9px] font-black uppercase tracking-wider text-center text-theme-muted">
                      Quick Access
                    </h3>
                  </div>
                  <div className="p-2 grid grid-cols-2 gap-1">
                    <Link href="/community/leaderboard">
                      <Button variant="ghost" size="sm" className="w-full h-auto flex flex-col items-center gap-1 py-2 text-[10px]">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="font-bold">Leaderboard</span>
                      </Button>
                    </Link>
                    <Link href="/articles">
                      <Button variant="ghost" size="sm" className="w-full h-auto flex flex-col items-center gap-1 py-2 text-[10px]">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        <span className="font-bold">Articles</span>
                      </Button>
                    </Link>
                    <Link href="/community/projects">
                      <Button variant="ghost" size="sm" className="w-full h-auto flex flex-col items-center gap-1 py-2 text-[10px]">
                        <Rocket className="w-4 h-4 text-orange-500" />
                        <span className="font-bold">Projects</span>
                      </Button>
                    </Link>
                    <Link href="/community/feed">
                      <Button variant="ghost" size="sm" className="w-full h-auto flex flex-col items-center gap-1 py-2 text-[10px]">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        <span className="font-bold">Feed</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* BOTTOM SECTION - Additional Content */}
            {/* ============================================ */}
            <div className="mt-8 pt-8 border-t-4 border-double border-[var(--border)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Trending Topics */}
                <div className="border-2 border-[var(--border)] bg-[var(--card)]">
                  <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-4 py-2 border-b-2 border-[var(--border)]">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-4 h-4 text-white" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-white">
                        Trending Topics
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {['Sustainability', 'Renewable Energy', 'Community Action', 'Green Tech', 'Climate Solutions'].map((topic, i) => (
                        <div key={i} className="flex items-center gap-3 pb-2 border-b border-[var(--border)] last:border-0">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white font-black text-sm">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-[var(--foreground)]" style={{ fontFamily: 'Georgia, serif' }}>
                              #{topic}
                            </p>
                            <p className="text-[9px] text-theme-muted">
                              {Math.floor(Math.random() * 500) + 100} discussions
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Community Achievements */}
                <div className="border-2 border-[var(--border)] bg-[var(--card)]">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 border-b-2 border-[var(--border)]">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="w-4 h-4 text-white" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-white">
                        Recent Achievements
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {[
                        { badge: 'First Steps', user: 'New Members', count: 12 },
                        { badge: 'Collaborator', user: 'Active Contributors', count: 8 },
                        { badge: 'Thought Leader', user: 'Top Authors', count: 5 },
                        { badge: 'Project Pioneer', user: 'Innovators', count: 3 },
                        { badge: 'Community Champion', user: 'Leaders', count: 2 }
                      ].map((achievement, i) => (
                        <div key={i} className="flex items-center gap-3 pb-2 border-b border-[var(--border)] last:border-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-[var(--foreground)]" style={{ fontFamily: 'Georgia, serif' }}>
                              {achievement.badge}
                            </p>
                            <p className="text-[9px] text-theme-muted">
                              {achievement.count} {achievement.user}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Community Calendar */}
                <div className="border-2 border-[var(--border)] bg-[var(--card)]">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 border-b-2 border-[var(--border)]">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-white" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-white">
                        This Week
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {[
                        { day: 'MON', event: 'Community Roundtable', time: '2:00 PM' },
                        { day: 'TUE', event: 'Project Launch Day', time: '4:00 PM' },
                        { day: 'WED', event: 'Article Writing Workshop', time: '3:00 PM' },
                        { day: 'THU', event: 'Sustainability Forum', time: '5:00 PM' },
                        { day: 'FRI', event: 'Weekly Recap & Awards', time: '6:00 PM' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 pb-2 border-b border-[var(--border)] last:border-0">
                          <div className="flex flex-col items-center justify-center w-10 h-10 rounded bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex-shrink-0">
                            <span className="text-[9px] font-bold uppercase">{item.day}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[var(--foreground)] line-clamp-1" style={{ fontFamily: 'Georgia, serif' }}>
                              {item.event}
                            </p>
                            <p className="text-[9px] text-theme-muted flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {item.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote of the Day - Pull Quote Style */}
              <div className="mt-6 border-t-2 border-b-2 border-[var(--border)] py-6 bg-[var(--muted)]/10">
                <div className="max-w-3xl mx-auto text-center px-8">
                  <div className="text-4xl text-theme-primary mb-2 opacity-30" style={{ fontFamily: 'Georgia, serif' }}>"</div>
                  <blockquote className="text-lg font-bold text-[var(--foreground)] italic leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    The future belongs to those who believe in the beauty of their dreams, and the power of their actions to make them real.
                  </blockquote>
                  <div className="mt-3 text-xs font-semibold text-theme-muted uppercase tracking-wider">
                    — Project Exodus Community
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* FOOTER - Newspaper Edition Info */}
        {/* ============================================ */}
        <div className="border-t-4 border-double border-[var(--border)] bg-[var(--card)] mt-8">
          <div className="max-w-6xl mx-auto px-4 py-4">
            {/* Decorative separator */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-[var(--border)]" />
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-[var(--border)] rounded-full" />
                <div className="w-1 h-1 bg-[var(--border)] rounded-full" />
                <div className="w-1 h-1 bg-[var(--border)] rounded-full" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] via-[var(--border)] to-transparent" />
            </div>

            {/* Footer content */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-theme-muted">
              <div className="flex items-center gap-3">
                <span className="font-bold" style={{ fontFamily: 'Georgia, serif' }}>© 2026 Project Exodus</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline font-semibold">Community Edition</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline italic">Est. 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-green-500" />
                <span className="font-semibold">All systems operational</span>
              </div>
            </div>

            {/* Page number */}
            <div className="text-center mt-3 pt-3 border-t border-[var(--border)]">
              <p className="text-[9px] text-theme-muted font-serif italic">
                Page 1 of 1 • {currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
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
