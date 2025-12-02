'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
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
} from 'lucide-react'

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
}

export function ProfileBusinessCard({ userId }: ProfileBusinessCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/profile/${userId}`)
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            setProfile({
              name: data.data.name || '',
              headline: data.data.headline || data.data.jobTitle || '',
              location: data.data.location || '',
              email: data.data.email || '',
              phone: '', // Not in API currently
              bio: data.data.bio || '',
              skills: data.data.expertise || data.data.skills || [],
              experience: data.data.experience || [],
              education: data.data.education || [],
              social: {
                website: data.data.website,
                github: undefined, // Not in API currently
                linkedin: data.data.linkedin,
                twitter: data.data.twitter,
              },
              portfolio: data.data.projects || [],
              achievements: data.data.honors || [],
              resumeUrl: data.data.resume,
              resumeFileName: data.data.resume ? 'resume.pdf' : undefined,
            })
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

  const hasSocialLinks = profile.social.website || profile.social.github || profile.social.linkedin || profile.social.twitter
  const hasContactInfo = profile.email || profile.phone || profile.location

  return (
    <Card className="border-4 border-theme-accent overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-[var(--primary-foreground)]" />
          <h2 className="text-lg font-black text-[var(--primary-foreground)]">DIGITAL BUSINESS CARD</h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[var(--primary-foreground)]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--primary-foreground)]" />
          )}
        </button>
      </div>

      <CardContent className="p-6">
        {/* Main Business Card - Always Visible */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Name & Headline Card */}
          <div className="flex-shrink-0 p-6 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-2xl text-white min-w-[280px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black">{profile.name || 'Anonymous'}</h3>
                <p className="text-sm font-medium opacity-90">{profile.headline || 'Member'}</p>
              </div>
            </div>

            {/* Contact Info */}
            {hasContactInfo && (
              <div className="space-y-2 text-sm">
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 opacity-75" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 opacity-75" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 opacity-75" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Quick Info */}
          <div className="flex-1 space-y-4">
            {/* Skills */}
            {profile.skills.length > 0 && (
              <div>
                <h4 className="text-xs font-black text-theme-muted uppercase mb-2">Expertise</h4>
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
              </div>
            )}

            {/* Social Links */}
            {hasSocialLinks && (
              <div>
                <h4 className="text-xs font-black text-theme-muted uppercase mb-2">Connect</h4>
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
                  {profile.social.github && (
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-[var(--muted)] rounded-lg hover:bg-[#333] hover:text-white transition-colors text-sm font-bold"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
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
              </div>
            )}

            {/* Resume Download */}
            {profile.resumeUrl && (
              <div>
                <a
                  href={profile.resumeUrl}
                  download={profile.resumeFileName || 'resume.pdf'}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity text-sm font-bold"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Section */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t-2 border-[var(--border)] grid md:grid-cols-2 gap-6">
            {/* Bio */}
            {profile.bio && (
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2">About</h4>
                <p className="text-sm font-medium text-theme-muted leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Experience */}
            {profile.experience.length > 0 && (
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-theme-primary" />
                  Experience
                </h4>
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
                  {profile.experience.length > 2 && (
                    <p className="text-xs font-bold text-theme-muted">
                      +{profile.experience.length - 2} more positions
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education.length > 0 && (
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-theme-accent" />
                  Education
                </h4>
                <div className="space-y-3">
                  {profile.education.slice(0, 2).map((edu: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-theme-accent pl-3">
                      <h5 className="text-sm font-black text-[var(--foreground)]">{edu.degree}</h5>
                      <p className="text-xs font-bold text-theme-muted">{edu.school}</p>
                      <p className="text-[10px] font-medium text-theme-muted">{edu.graduationYear}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {profile.achievements.length > 0 && (
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-theme-secondary" />
                  Achievements
                </h4>
                <div className="space-y-2">
                  {profile.achievements.slice(0, 3).map((achievement: any, idx: number) => (
                    <div key={idx} className="p-2 bg-[var(--muted)] rounded-lg">
                      <h5 className="text-xs font-black text-[var(--foreground)]">{achievement.title}</h5>
                      <p className="text-[10px] font-medium text-theme-muted">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {profile.portfolio.length > 0 && (
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-theme-primary" />
                  Portfolio
                </h4>
                <div className="space-y-2">
                  {profile.portfolio.slice(0, 3).map((item: any, idx: number) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 bg-[var(--muted)] rounded-lg hover:bg-[var(--primary)]/10 transition-colors"
                    >
                      <h5 className="text-xs font-black text-[var(--foreground)]">{item.title}</h5>
                      <p className="text-[10px] font-medium text-theme-muted">{item.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
