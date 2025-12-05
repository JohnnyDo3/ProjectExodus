'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Save, Eye, Plus, Trash2, Link as LinkIcon } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Reference {
  id: string
  title: string
  url: string
  description: string
}

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
}

export default function NewArticlePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [references, setReferences] = useState<Reference[]>([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    readTime: '',
    featured: false,
    status: 'DRAFT',
  })
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/article-categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data)
        } else {
          toast.error('Failed to load categories')
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
        toast.error('Failed to load categories')
      })
  }, [])

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Auto-generate slug when title changes (unless manually edited)
  useEffect(() => {
    if (formData.title && !slugManuallyEdited) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }))
    }
  }, [formData.title, slugManuallyEdited])

  const addReference = () => {
    setReferences(prev => [
      ...prev,
      { id: crypto.randomUUID(), title: '', url: '', description: '' }
    ])
  }

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setReferences(prev =>
      prev.map(ref => (ref.id === id ? { ...ref, [field]: value } : ref))
    )
  }

  const removeReference = (id: string) => {
    setReferences(prev => prev.filter(ref => ref.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user?.id) {
      toast.error('You must be logged in to create an article')
      return
    }

    setSaving(true)

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          authorId: session.user.id,
          readTime: formData.readTime ? parseInt(formData.readTime) : estimatedReadTime,
          references: references.filter(r => r.title && r.url)
        })
      })

      const data = await res.json()

      if (data.success) {
        toast.success(formData.status === 'PUBLISHED' ? 'Article published successfully!' : 'Draft saved successfully!')
        // Redirect to the article page or admin dashboard
        router.push(`/articles/${data.data.slug}`)
      } else {
        toast.error(data.error || 'Failed to create article')
      }
    } catch (error) {
      console.error('Error creating article:', error)
      toast.error('Failed to create article')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    // Track if slug is manually edited
    if (name === 'slug') {
      setSlugManuallyEdited(true)
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  // Calculate read time based on content
  const estimatedReadTime = Math.max(1, Math.ceil(formData.content.split(/\s+/).length / 200))

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--card)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">Write New Article</h1>
                <p className="text-[var(--foreground)]/70 text-lg">Share knowledge about sustainable living</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Article Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Article Title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., The Complete Guide to Solar Power for Beginners"
                    className="text-2xl font-bold"
                  />

                  <Input
                    label="URL Slug"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="e.g., complete-guide-solar-power-beginners"
                    hint={`URL: /articles/${formData.slug || 'your-slug'}`}
                  />

                  <Textarea
                    label="Excerpt"
                    name="excerpt"
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="A brief summary that appears in article listings (1-2 sentences)"
                    hint="This shows up in search results and article cards"
                  />

                  <Textarea
                    label="Article Content"
                    name="content"
                    required
                    rows={20}
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your article content here... (Markdown supported)"
                    hint={`Estimated read time: ${estimatedReadTime} min (${formData.content.split(/\s+/).length} words)`}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="space-y-6">
              {/* Publishing Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    label="Status"
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                    options={[
                      { value: 'DRAFT', label: 'Draft' },
                      { value: 'PUBLISHED', label: 'Published' },
                      { value: 'ARCHIVED', label: 'Archived' },
                    ]}
                  />

                  <Input
                    label="Read Time (minutes)"
                    name="readTime"
                    type="number"
                    min="1"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder={estimatedReadTime.toString()}
                    hint="Leave empty for auto-calculation"
                  />

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-4 h-4 text-[var(--primary)] border-[var(--border)] rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-[var(--foreground)]">
                      Mark as featured article
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    label="Category"
                    name="categoryId"
                    required
                    value={formData.categoryId}
                    onChange={handleChange}
                    options={[
                      { value: '', label: 'Select a category...', disabled: true },
                      ...categories.map(cat => ({
                        value: cat.id,
                        label: cat.name
                      }))
                    ]}
                  />

                  <div className="p-3 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-lg">
                    <p className="text-sm text-[var(--foreground)]/70">
                      <strong className="text-[var(--foreground)]">Author:</strong> {session?.user?.name || 'You'} (Current User)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* References */}
              <Card className="border-2 border-[var(--primary)]/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-[var(--primary)]" />
                      References
                    </CardTitle>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addReference}
                      className="text-[var(--primary)] border-[var(--primary)]/30 hover:bg-[var(--primary)]/10"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {references.length === 0 ? (
                    <p className="text-sm text-[var(--foreground)]/60 text-center py-4">
                      No references added yet. Click "Add" to include source links.
                    </p>
                  ) : (
                    references.map((ref, index) => (
                      <div
                        key={ref.id}
                        className="p-4 bg-[var(--background)] rounded-lg space-y-3 relative border border-[var(--border)]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[var(--primary)] uppercase">
                            Reference #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeReference(ref.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <Input
                          label="Title"
                          value={ref.title}
                          onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                          placeholder="e.g., Solar Energy Statistics 2024"
                          className="text-sm"
                        />
                        <Input
                          label="URL"
                          value={ref.url}
                          onChange={(e) => updateReference(ref.id, 'url', e.target.value)}
                          placeholder="https://example.com/source"
                          className="text-sm"
                        />
                        <Input
                          label="Description (optional)"
                          value={ref.description}
                          onChange={(e) => updateReference(ref.id, 'description', e.target.value)}
                          placeholder="Brief description of the source"
                          className="text-sm"
                        />
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    label="Tags"
                    name="tags"
                    placeholder="solar, renewable, beginner"
                    hint="Comma-separated tags"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-[var(--background)] text-[var(--foreground)]/80 border border-[var(--border)] rounded text-xs">
                      Example tag
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="space-y-2">
                <Button type="submit" disabled={saving} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : formData.status === 'PUBLISHED' ? 'Publish Article' : 'Save Draft'}
                </Button>
                <Link href="/admin" className="block">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>

              {/* Development Notice */}
              <Card className="bg-[var(--primary)]/10 border-[var(--primary)]/30">
                <CardContent className="p-4">
                  <p className="text-xs text-[var(--primary)]">
                    <strong>Note:</strong> Rich text editor and image upload coming soon!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
