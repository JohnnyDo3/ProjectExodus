'use client'

import { useState, useCallback, useEffect } from 'react'

interface CommentAuthor {
  id: string
  name: string | null
  email?: string | null
  image: string | null
}

interface CommentReaction {
  id: string
  emoji: string
  userId: string
  user: CommentAuthor
}

interface Comment {
  id: string
  content: string
  quotedText?: string | null
  position?: { from: number; to: number } | null
  author: CommentAuthor
  authorId: string
  createdAt: Date | string
  updatedAt: Date | string
  isEdited: boolean
  isResolved: boolean
  resolvedBy?: CommentAuthor | null
  resolvedAt?: Date | string | null
  reactions: CommentReaction[]
  replies?: Comment[]
  parentId?: string | null
}

interface UseDocumentCommentsOptions {
  documentId: string
  autoFetch?: boolean
}

interface UseDocumentCommentsReturn {
  comments: Comment[]
  isLoading: boolean
  error: string | null
  // Actions
  fetchComments: () => Promise<void>
  addComment: (content: string, quotedText?: string, position?: { from: number; to: number }) => Promise<Comment | null>
  addReply: (commentId: string, content: string) => Promise<Comment | null>
  editComment: (commentId: string, content: string) => Promise<Comment | null>
  deleteComment: (commentId: string) => Promise<boolean>
  resolveComment: (commentId: string) => Promise<Comment | null>
  unresolveComment: (commentId: string) => Promise<Comment | null>
  addReaction: (commentId: string, emoji: string) => Promise<CommentReaction | null>
  removeReaction: (commentId: string, emoji: string) => Promise<boolean>
  // Utilities
  getOpenComments: () => Comment[]
  getResolvedComments: () => Comment[]
  getCommentById: (id: string) => Comment | undefined
  getCommentsByPosition: (from: number, to: number) => Comment[]
}

