'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { User, MessageCircle, Tag, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { MarkdownContent } from '@/components/article/MarkdownContent'
import { ReferencesWidget } from '@/components/article/ReferencesWidget'
import { PeerReviewWidget } from '@/components/article/PeerReviewWidget'
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
  const [reviews, setReviews] = useState(article.peerReviews || [])
  const [activeTab, setActiveTab] = useState<'all' | 'reviews' | 'comments'>('all')

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
        <Card className="bg-[var(--card)] border-2 border-[var(--border)]">
          <CardContent className="p-6 sm:p-8 md:p-12 select-text">
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
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                            {item.user?.image ? (
                              <img src={item.user.image} alt="" className="w-10 h-10 rounded-full" />
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
                              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{item.rating}/5</span>
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
                                <div className="w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center">
                                  {reply.user?.image ? (
                                    <img src={reply.user.image} alt="" className="w-8 h-8 rounded-full" />
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
        {/* References Widget */}
        <ReferencesWidget references={article.references || []} articleContent={article.content} />

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
    </div>
  )
}
