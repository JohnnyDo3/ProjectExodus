'use client'

import { useState, useEffect, useRef } from 'react'
import { Fish, Eye, EyeOff, Palette, Shell, Flame, Anchor, Sailboat, Ship, Castle, Pyramid, Landmark, Waves, Skull } from 'lucide-react'
import Link from 'next/link'
import { Fishbowl } from './Fishbowl'
import { FishSVG, getTierFromScore, getTierName, type FishCustomization } from './FishSpecies'

const COMMUNITY_THEME_KEY = 'community-fishbowl-theme'

const DECOR_THEMES = [
  { id: 'ocean', name: 'Ocean Reef', icon: Shell, description: 'Coral reef with ocean plants' },
  { id: 'volcano', name: 'Volcano', icon: Flame, description: 'Volcanic reef with lava vents' },
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

  // Theme colors for the collapsed header bar
  const themeColors: Record<string, { bg: string; border: string; iconBg: string; iconBorder: string; icon: string; title: string; subtitle: string; btnBg: string; btnBorder: string; btnText: string }> = {
    ocean:      { bg: 'bg-[#0A1628]', border: 'border-cyan-900/50', iconBg: 'bg-cyan-900/50', iconBorder: 'border-cyan-700/50', icon: 'text-cyan-400', title: 'text-cyan-100', subtitle: 'text-cyan-500/80', btnBg: 'bg-cyan-900/40', btnBorder: 'border-cyan-800/40', btnText: 'text-cyan-400' },
    volcano:    { bg: 'bg-[#1A0A08]', border: 'border-red-900/50', iconBg: 'bg-red-900/50', iconBorder: 'border-red-700/50', icon: 'text-orange-400', title: 'text-orange-100', subtitle: 'text-orange-500/80', btnBg: 'bg-red-900/40', btnBorder: 'border-red-800/40', btnText: 'text-orange-400' },
    shipwreck:  { bg: 'bg-[#0D1520]', border: 'border-amber-900/50', iconBg: 'bg-amber-900/50', iconBorder: 'border-amber-700/50', icon: 'text-amber-400', title: 'text-amber-100', subtitle: 'text-amber-500/80', btnBg: 'bg-amber-900/40', btnBorder: 'border-amber-800/40', btnText: 'text-amber-400' },
    sailboat:   { bg: 'bg-[#0D1520]', border: 'border-sky-900/50', iconBg: 'bg-sky-900/50', iconBorder: 'border-sky-700/50', icon: 'text-sky-400', title: 'text-sky-100', subtitle: 'text-sky-500/80', btnBg: 'bg-sky-900/40', btnBorder: 'border-sky-800/40', btnText: 'text-sky-400' },
    submarine:  { bg: 'bg-[#0A0F18]', border: 'border-slate-700/50', iconBg: 'bg-slate-800/50', iconBorder: 'border-slate-600/50', icon: 'text-slate-300', title: 'text-slate-100', subtitle: 'text-slate-400/80', btnBg: 'bg-slate-800/40', btnBorder: 'border-slate-700/40', btnText: 'text-slate-300' },
    castle:     { bg: 'bg-[#0E1218]', border: 'border-stone-700/50', iconBg: 'bg-stone-800/50', iconBorder: 'border-stone-600/50', icon: 'text-stone-300', title: 'text-stone-100', subtitle: 'text-stone-400/80', btnBg: 'bg-stone-800/40', btnBorder: 'border-stone-700/40', btnText: 'text-stone-300' },
    pyramid:    { bg: 'bg-[#14100A]', border: 'border-yellow-900/50', iconBg: 'bg-yellow-900/50', iconBorder: 'border-yellow-700/50', icon: 'text-yellow-400', title: 'text-yellow-100', subtitle: 'text-yellow-500/80', btnBg: 'bg-yellow-900/40', btnBorder: 'border-yellow-800/40', btnText: 'text-yellow-400' },
    temple:     { bg: 'bg-[#0C0A14]', border: 'border-rose-900/50', iconBg: 'bg-rose-900/50', iconBorder: 'border-rose-700/50', icon: 'text-rose-400', title: 'text-rose-100', subtitle: 'text-rose-500/80', btnBg: 'bg-rose-900/40', btnBorder: 'border-rose-800/40', btnText: 'text-rose-400' },
    atlantis:   { bg: 'bg-[#060E18]', border: 'border-teal-900/50', iconBg: 'bg-teal-900/50', iconBorder: 'border-teal-700/50', icon: 'text-teal-400', title: 'text-teal-100', subtitle: 'text-teal-500/80', btnBg: 'bg-teal-900/40', btnBorder: 'border-teal-800/40', btnText: 'text-teal-400' },
    minimal:    { bg: 'bg-[#0A1628]', border: 'border-emerald-900/50', iconBg: 'bg-emerald-900/50', iconBorder: 'border-emerald-700/50', icon: 'text-emerald-400', title: 'text-emerald-100', subtitle: 'text-emerald-500/80', btnBg: 'bg-emerald-900/40', btnBorder: 'border-emerald-800/40', btnText: 'text-emerald-400' },
    stagnant:   { bg: 'bg-[#12100A]', border: 'border-lime-900/50', iconBg: 'bg-lime-900/50', iconBorder: 'border-lime-700/50', icon: 'text-lime-400', title: 'text-lime-100', subtitle: 'text-lime-500/80', btnBg: 'bg-lime-900/40', btnBorder: 'border-lime-800/40', btnText: 'text-lime-400' },
  }
  const tc = themeColors[activeTheme] || themeColors.ocean
  const activeThemeData = DECOR_THEMES.find(t => t.id === activeTheme)
  const ThemeIcon = activeThemeData?.icon || Fish

  // Collapsed view — no fishbowl, just a compact bar matching the active theme
  if (!showFishbowl) {
    return (
      <div className={`relative ${tc.bg} border-b ${tc.border}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${tc.iconBg} flex items-center justify-center border ${tc.iconBorder}`}>
                <ThemeIcon className={`w-4 h-4 ${tc.icon}`} />
              </div>
              <div>
                <h2 className={`text-sm font-black ${tc.title}`}>COMMUNITY FISHBOWL</h2>
                <p className={`text-[10px] font-medium ${tc.subtitle}`}>
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${tc.btnBg} border ${tc.btnBorder} ${tc.btnText} hover:opacity-80 transition-all`}
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
