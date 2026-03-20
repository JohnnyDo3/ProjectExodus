'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Link2,
  Tag,
  X,
  Save,
  Eye,
  Loader2,
  Plus,
  ExternalLink
} from 'lucide-react'

interface ResearchFormProps {
  projectId: string
  projectSlug: string
  initialData?: {
    id?: string
    heading?: string
    summary?: string
    fullContent?: string
    sourceUrl?: string
    sourceTitle?: string
    tags?: string[]
  }
  onSubmit?: (data: ResearchFormData) => Promise<void>
  className?: string
}

export interface ResearchFormData {
  heading: string
  summary: string
  fullContent?: string
  sourceUrl?: string
  sourceTitle?: string
  tags: string[]
}

export function ResearchForm({
  projectId,
  projectSlug,
  initialData,
  onSubmit,
  className = ''
}: ResearchFormProps) {
  const router = useRouter()
  const isEditing = !!initialData?.id

  const [heading, setHeading] = useState(initialData?.heading || '')
  const [summary, setSummary] = useState(initialData?.summary || '')
  const [fullContent, setFullContent] = useState(initialData?.fullContent || '')
  const [sourceUrl, setSourceUrl] = useState(initialData?.sourceUrl || '')
  const [sourceTitle, setSourceTitle] = useState(initialData?.sourceTitle || '')
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState('')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase()
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!heading.trim()) {
      setError('Heading is required')
      return
    }
    if (!summary.trim()) {
      setError('Summary is required')
      return
    }

    setSaving(true)

    try {
      const data: ResearchFormData = {
        heading: heading.trim(),
        summary: summary.trim(),
        fullContent: fullContent.trim() || undefined,
        sourceUrl: sourceUrl.trim() || undefined,
        sourceTitle: sourceTitle.trim() || undefined,
        tags
      }

      if (onSubmit) {
        await onSubmit(data)
      } else {
        const url = isEditing
          ? `/api/projects/${projectId}/research/${initialData.id}`
          : `/api/projects/${projectId}/research`

        const response = await fetch(url, {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })

        if (!response.ok) {
          throw new Error('Failed to save research post')
        }

        router.push(`/community/projects/${projectSlug}/research`)
        router.refresh()
      }
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {isEditing ? 'Edit Research Post' : 'Share Research'}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Share findings, resources, and insights with your project
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {showPreview ? (
          <PreviewPanel
            heading={heading}
            summary={summary}
            fullContent={fullContent}
            sourceUrl={sourceUrl}
            sourceTitle={sourceTitle}
            tags={tags}
          />
        ) : (
          <>
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Heading <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="e.g., New Study on Solar Panel Efficiency"
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                maxLength={200}
              />
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                {heading.length}/200 characters
              </p>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Summary / Your Analysis <span className="text-red-500">*</span>
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Briefly summarize the research and share your thoughts on its relevance to the project..."
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none"
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                {summary.length}/1000 characters
              </p>
            </div>

            {/* Full Content (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Content (Optional)
              </label>
              <textarea
                value={fullContent}
                onChange={(e) => setFullContent(e.target.value)}
                placeholder="Add detailed notes, analysis, or excerpts if needed..."
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none"
                rows={6}
              />
            </div>

            {/* Source Link */}
            <div className="p-4 bg-[var(--muted)]/50 border border-[var(--border)] rounded-lg space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Link2 className="w-4 h-4" />
                Source Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Source URL
                  </label>
                  <input
                    type="url"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Source Title
                  </label>
                  <input
                    type="text"
                    value={sourceTitle}
                    onChange={(e) => setSourceTitle(e.target.value)}
                    placeholder="e.g., Nature Energy Journal"
                    className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (up to 5)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              {tags.length < 5 && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]/80 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || !heading.trim() || !summary.trim()}
            className="px-6 py-2 text-sm bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Update' : 'Publish'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

function PreviewPanel({
  heading,
  summary,
  fullContent,
  sourceUrl,
  sourceTitle,
  tags
}: Partial<ResearchFormData>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6"
    >
      <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-4">
        <FileText className="w-4 h-4" />
        Preview
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {heading || 'Your heading will appear here'}
      </h2>

      <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
        <p className="whitespace-pre-wrap">
          {summary || 'Your summary will appear here...'}
        </p>
      </div>

      {fullContent && (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-4 pt-4 border-t border-[var(--border)]">
          <p className="whitespace-pre-wrap">{fullContent}</p>
        </div>
      )}

      {sourceUrl && (
        <div className="flex items-center gap-3 p-4 bg-[var(--muted)]/50 border border-[var(--border)] rounded-lg mb-4">
          <ExternalLink className="w-5 h-5 text-[var(--primary)]" />
          <div>
            <p className="text-sm font-medium">{sourceTitle || 'Source'}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{sourceUrl}</p>
          </div>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium rounded-full"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default ResearchForm
