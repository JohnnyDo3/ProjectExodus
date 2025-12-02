'use client'

import { useRef } from 'react'
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
  ChevronDown,
  ChevronUp,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const businessCardRef = useRef<HTMLDivElement>(null)
  const profileSectionRef = useRef<HTMLDivElement>(null)

  const archetypeKey = (user.guardianArchetype || 'michael') as ArchetypeType
  const archetype = GUARDIAN_ARCHETYPES[archetypeKey] || GUARDIAN_ARCHETYPES.michael
  const ArchetypeIcon = archetype.icon

  // Calculate STOCK score
  const stockScore =
    (user._count.createdProjects * 10) +
    (user._count.articles * 5) +
    (user._count.followers * 1) +
    (user._count.projectMemberships * 2)

  const scrollToBusinessCard = () => {
    if (businessCardRef.current && scrollContainerRef.current) {
      businessCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToProfile = () => {
    if (profileSectionRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Card className="border-4 border-theme-primary hover:border-theme-accent transition-colors overflow-hidden">
      <CardContent className="p-0">
        {/* Scrollable container */}
        <div ref={scrollContainerRef} className="max-h-[500px] overflow-y-auto scroll-smooth">
          {/* Original Profile Section */}
          <div ref={profileSectionRef} className="p-6">
            {/* User Avatar and Name */}
            <div className="flex items-start gap-4 mb-4">
              <Link
                href={`/profile/${user.id}`}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || 'User'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Users className="w-8 h-8 text-[var(--primary-foreground)]" />
                )}
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/profile/${user.id}`}>
                  <h3 className="text-xl font-black text-[var(--foreground)] truncate hover:text-theme-primary transition-colors cursor-pointer">
                    {user.name || 'Anonymous'}
                  </h3>
                </Link>
                {user.location && (
                  <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-theme-muted">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{user.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-sm font-semibold text-theme-muted mb-4 line-clamp-2">
                {user.bio}
              </p>
            )}

            {/* Interests */}
            {user.interests && user.interests.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {user.interests.slice(0, 3).map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-1 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent text-xs font-black uppercase"
                  >
                    {interest}
                  </span>
                ))}
                {user.interests.length > 3 && (
                  <span className="px-2 py-1 rounded-full bg-[var(--muted)] text-theme-muted text-xs font-black">
                    +{user.interests.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-[var(--muted)] rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-black text-theme-primary">
                  {user._count.followers}
                </p>
                <p className="text-xs font-bold text-theme-muted uppercase">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-theme-accent">
                  {user._count.projectMemberships}
                </p>
                <p className="text-xs font-bold text-theme-muted uppercase">Projects</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => onFollow(user.id)}
                disabled={isLoadingFollow || !isLoggedIn}
                variant={isFollowing ? 'outline' : 'primary'}
                className="flex-1 font-bold"
              >
                {isLoadingFollow ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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

          {/* Clickable Scroll indicator to Business Card */}
          <button
            onClick={scrollToBusinessCard}
            className="w-full flex items-center justify-center gap-2 py-3 border-t border-[var(--border)] bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors cursor-pointer group"
          >
            <ChevronDown className="w-5 h-5 text-theme-primary animate-bounce group-hover:text-theme-accent" />
            <span className="text-xs font-black text-theme-primary uppercase group-hover:text-theme-accent">
              View Digital Business Card
            </span>
            <ChevronDown className="w-5 h-5 text-theme-primary animate-bounce group-hover:text-theme-accent" />
          </button>

          {/* Digital Business Card Section */}
          <div ref={businessCardRef} className={`m-3 rounded-xl border-4 ${archetype.borderColor} overflow-hidden`}>
            {/* Business Card Header */}
            <div className={`p-3 bg-gradient-to-r ${archetype.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="relative z-10 flex items-center gap-3">
                {/* Mini Avatar */}
                <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden bg-white/20 flex items-center justify-center">
                  {user.image ? (
                    <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-5 h-5 text-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-white">
                  <h4 className="text-xs font-black truncate">
                    {user.name || 'Anonymous'}
                  </h4>
                  <p className="text-[9px] font-bold opacity-80 truncate">
                    {user.headline || archetype.title}
                  </p>
                </div>

                <ArchetypeIcon className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* Business Card Content */}
            <div className="p-3 bg-[var(--card)] space-y-2">
              {/* Declaration */}
              {user.declaration && (
                <div className="text-[10px] font-medium italic text-theme-muted line-clamp-2">
                  "{user.declaration}"
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-1 text-[9px]">
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
              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Infinity className="w-3 h-3 text-theme-muted opacity-70" />
                  <span className="text-[8px] font-bold text-theme-muted uppercase">Stock</span>
                </div>
                <span className={`text-sm font-black ${archetype.accentColor}`}>{stockScore}</span>
              </div>

              {/* Guardian Value Badge */}
              <div className={`p-2 bg-gradient-to-br ${archetype.bgGradient} rounded-lg border ${archetype.borderColor}`}>
                <div className="flex items-center gap-2">
                  <ArchetypeIcon className={`w-3 h-3 ${archetype.accentColor}`} />
                  <span className={`text-[10px] font-black ${archetype.accentColor}`}>{archetype.value}</span>
                </div>
              </div>

              {/* Skills Preview */}
              {user.expertise && user.expertise.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {user.expertise.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-1.5 py-0.5 bg-gradient-to-r ${archetype.gradient} text-white text-[8px] font-bold rounded-full`}
                    >
                      {skill}
                    </span>
                  ))}
                  {user.expertise.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-[var(--muted)] text-theme-muted text-[8px] font-bold rounded-full">
                      +{user.expertise.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Clickable Scroll indicator back to Profile */}
          <button
            onClick={scrollToProfile}
            className="w-full flex items-center justify-center gap-2 py-3 border-t border-[var(--border)] bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors cursor-pointer group mb-2"
          >
            <ChevronUp className="w-5 h-5 text-theme-primary group-hover:text-theme-accent" />
            <span className="text-xs font-black text-theme-primary uppercase group-hover:text-theme-accent">
              Back to Profile
            </span>
            <ChevronUp className="w-5 h-5 text-theme-primary group-hover:text-theme-accent" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
