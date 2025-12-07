'use client'

import { User, MapPin, Briefcase, Users, Edit2 } from 'lucide-react'
import Link from 'next/link'

interface ProfileCardProps {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  userProfile?: {
    headline?: string | null
    bio?: string | null
    location?: string | null
    jobTitle?: string | null
    company?: string | null
    guardianArchetype?: string | null
    declaration?: string | null
    expertise?: string[]
    interests?: string[]
    _count?: {
      followers?: number
      following?: number
      projectMemberships?: number
      articles?: number
    }
  } | null
  isCompact?: boolean
  className?: string
}

export function ProfileCard({
  user,
  userProfile,
  isCompact = false,
  className = '',
}: ProfileCardProps) {
  if (isCompact) {
    return (
      <div className={`bg-[var(--muted)] rounded-xl p-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 overflow-hidden">
            {user.image ? (
              <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[var(--foreground)] truncate">{user.name || 'User'}</p>
            {userProfile?.headline && (
              <p className="text-xs text-[var(--foreground)]/60 truncate">{userProfile.headline}</p>
            )}
          </div>
          <Link
            href="/settings"
            className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors"
          >
            <Edit2 className="w-4 h-4 text-[var(--foreground)]/60" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-[var(--muted)] rounded-xl overflow-hidden ${className}`}>
      {/* Header gradient */}
      <div className="h-16 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]" />

      {/* Avatar */}
      <div className="px-4 -mt-10">
        <div className="w-20 h-20 rounded-full border-4 border-[var(--card)] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center overflow-hidden">
          {user.image ? (
            <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-white" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-3">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-[var(--foreground)] truncate">
              {user.name || 'User'}
            </h3>
            {userProfile?.headline && (
              <p className="text-sm text-[var(--foreground)]/60 truncate">{userProfile.headline}</p>
            )}
          </div>
          <Link
            href="/settings"
            className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors ml-2"
          >
            <Edit2 className="w-4 h-4 text-[var(--foreground)]/60" />
          </Link>
        </div>

        {/* Guardian Archetype */}
        {userProfile?.guardianArchetype && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20 mb-3">
            <span className="text-xs font-bold text-[var(--primary)]">
              {userProfile.guardianArchetype}
            </span>
          </div>
        )}

        {/* Location & Job */}
        {(userProfile?.location || userProfile?.jobTitle) && (
          <div className="space-y-1 mb-3 text-xs text-[var(--foreground)]/60">
            {userProfile.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{userProfile.location}</span>
              </div>
            )}
            {userProfile.jobTitle && (
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3 h-3" />
                <span className="truncate">
                  {userProfile.jobTitle}
                  {userProfile.company && ` at ${userProfile.company}`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between py-3 border-t border-[var(--border)]">
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-[var(--primary)]">
              {userProfile?._count?.followers || 0}
            </p>
            <p className="text-[10px] font-medium text-[var(--foreground)]/50 uppercase">Followers</p>
          </div>
          <div className="w-px h-8 bg-[var(--border)]" />
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-[var(--accent)]">
              {userProfile?._count?.following || 0}
            </p>
            <p className="text-[10px] font-medium text-[var(--foreground)]/50 uppercase">Following</p>
          </div>
          <div className="w-px h-8 bg-[var(--border)]" />
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-[var(--secondary)]">
              {userProfile?._count?.projectMemberships || 0}
            </p>
            <p className="text-[10px] font-medium text-[var(--foreground)]/50 uppercase">Projects</p>
          </div>
        </div>

        {/* Declaration */}
        {userProfile?.declaration && (
          <div className="mt-3 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
            <p className="text-xs italic text-[var(--foreground)]/70 line-clamp-3">
              "{userProfile.declaration}"
            </p>
          </div>
        )}

        {/* View Profile Link */}
        <Link
          href={`/profile/${user.id}`}
          className="mt-3 block w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold text-sm hover:opacity-90 transition-opacity"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  )
}
