'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import {
  Send,
  User,
  MapPin,
  Lock,
  Loader2,
  Zap,
  Bell,
  X,
  ArrowLeft,
  Check,
  CheckCheck,
  Pencil,
  Trash2,
  Smile,
  MoreVertical,
} from 'lucide-react'
import Link from 'next/link'
import { getPusherClient } from '@/lib/pusher'

// Notification toast component
function MessageNotification({
  message,
  senderName,
  onDismiss
}: {
  message: string
  senderName: string
  onDismiss: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-right fade-in duration-300">
      <div className="bg-[var(--card)] border-2 border-[var(--primary)] rounded-xl shadow-2xl p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[var(--foreground)]">
              New message from {senderName}
            </p>
            <p className="text-xs text-[var(--foreground)]/70 mt-1 line-clamp-2">
              {message}
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg hover:bg-[var(--muted)] transition-colors"
          >
            <X className="w-4 h-4 text-[var(--foreground)]/50" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface MessageReaction {
  id: string
  emoji: string
  userId: string
  user?: { name: string | null }
}

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  read: boolean
  createdAt: string
  editedAt?: string | null
  deletedAt?: string | null
  reactions?: MessageReaction[]
  sender: {
    id: string
    name: string | null
    image: string | null
  }
  receiver: {
    id: string
    name: string | null
    image: string | null
  }
}

interface OtherUser {
  id: string
  name: string | null
  email: string
  image: string | null
  bio: string | null
  location: string | null
}

interface ConversationPanelProps {
  userId: string
  onBack?: () => void
}

export function ConversationPanel({ userId, onBack }: ConversationPanelProps) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [otherUser, setOtherUser] = useState<OtherUser | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [notification, setNotification] = useState<{ message: string; senderName: string } | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const [readMessageIds, setReadMessageIds] = useState<Set<string>>(new Set())
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1

      oscillator.start()
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {
      // Audio not supported, ignore
    }
  }, [])

  // Scroll to bottom of messages container
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [])

  // Send typing indicator via Pusher
  const sendTypingIndicator = useCallback(async (typing: boolean) => {
    if (!session?.user?.id) return
    try {
      await fetch('/api/messages/typing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientId: userId, typing }),
      })
    } catch {
      // Ignore typing indicator failures
    }
  }, [session?.user?.id, userId])

  // Handle input change with typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)

    // Send typing indicator
    if (e.target.value) {
      sendTypingIndicator(true)

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Stop typing after 2 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingIndicator(false)
      }, 2000)
    } else {
      sendTypingIndicator(false)
    }
  }

  // Delete message
  const handleDeleteMessage = async (messageId: string) => {
    try {
      const res = await fetch(`/api/messages/${messageId}`, { method: 'DELETE' })
      if (res.ok) {
        setMessages(prev => prev.map(msg =>
          msg.id === messageId ? { ...msg, content: '[Message deleted]', deletedAt: new Date().toISOString() } : msg
        ))
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
    setActiveMenuId(null)
  }

  // Start editing message
  const startEditMessage = (msg: Message) => {
    setEditingMessageId(msg.id)
    setEditContent(msg.content)
    setActiveMenuId(null)
  }

  // Save edited message
  const handleSaveEdit = async () => {
    if (!editingMessageId || !editContent.trim()) return

    try {
      const res = await fetch(`/api/messages/${editingMessageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent.trim() }),
      })

      if (res.ok) {
        setMessages(prev => prev.map(msg =>
          msg.id === editingMessageId
            ? { ...msg, content: editContent.trim(), editedAt: new Date().toISOString() }
            : msg
        ))
      }
    } catch (error) {
      console.error('Failed to edit message:', error)
    }

    setEditingMessageId(null)
    setEditContent('')
  }

  // Add reaction to message
  const handleAddReaction = async (messageId: string, emoji: string) => {
    try {
      await fetch(`/api/messages/${messageId}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji }),
      })
      // Refresh to get updated reactions
      fetchConversation()
    } catch (error) {
      console.error('Failed to add reaction:', error)
    }
  }

  const fetchConversation = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/messages/${userId}`)
      const data = await res.json()

      if (data.success) {
        setMessages(data.data.messages)
        setOtherUser(data.data.otherUser)
      }
    } catch (error) {
      console.error('Error fetching conversation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!session?.user || !userId) return

    // Reset state when userId changes
    setMessages([])
    setOtherUser(null)

    // Initial fetch
    fetchConversation()

    // Real-time: Subscribe to Pusher for instant message delivery
    const pusher = getPusherClient()
    if (!pusher) return

    const channel = pusher.subscribe(`private-chat-${session.user.id}`)

    channel.bind('new-message', (data: { message: Message; timestamp: string }) => {
      // Only add message if it's from the current conversation
      if (data.message.senderId === userId || data.message.receiverId === userId) {
        setMessages((prev) => {
          // Prevent duplicates
          if (prev.some(msg => msg.id === data.message.id)) return prev
          return [...prev, data.message]
        })

        // Show notification and play sound for incoming messages (not from self)
        if (data.message.senderId !== session?.user?.id) {
          playNotificationSound()
          setNotification({
            message: data.message.content,
            senderName: data.message.sender?.name || 'Someone'
          })
        }
      }
    })

    // Listen for typing indicators
    channel.bind('typing', (data: { senderId: string; typing: boolean }) => {
      if (data.senderId === userId) {
        setIsTyping(data.typing)
      }
    })

    // Listen for read receipts
    channel.bind('message-read', (data: { messageIds: string[]; readerId: string }) => {
      if (data.readerId === userId) {
        setReadMessageIds(prev => {
          const newSet = new Set(prev)
          data.messageIds.forEach(id => newSet.add(id))
          return newSet
        })
      }
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [session?.user, userId, playNotificationSound])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    const messageToSend = newMessage.trim()
    setNewMessage('') // Clear input immediately for better UX

    try {
      const res = await fetch(`/api/messages/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: messageToSend }),
      })

      const data = await res.json()
      if (data.success) {
        // Refresh messages to show the new one
        fetchConversation()
      } else {
        alert(data.error || 'Failed to send message')
        setNewMessage(messageToSend) // Restore message on error
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
      setNewMessage(messageToSend) // Restore message on error
    } finally {
      setIsSending(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-theme-muted">Loading conversation...</p>
        </div>
      </div>
    )
  }

  if (!otherUser) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8">
          <User className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-black mb-2 text-theme-muted">User Not Found</h2>
          <p className="text-sm font-medium text-theme-muted">
            This user doesn't exist or has been removed.
          </p>
          {onBack && (
            <Button onClick={onBack} className="mt-4 font-bold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Notification Toast */}
      {notification && (
        <MessageNotification
          message={notification.message}
          senderName={notification.senderName}
          onDismiss={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2 md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
            {otherUser.image ? (
              <img
                src={otherUser.image}
                alt={otherUser.name || 'User'}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-[var(--foreground)] truncate">
              {otherUser.name || 'Anonymous'}
            </h2>
            {otherUser.location && (
              <div className="flex items-center gap-1 text-xs font-medium text-theme-muted">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{otherUser.location}</span>
              </div>
            )}
          </div>

          {/* Status Badges */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--accent)]/20 text-theme-accent text-xs font-bold">
              <Lock className="w-3 h-3" />
              Secure
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--primary)]/20 text-theme-primary text-xs font-bold">
              <Zap className="w-3 h-3 animate-pulse" />
              Live
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--muted)]/50"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Send className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
              <p className="text-sm font-bold text-theme-muted">No messages yet</p>
              <p className="text-xs font-medium text-theme-muted mt-1">
                Start the conversation with {otherUser.name || 'this user'}!
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === session?.user?.id
            const isDeleted = !!msg.deletedAt
            const isEditing = editingMessageId === msg.id
            const isRead = msg.read || readMessageIds.has(msg.id)

            return (
              <div
                key={msg.id}
                className={`flex gap-2 group ${isOwnMessage ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  {isOwnMessage ? (
                    session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="You"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )
                  ) : otherUser.image ? (
                    <img
                      src={otherUser.image}
                      alt={otherUser.name || 'User'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className={`flex-1 max-w-[75%] ${isOwnMessage ? 'text-right' : ''}`}>
                  {/* Message bubble with actions */}
                  <div className="relative inline-block">
                    {isEditing ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                          className="px-3 py-2 rounded-lg border-2 border-theme-primary bg-[var(--background)] text-[var(--foreground)] text-sm"
                          autoFocus
                        />
                        <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingMessageId(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`inline-block p-3 rounded-2xl ${
                            isDeleted
                              ? 'bg-[var(--muted)] text-theme-muted italic'
                              : isOwnMessage
                              ? 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-tr-sm'
                              : 'bg-[var(--card)] text-[var(--foreground)] rounded-tl-sm border border-[var(--border)]'
                          } text-sm font-medium break-words`}
                        >
                          {msg.content}
                        </div>

                        {/* Actions menu for own messages */}
                        {isOwnMessage && !isDeleted && (
                          <div className="absolute top-0 right-full mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="relative">
                              <button
                                onClick={() => setActiveMenuId(activeMenuId === msg.id ? null : msg.id)}
                                className="p-1 rounded hover:bg-[var(--muted)]"
                              >
                                <MoreVertical className="w-4 h-4 text-theme-muted" />
                              </button>
                              {activeMenuId === msg.id && (
                                <div className="absolute right-0 top-full mt-1 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg py-1 z-10 min-w-[100px]">
                                  <button
                                    onClick={() => startEditMessage(msg)}
                                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                                  >
                                    <Pencil className="w-3 h-3" /> Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2 text-red-500"
                                  >
                                    <Trash2 className="w-3 h-3" /> Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Quick reactions */}
                        {!isDeleted && (
                          <div className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${isOwnMessage ? 'left-full ml-1' : 'right-full mr-1'}`}>
                            <div className="flex gap-0.5 bg-[var(--card)] rounded-full px-1 py-0.5 shadow border border-[var(--border)]">
                              {['👍', '❤️', '😂'].map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => handleAddReaction(msg.id, emoji)}
                                  className="p-1 hover:bg-[var(--muted)] rounded text-xs"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Reactions display */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={`flex gap-1 mt-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                      {Object.entries(
                        msg.reactions.reduce((acc, r) => {
                          acc[r.emoji] = (acc[r.emoji] || 0) + 1
                          return acc
                        }, {} as Record<string, number>)
                      ).map(([emoji, count]) => (
                        <span
                          key={emoji}
                          className="px-1.5 py-0.5 bg-[var(--muted)] rounded-full text-xs"
                        >
                          {emoji} {count > 1 && count}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Timestamp, edited label, and read receipt */}
                  <div className={`flex items-center gap-1.5 mt-1 px-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    <p className="text-[10px] font-medium text-theme-muted">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {msg.editedAt && !isDeleted && (
                      <span className="text-[10px] text-theme-muted italic">(edited)</span>
                    )}
                    {isOwnMessage && !isDeleted && (
                      <span className="text-theme-muted">
                        {isRead ? (
                          <CheckCheck className="w-3 h-3 text-theme-primary" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="px-4 py-2 bg-[var(--muted)]/50">
          <div className="flex items-center gap-2 text-xs font-medium text-theme-muted">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-theme-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-theme-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-theme-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>{otherUser?.name || 'User'} is typing...</span>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isSending}
            className="flex-1 px-4 py-2.5 rounded-full border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-medium focus:border-theme-primary focus:outline-none transition-colors disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="font-bold rounded-full px-4"
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
