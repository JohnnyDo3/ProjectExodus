'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  User,
  Send,
  Search,
  Users,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedUserId = searchParams.get('user')

  const [following, setFollowing] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/messages')
      return
    }

    fetchFollowing()
  }, [session?.user])

  // Handle pre-selected user from URL parameter - redirect to conversation
  useEffect(() => {
    if (preSelectedUserId) {
      router.push(`/messages/${preSelectedUserId}`)
    }
  }, [preSelectedUserId, router])

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
    } finally {
      setIsLoading(false)
    }
  }

  const filteredContacts = following.filter((contact) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      contact.name?.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query) ||
      contact.bio?.toLowerCase().includes(query)
    )
  })

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
              <Send className="w-6 h-6 text-white" />
              <div>
                <h1 className="text-xl font-black text-white">MESSAGES</h1>
                <p className="text-xs font-medium text-white/70">
                  Connect with your network
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
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-theme-primary" />
              <h2 className="text-sm font-black text-[var(--foreground)]">YOUR CONTACTS</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--foreground)] placeholder-theme-muted focus:outline-none focus:border-theme-primary"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <Link
                  key={contact.id}
                  href={`/messages/${contact.id}`}
                  className="w-full p-4 border-b border-[var(--border)] hover:bg-[var(--primary)]/10 transition-colors text-left block group"
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
                    <ArrowRight className="w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-6 text-center">
                <User className="w-12 h-12 text-theme-muted mx-auto mb-3 opacity-50" />
                <p className="text-xs font-bold text-theme-muted mb-2">
                  {searchQuery ? 'No contacts found' : 'No connections yet'}
                </p>
              </div>
            )}
          </div>

          {/* Build Your Network Section */}
          <div className="p-4 border-t-2 border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
            <Link href="/my-network">
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

        {/* Info Panel */}
        <div className="flex-1 h-full flex flex-col bg-[var(--card)] rounded-2xl border-2 border-theme-accent shadow-lg overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-theme-primary" />
              </div>
              <h2 className="text-xl font-black text-[var(--foreground)] mb-3">
                Start a Conversation
              </h2>
              <p className="text-sm font-medium text-theme-muted mb-6">
                Select a contact from your network to begin messaging.
                Your conversations are private and secure.
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
        </div>
      </div>
    </div>
  )
}
