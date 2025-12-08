'use client'

import { User, MapPin, Mail, Edit2, Sword, MessageCircle, Stethoscope, Lightbulb, HeartHandshake, Flower2, Scale, Phone, Briefcase, Building2, FileText, Sparkles, Heart, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

// Ghost text component for empty fields
function GhostText({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-white/30 italic">{children}</span>
  )
}

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
          <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            {user.image ? (
              <img src={user.image} alt={user.name || ''} className="w-full h-full rounded-xl object-cover" />
            ) : (
              <ArchetypeIcon className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            {archetype ? (
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wide mb-0.5">
                {archetype.title}
              </p>
            ) : (
              <p className="text-[10px] font-bold uppercase tracking-wide mb-0.5">
                <GhostText>Choose Your Guardian</GhostText>
              </p>
            )}
            <h3 className="text-xl font-black text-white truncate">
              {user.name || <GhostText>Your Name</GhostText>}
            </h3>
            <p className="text-sm text-white/80 truncate">
              {userProfile?.headline || <GhostText>Your professional headline</GhostText>}
            </p>
          </div>
        </div>

        {/* Job Title & Company */}
        <div className="flex flex-wrap gap-3 text-xs text-white/80 mb-3">
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {userProfile?.jobTitle || <GhostText>Job Title</GhostText>}
          </span>
          <span className="flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {userProfile?.company || <GhostText>Company</GhostText>}
          </span>
        </div>

        {/* Declaration */}
        <div className="border-t border-white/20 pt-3 mb-3">
          <p className="text-sm italic text-white/90 line-clamp-2">
            {userProfile?.declaration ? (
              `"${userProfile.declaration}"`
            ) : (
              <GhostText>"Your personal declaration or mission statement..."</GhostText>
            )}
          </p>
        </div>

        {/* Bio */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase mb-1">
            <FileText className="w-3 h-3" /> About
          </div>
          <p className="text-xs text-white/80 line-clamp-3">
            {userProfile?.bio || <GhostText>Share a brief bio about yourself, your background, and what drives you...</GhostText>}
          </p>
        </div>

        {/* Expertise */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase mb-1.5">
            <Sparkles className="w-3 h-3" /> Expertise
          </div>
          <div className="flex flex-wrap gap-1.5">
            {userProfile?.expertise && userProfile.expertise.length > 0 ? (
              userProfile.expertise.map((skill, i) => (
                <span key={i} className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-semibold text-white">
                  {skill}
                </span>
              ))
            ) : (
              <>
                <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-semibold text-white/30 italic">Skill 1</span>
                <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-semibold text-white/30 italic">Skill 2</span>
                <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-semibold text-white/30 italic">Skill 3</span>
              </>
            )}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 uppercase mb-1.5">
            <Heart className="w-3 h-3" /> Interests
          </div>
          <div className="flex flex-wrap gap-1.5">
            {userProfile?.interests && userProfile.interests.length > 0 ? (
              userProfile.interests.map((interest, i) => (
                <span key={i} className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-semibold text-white">
                  {interest}
                </span>
              ))
            ) : (
              <>
                <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-semibold text-white/30 italic">Interest 1</span>
                <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-semibold text-white/30 italic">Interest 2</span>
                <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-semibold text-white/30 italic">Interest 3</span>
              </>
            )}
          </div>
        </div>

        {/* Contact info row */}
        <div className="border-t border-white/20 pt-3">
          <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {userProfile?.location || <GhostText>Location</GhostText>}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{user.email || <GhostText>email@example.com</GhostText>}</span>
            </span>
            <span className="flex items-center gap-1.5 col-span-2">
              <Phone className="w-3 h-3 flex-shrink-0" />
              {userProfile?.phone || <GhostText>+1 (555) 000-0000</GhostText>}
            </span>
          </div>
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
