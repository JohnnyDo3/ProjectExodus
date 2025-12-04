'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Briefcase, Target, Users, FileText, ArrowLeft } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

export default function NewProjectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goal: '',
    status: 'PLANNING',
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Generate slug from project name
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim()
        + '-' + Date.now().toString(36) // Add timestamp for uniqueness

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitMessage('Project created successfully! Redirecting...')
        setTimeout(() => {
          router.push('/community/projects')
        }, 1500)
      } else {
        setSubmitMessage(data.error || 'Failed to create project. Please try again.')
        setIsSubmitting(false)
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            <BackButton label="Back to Projects" fallbackUrl="/community/projects" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-xl">
                <Briefcase className="w-8 h-8 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h1 className="text-5xl font-black text-[var(--foreground)]">
                  START A PROJECT
                </h1>
                <p className="text-lg font-semibold text-theme-muted mt-2">
                  Create a community sustainability initiative
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-4 border-theme-primary shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-black">PROJECT DETAILS</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Project Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <Briefcase className="w-4 h-4" />
                      Project Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      placeholder="e.g., Community Garden Initiative"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      Give your project a clear, descriptive name
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <FileText className="w-4 h-4" />
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={5}
                      placeholder="Describe what your project aims to accomplish and why it matters..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors resize-none"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      {formData.description.length}/500 characters
                    </p>
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <Target className="w-4 h-4" />
                      Goal
                    </label>
                    <input
                      type="text"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      maxLength={150}
                      placeholder="e.g., Plant 100 trees by end of year"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      Optional: Set a specific, measurable goal for your project
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <Users className="w-4 h-4" />
                      Project Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    >
                      <option value="PLANNING">Planning - Still organizing</option>
                      <option value="ACTIVE">Active - Currently running</option>
                      <option value="COMPLETED">Completed - Project finished</option>
                    </select>
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      Select the current status of your project
                    </p>
                  </div>

                  {/* Info Box */}
                  <Card className="bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] border-2 border-theme-accent">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">💡</div>
                        <div>
                          <h3 className="font-black text-[var(--foreground)] mb-2">
                            TIPS FOR SUCCESS
                          </h3>
                          <ul className="space-y-1 text-sm font-semibold text-theme-muted">
                            <li>• Be specific about what you want to achieve</li>
                            <li>• Include why this project matters to your community</li>
                            <li>• Set realistic goals and timelines</li>
                            <li>• Invite others to join and collaborate</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Message */}
                  {submitMessage && (
                    <div
                      className={`p-4 rounded-lg font-bold text-center ${
                        submitMessage.includes('success')
                          ? 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent'
                          : 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] text-theme-secondary'
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="flex-1 font-black text-lg py-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[var(--primary-foreground)] border-t-transparent rounded-full animate-spin mr-2" />
                          CREATING PROJECT...
                        </>
                      ) : (
                        'CREATE PROJECT'
                      )}
                    </Button>
                    <Link href="/community/projects" className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full font-black text-lg py-6"
                      >
                        CANCEL
                      </Button>
                    </Link>
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
