'use client'

import { useState } from 'react'
import { Edit3, Eye, MessageSquareDiff, ChevronDown, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export type EditorMode = 'edit' | 'suggest' | 'view'

interface ModeSelectorProps {
  mode: EditorMode
  onChange: (mode: EditorMode) => void
  canEdit?: boolean
  canSuggest?: boolean
  disabled?: boolean
}

const MODE_OPTIONS: {
  value: EditorMode
  label: string
  description: string
  icon: React.ReactNode
}[] = [
  {
    value: 'edit',
    label: 'Editing',
    description: 'Make direct changes to the document',
    icon: <Edit3 className="w-4 h-4" />,
  },
  {
    value: 'suggest',
    label: 'Suggesting',
    description: 'Propose changes for review',
    icon: <MessageSquareDiff className="w-4 h-4" />,
  },
  {
    value: 'view',
    label: 'Viewing',
    description: 'Read-only mode',
    icon: <Eye className="w-4 h-4" />,
  },
]

export function ModeSelector({
  mode,
  onChange,
  canEdit = true,
  canSuggest = true,
  disabled = false,
}: ModeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentMode = MODE_OPTIONS.find((opt) => opt.value === mode) || MODE_OPTIONS[2]

  const availableModes = MODE_OPTIONS.filter((opt) => {
    if (opt.value === 'edit') return canEdit
    if (opt.value === 'suggest') return canSuggest
    return true // View is always available
  })

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="h-8 px-3 gap-2 font-medium"
      >
        {currentMode.icon}
        <span className="hidden sm:inline">{currentMode.label}</span>
        <ChevronDown className="w-3 h-3 opacity-50" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl z-50 min-w-[220px] py-1">
            {availableModes.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full flex items-start gap-3 px-3 py-2 text-left hover:bg-[var(--secondary)]/10 transition-colors ${
                  mode === option.value ? 'bg-[var(--primary)]/5' : ''
                }`}
              >
                <div className={`mt-0.5 p-1 rounded ${
                  mode === option.value
                    ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                    : 'bg-[var(--secondary)]/20 text-[var(--muted)]'
                }`}>
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      mode === option.value ? 'text-[var(--primary)]' : ''
                    }`}>
                      {option.label}
                    </span>
                    {mode === option.value && (
                      <Check className="w-3 h-3 text-[var(--primary)]" />
                    )}
                  </div>
                  <span className="text-xs text-[var(--muted)]">
                    {option.description}
                  </span>
                </div>
              </button>
            ))}

            {/* Permission notice */}
            {(!canEdit || !canSuggest) && (
              <div className="px-3 py-2 mt-1 border-t border-[var(--border)]">
                <p className="text-[10px] text-[var(--muted)]">
                  {!canEdit && !canSuggest
                    ? 'You have view-only access to this document.'
                    : !canEdit
                    ? 'You can suggest changes but cannot edit directly.'
                    : 'Suggesting mode is not enabled for this document.'}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ModeSelector
