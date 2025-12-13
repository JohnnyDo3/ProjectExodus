'use client'

// ============================================
// THE GATHERING SPACE
// "A gathering is sacred when those who attend
//  bring more than their presence - they bring their purpose."
// ============================================

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Calendar,
  MapPin,
  Video,
  Users,
  Plus,
  Globe,
  Filter,
  Clock,
  User,
  Sparkles,
  Circle,
  Flame,
  Star,
} from 'lucide-react'
import Link from 'next/link'

// Event type theming
const EVENT_THEMES: Record<string, { icon: any; label: string; color: string; bgColor: string }> = {
  VIRTUAL: {
    icon: Sparkles,
    label: 'Virtual',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 border-violet-500/20',
  },
  IN_PERSON: {
    icon: Flame,
    label: 'In Person',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
  },
  HYBRID: {
    icon: Globe,
    label: 'Hybrid',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20',
  },
}

interface Event {
  id: string
  title: string
  slug: string
  description: string
  type: 'VIRTUAL' | 'IN_PERSON' | 'HYBRID'
  location: string | null
  meetingLink: string | null
  startDate: string
  endDate: string | null
  maxCapacity: number | null
  coverImage: string | null
  creator: {
    id: string
    name: string | null
    image: string | null
  }
  attendees: any[]
  _count: {
    attendees: number
  }
  createdAt: string
}

