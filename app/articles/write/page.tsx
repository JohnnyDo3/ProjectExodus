'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useHasMounted } from '@/lib/hooks/useHasMounted'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { parseContent, type ParsedReference } from '@/lib/article/contentParser'
import {
  quickValidatePastedContent,
  validateArticleContent,
  validateFileUpload,
  sanitizeHtml,
  CONTENT_LIMITS,
  type ArticleFileType,
} from '@/lib/article/contentSecurity'
import { chunkedUpload, formatFileSize } from '@/lib/article/chunkedUpload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import CoverImageUpload from '@/components/article/CoverImageUpload'
import PublishConfirmDialog from '@/components/article/PublishConfirmDialog'
import { PublishLayoutGuide, type GuideAnnotation } from '@/components/article/PublishLayoutGuide'
import {
  ArrowLeft,
  Upload,
  ClipboardPaste,
  FileText,
  Sparkles,
  Loader2,
  Eye,
  EyeOff,
  Edit3,
  Save,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  MessageCircle,
  User,
  X,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Calendar,
  Tag,
  Leaf,
  Droplets,
  Zap,
  Recycle,
  TreePine,
  Home,
  Heart,
  Users,
  MoreHorizontal,
  Image as ImageIcon,
  Link as LinkIcon,
} from 'lucide-react'
import toast from 'react-hot-toast'

// Dynamically import TipTap editor
const TipTapEditor = dynamic(
  () => import('@/components/editor/TipTapEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[200px] bg-[var(--muted)] rounded-lg border-2 border-[var(--border)]">
        <Loader2 className="w-6 h-6 text-[var(--primary)] animate-spin" />
      </div>
    ),
  }
)

// Article categories
const ARTICLE_CATEGORIES = [
  { id: 'sustainability', name: 'Sustainability', icon: Leaf },
  { id: 'water', name: 'Water', icon: Droplets },
  { id: 'energy', name: 'Energy', icon: Zap },
  { id: 'waste', name: 'Waste', icon: Recycle },
  { id: 'nature', name: 'Nature', icon: TreePine },
  { id: 'building', name: 'Building', icon: Home },
  { id: 'food', name: 'Food', icon: Heart },
  { id: 'community', name: 'Community', icon: Users },
  { id: 'other', name: 'Other', icon: MoreHorizontal },
]

// Widget types for sidebar
type WidgetType = 'references' | 'discussion' | 'author' | 'share'

interface SidebarWidget {
  id: WidgetType
  name: string
  icon: any
  enabled: boolean
}

const DEFAULT_WIDGETS: SidebarWidget[] = [
  { id: 'references', name: 'Works Cited', icon: BookOpen, enabled: true },
  { id: 'discussion', name: 'Discussion', icon: MessageCircle, enabled: true },
  { id: 'author', name: 'Author Card', icon: User, enabled: true },
  { id: 'share', name: 'Share', icon: ExternalLink, enabled: true },
]

type ViewMode = 'paste' | 'preview'

