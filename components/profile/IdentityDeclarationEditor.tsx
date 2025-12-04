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
  Github,
  Linkedin,
  Twitter,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Download,
  Upload,
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
  Plus,
  Trash2,
  Maximize2,
  Minimize2,
  Check,
  AlertTriangle,
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

interface Experience {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
}

interface Education {
  id: string
  degree: string
  school: string
  fieldOfStudy?: string
  startYear?: string
  endYear?: string
  description?: string
}

interface Achievement {
  id: string
  title: string
  description?: string
  date?: string
}

interface Portfolio {
  id: string
  title: string
  description?: string
  link: string
}

interface ProfileData {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  bio: string
  skills: string[]
  experience: Experience[]
  education: Education[]
  social: {
    website?: string
    github?: string
    linkedin?: string
    twitter?: string
  }
  portfolio: Portfolio[]
  achievements: Achievement[]
  resumeUrl?: string
  resumeFileName?: string
  // STOCK data
  projectsCreated?: number
  projectsJoined?: number
  articlesWritten?: number
  modulesCompleted?: number
  followers?: number
  following?: number
  connectionsCount?: number
  // Guardian data
  archetype?: ArchetypeType
  declaration?: string
  memberSince?: string
}

type EditSection = 'basic' | 'declaration' | 'skills' | 'experience' | 'education' | 'social' | 'portfolio' | 'achievements' | 'resume' | null

interface Props {
  initialProfile?: Partial<ProfileData>
}

