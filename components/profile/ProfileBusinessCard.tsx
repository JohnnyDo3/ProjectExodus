'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  User,
  Mail,
  MapPin,
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
  Sparkles,
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
  Heart,
  Phone,
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

// Guardian archetypes with fixed gradient colors (matching settings page)
// These colors represent identity and should NOT change with theme
const GUARDIAN_ARCHETYPES = {
  michael: {
    id: 'michael',
    name: 'MICHAEL',
    title: 'Guardian of Strength',
    value: 'STRENGTH',
    description: 'You stand unwavering. Your strength protects those who cannot protect themselves.',
    scripture: 'The one who leads the armies of heaven against darkness.',
    icon: Sword,
    // Red to Orange gradient (from settings)
    colors: {
      from: '#dc2626', // red-600
      to: '#f97316',   // orange-500
      gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    },
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
    // Sky to Blue gradient (from settings)
    colors: {
      from: '#0ea5e9', // sky-500
      to: '#2563eb',   // blue-600
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    },
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
    // Emerald to Teal gradient (from settings)
    colors: {
      from: '#10b981', // emerald-500
      to: '#0d9488',   // teal-600
      gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
    },
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
    // Amber to Yellow gradient (from settings)
    colors: {
      from: '#f59e0b', // amber-500
      to: '#eab308',   // yellow-500
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
    },
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
    // Pink to Rose gradient (from settings)
    colors: {
      from: '#ec4899', // pink-500
      to: '#e11d48',   // rose-600
      gradient: 'linear-gradient(135deg, #ec4899 0%, #e11d48 100%)',
    },
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
    // Violet to Purple gradient (from settings)
    colors: {
      from: '#8b5cf6', // violet-500
      to: '#9333ea',   // purple-600
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #9333ea 100%)',
    },
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
    // Indigo to Blue gradient (from settings)
    colors: {
      from: '#6366f1', // indigo-500
      to: '#1d4ed8',   // blue-700
      gradient: 'linear-gradient(135deg, #6366f1 0%, #1d4ed8 100%)',
    },
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
  projectsCreated?: number
  projectsJoined?: number
  articlesWritten?: number
  modulesCompleted?: number
  followers?: number
  following?: number
  connectionsCount?: number
  archetype?: ArchetypeType
  declaration?: string
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
        <label className="text-[10px] font-black text-[var(--muted-foreground)] uppercase mb-1 block">{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm font-medium text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] resize-none"
            rows={3}
          />
        ) : (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm font-medium text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
          />
        )}
      </div>
    )
  }

  if (hasValue) {
    return (
      <div className="flex items-start gap-2">
        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)' }} />
        <div>
          <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase">{label}</p>
          <p className="text-sm font-medium text-[var(--foreground)]">{value}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2 opacity-30 hover:opacity-50 transition-opacity cursor-default group">
      <Icon className="w-4 h-4 text-[var(--muted-foreground)] mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase">{label}</p>
        <p className="text-sm font-medium text-[var(--muted-foreground)] italic border-b border-dashed border-[var(--muted-foreground)]">
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
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
      <Card className="border-4 border-[var(--border)] overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-bold text-[var(--muted-foreground)]">Loading identity...</p>
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

  // Use the archetype's fixed gradient colors (not theme-dependent)
  const archetypeColor = archetype.colors.from
  const archetypeGradient = archetype.colors.gradient

  const stockScore = (profile.projectsCreated || 0) * 10 +
                     (profile.articlesWritten || 0) * 5 +
                     (profile.modulesCompleted || 0) * 3 +
                     (profile.followers || 0) * 1 +
                     (profile.connectionsCount || 0) * 2

  const memberYears = profile.memberSince
    ? Math.floor((Date.now() - new Date(profile.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0

  // Handle edit button - open expanded edit modal
  const handleEditClick = () => {
    setIsEditModalOpen(true)
  }

  // Handle save from edit modal
  const handleModalSave = async () => {
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
        setIsEditModalOpen(false)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Edit Modal Component
  const EditModal = () => {
    if (!isEditModalOpen) return null

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          onClick={() => setIsEditModalOpen(false)}
        />

        {/* Modal */}
        <div className="fixed inset-4 md:inset-8 lg:inset-12 bg-[var(--card)] rounded-2xl shadow-2xl z-[201] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div
            className="px-6 py-4 flex items-center justify-between border-b-4"
            style={{
              background: archetype.colors.gradient,
              borderColor: archetypeColor,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/20 rounded-xl">
                <Edit2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">EDIT BUSINESS CARD</h2>
                <p className="text-sm text-white/80">Customize your digital identity</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="p-2 bg-black/20 hover:bg-black/30 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Modal Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Guardian Archetype Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-[var(--foreground)] flex items-center gap-2">
                  <Shield className="w-5 h-5" style={{ color: archetypeColor }} />
                  SELECT YOUR GUARDIAN ARCHETYPE
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Choose the archetype that best represents your values and how you contribute to Project Exodus
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {Object.entries(GUARDIAN_ARCHETYPES).map(([key, arch]) => {
                    const Icon = arch.icon
                    const isSelected = selectedArchetype === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedArchetype(key as ArchetypeType)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-transparent text-white shadow-lg scale-[1.02]'
                            : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]'
                        }`}
                        style={isSelected ? { background: arch.colors.gradient } : {}}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              background: isSelected ? 'rgba(255,255,255,0.2)' : arch.colors.gradient
                            }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className={`text-xs font-black ${isSelected ? 'text-white/80' : 'text-[var(--muted-foreground)]'}`}>
                              {arch.title}
                            </p>
                            <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-[var(--foreground)]'}`}>
                              {arch.name}
                            </p>
                          </div>
                        </div>
                        <p className={`text-xs line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[var(--muted-foreground)]'}`}>
                          {arch.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Personal Info Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[var(--foreground)] flex items-center gap-2">
                    <User className="w-5 h-5" style={{ color: archetypeColor }} />
                    PERSONAL INFORMATION
                  </h3>

                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      value={editedProfile.name || ''}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                      HEADLINE / ROLE
                    </label>
                    <input
                      type="text"
                      value={editedProfile.headline || ''}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, headline: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                      placeholder="Sustainability Consultant | Renewable Energy Expert"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                      LOCATION
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                      <input
                        type="text"
                        value={editedProfile.location || ''}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Declaration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[var(--foreground)] flex items-center gap-2">
                    <Heart className="w-5 h-5" style={{ color: archetypeColor }} />
                    YOUR PERSONAL DECLARATION
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Write a personal statement that defines who you are and what you stand for
                  </p>
                  <textarea
                    value={editedProfile.declaration || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, declaration: e.target.value }))}
                    placeholder="I believe in creating a sustainable future where..."
                    className="w-full px-4 py-3 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-[var(--foreground)] font-medium focus:outline-none focus:border-[var(--primary)] resize-none"
                    rows={5}
                    maxLength={280}
                  />
                  <p className="text-xs text-[var(--muted-foreground)] text-right">
                    {(editedProfile.declaration || '').length}/280 characters
                  </p>
                </div>
              </div>

              {/* Preview Card */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-[var(--foreground)]">LIVE PREVIEW</h3>
                <div
                  className="p-6 rounded-2xl border-2 border-transparent text-white max-w-md"
                  style={{ background: GUARDIAN_ARCHETYPES[selectedArchetype].colors.gradient }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                      {(() => {
                        const Icon = GUARDIAN_ARCHETYPES[selectedArchetype].icon
                        return <Icon className="w-8 h-8 text-white" />
                      })()}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold opacity-80">
                        {GUARDIAN_ARCHETYPES[selectedArchetype].title}
                      </p>
                      <h4 className="text-xl font-black">{editedProfile.name || 'Your Name'}</h4>
                      <p className="text-sm opacity-80">{editedProfile.headline || 'Your headline'}</p>
                    </div>
                  </div>
                  {editedProfile.declaration && (
                    <p className="mt-4 text-sm italic opacity-90 border-t border-white/20 pt-4">
                      "{editedProfile.declaration}"
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-3 text-xs">
                    {editedProfile.location && (
                      <span className="flex items-center gap-1 opacity-80">
                        <MapPin className="w-3 h-3" /> {editedProfile.location}
                      </span>
                    )}
                    {profile?.email && (
                      <span className="flex items-center gap-1 opacity-80">
                        <Mail className="w-3 h-3" /> {profile.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t-2 border-[var(--border)] bg-[var(--muted)] flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="font-bold"
            >
              CANCEL
            </Button>
            <Button
              onClick={handleModalSave}
              disabled={isSaving}
              className="font-black"
              style={{ backgroundColor: archetypeColor }}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <EditModal />
    <Card className="border-4 overflow-hidden" style={{ borderColor: archetypeColor }}>
      {/* Sacred Header - uses archetype gradient as background */}
      <div
        className="px-6 py-5 relative overflow-hidden"
        style={{ background: archetypeGradient }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
              <ArchetypeIcon className="w-8 h-8 text-white drop-shadow-md" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-white drop-shadow-sm" />
                <p className="text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm">Identity Declaration</p>
              </div>
              <h2 className="text-2xl font-black text-white tracking-wide drop-shadow-md">{profile.name || 'Anonymous'}</h2>
              <p className="text-sm font-semibold text-white drop-shadow-sm">{archetype.title} • {archetype.value}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwnProfile && (
              <button
                onClick={handleEditClick}
                className="p-2.5 bg-black/30 hover:bg-black/40 rounded-xl transition-colors backdrop-blur-sm"
                title="Edit in Settings"
              >
                <Edit2 className="w-5 h-5 text-white" />
              </button>
            )}
            <button
              onClick={() => {
                const newExpanded = !isExpanded
                setIsExpanded(newExpanded)
                if (newExpanded) {
                  setTimeout(() => {
                    expandedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 100)
                }
              }}
              className="p-2.5 bg-black/30 hover:bg-black/40 rounded-xl transition-colors backdrop-blur-sm"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

      </div>

      <CardContent className="p-4">
        {/* Main Identity Card - stack vertically in narrow containers */}
        <div className="flex flex-col gap-4">
          {/* Core Identity */}
          <div
            className="p-5 rounded-2xl relative overflow-hidden"
            style={{ background: archetypeGradient }}
          >
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/25 rounded-2xl" />
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />

            <div className="relative text-white">
              {/* Avatar and Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-xl bg-black/30 flex items-center justify-center border-2 border-white/30 backdrop-blur-sm flex-shrink-0">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name || ''}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="text-lg font-black bg-transparent border-b-2 border-white/50 focus:border-white outline-none w-full mb-1 placeholder-white/50 text-white"
                      placeholder="Your Name"
                    />
                  ) : (
                    <h3 className="text-lg font-black drop-shadow-md truncate">{profile.name || 'Anonymous'}</h3>
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.headline || ''}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, headline: e.target.value }))}
                      className="text-sm font-medium bg-transparent border-b border-white/30 focus:border-white/50 outline-none w-full placeholder-white/50 text-white/90"
                      placeholder="Your role or calling"
                    />
                  ) : (
                    <p className="text-sm font-medium text-white/90 truncate">{profile.headline || archetype.title}</p>
                  )}
                </div>
              </div>

              {/* The Declaration */}
              <div className="mb-4 p-3 bg-black/20 rounded-lg backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <ScrollText className="w-3.5 h-3.5 text-white/70" />
                  <p className="text-[9px] font-black uppercase text-white/70 tracking-wider">My Declaration</p>
                </div>
                {isEditing ? (
                  <textarea
                    value={editedProfile.declaration || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, declaration: e.target.value }))}
                    className="w-full text-sm font-medium bg-transparent border-b border-white/30 focus:border-white/50 outline-none italic resize-none placeholder-white/50 text-white"
                    placeholder="What truth do you carry? What do you stand for at Project Exodus?"
                    rows={2}
                  />
                ) : profile.declaration ? (
                  <p className="text-sm font-medium italic leading-relaxed text-white">"{profile.declaration}"</p>
                ) : (
                  <p className="text-sm font-medium italic text-white/40 border-b border-dashed border-white/30">
                    "Speak your truth into existence..."
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 text-xs mb-4">
                {(profile.location || isEditing) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-white/75 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location || ''}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-transparent border-b border-white/30 focus:border-white/50 outline-none flex-1 placeholder-white/50 text-white"
                        placeholder="Your location"
                      />
                    ) : (
                      <span className="text-white">{profile.location}</span>
                    )}
                  </div>
                )}
                {!profile.location && !isEditing && (
                  <div className="flex items-center gap-2 opacity-30">
                    <MapPin className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span className="italic border-b border-dashed border-white/50 text-white text-xs">Add location</span>
                  </div>
                )}

                {profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-white/75 flex-shrink-0" />
                    <span className="text-white truncate">{profile.email}</span>
                  </div>
                )}
              </div>

              {/* YOUR STOCK */}
              <div className="pt-3 border-t border-white/20">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Infinity className="w-4 h-4 text-white/70" />
                    <p className="text-[9px] font-black uppercase text-white/70 tracking-wider">Your Stock</p>
                  </div>
                  <p className="text-2xl font-black text-white drop-shadow-md">{stockScore}</p>
                </div>
                <p className="text-[9px] font-medium text-white/60 text-right">
                  Contribution to Project Exodus
                </p>
                {memberYears > 0 && (
                  <p className="text-[9px] font-bold text-white/50 text-right mt-0.5">
                    {memberYears} year{memberYears > 1 ? 's' : ''} of service
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Values & Contributions */}
          <div className="space-y-3">
            {/* Guardian Value */}
            <div
              className="p-3 rounded-lg border-2"
              style={{
                borderColor: archetypeColor,
                backgroundColor: `color-mix(in srgb, ${archetypeColor} 10%, var(--background))`
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <ArchetypeIcon className="w-5 h-5 flex-shrink-0" style={{ color: archetypeColor }} />
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-[var(--muted-foreground)] uppercase">I Embody</p>
                  <p className="text-base font-black truncate" style={{ color: archetypeColor }}>{archetype.value}</p>
                </div>
              </div>
              <p className="text-xs font-medium text-[var(--muted-foreground)] italic line-clamp-2">{archetype.description}</p>
            </div>

            {/* Commandments Alignment */}
            <div>
              <h4 className="text-[9px] font-black text-[var(--muted-foreground)] uppercase mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Values
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {archetype.commandments.map((value, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-white text-[10px] font-bold rounded-full"
                    style={{ backgroundColor: archetypeColor }}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="text-[9px] font-black text-[var(--muted-foreground)] uppercase mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Expertise
              </h4>
              {profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 4 && (
                    <span className="px-2 py-0.5 bg-[var(--muted)] text-[var(--muted-foreground)] text-[10px] font-bold rounded-full">
                      +{profile.skills.length - 4}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5 opacity-30">
                  {['Skill 1', 'Skill 2'].map((ghost, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 border border-dashed border-[var(--muted-foreground)] text-[var(--muted-foreground)] text-[10px] font-bold rounded-full italic"
                    >
                      {ghost}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* STOCK Breakdown */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-2 bg-[var(--muted)] rounded-lg">
                <p className="text-lg font-black" style={{ color: archetypeColor }}>{profile.projectsCreated || 0}</p>
                <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase">Projects</p>
              </div>
              <div className="p-2 bg-[var(--muted)] rounded-lg">
                <p className="text-lg font-black" style={{ color: archetypeColor }}>{profile.articlesWritten || 0}</p>
                <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase">Articles</p>
              </div>
              <div className="p-2 bg-[var(--muted)] rounded-lg">
                <p className="text-lg font-black" style={{ color: archetypeColor }}>{profile.followers || 0}</p>
                <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase">Followers</p>
              </div>
              <div className="p-2 bg-[var(--muted)] rounded-lg">
                <p className="text-lg font-black" style={{ color: archetypeColor }}>{profile.modulesCompleted || 0}</p>
                <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase">Modules</p>
              </div>
            </div>

            {/* Social Links */}
            {hasSocialLinks && (
              <div className="flex flex-wrap gap-1.5">
                {profile.social.website && (
                  <a
                    href={profile.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-[var(--muted)] text-[var(--foreground)] rounded-lg hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors text-xs font-bold"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Web
                  </a>
                )}
                {profile.social.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-[var(--muted)] text-[var(--foreground)] rounded-lg hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors text-xs font-bold"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
                {profile.social.twitter && (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-[var(--muted)] text-[var(--foreground)] rounded-lg hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors text-xs font-bold"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    X
                  </a>
                )}
              </div>
            )}
            {!hasSocialLinks && (
              <div className="flex flex-wrap gap-1.5 opacity-30">
                <span className="flex items-center gap-1.5 px-2 py-1.5 border border-dashed border-[var(--muted-foreground)] rounded-lg text-xs font-bold text-[var(--muted-foreground)] italic">
                  <Globe className="w-3.5 h-3.5" />
                  Website
                </span>
                <span className="flex items-center gap-1.5 px-2 py-1.5 border border-dashed border-[var(--muted-foreground)] rounded-lg text-xs font-bold text-[var(--muted-foreground)] italic">
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
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
                  <Briefcase className="w-4 h-4" style={{ color: archetypeColor }} />
                  Experience
                </h4>
                {profile.experience.length > 0 ? (
                  <div className="space-y-3">
                    {profile.experience.slice(0, 2).map((exp: any, idx: number) => (
                      <div key={idx} className="border-l-2 pl-3" style={{ borderColor: archetypeColor }}>
                        <h5 className="text-sm font-black text-[var(--foreground)]">{exp.title}</h5>
                        <p className="text-xs font-bold text-[var(--muted-foreground)]">{exp.company}</p>
                        <p className="text-[10px] font-medium text-[var(--muted-foreground)]">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 opacity-30">
                    <div className="border-l-2 border-dashed border-[var(--muted-foreground)] pl-3">
                      <p className="text-sm font-black text-[var(--muted-foreground)] italic">Your Position</p>
                      <p className="text-xs font-bold text-[var(--muted-foreground)] italic">Organization</p>
                      <p className="text-[10px] font-medium text-[var(--muted-foreground)]">Add your experience...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Education */}
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" style={{ color: archetypeColor }} />
                  Education
                </h4>
                {profile.education.length > 0 ? (
                  <div className="space-y-3">
                    {profile.education.slice(0, 2).map((edu: any, idx: number) => (
                      <div key={idx} className="border-l-2 pl-3" style={{ borderColor: archetypeColor }}>
                        <h5 className="text-sm font-black text-[var(--foreground)]">{edu.degree}</h5>
                        <p className="text-xs font-bold text-[var(--muted-foreground)]">{edu.school}</p>
                        <p className="text-[10px] font-medium text-[var(--muted-foreground)]">{edu.graduationYear}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 opacity-30">
                    <div className="border-l-2 border-dashed border-[var(--muted-foreground)] pl-3">
                      <p className="text-sm font-black text-[var(--muted-foreground)] italic">Degree / Certification</p>
                      <p className="text-xs font-bold text-[var(--muted-foreground)] italic">Institution</p>
                      <p className="text-[10px] font-medium text-[var(--muted-foreground)]">Add your education...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" style={{ color: archetypeColor }} />
                  Achievements
                </h4>
                {profile.achievements.length > 0 ? (
                  <div className="space-y-2">
                    {profile.achievements.slice(0, 3).map((achievement: any, idx: number) => (
                      <div key={idx} className="p-2 bg-[var(--muted)] rounded-lg">
                        <h5 className="text-xs font-black text-[var(--foreground)]">{achievement.title}</h5>
                        <p className="text-[10px] font-medium text-[var(--muted-foreground)]">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 opacity-30">
                    <div className="p-2 border-2 border-dashed border-[var(--muted-foreground)] rounded-lg">
                      <p className="text-xs font-black text-[var(--muted-foreground)] italic">Your Achievement</p>
                      <p className="text-[10px] font-medium text-[var(--muted-foreground)]">Add your achievements...</p>
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
                  className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-bold"
                  style={{ backgroundColor: archetypeColor }}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[var(--muted-foreground)] rounded-lg text-sm font-bold text-[var(--muted-foreground)] opacity-30 italic">
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
            <p className="text-xs font-medium text-[var(--muted-foreground)] italic mb-1">
              "{archetype.scripture}"
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: archetypeColor }} />
              <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">
                We the People of Project Exodus
              </p>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: archetypeColor }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  )
}
