'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewProductPage() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    categoryId: '',
    vendorId: '',
    featured: false,
    status: 'DRAFT',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // TODO: Connect to API
      console.log('Submitting product:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      alert('Product created successfully!')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
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
            <div>
              <h1 className="text-3xl font-bold text-earth-900">Add New Product</h1>
              <p className="text-earth-600 mt-1">Create a new sustainable product listing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-earth-900 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                  placeholder="e.g., Solar Panel 300W Monocrystalline"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-earth-900 mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                  placeholder="e.g., solar-panel-300w"
                />
                <p className="text-sm text-earth-600 mt-1">
                  This will be the URL: /products/{formData.slug || 'your-slug'}
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-earth-900 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                  placeholder="Describe the product, its features, and benefits..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-earth-900 mb-2">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-earth-900 mb-2">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-moss-600 border-sand-300 rounded focus:ring-moss-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-earth-900">
                  Mark as featured product
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Category & Vendor */}
          <Card>
            <CardHeader>
              <CardTitle>Category & Vendor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-earth-900 mb-2">
                  Category *
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                >
                  <option value="">Select a category...</option>
                  <option value="cat-1">Energy & Power Generation</option>
                  <option value="cat-2">Water Systems & Purification</option>
                  <option value="cat-3">Sustainable Materials</option>
                </select>
              </div>

              <div>
                <label htmlFor="vendorId" className="block text-sm font-medium text-earth-900 mb-2">
                  Vendor
                </label>
                <select
                  id="vendorId"
                  name="vendorId"
                  value={formData.vendorId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-sand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss-500"
                >
                  <option value="">Select a vendor...</option>
                  <option value="vendor-1">Goal Zero</option>
                  <option value="vendor-2">Berkey Filters</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Link href="/admin">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Create Product'}
            </Button>
          </div>

          {/* Development Notice */}
          <Card className="bg-ocean-50 border-ocean-200">
            <CardContent className="p-6">
              <p className="text-sm text-ocean-800">
                <strong>Note:</strong> This form is not yet connected to the database.
                Authentication and API integration will be added in the next phase.
                For now, this demonstrates the admin UI structure.
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
