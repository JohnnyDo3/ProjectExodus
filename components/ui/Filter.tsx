'use client'

import { Button } from './Button'
import { X } from 'lucide-react'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterProps {
  title: string
  options: FilterOption[]
  selectedIds: string[]
  onToggle: (id: string) => void
  onClear: () => void
  className?: string
}

export function Filter({
  title,
  options,
  selectedIds,
  onToggle,
  onClear,
  className = ''
}: FilterProps) {
  const hasActiveFilters = selectedIds.length > 0

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black" style={{ color: '#000' }}>
          {title}
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-sm font-bold border-2"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id)

          return (
            <button
              key={option.id}
              onClick={() => onToggle(option.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-moss-500 to-ocean-500 text-white border-moss-600 shadow-lg'
                  : 'bg-white text-earth-700 border-moss-200 hover:border-moss-400'
              }`}
            >
              {option.label}
              {option.count !== undefined && (
                <span className={`ml-2 ${isSelected ? 'text-white/80' : 'text-earth-500'}`}>
                  ({option.count})
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
