'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ActivityCard } from '@/components/activity/ActivityCard'
import { SkeletonProjectCard } from '@/components/ui/SkeletonProjectCard'
import { SkeletonActivityCard } from '@/components/ui/SkeletonActivityCard'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import {
  User,
  Mail,
  Calendar,
  Settings,
  Heart,
  MessageCircle,
  ShoppingBag,
  BookOpen,
  TrendingUp,
  Award,
  Leaf,
  Users,
  Briefcase,
  Target,
  MapPin,
  Video,
  Globe,
  FileText,
  GraduationCap,
  Sparkles,
  MapPinIcon,
  Linkedin,
  Twitter,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MyBasecampPage() {
  const { data: session, status } = useSession()
  const [projects, setProjects] = useState<any[]>([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [activities, setActivities] = useState<any[]>([])
  const [isLoadingActivities, setIsLoadingActivities] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  // New state for additional sections
  const [articles, setArticles] = useState<any[]>([])
  const [isLoadingArticles, setIsLoadingArticles] = useState(true)
  const [forumPosts, setForumPosts] = useState<any[]>([])
  const [isLoadingForumPosts, setIsLoadingForumPosts] = useState(true)
  const [discussions, setDiscussions] = useState<any[]>([])
  const [isLoadingDiscussions, setIsLoadingDiscussions] = useState(true)
  const [learningProgress, setLearningProgress] = useState<any>(null)
  const [isLoadingLearning, setIsLoadingLearning] = useState(true)

  // Network state
  const [networkSuggestions, setNetworkSuggestions] = useState<any[]>([])
  const [networkStats, setNetworkStats] = useState({
    connectionsCount: 0,
    pendingRequests: 0,
  })
  const [isLoadingNetwork, setIsLoadingNetwork] = useState(true)

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProjects()
      fetchActivityFeed()
      fetchUserProfile()
      fetchUserArticles()
      fetchUserForumPosts()
      fetchUserDiscussions()
      fetchLearningProgress()
      fetchNetworkHighlights()
    }
  }, [session?.user?.id])

  const fetchUserProjects = async () => {
    try {
      console.log('[Basecamp] Fetching user projects...')
      const res = await fetch('/api/projects')

      if (!res.ok) {
        console.log('[Basecamp] Projects endpoint returned', res.status)
        setProjects([])
        return
      }

      const data = await res.json()

      if (data.success) {
        const userProjects = data.data.filter((project: any) => {
          const isMember = project.members.some((m: any) => m.userId === session?.user?.id)
          const isCreator = project.creatorId === session?.user?.id
          return isMember || isCreator
        })
        setProjects(userProjects)
        console.log('[Basecamp] Loaded', userProjects.length, 'user projects')
      }
    } catch (error) {
      console.error('[Basecamp] Error fetching projects:', error)
      setProjects([])
    } finally {
      setIsLoadingProjects(false)
    }
  }

  const fetchActivityFeed = async () => {
    try {
      console.log('[Basecamp] Fetching activity feed...')
      const res = await fetch('/api/activity?limit=10')

      if (!res.ok) {
        console.log('[Basecamp] Activity endpoint returned', res.status)
        setActivities([])
        return
      }

      const data = await res.json()

      if (data.success) {
        setActivities(data.data)
        console.log('[Basecamp] Loaded', data.data.length, 'activities')
      }
    } catch (error) {
      console.error('[Basecamp] Error fetching activity feed:', error)
      setActivities([])
    } finally {
      setIsLoadingActivities(false)
    }
  }

  const fetchUserProfile = async () => {
    try {
      console.log('[Basecamp] Fetching user profile...')
      const res = await fetch(`/api/users/${session?.user?.id}`)

      if (!res.ok) {
        console.log('[Basecamp] User profile endpoint returned', res.status)
        setUserProfile(null)
        return
      }

      const data = await res.json()

      if (data.success) {
        setUserProfile(data.data)
        console.log('[Basecamp] User profile loaded')
      }
    } catch (error) {
      console.error('[Basecamp] Error fetching user profile:', error)
      setUserProfile(null)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const fetchUserArticles = async () => {
    try {
      console.log('[Basecamp] Fetching user articles...')
      const res = await fetch(`/api/articles?authorId=${session?.user?.id}`)

      if (!res.ok) {
        console.log('[Basecamp] Articles endpoint returned', res.status)
        setArticles([])
        return
      }

      const data = await res.json()

      if (data.success) {
        setArticles(data.data || [])
        console.log('[Basecamp] Loaded', data.data?.length || 0, 'articles')
      }
    } catch (error) {
      console.error('[Basecamp] Error fetching articles:', error)
      setArticles([])
    } finally {
      setIsLoadingArticles(false)
    }
  }

  const fetchUserForumPosts = async () => {
    try {
      console.log('[Basecamp] Fetching user forum posts...')
      const res = await fetch(`/api/forum?authorId=${session?.user?.id}`)

      if (!res.ok) {
        console.log('[Basecamp] Forum posts endpoint returned', res.status)
        setForumPosts([])
        return
      }

      const data = await res.json()

      if (data.success) {
        setForumPosts(data.data || [])
        console.log('[Basecamp] Loaded', data.data?.length || 0, 'forum posts')
      }
    } catch (error) {
      console.error('[Basecamp] Error fetching forum posts:', error)
      setForumPosts([])
    } finally {
      setIsLoadingForumPosts(false)
    }
  }

  const fetchUserDiscussions = async () => {
    try {
      console.log('[Basecamp] Fetching user discussions...')
      const res = await fetch(`/api/discussions?userId=${session?.user?.id}`)

      // Handle 404 or non-JSON responses gracefully
      if (!res.ok) {
        console.log('[Basecamp] Discussions endpoint returned', res.status, ', using empty array')
        setDiscussions([])
        return
      }

      const data = await res.json()

      if (data.success) {
        setDiscussions(data.data || [])
        console.log('[Basecamp] Loaded', data.data?.length || 0, 'discussions')
      }
    } catch (error) {
      console.error('[Basecamp] Error fetching discussions:', error)
      setDiscussions([])
    } finally {
      setIsLoadingDiscussions(false)
    }
  }

  const fetchLearningProgress = async () => {
    try {
      console.log('[Basecamp] Fetching learning progress...')
      const res = await fetch(`/api/learning/progress?userId=${session?.user?.id}`)

      // Handle 404 or non-JSON responses gracefully
      if (!res.ok) {
        console.log('[Basecamp] Learning progress endpoint returned', res.status, ', using defaults')
        setLearningProgress({ articlesRead: 0, coursesCompleted: 0, totalHours: 0 })
        return
      }

      const data = await res.json()

      if (data.success) {
        setLearningProgress(data.data)
        console.log('[Basecamp] Learning progress loaded:', data.data)
      }
    } catch (error) {
      console.error('[Basecamp] Error fetching learning progress:', error)
      setLearningProgress(null)
    } finally {
      setIsLoadingLearning(false)
    }
  }

  const fetchNetworkHighlights = async () => {
    try {
      console.log('[Basecamp] Fetching network highlights...')

      // Fetch connection suggestions
      const suggestionsRes = await fetch('/api/network/suggestions?limit=3')
      if (suggestionsRes.ok) {
        const suggestionsData = await suggestionsRes.json()
        if (suggestionsData.success) {
          setNetworkSuggestions(suggestionsData.data.suggestions || [])
        }
      } else {
        console.log('[Basecamp] Network suggestions endpoint returned', suggestionsRes.status)
        setNetworkSuggestions([])
      }

      // Fetch pending connection requests count
      const requestsRes = await fetch('/api/connections/requests')
      if (requestsRes.ok) {
        const requestsData = await requestsRes.json()
        if (requestsData.success) {
          setNetworkStats({
            connectionsCount: userProfile?._count?.connections || 0,
            pendingRequests: requestsData.data.requests?.length || 0,
          })
        }
      } else {
        console.log('[Basecamp] Connection requests endpoint returned', requestsRes.status)
        setNetworkStats({
          connectionsCount: userProfile?._count?.connections || 0,
          pendingRequests: 0,
        })
      }

      console.log('[Basecamp] Network highlights loaded successfully')
    } catch (error) {
      console.error('[Basecamp] Error fetching network highlights:', error)
      setNetworkSuggestions([])
      setNetworkStats({
        connectionsCount: 0,
        pendingRequests: 0,
      })
    } finally {
      setIsLoadingNetwork(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading your Base Camp...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user

  const statusColors = {
    ACTIVE: { bg: 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))]', text: 'text-theme-primary' },
    COMPLETED: { bg: 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))]', text: 'text-theme-accent' },
    PLANNING: { bg: 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))]', text: 'text-theme-secondary' },
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header Banner */}
      <div className="h-32 bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]" />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SIDEBAR (1/3) - Profile */}
            <div className="lg:col-span-1 space-y-4">
              {/* Profile Card */}
              <Card className="border-4 border-theme-primary shadow-theme-2xl sticky top-4">
                <CardContent className="p-6">
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 rounded-full border-6 border-[var(--background)] overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-theme-xl">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user.name || 'User'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-16 h-16 text-[var(--primary-foreground)]" />
                      )}
                    </div>
                  </div>

                  {/* Name & Headline */}
                  <div className="text-center mb-4">
                    <h1 className="text-2xl font-black text-[var(--foreground)] mb-2">
                      {user?.name || 'User'}
                    </h1>
                    {userProfile?.headline && (
                      <p className="text-sm font-bold text-theme-muted mb-2">
                        {userProfile.headline}
                      </p>
                    )}
                    <p className="text-xs font-medium text-theme-muted flex items-center justify-center gap-2 mb-2">
                      <Mail className="w-3 h-3" />
                      {user?.email}
                    </p>
                  </div>

                  {/* Job & Location */}
                  {(userProfile?.jobTitle || userProfile?.company) && (
                    <div className="flex items-center gap-2 mb-2 text-sm">
                      <Briefcase className="w-4 h-4 text-theme-primary flex-shrink-0" />
                      <span className="font-semibold text-[var(--foreground)]">
                        {userProfile.jobTitle}
                        {userProfile.jobTitle && userProfile.company && ' at '}
                        {userProfile.company && <span className="font-black text-theme-primary">{userProfile.company}</span>}
                      </span>
                    </div>
                  )}

                  {userProfile?.location && (
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <MapPinIcon className="w-4 h-4 text-theme-accent flex-shrink-0" />
                      <span className="font-semibold text-theme-muted">{userProfile.location}</span>
                    </div>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-[var(--muted)] rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-black text-theme-primary">
                        {userProfile?._count?.followers || 0}
                      </div>
                      <div className="text-[10px] font-bold text-theme-muted uppercase">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-theme-accent">
                        {userProfile?._count?.following || 0}
                      </div>
                      <div className="text-[10px] font-bold text-theme-muted uppercase">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-theme-secondary">
                        {projects.length}
                      </div>
                      <div className="text-[10px] font-bold text-theme-muted uppercase">Projects</div>
                    </div>
                  </div>

                  {/* Badges */}
                  {userProfile?.userBadges && userProfile.userBadges.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-black mb-2 text-[var(--foreground)] flex items-center gap-2">
                        <Award className="w-4 h-4 text-theme-accent" />
                        BADGES
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {userProfile.userBadges.map((userBadge: any) => (
                          <div
                            key={userBadge.id}
                            className="flex flex-col items-center p-2 bg-gradient-to-br from-[var(--secondary)] to-[color-mix(in_srgb,var(--secondary)_80%,black)] rounded-lg shadow-theme-md"
                            title={userBadge.badge.description}
                          >
                            <span className="text-xl mb-1">{userBadge.badge.icon}</span>
                            <span className="text-[9px] font-bold text-[var(--primary-foreground)] text-center leading-tight">
                              {userBadge.badge.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  {userProfile?.bio && (
                    <div className="mb-4">
                      <h3 className="text-sm font-black mb-2 text-[var(--foreground)]">ABOUT</h3>
                      <p className="text-xs font-medium text-theme-muted leading-relaxed">
                        {userProfile.bio}
                      </p>
                    </div>
                  )}

                  {/* Expertise */}
                  {userProfile?.expertise && userProfile.expertise.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-black mb-2 text-[var(--foreground)] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-theme-primary" />
                        EXPERTISE
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {userProfile.expertise.map((skill: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_srgb,var(--primary)_80%,black)] text-[var(--primary-foreground)] rounded-lg font-bold text-[10px] shadow-theme-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interests */}
                  {userProfile?.interests && userProfile.interests.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-black mb-2 text-[var(--foreground)]">INTERESTS</h3>
                      <div className="flex flex-wrap gap-1">
                        {userProfile.interests.map((interest: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent rounded-lg font-semibold text-[10px] border border-theme-accent"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {(userProfile?.website || userProfile?.linkedin || userProfile?.twitter) && (
                    <div className="mb-4">
                      <h3 className="text-sm font-black mb-2 text-[var(--foreground)]">LINKS</h3>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {userProfile.website && (
                          <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-theme-primary hover:text-theme-accent transition-colors">
                            <Globe className="w-3 h-3" />
                            <span className="font-bold">Website</span>
                          </a>
                        )}
                        {userProfile.linkedin && (
                          <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-theme-primary hover:text-theme-accent transition-colors">
                            <Linkedin className="w-3 h-3" />
                            <span className="font-bold">LinkedIn</span>
                          </a>
                        )}
                        {userProfile.twitter && (
                          <a href={userProfile.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-theme-primary hover:text-theme-accent transition-colors">
                            <Twitter className="w-3 h-3" />
                            <span className="font-bold">Twitter</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Member Since */}
                  <div className="flex items-center gap-2 text-xs text-theme-muted mb-4">
                    <Calendar className="w-3 h-3" />
                    <span className="font-medium">Member since {new Date().getFullYear()}</span>
                  </div>

                  {/* Edit Profile Button */}
                  <Link href="/settings">
                    <Button className="w-full font-bold">
                      <Settings className="w-4 h-4 mr-2" />
                      EDIT PROFILE
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT CONTENT (2/3) - User Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcome Message */}
              <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--card))] to-[var(--card)]">
                <CardContent className="p-6">
                  <h2 className="text-3xl font-black mb-2 text-[var(--foreground)]">
                    Welcome to Your Base Camp, {user?.name?.split(' ')[0] || 'friend'}! 🏕️
                  </h2>
                  <p className="text-base font-semibold text-theme-muted">
                    This is your command center for all sustainability activities. Track your projects, connect with your community, and measure your impact.
                  </p>
                </CardContent>
              </Card>

              {/* Network Highlights */}
              <Card className="border-4 border-theme-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Users className="w-6 h-6" />
                      NETWORK HIGHLIGHTS
                    </CardTitle>
                    <Link href="/network">
                      <Button variant="outline" size="sm" className="font-bold">
                        VIEW FULL NETWORK
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Network Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[var(--background)] border-2 border-theme-primary">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-theme-primary" />
                        <div>
                          <p className="text-2xl font-black text-[var(--foreground)]">
                            {userProfile?._count?.followers || 0}
                          </p>
                          <p className="text-xs font-bold text-theme-muted uppercase">Connections</p>
                        </div>
                      </div>
                    </div>
                    {networkStats.pendingRequests > 0 && (
                      <div className="p-4 rounded-lg bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[var(--background)] border-2 border-theme-accent">
                        <div className="flex items-center gap-3">
                          <MessageCircle className="w-8 h-8 text-theme-accent" />
                          <div>
                            <p className="text-2xl font-black text-[var(--foreground)]">
                              {networkStats.pendingRequests}
                            </p>
                            <p className="text-xs font-bold text-theme-muted uppercase">Pending Requests</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Connection Suggestions */}
                  {!isLoadingNetwork && networkSuggestions.length > 0 && (
                    <div>
                      <h4 className="text-base font-black text-[var(--foreground)] mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-theme-accent" />
                        SUGGESTED CONNECTIONS
                      </h4>
                      <div className="space-y-3">
                        {networkSuggestions.slice(0, 3).map((suggestion: any) => (
                          <div
                            key={suggestion.id}
                            className="p-3 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] flex items-center gap-3"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                              {suggestion.image ? (
                                <img
                                  src={suggestion.image}
                                  alt={suggestion.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link href={`/profile/${suggestion.id}`}>
                                <p className="font-black text-sm text-[var(--foreground)] hover:text-theme-primary transition-colors truncate">
                                  {suggestion.name}
                                </p>
                              </Link>
                              {suggestion.headline && (
                                <p className="text-xs font-medium text-theme-muted truncate">
                                  {suggestion.headline}
                                </p>
                              )}
                              {suggestion.matchReasons && suggestion.matchReasons.length > 0 && (
                                <p className="text-xs font-medium text-theme-primary truncate">
                                  {suggestion.matchReasons[0]}
                                </p>
                              )}
                            </div>
                            <Link href="/network">
                              <Button size="sm" variant="outline" className="font-bold text-xs">
                                Connect
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <Link href="/network/browse">
                        <Button variant="outline" className="w-full mt-4 font-bold">
                          Browse More Professionals
                        </Button>
                      </Link>
                    </div>
                  )}

                  {!isLoadingNetwork && networkSuggestions.length === 0 && (
                    <div className="text-center py-6">
                      <Users className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <p className="text-sm font-bold text-theme-muted">No suggestions available</p>
                      <p className="text-xs font-medium text-theme-muted mt-1 mb-4">
                        Complete your profile to get better connection suggestions
                      </p>
                      <Link href="/network/browse">
                        <Button className="font-bold">
                          Browse Professionals
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* My Projects */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-[var(--foreground)]">MY PROJECTS</h3>
                  <Link href="/community/projects/new">
                    <Button className="font-bold">
                      <Briefcase className="w-4 h-4 mr-2" />
                      NEW PROJECT
                    </Button>
                  </Link>
                </div>

                {isLoadingProjects ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <SkeletonProjectCard key={i} />
                    ))}
                  </div>
                ) : projects.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {projects.map((project: any) => {
                      const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.PLANNING
                      const isCreator = project.creatorId === session?.user?.id

                      return (
                        <Card key={project.id} className="border-4 border-theme-primary hover:border-theme-accent transition-all">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <div className={`px-3 py-1 rounded-full ${colors.bg} ${colors.text} font-black text-xs uppercase`}>
                                {project.status}
                              </div>
                              {isCreator && (
                                <div className="px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent font-black text-xs uppercase">
                                  OWNER
                                </div>
                              )}
                            </div>
                            <CardTitle className="text-lg font-black">
                              {project.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm font-semibold mb-4 text-theme-muted line-clamp-2">
                              {project.description}
                            </p>
                            {project.goal && (
                              <div className="flex items-start gap-2 text-sm font-semibold text-theme-muted mb-4">
                                <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-1">{project.goal}</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between pt-4 border-t-2 border-theme-muted">
                              <div className="flex items-center gap-2 text-sm font-bold text-theme-muted">
                                <Users className="w-4 h-4" />
                                <span>{project._count.members} MEMBERS</span>
                              </div>
                              <Link href={`/community/projects/${project.slug}`}>
                                <Button size="sm" variant="outline" className="font-bold">
                                  VIEW
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <Card className="border-4 border-theme-secondary">
                    <CardContent className="p-8 text-center">
                      <Briefcase className="w-12 h-12 text-theme-secondary mx-auto mb-4 opacity-50" />
                      <h4 className="text-lg font-black mb-2 text-theme-muted">NO PROJECTS YET</h4>
                      <p className="text-sm font-medium text-theme-muted mb-4">
                        Start your first sustainability project!
                      </p>
                      <Link href="/community/projects/new">
                        <Button className="font-bold">
                          <Briefcase className="w-4 h-4 mr-2" />
                          START A PROJECT
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Activity & Impact Row */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Network Activity */}
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-xl font-black flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-theme-primary" />
                      NETWORK ACTIVITY
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingActivities ? (
                      <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <SkeletonActivityCard key={i} />
                        ))}
                      </div>
                    ) : activities.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 text-theme-muted mx-auto mb-4 opacity-50" />
                        <p className="text-sm font-bold text-theme-muted">No activity yet</p>
                        <p className="text-xs font-medium text-theme-muted mt-2 mb-4">
                          Follow people to see their activity
                        </p>
                        <Link href="/network">
                          <Button size="sm" className="font-bold">
                            BROWSE NETWORK
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {activities.slice(0, 5).map((activity) => (
                          <ActivityCard
                            key={activity.id}
                            activity={activity}
                            currentUserId={session?.user?.id}
                          />
                        ))}
                        {activities.length > 5 && (
                          <div className="text-center pt-2">
                            <Link href="/activity">
                              <Button variant="outline" size="sm" className="font-bold">
                                View All Activity
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Environmental Impact */}
                <Card className="border-4 border-theme-accent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--card))] to-[var(--card)]">
                  <CardHeader>
                    <CardTitle className="text-xl font-black flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-theme-accent" />
                      MY IMPACT
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                        <div>
                          <p className="text-xs font-bold text-theme-muted">CO₂ Saved</p>
                          <p className="text-xl font-black text-[var(--foreground)]">0 kg</p>
                        </div>
                        <div className="text-3xl">🌍</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg">
                        <div>
                          <p className="text-xs font-bold text-theme-muted">Waste Reduced</p>
                          <p className="text-xl font-black text-[var(--foreground)]">0 lbs</p>
                        </div>
                        <div className="text-3xl">♻️</div>
                      </div>
                      <div className="p-3 bg-[var(--background)] rounded-lg text-center">
                        <p className="text-xs font-medium text-theme-muted">
                          Make sustainable choices to grow your impact!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* My Articles */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-[var(--foreground)] flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-theme-primary" />
                    MY ARTICLES
                  </h3>
                  <Link href="/learn">
                    <Button size="sm" className="font-bold">
                      <FileText className="w-4 h-4 mr-2" />
                      WRITE ARTICLE
                    </Button>
                  </Link>
                </div>

                {isLoadingArticles ? (
                  <div className="space-y-3">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <SkeletonProjectCard key={i} />
                    ))}
                  </div>
                ) : articles.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {articles.slice(0, 4).map((article: any) => (
                      <Card key={article.id} className="border-2 border-theme-primary hover:border-theme-accent transition-all">
                        <CardContent className="p-4">
                          <h4 className="text-base font-black text-[var(--foreground)] mb-2 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs font-medium text-theme-muted mb-3 line-clamp-2">
                            {article.excerpt || article.description}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-theme-muted">
                              {new Date(article.createdAt).toLocaleDateString()}
                            </span>
                            <Link href={`/learn/${article.slug}`}>
                              <Button size="sm" variant="outline" className="font-bold text-xs">
                                READ
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-4 border-theme-secondary">
                    <CardContent className="p-8 text-center">
                      <BookOpen className="w-12 h-12 text-theme-secondary mx-auto mb-4 opacity-50" />
                      <h4 className="text-lg font-black mb-2 text-theme-muted">NO ARTICLES YET</h4>
                      <p className="text-sm font-medium text-theme-muted mb-4">
                        Share your sustainability knowledge with the community!
                      </p>
                      <Link href="/learn">
                        <Button className="font-bold">
                          <FileText className="w-4 h-4 mr-2" />
                          WRITE YOUR FIRST ARTICLE
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* My Forum Posts & Discussions Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* My Forum Posts */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-[var(--foreground)] flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-theme-accent" />
                      MY FORUM POSTS
                    </h3>
                  </div>

                  <Card className="border-4 border-theme-accent">
                    <CardContent className="p-4">
                      {isLoadingForumPosts ? (
                        <div className="space-y-2">
                          {Array.from({ length: 2 }).map((_, i) => (
                            <SkeletonCard key={i} lines={2} />
                          ))}
                        </div>
                      ) : forumPosts.length > 0 ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {forumPosts.slice(0, 5).map((post: any) => (
                            <div key={post.id} className="p-3 bg-[var(--muted)] rounded-lg hover:bg-[color-mix(in_srgb,var(--accent)_10%,var(--muted))] transition-colors">
                              <h4 className="text-sm font-black text-[var(--foreground)] mb-1 line-clamp-1">
                                {post.title}
                              </h4>
                              <p className="text-xs font-medium text-theme-muted mb-2 line-clamp-2">
                                {post.content}
                              </p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-theme-muted">
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                                <Link href={`/community/forum/${post.slug}`}>
                                  <Button size="sm" variant="ghost" className="font-bold text-xs h-6">
                                    VIEW
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <MessageCircle className="w-10 h-10 text-theme-accent mx-auto mb-3 opacity-50" />
                          <p className="text-xs font-bold text-theme-muted mb-3">No forum posts yet</p>
                          <Link href="/community/forum">
                            <Button size="sm" className="font-bold text-xs">
                              JOIN DISCUSSIONS
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* My Discussions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-[var(--foreground)] flex items-center gap-2">
                      <Users className="w-5 h-5 text-theme-secondary" />
                      MY DISCUSSIONS
                    </h3>
                  </div>

                  <Card className="border-4 border-theme-secondary">
                    <CardContent className="p-4">
                      {isLoadingDiscussions ? (
                        <div className="space-y-2">
                          {Array.from({ length: 2 }).map((_, i) => (
                            <SkeletonCard key={i} lines={2} />
                          ))}
                        </div>
                      ) : discussions.length > 0 ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {discussions.slice(0, 5).map((discussion: any) => (
                            <Link key={discussion.id} href={`/community/forum/posts/${discussion.slug}`}>
                              <div className="p-3 bg-[var(--muted)] rounded-lg hover:bg-[color-mix(in_srgb,var(--secondary)_10%,var(--muted))] transition-colors cursor-pointer">
                                <h4 className="text-sm font-black text-[var(--foreground)] mb-1 line-clamp-1">
                                  {discussion.title}
                                </h4>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-semibold text-theme-muted">
                                    {discussion.replies || 0} replies
                                  </span>
                                  <span className="font-semibold text-theme-muted">
                                    {new Date(discussion.updatedAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <Users className="w-10 h-10 text-theme-secondary mx-auto mb-3 opacity-50" />
                          <p className="text-xs font-bold text-theme-muted mb-3">No discussions yet</p>
                          <Link href="/community">
                            <Button size="sm" className="font-bold text-xs">
                              START DISCUSSING
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* My Learning Progress */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-[var(--foreground)] flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-theme-primary" />
                    MY LEARNING PROGRESS
                  </h3>
                  <Link href="/learn">
                    <Button size="sm" className="font-bold">
                      <BookOpen className="w-4 h-4 mr-2" />
                      EXPLORE LEARNING
                    </Button>
                  </Link>
                </div>

                <Card className="border-4 border-theme-primary bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--card))] to-[var(--card)]">
                  <CardContent className="p-6">
                    {isLoadingLearning ? (
                      <div className="space-y-4">
                        <SkeletonCard lines={4} />
                      </div>
                    ) : learningProgress ? (
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                          <div className="text-3xl font-black text-theme-primary mb-2">
                            {learningProgress.articlesRead || 0}
                          </div>
                          <p className="text-xs font-bold text-theme-muted uppercase">Articles Read</p>
                        </div>
                        <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                          <div className="text-3xl font-black text-theme-accent mb-2">
                            {learningProgress.coursesCompleted || 0}
                          </div>
                          <p className="text-xs font-bold text-theme-muted uppercase">Courses Done</p>
                        </div>
                        <div className="text-center p-4 bg-[var(--background)] rounded-lg">
                          <div className="text-3xl font-black text-theme-secondary mb-2">
                            {learningProgress.totalHours || 0}h
                          </div>
                          <p className="text-xs font-bold text-theme-muted uppercase">Learning Time</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <GraduationCap className="w-16 h-16 text-theme-primary mx-auto mb-4 opacity-50" />
                        <h4 className="text-lg font-black mb-2 text-theme-muted">START YOUR LEARNING JOURNEY</h4>
                        <p className="text-sm font-medium text-theme-muted mb-6 max-w-md mx-auto">
                          Explore our learning resources on renewable energy, sustainable agriculture, zero waste living, and more!
                        </p>
                        <Link href="/learn">
                          <Button className="font-bold">
                            <BookOpen className="w-4 h-4 mr-2" />
                            BROWSE LEARNING CONTENT
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
