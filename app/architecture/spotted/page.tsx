'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera, Upload, MapPin, X, Check, ArrowLeft, Plus,
  Image as ImageIcon, Search, Calendar, Award, Share2,
  Trash2, Edit3, Eye, Grid, Map as MapIcon
} from 'lucide-react'
import Link from 'next/link'
import { ALL_ELEMENTS, searchElements } from '@/data/architecture/elements'
import type { ArchitecturalElement } from '@/data/architecture/types'

interface SpottedPhoto {
  id: string
  elementId: string
  elementName: string
  imageUrl: string
  location?: string
  coordinates?: { lat: number; lng: number }
  notes?: string
  spottedAt: Date
  verified: boolean
}

export default function SpottedPage() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  const [showUploadModal, setShowUploadModal] = useState(false)
  const [spottedPhotos, setSpottedPhotos] = useState<SpottedPhoto[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')

  // Upload state
  const [uploadStep, setUploadStep] = useState<'photo' | 'element' | 'details' | 'confirm'>('photo')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedElement, setSelectedElement] = useState<ArchitecturalElement | null>(null)
  const [elementSearch, setElementSearch] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setUploadStep('element')
    }
  }

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        // In production, you'd reverse geocode this
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
        setIsGettingLocation(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsGettingLocation(false)
      }
    )
  }

  // Submit spotted photo
  const handleSubmit = () => {
    if (!selectedFile || !selectedElement) return

    const newPhoto: SpottedPhoto = {
      id: Date.now().toString(),
      elementId: selectedElement.id,
      elementName: selectedElement.name,
      imageUrl: previewUrl || '',
      location,
      notes,
      spottedAt: new Date(),
      verified: false,
    }

    setSpottedPhotos([newPhoto, ...spottedPhotos])
    resetUpload()
  }

  // Reset upload state
  const resetUpload = () => {
    setShowUploadModal(false)
    setUploadStep('photo')
    setSelectedFile(null)
    setPreviewUrl(null)
    setSelectedElement(null)
    setElementSearch('')
    setLocation('')
    setNotes('')
  }

  // Search elements
  const searchResults = elementSearch.trim()
    ? searchElements(elementSearch).slice(0, 6)
    : ALL_ELEMENTS.slice(0, 6)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/architecture">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl font-black text-[var(--foreground)]">Spotted in the Wild</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex gap-1 border border-[var(--border)] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[var(--muted)]' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded ${viewMode === 'map' ? 'bg-[var(--muted)]' : ''}`}
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold"
              >
                <Camera className="w-4 h-4 mr-2" />
                Spot Element
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Auth Check */}
        {!isAuthenticated ? (
          <Card className="max-w-md mx-auto border-2 border-[var(--border)]">
            <CardContent className="p-8 text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-rose-500" />
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                Sign In to Spot Elements
              </h2>
              <p className="text-[var(--muted-foreground)] mb-6">
                Create an account to upload photos of architectural elements you find in the real world!
              </p>
              <Link href="/auth/signin">
                <Button className="w-full">Sign In to Continue</Button>
              </Link>
            </CardContent>
          </Card>
        ) : spottedPhotos.length === 0 ? (
          /* Empty State */
          <div className="max-w-md mx-auto text-center py-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center"
            >
              <Camera className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
              No Spotted Elements Yet
            </h2>
            <p className="text-[var(--muted-foreground)] mb-6">
              Find architectural elements in real life and photograph them!
              Your photos become part of your personalized learning experience.
            </p>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold"
            >
              <Camera className="w-5 h-5 mr-2" />
              Spot Your First Element
            </Button>

            {/* Tips */}
            <div className="mt-8 text-left">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Tips for Great Spots:</h3>
              <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Clear, well-lit photos work best
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Get close to show detail of the element
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Add location info to build your architecture map
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Spotted photos appear in your flashcard games!
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* Photo Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {spottedPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border border-[var(--border)] hover:shadow-lg transition-all cursor-pointer group">
                  <div className="aspect-square bg-[var(--muted)] relative">
                    {photo.imageUrl && (
                      <img
                        src={photo.imageUrl}
                        alt={photo.elementName}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {photo.verified && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-bold text-sm text-[var(--foreground)] truncate">
                      {photo.elementName}
                    </h3>
                    {photo.location && (
                      <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3" />
                        {photo.location}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Add New Card */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="aspect-square rounded-xl border-2 border-dashed border-[var(--border)] hover:border-rose-500/50 transition-colors flex flex-col items-center justify-center gap-2 text-[var(--muted-foreground)] hover:text-rose-500"
            >
              <Plus className="w-8 h-8" />
              <span className="text-sm font-semibold">Spot New</span>
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4"
            onClick={resetUpload}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--card)] rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-[var(--border)] flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-[var(--foreground)]">
                  {uploadStep === 'photo' && 'Upload Photo'}
                  {uploadStep === 'element' && 'Identify Element'}
                  {uploadStep === 'details' && 'Add Details'}
                  {uploadStep === 'confirm' && 'Confirm Spot'}
                </h2>
                <button
                  onClick={resetUpload}
                  className="p-2 rounded-full hover:bg-[var(--muted)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <AnimatePresence mode="wait">
                  {/* Step 1: Photo Upload */}
                  {uploadStep === 'photo' && (
                    <motion.div
                      key="photo"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video rounded-xl border-2 border-dashed border-[var(--border)] hover:border-rose-500/50 transition-colors flex flex-col items-center justify-center gap-3 text-[var(--muted-foreground)] hover:text-rose-500"
                      >
                        <Upload className="w-12 h-12" />
                        <span className="font-semibold">Tap to upload photo</span>
                        <span className="text-sm">JPG, PNG up to 10MB</span>
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Element Selection */}
                  {uploadStep === 'element' && (
                    <motion.div
                      key="element"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Preview */}
                      {previewUrl && (
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--muted)]">
                          <Image src={previewUrl} alt="Preview" fill unoptimized sizes="100%" className="object-cover" />
                        </div>
                      )}

                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                        <input
                          type="text"
                          value={elementSearch}
                          onChange={(e) => setElementSearch(e.target.value)}
                          placeholder="Search for the element..."
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                        />
                      </div>

                      {/* Results */}
                      <div className="space-y-2">
                        {searchResults.map((element) => (
                          <button
                            key={element.id}
                            onClick={() => {
                              setSelectedElement(element)
                              setUploadStep('details')
                            }}
                            className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                              selectedElement?.id === element.id
                                ? 'border-rose-500 bg-rose-500/10'
                                : 'border-[var(--border)] hover:border-rose-500/50'
                            }`}
                          >
                            <h4 className="font-bold text-[var(--foreground)]">{element.name}</h4>
                            <p className="text-sm text-[var(--muted-foreground)] truncate">
                              {element.description.ELEMENTARY}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Details */}
                  {uploadStep === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* Selected Element */}
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <p className="text-sm text-rose-600 font-semibold">Identified as:</p>
                        <p className="text-lg font-bold text-[var(--foreground)]">{selectedElement?.name}</p>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="text-sm font-semibold text-[var(--foreground)] mb-2 block">
                          Location (optional)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Where did you spot this?"
                            className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                          />
                          <Button
                            variant="outline"
                            onClick={getCurrentLocation}
                            disabled={isGettingLocation}
                          >
                            <MapPin className={`w-4 h-4 ${isGettingLocation ? 'animate-pulse' : ''}`} />
                          </Button>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="text-sm font-semibold text-[var(--foreground)] mb-2 block">
                          Notes (optional)
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Any observations or context..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[var(--border)] flex gap-2 shrink-0">
                {uploadStep !== 'photo' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (uploadStep === 'element') setUploadStep('photo')
                      if (uploadStep === 'details') setUploadStep('element')
                    }}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                {uploadStep === 'details' && (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save Spot
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
