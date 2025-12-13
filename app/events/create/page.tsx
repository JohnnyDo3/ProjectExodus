'use client'

import { BackButton } from '@/components/navigation/BackButton'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Calendar,
  ArrowLeft,
  MapPin,
  Video,
  Globe,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  Info,
  Link as LinkIcon,
  Users,
  Clock,
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Meeting platform options
const MEETING_PLATFORMS = [
  {
    id: 'zoom',
    name: 'Zoom',
    icon: '🎥',
    color: 'bg-blue-500',
    createUrl: 'https://zoom.us/meeting/schedule',
    placeholder: 'https://zoom.us/j/1234567890',
    description: 'Create a Zoom meeting and paste the link here',
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    icon: '📹',
    color: 'bg-green-500',
    createUrl: 'https://meet.google.com/new',
    placeholder: 'https://meet.google.com/abc-defg-hij',
    description: 'Create a Google Meet link and paste it here',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: '💬',
    color: 'bg-purple-500',
    createUrl: 'https://teams.microsoft.com/l/meetup-join',
    placeholder: 'https://teams.microsoft.com/l/meetup-join/...',
    description: 'Create a Teams meeting and paste the link here',
  },
  {
    id: 'webex',
    name: 'Webex',
    icon: '🌐',
    color: 'bg-orange-500',
    createUrl: 'https://www.webex.com/instant-meeting.html',
    placeholder: 'https://webex.com/meet/...',
    description: 'Create a Webex meeting and paste the link here',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '🎮',
    color: 'bg-indigo-500',
    createUrl: null,
    placeholder: 'https://discord.gg/...',
    description: 'Paste your Discord server/channel invite link',
  },
  {
    id: 'other',
    name: 'Other Platform',
    icon: '🔗',
    color: 'bg-gray-500',
    createUrl: null,
    placeholder: 'https://...',
    description: 'Paste any meeting or video call link',
  },
]

