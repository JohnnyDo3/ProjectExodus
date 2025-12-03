'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  User,
  Send,
  Search,
  MoreVertical,
  Users,
  ArrowRight,
  MessageCircle,
  Check,
  CheckCheck,
  Clock,
} from 'lucide-react'
import Link from 'next/link'

interface Conversation {
  partner: {
    id: string
    name: string | null
    email: string | null
    image: string | null
    bio?: string
    headline?: string
  }
  latestMessage: {
    id: string
    content: string
    createdAt: string
    senderId: string
    read: boolean
  } | null
  unreadCount: number
}

interface Message {
  id: string
  content: string
  createdAt: string
  senderId: string
  receiverId: string
  read: boolean
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

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedUserId = searchParams.get('user')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [following, setFollowing] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [messageContent, setMessageContent] = useState('')
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [activeTab, setActiveTab] = useState<'conversations' | 'contacts'>('conversations')

  useEffect(() => {
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/messages')
      return
    }

    Promise.all([fetchConversations(), fetchFollowing()]).finally(() => setIsLoading(false))
  }, [session?.user])

  // Handle pre-selected user from URL parameter
  useEffect(() => {
    if (preSelectedUserId) {
      // Find in conversations first
      const fromConversation = conversations.find(c => c.partner.id === preSelectedUserId)
      if (fromConversation) {
        setSelectedContact(fromConversation.partner)
        setActiveTab('conversations')
      } else {
        // Find in following
        const fromFollowing = following.find(u => u.id === preSelectedUserId)
        if (fromFollowing) {
          setSelectedContact(fromFollowing)
          setActiveTab('contacts')
        }
      }
    }
  }, [preSelectedUserId, conversations, following])

  // Load messages when selecting a contact
  useEffect(() => {
    if (selectedContact?.id) {
      loadMessages(selectedContact.id)
    }
  }, [selectedContact?.id])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchConversations = async () => {
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
  }

  const fetchFollowing = async () => {
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
  }

  const loadMessages = async (userId: string) => {
    setIsLoadingMessages(true)
    try {
      const res = await fetch(`/api/messages/${userId}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setMessages(data.data.messages || [])
          // Update unread count in conversations list
          setConversations(prev => prev.map(c =>
            c.partner.id === userId ? { ...c, unreadCount: 0 } : c
          ))
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const sendMessage = async () => {
    if (!messageContent.trim() || !selectedContact?.id || isSending) return

    setIsSending(true)
    const content = messageContent.trim()
    setMessageContent('')

    try {
      const res = await fetch(`/api/messages/${selectedContact.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          // Add new message to list
          setMessages(prev => [...prev, data.data])

          // Update or add conversation
          setConversations(prev => {
            const existing = prev.find(c => c.partner.id === selectedContact.id)
            if (existing) {
              return prev.map(c =>
                c.partner.id === selectedContact.id
                  ? { ...c, latestMessage: data.data }
                  : c
              ).sort((a, b) => {
                const aTime = new Date(a.latestMessage?.createdAt || 0).getTime()
                const bTime = new Date(b.latestMessage?.createdAt || 0).getTime()
                return bTime - aTime
              })
            } else {
              return [{
                partner: selectedContact,
                latestMessage: data.data,
                unreadCount: 0
              }, ...prev]
            }
          })
        }
      } else {
        setMessageContent(content) // Restore message on error
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessageContent(content) // Restore message on error
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      conv.partner.name?.toLowerCase().includes(query) ||
      conv.partner.email?.toLowerCase().includes(query) ||
      conv.latestMessage?.content.toLowerCase().includes(query)
    )
  })

  const filteredContacts = following.filter((contact) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      contact.name?.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query) ||
      contact.bio?.toLowerCase().includes(query)
    )
  })

  const formatMessageTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  // Calculate total unread count
  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
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
    <div className="h-screen overflow-hidden bg-[var(--background)] hide-footer">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[var(--primary)]/95 via-[var(--accent)]/95 to-[var(--secondary)]/95 backdrop-blur-sm border-b-2 border-theme-primary">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Send className="w-6 h-6 text-white" />
                {totalUnread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {totalUnread > 9 ? '9+' : totalUnread}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-xl font-black text-white">MESSAGES</h1>
                <p className="text-xs font-medium text-white/70">
                  {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
                  {totalUnread > 0 && ` • ${totalUnread} unread`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-80px)] flex gap-4 p-6">
        {/* Contacts Sidebar */}
        <div className="w-1/3 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-primary shadow-lg overflow-hidden">
          <div className="p-4 border-b border-[var(--border)]">
            {/* Tabs */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setActiveTab('conversations')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-black transition-colors ${
                  activeTab === 'conversations'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Conversations
                {totalUnread > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[10px]">
                    {totalUnread}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-black transition-colors ${
                  activeTab === 'contacts'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/20'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Contacts
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
              <input
                type="text"
                placeholder={activeTab === 'conversations' ? "Search conversations..." : "Search contacts..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--foreground)] placeholder-theme-muted focus:outline-none focus:border-theme-primary"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto scrollbar-visible">
            {activeTab === 'conversations' ? (
              // Conversations List
              filteredConversations.length > 0 ? (
                filteredConversations.map(conv => (
                  <button
                    key={conv.partner.id}
                    onClick={() => setSelectedContact(conv.partner)}
                    className={`w-full p-4 border-b border-[var(--border)] hover:bg-[var(--muted)] transition-colors text-left ${
                      selectedContact?.id === conv.partner.id ? 'bg-[var(--primary)]/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                          {conv.partner.image ? (
                            <img
                              src={conv.partner.image}
                              alt={conv.partner.name || ''}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                            {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-black text-[var(--foreground)] truncate ${conv.unreadCount > 0 ? 'text-[var(--primary)]' : ''}`}>
                            {conv.partner.name || 'Anonymous'}
                          </p>
                          {conv.latestMessage && (
                            <span className="text-[10px] text-theme-muted font-medium">
                              {formatMessageTime(conv.latestMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        {conv.latestMessage && (
                          <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'font-bold text-[var(--foreground)]' : 'font-medium text-theme-muted'}`}>
                            {conv.latestMessage.senderId === session?.user?.id && (
                              <span className="inline-flex items-center mr-1">
                                {conv.latestMessage.read ? (
                                  <CheckCheck className="w-3 h-3 text-blue-500" />
                                ) : (
                                  <Check className="w-3 h-3 text-theme-muted" />
                                )}
                              </span>
                            )}
                            {conv.latestMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                  <p className="text-xs font-bold text-theme-muted mb-2">
                    {searchQuery ? 'No conversations found' : 'No conversations yet'}
                  </p>
                  <p className="text-[10px] text-theme-muted">
                    Start a conversation from the Contacts tab
                  </p>
                </div>
              )
            ) : (
              // Contacts List
              filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full p-4 border-b border-[var(--border)] hover:bg-[var(--muted)] transition-colors text-left ${
                      selectedContact?.id === contact.id ? 'bg-[var(--primary)]/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center flex-shrink-0">
                        {contact.image ? (
                          <img
                            src={contact.image}
                            alt={contact.name}
                            className="w-full h-full rounded-full object-cover"
                          />
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
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center">
                  <User className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                  <p className="text-xs font-bold text-theme-muted mb-2">
                    {searchQuery ? 'No contacts found' : 'No connections yet'}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Build Your Network Section */}
          <div className="p-4 border-t-2 border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
            <Link href="/network/browse">
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

        {/* Messenger Panel */}
        <div className="flex-1 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-accent shadow-lg overflow-hidden">
          {selectedContact ? (
            <>
              {/* Messenger Header */}
              <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-gradient-to-r from-[var(--accent)]/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                    {selectedContact.image ? (
                      <img
                        src={selectedContact.image}
                        alt={selectedContact.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[var(--foreground)]">
                      {selectedContact.name || 'Anonymous'}
                    </p>
                    <p className="text-xs font-medium text-theme-muted">
                      {selectedContact.headline || selectedContact.bio || 'Member'}
                    </p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-[var(--muted)] flex items-center justify-center transition-colors">
                  <MoreVertical className="w-5 h-5 text-theme-muted" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto scrollbar-visible p-4 space-y-3">
                {isLoadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-xs text-theme-muted">Loading messages...</p>
                    </div>
                  </div>
                ) : messages.length > 0 ? (
                  <>
                    {messages.map((msg, index) => {
                      const isMine = msg.senderId === session?.user?.id
                      const showTimestamp = index === 0 ||
                        new Date(msg.createdAt).getTime() - new Date(messages[index - 1].createdAt).getTime() > 300000 // 5 min gap

                      return (
                        <div key={msg.id}>
                          {showTimestamp && (
                            <div className="text-center my-4">
                              <span className="text-[10px] text-theme-muted bg-[var(--muted)] px-3 py-1 rounded-full">
                                {formatMessageTime(msg.createdAt)}
                              </span>
                            </div>
                          )}
                          <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] ${isMine ? 'order-2' : ''}`}>
                              <div
                                className={`px-4 py-2 rounded-2xl ${
                                  isMine
                                    ? 'bg-[var(--primary)] text-white rounded-br-sm'
                                    : 'bg-[var(--muted)] text-[var(--foreground)] rounded-bl-sm'
                                }`}
                              >
                                <p className="text-sm">{msg.content}</p>
                              </div>
                              <div className={`flex items-center gap-1 mt-0.5 ${isMine ? 'justify-end' : ''}`}>
                                <span className="text-[9px] text-theme-muted">
                                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {isMine && (
                                  msg.read ? (
                                    <CheckCheck className="w-3 h-3 text-blue-500" />
                                  ) : (
                                    <Check className="w-3 h-3 text-theme-muted" />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                      <p className="text-sm font-bold text-theme-muted mb-1">
                        Start a conversation
                      </p>
                      <p className="text-xs text-theme-muted">
                        Send a message to {selectedContact.name || 'this user'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    disabled={isSending}
                    className="flex-1 px-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--foreground)] placeholder-theme-muted focus:outline-none focus:border-theme-primary disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!messageContent.trim() || isSending}
                    className="px-6 py-2 bg-[var(--primary)] text-white rounded-xl font-bold text-sm hover:bg-[var(--accent)] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <Clock className="w-4 h-4 animate-pulse" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-theme-muted mx-auto mb-4 opacity-50" />
                <p className="text-sm font-bold text-theme-muted mb-2">Select a conversation</p>
                <p className="text-xs font-medium text-theme-muted">
                  Choose from your conversations or start a new one
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
