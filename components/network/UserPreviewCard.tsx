'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import {
  Sword,
  MessageCircle,
  Stethoscope,
  Lightbulb,
  HeartHandshake,
  Flower2,
  Scale,
  Mail,
  Phone,
  UserPlus,
  UserCheck,
  Loader2,
  Users,
  MapPin,
  Briefcase,
  Infinity,
} from 'lucide-react'

const GUARDIAN_ARCHETYPES = {
  michael: {
    id: 'michael',
    name: 'MICHAEL',
    title: 'Guardian of Strength',
    value: 'STRENGTH',
    icon: Sword,
    gradient: 'from-red-600 to-orange-500',
    bgGradient: 'from-red-600/20 to-orange-500/10',
    accentColor: 'text-red-500',
    borderColor: 'border-red-500',
  },
  gabriel: {
    id: 'gabriel',
    name: 'GABRIEL',
    title: 'Guardian of Revelation',
    value: 'REVELATION',
    icon: MessageCircle,
    gradient: 'from-sky-500 to-blue-600',
    bgGradient: 'from-sky-500/20 to-blue-600/10',
    accentColor: 'text-sky-500',
    borderColor: 'border-sky-500',
  },
  raphael: {
    id: 'raphael',
    name: 'RAPHAEL',
    title: 'Guardian of Healing',
    value: 'HEALING',
    icon: Stethoscope,
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-500/20 to-green-600/10',
    accentColor: 'text-emerald-500',
    borderColor: 'border-emerald-500',
  },
  uriel: {
    id: 'uriel',
    name: 'URIEL',
    title: 'Guardian of Wisdom',
    value: 'WISDOM',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-yellow-500',
    bgGradient: 'from-amber-500/20 to-yellow-500/10',
    accentColor: 'text-amber-500',
    borderColor: 'border-amber-500',
  },
  camael: {
    id: 'camael',
    name: 'CAMAEL',
    title: 'Guardian of Love',
    value: 'LOVE',
    icon: HeartHandshake,
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-500/20 to-rose-600/10',
    accentColor: 'text-pink-500',
    borderColor: 'border-pink-500',
  },
  jophiel: {
    id: 'jophiel',
    name: 'JOPHIEL',
    title: 'Guardian of Beauty',
    value: 'BEAUTY',
    icon: Flower2,
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-500/20 to-purple-600/10',
    accentColor: 'text-violet-500',
    borderColor: 'border-violet-500',
  },
  zadkiel: {
    id: 'zadkiel',
    name: 'ZADKIEL',
    title: 'Guardian of Mercy',
    value: 'MERCY',
    icon: Scale,
    gradient: 'from-indigo-500 to-blue-700',
    bgGradient: 'from-indigo-500/20 to-blue-700/10',
    accentColor: 'text-indigo-500',
    borderColor: 'border-indigo-500',
  },
}

type ArchetypeType = keyof typeof GUARDIAN_ARCHETYPES

interface UserPreviewCardProps {
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    headline: string | null
    bio: string | null
    location: string | null
    phone?: string | null
    interests: string[]
    expertise?: string[]
    guardianArchetype: string | null
    declaration?: string | null
    _count: {
      followers: number
      following: number
      projectMemberships: number
      articles: number
      createdProjects: number
    }
  }
  isFollowing: boolean
  isFollowingMe?: boolean
  isLoadingFollow: boolean
  onFollow: (userId: string) => void
  onMessage: (userId: string) => void
  isLoggedIn: boolean
  variant?: 'compact' | 'full'
}

