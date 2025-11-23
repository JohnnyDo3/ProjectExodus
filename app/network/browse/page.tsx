'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Search, MapPin, Briefcase, Sparkles, Filter, X, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import Link from 'next/link'
import FollowConnectButtons from '@/components/network/FollowConnectButtons'

interface User {
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

export default function BrowseProfessionalsPage() {
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])
  const [interestsFilter, setInterestsFilter] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (session?.user?.id) {
      fetchUsers()
    }
  }, [session, currentPage, searchQuery, locationFilter, skillsFilter, interestsFilter])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        location: locationFilter,
        page: currentPage.toString(),
        limit: '12',
      })

      if (skillsFilter.length > 0) {
        params.append('skills', skillsFilter.join(','))
      }

      if (interestsFilter.length > 0) {
        params.append('interests', interestsFilter.join(','))
      }

      const res = await fetch(`/api/users/search?${params}`)
      const data = await res.json()

      if (data.success) {
        setUsers(data.data.users)
        setTotalPages(data.data.pagination.totalPages)
        setTotal(data.data.pagination.total)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

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

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-black text-[var(--foreground)]">BROWSE PROFESSIONALS</h1>
              <Link href="/network">
                <Button variant="outline" className="font-bold">
                  Back to Network
                </Button>
              </Link>
            </div>
            <p className="text-lg font-semibold text-theme-muted">
              Discover sustainability professionals and expand your network
            </p>
          </div>

          {/* Search Bar */}
          <Card className="border-4 border-theme-primary mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-theme-muted" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                      }}
                      placeholder="Search by name, email, or headline..."
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="font-bold"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters {hasActiveFilters && `(${[searchQuery, locationFilter, ...skillsFilter, ...interestsFilter].filter(Boolean).length})`}
                  </Button>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearAllFilters} className="font-bold">
                      <X className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Filters Panel */}
                {showFilters && (
                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t-2 border-[var(--border)]">
                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        LOCATION
                      </label>
                      <input
                        type="text"
                        value={locationFilter}
                        onChange={(e) => {
                          setLocationFilter(e.target.value)
                          setCurrentPage(1)
                        }}
                        placeholder="e.g., San Francisco"
                        className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                      />
                    </div>

                    {/* Skills Filter */}
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                        <Briefcase className="w-4 h-4 inline mr-1" />
                        SKILLS
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {skillsFilter.map((skill) => (
                          <div
                            key={skill}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-bold text-xs"
                          >
                            {skill}
                            <button onClick={() => removeSkillFilter(skill)}>
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSkillFilter()}
                          placeholder="Add skill filter"
                          className="flex-1 px-4 py-2 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium text-sm"
                        />
                        <Button onClick={addSkillFilter} size="sm" className="font-bold">
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Interests Filter */}
                    <div>
                      <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                        <Sparkles className="w-4 h-4 inline mr-1" />
                        INTERESTS
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {interestsFilter.map((interest) => (
                          <div
                            key={interest}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--muted)] border-2 border-theme-primary text-theme-primary font-bold text-xs"
                          >
                            {interest}
                            <button onClick={() => removeInterestFilter(interest)}>
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addInterestFilter()}
                          placeholder="Add interest filter"
                          className="flex-1 px-4 py-2 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium text-sm"
                        />
                        <Button onClick={addInterestFilter} size="sm" className="font-bold">
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-base font-bold text-theme-muted">
              Found {total} professional{total !== 1 ? 's' : ''}
              {hasActiveFilters && ' matching your filters'}
            </p>
          </div>

          {/* Users Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-4 border-theme-primary animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-48 bg-[var(--muted)] rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : users.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <Card key={user.id} className="border-4 border-theme-primary hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      {/* Avatar & Name */}
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <Users className="w-8 h-8 text-[var(--primary-foreground)]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/profile/${user.id}`}>
                            <h3 className="text-lg font-black text-[var(--foreground)] hover:text-theme-primary transition-colors truncate">
                              {user.name}
                            </h3>
                          </Link>
                          {user.headline && (
                            <p className="text-sm font-bold text-theme-primary line-clamp-2">
                              {user.headline}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Job & Location */}
                      <div className="space-y-2">
                        {user.jobTitle && user.company && (
                          <p className="text-sm font-medium text-[var(--foreground)] flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-theme-primary flex-shrink-0" />
                            <span className="truncate">{user.jobTitle} at {user.company}</span>
                          </p>
                        )}
                        {user.location && (
                          <p className="text-sm font-medium text-theme-muted flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{user.location}</span>
                          </p>
                        )}
                      </div>

                      {/* Skills Preview */}
                      {user.expertise && user.expertise.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {user.expertise.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-bold text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {user.expertise.length > 3 && (
                            <span className="px-3 py-1 rounded-full bg-[var(--muted)] text-theme-muted font-bold text-xs">
                              +{user.expertise.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="pt-4 border-t-2 border-[var(--border)]">
                        <FollowConnectButtons userId={user.id} variant="compact" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="font-bold"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <div className="flex gap-2">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(page)}
                          className="font-bold min-w-[40px]"
                        >
                          {page}
                        </Button>
                      )
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="px-2 py-2 font-bold text-theme-muted">...</span>
                        <Button
                          variant={currentPage === totalPages ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(totalPages)}
                          className="font-bold min-w-[40px]"
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
                    className="font-bold"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-theme-muted mx-auto mb-4" />
                <h3 className="text-xl font-black text-[var(--foreground)] mb-2">No Professionals Found</h3>
                <p className="text-base font-medium text-theme-muted mb-6">
                  {hasActiveFilters
                    ? 'Try adjusting your filters to see more results'
                    : 'No professionals available at the moment'}
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearAllFilters} className="font-bold">
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
