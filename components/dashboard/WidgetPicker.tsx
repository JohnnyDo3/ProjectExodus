'use client'

import { useState } from 'react'
import { X, Plus, RotateCcw, Check, LayoutGrid } from 'lucide-react'
import { WidgetId } from '@/types/dashboard'
import { WIDGET_REGISTRY, ALL_WIDGET_IDS } from './widgets'
import { Button } from '@/components/ui/Button'

interface WidgetPickerProps {
  activeWidgets: WidgetId[]
  onToggleWidget: (widgetId: WidgetId) => void
  onResetToDefaults: () => void
}

export function WidgetPicker({
  activeWidgets,
  onToggleWidget,
  onResetToDefaults,
}: WidgetPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const themeColors = {
    primary: 'from-[var(--primary)] to-[var(--accent)]',
    accent: 'from-[var(--accent)] to-[var(--secondary)]',
    secondary: 'from-[var(--secondary)] to-[var(--primary)]',
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center"
        title="Add Widget"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-[var(--card)] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                  <LayoutGrid className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">
                    Widget Library
                  </h2>
                  <p className="text-xs text-[var(--foreground)]/60">
                    Customize your dashboard
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Widget Grid */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {ALL_WIDGET_IDS.map((widgetId) => {
                  const widget = WIDGET_REGISTRY[widgetId]
                  const isActive = activeWidgets.includes(widgetId)
                  const Icon = widget.icon

                  return (
                    <button
                      key={widgetId}
                      onClick={() => onToggleWidget(widgetId)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all text-left
                        ${
                          isActive
                            ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                            : 'border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]/50'
                        }
                      `}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}

                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${themeColors[widget.theme]} flex items-center justify-center mb-3`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Info */}
                      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                        {widget.name}
                      </h3>
                      <p className="text-xs text-[var(--foreground)]/60 line-clamp-2">
                        {widget.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[var(--border)] bg-[var(--muted)]/30">
              <p className="text-xs text-[var(--foreground)]/60">
                {activeWidgets.length} of {ALL_WIDGET_IDS.length} widgets active
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onResetToDefaults}
                  className="text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-xs"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
