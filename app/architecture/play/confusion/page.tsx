'use client'

import { useRouter } from 'next/navigation'
import { ConfusionGame } from '@/components/architecture/ConfusionGame'

export default function ConfusionGamePage() {
  const router = useRouter()

  return (
    <ConfusionGame
      onExit={() => router.push('/architecture/play')}
      onComplete={(results) => {
        console.log('Game completed:', results)
      }}
    />
  )
}
