'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, Plus, Edit2, Trash2, Tag } from 'lucide-react'
import Link from 'next/link'

export default function TagsManagementPage() {
  const [tags, setTags] = useState([
    { id: '1', name: 'Renewable Energy', slug: 'renewable-energy', articleCount: 12 },
    { id: '2', name: 'Zero Waste', slug: 'zero-waste', articleCount: 8 },
    { id: '3', name: 'Sustainable Living', slug: 'sustainable-living', articleCount: 15 },
    { id: '4', name: 'Eco-Friendly', slug: 'eco-friendly', articleCount: 23 },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [newTag, setNewTag] = useState({ name: '', slug: '' })

  const handleCreateTag = () => {
    if (!newTag.name || !newTag.slug) return

    setTags([...tags, {
      id: Date.now().toString(),
      name: newTag.name,
      slug: newTag.slug,
      articleCount: 0
    }])

    setNewTag({ name: '', slug: '' })
    setIsCreating(false)
  }

  const handleDeleteTag = (id: string) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      setTags(tags.filter(tag => tag.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-white border-b border-sand-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold" style={{ color: '#000' }}>
                Manage Tags
              </h1>
              <p style={{ color: '#444' }} className="mt-1">
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
          {/* Create New Tag */}
          {isCreating && (
            <Card className="border-moss-300 bg-moss-50">
              <CardHeader>
                <CardTitle style={{ color: '#36763d' }}>Create New Tag</CardTitle>
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
                  <Button onClick={handleCreateTag}>
                    Create Tag
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
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
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Total Tags</p>
                    <p className="text-2xl font-bold" style={{ color: '#000' }}>{tags.length}</p>
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
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Most Used</p>
                    <p className="text-lg font-bold" style={{ color: '#000' }}>Eco-Friendly</p>
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
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Total Uses</p>
                    <p className="text-2xl font-bold" style={{ color: '#000' }}>58</p>
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
              <div className="space-y-3">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between p-4 rounded-lg border-2 border-sand-200 hover:border-moss-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-moss-100 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-moss-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: '#000' }}>{tag.name}</h3>
                        <p className="text-sm" style={{ color: '#666' }}>
                          /{tag.slug} • {tag.articleCount} articles
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <Trash2 className="w-4 h-4 text-terra-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Development Notice */}
          <Card className="bg-ocean-50 border-ocean-200">
            <CardContent className="p-6">
              <p className="text-sm" style={{ color: '#295050' }}>
                <strong>Note:</strong> This is a UI demonstration. Tag management will be fully functional
                once the database is connected. Changes made here are temporary and for preview purposes only.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
