'use client'

import { useState } from 'react'
import { ChevronDown, Eye, MessageSquare, MessageSquareDiff, Edit3, Shield, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export type Permission = 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN'
export type SharePermission = Exclude<Permission, 'ADMIN'>

interface PermissionOption {
  value: Permission
  label: string
  description: string
  icon: React.ReactNode
}

const PERMISSION_OPTIONS: PermissionOption[] = [
  {
    value: 'VIEW',
    label: 'Can view',
    description: 'Can only read the document',
    icon: <Eye className="w-4 h-4" />,
  },
  {
    value: 'COMMENT',
    label: 'Can comment',
    description: 'Can view and add comments',
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    value: 'SUGGEST',
    label: 'Can suggest',
    description: 'Can suggest edits for review',
    icon: <MessageSquareDiff className="w-4 h-4" />,
  },
  {
    value: 'EDIT',
    label: 'Can edit',
    description: 'Can make direct changes',
    icon: <Edit3 className="w-4 h-4" />,
  },
  {
    value: 'ADMIN',
    label: 'Admin',
    description: 'Full access including sharing',
    icon: <Shield className="w-4 h-4" />,
  },
]

interface PermissionSelectProps {
  value: Permission
  onChange: (value: Permission) => void
  disabled?: boolean
  size?: 'sm' | 'md'
  excludeAdmin?: boolean
}

export function PermissionSelect({
  value,
  onChange,
  disabled = false,
  size = 'md',
  excludeAdmin = false,
}: PermissionSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const options = excludeAdmin
    ? PERMISSION_OPTIONS.filter((opt) => opt.value !== 'ADMIN')
    : PERMISSION_OPTIONS

  const currentOption = options.find((opt) => opt.value === value) || options[0]

  const handleSelect = (permission: Permission) => {
    onChange(permission)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`gap-1 justify-between ${
          size === 'sm' ? 'h-7 px-2 text-xs min-w-[100px]' : 'h-8 px-3 text-sm min-w-[120px]'
        }`}
      >
        <span className="flex items-center gap-1.5">
          {currentOption.icon}
          <span className="hidden sm:inline">{currentOption.label}</span>
        </span>
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
          <div className="absolute top-full right-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl z-50 min-w-[200px] py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-start gap-3 px-3 py-2 text-left hover:bg-[var(--secondary)]/10 transition-colors ${
                  value === option.value ? 'bg-[var(--primary)]/5' : ''
                }`}
              >
                <div
                  className={`mt-0.5 p-1 rounded ${
                    value === option.value
                      ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                      : 'bg-[var(--secondary)]/20 text-[var(--muted)]'
                  }`}
                >
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        value === option.value ? 'text-[var(--primary)]' : ''
                      }`}
                    >
                      {option.label}
                    </span>
                    {value === option.value && (
                      <Check className="w-3 h-3 text-[var(--primary)]" />
                    )}
                  </div>
                  <span className="text-xs text-[var(--muted)]">
                    {option.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PermissionSelect
