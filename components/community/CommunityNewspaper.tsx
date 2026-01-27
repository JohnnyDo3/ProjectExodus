'use client'

import Link from 'next/link'
import {
  Newspaper, Radio, Clock, Users, Rocket, MessageSquare,
  BookOpen, TrendingUp, Heart, MessageCircle, ChevronRight,
  Zap, Activity, Calendar, MapPin, Award, Eye, Flame,
  Target, Shield, Sparkles, Globe, Compass, AlertCircle
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
            <div className="container mx-auto flex items-center justify-between text-[10px] text-theme-muted">
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
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <div className="container mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
                <Newspaper className="w-5 h-5 text-theme-primary" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                THE PROJECT EXODUS CHRONICLE
              </h1>
              <p className="text-[10px] text-theme-muted italic mt-0.5">
                "Building Tomorrow's Sustainable Future, Together"
              </p>
            </div>
          </div>

          {/* Navigation Ribbon - Newspaper Sections */}
          <div className="px-4 py-2 bg-[var(--muted)]/20">
            <div className="container mx-auto flex items-center justify-between">
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
        <div className="border-b-2 border-[var(--border)] bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10">
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-1.5">
              <div className="flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase flex-shrink-0">
                <AlertCircle className="w-3 h-3" />
                Breaking
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap text-xs font-semibold text-[var(--foreground)]">
                  {latestActivity.map((activity: any, i: number) => (
                    <span key={i} className="inline-block mr-8">
                      {activity.message}
                      <span className="mx-2 text-theme-muted">•</span>
                    </span>
                  ))}
                  {latestActivity.length === 0 && (
                    <span>Welcome to Project Exodus Community • Join discussions, launch projects, connect with changemakers</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* NEWSPAPER CONTENT - 3 Column Layout */}
        {/* ============================================ */}
        <div className="flex-1">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-12 gap-4">

              {/* ======================================== */}
              {/* LEFT COLUMN - Headlines (Discussions) */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-5 space-y-3">
                {/* Section Header */}
                <div className="border-b-2 border-[var(--border)] pb-1">
                  <h2 className="text-sm font-black uppercase tracking-wide text-[var(--foreground)]" style={{ fontFamily: 'Georgia, serif' }}>
                    Community Headlines
                  </h2>
                </div>

                {/* Featured Discussion - Large */}
                {featuredDiscussion && (
                  <Link href={`/community/feed`}>
                    <div className="border-2 border-[var(--border)] p-3 hover:bg-[var(--muted)]/30 transition-colors">
                      <div className="flex items-start gap-2 mb-2">
                        {featuredDiscussion.user.image ? (
                          <img
                            src={featuredDiscussion.user.image}
                            alt=""
                            className="w-8 h-8 rounded object-cover border border-[var(--border)]"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-[var(--muted)] flex items-center justify-center border border-[var(--border)]">
                            <span className="text-xs font-bold">{featuredDiscussion.user.name?.[0]}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-theme-muted uppercase">
                            By {featuredDiscussion.user.name} • {getTimeAgo(featuredDiscussion.createdAt)}
                          </p>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-[var(--foreground)] leading-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        {featuredDiscussion.content.substring(0, 100)}{featuredDiscussion.content.length > 100 ? '...' : ''}
                      </h3>
                      <div className="flex items-center gap-3 text-[10px] text-theme-muted font-semibold">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {featuredDiscussion._count.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {featuredDiscussion._count.comments} comments
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* More Headlines */}
                <div className="space-y-2">
                  {topDiscussions.map((discussion: any) => (
                    <Link key={discussion.id} href="/community/feed">
                      <div className="border-l-2 border-[var(--border)] pl-2 hover:border-theme-accent transition-colors">
                        <p className="text-xs font-bold text-[var(--foreground)] line-clamp-2 leading-tight">
                          {discussion.content.substring(0, 80)}{discussion.content.length > 80 ? '...' : ''}
                        </p>
                        <p className="text-[9px] text-theme-muted mt-0.5">
                          {discussion.user.name} • {getTimeAgo(discussion.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Quick Action */}
                <Link href="/community/feed">
                  <Button size="sm" className="w-full h-8 text-xs font-bold">
                    Join the Discussion
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* ======================================== */}
              {/* CENTER COLUMN - Featured Project */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-4 space-y-3">
                {/* Section Header */}
                <div className="border-b-2 border-[var(--border)] pb-1">
                  <h2 className="text-sm font-black uppercase tracking-wide text-[var(--foreground)]" style={{ fontFamily: 'Georgia, serif' }}>
                    Active Initiatives
                  </h2>
                </div>

                {/* Featured Project */}
                {featuredProject && (
                  <Link href={`/community/projects/${featuredProject.slug}`}>
                    <div className="border-2 border-[var(--border)] p-3 hover:bg-[var(--muted)]/30 transition-colors">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Rocket className="w-4 h-4 text-orange-500" />
                        <span className="text-[10px] font-black uppercase text-orange-600 tracking-wide">Featured Project</span>
                      </div>
                      <h3 className="text-lg font-black text-[var(--foreground)] leading-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        {featuredProject.name}
                      </h3>
                      <p className="text-xs text-theme-muted leading-relaxed mb-3 line-clamp-3">
                        {featuredProject.description}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-theme-muted">
                            <Users className="w-3 h-3" />
                            {featuredProject._count.members} members
                          </span>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-600 rounded text-[9px] font-black uppercase">
                          {featuredProject.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* More Projects */}
                <div className="space-y-2">
                  {topProjects.map((project: any) => (
                    <Link key={project.id} href={`/community/projects/${project.slug}`}>
                      <div className="border-l-2 border-[var(--border)] pl-2 hover:border-orange-500 transition-colors">
                        <p className="text-xs font-bold text-[var(--foreground)] line-clamp-1">
                          {project.name}
                        </p>
                        <p className="text-[9px] text-theme-muted mt-0.5 line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Quick Action */}
                <Link href="/community/projects/new">
                  <Button size="sm" variant="outline" className="w-full h-8 text-xs font-bold border">
                    Start a Project
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* ======================================== */}
              {/* RIGHT COLUMN - Community Pulse */}
              {/* ======================================== */}
              <div className="col-span-12 lg:col-span-3 space-y-3">
                {/* Section Header */}
                <div className="border-b-2 border-[var(--border)] pb-1">
                  <h2 className="text-sm font-black uppercase tracking-wide text-[var(--foreground)]" style={{ fontFamily: 'Georgia, serif' }}>
                    Community Pulse
                  </h2>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-[var(--border)] p-2 text-center">
                    <div className="text-lg font-black text-theme-primary" style={{ fontFamily: 'Georgia, serif' }}>
                      {communityStats.totalMembers.toLocaleString()}
                    </div>
                    <div className="text-[9px] font-bold text-theme-muted uppercase">Members</div>
                  </div>
                  <div className="border border-[var(--border)] p-2 text-center">
                    <div className="text-lg font-black text-orange-500" style={{ fontFamily: 'Georgia, serif' }}>
                      {communityStats.totalProjects}
                    </div>
                    <div className="text-[9px] font-bold text-theme-muted uppercase">Projects</div>
                  </div>
                  <div className="border border-[var(--border)] p-2 text-center">
                    <div className="text-lg font-black text-emerald-500" style={{ fontFamily: 'Georgia, serif' }}>
                      {communityStats.totalArticles}
                    </div>
                    <div className="text-[9px] font-bold text-theme-muted uppercase">Articles</div>
                  </div>
                  <div className="border border-[var(--border)] p-2 text-center">
                    <div className="text-lg font-black text-purple-500" style={{ fontFamily: 'Georgia, serif' }}>
                      {communityStats.activeProjects}
                    </div>
                    <div className="text-[9px] font-bold text-theme-muted uppercase">Active</div>
                  </div>
                </div>

                {/* Community Directory */}
                <div className="border-t-2 border-[var(--border)] pt-2">
                  <h3 className="text-xs font-black uppercase mb-2 text-theme-muted">Community Directory</h3>
                  <div className="space-y-1.5">
                    {suggestedUsers.slice(0, 4).map((suggestedUser: any) => {
                      const config = suggestedUser.guardianArchetype ? archetypeConfig[suggestedUser.guardianArchetype] : null
                      const Icon = config?.icon || Compass
                      return (
                        <Link key={suggestedUser.id} href={`/profile/${suggestedUser.id}`}>
                          <div className="flex items-center gap-2 hover:bg-[var(--muted)]/30 p-1 rounded transition-colors">
                            {suggestedUser.image ? (
                              <img
                                src={suggestedUser.image}
                                alt=""
                                className="w-6 h-6 rounded object-cover border border-[var(--border)]"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded bg-[var(--muted)] flex items-center justify-center border border-[var(--border)]">
                                <span className="text-[9px] font-bold">{suggestedUser.name?.[0]}</span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-bold text-[var(--foreground)] truncate">{suggestedUser.name}</p>
                              <p className="text-[9px] text-theme-muted">{suggestedUser._count.followers} followers</p>
                            </div>
                            {config && (
                              <Icon className="w-3 h-3 text-theme-muted flex-shrink-0" />
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <Link href="/community/users">
                    <Button size="sm" variant="ghost" className="w-full h-7 mt-2 text-[10px] font-bold">
                      View All Members
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>

                {/* Classified Ad Style - Write Article */}
                <div className="border-2 border-dashed border-[var(--border)] p-3 bg-[var(--muted)]/20">
                  <div className="text-center">
                    <BookOpen className="w-6 h-6 mx-auto mb-1 text-theme-accent" />
                    <p className="text-[10px] font-black uppercase text-theme-muted mb-2">Share Your Knowledge</p>
                    <Link href="/articles/write">
                      <Button size="sm" className="w-full h-7 text-xs font-bold">
                        Write Article
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* FOOTER - Newspaper Edition Info */}
        {/* ============================================ */}
        <div className="border-t-2 border-[var(--border)] bg-[var(--card)] px-4 py-2">
          <div className="container mx-auto flex items-center justify-between text-[9px] text-theme-muted">
            <div className="flex items-center gap-3">
              <span className="font-bold">© 2026 Project Exodus</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Community Edition</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-green-500" />
              <span className="font-semibold">All systems operational</span>
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
