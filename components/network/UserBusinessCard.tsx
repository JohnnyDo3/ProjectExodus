'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  Infinity,
  UserPlus,
  UserCheck,
  Loader2,
  Users,
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

interface UserBusinessCardProps {
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    headline: string | null
    bio: string | null
    phone: string | null
    expertise: string[]
    guardianArchetype: string | null
    declaration: string | null
    _count: {
      followers: number
      following: number
      projectMemberships: number
      articles: number
      createdProjects: number
    }
  }
  isFollowing: boolean
  isLoadingFollow: boolean
  onFollow: (userId: string) => void
  onMessage: (userId: string) => void
  isLoggedIn: boolean
}

export function UserBusinessCard({
  user,
  isFollowing,
  isLoadingFollow,
  onFollow,
  onMessage,
  isLoggedIn,
}: UserBusinessCardProps) {
  const archetypeKey = (user.guardianArchetype || 'michael') as ArchetypeType
  const archetype = GUARDIAN_ARCHETYPES[archetypeKey] || GUARDIAN_ARCHETYPES.michael
  const ArchetypeIcon = archetype.icon

  // Calculate STOCK score
  const stockScore =
    (user._count.createdProjects * 10) +
    (user._count.articles * 5) +
    (user._count.followers * 1) +
    (user._count.projectMemberships * 2)

  return (
    <div className={`flex-shrink-0 w-full h-full flex flex-col bg-[var(--card)] rounded-2xl border-4 ${archetype.borderColor} shadow-lg overflow-hidden`}>
      {/* Header with gradient */}
      <div className={`p-4 bg-gradient-to-r ${archetype.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          {/* Avatar */}
          <Link href={`/profile/${user.id}`}>
            <div className="w-14 h-14 rounded-full border-2 border-white/50 overflow-hidden bg-white/20 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
              {user.image ? (
                <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
              ) : (
                <Users className="w-7 h-7 text-white" />
              )}
            </div>
          </Link>

          <div className="flex-1 min-w-0 text-white">
            <Link href={`/profile/${user.id}`}>
              <h2 className="text-sm font-black truncate hover:underline cursor-pointer">
                {user.name || 'Anonymous'}
              </h2>
            </Link>
            <p className="text-[10px] font-bold opacity-80 truncate">
              {user.headline || archetype.title}
            </p>
          </div>

          <ArchetypeIcon className="w-8 h-8 text-white/80" />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Declaration */}
        {user.declaration && (
          <div className="text-[11px] font-medium italic text-theme-muted line-clamp-2">
            "{user.declaration}"
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-1 text-[10px]">
          {user.phone && (
            <div className="flex items-center gap-2 text-theme-muted">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{user.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-theme-muted">
            <Mail className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
        </div>

        {/* STOCK Score */}
        <div className="mt-auto pt-3 border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Infinity className="w-4 h-4 text-theme-muted opacity-70" />
            <span className="text-[9px] font-bold text-theme-muted uppercase">Stock</span>
          </div>
          <span className={`text-lg font-black ${archetype.accentColor}`}>{stockScore}</span>
        </div>

        {/* Guardian Value */}
        <div className={`p-2 bg-gradient-to-br ${archetype.bgGradient} rounded-xl border-2 ${archetype.borderColor}`}>
          <div className="flex items-center gap-2">
            <ArchetypeIcon className={`w-4 h-4 ${archetype.accentColor}`} />
            <span className={`text-xs font-black ${archetype.accentColor}`}>{archetype.value}</span>
          </div>
        </div>

        {/* Skills Preview */}
        {user.expertise && user.expertise.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1">
              {user.expertise.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 bg-gradient-to-r ${archetype.gradient} text-white text-[9px] font-bold rounded-full`}
                >
                  {skill}
                </span>
              ))}
              {user.expertise.length > 3 && (
                <span className="px-2 py-0.5 bg-[var(--muted)] text-theme-muted text-[9px] font-bold rounded-full">
                  +{user.expertise.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-2">
          <Button
            onClick={() => onFollow(user.id)}
            disabled={isLoadingFollow || !isLoggedIn}
            variant={isFollowing ? 'outline' : 'primary'}
            className="flex-1 font-bold text-xs py-2"
          >
            {isLoadingFollow ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : isFollowing ? (
              <>
                <UserCheck className="w-3 h-3 mr-1" />
                FOLLOWING
              </>
            ) : (
              <>
                <UserPlus className="w-3 h-3 mr-1" />
                FOLLOW
              </>
            )}
          </Button>
          <Button
            variant="outline"
            disabled={!isLoggedIn}
            onClick={() => onMessage(user.id)}
            className="font-bold px-3"
            title="Send Message"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
