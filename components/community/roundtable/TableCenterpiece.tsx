'use client'

import { TrendingUp, Hash, Users } from 'lucide-react'

interface TrendingHashtag {
  hashtag: string
  count: number
}

interface TableCenterpieceProps {
  trending: TrendingHashtag[]
  totalPosts: number
}

export function TableCenterpiece({ trending, totalPosts }: TableCenterpieceProps) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[240px] z-30 pointer-events-none">
      <div className="text-center space-y-3">
        {/* Table nameplate */}
        <div className="mx-auto px-4 py-2 rounded-lg bg-[#3A2508]/80 border border-[#8B6914]/40 backdrop-blur-sm shadow-lg">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A54A]">
            Round Table
          </h3>
          <p className="text-[9px] text-[#8B6914] font-medium mt-0.5">
            {totalPosts} discussions
          </p>
        </div>

        {/* Trending tags */}
        {trending.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-[9px] text-[#8B6914]">
              <TrendingUp className="w-3 h-3" />
              <span className="font-bold uppercase tracking-wider">Trending</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              {trending.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-[#3A2508]/60 border border-[#8B6914]/30 text-[#D4A54A]"
                >
                  <Hash className="w-2 h-2 inline mr-0.5" />
                  {tag.hashtag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
