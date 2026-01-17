'use client'

import { useRouter } from 'next/navigation'
import { DiagramGame } from '@/components/architecture/DiagramGame'

export default function DiagramGamePage() {
  const router = useRouter()

  return (
    <DiagramGame
      onExit={() => router.push('/architecture/play')}
      onComplete={(results) => {
        console.log('Game completed:', results)
      }}
    />
  )
}