export function UserPreviewCard({
  user,
  isFollowing,
  isFollowingMe = false,
  isLoadingFollow,
  onFollow,
  onMessage,
  isLoggedIn,
  variant = 'full',
}: UserPreviewCardProps) {
  const archetypeKey = (user.guardianArchetype || 'michael').toLowerCase() as ArchetypeType
  const archetype = GUARDIAN_ARCHETYPES[archetypeKey] || GUARDIAN_ARCHETYPES.michael
  const ArchetypeIcon = archetype.icon

  // Calculate STOCK score
  const stockScore =
    (user._count.createdProjects * 10) +
    (user._count.articles * 5) +
    (user._count.followers * 1) +
    (user._count.projectMemberships * 2)

  // Determine relationship status
  const getRelationshipBadge = () => {
    if (isFollowing && isFollowingMe) {
      return { label: 'MUTUAL', color: 'bg-green-500' }
    }
    if (isFollowing) {
      return { label: 'FOLLOWING', color: 'bg-blue-500' }
    }
    if (isFollowingMe) {
      return { label: 'FOLLOWS YOU', color: 'bg-purple-500' }
    }
    return null
  }

  const relationshipBadge = getRelationshipBadge()

  if (variant === 'compact') {
    return (
      <div className="group relative bg-[var(--card)] rounded-xl border-2 border-[var(--border)] hover:border-theme-primary transition-all overflow-hidden">
        {/* Header bar with archetype gradient */}
        <div className={`h-1.5 bg-gradient-to-r ${archetype.gradient}`} />

        <div className="p-3 sm:p-4">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <Link href={`/profile/${user.id}`} className="flex-shrink-0">
              <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${archetype.gradient} p-0.5 hover:scale-105 transition-transform`}>
                {user.image ? (
                  <Image src={user.image} alt={user.name || 'User'} fill unoptimized sizes="100%" className="rounded-[10px] object-cover" />
                ) : (
                  <div className="w-full h-full rounded-[10px] bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link href={`/profile/${user.id}`}>
                    <h3 className="text-sm sm:text-base font-black text-[var(--foreground)] truncate hover:text-theme-primary transition-colors">
                      {user.name || 'Anonymous'}
                    </h3>
                  </Link>
                  {user.headline && (
                    <p className="text-[10px] sm:text-xs text-theme-muted truncate">{user.headline}</p>
                  )}
                </div>
                {relationshipBadge && (
                  <span className={`px-1.5 py-0.5 ${relationshipBadge.color} text-white text-[8px] font-bold rounded-full flex-shrink-0`}>
                    {relationshipBadge.label}
                  </span>
                )}
              </div>

              {/* Location */}
              {user.location && (
                <div className="flex items-center gap-1 mt-1 text-[10px] text-theme-muted">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[var(--border)]">
            <div className="text-center flex-1">
              <p className="text-base sm:text-lg font-black text-theme-primary">{user._count.followers}</p>
              <p className="text-[8px] sm:text-[10px] font-bold text-theme-muted uppercase">Followers</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-base sm:text-lg font-black text-theme-accent">{user._count.projectMemberships}</p>
              <p className="text-[8px] sm:text-[10px] font-bold text-theme-muted uppercase">Projects</p>
            </div>
            <div className="text-center flex-1">
              <p className={`text-base sm:text-lg font-black ${archetype.accentColor}`}>{stockScore}</p>
              <p className="text-[8px] sm:text-[10px] font-bold text-theme-muted uppercase">Stock</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <Button
              onClick={() => onFollow(user.id)}
              disabled={isLoadingFollow || !isLoggedIn}
              variant={isFollowing ? 'outline' : 'primary'}
              size="sm"
              className="flex-1 text-xs font-bold h-8"
            >
              {isLoadingFollow ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : isFollowing ? (
                <>
                  <UserCheck className="w-3 h-3 mr-1" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="w-3 h-3 mr-1" />
                  Follow
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!isLoggedIn}
              onClick={() => onMessage(user.id)}
              className="h-8 px-3"
              title="Send Message"
            >
              <MessageCircle className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Full variant with business card preview
  return (
    <div className={`group relative bg-[var(--card)] rounded-2xl border-4 ${archetype.borderColor} hover:shadow-xl transition-all overflow-hidden`}>
      {/* Header with gradient */}
      <div className={`h-20 sm:h-24 bg-gradient-to-r ${archetype.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Archetype icon */}
        <div className="absolute top-3 right-3">
          <ArchetypeIcon className="w-8 h-8 text-white/30" />
        </div>

        {/* Relationship badge */}
        {relationshipBadge && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 ${relationshipBadge.color} text-white text-[10px] font-black rounded-full shadow-lg`}>
              {relationshipBadge.label}
            </span>
          </div>
        )}
      </div>

      {/* Avatar overlapping header */}
      <div className="relative -mt-10 sm:-mt-12 px-4 sm:px-6">
        <Link href={`/profile/${user.id}`}>
          <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${archetype.gradient} p-1 hover:scale-105 transition-transform shadow-lg`}>
            {user.image ? (
              <Image src={user.image} alt={user.name || 'User'} fill unoptimized sizes="100%" className="rounded-xl object-cover" />
            ) : (
              <div className="w-full h-full rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 pt-2 sm:pt-3">
        {/* Name and headline */}
        <div className="mb-3">
          <Link href={`/profile/${user.id}`}>
            <h3 className="text-lg sm:text-xl font-black text-[var(--foreground)] hover:text-theme-primary transition-colors">
              {user.name || 'Anonymous'}
            </h3>
          </Link>
          {user.headline && (
            <p className="text-xs sm:text-sm text-theme-muted mt-0.5">{user.headline}</p>
          )}
          {user.location && (
            <div className="flex items-center gap-1 mt-1 text-xs text-theme-muted">
              <MapPin className="w-3 h-3" />
              <span>{user.location}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-xs sm:text-sm text-theme-muted mb-4 line-clamp-2">
            {user.bio}
          </p>
        )}

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {user.interests.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="px-2 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent text-[10px] sm:text-xs font-bold"
              >
                {interest}
              </span>
            ))}
            {user.interests.length > 3 && (
              <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-theme-muted text-[10px] sm:text-xs font-bold">
                +{user.interests.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-[var(--muted)] rounded-xl mb-4">
          <div className="text-center">
            <p className="text-lg sm:text-xl font-black text-theme-primary">{user._count.followers}</p>
            <p className="text-[8px] sm:text-[10px] font-bold text-theme-muted uppercase">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg sm:text-xl font-black text-theme-accent">{user._count.projectMemberships}</p>
            <p className="text-[8px] sm:text-[10px] font-bold text-theme-muted uppercase">Projects</p>
          </div>
          <div className="text-center">
            <p className={`text-lg sm:text-xl font-black ${archetype.accentColor}`}>{stockScore}</p>
            <p className="text-[8px] sm:text-[10px] font-bold text-theme-muted uppercase">Stock</p>
          </div>
        </div>

        {/* Guardian Badge */}
        <div className={`p-2 sm:p-3 bg-gradient-to-br ${archetype.bgGradient} rounded-xl border ${archetype.borderColor} mb-4`}>
          <div className="flex items-center gap-2">
            <ArchetypeIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${archetype.accentColor}`} />
            <div>
              <span className={`text-xs sm:text-sm font-black ${archetype.accentColor}`}>{archetype.name}</span>
              <p className="text-[10px] text-theme-muted">{archetype.title}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onFollow(user.id)}
            disabled={isLoadingFollow || !isLoggedIn}
            variant={isFollowing ? 'outline' : 'primary'}
            className="flex-1 font-bold text-xs sm:text-sm"
          >
            {isLoadingFollow ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isFollowing ? (
              <>
                <UserCheck className="w-4 h-4 mr-2" />
                FOLLOWING
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                FOLLOW
              </>
            )}
          </Button>
          <Button
            variant="outline"
            disabled={!isLoggedIn}
            onClick={() => onMessage(user.id)}
            className="font-bold"
            title="Send Message"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
