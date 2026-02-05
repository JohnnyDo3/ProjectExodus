'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, UserPlus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PermissionSelect } from './PermissionSelect'

interface User {
  id: string
  name: string | null
  email: string
  image: string | null
}

interface InviteInputProps {
  users: User[]
  onInvite: (userId: string, permission: 'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN') => Promise<void>
  isLoading?: boolean
}

export function InviteInput({ users, onInvite, isLoading = false }: InviteInputProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [permission, setPermission] = useState<'VIEW' | 'COMMENT' | 'SUGGEST' | 'EDIT' | 'ADMIN'>('EDIT')
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setSearchTerm(user.name || user.email)
    setShowDropdown(false)
  }

  const handleInvite = async () => {
    if (!selectedUser) return
    await onInvite(selectedUser.id, permission)
    setSelectedUser(null)
    setSearchTerm('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selectedUser) {
      handleInvite()
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide">
        Invite People
      </div>

      <div className="flex items-center gap-2">
        {/* Search input */}
        <div className="flex-1 relative" ref={inputRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setSelectedUser(null)
                setShowDropdown(true)
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
            />
          </div>

          {/* User dropdown */}
          {showDropdown && searchTerm && filteredUsers.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--secondary)]/10 text-left"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-sm">
                      {user.name?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{user.name}</div>
                    <div className="text-xs text-[var(--muted)] truncate">{user.email}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showDropdown && searchTerm && filteredUsers.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg z-50 p-3 text-center text-sm text-[var(--muted)]">
              No users found
            </div>
          )}
        </div>

        {/* Permission select */}
        <PermissionSelect
          value={permission}
          onChange={setPermission}
          disabled={isLoading}
        />

        {/* Invite button */}
        <Button
          onClick={handleInvite}
          disabled={!selectedUser || isLoading}
          className="font-bold"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-1" />
              Invite
            </>
          )}
        </Button>
      </div>

      {/* Selected user preview */}
      {selectedUser && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg">
          {selectedUser.image ? (
            <img
              src={selectedUser.image}
              alt={selectedUser.name || 'User'}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-xs">
              {selectedUser.name?.[0]?.toUpperCase() || '?'}
            </div>
          )}
          <span className="text-sm font-medium">{selectedUser.name}</span>
          <span className="text-xs text-[var(--muted)]">will be added with {permission.toLowerCase()} access</span>
        </div>
      )}
    </div>
  )
}

export default InviteInput
