'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SkeletonUserCard } from '@/components/ui/SkeletonUserCard'
import { UserPreviewCard } from '@/components/network/UserPreviewCard'
import dynamic from 'next/dynamic'

const CommunityFishbowl = dynamic(
  () => import('@/components/fishbowl/CommunityFishbowl').then(mod => ({ default: mod.CommunityFishbowl })),
  { ssr: false, loading: () => <div className="w-full h-[500px] bg-[var(--muted)] rounded-xl animate-pulse" /> }
)

const MemberDirectory = dynamic(() => import('@/components/fishbowl/MemberDirectory'), {
  ssr: false,
  loading: () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 animate-pulse">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--muted)]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[var(--muted)] rounded w-2/3" />
              <div className="h-3 bg-[var(--muted)] rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
})
const EventsTab = dynamic(() => import('@/components/fishbowl/EventsTab'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-theme-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})
import '@/components/fishbowl/fishbowl.css'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  Users,
  Search,
  UserPlus,
  UserCheck,
  MessageCircle,
  Loader2,
  Heart,
  ArrowRight,
  Compass,
  Sparkles,
  Activity,
  ChevronRight,
  Star,
  Orbit,
  Link2,
  Footprints,
  Flame,
  Calendar,
} from 'lucide-react'

// ============================================
// ARCHETYPE TRAITS (for connection theming)
// ============================================

const ARCHETYPE_TRAITS: Record<string, { gradient: string; trait: string; symbol: string }> = {
  michael: { gradient: 'from-red-600 to-orange-500', trait: 'Strength', symbol: '🔥' },
  gabriel: { gradient: 'from-sky-500 to-blue-600', trait: 'Truth', symbol: '📯' },
  raphael: { gradient: 'from-emerald-500 to-green-600', trait: 'Healing', symbol: '💚' },
  uriel: { gradient: 'from-amber-500 to-yellow-500', trait: 'Wisdom', symbol: '💡' },
  camael: { gradient: 'from-pink-500 to-rose-600', trait: 'Love', symbol: '💗' },
  jophiel: { gradient: 'from-violet-500 to-purple-600', trait: 'Creativity', symbol: '✨' },
  zadkiel: { gradient: 'from-indigo-500 to-blue-700', trait: 'Grace', symbol: '⚖️' },
}

const getArchetypeTrait = (archetype: string | null) => {
  return ARCHETYPE_TRAITS[archetype || 'uriel'] || ARCHETYPE_TRAITS.uriel
}

interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  bio: string | null
  headline: string | null
  location: string | null
  phone: string | null
  interests: string[]
  expertise: string[]
  guardianArchetype: string | null
  declaration: string | null
  createdAt: string
  _count: {
    followers: number
    following: number
    projectMemberships: number
    articles: number
    createdProjects: number
  }
  isFollowing?: boolean
}

type ViewMode = 'feed' | 'following' | 'followers' | 'discover' | 'tree' | 'directory' | 'events'

