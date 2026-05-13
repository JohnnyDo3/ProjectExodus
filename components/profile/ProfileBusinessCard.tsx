'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
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
  Sparkles,
  Crown,
  ScrollText,
  AlertTriangle,
  Heart,
  Phone,
  Eye,
  EyeOff,
  Settings,
  Plus,
  Check,
} from 'lucide-react'
import { ExperienceEditModal, EducationEditModal, SkillsEditModal } from './modals'
import {
  COMMANDMENTS,
  COMMANDMENT_LIST,
  DEFAULT_COMMANDMENT,
  resolveCommandmentSlug,
  type CommandmentSlug,
} from '@/lib/commandments'
import type { Experience, Education } from './modals'

// Field visibility preferences interface
interface FieldVisibility {
  showHeadline: boolean
  showBio: boolean
  showLocation: boolean
  showPhone: boolean
  showEmail: boolean
  showDeclaration: boolean
  showExperience: boolean
  showEducation: boolean
  showSkills: boolean
  showInterests: boolean
  showSocialLinks: boolean
}

// Confirmation Dialog for unsaved changes
function UnsavedChangesDialog({
  isOpen,
  onSave,
  onDiscard,
  onCancel,
  isSaving,
}: {
  isOpen: boolean
  onSave: () => void
  onDiscard: () => void
  onCancel: () => void
  isSaving: boolean
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-[var(--card)] border-4 border-[var(--secondary)] rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-[var(--secondary)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-[var(--foreground)] mb-2">Unsaved Changes</h3>
            <p className="text-sm font-medium text-[var(--muted-foreground)] mb-6">
              You have unsaved changes to your business card. Would you like to save them before closing?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onDiscard}
                className="flex-1 font-bold"
              >
                Discard
              </Button>
              <Button
                onClick={onSave}
                disabled={isSaving}
                className="flex-1 font-bold"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Values Edit Modal - allows users to select predefined values or add custom ones
function ValuesEditModal({
  isOpen,
  onClose,
  values,
  onSave,
  predefinedValues,
  commandmentColor,
}: {
  isOpen: boolean
  onClose: () => void
  values: string[]
  onSave: (values: string[]) => Promise<void>
  predefinedValues: string[]
  commandmentColor: string
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>(values)
  const [customValue, setCustomValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setSelectedValues(values)
  }, [values, isOpen])

  if (!isOpen) return null

  const toggleValue = (value: string) => {
    setSelectedValues(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const addCustomValue = () => {
    const trimmed = customValue.trim().toUpperCase()
    if (trimmed && !selectedValues.includes(trimmed)) {
      setSelectedValues(prev => [...prev, trimmed])
      setCustomValue('')
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(selectedValues)
      onClose()
    } catch (error) {
      console.error('Error saving values:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[var(--card)] border-4 border-[var(--border)] rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-[var(--foreground)]">Edit Your Values</h3>
          <button onClick={onClose} className="p-1 hover:bg-[var(--muted)] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          Select values that represent who you are, or add your own custom values.
        </p>

        {/* Selected Values */}
        {selectedValues.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase mb-2">Your Values</p>
            <div className="flex flex-wrap gap-2">
              {selectedValues.map((value, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleValue(value)}
                  className="px-3 py-1.5 text-white text-xs font-bold rounded-full flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: commandmentColor }}
                >
                  {value}
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add Custom Value */}
        <div className="mb-4">
          <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase mb-2">Add Custom Value</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomValue()}
              placeholder="Type a value and press Enter"
              className="flex-1 px-3 py-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-sm font-medium focus:outline-none focus:border-[var(--primary)]"
            />
            <Button
              onClick={addCustomValue}
              disabled={!customValue.trim()}
              className="px-3"
              style={{ backgroundColor: commandmentColor }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Predefined Values */}
        <div className="mb-6">
          <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase mb-2">Choose from Values</p>
          <div className="flex flex-wrap gap-2">
            {predefinedValues.map((value, idx) => {
              const isSelected = selectedValues.includes(value)
              return (
                <button
                  key={idx}
                  onClick={() => toggleValue(value)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
                    isSelected
                      ? 'text-white'
                      : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                  }`}
                  style={isSelected ? { backgroundColor: commandmentColor } : {}}
                >
                  {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                  {value}
                </button>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 font-bold">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 font-black text-white"
            style={{ backgroundColor: commandmentColor }}
          >
            {isSaving ? 'Saving...' : 'Save Values'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

interface ProfileBusinessCardProps {
  userId: string
  onClose?: () => void
  onSave?: () => void
  isFullView?: boolean // When true, shows all sections expanded (for modal/resume view)
}

// Predefined values users can choose from
const PREDEFINED_VALUES = [
  'STEWARDSHIP', 'INTEGRITY', 'SUSTAINABILITY', 'TRANSPARENCY', 'LEGACY',
  'EQUITY', 'SANCTITY', 'REST', 'BIODIVERSITY', 'LOYALTY', 'COMMUNITY',
  'INNOVATION', 'AUTHENTICITY', 'COMPASSION', 'COURAGE', 'RESILIENCE',
  'GRATITUDE', 'HUMILITY', 'JUSTICE', 'PATIENCE', 'PERSEVERANCE'
]

interface ProfileData {
  name: string
  headline: string
  location: string
  email: string
  phone: string
  bio: string
  skills: string[]
  interests: string[]
  customValues: string[] // User's custom values
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
  commandment?: CommandmentSlug
  declaration?: string
  memberSince?: string
  jobTitle?: string
  company?: string
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

// Default visibility - all fields visible by default
const defaultVisibility: FieldVisibility = {
  showHeadline: true,
  showBio: true,
  showLocation: true,
  showPhone: true,
  showEmail: true,
  showDeclaration: true,
  showExperience: true,
  showEducation: true,
  showSkills: true,
  showInterests: true,
  showSocialLinks: true,
}

export function ProfileBusinessCard({ userId, onClose, onSave: onSaveCallback, isFullView }: ProfileBusinessCardProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  // In modal context (onClose present) or full view, auto-expand to show all sections
  const isModalContext = Boolean(onClose) || Boolean(isFullView)
  const [isExpanded, setIsExpanded] = useState(isModalContext)
  // Auto-enter edit mode when opened from Volition (modal context with onClose)
  const [isEditing, setIsEditing] = useState(Boolean(onClose))
  // Remove nested edit modal - we no longer need it
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [showCommandmentSelector, setShowCommandmentSelector] = useState(false)
  const [selectedCommandment, setSelectedCommandment] = useState<CommandmentSlug>(DEFAULT_COMMANDMENT)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editedProfile, setEditedProfile] = useState<Partial<ProfileData>>({})
  const [savedProfile, setSavedProfile] = useState<Partial<ProfileData>>({})
  const [savedCommandment, setSavedCommandment] = useState<CommandmentSlug>(DEFAULT_COMMANDMENT)
  const [isMounted, setIsMounted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false)
  const expandedSectionRef = useRef<HTMLDivElement>(null)

  // Field visibility state
  const [fieldVisibility, setFieldVisibility] = useState<FieldVisibility>(defaultVisibility)

  // Modal states for editing complex fields
  const [showExperienceModal, setShowExperienceModal] = useState(false)
  const [showEducationModal, setShowEducationModal] = useState(false)
  const [showSkillsModal, setShowSkillsModal] = useState(false)
  const [showValuesModal, setShowValuesModal] = useState(false)

  const isOwnProfile = session?.user?.id === userId

  // Check if there are unsaved changes
  const hasUnsavedChanges = useCallback(() => {
    if (!isEditing) return false
    const profileChanged = JSON.stringify(editedProfile) !== JSON.stringify(savedProfile)
    const commandmentChanged = selectedCommandment !== savedCommandment
    return profileChanged || commandmentChanged
  }, [isEditing, editedProfile, savedProfile, selectedCommandment, savedCommandment])

  // Handle close with unsaved changes check
  const handleClose = useCallback(() => {
    if (hasUnsavedChanges()) {
      setShowUnsavedDialog(true)
    } else {
      onClose?.()
    }
  }, [hasUnsavedChanges, onClose])

  // Handle discard changes
  const handleDiscard = useCallback(() => {
    setEditedProfile({ ...savedProfile })
    setSelectedCommandment(savedCommandment)
    setIsEditing(false)
    setShowUnsavedDialog(false)
    onClose?.()
  }, [savedProfile, savedCommandment, onClose])

  // Set mounted state for portal rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

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
              phone: data.data.phone || '',
              bio: data.data.bio || '',
              skills: data.data.expertise || data.data.skills || [],
              interests: data.data.interests || [],
              customValues: data.data.customValues || [],
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
              commandment: resolveCommandmentSlug(data.data.guardianArchetype),
              declaration: data.data.declaration || '',
              memberSince: data.data.createdAt,
              jobTitle: data.data.jobTitle || '',
              company: data.data.company || '',
            }
            setProfile(profileData)
            setEditedProfile(profileData)
            setSavedProfile(profileData)
            setSelectedCommandment(profileData.commandment || DEFAULT_COMMANDMENT)
            setSavedCommandment(profileData.commandment || DEFAULT_COMMANDMENT)

            // Load privacy/visibility settings
            if (data.data.privacySettings) {
              setFieldVisibility({
                ...defaultVisibility,
                ...data.data.privacySettings,
              })
            }
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
      // Format data to match API expectations (flat structure for social links)
      const saveData = {
        name: editedProfile.name,
        headline: editedProfile.headline,
        bio: editedProfile.bio,
        location: editedProfile.location,
        phone: editedProfile.phone,
        declaration: editedProfile.declaration,
        guardianArchetype: selectedCommandment,
        website: editedProfile.social?.website,
        linkedin: editedProfile.social?.linkedin,
        twitter: editedProfile.social?.twitter,
      }

      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData),
      })

      if (res.ok) {
        const updatedProfile = { ...editedProfile, commandment: selectedCommandment }
        setProfile(prev => prev ? { ...prev, ...updatedProfile } : null)
        setSavedProfile({ ...editedProfile })
        setSavedCommandment(selectedCommandment)
        setIsEditing(false)
        setShowUnsavedDialog(false)
        onSaveCallback?.()
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

  const commandment = COMMANDMENTS[selectedCommandment]
  const CommandmentIcon = commandment.icon
  const hasSocialLinks = profile.social.website || profile.social.linkedin || profile.social.twitter

  // Use the commandment's fixed gradient colors (not theme-dependent)
  const commandmentColor = commandment.colors.from
  const commandmentGradient = commandment.colors.gradient

  const stockScore = (profile.projectsCreated || 0) * 10 +
                     (profile.articlesWritten || 0) * 5 +
                     (profile.modulesCompleted || 0) * 3 +
                     (profile.followers || 0) * 1 +
                     (profile.connectionsCount || 0) * 2

  const memberYears = profile.memberSince
    ? Math.floor((Date.now() - new Date(profile.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0

  // Handle edit button - toggle inline editing mode
  const handleEditClick = () => {
    setIsEditing(true)
  }

  // Handle save from edit modal
  const handleModalSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editedProfile.name,
          headline: editedProfile.headline,
          location: editedProfile.location,
          declaration: editedProfile.declaration,
          guardianArchetype: selectedCommandment,
          website: editedProfile.social?.website,
          linkedin: editedProfile.social?.linkedin,
          twitter: editedProfile.social?.twitter,
        }),
      })

      if (res.ok) {
        setProfile(prev => prev ? {
          ...prev,
          ...editedProfile,
          commandment: selectedCommandment,
          social: {
            ...prev.social,
            ...editedProfile.social,
          }
        } : null)
        setIsEditModalOpen(false)
        setShowCommandmentSelector(false)
        setEditingField(null)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Toggle visibility for a specific field
  const toggleFieldVisibility = async (field: keyof FieldVisibility) => {
    const newVisibility = {
      ...fieldVisibility,
      [field]: !fieldVisibility[field],
    }
    setFieldVisibility(newVisibility)

    // Save to server
    try {
      await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privacySettings: newVisibility }),
      })
    } catch (error) {
      console.error('Error saving visibility:', error)
      // Revert on error
      setFieldVisibility(fieldVisibility)
    }
  }

  // Save experience from modal
  const handleExperienceSave = async (experiences: Experience[]) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experience: experiences }),
      })

      if (res.ok) {
        setProfile(prev => prev ? { ...prev, experience: experiences } : null)
        setEditedProfile(prev => ({ ...prev, experience: experiences }))
      }
    } catch (error) {
      console.error('Error saving experience:', error)
      throw error
    }
  }

  // Save education from modal
  const handleEducationSave = async (education: Education[]) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ education }),
      })

      if (res.ok) {
        setProfile(prev => prev ? { ...prev, education } : null)
        setEditedProfile(prev => ({ ...prev, education }))
      }
    } catch (error) {
      console.error('Error saving education:', error)
      throw error
    }
  }

  // Save skills and interests from modal
  const handleSkillsSave = async (skills: string[], interests: string[]) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expertise: skills, interests }),
      })

      if (res.ok) {
        setProfile(prev => prev ? { ...prev, skills, interests } : null)
        setEditedProfile(prev => ({ ...prev, skills, interests }))
      }
    } catch (error) {
      console.error('Error saving skills:', error)
      throw error
    }
  }

  // Save custom values
  const handleValuesSave = async (customValues: string[]) => {
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customValues }),
      })

      if (res.ok) {
        setProfile(prev => prev ? { ...prev, customValues } : null)
        setEditedProfile(prev => ({ ...prev, customValues }))
      }
    } catch (error) {
      console.error('Error saving values:', error)
      throw error
    }
  }

  // Visibility Toggle Button Component
  const VisibilityToggle = ({ field, className = '' }: { field: keyof FieldVisibility; className?: string }) => {
    if (!isOwnProfile) return null

    const isVisible = fieldVisibility[field]
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleFieldVisibility(field)
        }}
        className={`p-1 rounded transition-colors ${className} ${
          isVisible
            ? 'text-[var(--primary)] hover:bg-[var(--primary)]/10'
            : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
        }`}
        title={isVisible ? 'Visible to others - click to hide' : 'Hidden from others - click to show'}
      >
        {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
      </button>
    )
  }

  // Editable Field Component - WYSIWYG inline editing with full hover feedback
  const EditableField = ({
    fieldId,
    value,
    placeholder,
    onChange,
    type = 'text',
    className = '',
    textClassName = '',
    maxLength,
  }: {
    fieldId: string
    value: string
    placeholder: string
    onChange: (value: string) => void
    type?: 'text' | 'textarea'
    className?: string
    textClassName?: string
    maxLength?: number
  }) => {
    const isCurrentlyEditing = editingField === fieldId
    const isEmpty = !value || value.trim() === ''

    // Ghost placeholder state (empty, not editing)
    if (isEmpty && !isCurrentlyEditing) {
      return (
        <div
          onClick={() => setEditingField(fieldId)}
          className={`group cursor-pointer relative ${className}`}
        >
          <span className="opacity-40 italic border-b border-dashed border-current flex items-center gap-1.5 hover:opacity-60 transition-opacity">
            {placeholder}
            <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        </div>
      )
    }

    // Editing state
    if (isCurrentlyEditing) {
      if (type === 'textarea') {
        return (
          <div className={className}>
            <textarea
              autoFocus
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={() => setEditingField(null)}
              onKeyDown={(e) => e.key === 'Escape' && setEditingField(null)}
              className={`w-full bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border-2 border-white/50 focus:border-white outline-none resize-none ${textClassName}`}
              placeholder={placeholder}
              rows={3}
              maxLength={maxLength}
            />
            {maxLength && (
              <p className="text-[10px] text-white/60 text-right mt-1">{value.length}/{maxLength}</p>
            )}
          </div>
        )
      }
      return (
        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditingField(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') setEditingField(null)
          }}
          className={`bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1 border-2 border-white/50 focus:border-white outline-none w-full ${textClassName}`}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )
    }

    // Display state with hover feedback
    return (
      <div
        onClick={() => setEditingField(fieldId)}
        className={`group cursor-pointer relative rounded-lg px-2 py-1 -mx-2 -my-1 hover:bg-white/10 transition-all border border-transparent hover:border-dashed hover:border-white/30 ${className}`}
      >
        <span className={textClassName}>{value}</span>
        <Edit2 className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white/70" />
      </div>
    )
  }

  return (
    <>
    <Card className="border-4 overflow-hidden" style={{ borderColor: commandmentColor }}>
      {/* Digital ID Header — stacks on mobile so the name/commandment
          line never gets crushed against the action buttons. */}
      <div
        className="px-4 sm:px-6 py-4 sm:py-5 relative overflow-hidden"
        style={{ background: commandmentGradient }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="p-2.5 sm:p-3 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg flex-shrink-0">
              <CommandmentIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-white drop-shadow-sm flex-shrink-0" />
                <p className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm truncate">Identity Declaration</p>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide drop-shadow-md truncate">{profile.name || 'Anonymous'}</h2>
              <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-sm truncate">{commandment.name} • {commandment.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
            {/* Show Edit button only when NOT in edit mode */}
            {isOwnProfile && !isEditing && (
              <button
                onClick={handleEditClick}
                className="p-2.5 bg-black/30 hover:bg-black/40 rounded-xl transition-colors backdrop-blur-sm"
                title="Edit Business Card"
              >
                <Edit2 className="w-5 h-5 text-white" />
              </button>
            )}
            {/* Show Save/Cancel buttons when in edit mode */}
            {isEditing && (
              <>
                <button
                  onClick={() => {
                    if (hasUnsavedChanges()) {
                      setShowUnsavedDialog(true)
                    } else {
                      setEditedProfile({ ...savedProfile })
                      setSelectedCommandment(savedCommandment)
                      setIsEditing(false)
                      onClose?.()
                    }
                  }}
                  className="p-2.5 bg-black/30 hover:bg-black/40 rounded-xl transition-colors backdrop-blur-sm"
                  title="Cancel"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-white/30 hover:bg-white/40 rounded-xl transition-colors backdrop-blur-sm flex items-center gap-2"
                  title="Save changes"
                >
                  <Save className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
              </>
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
            {/* Only show separate close button when NOT in edit mode - in edit mode, Cancel handles closing */}
            {onClose && !isEditing && (
              <button
                onClick={handleClose}
                className="p-2.5 bg-black/30 hover:bg-black/40 rounded-xl transition-colors backdrop-blur-sm"
                title="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>

      </div>

      <CardContent className="p-4">
        {/* Commandment Selector — only visible to the profile owner. */}
        {isOwnProfile && isFullView && (
          <div className="mb-4 p-3 bg-[var(--muted)] rounded-xl border-2 border-[var(--border)]">
            <p className="text-xs font-black text-[var(--muted-foreground)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Choose Your Most Resonant Commandment
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMANDMENT_LIST.map((arch) => {
                const Icon = arch.icon
                const isSelected = selectedCommandment === arch.id
                return (
                  <button
                    key={arch.id}
                    onClick={() => setSelectedCommandment(arch.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-transparent text-white shadow-lg scale-105'
                        : 'border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] hover:scale-102'
                    }`}
                    style={isSelected ? { background: arch.colors.gradient } : {}}
                    title={arch.title}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: isSelected ? 'rgba(255,255,255,0.2)' : arch.colors.gradient }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[var(--foreground)]'}`}>
                      {arch.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Main Identity Card - stack vertically in narrow containers */}
        <div className="flex flex-col gap-4">
          {/* Core Identity */}
          <div
            className="p-5 rounded-2xl relative overflow-hidden"
            style={{ background: commandmentGradient }}
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
                    <p className="text-sm font-medium text-white/90 truncate">{profile.headline || commandment.title}</p>
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
                {/* Location with visibility toggle */}
                <div className="flex items-center gap-2">
                  {(profile.location || isEditing) ? (
                    <>
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
                        <span className="text-white flex-1">{profile.location}</span>
                      )}
                      <VisibilityToggle field="showLocation" className="text-white/70" />
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-white/50 flex-shrink-0" />
                      <span className="italic border-b border-dashed border-white/30 text-white/50 text-xs flex-1">Add location</span>
                      <VisibilityToggle field="showLocation" className="text-white/70" />
                    </>
                  )}
                </div>

                {/* Email with visibility toggle */}
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-white/75 flex-shrink-0" />
                  <span className="text-white truncate flex-1">{profile.email || 'No email'}</span>
                  <VisibilityToggle field="showEmail" className="text-white/70" />
                </div>

                {/* Phone with visibility toggle */}
                <div className="flex items-center gap-2">
                  {(profile.phone || isEditing) ? (
                    <>
                      <Phone className="w-3.5 h-3.5 text-white/75 flex-shrink-0" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.phone || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-transparent border-b border-white/30 focus:border-white/50 outline-none flex-1 placeholder-white/50 text-white"
                          placeholder="Your phone number"
                        />
                      ) : (
                        <span className="text-white flex-1">{profile.phone}</span>
                      )}
                      <VisibilityToggle field="showPhone" className="text-white/70" />
                    </>
                  ) : (
                    <>
                      <Phone className="w-3.5 h-3.5 text-white/50 flex-shrink-0" />
                      <span className="italic border-b border-dashed border-white/30 text-white/50 text-xs flex-1">Add phone number</span>
                      <VisibilityToggle field="showPhone" className="text-white/70" />
                    </>
                  )}
                </div>
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
                borderColor: commandmentColor,
                backgroundColor: `color-mix(in srgb, ${commandmentColor} 10%, var(--background))`
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <CommandmentIcon className="w-5 h-5 flex-shrink-0" style={{ color: commandmentColor }} />
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-[var(--muted-foreground)] uppercase">I Embody</p>
                  <p className="text-base font-black truncate" style={{ color: commandmentColor }}>{commandment.name}</p>
                </div>
              </div>
              <p className="text-xs font-medium text-[var(--muted-foreground)] italic line-clamp-2">{commandment.description}</p>
            </div>

            {/* Values - Editable for profile owner */}
            <div>
              <h4 className="text-[9px] font-black text-[var(--muted-foreground)] uppercase mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Values
                {isOwnProfile && isEditing && (
                  <button
                    onClick={() => setShowValuesModal(true)}
                    className="ml-auto p-1 rounded bg-[var(--muted)] hover:bg-[var(--primary)]/20"
                    title="Edit Values"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}
              </h4>
              <div
                className={`flex flex-wrap gap-1.5 ${isOwnProfile && isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={() => isOwnProfile && isEditing && setShowValuesModal(true)}
              >
                {/* Show user's custom values if any, otherwise just fall
                    back to their chosen commandment as a single chip. */}
                {(profile.customValues && profile.customValues.length > 0
                  ? profile.customValues
                  : [commandment.name]
                ).map((value, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-white text-[10px] font-bold rounded-full"
                    style={{ backgroundColor: commandmentColor }}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-[9px] font-black text-[var(--muted-foreground)] uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Expertise
                </h4>
                <VisibilityToggle field="showSkills" />
              </div>
              {profile.skills.length > 0 ? (
                <div
                  className={`flex flex-wrap gap-1.5 ${isOwnProfile ? 'cursor-pointer hover:opacity-80' : ''}`}
                  onClick={() => isOwnProfile && setShowSkillsModal(true)}
                >
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
              ) : isOwnProfile ? (
                <div
                  className="flex flex-wrap gap-1.5 opacity-30 hover:opacity-50 cursor-pointer transition-opacity"
                  onClick={() => setShowSkillsModal(true)}
                >
                  {['Add skills', 'Add expertise'].map((ghost, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 border border-dashed border-[var(--muted-foreground)] text-[var(--muted-foreground)] text-[10px] font-bold rounded-full italic"
                    >
                      {ghost}
                    </span>
                  ))}
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

            {/* Interests */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-[9px] font-black text-[var(--muted-foreground)] uppercase flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  Interests
                </h4>
                <VisibilityToggle field="showInterests" />
              </div>
              {profile.interests && profile.interests.length > 0 ? (
                <div
                  className={`flex flex-wrap gap-1.5 ${isOwnProfile ? 'cursor-pointer hover:opacity-80' : ''}`}
                  onClick={() => isOwnProfile && setShowSkillsModal(true)}
                >
                  {profile.interests.slice(0, 4).map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[var(--accent)] text-[var(--accent-foreground)] text-[10px] font-bold rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                  {profile.interests.length > 4 && (
                    <span className="px-2 py-0.5 bg-[var(--muted)] text-[var(--muted-foreground)] text-[10px] font-bold rounded-full">
                      +{profile.interests.length - 4}
                    </span>
                  )}
                </div>
              ) : isOwnProfile ? (
                <div
                  className="flex flex-wrap gap-1.5 opacity-30 hover:opacity-50 cursor-pointer transition-opacity"
                  onClick={() => setShowSkillsModal(true)}
                >
                  {['Add interests', 'Add passions'].map((ghost, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 border border-dashed border-[var(--muted-foreground)] text-[var(--muted-foreground)] text-[10px] font-bold rounded-full italic"
                    >
                      {ghost}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5 opacity-30">
                  {['Interest 1', 'Interest 2'].map((ghost, idx) => (
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
                <p className="text-lg font-black" style={{ color: commandmentColor }}>{profile.projectsCreated || 0}</p>
                <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase">Projects</p>
              </div>
              <div className="p-2 bg-[var(--muted)] rounded-lg">
                <p className="text-lg font-black" style={{ color: commandmentColor }}>{profile.articlesWritten || 0}</p>
                <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase">Articles</p>
              </div>
              <div className="p-2 bg-[var(--muted)] rounded-lg">
                <p className="text-lg font-black" style={{ color: commandmentColor }}>{profile.followers || 0}</p>
                <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase">Followers</p>
              </div>
              <div className="p-2 bg-[var(--muted)] rounded-lg">
                <p className="text-lg font-black" style={{ color: commandmentColor }}>{profile.modulesCompleted || 0}</p>
                <p className="text-[8px] font-bold text-[var(--muted-foreground)] uppercase">Modules</p>
              </div>
            </div>

            {/* Social Links - Always show in edit mode, clickable to edit */}
            <div className="flex flex-wrap gap-1.5">
              {/* Website */}
              {isEditing && editingField === 'website' ? (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[var(--muted)] rounded-lg">
                  <Globe className="w-3.5 h-3.5 text-[var(--foreground)]" />
                  <input
                    autoFocus
                    type="url"
                    value={editedProfile.social?.website || ''}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      social: { ...prev.social, website: e.target.value }
                    }))}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setEditingField(null) }}
                    className="bg-transparent border-none outline-none text-xs font-bold w-32"
                    placeholder="https://yoursite.com"
                  />
                </div>
              ) : profile.social.website || (isEditing && isOwnProfile) ? (
                isEditing && isOwnProfile ? (
                  <button
                    onClick={() => setEditingField('website')}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      profile.social.website
                        ? 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]'
                        : 'border border-dashed border-[var(--muted-foreground)] text-[var(--muted-foreground)] italic opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {profile.social.website ? 'Web' : 'Add Website'}
                  </button>
                ) : (
                  <a
                    href={profile.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-[var(--muted)] text-[var(--foreground)] rounded-lg hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors text-xs font-bold"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Web
                  </a>
                )
              ) : null}

              {/* LinkedIn */}
              {isEditing && editingField === 'linkedin' ? (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[var(--muted)] rounded-lg">
                  <Linkedin className="w-3.5 h-3.5 text-[var(--foreground)]" />
                  <input
                    autoFocus
                    type="url"
                    value={editedProfile.social?.linkedin || ''}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      social: { ...prev.social, linkedin: e.target.value }
                    }))}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setEditingField(null) }}
                    className="bg-transparent border-none outline-none text-xs font-bold w-36"
                    placeholder="linkedin.com/in/you"
                  />
                </div>
              ) : profile.social.linkedin || (isEditing && isOwnProfile) ? (
                isEditing && isOwnProfile ? (
                  <button
                    onClick={() => setEditingField('linkedin')}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      profile.social.linkedin
                        ? 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]'
                        : 'border border-dashed border-[var(--muted-foreground)] text-[var(--muted-foreground)] italic opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    {profile.social.linkedin ? 'LinkedIn' : 'Add LinkedIn'}
                  </button>
                ) : (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-[var(--muted)] text-[var(--foreground)] rounded-lg hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors text-xs font-bold"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )
              ) : null}

              {/* Twitter/X */}
              {isEditing && editingField === 'twitter' ? (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[var(--muted)] rounded-lg">
                  <Twitter className="w-3.5 h-3.5 text-[var(--foreground)]" />
                  <input
                    autoFocus
                    type="url"
                    value={editedProfile.social?.twitter || ''}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      social: { ...prev.social, twitter: e.target.value }
                    }))}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setEditingField(null) }}
                    className="bg-transparent border-none outline-none text-xs font-bold w-32"
                    placeholder="x.com/handle"
                  />
                </div>
              ) : profile.social.twitter || (isEditing && isOwnProfile) ? (
                isEditing && isOwnProfile ? (
                  <button
                    onClick={() => setEditingField('twitter')}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      profile.social.twitter
                        ? 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]'
                        : 'border border-dashed border-[var(--muted-foreground)] text-[var(--muted-foreground)] italic opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    {profile.social.twitter ? 'X' : 'Add X'}
                  </button>
                ) : (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-[var(--muted)] text-[var(--foreground)] rounded-lg hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors text-xs font-bold"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    X
                  </a>
                )
              ) : null}
            </div>
          </div>
        </div>

        {/* Expanded Section - Full Profile Resume */}
        {isExpanded && (
          <div ref={expandedSectionRef} className="mt-6 pt-6 border-t-2 border-[var(--border)]">
            {/* Privacy Indicator */}
            {isModalContext && (
              <div className="mb-4 p-3 bg-[var(--muted)] rounded-lg border border-[var(--border)]">
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-[var(--primary)]" />
                  <span className="font-bold text-[var(--foreground)]">Profile Visibility</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  Ghost text shows fields you can fill in. Control what others see in{' '}
                  <a href="/settings" className="text-[var(--primary)] hover:underline inline-flex items-center gap-1">
                    <Settings className="w-3 h-3" />
                    Settings
                  </a>
                </p>
              </div>
            )}

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
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-black text-[var(--foreground)] flex items-center gap-2">
                    <Briefcase className="w-4 h-4" style={{ color: commandmentColor }} />
                    Experience
                  </h4>
                  <VisibilityToggle field="showExperience" />
                </div>
                {profile.experience.length > 0 ? (
                  <div
                    className={`space-y-3 ${isOwnProfile ? 'cursor-pointer hover:opacity-80' : ''}`}
                    onClick={() => isOwnProfile && setShowExperienceModal(true)}
                  >
                    {profile.experience.slice(0, 2).map((exp: any, idx: number) => (
                      <div key={idx} className="border-l-2 pl-3" style={{ borderColor: commandmentColor }}>
                        <h5 className="text-sm font-black text-[var(--foreground)]">{exp.title}</h5>
                        <p className="text-xs font-bold text-[var(--muted-foreground)]">{exp.company}</p>
                        <p className="text-[10px] font-medium text-[var(--muted-foreground)]">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : isOwnProfile ? (
                  <div
                    className="space-y-3 opacity-30 hover:opacity-50 cursor-pointer transition-opacity"
                    onClick={() => setShowExperienceModal(true)}
                  >
                    <div className="border-l-2 border-dashed border-[var(--muted-foreground)] pl-3">
                      <p className="text-sm font-black text-[var(--muted-foreground)] italic">Add your position</p>
                      <p className="text-xs font-bold text-[var(--muted-foreground)] italic">Organization</p>
                      <p className="text-[10px] font-medium text-[var(--muted-foreground)]">Click to add experience...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 opacity-30">
                    <div className="border-l-2 border-dashed border-[var(--muted-foreground)] pl-3">
                      <p className="text-sm font-black text-[var(--muted-foreground)] italic">Your Position</p>
                      <p className="text-xs font-bold text-[var(--muted-foreground)] italic">Organization</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-black text-[var(--foreground)] flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" style={{ color: commandmentColor }} />
                    Education
                  </h4>
                  <VisibilityToggle field="showEducation" />
                </div>
                {profile.education.length > 0 ? (
                  <div
                    className={`space-y-3 ${isOwnProfile ? 'cursor-pointer hover:opacity-80' : ''}`}
                    onClick={() => isOwnProfile && setShowEducationModal(true)}
                  >
                    {profile.education.slice(0, 2).map((edu: any, idx: number) => (
                      <div key={idx} className="border-l-2 pl-3" style={{ borderColor: commandmentColor }}>
                        <h5 className="text-sm font-black text-[var(--foreground)]">{edu.degree}</h5>
                        <p className="text-xs font-bold text-[var(--muted-foreground)]">{edu.school}</p>
                        <p className="text-[10px] font-medium text-[var(--muted-foreground)]">{edu.graduationYear}</p>
                      </div>
                    ))}
                  </div>
                ) : isOwnProfile ? (
                  <div
                    className="space-y-3 opacity-30 hover:opacity-50 cursor-pointer transition-opacity"
                    onClick={() => setShowEducationModal(true)}
                  >
                    <div className="border-l-2 border-dashed border-[var(--muted-foreground)] pl-3">
                      <p className="text-sm font-black text-[var(--muted-foreground)] italic">Add your degree</p>
                      <p className="text-xs font-bold text-[var(--muted-foreground)] italic">Institution</p>
                      <p className="text-[10px] font-medium text-[var(--muted-foreground)]">Click to add education...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 opacity-30">
                    <div className="border-l-2 border-dashed border-[var(--muted-foreground)] pl-3">
                      <p className="text-sm font-black text-[var(--muted-foreground)] italic">Degree / Certification</p>
                      <p className="text-xs font-bold text-[var(--muted-foreground)] italic">Institution</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" style={{ color: commandmentColor }} />
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
                  style={{ backgroundColor: commandmentColor }}
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
              &ldquo;{commandment.description}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: commandmentColor }} />
              <p className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">
                We the People of Project Exodus
              </p>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: commandmentColor }} />
            </div>
          </div>
        </div>
      </CardContent>

      {/* Unsaved Changes Dialog */}
      <UnsavedChangesDialog
        isOpen={showUnsavedDialog}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onCancel={() => setShowUnsavedDialog(false)}
        isSaving={isSaving}
      />
    </Card>

    {/* Edit Modals for Complex Fields */}
    {isOwnProfile && (
      <>
        <ExperienceEditModal
          isOpen={showExperienceModal}
          onClose={() => setShowExperienceModal(false)}
          experiences={profile.experience || []}
          onSave={handleExperienceSave}
        />
        <EducationEditModal
          isOpen={showEducationModal}
          onClose={() => setShowEducationModal(false)}
          education={profile.education || []}
          onSave={handleEducationSave}
        />
        <SkillsEditModal
          isOpen={showSkillsModal}
          onClose={() => setShowSkillsModal(false)}
          skills={profile.skills || []}
          interests={profile.interests || []}
          onSave={handleSkillsSave}
        />
        <ValuesEditModal
          isOpen={showValuesModal}
          onClose={() => setShowValuesModal(false)}
          values={profile.customValues || []}
          onSave={handleValuesSave}
          predefinedValues={PREDEFINED_VALUES}
          commandmentColor={commandmentColor}
        />
      </>
    )}
    </>
  )
}
