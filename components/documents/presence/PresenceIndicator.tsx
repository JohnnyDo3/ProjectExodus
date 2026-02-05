'use client'

import { useState, useEffect } from 'react'
import { Pencil } from 'lucide-react'

interface TypingUser {
  id: string
  name: string | null
  color: string
}

interface PresenceIndicatorProps {
  typingUsers: TypingUser[]
  maxNames?: number
}

export function PresenceIndicator({ typingUsers, maxNames = 3 }: PresenceIndicatorProps) {
  const [dots, setDots] = useState('.')

  // Animate the dots
  useEffect(() => {
    if (typingUsers.length === 0) return

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '.'
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [typingUsers.length])

  if (typingUsers.length === 0) return null

  const displayNames = typingUsers.slice(0, maxNames)
  const remainingCount = typingUsers.length - maxNames

  const formatNames = () => {
    if (typingUsers.length === 1) {
      return `${displayNames[0].name || 'Someone'} is typing${dots}`
    }

    if (typingUsers.length === 2) {
      return `${displayNames[0].name || 'Someone'} and ${displayNames[1].name || 'someone'} are typing${dots}`
    }

    if (remainingCount <= 0) {
      const names = displayNames.map((u) => u.name || 'Someone')
      return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]} are typing${dots}`
    }

    const names = displayNames.map((u) => u.name || 'Someone')
    return `${names.join(', ')} and ${remainingCount} other${remainingCount > 1 ? 's' : ''} are typing${dots}`
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--secondary)]/10 rounded-full">
      {/* Typing indicator animation */}
      <div className="flex items-center gap-0.5">
        {typingUsers.slice(0, 3).map((user, index) => (
          <div
            key={user.id}
            className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white animate-pulse"
            style={{
              backgroundColor: user.color,
              animationDelay: `${index * 100}ms`,
            }}
          >
            {user.name?.[0]?.toUpperCase() || '?'}
          </div>
        ))}
      </div>

      {/* Pencil icon with animation */}
      <div className="relative">
        <Pencil className="w-3 h-3 text-[var(--primary)] animate-bounce" />
      </div>

      {/* Text */}
      <span className="text-xs text-[var(--muted)]">{formatNames()}</span>
    </div>
  )
}

export default PresenceIndicator
