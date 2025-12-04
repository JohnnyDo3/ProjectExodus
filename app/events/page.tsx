'use client'

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
} from 'lucide-react'
import Link from 'next/link'

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

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'VIRTUAL':
        return <Video className="w-5 h-5" />
      case 'IN_PERSON':
        return <MapPin className="w-5 h-5" />
      case 'HYBRID':
        return <Globe className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'VIRTUAL':
        return 'text-theme-primary bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))]'
      case 'IN_PERSON':
        return 'text-theme-accent bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))]'
      case 'HYBRID':
        return 'text-theme-secondary bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))]'
      default:
        return 'text-theme-muted bg-[var(--muted)]'
    }
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

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-black text-sm uppercase mb-6">
              <Calendar className="w-5 h-5" />
              EVENTS & MEETUPS
            </div>
            <h1 className="text-5xl font-black mb-4 text-[var(--foreground)]">
              CONNECT IN REAL TIME
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto mb-8">
              Join virtual meetings, in-person gatherings, and hybrid events with the sustainability community
            </p>

            {session?.user && (
              <Link href="/events/create">
                <Button size="lg" className="font-black text-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  CREATE EVENT
                </Button>
              </Link>
            )}

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-black text-theme-primary">{events.length}</p>
                <p className="text-sm font-bold text-theme-muted uppercase">Total Events</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-theme-accent">
                  {events.filter((e) => new Date(e.startDate) >= new Date()).length}
                </p>
                <p className="text-sm font-bold text-theme-muted uppercase">Upcoming</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-theme-secondary">
                  {events.reduce((sum, e) => sum + e._count.attendees, 0)}
                </p>
                <p className="text-sm font-bold text-theme-muted uppercase">Total Attendees</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b-4 border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Type Filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filterType === '' ? 'primary' : 'outline'}
                  onClick={() => setFilterType('')}
                  className="font-bold"
                >
                  ALL TYPES
                </Button>
                <Button
                  variant={filterType === 'VIRTUAL' ? 'primary' : 'outline'}
                  onClick={() => setFilterType('VIRTUAL')}
                  className="font-bold"
                >
                  <Video className="w-4 h-4 mr-2" />
                  VIRTUAL
                </Button>
                <Button
                  variant={filterType === 'IN_PERSON' ? 'primary' : 'outline'}
                  onClick={() => setFilterType('IN_PERSON')}
                  className="font-bold"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  IN-PERSON
                </Button>
                <Button
                  variant={filterType === 'HYBRID' ? 'primary' : 'outline'}
                  onClick={() => setFilterType('HYBRID')}
                  className="font-bold"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  HYBRID
                </Button>
              </div>

              {/* Time Filter */}
              <div className="flex gap-2">
                <Button
                  variant={showUpcoming ? 'primary' : 'outline'}
                  onClick={() => setShowUpcoming(true)}
                  className="font-bold"
                >
                  UPCOMING
                </Button>
                <Button
                  variant={!showUpcoming ? 'primary' : 'outline'}
                  onClick={() => setShowUpcoming(false)}
                  className="font-bold"
                >
                  ALL EVENTS
                </Button>
              </div>
            </div>

            {/* Results count */}
            <p className="mt-4 text-sm font-bold text-theme-muted">
              SHOWING {filteredEvents.length} OF {events.length} EVENTS
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredEvents.length === 0 ? (
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-black mb-2 text-theme-muted">NO EVENTS FOUND</h3>
                  <p className="text-lg font-semibold text-theme-muted mb-6">
                    {showUpcoming
                      ? 'No upcoming events match your filters'
                      : 'No events match your filters'}
                  </p>
                  {session?.user && (
                    <Link href="/events/create">
                      <Button className="font-bold">
                        <Plus className="w-4 h-4 mr-2" />
                        CREATE THE FIRST EVENT
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

                  return (
                    <Link key={event.id} href={`/events/${event.slug}`}>
                      <Card
                        className={`border-4 transition-all cursor-pointer hover:border-theme-accent h-full ${
                          isPast ? 'opacity-60 border-theme-secondary' : 'border-theme-primary'
                        }`}
                      >
                        <CardContent className="p-6">
                          {/* Event Type Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`flex items-center gap-2 px-3 py-1 rounded-full font-black text-sm ${getEventTypeColor(
                                event.type
                              )}`}
                            >
                              {getEventTypeIcon(event.type)}
                              {event.type.replace('_', '-')}
                            </div>
                            {isFull && (
                              <span className="px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--secondary)_30%,var(--background))] text-theme-secondary text-xs font-black">
                                FULL
                              </span>
                            )}
                            {isPast && (
                              <span className="px-3 py-1 rounded-full bg-[var(--muted)] text-theme-muted text-xs font-black">
                                PAST
                              </span>
                            )}
                          </div>

                          {/* Event Title */}
                          <h3 className="text-2xl font-black mb-2 text-[var(--foreground)] line-clamp-2">
                            {event.title}
                          </h3>

                          {/* Event Description */}
                          <p className="text-sm font-semibold text-theme-muted mb-4 line-clamp-2">
                            {event.description}
                          </p>

                          {/* Event Details */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
                              <Calendar className="w-4 h-4 text-theme-primary" />
                              {formatDate(event.startDate)}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
                              <Clock className="w-4 h-4 text-theme-accent" />
                              {formatTime(event.startDate)}
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm font-semibold text-theme-muted truncate">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Attendees */}
                          <div className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg">
                            <div className="flex -space-x-2">
                              {event.attendees.slice(0, 3).map((attendee: any) => (
                                <div
                                  key={attendee.id}
                                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center border-2 border-[var(--muted)]"
                                >
                                  {attendee.user.image ? (
                                    <img
                                      src={attendee.user.image}
                                      alt={attendee.user.name || 'User'}
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  ) : (
                                    <User className="w-4 h-4 text-[var(--primary-foreground)]" />
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-black text-[var(--foreground)]">
                                {event._count.attendees} Attending
                              </p>
                              {event.maxCapacity && (
                                <p className="text-xs font-semibold text-theme-muted">
                                  {event.maxCapacity - event._count.attendees} spots left
                                </p>
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
