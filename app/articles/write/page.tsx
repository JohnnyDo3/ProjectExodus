'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { sanitizeArticleContent } from '@/lib/sanitize'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import StepProgress from '@/components/article/StepProgress'
import CoverImageUpload from '@/components/article/CoverImageUpload'
import PublishConfirmDialog from '@/components/article/PublishConfirmDialog'
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Link as LinkIcon,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'

// Dynamically import TipTap editor to avoid SSR issues
const TipTapEditor = dynamic(
  () => import('@/components/editor/TipTapEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[400px] bg-[var(--muted)] rounded-lg border-2 border-[var(--border)]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin mx-auto mb-3" />
          <p className="text-[var(--muted-foreground)] font-medium">Loading editor...</p>
        </div>
      </div>
    ),
  }
)

interface Reference {
  id: string
  title: string
  url: string
  description: string
}

interface Category {
  id: string
  name: string
  slug: string
}

const STEPS = [
  { id: 'title', label: 'Title' },
  { id: 'content', label: 'Content' },
  { id: 'settings', label: 'Settings' },
  { id: 'review', label: 'Review' },
]

const AUTO_SAVE_DELAY = 3000

export default function WriteArticlePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Step state
  const [currentStep, setCurrentStep] = useState(0)

  // Form state
  const [saving, setSaving] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [categories, setCategories] = useState<Category[]>([])
  const [references, setReferences] = useState<Reference[]>([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    categoryId: '',
    readTime: '',
    featured: false,
    tags: '',
  })
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  // Preview state
  const [showPreview, setShowPreview] = useState(false)

  // Dialog state
  const [showPublishDialog, setShowPublishDialog] = useState(false)

  // Auto-save timer
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null)
  const draftId = useRef<string | null>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/articles/write')
    }
  }, [status, router])

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/article-categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data)
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error)
      })

    // Load draft from localStorage
    const savedDraft = localStorage.getItem('article-draft')
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        setFormData(draft.formData)
        setReferences(draft.references || [])
        draftId.current = draft.draftId
        toast.success('Draft restored')
      } catch {
        // Invalid draft data
      }
    }
  }, [])

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Auto-generate slug when title changes
  useEffect(() => {
    if (formData.title && !slugManuallyEdited) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }))
    }
  }, [formData.title, slugManuallyEdited])

  // Auto-save to localStorage
  const autoSave = useCallback(() => {
    if (!formData.title && !formData.content) return

    setAutoSaveStatus('saving')

    const draft = {
      formData,
      references,
      draftId: draftId.current || crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem('article-draft', JSON.stringify(draft))
      draftId.current = draft.draftId
      setAutoSaveStatus('saved')
      setTimeout(() => setAutoSaveStatus('idle'), 3000)
    } catch {
      setAutoSaveStatus('error')
    }
  }, [formData, references])

  // Trigger auto-save when form changes
  useEffect(() => {
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current)
    }
    autoSaveTimer.current = setTimeout(autoSave, AUTO_SAVE_DELAY)
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
  }, [formData, references, autoSave])

  const addReference = () => {
    setReferences(prev => [
      ...prev,
      { id: crypto.randomUUID(), title: '', url: '', description: '' },
    ])
  }

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setReferences(prev =>
      prev.map(ref => (ref.id === id ? { ...ref, [field]: value } : ref))
    )
  }

  const removeReference = (id: string) => {
    setReferences(prev => prev.filter(ref => ref.id !== id))
  }

  // Auto-extract URLs from article content
  const autoExtractUrls = () => {
    // Regex to match URLs in content (handles both plain URLs and HTML anchor hrefs)
    const urlRegex = /(?:href=["']([^"']+)["'])|(?:https?:\/\/[^\s<"']+)/g
    const content = formData.content
    const matches = new Set<string>()

    let match
    while ((match = urlRegex.exec(content)) !== null) {
      const url = match[1] || match[0]
      // Filter out common non-reference URLs
      if (url &&
          !url.includes('localhost') &&
          !url.includes('127.0.0.1') &&
          !url.startsWith('#') &&
          !url.startsWith('mailto:')) {
        matches.add(url)
      }
    }

    // Get existing URLs to avoid duplicates
    const existingUrls = new Set(references.map(r => r.url))

    // Add new references for each found URL
    const newRefs: Reference[] = []
    matches.forEach(url => {
      if (!existingUrls.has(url)) {
        // Try to extract a title from the URL
        let title = ''
        try {
          const urlObj = new URL(url)
          title = urlObj.hostname.replace('www.', '')
        } catch {
          title = 'Reference'
        }

        newRefs.push({
          id: crypto.randomUUID(),
          title,
          url,
          description: ''
        })
      }
    })

    if (newRefs.length > 0) {
      setReferences(prev => [...prev, ...newRefs])
      toast.success(`Found ${newRefs.length} new URL${newRefs.length > 1 ? 's' : ''}`)
    } else {
      toast('No new URLs found in content', { icon: 'ℹ️' })
    }
  }

  const handleSubmit = async (publish: boolean = false) => {
    if (!session?.user?.id) {
      toast.error('You must be logged in')
      return
    }

    setSaving(true)
    setShowPublishDialog(false)

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: publish ? 'PUBLISHED' : 'DRAFT',
          authorId: session.user.id,
          readTime: formData.readTime ? parseInt(formData.readTime) : estimatedReadTime,
          references: references.filter(r => r.title && r.url),
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      })

      const data = await res.json()

      if (data.success) {
        localStorage.removeItem('article-draft')
        toast.success(publish ? 'Article published!' : 'Draft saved!')
        router.push(`/articles/${data.data.slug}`)
      } else {
        toast.error(data.error || 'Failed to save article')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to save article')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = () => {
    if (confirm('Delete this draft? This cannot be undone.')) {
      localStorage.removeItem('article-draft')
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        categoryId: '',
        readTime: '',
        featured: false,
        tags: '',
      })
      setReferences([])
      setCurrentStep(0)
      toast.success('Draft deleted')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (name === 'slug') setSlugManuallyEdited(true)
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }))
  }

  const handleCoverImageChange = (url: string) => {
    setFormData(prev => ({ ...prev, coverImage: url }))
  }

  // Validation
  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 0: return formData.title.trim().length > 0
      case 1: return formData.content.trim().length > 0
      case 2: return formData.excerpt.trim().length > 0
      default: return true
    }
  }

  const goToNextStep = () => {
    if (canProceedFromStep(currentStep) && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  // Calculate read time
  const wordCount = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200))

  const renderAutoSaveStatus = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return (
          <span className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Clock size={14} className="animate-pulse" />
            Saving...
          </span>
        )
      case 'saved':
        return (
          <span className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle size={14} />
            Draft saved
          </span>
        )
      case 'error':
        return (
          <span className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle size={14} />
            Save failed
          </span>
        )
      default:
        return null
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin" />
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--card)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/articles">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-[var(--foreground)]">
                  {formData.title || 'Write Article'}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  {renderAutoSaveStatus()}
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {wordCount} words • {estimatedReadTime} min read
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              {currentStep === 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showPreview ? 'Hide' : 'Preview'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step Progress */}
      <StepProgress
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={index => index <= currentStep && setCurrentStep(index)}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Step 1: Title & Cover */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <Card className="border-2 border-[var(--border)]">
                <CardHeader>
                  <CardTitle>What&apos;s your article about?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter a compelling title..."
                      className="w-full text-3xl font-bold bg-transparent border-none outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                      autoFocus
                    />
                    <div className="h-1 w-full bg-[var(--border)] rounded overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded transition-all duration-300"
                        style={{ width: `${Math.min(100, formData.title.length * 2)}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--muted-foreground)]">URL Slug</label>
                    <Input
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="article-url-slug"
                    />
                    <p className="text-sm text-[var(--muted-foreground)]">/articles/{formData.slug || 'your-slug'}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--muted-foreground)]">Cover Image</label>
                    <CoverImageUpload value={formData.coverImage} onChange={handleCoverImageChange} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Content Editor */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {showPreview ? (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">Editor</h3>
                    <TipTapEditor
                      content={formData.content}
                      onChange={handleContentChange}
                      placeholder="Start writing your article..."
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-3">Preview</h3>
                    <Card className="h-[500px] overflow-auto border-2 border-[var(--primary)]">
                      <CardContent className="p-6">
                        <article
                          className="prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{ __html: sanitizeArticleContent(formData.content) }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <TipTapEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your article..."
                />
              )}
            </div>
          )}

          {/* Step 3: Settings */}
          {currentStep === 2 && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    label="Excerpt"
                    name="excerpt"
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="A brief summary..."
                    hint="Appears in article listings"
                  />
                  <Select
                    label="Category"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    options={[
                      { value: '', label: 'Select category...', disabled: true },
                      ...categories.map(cat => ({ value: cat.id, label: cat.name })),
                    ]}
                  />
                  <Input
                    label="Tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="solar, renewable, beginner"
                    hint="Comma-separated"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Publishing</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Read Time (minutes)"
                    name="readTime"
                    type="number"
                    min="1"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder={estimatedReadTime.toString()}
                    hint="Auto-calculated if empty"
                  />
                  <div className="flex items-center gap-2 p-4 bg-[var(--muted)] rounded-lg">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5"
                    />
                    <label htmlFor="featured" className="font-medium text-[var(--foreground)]">
                      Mark as featured
                    </label>
                  </div>
                  <div className="p-4 bg-[var(--primary)]/10 rounded-lg">
                    <p className="text-sm"><strong>Author:</strong> {session?.user?.name}</p>
                  </div>
                </CardContent>
              </Card>

              {/* References */}
              <Card className="md:col-span-2 border-2 border-[var(--primary)]/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-[var(--primary)]" />
                      References
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={autoExtractUrls}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Auto-Detect
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={addReference}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Guidance Text */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20 rounded-lg">
                    <p className="text-sm text-[var(--foreground)] font-medium mb-2">
                      <strong>Sage will automatically link your sources!</strong>
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Include URLs in your article content and click "Auto-Detect" to extract them as references.
                      These will appear in the References widget for your readers. You can also add references manually.
                    </p>
                  </div>

                  {references.length === 0 ? (
                    <p className="text-sm text-[var(--muted-foreground)] text-center py-8">
                      No references yet. Add URLs to your content or add sources manually.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {references.map((ref, index) => (
                        <div key={ref.id} className="p-4 bg-[var(--muted)] rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[var(--primary)] uppercase">
                              Reference #{index + 1}
                            </span>
                            <button onClick={() => removeReference(ref.id)} className="p-1 text-red-600 hover:bg-red-100 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <Input value={ref.title} onChange={e => updateReference(ref.id, 'title', e.target.value)} placeholder="Title" />
                          <Input value={ref.url} onChange={e => updateReference(ref.id, 'url', e.target.value)} placeholder="https://..." />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 3 && (
            <Card>
              <CardHeader><CardTitle>Review Your Article</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {formData.coverImage && (
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold text-[var(--foreground)] mb-3">{formData.title}</h2>
                  <p className="text-lg text-[var(--muted-foreground)]">{formData.excerpt}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                  <span>Category: <strong className="text-[var(--foreground)]">{categories.find(c => c.id === formData.categoryId)?.name || 'None'}</strong></span>
                  <span>Read time: <strong className="text-[var(--foreground)]">{formData.readTime || estimatedReadTime} min</strong></span>
                  <span>Words: <strong className="text-[var(--foreground)]">{wordCount}</strong></span>
                </div>
                {formData.tags && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.split(',').map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[var(--muted)] rounded-full text-sm">{tag.trim()}</span>
                    ))}
                  </div>
                )}
                <div className="border-t border-[var(--border)] pt-6">
                  <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-4">Content Preview</h3>
                  <div className="max-h-[400px] overflow-auto p-4 bg-[var(--muted)] rounded-lg">
                    <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeArticleContent(formData.content) }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
            <Button variant="outline" onClick={goToPreviousStep} disabled={currentStep === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => handleSubmit(false)} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              {currentStep === STEPS.length - 1 ? (
                <Button onClick={() => setShowPublishDialog(true)} disabled={saving || !canProceedFromStep(2)}>
                  <Send className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              ) : (
                <Button onClick={goToNextStep} disabled={!canProceedFromStep(currentStep)}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Publish Dialog */}
      <PublishConfirmDialog
        isOpen={showPublishDialog}
        onClose={() => setShowPublishDialog(false)}
        onConfirm={() => handleSubmit(true)}
        title={formData.title}
        isPublishing={saving}
      />
    </div>
  )
}
