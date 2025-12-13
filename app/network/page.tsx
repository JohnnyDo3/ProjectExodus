'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SkeletonUserCard } from '@/components/ui/SkeletonUserCard'
import NetworkVisualization from '@/components/network/NetworkVisualization'
import { UserPreviewCard } from '@/components/network/UserPreviewCard'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  Users,
  Search,
  Filter,
  UserPlus,
  UserCheck,
  MapPin,
  MessageCircle,
  Loader2,
  Grid3x3,
  Network,
  Heart,
  ArrowRight,
  Compass,
  TrendingUp,
  Sparkles,
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

type TabType = 'following' | 'followers' | 'discover'

export default function NetworkPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get('tab') as TabType) || 'discover'

  const [activeTab, setActiveTab] = useState<TabType>(initialTab)
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])
  const [followingUsers, setFollowingUsers] = useState<UserProfile[]>([])
  const [followers, setFollowers] = useState<UserProfile[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInterest, setSelectedInterest] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set())
  const [followerIds, setFollowerIds] = useState<Set<string>>(new Set())
  const [loadingFollow, setLoadingFollow] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'grid' | 'network'>('grid')

  // Fetch all data
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      // Fetch all users
      const usersRes = await fetch('/api/users', { cache: 'no-store' })
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        if (usersData.success) {
          setAllUsers(usersData.data)
        }
      }

      // If logged in, fetch following and followers
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

  // Update URL when tab changes
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('tab', activeTab)
    window.history.replaceState({}, '', url.toString())
  }, [activeTab])

  // Load view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('network-view-mode') as 'grid' | 'network' | null
    if (savedViewMode) {
      setViewMode(savedViewMode)
    }
  }, [])

  // Save view mode to localStorage
  useEffect(() => {
    localStorage.setItem('network-view-mode', viewMode)
  }, [viewMode])

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

      // Refresh data
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

  // Get filtered users based on active tab and search
  const getDisplayUsers = () => {
    let users: UserProfile[] = []

    switch (activeTab) {
      case 'following':
        users = followingUsers
        break
      case 'followers':
        users = followers
        break
      case 'discover':
        // Exclude users we're already following
        users = allUsers.filter(u => !followingIds.has(u.id) && u.id !== session?.user?.id)
        break
    }

    // Apply search filter
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

    // Apply interest filter
    if (selectedInterest) {
      users = users.filter((user) => user.interests.includes(selectedInterest))
    }

    return users
  }

  const displayUsers = getDisplayUsers()

  // Get all unique interests
  const allInterests = Array.from(
    new Set(allUsers.flatMap((user) => user.interests))
  ).sort()

  // Calculate mutual connections
  const mutualCount = Array.from(followingIds).filter(id => followerIds.has(id)).length

  const tabs = [
    {
      id: 'following' as TabType,
      label: 'Following',
      count: followingUsers.length,
      icon: UserCheck,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
    },
    {
      id: 'followers' as TabType,
      label: 'Followers',
      count: followers.length,
      icon: Heart,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500',
    },
    {
      id: 'discover' as TabType,
      label: 'Discover',
      count: allUsers.length - followingIds.size - 1,
      icon: Compass,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500',
    },
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-black text-xs sm:text-sm uppercase mb-4 sm:mb-6">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                MY NETWORK
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-4 text-[var(--foreground)]">
                YOUR CONNECTIONS
              </h1>
              <p className="text-sm sm:text-lg md:text-xl font-semibold text-theme-muted max-w-2xl mx-auto px-4">
                {session?.user ? 'Manage your network, discover new connections, and grow your community' : 'Sign in to manage your network connections'}
              </p>
            </div>

            {/* Stats - Only show if logged in */}
            {session?.user && (
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center px-4 py-2 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                  <p className="text-2xl sm:text-4xl font-black text-theme-primary">{followingUsers.length}</p>
                  <p className="text-[10px] sm:text-sm font-bold text-theme-muted uppercase">Following</p>
                </div>
                <div className="text-center px-4 py-2 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                  <p className="text-2xl sm:text-4xl font-black text-pink-500">{followers.length}</p>
                  <p className="text-[10px] sm:text-sm font-bold text-theme-muted uppercase">Followers</p>
                </div>
                <div className="text-center px-4 py-2 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                  <p className="text-2xl sm:text-4xl font-black text-green-500">{mutualCount}</p>
                  <p className="text-[10px] sm:text-sm font-bold text-theme-muted uppercase">Mutual</p>
                </div>
              </div>
            )}

            {/* View Mode Toggle */}
            <div className="flex justify-center gap-2 mb-4">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                className="font-bold text-xs sm:text-sm"
              >
                <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                GRID
              </Button>
              <Button
                onClick={() => setViewMode('network')}
                variant={viewMode === 'network' ? 'primary' : 'outline'}
                size="sm"
                className="font-bold text-xs sm:text-sm"
              >
                <Network className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                NETWORK
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      {session?.user && viewMode === 'grid' && (
        <section className="sticky top-16 z-40 bg-[var(--card)] border-b-2 border-[var(--border)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm whitespace-nowrap border-b-4 transition-all ${
                      activeTab === tab.id
                        ? `${tab.color} border-current`
                        : 'text-theme-muted border-transparent hover:text-[var(--foreground)]'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {tab.label}
                    <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                      activeTab === tab.id ? tab.bgColor + ' text-white' : 'bg-[var(--muted)] text-theme-muted'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters - Grid View Only */}
      {viewMode === 'grid' && (
        <section className="py-4 sm:py-6 border-b border-[var(--border)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-theme-muted" />
                  <input
                    type="text"
                    placeholder="Search by name, location, or bio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Interest Filter */}
                <div className="sm:w-48 lg:w-64 relative">
                  <Filter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-theme-muted pointer-events-none" />
                  <select
                    value={selectedInterest}
                    onChange={(e) => setSelectedInterest(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">All Interests</option>
                    {allInterests.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results count */}
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold text-theme-muted">
                SHOWING {displayUsers.length} {activeTab === 'discover' ? 'PEOPLE TO DISCOVER' : activeTab.toUpperCase()}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      {isLoading ? (
        <section className="py-8 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonUserCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : viewMode === 'network' ? (
        <section className="py-8 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <NetworkVisualization
                currentUserId={session?.user?.id || null}
                users={allUsers.map(u => ({
                  id: u.id,
                  name: u.name || 'User',
                  image: u.image,
                  followers: u._count.followers,
                  projects: u._count.projectMemberships,
                  interests: u.interests,
                }))}
                followingIds={followingIds}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="py-6 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Not logged in message */}
              {!session?.user && (
                <Card className="border-4 border-theme-primary mb-6 sm:mb-8">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-theme-primary mx-auto mb-4" />
                    <h3 className="text-xl sm:text-2xl font-black mb-2 text-[var(--foreground)]">
                      JOIN THE COMMUNITY
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-theme-muted mb-4 sm:mb-6">
                      Sign in to follow people, see who follows you, and grow your network
                    </p>
                    <Link href="/auth/signin">
                      <Button className="font-bold">
                        SIGN IN <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Empty state */}
              {displayUsers.length === 0 ? (
                <Card className="border-4 border-theme-secondary">
                  <CardContent className="p-8 sm:p-12 text-center">
                    <Users className="w-12 h-12 sm:w-16 sm:h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl sm:text-2xl font-black mb-2 text-theme-muted">
                      {activeTab === 'following' && 'NOT FOLLOWING ANYONE YET'}
                      {activeTab === 'followers' && 'NO FOLLOWERS YET'}
                      {activeTab === 'discover' && 'NO NEW PEOPLE TO DISCOVER'}
                    </h3>
                    <p className="text-sm sm:text-lg font-semibold text-theme-muted">
                      {activeTab === 'following' && 'Start following people to see them here'}
                      {activeTab === 'followers' && 'Share your profile to get followers'}
                      {activeTab === 'discover' && "You're connected with everyone! Try adjusting your filters."}
                    </p>
                    {activeTab !== 'discover' && (
                      <Button
                        onClick={() => setActiveTab('discover')}
                        className="mt-6 font-bold"
                      >
                        DISCOVER PEOPLE <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {displayUsers.map((user) => (
                    <UserPreviewCard
                      key={user.id}
                      user={user}
                      isFollowing={followingIds.has(user.id)}
                      isFollowingMe={followerIds.has(user.id)}
                      isLoadingFollow={loadingFollow.has(user.id)}
                      onFollow={handleFollow}
                      onMessage={(userId) => router.push(`/messages?user=${userId}`)}
                      isLoggedIn={!!session?.user}
                      variant={activeTab === 'discover' ? 'compact' : 'full'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