export function useDocumentComments({
  documentId,
  autoFetch = true,
}: UseDocumentCommentsOptions): UseDocumentCommentsReturn {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all comments
  const fetchComments = useCallback(async () => {
    if (!documentId) return

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/documents/${documentId}/comments`)
      const data = await res.json()

      if (data.success) {
        setComments(data.data)
      } else {
        setError(data.error || 'Failed to fetch comments')
      }
    } catch (err) {
      setError('Failed to fetch comments')
      console.error('Error fetching comments:', err)
    } finally {
      setIsLoading(false)
    }
  }, [documentId])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && documentId) {
      fetchComments()
    }
  }, [autoFetch, documentId, fetchComments])

  // Add a new comment
  const addComment = useCallback(async (
    content: string,
    quotedText?: string,
    position?: { from: number; to: number }
  ): Promise<Comment | null> => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, quotedText, position }),
      })

      const data = await res.json()

      if (data.success) {
        const newComment = { ...data.data, replies: [], reactions: [] }
        setComments((prev) => [newComment, ...prev])
        return newComment
      } else {
        setError(data.error || 'Failed to add comment')
        return null
      }
    } catch (err) {
      setError('Failed to add comment')
      console.error('Error adding comment:', err)
      return null
    }
  }, [documentId])

  // Add a reply to a comment
  const addReply = useCallback(async (
    commentId: string,
    content: string
  ): Promise<Comment | null> => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments/${commentId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data = await res.json()

      if (data.success) {
        const newReply = { ...data.data, reactions: [] }
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? { ...c, replies: [...(c.replies || []), newReply] }
              : c
          )
        )
        return newReply
      } else {
        setError(data.error || 'Failed to add reply')
        return null
      }
    } catch (err) {
      setError('Failed to add reply')
      console.error('Error adding reply:', err)
      return null
    }
  }, [documentId])

  // Edit a comment
  const editComment = useCallback(async (
    commentId: string,
    content: string
  ): Promise<Comment | null> => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data = await res.json()

      if (data.success) {
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === commentId) {
              return { ...c, ...data.data }
            }
            // Check replies
            if (c.replies?.some((r) => r.id === commentId)) {
              return {
                ...c,
                replies: c.replies.map((r) =>
                  r.id === commentId ? { ...r, ...data.data } : r
                ),
              }
            }
            return c
          })
        )
        return data.data
      } else {
        setError(data.error || 'Failed to edit comment')
        return null
      }
    } catch (err) {
      setError('Failed to edit comment')
      console.error('Error editing comment:', err)
      return null
    }
  }, [documentId])

  // Delete a comment
  const deleteComment = useCallback(async (commentId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments/${commentId}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (data.success) {
        setComments((prev) =>
          prev
            .filter((c) => c.id !== commentId)
            .map((c) => ({
              ...c,
              replies: c.replies?.filter((r) => r.id !== commentId),
            }))
        )
        return true
      } else {
        setError(data.error || 'Failed to delete comment')
        return false
      }
    } catch (err) {
      setError('Failed to delete comment')
      console.error('Error deleting comment:', err)
      return false
    }
  }, [documentId])

  // Resolve a comment
  const resolveComment = useCallback(async (commentId: string): Promise<Comment | null> => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments/${commentId}/resolve`, {
        method: 'POST',
      })

      const data = await res.json()

      if (data.success) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, ...data.data } : c
          )
        )
        return data.data
      } else {
        setError(data.error || 'Failed to resolve comment')
        return null
      }
    } catch (err) {
      setError('Failed to resolve comment')
      console.error('Error resolving comment:', err)
      return null
    }
  }, [documentId])

  // Unresolve a comment
  const unresolveComment = useCallback(async (commentId: string): Promise<Comment | null> => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments/${commentId}/resolve`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (data.success) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, ...data.data } : c
          )
        )
        return data.data
      } else {
        setError(data.error || 'Failed to unresolve comment')
        return null
      }
    } catch (err) {
      setError('Failed to unresolve comment')
      console.error('Error unresolving comment:', err)
      return null
    }
  }, [documentId])

  // Add a reaction
  const addReaction = useCallback(async (
    commentId: string,
    emoji: string
  ): Promise<CommentReaction | null> => {
    try {
      const res = await fetch(`/api/documents/${documentId}/comments/${commentId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji }),
      })

      const data = await res.json()

      if (data.success) {
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === commentId) {
              return { ...c, reactions: [...c.reactions, data.data] }
            }
            // Check replies
            if (c.replies?.some((r) => r.id === commentId)) {
              return {
                ...c,
                replies: c.replies.map((r) =>
                  r.id === commentId
                    ? { ...r, reactions: [...r.reactions, data.data] }
                    : r
                ),
              }
            }
            return c
          })
        )
        return data.data
      } else {
        // Silently ignore "already exists" errors
        if (data.error !== 'Reaction already exists') {
          setError(data.error || 'Failed to add reaction')
        }
        return null
      }
    } catch (err) {
      setError('Failed to add reaction')
      console.error('Error adding reaction:', err)
      return null
    }
  }, [documentId])

  // Remove a reaction
  const removeReaction = useCallback(async (
    commentId: string,
    emoji: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(
        `/api/documents/${documentId}/comments/${commentId}/react?emoji=${encodeURIComponent(emoji)}`,
        { method: 'DELETE' }
      )

      const data = await res.json()

      if (data.success) {
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === commentId) {
              return {
                ...c,
                reactions: c.reactions.filter((r) => r.emoji !== emoji),
              }
            }
            // Check replies
            if (c.replies?.some((r) => r.id === commentId)) {
              return {
                ...c,
                replies: c.replies.map((r) =>
                  r.id === commentId
                    ? { ...r, reactions: r.reactions.filter((re) => re.emoji !== emoji) }
                    : r
                ),
              }
            }
            return c
          })
        )
        return true
      } else {
        setError(data.error || 'Failed to remove reaction')
        return false
      }
    } catch (err) {
      setError('Failed to remove reaction')
      console.error('Error removing reaction:', err)
      return false
    }
  }, [documentId])

  // Utility: Get open comments
  const getOpenComments = useCallback(() => {
    return comments.filter((c) => !c.isResolved)
  }, [comments])

  // Utility: Get resolved comments
  const getResolvedComments = useCallback(() => {
    return comments.filter((c) => c.isResolved)
  }, [comments])

  // Utility: Get comment by ID
  const getCommentById = useCallback((id: string) => {
    // Check top-level comments
    const comment = comments.find((c) => c.id === id)
    if (comment) return comment

    // Check replies
    for (const c of comments) {
      const reply = c.replies?.find((r) => r.id === id)
      if (reply) return reply
    }

    return undefined
  }, [comments])

  // Utility: Get comments that overlap with a position range
  const getCommentsByPosition = useCallback((from: number, to: number) => {
    return comments.filter((c) => {
      if (!c.position) return false
      // Check if ranges overlap
      return c.position.from <= to && c.position.to >= from
    })
  }, [comments])

  return {
    comments,
    isLoading,
    error,
    fetchComments,
    addComment,
    addReply,
    editComment,
    deleteComment,
    resolveComment,
    unresolveComment,
    addReaction,
    removeReaction,
    getOpenComments,
    getResolvedComments,
    getCommentById,
    getCommentsByPosition,
  }
}

export default useDocumentComments
