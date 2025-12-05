'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface WidgetProps {
  id: string
  title: string
  icon: LucideIcon
  children: ReactNode
  theme?: 'primary' | 'accent' | 'secondary'
  collapsed?: boolean
  onToggleCollapse?: () => void
  onClick?: () => void
  className?: string
}

export default function Widget({
  id,
  title,
  icon: Icon,
  children,
  theme = 'primary',
  collapsed = false,
  onToggleCollapse,
  onClick,
  className = '',
}: WidgetProps) {
  const themeClasses = {
    primary: 'border-theme-primary',
    accent: 'border-theme-accent',
    secondary: 'border-theme-secondary',
  }

  const iconGradients = {
    primary: 'from-[var(--primary)] to-[var(--accent)]',
    accent: 'from-[var(--accent)] to-[var(--secondary)]',
    secondary: 'from-[var(--secondary)] to-[var(--primary)]',
  }

  return (
    <div
      className={`bg-[var(--card)] border-2 ${themeClasses[theme]} rounded-xl shadow-xl overflow-hidden transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl' : ''} ${className}`}
      data-widget-id={id}
      onClick={onClick}
    >
      {/* Widget Header */}
      <div
        className={`flex items-center gap-2 p-3.5 ${onToggleCollapse ? 'cursor-pointer' : ''} bg-gradient-to-r from-transparent to-[var(--muted)]/30`}
        onClick={onToggleCollapse}
      >
        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${iconGradients[theme]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-[var(--foreground)] flex-1">{title}</h3>
        {onToggleCollapse && (
          <button className="text-theme-muted hover:text-[var(--foreground)] transition-colors">
            {collapsed ? '▼' : '▲'}
          </button>
        )}
      </div>

      {/* Widget Content */}
      {!collapsed && (
        <div className="p-3.5 pt-0">
          {children}
        </div>
      )}
    </div>
  )
}
