'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { UserPlus, UserCheck, Loader2, Users } from 'lucide-react'
import toast from 'react-hot-toast'

interface FollowButtonProps {
  userId: string
  className?: string
}

export function FollowButton({ userId, className }: FollowButtonProps) {
  const { data: session } = useSession()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isMutual, setIsMutual] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      checkFollowStatus()
    } else {
      setIsLoading(false)
    }
  }, [session?.user?.id, userId])

  const checkFollowStatus = async () => {
    try {
      // Check if I follow them AND if they follow me (for mutual detection)
      const [followingRes, followStatusRes] = await Promise.all([
        fetch('/api/users/following'),
        fetch(`/api/users/${userId}/follow`),
      ])

      if (followingRes.ok) {
        const data = await followingRes.json()
        if (data.success) {
          const following = data.data.some((u: any) => u.id === userId)
          setIsFollowing(following)
        }
      }

      if (followStatusRes.ok) {
        const statusData = await followStatusRes.json()
        if (statusData.success) {
          setIsMutual(statusData.data?.mutualFollow === true)
        }
      }
    } catch (error) {
      console.error('Error checking follow status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollow = async () => {
    if (!session?.user) {
      toast.error('Please sign in to follow users')
      return
    }

    setIsUpdating(true)

    try {
      if (isFollowing) {
        // Unfollow
        const url = new URL('/api/users/follow', window.location.origin)
        url.searchParams.set('userId', userId)
        const res = await fetch(url.toString(), { method: 'DELETE' })

        if (res.ok) {
          setIsFollowing(false)
          setIsMutual(false)
          toast.success('Unfollowed successfully!')
        } else {
          toast.error('Failed to unfollow')
        }
      } else {
        // Follow
        const res = await fetch('/api/users/follow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })

        if (res.ok) {
          setIsFollowing(true)
          // Re-check mutual status after following
          try {
            const statusRes = await fetch(`/api/users/${userId}/follow`)
            if (statusRes.ok) {
              const statusData = await statusRes.json()
              if (statusData.success) {
                setIsMutual(statusData.data?.mutualFollow === true)
              }
            }
          } catch {}
          toast.success('Following! You\'ll see their activity in your feed.')
        } else {
          toast.error('Failed to follow')
        }
      }
    } catch (error) {
      console.error('Error toggling follow:', error)
      toast.error('Something went wrong')
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <Button size="sm" disabled className={className}>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        LOADING...
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={isFollowing ? 'outline' : 'primary'}
        className={className}
        onClick={handleFollow}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {isFollowing ? 'UNFOLLOWING...' : 'FOLLOWING...'}
          </>
        ) : (
          <>
            {isFollowing ? (
              <>
                <UserCheck className="w-4 h-4 mr-2" />
                FOLLOWING
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                FOLLOW
              </>
            )}
          </>
        )}
      </Button>
      {isMutual && isFollowing && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-teal-500/20 text-teal-500 border border-teal-500/30">
          <Users className="w-3 h-3" />
          MUTUAL
        </span>
      )}
    </div>
  )
}
