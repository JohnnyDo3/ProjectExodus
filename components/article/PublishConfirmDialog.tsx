'use client'

import { X, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PublishConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  isPublishing: boolean
}

export default function PublishConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  isPublishing,
}: PublishConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <Send className="w-8 h-8 text-[var(--primary)]" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-[var(--foreground)] mb-4">
          Ready to Publish?
        </h2>

        {/* Body */}
        <div className="text-center mb-6">
          <p className="font-semibold text-[var(--foreground)] mb-3 break-words">
            &ldquo;{title || 'Untitled Article'}&rdquo;
          </p>
          <p className="text-sm text-[var(--foreground)]/60 leading-relaxed">
            Once published, your article will be visible to all users. You can
            still edit it after publishing.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isPublishing}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1 gap-2"
            onClick={onConfirm}
            disabled={isPublishing}
          >
            {isPublishing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Publish Article
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
