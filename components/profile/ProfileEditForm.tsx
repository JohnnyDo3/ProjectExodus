'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Plus, X, Save, Loader2, User, Briefcase, Sparkles, Link as LinkIcon, Award, Target, TrendingUp, Lock, Bell, Shield, Trash2, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  bio: string | null
  headline: string | null
  banner: string | null
  location: string | null
  company: string | null
  jobTitle: string | null
  website: string | null
  linkedin: string | null
  twitter: string | null
  interests: string[]
  expertise: string[]
  experience: any
  education: any
}

interface ProfileEditFormProps {
  user: User
}

type TabType = 'essential' | 'professional' | 'skills' | 'links' | 'badges' | 'security' | 'notifications' | 'privacy'

export function ProfileEditForm({ user }: ProfileEditFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<TabType>('essential')

  // Badge state
  const [badgeProgress, setBadgeProgress] = useState<any[]>([])
  const [badgeStats, setBadgeStats] = useState({ badgesEarned: 0, goalsCompleted: 0, totalGoals: 0, profileCompletion: 0 })
  const [badges, setBadges] = useState<any[]>([])
  const [loadingBadges, setLoadingBadges] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: user.name || '',
    headline: user.headline || '',
    bio: user.bio || '',
    location: user.location || '',
    company: user.company || '',
    jobTitle: user.jobTitle || '',
    website: user.website || '',
    linkedin: user.linkedin || '',
    twitter: user.twitter || '',
    image: user.image || '',
    banner: user.banner || '',
    interests: user.interests || [],
    expertise: user.expertise || [],
    experience: user.experience || [],
    education: user.education || [],
  })

  const [newInterest, setNewInterest] = useState('')
  const [newExpertise, setNewExpertise] = useState('')

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
  })

  // Experience state
  const [showExperienceForm, setShowExperienceForm] = useState(false)
  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null)
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  // Education state
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [editingEduIndex, setEditingEduIndex] = useState<number | null>(null)
  const [educationForm, setEducationForm] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addInterest = () => {
    if (newInterest.trim() && formData.interests.length < 10) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      })
      setNewInterest('')
    }
  }

  const removeInterest = (index: number) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index)
    })
  }

  const addExpertise = () => {
    if (newExpertise.trim() && formData.expertise.length < 10) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, newExpertise.trim()]
      })
      setNewExpertise('')
    }
  }

  const removeExpertise = (index: number) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((_, i) => i !== index)
    })
  }

  // Experience handlers
  const addExperience = () => {
    if (experienceForm.title && experienceForm.company) {
      if (editingExpIndex !== null) {
        const updated = [...formData.experience]
        updated[editingExpIndex] = experienceForm
        setFormData({ ...formData, experience: updated })
      } else {
        setFormData({
          ...formData,
          experience: [...formData.experience, experienceForm]
        })
      }
      setExperienceForm({ title: '', company: '', startDate: '', endDate: '', description: '' })
      setShowExperienceForm(false)
      setEditingExpIndex(null)
    }
  }

  const editExperience = (index: number) => {
    setExperienceForm(formData.experience[index])
    setEditingExpIndex(index)
    setShowExperienceForm(true)
  }

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_: any, i: number) => i !== index)
    })
  }

  const cancelExperienceForm = () => {
    setExperienceForm({ title: '', company: '', startDate: '', endDate: '', description: '' })
    setShowExperienceForm(false)
    setEditingExpIndex(null)
  }

  // Education handlers
  const addEducation = () => {
    if (educationForm.school && educationForm.degree) {
      if (editingEduIndex !== null) {
        const updated = [...formData.education]
        updated[editingEduIndex] = educationForm
        setFormData({ ...formData, education: updated })
      } else {
        setFormData({
          ...formData,
          education: [...formData.education, educationForm]
        })
      }
      setEducationForm({ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' })
      setShowEducationForm(false)
      setEditingEduIndex(null)
    }
  }

  const editEducation = (index: number) => {
    setEducationForm(formData.education[index])
    setEditingEduIndex(index)
    setShowEducationForm(true)
  }

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_: any, i: number) => i !== index)
    })
  }

  const cancelEducationForm = () => {
    setEducationForm({ school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' })
    setShowEducationForm(false)
    setEditingEduIndex(null)
  }

  // Fetch badge data when badges tab is active
  useEffect(() => {
    if (activeTab === 'badges' && badgeProgress.length === 0) {
      const fetchBadgeData = async () => {
        setLoadingBadges(true)
        try {
          const [progressRes, badgesRes] = await Promise.all([
            fetch('/api/badges/progress'),
            fetch('/api/badges')
          ])

          if (progressRes.ok) {
            const progressData = await progressRes.json()
            setBadgeProgress(progressData.badgeProgress || [])
            setBadgeStats(progressData.stats || { badgesEarned: 0, goalsCompleted: 0, totalGoals: 0, profileCompletion: 0 })
          }

          if (badgesRes.ok) {
            const badgesData = await badgesRes.json()
            setBadges(badgesData.badges || [])
          }
        } catch (error) {
          console.error('Error fetching badge data:', error)
        } finally {
          setLoadingBadges(false)
        }
      }

      fetchBadgeData()
    }
  }, [activeTab, badgeProgress.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        setMessage('✓ Profile updated successfully!')
        setTimeout(() => {
          router.push(`/profile/${user.id}`)
          router.refresh()
        }, 1500)
      } else {
        setMessage(data.error || 'Failed to update profile')
        setLoading(false)
      }
    } catch (error) {
      setMessage('Error updating profile')
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'essential' as TabType, label: 'ESSENTIAL', icon: User },
    { id: 'professional' as TabType, label: 'PROFESSIONAL', icon: Briefcase },
    { id: 'skills' as TabType, label: 'SKILLS', icon: Sparkles },
    { id: 'links' as TabType, label: 'LINKS & IMAGES', icon: LinkIcon },
    { id: 'badges' as TabType, label: 'BADGES & GOALS', icon: Award },
    { id: 'security' as TabType, label: 'SECURITY', icon: Lock },
    { id: 'notifications' as TabType, label: 'NOTIFICATIONS', icon: Bell },
    { id: 'privacy' as TabType, label: 'PRIVACY', icon: Shield },
  ]

  return (
    <form onSubmit={handleSubmit}>
      {/* Tab Navigation */}
      <Card className="border-4 border-theme-primary mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${
                    activeTab === tab.id
                      ? 'bg-theme-primary text-[var(--primary-foreground)] shadow-theme-lg'
                      : 'bg-[var(--muted)] text-theme-muted hover:bg-theme-muted hover:text-[var(--foreground)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Essential Info Tab */}
        {activeTab === 'essential' && (
          <>
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-8">
                <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">
                  BASIC INFORMATION
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      HEADLINE
                    </label>
                    <input
                      type="text"
                      name="headline"
                      value={formData.headline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                      placeholder="e.g., Sustainability Advocate | Green Building Expert"
                      maxLength={120}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      BIO
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium resize-none"
                      placeholder="Tell us about yourself, your passion for sustainability, and your journey..."
                      maxLength={1000}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-theme-muted mb-2">
                        LOCATION
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                        placeholder="City, State, Country"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-theme-muted mb-2">
                        JOB TITLE
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                        placeholder="Your current job title"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      COMPANY / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                      placeholder="Your company or organization"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Professional Tab */}
        {activeTab === 'professional' && (
          <>
            {/* Experience */}
            <Card className="border-4 border-theme-accent">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-[var(--foreground)]">
                    EXPERIENCE
                  </h2>
                  {!showExperienceForm && (
                    <Button type="button" onClick={() => setShowExperienceForm(true)} className="font-black">
                      <Plus className="w-5 h-5 mr-2" />
                      ADD
                    </Button>
                  )}
                </div>

                {/* Experience Form */}
                {showExperienceForm && (
                  <div className="mb-6 p-6 bg-[var(--muted)] rounded-lg border-2 border-theme-accent space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-theme-muted mb-2">
                          JOB TITLE *
                        </label>
                        <input
                          type="text"
                          value={experienceForm.title}
                          onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
                          placeholder="e.g., Sustainability Coordinator"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-theme-muted mb-2">
                          COMPANY *
                        </label>
                        <input
                          type="text"
                          value={experienceForm.company}
                          onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
                          placeholder="e.g., Green Earth Solutions"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-theme-muted mb-2">
                          START DATE
                        </label>
                        <input
                          type="text"
                          value={experienceForm.startDate}
                          onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
                          placeholder="e.g., Jan 2020"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-theme-muted mb-2">
                          END DATE
                        </label>
                        <input
                          type="text"
                          value={experienceForm.endDate}
                          onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
                          placeholder="Present or Dec 2023"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-theme-muted mb-2">
                        DESCRIPTION
                      </label>
                      <textarea
                        value={experienceForm.description}
                        onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium resize-none"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" onClick={addExperience} className="font-black">
                        {editingExpIndex !== null ? 'UPDATE' : 'ADD'}
                      </Button>
                      <Button type="button" onClick={cancelExperienceForm} variant="outline" className="font-black">
                        CANCEL
                      </Button>
                    </div>
                  </div>
                )}

                {/* Experience List */}
                <div className="space-y-4">
                  {formData.experience.map((exp: any, index: number) => (
                    <div key={index} className="p-4 bg-[var(--muted)] rounded-lg border-2 border-theme-muted">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-theme-accent">{exp.title}</h3>
                          <p className="text-base font-bold text-[var(--foreground)]">{exp.company}</p>
                          <p className="text-sm font-semibold text-theme-muted">
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" size="sm" onClick={() => editExperience(index)} className="font-black">
                            EDIT
                          </Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => removeExperience(index)} className="font-black">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-sm font-medium text-theme-muted mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-[var(--foreground)]">
                    EDUCATION
                  </h2>
                  {!showEducationForm && (
                    <Button type="button" onClick={() => setShowEducationForm(true)} className="font-black">
                      <Plus className="w-5 h-5 mr-2" />
                      ADD
                    </Button>
                  )}
                </div>

                {/* Education Form */}
                {showEducationForm && (
                  <div className="mb-6 p-6 bg-[var(--muted)] rounded-lg border-2 border-theme-secondary space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-theme-muted mb-2">
                          SCHOOL *
                        </label>
                        <input
                          type="text"
                          value={educationForm.school}
                          onChange={(e) => setEducationForm({ ...educationForm, school: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-secondary transition-colors font-medium"
                          placeholder="e.g., University of Sustainability"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-theme-muted mb-2">
                          DEGREE *
                        </label>
                        <input
                          type="text"
                          value={educationForm.degree}
                          onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-secondary transition-colors font-medium"
                          placeholder="e.g., Bachelor of Science"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-theme-muted mb-2">
                        FIELD OF STUDY
                      </label>
                      <input
                        type="text"
                        value={educationForm.fieldOfStudy}
                        onChange={(e) => setEducationForm({ ...educationForm, fieldOfStudy: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-secondary transition-colors font-medium"
                        placeholder="e.g., Environmental Science"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-theme-muted mb-2">
                          START YEAR
                        </label>
                        <input
                          type="text"
                          value={educationForm.startYear}
                          onChange={(e) => setEducationForm({ ...educationForm, startYear: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-secondary transition-colors font-medium"
                          placeholder="e.g., 2016"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-theme-muted mb-2">
                          END YEAR
                        </label>
                        <input
                          type="text"
                          value={educationForm.endYear}
                          onChange={(e) => setEducationForm({ ...educationForm, endYear: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-secondary transition-colors font-medium"
                          placeholder="Present or 2020"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" onClick={addEducation} className="font-black">
                        {editingEduIndex !== null ? 'UPDATE' : 'ADD'}
                      </Button>
                      <Button type="button" onClick={cancelEducationForm} variant="outline" className="font-black">
                        CANCEL
                      </Button>
                    </div>
                  </div>
                )}

                {/* Education List */}
                <div className="space-y-4">
                  {formData.education.map((edu: any, index: number) => (
                    <div key={index} className="p-4 bg-[var(--muted)] rounded-lg border-2 border-theme-muted">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-theme-secondary">{edu.school}</h3>
                          <p className="text-base font-bold text-[var(--foreground)]">
                            {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                          </p>
                          <p className="text-sm font-semibold text-theme-muted">
                            {edu.startYear} - {edu.endYear || 'Present'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" size="sm" onClick={() => editEducation(index)} className="font-black">
                            EDIT
                          </Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => removeEducation(index)} className="font-black">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <>
            {/* Expertise */}
            <Card className="border-4 border-theme-accent">
              <CardContent className="p-8">
                <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">
                  EXPERTISE & SKILLS
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                      className="flex-1 px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
                      placeholder="Add an expertise area (e.g., Solar Energy, Permaculture)"
                      maxLength={50}
                    />
                    <Button type="button" onClick={addExpertise} disabled={formData.expertise.length >= 10} className="font-black">
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold text-theme-muted">
                    {formData.expertise.length} / 10 expertise areas added
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gradient-to-br from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,black)] text-[var(--primary-foreground)] rounded-lg font-bold text-sm flex items-center gap-2 shadow-theme-md"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeExpertise(index)}
                          className="hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-8">
                <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">
                  INTERESTS
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                      className="flex-1 px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-secondary transition-colors font-medium"
                      placeholder="Add an interest (e.g., Organic Farming, Green Building)"
                      maxLength={50}
                    />
                    <Button type="button" onClick={addInterest} disabled={formData.interests.length >= 10} variant="secondary" className="font-black">
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold text-theme-muted">
                    {formData.interests.length} / 10 interests added
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] text-theme-secondary rounded-lg font-semibold text-sm border-2 border-theme-secondary flex items-center gap-2"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(index)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Links & Images Tab */}
        {activeTab === 'links' && (
          <>
            {/* Social Links */}
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-8">
                <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">
                  SOCIAL LINKS
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      WEBSITE
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      LINKEDIN
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      TWITTER / X
                    </label>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                      placeholder="@yourhandle"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="border-4 border-theme-secondary">
              <CardContent className="p-8">
                <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">
                  PROFILE IMAGES
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      PROFILE IMAGE URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-secondary transition-colors font-medium"
                      placeholder="https://example.com/your-photo.jpg"
                    />
                    {formData.image && (
                      <div className="mt-3">
                        <Image src={formData.image} alt="Preview" width={128} height={128} unoptimized className="rounded-full object-cover border-4 border-theme-primary" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-theme-muted mb-2">
                      BANNER IMAGE URL
                    </label>
                    <input
                      type="url"
                      name="banner"
                      value={formData.banner}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-secondary transition-colors font-medium"
                      placeholder="https://example.com/your-banner.jpg"
                    />
                    {formData.banner && (
                      <div className="relative mt-3 w-full h-40">
                        <Image src={formData.banner} alt="Banner Preview" fill unoptimized sizes="100%" className="rounded-lg object-cover border-4 border-theme-secondary" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Badges & Goals Tab */}
        {activeTab === 'badges' && (
          <>
            {/* Learning Goals */}
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[var(--foreground)]">
                      YOUR LEARNING GOALS
                    </h2>
                    <p className="text-sm font-semibold text-theme-muted">
                      Track your progress toward earning badges and achieving sustainability milestones
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Badge Progress Section */}
                  <div className="p-6 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--accent)_10%,var(--background))] rounded-xl border-2 border-theme-primary">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-theme-primary" />
                      <h3 className="text-lg font-black text-[var(--foreground)]">BADGE PROGRESS</h3>
                    </div>
                    <p className="text-sm font-medium text-theme-muted mb-4">
                      Earn badges by contributing to the community, sharing knowledge, and achieving sustainability goals.
                      Each badge unlocks new opportunities and recognition within Project Exodus.
                    </p>

                    {/* Dynamic Learning Paths */}
                    {loadingBadges ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-theme-primary" />
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4 mt-6">
                        {badgeProgress.slice(0, 4).map((badge) => (
                          <div key={badge.id} className={`p-4 bg-[var(--card)] rounded-lg border-2 border-theme-${badge.color} ${badge.earned ? 'ring-2 ring-green-500' : ''}`}>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-3xl">{badge.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className={`font-black text-theme-${badge.color}`}>{badge.name}</h4>
                                  {badge.earned && <span className="text-xs">✓</span>}
                                </div>
                                <p className="text-xs font-semibold text-theme-muted">{badge.description}</p>
                              </div>
                            </div>
                            <div className="mt-3 bg-[var(--muted)] rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r from-[var(--${badge.color})] to-[var(--primary)] rounded-full transition-all duration-500`}
                                style={{width: `${badge.progress}%`}}
                              />
                            </div>
                            <p className={`text-xs font-bold text-theme-${badge.color} mt-1`}>
                              {badge.earned ? 'Completed!' : `${badge.current}/${badge.target} - ${badge.progress}% Complete`}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Achievement Milestones */}
                  <div className="p-6 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] to-[color-mix(in_srgb,var(--primary)_10%,var(--background))] rounded-xl border-2 border-theme-secondary">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-theme-secondary" />
                      <h3 className="text-lg font-black text-[var(--foreground)]">AVAILABLE BADGES</h3>
                    </div>
                    <p className="text-sm font-medium text-theme-muted mb-4">
                      Explore all the badges you can earn and the impact you can make
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* All Badge Progress Goals */}
                      {badgeProgress.length > 0 ? (
                        badgeProgress.map((badge) => (
                          <div
                            key={badge.id}
                            className={`p-3 bg-[var(--card)] rounded-lg border-2 ${
                              badge.earned ? 'border-green-500 bg-green-500/10' : 'border-theme-muted'
                            } text-center hover:border-theme-primary transition-colors cursor-pointer relative`}
                            title={`${badge.description} - ${badge.current}/${badge.target}`}
                          >
                            {badge.earned && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-black">✓</span>
                              </div>
                            )}
                            <span className="text-4xl mb-2 block">{badge.icon}</span>
                            <span className="text-xs font-bold text-[var(--foreground)] block">{badge.name}</span>
                            <div className="mt-2 bg-[var(--muted)] rounded-full h-1 overflow-hidden">
                              <div
                                className="h-full bg-theme-primary rounded-full"
                                style={{width: `${badge.progress}%`}}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-4 text-center py-8 text-theme-muted">
                          <p>Loading badges...</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Impact Stats */}
                  <div className="p-6 bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_10%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_10%,var(--background))] rounded-xl border-2 border-theme-accent">
                    <h3 className="text-lg font-black text-[var(--foreground)] mb-4">YOUR IMPACT</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-black text-theme-primary mb-1">{badgeStats.badgesEarned}</div>
                        <div className="text-xs font-bold text-theme-muted uppercase">Badges Earned</div>
                      </div>
                      <div>
                        <div className="text-3xl font-black text-theme-accent mb-1">{badgeStats.goalsCompleted}/{badgeStats.totalGoals}</div>
                        <div className="text-xs font-bold text-theme-muted uppercase">Goals Completed</div>
                      </div>
                      <div>
                        <div className="text-3xl font-black text-theme-secondary mb-1">{badgeStats.profileCompletion}%</div>
                        <div className="text-xs font-bold text-theme-muted uppercase">Profile Complete</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-[var(--card)] rounded-lg border-2 border-theme-primary">
                      <p className="text-xs font-semibold text-theme-muted text-center">
                        💡 <span className="font-black">PRO TIP:</span> Complete your profile and engage with the community to unlock your first badge!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <Card className="border-4 border-theme-primary">
            <CardContent className="p-8">
              <h2 className="text-2xl font-black mb-6 text-[var(--foreground)] flex items-center gap-2">
                <Lock className="w-6 h-6" />
                SECURITY SETTINGS
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-theme-muted mb-2">
                    CURRENT PASSWORD
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-medium"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-theme-muted mb-2">
                    NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-medium"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-theme-muted mb-2">
                    CONFIRM NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-theme-primary transition-colors font-medium"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="p-6 bg-[var(--muted)] rounded-lg">
                  <h4 className="font-black text-[var(--foreground)] mb-2">PASSWORD REQUIREMENTS</h4>
                  <ul className="space-y-1 text-sm font-medium text-theme-muted">
                    <li>• At least 8 characters long</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Include at least one number</li>
                    <li>• Include at least one special character</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <Card className="border-4 border-theme-accent">
            <CardContent className="p-8">
              <h2 className="text-2xl font-black mb-6 text-[var(--foreground)] flex items-center gap-2">
                <Bell className="w-6 h-6" />
                NOTIFICATION PREFERENCES
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive email updates about your account' },
                  { key: 'newsletter', label: 'Newsletter', desc: 'Weekly sustainability tips and articles' },
                  { key: 'communityUpdates', label: 'Community Updates', desc: 'New forum posts and replies' },
                  { key: 'productUpdates', label: 'Product Updates', desc: 'New products and special offers' },
                ].map((item) => (
                  <div key={item.key} className="flex items-start justify-between p-4 bg-[var(--muted)] rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-black text-[var(--foreground)] mb-1">{item.label}</h4>
                      <p className="text-sm font-medium text-theme-muted">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[var(--border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-theme-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <Card className="border-4 border-theme-secondary">
            <CardContent className="p-8">
              <h2 className="text-2xl font-black mb-6 text-[var(--foreground)] flex items-center gap-2">
                <Shield className="w-6 h-6" />
                PRIVACY & DATA
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-[var(--muted)] rounded-lg">
                  <h4 className="font-black text-[var(--foreground)] mb-2">DATA EXPORT</h4>
                  <p className="text-sm font-medium text-theme-muted mb-4">
                    Download a copy of your personal data, including profile information, orders, and activity.
                  </p>
                  <Button type="button" variant="outline" className="font-bold">
                    REQUEST DATA EXPORT
                  </Button>
                </div>

                <div className="p-6 bg-[var(--muted)] rounded-lg">
                  <h4 className="font-black text-[var(--foreground)] mb-2">PROFILE VISIBILITY</h4>
                  <p className="text-sm font-medium text-theme-muted mb-4">
                    Control who can see your profile and activity on Project Exodus.
                  </p>
                  <select className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] font-medium focus:outline-none focus:border-theme-secondary">
                    <option>Public - Everyone can see your profile</option>
                    <option>Community Only - Only registered users</option>
                    <option>Private - Only you can see your profile</option>
                  </select>
                </div>

                <div className="p-6 bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] border-2 border-theme-secondary rounded-lg">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-theme-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-black text-theme-secondary mb-2">DELETE ACCOUNT</h4>
                      <p className="text-sm font-medium text-theme-muted mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button type="button" variant="outline" className="font-bold border-2 border-theme-secondary text-theme-secondary hover:bg-theme-secondary hover:text-[var(--secondary-foreground)]">
                        <Trash2 className="w-4 h-4 mr-2" />
                        DELETE ACCOUNT
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg font-bold text-center ${
            message.includes('✓')
              ? 'bg-green-500/20 text-green-600 border-2 border-green-600'
              : 'bg-red-500/20 text-red-600 border-2 border-red-600'
          }`}>
            {message}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 sticky bottom-4 bg-[var(--background)] p-4 rounded-lg border-4 border-theme-primary shadow-theme-2xl">
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="flex-1 text-lg py-6 font-black shadow-theme-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                SAVING...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                SAVE PROFILE
              </>
            )}
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={() => router.push(`/profile/${user.id}`)}
            className="text-lg py-6 font-black"
          >
            CANCEL
          </Button>
        </div>
      </div>
    </form>
  )
}
