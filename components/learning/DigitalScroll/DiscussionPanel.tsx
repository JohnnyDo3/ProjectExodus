'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, Trash2, GripVertical } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Pusher from 'pusher-js'
import { cn } from '@/lib/utils/cn'
import { formatDistanceToNow } from 'date-fns'

interface Discussion {
  id: string
  topicId: string
  chapterId: number | null
  content: string
  createdAt: string
  user: {
    id: string
    name: string | null
    image: string | null
  }
}

interface DiscussionPanelProps {
  topicId: string
  topicTitle: string
  chapterId?: number
  isOpen: boolean
  onClose: () => void
}

export function DiscussionPanel({
  topicId,
  topicTitle,
  chapterId,
  isOpen,
  onClose,
}: DiscussionPanelProps) {
  const { data: session } = useSession()
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Draggable state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  // Fetch discussions
  const fetchDiscussions = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({ topicId })
      if (chapterId !== undefined) {
        params.append('chapterId', chapterId.toString())
      }

      const res = await fetch(`/api/scroll-discussions?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      setDiscussions(data.discussions.reverse()) // Oldest first
      setError(null)
    } catch (err) {
      setError('Failed to load discussions')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [topicId, chapterId])

  // Initial fetch
  useEffect(() => {
    if (isOpen) {
      fetchDiscussions()
    }
  }, [isOpen, fetchDiscussions])

  // Pusher subscription
  useEffect(() => {
    if (!isOpen) return

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
    })

    const channelName = `scroll-discussion-${topicId}`
    const channel = pusher.subscribe(channelName)

    channel.bind('new-message', (newDiscussion: Discussion) => {
      setDiscussions(prev => [...prev, newDiscussion])
    })

    channel.bind('message-deleted', ({ id }: { id: string }) => {
      setDiscussions(prev => prev.filter(d => d.id !== id))
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(channelName)
      pusher.disconnect()
    }
  }, [isOpen, topicId])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [discussions])

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim() || !session?.user) return

    setIsSending(true)
    try {
      const res = await fetch('/api/scroll-discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId,
          chapterId,
          content: newMessage.trim(),
        }),
      })

      if (!res.ok) throw new Error('Failed to send')

      setNewMessage('')
      setError(null)
    } catch (err) {
      setError('Failed to send message')
      console.error(err)
    } finally {
      setIsSending(false)
    }
  }

  // Delete message
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `/api/scroll-discussions?id=${id}&topicId=${topicId}`,
        { method: 'DELETE' }
      )

      if (!res.ok) throw new Error('Failed to delete')
    } catch (err) {
      setError('Failed to delete message')
      console.error(err)
    }
  }

  // Handle drag
  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition(prev => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-50 w-80 h-96 bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--border)] flex flex-col overflow-hidden"
        style={{
          right: `calc(50% - 160px + ${position.x}px)`,
          bottom: `calc(10% - ${position.y}px)`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onMouseMove={handleDrag}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Header - draggable */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-[var(--muted)] border-b border-[var(--border)] cursor-move select-none"
          onMouseDown={() => setIsDragging(true)}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-[var(--muted-foreground)]" />
            <MessageCircle className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-medium text-[var(--foreground)]">
              Discussion
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[var(--background)] transition-colors"
          >
            <X className="w-4 h-4 text-[var(--muted-foreground)]" />
          </button>
        </div>

        {/* Topic info */}
        <div className="px-4 py-2 text-xs text-[var(--muted-foreground)] border-b border-[var(--border)]">
          {topicTitle}
          {chapterId !== undefined && ` · Chapter ${chapterId + 1}`}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
            </div>
          ) : discussions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageCircle className="w-8 h-8 text-[var(--muted-foreground)] mb-2" />
              <p className="text-sm text-[var(--muted-foreground)]">
                No messages yet
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                Start the conversation!
              </p>
            </div>
          ) : (
            discussions.map(discussion => {
              const isOwn = discussion.user.id === session?.user?.id

              return (
                <div
                  key={discussion.id}
                  className={cn(
                    'flex gap-2',
                    isOwn && 'flex-row-reverse'
                  )}
                >
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-[var(--muted)] flex items-center justify-center overflow-hidden shrink-0">
                    {discussion.user.image ? (
                      <img
                        src={discussion.user.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium text-[var(--muted-foreground)]">
                        {discussion.user.name?.[0]?.toUpperCase() || '?'}
                      </span>
                    )}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={cn(
                      'max-w-[200px] rounded-lg px-3 py-2 text-xs',
                      isOwn
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'bg-[var(--muted)] text-[var(--foreground)]'
                    )}
                  >
                    {!isOwn && (
                      <p className="font-medium mb-0.5 text-[var(--foreground)]">
                        {discussion.user.name || 'Anonymous'}
                      </p>
                    )}
                    <p className="leading-relaxed">{discussion.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={cn(
                        'text-[10px] opacity-70',
                        isOwn ? 'text-[var(--primary-foreground)]' : 'text-[var(--muted-foreground)]'
                      )}>
                        {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
                      </span>
                      {isOwn && (
                        <button
                          onClick={() => handleDelete(discussion.id)}
                          className="p-0.5 rounded hover:bg-white/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error message */}
        {error && (
          <div className="px-3 py-1 text-xs text-red-500 bg-red-500/10">
            {error}
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-[var(--border)]">
          {session?.user ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-[var(--muted)] border border-[var(--border)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                disabled={isSending}
                maxLength={2000}
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim() || isSending}
                className="p-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] disabled:opacity-50 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-center text-[var(--muted-foreground)]">
              Sign in to join the discussion
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
