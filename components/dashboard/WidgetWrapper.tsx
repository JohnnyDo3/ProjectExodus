'use client'

import { ReactNode, useState } from 'react'
import { LucideIcon, X, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { WidgetTheme } from '@/types/dashboard'

interface WidgetWrapperProps {
  id: string
  title: string
  icon: LucideIcon
  children: ReactNode
  theme?: WidgetTheme
  collapsed?: boolean
  onToggleCollapse?: () => void
  onRemove?: () => void
  showRemove?: boolean
  className?: string
  headerActions?: ReactNode
  isDraggable?: boolean
}

export function WidgetWrapper({
  id,
  title,
  icon: Icon,
  children,
  theme = 'primary',
  collapsed = false,
  onToggleCollapse,
  onRemove,
  showRemove = true,
  className = '',
  headerActions,
  isDraggable = true,
}: WidgetWrapperProps) {
  const [isHovered, setIsHovered] = useState(false)

  const themeClasses = {
    primary: {
      border: 'border-[var(--primary)]/30',
      borderHover: 'hover:border-[var(--primary)]/60',
      icon: 'from-[var(--primary)] to-[var(--accent)]',
      accent: 'text-[var(--primary)]',
    },
    accent: {
      border: 'border-[var(--accent)]/30',
      borderHover: 'hover:border-[var(--accent)]/60',
      icon: 'from-[var(--accent)] to-[var(--secondary)]',
      accent: 'text-[var(--accent)]',
    },
    secondary: {
      border: 'border-[var(--secondary)]/30',
      borderHover: 'hover:border-[var(--secondary)]/60',
      icon: 'from-[var(--secondary)] to-[var(--primary)]',
      accent: 'text-[var(--secondary)]',
    },
  }

  const colors = themeClasses[theme]

  return (
    <div
      className={`
        h-full flex flex-col
        bg-[var(--card)]
        border-2 ${colors.border} ${colors.borderHover}
        rounded-xl shadow-lg
        overflow-hidden
        transition-all duration-200
        ${className}
      `}
      data-widget-id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[var(--border)] bg-[var(--muted)]/30">
        {/* Drag Handle - only visible when hovering */}
        {isDraggable && (
          <div
            className={`
              flex-shrink-0 cursor-grab active:cursor-grabbing
              p-1 -ml-1 rounded
              transition-opacity duration-200
              ${isHovered ? 'opacity-50 hover:opacity-100' : 'opacity-0'}
            `}
          >
            <GripVertical className="w-4 h-4 text-[var(--foreground)]" />
          </div>
        )}

        {/* Icon */}
        <div
          className={`
            w-7 h-7 rounded-lg
            bg-gradient-to-br ${colors.icon}
            flex items-center justify-center flex-shrink-0
            shadow-sm
          `}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>

        {/* Title */}
        <h3 className={`text-sm font-semibold ${colors.accent} flex-1 truncate`}>
          {title}
        </h3>

        {/* Header Actions */}
        {headerActions && (
          <div className="flex items-center gap-1">
            {headerActions}
          </div>
        )}

        {/* Collapse Toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Remove Button - always visible when onRemove is provided (edit mode) */}
        {showRemove && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onRemove()
            }}
            className="p-1.5 rounded-lg transition-all duration-200 opacity-100 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white"
            title="Remove widget"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Widget Content */}
      {!collapsed && (
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      )}

      {/* Collapsed State */}
      {collapsed && (
        <div className="p-4 text-center">
          <p className="text-xs text-[var(--foreground)]/50 font-medium">
            Click to expand
          </p>
        </div>
      )}
    </div>
  )
}
