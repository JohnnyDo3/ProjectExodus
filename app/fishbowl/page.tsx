'use client'

import { useState, useEffect } from 'react'
import { Fish, Users, Info } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Fishbowl } from '@/components/fishbowl/Fishbowl'
import { FishSVG, getTierFromScore, getTierName } from '@/components/fishbowl/FishSpecies'
import '@/components/fishbowl/fishbowl.css'

interface FishbowlUser {
  id: string
  name: string | null
  stockScore: number
  image: string | null
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

export default function FishbowlPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<PersonalFishbowlData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

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
            <div className="flex items-center gap-3">
              {/* Your fish info */}
              {data.user && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-900/30 border border-cyan-800/40">
                  <FishSVG tier={userTier} size={24} />
                  <div>
                    <p className="text-[10px] text-cyan-500 font-medium">YOUR FISH</p>
                    <p className="text-xs font-bold text-cyan-200">{userTierName} · {data.user.stockScore} STOCK</p>
                  </div>
                </div>
              )}
              {/* Stats */}
              <div className="hidden sm:flex items-center gap-3">
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
                Each connection is a fish in your personal tank. Hover to see who they are. Click to view profile, message, or connect.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fishbowl tank - fills remaining space */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden min-h-0">
        {fishbowlUsers.length > 0 ? (
          <div className="w-full h-full rounded-2xl border-2 border-cyan-800/40 shadow-lg shadow-cyan-900/20 overflow-hidden">
            <Fishbowl users={fishbowlUsers} />
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
    </div>
  )
}
