'use client'

import { forwardRef, useEffect, useImperativeHandle, useState, useRef, useCallback } from 'react'
import { Editor } from '@tiptap/react'
import {
  SlashCommandItem,
  slashCommandItems,
  filterCommands,
  groupCommandsByCategory,
  categoryLabels,
} from './slashCommandItems'

export interface SlashCommandMenuRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

export interface SlashCommandMenuProps {
  editor: Editor
  items: SlashCommandItem[]
  command: (item: SlashCommandItem) => void
  clientRect: (() => DOMRect | null) | null
}

export const SlashCommandMenu = forwardRef<SlashCommandMenuRef, SlashCommandMenuProps>(
  ({ editor, items, command, clientRect }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const menuRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
    const [isVisible, setIsVisible] = useState(false)

    // Get flattened list of items for navigation
    const flatItems = items

    // Calculate position based on cursor
    useEffect(() => {
      if (clientRect) {
        const rect = clientRect()
        if (rect) {
          // Position below the cursor
          let top = rect.bottom + 8
          let left = rect.left

          // Check if menu would go off screen
          if (menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const viewportWidth = window.innerWidth

            // Flip above if not enough space below
            if (top + menuRect.height > viewportHeight - 20) {
              top = rect.top - menuRect.height - 8
            }

            // Ensure left doesn't go off screen
            if (left + menuRect.width > viewportWidth - 20) {
              left = viewportWidth - menuRect.width - 20
            }

            // Ensure left isn't negative
            if (left < 20) {
              left = 20
            }
          }

          setPosition({ top, left })
          setIsVisible(true)
        }
      }
    }, [clientRect])

    // Reset selection when items change
    useEffect(() => {
      setSelectedIndex(0)
    }, [items])

    // Scroll selected item into view
    useEffect(() => {
      if (menuRef.current && flatItems.length > 0) {
        const selectedElement = menuRef.current.querySelector(`[data-index="${selectedIndex}"]`)
        selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }, [selectedIndex, flatItems.length])

    const selectItem = useCallback(
      (index: number) => {
        const item = flatItems[index]
        if (item) {
          command(item)
        }
      },
      [flatItems, command]
    )

    // Keyboard navigation handler
    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length)
          return true
        }

        if (event.key === 'ArrowDown') {
          event.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % flatItems.length)
          return true
        }

        if (event.key === 'Enter') {
          event.preventDefault()
          selectItem(selectedIndex)
          return true
        }

        if (event.key === 'Escape') {
          event.preventDefault()
          return true
        }

        return false
      },
    }))

    // Group items by category
    const groupedItems = groupCommandsByCategory(flatItems)

    if (flatItems.length === 0) {
      return (
        <div
          ref={menuRef}
          className="fixed z-[9999] bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-xl p-4 text-center animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            top: position.top,
            left: position.left,
            width: '280px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 150ms ease-out, transform 150ms ease-out',
          }}
        >
          <p className="text-sm text-[var(--muted-foreground)]">No commands found</p>
        </div>
      )
    }

    let itemIndex = 0

    return (
      <div
        ref={menuRef}
        className="fixed z-[9999] bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden"
        style={{
          top: position.top,
          left: position.left,
          width: '300px',
          maxHeight: '360px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 150ms ease-out, transform 150ms ease-out',
        }}
      >
        {/* Command list with categories */}
        <div className="overflow-y-auto max-h-[300px] p-1">
          {Array.from(groupedItems.entries()).map(([category, categoryItems]) => (
            <div key={category} className="mb-1 last:mb-0">
              {/* Category header */}
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                {categoryLabels[category]}
              </div>

              {/* Category items */}
              {categoryItems.map((item) => {
                const currentIndex = itemIndex++
                const isSelected = currentIndex === selectedIndex

                return (
                  <button
                    key={item.id}
                    data-index={currentIndex}
                    onClick={() => selectItem(currentIndex)}
                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-150
                      ${isSelected
                        ? 'bg-[var(--primary)]/10 text-[var(--foreground)]'
                        : 'hover:bg-[var(--muted)]/50 text-[var(--foreground)]'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                        flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150
                        ${isSelected
                          ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                          : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{item.title}</div>
                      <div className="text-xs text-[var(--muted-foreground)] truncate">
                        {item.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer with keyboard hints */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-[var(--border)] bg-[var(--muted)]/30">
          <div className="flex items-center gap-3 text-[10px] text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[9px] font-mono">
                ↑
              </kbd>
              <kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[9px] font-mono">
                ↓
              </kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[9px] font-mono">
                ↵
              </kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[var(--muted)] rounded text-[9px] font-mono">
                Esc
              </kbd>
              <span>Close</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
)

SlashCommandMenu.displayName = 'SlashCommandMenu'

export default SlashCommandMenu
