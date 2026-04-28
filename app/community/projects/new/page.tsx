'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import Step0Picker from '@/components/projects/create/Step0Picker'
import BrainstormPanel from '@/components/projects/create/BrainstormPanel'
import type { ExtractedFields } from '@/lib/projects/ai/extractedFieldsSchema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Eye, Heart, Flame, Target, Shield, Globe, Compass,
  ArrowLeft, ArrowRight, Check, Rocket, Users, FileText,
  Settings, Layers, BookOpen, Lock, Unlock, Globe2, Archive,
  Palette, Layout, ImageIcon, Tag, FolderTree, Plus, X, ChevronDown,
  Zap, Leaf, Sun, Moon, TreePine, Waves, Mountain, Wind, Network,
  Lightbulb, CheckSquare, Flag, Package, StickyNote, Hexagon, AlertTriangle, Star, Link2
} from 'lucide-react'
import { BackButton } from '@/components/navigation/BackButton'
import Link from 'next/link'
import { ProjectTemplateGallery } from '@/components/projects/ProjectTemplateGallery'
import { ProjectTemplate } from '@/data/project-templates'

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
    name: 'Mind Map',
    guardian: 'Clarity',
    icon: Compass,
    gradient: 'from-emerald-500 via-teal-400 to-cyan-500',
    color: 'text-emerald-400',
    description: 'Visualize your project roadmap'
  },
  {
    id: 5,
    name: 'Collaboration',
    guardian: 'Humanity',
    icon: Heart,
    gradient: 'from-pink-500 via-rose-400 to-red-400',
    color: 'text-rose-400',
    description: 'Configure collaboration & team settings'
  },
  {
    id: 6,
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
  { value: 'nature', label: 'Nature', colors: { primary: '#10b981', accent: '#14b8a6', gradient: 'from-emerald-500 to-teal-500' }, icon: Leaf, description: 'Fresh and growing' },
  { value: 'solar', label: 'Solar', colors: { primary: '#f59e0b', accent: '#f97316', gradient: 'from-yellow-500 to-orange-500' }, icon: Sun, description: 'Bright and energizing' },
  { value: 'lunar', label: 'Lunar', colors: { primary: '#6366f1', accent: '#8b5cf6', gradient: 'from-indigo-500 to-purple-500' }, icon: Moon, description: 'Calm and mystical' },
  { value: 'forest', label: 'Forest', colors: { primary: '#059669', accent: '#0d9488', gradient: 'from-green-600 to-teal-600' }, icon: TreePine, description: 'Deep and natural' },
  { value: 'ocean', label: 'Ocean', colors: { primary: '#0ea5e9', accent: '#06b6d4', gradient: 'from-blue-500 to-cyan-500' }, icon: Waves, description: 'Flowing and vast' },
  { value: 'fire', label: 'Fire', colors: { primary: '#ef4444', accent: '#f97316', gradient: 'from-red-500 to-orange-500' }, icon: Flame, description: 'Bold and passionate' },
  { value: 'earth', label: 'Earth', colors: { primary: '#92400e', accent: '#b45309', gradient: 'from-amber-800 to-orange-700' }, icon: Mountain, description: 'Grounded and solid' },
  { value: 'sky', label: 'Sky', colors: { primary: '#0284c7', accent: '#0ea5e9', gradient: 'from-cyan-600 to-blue-500' }, icon: Wind, description: 'Open and expansive' },
  { value: 'rose', label: 'Rose', colors: { primary: '#e11d48', accent: '#f43f5e', gradient: 'from-rose-600 to-pink-500' }, icon: Heart, description: 'Warm and inviting' },
  { value: 'amethyst', label: 'Amethyst', colors: { primary: '#7c3aed', accent: '#a78bfa', gradient: 'from-violet-600 to-purple-400' }, icon: Sparkles, description: 'Creative and inspiring' },
  { value: 'arctic', label: 'Arctic', colors: { primary: '#0891b2', accent: '#06b6d4', gradient: 'from-cyan-600 to-sky-400' }, icon: Waves, description: 'Cool and crisp' },
  { value: 'sunset', label: 'Sunset', colors: { primary: '#ea580c', accent: '#f97316', gradient: 'from-orange-600 to-amber-500' }, icon: Sun, description: 'Warm and glowing' },
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
  const [showStep0, setShowStep0] = useState(true)
  const [brainstormOpen, setBrainstormOpen] = useState(false)
  const [brainstormDraftId, setBrainstormDraftId] = useState<string | null>(null)
  const [brainstormStarting, setBrainstormStarting] = useState(false)
  const [showTemplateGallery, setShowTemplateGallery] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Sage pre-fill state — only set when the user came in via Step 0 paste/upload
  const [sageDraftId, setSageDraftId] = useState<string | null>(null)
  const [sageNotes, setSageNotes] = useState<string | null>(null)

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
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [inspirationImages, setInspirationImages] = useState<string[]>([])

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

  // Step 4: Mind Map
  const [mindMapNodes, setMindMapNodes] = useState<any[]>([])
  const [mindMapConnections, setMindMapConnections] = useState<any[]>([])
  const [selectedNodeType, setSelectedNodeType] = useState<string>('IDEA')
  const [showNodeForm, setShowNodeForm] = useState(false)
  const [newNode, setNewNode] = useState({ label: '', description: '', type: 'IDEA' })
  const [showConnectionForm, setShowConnectionForm] = useState(false)
  const [newConnection, setNewConnection] = useState({ from: '', to: '', type: 'RELATED' })

  // Step 5: Collaboration
  const [enableDiscussions, setEnableDiscussions] = useState(true)
  const [enableResearch, setEnableResearch] = useState(true)
  const [enableLearning, setEnableLearning] = useState(true)
  const [requireApproval, setRequireApproval] = useState(false)

  // Step 6: Launch
  const [projectStatus, setProjectStatus] = useState('PLANNING')
  const [goal, setGoal] = useState('')

  // Handle template selection
  const handleTemplateSelection = (template: ProjectTemplate | null) => {
    setSelectedTemplate(template)

    if (template) {
      // Populate form fields with template data
      setName(template.name)
      setTagline(template.tagline)
      setDescription(template.description)
      setMission(template.mission)
      setCategory(template.category)
      setTags(template.tags)
      setTheme(template.theme)
      setGoal(template.suggestedGoal)
      setEnableDiscussions(template.features.enableDiscussions)
      setEnableResearch(template.features.enableResearch)
      setEnableLearning(template.features.enableLearning)
      setRequireApproval(template.features.requireApproval)
    }

    // Hide template gallery and show wizard
    setShowTemplateGallery(false)
  }

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
        return true // Mind map is optional
      case 5:
        return true // Collaboration settings are optional
      case 6:
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

  // Mind Map helpers
  const addMindMapNode = () => {
    if (newNode.label.trim()) {
      const node = {
        id: crypto.randomUUID(),
        label: newNode.label,
        description: newNode.description,
        type: newNode.type,
        x: Math.random() * 600 + 100, // Random position
        y: Math.random() * 400 + 100,
      }
      setMindMapNodes([...mindMapNodes, node])
      setNewNode({ label: '', description: '', type: 'IDEA' })
      setShowNodeForm(false)
    }
  }

  const removeMindMapNode = (id: string) => {
    setMindMapNodes(mindMapNodes.filter(n => n.id !== id))
    // Also remove connections involving this node
    setMindMapConnections(mindMapConnections.filter(c => c.from !== id && c.to !== id))
  }

  const addMindMapConnection = () => {
    if (newConnection.from && newConnection.to && newConnection.from !== newConnection.to) {
      const connection = {
        id: crypto.randomUUID(),
        from: newConnection.from,
        to: newConnection.to,
        type: newConnection.type,
      }
      setMindMapConnections([...mindMapConnections, connection])
      setNewConnection({ from: '', to: '', type: 'RELATED' })
      setShowConnectionForm(false)
    }
  }

  const removeMindMapConnection = (id: string) => {
    setMindMapConnections(mindMapConnections.filter(c => c.id !== id))
  }

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setCoverImageFile(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    setCoverImageFile(null)
  }

  const handleInspirationImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setInspirationImages(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeInspirationImage = (index: number) => {
    setInspirationImages(prev => prev.filter((_, i) => i !== index))
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
        })),
        mindMap: {
          nodes: mindMapNodes.map(node => ({
            id: node.id, // Include temp ID for connection mapping
            type: node.type,
            label: node.label,
            description: node.description,
            x: node.x,
            y: node.y
          })),
          connections: mindMapConnections
        }
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

  // Sage pre-filled fields from a pasted plan / upload. Map the structured
  // extraction output onto the form's existing state setters.
  const applyExtractedFields = (fields: ExtractedFields, draftId: string) => {
    if (fields.name) setName(fields.name)
    if (fields.tagline) setTagline(fields.tagline)
    if (fields.description) setDescription(fields.description)
    if (fields.mission) setMission(fields.mission)
    if (fields.goal) setGoal(fields.goal)
    if (fields.theme) setTheme(fields.theme)
    if (fields.category) setCategory(fields.category)
    if (fields.projectStatus) setProjectStatus(fields.projectStatus)
    if (fields.tags && fields.tags.length > 0) setTags(fields.tags)
    if (fields.visibility) setVisibility(fields.visibility)
    if (fields.subprojects && fields.subprojects.length > 0) {
      setSubprojects(fields.subprojects.map((s, i) => ({
        id: `sage-${i}`,
        name: s.name,
        description: s.description ?? '',
        parentId: null,
      })))
    }
    if (fields.mindMapNodes && fields.mindMapNodes.length > 0) {
      setMindMapNodes(fields.mindMapNodes.map((n, i) => ({
        id: `sage-node-${i}`,
        label: n.label,
        description: n.description ?? '',
        type: n.type ?? 'IDEA',
      })))
    }
    if (fields.mindMapConnections && fields.mindMapConnections.length > 0) {
      setMindMapConnections(fields.mindMapConnections.map((c, i) => ({
        id: `sage-conn-${i}`,
        from: c.from,
        to: c.to,
        type: c.type ?? 'RELATED',
      })))
    }
    if (typeof fields.enableDiscussions === 'boolean') setEnableDiscussions(fields.enableDiscussions)
    if (typeof fields.enableResearch === 'boolean') setEnableResearch(fields.enableResearch)
    if (typeof fields.enableLearning === 'boolean') setEnableLearning(fields.enableLearning)
    if (typeof fields.requireApproval === 'boolean') setRequireApproval(fields.requireApproval)

    setSageDraftId(draftId)
    setSageNotes(fields.sageNotes ?? null)
    // User has Sage-pre-filled content; skip the template gallery and drop
    // them right into the wizard for review.
    setShowStep0(false)
    setShowTemplateGallery(false)
  }

  // Step 0 — brainstorm chat. Created lazily when user picks the brainstorm path.
  if (brainstormOpen && brainstormDraftId) {
    return (
      <BrainstormPanel
        draftId={brainstormDraftId}
        onClose={() => { setBrainstormOpen(false); setShowStep0(true) }}
        onDraftInitiative={(fields, id) => {
          setBrainstormOpen(false)
          applyExtractedFields(fields, id)
        }}
      />
    )
  }

  // Step 0 — picker (paste / brainstorm / blank). Shown before everything else.
  if (showStep0) {
    const startBrainstorm = async () => {
      if (brainstormStarting) return
      setBrainstormStarting(true)
      try {
        const res = await fetch('/api/projects/drafts', { method: 'POST' })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || 'Couldn\'t start a brainstorm')
        }
        const { draft } = await res.json()
        setBrainstormDraftId(draft.id)
        setBrainstormOpen(true)
        setShowStep0(false)
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Couldn\'t start a brainstorm')
      } finally {
        setBrainstormStarting(false)
      }
    }
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Step0Picker
          onSkip={() => setShowStep0(false)}
          onPlanExtracted={applyExtractedFields}
          onBrainstormPlaceholder={startBrainstorm}
        />
      </div>
    )
  }

  // Show template gallery if user hasn't selected a template yet
  if (showTemplateGallery) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--card)] border-b border-[var(--border)]/30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 py-6">
            <div className="max-w-5xl mx-auto">
              <BackButton label="Back to Projects" fallbackUrl="/community/projects" className="mb-4" />
            </div>
          </div>
        </section>

        <section className="py-8 flex-1">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <ProjectTemplateGallery
                onSelectTemplate={handleTemplateSelection}
                selectedTemplateId={selectedTemplate?.id}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Sage pre-fill banner — appears when fields were filled from a pasted plan */}
      {sageNotes && (
        <div className="bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent)]/10 to-[var(--primary)]/10 border-b border-[var(--primary)]/30">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-5xl mx-auto flex items-start gap-3">
              <Sparkles className="w-5 h-5 mt-0.5 shrink-0 text-[var(--primary)]" />
              <div className="flex-1 text-sm">
                <span className="font-bold">Sage pre-filled this for you. </span>
                <span className="text-theme-muted">{sageNotes}</span>
                <span className="text-theme-muted"> Review every field — anything you change overrides her draft.</span>
              </div>
              <button
                onClick={() => setSageNotes(null)}
                className="text-xs font-bold text-theme-muted hover:text-theme-foreground shrink-0"
                aria-label="Dismiss Sage notes"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with Progress */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--card)] via-[var(--background)] to-[var(--card)] border-b border-[var(--border)]/30">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-4">
          <div className="max-w-5xl mx-auto">
            <BackButton label="Back to Projects" fallbackUrl="/community/projects" className="mb-3" />

            {/* Template Badge */}
            {selectedTemplate && (
              <div className="mb-3 flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20">
                  <Sparkles className="w-3 h-3 text-theme-primary" />
                  <span className="text-xs font-bold text-theme-primary">
                    Using template: {selectedTemplate.name}
                  </span>
                </div>
                <button
                  onClick={() => setShowTemplateGallery(true)}
                  className="text-xs font-bold text-theme-muted hover:text-theme-primary underline"
                >
                  Change Template
                </button>
              </div>
            )}

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
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`relative overflow-hidden border-2 shadow-xl`}>
                  {/* Step header with Guardian gradient */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentStepData.gradient}`} />

                  <CardHeader className="pb-3">
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

                  <CardContent className="space-y-4 pb-4">
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

                        {/* Cover Image Upload */}
                        <div className="pt-2">
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-2">
                            <ImageIcon className="w-3.5 h-3.5" />
                            Cover Image (Optional)
                          </label>

                          {coverImage ? (
                            <div className="relative group">
                              <img
                                src={coverImage}
                                alt="Cover preview"
                                className="w-full h-48 object-cover rounded-xl border-2 border-[var(--border)]"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                <button
                                  onClick={removeCoverImage}
                                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                                >
                                  <X className="w-4 h-4" />
                                  Remove Cover
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[var(--border)] rounded-xl cursor-pointer hover:border-[var(--primary)] transition-colors bg-[var(--muted)]/20 hover:bg-[var(--muted)]/40">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImageIcon className="w-10 h-10 mb-3 text-theme-muted" />
                                <p className="mb-2 text-sm font-bold text-theme-muted">
                                  <span className="text-theme-primary">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-theme-muted">PNG, JPG, GIF up to 10MB</p>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleCoverImageUpload}
                              />
                            </label>
                          )}
                        </div>

                        {/* Inspiration Board */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                              <Sparkles className="w-3.5 h-3.5" />
                              Inspiration Board (Optional)
                            </label>
                            <label className="cursor-pointer">
                              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded-lg transition-colors">
                                <Plus className="w-3.5 h-3.5 text-theme-primary" />
                                <span className="text-xs font-bold text-theme-primary">Add Image</span>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleInspirationImageUpload}
                              />
                            </label>
                          </div>

                          {inspirationImages.length > 0 ? (
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                              {inspirationImages.map((img, idx) => (
                                <div key={idx} className="relative group">
                                  <img
                                    src={img}
                                    alt={`Inspiration ${idx + 1}`}
                                    className="w-full aspect-square object-cover rounded-lg border-2 border-[var(--border)]"
                                  />
                                  <button
                                    onClick={() => removeInspirationImage(idx)}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-6 border-2 border-dashed border-[var(--border)] rounded-lg text-center">
                              <Sparkles className="w-8 h-8 mx-auto mb-2 text-theme-muted" />
                              <p className="text-xs text-theme-muted">
                                Add images that inspire your project vision
                              </p>
                            </div>
                          )}
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
                        {/* Theme Selection - Enhanced */}
                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)] mb-3">
                            <Palette className="w-3.5 h-3.5" />
                            Visual Theme & Colors
                          </label>

                          {/* Selected Theme Preview */}
                          {selectedTheme && (
                            <div
                              className="mb-4 p-4 rounded-xl border-2 border-[var(--primary)] relative overflow-hidden"
                              style={{
                                background: `linear-gradient(135deg, ${selectedTheme.colors.primary}10, ${selectedTheme.colors.accent}10)`
                              }}
                            >
                              <div
                                className={`absolute inset-0 opacity-20 bg-gradient-to-r ${selectedTheme.colors.gradient}`}
                              />
                              <div className="relative flex items-center gap-3">
                                <div
                                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                                  style={{
                                    background: `linear-gradient(135deg, ${selectedTheme.colors.primary}, ${selectedTheme.colors.accent})`
                                  }}
                                >
                                  <selectedTheme.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-[var(--foreground)]">
                                    {selectedTheme.label} Theme
                                  </h4>
                                  <p className="text-xs text-theme-muted">
                                    {selectedTheme.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Theme Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                            {PROJECT_THEMES.map((t) => {
                              const Icon = t.icon
                              const isSelected = theme === t.value

                              return (
                                <button
                                  key={t.value}
                                  type="button"
                                  onClick={() => setTheme(t.value)}
                                  className={`group relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                                    isSelected
                                      ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20 scale-105'
                                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                                  }`}
                                  title={t.description}
                                >
                                  {/* Gradient Background */}
                                  <div
                                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${t.colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity ${
                                      isSelected ? 'opacity-15' : ''
                                    }`}
                                  />

                                  {/* Content */}
                                  <div className="relative">
                                    <div
                                      className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                                      style={{
                                        background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.accent})`
                                      }}
                                    >
                                      <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="text-[10px] font-bold text-center text-[var(--foreground)] mb-0.5">
                                      {t.label}
                                    </p>
                                    {isSelected && (
                                      <div className="absolute -top-1 -right-1">
                                        <div
                                          className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                                          style={{
                                            background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.accent})`
                                          }}
                                        >
                                          <Check className="w-3 h-3 text-white" />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </button>
                              )
                            })}
                          </div>

                          {/* Theme Info */}
                          <p className="text-xs text-theme-muted mt-3 italic">
                            Your theme sets the visual identity for your project. You can always change it later.
                          </p>
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

                    {/* STEP 4: MIND MAP */}
                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/20 rounded-xl p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                              <Network className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">
                                Draft Your Project Mind Map
                              </h3>
                              <p className="text-xs text-theme-muted leading-relaxed">
                                Create a visual roadmap of your ideas, tasks, milestones, and resources.
                                After launch, you and your team can collaboratively expand this map together.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Node Type Legend */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
                          {[
                            { type: 'IDEA', icon: Lightbulb, label: 'Idea', color: 'from-yellow-500 to-amber-500' },
                            { type: 'TASK', icon: CheckSquare, label: 'Task', color: 'from-blue-500 to-cyan-500' },
                            { type: 'MILESTONE', icon: Flag, label: 'Milestone', color: 'from-pink-500 to-rose-500' },
                            { type: 'RESOURCE', icon: Package, label: 'Resource', color: 'from-purple-500 to-violet-500' },
                            { type: 'NOTE', icon: StickyNote, label: 'Note', color: 'from-green-500 to-emerald-500' }
                          ].map(({ type, icon: Icon, label, color }) => (
                            <div key={type} className="flex items-center gap-1.5 p-2 bg-[var(--muted)]/20 rounded-lg border border-[var(--border)]">
                              <div className={`w-6 h-6 rounded bg-gradient-to-br ${color} flex items-center justify-center`}>
                                <Icon className="w-3.5 h-3.5 text-white" />
                              </div>
                              <span className="text-[10px] font-bold text-theme-muted">{label}</span>
                            </div>
                          ))}
                        </div>

                        {/* Add Node Button */}
                        <div className="flex justify-between items-center mb-3">
                          <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                            <Network className="w-3.5 h-3.5" />
                            Mind Map Nodes
                          </label>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => setShowNodeForm(!showNodeForm)}
                            className="font-bold text-xs h-7"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Node
                          </Button>
                        </div>

                        {/* Add Node Form */}
                        {showNodeForm && (
                          <Card className="mb-3 border-2 border-dashed border-emerald-500/30">
                            <CardContent className="p-3 space-y-2">
                              <div>
                                <label className="text-[10px] font-bold text-theme-muted mb-1 block">Node Type</label>
                                <select
                                  value={newNode.type}
                                  onChange={(e) => setNewNode({ ...newNode, type: e.target.value })}
                                  className="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none"
                                >
                                  <option value="IDEA">💡 Idea</option>
                                  <option value="TASK">✅ Task</option>
                                  <option value="MILESTONE">🎯 Milestone</option>
                                  <option value="RESOURCE">📦 Resource</option>
                                  <option value="NOTE">📝 Note</option>
                                  <option value="DECISION">🎲 Decision</option>
                                  <option value="RISK">⚠️ Risk</option>
                                  <option value="OPPORTUNITY">🌟 Opportunity</option>
                                </select>
                              </div>
                              <input
                                type="text"
                                value={newNode.label}
                                onChange={(e) => setNewNode({ ...newNode, label: e.target.value })}
                                placeholder="Node title (e.g., 'Launch website', 'Research partners')"
                                className="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none"
                              />
                              <textarea
                                value={newNode.description}
                                onChange={(e) => setNewNode({ ...newNode, description: e.target.value })}
                                placeholder="Optional description..."
                                rows={2}
                                className="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none resize-none"
                              />
                              <div className="flex gap-2">
                                <Button type="button" size="sm" onClick={addMindMapNode} className="font-bold text-xs h-7">
                                  Add Node
                                </Button>
                                <Button type="button" size="sm" variant="ghost" onClick={() => setShowNodeForm(false)} className="font-bold text-xs h-7">
                                  Cancel
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Mind Map Nodes List */}
                        {mindMapNodes.length > 0 ? (
                          <div className="space-y-2">
                            {mindMapNodes.map((node) => {
                              const getNodeIcon = (type: string) => {
                                switch (type) {
                                  case 'IDEA': return Lightbulb
                                  case 'TASK': return CheckSquare
                                  case 'MILESTONE': return Flag
                                  case 'RESOURCE': return Package
                                  case 'NOTE': return StickyNote
                                  case 'DECISION': return Hexagon
                                  case 'RISK': return AlertTriangle
                                  case 'OPPORTUNITY': return Star
                                  default: return Lightbulb
                                }
                              }
                              const getNodeColor = (type: string) => {
                                switch (type) {
                                  case 'IDEA': return 'from-yellow-500 to-amber-500'
                                  case 'TASK': return 'from-blue-500 to-cyan-500'
                                  case 'MILESTONE': return 'from-pink-500 to-rose-500'
                                  case 'RESOURCE': return 'from-purple-500 to-violet-500'
                                  case 'NOTE': return 'from-green-500 to-emerald-500'
                                  case 'DECISION': return 'from-orange-500 to-amber-500'
                                  case 'RISK': return 'from-red-500 to-orange-500'
                                  case 'OPPORTUNITY': return 'from-emerald-500 to-teal-500'
                                  default: return 'from-gray-500 to-slate-500'
                                }
                              }
                              const Icon = getNodeIcon(node.type)
                              return (
                                <Card key={node.id} className="border-2">
                                  <CardContent className="p-2.5 flex items-start gap-2.5">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getNodeColor(node.type)} flex items-center justify-center flex-shrink-0`}>
                                      <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-start justify-between gap-2">
                                        <p className="font-bold text-sm text-[var(--foreground)]">{node.label}</p>
                                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[var(--muted)]/50 rounded uppercase tracking-wide text-theme-muted flex-shrink-0">
                                          {node.type}
                                        </span>
                                      </div>
                                      {node.description && (
                                        <p className="text-xs text-theme-muted mt-1 leading-snug">{node.description}</p>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => removeMindMapNode(node.id)}
                                      className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors flex-shrink-0"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </div>
                        ) : (
                          <Card className="border-2 border-dashed">
                            <CardContent className="p-6 text-center">
                              <Network className="w-12 h-12 mx-auto mb-3 text-theme-muted opacity-50" />
                              <p className="text-sm font-bold text-[var(--foreground)] mb-1">
                                No nodes yet - start mapping!
                              </p>
                              <p className="text-xs text-theme-muted leading-relaxed">
                                Add your first node to begin visualizing your project. This is optional - you can skip this step and create your mind map after launch.
                              </p>
                            </CardContent>
                          </Card>
                        )}

                        {/* Connections Section */}
                        {mindMapNodes.length >= 2 && (
                          <>
                            <div className="flex justify-between items-center mb-3 mt-6">
                              <label className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                                <Link2 className="w-3.5 h-3.5" />
                                Node Connections
                              </label>
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => setShowConnectionForm(!showConnectionForm)}
                                className="font-bold text-xs h-7"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Connection
                              </Button>
                            </div>

                            {/* Add Connection Form */}
                            {showConnectionForm && (
                              <Card className="mb-3 border-2 border-dashed border-teal-500/30">
                                <CardContent className="p-3 space-y-2">
                                  <div>
                                    <label className="text-[10px] font-bold text-theme-muted mb-1 block">From Node</label>
                                    <select
                                      value={newConnection.from}
                                      onChange={(e) => setNewConnection({ ...newConnection, from: e.target.value })}
                                      className="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none"
                                    >
                                      <option value="">Select source node...</option>
                                      {mindMapNodes.map(node => (
                                        <option key={node.id} value={node.id}>
                                          {node.type === 'IDEA' && '💡'}
                                          {node.type === 'TASK' && '✅'}
                                          {node.type === 'MILESTONE' && '🎯'}
                                          {node.type === 'RESOURCE' && '📦'}
                                          {node.type === 'NOTE' && '📝'}
                                          {node.type === 'DECISION' && '🎲'}
                                          {node.type === 'RISK' && '⚠️'}
                                          {node.type === 'OPPORTUNITY' && '🌟'}
                                          {' '}{node.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-[10px] font-bold text-theme-muted mb-1 block">Connection Type</label>
                                    <select
                                      value={newConnection.type}
                                      onChange={(e) => setNewConnection({ ...newConnection, type: e.target.value })}
                                      className="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none"
                                    >
                                      <option value="RELATED">🔗 Related to</option>
                                      <option value="DEPENDS">⚡ Depends on</option>
                                      <option value="LEADS_TO">➡️ Leads to</option>
                                      <option value="BLOCKS">🚫 Blocks</option>
                                      <option value="SUPPORTS">🤝 Supports</option>
                                      <option value="CONFLICTS">⚔️ Conflicts with</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-[10px] font-bold text-theme-muted mb-1 block">To Node</label>
                                    <select
                                      value={newConnection.to}
                                      onChange={(e) => setNewConnection({ ...newConnection, to: e.target.value })}
                                      className="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none"
                                    >
                                      <option value="">Select target node...</option>
                                      {mindMapNodes.filter(n => n.id !== newConnection.from).map(node => (
                                        <option key={node.id} value={node.id}>
                                          {node.type === 'IDEA' && '💡'}
                                          {node.type === 'TASK' && '✅'}
                                          {node.type === 'MILESTONE' && '🎯'}
                                          {node.type === 'RESOURCE' && '📦'}
                                          {node.type === 'NOTE' && '📝'}
                                          {node.type === 'DECISION' && '🎲'}
                                          {node.type === 'RISK' && '⚠️'}
                                          {node.type === 'OPPORTUNITY' && '🌟'}
                                          {' '}{node.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button type="button" size="sm" onClick={addMindMapConnection} className="font-bold text-xs h-7">
                                      Add Connection
                                    </Button>
                                    <Button type="button" size="sm" variant="ghost" onClick={() => setShowConnectionForm(false)} className="font-bold text-xs h-7">
                                      Cancel
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {/* Connections List */}
                            {mindMapConnections.length > 0 && (
                              <div className="space-y-2">
                                {mindMapConnections.map((conn) => {
                                  const fromNode = mindMapNodes.find(n => n.id === conn.from)
                                  const toNode = mindMapNodes.find(n => n.id === conn.to)
                                  if (!fromNode || !toNode) return null

                                  const getConnectionIcon = (type: string) => {
                                    switch (type) {
                                      case 'RELATED': return '🔗'
                                      case 'DEPENDS': return '⚡'
                                      case 'LEADS_TO': return '➡️'
                                      case 'BLOCKS': return '🚫'
                                      case 'SUPPORTS': return '🤝'
                                      case 'CONFLICTS': return '⚔️'
                                      default: return '🔗'
                                    }
                                  }

                                  const getConnectionLabel = (type: string) => {
                                    switch (type) {
                                      case 'RELATED': return 'Related to'
                                      case 'DEPENDS': return 'Depends on'
                                      case 'LEADS_TO': return 'Leads to'
                                      case 'BLOCKS': return 'Blocks'
                                      case 'SUPPORTS': return 'Supports'
                                      case 'CONFLICTS': return 'Conflicts with'
                                      default: return 'Connected to'
                                    }
                                  }

                                  return (
                                    <Card key={conn.id} className="border-2 bg-gradient-to-r from-teal-500/5 to-cyan-500/5">
                                      <CardContent className="p-2.5 flex items-center gap-2">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                          <div className="px-2 py-1 bg-[var(--muted)] rounded text-xs font-bold truncate">
                                            {fromNode.label}
                                          </div>
                                          <div className="flex items-center gap-1 text-xs font-bold text-theme-muted">
                                            <span>{getConnectionIcon(conn.type)}</span>
                                            <span className="hidden sm:inline">{getConnectionLabel(conn.type)}</span>
                                          </div>
                                          <div className="px-2 py-1 bg-[var(--muted)] rounded text-xs font-bold truncate">
                                            {toNode.label}
                                          </div>
                                        </div>
                                        <button
                                          onClick={() => removeMindMapConnection(conn.id)}
                                          className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors flex-shrink-0"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </CardContent>
                                    </Card>
                                  )
                                })}
                              </div>
                            )}
                          </>
                        )}

                        {mindMapNodes.length > 0 && (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mt-3">
                            <div className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-theme-muted leading-relaxed">
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                  {mindMapNodes.length} node{mindMapNodes.length !== 1 ? 's' : ''}
                                  {mindMapConnections.length > 0 && ` and ${mindMapConnections.length} connection${mindMapConnections.length !== 1 ? 's' : ''}`} added.
                                </span> After launching your project, you can expand this mind map with your team, add more connections, and collaborate in real-time!
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 5: COLLABORATION */}
                    {currentStep === 5 && (
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-2 border-pink-500/20 rounded-xl p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                              <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">
                                Configure Collaboration Features
                              </h3>
                              <p className="text-xs text-theme-muted leading-relaxed">
                                Choose which collaboration tools to enable for your project community.
                              </p>
                            </div>
                          </div>
                        </div>

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

                    {/* STEP 6: LAUNCH */}
                    {currentStep === 6 && (
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-500/20 rounded-xl p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                              <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-[var(--foreground)] mb-1">
                                Ready to Launch Your Project!
                              </h3>
                              <p className="text-xs text-theme-muted leading-relaxed">
                                Review your project settings and bring your vision to life.
                              </p>
                            </div>
                          </div>
                        </div>
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

                  {/* Submit Message & Navigation */}
                  <div className="px-6 pb-4 space-y-3">
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
