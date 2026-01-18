'use client'

import { User, MapPin, Mail, Edit2, Sword, MessageCircle, Stethoscope, Lightbulb, HeartHandshake, Flower2, Scale, Phone, Briefcase, Building2, FileText, Sparkles, Heart } from 'lucide-react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { ViewMode } from '@/hooks/useVolitionLayout'

// Guardian Archetypes - matching ProfileBusinessCard with hex colors
const GUARDIAN_ARCHETYPES: Record<string, {
  value: string
  title: string
  icon: LucideIcon
  colors: {
    from: string
    to: string
    gradient: string
  }
}> = {
  michael: {
    value: 'STRENGTH',
    title: 'Guardian of Strength',
    icon: Sword,
    colors: {
      from: '#dc2626',
      to: '#f97316',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    },
  },
  gabriel: {
    value: 'REVELATION',
    title: 'Guardian of Revelation',
    icon: MessageCircle,
    colors: {
      from: '#0ea5e9',
      to: '#2563eb',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    },
  },
  raphael: {
    value: 'HEALING',
    title: 'Guardian of Healing',
    icon: Stethoscope,
    colors: {
      from: '#10b981',
      to: '#0d9488',
      gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
    },
  },
  uriel: {
    value: 'WISDOM',
    title: 'Guardian of Wisdom',
    icon: Lightbulb,
    colors: {
      from: '#f59e0b',
      to: '#eab308',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
    },
  },
  camael: {
    value: 'LOVE',
    title: 'Guardian of Love',
    icon: HeartHandshake,
    colors: {
      from: '#ec4899',
      to: '#e11d48',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #e11d48 100%)',
    },
  },
  jophiel: {
    value: 'BEAUTY',
    title: 'Guardian of Beauty',
    icon: Flower2,
    colors: {
      from: '#8b5cf6',
      to: '#9333ea',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #9333ea 100%)',
    },
  },
  zadkiel: {
    value: 'MERCY',
    title: 'Guardian of Mercy',
    icon: Scale,
    colors: {
      from: '#6366f1',
      to: '#1d4ed8',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #1d4ed8 100%)',
    },
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
  viewMode?: ViewMode
  className?: string
  onExpand?: () => void
}

export function ProfileCard({
  user,
  userProfile,
  viewMode = 'expanded',
  className = '',
  onExpand,
}: ProfileCardProps) {
  const isCompact = viewMode === 'compact'
  const isMinimal = viewMode === 'minimal'
  const archetype = userProfile?.guardianArchetype
    ? GUARDIAN_ARCHETYPES[userProfile.guardianArchetype.toLowerCase()]
    : null

  // Minimal view - just title header
  if (isMinimal) {
    return (
      <div className={`rounded-lg overflow-hidden ${className}`}>
        <div className="p-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-white flex-shrink-0" />
            <h3 className="text-xs font-bold text-white truncate">
              {user.name || 'Profile'}
            </h3>
          </div>
        </div>
      </div>
    )
  }

  const ArchetypeIcon = archetype?.icon || User
  // Use hex gradient from archetype colors, fallback to CSS variables
  const gradientStyle = archetype?.colors.gradient || 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)'

  if (isCompact) {
    return (
      <div className={`rounded-xl overflow-hidden ${className}`}>
        <div className="p-3" style={{ background: gradientStyle }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              {user.image ? (
                <img src={user.image} alt={user.name || ''} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <ArchetypeIcon className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white truncate">{user.name || 'User'}</p>
              {archetype && (
                <p className="text-[10px] font-bold text-white/70 uppercase">{archetype.title}</p>
              )}
            </div>
            <button
              onClick={onExpand}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Edit Business Card"
            >
              <Edit2 className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Check if any contact info is filled
  const hasLocation = userProfile?.location && userProfile.location.trim()
  const hasPhone = userProfile?.phone && userProfile.phone.trim()
  const hasContactInfo = hasLocation || user.email || hasPhone
  const hasJobInfo = userProfile?.jobTitle || userProfile?.company
  const hasExpertise = userProfile?.expertise && userProfile.expertise.length > 0
  const hasInterests = userProfile?.interests && userProfile.interests.length > 0
  const hasBio = userProfile?.bio && userProfile.bio.trim()
  const hasDeclaration = userProfile?.declaration && userProfile.declaration.trim()

  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`}>
      {/* Business Card Style - Full gradient background */}
      <div className="p-5 relative" style={{ background: gradientStyle }}>
        {/* Edit button */}
        <button
          onClick={onExpand}
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          title="Edit Business Card"
        >
          <Edit2 className="w-4 h-4 text-white" />
        </button>

        {/* Top section - Icon and title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            {user.image ? (
              <img src={user.image} alt={user.name || ''} className="w-full h-full rounded-xl object-cover" />
            ) : (
              <ArchetypeIcon className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            {archetype && (
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wide mb-0.5">
                {archetype.title} • {archetype.value}
              </p>
            )}
            <h3 className="text-xl font-black text-white truncate">
              {user.name || 'Anonymous'}
            </h3>
            {userProfile?.headline && (
              <p className="text-sm text-white/80 truncate">
                {userProfile.headline}
              </p>
            )}
          </div>
        </div>

        {/* Job Title & Company - Only show if filled */}
        {hasJobInfo && (
          <div className="flex flex-wrap gap-3 text-xs text-white/80 mb-3">
            {userProfile?.jobTitle && (
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {userProfile.jobTitle}
              </span>
            )}
            {userProfile?.company && (
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {userProfile.company}
              </span>
            )}
          </div>
        )}

        {/* Declaration - Only show if filled */}
        {hasDeclaration && (
          <div className="border-t border-white/20 pt-3 mb-3">
            <p className="text-sm italic text-white/90 line-clamp-2">
              "{userProfile.declaration}"
            </p>
          </div>
        )}

        {/* Bio - Only show if filled */}
        {hasBio && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase mb-1">
              <FileText className="w-3 h-3" /> About
            </div>
            <p className="text-xs text-white/80 line-clamp-3">
              {userProfile.bio}
            </p>
          </div>
        )}

        {/* Expertise - Only show if filled */}
        {hasExpertise && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase mb-1.5">
              <Sparkles className="w-3 h-3" /> Expertise
            </div>
            <div className="flex flex-wrap gap-1.5">
              {userProfile.expertise!.map((skill, i) => (
                <span key={i} className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-semibold text-white">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests - Only show if filled */}
        {hasInterests && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase mb-1.5">
              <Heart className="w-3 h-3" /> Interests
            </div>
            <div className="flex flex-wrap gap-1.5">
              {userProfile.interests!.map((interest, i) => (
                <span key={i} className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-semibold text-white">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact info row - Only show fields that are filled */}
        {hasContactInfo && (
          <div className="border-t border-white/20 pt-3">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/80">
              {hasLocation && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  {userProfile.location}
                </span>
              )}
              {user.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </span>
              )}
              {hasPhone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 flex-shrink-0" />
                  {userProfile.phone}
                </span>
              )}
            </div>
          </div>
        )}
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
          <div className="w-px h-6 bg-[var(--border)]" />
          <div className="text-center flex-1">
            <p className="text-base font-bold text-[var(--foreground)]">
              {userProfile?._count?.articles || 0}
            </p>
            <p className="text-[9px] font-medium text-[var(--foreground)]/50 uppercase">Articles</p>
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
