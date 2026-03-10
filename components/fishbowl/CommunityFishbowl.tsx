'use client'

import { useState, useEffect } from 'react'
import { Fish, Users, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Fishbowl } from './Fishbowl'
import { FishSVG, getTierFromScore, getTierName, type FishCustomization } from './FishSpecies'

interface CommunityFishUser {
  id: string
  name: string | null
  stockScore: number
  image: string | null
  fishCustomization?: FishCustomization | null
}

export function CommunityFishbowl() {
  const [users, setUsers] = useState<CommunityFishUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCommunityFish() {
      try {
        const res = await fetch('/api/fishbowl')
        const json = await res.json()
        if (json.success) {
          setUsers(json.data)
        }
      } catch (error) {
        console.error('Error fetching community fishbowl:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCommunityFish()
  }, [])

  if (isLoading) {
    return (
      <div className="relative h-[50vh] min-h-[400px] max-h-[500px] bg-[#0A1628] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-cyan-400">Loading community fishbowl...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Fishbowl container - static, doesn't scroll */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[500px] overflow-hidden">
        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-[#0A1628]/90 via-[#0A1628]/40 to-transparent">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-900/50 flex items-center justify-center border border-cyan-700/50">
                  <Fish className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-cyan-100">COMMUNITY FISHBOWL</h2>
                  <p className="text-xs font-medium text-cyan-500/80">
                    {users.length} members swimming together
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Top fish showcase */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/40 border border-cyan-800/40">
                  {users.slice(0, 3).map((u, i) => (
                    <FishSVG
                      key={u.id}
                      tier={getTierFromScore(u.stockScore)}
                      size={20}
                      customization={u.fishCustomization as FishCustomization | undefined}
                      id={`community-top-${i}`}
                    />
                  ))}
                  <span className="text-[10px] font-bold text-cyan-400 ml-1">Top Fish</span>
                </div>
                <Link
                  href="/fishbowl/personal"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all"
                >
                  <Fish className="w-3.5 h-3.5" />
                  My Tank
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* The fishbowl */}
        {users.length > 0 ? (
          <Fishbowl users={users} maxVisible={15} />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D2137 40%, #123855 100%)' }}
          >
            <div className="text-center space-y-3">
              <Fish className="w-12 h-12 text-cyan-700 mx-auto" />
              <p className="text-sm font-bold text-cyan-500">The community fishbowl is empty</p>
              <p className="text-xs text-cyan-600">Be the first to join!</p>
            </div>
          </div>
        )}

        {/* Bottom fade to content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent h-16">
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">Explore Network</span>
            <ChevronDown className="w-4 h-4 text-theme-muted animate-bounce" />
          </div>
        </div>

        {/* Fish stats bar at bottom of bowl */}
        {users.length > 0 && (
          <div className="absolute bottom-16 left-0 right-0 z-20">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {([0, 1, 2, 3, 4, 5] as const).map(tier => {
                  const count = users.filter(u => getTierFromScore(u.stockScore) === tier).length
                  if (count === 0) return null
                  return (
                    <div
                      key={tier}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A1628]/70 backdrop-blur-sm border border-cyan-800/30"
                    >
                      <FishSVG tier={tier} size={14} />
                      <span className="text-[9px] font-bold text-cyan-400">{count}</span>
                      <span className="text-[8px] text-cyan-600">{getTierName(tier)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
