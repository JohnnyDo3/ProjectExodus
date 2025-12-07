'use client'

import { User, MapPin, Mail, Edit2, Sword, MessageCircle, Stethoscope, Lightbulb, HeartHandshake, Flower2, Scale } from 'lucide-react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

// Guardian Archetypes - matching settings page
const GUARDIAN_ARCHETYPES: Record<string, {
  name: string
  title: string
  icon: LucideIcon
  gradient: string
}> = {
  michael: {
    name: 'MICHAEL',
    title: 'Guardian of Strength',
    icon: Sword,
    gradient: 'from-red-600 to-orange-500',
  },
  gabriel: {
    name: 'GABRIEL',
    title: 'Guardian of Revelation',
    icon: MessageCircle,
    gradient: 'from-sky-500 to-blue-600',
  },
  raphael: {
    name: 'RAPHAEL',
    title: 'Guardian of Healing',
    icon: Stethoscope,
    gradient: 'from-emerald-500 to-teal-600',
  },
  uriel: {
    name: 'URIEL',
    title: 'Guardian of Wisdom',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-yellow-500',
  },
  chamuel: {
    name: 'CHAMUEL',
    title: 'Guardian of Love',
    icon: HeartHandshake,
    gradient: 'from-pink-500 to-rose-600',
  },
  jophiel: {
    name: 'JOPHIEL',
    title: 'Guardian of Beauty',
    icon: Flower2,
    gradient: 'from-violet-500 to-purple-600',
  },
  zadkiel: {
    name: 'ZADKIEL',
    title: 'Guardian of Mercy',
    icon: Scale,
    gradient: 'from-indigo-500 to-blue-700',
  },
}

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
    phone?: string | null
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
  const archetype = userProfile?.guardianArchetype
    ? GUARDIAN_ARCHETYPES[userProfile.guardianArchetype.toLowerCase()]
    : null

  const ArchetypeIcon = archetype?.icon || User
  const gradient = archetype?.gradient || 'from-[var(--primary)] to-[var(--accent)]'

  if (isCompact) {
    return (
      <div className={`rounded-xl overflow-hidden ${className}`}>
        <div className={`bg-gradient-to-br ${gradient} p-3`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <ArchetypeIcon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white truncate">{user.name || 'User'}</p>
              {archetype && (
                <p className="text-[10px] font-bold text-white/70 uppercase">{archetype.title}</p>
              )}
            </div>
            <Link
              href="/settings?tab=businesscard"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`}>
      {/* Business Card Style - Full gradient background */}
      <div className={`bg-gradient-to-br ${gradient} p-5 relative`}>
        {/* Edit button */}
        <Link
          href="/settings?tab=businesscard"
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          title="Edit Business Card"
        >
          <Edit2 className="w-4 h-4 text-white" />
        </Link>

        {/* Top section - Icon and title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            {user.image ? (
              <img src={user.image} alt={user.name || ''} className="w-full h-full rounded-xl object-cover" />
            ) : (
              <ArchetypeIcon className="w-7 h-7 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            {archetype && (
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wide mb-0.5">
                {archetype.title}
              </p>
            )}
            <h3 className="text-xl font-black text-white truncate">
              {user.name || 'User'}
            </h3>
            {userProfile?.headline && (
              <p className="text-sm text-white/80 truncate">{userProfile.headline}</p>
            )}
          </div>
        </div>

        {/* Declaration */}
        {userProfile?.declaration && (
          <div className="border-t border-white/20 pt-3 mb-3">
            <p className="text-sm italic text-white/90 line-clamp-2">
              "{userProfile.declaration}"
            </p>
          </div>
        )}

        {/* Contact info row */}
        <div className="flex flex-wrap gap-3 text-xs text-white/80">
          {userProfile?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {userProfile.location}
            </span>
          )}
          {user.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" /> {user.email}
            </span>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[var(--card)] border-t border-[var(--border)]">
        <div className="flex items-center justify-between p-3">
          <div className="text-center flex-1">
            <p className="text-base font-bold text-[var(--foreground)]">
              {userProfile?._count?.followers || 0}
            </p>
            <p className="text-[9px] font-medium text-[var(--foreground)]/50 uppercase">Followers</p>
          </div>
          <div className="w-px h-6 bg-[var(--border)]" />
          <div className="text-center flex-1">
            <p className="text-base font-bold text-[var(--foreground)]">
              {userProfile?._count?.following || 0}
            </p>
            <p className="text-[9px] font-medium text-[var(--foreground)]/50 uppercase">Following</p>
          </div>
          <div className="w-px h-6 bg-[var(--border)]" />
          <div className="text-center flex-1">
            <p className="text-base font-bold text-[var(--foreground)]">
              {userProfile?._count?.projectMemberships || 0}
            </p>
            <p className="text-[9px] font-medium text-[var(--foreground)]/50 uppercase">Projects</p>
          </div>
        </div>

        {/* View Profile Link */}
        <Link
          href={`/profile/${user.id}`}
          className="block w-full text-center py-2.5 text-sm font-bold text-[var(--primary)] hover:bg-[var(--muted)] transition-colors border-t border-[var(--border)]"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  )
}
