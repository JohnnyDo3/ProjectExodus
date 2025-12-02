'use client'

import { useState, useEffect } from 'react'
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
  CreditCard,
  ChevronDown,
  ChevronUp,
  Edit2,
  Save,
  X,
  Leaf,
  Hammer,
  Users,
  BookOpen,
  Compass,
  Shield,
  Heart,
  Sparkles,
  Target,
  Eye,
  Lock,
  Unlock,
  Check,
} from 'lucide-react'

// Personality Templates - The Archetypes of Project Exodus
const PERSONALITY_TEMPLATES = {
  steward: {
    id: 'steward',
    name: 'THE STEWARD',
    subtitle: 'Guardian of Earth',
    description: 'You protect and nurture. Stewardship is your calling.',
    icon: Shield,
    gradient: 'from-emerald-500 to-green-600',
    accentColor: 'emerald',
    commandments: ['STEWARDSHIP', 'SANCTITY', 'LEGACY'],
    focusAreas: ['bio', 'values', 'achievements'],
  },
  builder: {
    id: 'builder',
    name: 'THE BUILDER',
    subtitle: 'Creator of Tomorrow',
    description: 'You create and construct. Building the future is your purpose.',
    icon: Hammer,
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    commandments: ['INTEGRITY', 'TRANSPARENCY', 'SUSTAINABILITY'],
    focusAreas: ['projects', 'portfolio', 'skills'],
  },
  connector: {
    id: 'connector',
    name: 'THE CONNECTOR',
    subtitle: 'Weaver of Community',
    description: 'You unite and collaborate. Community is your strength.',
    icon: Users,
    gradient: 'from-blue-500 to-indigo-600',
    accentColor: 'blue',
    commandments: ['LOYALTY', 'EQUITY', 'BIODIVERSITY'],
    focusAreas: ['social', 'network', 'experience'],
  },
  scholar: {
    id: 'scholar',
    name: 'THE SCHOLAR',
    subtitle: 'Seeker of Knowledge',
    description: 'You learn and teach. Knowledge is your gift.',
    icon: BookOpen,
    gradient: 'from-purple-500 to-violet-600',
    accentColor: 'purple',
    commandments: ['LEGACY', 'TRANSPARENCY', 'REST'],
    focusAreas: ['education', 'certifications', 'learning'],
  },
  pioneer: {
    id: 'pioneer',
    name: 'THE PIONEER',
    subtitle: 'Trailblazer of Change',
    description: 'You innovate and lead. Breaking new ground is your destiny.',
    icon: Compass,
    gradient: 'from-rose-500 to-red-600',
    accentColor: 'rose',
    commandments: ['SUSTAINABILITY', 'INTEGRITY', 'STEWARDSHIP'],
    focusAreas: ['achievements', 'projects', 'vision'],
  },
}

type TemplateType = keyof typeof PERSONALITY_TEMPLATES

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
  // STOCK data
  projectsCreated?: number
  projectsJoined?: number
  articlesWritten?: number
  modulesCompleted?: number
  followers?: number
  following?: number
  // User's chosen template
  template?: TemplateType
  // User's personal declaration
  declaration?: string
}

