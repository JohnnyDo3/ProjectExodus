'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Eye, Heart, Flame, Target, Shield, Globe, Compass,
  ArrowLeft, ArrowRight, Check, Rocket, Users, FileText,
  Settings, Layers, BookOpen, Lock, Unlock, Globe2, Archive,
  Palette, Layout, ImageIcon, Tag, FolderTree, Plus, X, ChevronDown,
  Zap, Leaf, Sun, Moon, TreePine, Waves
} from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

// Guardian-themed steps
const STEPS = [
  {
    id: 1,
    name: 'Vision',
    guardian: 'Transcendence',
    icon: Sparkles,
    gradient: 'from-indigo-500 via-blue-400 to-cyan-500',
    color: 'text-indigo-400',
    description: 'Plant the seed of your vision'
  },
  {
    id: 2,
    name: 'Foundation',
    guardian: 'Temperance',
    icon: Shield,
    gradient: 'from-blue-500 via-cyan-400 to-teal-500',
    color: 'text-cyan-400',
    description: 'Establish your project foundation'
  },
  {
    id: 3,
    name: 'Structure',
    guardian: 'Wisdom',
    icon: Eye,
    gradient: 'from-violet-500 via-purple-400 to-fuchsia-500',
    color: 'text-violet-400',
    description: 'Design your ecosystem architecture'
  },
  {
    id: 4,
    name: 'Collaboration',
    guardian: 'Humanity',
    icon: Heart,
    gradient: 'from-pink-500 via-rose-400 to-red-400',
    color: 'text-rose-400',
    description: 'Configure collaboration & team settings'
  },
  {
    id: 5,
    name: 'Launch',
    guardian: 'Courage',
    icon: Flame,
    gradient: 'from-orange-500 via-red-400 to-pink-500',
    color: 'text-orange-400',
    description: 'Review and bring your vision to life'
  }
]

const VISIBILITY_OPTIONS = [
  {
    value: 'PUBLIC',
    icon: Globe2,
    label: 'Public',
    description: 'Visible to everyone on Project Exodus',
    gradient: 'from-emerald-500 to-teal-500',
    badge: 'Open to All'
  },
  {
    value: 'PRIVATE',
    icon: Lock,
    label: 'Private',
    description: 'Visible only to invited members',
    gradient: 'from-violet-500 to-purple-500',
    badge: 'Invite Only'
  },
  {
    value: 'DRAFT',
    icon: Archive,
    label: 'Draft',
    description: 'Hidden until you are ready to publish',
    gradient: 'from-amber-500 to-orange-500',
    badge: 'Work in Progress'
  }
]

const PROJECT_THEMES = [
  { value: 'nature', label: 'Nature', colors: { primary: '#10b981', accent: '#14b8a6' }, icon: Leaf },
  { value: 'solar', label: 'Solar', colors: { primary: '#f59e0b', accent: '#f97316' }, icon: Sun },
  { value: 'lunar', label: 'Lunar', colors: { primary: '#6366f1', accent: '#8b5cf6' }, icon: Moon },
  { value: 'forest', label: 'Forest', colors: { primary: '#059669', accent: '#0d9488' }, icon: TreePine },
  { value: 'ocean', label: 'Ocean', colors: { primary: '#0ea5e9', accent: '#06b6d4' }, icon: Waves },
  { value: 'fire', label: 'Fire', colors: { primary: '#ef4444', accent: '#f97316' }, icon: Flame },
]

interface Subproject {
  id: string
  name: string
  description: string
  parentId: string | null
}