export default function CreateEventPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('zoom')
  const [copiedLink, setCopiedLink] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'VIRTUAL',
    location: '',
    meetingLink: '',
    meetingPlatform: 'zoom',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    maxCapacity: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })

  if (!session?.user) {
    router.push('/auth/signin?callbackUrl=/events/create')
    return null
  }

  const currentPlatform = MEETING_PLATFORMS.find(p => p.id === selectedPlatform) || MEETING_PLATFORMS[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Combine date and time
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
      const endDateTime =
        formData.endDate && formData.endTime
          ? new Date(`${formData.endDate}T${formData.endTime}`)
          : null

      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        location: formData.location || null,
        meetingLink: formData.meetingLink || null,
        meetingPlatform: formData.type !== 'IN_PERSON' ? selectedPlatform : null,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime ? endDateTime.toISOString() : null,
        maxCapacity: formData.maxCapacity ? parseInt(formData.maxCapacity) : null,
        timezone: formData.timezone,
      }

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Event created successfully!')
        router.push(`/events/${data.data.slug}`)
      } else {
        toast.error(data.error || 'Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error('Failed to create event')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const openPlatformCreate = () => {
    if (currentPlatform.createUrl) {
      window.open(currentPlatform.createUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <BackButton label="Back to Events" fallbackUrl="/events" />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-black text-xs sm:text-sm uppercase mb-4 sm:mb-6">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                CREATE EVENT
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-4 text-[var(--foreground)]">
                HOST A NEW EVENT
              </h1>
              <p className="text-base sm:text-xl font-semibold text-theme-muted px-4">
                Bring the sustainability community together - virtually or in person
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 sm:border-4 border-theme-primary">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl font-black">EVENT DETAILS</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-xs sm:text-sm font-black uppercase text-[var(--foreground)] mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Zero Waste Workshop"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm sm:text-base font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs sm:text-sm font-black uppercase text-[var(--foreground)] mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell people what this event is about..."
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm sm:text-base font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-xs sm:text-sm font-black uppercase text-[var(--foreground)] mb-2">
                      Event Type *
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { value: 'VIRTUAL', label: 'Virtual', icon: Video, desc: 'Online only' },
                        { value: 'IN_PERSON', label: 'In-Person', icon: MapPin, desc: 'Physical location' },
                        { value: 'HYBRID', label: 'Hybrid', icon: Globe, desc: 'Both options' },
                      ].map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.value })}
                          className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-center ${
                            formData.type === type.value
                              ? 'border-theme-primary bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]'
                              : 'border-[var(--border)] hover:border-theme-primary/50'
                          }`}
                        >
                          <type.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 ${formData.type === type.value ? 'text-theme-primary' : 'text-theme-muted'}`} />
                          <p className="text-xs sm:text-sm font-bold">{type.label}</p>
                          <p className="text-[10px] sm:text-xs text-theme-muted">{type.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meeting Platform Selection - Show for VIRTUAL and HYBRID */}
                  {(formData.type === 'VIRTUAL' || formData.type === 'HYBRID') && (
                    <div className="space-y-4 p-4 bg-[var(--muted)] rounded-xl">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 text-theme-primary" />
                        <span className="text-xs sm:text-sm font-black uppercase">Virtual Meeting Setup</span>
                      </div>

                      {/* Platform Selection */}
                      <div>
                        <label className="block text-xs font-bold text-theme-muted mb-2">
                          Select Platform
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {MEETING_PLATFORMS.map((platform) => (
                            <button
                              key={platform.id}
                              type="button"
                              onClick={() => setSelectedPlatform(platform.id)}
                              className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-center ${
                                selectedPlatform === platform.id
                                  ? 'border-theme-primary bg-white dark:bg-gray-800'
                                  : 'border-transparent bg-white/50 dark:bg-gray-800/50 hover:border-theme-primary/50'
                              }`}
                            >
                              <span className="text-lg sm:text-xl">{platform.icon}</span>
                              <p className="text-[10px] sm:text-xs font-bold mt-1 truncate">{platform.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Platform Instructions */}
                      <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                            {currentPlatform.description}
                          </p>
                          {currentPlatform.createUrl && (
                            <button
                              type="button"
                              onClick={openPlatformCreate}
                              className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-blue-600 hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Create {currentPlatform.name} Meeting
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Meeting Link Input */}
                      <div>
                        <label className="block text-xs font-bold text-theme-muted mb-2">
                          Meeting Link *
                        </label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
                          <input
                            type="url"
                            name="meetingLink"
                            value={formData.meetingLink}
                            onChange={handleChange}
                            required={formData.type === 'VIRTUAL' || formData.type === 'HYBRID'}
                            placeholder={currentPlatform.placeholder}
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location - Show for IN_PERSON and HYBRID */}
                  {(formData.type === 'IN_PERSON' || formData.type === 'HYBRID') && (
                    <div>
                      <label className="block text-xs sm:text-sm font-black uppercase text-[var(--foreground)] mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Physical Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required={formData.type === 'IN_PERSON' || formData.type === 'HYBRID'}
                        placeholder="e.g., Community Center, 123 Green St, Seattle"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm sm:text-base font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-theme-primary" />
                      <span className="text-xs sm:text-sm font-black uppercase">Date & Time</span>
                    </div>

                    {/* Start Date & Time */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-bold text-theme-muted mb-2">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-theme-muted mb-2">
                          Start Time *
                        </label>
                        <input
                          type="time"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* End Date & Time (Optional) */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-bold text-theme-muted mb-2">
                          End Date <span className="text-[10px]">(Optional)</span>
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-theme-muted mb-2">
                          End Time <span className="text-[10px]">(Optional)</span>
                        </label>
                        <input
                          type="time"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-xs font-bold text-theme-muted mb-2">
                        Timezone
                      </label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="America/Phoenix">Arizona (no DST)</option>
                        <option value="America/Anchorage">Alaska Time</option>
                        <option value="Pacific/Honolulu">Hawaii Time</option>
                        <option value="Europe/London">London (GMT/BST)</option>
                        <option value="Europe/Paris">Central European Time</option>
                        <option value="Asia/Tokyo">Japan Time</option>
                        <option value="Australia/Sydney">Sydney Time</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>

                  {/* Max Capacity */}
                  <div>
                    <label className="block text-xs sm:text-sm font-black uppercase text-theme-muted mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Max Capacity <span className="text-[10px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      name="maxCapacity"
                      value={formData.maxCapacity}
                      onChange={handleChange}
                      min="1"
                      placeholder="Leave blank for unlimited"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm sm:text-base font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Calendar Integration Info */}
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-green-700 dark:text-green-300">
                          Calendar Integration
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          After creating the event, attendees can add it to Google Calendar, Apple Calendar, or Outlook with one click.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 sm:gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={isSubmitting}
                      className="flex-1 font-bold text-sm sm:text-base"
                    >
                      CANCEL
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 font-bold text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                          CREATING...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          CREATE EVENT
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
