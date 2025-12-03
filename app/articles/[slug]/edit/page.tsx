'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  ArrowLeft,
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
  Trash2,
} from 'lucide-react'

export default function EditArticlePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [articleId, setArticleId] = useState<string | null>(null)

  // Calculate read time
  const wordCount = content.split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  // Load article data
  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${slug}`)
        const data = await res.json()

        if (data.success) {
          const article = data.data
          setTitle(article.title)
          setContent(article.content || '')
          setExcerpt(article.excerpt || '')
          setCoverImage(article.coverImage || '')
          setArticleId(article.id)

          // Check ownership
          if (article.author?.id !== session?.user?.id) {
            setErrorMessage('You can only edit your own articles')
          }
        } else {
          setErrorMessage(data.error || 'Failed to load article')
        }
      } catch (error) {
        setErrorMessage('Failed to load article')
      } finally {
        setIsLoading(false)
      }
    }

    if (slug && session?.user?.id) {
      loadArticle()
    }
  }, [slug, session?.user?.id])

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?callbackUrl=/articles/${slug}/edit`)
    }
  }, [status, router, slug])

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    setContent(newText)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleSave = async () => {
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
      const res = await fetch(`/api/articles/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt: excerpt || content.replace(/[#*_`~\[\]]/g, '').substring(0, 200) + '...',
          coverImage: coverImage || null,
          status: 'PUBLISHED',
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) {
      return
    }

    setIsDeleting(true)

    try {
      const res = await fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (data.success) {
        router.push('/articles')
      } else {
        setErrorMessage(data.error || 'Failed to delete article')
      }
    } catch (error) {
      setErrorMessage('An error occurred while deleting')
    } finally {
      setIsDeleting(false)
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

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-theme-primary animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold text-theme-muted">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--card)] border-b-2 border-[var(--border)] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href={`/articles/${slug}`}>
                <Button variant="ghost" size="sm" className="font-bold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="hidden sm:block">
                <h1 className="text-lg font-black text-[var(--foreground)]">Edit Article</h1>
                <p className="text-xs text-theme-muted">
                  {wordCount} words • {readTime} min read
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Delete Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="font-bold text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Delete
              </Button>

              {/* Preview Toggle */}
              <button
                onClick={() => setIsPreview(!isPreview)}
                className={`p-2 rounded-lg transition-colors ${
                  isPreview
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                }`}
                title={isPreview ? 'Edit' : 'Preview'}
              >
                {isPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>

              {/* Save Status */}
              {saveStatus === 'saving' && (
                <span className="flex items-center gap-1 text-theme-muted text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              )}
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1 text-emerald-500 text-sm font-bold">
                  <CheckCircle className="w-4 h-4" />
                  Saved!
                </span>
              )}

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={isSaving || !title || !content}
                className="font-black"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                SAVE CHANGES
              </Button>
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

              {/* Excerpt */}
              <Card className="border-2 border-[var(--border)]">
                <CardContent className="p-4">
                  <label className="block text-sm font-black text-theme-muted uppercase mb-2">
                    Excerpt / Summary
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="A brief summary of your article..."
                    rows={2}
                    className="w-full px-4 py-3 bg-[var(--background)] border-2 border-[var(--border)] rounded-xl text-[var(--foreground)] font-medium focus:outline-none focus:border-theme-primary resize-none"
                  />
                </CardContent>
              </Card>

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
                placeholder="Start writing your article..."
                className="w-full min-h-[500px] px-0 py-4 text-lg bg-transparent border-none focus:outline-none text-[var(--foreground)] placeholder-theme-muted/50 resize-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
