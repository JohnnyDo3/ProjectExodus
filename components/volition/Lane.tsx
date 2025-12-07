'use client'

import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronUp, Plus, MoreHorizontal, X } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

interface LaneProps {
  id: string
  title: string
  icon: LucideIcon
  children: ReactNode
  count?: number
  gradient?: string
  onAdd?: () => void
  addLabel?: string
  isCompact?: boolean
  isCustomizing?: boolean
  onRemove?: () => void
  emptyState?: ReactNode
  className?: string
}

export function Lane({
  id,
  title,
  icon: Icon,
  children,
  count = 0,
  gradient = 'from-[var(--primary)] to-[var(--accent)]',
  onAdd,
  addLabel = 'Add New',
  isCompact = false,
  isCustomizing = false,
  onRemove,
  emptyState,
  className = '',
}: LaneProps) {
  const isMobile = useIsMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const laneWidth = isMobile ? 'w-full min-w-full' : 'w-[300px] min-w-[300px]'

  return (
    <div
      className={`
        ${laneWidth} flex-shrink-0
        ${isMobile ? 'snap-center' : ''}
        ${className}
      `}
    >
      <div
        className={`
          h-full flex flex-col bg-[var(--card)] rounded-2xl border-2
          ${isCustomizing ? 'border-dashed border-[var(--primary)]' : 'border-[var(--border)]'}
          overflow-hidden transition-all
        `}
      >
        {/* Lane Header */}
        <div className={`flex items-center justify-between p-4 bg-gradient-to-r ${gradient} bg-opacity-10`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide">
                {title}
              </h3>
              {count > 0 && (
                <span className="text-xs font-medium text-[var(--foreground)]/50">
                  {count} item{count !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Add button */}
            {onAdd && !isCustomizing && (
              <button
                onClick={onAdd}
                className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                title={addLabel}
              >
                <Plus className="w-4 h-4 text-[var(--foreground)]/60" />
              </button>
            )}

            {/* Collapse toggle (desktop) */}
            {!isMobile && !isCustomizing && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
              >
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-[var(--foreground)]/60" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-[var(--foreground)]/60" />
                )}
              </button>
            )}

            {/* Remove button (customize mode) */}
            {isCustomizing && onRemove && (
              <button
                onClick={onRemove}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                title="Remove lane"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            )}
          </div>
        </div>

        {/* Lane Content */}
        {!isCollapsed && (
          <div
            className={`
              flex-1 overflow-y-auto overflow-x-hidden
              ${isCompact ? 'p-2 space-y-2' : 'p-3 space-y-3'}
              scrollbar-thin
            `}
            style={{
              maxHeight: isMobile ? 'calc(100vh - 280px)' : 'calc(100vh - 320px)',
            }}
          >
            {count === 0 && emptyState ? (
              emptyState
            ) : (
              children
            )}
          </div>
        )}

        {/* Add button at bottom */}
        {onAdd && !isCollapsed && !isCustomizing && (
          <div className="p-3 border-t border-[var(--border)]">
            <button
              onClick={onAdd}
              className={`
                w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                border-2 border-dashed border-[var(--border)]
                hover:border-[var(--primary)] hover:bg-[var(--primary)]/5
                text-sm font-medium text-[var(--foreground)]/50 hover:text-[var(--primary)]
                transition-all
              `}
            >
              <Plus className="w-4 h-4" />
              {addLabel}
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: var(--foreground);
          opacity: 0.3;
        }
      `}</style>
    </div>
  )
}
