'use client'

import { BackButton } from '@/components/navigation/BackButton'
import { useState, useEffect, useRef, use, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  ArrowLeft,
  Send,
  User,
  MapPin,
  Lock,
  Loader2,
  Zap,
  Bell,
  X,
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

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  read: boolean
  createdAt: string
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

export default function ConversationPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)
  const { data: session } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [otherUser, setOtherUser] = useState<OtherUser | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [notification, setNotification] = useState<{ message: string; senderName: string } | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

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

  // Scroll to bottom of messages container (not the page)
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [])

  const fetchConversation = async () => {
    try {
      const res = await fetch(`/api/messages/conversations/${userId}`)
      const data = await res.json()

      if (data.success) {
        setMessages(data.data.messages)
        setOtherUser(data.data.otherUser)
      } else if (data.error === 'Unauthorized - Please sign in to view messages') {
        router.push('/auth/signin?callbackUrl=/messages')
      }
    } catch (error) {
      console.error('Error fetching conversation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/messages')
      return
    }

    // Initial fetch
    fetchConversation()

    // ⚡ REAL-TIME: Subscribe to Pusher for instant message delivery
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

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const res = await fetch(`/api/messages/conversations/${userId}`, {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading conversation...</p>
        </div>
      </div>
    )
  }

  if (!otherUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="border-4 border-theme-secondary">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-black mb-4 text-theme-muted">USER NOT FOUND</h2>
            <p className="text-lg font-semibold mb-8 text-theme-muted">
              This user doesn't exist or has been removed.
            </p>
            <Link href="/messages">
              <Button className="font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO MESSAGES
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Notification Toast */}
      {notification && (
        <MessageNotification
          message={notification.message}
          senderName={notification.senderName}
          onDismiss={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <section className="py-6 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))] border-b-4 border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Messages" fallbackUrl="/messages" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Link href="/messages">
              <Button variant="ghost" className="mb-4 font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                BACK TO MESSAGES
              </Button>
            </Link>

            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                {otherUser.image ? (
                  <img
                    src={otherUser.image}
                    alt={otherUser.name || 'User'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-[var(--primary-foreground)]" />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-black text-[var(--foreground)]">
                  {otherUser.name || 'Anonymous'}
                </h1>
                {otherUser.location && (
                  <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-theme-muted">
                    <MapPin className="w-4 h-4" />
                    {otherUser.location}
                  </div>
                )}
              </div>

              {/* Status Badges */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent text-sm font-black">
                  <Lock className="w-4 h-4" />
                  SECURE
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] text-theme-primary text-sm font-black">
                  <Zap className="w-4 h-4 animate-pulse" />
                  REAL-TIME
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="flex-1 py-8 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto bg-[var(--muted)] rounded-lg p-6 space-y-4 min-h-[500px] max-h-[600px]"
            >
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <Send className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-bold text-theme-muted">No messages yet</p>
                  <p className="text-sm font-medium text-theme-muted mt-2">
                    Start the conversation with {otherUser.name || 'this user'}!
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isOwnMessage = msg.senderId === session?.user?.id

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                        {isOwnMessage ? (
                          session?.user?.image ? (
                            <img
                              src={session.user.image}
                              alt="You"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                          )
                        ) : otherUser.image ? (
                          <img
                            src={otherUser.image}
                            alt={otherUser.name || 'User'}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-[var(--primary-foreground)]" />
                        )}
                      </div>

                      <div className={`flex-1 ${isOwnMessage ? 'text-right' : ''}`}>
                        <div
                          className={`inline-block p-3 rounded-lg max-w-[80%] ${
                            isOwnMessage
                              ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                              : 'bg-[var(--background)] text-[var(--foreground)]'
                          } font-semibold break-words`}
                        >
                          {msg.content}
                        </div>
                        <p className="text-xs font-medium text-theme-muted mt-1">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Message Input */}
      <section className="py-6 border-t-4 border-[var(--border)] bg-[var(--card)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isSending}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={isSending || !newMessage.trim()}
                className="font-bold px-6"
              >
                {isSending ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                SEND
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
