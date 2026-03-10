'use client'

import { useState, useEffect, useCallback } from 'react'
import { Fish, Users, Info, Sparkles, Palette, Shell, Anchor, TreePalm } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Fishbowl } from '@/components/fishbowl/Fishbowl'
import { FishSVG, getTierFromScore, getTierName, type FishCustomization, type FishTier } from '@/components/fishbowl/FishSpecies'
import { FishCustomizer } from '@/components/fishbowl/FishCustomizer'
import '@/components/fishbowl/fishbowl.css'

interface FishbowlUser {
  id: string
  name: string | null
  stockScore: number
  image: string | null
  fishCustomization?: FishCustomization | null
  isMutual?: boolean
  isFollowing?: boolean
  isFollower?: boolean
}

interface PersonalFishbowlData {
  user: FishbowlUser | null
  connections: FishbowlUser[]
  stats: {
    following: number
    followers: number
    mutual: number
  }
}

const DECOR_THEMES = [
  { id: 'ocean', name: 'Ocean Reef', icon: Shell, description: 'Coral reef with ocean plants' },
  { id: 'tropical', name: 'Tropical', icon: TreePalm, description: 'Lush tropical vegetation' },
  { id: 'shipwreck', name: 'Shipwreck', icon: Anchor, description: 'Sunken ship vibes' },
  { id: 'minimal', name: 'Minimal', icon: Fish, description: 'Clean, simple look' },
] as const

