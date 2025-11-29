'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  MessageCircle,
  Send,
  User,
  Inbox,
  Search,
  Lock,
} from 'lucide-react'
import Link from 'next/link'

interface Conversation {
  partner: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
  latestMessage: {
    id: string
    content: string
    senderId: string
    receiverId: string
    createdAt: string
    read: boolean
  } | null
  unreadCount: number
}

export default function MessagesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/messages')
      return
    }

    fetchConversations()
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchConversations, 5000)
    return () => clearInterval(interval)
  }, [session?.user])

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/messages')
      const data = await res.json()

      if (data.success) {
        setConversations(data.data)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      conv.partner.name?.toLowerCase().includes(query) ||
      conv.partner.email.toLowerCase().includes(query) ||
      conv.latestMessage?.content.toLowerCase().includes(query)
    )
  })

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-[color-mix(in_srgb,var(--secondary)_15%,var(--background))] via-[color-mix(in_srgb,var(--primary)_15%,var(--background))] to-[color-mix(in_srgb,var(--accent)_15%,var(--background))]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] font-black text-sm uppercase mb-6">
              <MessageCircle className="w-5 h-5" />
              DIRECT MESSAGES
            </div>
            <h1 className="text-5xl font-black mb-4 text-[var(--foreground)]">
              YOUR CONVERSATIONS
            </h1>
            <p className="text-xl font-semibold text-theme-muted max-w-2xl mx-auto mb-6">
              Private and secure messaging with your network
            </p>

            {/* Security Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,var(--background))] text-theme-accent text-sm font-black">
              <Lock className="w-4 h-4" />
              END-TO-END SECURE
            </div>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-black text-theme-primary">{conversations.length}</p>
                <p className="text-sm font-bold text-theme-muted uppercase">Conversations</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-theme-accent">{totalUnread}</p>
                <p className="text-sm font-bold text-theme-muted uppercase">Unread</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 border-b-4 border-[var(--border)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold focus:border-theme-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conversations List */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredConversations.length === 0 ? (
              <Card className="border-4 border-theme-secondary">
                <CardContent className="p-12 text-center">
                  <Inbox className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-black mb-2 text-theme-muted">
                    {searchQuery ? 'NO CONVERSATIONS FOUND' : 'NO MESSAGES YET'}
                  </h3>
                  <p className="text-lg font-semibold text-theme-muted mb-6">
                    {searchQuery
                      ? 'Try a different search term'
                      : 'Start connecting with people from the network!'}
                  </p>
                  {!searchQuery && (
                    <Link href="/network">
                      <Button className="font-bold">
                        <User className="w-4 h-4 mr-2" />
                        BROWSE NETWORK
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredConversations.map((conversation) => {
                  const isUnread = conversation.unreadCount > 0
                  const isSentByMe = conversation.latestMessage?.senderId === session?.user?.id

                  return (
                    <Link
                      key={conversation.partner.id}
                      href={`/messages/${conversation.partner.id}`}
                    >
                      <Card
                        className={`border-4 transition-all cursor-pointer hover:border-theme-accent ${
                          isUnread
                            ? 'border-theme-primary bg-[color-mix(in_srgb,var(--primary)_5%,var(--background))]'
                            : 'border-theme-secondary'
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0 relative">
                              {conversation.partner.image ? (
                                <img
                                  src={conversation.partner.image}
                                  alt={conversation.partner.name || 'User'}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-8 h-8 text-[var(--primary-foreground)]" />
                              )}
                              {isUnread && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--accent)] border-2 border-[var(--background)] flex items-center justify-center">
                                  <span className="text-xs font-black text-[var(--primary-foreground)]">
                                    {conversation.unreadCount}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Message Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3
                                  className={`text-xl font-black truncate ${
                                    isUnread ? 'text-theme-primary' : 'text-[var(--foreground)]'
                                  }`}
                                >
                                  {conversation.partner.name || 'Anonymous'}
                                </h3>
                                {conversation.latestMessage && (
                                  <span className="text-sm font-semibold text-theme-muted flex-shrink-0">
                                    {new Date(conversation.latestMessage.createdAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>

                              {conversation.latestMessage && (
                                <p
                                  className={`text-sm font-semibold truncate ${
                                    isUnread ? 'text-[var(--foreground)]' : 'text-theme-muted'
                                  }`}
                                >
                                  {isSentByMe && (
                                    <span className="text-theme-accent font-black mr-1">YOU: </span>
                                  )}
                                  {conversation.latestMessage.content}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
