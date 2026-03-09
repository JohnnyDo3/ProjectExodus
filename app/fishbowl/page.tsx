'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Fishbowl } from '@/components/fishbowl/Fishbowl'
import { FishSVG, getTierFromScore, getTierName } from '@/components/fishbowl/FishSpecies'
import { Fish, Users, Trophy, Info } from 'lucide-react'
import '@/components/fishbowl/fishbowl.css'

interface FishbowlUser {
  id: string
  name: string | null
  stockScore: number
  image: string | null
}

export default function FishbowlPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<FishbowlUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/fishbowl')
      return
    }

    if (status === 'authenticated') {
      fetch('/api/fishbowl')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUsers(data.data)
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }
  }, [status, router])

  if (status === 'loading' || isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0A1628]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-cyan-400">Filling the fishbowl...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const currentUser = users.find(u => u.id === session.user?.id)
  const currentTier = currentUser ? getTierFromScore(currentUser.stockScore) : 0
  const currentTierName = currentUser ? getTierName(currentTier) : 'Guppy'

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#0A1628]">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-[#0D2137]/95 via-[#123855]/95 to-[#0D2137]/95 backdrop-blur-sm border-b-2 border-cyan-800/50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-900/50 flex items-center justify-center border border-cyan-700/50">
                <Fish className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-black text-cyan-100">THE FISHBOWL</h1>
                <p className="text-xs font-medium text-cyan-500/80">
                  Community aquarium · Every member is a fish
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Your fish info */}
              {currentUser && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/40">
                  <FishSVG tier={currentTier} size={24} />
                  <div>
                    <p className="text-[10px] text-cyan-500 font-medium">YOUR FISH</p>
                    <p className="text-xs font-bold text-cyan-200">{currentTierName} · {currentUser.stockScore} STOCK</p>
                  </div>
                </div>
              )}
              {/* Stats */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/40">
                <Users className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-bold text-cyan-300">{users.length}</span>
              </div>
              {/* Info toggle */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-800/40 hover:border-cyan-600/60 transition-colors"
              >
                <Info className="w-4 h-4 text-cyan-500" />
              </button>
            </div>
          </div>

          {/* Info panel */}
          {showInfo && (
            <div className="mt-3 p-3 rounded-xl bg-[#0A1628]/80 border border-cyan-800/30 animate-in slide-in-from-top duration-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {([0, 1, 2, 3, 4, 5] as const).map(tier => (
                  <div key={tier} className="flex items-center gap-2 p-2 rounded-lg bg-cyan-900/20">
                    <FishSVG tier={tier} size={20} />
                    <div>
                      <p className="text-[9px] text-cyan-500 font-medium">{getTierName(tier)}</p>
                      <p className="text-[9px] text-cyan-600">
                        {tier === 0 && '0-9'}
                        {tier === 1 && '10-24'}
                        {tier === 2 && '25-49'}
                        {tier === 3 && '50-99'}
                        {tier === 4 && '100-199'}
                        {tier === 5 && '200+'}
                        {' STOCK'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-cyan-600 text-center">
                Hover over a fish to see who it is. Click to view profile, message, or connect.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fishbowl - fills remaining space */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden min-h-0">
        <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden">
          <Fishbowl users={users} />
        </div>
      </div>
    </div>
  )
}
