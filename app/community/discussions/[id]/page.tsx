'use client'

import { useState, useEffect, use } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal'
import { BackButton } from '@/components/navigation/BackButton'
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Send,
  Reply,
  MoreHorizontal,
  Edit3,
  Trash2,
  User,
  ChevronDown,
  ChevronUp,
  Check,
  X
} from 'lucide-react'

interface Comment {
  id: string
  content: string
  likes: number
  createdAt: string
  user: {
    id: string
    name: string | null
    image: string | null
  }
  children?: Comment[]
}

interface Discussion {
  id: string
  content: string
  createdAt: string
  visibility: string
  isLiked: boolean
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
    headline: string | null
  }
  comments: Comment[]
  _count: {
    likes: number
    comments: number
  }
}

function CommentComponent({
  comment,
  postId,
  currentUserId,
  onReply,
  depth = 0
}: {
  comment: Comment
  postId: string
  currentUserId: string | null
  onReply: () => void
  depth?: number
}) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReplies, setShowReplies] = useState(depth < 2)
  const [localLikes, setLocalLikes] = useState(comment.likes)

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/social/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: replyContent,
          parentId: comment.id
        })
      })

      const data = await res.json()
      if (data.success) {
        setReplyContent('')
        setShowReplyInput(false)
        onReply()
      }
    } catch (error) {
      console.error('Error posting reply:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeComment = async () => {
    // For now, just increment locally (would need a separate API for comment likes)
    setLocalLikes(prev => prev + 1)
  }

  const maxDepth = 3
  const canNest = depth < maxDepth

  return (
    <div className={`${depth > 0 ? 'ml-6 pl-4 border-l-2 border-[var(--border)]' : ''}`}>
      <div className="py-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
            {comment.user.image ? (
              <img
                src={comment.user.image}
                alt={comment.user.name || 'User'}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-[var(--primary-foreground)]">
                {comment.user.name?.[0]?.toUpperCase() || '?'}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/profile/${comment.user.id}`}>
                <span className="font-bold text-sm text-[var(--foreground)] hover:text-theme-primary transition-colors">
                  {comment.user.name || 'Anonymous'}
                </span>
              </Link>
              <span className="text-xs text-theme-muted">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Content */}
            <p className="text-sm text-[var(--foreground)] mb-2 whitespace-pre-wrap">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={handleLikeComment}
                className="flex items-center gap-1 text-theme-muted hover:text-theme-primary transition-colors font-medium"
              >
                <Heart className="w-3.5 h-3.5" />
                {localLikes > 0 && localLikes}
              </button>

              {currentUserId && canNest && (
                <button
                  onClick={() => setShowReplyInput(!showReplyInput)}
                  className="flex items-center gap-1 text-theme-muted hover:text-theme-accent transition-colors font-medium"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Reply
                </button>
              )}

              {comment.children && comment.children.length > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="flex items-center gap-1 text-theme-muted hover:text-theme-primary transition-colors font-medium"
                >
                  {showReplies ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      Hide {comment.children.length} {comment.children.length === 1 ? 'reply' : 'replies'}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      Show {comment.children.length} {comment.children.length === 1 ? 'reply' : 'replies'}
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Reply Input */}
            {showReplyInput && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  disabled={isSubmitting}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-medium focus:border-theme-primary focus:outline-none transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmitReply()
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={handleSubmitReply}
                  disabled={isSubmitting || !replyContent.trim()}
                  className="font-bold"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {showReplies && comment.children && comment.children.length > 0 && (
        <div className="mt-1">
          {comment.children.map((child) => (
            <CommentComponent
              key={child.id}
              comment={child}
              postId={postId}
              currentUserId={currentUserId}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function DiscussionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: session } = useSession()
  const router = useRouter()

  const [discussion, setDiscussion] = useState<Discussion | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwner = discussion?.user.id === session?.user?.id

  useEffect(() => {
    fetchDiscussion()
  }, [id])

  const fetchDiscussion = async () => {
    try {
      const res = await fetch(`/api/social/post/${id}`)
      const data = await res.json()
      if (data.success) {
        setDiscussion(data.data)
        setIsLiked(data.data.isLiked)
        setLikeCount(data.data._count.likes)
        setEditContent(data.data.content)
      }
    } catch (error) {
      console.error('Error fetching discussion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async () => {
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      const res = await fetch('/api/social/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id })
      })

      const data = await res.json()
      if (data.success) {
        setIsLiked(data.liked)
        setLikeCount(prev => data.liked ? prev + 1 : prev - 1)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmittingComment) return
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    setIsSubmittingComment(true)
    try {
      const res = await fetch('/api/social/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: id,
          content: newComment
        })
      })

      const data = await res.json()
      if (data.success) {
        setNewComment('')
        fetchDiscussion()
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editContent.trim() || isSavingEdit) return

    setIsSavingEdit(true)
    try {
      const res = await fetch(`/api/social/post/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent })
      })

      const data = await res.json()
      if (data.success) {
        setDiscussion(prev => prev ? { ...prev, content: editContent } : null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error saving edit:', error)
    } finally {
      setIsSavingEdit(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/social/post/${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      if (data.success) {
        router.push('/community')
      }
    } catch (error) {
      console.error('Error deleting discussion:', error)
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading discussion...</p>
        </div>
      </div>
    )
  }

  if (!discussion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Card className="border-4 border-theme-secondary max-w-md">
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-black mb-4 text-theme-muted">DISCUSSION NOT FOUND</h2>
            <p className="text-lg font-semibold mb-8 text-theme-muted">
              This discussion doesn't exist or has been deleted.
            </p>
            <Link href="/community">
              <Button className="font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO COMMUNITY
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton label="Back to Community" fallbackUrl="/community" />
        </div>

        {/* Main Discussion */}
        <Card className="border-4 border-theme-accent mb-6">
          <CardContent className="p-6">
            {/* Author Info */}
            <div className="flex items-start justify-between mb-4">
              <Link href={`/profile/${discussion.user.id}`} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  {discussion.user.image ? (
                    <img
                      src={discussion.user.image}
                      alt={discussion.user.name || 'User'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-[var(--primary-foreground)]" />
                  )}
                </div>
                <div>
                  <p className="font-black text-lg text-[var(--foreground)] hover:text-theme-primary transition-colors">
                    {discussion.user.name || 'Anonymous'}
                  </p>
                  {discussion.user.headline && (
                    <p className="text-sm font-medium text-theme-muted">{discussion.user.headline}</p>
                  )}
                  <p className="text-xs text-theme-muted">
                    {new Date(discussion.createdAt).toLocaleDateString()} at{' '}
                    {new Date(discussion.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </Link>

              {/* Owner Actions */}
              {isOwner && !isEditing && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="font-bold"
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteModal(true)}
                    className="font-bold text-[var(--secondary)] hover:text-[var(--secondary)]"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            {isEditing ? (
              <div className="mb-4">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  disabled={isSavingEdit}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-theme-primary bg-[var(--background)] text-[var(--foreground)] font-medium focus:outline-none transition-colors resize-none"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false)
                      setEditContent(discussion.content)
                    }}
                    disabled={isSavingEdit}
                    className="font-bold"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    disabled={isSavingEdit || !editContent.trim()}
                    className="font-bold"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    {isSavingEdit ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-lg font-medium text-[var(--foreground)] mb-6 whitespace-pre-wrap">
                {discussion.content}
              </p>
            )}

            {/* Stats & Actions */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-[var(--border)]">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 font-bold transition-colors ${
                    isLiked
                      ? 'text-[var(--secondary)]'
                      : 'text-theme-muted hover:text-[var(--secondary)]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likeCount}</span>
                </button>

                <div className="flex items-center gap-2 text-theme-muted font-bold">
                  <MessageSquare className="w-5 h-5" />
                  <span>{discussion._count.comments} comments</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comment Input */}
        <Card className="border-2 border-[var(--border)] mb-6">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                )}
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={session?.user ? "Add a comment..." : "Sign in to comment"}
                  disabled={isSubmittingComment || !session?.user}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-medium focus:border-theme-primary focus:outline-none transition-colors resize-none disabled:opacity-50"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={handleSubmitComment}
                    disabled={isSubmittingComment || !newComment.trim() || !session?.user}
                    className="font-bold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card className="border-2 border-[var(--border)]">
          <CardContent className="p-4">
            <h3 className="text-lg font-black text-[var(--foreground)] mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Comments ({discussion.comments.length})
            </h3>

            {discussion.comments.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                <p className="font-bold text-theme-muted">No comments yet</p>
                <p className="text-sm text-theme-muted mt-1">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {discussion.comments.map((comment) => (
                  <CommentComponent
                    key={comment.id}
                    comment={comment}
                    postId={id}
                    currentUserId={session?.user?.id || null}
                    onReply={fetchDiscussion}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Discussion"
        description="This action cannot be undone. All comments on this discussion will also be deleted."
        isLoading={isDeleting}
      />
    </div>
  )
}
