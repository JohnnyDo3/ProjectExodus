'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
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
} from 'lucide-react'

interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  bio: string | null
  location: string | null
  interests: string[]
  createdAt: string
  _count: {
    followers: number
    following: number
    projectMemberships: number
    forumPosts: number
  }
  isFollowing?: boolean
}

export default function NetworkPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInterest, setSelectedInterest] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set())
  const [loadingFollow, setLoadingFollow] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchUsers()
    if (session?.user?.id) {
      fetchFollowingStatus()
    }
  }, [session?.user?.id])

  useEffect(() => {
    filterUsers()
  }, [users, searchQuery, selectedInterest, followingUsers])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()

      if (data.success) {
        setUsers(data.data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchFollowingStatus = async () => {
    try {
      const res = await fetch('/api/users/following')
      const data = await res.json()

      if (data.success) {
        setFollowingUsers(new Set(data.data.map((u: any) => u.id)))
      }
    } catch (error) {
      console.error('Error fetching following status:', error)
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
      alert('Please sign in to follow users')
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
        } else {
          newSet.add(userId)
        }
        return newSet
      })

      // Refresh user data to get updated follower counts
      fetchUsers()
    } catch (error) {
      console.error('Error following/unfollowing user:', error)
      alert('Failed to update follow status')
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading network...</p>
        </div>
      </div>
    )
  }

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
          </div>
        </div>
      </section>

      {/* Search and Filters */}
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

      {/* Members Grid */}
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
                    <Card
                      key={user.id}
                      className="border-4 border-theme-primary hover:border-theme-accent transition-colors"
                    >
                      <CardContent className="p-6">
                        {/* User Avatar and Name */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.name || 'User'}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <Users className="w-8 h-8 text-[var(--primary-foreground)]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-black text-[var(--foreground)] truncate">
                              {user.name || 'Anonymous'}
                            </h3>
                            {user.location && (
                              <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-theme-muted">
                                <MapPin className="w-4 h-4" />
                                <span className="truncate">{user.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bio */}
                        {user.bio && (
                          <p className="text-sm font-semibold text-theme-muted mb-4 line-clamp-2">
                            {user.bio}
                          </p>
                        )}

                        {/* Interests */}
                        {user.interests.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            {user.interests.slice(0, 3).map((interest) => (
                              <span
                                key={interest}
                                className="px-2 py-1 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent text-xs font-black uppercase"
                              >
                                {interest}
                              </span>
                            ))}
                            {user.interests.length > 3 && (
                              <span className="px-2 py-1 rounded-full bg-[var(--muted)] text-theme-muted text-xs font-black">
                                +{user.interests.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-[var(--muted)] rounded-lg">
                          <div className="text-center">
                            <p className="text-2xl font-black text-theme-primary">
                              {user._count.followers}
                            </p>
                            <p className="text-xs font-bold text-theme-muted uppercase">Followers</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-black text-theme-accent">
                              {user._count.projectMemberships}
                            </p>
                            <p className="text-xs font-bold text-theme-muted uppercase">Projects</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleFollow(user.id)}
                            disabled={isLoadingThisUser || !session?.user}
                            variant={isFollowing ? 'outline' : 'default'}
                            className="flex-1 font-bold"
                          >
                            {isLoadingThisUser ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : isFollowing ? (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                FOLLOWING
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4 mr-2" />
                                FOLLOW
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            disabled={!session?.user}
                            className="font-bold"
                            title="Send Message"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
