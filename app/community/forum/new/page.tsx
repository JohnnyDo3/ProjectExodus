'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageSquare, FileText, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewForumPostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: searchParams.get('category') || '',
  })

  useEffect(() => {
    // Fetch categories for the dropdown
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/forum')
        const data = await res.json()
        if (data.success) {
          setCategories(data.data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

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
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitMessage('Discussion created successfully! Redirecting...')
        setTimeout(() => {
          // Redirect to the category page or the new post
          const category = categories.find((c) => c.id === formData.categoryId)
          if (category) {
            router.push(`/community/forum/${category.slug}`)
          } else {
            router.push('/community/forum')
          }
        }, 1500)
      } else {
        setSubmitMessage(data.error || 'Failed to create discussion. Please try again.')
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
      <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/community/forum">
              <Button variant="ghost" className="mb-6 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO FORUM
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-xl">
                <MessageSquare className="w-8 h-8 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h1 className="text-5xl font-black text-[var(--foreground)]">
                  START A DISCUSSION
                </h1>
                <p className="text-lg font-semibold text-theme-muted mt-2">
                  Share your thoughts with the community
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
                <CardTitle className="text-3xl font-black">DISCUSSION DETAILS</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Category */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <Tag className="w-4 h-4" />
                      Category *
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      Choose the most appropriate category for your discussion
                    </p>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <MessageSquare className="w-4 h-4" />
                      Discussion Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      maxLength={150}
                      placeholder="e.g., Best solar panels for small homes?"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      Make it clear and descriptive so others can easily understand
                    </p>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <FileText className="w-4 h-4" />
                      Your Message *
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      required
                      minLength={20}
                      maxLength={5000}
                      rows={10}
                      placeholder="Share your thoughts, questions, or experiences..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors resize-none"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      {formData.content.length}/5000 characters • Minimum 20 characters
                    </p>
                  </div>

                  {/* Info Box */}
                  <Card className="bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] border-2 border-theme-accent">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">💬</div>
                        <div>
                          <h3 className="font-black text-[var(--foreground)] mb-2">
                            COMMUNITY GUIDELINES
                          </h3>
                          <ul className="space-y-1 text-sm font-semibold text-theme-muted">
                            <li>• Be respectful and constructive in your discussions</li>
                            <li>• Stay on topic and choose the right category</li>
                            <li>• Search for existing discussions before creating new ones</li>
                            <li>• Provide context and details to get better responses</li>
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
                          POSTING...
                        </>
                      ) : (
                        'POST DISCUSSION'
                      )}
                    </Button>
                    <Link href="/community/forum" className="flex-1">
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