export default function NewProjectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Step management
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Loading & submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [availableProjects, setAvailableProjects] = useState<any[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)

  // Step 1: Vision
  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [mission, setMission] = useState('')

  // Step 2: Foundation
  const [visibility, setVisibility] = useState('PUBLIC')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [parentProjectId, setParentProjectId] = useState<string | null>(null)

  // Step 3: Structure
  const [theme, setTheme] = useState('nature')
  const [subprojects, setSubprojects] = useState<Subproject[]>([])
  const [showSubprojectForm, setShowSubprojectForm] = useState(false)
  const [newSubproject, setNewSubproject] = useState({ name: '', description: '' })

  // Step 4: Collaboration
  const [enableDiscussions, setEnableDiscussions] = useState(true)
  const [enableResearch, setEnableResearch] = useState(true)
  const [enableLearning, setEnableLearning] = useState(true)
  const [requireApproval, setRequireApproval] = useState(false)

  // Step 5: Launch
  const [projectStatus, setProjectStatus] = useState('PLANNING')
  const [goal, setGoal] = useState('')

  // Fetch user's projects for nesting
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProjects()
    }
  }, [session])

  const fetchUserProjects = async () => {
    setLoadingProjects(true)
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      if (data.success) {
        // Filter to show only user's projects where they are creator
        setAvailableProjects(data.data.filter((p: any) => p.creatorId === session?.user?.id))
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoadingProjects(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Initializing Creation Space...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return name.trim().length >= 1 && description.trim().length >= 1
      case 2:
        return visibility && category
      case 3:
        return true // Structure is optional
      case 4:
        return true // Collaboration settings are optional
      case 5:
        return true // Ready to launch
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed()) {
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const addSubproject = () => {
    if (newSubproject.name.trim()) {
      setSubprojects([
        ...subprojects,
        {
          id: crypto.randomUUID(),
          name: newSubproject.name,
          description: newSubproject.description,
          parentId: null
        }
      ])
      setNewSubproject({ name: '', description: '' })
      setShowSubprojectForm(false)
    }
  }

  const removeSubproject = (id: string) => {
    setSubprojects(subprojects.filter(sp => sp.id !== id))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Generate slug
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        + '-' + Date.now().toString(36)

      const projectData = {
        name,
        description,
        tagline,
        mission,
        goal,
        status: projectStatus,
        visibility,
        category,
        tags,
        parentProjectId,
        theme,
        slug,
        settings: {
          enableDiscussions,
          enableResearch,
          enableLearning,
          requireApproval
        },
        subprojects: subprojects.map(sp => ({
          name: sp.name,
          description: sp.description
        }))
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitMessage('Project created successfully! Launching your ecosystem...')
        setTimeout(() => {
          router.push(`/community/projects/${slug}`)
        }, 1500)
      } else {
        setSubmitMessage(data.error || 'Failed to create project. Please try again.')
        setIsSubmitting(false)
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  const currentStepData = STEPS.find(s => s.id === currentStep)!
  const StepIcon = currentStepData.icon
  const selectedTheme = PROJECT_THEMES.find(t => t.value === theme)

  return (
    <div className="h-full flex flex-col bg-[var(--background)] overflow-hidden">
      {/* Header with Progress */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--card)] border-b border-[var(--border)]/30 flex-shrink-0">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto">
            <BackButton label="Back to Projects" fallbackUrl="/community/projects" className="mb-3" />

            {/* Title */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20">
                <Rocket className="w-3.5 h-3.5 text-theme-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-theme-primary">
                  Project Creation Wizard
                </span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--foreground)] via-[var(--primary)] to-[var(--foreground)] bg-clip-text text-transparent mb-1">
                Build Your Ecosystem
              </h1>
              <p className="text-sm text-theme-muted font-medium">
                Step {currentStep} of {STEPS.length}: {currentStepData.description}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => {
                const Icon = step.icon
                const isCompleted = completedSteps.includes(step.id)
                const isCurrent = step.id === currentStep
                const isUpcoming = step.id > currentStep

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? `bg-gradient-to-br ${step.gradient} border-transparent`
                          : isCurrent
                          ? `border-[var(--primary)] bg-[var(--card)]`
                          : `border-[var(--border)] bg-[var(--muted)]/20`
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className={`w-4 h-4 ${isCurrent ? 'text-theme-primary' : 'text-theme-muted'}`} />
                        )}
                        {isCurrent && (
                          <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-xl opacity-20 rounded-full animate-pulse`} />
                        )}
                      </div>
                      <span className={`text-[10px] font-bold mt-1.5 hidden sm:block ${
                        isCurrent ? 'text-[var(--foreground)]' : 'text-theme-muted'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-2 ${
                        isCompleted ? `bg-gradient-to-r ${step.gradient}` : 'bg-[var(--border)]'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Step Content */}
      <section className="flex-1 overflow-y-auto py-4">
        <div className="container mx-auto px-4 h-full">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <Card className={`relative overflow-hidden border-2 shadow-xl flex-1 flex flex-col min-h-0`}>
                  {/* Step header with Guardian gradient */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentStepData.gradient}`} />

                  <CardHeader className="flex-shrink-0 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentStepData.gradient} flex items-center justify-center flex-shrink-0`}>
                        <StepIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {currentStepData.name}
                        </CardTitle>
                        <p className="text-xs text-theme-muted font-medium mt-0.5">
                          Guardian of {currentStepData.guardian}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pb-4 flex-1 overflow-y-auto">
                    {/* STEP 1: VISION */}
                    {currentStep === 1 && (
                      <div className="space-y-3">
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Project Name *
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Urban Regeneration Initiative"
                            maxLength={100}
                            className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                          />
                          <p className="text-[10px] text-theme-muted mt-0.5">{name.length}/100 characters</p>
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            Tagline
                          </label>
                          <input
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            placeholder="A punchy one-liner that captures your vision..."
                            maxLength={80}
                            className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                          />
                          <p className="text-[10px] text-theme-muted mt-0.5">{tagline.length}/80 characters</p>
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            Description *
                          </label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell the story of your project. What problem are you solving? Why does it matter?"
                            maxLength={500}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors resize-none"
                          />
                          <p className="text-[10px] text-theme-muted mt-0.5">{description.length}/500 characters</p>
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <Target className="w-3.5 h-3.5" />
                            Mission Statement
                          </label>
                          <textarea
                            value={mission}
                            onChange={(e) => setMission(e.target.value)}
                            placeholder="Optional: Your guiding principles and long-term impact vision..."
                            maxLength={300}
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors resize-none"
                          />
                          <p className="text-[10px] text-theme-muted mt-0.5">{mission.length}/300 characters</p>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: FOUNDATION */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        {/* Visibility Selection */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-2">
                            <Globe className="w-3.5 h-3.5" />
                            Project Visibility *
                          </label>
                          <div className="grid md:grid-cols-3 gap-2">
                            {VISIBILITY_OPTIONS.map((option) => {
                              const Icon = option.icon
                              const isSelected = visibility === option.value

                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => setVisibility(option.value)}
                                  className={`relative p-3 rounded-lg border-2 transition-all text-left ${
                                    isSelected
                                      ? `border-[var(--primary)] bg-gradient-to-br ${option.gradient} bg-opacity-10`
                                      : 'border-[var(--border)] hover:border-[var(--primary)]/30'
                                  }`}
                                >
                                  <div className="flex items-start gap-2 mb-2">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center flex-shrink-0`}>
                                      <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-bold text-sm text-[var(--foreground)]">{option.label}</h4>
                                      <span className="text-[9px] font-semibold text-theme-muted uppercase tracking-wide">
                                        {option.badge}
                                      </span>
                                    </div>
                                    {isSelected && (
                                      <Check className="w-4 h-4 text-theme-primary flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-[10px] text-theme-muted leading-snug">
                                    {option.description}
                                  </p>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Category */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <Tag className="w-3.5 h-3.5" />
                            Category *
                          </label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none"
                          >
                            <option value="">Select a category...</option>
                            <option value="environment">Environment & Conservation</option>
                            <option value="community">Community Building</option>
                            <option value="education">Education & Learning</option>
                            <option value="technology">Sustainable Technology</option>
                            <option value="agriculture">Agriculture & Food</option>
                            <option value="energy">Renewable Energy</option>
                            <option value="advocacy">Advocacy & Policy</option>
                            <option value="research">Research & Innovation</option>
                            <option value="arts">Arts & Culture</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {/* Parent Project (Nesting) */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <FolderTree className="w-3.5 h-3.5" />
                            Nest Within Project (Optional)
                          </label>
                          <select
                            value={parentProjectId || ''}
                            onChange={(e) => setParentProjectId(e.target.value || null)}
                            className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none"
                          >
                            <option value="">None - Top-level project</option>
                            {loadingProjects ? (
                              <option disabled>Loading...</option>
                            ) : (
                              availableProjects.map((project) => (
                                <option key={project.id} value={project.id}>
                                  {project.name}
                                </option>
                              ))
                            )}
                          </select>
                        </div>

                        {/* Tags */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <Tag className="w-3.5 h-3.5" />
                            Tags
                          </label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                              placeholder="e.g., urban, gardening, youth"
                              className="flex-1 px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none"
                            />
                            <Button type="button" onClick={addTag} size="sm" className="font-bold">
                              <Plus className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {tags.map((tag) => (
                                <div key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-[var(--muted)] rounded-full text-xs font-semibold">
                                  <span>#{tag}</span>
                                  <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: STRUCTURE */}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        {/* Theme Selection */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-2">
                            <Palette className="w-3.5 h-3.5" />
                            Visual Theme
                          </label>
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {PROJECT_THEMES.map((t) => {
                              const Icon = t.icon
                              const isSelected = theme === t.value

                              return (
                                <button
                                  key={t.value}
                                  type="button"
                                  onClick={() => setTheme(t.value)}
                                  className={`p-2 rounded-lg border-2 transition-all ${
                                    isSelected
                                      ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20'
                                      : 'border-[var(--border)] hover:border-[var(--primary)]/30'
                                  }`}
                                  style={{
                                    background: isSelected
                                      ? `linear-gradient(135deg, ${t.colors.primary}15, ${t.colors.accent}15)`
                                      : 'transparent'
                                  }}
                                >
                                  <Icon
                                    className="w-6 h-6 mx-auto mb-1"
                                    style={{ color: t.colors.primary }}
                                  />
                                  <p className="text-[10px] font-bold text-center">{t.label}</p>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Subprojects */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                              <Layers className="w-3.5 h-3.5" />
                              Subprojects (Optional)
                            </label>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => setShowSubprojectForm(!showSubprojectForm)}
                              className="font-bold text-xs h-7"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add
                            </Button>
                          </div>

                          {showSubprojectForm && (
                            <Card className="mb-2 border-2 border-dashed">
                              <CardContent className="p-2 space-y-2">
                                <input
                                  type="text"
                                  value={newSubproject.name}
                                  onChange={(e) => setNewSubproject({ ...newSubproject, name: e.target.value })}
                                  placeholder="Subproject name..."
                                  className="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none"
                                />
                                <input
                                  type="text"
                                  value={newSubproject.description}
                                  onChange={(e) => setNewSubproject({ ...newSubproject, description: e.target.value })}
                                  placeholder="Brief description..."
                                  className="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none"
                                />
                                <div className="flex gap-2">
                                  <Button type="button" size="sm" onClick={addSubproject} className="font-bold text-xs h-7">
                                    Add
                                  </Button>
                                  <Button type="button" size="sm" variant="ghost" onClick={() => setShowSubprojectForm(false)} className="font-bold text-xs h-7">
                                    Cancel
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          {subprojects.length > 0 ? (
                            <div className="space-y-1.5">
                              {subprojects.map((sp) => (
                                <Card key={sp.id} className="border-2">
                                  <CardContent className="p-2 flex items-center justify-between">
                                    <div className="min-w-0 flex-1">
                                      <p className="font-bold text-sm">{sp.name}</p>
                                      <p className="text-xs text-theme-muted truncate">{sp.description}</p>
                                    </div>
                                    <button
                                      onClick={() => removeSubproject(sp.id)}
                                      className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors flex-shrink-0 ml-2"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <Card className="border-2 border-dashed">
                              <CardContent className="p-4 text-center">
                                <Layers className="w-8 h-8 mx-auto mb-2 text-theme-muted opacity-50" />
                                <p className="text-xs text-theme-muted">
                                  No subprojects yet. Add them to organize your work!
                                </p>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: COLLABORATION */}
                    {currentStep === 4 && (
                      <div className="space-y-3">
                        <div className="grid md:grid-cols-2 gap-2">
                          <label className="flex items-start gap-2 p-2.5 rounded-lg border-2 border-[var(--border)] hover:border-[var(--primary)]/30 cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={enableDiscussions}
                              onChange={(e) => setEnableDiscussions(e.target.checked)}
                              className="mt-0.5 w-4 h-4 rounded border-[var(--border)] flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-sm">Enable Discussions</p>
                              <p className="text-[10px] text-theme-muted mt-0.5">
                                Chat and collaborate in real-time
                              </p>
                            </div>
                          </label>

                          <label className="flex items-start gap-2 p-2.5 rounded-lg border-2 border-[var(--border)] hover:border-[var(--primary)]/30 cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={enableResearch}
                              onChange={(e) => setEnableResearch(e.target.checked)}
                              className="mt-0.5 w-4 h-4 rounded border-[var(--border)] flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-sm">Enable Research Hub</p>
                              <p className="text-[10px] text-theme-muted mt-0.5">
                                Share articles and resources
                              </p>
                            </div>
                          </label>

                          <label className="flex items-start gap-2 p-2.5 rounded-lg border-2 border-[var(--border)] hover:border-[var(--primary)]/30 cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={enableLearning}
                              onChange={(e) => setEnableLearning(e.target.checked)}
                              className="mt-0.5 w-4 h-4 rounded border-[var(--border)] flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-sm">Enable Learning Modules</p>
                              <p className="text-[10px] text-theme-muted mt-0.5">
                                Create courses and training
                              </p>
                            </div>
                          </label>

                          <label className="flex items-start gap-2 p-2.5 rounded-lg border-2 border-[var(--border)] hover:border-[var(--primary)]/30 cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={requireApproval}
                              onChange={(e) => setRequireApproval(e.target.checked)}
                              className="mt-0.5 w-4 h-4 rounded border-[var(--border)] flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-sm">Require Join Approval</p>
                              <p className="text-[10px] text-theme-muted mt-0.5">
                                Manually approve new members
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: LAUNCH */}
                    {currentStep === 5 && (
                      <div className="space-y-3">
                        {/* Status */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <Rocket className="w-3.5 h-3.5" />
                            Initial Status
                          </label>
                          <select
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none"
                          >
                            <option value="PLANNING">Planning - Still organizing</option>
                            <option value="ACTIVE">Active - Ready to go!</option>
                            <option value="COMPLETED">Completed - Already finished</option>
                          </select>
                        </div>

                        {/* Goal */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-1.5">
                            <Target className="w-3.5 h-3.5" />
                            Primary Goal (Optional)
                          </label>
                          <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="e.g., Plant 1,000 trees by December"
                            maxLength={150}
                            className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none"
                          />
                        </div>

                        {/* Preview */}
                        <Card className="border-2 border-[var(--primary)]/30 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-1.5 text-base">
                              <Eye className="w-4 h-4" />
                              Preview
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div>
                              <p className="text-[10px] font-bold text-theme-muted uppercase mb-0.5">Name</p>
                              <p className="font-bold text-base">{name || 'Untitled Project'}</p>
                            </div>
                            {tagline && (
                              <div>
                                <p className="text-[10px] font-bold text-theme-muted uppercase mb-0.5">Tagline</p>
                                <p className="text-xs italic text-theme-muted">{tagline}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-[10px] font-bold text-theme-muted uppercase mb-0.5">Description</p>
                              <p className="text-xs line-clamp-3">{description || 'No description'}</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${VISIBILITY_OPTIONS.find(v => v.value === visibility)?.gradient} text-white`}>
                                {VISIBILITY_OPTIONS.find(v => v.value === visibility)?.label}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--muted)] text-[var(--foreground)]">
                                {category || 'Uncategorized'}
                              </span>
                              {selectedTheme && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--muted)] text-[var(--foreground)]">
                                  {selectedTheme.label}
                                </span>
                              )}
                              {subprojects.length > 0 && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--muted)] text-[var(--foreground)]">
                                  {subprojects.length} Sub
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>

                  </CardContent>

                  {/* Submit Message & Navigation - Fixed at bottom of card */}
                  <div className="flex-shrink-0 px-6 pb-4 space-y-3">
                    {submitMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg font-bold text-center text-sm ${
                          submitMessage.includes('success')
                            ? 'bg-emerald-500/10 text-emerald-600 border-2 border-emerald-500/30'
                            : 'bg-red-500/10 text-red-600 border-2 border-red-500/30'
                        }`}
                      >
                        {submitMessage}
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3">
                      {currentStep > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="font-bold"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                      )}

                      {currentStep < STEPS.length ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          disabled={!canProceed()}
                          className="flex-1 font-bold"
                        >
                          Next: {STEPS[currentStep].name}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex-1 font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Launching...
                            </>
                          ) : (
                            <>
                              <Flame className="w-5 h-5 mr-2" />
                              Launch Project!
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}
