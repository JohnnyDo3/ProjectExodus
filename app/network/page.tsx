'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SkeletonUserCard } from '@/components/ui/SkeletonUserCard'
import { UserPreviewCard } from '@/components/network/UserPreviewCard'
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
  GitBranch,
  Activity,
  Bell,
  ChevronRight,
  Star,
  TrendingUp,
  Clock,
  Filter,
} from 'lucide-react'

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

type ViewMode = 'feed' | 'following' | 'followers' | 'discover' | 'tree'

export default function NetworkPage() {
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

  // Fetch all data
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const usersRes = await fetch('/api/users', { cache: 'no-store' })
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        if (usersData.success) {
          setAllUsers(usersData.data)
        }
      }

      if (session?.user?.id) {
        const [followingRes, followersRes] = await Promise.all([
          fetch('/api/users/following', { cache: 'no-store' }),
          fetch('/api/users/followers', { cache: 'no-store' }),
        ])

        if (followingRes.ok) {
          const followingData = await followingRes.json()
          if (followingData.success) {
            setFollowingUsers(followingData.data)
            setFollowingIds(new Set(followingData.data.map((u: UserProfile) => u.id)))
          }
        }

        if (followersRes.ok) {
          const followersData = await followersRes.json()
          if (followersData.success) {
            setFollowers(followersData.data)
            setFollowerIds(new Set(followersData.data.map((u: UserProfile) => u.id)))
          }
        }
      }
    } catch (error) {
      console.error('Error fetching network data:', error)
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
    } catch (error) {
      console.error('Error following/unfollowing user:', error)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-6 sm:py-8 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[var(--background)] to-[color-mix(in_srgb,var(--accent)_10%,var(--background))] border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                    <GitBranch className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--foreground)]">
                      My Network
                    </h1>
                    <p className="text-xs sm:text-sm text-theme-muted font-medium">
                      {session?.user ? 'Your connections and community' : 'Sign in to build your network'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {session?.user && (
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={() => setActiveView('following')}
                    className={`text-center px-3 py-2 rounded-lg transition-all ${activeView === 'following' ? 'bg-blue-100 dark:bg-blue-900/30' : 'hover:bg-[var(--muted)]'}`}
                  >
                    <p className="text-lg sm:text-2xl font-black text-blue-500">{followingUsers.length}</p>
                    <p className="text-[10px] sm:text-xs font-bold text-theme-muted">Following</p>
                  </button>
                  <button
                    onClick={() => setActiveView('followers')}
                    className={`text-center px-3 py-2 rounded-lg transition-all ${activeView === 'followers' ? 'bg-pink-100 dark:bg-pink-900/30' : 'hover:bg-[var(--muted)]'}`}
                  >
                    <p className="text-lg sm:text-2xl font-black text-pink-500">{followers.length}</p>
                    <p className="text-[10px] sm:text-xs font-bold text-theme-muted">Followers</p>
                  </button>
                  <div className="text-center px-3 py-2">
                    <p className="text-lg sm:text-2xl font-black text-green-500">{mutualCount}</p>
                    <p className="text-[10px] sm:text-xs font-bold text-theme-muted">Mutual</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-1">
              {[
                { id: 'feed' as ViewMode, label: 'Feed', icon: Activity },
                { id: 'following' as ViewMode, label: 'Following', icon: UserCheck, count: followingUsers.length },
                { id: 'followers' as ViewMode, label: 'Followers', icon: Heart, count: followers.length },
                { id: 'discover' as ViewMode, label: 'Discover', icon: Compass },
                { id: 'tree' as ViewMode, label: 'Tree Map', icon: GitBranch },
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
              /* Feed View */
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-4">
                  {!session?.user ? (
                    <Card className="border-2 border-theme-primary">
                      <CardContent className="p-6 text-center">
                        <Sparkles className="w-12 h-12 text-theme-primary mx-auto mb-3" />
                        <h3 className="text-xl font-black mb-2">Join the Community</h3>
                        <p className="text-sm text-theme-muted mb-4">
                          Sign in to see your network feed and connect with others
                        </p>
                        <Link href="/auth/signin">
                          <Button className="font-bold">
                            Sign In <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      {/* Network Activity Feed */}
                      <Card className="border border-[var(--border)]">
                        <CardContent className="p-4">
                          <h3 className="text-sm font-black mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-theme-primary" />
                            Network Activity
                          </h3>

                          {/* Recent followers section */}
                          {recentFollowers.length > 0 && (
                            <div className="space-y-3">
                              {recentFollowers.map((follower) => (
                                <div key={follower.id} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center overflow-hidden">
                                    {follower.image ? (
                                      <img src={follower.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-white font-bold">{(follower.name || 'U')[0]}</span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-[var(--foreground)] truncate">
                                      {follower.name || 'User'} <span className="font-normal text-theme-muted">started following you</span>
                                    </p>
                                    <p className="text-xs text-theme-muted">{follower.headline || 'Community member'}</p>
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
                                        <>Follow Back</>
                                      )}
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {recentFollowers.length === 0 && (
                            <div className="text-center py-8 text-theme-muted">
                              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm font-medium">No recent activity</p>
                              <p className="text-xs">Activity from your network will appear here</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* People You May Know */}
                      {suggestedConnections.length > 0 && (
                        <Card className="border border-[var(--border)]">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-black flex items-center gap-2">
                                <UserPlus className="w-4 h-4 text-theme-primary" />
                                People You May Know
                              </h3>
                              <button
                                onClick={() => setActiveView('discover')}
                                className="text-xs text-theme-primary font-bold hover:underline"
                              >
                                See All
                              </button>
                            </div>
                            <div className="space-y-3">
                              {suggestedConnections.map((user) => (
                                <div key={user.id} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg">
                                  <Link href={`/profile/${user.id}`}>
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 ring-theme-primary transition-all">
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
                                        {user.name || 'User'}
                                      </p>
                                    </Link>
                                    <p className="text-xs text-theme-muted truncate">{user.headline || 'Community member'}</p>
                                    <p className="text-[10px] text-pink-500 font-medium">Follows you</p>
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
                                        <UserPlus className="w-3 h-3 mr-1" />
                                        Follow
                                      </>
                                    )}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Discover New Connections */}
                      <Card className="border border-[var(--border)]">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-black flex items-center gap-2">
                              <Compass className="w-4 h-4 text-emerald-500" />
                              Discover New Connections
                            </h3>
                            <button
                              onClick={() => setActiveView('discover')}
                              className="text-xs text-theme-primary font-bold hover:underline"
                            >
                              See All
                            </button>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {allUsers
                              .filter(u => !followingIds.has(u.id) && !followerIds.has(u.id) && u.id !== session?.user?.id)
                              .slice(0, 4)
                              .map((user) => (
                                <div key={user.id} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg">
                                  <Link href={`/profile/${user.id}`}>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 ring-theme-primary transition-all">
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
                                        {user.name || 'User'}
                                      </p>
                                    </Link>
                                    <p className="text-xs text-theme-muted truncate">{user.headline || 'Community member'}</p>
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
                              ))}
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
                      <h3 className="text-sm font-black mb-3">Quick Actions</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => setActiveView('tree')}
                          className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <GitBranch className="w-5 h-5" />
                          <div className="text-left">
                            <p className="text-sm font-bold">View Network Tree</p>
                            <p className="text-xs opacity-80">Visualize your connections</p>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>
                        <button
                          onClick={() => setActiveView('discover')}
                          className="w-full flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg hover:bg-[color-mix(in_srgb,var(--muted)_80%,var(--primary))] transition-colors"
                        >
                          <Compass className="w-5 h-5 text-emerald-500" />
                          <div className="text-left">
                            <p className="text-sm font-bold">Find People</p>
                            <p className="text-xs text-theme-muted">Discover new connections</p>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto text-theme-muted" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Network Stats */}
                  {session?.user && (
                    <Card className="border border-[var(--border)]">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-black mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-theme-primary" />
                          Network Stats
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-theme-muted">Total Connections</span>
                            <span className="text-sm font-bold">{followingUsers.length + followers.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-theme-muted">Mutual Friends</span>
                            <span className="text-sm font-bold text-green-500">{mutualCount}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-theme-muted">Profile Views</span>
                            <span className="text-sm font-bold text-blue-500">--</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-theme-muted">Network Rank</span>
                            <span className="text-sm font-bold text-purple-500">#{Math.max(1, allUsers.length - followingUsers.length)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
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
                  <Card className="border-2 border-dashed border-[var(--border)]">
                    <CardContent className="p-8 text-center">
                      <Users className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <h3 className="text-lg font-black mb-2 text-theme-muted">
                        {activeView === 'following' && 'Not following anyone yet'}
                        {activeView === 'followers' && 'No followers yet'}
                        {activeView === 'discover' && 'No new people to discover'}
                      </h3>
                      <p className="text-sm text-theme-muted">
                        {activeView === 'following' && 'Start following people to see them here'}
                        {activeView === 'followers' && 'Share your profile to get followers'}
                        {activeView === 'discover' && "You're connected with everyone!"}
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

// Tree Map Component - Spacious path-based visualization
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
      <Card className="border-2 border-theme-primary">
        <CardContent className="p-8 text-center">
          <GitBranch className="w-16 h-16 text-theme-primary mx-auto mb-4" />
          <h3 className="text-xl font-black mb-2">Sign In to View Your Network Tree</h3>
          <p className="text-sm text-theme-muted mb-4">
            Visualize your connections as an interactive tree map
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

  // Get mutual connections
  const mutualConnections = followingUsers.filter(u => followerIds.has(u.id))
  const onlyFollowing = followingUsers.filter(u => !followerIds.has(u.id))
  const onlyFollowers = followers.filter(f => !followingIds.has(f.id))

  return (
    <div className="space-y-6">
      {/* Tree Legend */}
      <Card className="border border-[var(--border)]">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
              <span className="font-medium">Mutual Connection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-500" />
              <span className="font-medium">You Follow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500" />
              <span className="font-medium">Follows You</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tree Visualization */}
      <div className="relative">
        {/* Center - You */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-black text-2xl shadow-xl ring-4 ring-white dark:ring-gray-800">
            YOU
          </div>
          <p className="text-sm font-bold mt-2">Your Network</p>
          <p className="text-xs text-theme-muted">{followingUsers.length + followers.length} connections</p>
        </div>

        {/* Branches */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Mutual Connections Branch */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Star className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-700 dark:text-green-400">
                  Mutual ({mutualConnections.length})
                </span>
              </div>
              <div className="w-0.5 h-8 bg-green-300 mx-auto" />
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
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
                <p className="text-center text-sm text-theme-muted py-4">No mutual connections yet</p>
              )}
            </div>
          </div>

          {/* Following Branch */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400">
                  Following ({onlyFollowing.length})
                </span>
              </div>
              <div className="w-0.5 h-8 bg-blue-300 mx-auto" />
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
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
                <p className="text-center text-sm text-theme-muted py-4">Follow more people!</p>
              )}
            </div>
          </div>

          {/* Followers Branch */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                <Heart className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-bold text-pink-700 dark:text-pink-400">
                  Followers ({onlyFollowers.length})
                </span>
              </div>
              <div className="w-0.5 h-8 bg-pink-300 mx-auto" />
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
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
                <p className="text-center text-sm text-theme-muted py-4">Share your profile!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tree Node Component
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
  const colors = {
    mutual: 'from-green-400 to-emerald-500 border-green-300',
    following: 'from-blue-400 to-blue-500 border-blue-300',
    follower: 'from-pink-400 to-rose-500 border-pink-300',
  }

  return (
    <div
      className="flex items-center gap-3 p-3 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:shadow-lg transition-all cursor-pointer group"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onViewProfile}
    >
      {/* Connection line indicator */}
      <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${colors[type].split(' ').slice(0, 2).join(' ')}`} />

      {/* Avatar */}
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[type]} flex items-center justify-center overflow-hidden flex-shrink-0 ring-2 ring-white dark:ring-gray-800`}>
        {user.image ? (
          <img src={user.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-white font-bold text-lg">{(user.name || 'U')[0]}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[var(--foreground)] truncate group-hover:underline">
          {user.name || 'User'}
        </p>
        <p className="text-xs text-theme-muted truncate">{user.headline || 'Community member'}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-theme-muted">{user._count.followers} followers</span>
          {type === 'mutual' && (
            <span className="text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
              Mutual
            </span>
          )}
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
              <UserPlus className="w-3 h-3 mr-1" />
              Follow
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
    </div>
  )
}
