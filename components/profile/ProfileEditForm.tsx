'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Plus, X, Save, Loader2 } from 'lucide-react'

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

export function ProfileEditForm({ user }: ProfileEditFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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
    education: user.education || []
  })

  const [newInterest, setNewInterest] = useState('')
  const [newExpertise, setNewExpertise] = useState('')

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
    if (newInterest.trim()) {
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
    if (newExpertise.trim()) {
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
        // Edit existing
        const updated = [...formData.experience]
        updated[editingExpIndex] = experienceForm
        setFormData({ ...formData, experience: updated })
      } else {
        // Add new
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
        // Edit existing
        const updated = [...formData.education]
        updated[editingEduIndex] = educationForm
        setFormData({ ...formData, education: updated })
      } else {
        // Add new
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="border-4 border-theme-primary">
          <CardContent className="p-8">
            <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">
              BASIC INFORMATION
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-theme-muted mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium resize-none"
                  placeholder="Tell us about yourself, your passion for sustainability, and your journey..."
                />
              </div>

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
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="border-4 border-theme-accent">
          <CardContent className="p-8">
            <h2 className="text-2xl font-black mb-6 text-[var(--foreground)]">
              PROFESSIONAL INFORMATION
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-theme-muted mb-2">
                  JOB TITLE
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
                  placeholder="Your current job title"
                />
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
                  className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
                  placeholder="Your company or organization"
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
              </div>
            </div>
          </CardContent>
        </Card>

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
                />
                <Button type="button" onClick={addExpertise} className="font-black">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
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
                />
                <Button type="button" onClick={addInterest} variant="secondary" className="font-black">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
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

        {/* Experience */}
        <Card className="border-4 border-theme-primary">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-[var(--foreground)]">
                EXPERIENCE (OPTIONAL)
              </h2>
              {!showExperienceForm && (
                <Button type="button" onClick={() => setShowExperienceForm(true)} className="font-black">
                  <Plus className="w-5 h-5 mr-2" />
                  ADD EXPERIENCE
                </Button>
              )}
            </div>

            {/* Experience Form */}
            {showExperienceForm && (
              <div className="mb-6 p-6 bg-[var(--muted)] rounded-lg border-2 border-theme-primary space-y-4">
                <div>
                  <label className="block text-sm font-bold text-theme-muted mb-2">
                    JOB TITLE *
                  </label>
                  <input
                    type="text"
                    value={experienceForm.title}
                    onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
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
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
                    placeholder="e.g., Green Earth Solutions"
                  />
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
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
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
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium"
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
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium resize-none"
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
                    <div>
                      <h3 className="text-lg font-black text-theme-primary">{exp.title}</h3>
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
        <Card className="border-4 border-theme-accent">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-[var(--foreground)]">
                EDUCATION (OPTIONAL)
              </h2>
              {!showEducationForm && (
                <Button type="button" onClick={() => setShowEducationForm(true)} className="font-black">
                  <Plus className="w-5 h-5 mr-2" />
                  ADD EDUCATION
                </Button>
              )}
            </div>

            {/* Education Form */}
            {showEducationForm && (
              <div className="mb-6 p-6 bg-[var(--muted)] rounded-lg border-2 border-theme-accent space-y-4">
                <div>
                  <label className="block text-sm font-bold text-theme-muted mb-2">
                    SCHOOL *
                  </label>
                  <input
                    type="text"
                    value={educationForm.school}
                    onChange={(e) => setEducationForm({ ...educationForm, school: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
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
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
                    placeholder="e.g., Bachelor of Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-theme-muted mb-2">
                    FIELD OF STUDY
                  </label>
                  <input
                    type="text"
                    value={educationForm.fieldOfStudy}
                    onChange={(e) => setEducationForm({ ...educationForm, fieldOfStudy: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
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
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
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
                      className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-accent transition-colors font-medium"
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
                    <div>
                      <h3 className="text-lg font-black text-theme-accent">{edu.school}</h3>
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
        <div className="flex gap-4">
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