export default function EventsPage() {
  const { data: session } = useSession()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>('')
  const [showUpcoming, setShowUpcoming] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEventsList()
  }, [events, filterType, showUpcoming])

  const fetchEvents = async () => {
    try {
      console.log('[Events Page] Fetching events...')
      const res = await fetch('/api/events')
      console.log('[Events Page] Response status:', res.status)
      const data = await res.json()
      console.log('[Events Page] Response data:', data)

      if (data.success) {
        console.log('[Events Page] Setting', data.data.length, 'events')
        setEvents(data.data)
      } else {
        console.error('[Events Page] API returned success=false:', data.error)
      }
    } catch (error) {
      console.error('[Events Page] Error fetching events:', error)
    } finally {
      console.log('[Events Page] Setting isLoading to false')
      setIsLoading(false)
    }
  }

  const filterEventsList = () => {
    let filtered = [...events]

    // Filter by type
    if (filterType) {
      filtered = filtered.filter((event) => event.type === filterType)
    }

    // Filter by upcoming
    if (showUpcoming) {
      const now = new Date()
      filtered = filtered.filter((event) => new Date(event.startDate) >= now)
    }

    setFilteredEvents(filtered)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading events...</p>
        </div>
      </div>
    )
  }

  // Calculate stats
  const upcomingCount = events.filter((e) => new Date(e.startDate) >= new Date()).length
  const totalAttendees = events.reduce((sum, e) => sum + e._count.attendees, 0)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header - The Gathering Space */}
      <section className="relative py-12 overflow-hidden bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full border-2 border-[var(--primary)] -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full border-2 border-[var(--accent)] -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border-2 border-[var(--secondary)] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--muted)] mb-6">
              <Circle className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-xs font-bold text-[var(--foreground)]/70 uppercase tracking-wider">Gatherings</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[var(--foreground)]">
              Where Paths Converge
            </h1>
            <p className="text-base sm:text-lg font-medium text-theme-muted max-w-xl mx-auto mb-8 italic">
              "A gathering becomes meaningful when those who attend bring more than their presence."
            </p>

            {session?.user && (
              <Link href="/events/create">
                <Button size="lg" className="font-black">
                  <Plus className="w-5 h-5 mr-2" />
                  Create a Gathering
                </Button>
              </Link>
            )}

            {/* Stats - Circle Design */}
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-[var(--primary)]/30 flex items-center justify-center bg-[var(--card)]">
                  <p className="text-2xl font-black text-[var(--primary)]">{events.length}</p>
                </div>
                <p className="text-xs font-bold text-theme-muted uppercase mt-2">Gatherings</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-[var(--accent)]/30 flex items-center justify-center bg-[var(--card)]">
                  <p className="text-2xl font-black text-[var(--accent)]">{upcomingCount}</p>
                </div>
                <p className="text-xs font-bold text-theme-muted uppercase mt-2">Upcoming</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-[var(--secondary)]/30 flex items-center justify-center bg-[var(--card)]">
                  <p className="text-2xl font-black text-[var(--secondary)]">{totalAttendees}</p>
                </div>
                <p className="text-xs font-bold text-theme-muted uppercase mt-2">Attending</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters - Gathering Types */}
      <section className="py-6 border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Type Filter */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterType('')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
                    filterType === ''
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/10'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('VIRTUAL')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border ${
                    filterType === 'VIRTUAL'
                      ? 'bg-violet-500 text-white border-violet-500'
                      : 'bg-violet-500/10 text-violet-600 border-violet-500/20 hover:bg-violet-500/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Virtual
                </button>
                <button
                  onClick={() => setFilterType('IN_PERSON')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border ${
                    filterType === 'IN_PERSON'
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  In Person
                </button>
                <button
                  onClick={() => setFilterType('HYBRID')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border ${
                    filterType === 'HYBRID'
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  Hybrid
                </button>
              </div>

              {/* Time Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowUpcoming(true)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                    showUpcoming
                      ? 'bg-[var(--foreground)] text-[var(--background)]'
                      : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--foreground)]/10'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setShowUpcoming(false)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                    !showUpcoming
                      ? 'bg-[var(--foreground)] text-[var(--background)]'
                      : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--foreground)]/10'
                  }`}
                >
                  All
                </button>
              </div>
            </div>

            {/* Results count */}
            <p className="mt-4 text-xs font-medium text-theme-muted">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'gathering' : 'gatherings'} found
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredEvents.length === 0 ? (
              <Card className="border-2 border-dashed border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--muted)]/30">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[var(--muted)] flex items-center justify-center">
                    <Circle className="w-8 h-8 text-theme-muted opacity-50" />
                  </div>
                  <h3 className="text-xl font-black mb-2 text-[var(--foreground)]">No Gatherings Found</h3>
                  <p className="text-sm text-theme-muted mb-6">
                    {showUpcoming
                      ? 'No upcoming gatherings match your search'
                      : 'No gatherings match your search'}
                  </p>
                  {session?.user && (
                    <Link href="/events/create">
                      <Button className="font-bold">
                        <Plus className="w-4 h-4 mr-2" />
                        Create a Gathering
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => {
                  const isPast = new Date(event.startDate) < new Date()
                  const isFull = event.maxCapacity && event._count.attendees >= event.maxCapacity
                  const theme = EVENT_THEMES[event.type] || EVENT_THEMES.VIRTUAL
                  const TypeIcon = theme.icon

                  return (
                    <Link key={event.id} href={`/events/${event.slug}`}>
                      <Card
                        className={`border transition-all cursor-pointer hover:shadow-lg h-full group ${
                          isPast
                            ? 'opacity-60 border-[var(--border)]'
                            : `border-[var(--border)] hover:border-[var(--primary)]`
                        }`}
                      >
                        <CardContent className="p-5">
                          {/* Event Type Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <div
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs border ${theme.bgColor} ${theme.color}`}
                            >
                              <TypeIcon className="w-3.5 h-3.5" />
                              {theme.label}
                            </div>
                            <div className="flex items-center gap-2">
                              {isFull && (
                                <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold border border-red-500/20">
                                  Full
                                </span>
                              )}
                              {isPast && (
                                <span className="px-2 py-1 rounded-full bg-[var(--muted)] text-theme-muted text-[10px] font-bold">
                                  Past
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Event Title */}
                          <h3 className="text-lg font-black mb-2 text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                            {event.title}
                          </h3>

                          {/* Event Description */}
                          <p className="text-sm text-theme-muted mb-4 line-clamp-2">
                            {event.description}
                          </p>

                          {/* Event Details */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                              <Calendar className="w-4 h-4 text-[var(--primary)]" />
                              <span className="font-medium">{formatDate(event.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                              <Clock className="w-4 h-4 text-[var(--accent)]" />
                              <span className="font-medium">{formatTime(event.startDate)}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm text-theme-muted truncate">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Attendees Circle */}
                          <div className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-xl border border-[var(--border)]">
                            <div className="flex -space-x-2">
                              {event.attendees.slice(0, 3).map((attendee: any, idx: number) => (
                                <div
                                  key={attendee.id}
                                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center border-2 border-[var(--muted)]"
                                  style={{ zIndex: 3 - idx }}
                                >
                                  {attendee.user.image ? (
                                    <img
                                      src={attendee.user.image}
                                      alt={attendee.user.name || 'User'}
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-xs font-bold text-white">
                                      {(attendee.user.name || 'U')[0]}
                                    </span>
                                  )}
                                </div>
                              ))}
                              {event._count.attendees > 3 && (
                                <div className="w-8 h-8 rounded-full bg-[var(--background)] border-2 border-[var(--muted)] flex items-center justify-center">
                                  <span className="text-[10px] font-bold text-theme-muted">
                                    +{event._count.attendees - 3}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-[var(--foreground)]">
                                {event._count.attendees} {event._count.attendees === 1 ? 'person' : 'people'} gathering
                              </p>
                              {event.maxCapacity && (
                                <div className="mt-1">
                                  <div className="h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all"
                                      style={{ width: `${Math.min(100, (event._count.attendees / event.maxCapacity) * 100)}%` }}
                                    />
                                  </div>
                                  <p className="text-[10px] text-theme-muted mt-0.5">
                                    {event.maxCapacity - event._count.attendees} spots remaining
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
