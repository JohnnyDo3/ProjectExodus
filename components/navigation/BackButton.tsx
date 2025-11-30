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
    // Always use fallback URL if provided for consistent navigation
    if (fallbackUrl) {
      router.push(fallbackUrl)
    } else if (window.history.length > 1) {
      // Only use browser history if no fallback specified
      router.back()
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
