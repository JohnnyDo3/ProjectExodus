'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface BackButtonProps {
  label?: string
  fallbackUrl?: string
  className?: string
}

export function BackButton({
  label = 'Back',
  fallbackUrl,
  className = ''
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else if (fallbackUrl) {
      // If no history, go to fallback URL
      router.push(fallbackUrl)
    } else {
      // Default to home
      router.push('/')
    }
  }

  return (
    <Button
      onClick={handleBack}
      variant="outline"
      className={`flex items-center gap-2 font-bold ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  )
}
