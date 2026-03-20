'use client'

import { memo, useRef, useEffect, useState, useCallback } from 'react'
import { getTierName, type FishTier } from './FishSpecies'
import { User, MessageCircle, UserPlus, UserMinus, Eye, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface FishOverlayProps {
  fish: {
    id: string
    userId: string
    name: string
    stockScore: number
    image: string | null
    tier: FishTier
  } | null
  position: { x: number; y: number } | null
  mode: 'hover' | 'click'
  onClose: () => void
  containerRect: DOMRect | null
}

const TIER_DESCRIPTIONS: Record<FishTier, string> = {
  0: 'Just getting started',
  1: 'Building momentum',
  2: 'Rising contributor',
  3: 'Notable presence',
  4: 'Community leader',
  5: 'Legendary status',
}

export const FishOverlay = memo(({ fish, position, mode, onClose, containerRect }: FishOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [adjustedPos, setAdjustedPos] = useState<{ x: number; y: number } | null>(null)
  const { data: session } = useSession()

  // Follow state
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null)
  const [followLoading, setFollowLoading] = useState(false)

  // Fetch follow status when click modal opens for a fish
  useEffect(() => {
    if (!fish || mode !== 'click' || !session?.user?.id || fish.userId === session.user.id) return
    setIsFollowing(null)

    const controller = new AbortController()
    fetch(`/api/users/${fish.userId}/follow`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.success) setIsFollowing(data.data.isFollowing)
      })
      .catch(() => {})

    return () => controller.abort()
  }, [fish?.userId, mode, session?.user?.id])

  const handleFollowToggle = useCallback(async () => {
    if (!fish || followLoading || isFollowing === null) return
    setFollowLoading(true)

    try {
      const res = await fetch(`/api/users/${fish.userId}/follow`, {
        method: isFollowing ? 'DELETE' : 'POST',
      })
      const data = await res.json()
      if (data.success) {
        setIsFollowing(!isFollowing)
      }
    } catch {
      // silently fail
    } finally {
      setFollowLoading(false)
    }
  }, [fish, isFollowing, followLoading])

  useEffect(() => {
    if (!position || !containerRect || !overlayRef.current) {
      setAdjustedPos(null)
      return
    }

    const rect = overlayRef.current.getBoundingClientRect()
    let x = position.x - containerRect.left
    let y = position.y - containerRect.top - (mode === 'hover' ? 70 : 10)

    // Keep within container bounds
    if (x + rect.width > containerRect.width) x = containerRect.width - rect.width - 8
    if (x < 8) x = 8
    if (y < 8) y = position.y - containerRect.top + 40
    if (y + rect.height > containerRect.height) y = containerRect.height - rect.height - 8

    setAdjustedPos({ x, y })
  }, [position, containerRect, mode])

  if (!fish || !position) return null

  const tierName = getTierName(fish.tier)
  const tierDesc = TIER_DESCRIPTIONS[fish.tier]

  // Hover mode: just show a small tooltip
  if (mode === 'hover') {
    return (
      <div
        ref={overlayRef}
        className="absolute pointer-events-none z-50 animate-in fade-in duration-150"
        style={{
          left: adjustedPos ? `${adjustedPos.x}px` : `${position.x - (containerRect?.left || 0)}px`,
          top: adjustedPos ? `${adjustedPos.y}px` : `${position.y - (containerRect?.top || 0) - 70}px`,
        }}
      >
        <div className="bg-[#0A1628]/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 shadow-lg shadow-cyan-900/20">
          <div className="flex items-center gap-2">
            {fish.image ? (
              <img src={fish.image} alt="" className="w-6 h-6 rounded-full object-cover border border-cyan-400/50" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-cyan-800 flex items-center justify-center">
                <User className="w-3 h-3 text-cyan-300" />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-cyan-100">{fish.name}</p>
              <p className="text-[10px] text-cyan-400">{tierName} · STOCK {fish.stockScore}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Click mode: show full overlay with options
  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-40"
        onClick={onClose}
      />
      <div
        ref={overlayRef}
        className="absolute z-50 animate-in fade-in zoom-in-95 duration-200"
        style={{
          left: adjustedPos ? `${adjustedPos.x}px` : `${position.x - (containerRect?.left || 0)}px`,
          top: adjustedPos ? `${adjustedPos.y}px` : `${position.y - (containerRect?.top || 0)}px`,
        }}
      >
        <div className="bg-[#0A1628]/95 backdrop-blur-md border border-cyan-500/40 rounded-xl p-4 shadow-xl shadow-cyan-900/30 min-w-[200px]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-cyan-800/50">
            {fish.image ? (
              <img src={fish.image} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400/50" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-700 to-blue-800 flex items-center justify-center">
                <User className="w-5 h-5 text-cyan-300" />
              </div>
            )}
            <div>
              <p className="text-sm font-black text-cyan-100">{fish.name}</p>
              <p className="text-xs text-cyan-400 font-medium">{tierName}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-cyan-900/30 rounded-lg p-2 text-center">
              <p className="text-[10px] text-cyan-500 font-medium">STOCK</p>
              <p className="text-sm font-black text-cyan-200">{fish.stockScore}</p>
            </div>
            <div className="bg-cyan-900/30 rounded-lg p-2 text-center">
              <p className="text-[10px] text-cyan-500 font-medium">TIER</p>
              <p className="text-sm font-black text-cyan-200">{fish.tier + 1}/6</p>
            </div>
          </div>
          <p className="text-[10px] text-cyan-500/80 font-medium mb-3 italic">{tierDesc}</p>

          {/* Action buttons */}
          <div className="space-y-1.5">
            <Link
              href={`/profile/${fish.userId}`}
              className="flex items-center gap-2 w-full px-3 py-2 bg-cyan-800/30 hover:bg-cyan-700/40 rounded-lg text-xs font-bold text-cyan-200 transition-colors"
              onClick={onClose}
            >
              <Eye className="w-3.5 h-3.5" />
              View Profile
            </Link>
            <Link
              href={`/messages?user=${fish.userId}`}
              className="flex items-center gap-2 w-full px-3 py-2 bg-cyan-800/30 hover:bg-cyan-700/40 rounded-lg text-xs font-bold text-cyan-200 transition-colors"
              onClick={onClose}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Send Message
            </Link>
            {session?.user?.id && fish.userId !== session.user.id && (
              <button
                onClick={handleFollowToggle}
                disabled={followLoading || isFollowing === null}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                  isFollowing
                    ? 'bg-cyan-800/30 hover:bg-red-900/40 text-cyan-200 hover:text-red-300'
                    : 'bg-cyan-800/30 hover:bg-cyan-700/40 text-cyan-200'
                }`}
              >
                {followLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isFollowing ? (
                  <UserMinus className="w-3.5 h-3.5" />
                ) : (
                  <UserPlus className="w-3.5 h-3.5" />
                )}
                {followLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
})
FishOverlay.displayName = 'FishOverlay'
