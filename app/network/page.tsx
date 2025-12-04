'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SkeletonUserCard } from '@/components/ui/SkeletonUserCard'
import NetworkVisualization from '@/components/network/NetworkVisualization'
import { UserBusinessCard } from '@/components/network/UserBusinessCard'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  Users,
  Search,
  Filter,
  UserPlus,
  UserMinus,
  MapPin,
  Briefcase,
  MessageCircle,
  UserCheck,
  Loader2,
  Grid3x3,
  Network,
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

export default function NetworkPage() {
  console.log('[Network Page] Component mounting')
  const { data: session, status } = useSession()
  console.log('[Network Page] Session status:', status, 'User ID:', session?.user?.id)
  const router = useRouter()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInterest, setSelectedInterest] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set())
  const [loadingFollow, setLoadingFollow] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'grid' | 'network'>('grid')

  useEffect(() => {
    fetchUsers()
    if (session?.user?.id) {
      fetchFollowingStatus()
    }
  }, [session?.user?.id])

  useEffect(() => {
    filterUsers()
  }, [users, searchQuery, selectedInterest, followingUsers])

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

  const fetchUsers = async () => {
    try {
      console.log('[Network Page] Fetching users...')

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const res = await fetch('/api/users', { signal: controller.signal })
      clearTimeout(timeoutId)

      console.log('[Network Page] Response status:', res.status)

      if (!res.ok) {
        console.error('[Network Page] Response not OK:', res.status, res.statusText)
        setUsers([])
        setIsLoading(false)
        return
      }

      const data = await res.json()
      console.log('[Network Page] Response data:', data)

      if (data.success) {
        console.log('[Network Page] Setting', data.data.length, 'users')
        setUsers(data.data)
      } else {
        console.error('[Network Page] API returned success=false:', data.error)
        setUsers([])
      }
    } catch (error) {
      console.error('[Network Page] Error fetching users:', error)
      if ((error as Error).name === 'AbortError') {
        console.error('[Network Page] Request timed out after 10s')
      }
      setUsers([])
    } finally {
      console.log('[Network Page] Setting isLoading to false')
      setIsLoading(false)
    }
  }

  const fetchFollowingStatus = async () => {
    try {
      console.log('[Network Page] Fetching following status...')

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const res = await fetch('/api/users/following', { signal: controller.signal })
      clearTimeout(timeoutId)

      console.log('[Network Page] Following response status:', res.status)

      if (!res.ok) {
        console.error('[Network Page] Following endpoint returned:', res.status)
        return
      }

      const data = await res.json()
      console.log('[Network Page] Following data:', data)

      if (data.success) {
        console.log('[Network Page] Setting', data.data.length, 'following users')
        setFollowingUsers(new Set(data.data.map((u: any) => u.id)))
      } else {
        console.error('[Network Page] Following API returned success=false:', data.error)
      }
    } catch (error) {
      console.error('[Network Page] Error fetching following status:', error)
      if ((error as Error).name === 'AbortError') {
        console.error('[Network Page] Following request timed out after 10s')
      }
    }
  }

  const filterUsers = () => {
    let filtered = [...users]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.location?.toLowerCase().includes(query) ||
          user.bio?.toLowerCase().includes(query)
      )
    }

    // Apply interest filter
    if (selectedInterest) {
      filtered = filtered.filter((user) =>
        user.interests.includes(selectedInterest)
      )
    }

    setFilteredUsers(filtered)
  }

  const handleFollow = async (userId: string) => {
    if (!session?.user) {
      toast.error('Please sign in to follow users')
      return
    }

    setLoadingFollow((prev) => new Set(prev).add(userId))

    try {
      const isFollowing = followingUsers.has(userId)
      const res = await fetch('/api/users/follow', {
        method: isFollowing ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: isFollowing ? undefined : JSON.stringify({ userId }),
      })

      if (!isFollowing) {
        await res.json()
      } else {
        const url = new URL('/api/users/follow', window.location.origin)
        url.searchParams.set('userId', userId)
        await fetch(url.toString(), { method: 'DELETE' })
      }

      // Update following status
      setFollowingUsers((prev) => {
        const newSet = new Set(prev)
        if (isFollowing) {
          newSet.delete(userId)
          toast.success('Unfollowed successfully!')
        } else {
          newSet.add(userId)
          toast.success('Following! You\'ll see their activity in your feed.')
        }
        return newSet
      })

      // Refresh user data to get updated follower counts
      fetchUsers()
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

  // Get all unique interests from all users
  const allInterests = Array.from(
    new Set(users.flatMap((user) => user.interests))
  ).sort()

  if (status === 'loading') {
    console.log('[Network Page] Session still loading...')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading session...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    console.log('[Network Page] Data still loading...')
    return (
      <div className="min-h-screen bg-[var(--background)]">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-black text-sm uppercase mb-6">
                <Users className="w-5 h-5" />
                NETWORKING HUB
              </div>
              <h1 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                CONNECT WITH SUSTAINABILITY ENTHUSIASTS
              </h1>
              <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
                Discovering members...
              </p>
            </div>
          </div>
        </section>

        {/* Loading Skeleton Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonUserCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  console.log('[Network Page] Rendering main content with', users.length, 'users')

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-black text-sm uppercase mb-6">
              <Users className="w-5 h-5" />
              NETWORKING HUB
            </div>
            <h1 className="text-5xl font-black mb-4 text-[var(--foreground)]">
              CONNECT WITH SUSTAINABILITY ENTHUSIASTS
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto">
              Discover, connect, and collaborate with people who share your passion for sustainability
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-black text-theme-primary">{users.length}</p>
                <p className="text-sm font-bold text-theme-muted uppercase">Members</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-theme-accent">{followingUsers.size}</p>
                <p className="text-sm font-bold text-theme-muted uppercase">Following</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-theme-secondary">{allInterests.length}</p>
                <p className="text-sm font-bold text-theme-muted uppercase">Interests</p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="mt-8 flex justify-center gap-2">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                className="font-bold"
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                GRID VIEW
              </Button>
              <Button
                onClick={() => setViewMode('network')}
                variant={viewMode === 'network' ? 'primary' : 'outline'}
                className="font-bold"
              >
                <Network className="w-4 h-4 mr-2" />
                NETWORK VIEW
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters - Grid View Only */}
      {viewMode === 'grid' && (
      <section className="py-8 border-b-4 border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
                <input
                  type="text"
                  placeholder="Search by name, location, or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Interest Filter */}
              <div className="lg:w-64 relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted pointer-events-none" />
                <select
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors appearance-none cursor-pointer"
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

            {/* Active Filters */}
            {(searchQuery || selectedInterest) && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-theme-muted">ACTIVE FILTERS:</span>
                {searchQuery && (
                  <div className="px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary text-sm font-bold flex items-center gap-2">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                )}
                {selectedInterest && (
                  <div className="px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent text-sm font-bold flex items-center gap-2">
                    Interest: {selectedInterest}
                    <button
                      onClick={() => setSelectedInterest('')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Results count */}
            <p className="mt-4 text-sm font-bold text-theme-muted">
              SHOWING {filteredUsers.length} OF {users.length} MEMBERS
            </p>
          </div>
        </div>
      </section>
      )}

      {/* Members Grid - Grid View Only */}
      {viewMode === 'grid' && (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredUsers.length === 0 ? (
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-black mb-2 text-theme-muted">NO MEMBERS FOUND</h3>
                  <p className="text-lg font-semibold text-theme-muted">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => {
                  const isFollowing = followingUsers.has(user.id)
                  const isLoadingThisUser = loadingFollow.has(user.id)

                  return (
                    <UserBusinessCard
                      key={user.id}
                      user={user}
                      isFollowing={isFollowing}
                      isLoadingFollow={isLoadingThisUser}
                      onFollow={handleFollow}
                      onMessage={(userId) => router.push(`/messages?user=${userId}`)}
                      isLoggedIn={!!session?.user}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Network View - Network Visualization */}
      {viewMode === 'network' && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <NetworkVisualization
                currentUserId={session?.user?.id || null}
                users={users.map(u => ({
                  id: u.id,
                  name: u.name || 'User',
                  image: u.image,
                  followers: u._count.followers,
                  projects: u._count.projectMemberships,
                  interests: u.interests,
                }))}
                followingIds={followingUsers}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
