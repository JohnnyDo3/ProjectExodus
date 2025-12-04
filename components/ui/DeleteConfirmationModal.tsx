'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { AlertTriangle, X } from 'lucide-react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  isLoading?: boolean
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false
}: DeleteConfirmationModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const isConfirmEnabled = confirmText.toLowerCase() === 'delete'

  if (!isOpen) return null

  const handleConfirm = () => {
    if (isConfirmEnabled) {
      onConfirm()
    }
  }

  const handleClose = () => {
    setConfirmText('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <Card className="relative z-10 w-full max-w-md mx-4 border-4 border-[var(--secondary)] shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[var(--secondary)]" />
              </div>
              <CardTitle className="text-xl font-black text-[var(--secondary)]">
                {title}
              </CardTitle>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-theme-muted" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base font-medium text-theme-muted">
            {description}
          </p>

          <div className="p-4 bg-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] rounded-lg border-2 border-[var(--secondary)]/30">
            <p className="text-sm font-bold text-[var(--foreground)] mb-3">
              Type <span className="text-[var(--secondary)]">delete</span> to confirm:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type 'delete' here..."
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-[var(--secondary)] focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 font-bold"
            >
              CANCEL
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!isConfirmEnabled || isLoading}
              className="flex-1 font-bold bg-[var(--secondary)] hover:bg-[var(--secondary)]/90"
            >
              {isLoading ? 'DELETING...' : 'DELETE'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
