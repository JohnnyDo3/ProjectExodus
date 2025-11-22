'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Plus, Trash2, FolderTree } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  _count: {
    products: number
  }
}

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'folder-tree'
  })

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/categories')
      const data = await res.json()

      if (data.success) {
        setCategories(data.data)
      } else {
        setError('Failed to load categories')
      }
    } catch (err) {
      setError('An error occurred while loading categories')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategory.name || !newCategory.slug) {
      setError('Name and slug are required')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create category')
        setSaving(false)
        return
      }

      // Refresh categories list
      await fetchCategories()

      // Reset form
      setNewCategory({ name: '', slug: '', description: '', icon: 'folder-tree' })
      setIsCreating(false)
    } catch (err) {
      setError('An error occurred while creating category')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to delete category')
        return
      }

      // Refresh categories list
      await fetchCategories()
    } catch (err) {
      setError('An error occurred while deleting category')
    }
  }

  const totalProducts = categories.reduce((sum, cat) => sum + cat._count.products, 0)

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
                Manage Categories
              </h1>
              <p style={{ color: '#444' }} className="mt-1">
                Organize products into meaningful categories
              </p>
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Category
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

          {/* Create New Category */}
          {isCreating && (
            <Card className="border-moss-300 bg-moss-50">
              <CardHeader>
                <CardTitle style={{ color: '#36763d' }}>Create New Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Category Name"
                    placeholder="e.g., Energy & Power"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                  <Input
                    label="Slug"
                    placeholder="e.g., energy-power"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                    hint="URL-friendly identifier"
                  />
                </div>
                <Textarea
                  label="Description"
                  placeholder="Describe what products belong in this category..."
                  rows={3}
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
                <div className="flex gap-3">
                  <Button onClick={handleCreateCategory} disabled={saving}>
                    {saving ? 'Creating...' : 'Create Category'}
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
                    <FolderTree className="w-6 h-6 text-moss-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Total Categories</p>
                    <p className="text-2xl font-bold" style={{ color: '#000' }}>{categories.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center">
                    <FolderTree className="w-6 h-6 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Most Products</p>
                    <p className="text-lg font-bold" style={{ color: '#000' }}>
                      {categories.length > 0
                        ? categories.reduce((max, cat) => cat._count.products > max._count.products ? cat : max).name
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
                    <FolderTree className="w-6 h-6 text-terra-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Total Products</p>
                    <p className="text-2xl font-bold" style={{ color: '#000' }}>{totalProducts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories List */}
          <Card>
            <CardHeader>
              <CardTitle>All Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p style={{ color: '#666' }}>Loading categories...</p>
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-8">
                  <p style={{ color: '#666' }}>No categories yet. Create your first one!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="p-6 rounded-lg border-2 border-sand-200 hover:border-moss-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 flex-1">
                          <div className="w-14 h-14 rounded-xl bg-moss-100 flex items-center justify-center flex-shrink-0">
                            <FolderTree className="w-7 h-7 text-moss-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-1" style={{ color: '#000' }}>
                              {category.name}
                            </h3>
                            <p className="text-sm mb-2" style={{ color: '#666' }}>
                              /{category.slug}
                            </p>
                            {category.description && (
                              <p className="text-sm" style={{ color: '#444' }}>
                                {category.description}
                              </p>
                            )}
                            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-moss-100">
                              <span className="text-xs font-semibold text-moss-800">
                                {category._count.products} products
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id, category.name)}
                          >
                            <Trash2 className="w-4 h-4 text-terra-600" />
                          </Button>
                        </div>
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
