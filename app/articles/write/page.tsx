'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link as LinkIcon,
  Quote,
  Code,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Wand2,
  MessageSquareQuote,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react'

interface SageSuggestions {
  excerpts?: string[]
  hooks?: string[]
  quotes?: string[]
  ctas?: string[]
  sage_tip?: string
}

export default function WriteArticlePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Sage suggestions state
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<SageSuggestions | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  // Step-based publishing flow
  const [currentStep, setCurrentStep] = useState<'write' | 'preview' | 'publish'>('write')
  const [hasPreviewedOnce, setHasPreviewedOnce] = useState(false)

  // Calculate read time
  const wordCount = content.split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/articles/write')
    }
  }, [status, router])

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    setContent(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // Fetch Sage's suggestions
  const fetchSuggestions = async () => {
    if (content.length < 50) {
      setErrorMessage('Please write at least 50 characters before getting suggestions')
      return
    }

    setIsLoadingSuggestions(true)
    setErrorMessage('')

    try {
      const res = await fetch('/api/articles/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, title, type: 'all' }),
      })

      const data = await res.json()

      if (data.success) {
        setSuggestions(data.data)
        setShowSuggestions(true)
      } else {
        setErrorMessage(data.error || 'Failed to get suggestions')
      }
    } catch (error) {
      setErrorMessage('Failed to connect to Sage')
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  // Copy to clipboard and set excerpt
  const useSuggestion = (text: string, type: string, index: number) => {
    if (type === 'excerpt') {
      setExcerpt(text)
    }
    navigator.clipboard.writeText(text)
    setCopiedIndex(`${type}-${index}`)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleSave = async (publish: boolean = true) => {
    if (!title.trim()) {
      setErrorMessage('Please add a title for your article')
      return
    }
    if (!content.trim()) {
      setErrorMessage('Please add some content to your article')
      return
    }

    setIsSaving(true)
    setSaveStatus('saving')
    setErrorMessage('')

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt: excerpt || content.replace(/[#*_`~\[\]]/g, '').substring(0, 200) + '...',
          coverImage: coverImage || null,
          status: publish ? 'PUBLISHED' : 'DRAFT',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSaveStatus('saved')
        setTimeout(() => {
          router.push(`/articles/${data.data.slug}`)
        }, 1000)
      } else {
        setSaveStatus('error')
        setErrorMessage(data.error || 'Failed to save article')
      }
    } catch (error) {
      setSaveStatus('error')
      setErrorMessage('An error occurred while saving')
    } finally {
      setIsSaving(false)
    }
  }

  // Simple markdown to HTML converter for preview
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-black mb-2 mt-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black mb-3 mt-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mb-4 mt-8">$1</h1>')
      .replace(/\*\*\*(.*)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-theme-primary underline hover:text-theme-accent" target="_blank">$1</a>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-[var(--muted)] p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
      .replace(/`(.*?)`/gim, '<code class="bg-[var(--muted)] px-2 py-0.5 rounded text-sm">$1</code>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-theme-primary pl-4 italic my-4 text-theme-muted">$1</blockquote>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4">• $1</li>')
      .replace(/^\d\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      .replace(/\n/gim, '<br />')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-theme-primary animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold text-theme-muted">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Handle step transitions
  const goToPreview = () => {
    if (!title.trim() || !content.trim()) {
      setErrorMessage('Please add a title and content before previewing')
      return
    }
    setIsPreview(true)
    setCurrentStep('preview')
    setHasPreviewedOnce(true)
    setErrorMessage('')
  }

  const goToEdit = () => {
    setIsPreview(false)
    setCurrentStep('write')
    setErrorMessage('')
  }

  const goToPublish = () => {
    if (!hasPreviewedOnce) {
      setErrorMessage('Please preview your article first before publishing')
      return
    }
    setCurrentStep('publish')
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header with Step Indicator */}
      <div className="sticky top-0 z-50 bg-[var(--card)] border-b-2 border-[var(--border)] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Progress Indicator */}
          <div className="py-3 border-b border-[var(--border)]">
            <div className="flex items-center justify-center gap-2">
              {/* Step 1: Write */}
              <button
                onClick={goToEdit}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  currentStep === 'write'
                    ? 'bg-[var(--primary)] text-white font-bold'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  currentStep === 'write' ? 'bg-white text-[var(--primary)]' : 'bg-[var(--border)] text-[var(--foreground)]'
                }`}>1</span>
                <span className="text-sm font-bold">Write</span>
              </button>

              <ChevronRight className="w-4 h-4 text-theme-muted" />

              {/* Step 2: Preview */}
              <button
                onClick={goToPreview}
                disabled={!title.trim() || !content.trim()}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  currentStep === 'preview'
                    ? 'bg-[var(--accent)] text-white font-bold'
                    : hasPreviewedOnce
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)]/20 disabled:opacity-50'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  currentStep === 'preview'
                    ? 'bg-white text-[var(--accent)]'
                    : hasPreviewedOnce
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[var(--border)] text-[var(--foreground)]'
                }`}>
                  {hasPreviewedOnce ? <Check className="w-3 h-3" /> : '2'}
                </span>
                <span className="text-sm font-bold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </span>
                {!hasPreviewedOnce && (
                  <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-black animate-pulse">
                    REQUIRED
                  </span>
                )}
              </button>

              <ChevronRight className="w-4 h-4 text-theme-muted" />

              {/* Step 3: Publish */}
              <button
                onClick={() => hasPreviewedOnce && handleSave(true)}
                disabled={!hasPreviewedOnce || isSaving || !title || !content}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  currentStep === 'publish' || saveStatus === 'saved'
                    ? 'bg-emerald-500 text-white font-bold'
                    : hasPreviewedOnce
                    ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-90'
                    : 'bg-[var(--muted)] text-theme-muted cursor-not-allowed opacity-50'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  saveStatus === 'saved'
                    ? 'bg-white text-emerald-500'
                    : hasPreviewedOnce
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--border)] text-[var(--foreground)]'
                }`}>
                  {saveStatus === 'saved' ? <CheckCircle className="w-3.5 h-3.5" /> : isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : '3'}
                </span>
                <span className="text-sm font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isSaving ? 'Publishing...' : saveStatus === 'saved' ? 'Published!' : 'Publish'}
                </span>
              </button>
            </div>
          </div>

          {/* Title and Actions Row */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <Link href="/articles">
                <Button variant="ghost" size="sm" className="font-bold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="hidden sm:block">
                <h1 className="text-lg font-black text-[var(--foreground)]">
                  {currentStep === 'write' ? 'Write Article' : currentStep === 'preview' ? 'Preview Article' : 'Publish Article'}
                </h1>
                <p className="text-xs text-theme-muted">
                  {wordCount} words • {readTime} min read
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Step-specific action buttons */}
              {currentStep === 'write' && (
                <Button
                  onClick={goToPreview}
                  disabled={!title.trim() || !content.trim()}
                  className="font-black bg-[var(--accent)] hover:bg-[var(--accent)]/90"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  PREVIEW ARTICLE
                </Button>
              )}

              {currentStep === 'preview' && (
                <>
                  <Button
                    onClick={goToEdit}
                    variant="outline"
                    className="font-bold"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleSave(true)}
                    disabled={isSaving}
                    className="font-black bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    PUBLISH NOW
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-500/10 border-b-2 border-red-500/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <p className="flex items-center gap-2 text-red-500 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {isPreview ? (
            /* Preview Mode */
            <Card className="border-4 border-theme-primary">
              <CardContent className="p-8">
                <div className="mb-8 pb-6 border-b-2 border-[var(--border)]">
                  {coverImage && (
                    <div className="mb-6 rounded-xl overflow-hidden">
                      <img src={coverImage} alt="Cover" className="w-full h-64 object-cover" />
                    </div>
                  )}
                  <h1 className="text-4xl font-black text-[var(--foreground)] mb-4">
                    {title || 'Untitled Article'}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-theme-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {readTime} min read
                    </span>
                    <span>•</span>
                    <span>{wordCount} words</span>
                  </div>
                </div>
                <div
                  className="prose prose-lg max-w-none text-[var(--foreground)]"
                  dangerouslySetInnerHTML={{
                    __html: `<p class="mb-4">${renderMarkdown(content || 'Start writing your article...')}</p>`,
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            /* Edit Mode */
            <div className="space-y-6">
              {/* Cover Image */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-4">
                  <label className="block text-sm font-black text-theme-muted uppercase mb-2">
                    Cover Image (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Paste image URL..."
                      className="flex-1 px-4 py-3 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-[var(--foreground)] font-medium focus:outline-none focus:border-theme-primary"
                    />
                    <Button variant="outline" size="sm" className="font-bold">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  {coverImage && (
                    <div className="mt-3 rounded-lg overflow-hidden max-h-48">
                      <img src={coverImage} alt="Preview" className="w-full h-48 object-cover" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Title */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article Title..."
                className="w-full px-0 py-4 text-4xl font-black bg-transparent border-none focus:outline-none text-[var(--foreground)] placeholder-theme-muted"
              />

              {/* Excerpt with Sage Suggestions */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-black text-theme-muted uppercase">
                      Excerpt / Summary
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchSuggestions}
                      disabled={isLoadingSuggestions || content.length < 50}
                      className="font-bold text-xs"
                    >
                      {isLoadingSuggestions ? (
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      ) : (
                        <Wand2 className="w-3 h-3 mr-1" />
                      )}
                      Ask Sage
                    </Button>
                  </div>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="A brief summary of your article... (Sage can help!)"
                    rows={2}
                    className="w-full px-4 py-3 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-[var(--foreground)] font-medium focus:outline-none focus:border-theme-primary resize-none"
                  />
                </CardContent>
              </Card>

              {/* Sage Suggestions Panel */}
              {suggestions && (
                <Card className="border-2 border-theme-accent bg-gradient-to-br from-[var(--accent)]/10 to-transparent">
                  <CardContent className="p-4">
                    <button
                      onClick={() => setShowSuggestions(!showSuggestions)}
                      className="w-full flex items-center justify-between mb-3"
                    >
                      <h3 className="font-black text-theme-accent flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Sage's Suggestions
                      </h3>
                      {showSuggestions ? (
                        <ChevronUp className="w-4 h-4 text-theme-accent" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-theme-accent" />
                      )}
                    </button>

                    {showSuggestions && (
                      <div className="space-y-4">
                        {/* Sage Tip */}
                        {suggestions.sage_tip && (
                          <div className="p-3 bg-[var(--muted)] rounded-lg">
                            <p className="text-sm font-medium text-[var(--foreground)] flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                              {suggestions.sage_tip}
                            </p>
                          </div>
                        )}

                        {/* Excerpts */}
                        {suggestions.excerpts && suggestions.excerpts.length > 0 && (
                          <div>
                            <h4 className="text-xs font-black text-theme-muted uppercase mb-2 flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              Excerpt Options (click to use)
                            </h4>
                            <div className="space-y-2">
                              {suggestions.excerpts.map((ex, i) => (
                                <button
                                  key={i}
                                  onClick={() => useSuggestion(ex, 'excerpt', i)}
                                  className="w-full p-3 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-left text-sm text-[var(--foreground)] hover:border-theme-primary transition-colors group"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="flex-1">{ex}</span>
                                    {copiedIndex === `excerpt-${i}` ? (
                                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Hooks */}
                        {suggestions.hooks && suggestions.hooks.length > 0 && (
                          <div>
                            <h4 className="text-xs font-black text-theme-muted uppercase mb-2 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Opening Hook Ideas
                            </h4>
                            <div className="space-y-2">
                              {suggestions.hooks.map((hook, i) => (
                                <button
                                  key={i}
                                  onClick={() => useSuggestion(hook, 'hook', i)}
                                  className="w-full p-3 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-left text-sm text-[var(--foreground)] hover:border-theme-secondary transition-colors group"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="flex-1 italic">"{hook}"</span>
                                    {copiedIndex === `hook-${i}` ? (
                                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quotes */}
                        {suggestions.quotes && suggestions.quotes.length > 0 && (
                          <div>
                            <h4 className="text-xs font-black text-theme-muted uppercase mb-2 flex items-center gap-1">
                              <MessageSquareQuote className="w-3 h-3" />
                              Quotable Moments
                            </h4>
                            <div className="space-y-2">
                              {suggestions.quotes.map((quote, i) => (
                                <button
                                  key={i}
                                  onClick={() => useSuggestion(quote, 'quote', i)}
                                  className="w-full p-3 bg-[var(--background)] border-l-4 border-theme-accent rounded-lg text-left text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors group"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="flex-1">"{quote}"</span>
                                    {copiedIndex === `quote-${i}` ? (
                                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CTAs */}
                        {suggestions.ctas && suggestions.ctas.length > 0 && (
                          <div>
                            <h4 className="text-xs font-black text-theme-muted uppercase mb-2 flex items-center gap-1">
                              <Lightbulb className="w-3 h-3" />
                              Call-to-Action Ideas
                            </h4>
                            <div className="space-y-2">
                              {suggestions.ctas.map((cta, i) => (
                                <button
                                  key={i}
                                  onClick={() => useSuggestion(cta, 'cta', i)}
                                  className="w-full p-3 bg-[var(--background)] border-2 border-[var(--border)] rounded-lg text-left text-sm text-[var(--foreground)] hover:border-theme-primary transition-colors group"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="flex-1">{cta}</span>
                                    {copiedIndex === `cta-${i}` ? (
                                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    ) : (
                                      <Copy className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Formatting Toolbar */}
              <Card className="border-2 border-[var(--border)] sticky top-20 z-40 bg-[var(--card)]">
                <CardContent className="p-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      onClick={() => insertMarkdown('# ', '')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Heading 1"
                    >
                      <Heading1 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('## ', '')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Heading 2"
                    >
                      <Heading2 className="w-5 h-5" />
                    </button>
                    <div className="w-px h-6 bg-[var(--border)] mx-1" />
                    <button
                      onClick={() => insertMarkdown('**', '**')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Bold"
                    >
                      <Bold className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('*', '*')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Italic"
                    >
                      <Italic className="w-5 h-5" />
                    </button>
                    <div className="w-px h-6 bg-[var(--border)] mx-1" />
                    <button
                      onClick={() => insertMarkdown('- ', '')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Bullet List"
                    >
                      <List className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('1. ', '')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Numbered List"
                    >
                      <ListOrdered className="w-5 h-5" />
                    </button>
                    <div className="w-px h-6 bg-[var(--border)] mx-1" />
                    <button
                      onClick={() => insertMarkdown('[', '](url)')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Link"
                    >
                      <LinkIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('> ', '')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Quote"
                    >
                      <Quote className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('`', '`')}
                      className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      title="Code"
                    >
                      <Code className="w-5 h-5" />
                    </button>

                    {/* Stats */}
                    <div className="ml-auto flex items-center gap-3 text-xs text-theme-muted font-bold">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {wordCount} words
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {readTime} min
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your article...

Use markdown for formatting:
# Heading 1
## Heading 2
**bold** and *italic*
- bullet points
1. numbered lists
> quotes
`code`
[link text](url)

Share your knowledge with the Project Exodus community!"
                className="w-full min-h-[500px] px-0 py-4 text-lg bg-transparent border-none focus:outline-none text-[var(--foreground)] placeholder-theme-muted/50 resize-none leading-relaxed"
              />

              {/* Preview Before Publishing Reminder */}
              {!hasPreviewedOnce && title.trim() && content.trim() && (
                <Card className="border-4 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-amber-700 dark:text-amber-400 mb-1">
                          Ready to Preview?
                        </h3>
                        <p className="text-sm text-amber-600 dark:text-amber-300 mb-3 font-medium">
                          Before publishing, preview your article to see exactly how readers will experience it.
                          This helps catch formatting issues and ensures your content looks perfect!
                        </p>
                        <Button
                          onClick={goToPreview}
                          className="font-black bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          PREVIEW MY ARTICLE
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tips */}
              <Card className="border-2 border-theme-accent bg-[var(--accent)]/5">
                <CardContent className="p-4">
                  <h3 className="font-black text-theme-accent mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Writing Tips
                  </h3>
                  <ul className="text-sm text-theme-muted space-y-1 font-medium">
                    <li>• Start with a compelling hook to grab readers' attention</li>
                    <li>• Use headings to organize your content</li>
                    <li>• Include real examples and personal experiences</li>
                    <li>• End with a call to action or thought-provoking question</li>
                    <li>• <strong>Click "Ask Sage"</strong> for AI-powered suggestions!</li>
                    <li>• <strong className="text-amber-600">Preview is required</strong> before publishing to ensure quality!</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
