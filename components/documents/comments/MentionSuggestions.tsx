'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AtSign, Loader2 } from 'lucide-react'

interface User {
  id: string
  name: string | null
  image: string | null
  headline?: string | null
}

interface MentionSuggestionsProps {
  isOpen: boolean
  position: { top: number; left: number }
  searchTerm: string
  users: User[]
  isLoading?: boolean
  onSelect: (user: User) => void
  onClose: () => void
}

export function MentionSuggestions({
  isOpen,
  position,
  searchTerm,
  users,
  isLoading = false,
  onSelect,
  onClose,
}: MentionSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchTerm])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < filteredUsers.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredUsers.length - 1
          )
          break
        case 'Enter':
        case 'Tab':
          e.preventDefault()
          if (filteredUsers[selectedIndex]) {
            onSelect(filteredUsers[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredUsers, onSelect, onClose])

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && filteredUsers.length > 0) {
      const selectedItem = listRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      selectedItem?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Suggestions popup */}
      <div
        ref={listRef}
        className="fixed z-50 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden"
        style={{
          top: position.top,
          left: position.left,
          width: '260px',
          maxHeight: '200px',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border)] bg-[var(--secondary)]/5">
          <AtSign className="w-3 h-3 text-[var(--muted)]" />
          <span className="text-xs text-[var(--muted)]">
            {searchTerm ? `Searching for "${searchTerm}"` : 'Mention someone'}
          </span>
        </div>

        {/* List */}
        <div className="overflow-y-auto max-h-[160px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-[var(--primary)]" />
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <button
                key={user.id}
                data-index={index}
                onClick={() => onSelect(user)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                  index === selectedIndex
                    ? 'bg-[var(--primary)]/10'
                    : 'hover:bg-[var(--secondary)]/10'
                }`}
              >
                {/* Avatar */}
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] text-sm font-bold">
                    {user.name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{user.name}</div>
                  {user.headline && (
                    <div className="text-xs text-[var(--muted)] truncate">
                      {user.headline}
                    </div>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="py-4 text-center text-sm text-[var(--muted)]">
              {searchTerm ? 'No users found' : 'Start typing to search'}
            </div>
          )}
        </div>

        {/* Footer hint */}
        {filteredUsers.length > 0 && (
          <div className="px-3 py-1.5 border-t border-[var(--border)] text-[10px] text-[var(--muted)] flex items-center justify-between bg-[var(--secondary)]/5">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
        )}
      </div>
    </>
  )
}

export default MentionSuggestions
