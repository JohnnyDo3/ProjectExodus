'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, Plus, Trash2, Tag } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

interface TagItem {
  id: string
  name: string
  slug: string
  _count: {
    products: number
    articles: number
  }
}

export default function TagsManagementPage() {
  const [tags, setTags] = useState<TagItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newTag, setNewTag] = useState({ name: '', slug: '' })

  // Fetch tags on mount
  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/tags')
      const data = await res.json()

      if (data.success) {
        setTags(data.data)
      } else {
        setError('Failed to load tags')
      }
    } catch (err) {
      setError('An error occurred while loading tags')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTag = async () => {
    if (!newTag.name || !newTag.slug) {
      setError('Name and slug are required')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTag),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create tag')
        setSaving(false)
        return
      }

      // Refresh tags list
      await fetchTags()

      // Reset form
      setNewTag({ name: '', slug: '' })
      setIsCreating(false)
    } catch (err) {
      setError('An error occurred while creating tag')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTag = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This will remove it from all products and articles.`)) return

    try {
      const res = await fetch(`/api/tags?id=${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to delete tag')
        return
      }

      // Refresh tags list
      await fetchTags()
    } catch (err) {
      setError('An error occurred while deleting tag')
    }
  }

  const totalUsage = tags.reduce((sum, tag) => sum + tag._count.products + tag._count.articles, 0)

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-[var(--card)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[var(--foreground)]">
                Manage Tags
              </h1>
              <p className="text-[var(--muted-foreground)] mt-1">
                Organize your content with tags
              </p>
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Tag
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Error Display */}
          {error && (
            <Card className="bg-terra-50 border-terra-300">
              <CardContent className="p-6">
                <p className="text-sm text-terra-800 font-semibold">
                  {error}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Create New Tag */}
          {isCreating && (
            <Card className="border-moss-300 bg-moss-50">
              <CardHeader>
                <CardTitle className="text-[var(--primary)]">Create New Tag</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Tag Name"
                    placeholder="e.g., Renewable Energy"
                    value={newTag.name}
                    onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  />
                  <Input
                    label="Slug"
                    placeholder="e.g., renewable-energy"
                    value={newTag.slug}
                    onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                    hint="URL-friendly identifier"
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleCreateTag} disabled={saving}>
                    {saving ? 'Creating...' : 'Create Tag'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)} disabled={saving}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-moss-100 flex items-center justify-center">
                    <Tag className="w-6 h-6 text-moss-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">Total Tags</p>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{tags.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center">
                    <Tag className="w-6 h-6 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">Most Used</p>
                    <p className="text-lg font-bold text-[var(--foreground)]">
                      {tags.length > 0
                        ? tags.reduce((max, tag) => (tag._count.products + tag._count.articles) > (max._count.products + max._count.articles) ? tag : max).name
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-terra-100 flex items-center justify-center">
                    <Tag className="w-6 h-6 text-terra-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--muted-foreground)]">Total Usage</p>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{totalUsage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tags List */}
          <Card>
            <CardHeader>
              <CardTitle>All Tags</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-[var(--muted-foreground)]">Loading tags...</p>
                </div>
              ) : tags.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[var(--muted-foreground)]">No tags yet. Create your first one!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="p-4 rounded-lg border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-moss-100 flex items-center justify-center flex-shrink-0">
                            <Tag className="w-5 h-5 text-moss-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold mb-1 text-[var(--foreground)]">
                              {tag.name}
                            </h3>
                            <p className="text-xs mb-2 text-[var(--muted-foreground)]">
                              /{tag.slug}
                            </p>
                            <div className="flex gap-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-ocean-100 text-ocean-800 font-semibold">
                                {tag._count.products} products
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-moss-100 text-moss-800 font-semibold">
                                {tag._count.articles} articles
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTag(tag.id, tag.name)}
                        >
                          <Trash2 className="w-4 h-4 text-terra-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
