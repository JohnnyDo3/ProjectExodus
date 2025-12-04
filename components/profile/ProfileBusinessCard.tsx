'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  User,
  Mail,
  MapPin,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  Edit2,
  Save,
  X,
  Shield,
  Heart,
  Sparkles,
  Eye,
  Sword,
  MessageCircle,
  Stethoscope,
  Lightbulb,
  HeartHandshake,
  Flower2,
  Scale,
  Crown,
  ScrollText,
  Infinity,
} from 'lucide-react'

/*
 * THE 7 GUARDIANS OF PROJECT EXODUS
 *
 * In the event of the passing of Stefan Rogowski (Code Name: Mr.Nobody)
 * the Guardianship of Project Exodus will be passed unto 7 individuals
 * of equal voting authority.
 *
 * The 7 individuals have the Code Names of the Archangels from scripture.
 * Their titles reflect the values each Archangel represents.
 *
 * Each guardian has the duty and responsibility to hold true the values
 * set forth in: "Mr. Nobody's Project Exodus"
 *
 * - We the People of Project Exodus -
 */

const GUARDIAN_ARCHETYPES = {
  michael: {
    id: 'michael',
    name: 'MICHAEL',
    title: 'Guardian of Strength',
    value: 'STRENGTH',
    description: 'You stand unwavering. Your strength protects those who cannot protect themselves.',
    scripture: 'The one who leads the armies of heaven against darkness.',
    icon: Sword,
    gradient: 'from-red-600 to-orange-500',
    bgGradient: 'from-red-600/20 to-orange-500/10',
    accentColor: 'text-red-500',
    borderColor: 'border-red-500',
    commandments: ['STEWARDSHIP', 'INTEGRITY', 'SUSTAINABILITY'],
  },
  gabriel: {
    id: 'gabriel',
    name: 'GABRIEL',
    title: 'Guardian of Revelation',
    value: 'REVELATION',
    description: 'You bring truth to light. Your words reveal what must be known.',
    scripture: 'The messenger who announces what is to come.',
    icon: MessageCircle,
    gradient: 'from-sky-500 to-blue-600',
    bgGradient: 'from-sky-500/20 to-blue-600/10',
    accentColor: 'text-sky-500',
    borderColor: 'border-sky-500',
    commandments: ['TRANSPARENCY', 'LEGACY', 'EQUITY'],
  },
  raphael: {
    id: 'raphael',
    name: 'RAPHAEL',
    title: 'Guardian of Healing',
    value: 'HEALING',
    description: 'You mend what is broken. Your presence restores and renews.',
    scripture: 'The healer who makes whole what was wounded.',
    icon: Stethoscope,
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-500/20 to-green-600/10',
    accentColor: 'text-emerald-500',
    borderColor: 'border-emerald-500',
    commandments: ['SANCTITY', 'REST', 'BIODIVERSITY'],
  },
  uriel: {
    id: 'uriel',
    name: 'URIEL',
    title: 'Guardian of Wisdom',
    value: 'WISDOM',
    description: 'You illuminate the path. Your wisdom guides those who seek understanding.',
    scripture: 'The light of God who reveals divine truth.',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-yellow-500',
    bgGradient: 'from-amber-500/20 to-yellow-500/10',
    accentColor: 'text-amber-500',
    borderColor: 'border-amber-500',
    commandments: ['LEGACY', 'TRANSPARENCY', 'STEWARDSHIP'],
  },
  camael: {
    id: 'camael',
    name: 'CAMAEL',
    title: 'Guardian of Love',
    value: 'LOVE',
    description: 'You embody compassion. Your love connects all beings as one.',
    scripture: 'The one who sees God through the heart.',
    icon: HeartHandshake,
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-500/20 to-rose-600/10',
    accentColor: 'text-pink-500',
    borderColor: 'border-pink-500',
    commandments: ['LOYALTY', 'EQUITY', 'SANCTITY'],
  },
  jophiel: {
    id: 'jophiel',
    name: 'JOPHIEL',
    title: 'Guardian of Beauty',
    value: 'BEAUTY',
    description: 'You see the divine in all things. Your vision transforms the ordinary into the sacred.',
    scripture: 'The beauty of God who adorns creation.',
    icon: Flower2,
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-500/20 to-purple-600/10',
    accentColor: 'text-violet-500',
    borderColor: 'border-violet-500',
    commandments: ['BIODIVERSITY', 'SUSTAINABILITY', 'REST'],
  },
  zadkiel: {
    id: 'zadkiel',
    name: 'ZADKIEL',
    title: 'Guardian of Mercy',
    value: 'MERCY',
    description: 'You forgive the unforgivable. Your mercy grants second chances.',
    scripture: 'The righteousness of God who liberates the bound.',
    icon: Scale,
    gradient: 'from-indigo-500 to-blue-700',
    bgGradient: 'from-indigo-500/20 to-blue-700/10',
    accentColor: 'text-indigo-500',
    borderColor: 'border-indigo-500',
    commandments: ['INTEGRITY', 'LOYALTY', 'LEGACY'],
  },
}

