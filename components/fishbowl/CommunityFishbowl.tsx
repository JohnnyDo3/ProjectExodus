'use client'

import { useState, useEffect, useRef } from 'react'
import { Fish, Eye, EyeOff, Palette, Shell, TreePalm, Anchor, Sailboat, Ship, Castle, Pyramid, Landmark, Waves, Skull } from 'lucide-react'
import Link from 'next/link'
import { Fishbowl } from './Fishbowl'
import { FishSVG, getTierFromScore, getTierName, type FishCustomization } from './FishSpecies'

const COMMUNITY_THEME_KEY = 'community-fishbowl-theme'

const DECOR_THEMES = [
  { id: 'ocean', name: 'Ocean Reef', icon: Shell, description: 'Coral reef with ocean plants' },
  { id: 'tropical', name: 'Tropical', icon: TreePalm, description: 'Lush tropical vegetation' },
  { id: 'shipwreck', name: 'Shipwreck', icon: Anchor, description: 'Sunken ship vibes' },
  { id: 'sailboat', name: 'Sailboat', icon: Sailboat, description: 'Sunken sailboat wreck' },
  { id: 'submarine', name: 'Submarine', icon: Ship, description: 'Sunken submarine base' },
  { id: 'castle', name: 'Castle', icon: Castle, description: 'Sunken medieval fortress' },
  { id: 'pyramid', name: 'Pyramid', icon: Pyramid, description: 'Ancient Egyptian ruins' },
  { id: 'temple', name: 'Temple', icon: Landmark, description: 'Japanese torii and pagoda' },
  { id: 'atlantis', name: 'Atlantis', icon: Waves, description: 'Lost city of Atlantis' },
  { id: 'minimal', name: 'Minimal', icon: Fish, description: 'Clean, simple look' },
  { id: 'stagnant', name: 'Stagnant', icon: Skull, description: 'Deer skull with willow vines' },
] as const

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
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    if (typeof window === 'undefined') return 'ocean'
    try {
      return localStorage.getItem(COMMUNITY_THEME_KEY) || 'ocean'
    } catch { return 'ocean' }
  })
  const [showThemePanel, setShowThemePanel] = useState(false)
  const themePanelRef = useRef<HTMLDivElement>(null)

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId)
    try { localStorage.setItem(COMMUNITY_THEME_KEY, themeId) } catch {}
  }

  // Close theme panel on click outside
  useEffect(() => {
    if (!showThemePanel) return
    const handler = (e: MouseEvent) => {
      if (themePanelRef.current && !themePanelRef.current.contains(e.target as Node)) {
        setShowThemePanel(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showThemePanel])

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
      <div className="relative bg-[#0A1628] flex items-center justify-center" style={{ height: 'min(85vh, 85dvh)' }}>
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
      {/* Fishbowl container — large but allows page to scroll past */}
      <div className="relative overflow-hidden" style={{ height: 'min(85vh, 85dvh)' }}>

        {/* === BLACK LID HEADER === */}
        <div className="absolute top-0 left-0 right-0 z-30 h-20 bg-black border-b-2 border-gray-800">
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
                <h2 className="text-base font-black text-cyan-100 tracking-widest">COMMUNITY FISHBOWL</h2>
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
              {/* Theme selector */}
              <div className="relative" ref={themePanelRef}>
                <button
                  onClick={() => setShowThemePanel(!showThemePanel)}
                  className={`p-2 rounded-lg border transition-colors ${
                    showThemePanel
                      ? 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300'
                      : 'bg-gray-800/80 border-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                  }`}
                  title="Tank theme"
                >
                  <Palette className="w-4 h-4" />
                </button>
                {showThemePanel && (
                  <div className="fixed inset-0 z-40 flex items-start justify-center pt-24 sm:pt-28" onClick={() => setShowThemePanel(false)}>
                    <div className="w-[340px] sm:w-[420px] p-4 rounded-xl bg-[#0A1628]/95 border border-cyan-800/30 backdrop-blur-sm shadow-xl shadow-black/40" onClick={e => e.stopPropagation()}>
                    <p className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Tank Theme</p>
                    <div className="grid grid-cols-2 gap-2">
                      {DECOR_THEMES.map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => { handleThemeChange(theme.id); setShowThemePanel(false) }}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
                            activeTheme === theme.id
                              ? 'border-cyan-400 bg-cyan-900/40 shadow-lg shadow-cyan-900/20'
                              : 'border-cyan-800/30 bg-cyan-900/10 hover:border-cyan-600/50'
                          }`}
                        >
                          <theme.icon className={`w-4 h-4 ${activeTheme === theme.id ? 'text-cyan-300' : 'text-cyan-600'}`} />
                          <div className="text-left">
                            <p className={`text-[10px] font-bold ${activeTheme === theme.id ? 'text-cyan-200' : 'text-cyan-400'}`}>
                              {theme.name}
                            </p>
                            <p className="text-[8px] text-cyan-600">{theme.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  </div>
                )}
              </div>
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

        {/* The fishbowl — fills the viewport below the lid, above the base */}
        <div className="absolute inset-0 pt-20 pb-16">
          {users.length > 0 ? (
            <Fishbowl users={users} maxVisible={15} squareCorners theme={activeTheme} />
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

        {/* === BLACK BASE with fish type stats built in === */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-16 bg-black border-t-2 border-gray-800">
          {/* Base surface texture */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-gray-950" />
          {/* Top rim highlight where glass meets base */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/50 to-transparent" />

          {/* Fish type counts */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="flex items-center gap-4 flex-wrap justify-center px-4">
              {([0, 1, 2, 3, 4, 5] as const).map(tier => {
                const tierCount = users.filter(u => getTierFromScore(u.stockScore) === tier).length
                return (
                  <div
                    key={tier}
                    className="flex items-center gap-1.5"
                  >
                    <FishSVG tier={tier} size={16} id={`base-tier-${tier}`} />
                    <span className={`text-xs font-black ${tierCount > 0 ? 'text-cyan-300' : 'text-gray-600'}`}>
                      {tierCount}
                    </span>
                    <span className={`text-[9px] font-bold ${tierCount > 0 ? 'text-cyan-500/70' : 'text-gray-700'}`}>
                      {getTierName(tier)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
