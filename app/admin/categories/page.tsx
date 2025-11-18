'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Plus, Edit2, Trash2, FolderTree, Zap, Droplet, Recycle } from 'lucide-react'
import Link from 'next/link'

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Energy & Power',
      slug: 'energy-power',
      description: 'Solar panels, wind turbines, and renewable energy solutions',
      productCount: 45,
      icon: 'Zap'
    },
    {
      id: '2',
      name: 'Water Systems',
      slug: 'water-systems',
      description: 'Purification, conservation, and sustainable water solutions',
      productCount: 32,
      icon: 'Droplet'
    },
    {
      id: '3',
      name: 'Sustainable Materials',
      slug: 'sustainable-materials',
      description: 'Eco-friendly building materials and recycled products',
      productCount: 28,
      icon: 'Recycle'
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: ''
  })

  const handleCreateCategory = () => {
    if (!newCategory.name || !newCategory.slug) return

    setCategories([...categories, {
      id: Date.now().toString(),
      name: newCategory.name,
      slug: newCategory.slug,
      description: newCategory.description,
      productCount: 0,
      icon: 'FolderTree'
    }])

    setNewCategory({ name: '', slug: '', description: '' })
    setIsCreating(false)
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id))
    }
  }

  const iconMap: Record<string, any> = {
    Zap,
    Droplet,
    Recycle,
    FolderTree
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
                  <Button onClick={handleCreateCategory}>
                    Create Category
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
                    <p className="text-lg font-bold" style={{ color: '#000' }}>Energy & Power</p>
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
                    <p className="text-2xl font-bold" style={{ color: '#000' }}>105</p>
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
              <div className="space-y-4">
                {categories.map((category) => {
                  const Icon = iconMap[category.icon] || FolderTree
                  return (
                    <div
                      key={category.id}
                      className="p-6 rounded-lg border-2 border-sand-200 hover:border-moss-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 flex-1">
                          <div className="w-14 h-14 rounded-xl bg-moss-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-7 h-7 text-moss-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-1" style={{ color: '#000' }}>
                              {category.name}
                            </h3>
                            <p className="text-sm mb-2" style={{ color: '#666' }}>
                              /{category.slug}
                            </p>
                            <p className="text-sm" style={{ color: '#444' }}>
                              {category.description}
                            </p>
                            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-moss-100">
                              <span className="text-xs font-semibold text-moss-800">
                                {category.productCount} products
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="w-4 h-4 text-terra-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Development Notice */}
          <Card className="bg-ocean-50 border-ocean-200">
            <CardContent className="p-6">
              <p className="text-sm" style={{ color: '#295050' }}>
                <strong>Note:</strong> This is a UI demonstration. Category management will be fully functional
                once the database is connected. Changes made here are temporary and for preview purposes only.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
