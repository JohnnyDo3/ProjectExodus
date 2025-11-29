'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, MessageCircle, Share2, MoreHorizontal, Globe, Users, Lock } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface FeedPostProps {
  post: any
  onLike?: () => void
  onComment?: () => void
}

export function FeedPost({ post, onLike, onComment }: FeedPostProps) {
  const { data: session } = useSession()
  const [liked, setLiked] = useState(post.likes?.length > 0)
  const [likeCount, setLikeCount] = useState(post._count?.likes || 0)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(post.comments || [])
  const [loading, setLoading] = useState(false)

  const formatDate = (date: string) => {
    const now = new Date()
    const postDate = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

    return postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleLike = async () => {
    if (!session?.user) return

    try {
      const res = await fetch('/api/social/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id })
      })

      if (res.ok) {
        const data = await res.json()
        setLiked(data.liked)
        setLikeCount((prev: number) => data.liked ? prev + 1 : prev - 1)
        if (onLike) onLike()
      }
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleComment = async () => {
    if (!session?.user || !commentText.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/social/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post.id,
          content: commentText.trim()
        })
      })

      if (res.ok) {
        const data = await res.json()
        setComments([...comments, data.data])
        setCommentText('')
        if (onComment) onComment()
      }
    } catch (error) {
      console.error('Error commenting:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderContent = (text: string) => {
    // Simple parser for hashtags and mentions
    const parts = text.split(/(\s+)/)
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        return (
          <span key={i} className="text-theme-primary font-bold cursor-pointer hover:underline">
            {part}
          </span>
        )
      }
      if (part.startsWith('@')) {
        return (
          <span key={i} className="text-theme-accent font-bold cursor-pointer hover:underline">
            {part}
          </span>
        )
      }
      return part
    })
  }

  const visibilityIcon = ({
    PUBLIC: Globe,
    FOLLOWERS_ONLY: Users,
    PRIVATE: Lock
  } as Record<string, any>)[post.visibility]

  const VisibilityIcon = visibilityIcon || Globe

  return (
    <Card className="border-4 border-theme-primary hover:border-theme-accent transition-all">
      <CardContent className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            {/* User Avatar */}
            <Link href={`/profile/${post.user.id}`}>
              {post.user.image ? (
                <img
                  src={post.user.image}
                  alt={post.user.name || 'User'}
                  className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="text-xl font-black text-white">
                    {post.user.name?.[0]?.toUpperCase() || post.user.email[0].toUpperCase()}
                  </span>
                </div>
              )}
            </Link>

            {/* User Info */}
            <div>
              <Link href={`/profile/${post.user.id}`}>
                <h3 className="font-black text-[var(--foreground)] hover:text-theme-primary transition-colors cursor-pointer">
                  {post.user.name || 'Anonymous User'}
                </h3>
              </Link>
              {post.user.headline && (
                <p className="text-sm font-semibold text-theme-muted">
                  {post.user.headline}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs font-semibold text-theme-muted mt-1">
                <span>{formatDate(post.createdAt)}</span>
                <span>•</span>
                <VisibilityIcon className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* More Options */}
          <button className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5 text-theme-muted" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-base font-medium text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
            {renderContent(post.content)}
          </p>
        </div>

        {/* Post Media */}
        {post.media && post.media.length > 0 && (
          <div className="mb-4 rounded-xl overflow-hidden">
            {post.media[0].type === 'IMAGE' && (
              <img
                src={post.media[0].url}
                alt="Post media"
                className="w-full h-auto max-h-96 object-cover"
              />
            )}
          </div>
        )}

        {/* Post Stats */}
        <div className="flex items-center gap-6 py-3 border-y-2 border-theme-muted text-sm font-bold text-theme-muted">
          <button onClick={handleLike} className="hover:text-theme-primary transition-colors">
            {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
          </button>
          <button onClick={() => setShowComments(!showComments)} className="hover:text-theme-primary transition-colors">
            {post._count?.comments || comments.length} {post._count?.comments === 1 ? 'Comment' : 'Comments'}
          </button>
          <span>{post.shares || 0} {post.shares === 1 ? 'Share' : 'Shares'}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 font-black ${liked ? 'text-red-500' : ''}`}
          >
            <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
            {liked ? 'LIKED' : 'LIKE'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex-1 font-black"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            COMMENT
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 font-black"
          >
            <Share2 className="w-5 h-5 mr-2" />
            SHARE
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t-2 border-theme-muted space-y-4">
            {/* Comment Input */}
            {session?.user && (
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                      <span className="text-sm font-black text-white">
                        {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-2 text-sm font-medium rounded-full bg-[var(--muted)] border-2 border-[var(--border)] focus:border-theme-primary focus:outline-none text-[var(--foreground)] placeholder:text-theme-muted"
                  />
                </div>
                <Button
                  onClick={handleComment}
                  disabled={!commentText.trim() || loading}
                  size="sm"
                  className="font-black"
                >
                  POST
                </Button>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((comment: any) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    {comment.user.image ? (
                      <img
                        src={comment.user.image}
                        alt={comment.user.name || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] flex items-center justify-center">
                        <span className="text-sm font-black text-theme-accent">
                          {comment.user.name?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-[var(--muted)] rounded-2xl px-4 py-2">
                      <Link href={`/profile/${comment.user.id}`}>
                        <p className="font-black text-sm text-[var(--foreground)] hover:text-theme-primary transition-colors cursor-pointer">
                          {comment.user.name || 'Anonymous'}
                        </p>
                      </Link>
                      <p className="text-sm font-medium text-[var(--foreground)] leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 px-4 mt-1 text-xs font-semibold text-theme-muted">
                      <span>{formatDate(comment.createdAt)}</span>
                      <button className="hover:text-theme-primary transition-colors">Like</button>
                      <button className="hover:text-theme-primary transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
