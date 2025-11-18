'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ArrowLeft, Plus, Edit2, Trash2, Store, ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function VendorsManagementPage() {
  const [vendors, setVendors] = useState([
    {
      id: '1',
      name: 'Goal Zero',
      slug: 'goal-zero',
      description: 'Leading manufacturer of portable solar power solutions for outdoor adventures and emergency preparedness',
      website: 'https://goalzero.com',
      location: 'Utah, USA',
      productCount: 28,
      verified: true
    },
    {
      id: '2',
      name: 'Berkey Filters',
      slug: 'berkey-filters',
      description: 'Premium water filtration systems for home and travel',
      website: 'https://berkeyfilters.com',
      location: 'Texas, USA',
      productCount: 15,
      verified: true
    },
    {
      id: '3',
      name: 'Patagonia',
      slug: 'patagonia',
      description: 'Outdoor clothing and gear built to last, backed by environmental activism',
      website: 'https://patagonia.com',
      location: 'California, USA',
      productCount: 42,
      verified: true
    },
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [newVendor, setNewVendor] = useState({
    name: '',
    slug: '',
    description: '',
    website: '',
    location: ''
  })

  const handleCreateVendor = () => {
    if (!newVendor.name || !newVendor.slug) return

    setVendors([...vendors, {
      id: Date.now().toString(),
      ...newVendor,
      productCount: 0,
      verified: false
    }])

    setNewVendor({ name: '', slug: '', description: '', website: '', location: '' })
    setIsCreating(false)
  }

  const handleDeleteVendor = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== id))
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
                Manage Vendors
              </h1>
              <p style={{ color: '#444' }} className="mt-1">
                Partner companies and manufacturers
              </p>
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Vendor
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Create New Vendor */}
          {isCreating && (
            <Card className="border-moss-300 bg-moss-50">
              <CardHeader>
                <CardTitle style={{ color: '#36763d' }}>Add New Vendor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Vendor Name"
                    placeholder="e.g., Goal Zero"
                    value={newVendor.name}
                    onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                  />
                  <Input
                    label="Slug"
                    placeholder="e.g., goal-zero"
                    value={newVendor.slug}
                    onChange={(e) => setNewVendor({ ...newVendor, slug: e.target.value })}
                    hint="URL-friendly identifier"
                  />
                </div>
                <Textarea
                  label="Description"
                  placeholder="Describe what this vendor offers..."
                  rows={3}
                  value={newVendor.description}
                  onChange={(e) => setNewVendor({ ...newVendor, description: e.target.value })}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Website"
                    type="url"
                    placeholder="https://example.com"
                    value={newVendor.website}
                    onChange={(e) => setNewVendor({ ...newVendor, website: e.target.value })}
                  />
                  <Input
                    label="Location"
                    placeholder="e.g., California, USA"
                    value={newVendor.location}
                    onChange={(e) => setNewVendor({ ...newVendor, location: e.target.value })}
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleCreateVendor}>
                    Create Vendor
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-moss-100 flex items-center justify-center">
                    <Store className="w-6 h-6 text-moss-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Total Vendors</p>
                    <p className="text-2xl font-bold" style={{ color: '#000' }}>{vendors.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center">
                    <Store className="w-6 h-6 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Verified</p>
                    <p className="text-2xl font-bold" style={{ color: '#000' }}>
                      {vendors.filter(v => v.verified).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-terra-100 flex items-center justify-center">
                    <Store className="w-6 h-6 text-terra-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Most Products</p>
                    <p className="text-lg font-bold" style={{ color: '#000' }}>Patagonia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-moss-100 flex items-center justify-center">
                    <Store className="w-6 h-6 text-moss-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#666' }}>Total Products</p>
                    <p className="text-2xl font-bold" style={{ color: '#000' }}>85</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vendors List */}
          <Card>
            <CardHeader>
              <CardTitle>All Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="p-6 rounded-lg border-2 border-sand-200 hover:border-moss-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-moss-500 to-ocean-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Store className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-black" style={{ color: '#000' }}>
                              {vendor.name}
                            </h3>
                            {vendor.verified && (
                              <span className="px-2 py-0.5 rounded-full bg-moss-100 text-moss-800 text-xs font-bold">
                                VERIFIED
                              </span>
                            )}
                          </div>
                          <p className="text-sm mb-2" style={{ color: '#666' }}>
                            /{vendor.slug}
                          </p>
                          <p className="text-sm mb-3" style={{ color: '#444' }}>
                            {vendor.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            {vendor.website && (
                              <a
                                href={vendor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-moss-600 hover:text-moss-700 font-semibold"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Website
                              </a>
                            )}
                            {vendor.location && (
                              <div className="flex items-center gap-1" style={{ color: '#666' }}>
                                <MapPin className="w-4 h-4" />
                                {vendor.location}
                              </div>
                            )}
                            <div className="px-3 py-1 rounded-full bg-moss-100">
                              <span className="text-xs font-bold text-moss-800">
                                {vendor.productCount} products
                              </span>
                            </div>
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
                          onClick={() => handleDeleteVendor(vendor.id)}
                        >
                          <Trash2 className="w-4 h-4 text-terra-600" />
                        </Button>
                      </div>
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
                <strong>Note:</strong> This is a UI demonstration. Vendor management will be fully functional
                once the database is connected. Changes made here are temporary and for preview purposes only.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
