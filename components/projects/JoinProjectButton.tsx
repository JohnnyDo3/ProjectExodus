'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

interface JoinProjectButtonProps {
  projectId: string
  projectName: string
}

export function JoinProjectButton({ projectId, projectName }: JoinProjectButtonProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isJoining, setIsJoining] = useState(false)
  const [message, setMessage] = useState('')

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
