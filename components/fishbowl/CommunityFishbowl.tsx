'use client'

import { useState, useEffect } from 'react'
import { Fish, Users, ChevronDown, Eye, EyeOff } from 'lucide-react'
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
  const [showFishbowl, setShowFishbowl] = useState(true)

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
      <div className="relative h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-cyan-400">Loading community fishbowl...</p>
        </div>
      </div>
    )
  }

  // Collapsed view — no fishbowl, just a compact bar
  if (!showFishbowl) {
    return (
      <div className="relative bg-[#0A1628] border-b border-cyan-900/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-900/50 flex items-center justify-center border border-cyan-700/50">
                <Fish className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-sm font-black text-cyan-100">COMMUNITY FISHBOWL</h2>
                <p className="text-[10px] font-medium text-cyan-500/80">
                  {users.length} members swimming together
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/fishbowl/personal"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                <Fish className="w-3.5 h-3.5" />
                My Tank
              </Link>
              <button
                onClick={() => setShowFishbowl(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-900/40 border border-cyan-800/40 text-cyan-400 hover:bg-cyan-900/60 transition-all"
                title="Show fishbowl"
              >
                <Eye className="w-3.5 h-3.5" />
                Show Tank
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Full-viewport fishbowl container */}
      <div className="relative h-screen overflow-hidden">

        {/* === BLACK LID HEADER === */}
        <div className="absolute top-0 left-0 right-0 z-30 h-14 bg-black border-b-2 border-gray-800">
          {/* Lid surface texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-950" />
          {/* Subtle rim highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/50 to-transparent" />

          {/* Header content on the lid */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-900/60 flex items-center justify-center border border-cyan-700/40">
                <Fish className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-sm font-black text-cyan-100 tracking-wide">COMMUNITY FISHBOWL</h2>
                <p className="text-[10px] font-medium text-cyan-500/70">
                  {users.length} members swimming together
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Top fish showcase */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/30">
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
              <button
                onClick={() => setShowFishbowl(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-800/80 border border-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:text-white transition-all"
                title="Hide fishbowl"
              >
                <EyeOff className="w-3.5 h-3.5" />
                Hide
              </button>
            </div>
          </div>
        </div>

        {/* === LED LIGHT BEAMS shining down from the lid === */}
        <div className="absolute top-14 left-0 right-0 z-20 pointer-events-none h-[45%]">
          {/* Beam 1 - left side */}
          <div
            className="absolute top-0 fishbowl-light-beam"
            style={{
              left: '15%',
              width: '6%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(180,220,255,0.18) 0%, rgba(180,220,255,0.06) 40%, transparent 100%)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(8px)',
            }}
          />
          {/* Beam 2 - left-center */}
          <div
            className="absolute top-0 fishbowl-light-beam"
            style={{
              left: '33%',
              width: '5%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(160,210,255,0.15) 0%, rgba(160,210,255,0.04) 45%, transparent 100%)',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(10px)',
              animationDelay: '1.5s',
            }}
          />
          {/* Beam 3 - center */}
          <div
            className="absolute top-0 fishbowl-light-beam"
            style={{
              left: '48%',
              width: '7%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(200,230,255,0.22) 0%, rgba(200,230,255,0.07) 35%, transparent 100%)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(6px)',
              animationDelay: '0.8s',
            }}
          />
          {/* Beam 4 - right-center */}
          <div
            className="absolute top-0 fishbowl-light-beam"
            style={{
              left: '65%',
              width: '5%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(170,215,255,0.16) 0%, rgba(170,215,255,0.05) 42%, transparent 100%)',
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(9px)',
              animationDelay: '2.2s',
            }}
          />
          {/* Beam 5 - right side */}
          <div
            className="absolute top-0 fishbowl-light-beam"
            style={{
              left: '82%',
              width: '6%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(190,225,255,0.14) 0%, rgba(190,225,255,0.04) 40%, transparent 100%)',
              clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(8px)',
              animationDelay: '3s',
            }}
          />
        </div>

        {/* The fishbowl — fills the viewport below the lid */}
        <div className="absolute inset-0 pt-14">
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
        </div>

        {/* Fish stats bar at bottom of viewport */}
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

        {/* Explore Network prompt at very bottom of viewport */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-14 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent flex items-end justify-center pb-2">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">Explore Network</span>
            <ChevronDown className="w-4 h-4 text-theme-muted animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}
