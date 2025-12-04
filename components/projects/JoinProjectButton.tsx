'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

interface JoinProjectButtonProps {
  projectId: string
  projectName: string
  isMember?: boolean
  isOwner?: boolean
}

export function JoinProjectButton({ projectId, projectName, isMember = false, isOwner = false }: JoinProjectButtonProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isJoining, setIsJoining] = useState(false)
  const [message, setMessage] = useState('')
  const [joined, setJoined] = useState(isMember)

  // If user is owner or already a member, show "Joined" state
  if (isOwner || joined) {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled
          className="font-black bg-[color-mix(in_srgb,var(--primary)_20%,var(--background))] border-[var(--primary)] text-theme-primary cursor-default"
        >
          <Check className="w-4 h-4 mr-1" />
          {isOwner ? 'YOUR PROJECT' : 'JOINED'}
        </Button>
      </div>
    )
  }

  const handleJoin = async (e: React.MouseEvent) => {
    // Prevent the Link from navigating when button is clicked
    e.preventDefault()
    e.stopPropagation()

    if (status !== 'authenticated') {
      router.push('/auth/signin')
      return
    }

    setIsJoining(true)
    setMessage('')

    try {
      const res = await fetch('/api/projects/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      })

      const data = await res.json()

      if (data.success) {
        setMessage('✓ Joined!')
        setJoined(true)
        // Refresh the page to show updated member count
        setTimeout(() => {
          router.refresh()
        }, 1000)
      } else {
        setMessage(data.error || 'Failed to join')
        setIsJoining(false)
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Error joining project')
      setIsJoining(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        onClick={handleJoin}
        disabled={isJoining || message.includes('✓')}
        className="font-black"
      >
        {message || (isJoining ? 'JOINING...' : 'JOIN PROJECT')}
      </Button>
    </div>
  )
}
