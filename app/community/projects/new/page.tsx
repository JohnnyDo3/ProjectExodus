'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  Target,
  Users,
  FileText,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Settings2,
  Layers,
  BookOpen,
  ShieldCheck,
  Plus,
  X,
  GraduationCap,
  Clock,
  Award,
  Trash2
} from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'

interface Prerequisite {
  id: string
  type: 'EXODUS_COURSE' | 'EXPERIENCE_LEVEL' | 'SKILL' | 'CUSTOM'
  displayName: string
  description: string
  requiredTag?: string
  isRequired: boolean
}

interface Subgroup {
  id: string
  name: string
  description: string
  memberLimit: number | null
}

interface LearningModule {
  id: string
  title: string
  description: string
  contentType: 'VIDEO' | 'ARTICLE' | 'QUIZ' | 'ASSIGNMENT'
  externalUrl?: string
}

export default function NewProjectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Basic form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goal: '',
    status: 'PLANNING',
  })

  // Advanced form data
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([])
  const [subgroups, setSubgroups] = useState<Subgroup[]>([])
  const [learningModules, setLearningModules] = useState<LearningModule[]>([])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Generate slug from project name
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        + '-' + Date.now().toString(36)

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          slug,
          // Include advanced settings if any were configured
          prerequisites: prerequisites.length > 0 ? prerequisites : undefined,
          subgroups: subgroups.length > 0 ? subgroups : undefined,
          learningModules: learningModules.length > 0 ? learningModules : undefined,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitMessage('Project created successfully! Redirecting...')
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Prerequisite helpers
  const addPrerequisite = () => {
    setPrerequisites([
      ...prerequisites,
      {
        id: crypto.randomUUID(),
        type: 'EXODUS_COURSE',
        displayName: '',
        description: '',
        isRequired: true,
      }
    ])
  }

  const updatePrerequisite = (id: string, updates: Partial<Prerequisite>) => {
    setPrerequisites(prerequisites.map((p: Prerequisite) =>
      p.id === id ? { ...p, ...updates } : p
    ))
  }

  const removePrerequisite = (id: string) => {
    setPrerequisites(prerequisites.filter((p: Prerequisite) => p.id !== id))
  }

  // Subgroup helpers
  const addSubgroup = () => {
    setSubgroups([
      ...subgroups,
      {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        memberLimit: null,
      }
    ])
  }

  const updateSubgroup = (id: string, updates: Partial<Subgroup>) => {
    setSubgroups(subgroups.map((s: Subgroup) =>
      s.id === id ? { ...s, ...updates } : s
    ))
  }

  const removeSubgroup = (id: string) => {
    setSubgroups(subgroups.filter((s: Subgroup) => s.id !== id))
  }

  // Learning module helpers
  const addLearningModule = () => {
    setLearningModules([
      ...learningModules,
      {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        contentType: 'ARTICLE',
      }
    ])
  }

  const updateLearningModule = (id: string, updates: Partial<LearningModule>) => {
    setLearningModules(learningModules.map((m: LearningModule) =>
      m.id === id ? { ...m, ...updates } : m
    ))
  }

  const removeLearningModule = (id: string) => {
    setLearningModules(learningModules.filter((m: LearningModule) => m.id !== id))
  }

  const advancedItemCount = prerequisites.length + subgroups.length + learningModules.length

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Projects" fallbackUrl="/community/projects" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Link href="/community/projects">
              <Button variant="ghost" className="mb-6 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO PROJECTS
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-xl">
                <Briefcase className="w-8 h-8 text-[var(--primary-foreground)]" />
              </div>
              <div>
                <h1 className="text-5xl font-black text-[var(--foreground)]">
                  START A PROJECT
                </h1>
                <p className="text-lg font-semibold text-theme-muted mt-2">
                  Create a community sustainability initiative
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Details Card */}
              <Card className="border-4 border-theme-primary shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-black">PROJECT DETAILS</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Project Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <Briefcase className="w-4 h-4" />
                      Project Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      placeholder="e.g., Community Garden Initiative"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      Give your project a clear, descriptive name
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <FileText className="w-4 h-4" />
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={5}
                      placeholder="Describe what your project aims to accomplish and why it matters..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors resize-none"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      {formData.description.length}/500 characters
                    </p>
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <Target className="w-4 h-4" />
                      Goal
                    </label>
                    <input
                      type="text"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      maxLength={150}
                      placeholder="e.g., Plant 100 trees by end of year"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    />
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      Optional: Set a specific, measurable goal for your project
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-black text-[var(--foreground)] mb-3 uppercase">
                      <Users className="w-4 h-4" />
                      Project Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
                    >
                      <option value="PLANNING">Planning - Still organizing</option>
                      <option value="ACTIVE">Active - Currently running</option>
                      <option value="COMPLETED">Completed - Project finished</option>
                    </select>
                    <p className="text-xs font-medium text-theme-muted mt-2">
                      Select the current status of your project
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Settings Toggle */}
              <Card className="border-2 border-[var(--border)] shadow-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full p-6 flex items-center justify-between hover:bg-[var(--muted)]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center">
                      <Settings2 className="w-6 h-6 text-[var(--primary-foreground)]" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-black text-[var(--foreground)]">
                        ADVANCED SETTINGS
                      </h3>
                      <p className="text-sm font-semibold text-theme-muted">
                        Prerequisites, Subgroups, Learning Modules
                        {advancedItemCount > 0 && (
                          <span className="ml-2 px-2 py-0.5 bg-[var(--primary)]/10 text-theme-primary rounded-full text-xs">
                            {advancedItemCount} configured
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: showAdvanced ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-6 h-6 text-theme-muted" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 space-y-8 border-t border-[var(--border)]">
                        {/* Prerequisites Section */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-5 h-5 text-theme-accent" />
                              <h4 className="text-lg font-black">PREREQUISITES</h4>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addPrerequisite}
                              className="font-bold"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          </div>
                          <p className="text-sm text-theme-muted mb-4">
                            Set requirements members must meet before joining your project
                          </p>

                          {prerequisites.length === 0 ? (
                            <div className="p-6 border-2 border-dashed border-[var(--border)] rounded-lg text-center">
                              <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-theme-muted opacity-50" />
                              <p className="text-sm font-semibold text-theme-muted">
                                No prerequisites set - anyone can join
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {prerequisites.map((prereq, index) => (
                                <Card key={prereq.id} className="border-2">
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                      <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center font-black text-sm text-theme-accent">
                                        {index + 1}
                                      </div>
                                      <div className="flex-1 space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                          <select
                                            value={prereq.type}
                                            onChange={(e) => updatePrerequisite(prereq.id, { type: e.target.value as Prerequisite['type'] })}
                                            className="px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                          >
                                            <option value="EXODUS_COURSE">Exodus Course</option>
                                            <option value="EXPERIENCE_LEVEL">Experience Level</option>
                                            <option value="SKILL">Skill</option>
                                            <option value="CUSTOM">Custom</option>
                                          </select>
                                          <input
                                            type="text"
                                            value={prereq.displayName}
                                            onChange={(e) => updatePrerequisite(prereq.id, { displayName: e.target.value })}
                                            placeholder="Display name"
                                            className="px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                          />
                                        </div>
                                        <input
                                          type="text"
                                          value={prereq.description}
                                          onChange={(e) => updatePrerequisite(prereq.id, { description: e.target.value })}
                                          placeholder="Description (e.g., Complete the Sustainability 101 course)"
                                          className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                        />
                                        <div className="flex items-center gap-4">
                                          <label className="flex items-center gap-2 text-sm font-semibold">
                                            <input
                                              type="checkbox"
                                              checked={prereq.isRequired}
                                              onChange={(e) => updatePrerequisite(prereq.id, { isRequired: e.target.checked })}
                                              className="w-4 h-4 rounded border-[var(--border)]"
                                            />
                                            Required
                                          </label>
                                          {prereq.type === 'EXODUS_COURSE' && (
                                            <input
                                              type="text"
                                              value={prereq.requiredTag || ''}
                                              onChange={(e) => updatePrerequisite(prereq.id, { requiredTag: e.target.value })}
                                              placeholder="Course tag (e.g., sustainability)"
                                              className="flex-1 px-3 py-1 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-xs focus:border-theme-primary focus:outline-none"
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removePrerequisite(prereq.id)}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Subgroups Section */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Layers className="w-5 h-5 text-theme-primary" />
                              <h4 className="text-lg font-black">SUBGROUPS</h4>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addSubgroup}
                              className="font-bold"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          </div>
                          <p className="text-sm text-theme-muted mb-4">
                            Create teams or working groups within your project
                          </p>

                          {subgroups.length === 0 ? (
                            <div className="p-6 border-2 border-dashed border-[var(--border)] rounded-lg text-center">
                              <Layers className="w-8 h-8 mx-auto mb-2 text-theme-muted opacity-50" />
                              <p className="text-sm font-semibold text-theme-muted">
                                No subgroups - all members in one group
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {subgroups.map((group, index) => (
                                <Card key={group.id} className="border-2">
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                      <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center font-black text-sm text-theme-primary">
                                        {index + 1}
                                      </div>
                                      <div className="flex-1 space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                          <input
                                            type="text"
                                            value={group.name}
                                            onChange={(e) => updateSubgroup(group.id, { name: e.target.value })}
                                            placeholder="Subgroup name"
                                            className="px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                          />
                                          <input
                                            type="number"
                                            value={group.memberLimit || ''}
                                            onChange={(e) => updateSubgroup(group.id, { memberLimit: e.target.value ? parseInt(e.target.value) : null })}
                                            placeholder="Member limit (optional)"
                                            min="1"
                                            className="px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                          />
                                        </div>
                                        <input
                                          type="text"
                                          value={group.description}
                                          onChange={(e) => updateSubgroup(group.id, { description: e.target.value })}
                                          placeholder="Description (e.g., Handles outreach and community engagement)"
                                          className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeSubgroup(group.id)}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Learning Modules Section */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-theme-secondary" />
                              <h4 className="text-lg font-black">LEARNING MODULES</h4>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addLearningModule}
                              className="font-bold"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          </div>
                          <p className="text-sm text-theme-muted mb-4">
                            Add educational content for your project members
                          </p>

                          {learningModules.length === 0 ? (
                            <div className="p-6 border-2 border-dashed border-[var(--border)] rounded-lg text-center">
                              <BookOpen className="w-8 h-8 mx-auto mb-2 text-theme-muted opacity-50" />
                              <p className="text-sm font-semibold text-theme-muted">
                                No learning modules - add some to help members get started
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {learningModules.map((module, index) => (
                                <Card key={module.id} className="border-2">
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                      <div className="w-8 h-8 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center font-black text-sm text-theme-secondary">
                                        {index + 1}
                                      </div>
                                      <div className="flex-1 space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                          <input
                                            type="text"
                                            value={module.title}
                                            onChange={(e) => updateLearningModule(module.id, { title: e.target.value })}
                                            placeholder="Module title"
                                            className="px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                          />
                                          <select
                                            value={module.contentType}
                                            onChange={(e) => updateLearningModule(module.id, { contentType: e.target.value as LearningModule['contentType'] })}
                                            className="px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                          >
                                            <option value="ARTICLE">Article</option>
                                            <option value="VIDEO">Video</option>
                                            <option value="QUIZ">Quiz</option>
                                            <option value="ASSIGNMENT">Assignment</option>
                                          </select>
                                        </div>
                                        <input
                                          type="text"
                                          value={module.description}
                                          onChange={(e) => updateLearningModule(module.id, { description: e.target.value })}
                                          placeholder="Description"
                                          className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                        />
                                        <input
                                          type="url"
                                          value={module.externalUrl || ''}
                                          onChange={(e) => updateLearningModule(module.id, { externalUrl: e.target.value })}
                                          placeholder="External URL (optional)"
                                          className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-sm focus:border-theme-primary focus:outline-none"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => removeLearningModule(module.id)}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Info Box */}
              <Card className="bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] border-2 border-theme-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h3 className="font-black text-[var(--foreground)] mb-2">
                        TIPS FOR SUCCESS
                      </h3>
                      <ul className="space-y-1 text-sm font-semibold text-theme-muted">
                        <li>• Be specific about what you want to achieve</li>
                        <li>• Include why this project matters to your community</li>
                        <li>• Set realistic goals and timelines</li>
                        <li>• Invite others to join and collaborate</li>
                        <li>• Use subgroups to organize larger teams</li>
                        <li>• Add learning modules to onboard new members</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Message */}
              {submitMessage && (
                <div
                  className={`p-4 rounded-lg font-bold text-center ${
                    submitMessage.includes('success')
                      ? 'bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent'
                      : 'bg-[color-mix(in_srgb,var(--secondary)_20%,var(--background))] text-theme-secondary'
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="flex-1 font-black text-lg py-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[var(--primary-foreground)] border-t-transparent rounded-full animate-spin mr-2" />
                      CREATING PROJECT...
                    </>
                  ) : (
                    'CREATE PROJECT'
                  )}
                </Button>
                <Link href="/community/projects" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full font-black text-lg py-6"
                  >
                    CANCEL
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
