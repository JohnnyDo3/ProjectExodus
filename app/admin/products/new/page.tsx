'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
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
              <Input
                label="Product Name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Solar Panel 300W Monocrystalline"
              />

              <Input
                label="URL Slug"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g., solar-panel-300w"
                hint={`This will be the URL: /products/${formData.slug || 'your-slug'}`}
              />

              <Textarea
                label="Description"
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product, its features, and benefits..."
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Price (USD)"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />

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
              <Select
                label="Category"
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Select a category...', disabled: true },
                  { value: 'cat-1', label: 'Energy & Power Generation' },
                  { value: 'cat-2', label: 'Water Systems & Purification' },
                  { value: 'cat-3', label: 'Sustainable Materials' },
                ]}
              />

              <Select
                label="Vendor"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Select a vendor...' },
                  { value: 'vendor-1', label: 'Goal Zero' },
                  { value: 'vendor-2', label: 'Berkey Filters' },
                ]}
              />
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
                For now, this demonstrates the admin UI structure and our new reusable form components!
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
