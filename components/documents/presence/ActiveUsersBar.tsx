'use client'

import { useState } from 'react'
import { Users, Eye, Edit3, ChevronDown } from 'lucide-react'

interface ActiveUser {
  id: string
  name: string | null
  image: string | null
  color: string
  isEditing: boolean
  isTyping?: boolean
  lastActivity?: Date
}

interface ActiveUsersBarProps {
  users: ActiveUser[]
  maxVisible?: number
}

export function ActiveUsersBar({ users, maxVisible = 5 }: ActiveUsersBarProps) {
  const [showAll, setShowAll] = useState(false)

  const editingUsers = users.filter((u) => u.isEditing)
  const viewingUsers = users.filter((u) => !u.isEditing)
  const visibleUsers = users.slice(0, maxVisible)
  const hiddenCount = Math.max(0, users.length - maxVisible)

  if (users.length === 0) return null

  return (
    <div className="flex items-center gap-2">
      {/* User avatars */}
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {visibleUsers.map((user) => (
            <div
              key={user.id}
              className="relative group"
              title={`${user.name || 'Anonymous'} ${user.isEditing ? '(editing)' : '(viewing)'}`}
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-7 h-7 rounded-full object-cover border-2 border-[var(--background)]"
                  style={{ borderColor: user.color }}
                />
              ) : (
                <div
                  className="w-7 h-7 rounded-full border-2 border-[var(--background)] flex items-center justify-center font-bold text-xs text-white"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}

              {/* Status indicator */}
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[var(--background)] ${
                  user.isTyping
                    ? 'bg-green-500 animate-pulse'
                    : user.isEditing
                    ? 'bg-blue-500'
                    : 'bg-gray-400'
                }`}
              />

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--foreground)] text-[var(--background)] text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {user.name || 'Anonymous'}
                {user.isTyping && ' (typing...)'}
              </div>
            </div>
          ))}

          {hiddenCount > 0 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-7 h-7 rounded-full bg-[var(--secondary)]/30 border-2 border-[var(--background)] flex items-center justify-center text-xs font-bold hover:bg-[var(--secondary)]/50 transition-colors"
            >
              +{hiddenCount}
            </button>
          )}
        </div>
      </div>

      {/* Count summary */}
      <div className="text-xs text-[var(--muted)] hidden sm:block">
        {users.length} {users.length === 1 ? 'viewer' : 'viewers'}
      </div>

      {/* Expanded dropdown */}
      {showAll && hiddenCount > 0 && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowAll(false)}
          />
          <div className="absolute top-full right-0 mt-2 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl z-50 min-w-[200px] py-1">
            <div className="px-3 py-2 border-b border-[var(--border)]">
              <div className="text-xs font-medium text-[var(--muted)]">
                {users.length} people viewing
              </div>
            </div>

            {/* Editing users */}
            {editingUsers.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] font-medium text-[var(--muted)] uppercase">
                  Editing ({editingUsers.length})
                </div>
                {editingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 px-3 py-1.5"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.name?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                    <span className="text-sm flex-1 truncate">{user.name || 'Anonymous'}</span>
                    {user.isTyping && (
                      <span className="text-[10px] text-green-500">typing...</span>
                    )}
                    <Edit3 className="w-3 h-3 text-blue-500" />
                  </div>
                ))}
              </div>
            )}

            {/* Viewing users */}
            {viewingUsers.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] font-medium text-[var(--muted)] uppercase">
                  Viewing ({viewingUsers.length})
                </div>
                {viewingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 px-3 py-1.5"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.name?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                    <span className="text-sm flex-1 truncate">{user.name || 'Anonymous'}</span>
                    <Eye className="w-3 h-3 text-[var(--muted)]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ActiveUsersBar
