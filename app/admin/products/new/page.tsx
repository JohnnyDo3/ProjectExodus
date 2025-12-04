'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Save } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [vendors, setVendors] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
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

  // Fetch categories and vendors on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, vendorsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/vendors')
        ])

        const categoriesData = await categoriesRes.json()
        const vendorsData = await vendorsRes.json()

        if (categoriesData.success) setCategories(categoriesData.data)
        if (vendorsData.success) setVendors(vendorsData.data)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create product')
        setSaving(false)
        return
      }

      // Success! Redirect to product or admin dashboard
      router.push(`/products/${data.data.slug}`)
      router.refresh()
    } catch (error) {
      console.error('Error creating product:', error)
      setError('An unexpected error occurred')
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
                  ...categories.map(cat => ({ value: cat.id, label: cat.name }))
                ]}
              />

              <Select
                label="Vendor"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Select a vendor...' },
                  ...vendors.map(vendor => ({ value: vendor.id, label: vendor.name }))
                ]}
              />
            </CardContent>
          </Card>

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
        </form>
      </div>
    </div>
  )
}
