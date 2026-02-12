'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { RotateCcw, AlertTriangle, X, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { sanitizeHtml } from '@/lib/utils/sanitize'

interface DocumentVersion {
  id: string
  versionNumber: number
  title: string
  content: string
  wordCount: number
  name?: string | null
  changeDescription?: string | null
  createdBy: {
    id: string
    name: string | null
    image: string | null
  }
  createdAt: Date | string
}

interface RestoreVersionModalProps {
  isOpen: boolean
  version: DocumentVersion
  currentVersion: number
  onClose: () => void
  onConfirm: (version: DocumentVersion, createCheckpoint: boolean) => Promise<void>
}

export function RestoreVersionModal({
  isOpen,
  version,
  currentVersion,
  onClose,
  onConfirm,
}: RestoreVersionModalProps) {
  const [createCheckpoint, setCreateCheckpoint] = useState(true)
  const [isRestoring, setIsRestoring] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleConfirm = async () => {
    setIsRestoring(true)
    try {
      await onConfirm(version, createCheckpoint)
      onClose()
    } finally {
      setIsRestoring(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <RotateCcw className="w-5 h-5 text-yellow-500" />
            </div>
            <h2 className="text-lg font-bold">Restore Version</h2>
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
          {/* Warning */}
          <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-600 dark:text-yellow-400">
                This will replace the current content
              </p>
              <p className="text-[var(--muted)] mt-1">
                The document will be restored to version {version.versionNumber}.
                {currentVersion > version.versionNumber && (
                  <> You will lose {currentVersion - version.versionNumber} version
                  {currentVersion - version.versionNumber > 1 ? 's' : ''} of changes.</>
                )}
              </p>
            </div>
          </div>

          {/* Version details */}
          <div className="p-4 bg-[var(--secondary)]/10 rounded-lg">
            <div className="flex items-start gap-3">
              {version.createdBy.image ? (
                <img
                  src={version.createdBy.image}
                  alt={version.createdBy.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold">
                  {version.createdBy.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {version.name || `Version ${version.versionNumber}`}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)]">
                  Created by {version.createdBy.name} on{' '}
                  {format(new Date(version.createdAt), 'MMM d, yyyy \'at\' h:mm a')}
                </p>
                {version.changeDescription && (
                  <p className="text-sm text-[var(--muted)] mt-1">
                    "{version.changeDescription}"
                  </p>
                )}
                <p className="text-sm text-[var(--muted)] mt-1">
                  {version.wordCount} words
                </p>
              </div>
            </div>

            {/* Preview toggle */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowPreview(!showPreview)}
              className="mt-3 text-xs w-full"
            >
              <Eye className="w-3 h-3 mr-1" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>

            {/* Content preview */}
            {showPreview && (
              <div className="mt-3 p-3 bg-[var(--background)] border border-[var(--border)] rounded-lg max-h-48 overflow-auto">
                <div
                  className="prose prose-sm max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(version.content) }}
                />
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={createCheckpoint}
                onChange={(e) => setCreateCheckpoint(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <div>
                <span className="font-medium text-sm">Save current as checkpoint</span>
                <p className="text-xs text-[var(--muted)]">
                  Create a checkpoint of the current version (v{currentVersion}) before restoring,
                  so you can return to it later if needed.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-[var(--border)] bg-[var(--secondary)]/5">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isRestoring}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isRestoring}
            className="font-bold"
          >
            {isRestoring ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                Restoring...
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Restore Version {version.versionNumber}
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  )
}

export default RestoreVersionModal