export default function FishbowlPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<PersonalFishbowlData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [activeDecor, setActiveDecor] = useState<string>('ocean')
  const [showDecorPanel, setShowDecorPanel] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/fishbowl')
      return
    }
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    async function fetchData() {
      try {
        const res = await fetch('/api/fishbowl/personal')
        const json = await res.json()
        if (json.success) {
          setData(json.data)
        }
      } catch (error) {
        console.error('Error fetching fishbowl:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [status])

  const handleSaveCustomization = useCallback(async (customization: FishCustomization) => {
    const res = await fetch('/api/fishbowl/personal/customize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customization),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error)

    setData(prev => prev ? {
      ...prev,
      user: prev.user ? { ...prev.user, fishCustomization: customization } : null,
    } : null)

    setShowCustomizer(false)
  }, [])

  if (status === 'loading' || isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0A1628]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-cyan-400">Filling your fishbowl...</p>
        </div>
      </div>
    )
  }

  if (!session || !data) return null

  const fishbowlUsers = [
    ...(data.user ? [data.user] : []),
    ...data.connections,
  ]

  const userTier = data.user ? getTierFromScore(data.user.stockScore) : 0
  const userTierName = data.user ? getTierName(userTier) : 'Guppy'
  const userCustomization = (data.user?.fishCustomization as FishCustomization | null) || null

  // Available species based on stock score
  const availableSpecies = [
    { tier: 0 as FishTier, name: 'Guppy', unlockScore: 0 },
    { tier: 1 as FishTier, name: 'Tetra', unlockScore: 10 },
    { tier: 2 as FishTier, name: 'Angelfish', unlockScore: 25 },
    { tier: 3 as FishTier, name: 'Clownfish', unlockScore: 50 },
    { tier: 4 as FishTier, name: 'Blue Tang', unlockScore: 100 },
    { tier: 5 as FishTier, name: 'Royal Betta', unlockScore: 200 },
  ]

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
                <h1 className="text-xl font-black text-cyan-100">MY TANK</h1>
                <p className="text-xs font-medium text-cyan-500/80">
                  Your personal aquarium · {fishbowlUsers.length} fish swimming
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Your fish info */}
              {data.user && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/40">
                  <FishSVG tier={userTier} size={24} customization={userCustomization} id="header-my-fish" />
                  <div>
                    <p className="text-[10px] text-cyan-500 font-medium">YOUR FISH</p>
                    <p className="text-xs font-bold text-cyan-200">{userTierName} · {data.user.stockScore} STOCK</p>
                  </div>
                </div>
              )}
              {/* Stats */}
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/40">
                  <span className="text-[10px] text-cyan-500 font-medium">Following</span>
                  <span className="text-xs font-bold text-cyan-300">{data.stats.following}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/40">
                  <span className="text-[10px] text-cyan-500 font-medium">Followers</span>
                  <span className="text-xs font-bold text-cyan-300">{data.stats.followers}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-900/30 border border-teal-800/40">
                  <span className="text-[10px] text-teal-500 font-medium">Mutual</span>
                  <span className="text-xs font-bold text-teal-300">{data.stats.mutual}</span>
                </div>
              </div>
              {/* Customize fish button */}
              <button
                onClick={() => setShowCustomizer(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white hover:from-purple-500/80 hover:to-pink-500/80 transition-all border border-purple-500/30"
                title="Customize your fish"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Customize</span>
              </button>
              {/* Decor toggle */}
              <button
                onClick={() => setShowDecorPanel(!showDecorPanel)}
                className={`p-2 rounded-lg border transition-colors ${
                  showDecorPanel
                    ? 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300'
                    : 'bg-cyan-900/30 border-cyan-800/40 text-cyan-500 hover:border-cyan-600/60'
                }`}
                title="Tank decor"
              >
                <Palette className="w-4 h-4" />
              </button>
              {/* Info toggle */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-lg bg-cyan-900/30 border border-cyan-800/40 hover:border-cyan-600/60 transition-colors"
              >
                <Info className="w-4 h-4 text-cyan-500" />
              </button>
              {/* Network link */}
              <Link
                href="/network"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Network</span>
              </Link>
            </div>
          </div>

          {/* Decor panel */}
          {showDecorPanel && (
            <div className="mt-3 p-3 rounded-xl bg-[#0A1628]/80 border border-cyan-800/30 animate-in slide-in-from-top duration-200">
              <p className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Tank Theme</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DECOR_THEMES.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveDecor(theme.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
                      activeDecor === theme.id
                        ? 'border-cyan-400 bg-cyan-900/40 shadow-lg shadow-cyan-900/20'
                        : 'border-cyan-800/30 bg-cyan-900/10 hover:border-cyan-600/50'
                    }`}
                  >
                    <theme.icon className={`w-4 h-4 ${activeDecor === theme.id ? 'text-cyan-300' : 'text-cyan-600'}`} />
                    <div className="text-left">
                      <p className={`text-[10px] font-bold ${activeDecor === theme.id ? 'text-cyan-200' : 'text-cyan-400'}`}>
                        {theme.name}
                      </p>
                      <p className="text-[8px] text-cyan-600">{theme.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info panel - Fish species guide */}
          {showInfo && (
            <div className="mt-3 p-3 rounded-xl bg-[#0A1628]/80 border border-cyan-800/30 animate-in slide-in-from-top duration-200">
              <p className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Fish Species & Stock Levels</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {availableSpecies.map(sp => {
                  const isUnlocked = (data.user?.stockScore || 0) >= sp.unlockScore
                  return (
                    <div
                      key={sp.tier}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        isUnlocked ? 'bg-cyan-900/30 border border-cyan-700/30' : 'bg-cyan-950/30 border border-cyan-900/20 opacity-50'
                      }`}
                    >
                      <FishSVG tier={sp.tier} size={20} />
                      <div>
                        <p className="text-[9px] text-cyan-500 font-medium">{sp.name}</p>
                        <p className="text-[9px] text-cyan-600">
                          {sp.unlockScore === 0 ? '0-9' :
                           sp.unlockScore === 10 ? '10-24' :
                           sp.unlockScore === 25 ? '25-49' :
                           sp.unlockScore === 50 ? '50-99' :
                           sp.unlockScore === 100 ? '100-199' : '200+'
                          } STOCK
                        </p>
                        {!isUnlocked && (
                          <p className="text-[8px] text-amber-500/70 font-bold">LOCKED</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="mt-2 text-[10px] text-cyan-600 text-center">
                Each connection is a fish in your personal tank. Your stock score unlocks higher-tier species. Customize colors, scales, and patterns!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fishbowl tank - fills remaining space */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden min-h-0">
        {fishbowlUsers.length > 0 ? (
          <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden">
            <Fishbowl
              users={fishbowlUsers}
              ownerCustomization={userCustomization}
              ownerId={data.user?.id}
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D2137 40%, #123855 100%)' }}>
            <div className="text-center space-y-4">
              <Fish className="w-16 h-16 text-cyan-700 mx-auto" />
              <p className="text-lg font-bold text-cyan-500">Your fishbowl is empty</p>
              <p className="text-sm text-cyan-600">Follow people to add fish to your tank!</p>
              <Link
                href="/network"
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                <Users className="w-4 h-4" />
                Find People
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Connections bar at bottom */}
      {data.connections.length > 0 && (
        <div className="flex-shrink-0 bg-gradient-to-r from-[#0D2137]/95 via-[#123855]/95 to-[#0D2137]/95 backdrop-blur-sm border-t-2 border-cyan-800/50">
          <div className="container mx-auto px-6 py-2">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <span className="text-[10px] text-cyan-600 font-bold uppercase whitespace-nowrap flex-shrink-0">
                Connections ({data.connections.length})
              </span>
              <div className="flex items-center gap-2">
                {data.connections.slice(0, 20).map(conn => {
                  const tier = getTierFromScore(conn.stockScore)
                  return (
                    <Link
                      key={conn.id}
                      href={`/profile/${conn.id}`}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-cyan-900/30 border border-cyan-800/30 hover:border-cyan-600/50 transition-colors whitespace-nowrap flex-shrink-0 group"
                      title={`${conn.name} · ${conn.stockScore} STOCK`}
                    >
                      <FishSVG tier={tier} size={16} id={`bar-${conn.id}`} />
                      <span className="text-[10px] font-bold text-cyan-400 group-hover:text-cyan-200 max-w-[80px] truncate">
                        {conn.name}
                      </span>
                      {conn.isMutual && (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fish Customizer Modal */}
      {showCustomizer && data.user && (
        <FishCustomizer
          stockScore={data.user.stockScore}
          currentCustomization={userCustomization}
          onSave={handleSaveCustomization}
          onClose={() => setShowCustomizer(false)}
        />
      )}
    </div>
  )
}
