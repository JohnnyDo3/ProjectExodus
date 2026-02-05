'use client'

import { useState } from 'react'
import { X, FileText, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface SaveAsTemplateProps {
  isOpen: boolean
  documentTitle: string
  documentContent: string
  onSave: (data: {
    name: string
    description: string
    category: string
    isPublic: boolean
  }) => Promise<void>
  onClose: () => void
}

const CATEGORIES = [
  'Planning',
  'Documentation',
  'Meetings',
  'Project Management',
  'Reports',
  'Research',
  'Design',
  'Custom',
]

export function SaveAsTemplate({
  isOpen,
  documentTitle,
  documentContent,
  onSave,
  onClose,
}: SaveAsTemplateProps) {
  const [name, setName] = useState(documentTitle + ' Template')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Custom')
  const [isPublic, setIsPublic] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Template name is required')
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
        category,
        isPublic,
      })
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to save template')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  // Calculate content preview
  const wordCount = documentContent.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
              <FileText className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="font-bold">Save as Template</h2>
              <p className="text-xs text-[var(--muted)]">
                Create a reusable template from this document
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Template Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter template name..."
              className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this template is for..."
              rows={3}
              className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Visibility */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <label htmlFor="isPublic" className="cursor-pointer">
              <span className="font-medium text-sm">Share with project</span>
              <p className="text-xs text-[var(--muted)]">
                Other project members can use this template
              </p>
            </label>
          </div>

          {/* Content preview */}
          <div className="p-3 bg-[var(--secondary)]/10 rounded-lg">
            <div className="text-xs text-[var(--muted)] mb-2">
              Content that will be saved:
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">{wordCount} words</span>
              <span className="text-[var(--muted)]">•</span>
              <span className="text-[var(--muted)]">
                Based on "{documentTitle}"
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-[var(--border)] bg-[var(--secondary)]/5">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="font-bold"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  )
}

export default SaveAsTemplate
