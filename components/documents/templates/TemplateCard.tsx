'use client'

import { ReactNode } from 'react'
import {
  FileText,
  Users,
  Lightbulb,
  RotateCcw,
  Code,
  Target,
  Bug,
  FlaskConical,
  Palette,
  FileEdit,
  Star,
  ChevronRight,
  LucideIcon,
} from 'lucide-react'

export interface TemplateCardProps {
  id: string
  name: string
  description: string
  icon: string
  category: string
  isBuiltIn?: boolean
  usageCount?: number
  isSelected?: boolean
  onClick?: () => void
  onPreview?: () => void
}

// Icon mapping from icon name string to component
const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Users,
  Lightbulb,
  RotateCcw,
  Code,
  Target,
  Bug,
  FlaskConical,
  Palette,
  FileEdit,
}

// Category color mapping
const CATEGORY_COLORS: Record<string, string> = {
  'General': 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  'Project Management': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Engineering': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'Content': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}

export function TemplateCard({
  id,
  name,
  description,
  icon,
  category,
  isBuiltIn = true,
  usageCount = 0,
  isSelected = false,
  onClick,
  onPreview,
}: TemplateCardProps) {
  const IconComponent = ICON_MAP[icon] || FileText
  const categoryColor = CATEGORY_COLORS[category] || CATEGORY_COLORS['General']

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      className={`
        group relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
        ${isSelected
          ? 'border-[var(--primary)] bg-[var(--primary)]/5 shadow-lg'
          : 'border-[var(--border)] hover:border-[var(--primary)]/50 hover:shadow-md bg-[var(--card)]'
        }
      `}
    >
      {/* Header with icon and built-in badge */}
      <div className="flex items-start justify-between mb-3">
        <div className={`
          p-2.5 rounded-lg transition-colors
          ${isSelected
            ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
            : 'bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)]/15'
          }
        `}>
          <IconComponent className="w-5 h-5" />
        </div>
        {isBuiltIn && (
          <div className="flex items-center gap-1 text-yellow-500" title="Built-in template">
            <Star className="w-3.5 h-3.5 fill-yellow-500" />
          </div>
        )}
      </div>

      {/* Template name */}
      <h4 className="font-bold text-sm mb-1.5 line-clamp-1 text-[var(--foreground)]">
        {name}
      </h4>

      {/* Category badge */}
      <div className="mb-2">
        <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColor}`}>
          {category}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--muted)] line-clamp-2 mb-3 min-h-[2rem]">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {usageCount > 0 && (
          <span className="text-[10px] text-[var(--muted)]">
            Used {usageCount} {usageCount === 1 ? 'time' : 'times'}
          </span>
        )}
        <div className="ml-auto flex items-center text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-medium mr-1">Select</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--primary)]" />
      )}
    </div>
  )
}

export default TemplateCard
