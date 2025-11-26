'use client'

import { BackButton } from '@/components/navigation/BackButton'
import { useState, useEffect, use } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Video,
  Globe,
  Users,
  Clock,
  User,
  Check,
  HelpCircle,
  X,
  ExternalLink,
  Crown,
  Loader2,
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
  creatorId: string
  creator: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
  attendees: Array<{
    id: string
    status: 'GOING' | 'MAYBE' | 'NOT_GOING'
    user: {
      id: string
      name: string | null
      image: string | null
    }
  }>
  _count: {
    attendees: number
  }
  createdAt: string
}

export default function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { data: session } = useSession()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRSVPing, setIsRSVPing] = useState(false)

  useEffect(() => {
    fetchEvent()
  }, [slug])

  const fetchEvent = async () => {
    try {
      // First get all events to find the one with this slug
      const res = await fetch('/api/events')
      const data = await res.json()

      if (data.success) {
        const foundEvent = data.data.find((e: Event) => e.slug === slug)
        if (foundEvent) {
          // Then fetch full details for this specific event
          const detailRes = await fetch(`/api/events/${foundEvent.id}`)
          const detailData = await detailRes.json()
          if (detailData.success) {
            setEvent(detailData.data)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching event:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRSVP = async (status: 'GOING' | 'MAYBE' | 'NOT_GOING') => {
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/events/' + slug)
      return
    }

    setIsRSVPing(true)

    try {
      const res = await fetch(`/api/events/${event?.id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      const data = await res.json()

      if (data.success) {
        // Refresh event data
        fetchEvent()
      } else {
        alert(data.error || 'Failed to RSVP')
      }
    } catch (error) {
      console.error('Error RSVPing:', error)
      alert('Failed to RSVP')
    } finally {
      setIsRSVPing(false)
    }
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
        return 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary'
      case 'IN_PERSON':
        return 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent'
      case 'HYBRID':
        return 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] text-theme-secondary'
      default:
        return 'bg-[var(--muted)] text-theme-muted'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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
          <p className="text-lg font-bold text-theme-muted">Loading event...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="border-4 border-theme-secondary">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-black mb-4 text-theme-muted">EVENT NOT FOUND</h2>
            <p className="text-lg font-semibold mb-8 text-theme-muted">
              This event doesn't exist or has been removed.
            </p>
            <Link href="/events">
              <Button className="font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO EVENTS
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userRSVP = event.attendees.find((a) => a.user.id === session?.user?.id)
  const isCreator = event.creatorId === session?.user?.id
  const isPast = new Date(event.startDate) < new Date()
  const isFull = !!(event.maxCapacity && event._count.attendees >= event.maxCapacity)
  const goingCount = event.attendees.filter((a) => a.status === 'GOING').length

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Events" fallbackUrl="/events" />
          </div>
          <div className="max-w-6xl mx-auto">
            <Link href="/events">
              <Button variant="ghost" className="mb-6 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO EVENTS
              </Button>
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Event Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start gap-4 mb-4">
                  <div className={`px-4 py-2 rounded-full ${getEventTypeColor(event.type)} font-black text-sm uppercase flex items-center gap-2`}>
                    {getEventTypeIcon(event.type)}
                    {event.type.replace('_', '-')}
                  </div>
                  {isCreator && (
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-[var(--primary-foreground)] font-black text-sm uppercase flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      YOUR EVENT
                    </div>
                  )}
                  {isPast && (
                    <div className="px-4 py-2 rounded-full bg-[var(--muted)] text-theme-muted font-black text-sm uppercase">
                      PAST EVENT
                    </div>
                  )}
                  {isFull && !isPast && (
                    <div className="px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--secondary)_30%,var(--background))] text-theme-secondary font-black text-sm uppercase">
                      AT CAPACITY
                    </div>
                  )}
                </div>

                <h1 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                  {event.title}
                </h1>
                <p className="text-xl font-semibold text-theme-muted mb-6">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] rounded-lg border-2 border-theme-primary">
                    <Calendar className="w-6 h-6 text-theme-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-black text-sm uppercase text-theme-primary mb-1">DATE & TIME</p>
                      <p className="font-semibold text-[var(--foreground)]">
                        {formatDate(event.startDate)}
                      </p>
                      <p className="font-semibold text-theme-muted">
                        {formatTime(event.startDate)}
                        {event.endDate && ` - ${formatTime(event.endDate)}`}
                      </p>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-start gap-3 p-4 bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] rounded-lg border-2 border-theme-accent">
                      <MapPin className="w-6 h-6 text-theme-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-black text-sm uppercase text-theme-accent mb-1">LOCATION</p>
                        <p className="font-semibold text-[var(--foreground)]">{event.location}</p>
                      </div>
                    </div>
                  )}

                  {event.meetingLink && userRSVP?.status === 'GOING' && (
                    <div className="flex items-start gap-3 p-4 bg-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] rounded-lg border-2 border-theme-secondary">
                      <Video className="w-6 h-6 text-theme-secondary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-black text-sm uppercase text-theme-secondary mb-1">VIRTUAL MEETING</p>
                        <a
                          href={event.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-theme-secondary hover:underline inline-flex items-center gap-1"
                        >
                          Join Meeting
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* RSVP Buttons */}
                {!isPast && session?.user && (
                  <div className="mt-6">
                    <p className="text-sm font-black uppercase text-theme-muted mb-3">YOUR RSVP</p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleRSVP('GOING')}
                        disabled={isRSVPing || (isFull && userRSVP?.status !== 'GOING')}
                        variant={userRSVP?.status === 'GOING' ? 'primary' : 'outline'}
                        className="flex-1 font-bold"
                      >
                        {isRSVPing ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4 mr-2" />
                        )}
                        GOING
                      </Button>
                      <Button
                        onClick={() => handleRSVP('MAYBE')}
                        disabled={isRSVPing}
                        variant={userRSVP?.status === 'MAYBE' ? 'primary' : 'outline'}
                        className="flex-1 font-bold"
                      >
                        {isRSVPing ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <HelpCircle className="w-4 h-4 mr-2" />
                        )}
                        MAYBE
                      </Button>
                      <Button
                        onClick={() => handleRSVP('NOT_GOING')}
                        disabled={isRSVPing}
                        variant={userRSVP?.status === 'NOT_GOING' ? 'primary' : 'outline'}
                        className="flex-1 font-bold"
                      >
                        {isRSVPing ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <X className="w-4 h-4 mr-2" />
                        )}
                        NOT GOING
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Attendees Card */}
              <Card className="lg:w-80 border-4 border-theme-primary">
                <CardHeader>
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    ATTENDEES ({goingCount})
                  </CardTitle>
                  {event.maxCapacity && (
                    <p className="text-sm font-semibold text-theme-muted">
                      {event.maxCapacity - goingCount} spots remaining
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {event.attendees
                      .filter((a) => a.status === 'GOING')
                      .map((attendee) => (
                        <div key={attendee.id} className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                            {attendee.user.image ? (
                              <img
                                src={attendee.user.image}
                                alt={attendee.user.name || 'User'}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-sm truncate text-[var(--foreground)]">
                              {attendee.user.name || 'Anonymous'}
                            </p>
                            {attendee.user.id === event.creatorId && (
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-[var(--primary-foreground)] text-xs font-black">
                                <Crown className="w-3 h-3" />
                                HOST
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                    {goingCount === 0 && (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-theme-muted mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-semibold text-theme-muted">
                          No attendees yet
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Maybe Count */}
                  {event.attendees.filter((a) => a.status === 'MAYBE').length > 0 && (
                    <div className="mt-4 pt-4 border-t-2 border-[var(--border)]">
                      <p className="text-sm font-semibold text-theme-muted">
                        {event.attendees.filter((a) => a.status === 'MAYBE').length} people marked as "Maybe"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
