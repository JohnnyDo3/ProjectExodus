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
} from 'lucide-react'
import Link from 'next/link'

export default function CreateEventPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'VIRTUAL',
    location: '',
    meetingLink: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    maxCapacity: '',
  })

  if (!session?.user) {
    router.push('/auth/signin?callbackUrl=/events/create')
    return null
  }

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
        startDate: startDateTime.toISOString(),
        endDate: endDateTime ? endDateTime.toISOString() : null,
        maxCapacity: formData.maxCapacity ? parseInt(formData.maxCapacity) : null,
      }

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success) {
        router.push(`/events/${data.data.slug}`)
      } else {
        alert(data.error || 'Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event')
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

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Events" fallbackUrl="/events" />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-black text-sm uppercase mb-6">
                <Calendar className="w-5 h-5" />
                CREATE EVENT
              </div>
              <h1 className="text-5xl font-black mb-4 text-[var(--foreground)]">
                HOST A NEW EVENT
              </h1>
              <p className="text-xl font-semibold text-theme-muted">
                Bring the sustainability community together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-4 border-theme-primary">
              <CardHeader>
                <CardTitle className="text-2xl font-black">EVENT DETAILS</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-black uppercase text-[var(--foreground)] mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Zero Waste Workshop"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-black uppercase text-[var(--foreground)] mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell people what this event is about..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-black uppercase text-[var(--foreground)] mb-2">
                      Event Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    >
                      <option value="VIRTUAL">Virtual (Online Meeting)</option>
                      <option value="IN_PERSON">In-Person (Physical Location)</option>
                      <option value="HYBRID">Hybrid (Both Virtual & In-Person)</option>
                    </select>
                  </div>

                  {/* Location - Show for IN_PERSON and HYBRID */}
                  {(formData.type === 'IN_PERSON' || formData.type === 'HYBRID') && (
                    <div>
                      <label className="block text-sm font-black uppercase text-[var(--foreground)] mb-2">
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  {/* Meeting Link - Show for VIRTUAL and HYBRID */}
                  {(formData.type === 'VIRTUAL' || formData.type === 'HYBRID') && (
                    <div>
                      <label className="block text-sm font-black uppercase text-[var(--foreground)] mb-2">
                        <Video className="w-4 h-4 inline mr-1" />
                        Meeting Link *
                      </label>
                      <input
                        type="url"
                        name="meetingLink"
                        value={formData.meetingLink}
                        onChange={handleChange}
                        required={formData.type === 'VIRTUAL' || formData.type === 'HYBRID'}
                        placeholder="https://zoom.us/j/..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                      />
                    </div>
                  )}

                  {/* Start Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black uppercase text-[var(--foreground)] mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black uppercase text-[var(--foreground)] mb-2">
                        Start Time *
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* End Date & Time (Optional) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black uppercase text-theme-muted mb-2">
                        End Date (Optional)
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black uppercase text-theme-muted mb-2">
                        End Time (Optional)
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Max Capacity */}
                  <div>
                    <label className="block text-sm font-black uppercase text-theme-muted mb-2">
                      Max Capacity (Optional)
                    </label>
                    <input
                      type="number"
                      name="maxCapacity"
                      value={formData.maxCapacity}
                      onChange={handleChange}
                      min="1"
                      placeholder="Leave blank for unlimited"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={isSubmitting}
                      className="flex-1 font-bold"
                    >
                      CANCEL
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 font-bold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          CREATING...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5 mr-2" />
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