export default function WriteArticlePage() {
  const { data: session, status } = useSession()
  const hasMounted = useHasMounted()
  const router = useRouter()

  // View mode
  const [viewMode, setViewMode] = useState<ViewMode>('paste')
  const [isParsing, setIsParsing] = useState(false)

  // Paste content
  const [pastedContent, setPastedContent] = useState('')
  // Rich HTML from formats that preserve structure (mammoth's DOCX output).
  // When set, "Parse & Preview" uses this as the body instead of running
  // pastedContent through textToHtml, so headers / footnotes / lists /
  // bold / italic / links from the source document survive into the
  // editor. Cleared whenever the user edits the textarea directly.
  const [pastedHtml, setPastedHtml] = useState<string | null>(null)
  // First-time preview guide overlay state.
  const [showGuide, setShowGuide] = useState(false)

  // Parsed article data
  const [articleData, setArticleData] = useState<{
    title: string
    content: string
    excerpt: string
    coverImage: string
    categoryId: string
    tags: string
    references: ParsedReference[]
  }>({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    categoryId: '',
    tags: '',
    references: [],
  })

  // Sidebar widgets
  const [widgets, setWidgets] = useState<SidebarWidget[]>(DEFAULT_WIDGETS)

  // UI state
  const [isEditing, setIsEditing] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [saving, setSaving] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null)

  // Client-side only state (to avoid hydration mismatch)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/articles/write')
    }
  }, [status, router])

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('article-draft-v2')
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        setArticleData(draft.articleData)
        setWidgets(draft.widgets || DEFAULT_WIDGETS)
        if (draft.articleData.content) {
          setViewMode('preview')
        }
        toast.success('Draft restored')
      } catch {
        // Invalid draft
      }
    }
  }, [])

  // Auto-save
  const autoSave = useCallback(() => {
    if (!articleData.title && !articleData.content) return

    setAutoSaveStatus('saving')
    try {
      localStorage.setItem('article-draft-v2', JSON.stringify({
        articleData,
        widgets,
        savedAt: new Date().toISOString(),
      }))
      setAutoSaveStatus('saved')
      setTimeout(() => setAutoSaveStatus('idle'), 3000)
    } catch {
      setAutoSaveStatus('error')
    }
  }, [articleData, widgets])

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(autoSave, 3000)
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
  }, [articleData, widgets, autoSave])

  // Parse pasted content with security validation
  const handleParse = useCallback(() => {
    if (!pastedContent.trim()) {
      toast.error('Please paste your content first')
      return
    }

    // Quick security check before processing
    const quickCheck = quickValidatePastedContent(pastedContent)
    if (!quickCheck.isValid) {
      toast.error(quickCheck.error || 'Content validation failed')
      return
    }

    setIsParsing(true)

    // Process with slight delay for UX
    setTimeout(() => {
      try {
        // If we have rich HTML from a structured source (DOCX via
        // mammoth), pass it to parseContent so it keeps headers,
        // footnotes, lists, bold/italic etc. instead of being
        // flattened into plain text and re-rebuilt into paragraphs.
        const parsed = pastedHtml
          ? parseContent(pastedHtml)
          : parseContent(pastedContent)

        // Sanitize the parsed content
        const sanitizedBody = sanitizeHtml(parsed.body)

        // Validate the full article
        const validation = validateArticleContent({
          title: parsed.title,
          excerpt: parsed.excerpt,
          content: sanitizedBody,
          references: parsed.references.map(r => ({ title: r.title, url: r.url })),
        })

        // Show warnings if any
        if (validation.warnings.length > 0) {
          toast(
            `${validation.warnings.length} warning(s) found. Review your content.`,
            { icon: '⚠️', duration: 5000 }
          )
        }

        // Check for critical errors
        if (!validation.isValid) {
          const criticalErrors = validation.errors.filter(e => e.includes('Security'))
          if (criticalErrors.length > 0) {
            toast.error('Content contains security issues and cannot be processed.')
            setIsParsing(false)
            return
          }
        }

        setArticleData({
          title: parsed.title.slice(0, CONTENT_LIMITS.MAX_TITLE_LENGTH),
          content: sanitizedBody,
          excerpt: parsed.excerpt.slice(0, CONTENT_LIMITS.MAX_EXCERPT_LENGTH),
          coverImage: '',
          categoryId: parsed.suggestedCategory || '',
          tags: '',
          references: parsed.references.slice(0, CONTENT_LIMITS.MAX_REFERENCES),
        })

        setViewMode('preview')

        // Auto-open the layout guide the first time a user lands in
        // preview after pasting/uploading. After "Got it" we set a
        // localStorage flag so we don't badger them on every parse.
        try {
          const seen = localStorage.getItem('article-preview-guide-seen-v1')
          if (!seen) {
            // Defer one tick so the preview DOM is mounted before the
            // guide tries to measure anchors.
            setTimeout(() => setShowGuide(true), 50)
          }
        } catch {}

        // Show success with stats
        const wordCount = validation.stats.wordCount
        toast.success(
          `Parsed! ${wordCount.toLocaleString()} words, ${parsed.references.length} references.`,
          { icon: <Sparkles className="w-4 h-4" /> }
        )

        // Note: no max word warning - papers of any length are accepted
      } catch (error) {
        console.error('Parse error:', error)
        toast.error('Failed to parse content. Please try again.')
      } finally {
        setIsParsing(false)
      }
    }, 500)
  }, [pastedContent, pastedHtml])

  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState<{ phase: string; percent: number } | null>(null)

  // Handle file upload — supports all document types
  // Uses direct single-request endpoints for PDFs and DOCX (serverless-safe),
  // falls back to chunked upload only for very large files.
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file before processing
    const fileValidation = validateFileUpload({
      name: file.name,
      size: file.size,
      type: file.type,
    })

    if (!fileValidation.isValid) {
      toast.error(fileValidation.error || 'Invalid file')
      e.target.value = ''
      return
    }

    const fileType = fileValidation.fileType!

    const sizeStr = formatFileSize(file.size)

    try {
      const useChunked = file.size > CONTENT_LIMITS.CHUNKED_UPLOAD_THRESHOLD

      // ── Binary formats that need server-side parsing ──
      if (fileType === 'pdf' || fileType === 'docx') {
        // Small PDF/DOCX: direct single-request upload (fast, serverless-safe)
        // Large: chunked upload
        if (!useChunked && fileType === 'pdf') {
          toast(`Processing ${file.name} (${sizeStr})...`, { duration: 6000 })
          setUploadProgress({ phase: 'uploading', percent: 10 })

          const formData = new FormData()
          formData.append('pdf', file)
          const res = await fetch('/api/articles/parse-pdf', { method: 'POST', body: formData })

          if (!res.ok && res.status === 413) {
            // Body too large for serverless — fall through to chunked
            throw new Error('__USE_CHUNKED__')
          }

          const data = await res.json()
          setUploadProgress(null)

          if (!data.success) {
            toast.error(data.error || 'Failed to process PDF. Try pasting your content directly.')
            e.target.value = ''
            return
          }

          setPastedContent(data.data.text)
          const pages = data.data.numPages
          const successMsg = pages
            ? `${file.name} loaded! ${pages} page(s) extracted.`
            : `${file.name} loaded!`
          toast.success(`${successMsg} Click "Parse & Preview" to continue.`)
        } else if (!useChunked && fileType === 'docx') {
          toast(`Processing ${file.name} (${sizeStr})...`, { duration: 6000 })
          setUploadProgress({ phase: 'uploading', percent: 10 })

          const formData = new FormData()
          formData.append('docx', file)
          const res = await fetch('/api/articles/parse-docx', { method: 'POST', body: formData })

          if (!res.ok && res.status === 413) {
            throw new Error('__USE_CHUNKED__')
          }

          const data = await res.json()
          setUploadProgress(null)

          if (!data.success) {
            toast.error(data.error || 'Failed to process document. Try pasting your content directly.')
            e.target.value = ''
            return
          }

          setPastedContent(data.data.text)
          // Mammoth gives us structured HTML — keep it so Parse & Preview
          // can preserve headers / footnotes / lists / formatting.
          setPastedHtml(data.data.html ?? null)
          toast.success(`${file.name} loaded with structure preserved! Click "Parse & Preview" to continue.`)
        } else {
          // Chunked upload for large files and .doc/.odt
          throw new Error('__USE_CHUNKED__')
        }
      } else if (!useChunked) {
        // Small text-based formats (txt, md, html, rtf, tex) — read client-side
        const text = await file.text()

        const contentCheck = quickValidatePastedContent(text)
        if (!contentCheck.isValid) {
          toast.error(contentCheck.error || 'File contains invalid content')
          e.target.value = ''
          return
        }

        setPastedContent(text)
        toast.success(`${file.name} loaded! Click "Parse & Preview" to continue.`)
      } else {
        // Large text files go through chunked upload too
        throw new Error('__USE_CHUNKED__')
      }
    } catch (error: any) {
      // Sentinel: fall through to chunked upload for large files or 413 errors
      if (error?.message === '__USE_CHUNKED__') {
        try {
          toast(`Processing ${file.name} (${sizeStr})...`, { duration: 8000 })
          setUploadProgress({ phase: 'uploading', percent: 0 })

          const result = await chunkedUpload({
            file,
            onProgress: (progress) => {
              setUploadProgress({
                phase: progress.phase,
                percent: progress.percent,
              })
            },
          })

          setUploadProgress(null)

          if (!result.success) {
            toast.error(result.error || 'Failed to process file. Try pasting your content directly.')
            e.target.value = ''
            return
          }

          setPastedContent(result.data!.text)
          // Chunked-DOCX path: mammoth's html survives finalize-upload too.
          setPastedHtml(result.data!.html ?? null)

          const pages = result.data!.numPages
          const successMsg = pages
            ? `${file.name} loaded! ${pages} page(s) extracted.`
            : `${file.name} loaded!`
          toast.success(`${successMsg} Click "Parse & Preview" to continue.`)
          e.target.value = ''
          return
        } catch (chunkedErr: any) {
          console.error('Chunked upload error:', chunkedErr)
          setUploadProgress(null)
          const msg = chunkedErr.name === 'AbortError'
            ? 'Upload cancelled.'
            : 'Failed to process file. Try pasting your content directly.'
          toast.error(msg)
          e.target.value = ''
          return
        }
      }

      console.error('File upload error:', error)
      setUploadProgress(null)
      const msg = error.name === 'AbortError'
        ? 'Upload cancelled.'
        : 'Failed to process file. Try pasting your content directly.'
      toast.error(msg)
    }

    // Clear the input for re-upload
    e.target.value = ''
  }

  // Handle publish with full validation
  const handleSubmit = async (publish: boolean = false) => {
    if (!session?.user?.id) {
      toast.error('You must be logged in')
      return
    }

    if (!articleData.title.trim()) {
      toast.error('Title is required')
      return
    }

    if (!articleData.content.trim()) {
      toast.error('Content is required')
      return
    }

    // Full validation before submission
    const validation = validateArticleContent({
      title: articleData.title,
      excerpt: articleData.excerpt,
      content: articleData.content,
      references: articleData.references.map(r => ({ title: r.title, url: r.url })),
    })

    // Block if validation fails (especially for publishing)
    if (!validation.isValid) {
      if (publish) {
        // Show first error for publishing
        toast.error(validation.errors[0] || 'Validation failed')
        return
      } else {
        // Warn but allow draft save
        toast(
          `Draft has ${validation.errors.length} issue(s). Fix before publishing.`,
          { icon: '⚠️' }
        )
      }
    }

    // Extra check for minimum word count when publishing
    if (publish && validation.stats.wordCount < CONTENT_LIMITS.MIN_WORDS) {
      toast.error(`Article must have at least ${CONTENT_LIMITS.MIN_WORDS} words to publish`)
      return
    }

    setSaving(true)
    setShowPublishDialog(false)

    try {
      // Use sanitized content
      const sanitizedContent = sanitizeHtml(articleData.content)
      const wordCount = validation.stats.wordCount
      const readTime = Math.max(1, Math.ceil(wordCount / 200))

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: articleData.title.slice(0, CONTENT_LIMITS.MAX_TITLE_LENGTH),
          slug: articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100),
          excerpt: articleData.excerpt.slice(0, CONTENT_LIMITS.MAX_EXCERPT_LENGTH),
          content: sanitizedContent, // Use sanitized content
          coverImage: articleData.coverImage,
          categoryId: articleData.categoryId || 'other',
          status: publish ? 'PUBLISHED' : 'DRAFT',
          authorId: session.user.id,
          readTime,
          references: articleData.references.slice(0, CONTENT_LIMITS.MAX_REFERENCES).map(r => ({
            title: (r.title || '').slice(0, CONTENT_LIMITS.MAX_REFERENCE_TITLE),
            url: (r.url || '').slice(0, CONTENT_LIMITS.MAX_REFERENCE_URL),
            authors: r.authors || '',
            year: r.year || '',
            publisher: r.publisher || '',
            format: r.format || '',
          })),
          tags: articleData.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 20),
        }),
      })

      const data = await res.json()

      if (data.success) {
        localStorage.removeItem('article-draft-v2')
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

  // Calculate stats
  const wordCount = articleData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  // Loading state
  if (hasMounted && status === 'loading') {
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
      <div className="sticky top-0 z-50 bg-[var(--card)] border-b border-[var(--border)] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/articles">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-[var(--foreground)]">
                  {viewMode === 'paste' ? 'Publish an Article' : articleData.title || 'Untitled Article'}
                </h1>
                {viewMode === 'preview' && (
                  <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                    {autoSaveStatus === 'saving' && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-pulse" /> Saving...
                      </span>
                    )}
                    {autoSaveStatus === 'saved' && (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-3 h-3" /> Saved
                      </span>
                    )}
                    <span>{wordCount} words</span>
                    <span>{readTime} min read</span>
                    <span>{articleData.references.length} references</span>
                  </div>
                )}
              </div>
            </div>

            {viewMode === 'preview' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowGuide(true)}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-theme-muted hover:text-theme-primary hover:bg-[var(--muted)] transition-colors"
                  title="What does each part of the article do?"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Layout guide
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubmit(false)}
                  disabled={saving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowPublishDialog(true)}
                  disabled={saving}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* PASTE VIEW */}
        {viewMode === 'paste' && (
          <motion.div
            key="paste"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="max-w-4xl mx-auto">
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 mb-6">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mb-4">
                  Paste Your Work
                </h2>
                <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                  Copy and paste your research paper, essay, or article below, or upload a file.
                  We support PDF, Word, RTF, HTML, Markdown, LaTeX, and more.
                  We'll automatically detect your title, content, and works cited section.
                </p>
              </div>

              {/* Paste Area */}
              <Card className="border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors">
                <CardContent className="p-6">
                  <textarea
                    value={pastedContent}
                    onChange={(e) => {
                      setPastedContent(e.target.value)
                      // User is editing the textarea directly — any rich
                      // HTML from a prior upload is stale. Fall back to
                      // text -> HTML conversion on the next parse.
                      setPastedHtml(null)
                    }}
                    placeholder="Paste your entire document here...

Include your title, body content, and Works Cited / References section.

We support MLA, APA, and Chicago citation formats."
                    className="w-full h-[400px] bg-transparent border-none outline-none resize-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] font-mono text-sm"
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  onClick={handleParse}
                  disabled={!pastedContent.trim() || isParsing}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold px-8"
                >
                  {isParsing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Parse & Preview
                    </>
                  )}
                </Button>

                <span className="text-[var(--muted-foreground)]">or</span>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.pdf,.docx,.rtf,.html,.htm,.tex,.latex"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Upload Progress */}
              {uploadProgress && (
                <div className="mt-6 p-4 bg-[var(--muted)]/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {uploadProgress.phase === 'uploading' ? 'Uploading...' : 'Processing document...'}
                    </span>
                    <span className="text-sm text-[var(--muted-foreground)]">{uploadProgress.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Supported Formats */}
              <div className="mt-12 p-6 bg-[var(--muted)]/50 rounded-xl">
                <h3 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--primary)]" />
                  Supported Formats
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-[var(--background)] rounded-lg">
                    <h4 className="font-bold text-[var(--foreground)] mb-2">Documents (up to 20MB)</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      PDF, Word (.doc, .docx), OpenDocument (.odt) — full text extraction with formatting preserved.
                    </p>
                  </div>
                  <div className="p-4 bg-[var(--background)] rounded-lg">
                    <h4 className="font-bold text-[var(--foreground)] mb-2">Text Files (up to 10MB)</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Plain Text (.txt), Markdown (.md), HTML (.html), Rich Text (.rtf), LaTeX (.tex).
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-[var(--background)] rounded-lg mb-4">
                  <h4 className="font-bold text-[var(--foreground)] mb-2">Images</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Add images in the editor after parsing via upload or URL. JPEG, PNG, and WebP supported.
                  </p>
                </div>
                <h4 className="font-semibold text-[var(--foreground)] mb-3 text-sm">Citation Formats (auto-detected)</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[var(--background)] rounded-lg">
                    <h4 className="font-bold text-[var(--foreground)] mb-2">MLA</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Author. "Title." Container, Year.
                    </p>
                  </div>
                  <div className="p-4 bg-[var(--background)] rounded-lg">
                    <h4 className="font-bold text-[var(--foreground)] mb-2">APA</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Author, A. A. (Year). Title.
                    </p>
                  </div>
                  <div className="p-4 bg-[var(--background)] rounded-lg">
                    <h4 className="font-bold text-[var(--foreground)] mb-2">Chicago</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Author. Title. Place: Publisher, Year.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PREVIEW VIEW */}
        {viewMode === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Article Preview - Matches actual article display */}
            <div className="min-h-screen">
              {/* Hero Section */}
              <section className="py-16 sm:py-24 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_15%,var(--background))] via-[color-mix(in_srgb,var(--accent)_15%,var(--background))] to-[color-mix(in_srgb,var(--secondary)_15%,var(--background))]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-5xl mx-auto text-center space-y-6">
                    {/* Editable Title */}
                    <div className="group relative" data-tour-id="title">
                      {editingField === 'title' ? (
                        <input
                          type="text"
                          value={articleData.title}
                          onChange={(e) => setArticleData(prev => ({ ...prev, title: e.target.value }))}
                          onBlur={() => setEditingField(null)}
                          autoFocus
                          className="w-full text-4xl sm:text-5xl md:text-6xl font-black text-center bg-transparent border-2 border-[var(--primary)] rounded-lg px-4 py-2 outline-none text-[var(--foreground)]"
                        />
                      ) : (
                        <h1
                          onClick={() => setEditingField('title')}
                          className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-[var(--foreground)] cursor-pointer hover:bg-[var(--primary)]/10 rounded-lg px-4 py-2 transition-colors"
                        >
                          {articleData.title || 'Click to add title'}
                          <Edit3 className="inline-block w-6 h-6 ml-3 opacity-0 group-hover:opacity-50" />
                        </h1>
                      )}
                    </div>

                    {/* Editable Excerpt */}
                    <div className="group relative max-w-4xl mx-auto" data-tour-id="excerpt">
                      {editingField === 'excerpt' ? (
                        <textarea
                          value={articleData.excerpt}
                          onChange={(e) => setArticleData(prev => ({ ...prev, excerpt: e.target.value }))}
                          onBlur={() => setEditingField(null)}
                          autoFocus
                          rows={3}
                          className="w-full text-xl sm:text-2xl font-semibold text-center bg-transparent border-2 border-[var(--primary)] rounded-lg px-4 py-2 outline-none text-[var(--muted-foreground)] resize-none"
                        />
                      ) : (
                        <p
                          onClick={() => setEditingField('excerpt')}
                          className="text-xl sm:text-2xl font-semibold text-[var(--muted-foreground)] cursor-pointer hover:bg-[var(--primary)]/10 rounded-lg px-4 py-2 transition-colors"
                        >
                          {articleData.excerpt || 'Click to add excerpt...'}
                          <Edit3 className="inline-block w-5 h-5 ml-2 opacity-0 group-hover:opacity-50" />
                        </p>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base font-bold pt-4">
                      <div className="flex items-center gap-2 text-[var(--primary)]">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{session?.user?.name || 'Author'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{mounted ? new Date().toLocaleDateString() : 'Today'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--accent)]">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{readTime} MIN READ</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    {articleData.categoryId && (
                      <div>
                        <span className="inline-block px-6 py-3 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] rounded-2xl text-base font-black uppercase shadow-xl">
                          {ARTICLE_CATEGORIES.find(c => c.id === articleData.categoryId)?.name || 'Other'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Content Section */}
              <section className="py-12 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Main Content */}
                      <article className="md:col-span-2" data-tour-id="body">
                        <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
                          <CardContent className="p-6 sm:p-8 md:p-12">
                            <TipTapEditor
                              content={articleData.content}
                              onChange={(content) => setArticleData(prev => ({ ...prev, content }))}
                              placeholder="Your article content..."
                            />
                          </CardContent>
                        </Card>
                      </article>

                      {/* Sidebar */}
                      <aside className="md:col-span-1 space-y-6">
                        {/* Article Settings */}
                        <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                              <Tag className="w-4 h-4 text-[var(--primary)]" />
                              Article Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1 block">
                                Category
                              </label>
                              <Select
                                value={articleData.categoryId}
                                onChange={(e) => setArticleData(prev => ({ ...prev, categoryId: e.target.value }))}
                                options={[
                                  { value: '', label: 'Select category...', disabled: true },
                                  ...ARTICLE_CATEGORIES.map(cat => ({ value: cat.id, label: cat.name })),
                                ]}
                              />
                            </div>
                            <div data-tour-id="tags">
                              <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1 block">
                                Tags
                              </label>
                              <Input
                                value={articleData.tags}
                                onChange={(e) => setArticleData(prev => ({ ...prev, tags: e.target.value }))}
                                placeholder="sustainability, research"
                                className="text-sm"
                              />
                            </div>
                            <div data-tour-id="cover">
                              <label className="text-xs font-medium text-[var(--muted-foreground)] mb-1 block">
                                Cover Image
                              </label>
                              <CoverImageUpload
                                value={articleData.coverImage}
                                onChange={(url) => setArticleData(prev => ({ ...prev, coverImage: url }))}
                              />
                            </div>
                          </CardContent>
                        </Card>

                        {/* Static widget display */}
                        <div className="space-y-6">
                          <ReferencesPreview
                            references={articleData.references}
                            onUpdate={(refs) => setArticleData(prev => ({ ...prev, references: refs }))}
                          />
                          <AuthorPreview session={session} />
                          <SharePreview />
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Back to Edit Paste Button */}
            <div className="fixed bottom-6 left-6 z-50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('paste')}
                className="shadow-lg bg-[var(--background)]"
              >
                <ClipboardPaste className="w-4 h-4 mr-2" />
                Re-paste Content
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Publish Dialog */}
      <PublishConfirmDialog
        isOpen={showPublishDialog}
        onClose={() => setShowPublishDialog(false)}
        onConfirm={() => handleSubmit(true)}
        title={articleData.title}
        isPublishing={saving}
      />

      {/* First-time preview-mode layout guide. Annotated overlay
          pointing at title, subtitle, body, cover, tags. */}
      <PublishLayoutGuide
        isOpen={showGuide && viewMode === 'preview'}
        annotations={PUBLISH_LAYOUT_ANNOTATIONS}
        onClose={() => {
          setShowGuide(false)
          try { localStorage.setItem('article-preview-guide-seen-v1', '1') } catch {}
        }}
      />
    </div>
  )
}

