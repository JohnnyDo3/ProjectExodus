'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { UserPlus, UserCheck, UserMinus, Check, X, Clock, Users } from 'lucide-react'

interface FollowConnectButtonsProps {
  userId: string
  variant?: 'default' | 'compact'
}

export default function FollowConnectButtons({ userId, variant = 'default' }: FollowConnectButtonsProps) {
  const { data: session } = useSession()
  const [isFollowing, setIsFollowing] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending_sent' | 'pending_received' | 'connected'>('none')
  const [connectionId, setConnectionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [connectionMessage, setConnectionMessage] = useState('')

  useEffect(() => {
    if (session?.user?.id && userId && userId !== session.user.id) {
      fetchStatus()
    }
  }, [session, userId])

  const fetchStatus = async () => {
    try {
      const [followRes, connectRes] = await Promise.all([
        fetch(`/api/users/${userId}/follow`),
        fetch(`/api/users/${userId}/connect`),
      ])

      const followData = await followRes.json()
      const connectData = await connectRes.json()

      if (followData.success) {
        setIsFollowing(followData.data.isFollowing)
      }

      if (connectData.success) {
        setConnectionStatus(connectData.data.status)
        setConnectionId(connectData.data.connectionId)
      }
    } catch (error) {
      console.error('Error fetching status:', error)
    }
  }

  const handleFollow = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
      })

      if (res.ok) {
        setIsFollowing(true)
      }
    } catch (error) {
      console.error('Error following user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnfollow = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setIsFollowing(false)
      }
    } catch (error) {
      console.error('Error unfollowing user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/users/${userId}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: connectionMessage || null }),
      })

      if (res.ok) {
        setConnectionStatus('pending_sent')
        setShowMessage(false)
        setConnectionMessage('')
      }
    } catch (error) {
      console.error('Error sending connection request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelRequest = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/users/${userId}/connect`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setConnectionStatus('none')
      }
    } catch (error) {
      console.error('Error canceling request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptConnection = async () => {
    if (!connectionId) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/connections/${connectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      })

      if (res.ok) {
        setConnectionStatus('connected')
      }
    } catch (error) {
      console.error('Error accepting connection:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRejectConnection = async () => {
    if (!connectionId) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/connections/${connectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject' }),
      })

      if (res.ok) {
        setConnectionStatus('none')
      }
    } catch (error) {
      console.error('Error rejecting connection:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/users/${userId}/connect`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setConnectionStatus('none')
      }
    } catch (error) {
      console.error('Error disconnecting:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Don't show buttons if viewing own profile
  if (!session?.user?.id || userId === session.user.id) {
    return null
  }

  const compactMode = variant === 'compact'

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Follow/Unfollow Button */}
      {isFollowing ? (
        <Button
          variant="outline"
          onClick={handleUnfollow}
          disabled={isLoading}
          className={`font-bold ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
        >
          <UserCheck className={compactMode ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'} />
          Following
        </Button>
      ) : (
        <Button
          onClick={handleFollow}
          disabled={isLoading}
          className={`font-bold ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
        >
          <UserPlus className={compactMode ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'} />
          Follow
        </Button>
      )}

      {/* Connection Status Buttons */}
      {connectionStatus === 'none' && (
        <>
          {showMessage ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={connectionMessage}
                onChange={(e) => setConnectionMessage(e.target.value)}
                placeholder="Add a message (optional)"
                className={`px-3 py-2 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:border-theme-primary transition-colors font-medium ${
                  compactMode ? 'text-xs' : 'text-sm'
                }`}
              />
              <Button
                onClick={handleConnect}
                disabled={isLoading}
                className={`font-bold ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
              >
                Send
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowMessage(false)}
                className={`font-bold ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowMessage(true)}
              disabled={isLoading}
              className={`font-bold ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
            >
              <Users className={compactMode ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'} />
              Connect
            </Button>
          )}
        </>
      )}

      {connectionStatus === 'pending_sent' && (
        <Button
          variant="outline"
          onClick={handleCancelRequest}
          disabled={isLoading}
          className={`font-bold ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
        >
          <Clock className={compactMode ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'} />
          Pending
        </Button>
      )}

      {connectionStatus === 'pending_received' && (
        <>
          <Button
            onClick={handleAcceptConnection}
            disabled={isLoading}
            className={`font-bold ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
          >
            <Check className={compactMode ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'} />
            Accept
          </Button>
          <Button
            variant="outline"
            onClick={handleRejectConnection}
            disabled={isLoading}
            className={`font-bold ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
          >
            <X className={compactMode ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'} />
            Decline
          </Button>
        </>
      )}

      {connectionStatus === 'connected' && (
        <Button
          variant="outline"
          onClick={handleDisconnect}
          disabled={isLoading}
          className={`font-bold border-2 border-theme-primary text-theme-primary ${compactMode ? 'text-xs px-3 py-1.5' : ''}`}
        >
          <UserCheck className={compactMode ? 'w-3 h-3 mr-1.5' : 'w-4 h-4 mr-2'} />
          Connected
        </Button>
      )}
    </div>
  )
}
