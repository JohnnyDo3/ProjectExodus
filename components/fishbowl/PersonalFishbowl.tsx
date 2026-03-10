'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Fish, Users, UserCheck, Heart, X, ExternalLink, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Fishbowl } from './Fishbowl'
import { FishSVG, getTierFromScore, getTierName, type FishCustomization } from './FishSpecies'
import { FishCustomizer } from './FishCustomizer'

interface PersonalFishbowlUser {
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
  user: PersonalFishbowlUser | null
  connections: PersonalFishbowlUser[]
  stats: {
    following: number
    followers: number
    mutual: number
  }
}

export function PersonalFishbowl() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<PersonalFishbowlData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!showCustomizer) setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, showCustomizer])

  // Close on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (showCustomizer) {
          setShowCustomizer(false)
        } else {
          setIsOpen(false)
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, showCustomizer])

  // Fetch data when opened
  const fetchData = useCallback(async (force = false) => {
    if (data && !force) return // Already fetched
    setIsLoading(true)
    try {
      const res = await fetch('/api/fishbowl/personal')
      const json = await res.json()
      if (json.success) {
        setData(json.data)
      }
    } catch (error) {
      console.error('Error fetching personal fishbowl:', error)
    } finally {
      setIsLoading(false)
    }
  }, [data])

  const handleToggle = () => {
    const next = !isOpen
    setIsOpen(next)
    if (next) fetchData()
  }

  const handleSaveCustomization = useCallback(async (customization: FishCustomization) => {
    const res = await fetch('/api/fishbowl/personal/customize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customization),
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error)

    // Update local state with new customization
    setData(prev => prev ? {
      ...prev,
      user: prev.user ? { ...prev.user, fishCustomization: customization } : null,
    } : null)

    setShowCustomizer(false)
  }, [])

  // All fish for the mini bowl: user + their connections
  const fishbowlUsers = data
    ? [
        ...(data.user ? [data.user] : []),
        ...data.connections,
      ]
    : []

  const userTier = data?.user ? getTierFromScore(data.user.stockScore) : 0
  const userTierName = data?.user ? getTierName(userTier) : 'Guppy'
  const userCustomization = (data?.user?.fishCustomization as FishCustomization | null) || null

  return (
    <div ref={dropdownRef} className="relative">
      {/* Fish icon button */}
      <button
        onClick={handleToggle}
        className={`relative p-2 rounded-lg transition-colors ${
          isOpen
            ? 'bg-cyan-500/20 text-cyan-500'
            : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
        }`}
        title="My Tank"
      >
        <Fish className="w-5 h-5" />
        {/* Connection count badge */}
        {data && data.stats.mutual > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[8px] font-black text-white flex items-center justify-center">
            {data.stats.mutual > 9 ? '9+' : data.stats.mutual}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-[380px] sm:w-[420px] rounded-2xl overflow-hidden z-[201] shadow-2xl border-2 border-cyan-700/40"
          style={{
            background: '#0A1628',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-800/40 bg-gradient-to-r from-[#0D2137] via-[#123855] to-[#0D2137]">
            <div className="flex items-center gap-2">
              <Fish className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-black text-cyan-100">MY TANK</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/network"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-cyan-900/40 transition-colors"
                title="Open community fishbowl"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-cyan-900/40 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-cyan-500" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : data ? (
            <>
              {/* Mini fishbowl */}
              <div className="h-[220px] relative">
                {fishbowlUsers.length > 0 ? (
                  <Fishbowl
                    users={fishbowlUsers}
                    maxVisible={8}
                    ownerCustomization={userCustomization}
                    ownerId={data.user?.id}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D2137 40%, #123855 100%)' }}>
                    <div className="text-center space-y-2">
                      <Fish className="w-8 h-8 text-cyan-700 mx-auto" />
                      <p className="text-xs font-bold text-cyan-600">Your fishbowl is empty</p>
                      <p className="text-[10px] text-cyan-700">Follow people to add fish!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* User's fish info */}
              {data.user && (
                <div className="px-4 py-3 border-t border-cyan-800/30 bg-cyan-900/10">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <FishSVG
                        tier={userTier}
                        size={32}
                        customization={userCustomization}
                        id="personal-my-fish"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-cyan-200 truncate">{data.user.name}</p>
                      <p className="text-[10px] text-cyan-500">
                        {userTierName} · {data.user.stockScore} STOCK
                      </p>
                    </div>
                    {/* Customize button */}
                    <button
                      onClick={() => setShowCustomizer(true)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-cyan-800/30 text-cyan-300 hover:bg-cyan-700/40 hover:text-cyan-200 transition-colors border border-cyan-700/30"
                      title="Customize your fish"
                    >
                      <Sparkles className="w-3 h-3" />
                      Customize
                    </button>
                  </div>
                  {/* Stats row */}
                  <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-cyan-800/20">
                    <div className="text-center">
                      <p className="text-sm font-black text-cyan-300">{data.stats.following}</p>
                      <p className="text-[8px] font-bold text-cyan-600 uppercase">Following</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-cyan-300">{data.stats.followers}</p>
                      <p className="text-[8px] font-bold text-cyan-600 uppercase">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-teal-300">{data.stats.mutual}</p>
                      <p className="text-[8px] font-bold text-cyan-600 uppercase">Mutual</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Connection list - scrollable */}
              {data.connections.length > 0 && (
                <div className="border-t border-cyan-800/30 max-h-[180px] overflow-y-auto">
                  <div className="p-2 space-y-0.5">
                    {data.connections.slice(0, 20).map(conn => {
                      const tier = getTierFromScore(conn.stockScore)
                      return (
                        <Link
                          key={conn.id}
                          href={`/profile/${conn.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-cyan-900/30 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <FishSVG tier={tier} size={18} id={`pf-${conn.id}`} />
                          </div>
                          <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden bg-cyan-900/40">
                            {conn.image ? (
                              <img src={conn.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-[9px] font-black text-cyan-400">
                                  {(conn.name?.[0] || '?').toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="flex-1 text-xs font-medium text-cyan-200 group-hover:text-cyan-100 truncate">
                            {conn.name}
                          </span>
                          {/* Relationship badge */}
                          {conn.isMutual ? (
                            <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black bg-teal-500/20 text-teal-400 border border-teal-500/30">
                              MUTUAL
                            </span>
                          ) : conn.isFollowing ? (
                            <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                              FOLLOWING
                            </span>
                          ) : conn.isFollower ? (
                            <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              FOLLOWS YOU
                            </span>
                          ) : null}
                          <span className="text-[9px] text-cyan-600 font-bold">
                            {conn.stockScore}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-cyan-800/30 px-4 py-2.5 bg-cyan-900/10">
                <Link
                  href="/network"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all"
                >
                  <Users className="w-3.5 h-3.5" />
                  Open Community Fishbowl
                </Link>
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* Fish Customizer Modal */}
      {showCustomizer && data?.user && (
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
