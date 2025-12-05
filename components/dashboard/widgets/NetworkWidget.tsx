'use client'

import Link from 'next/link'
import { User, Users } from 'lucide-react'
import { WidgetWrapper } from '../WidgetWrapper'

interface NetworkWidgetProps {
  following: any[]
  networkSuggestions: any[]
  onRemove?: () => void
  onFollow?: (userId: string) => void
}

export function NetworkWidget({
  following,
  networkSuggestions,
  onRemove,
  onFollow,
}: NetworkWidgetProps) {
  return (
    <WidgetWrapper
      id="network"
      title="My Senate"
      icon={Users}
      theme="primary"
      onRemove={onRemove}
      showRemove={!!onRemove}
    >
      <div className="flex flex-col h-full overflow-y-auto p-2 space-y-3">
        {/* Recent Following */}
        {following.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2 px-1">
              Following
            </h3>
            <div className="space-y-1">
              {following.slice(0, 3).map((user: any) => (
                <Link key={user.id} href={`/profile/${user.id}`}>
                  <div className="flex items-center gap-2 p-2 bg-[var(--muted)]/50 rounded-lg hover:bg-[var(--muted)] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {user.image ? (
                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)] truncate">
                        {user.name || 'Anonymous'}
                      </p>
                      <p className="text-[10px] text-[var(--foreground)]/50 truncate">
                        {user.bio || 'Member'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Connections */}
        <div>
          <h3 className="text-xs font-semibold text-[var(--foreground)] mb-2 px-1">
            Suggested Connections
          </h3>
          <div className="space-y-2">
            {networkSuggestions.length > 0 ? (
              networkSuggestions.map((user: any) => (
                <div
                  key={user.id}
                  className="p-3 bg-gradient-to-br from-[var(--primary)]/5 to-transparent border border-[var(--primary)]/20 rounded-xl hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {user.image ? (
                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/profile/${user.id}`}>
                        <p className="text-sm font-medium text-[var(--foreground)] truncate hover:text-[var(--primary)] transition-colors">
                          {user.name || 'Anonymous'}
                        </p>
                      </Link>
                      <p className="text-[10px] text-[var(--foreground)]/50 truncate">
                        {user.headline || 'Member'}
                      </p>
                    </div>
                  </div>
                  {user.matchReasons && user.matchReasons.length > 0 && (
                    <p className="text-[10px] text-[var(--foreground)]/60 mb-2 line-clamp-2">
                      {user.matchReasons[0]}
                    </p>
                  )}
                  <button
                    onClick={() => onFollow?.(user.id)}
                    className="w-full py-1.5 px-3 bg-[var(--primary)] text-white rounded-lg text-xs font-medium hover:bg-[var(--accent)] transition-colors"
                  >
                    Connect
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--foreground)]/50 text-center py-4">
                No suggestions available
              </p>
            )}
          </div>
        </div>
      </div>
    </WidgetWrapper>
  )
}