// Ghost Placeholder Component - Shows what COULD be there
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

  // Ghost state - show what could be here
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
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('steward')
  const [editedProfile, setEditedProfile] = useState<Partial<ProfileData>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)

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
                github: undefined,
                linkedin: data.data.linkedin,
                twitter: data.data.twitter,
              },
              portfolio: data.data.projects || [],
              achievements: data.data.honors || [],
              resumeUrl: data.data.resume,
              resumeFileName: data.data.resume ? 'resume.pdf' : undefined,
              template: data.data.businessCardTemplate || 'steward',
              declaration: data.data.declaration || '',
            }
            setProfile(profileData)
            setEditedProfile(profileData)
            setSelectedTemplate(profileData.template || 'steward')
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
          businessCardTemplate: selectedTemplate,
        }),
      })

      if (res.ok) {
        setProfile(prev => prev ? { ...prev, ...editedProfile, template: selectedTemplate } : null)
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
      <Card className="border-4 border-theme-accent">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-theme-accent border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return null
  }

  const template = PERSONALITY_TEMPLATES[selectedTemplate]
  const TemplateIcon = template.icon
  const hasSocialLinks = profile.social.website || profile.social.github || profile.social.linkedin || profile.social.twitter

  // Calculate STOCK score (contribution level)
  const stockScore = (profile.projectsCreated || 0) * 10 +
                     (profile.articlesWritten || 0) * 5 +
                     (profile.modulesCompleted || 0) * 3 +
                     (profile.followers || 0) * 1

  return (
    <Card className="border-4 border-theme-accent overflow-hidden">
      {/* Header with Template Gradient */}
      <div className={`px-6 py-4 bg-gradient-to-r ${template.gradient} relative`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <TemplateIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">{template.name}</h2>
              <p className="text-xs font-medium text-white/80">{template.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwnProfile && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Edit your card"
              >
                <Edit2 className="w-5 h-5 text-white" />
              </button>
            )}
            {isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-2 bg-white/30 hover:bg-white/40 rounded-lg transition-colors"
                >
                  <Save className="w-5 h-5 text-white" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Template Selector (when editing) */}
        {isEditing && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs font-bold text-white/80 mb-2">CHOOSE YOUR ARCHETYPE</p>
            <div className="flex flex-wrap gap-2">
              {Object.values(PERSONALITY_TEMPLATES).map((t) => {
                const TIcon = t.icon
                const isSelected = selectedTemplate === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id as TemplateType)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-white text-gray-900 shadow-lg scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <TIcon className="w-4 h-4" />
                    {t.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Main Identity Card */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Name & Identity */}
          <div className={`flex-shrink-0 p-6 bg-gradient-to-br ${template.gradient} rounded-2xl text-white min-w-[300px]`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
                <User className="w-10 h-10" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name || ''}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="text-xl font-black bg-transparent border-b-2 border-white/50 focus:border-white outline-none w-full mb-1"
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
                    className="text-sm font-medium bg-transparent border-b border-white/30 focus:border-white/50 outline-none w-full opacity-90"
                    placeholder="Your headline or role"
                  />
                ) : (
                  <p className="text-sm font-medium opacity-90">{profile.headline || template.subtitle}</p>
                )}
              </div>
            </div>

            {/* Personal Declaration */}
            <div className="mb-4 p-3 bg-white/10 rounded-xl">
              <p className="text-[10px] font-black uppercase mb-1 opacity-70">MY DECLARATION</p>
              {isEditing ? (
                <textarea
                  value={editedProfile.declaration || ''}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, declaration: e.target.value }))}
                  className="w-full text-sm font-medium bg-transparent border-b border-white/30 focus:border-white/50 outline-none italic resize-none"
                  placeholder="What drives you? What do you stand for at Project Exodus?"
                  rows={2}
                />
              ) : profile.declaration ? (
                <p className="text-sm font-medium italic">"{profile.declaration}"</p>
              ) : (
                <p className="text-sm font-medium italic opacity-50 border-b border-dashed border-white/30">
                  "Add your personal declaration..."
                </p>
              )}
            </div>

            {/* Contact Info with Ghosts */}
            <div className="space-y-2 text-sm">
              {(profile.location || isEditing) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-75" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location || ''}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="bg-transparent border-b border-white/30 focus:border-white/50 outline-none flex-1"
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

            {/* STOCK Score */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-70">YOUR STOCK</p>
                  <p className="text-2xl font-black">{stockScore}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold opacity-70">Contribution Points</p>
                  <p className="text-xs font-medium opacity-60">Your legacy at Project Exodus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Info & STOCK Breakdown */}
          <div className="flex-1 space-y-4">
            {/* Values Alignment */}
            <div>
              <h4 className="text-xs font-black text-theme-muted uppercase mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Values I Embody
              </h4>
              <div className="flex flex-wrap gap-2">
                {template.commandments.map((value, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 bg-gradient-to-r ${template.gradient} text-white text-xs font-bold rounded-full`}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills with Ghosts */}
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
                  {['Skill 1', 'Skill 2', 'Skill 3'].map((ghost, idx) => (
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
                <p className="text-2xl font-black text-theme-primary">{profile.projectsCreated || 0}</p>
                <p className="text-[10px] font-bold text-theme-muted uppercase">Projects Built</p>
              </div>
              <div className="p-3 bg-[var(--muted)] rounded-xl">
                <p className="text-2xl font-black text-theme-accent">{profile.articlesWritten || 0}</p>
                <p className="text-[10px] font-bold text-theme-muted uppercase">Articles Written</p>
              </div>
              <div className="p-3 bg-[var(--muted)] rounded-xl">
                <p className="text-2xl font-black text-theme-secondary">{profile.followers || 0}</p>
                <p className="text-[10px] font-bold text-theme-muted uppercase">Followers</p>
              </div>
              <div className="p-3 bg-[var(--muted)] rounded-xl">
                <p className="text-2xl font-black text-[var(--foreground)]">{profile.modulesCompleted || 0}</p>
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
          <div className="mt-6 pt-6 border-t-2 border-[var(--border)]">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bio with Ghost */}
              <div>
                <GhostField
                  label="About Me"
                  icon={User}
                  placeholder="Tell others about yourself and your journey..."
                  isEditing={isEditing}
                  value={isEditing ? editedProfile.bio : profile.bio}
                  onChange={(value) => setEditedProfile(prev => ({ ...prev, bio: value }))}
                  type="textarea"
                />
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-theme-primary" />
                  Experience
                </h4>
                {profile.experience.length > 0 ? (
                  <div className="space-y-3">
                    {profile.experience.slice(0, 2).map((exp: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-theme-primary pl-3">
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
                      <p className="text-sm font-black text-theme-muted italic">Position Title</p>
                      <p className="text-xs font-bold text-theme-muted italic">Company Name</p>
                      <p className="text-[10px] font-medium text-theme-muted">Add your experience...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Education */}
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-theme-accent" />
                  Education
                </h4>
                {profile.education.length > 0 ? (
                  <div className="space-y-3">
                    {profile.education.slice(0, 2).map((edu: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-theme-accent pl-3">
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
                  <Award className="w-4 h-4 text-theme-secondary" />
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
                      <p className="text-xs font-black text-theme-muted italic">Achievement Title</p>
                      <p className="text-[10px] font-medium text-theme-muted">Add your achievements...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resume Download */}
            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName || 'resume.pdf'}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity text-sm font-bold"
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

        {/* Footer - Template Description */}
        <div className="mt-6 pt-4 border-t border-[var(--border)] text-center">
          <p className="text-xs font-medium text-theme-muted italic">
            {template.description}
          </p>
          <p className="text-[10px] font-bold text-theme-muted mt-1 uppercase">
            We the People of Project Exodus
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