type ArchetypeType = keyof typeof GUARDIAN_ARCHETYPES

interface ProfileBusinessCardProps {
  userId: string
}

interface ProfileData {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  bio: string
  skills: string[]
  experience: any[]
  education: any[]
  social: {
    website?: string
    github?: string
    linkedin?: string
    twitter?: string
  }
  portfolio: any[]
  achievements: any[]
  resumeUrl?: string
  resumeFileName?: string
  // STOCK data - The measure of contribution
  projectsCreated?: number
  projectsJoined?: number
  articlesWritten?: number
  modulesCompleted?: number
  followers?: number
  following?: number
  connectionsCount?: number
  // User's chosen archetype
  archetype?: ArchetypeType
  // User's personal declaration - their truth materialized
  declaration?: string
  // Years of contribution
  memberSince?: string
}

// Ghost Placeholder - Shows what COULD be, inviting completion
function GhostField({
  label,
  icon: Icon,
  placeholder,
  isEditing,
  value,
  onChange,
  type = 'text'
}: {
  label: string
  icon: any
  placeholder: string
  isEditing: boolean
  value?: string
  onChange?: (value: string) => void
  type?: 'text' | 'textarea'
}) {
  const hasValue = value && value.trim().length > 0

  if (isEditing) {
    return (
      <div className="group">
        <label className="text-[10px] font-black text-theme-muted uppercase mb-1 block">{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm font-medium text-[var(--foreground)] focus:outline-none focus:border-theme-primary resize-none"
            rows={3}
          />
        ) : (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm font-medium text-[var(--foreground)] focus:outline-none focus:border-theme-primary"
          />
        )}
      </div>
    )
  }

  if (hasValue) {
    return (
      <div className="flex items-start gap-2">
        <Icon className="w-4 h-4 text-theme-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] font-black text-theme-muted uppercase">{label}</p>
          <p className="text-sm font-medium text-[var(--foreground)]">{value}</p>
        </div>
      </div>
    )
  }

  // Ghost state - the potential waiting to be fulfilled
  return (
    <div className="flex items-start gap-2 opacity-30 hover:opacity-50 transition-opacity cursor-default group">
      <Icon className="w-4 h-4 text-theme-muted mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-[10px] font-black text-theme-muted uppercase">{label}</p>
        <p className="text-sm font-medium text-theme-muted italic border-b border-dashed border-theme-muted">
          {placeholder}
        </p>
      </div>
    </div>
  )
}

