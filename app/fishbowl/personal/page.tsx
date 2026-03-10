'use client'

import { useState, useEffect } from 'react'
import { Fish, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Fishbowl } from '@/components/fishbowl/Fishbowl'
import { FishSVG, getTierFromScore, getTierName } from '@/components/fishbowl/FishSpecies'

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

export default function PersonalFishbowlPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<PersonalFishbowlData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login')
    }
  }, [status])

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
        console.error('Error fetching personal fishbowl:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [status])

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A1628' }}>
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A1628' }}>
        <p className="text-cyan-500">Unable to load your fishbowl.</p>
      </div>
    )
  }

  const fishbowlUsers = [
    ...(data.user ? [data.user] : []),
    ...data.connections,
  ]

  const userTier = data.user ? getTierFromScore(data.user.stockScore) : 0
  const userTierName = data.user ? getTierName(userTier) : 'Guppy'

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D2137 30%, #123855 100%)' }}>
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Fish className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-black text-cyan-100">My Fishbowl</h1>
          </div>
          <Link
            href="/network"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all"
          >
            <Users className="w-4 h-4" />
            Community Fishbowl
          </Link>
        </div>

        {/* User info card */}
        {data.user && (
          <div className="rounded-2xl border-2 border-cyan-700/40 overflow-hidden mb-6" style={{ background: '#0D2137' }}>
            <div className="px-6 py-4 flex items-center gap-4">
              <FishSVG tier={userTier} size={48} id="personal-page-fish" />
              <div className="flex-1 min-w-0">
                <p className="text-lg font-black text-cyan-200 truncate">{data.user.name}</p>
                <p className="text-sm text-cyan-500">
                  {userTierName} · {data.user.stockScore} STOCK
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xl font-black text-cyan-300">{data.stats.following}</p>
                  <p className="text-xs font-bold text-cyan-600 uppercase">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-cyan-300">{data.stats.followers}</p>
                  <p className="text-xs font-bold text-cyan-600 uppercase">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-teal-300">{data.stats.mutual}</p>
                  <p className="text-xs font-bold text-cyan-600 uppercase">Mutual</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fishbowl visualization */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-2xl border-2 border-cyan-700/40 overflow-hidden" style={{ background: '#0A1628' }}>
          <div className="h-[400px] sm:h-[500px] relative">
            {fishbowlUsers.length > 0 ? (
              <Fishbowl users={fishbowlUsers} maxVisible={12} />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0D2137 40%, #123855 100%)' }}>
                <div className="text-center space-y-3">
                  <Fish className="w-12 h-12 text-cyan-700 mx-auto" />
                  <p className="text-sm font-bold text-cyan-600">Your fishbowl is empty</p>
                  <p className="text-xs text-cyan-700">Follow people to add fish!</p>
                  <Link
                    href="/network"
                    className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Find People
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Connections list */}
        {data.connections.length > 0 && (
          <div className="mt-6 rounded-2xl border-2 border-cyan-700/40 overflow-hidden mb-8" style={{ background: '#0D2137' }}>
            <div className="px-5 py-3 border-b border-cyan-800/40">
              <p className="text-sm font-black text-cyan-200">Your Connections ({data.connections.length})</p>
            </div>
            <div className="divide-y divide-cyan-800/20 max-h-[400px] overflow-y-auto">
              {data.connections.map(conn => {
                const tier = getTierFromScore(conn.stockScore)
                return (
                  <Link
                    key={conn.id}
                    href={`/profile/${conn.id}`}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-cyan-900/20 transition-colors group"
                  >
                    <FishSVG tier={tier} size={24} id={`pf-page-${conn.id}`} />
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-cyan-900/40 flex-shrink-0">
                      {conn.image ? (
                        <img src={conn.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs font-black text-cyan-400">
                            {(conn.name?.[0] || '?').toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="flex-1 text-sm font-medium text-cyan-200 group-hover:text-cyan-100 truncate">
                      {conn.name}
                    </span>
                    {conn.isMutual ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-500/20 text-teal-400 border border-teal-500/30">
                        MUTUAL
                      </span>
                    ) : conn.isFollowing ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        FOLLOWING
                      </span>
                    ) : conn.isFollower ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        FOLLOWS YOU
                      </span>
                    ) : null}
                    <span className="text-xs text-cyan-600 font-bold">
                      {conn.stockScore} STOCK
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
