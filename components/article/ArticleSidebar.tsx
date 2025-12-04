'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  User,
  MessageCircle,
  ExternalLink,
  Link2,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/format'
import { useSession } from 'next-auth/react'

interface Reference {
  url: string
  text: string
}

interface Comment {
  id: string
  content: string
  createdAt: string
  user?: {
    id: string
    name: string | null
    image: string | null
  }
  replies?: Comment[]
}

interface Author {
  id: string
  name: string | null
  image: string | null
  bio: string | null
}

interface ArticleSidebarProps {
  references: Reference[]
  comments: Comment[]
  author: Author | null
  articleId: string
  articleSlug: string
}

export function ArticleSidebar({
  references,
  comments,
  author,
  articleId,
  articleSlug
}: ArticleSidebarProps) {
  const { data: session } = useSession()
  const [isDiscussionExpanded, setIsDiscussionExpanded] = useState(false)
  const [showAllReferences, setShowAllReferences] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localComments, setLocalComments] = useState(comments)

  const displayedReferences = showAllReferences ? references : references.slice(0, 5)

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !session?.user) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/articles/${articleSlug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setLocalComments([data.data, ...localComments])
          setNewComment('')
        }
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Expanded full-screen discussion view
  if (isDiscussionExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--background)] overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-[var(--background)] py-4 border-b border-[var(--border)]">
            <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)]">Article Discussion</h2>
            <button
              onClick={() => setIsDiscussionExpanded(false)}
              className="p-2 bg-[var(--muted)] hover:bg-[var(--border)] rounded-lg transition-colors"
              title="Close discussion"
            >
              <Minimize2 className="w-5 h-5 text-[var(--foreground)]" />
            </button>
          </div>

          {/* Comment Input */}
          {session?.user ? (
            <div className="space-y-3 mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this article..."
                className="w-full p-4 border-2 border-[var(--border)] rounded-xl text-base font-medium resize-none focus:outline-none focus:border-theme-primary bg-[var(--card)] text-[var(--foreground)]"
                rows={4}
              />
              <Button
                onClick={handleSubmitComment}
                disabled={isSubmitting || !newComment.trim()}
                className="font-bold"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          ) : (
            <div className="p-6 bg-[var(--muted)] rounded-xl text-center mb-8">
              <p className="text-base font-medium text-theme-muted mb-3">Sign in to join the discussion</p>
              <Link href="/auth/signin">
                <Button variant="outline" className="font-bold">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {localComments.length > 0 ? (
              localComments.map((comment) => (
                <div key={comment.id} className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                        {comment.user?.image ? (
                          <img src={comment.user.image} alt={comment.user.name || 'User'} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Link href={`/profile/${comment.user?.id}`} className="font-bold text-[var(--foreground)] hover:text-theme-primary">
                          {comment.user?.name || 'Anonymous'}
                        </Link>
                        <span className="text-sm text-theme-muted">
                          {formatDate(new Date(comment.createdAt))}
                        </span>
                      </div>
                      <p className="text-[var(--foreground)] leading-relaxed">{comment.content}</p>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-14 space-y-4 border-l-2 border-[var(--border)] pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
                            {reply.user?.image ? (
                              <img src={reply.user.image} alt={reply.user.name || 'User'} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <User className="w-4 h-4 text-theme-muted" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-[var(--foreground)]">{reply.user?.name || 'Anonymous'}</span>
                              <span className="text-xs text-theme-muted">{formatDate(new Date(reply.createdAt))}</span>
                            </div>
                            <p className="text-sm text-[var(--foreground)]">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium text-theme-muted">No comments yet</p>
                <p className="text-sm text-theme-muted">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Regular sidebar view
  return (
    <aside className="space-y-6 md:col-span-1">
      {/* References Widget */}
      {references.length > 0 && (
        <Card className="border-2 border-theme-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Link2 className="w-4 h-4 text-theme-accent" />
              References & Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {displayedReferences.map((ref, i) => (
              <a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-[var(--muted)] transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-theme-muted group-hover:text-theme-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-[var(--foreground)] group-hover:text-theme-accent line-clamp-2">
                  {ref.text}
                </span>
              </a>
            ))}
            {references.length > 5 && (
              <button
                onClick={() => setShowAllReferences(!showAllReferences)}
                className="flex items-center gap-1 text-sm font-bold text-theme-accent hover:text-theme-primary transition-colors w-full justify-center py-2"
              >
                {showAllReferences ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show All ({references.length})
                  </>
                )}
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Discussion Widget */}
      <Card className="border-2 border-theme-primary">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-theme-primary" />
              Discussion ({localComments.length})
            </CardTitle>
            <button
              onClick={() => setIsDiscussionExpanded(true)}
              className="p-1.5 hover:bg-[var(--muted)] rounded-lg transition-colors"
              title="Expand discussion"
            >
              <Maximize2 className="w-4 h-4 text-theme-muted" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comment Input */}
          {session?.user ? (
            <div className="space-y-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 border-2 border-[var(--border)] rounded-lg text-sm font-medium resize-none focus:outline-none focus:border-theme-primary bg-[var(--card)] text-[var(--foreground)]"
                rows={2}
              />
              <Button
                onClick={handleSubmitComment}
                disabled={isSubmitting || !newComment.trim()}
                className="w-full font-bold text-sm"
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          ) : (
            <div className="p-3 bg-[var(--muted)] rounded-lg text-center">
              <p className="text-sm font-medium text-theme-muted mb-2">Sign in to join the discussion</p>
              <Link href="/auth/signin">
                <Button size="sm" variant="outline" className="font-bold text-xs">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {localComments.length > 0 ? (
              localComments.map((comment) => (
                <div key={comment.id} className="space-y-3">
                  {/* Comment */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                        {comment.user?.image ? (
                          <img
                            src={comment.user.image}
                            alt={comment.user.name || 'User'}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/profile/${comment.user?.id}`} className="font-bold text-sm text-[var(--foreground)] hover:text-theme-primary">
                          {comment.user?.name || 'Anonymous'}
                        </Link>
                        <span className="text-xs text-theme-muted">
                          {formatDate(new Date(comment.createdAt))}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--foreground)] leading-relaxed">{comment.content}</p>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-11 space-y-3 border-l-2 border-[var(--border)] pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-[var(--muted)] flex items-center justify-center">
                              {reply.user?.image ? (
                                <img
                                  src={reply.user.image}
                                  alt={reply.user.name || 'User'}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-3 h-3 text-theme-muted" />
                              )}
                            </div>
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-bold text-xs text-[var(--foreground)]">
                                {reply.user?.name || 'Anonymous'}
                              </span>
                              <span className="text-[10px] text-theme-muted">
                                {formatDate(new Date(reply.createdAt))}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--foreground)]">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <MessageCircle className="w-8 h-8 text-theme-muted mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-theme-muted">No comments yet</p>
                <p className="text-xs text-theme-muted">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Author Card */}
      {author && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">About the Author</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Link href={`/profile/${author.id}`} className="block">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center mx-auto mb-2 hover:scale-105 transition-transform cursor-pointer">
                  {author.image ? (
                    <img
                      src={author.image}
                      alt={author.name || 'Author'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-1 hover:text-theme-primary transition-colors cursor-pointer">
                  {author.name}
                </h3>
              </Link>
              {author.bio && (
                <p className="text-xs text-theme-muted line-clamp-3">
                  {author.bio}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Share Card */}
      <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Share Article</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full text-xs font-bold" size="sm">
                Share on Twitter
              </Button>
              <Button variant="outline" className="w-full text-xs font-bold" size="sm">
                Share on LinkedIn
              </Button>
              <Button variant="outline" className="w-full text-xs font-bold" size="sm">
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>
    </aside>
  )
}