export function ProfileBusinessCard({ userId }: ProfileBusinessCardProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeType>('michael')
  const [editedProfile, setEditedProfile] = useState<Partial<ProfileData>>({})
  const [isSaving, setIsSaving] = useState(false)
  const expandedSectionRef = useRef<HTMLDivElement>(null)

  const isOwnProfile = session?.user?.id === userId

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/profile/${userId}`)
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            const profileData: ProfileData = {
              name: data.data.name || '',
              headline: data.data.headline || data.data.jobTitle || '',
              location: data.data.location || '',
              email: data.data.email || '',
              phone: '',
              bio: data.data.bio || '',
              skills: data.data.expertise || data.data.skills || [],
              experience: data.data.experience || [],
              education: data.data.education || [],
              social: {
                website: data.data.website,
                linkedin: data.data.linkedin,
                twitter: data.data.twitter,
              },
              portfolio: data.data.projects || [],
              achievements: data.data.honors || [],
              resumeUrl: data.data.resume,
              resumeFileName: data.data.resume ? 'resume.pdf' : undefined,
              archetype: data.data.guardianArchetype || 'michael',
              declaration: data.data.declaration || '',
              memberSince: data.data.createdAt,
            }
            setProfile(profileData)
            setEditedProfile(profileData)
            setSelectedArchetype(profileData.archetype || 'michael')
          }
        }

        // Fetch STOCK data (contributions)
        const stockRes = await fetch(`/api/users/${userId}`)
        if (stockRes.ok) {
          const stockData = await stockRes.json()
          if (stockData.success) {
            setProfile(prev => prev ? {
              ...prev,
              projectsCreated: stockData.data._count?.createdProjects || 0,
              articlesWritten: stockData.data._count?.articles || 0,
              followers: stockData.data._count?.followers || 0,
              following: stockData.data._count?.following || 0,
            } : null)
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserProfile()
  }, [userId])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editedProfile,
          guardianArchetype: selectedArchetype,
        }),
      })

      if (res.ok) {
        setProfile(prev => prev ? { ...prev, ...editedProfile, archetype: selectedArchetype } : null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="border-4 border-theme-accent overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-theme-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-bold text-theme-muted">Loading identity...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return null
  }

  const archetype = GUARDIAN_ARCHETYPES[selectedArchetype]
  const ArchetypeIcon = archetype.icon
  const hasSocialLinks = profile.social.website || profile.social.linkedin || profile.social.twitter

  // Calculate STOCK score - The measure of one's contribution to Project Exodus
  // This determines eligibility for Guardianship
  const stockScore = (profile.projectsCreated || 0) * 10 +
                     (profile.articlesWritten || 0) * 5 +
                     (profile.modulesCompleted || 0) * 3 +
                     (profile.followers || 0) * 1 +
                     (profile.connectionsCount || 0) * 2

  // Calculate years of contribution
  const memberYears = profile.memberSince
    ? Math.floor((Date.now() - new Date(profile.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0

  return (
    <Card className={`border-4 ${archetype.borderColor} overflow-hidden`}>
      {/* Sacred Header */}
      <div className={`px-6 py-5 bg-gradient-to-r ${archetype.gradient} relative overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
              <ArchetypeIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Identity Declaration</p>
              </div>
              <h2 className="text-2xl font-black text-white tracking-wide">{profile.name || 'Anonymous'}</h2>
              <p className="text-sm font-medium text-white/90">{archetype.title} • {archetype.value}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwnProfile && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
                title="Edit your declaration"
              >
                <Edit2 className="w-5 h-5 text-white" />
              </button>
            )}
            {isEditing && (
              <>
                <button
                  onClick={() => { setIsEditing(false); setSelectedArchetype(profile.archetype || 'michael') }}
                  className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-2.5 bg-white/30 hover:bg-white/40 rounded-xl transition-colors"
                >
                  <Save className="w-5 h-5 text-white" />
                </button>
              </>
            )}
            <button
              onClick={() => {
                const newExpanded = !isExpanded
                setIsExpanded(newExpanded)
                // Scroll to expanded content after state update
                if (newExpanded) {
                  setTimeout(() => {
                    expandedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 100)
                }
              }}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Guardian Archetype Selector */}
        {isEditing && (
          <div className="relative mt-5 pt-5 border-t border-white/20">
            <p className="text-xs font-black text-white/80 uppercase tracking-wider mb-3">
              Choose Your Guardian Value
            </p>
            <div className="grid grid-cols-7 gap-2">
              {Object.values(GUARDIAN_ARCHETYPES).map((a) => {
                const AIcon = a.icon
                const isSelected = selectedArchetype === a.id
                return (
                  <button
                    key={a.id}
                    onClick={() => setSelectedArchetype(a.id as ArchetypeType)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-white text-gray-900 shadow-lg scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    title={`${a.name}: ${a.value}`}
                  >
                    <AIcon className="w-5 h-5" />
                    <span className="text-[9px] font-black">{a.value}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Main Identity Card */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Core Identity */}
          <div className={`flex-shrink-0 p-6 bg-gradient-to-br ${archetype.gradient} rounded-2xl text-white lg:min-w-[320px] relative overflow-hidden`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />

            <div className="relative">
              {/* Avatar and Name */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center border-2 border-white/30 backdrop-blur-sm">
                  <User className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name || ''}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="text-xl font-black bg-transparent border-b-2 border-white/50 focus:border-white outline-none w-full mb-1 placeholder-white/50"
                      placeholder="Your Name"
                    />
                  ) : (
                    <h3 className="text-xl font-black">{profile.name || 'Anonymous'}</h3>
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.headline || ''}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, headline: e.target.value }))}
                      className="text-sm font-medium bg-transparent border-b border-white/30 focus:border-white/50 outline-none w-full opacity-90 placeholder-white/50"
                      placeholder="Your role or calling"
                    />
                  ) : (
                    <p className="text-sm font-medium opacity-90">{profile.headline || archetype.title}</p>
                  )}
                </div>
              </div>

              {/* The Declaration - Their truth materialized */}
              <div className="mb-5 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <ScrollText className="w-4 h-4 opacity-70" />
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-wider">My Declaration</p>
                </div>
                {isEditing ? (
                  <textarea
                    value={editedProfile.declaration || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, declaration: e.target.value }))}
                    className="w-full text-sm font-medium bg-transparent border-b border-white/30 focus:border-white/50 outline-none italic resize-none placeholder-white/50"
                    placeholder="What truth do you carry? What do you stand for at Project Exodus?"
                    rows={2}
                  />
                ) : profile.declaration ? (
                  <p className="text-sm font-medium italic leading-relaxed">"{profile.declaration}"</p>
                ) : (
                  <p className="text-sm font-medium italic opacity-40 border-b border-dashed border-white/30">
                    "Speak your truth into existence..."
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm mb-5">
                {(profile.location || isEditing) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 opacity-75" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location || ''}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-transparent border-b border-white/30 focus:border-white/50 outline-none flex-1 placeholder-white/50"
                        placeholder="Your location"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                )}
                {!profile.location && !isEditing && (
                  <div className="flex items-center gap-2 opacity-30">
                    <MapPin className="w-4 h-4" />
                    <span className="italic border-b border-dashed border-white/50">Add your location</span>
                  </div>
                )}

                {profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 opacity-75" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>

              {/* YOUR STOCK - The measure of contribution */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Infinity className="w-5 h-5 opacity-70" />
                    <p className="text-[10px] font-black uppercase opacity-70 tracking-wider">Your Stock</p>
                  </div>
                  <p className="text-3xl font-black">{stockScore}</p>
                </div>
                <p className="text-[10px] font-medium opacity-60 text-right">
                  Contribution to Project Exodus
                </p>
                {memberYears > 0 && (
                  <p className="text-[10px] font-bold opacity-50 text-right mt-1">
                    {memberYears} year{memberYears > 1 ? 's' : ''} of service
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Values & Contributions */}
          <div className="flex-1 space-y-5">
            {/* Guardian Value */}
            <div className={`p-4 bg-gradient-to-br ${archetype.bgGradient} rounded-xl border-2 ${archetype.borderColor}`}>
              <div className="flex items-center gap-3 mb-2">
                <ArchetypeIcon className={`w-6 h-6 ${archetype.accentColor}`} />
                <div>
                  <p className="text-xs font-black text-theme-muted uppercase">I Embody</p>
                  <p className={`text-lg font-black ${archetype.accentColor}`}>{archetype.value}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-theme-muted italic">{archetype.description}</p>
            </div>

            {/* Commandments Alignment */}
            <div>
              <h4 className="text-xs font-black text-theme-muted uppercase mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Values Alignment
              </h4>
              <div className="flex flex-wrap gap-2">
                {archetype.commandments.map((value, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 bg-gradient-to-r ${archetype.gradient} text-white text-xs font-bold rounded-full`}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="text-xs font-black text-theme-muted uppercase mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Expertise
              </h4>
              {profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.slice(0, 6).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 6 && (
                    <span className="px-3 py-1 bg-[var(--muted)] text-theme-muted text-xs font-bold rounded-full">
                      +{profile.skills.length - 6} more
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 opacity-30">
                  {['Your skill', 'Another skill', 'More skills'].map((ghost, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 border-2 border-dashed border-theme-muted text-theme-muted text-xs font-bold rounded-full italic"
                    >
                      {ghost}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* STOCK Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[var(--muted)] rounded-xl">
                <p className={`text-2xl font-black ${archetype.accentColor}`}>{profile.projectsCreated || 0}</p>
                <p className="text-[10px] font-bold text-theme-muted uppercase">Projects Built</p>
              </div>
              <div className="p-3 bg-[var(--muted)] rounded-xl">
                <p className={`text-2xl font-black ${archetype.accentColor}`}>{profile.articlesWritten || 0}</p>
                <p className="text-[10px] font-bold text-theme-muted uppercase">Articles Written</p>
              </div>
              <div className="p-3 bg-[var(--muted)] rounded-xl">
                <p className={`text-2xl font-black ${archetype.accentColor}`}>{profile.followers || 0}</p>
                <p className="text-[10px] font-bold text-theme-muted uppercase">Followers</p>
              </div>
              <div className="p-3 bg-[var(--muted)] rounded-xl">
                <p className={`text-2xl font-black ${archetype.accentColor}`}>{profile.modulesCompleted || 0}</p>
                <p className="text-[10px] font-bold text-theme-muted uppercase">Modules Completed</p>
              </div>
            </div>

            {/* Social Links */}
            {hasSocialLinks && (
              <div className="flex flex-wrap gap-2">
                {profile.social.website && (
                  <a
                    href={profile.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-[var(--muted)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors text-sm font-bold"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
                {profile.social.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-[var(--muted)] rounded-lg hover:bg-[#0077b5] hover:text-white transition-colors text-sm font-bold"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {profile.social.twitter && (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-[var(--muted)] rounded-lg hover:bg-[#1da1f2] hover:text-white transition-colors text-sm font-bold"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                )}
              </div>
            )}
            {!hasSocialLinks && (
              <div className="flex flex-wrap gap-2 opacity-30">
                <span className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-theme-muted rounded-lg text-sm font-bold text-theme-muted italic">
                  <Globe className="w-4 h-4" />
                  Add website
                </span>
                <span className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-theme-muted rounded-lg text-sm font-bold text-theme-muted italic">
                  <Linkedin className="w-4 h-4" />
                  Add LinkedIn
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Section - Full Profile */}
        {isExpanded && (
          <div ref={expandedSectionRef} className="mt-6 pt-6 border-t-2 border-[var(--border)]">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bio */}
              <div>
                <GhostField
                  label="About Me"
                  icon={User}
                  placeholder="Tell others about your journey and purpose..."
                  isEditing={isEditing}
                  value={isEditing ? editedProfile.bio : profile.bio}
                  onChange={(value) => setEditedProfile(prev => ({ ...prev, bio: value }))}
                  type="textarea"
                />
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <Briefcase className={`w-4 h-4 ${archetype.accentColor}`} />
                  Experience
                </h4>
                {profile.experience.length > 0 ? (
                  <div className="space-y-3">
                    {profile.experience.slice(0, 2).map((exp: any, idx: number) => (
                      <div key={idx} className={`border-l-2 ${archetype.borderColor} pl-3`}>
                        <h5 className="text-sm font-black text-[var(--foreground)]">{exp.title}</h5>
                        <p className="text-xs font-bold text-theme-muted">{exp.company}</p>
                        <p className="text-[10px] font-medium text-theme-muted">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 opacity-30">
                    <div className="border-l-2 border-dashed border-theme-muted pl-3">
                      <p className="text-sm font-black text-theme-muted italic">Your Position</p>
                      <p className="text-xs font-bold text-theme-muted italic">Organization</p>
                      <p className="text-[10px] font-medium text-theme-muted">Add your experience...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Education */}
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <GraduationCap className={`w-4 h-4 ${archetype.accentColor}`} />
                  Education
                </h4>
                {profile.education.length > 0 ? (
                  <div className="space-y-3">
                    {profile.education.slice(0, 2).map((edu: any, idx: number) => (
                      <div key={idx} className={`border-l-2 ${archetype.borderColor} pl-3`}>
                        <h5 className="text-sm font-black text-[var(--foreground)]">{edu.degree}</h5>
                        <p className="text-xs font-bold text-theme-muted">{edu.school}</p>
                        <p className="text-[10px] font-medium text-theme-muted">{edu.graduationYear}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 opacity-30">
                    <div className="border-l-2 border-dashed border-theme-muted pl-3">
                      <p className="text-sm font-black text-theme-muted italic">Degree / Certification</p>
                      <p className="text-xs font-bold text-theme-muted italic">Institution</p>
                      <p className="text-[10px] font-medium text-theme-muted">Add your education...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <Award className={`w-4 h-4 ${archetype.accentColor}`} />
                  Achievements
                </h4>
                {profile.achievements.length > 0 ? (
                  <div className="space-y-2">
                    {profile.achievements.slice(0, 3).map((achievement: any, idx: number) => (
                      <div key={idx} className="p-2 bg-[var(--muted)] rounded-lg">
                        <h5 className="text-xs font-black text-[var(--foreground)]">{achievement.title}</h5>
                        <p className="text-[10px] font-medium text-theme-muted">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 opacity-30">
                    <div className="p-2 border-2 border-dashed border-theme-muted rounded-lg">
                      <p className="text-xs font-black text-theme-muted italic">Your Achievement</p>
                      <p className="text-[10px] font-medium text-theme-muted">Add your achievements...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName || 'resume.pdf'}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${archetype.gradient} text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-bold`}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-theme-muted rounded-lg text-sm font-bold text-theme-muted opacity-30 italic">
                  <FileText className="w-4 h-4" />
                  Upload your resume
                </span>
              )}
            </div>
          </div>
        )}

        {/* Sacred Footer */}
        <div className="mt-6 pt-5 border-t-2 border-[var(--border)]">
          <div className="text-center">
            <p className="text-xs font-medium text-theme-muted italic mb-1">
              "{archetype.scripture}"
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${archetype.gradient}`} />
              <p className="text-[10px] font-black text-theme-muted uppercase tracking-widest">
                We the People of Project Exodus
              </p>
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${archetype.gradient}`} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