export default function FishbowlPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialView = (searchParams.get('view') as ViewMode) || 'feed'

  const [activeView, setActiveView] = useState<ViewMode>(initialView)
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])
  const [followingUsers, setFollowingUsers] = useState<UserProfile[]>([])
  const [followers, setFollowers] = useState<UserProfile[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set())
  const [followerIds, setFollowerIds] = useState<Set<string>>(new Set())
  const [loadingFollow, setLoadingFollow] = useState<Set<string>>(new Set())

  // Fetch all data in parallel (avoid waterfall)
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      // Fire all requests in parallel instead of sequentially
      const fetches: Promise<Response>[] = [
        fetch('/api/users'),
      ]
      if (session?.user?.id) {
        fetches.push(
          fetch('/api/users/following'),
          fetch('/api/users/followers'),
        )
      }

      const results = await Promise.all(fetches)
      const [usersRes, followingRes, followersRes] = results

      if (usersRes.ok) {
        const usersData = await usersRes.json()
        if (usersData.success) {
          setAllUsers(usersData.data)
        }
      }

      if (followingRes?.ok) {
        const followingData = await followingRes.json()
        if (followingData.success) {
          setFollowingUsers(followingData.data)
          setFollowingIds(new Set(followingData.data.map((u: UserProfile) => u.id)))
        }
      }

      if (followersRes?.ok) {
        const followersData = await followersRes.json()
        if (followersData.success) {
          setFollowers(followersData.data)
          setFollowerIds(new Set(followersData.data.map((u: UserProfile) => u.id)))
        }
      }
    } catch {
      // Network error — silently handle
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', activeView)
    window.history.replaceState({}, '', url.toString())
  }, [activeView])

  const handleFollow = async (userId: string) => {
    if (!session?.user) {
      toast.error('Please sign in to follow users')
      return
    }

    setLoadingFollow((prev) => new Set(prev).add(userId))

    try {
      const isCurrentlyFollowing = followingIds.has(userId)

      if (isCurrentlyFollowing) {
        const url = new URL('/api/users/follow', window.location.origin)
        url.searchParams.set('userId', userId)
        await fetch(url.toString(), { method: 'DELETE' })
        toast.success('Unfollowed successfully!')
      } else {
        await fetch('/api/users/follow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })
        toast.success("Following! You'll see their activity in your feed.")
      }

      await fetchData()
    } catch {
      toast.error('Failed to update follow status')
    } finally {
      setLoadingFollow((prev) => {
        const newSet = new Set(prev)
        newSet.delete(userId)
        return newSet
      })
    }
  }

  // Get users for list views
  const getListUsers = (type: 'following' | 'followers' | 'discover') => {
    let users: UserProfile[] = []

    switch (type) {
      case 'following':
        users = followingUsers
        break
      case 'followers':
        users = followers
        break
      case 'discover':
        users = allUsers.filter(u => !followingIds.has(u.id) && u.id !== session?.user?.id)
        break
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      users = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.location?.toLowerCase().includes(query) ||
          user.bio?.toLowerCase().includes(query) ||
          user.headline?.toLowerCase().includes(query)
      )
    }

    return users
  }

  // Calculate mutual connections
  const mutualCount = Array.from(followingIds).filter(id => followerIds.has(id)).length

  // Get suggested connections (users who follow you but you don't follow back)
  const suggestedConnections = followers
    .filter(f => !followingIds.has(f.id))
    .slice(0, 5)

  // Get recent followers
  const recentFollowers = [...followers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center" style={{ height: '100dvh' }}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Community Fishbowl Landing */}
      <CommunityFishbowl />

      {/* Stats Bar */}
      {session?.user && (
        <section className="bg-[var(--card)] border-b border-[var(--border)]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-center gap-4 sm:gap-8 py-3">
                <button
                  onClick={() => setActiveView('following')}
                  className={`group text-center px-4 py-2 rounded-xl transition-all border-2 ${
                    activeView === 'following'
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : 'border-transparent hover:border-[var(--border)] hover:bg-[var(--muted)]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <Footprints className="w-4 h-4 text-blue-500" />
                    <p className="text-lg sm:text-xl font-black text-blue-500">{followingUsers.length}</p>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-theme-muted">Walking With</p>
                </button>
                <button
                  onClick={() => setActiveView('followers')}
                  className={`group text-center px-4 py-2 rounded-xl transition-all border-2 ${
                    activeView === 'followers'
                      ? 'border-pink-500/50 bg-pink-500/10'
                      : 'border-transparent hover:border-[var(--border)] hover:bg-[var(--muted)]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <p className="text-lg sm:text-xl font-black text-pink-500">{followers.length}</p>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-theme-muted">Fellow Travelers</p>
                </button>
                <button
                  onClick={() => setActiveView('tree')}
                  className={`group text-center px-4 py-2 rounded-xl transition-all border-2 ${
                    activeView === 'tree'
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-transparent hover:border-[var(--border)] hover:bg-[var(--muted)]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <Link2 className="w-4 h-4 text-emerald-500" />
                    <p className="text-lg sm:text-xl font-black text-emerald-500">{mutualCount}</p>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold text-theme-muted">Kindred Spirits</p>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-1">
              {[
                { id: 'feed' as ViewMode, label: 'The Journey', icon: Activity },
                { id: 'following' as ViewMode, label: 'Walking With', icon: Footprints, count: followingUsers.length },
                { id: 'followers' as ViewMode, label: 'Fellow Travelers', icon: Heart, count: followers.length },
                { id: 'discover' as ViewMode, label: 'Seek New Paths', icon: Compass },
                { id: 'directory' as ViewMode, label: 'Directory', icon: Search },
                { id: 'events' as ViewMode, label: 'Events', icon: Calendar },
                { id: 'tree' as ViewMode, label: 'Constellation', icon: Orbit },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 font-bold text-xs sm:text-sm whitespace-nowrap border-b-3 transition-all ${
                    activeView === tab.id
                      ? 'text-theme-primary border-theme-primary'
                      : 'text-theme-muted border-transparent hover:text-[var(--foreground)]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      activeView === tab.id ? 'bg-theme-primary text-white' : 'bg-[var(--muted)]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonUserCard key={i} />
                ))}
              </div>
            ) : activeView === 'feed' ? (
              /* The Journey - Feed View */
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-4">
                  {!session?.user ? (
                    <Card className="border-2 border-[var(--primary)]/30 bg-gradient-to-br from-[var(--card)] to-[var(--muted)]">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                          <Orbit className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-2">Begin Your Journey</h3>
                        <p className="text-sm text-theme-muted mb-4 italic max-w-sm mx-auto">
                          &quot;We provide the space to connect. You bring the intention to relate.&quot;
                        </p>
                        <Link href="/auth/signin">
                          <Button className="font-bold">
                            Enter the Tapestry <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      {/* Paths Crossing - Recent Activity */}
                      <Card className="border border-[var(--border)]">
                        <CardContent className="p-4">
                          <h3 className="text-sm font-black mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-theme-primary" />
                            Paths Crossing
                          </h3>

                          {/* Recent followers section */}
                          {recentFollowers.length > 0 && (
                            <div className="space-y-3">
                              {recentFollowers.map((follower) => {
                                const trait = getArchetypeTrait(follower.guardianArchetype)
                                return (
                                  <div key={follower.id} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-xl border border-[var(--border)]">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${trait.gradient} flex items-center justify-center overflow-hidden ring-2 ring-white/20`}>
                                      {follower.image ? (
                                        <img src={follower.image} alt="" className="w-full h-full object-cover" />
                                      ) : (
                                        <span className="text-white font-bold">{(follower.name || 'U')[0]}</span>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-bold text-[var(--foreground)] truncate">
                                        {follower.name || 'Seeker'} <span className="font-normal text-theme-muted">joined your path</span>
                                      </p>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] px-1.5 py-0.5 bg-[var(--background)] rounded text-theme-muted">{trait.trait}</span>
                                        <p className="text-xs text-theme-muted truncate">{follower.headline || 'Fellow traveler'}</p>
                                      </div>
                                    </div>
                                    {!followingIds.has(follower.id) && (
                                      <Button
                                        size="sm"
                                        onClick={() => handleFollow(follower.id)}
                                        disabled={loadingFollow.has(follower.id)}
                                        className="text-xs"
                                      >
                                        {loadingFollow.has(follower.id) ? (
                                          <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                          <>Walk Together</>
                                        )}
                                      </Button>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}

                          {recentFollowers.length === 0 && (
                            <div className="text-center py-8 text-theme-muted">
                              <Footprints className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm font-medium">The path is quiet</p>
                              <p className="text-xs">New connections will appear as paths cross</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Souls Seeking Connection */}
                      {suggestedConnections.length > 0 && (
                        <Card className="border border-[var(--border)]">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-black flex items-center gap-2">
                                <Heart className="w-4 h-4 text-pink-500" />
                                Souls Seeking Connection
                              </h3>
                              <button
                                onClick={() => setActiveView('discover')}
                                className="text-xs text-theme-primary font-bold hover:underline"
                              >
                                Seek More
                              </button>
                            </div>
                            <div className="space-y-3">
                              {suggestedConnections.map((user) => {
                                const trait = getArchetypeTrait(user.guardianArchetype)
                                return (
                                  <div key={user.id} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-xl border border-[var(--border)]">
                                    <Link href={`/profile/${user.id}`}>
                                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${trait.gradient} flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 ring-theme-primary transition-all`}>
                                        {user.image ? (
                                          <img src={user.image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                          <span className="text-white font-bold text-lg">{(user.name || 'U')[0]}</span>
                                        )}
                                      </div>
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                      <Link href={`/profile/${user.id}`}>
                                        <p className="text-sm font-bold text-[var(--foreground)] truncate hover:underline cursor-pointer">
                                          {user.name || 'Seeker'}
                                        </p>
                                      </Link>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] px-1.5 py-0.5 bg-[var(--background)] rounded text-theme-muted">{trait.trait}</span>
                                        <p className="text-xs text-theme-muted truncate">{user.headline || 'Fellow traveler'}</p>
                                      </div>
                                      <p className="text-[10px] text-pink-500 font-medium">Already walks your path</p>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() => handleFollow(user.id)}
                                      disabled={loadingFollow.has(user.id)}
                                      className="text-xs"
                                    >
                                      {loadingFollow.has(user.id) ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                      ) : (
                                        <>
                                          <Link2 className="w-3 h-3 mr-1" />
                                          Connect
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                )
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* New Paths to Explore */}
                      <Card className="border border-[var(--border)]">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-black flex items-center gap-2">
                              <Compass className="w-4 h-4 text-emerald-500" />
                              New Paths to Explore
                            </h3>
                            <button
                              onClick={() => setActiveView('discover')}
                              className="text-xs text-theme-primary font-bold hover:underline"
                            >
                              Seek All
                            </button>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {allUsers
                              .filter(u => !followingIds.has(u.id) && !followerIds.has(u.id) && u.id !== session?.user?.id)
                              .slice(0, 4)
                              .map((user) => {
                                const trait = getArchetypeTrait(user.guardianArchetype)
                                return (
                                  <div key={user.id} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-xl border border-[var(--border)]">
                                    <Link href={`/profile/${user.id}`}>
                                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${trait.gradient} flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 ring-theme-primary transition-all`}>
                                        {user.image ? (
                                          <img src={user.image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                          <span className="text-white font-bold">{(user.name || 'U')[0]}</span>
                                        )}
                                      </div>
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                      <Link href={`/profile/${user.id}`}>
                                        <p className="text-sm font-bold text-[var(--foreground)] truncate hover:underline cursor-pointer">
                                          {user.name || 'Seeker'}
                                        </p>
                                      </Link>
                                      <span className="text-[10px] px-1.5 py-0.5 bg-[var(--background)] rounded text-theme-muted">{trait.trait}</span>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleFollow(user.id)}
                                      disabled={loadingFollow.has(user.id)}
                                      className="text-xs px-2"
                                    >
                                      {loadingFollow.has(user.id) ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                      ) : (
                                        <UserPlus className="w-3 h-3" />
                                      )}
                                    </Button>
                                  </div>
                                )
                              })}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Quick Actions */}
                  <Card className="border border-[var(--border)]">
                    <CardContent className="p-4">
                      <h3 className="text-sm font-black mb-3">Explore</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => setActiveView('tree')}
                          className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-xl hover:opacity-90 transition-opacity"
                        >
                          <Orbit className="w-5 h-5" />
                          <div className="text-left">
                            <p className="text-sm font-bold">View Constellation</p>
                            <p className="text-xs opacity-80">See your threads of connection</p>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>
                        <button
                          onClick={() => setActiveView('discover')}
                          className="w-full flex items-center gap-3 p-3 bg-[var(--muted)] rounded-xl hover:bg-[color-mix(in_srgb,var(--muted)_80%,var(--primary))] transition-colors border border-[var(--border)]"
                        >
                          <Compass className="w-5 h-5 text-emerald-500" />
                          <div className="text-left">
                            <p className="text-sm font-bold">Seek New Paths</p>
                            <p className="text-xs text-theme-muted">Find kindred spirits</p>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto text-theme-muted" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tapestry Threads */}
                  {session?.user && (
                    <Card className="border border-[var(--border)]">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-black mb-3 flex items-center gap-2">
                          <Flame className="w-4 h-4 text-amber-500" />
                          Tapestry Threads
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-theme-muted">Total Threads</span>
                            <span className="text-sm font-bold">{followingUsers.length + followers.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-theme-muted">Kindred Spirits</span>
                            <span className="text-sm font-bold text-emerald-500">{mutualCount}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-theme-muted">Walking With</span>
                            <span className="text-sm font-bold text-blue-500">{followingUsers.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-theme-muted">Fellow Travelers</span>
                            <span className="text-sm font-bold text-pink-500">{followers.length}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ) : activeView === 'directory' ? (
              /* Member Directory — search, filter, paginated grid */
              <MemberDirectory />
            ) : activeView === 'events' ? (
              /* Events — full gatherings view */
              <EventsTab />
            ) : activeView === 'tree' ? (
              /* Tree Map View */
              <NetworkTreeMap
                currentUserId={session?.user?.id || null}
                followingUsers={followingUsers}
                followers={followers}
                followingIds={followingIds}
                followerIds={followerIds}
                onFollow={handleFollow}
                loadingFollow={loadingFollow}
              />
            ) : (
              /* List Views (Following, Followers, Discover) */
              <div className="space-y-4">
                {/* Search */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                    <input
                      type="text"
                      placeholder="Search by name, location, or bio..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:border-theme-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Results */}
                {getListUsers(activeView as 'following' | 'followers' | 'discover').length === 0 ? (
                  <Card className="border-2 border-dashed border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--muted)]/30">
                    <CardContent className="p-8 text-center">
                      {activeView === 'following' && <Footprints className="w-12 h-12 text-blue-400/50 mx-auto mb-3" />}
                      {activeView === 'followers' && <Heart className="w-12 h-12 text-pink-400/50 mx-auto mb-3" />}
                      {activeView === 'discover' && <Compass className="w-12 h-12 text-emerald-400/50 mx-auto mb-3" />}
                      <h3 className="text-lg font-black mb-2 text-[var(--foreground)]">
                        {activeView === 'following' && 'No paths walked yet'}
                        {activeView === 'followers' && 'No travelers found you yet'}
                        {activeView === 'discover' && 'All paths explored'}
                      </h3>
                      <p className="text-sm text-theme-muted">
                        {activeView === 'following' && 'Find kindred spirits to walk with'}
                        {activeView === 'followers' && 'Share your journey to attract fellow travelers'}
                        {activeView === 'discover' && "You've connected with everyone in the community"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getListUsers(activeView as 'following' | 'followers' | 'discover').map((user) => (
                      <UserPreviewCard
                        key={user.id}
                        user={user}
                        isFollowing={followingIds.has(user.id)}
                        isFollowingMe={followerIds.has(user.id)}
                        isLoadingFollow={loadingFollow.has(user.id)}
                        onFollow={handleFollow}
                        onMessage={(userId) => router.push(`/messages?user=${userId}`)}
                        isLoggedIn={!!session?.user}
                        variant="full"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// Constellation View - Visual network as stars
function NetworkTreeMap({
  currentUserId,
  followingUsers,
  followers,
  followingIds,
  followerIds,
  onFollow,
  loadingFollow,
}: {
  currentUserId: string | null
  followingUsers: UserProfile[]
  followers: UserProfile[]
  followingIds: Set<string>
  followerIds: Set<string>
  onFollow: (userId: string) => void
  loadingFollow: Set<string>
}) {
  const router = useRouter()

  if (!currentUserId) {
    return (
      <Card className="border-2 border-[var(--primary)]/30 bg-gradient-to-br from-[var(--card)] to-[var(--muted)]">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
            <Orbit className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black mb-2">Sign In to View Your Constellation</h3>
          <p className="text-sm text-theme-muted mb-4">
            See the connections that form your network
          </p>
          <Link href="/auth/signin">
            <Button className="font-bold">
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  // Get connection types
  const mutualConnections = followingUsers.filter(u => followerIds.has(u.id))
  const onlyFollowing = followingUsers.filter(u => !followerIds.has(u.id))
  const onlyFollowers = followers.filter(f => !followingIds.has(f.id))

  return (
    <div className="space-y-6">
      {/* Connection Thread Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 ring-2 ring-emerald-300/30" />
          <span className="text-xs font-medium text-theme-muted">Kindred ({mutualConnections.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-blue-300/30" />
          <span className="text-xs font-medium text-theme-muted">Walking With ({onlyFollowing.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 ring-2 ring-pink-300/30" />
          <span className="text-xs font-medium text-theme-muted">Fellow Travelers ({onlyFollowers.length})</span>
        </div>
      </div>

      {/* Constellation Visualization */}
      <div className="relative">
        {/* Center Star - You */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 -m-4 rounded-full border border-[var(--primary)]/20 animate-pulse" />
            <div className="absolute inset-0 -m-8 rounded-full border border-[var(--accent)]/10" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-black text-lg shadow-xl ring-4 ring-white/20 relative z-10">
              <span className="text-2xl">✦</span>
            </div>
          </div>
          <p className="text-sm font-bold mt-4 text-[var(--foreground)]">Your Center</p>
          <p className="text-xs text-theme-muted">{followingUsers.length + followers.length} threads woven</p>
        </div>

        {/* Connection Branches */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Kindred Spirits Branch */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <Link2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Kindred
                </span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-emerald-500/50 to-transparent mx-auto" />
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {mutualConnections.map((user, idx) => (
                <TreeNode
                  key={user.id}
                  user={user}
                  type="mutual"
                  delay={idx * 100}
                  onFollow={onFollow}
                  isLoadingFollow={loadingFollow.has(user.id)}
                  onViewProfile={() => router.push(`/profile/${user.id}`)}
                />
              ))}
              {mutualConnections.length === 0 && (
                <div className="text-center py-6 text-theme-muted">
                  <Star className="w-6 h-6 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No kindred spirits yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Walking With Branch */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Footprints className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Walking With
                </span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-blue-500/50 to-transparent mx-auto" />
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {onlyFollowing.map((user, idx) => (
                <TreeNode
                  key={user.id}
                  user={user}
                  type="following"
                  delay={idx * 100}
                  onFollow={onFollow}
                  isLoadingFollow={loadingFollow.has(user.id)}
                  onViewProfile={() => router.push(`/profile/${user.id}`)}
                />
              ))}
              {onlyFollowing.length === 0 && (
                <div className="text-center py-6 text-theme-muted">
                  <Footprints className="w-6 h-6 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">Find paths to walk</p>
                </div>
              )}
            </div>
          </div>

          {/* Fellow Travelers Branch */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
                  Fellow Travelers
                </span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-pink-500/50 to-transparent mx-auto" />
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {onlyFollowers.map((user, idx) => (
                <TreeNode
                  key={user.id}
                  user={user}
                  type="follower"
                  delay={idx * 100}
                  onFollow={onFollow}
                  isLoadingFollow={loadingFollow.has(user.id)}
                  onViewProfile={() => router.push(`/profile/${user.id}`)}
                />
              ))}
              {onlyFollowers.length === 0 && (
                <div className="text-center py-6 text-theme-muted">
                  <Heart className="w-6 h-6 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">Share your journey</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tree Node Component - Connection Card
function TreeNode({
  user,
  type,
  delay,
  onFollow,
  isLoadingFollow,
  onViewProfile,
}: {
  user: UserProfile
  type: 'mutual' | 'following' | 'follower'
  delay: number
  onFollow: (userId: string) => void
  isLoadingFollow: boolean
  onViewProfile: () => void
}) {
  const trait = getArchetypeTrait(user.guardianArchetype)
  const typeColors = {
    mutual: 'border-l-emerald-500',
    following: 'border-l-blue-500',
    follower: 'border-l-pink-500',
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-[var(--card)] border border-[var(--border)] border-l-4 ${typeColors[type]} rounded-xl hover:shadow-lg hover:bg-[var(--muted)]/50 transition-all cursor-pointer group`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onViewProfile}
    >
      {/* Avatar with archetype gradient */}
      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${trait.gradient} flex items-center justify-center overflow-hidden flex-shrink-0 ring-2 ring-white/20`}>
        {user.image ? (
          <img src={user.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-white font-bold text-lg">{(user.name || 'U')[0]}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[var(--foreground)] truncate group-hover:underline">
          {user.name || 'Seeker'}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-1.5 py-0.5 bg-[var(--muted)] rounded text-theme-muted">{trait.trait}</span>
          <span className="text-[10px] text-theme-muted">{user._count.followers} connected</span>
        </div>
      </div>

      {/* Action */}
      {type === 'follower' && (
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onFollow(user.id)
          }}
          disabled={isLoadingFollow}
          className="text-xs"
        >
          {isLoadingFollow ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <>
              <Link2 className="w-3 h-3 mr-1" />
              Connect
            </>
          )}
        </Button>
      )}
      {type === 'following' && (
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
            window.location.href = `/messages?user=${user.id}`
          }}
          className="text-xs"
        >
          <MessageCircle className="w-3 h-3" />
        </Button>
      )}
      {type === 'mutual' && (
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Star className="w-3 h-3 text-emerald-500" />
        </div>
      )}
    </div>
  )
}
