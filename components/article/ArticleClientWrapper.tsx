'use client'

import { useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, MessageCircle, Tag, Users, Quote, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/format'
import { MarkdownContent } from '@/components/article/MarkdownContent'
import { ReferencesWidget } from '@/components/article/ReferencesWidget'
import { PeerReviewWidget } from '@/components/article/PeerReviewWidget'
import { ArticleReviewSection } from '@/components/article/ArticleReviewSection'
import { RoundTablePanel } from '@/components/article/RoundTablePanel'
import { AuthorBusinessCard } from '@/components/article/AuthorBusinessCard'

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

export function ArticleClientWrapper({ article }: ArticleClientWrapperProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [reviews, setReviews] = useState(article.peerReviews || [])
  const [quotedText, setQuotedText] = useState('')
  const articleContentRef = useRef<HTMLDivElement>(null)

  // Handle text selection for quoting
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim() && articleContentRef.current?.contains(selection.anchorNode)) {
      setQuotedText(selection.toString().trim())
    } else {
      setQuotedText('')
    }
  }, [])

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <article className="md:col-span-2">
          <Card className="bg-[var(--card)] border-2 border-[var(--border)] relative">
            {/* Quote Selection Tooltip */}
            {quotedText && (
              <div className="absolute top-2 right-2 z-10">
                <Button
                  size="sm"
                  onClick={() => setIsPanelOpen(true)}
                  className="flex items-center gap-1 shadow-lg"
                >
                  <Quote className="w-4 h-4" />
                  Quote & Discuss
                </Button>
              </div>
            )}
            <CardContent
              ref={articleContentRef}
              onMouseUp={handleTextSelection}
              className="p-6 sm:p-8 md:p-12 select-text"
            >
              {article.content ? (
                <MarkdownContent content={article.content} />
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

          {/* Expand Button for Round Table */}
          <div className="mt-8">
            <Button
              variant="outline"
              onClick={() => setIsPanelOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-6 border-2 border-dashed border-[var(--primary)] hover:bg-[var(--primary)]/10"
            >
              <Maximize2 className="w-5 h-5" />
              <span className="font-bold">Expand Round Table Talk</span>
              <span className="text-sm text-theme-muted">(Read article while discussing)</span>
            </Button>
          </div>

          {/* Round Table Section (Reddit-style) */}
          <div className="mt-12">
            <ArticleReviewSection
              articleId={article.id}
              articleAuthorId={article.authorId}
              initialReviews={reviews}
              onExpand={() => setIsPanelOpen(true)}
            />
          </div>

          {/* Comments Section */}
          {article.comments && article.comments.length > 0 && (
            <div className="mt-12">
              <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--foreground)]">
                    <MessageCircle className="w-5 h-5" />
                    Comments ({article.comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {article.comments.map((comment: any) => (
                    <div key={comment.id} className="space-y-4">
                      {/* Top-level comment */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-theme-primary" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-[var(--foreground)]">
                              {comment.user?.name || 'Anonymous'}
                            </span>
                            <span className="text-sm text-theme-muted">
                              {formatDate(new Date(comment.createdAt))}
                            </span>
                          </div>
                          <p className="text-[var(--foreground)]">{comment.content}</p>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-14 space-y-4 border-l-2 border-[var(--border)] pl-6">
                          {comment.replies.map((reply: any) => (
                            <div key={reply.id} className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                                  <User className="w-4 h-4 text-theme-accent" />
                                </div>
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-[var(--foreground)] text-sm">
                                    {reply.user?.name || 'Anonymous'}
                                  </span>
                                  <span className="text-xs text-theme-muted">
                                    {formatDate(new Date(reply.createdAt))}
                                  </span>
                                </div>
                                <p className="text-sm text-[var(--foreground)]">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          {/* References Widget */}
          <ReferencesWidget references={article.references || []} />

          {/* Peer Review Widget */}
          <PeerReviewWidget
            articleId={article.id}
            peerReviews={reviews}
            onExpand={() => setIsPanelOpen(true)}
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
      </div>

      {/* Round Table Panel */}
      <RoundTablePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        articleId={article.id}
        articleAuthorId={article.authorId}
        articleContent={article.content}
        reviews={reviews}
        onReviewsChange={setReviews}
      />
    </>
  )
}
