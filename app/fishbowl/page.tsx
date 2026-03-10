'use client'

import { useState, useEffect } from 'react'
import { Fish, Users, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Fishbowl } from '@/components/fishbowl/Fishbowl'
import { FishSVG, getTierFromScore, getTierName, type FishCustomization } from '@/components/fishbowl/FishSpecies'
import '@/components/fishbowl/fishbowl.css'

interface CommunityFishUser {
  id: string
  name: string | null
  stockScore: number
  image: string | null
  fishCustomization?: FishCustomization | null
}

export default function CommunityFishbowlPage() {
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
      <div className="h-full flex items-center justify-center bg-[#0A1628]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-cyan-400">Loading community fishbowl...</p>
        </div>
      </div>
    )
  }

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
                <h1 className="text-xl font-black text-cyan-100">COMMUNITY FISHBOWL</h1>
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
              {/* Fish stats */}
              <div className="hidden md:flex items-center gap-2">
                {([0, 1, 2, 3, 4, 5] as const).map(tier => {
                  const count = users.filter(u => getTierFromScore(u.stockScore) === tier).length
                  if (count === 0) return null
                  return (
                    <div
                      key={tier}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-900/30 border border-cyan-800/30"
                    >
                      <FishSVG tier={tier} size={14} />
                      <span className="text-[9px] font-bold text-cyan-400">{count}</span>
                      <span className="text-[8px] text-cyan-600">{getTierName(tier)}</span>
                    </div>
                  )
                })}
              </div>
              {/* My Tank link */}
              <Link
                href="/fishbowl/personal"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                <Fish className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">My Tank</span>
              </Link>
              {/* Network link */}
              <Link
                href="/network"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-500 hover:to-emerald-500 transition-all"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Network</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fishbowl tank */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden min-h-0">
        {users.length > 0 ? (
          <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden">
            <Fishbowl users={users} maxVisible={15} />
          </div>
        ) : (
          <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D2137 40%, #123855 100%)' }}>
            <div className="text-center space-y-4">
              <Fish className="w-16 h-16 text-cyan-700 mx-auto" />
              <p className="text-lg font-bold text-cyan-500">The community fishbowl is empty</p>
              <p className="text-sm text-cyan-600">Be the first to join!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
