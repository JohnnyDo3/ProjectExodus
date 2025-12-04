'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Package, Image, DollarSign, Link as LinkIcon, ArrowLeft, Upload, X } from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    materials: '',
    externalUrl: '',
    imageUrls: [''],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Filter out empty image URLs
      const validImages = formData.imageUrls.filter(url => url.trim() !== '')

      const response = await fetch('/api/user-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          images: validImages,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit product')
      }

      // Success - redirect to products page
      router.push('/profile/products')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const addImageField = () => {
    setFormData({
      ...formData,
      imageUrls: [...formData.imageUrls, ''],
    })
  }

  const removeImageField = (index: number) => {
    const newUrls = formData.imageUrls.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      imageUrls: newUrls.length > 0 ? newUrls : [''],
    })
  }

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...formData.imageUrls]
    newUrls[index] = value
    setFormData({
      ...formData,
      imageUrls: newUrls,
    })
  }

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-[var(--accent)] via-[var(--primary)] to-[var(--secondary)] text-[var(--primary-foreground)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Products" fallbackUrl="/profile/products" />
          </div>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              SUBMIT A PRODUCT
            </h1>
            <p className="text-sm font-semibold opacity-90">
              Share your handmade sustainable creations with our community
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-black text-[var(--foreground)] mb-2">
                      PRODUCT NAME *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Handwoven Hemp Tote Bag"
                      required
                      className="font-medium"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-black text-[var(--foreground)] mb-2">
                      DESCRIPTION *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your product, its sustainability features, and why it's special..."
                      required
                      rows={6}
                      className="font-medium"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-1">
                      Include details about materials, size, and sustainability aspects
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-black text-[var(--foreground)] mb-2">
                      PRICE (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="29.99"
                        required
                        className="pl-10 font-medium"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-black text-[var(--foreground)] mb-2">
                      CATEGORY *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="">Select a category</option>
                      <option value="home-decor">Home Decor</option>
                      <option value="accessories">Accessories</option>
                      <option value="clothing">Clothing</option>
                      <option value="personal-care">Personal Care</option>
                      <option value="kitchen">Kitchen & Dining</option>
                      <option value="garden">Garden & Outdoor</option>
                      <option value="art">Art & Crafts</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Materials */}
                  <div>
                    <label className="block text-sm font-black text-[var(--foreground)] mb-2">
                      MATERIALS USED *
                    </label>
                    <Input
                      type="text"
                      value={formData.materials}
                      onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                      placeholder="e.g., Organic cotton, recycled plastic, bamboo..."
                      required
                      className="font-medium"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-1">
                      List the sustainable materials that make your product eco-friendly
                    </p>
                  </div>

                  {/* External Store URL */}
                  <div>
                    <label className="block text-sm font-black text-[var(--foreground)] mb-2">
                      YOUR STORE LINK *
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-muted" />
                      <Input
                        type="url"
                        value={formData.externalUrl}
                        onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                        placeholder="https://your-etsy-shop.com/product-link"
                        required
                        className="pl-10 font-medium"
                      />
                    </div>
                    <p className="text-xs font-medium text-theme-muted mt-1">
                      Link to where customers can purchase (Etsy, Shopify, your website, etc.)
                    </p>
                  </div>

                  {/* Image URLs */}
                  <div>
                    <label className="block text-sm font-black text-[var(--foreground)] mb-2">
                      PRODUCT IMAGES *
                    </label>
                    <div className="space-y-3">
                      {formData.imageUrls.map((url, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="relative flex-1">
                            <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-muted" />
                            <Input
                              type="url"
                              value={url}
                              onChange={(e) => updateImageUrl(index, e.target.value)}
                              placeholder="https://your-image-url.com/image.jpg"
                              required={index === 0}
                              className="pl-10 font-medium"
                            />
                          </div>
                          {formData.imageUrls.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeImageField(index)}
                              className="flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addImageField}
                        className="font-bold"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Add Another Image
                      </Button>
                    </div>
                    <p className="text-xs font-medium text-theme-muted mt-1">
                      Upload images to Imgur, Cloudinary, or your own hosting and paste URLs here
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-sm font-bold text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Link href="/profile/products" className="flex-1">
                      <Button type="button" variant="outline" size="lg" className="w-full font-black">
                        CANCEL
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="flex-1 font-black"
                    >
                      {loading ? (
                        'SUBMITTING...'
                      ) : (
                        <>
                          <Package className="w-4 h-4 mr-2" />
                          SUBMIT FOR REVIEW
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs font-medium text-center text-theme-muted">
                    By submitting, you agree to Project Exodus reviewing your product and creating an affiliate link if approved
                  </p>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  )
}