export function IdentityDeclarationEditor({ initialProfile }: Props) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeType>('michael')
  const [isSaving, setIsSaving] = useState(false)
  const [editingSection, setEditingSection] = useState<EditSection>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showCloseWarning, setShowCloseWarning] = useState(false)
  const [originalFullScreenData, setOriginalFullScreenData] = useState<{
    profile: ProfileData
    archetype: ArchetypeType
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<ProfileData>({
    name: initialProfile?.name || '',
    headline: initialProfile?.headline || '',
    location: initialProfile?.location || '',
    email: initialProfile?.email || '',
    phone: initialProfile?.phone || '',
    bio: initialProfile?.bio || '',
    skills: initialProfile?.skills || [],
    experience: initialProfile?.experience || [],
    education: initialProfile?.education || [],
    social: initialProfile?.social || {},
    portfolio: initialProfile?.portfolio || [],
    achievements: initialProfile?.achievements || [],
    resumeUrl: initialProfile?.resumeUrl,
    resumeFileName: initialProfile?.resumeFileName,
    archetype: (initialProfile as any)?.archetype || 'michael',
    declaration: (initialProfile as any)?.declaration || '',
    memberSince: (initialProfile as any)?.memberSince,
  })

  const [editBuffer, setEditBuffer] = useState<Partial<ProfileData>>({})

  // Fetch user profile data
  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile()
    }
  }, [session?.user?.id])

  // Capture original values when entering fullscreen mode
  useEffect(() => {
    if (isFullScreen && !originalFullScreenData) {
      setOriginalFullScreenData({
        profile: { ...profile },
        archetype: selectedArchetype,
      })
      setHasUnsavedChanges(false)
    } else if (!isFullScreen) {
      setOriginalFullScreenData(null)
    }
  }, [isFullScreen])

  // Handler for attempting to close fullscreen
  const handleCloseFullScreen = () => {
    if (hasUnsavedChanges) {
      setShowCloseWarning(true)
    } else {
      setIsFullScreen(false)
    }
  }

  // Discard changes and close fullscreen
  const handleDiscardAndClose = () => {
    if (originalFullScreenData) {
      setProfile(originalFullScreenData.profile)
      setSelectedArchetype(originalFullScreenData.archetype)
    }
    setHasUnsavedChanges(false)
    setShowCloseWarning(false)
    setIsFullScreen(false)
  }

  // Save changes and close fullscreen
  const handleSaveAndClose = async () => {
    await handleSave()
    setShowCloseWarning(false)
    setIsFullScreen(false)
  }

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const [profileRes, statsRes] = await Promise.all([
        fetch(`/api/profile/${session?.user?.id}`),
        fetch(`/api/users/${session?.user?.id}`)
      ])

      if (profileRes.ok) {
        const data = await profileRes.json()
        if (data.success) {
          const profileData: ProfileData = {
            name: data.data.name || '',
            headline: data.data.headline || data.data.jobTitle || '',
            location: data.data.location || '',
            email: data.data.email || '',
            phone: data.data.phone || '',
            bio: data.data.bio || '',
            skills: data.data.expertise || data.data.skills || [],
            experience: data.data.experience || [],
            education: data.data.education || [],
            social: {
              website: data.data.website,
              github: data.data.github,
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
          setSelectedArchetype(profileData.archetype || 'michael')
        }
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        if (statsData.success) {
          setProfile(prev => ({
            ...prev,
            projectsCreated: statsData.data._count?.createdProjects || 0,
            articlesWritten: statsData.data._count?.articles || 0,
            followers: statsData.data._count?.followers || 0,
            following: statsData.data._count?.following || 0,
          }))
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          headline: profile.headline,
          bio: profile.bio,
          location: profile.location,
          phone: profile.phone,
          website: profile.social.website,
          linkedin: profile.social.linkedin,
          twitter: profile.social.twitter,
          expertise: profile.skills,
          experience: profile.experience,
          education: profile.education,
          honors: profile.achievements,
          guardianArchetype: selectedArchetype,
          declaration: profile.declaration,
        }),
      })

      if (res.ok) {
        // Update profile.archetype to match selectedArchetype
        setProfile(prev => ({ ...prev, archetype: selectedArchetype }))
        setHasUnsavedChanges(false)
        setEditingSection(null)
      } else {
        const errorData = await res.json()
        console.error('Save failed:', errorData)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleFieldChange = (field: keyof ProfileData, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
  }

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('resume', file)

    try {
      const res = await fetch('/api/profile/resume/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setProfile(prev => ({
          ...prev,
          resumeUrl: data.url,
          resumeFileName: file.name,
        }))
        setHasUnsavedChanges(true)
      }
    } catch (error) {
      console.error('Error uploading resume:', error)
    }
  }

  // Calculate STOCK score
  const stockScore = (profile.projectsCreated || 0) * 10 +
                     (profile.articlesWritten || 0) * 5 +
                     (profile.modulesCompleted || 0) * 3 +
                     (profile.followers || 0) * 1 +
                     (profile.connectionsCount || 0) * 2

  const memberYears = profile.memberSince
    ? Math.floor((Date.now() - new Date(profile.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0

  const archetype = GUARDIAN_ARCHETYPES[selectedArchetype]
  const ArchetypeIcon = archetype.icon
  const hasSocialLinks = profile.social.website || profile.social.linkedin || profile.social.twitter || profile.social.github

  if (isLoading) {
    return (
      <div className="flex-shrink-0 w-96 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg items-center justify-center">
        <div className="w-12 h-12 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-theme-muted">Loading your identity...</p>
      </div>
    )
  }

  // Compact column view
  if (!isFullScreen) {
    return (
      <div className={`flex-shrink-0 w-96 h-full flex flex-col bg-[var(--card)] rounded-2xl border-4 ${archetype.borderColor} shadow-lg overflow-hidden`}>
        {/* Header */}
        <div className={`p-4 bg-gradient-to-r ${archetype.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <ArchetypeIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-white/70 uppercase tracking-wider">Identity Declaration</p>
                <h2 className="text-sm font-black text-white">{profile.name || session?.user?.name || 'Your Username'}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-2 bg-white text-[var(--earth-900)] hover:bg-white/90 rounded-lg transition-colors"
                  title="Save changes"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-[var(--earth-900)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                onClick={() => setIsFullScreen(true)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Expand to edit"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Profile Card - Editable */}
          <div className={`p-4 bg-gradient-to-br ${archetype.gradient} rounded-xl text-white relative`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center border-2 border-white/30">
                <User className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="Your Name"
                  className="w-full text-sm font-black bg-transparent border-b border-transparent hover:border-white/30 focus:border-white focus:outline-none placeholder:text-white/40"
                />
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => handleFieldChange('headline', e.target.value)}
                  placeholder={archetype.title}
                  className="w-full text-[10px] font-medium bg-transparent border-b border-transparent hover:border-white/30 focus:border-white focus:outline-none opacity-90 placeholder:opacity-40"
                />
              </div>
            </div>

            {/* Declaration - Editable */}
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm mb-3">
              <p className="text-[9px] font-bold opacity-70 uppercase mb-1">My Declaration</p>
              <textarea
                value={profile.declaration || ''}
                onChange={(e) => handleFieldChange('declaration', e.target.value)}
                placeholder="Speak your truth..."
                rows={2}
                className="w-full text-[11px] font-medium italic leading-relaxed bg-transparent resize-none border-b border-transparent hover:border-white/30 focus:border-white focus:outline-none placeholder:opacity-40"
              />
            </div>

            {/* Contact - Editable */}
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-2 opacity-90">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="Add phone number..."
                  className="flex-1 bg-transparent border-b border-transparent hover:border-white/30 focus:border-white focus:outline-none placeholder:opacity-40"
                />
              </div>
              <div className="flex items-center gap-2 opacity-90">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{profile.email || 'No email set'}</span>
              </div>
            </div>

            {/* STOCK */}
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Infinity className="w-4 h-4 opacity-70" />
                <span className="text-[9px] font-bold opacity-70 uppercase">Your Stock</span>
              </div>
              <span className="text-lg font-black">{stockScore}</span>
            </div>
          </div>

          {/* Guardian Value */}
          <div className={`p-3 bg-gradient-to-br ${archetype.bgGradient} rounded-xl border-2 ${archetype.borderColor}`}>
            <div className="flex items-center gap-2 mb-1">
              <ArchetypeIcon className={`w-4 h-4 ${archetype.accentColor}`} />
              <span className={`text-xs font-black ${archetype.accentColor}`}>{archetype.value}</span>
            </div>
            <p className="text-[10px] font-medium text-theme-muted italic">{archetype.description}</p>
          </div>

          {/* Skills Preview */}
          <div>
            <h4 className="text-[10px] font-black text-theme-muted uppercase mb-2">Expertise</h4>
            {profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {profile.skills.slice(0, 4).map((skill, idx) => (
                  <span key={idx} className={`px-2 py-0.5 bg-gradient-to-r ${archetype.gradient} text-white text-[9px] font-bold rounded-full`}>
                    {skill}
                  </span>
                ))}
                {profile.skills.length > 4 && (
                  <span className="px-2 py-0.5 bg-[var(--muted)] text-theme-muted text-[9px] font-bold rounded-full">
                    +{profile.skills.length - 4}
                  </span>
                )}
              </div>
            ) : (
              <p className="text-[10px] font-medium text-theme-muted opacity-50 italic">Add your skills...</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-[var(--muted)] rounded-lg text-center">
              <p className={`text-lg font-black ${archetype.accentColor}`}>{profile.projectsCreated || 0}</p>
              <p className="text-[8px] font-bold text-theme-muted uppercase">Projects</p>
            </div>
            <div className="p-2 bg-[var(--muted)] rounded-lg text-center">
              <p className={`text-lg font-black ${archetype.accentColor}`}>{profile.articlesWritten || 0}</p>
              <p className="text-[8px] font-bold text-theme-muted uppercase">Articles</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-3 border-t-2 ${archetype.borderColor} bg-gradient-to-r ${archetype.bgGradient}`}>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${archetype.gradient}`} />
            <p className="text-[8px] font-black text-theme-muted uppercase tracking-widest">
              We the People of Project Exodus
            </p>
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${archetype.gradient}`} />
          </div>
        </div>
      </div>
    )
  }

  // Full screen edit mode
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      {/* Unsaved Changes Warning Dialog */}
      {showCloseWarning && (
        <div className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[var(--card)] rounded-2xl border-4 border-amber-500 shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[var(--foreground)]">Unsaved Changes</h3>
                <p className="text-sm text-theme-muted">You have unsaved changes to your identity declaration.</p>
              </div>
            </div>
            <p className="text-sm text-theme-muted mb-6">
              Would you like to save your changes before closing?
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSaveAndClose}
                disabled={isSaving}
                className={`w-full py-3 bg-gradient-to-r ${archetype.gradient} text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? 'Saving...' : 'Save & Close'}
              </button>
              <button
                onClick={handleDiscardAndClose}
                className="w-full py-3 bg-red-500/10 text-red-500 border-2 border-red-500 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-colors"
              >
                Discard Changes
              </button>
              <button
                onClick={() => setShowCloseWarning(false)}
                className="w-full py-3 bg-[var(--muted)] text-[var(--foreground)] rounded-xl font-bold text-sm hover:bg-[var(--muted)]/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`w-full max-w-5xl bg-[var(--card)] rounded-2xl border-4 ${archetype.borderColor} shadow-2xl max-h-[95vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className={`px-6 py-5 bg-gradient-to-r ${archetype.gradient} relative overflow-hidden flex-shrink-0`}>
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
                  <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Edit Your Identity Declaration</p>
                </div>
                <h2 className="text-2xl font-black text-white tracking-wide">{profile.name || session?.user?.name || 'Your Username'}</h2>
                <p className="text-sm font-medium text-white/90">{archetype.title} - {archetype.value}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-white text-[var(--earth-900)] rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/90 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
              <button
                onClick={handleCloseFullScreen}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                title="Close editor"
              >
                <Minimize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Guardian Archetype Selector */}
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
                    onClick={() => {
                      setSelectedArchetype(a.id as ArchetypeType)
                      setProfile(prev => ({ ...prev, archetype: a.id as ArchetypeType }))
                      setHasUnsavedChanges(true)
                    }}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-white text-[var(--earth-900)] shadow-lg scale-105'
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
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Preview Card */}
            <div className="space-y-6">
              {/* Identity Card Preview */}
              <div className={`p-6 bg-gradient-to-br ${archetype.gradient} rounded-2xl text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-wider mb-4">Preview - How others see you</p>

                {/* Avatar and Name */}
                <div className="relative flex items-center gap-4 mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center border-2 border-white/30 backdrop-blur-sm">
                    <User className="w-10 h-10" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black">{profile.name || 'Anonymous'}</h3>
                    <p className="text-sm font-medium opacity-90">{profile.headline || archetype.title}</p>
                  </div>
                </div>

                {/* Declaration */}
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <ScrollText className="w-4 h-4 opacity-70" />
                    <p className="text-[10px] font-black uppercase opacity-70 tracking-wider">My Declaration</p>
                  </div>
                  {profile.declaration ? (
                    <p className="text-sm font-medium italic leading-relaxed">"{profile.declaration}"</p>
                  ) : (
                    <p className="text-sm font-medium italic opacity-40 border-b border-dashed border-white/30">
                      "Speak your truth into existence..."
                    </p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm mb-5">
                  {profile.phone ? (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 opacity-75" />
                      <span>{profile.phone}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 opacity-30">
                      <Phone className="w-4 h-4" />
                      <span className="italic border-b border-dashed border-white/50">Add your phone number</span>
                    </div>
                  )}
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 opacity-75" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                </div>

                {/* STOCK Score */}
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

              {/* STOCK Breakdown */}
              <div className="grid grid-cols-4 gap-3">
                <div className={`p-3 bg-gradient-to-br ${archetype.bgGradient} rounded-xl border-2 ${archetype.borderColor}`}>
                  <p className={`text-2xl font-black ${archetype.accentColor}`}>{profile.projectsCreated || 0}</p>
                  <p className="text-[10px] font-bold text-theme-muted uppercase">Projects</p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${archetype.bgGradient} rounded-xl border-2 ${archetype.borderColor}`}>
                  <p className={`text-2xl font-black ${archetype.accentColor}`}>{profile.articlesWritten || 0}</p>
                  <p className="text-[10px] font-bold text-theme-muted uppercase">Articles</p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${archetype.bgGradient} rounded-xl border-2 ${archetype.borderColor}`}>
                  <p className={`text-2xl font-black ${archetype.accentColor}`}>{profile.followers || 0}</p>
                  <p className="text-[10px] font-bold text-theme-muted uppercase">Followers</p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${archetype.bgGradient} rounded-xl border-2 ${archetype.borderColor}`}>
                  <p className={`text-2xl font-black ${archetype.accentColor}`}>{profile.modulesCompleted || 0}</p>
                  <p className="text-[10px] font-bold text-theme-muted uppercase">Modules</p>
                </div>
              </div>
            </div>

            {/* Right Column - Edit Fields */}
            <div className="space-y-6">
              {/* Basic Info */}
              <EditSection
                title="Basic Information"
                icon={User}
                archetype={archetype}
                isEditing={editingSection === 'basic'}
                onToggle={() => setEditingSection(editingSection === 'basic' ? null : 'basic')}
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-theme-muted uppercase mb-1 block">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-theme-muted uppercase mb-1 block">Headline / Role</label>
                    <input
                      type="text"
                      value={profile.headline}
                      onChange={(e) => handleFieldChange('headline', e.target.value)}
                      placeholder="e.g., Software Engineer at Company"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-theme-muted uppercase mb-1 block">Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => handleFieldChange('location', e.target.value)}
                      placeholder="City, Country"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-theme-muted uppercase mb-1 block">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                </div>
              </EditSection>

              {/* Declaration */}
              <EditSection
                title="Your Declaration"
                icon={ScrollText}
                archetype={archetype}
                isEditing={editingSection === 'declaration'}
                onToggle={() => setEditingSection(editingSection === 'declaration' ? null : 'declaration')}
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-theme-muted uppercase mb-1 block">About / Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleFieldChange('bio', e.target.value)}
                      placeholder="Tell others about your journey and purpose..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-theme-muted uppercase mb-1 block">Personal Declaration</label>
                    <p className="text-[10px] text-theme-muted mb-2">This is your sacred truth - what you stand for at Project Exodus</p>
                    <textarea
                      value={profile.declaration}
                      onChange={(e) => handleFieldChange('declaration', e.target.value)}
                      placeholder="What truth do you carry? What do you stand for? Speak your truth into existence..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary resize-none italic"
                    />
                  </div>
                </div>
              </EditSection>

              {/* Skills */}
              <EditSection
                title="Expertise & Skills"
                icon={Sparkles}
                archetype={archetype}
                isEditing={editingSection === 'skills'}
                onToggle={() => setEditingSection(editingSection === 'skills' ? null : 'skills')}
              >
                <SkillsEditor
                  skills={profile.skills}
                  onChange={(skills) => handleFieldChange('skills', skills)}
                  archetype={archetype}
                />
              </EditSection>

              {/* Experience */}
              <EditSection
                title="Experience"
                icon={Briefcase}
                archetype={archetype}
                isEditing={editingSection === 'experience'}
                onToggle={() => setEditingSection(editingSection === 'experience' ? null : 'experience')}
              >
                <ExperienceEditor
                  experience={profile.experience}
                  onChange={(exp) => handleFieldChange('experience', exp)}
                  archetype={archetype}
                />
              </EditSection>

              {/* Education */}
              <EditSection
                title="Education"
                icon={GraduationCap}
                archetype={archetype}
                isEditing={editingSection === 'education'}
                onToggle={() => setEditingSection(editingSection === 'education' ? null : 'education')}
              >
                <EducationEditor
                  education={profile.education}
                  onChange={(edu) => handleFieldChange('education', edu)}
                  archetype={archetype}
                />
              </EditSection>

              {/* Social Links */}
              <EditSection
                title="Social Links"
                icon={Globe}
                archetype={archetype}
                isEditing={editingSection === 'social'}
                onToggle={() => setEditingSection(editingSection === 'social' ? null : 'social')}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-theme-muted flex-shrink-0" />
                    <input
                      type="url"
                      value={profile.social.website || ''}
                      onChange={(e) => handleFieldChange('social', { ...profile.social, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      className="flex-1 px-4 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-theme-muted flex-shrink-0" />
                    <input
                      type="url"
                      value={profile.social.github || ''}
                      onChange={(e) => handleFieldChange('social', { ...profile.social, github: e.target.value })}
                      placeholder="https://github.com/username"
                      className="flex-1 px-4 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-theme-muted flex-shrink-0" />
                    <input
                      type="url"
                      value={profile.social.linkedin || ''}
                      onChange={(e) => handleFieldChange('social', { ...profile.social, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="flex-1 px-4 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-theme-muted flex-shrink-0" />
                    <input
                      type="url"
                      value={profile.social.twitter || ''}
                      onChange={(e) => handleFieldChange('social', { ...profile.social, twitter: e.target.value })}
                      placeholder="https://twitter.com/username"
                      className="flex-1 px-4 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
                    />
                  </div>
                </div>
              </EditSection>

              {/* Achievements */}
              <EditSection
                title="Achievements"
                icon={Award}
                archetype={archetype}
                isEditing={editingSection === 'achievements'}
                onToggle={() => setEditingSection(editingSection === 'achievements' ? null : 'achievements')}
              >
                <AchievementsEditor
                  achievements={profile.achievements}
                  onChange={(ach) => handleFieldChange('achievements', ach)}
                  archetype={archetype}
                />
              </EditSection>

              {/* Resume */}
              <EditSection
                title="Resume"
                icon={FileText}
                archetype={archetype}
                isEditing={editingSection === 'resume'}
                onToggle={() => setEditingSection(editingSection === 'resume' ? null : 'resume')}
              >
                <div className="space-y-3">
                  {profile.resumeFileName ? (
                    <div className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-xl">
                      <FileText className={`w-5 h-5 ${archetype.accentColor}`} />
                      <span className="flex-1 text-sm font-medium text-[var(--foreground)] truncate">
                        {profile.resumeFileName}
                      </span>
                      <button
                        onClick={() => window.open(profile.resumeUrl, '_blank')}
                        className={`p-2 bg-gradient-to-r ${archetype.gradient} text-white rounded-lg hover:opacity-90 transition-opacity`}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-theme-muted">No resume uploaded yet</p>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full py-3 px-4 bg-gradient-to-r ${archetype.gradient} text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                  >
                    <Upload className="w-4 h-4" />
                    {profile.resumeFileName ? 'Replace Resume' : 'Upload Resume'}
                  </button>
                </div>
              </EditSection>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t-2 ${archetype.borderColor} bg-gradient-to-r ${archetype.bgGradient} flex-shrink-0`}>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${archetype.gradient}`} />
            <p className="text-[10px] font-black text-theme-muted uppercase tracking-widest">
              We the People of Project Exodus
            </p>
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${archetype.gradient}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Edit Section Component
function EditSection({
  title,
  icon: Icon,
  archetype,
  isEditing,
  onToggle,
  children,
}: {
  title: string
  icon: any
  archetype: typeof GUARDIAN_ARCHETYPES.michael
  isEditing: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className={`border-2 ${isEditing ? archetype.borderColor : 'border-[var(--border)]'} rounded-xl overflow-hidden transition-colors`}>
      <button
        onClick={onToggle}
        className={`w-full p-4 flex items-center justify-between ${isEditing ? `bg-gradient-to-r ${archetype.bgGradient}` : 'bg-[var(--muted)]/50 hover:bg-[var(--muted)]'} transition-colors`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${isEditing ? archetype.accentColor : 'text-theme-muted'}`} />
          <span className={`text-sm font-black ${isEditing ? archetype.accentColor : 'text-[var(--foreground)]'}`}>{title}</span>
        </div>
        {isEditing ? (
          <ChevronUp className={`w-5 h-5 ${archetype.accentColor}`} />
        ) : (
          <ChevronDown className="w-5 h-5 text-theme-muted" />
        )}
      </button>
      {isEditing && (
        <div className="p-4 bg-[var(--background)]">
          {children}
        </div>
      )}
    </div>
  )
}

// Skills Editor Component
function SkillsEditor({
  skills,
  onChange,
  archetype,
}: {
  skills: string[]
  onChange: (skills: string[]) => void
  archetype: typeof GUARDIAN_ARCHETYPES.michael
}) {
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(s => s !== skillToRemove))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          placeholder="Add a skill..."
          className="flex-1 px-4 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-sm font-medium focus:outline-none focus:border-theme-primary"
        />
        <button
          onClick={addSkill}
          className={`px-4 py-2 bg-gradient-to-r ${archetype.gradient} text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className={`px-3 py-1.5 bg-gradient-to-r ${archetype.gradient} text-white text-xs font-bold rounded-full flex items-center gap-2`}
          >
            {skill}
            <button onClick={() => removeSkill(skill)} className="hover:opacity-70">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-theme-muted italic">No skills added yet</p>
        )}
      </div>
    </div>
  )
}

// Experience Editor Component
function ExperienceEditor({
  experience,
  onChange,
  archetype,
}: {
  experience: Experience[]
  onChange: (experience: Experience[]) => void
  archetype: typeof GUARDIAN_ARCHETYPES.michael
}) {
  const [isAdding, setIsAdding] = useState(false)
  const [newExp, setNewExp] = useState<Partial<Experience>>({})

  const addExperience = () => {
    if (newExp.title && newExp.company) {
      onChange([
        ...experience,
        {
          id: `exp-${Date.now()}`,
          title: newExp.title,
          company: newExp.company,
          location: newExp.location || '',
          startDate: newExp.startDate || '',
          endDate: newExp.endDate,
          current: newExp.current || false,
          description: newExp.description || '',
        },
      ])
      setNewExp({})
      setIsAdding(false)
    }
  }

  const removeExperience = (id: string) => {
    onChange(experience.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-4">
      {experience.map((exp) => (
        <div key={exp.id} className={`p-3 bg-[var(--muted)]/50 rounded-xl border-l-4 ${archetype.borderColor}`}>
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-sm font-black text-[var(--foreground)]">{exp.title}</h5>
              <p className="text-xs font-bold text-theme-muted">{exp.company}</p>
              <p className="text-[10px] font-medium text-theme-muted">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
            </div>
            <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="p-4 bg-[var(--muted)]/30 rounded-xl border-2 border-dashed border-[var(--border)] space-y-3">
          <input
            type="text"
            placeholder="Job Title"
            value={newExp.title || ''}
            onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Company"
            value={newExp.company || ''}
            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Start Date"
              value={newExp.startDate || ''}
              onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
              className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
            />
            <input
              type="text"
              placeholder="End Date"
              value={newExp.endDate || ''}
              onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
              disabled={newExp.current}
              className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm disabled:opacity-50"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={newExp.current || false}
              onChange={(e) => setNewExp({ ...newExp, current: e.target.checked })}
            />
            Current Position
          </label>
          <div className="flex gap-2">
            <button
              onClick={addExperience}
              className={`flex-1 py-2 bg-gradient-to-r ${archetype.gradient} text-white rounded-lg font-bold text-sm`}
            >
              Add
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewExp({}) }}
              className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-lg font-bold text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-[var(--border)] rounded-xl text-sm font-bold text-theme-muted hover:border-theme-primary hover:text-theme-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      )}
    </div>
  )
}

// Education Editor Component
function EducationEditor({
  education,
  onChange,
  archetype,
}: {
  education: Education[]
  onChange: (education: Education[]) => void
  archetype: typeof GUARDIAN_ARCHETYPES.michael
}) {
  const [isAdding, setIsAdding] = useState(false)
  const [newEdu, setNewEdu] = useState<Partial<Education>>({})

  const addEducation = () => {
    if (newEdu.degree && newEdu.school) {
      onChange([
        ...education,
        {
          id: `edu-${Date.now()}`,
          degree: newEdu.degree,
          school: newEdu.school,
          fieldOfStudy: newEdu.fieldOfStudy,
          startYear: newEdu.startYear,
          endYear: newEdu.endYear,
          description: newEdu.description || '',
        },
      ])
      setNewEdu({})
      setIsAdding(false)
    }
  }

  const removeEducation = (id: string) => {
    onChange(education.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div key={edu.id} className={`p-3 bg-[var(--muted)]/50 rounded-xl border-l-4 ${archetype.borderColor}`}>
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-sm font-black text-[var(--foreground)]">{edu.degree}</h5>
              <p className="text-xs font-bold text-theme-muted">{edu.school}</p>
              {edu.endYear && <p className="text-[10px] font-medium text-theme-muted">{edu.endYear}</p>}
            </div>
            <button onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="p-4 bg-[var(--muted)]/30 rounded-xl border-2 border-dashed border-[var(--border)] space-y-3">
          <input
            type="text"
            placeholder="Degree / Certification"
            value={newEdu.degree || ''}
            onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="School / Institution"
            value={newEdu.school || ''}
            onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={newEdu.fieldOfStudy || ''}
            onChange={(e) => setNewEdu({ ...newEdu, fieldOfStudy: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="Graduation Year"
            value={newEdu.endYear || ''}
            onChange={(e) => setNewEdu({ ...newEdu, endYear: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={addEducation}
              className={`flex-1 py-2 bg-gradient-to-r ${archetype.gradient} text-white rounded-lg font-bold text-sm`}
            >
              Add
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewEdu({}) }}
              className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-lg font-bold text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-[var(--border)] rounded-xl text-sm font-bold text-theme-muted hover:border-theme-primary hover:text-theme-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      )}
    </div>
  )
}

// Achievements Editor Component
function AchievementsEditor({
  achievements,
  onChange,
  archetype,
}: {
  achievements: Achievement[]
  onChange: (achievements: Achievement[]) => void
  archetype: typeof GUARDIAN_ARCHETYPES.michael
}) {
  const [isAdding, setIsAdding] = useState(false)
  const [newAch, setNewAch] = useState<Partial<Achievement>>({})

  const addAchievement = () => {
    if (newAch.title) {
      onChange([
        ...achievements,
        {
          id: `ach-${Date.now()}`,
          title: newAch.title,
          description: newAch.description,
          date: newAch.date,
        },
      ])
      setNewAch({})
      setIsAdding(false)
    }
  }

  const removeAchievement = (id: string) => {
    onChange(achievements.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-4">
      {achievements.map((ach) => (
        <div key={ach.id} className={`p-3 bg-[var(--muted)]/50 rounded-xl border-l-4 ${archetype.borderColor}`}>
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-sm font-black text-[var(--foreground)]">{ach.title}</h5>
              {ach.description && <p className="text-xs font-medium text-theme-muted">{ach.description}</p>}
              {ach.date && <p className="text-[10px] font-bold text-theme-muted mt-1">{ach.date}</p>}
            </div>
            <button onClick={() => removeAchievement(ach.id)} className="text-red-500 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="p-4 bg-[var(--muted)]/30 rounded-xl border-2 border-dashed border-[var(--border)] space-y-3">
          <input
            type="text"
            placeholder="Achievement Title"
            value={newAch.title || ''}
            onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
          />
          <textarea
            placeholder="Description (optional)"
            value={newAch.description || ''}
            onChange={(e) => setNewAch({ ...newAch, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm resize-none"
          />
          <input
            type="text"
            placeholder="Date (optional)"
            value={newAch.date || ''}
            onChange={(e) => setNewAch({ ...newAch, date: e.target.value })}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={addAchievement}
              className={`flex-1 py-2 bg-gradient-to-r ${archetype.gradient} text-white rounded-lg font-bold text-sm`}
            >
              Add
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewAch({}) }}
              className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-lg font-bold text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-3 border-2 border-dashed border-[var(--border)] rounded-xl text-sm font-bold text-theme-muted hover:border-theme-primary hover:text-theme-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Achievement
        </button>
      )}
    </div>
  )
}
