'use client'

import { useState } from 'react'
import { BookmarkPlus, X, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CreateCheckpointModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (name: string, description: string, isMajorVersion: boolean) => Promise<void>
  currentVersion: number
}

export function CreateCheckpointModal({
  isOpen,
  onClose,
  onConfirm,
  currentVersion,
}: CreateCheckpointModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isMajorVersion, setIsMajorVersion] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    if (!name.trim()) {
      setError('Please enter a name for this checkpoint')
      return
    }

    setIsCreating(true)
    setError(null)

    try {
      await onConfirm(name.trim(), description.trim(), isMajorVersion)
      handleClose()
    } catch (err) {
      setError('Failed to create checkpoint. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleClose = () => {
    setName('')
    setDescription('')
    setIsMajorVersion(false)
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
              <BookmarkPlus className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Create Checkpoint</h2>
              <p className="text-xs text-[var(--muted)]">
                Save a named version of your document
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Version info */}
          <div className="p-3 bg-[var(--secondary)]/10 rounded-lg">
            <p className="text-sm text-[var(--muted)]">
              This will create <span className="font-bold text-[var(--foreground)]">version {currentVersion + 1}</span> of your document.
              The current content will be saved as a checkpoint you can restore later.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500 font-medium">{error}</p>
            </div>
          )}

          {/* Name input */}
          <div className="space-y-2">
            <label htmlFor="checkpoint-name" className="text-sm font-medium">
              Checkpoint Name <span className="text-red-500">*</span>
            </label>
            <input
              id="checkpoint-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Final Draft, Client Review, Pre-launch"
              disabled={isCreating}
              className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 disabled:opacity-50"
              autoFocus
            />
          </div>

          {/* Description input */}
          <div className="space-y-2">
            <label htmlFor="checkpoint-description" className="text-sm font-medium">
              Description <span className="text-[var(--muted)]">(optional)</span>
            </label>
            <textarea
              id="checkpoint-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what changed in this version..."
              disabled={isCreating}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none disabled:opacity-50"
            />
          </div>

          {/* Major version toggle */}
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-[var(--secondary)]/5 transition-colors">
            <input
              type="checkbox"
              checked={isMajorVersion}
              onChange={(e) => setIsMajorVersion(e.target.checked)}
              disabled={isCreating}
              className="mt-1 w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Mark as major version</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <p className="text-xs text-[var(--muted)]">
                Major versions are highlighted in version history and won't be auto-deleted.
              </p>
            </div>
          </label>

          {/* Suggested names */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--muted)] font-medium">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {['Draft', 'Review Ready', 'Final Version', 'Pre-edit Backup', 'Client Feedback'].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setName(suggestion)}
                  disabled={isCreating}
                  className="px-2 py-1 text-xs bg-[var(--secondary)]/20 hover:bg-[var(--secondary)]/40 rounded transition-colors disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-[var(--border)] bg-[var(--secondary)]/5">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isCreating || !name.trim()}
            className="font-bold"
          >
            {isCreating ? (
              <>
                <BookmarkPlus className="w-4 h-4 mr-2 animate-pulse" />
                Creating...
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Create Checkpoint
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  )
}

export default CreateCheckpointModal
