'use client'

import { useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, MessageCircle, Tag, Star, Users, Edit, Trash2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { MarkdownContent } from '@/components/article/MarkdownContent'
import { ReferencesWidget } from '@/components/article/ReferencesWidget'
import { FootnotesWidget } from '@/components/article/FootnotesWidget'
import { CorrectionsBanner } from '@/components/article/CorrectionsBanner'
import { PeerReviewWidget } from '@/components/article/PeerReviewWidget'
import { AuthorBusinessCard } from '@/components/article/AuthorBusinessCard'
import { extractFootnotes } from '@/lib/article/extractFootnotes'

interface ArticleClientWrapperProps {
  article: {
    id: string
    title: string
    content: string
    excerpt: string
    authorId: string
    references: any[]
    peerReviews: any[]
    tags: any[]
    comments: any[]
    author: {
      id: string
      name: string | null
      image: string | null
      bio: string | null
      headline?: string | null
      location?: string | null
      phone?: string | null
      email?: string
      interests?: string[]
      expertise?: string[]
      guardianArchetype?: string | null
      declaration?: string | null
      _count?: {
        followers: number
        following: number
        projectMemberships: number
        articles: number
        createdProjects: number
      }
    }
  }
}

// Star Rating Display Component
function StarRatingDisplay({ value, size = 'sm' }: { value: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= value
              ? 'fill-amber-400 text-amber-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  )
}

export function ArticleClientWrapper({ article }: ArticleClientWrapperProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [reviews, setReviews] = useState(article.peerReviews || [])
  const [activeTab, setActiveTab] = useState<'all' | 'reviews' | 'comments'>('all')
  const [expandedRatingId, setExpandedRatingId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Check if current user is the author
  const isAuthor = session?.user?.id === article.authorId

  // Pull footnotes out of the article body so they render in a sidebar
  // widget instead of getting buried at the bottom of the body content.
  const { body: bodyWithoutFootnotes, footnotes } = useMemo(
    () => extractFootnotes(article.content || ''),
    [article.content],
  )

  // Handle article deletion
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/articles/${article.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        router.push('/articles')
      } else {
        alert('Failed to delete article')
      }
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('Failed to delete article')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  // Filter reviews based on active tab
  const topLevelItems = reviews.filter((r: any) => r.parentId === null)
  const ratedReviews = topLevelItems.filter((r: any) => r.rating !== null && r.rating > 0)
  const generalComments = topLevelItems.filter((r: any) => r.rating === null || r.rating === 0)

  const filteredItems = activeTab === 'reviews'
    ? ratedReviews
    : activeTab === 'comments'
    ? generalComments
    : topLevelItems

  // Get replies for a given item
  const getReplies = (parentId: string) => reviews.filter((r: any) => r.parentId === parentId)

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Main Content */}
      <article className="md:col-span-2">
        {/* Author Controls */}
        {isAuthor && (
          <div className="mb-4 p-4 bg-[var(--muted)] rounded-xl border-2 border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-sm font-bold text-[var(--foreground)]">You are the author of this article</span>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/articles/write?edit=${article.id}`}>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Article
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Editorial correction / editor's note — surfaced prominently
            above the body when present. Drives reader trust by being
            transparent about post-publish edits. */}
        {(article as { correctionsNote?: string | null; correctionsNoteAt?: string | null }).correctionsNote && (
          <CorrectionsBanner
            note={(article as { correctionsNote?: string | null }).correctionsNote!}
            noteAt={(article as { correctionsNoteAt?: string | null }).correctionsNoteAt || null}
          />
        )}

        <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
          <CardContent className="p-6 sm:p-8 md:p-12 select-text">
            {bodyWithoutFootnotes ? (
              <MarkdownContent content={bodyWithoutFootnotes} />
            ) : (
              <p className="text-lg font-medium leading-relaxed text-theme-muted">
                {article.excerpt || 'Article content coming soon...'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tagRel: any) => (
                <Link
                  key={tagRel.tag.id}
                  href={`/learn?tag=${tagRel.tag.slug}`}
                  className="px-3 py-1 bg-[var(--muted)] hover:bg-[var(--primary)]/20 rounded-full text-sm text-[var(--foreground)] transition-colors"
                >
                  {tagRel.tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Round Table Discussion Section */}
        <div className="mt-12">
          <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-[var(--foreground)]">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--primary)]" />
                  Round Table Discussion
                </div>
                <span className="text-sm font-normal text-[var(--foreground)]/60">
                  {topLevelItems.length} {topLevelItems.length === 1 ? 'post' : 'posts'}
                </span>
              </CardTitle>

              {/* Filter Tabs */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTab === 'all'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
                  }`}
                >
                  All ({topLevelItems.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1 ${
                    activeTab === 'reviews'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
                  }`}
                >
                  <Star className="w-3.5 h-3.5" />
                  Reviews ({ratedReviews.length})
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1 ${
                    activeTab === 'comments'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Comments ({generalComments.length})
                </button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {filteredItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[var(--foreground)]/50">
                    {activeTab === 'reviews' ? 'No reviews yet.' : activeTab === 'comments' ? 'No comments yet.' : 'No discussions yet.'}
                  </p>
                </div>
              ) : (
                filteredItems.map((item: any) => {
                  const hasRating = item.rating !== null && item.rating > 0
                  const replies = getReplies(item.id)

                  return (
                    <div key={item.id} className="space-y-4">
                      {/* Main item */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                            {item.user?.image ? (
                              <Image src={item.user.image} alt="" fill unoptimized sizes="100%" className="rounded-full object-cover" />
                            ) : (
                              <User className="w-5 h-5 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-[var(--foreground)]">
                              {item.user?.name || 'Anonymous'}
                            </span>
                            {hasRating && (
                              <div className="relative">
                                <button
                                  onClick={() => setExpandedRatingId(expandedRatingId === item.id ? null : item.id)}
                                  className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 rounded-full hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-colors cursor-pointer"
                                  title="Click to see rating breakdown"
                                >
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{item.rating}/5</span>
                                </button>

                                {/* Rating Breakdown Popup */}
                                {expandedRatingId === item.id && (
                                  <>
                                    <div className="fixed inset-0 z-40" onClick={() => setExpandedRatingId(null)} />
                                    <div className="absolute top-full left-0 mt-2 z-50 w-52 p-4 bg-[var(--card)] rounded-lg shadow-xl border border-[var(--border)]">
                                      <div className="text-sm font-bold text-[var(--foreground)] mb-3">Rating Breakdown</div>
                                      <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                          <span className="text-sm text-[var(--foreground)]/70">Overall</span>
                                          <div className="flex items-center gap-2">
                                            <StarRatingDisplay value={item.rating || 0} />
                                            <span className="text-sm font-bold text-[var(--foreground)] w-4">{item.rating}</span>
                                          </div>
                                        </div>
                                        {item.accuracy !== null && item.accuracy > 0 && (
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-[var(--foreground)]/70">Accuracy</span>
                                            <div className="flex items-center gap-2">
                                              <StarRatingDisplay value={item.accuracy} />
                                              <span className="text-sm font-bold text-[var(--foreground)] w-4">{item.accuracy}</span>
                                            </div>
                                          </div>
                                        )}
                                        {item.clarity !== null && item.clarity > 0 && (
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-[var(--foreground)]/70">Clarity</span>
                                            <div className="flex items-center gap-2">
                                              <StarRatingDisplay value={item.clarity} />
                                              <span className="text-sm font-bold text-[var(--foreground)] w-4">{item.clarity}</span>
                                            </div>
                                          </div>
                                        )}
                                        {item.relevance !== null && item.relevance > 0 && (
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-[var(--foreground)]/70">Relevance</span>
                                            <div className="flex items-center gap-2">
                                              <StarRatingDisplay value={item.relevance} />
                                              <span className="text-sm font-bold text-[var(--foreground)] w-4">{item.relevance}</span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                            <span className="text-sm text-[var(--foreground)]/50">
                              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-[var(--foreground)] whitespace-pre-wrap">{item.content}</p>
                        </div>
                      </div>

                      {/* Replies */}
                      {replies.length > 0 && (
                        <div className="ml-14 space-y-4 border-l-2 border-[var(--border)] pl-6">
                          {replies.map((reply: any) => (
                            <div key={reply.id} className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="relative w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center">
                                  {reply.user?.image ? (
                                    <Image src={reply.user.image} alt="" fill unoptimized sizes="100%" className="rounded-full object-cover" />
                                  ) : (
                                    <User className="w-4 h-4 text-[var(--foreground)]/60" />
                                  )}
                                </div>
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-[var(--foreground)] text-sm">
                                    {reply.user?.name || 'Anonymous'}
                                  </span>
                                  <span className="text-xs text-[var(--foreground)]/50">
                                    {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                  </span>
                                </div>
                                <p className="text-sm text-[var(--foreground)]">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </div>
      </article>

      {/* Sidebar */}
      <aside className="md:col-span-1 space-y-6">
        {/* Footnotes Widget — sits above References so the in-line
            citation markers in the body have an obvious anchor. */}
        <FootnotesWidget footnotes={footnotes} />

        {/* References Widget */}
        <ReferencesWidget references={article.references || []} articleContent={bodyWithoutFootnotes} />

        {/* Round Table Talk Widget - Single access point for discussions */}
        <PeerReviewWidget
          articleId={article.id}
          peerReviews={reviews}
          onReviewsChange={setReviews}
        />

        {/* Author Business Card */}
        {article.author && (
          <AuthorBusinessCard author={article.author} />
        )}

        {/* Share Card */}
        <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
          <CardHeader>
            <CardTitle className="text-base text-[var(--foreground)]">Share Article</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full text-sm" size="sm">
                Share on Twitter
              </Button>
              <Button variant="outline" className="w-full text-sm" size="sm">
                Share on Facebook
              </Button>
              <Button variant="outline" className="w-full text-sm" size="sm">
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--card)] rounded-2xl shadow-2xl max-w-md w-full border-2 border-[var(--border)] overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[var(--foreground)] mb-2">Delete Article</h3>
                  <p className="text-sm text-[var(--foreground)]/70">
                    Are you sure you want to delete "<span className="font-semibold">{article.title}</span>"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-[var(--muted)] border-t border-[var(--border)]">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Article'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
