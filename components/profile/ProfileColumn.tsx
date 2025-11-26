'use client'

import { useState, useRef } from 'react'
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Award,
  FileText,
  Edit2,
  Eye,
  EyeOff,
  Download,
  Upload,
  Plus,
  X,
  Palette,
  Save,
} from 'lucide-react'

interface ProfileData {
  // Basic Info
  name: string
  headline: string
  location: string
  email: string
  phone: string

  // Bio
  bio: string

  // Skills
  skills: string[]

  // Experience
  experience: {
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }[]

  // Education
  education: {
    id: string
    degree: string
    school: string
    location: string
    graduationYear: string
    description: string
  }[]

  // Social Links
  social: {
    website?: string
    github?: string
    linkedin?: string
    twitter?: string
  }

  // Portfolio
  portfolio: {
    id: string
    title: string
    description: string
    link: string
  }[]

  // Achievements
  achievements: {
    id: string
    title: string
    description: string
    date: string
  }[]

  // Resume
  resumeUrl?: string
  resumeFileName?: string
}

type EditSection = 'basic' | 'bio' | 'skills' | 'experience' | 'education' | 'social' | 'portfolio' | 'achievements' | null

interface Props {
  initialProfile?: Partial<ProfileData>
}

export function ProfileColumn({ initialProfile }: Props) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [template, setTemplate] = useState<'modern' | 'classic' | 'minimal'>('modern')
  const [editingSection, setEditingSection] = useState<EditSection>(null)
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
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Template colors
  const templateColors = {
    modern: {
      primary: 'from-blue-500 to-purple-600',
      accent: 'bg-blue-500',
      border: 'border-blue-400',
    },
    classic: {
      primary: 'from-gray-700 to-gray-900',
      accent: 'bg-gray-700',
      border: 'border-gray-500',
    },
    minimal: {
      primary: 'from-emerald-400 to-teal-500',
      accent: 'bg-emerald-500',
      border: 'border-emerald-400',
    },
  }

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create FormData for upload
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
      }
    } catch (error) {
      console.error('Error uploading resume:', error)
    }
  }

  const handleResumeDownload = () => {
    if (profile.resumeUrl) {
      const link = document.createElement('a')
      link.href = profile.resumeUrl
      link.download = profile.resumeFileName || 'resume.pdf'
      link.click()
    }
  }

  const openEditModal = (section: EditSection) => {
    setEditingSection(section)
  }

  const closeEditModal = () => {
    setEditingSection(null)
  }

  const colors = templateColors[template]

  return (
    <div className="flex-shrink-0 w-80 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-theme-primary" />
            <h2 className="text-sm font-black text-[var(--foreground)]">YOUR PROFILE</h2>
          </div>
        </div>

        {/* Template & Preview Controls */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors flex items-center justify-center gap-1 ${
              isPreviewMode
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
            }`}
          >
            {isPreviewMode ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            {isPreviewMode ? 'Preview' : 'Edit'}
          </button>
        </div>

        {/* Template Selection */}
        {!isPreviewMode && (
          <div className="flex gap-1">
            <button
              onClick={() => setTemplate('modern')}
              className={`flex-1 px-2 py-1 rounded-lg text-[9px] font-bold transition-colors ${
                template === 'modern'
                  ? 'bg-blue-500 text-white'
                  : 'bg-[var(--muted)] text-[var(--foreground)]'
              }`}
            >
              Modern
            </button>
            <button
              onClick={() => setTemplate('classic')}
              className={`flex-1 px-2 py-1 rounded-lg text-[9px] font-bold transition-colors ${
                template === 'classic'
                  ? 'bg-gray-700 text-white'
                  : 'bg-[var(--muted)] text-[var(--foreground)]'
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => setTemplate('minimal')}
              className={`flex-1 px-2 py-1 rounded-lg text-[9px] font-bold transition-colors ${
                template === 'minimal'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[var(--muted)] text-[var(--foreground)]'
              }`}
            >
              Minimal
            </button>
          </div>
        )}
      </div>

      {/* Profile Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Basic Info Card */}
        <div className={`p-4 bg-gradient-to-br ${colors.primary} rounded-xl text-white relative`}>
          {!isPreviewMode && (
            <button
              onClick={() => openEditModal('basic')}
              className="absolute top-2 right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          )}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-black">{profile.name || 'Your Name'}</h3>
              <p className="text-xs font-medium opacity-90">{profile.headline || 'Your Headline'}</p>
            </div>
          </div>
          <div className="space-y-1 text-xs">
            {profile.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-3 bg-[var(--muted)]/50 rounded-xl relative">
          {!isPreviewMode && (
            <button
              onClick={() => openEditModal('bio')}
              className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit2 className="w-3 h-3 text-[var(--primary)]" />
            </button>
          )}
          <h4 className="text-xs font-black text-[var(--foreground)] mb-2">About</h4>
          <p className="text-xs font-medium text-theme-muted leading-relaxed">
            {profile.bio || 'Add a bio to tell others about yourself...'}
          </p>
        </div>

        {/* Skills Section */}
        <div className="p-3 bg-[var(--muted)]/50 rounded-xl relative">
          {!isPreviewMode && (
            <button
              onClick={() => openEditModal('skills')}
              className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit2 className="w-3 h-3 text-[var(--primary)]" />
            </button>
          )}
          <h4 className="text-xs font-black text-[var(--foreground)] mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.length > 0 ? (
              profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 ${colors.accent} text-white text-[10px] font-bold rounded-full`}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs font-medium text-theme-muted">Add your skills...</p>
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div className="p-3 bg-[var(--muted)]/50 rounded-xl relative">
          {!isPreviewMode && (
            <button
              onClick={() => openEditModal('experience')}
              className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit2 className="w-3 h-3 text-[var(--primary)]" />
            </button>
          )}
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-theme-primary" />
            <h4 className="text-xs font-black text-[var(--foreground)]">Experience</h4>
          </div>
          <div className="space-y-3">
            {profile.experience.length > 0 ? (
              profile.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-theme-primary pl-3">
                  <h5 className="text-xs font-black text-[var(--foreground)]">{exp.title}</h5>
                  <p className="text-[10px] font-bold text-theme-muted">{exp.company}</p>
                  <p className="text-[9px] font-medium text-theme-muted">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-[10px] font-medium text-theme-muted mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs font-medium text-theme-muted">Add your work experience...</p>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="p-3 bg-[var(--muted)]/50 rounded-xl relative">
          {!isPreviewMode && (
            <button
              onClick={() => openEditModal('education')}
              className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit2 className="w-3 h-3 text-[var(--primary)]" />
            </button>
          )}
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-theme-accent" />
            <h4 className="text-xs font-black text-[var(--foreground)]">Education</h4>
          </div>
          <div className="space-y-3">
            {profile.education.length > 0 ? (
              profile.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-theme-accent pl-3">
                  <h5 className="text-xs font-black text-[var(--foreground)]">{edu.degree}</h5>
                  <p className="text-[10px] font-bold text-theme-muted">{edu.school}</p>
                  <p className="text-[9px] font-medium text-theme-muted">{edu.graduationYear}</p>
                  {edu.description && (
                    <p className="text-[10px] font-medium text-theme-muted mt-1 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs font-medium text-theme-muted">Add your education...</p>
            )}
          </div>
        </div>

        {/* Social Links Section */}
        <div className="p-3 bg-[var(--muted)]/50 rounded-xl relative">
          {!isPreviewMode && (
            <button
              onClick={() => openEditModal('social')}
              className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit2 className="w-3 h-3 text-[var(--primary)]" />
            </button>
          )}
          <h4 className="text-xs font-black text-[var(--foreground)] mb-2">Social Links</h4>
          <div className="space-y-2">
            {profile.social.website && (
              <a href={profile.social.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-theme-muted hover:text-[var(--primary)]">
                <Globe className="w-3 h-3" />
                <span>Website</span>
              </a>
            )}
            {profile.social.github && (
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-theme-muted hover:text-[var(--primary)]">
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            )}
            {profile.social.linkedin && (
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-theme-muted hover:text-[var(--primary)]">
                <Linkedin className="w-3 h-3" />
                <span>LinkedIn</span>
              </a>
            )}
            {profile.social.twitter && (
              <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-theme-muted hover:text-[var(--primary)]">
                <Twitter className="w-3 h-3" />
                <span>Twitter</span>
              </a>
            )}
            {!profile.social.website && !profile.social.github && !profile.social.linkedin && !profile.social.twitter && (
              <p className="text-xs font-medium text-theme-muted">Add your social links...</p>
            )}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="p-3 bg-[var(--muted)]/50 rounded-xl relative">
          {!isPreviewMode && (
            <button
              onClick={() => openEditModal('portfolio')}
              className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit2 className="w-3 h-3 text-[var(--primary)]" />
            </button>
          )}
          <h4 className="text-xs font-black text-[var(--foreground)] mb-2">Portfolio</h4>
          <div className="space-y-2">
            {profile.portfolio.length > 0 ? (
              profile.portfolio.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-[var(--background)] rounded-lg hover:bg-[var(--primary)]/10 transition-colors"
                >
                  <h5 className="text-xs font-black text-[var(--foreground)]">{item.title}</h5>
                  <p className="text-[10px] font-medium text-theme-muted">{item.description}</p>
                </a>
              ))
            ) : (
              <p className="text-xs font-medium text-theme-muted">Add portfolio items...</p>
            )}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="p-3 bg-[var(--muted)]/50 rounded-xl relative">
          {!isPreviewMode && (
            <button
              onClick={() => openEditModal('achievements')}
              className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-colors"
            >
              <Edit2 className="w-3 h-3 text-[var(--primary)]" />
            </button>
          )}
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-theme-secondary" />
            <h4 className="text-xs font-black text-[var(--foreground)]">Achievements</h4>
          </div>
          <div className="space-y-2">
            {profile.achievements.length > 0 ? (
              profile.achievements.map((achievement) => (
                <div key={achievement.id} className="p-2 bg-[var(--background)] rounded-lg">
                  <h5 className="text-xs font-black text-[var(--foreground)]">{achievement.title}</h5>
                  <p className="text-[10px] font-medium text-theme-muted">{achievement.description}</p>
                  <p className="text-[9px] font-bold text-theme-muted mt-1">{achievement.date}</p>
                </div>
              ))
            ) : (
              <p className="text-xs font-medium text-theme-muted">Add your achievements...</p>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="p-3 bg-[var(--muted)]/50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-[var(--primary)]" />
            <h4 className="text-xs font-black text-[var(--foreground)]">Resume</h4>
          </div>
          <div className="space-y-2">
            {profile.resumeFileName ? (
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium text-theme-muted flex-1 truncate">
                  {profile.resumeFileName}
                </p>
                <button
                  onClick={handleResumeDownload}
                  className="p-1.5 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--accent)] transition-colors"
                  title="Download Resume"
                >
                  <Download className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <p className="text-xs font-medium text-theme-muted">No resume uploaded</p>
            )}
            {!isPreviewMode && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 bg-[var(--primary)] text-white rounded-lg text-xs font-bold hover:bg-[var(--accent)] transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-3 h-3" />
                  {profile.resumeFileName ? 'Replace Resume' : 'Upload Resume'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modals */}
      {editingSection && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--card)] rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-[var(--foreground)]">
                Edit {editingSection.charAt(0).toUpperCase() + editingSection.slice(1)}
              </h3>
              <button
                onClick={closeEditModal}
                className="w-8 h-8 rounded-full hover:bg-[var(--muted)] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal content will vary based on editingSection */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-theme-muted">
                Edit modal for {editingSection} section - Full implementation coming soon
              </p>
              <button
                onClick={closeEditModal}
                className="w-full py-2 px-4 bg-[var(--primary)] text-white rounded-lg text-xs font-bold hover:bg-[var(--accent)] transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-3 h-3" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
