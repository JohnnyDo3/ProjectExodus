'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

export default function NewArticlePage() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    authorId: '',
    readTime: '',
    featured: false,
    status: 'DRAFT',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // TODO: Connect to API
      console.log('Submitting article:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Article created successfully!')
    } catch (error) {
      console.error('Error creating article:', error)
      alert('Failed to create article')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  // Calculate read time based on content
  const estimatedReadTime = Math.max(1, Math.ceil(formData.content.split(/\s+/).length / 200))

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-white border-b border-sand-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-earth-900">Write New Article</h1>
                <p className="text-earth-600 mt-1">Share knowledge about sustainable living</p>
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
                    className="text-lg font-semibold"
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
                      className="w-4 h-4 text-ocean-600 border-sand-300 rounded focus:ring-ocean-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-earth-900">
                      Mark as featured article
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Category & Author */}
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
                      { value: 'cat-1', label: 'Renewable Energy' },
                      { value: 'cat-2', label: 'Sustainable Fashion' },
                      { value: 'cat-3', label: 'Zero Waste Living' },
                      { value: 'cat-4', label: 'Regenerative Agriculture' },
                    ]}
                  />

                  <Select
                    label="Author"
                    name="authorId"
                    required
                    value={formData.authorId}
                    onChange={handleChange}
                    options={[
                      { value: '', label: 'Select author...', disabled: true },
                      { value: 'author-1', label: 'Sage (Current User)' },
                      { value: 'author-2', label: 'Guest Writer' },
                    ]}
                  />
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
                    <span className="px-2 py-1 bg-sand-100 text-earth-700 rounded text-xs">
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
              <Card className="bg-ocean-50 border-ocean-200">
                <CardContent className="p-4">
                  <p className="text-xs text-ocean-800">
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
