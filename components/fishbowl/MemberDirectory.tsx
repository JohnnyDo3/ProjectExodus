'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Search, MapPin, Briefcase, Sparkles, Filter, X, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import Link from 'next/link'
import FollowConnectButtons from '@/components/network/FollowConnectButtons'

interface DirectoryUser {
  id: string
  name: string
  email: string
  image?: string
  headline?: string
  bio?: string
  location?: string
  company?: string
  jobTitle?: string
  expertise?: string[]
  interests?: string[]
  isFollowing: boolean
  connectionStatus: string
}

export default function MemberDirectory() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<DirectoryUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])
  const [interestsFilter, setInterestsFilter] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const controllerRef = useRef<AbortController | null>(null)

  const fetchUsers = useCallback(async () => {
    if (!session?.user?.id) return

    // Abort previous request
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        location: locationFilter,
        page: currentPage.toString(),
        limit: '12',
      })
      if (skillsFilter.length > 0) params.append('skills', skillsFilter.join(','))
      if (interestsFilter.length > 0) params.append('interests', interestsFilter.join(','))

      const res = await fetch(`/api/users/search?${params}`, { signal: controller.signal })
      const data = await res.json()

      if (data.success) {
        setUsers(data.data.users)
        setTotalPages(data.data.pagination.totalPages)
        setTotal(data.data.pagination.total)
      }
    } catch {
      // Silently handle abort or network errors
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id, searchQuery, locationFilter, skillsFilter, interestsFilter, currentPage])

  useEffect(() => {
    fetchUsers()
    return () => controllerRef.current?.abort()
  }, [fetchUsers])

  const addSkillFilter = () => {
    if (newSkill.trim() && !skillsFilter.includes(newSkill.trim())) {
      setSkillsFilter([...skillsFilter, newSkill.trim()])
      setNewSkill('')
      setCurrentPage(1)
    }
  }

  const removeSkillFilter = (skill: string) => {
    setSkillsFilter(skillsFilter.filter((s) => s !== skill))
    setCurrentPage(1)
  }

  const addInterestFilter = () => {
    if (newInterest.trim() && !interestsFilter.includes(newInterest.trim())) {
      setInterestsFilter([...interestsFilter, newInterest.trim()])
      setNewInterest('')
      setCurrentPage(1)
    }
  }

  const removeInterestFilter = (interest: string) => {
    setInterestsFilter(interestsFilter.filter((i) => i !== interest))
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setLocationFilter('')
    setSkillsFilter([])
    setInterestsFilter([])
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery || locationFilter || skillsFilter.length > 0 || interestsFilter.length > 0

  if (!session?.user) {
    return (
      <Card className="border-2 border-dashed border-cyan-500/20 bg-gradient-to-br from-[var(--card)] to-[var(--muted)]/30">
        <CardContent className="p-8 text-center">
          <Users className="w-12 h-12 text-cyan-400/50 mx-auto mb-3" />
          <h3 className="text-lg font-black mb-2">Sign in to explore</h3>
          <p className="text-sm text-theme-muted">Sign in to search and discover community members</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-5">
      {/* Search & Filters */}
      <div className="bg-[var(--card)] rounded-xl border border-cyan-500/15 p-4 sm:p-5">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                placeholder="Search by name, headline, or email..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="font-bold text-xs border-cyan-500/20 hover:border-cyan-500/40"
            >
              <Filter className="w-3.5 h-3.5 mr-1.5" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 text-[10px]">
                  {[searchQuery, locationFilter, ...skillsFilter, ...interestsFilter].filter(Boolean).length}
                </span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearAllFilters} className="font-bold text-xs">
                <X className="w-3.5 h-3.5 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-cyan-500/10">
              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-[var(--foreground)] mb-1.5">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-cyan-500" />
                  Location
                </label>
                <input
                  type="text"
                  value={locationFilter}
                  onChange={(e) => { setLocationFilter(e.target.value); setCurrentPage(1) }}
                  placeholder="e.g., San Francisco"
                  className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-xs font-bold text-[var(--foreground)] mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 inline mr-1 text-cyan-500" />
                  Skills
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {skillsFilter.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 border border-cyan-500/30 text-[10px] font-bold"
                    >
                      {skill}
                      <button onClick={() => removeSkillFilter(skill)}>
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkillFilter()}
                    placeholder="Add skill"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <Button onClick={addSkillFilter} size="sm" className="font-bold text-xs px-2">+</Button>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-xs font-bold text-[var(--foreground)] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1 text-cyan-500" />
                  Interests
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {interestsFilter.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--muted)] border border-cyan-500/20 text-theme-muted text-[10px] font-bold"
                    >
                      {interest}
                      <button onClick={() => removeInterestFilter(interest)}>
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addInterestFilter()}
                    placeholder="Add interest"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <Button onClick={addInterestFilter} size="sm" className="font-bold text-xs px-2">+</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs font-bold text-theme-muted">
        {total} member{total !== 1 ? 's' : ''} found{hasActiveFilters ? ' matching your filters' : ''}
      </p>

      {/* User Grid */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[var(--card)] rounded-xl border border-cyan-500/10 p-5 animate-pulse">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--muted)]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[var(--muted)] rounded w-2/3" />
                  <div className="h-3 bg-[var(--muted)] rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-[var(--muted)] rounded w-full mb-2" />
              <div className="h-3 bg-[var(--muted)] rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : users.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-[var(--card)] rounded-xl border border-[var(--border)] hover:border-cyan-500/30 p-5 transition-colors"
              >
                {/* Avatar & Name */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-cyan-600 flex items-center justify-center flex-shrink-0">
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Users className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${user.id}`}>
                      <h3 className="text-sm font-black text-[var(--foreground)] hover:text-theme-primary transition-colors truncate">
                        {user.name}
                      </h3>
                    </Link>
                    {user.headline && (
                      <p className="text-xs font-medium text-theme-primary line-clamp-1">{user.headline}</p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 mb-3">
                  {user.jobTitle && user.company && (
                    <p className="text-xs font-medium text-[var(--foreground)] flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                      <span className="truncate">{user.jobTitle} at {user.company}</span>
                    </p>
                  )}
                  {user.location && (
                    <p className="text-xs text-theme-muted flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </p>
                  )}
                </div>

                {/* Expertise tags */}
                {user.expertise && user.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {user.expertise.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                    {user.expertise.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-theme-muted text-[10px] font-bold">
                        +{user.expertise.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-[var(--border)]">
                  <FollowConnectButtons userId={user.id} variant="compact" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="font-bold text-xs"
                size="sm"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                Prev
              </Button>
              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'outline'}
                      onClick={() => setCurrentPage(page)}
                      className="font-bold text-xs min-w-[32px]"
                      size="sm"
                    >
                      {page}
                    </Button>
                  )
                })}
                {totalPages > 5 && (
                  <>
                    <span className="px-1.5 py-1 text-theme-muted text-xs">...</span>
                    <Button
                      variant={currentPage === totalPages ? 'primary' : 'outline'}
                      onClick={() => setCurrentPage(totalPages)}
                      className="font-bold text-xs min-w-[32px]"
                      size="sm"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="font-bold text-xs"
                size="sm"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <Card className="border-2 border-dashed border-cyan-500/15 bg-gradient-to-br from-[var(--card)] to-[var(--muted)]/30">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-cyan-400/40 mx-auto mb-3" />
            <h3 className="text-lg font-black mb-2 text-[var(--foreground)]">No travelers found in these waters</h3>
            <p className="text-sm text-theme-muted mb-4">
              {hasActiveFilters ? 'Try adjusting your filters to cast a wider net' : 'No members available at the moment'}
            </p>
            {hasActiveFilters && (
              <Button onClick={clearAllFilters} variant="outline" className="font-bold text-xs border-cyan-500/30">
                Clear All Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