const PUBLISH_LAYOUT_ANNOTATIONS: GuideAnnotation[] = [
  {
    id: 'title',
    label: 'Title',
    description: 'The first thing readers see. Big and bold. Tap to edit.',
    side: 'right',
  },
  {
    id: 'excerpt',
    label: 'Subtitle / hook',
    description: 'One or two sentences that pull readers into the article.',
    side: 'right',
  },
  {
    id: 'body',
    label: 'Article body',
    description: 'Your main content. Headers, lists, footnotes, and links all preserved from the original.',
    side: 'left',
  },
  {
    id: 'cover',
    label: 'Cover image',
    description: 'The hero image shown at the top of the published page.',
    side: 'left',
  },
  {
    id: 'tags',
    label: 'Tags',
    description: 'Comma-separated. Helps readers find the article via search and topic pages.',
    side: 'left',
  },
]

// References Preview Widget
function ReferencesPreview({
  references,
  onUpdate,
}: {
  references: ParsedReference[]
  onUpdate: (refs: ParsedReference[]) => void
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  const addReference = () => {
    onUpdate([
      ...references,
      {
        id: `ref-${Date.now()}`,
        raw: '',
        title: 'New Reference',
        format: 'Unknown',
      },
    ])
  }

  const removeReference = (id: string) => {
    onUpdate(references.filter(r => r.id !== id))
  }

  const updateReference = (id: string, field: keyof ParsedReference, value: string) => {
    onUpdate(references.map(r =>
      r.id === id ? { ...r, [field]: value } : r
    ))
  }

  return (
    <Card className="border-4 border-[var(--border)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between text-[var(--foreground)]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[var(--primary)]" />
            Works Cited ({references.length})
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={addReference}
              className="p-1 hover:bg-[var(--muted)] rounded"
              title="Add reference"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-[var(--muted)] rounded"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-2">
          {references.length === 0 ? (
            <p className="text-sm text-[var(--muted-foreground)] text-center py-4">
              No references detected. Click + to add manually.
            </p>
          ) : (
            references.map((ref) => (
              <div
                key={ref.id}
                className="p-3 bg-[var(--muted)] rounded-lg group/ref"
              >
                {editingId === ref.id ? (
                  <div className="space-y-2">
                    <Input
                      value={ref.title}
                      onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                      placeholder="Title"
                      className="text-sm"
                    />
                    <Input
                      value={ref.url || ''}
                      onChange={(e) => updateReference(ref.id, 'url', e.target.value)}
                      placeholder="URL (optional)"
                      className="text-sm"
                    />
                    <Button size="sm" onClick={() => setEditingId(null)}>Done</Button>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-[var(--foreground)] line-clamp-1">
                        {ref.title}
                      </p>
                      {ref.authors && (
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {ref.authors}{ref.year ? ` (${ref.year})` : ''}
                        </p>
                      )}
                      <span className="text-xs px-1.5 py-0.5 bg-[var(--primary)]/20 text-[var(--primary)] rounded">
                        {ref.format}
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover/ref:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingId(ref.id)}
                        className="p-1 hover:bg-[var(--background)] rounded"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeReference(ref.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      )}
    </Card>
  )
}

// Author Preview Widget
function AuthorPreview({ session }: { session: any }) {
  return (
    <Card className="border-4 border-[var(--border)]">
      <CardHeader>
        <CardTitle className="text-base text-[var(--foreground)]">About the Author</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
            {session?.user?.image ? (
              <Image src={session.user.image} alt="" fill unoptimized sizes="100%" className="rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
          </div>
          <div>
            <h4 className="font-bold text-[var(--foreground)]">{session?.user?.name || 'Author'}</h4>
            <p className="text-sm text-[var(--muted-foreground)]">Article Author</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Share Preview Widget
function SharePreview() {
  return (
    <Card className="border-4 border-[var(--border)]">
      <CardHeader>
        <CardTitle className="text-base text-[var(--foreground)]">Share Article</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="outline" className="w-full text-sm" size="sm" disabled>
            Share on Twitter
          </Button>
          <Button variant="outline" className="w-full text-sm" size="sm" disabled>
            Share on Facebook
          </Button>
          <Button variant="outline" className="w-full text-sm" size="sm" disabled>
            Copy Link
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
