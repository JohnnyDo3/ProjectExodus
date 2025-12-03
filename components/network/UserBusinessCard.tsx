'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
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
  MapPin,
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
    location: string | null
    phone: string | null
    interests: string[]
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
    <Card className={`border-4 ${archetype.borderColor} hover:shadow-lg transition-all overflow-hidden`}>
      <CardContent className="p-0">
        {/* Header with Gradient - Shows identity */}
        <div className={`p-4 bg-gradient-to-r ${archetype.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <Link
              href={`/profile/${user.id}`}
              className="w-14 h-14 rounded-xl bg-white/20 border-2 border-white/30 flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform cursor-pointer overflow-hidden"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users className="w-7 h-7 text-white" />
              )}
            </Link>
            <div className="flex-1 min-w-0 text-white">
              <Link href={`/profile/${user.id}`}>
                <h3 className="text-base font-black truncate hover:opacity-80 transition-opacity cursor-pointer">
                  {user.name || 'Anonymous'}
                </h3>
              </Link>
              <p className="text-xs font-bold opacity-80 truncate">
                {user.headline || archetype.title}
              </p>
              {user.location && (
                <div className="flex items-center gap-1 mt-0.5 text-[10px] font-medium opacity-70">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <ArchetypeIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Card Body - All info visible */}
        <div className="p-4 space-y-3">
          {/* Declaration */}
          {user.declaration && (
            <p className="text-xs font-medium italic text-theme-muted">
              "{user.declaration}"
            </p>
          )}

          {/* Bio */}
          {user.bio && (
            <p className="text-xs font-medium text-[var(--foreground)]">
              {user.bio}
            </p>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-3 text-[10px]">
            {user.phone && (
              <div className="flex items-center gap-1 text-theme-muted">
                <Phone className="w-3 h-3" />
                <span>{user.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-theme-muted">
              <Mail className="w-3 h-3" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>

          {/* Guardian Value & Stock */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 px-2 py-1 bg-gradient-to-br ${archetype.bgGradient} rounded-lg border ${archetype.borderColor}`}>
              <ArchetypeIcon className={`w-3 h-3 ${archetype.accentColor}`} />
              <span className={`text-[10px] font-black ${archetype.accentColor}`}>{archetype.value}</span>
            </div>
            <div className="flex items-center gap-1">
              <Infinity className="w-3 h-3 text-theme-muted" />
              <span className={`text-sm font-black ${archetype.accentColor}`}>{stockScore}</span>
            </div>
          </div>

          {/* Skills */}
          {user.expertise && user.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {user.expertise.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 bg-gradient-to-r ${archetype.gradient} text-white text-[9px] font-bold rounded-full`}
                >
                  {skill}
                </span>
              ))}
              {user.expertise.length > 4 && (
                <span className="px-2 py-0.5 bg-[var(--muted)] text-theme-muted text-[9px] font-bold rounded-full">
                  +{user.expertise.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Interests */}
          {user.interests && user.interests.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {user.interests.slice(0, 3).map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-theme-muted text-[9px] font-bold"
                >
                  {interest}
                </span>
              ))}
              {user.interests.length > 3 && (
                <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-theme-muted text-[9px] font-bold">
                  +{user.interests.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[var(--border)]">
            <div className="text-center">
              <p className={`text-lg font-black ${archetype.accentColor}`}>{user._count.followers}</p>
              <p className="text-[8px] font-bold text-theme-muted uppercase">Followers</p>
            </div>
            <div className="text-center">
              <p className={`text-lg font-black ${archetype.accentColor}`}>{user._count.projectMemberships}</p>
              <p className="text-[8px] font-bold text-theme-muted uppercase">Projects</p>
            </div>
            <div className="text-center">
              <p className={`text-lg font-black ${archetype.accentColor}`}>{user._count.articles}</p>
              <p className="text-[8px] font-bold text-theme-muted uppercase">Articles</p>
            </div>
            <div className="text-center">
              <p className={`text-lg font-black ${archetype.accentColor}`}>{user._count.createdProjects}</p>
              <p className="text-[8px] font-bold text-theme-muted uppercase">Created</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
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
      </CardContent>
    </Card>
  )
}
