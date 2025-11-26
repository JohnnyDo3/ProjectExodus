'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Send, UserPlus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ProfileColumn } from '@/components/profile/ProfileColumn'
import { use } from 'react'

interface Props {
  params: Promise<{
    userId: string
  }>
}

export default function UserProfilePage({ params }: Props) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { userId } = use(params)

  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (!session?.user) {
      router.push(`/auth/signin?callbackUrl=/profile/${userId}`)
      return
    }

    // Check if already following this user
    const checkFollowStatus = async () => {
      try {
        const res = await fetch(`/api/users/following`)
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            const following = data.data || []
            setIsFollowing(following.some((u: any) => u.id === userId))
          }
        }
      } catch (error) {
        console.error('Error checking follow status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkFollowStatus()
  }, [session?.user, userId, router])

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const res = await fetch('/api/users/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (res.ok) {
        setIsFollowing(true)
      }
    } catch (error) {
      console.error('Error connecting with user:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleMessage = () => {
    router.push(`/messages?user=${userId}`)
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Don't show message/connect buttons if viewing own profile
  const isOwnProfile = session.user?.id === userId

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/my-network"
          className="inline-flex items-center gap-2 text-sm font-bold text-theme-muted hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Network
        </Link>

        <div className="flex gap-6 items-start">
          {/* Profile Column - Full Width */}
          <div className="flex-1">
            <ProfileColumn viewOnly={true} userId={userId} />
          </div>

          {/* Action Buttons - Fixed Sidebar */}
          {!isOwnProfile && (
            <div className="w-64 sticky top-8 space-y-3">
              {/* Message Button */}
              <button
                onClick={handleMessage}
                className="w-full py-3 px-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>

              {/* Connect Button */}
              {!isFollowing && (
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full py-3 px-4 bg-[var(--muted)] hover:bg-[var(--primary)]/20 border-2 border-[var(--border)] text-[var(--foreground)] rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4" />
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              )}

              {/* Already Connected Badge */}
              {isFollowing && (
                <div className="w-full py-3 px-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 text-green-600 dark:text-green-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Connected
                </div>
              )}

              {/* Profile Tips */}
              <div className="p-4 bg-[var(--muted)]/50 rounded-xl border border-[var(--border)]">
                <h3 className="text-xs font-black text-[var(--foreground)] mb-2">
                  DIGITAL BUSINESS CARD
                </h3>
                <p className="text-[10px] font-medium text-theme-muted leading-relaxed">
                  This is a digital business card showcasing this user's professional profile
                  and contributions to Project Exodus.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
