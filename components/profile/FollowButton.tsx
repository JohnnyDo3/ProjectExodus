'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { UserPlus, UserCheck, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface FollowButtonProps {
  userId: string
  className?: string
}

export function FollowButton({ userId, className }: FollowButtonProps) {
  const { data: session } = useSession()
  const [isFollowing, setIsFollowing] = useState(false)
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
      const res = await fetch('/api/users/following')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          const following = data.data.some((u: any) => u.id === userId)
          setIsFollowing(following)
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
    <Button
      size="sm"
      variant={isFollowing ? 'outline' : 'default'}
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
  )
}
