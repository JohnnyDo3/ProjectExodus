'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  User,
  Send,
  Search,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'
import { ConversationPanel } from '@/components/messages/ConversationPanel'

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
    createdAt: string
    senderId: string
  } | null
  unreadCount: number
}

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedUserId = searchParams.get('user')

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [following, setFollowing] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [showNewConversation, setShowNewConversation] = useState(false)

  // Fetch conversations with unread counts
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/messages')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setConversations(data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    }
  }, [])

  // Fetch following for new conversations
  const fetchFollowing = useCallback(async () => {
    try {
      const res = await fetch('/api/users/following')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setFollowing(data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching following:', error)
    }
  }, [])

  useEffect(() => {
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/messages')
      return
    }

    const loadData = async () => {
      await Promise.all([fetchConversations(), fetchFollowing()])
      setIsLoading(false)
    }
    loadData()
  }, [session?.user, fetchConversations, fetchFollowing, router])

  // Handle pre-selected user from URL parameter
  useEffect(() => {
    if (preSelectedUserId) {
      setSelectedUserId(preSelectedUserId)
      window.history.replaceState({}, '', '/messages')
    }
  }, [preSelectedUserId])

  // Refresh conversations when coming back from a chat
  const handleBack = useCallback(() => {
    setSelectedUserId(null)
    fetchConversations()
  }, [fetchConversations])

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  // Filter contacts for new conversation (exclude existing conversations)
  const existingPartnerIds = new Set(conversations.map(c => c.partner.id))
  const availableContacts = following.filter(f => !existingPartnerIds.has(f.id))

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      conv.partner.name?.toLowerCase().includes(query) ||
      conv.partner.email?.toLowerCase().includes(query) ||
      conv.latestMessage?.content.toLowerCase().includes(query)
    )
  })

  const filteredContacts = availableContacts.filter((contact) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      contact.name?.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query)
    )
  })

  const handleSelectConversation = (partnerId: string) => {
    setSelectedUserId(partnerId)
    setShowNewConversation(false)
    // Mark as read locally
    setConversations(prev =>
      prev.map(c =>
        c.partner.id === partnerId ? { ...c, unreadCount: 0 } : c
      )
    )
  }

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  if (status === 'loading' || isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[var(--background)]">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-[var(--primary)]/95 via-[var(--accent)]/95 to-[var(--secondary)]/95 backdrop-blur-sm border-b-2 border-theme-primary">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Send className="w-6 h-6 text-white" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-white">MESSAGES</h1>
                  {totalUnread > 0 && (
                    <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-bold rounded-full">
                      {totalUnread} unread
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-white/70">
                  Connect with your network
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Internal scroll only */}
      <div className="flex-1 flex gap-3 sm:gap-4 p-3 sm:p-4 overflow-hidden min-h-0">
        {/* Contacts/Conversations Sidebar */}
        <div className={`${selectedUserId ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 h-full flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg overflow-hidden flex-shrink-0`}>
          {/* Tab Header */}
          <div className="p-4 border-b border-[var(--border)] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setShowNewConversation(false)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                  !showNewConversation
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/10'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 inline mr-1" />
                Chats {totalUnread > 0 && `(${totalUnread})`}
              </button>
              <button
                onClick={() => setShowNewConversation(true)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                  showNewConversation
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/10'
                }`}
              >
                <User className="w-3.5 h-3.5 inline mr-1" />
                New Chat
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
              <input
                type="text"
                placeholder={showNewConversation ? 'Search contacts...' : 'Search conversations...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--foreground)] placeholder-theme-muted focus:outline-none focus:border-theme-primary"
              />
            </div>
          </div>

          {/* List - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {showNewConversation ? (
              // New Conversation - Show contacts
              filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => handleSelectConversation(contact.id)}
                    className="w-full p-4 border-b border-[var(--border)] hover:bg-[var(--primary)]/10 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                        {contact.image ? (
                          <Image src={contact.image} alt={contact.name} fill unoptimized sizes="100%" className="rounded-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-[var(--foreground)] truncate">
                          {contact.name || 'Anonymous'}
                        </p>
                        <p className="text-xs font-medium text-theme-muted truncate">
                          {contact.headline || contact.bio || 'Member'}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center">
                  <Users className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                  <p className="text-xs font-bold text-theme-muted mb-2">
                    {searchQuery ? 'No contacts found' : 'All contacts have conversations'}
                  </p>
                </div>
              )
            ) : (
              // Existing Conversations
              filteredConversations.length > 0 ? (
                filteredConversations.map(conv => (
                  <button
                    key={conv.partner.id}
                    onClick={() => handleSelectConversation(conv.partner.id)}
                    className={`w-full p-4 border-b border-[var(--border)] hover:bg-[var(--primary)]/10 transition-colors text-left group ${
                      selectedUserId === conv.partner.id ? 'bg-[var(--primary)]/15 border-l-4 border-l-[var(--primary)]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                          {conv.partner.image ? (
                            <Image src={conv.partner.image} alt={conv.partner.name || ''} fill unoptimized sizes="100%" className="rounded-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        {/* Unread badge */}
                        {conv.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--secondary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-black truncate ${
                            conv.unreadCount > 0 ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]'
                          }`}>
                            {conv.partner.name || 'Anonymous'}
                          </p>
                          {conv.latestMessage && (
                            <span className="text-[10px] font-medium text-theme-muted ml-2 flex-shrink-0">
                              {formatTime(conv.latestMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        {conv.latestMessage && (
                          <p className={`text-xs truncate ${
                            conv.unreadCount > 0 ? 'font-bold text-[var(--foreground)]' : 'font-medium text-theme-muted'
                          }`}>
                            {conv.latestMessage.senderId === session.user.id ? 'You: ' : ''}
                            {conv.latestMessage.content}
                          </p>
                        )}
                      </div>
                      {selectedUserId === conv.partner.id ? (
                        <Check className="w-4 h-4 text-theme-primary" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                  <p className="text-xs font-bold text-theme-muted mb-2">
                    {searchQuery ? 'No conversations found' : 'No conversations yet'}
                  </p>
                  <button
                    onClick={() => setShowNewConversation(true)}
                    className="text-xs font-bold text-theme-primary hover:underline"
                  >
                    Start a new chat
                  </button>
                </div>
              )
            )}
          </div>

          {/* Grow Network Section */}
          <div className="p-4 border-t-2 border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/5 to-transparent flex-shrink-0">
            <Link href="/network#members-grid">
              <div className="p-3 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-xs font-black text-white">Grow Your Network</p>
                      <p className="text-[10px] font-medium text-white/80">
                        Connect with more people
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Conversation Panel */}
        <div className={`${selectedUserId ? 'flex' : 'hidden md:flex'} flex-1 h-full bg-[var(--card)] rounded-2xl border-2 border-theme-accent shadow-lg overflow-hidden`}>
          {selectedUserId ? (
            <div className="w-full h-full">
              <ConversationPanel
                userId={selectedUserId}
                onBack={handleBack}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-theme-primary" />
                </div>
                <h2 className="text-xl font-black text-[var(--foreground)] mb-3">
                  Start a Conversation
                </h2>
                <p className="text-sm font-medium text-theme-muted mb-6">
                  Select a chat from the list or start a new conversation with someone from your network.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs font-bold text-theme-muted">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Real-time
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Secure
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Private
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
