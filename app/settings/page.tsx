'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Trash2,
  Save,
  Camera,
  ArrowLeft,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Edit2,
  X,
  Globe,
  Linkedin,
  Twitter,
  MapPin,
  Building2,
  Calendar as CalendarIcon,
  Eye,
} from 'lucide-react'
import Link from 'next/link'

interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  school: string
  degree: string
  fieldOfStudy: string
  startYear: string
  endYear: string
  current: boolean
}

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    headline: '',
    bio: '',
    jobTitle: '',
    company: '',
    location: '',
    website: '',
    linkedin: '',
    twitter: '',
  })

  // Work Experience state
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [isAddingExperience, setIsAddingExperience] = useState(false)

  // Education state
  const [educations, setEducations] = useState<Education[]>([])
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [isAddingEducation, setIsAddingEducation] = useState(false)

  // Skills state
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')

  // Interests state
  const [interests, setInterests] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState('')


  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    newsletter: true,
    communityUpdates: true,
    productUpdates: false,
    messages: true,
    connectionRequests: true,
    endorsements: true,
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'followers', // 'public' | 'followers' | 'private'
    showExperience: true,
    showEducation: true,
    showSkills: true,
    showBadges: true,
    showContact: false,
    showEmail: false,
    showPhone: false,
    allowMessages: 'followers', // 'everyone' | 'followers' | 'nobody'
    resumeVisibility: 'followers', // Always 'followers' (enforced)
  })

  // Fetch user profile data on mount
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProfile()
    }
  }, [session?.user?.id])

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user?.id}`)
      const data = await res.json()

      if (data.success) {
        const user = data.data
        setProfileData({
          name: user.name || '',
          email: user.email || '',
          headline: user.headline || '',
          bio: user.bio || '',
          jobTitle: user.jobTitle || '',
          company: user.company || '',
          location: user.location || '',
          website: user.website || '',
          linkedin: user.linkedin || '',
          twitter: user.twitter || '',
        })
        setExperiences(user.experience || [])
        setEducations(user.education || [])
        setSkills(user.expertise || [])
        setInterests(user.interests || [])
        // Load privacy settings if they exist
        if (user.privacySettings) {
          setPrivacySettings({
            ...privacySettings,
            ...user.privacySettings,
          })
        }
        // Load notification preferences if they exist
        if (user.notificationPreferences) {
          setNotifications({
            ...notifications,
            ...user.notificationPreferences,
          })
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })

      if (res.ok) {
        setSaveMessage('Profile updated successfully!')
      } else {
        setSaveMessage('Failed to update profile')
      }
    } catch (error) {
      setSaveMessage('Error updating profile')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleExperienceSave = async () => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experience: experiences }),
      })

      if (res.ok) {
        setSaveMessage('Work experience updated successfully!')
        setIsAddingExperience(false)
        setEditingExperience(null)
      } else {
        setSaveMessage('Failed to update work experience')
      }
    } catch (error) {
      setSaveMessage('Error updating work experience')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleEducationSave = async () => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ education: educations }),
      })

      if (res.ok) {
        setSaveMessage('Education updated successfully!')
        setIsAddingEducation(false)
        setEditingEducation(null)
      } else {
        setSaveMessage('Failed to update education')
      }
    } catch (error) {
      setSaveMessage('Error updating education')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleSkillsSave = async () => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expertise: skills, interests }),
      })

      if (res.ok) {
        setSaveMessage('Skills & interests updated successfully!')
      } else {
        setSaveMessage('Failed to update skills')
      }
    } catch (error) {
      setSaveMessage('Error updating skills')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveMessage('Passwords do not match!')
      setTimeout(() => setSaveMessage(''), 3000)
      return
    }

    setIsSaving(true)

    // Simulate API call (implement actual password change endpoint)
    setTimeout(() => {
      setSaveMessage('Password changed successfully!')
      setIsSaving(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSaveMessage(''), 3000)
    }, 1000)
  }

  const handleNotificationsSave = async () => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationPreferences: notifications }),
      })

      if (res.ok) {
        setSaveMessage('Notification preferences updated!')
      } else {
        const data = await res.json()
        setSaveMessage(data.error || 'Failed to save notification preferences')
      }
    } catch {
      setSaveMessage('Failed to save notification preferences')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handlePrivacySave = async () => {
    setIsSaving(true)

    try {
      const res = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privacySettings }),
      })

      if (res.ok) {
        setSaveMessage('Privacy settings updated!')
      } else {
        setSaveMessage('Failed to update privacy settings')
      }
    } catch (error) {
      setSaveMessage('Error updating privacy settings')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }
    setExperiences([...experiences, newExp])
    setEditingExperience(newExp)
    setIsAddingExperience(true)
  }

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
    handleExperienceSave()
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      current: false,
    }
    setEducations([...educations, newEdu])
    setEditingEducation(newEdu)
    setIsAddingEducation(true)
  }

  const deleteEducation = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id))
    handleEducationSave()
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest('')
    }
  }

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Expertise', icon: Sparkles },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy Settings', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/my/volition"
              className="inline-flex items-center gap-2 text-theme-primary hover:opacity-80 font-bold mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Volition
            </Link>
            <h1 className="text-4xl font-black text-[var(--foreground)] mb-2">PROFESSIONAL SETTINGS</h1>
            <p className="text-lg font-semibold text-theme-muted">
              Build your professional profile and manage your account
            </p>
          </div>

          {/* Toast Notification - Fixed position */}
          {saveMessage && (
            <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className={`p-4 rounded-xl shadow-2xl border-2 ${
                saveMessage.toLowerCase().includes('failed') || saveMessage.toLowerCase().includes('error')
                  ? 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--card))] border-theme-secondary'
                  : 'bg-[color-mix(in_srgb,var(--primary)_20%,var(--card))] border-theme-primary'
              }`}>
                <p className={`font-bold ${
                  saveMessage.toLowerCase().includes('failed') || saveMessage.toLowerCase().includes('error')
                    ? 'text-theme-secondary'
                    : 'text-theme-primary'
                }`}>
                  {saveMessage}
                </p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT SIDEBAR TABS (1/3) */}
            <div className="lg:col-span-1">
              <Card className="border-4 border-theme-primary sticky top-24">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${
                          activeTab === tab.id
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                            : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT CONTENT (2/3) */}
            <div className="lg:col-span-2">
              {/* PROFILE INFO TAB */}
              {activeTab === 'profile' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <User className="w-6 h-6" />
                      PROFILE INFORMATION
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSave} className="space-y-6">
                      {/* Avatar */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-3">
                          PROFILE PICTURE
                        </label>
                        <div className="flex items-center gap-6">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
                            {session.user?.image ? (
                              <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-12 h-12 text-[var(--primary-foreground)]" />
                            )}
                          </div>
                          <div>
                            <Button type="button" variant="outline" className="font-bold mb-2">
                              <Camera className="w-4 h-4 mr-2" />
                              UPLOAD PHOTO
                            </Button>
                            <p className="text-xs font-medium text-theme-muted">
                              JPG, PNG or GIF. Max 2MB.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="john@example.com"
                          required
                        />
                      </div>

                      {/* Headline */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          PROFESSIONAL HEADLINE
                        </label>
                        <input
                          type="text"
                          value={profileData.headline}
                          onChange={(e) => setProfileData({ ...profileData, headline: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Sustainability Consultant | Renewable Energy Expert"
                        />
                        <p className="text-xs font-medium text-theme-muted mt-2">
                          A brief professional tagline (e.g., your role and expertise)
                        </p>
                      </div>

                      {/* Current Position */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                            JOB TITLE
                          </label>
                          <input
                            type="text"
                            value={profileData.jobTitle}
                            onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                            placeholder="Senior Engineer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                            COMPANY
                          </label>
                          <input
                            type="text"
                            value={profileData.company}
                            onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                            placeholder="Green Energy Corp"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          LOCATION
                        </label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="San Francisco, CA"
                        />
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          PROFESSIONAL SUMMARY
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          rows={6}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium resize-none"
                          placeholder="Tell us about your professional background, sustainability journey, and what drives your passion for environmental impact..."
                          maxLength={500}
                        />
                        <p className="text-xs font-medium text-theme-muted mt-2">
                          {profileData.bio.length} / 500 characters
                        </p>
                      </div>

                      {/* Social Links */}
                      <div>
                        <h4 className="text-base font-black text-[var(--foreground)] mb-4">SOCIAL LINKS</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-theme-primary flex-shrink-0" />
                            <input
                              type="url"
                              value={profileData.website}
                              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                              className="flex-1 px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="https://yourwebsite.com"
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Linkedin className="w-5 h-5 text-theme-primary flex-shrink-0" />
                            <input
                              type="url"
                              value={profileData.linkedin}
                              onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                              className="flex-1 px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="https://linkedin.com/in/yourprofile"
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Twitter className="w-5 h-5 text-theme-primary flex-shrink-0" />
                            <input
                              type="url"
                              value={profileData.twitter}
                              onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                              className="flex-1 px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="https://twitter.com/yourhandle"
                            />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full font-black" disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'SAVING...' : 'SAVE PROFILE'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* WORK EXPERIENCE TAB */}
              {activeTab === 'experience' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Briefcase className="w-6 h-6" />
                      WORK EXPERIENCE
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Existing Experiences */}
                    {experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-6 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] space-y-4"
                      >
                        {editingExperience?.id === exp.id ? (
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => {
                                setExperiences(
                                  experiences.map((x) =>
                                    x.id === exp.id ? { ...x, title: e.target.value } : x
                                  )
                                )
                              }}
                              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="Job Title *"
                            />
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                setExperiences(
                                  experiences.map((x) =>
                                    x.id === exp.id ? { ...x, company: e.target.value } : x
                                  )
                                )
                              }}
                              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="Company *"
                            />
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => {
                                setExperiences(
                                  experiences.map((x) =>
                                    x.id === exp.id ? { ...x, location: e.target.value } : x
                                  )
                                )
                              }}
                              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="Location"
                            />
                            <div className="grid md:grid-cols-2 gap-4">
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => {
                                  setExperiences(
                                    experiences.map((x) =>
                                      x.id === exp.id ? { ...x, startDate: e.target.value } : x
                                    )
                                  )
                                }}
                                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              />
                              <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => {
                                  setExperiences(
                                    experiences.map((x) =>
                                      x.id === exp.id ? { ...x, endDate: e.target.value } : x
                                    )
                                  )
                                }}
                                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                                disabled={exp.current}
                              />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => {
                                  setExperiences(
                                    experiences.map((x) =>
                                      x.id === exp.id
                                        ? { ...x, current: e.target.checked, endDate: e.target.checked ? '' : x.endDate }
                                        : x
                                    )
                                  )
                                }}
                                className="w-4 h-4 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                              />
                              <span className="font-bold text-sm text-[var(--foreground)]">I currently work here</span>
                            </label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => {
                                setExperiences(
                                  experiences.map((x) =>
                                    x.id === exp.id ? { ...x, description: e.target.value } : x
                                  )
                                )
                              }}
                              rows={4}
                              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium resize-none"
                              placeholder="Describe your responsibilities, achievements, and impact..."
                            />
                            <div className="flex gap-3">
                              <Button
                                type="button"
                                onClick={() => {
                                  setEditingExperience(null)
                                  setIsAddingExperience(false)
                                  handleExperienceSave()
                                }}
                                className="font-bold"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                SAVE
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  if (isAddingExperience) {
                                    setExperiences(experiences.filter((x) => x.id !== exp.id))
                                    setIsAddingExperience(false)
                                  }
                                  setEditingExperience(null)
                                }}
                              >
                                CANCEL
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div>
                              <h4 className="text-lg font-black text-[var(--foreground)]">{exp.title}</h4>
                              <p className="text-base font-bold text-theme-primary flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                {exp.company}
                              </p>
                              {exp.location && (
                                <p className="text-sm font-medium text-theme-muted flex items-center gap-2 mt-1">
                                  <MapPin className="w-4 h-4" />
                                  {exp.location}
                                </p>
                              )}
                              <p className="text-sm font-medium text-theme-muted flex items-center gap-2 mt-1">
                                <CalendarIcon className="w-4 h-4" />
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                            </div>
                            {exp.description && (
                              <p className="text-sm font-medium text-[var(--foreground)] leading-relaxed">
                                {exp.description}
                              </p>
                            )}
                            <div className="flex gap-3 pt-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingExperience(exp)}
                                className="font-bold"
                              >
                                <Edit2 className="w-3 h-3 mr-2" />
                                EDIT
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => deleteExperience(exp.id)}
                                className="font-bold text-theme-secondary hover:text-theme-secondary"
                              >
                                <Trash2 className="w-3 h-3 mr-2" />
                                DELETE
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {/* Add Experience Button */}
                    {!isAddingExperience && !editingExperience && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addExperience}
                        className="w-full font-black border-2 border-dashed"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        ADD ANOTHER EXPERIENCE
                      </Button>
                    )}

                    {experiences.length === 0 && !isAddingExperience && (
                      <div className="text-center py-12">
                        <Briefcase className="w-12 h-12 text-theme-muted mx-auto mb-4" />
                        <p className="text-base font-bold text-theme-muted">No work experience added yet</p>
                        <p className="text-sm font-medium text-theme-muted mt-2">
                          Showcase your professional journey and career highlights
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* EDUCATION TAB */}
              {activeTab === 'education' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <GraduationCap className="w-6 h-6" />
                      EDUCATION
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Existing Education */}
                    {educations.map((edu) => (
                      <div
                        key={edu.id}
                        className="p-6 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] space-y-4"
                      >
                        {editingEducation?.id === edu.id ? (
                          <div className="space-y-4">
                            <input
                              type="text"
                              value={edu.school}
                              onChange={(e) => {
                                setEducations(
                                  educations.map((x) =>
                                    x.id === edu.id ? { ...x, school: e.target.value } : x
                                  )
                                )
                              }}
                              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="School/University *"
                            />
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => {
                                setEducations(
                                  educations.map((x) =>
                                    x.id === edu.id ? { ...x, degree: e.target.value } : x
                                  )
                                )
                              }}
                              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="Degree (e.g., Bachelor of Science) *"
                            />
                            <input
                              type="text"
                              value={edu.fieldOfStudy}
                              onChange={(e) => {
                                setEducations(
                                  educations.map((x) =>
                                    x.id === edu.id ? { ...x, fieldOfStudy: e.target.value } : x
                                  )
                                )
                              }}
                              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                              placeholder="Field of Study *"
                            />
                            <div className="grid md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={edu.startYear}
                                onChange={(e) => {
                                  setEducations(
                                    educations.map((x) =>
                                      x.id === edu.id ? { ...x, startYear: e.target.value } : x
                                    )
                                  )
                                }}
                                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                                placeholder="Start Year (e.g., 2018)"
                              />
                              <input
                                type="text"
                                value={edu.endYear}
                                onChange={(e) => {
                                  setEducations(
                                    educations.map((x) =>
                                      x.id === edu.id ? { ...x, endYear: e.target.value } : x
                                    )
                                  )
                                }}
                                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                                placeholder="End Year (e.g., 2022)"
                                disabled={edu.current}
                              />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={edu.current}
                                onChange={(e) => {
                                  setEducations(
                                    educations.map((x) =>
                                      x.id === edu.id
                                        ? { ...x, current: e.target.checked, endYear: e.target.checked ? '' : x.endYear }
                                        : x
                                    )
                                  )
                                }}
                                className="w-4 h-4 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                              />
                              <span className="font-bold text-sm text-[var(--foreground)]">Currently enrolled</span>
                            </label>
                            <div className="flex gap-3">
                              <Button
                                type="button"
                                onClick={() => {
                                  setEditingEducation(null)
                                  setIsAddingEducation(false)
                                  handleEducationSave()
                                }}
                                className="font-bold"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                SAVE
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  if (isAddingEducation) {
                                    setEducations(educations.filter((x) => x.id !== edu.id))
                                    setIsAddingEducation(false)
                                  }
                                  setEditingEducation(null)
                                }}
                              >
                                CANCEL
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div>
                              <h4 className="text-lg font-black text-[var(--foreground)]">{edu.school}</h4>
                              <p className="text-base font-bold text-theme-primary">
                                {edu.degree} - {edu.fieldOfStudy}
                              </p>
                              <p className="text-sm font-medium text-theme-muted flex items-center gap-2 mt-1">
                                <CalendarIcon className="w-4 h-4" />
                                {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                              </p>
                            </div>
                            <div className="flex gap-3 pt-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingEducation(edu)}
                                className="font-bold"
                              >
                                <Edit2 className="w-3 h-3 mr-2" />
                                EDIT
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => deleteEducation(edu.id)}
                                className="font-bold text-theme-secondary hover:text-theme-secondary"
                              >
                                <Trash2 className="w-3 h-3 mr-2" />
                                DELETE
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {/* Add Education Button */}
                    {!isAddingEducation && !editingEducation && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addEducation}
                        className="w-full font-black border-2 border-dashed"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        ADD ANOTHER EDUCATION
                      </Button>
                    )}

                    {educations.length === 0 && !isAddingEducation && (
                      <div className="text-center py-12">
                        <GraduationCap className="w-12 h-12 text-theme-muted mx-auto mb-4" />
                        <p className="text-base font-bold text-theme-muted">No education added yet</p>
                        <p className="text-sm font-medium text-theme-muted mt-2">
                          Share your academic background and certifications
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* SKILLS & EXPERTISE TAB */}
              {activeTab === 'skills' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      SKILLS & EXPERTISE
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Skills Section */}
                    <div>
                      <h4 className="text-base font-black text-[var(--foreground)] mb-4">PROFESSIONAL SKILLS</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skills.map((skill) => (
                          <div
                            key={skill}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-bold text-sm"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="hover:opacity-70 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {skills.length === 0 && (
                          <p className="text-sm font-medium text-theme-muted py-4">
                            No skills added yet. Add your professional skills to help others find you.
                          </p>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          className="flex-1 px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Add a skill (e.g., Solar Panel Installation, Carbon Accounting)"
                        />
                        <Button type="button" onClick={addSkill} className="font-bold">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs font-medium text-theme-muted mt-2">
                        Press Enter or click + to add each skill
                      </p>
                    </div>

                    {/* Interests Section */}
                    <div>
                      <h4 className="text-base font-black text-[var(--foreground)] mb-4">SUSTAINABILITY INTERESTS</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {interests.map((interest) => (
                          <div
                            key={interest}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--muted)] border-2 border-theme-primary text-theme-primary font-bold text-sm"
                          >
                            {interest}
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="hover:opacity-70 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {interests.length === 0 && (
                          <p className="text-sm font-medium text-theme-muted py-4">
                            No interests added yet. Share what sustainability topics you're passionate about.
                          </p>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                          className="flex-1 px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Add an interest (e.g., Renewable Energy, Ocean Conservation)"
                        />
                        <Button type="button" onClick={addInterest} className="font-bold">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs font-medium text-theme-muted mt-2">
                        Press Enter or click + to add each interest
                      </p>
                    </div>

                    <Button
                      type="button"
                      onClick={handleSkillsSave}
                      className="w-full font-black"
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'SAVING...' : 'SAVE SKILLS & INTERESTS'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Lock className="w-6 h-6" />
                      SECURITY
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      <div className="p-4 bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] border-2 border-theme-accent rounded-lg">
                        <div className="flex gap-3">
                          <AlertCircle className="w-5 h-5 text-theme-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-sm text-[var(--foreground)] mb-1">
                              Password Requirements
                            </p>
                            <ul className="text-xs font-medium text-theme-muted space-y-1">
                              <li>• At least 8 characters long</li>
                              <li>• Include uppercase and lowercase letters</li>
                              <li>• Include at least one number</li>
                              <li>• Include at least one special character</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          CURRENT PASSWORD *
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Enter your current password"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          NEW PASSWORD *
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Enter your new password"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                          CONFIRM NEW PASSWORD *
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                          placeholder="Confirm your new password"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full font-black" disabled={isSaving}>
                        <Lock className="w-4 h-4 mr-2" />
                        {isSaving ? 'UPDATING...' : 'UPDATE PASSWORD'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Bell className="w-6 h-6" />
                      NOTIFICATION PREFERENCES
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm font-medium text-theme-muted">
                      Choose what notifications you'd like to receive
                    </p>

                    <div className="space-y-4">
                      {/* Email Notifications */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Email Notifications</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            Receive email updates about your account activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) =>
                              setNotifications({ ...notifications, email: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Newsletter */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Newsletter</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            Monthly sustainability insights and platform updates
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.newsletter}
                            onChange={(e) =>
                              setNotifications({ ...notifications, newsletter: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Community Updates */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Community Updates</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            New forum posts, discussions, and community activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.communityUpdates}
                            onChange={(e) =>
                              setNotifications({ ...notifications, communityUpdates: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Product Updates */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Product Updates</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            New features, improvements, and platform announcements
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.productUpdates}
                            onChange={(e) =>
                              setNotifications({ ...notifications, productUpdates: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Messages */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Messages</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            Direct messages from other members
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.messages}
                            onChange={(e) =>
                              setNotifications({ ...notifications, messages: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Connection Requests */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Connection Requests</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            New followers and connection requests
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.connectionRequests}
                            onChange={(e) =>
                              setNotifications({ ...notifications, connectionRequests: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>

                      {/* Endorsements */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)]">
                        <div>
                          <h4 className="font-bold text-[var(--foreground)]">Endorsements</h4>
                          <p className="text-sm font-medium text-theme-muted">
                            When someone endorses your skills
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.endorsements}
                            onChange={(e) =>
                              setNotifications({ ...notifications, endorsements: e.target.checked })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[var(--muted)] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-theme-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleNotificationsSave}
                      className="w-full font-black"
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'SAVING...' : 'SAVE PREFERENCES'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* PRIVACY SETTINGS TAB */}
              {activeTab === 'privacy' && (
                <Card className="border-4 border-theme-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                      <Shield className="w-6 h-6" />
                      PRIVACY SETTINGS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm font-medium text-theme-muted">
                      Control who can see your profile information and contact you
                    </p>

                    {/* Profile Visibility */}
                    <div className="p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] space-y-3">
                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] mb-1">Profile Visibility</h4>
                          <p className="text-sm font-medium text-theme-muted mb-3">
                            Who can view your full profile
                          </p>
                          <select
                            value={privacySettings.profileVisibility}
                            onChange={(e) =>
                              setPrivacySettings({
                                ...privacySettings,
                                profileVisibility: e.target.value as 'public' | 'followers' | 'private',
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-bold"
                          >
                            <option value="public">Public - Anyone can view</option>
                            <option value="followers">Followers Only</option>
                            <option value="private">Private - Only you</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Show/Hide Sections */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-[var(--foreground)]">Show on Profile</h4>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Work Experience</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showExperience}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showExperience: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Education</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showEducation}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showEducation: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Skills & Interests</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showSkills}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showSkills: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Badges & Achievements</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showBadges}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showBadges: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <span className="font-bold text-[var(--foreground)]">Contact Information</span>
                        <input
                          type="checkbox"
                          checked={privacySettings.showContact}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showContact: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <div>
                          <div className="font-bold text-[var(--foreground)]">Show Email Publicly</div>
                          <p className="text-xs font-medium text-theme-muted mt-1">
                            Display your email address on your public profile
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showEmail}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showEmail: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] cursor-pointer">
                        <div>
                          <div className="font-bold text-[var(--foreground)]">Show Phone Publicly</div>
                          <p className="text-xs font-medium text-theme-muted mt-1">
                            Display your phone number on your public profile
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings.showPhone}
                          onChange={(e) =>
                            setPrivacySettings({ ...privacySettings, showPhone: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-2 border-[var(--border)] text-theme-primary focus:ring-2 focus:ring-theme-primary"
                        />
                      </label>
                    </div>

                    {/* Messaging Permissions */}
                    <div className="p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] mb-1">Who Can Message You</h4>
                          <p className="text-sm font-medium text-theme-muted mb-3">
                            Control who can send you direct messages
                          </p>
                          <select
                            value={privacySettings.allowMessages}
                            onChange={(e) =>
                              setPrivacySettings({
                                ...privacySettings,
                                allowMessages: e.target.value as 'everyone' | 'followers' | 'nobody',
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-bold"
                          >
                            <option value="everyone">Everyone</option>
                            <option value="followers">Followers Only</option>
                            <option value="nobody">Nobody</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Resume Visibility */}
                    <div className="p-4 rounded-lg bg-[var(--muted)] border-2 border-[var(--border)] space-y-3">
                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] mb-1">Resume/CV Visibility</h4>
                          <p className="text-sm font-medium text-theme-muted mb-3">
                            Control who can view and download your resume
                          </p>
                          <select
                            value={privacySettings.resumeVisibility}
                            onChange={(e) =>
                              setPrivacySettings({
                                ...privacySettings,
                                resumeVisibility: e.target.value as 'public' | 'followers' | 'private',
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-bold"
                          >
                            <option value="public">Public - Anyone can view</option>
                            <option value="followers">Followers Only</option>
                            <option value="private">Private - Only you</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handlePrivacySave}
                      className="w-full font-black"
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'SAVING...' : 'SAVE PRIVACY SETTINGS'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
