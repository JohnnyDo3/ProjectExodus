'use client'

import React from 'react'

// Reusable HaloFilter for golden glow effect
const HaloFilter = ({ id, intensity = 1 }: { id: string; intensity?: number }) => (
  <defs>
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation={3 * intensity} result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values={`1 0 0 0 0.3
                0 0.8 0 0 0.2
                0 0 0.2 0 0
                0 0 0 ${0.6 * intensity} 0`}
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
)

interface SVGProps {
  showHalo?: boolean
}

// 1. Battlement - parapet with alternating merlons and crenels
const BattlementSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="battlement-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#battlement-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Wall below */}
      <path d="M10 50 L10 95 L90 95 L90 50" />
      {/* Crenelated parapet - merlons (high parts) and crenels (low parts) */}
      <path d="M10 50 L10 30 L22 30 L22 45 L32 45 L32 30 L44 30 L44 45 L54 45 L54 30 L66 30 L66 45 L76 45 L76 30 L90 30 L90 50" />
      {/* Inner face of merlons */}
      <path d="M12 32 L12 48" strokeWidth="0.4" />
      <path d="M20 32 L20 48" strokeWidth="0.4" />
      <path d="M34 32 L34 43" strokeWidth="0.4" />
      <path d="M42 32 L42 43" strokeWidth="0.4" />
      <path d="M56 32 L56 43" strokeWidth="0.4" />
      <path d="M64 32 L64 43" strokeWidth="0.4" />
      <path d="M78 32 L78 48" strokeWidth="0.4" />
      <path d="M88 32 L88 48" strokeWidth="0.4" />
      {/* Arrow loops in merlons */}
      <path d="M16 36 L16 42" strokeWidth="1.5" />
      <path d="M38 34 L38 40" strokeWidth="1.5" />
      <path d="M60 34 L60 40" strokeWidth="1.5" />
      <path d="M82 36 L82 42" strokeWidth="1.5" />
      {/* Wall walk behind */}
      <path d="M12 50 L88 50" strokeDasharray="2,2" opacity="0.4" />
      {/* Stone texture on wall */}
      <path d="M20 60 L35 60" opacity="0.3" />
      <path d="M45 60 L70 60" opacity="0.3" />
      <path d="M15 75 L40 75" opacity="0.3" />
      <path d="M50 75 L80 75" opacity="0.3" />
      <path d="M25 88 L55 88" opacity="0.3" />
    </g>
  </svg>
)

// 2. Drawbridge - retractable bridge over moat
const DrawbridgeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="drawbridge-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#drawbridge-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Castle walls/towers on sides */}
      <path d="M5 20 L5 95 L25 95 L25 20" />
      <path d="M75 20 L75 95 L95 95 L95 20" />
      {/* Battlements on towers */}
      <path d="M5 20 L5 12 L10 12 L10 18 L15 18 L15 12 L20 12 L20 18 L25 18 L25 20" />
      <path d="M75 20 L75 12 L80 12 L80 18 L85 18 L85 12 L90 12 L90 18 L95 18 L95 20" />
      {/* Gate opening */}
      <path d="M25 35 L25 75 Q50 85, 75 75 L75 35 Q50 25, 25 35" />
      {/* Drawbridge (raised position shown with dashed) */}
      <path d="M25 75 L75 75" strokeWidth="1.5" />
      <path d="M28 78 L72 78" />
      {/* Bridge planks */}
      {[30, 40, 50, 60, 70].map((x, i) => (
        <path key={i} d={`M${x} 75 L${x} 78`} />
      ))}
      {/* Chains */}
      <path d="M28 35 L35 75" strokeDasharray="2,2" />
      <path d="M72 35 L65 75" strokeDasharray="2,2" />
      {/* Chain windlass positions */}
      <circle cx="28" cy="35" r="3" />
      <circle cx="72" cy="35" r="3" />
      {/* Moat water */}
      <path d="M5 85 Q25 92, 50 85 Q75 78, 95 85" opacity="0.4" />
      <path d="M5 90 Q25 97, 50 90 Q75 83, 95 90" opacity="0.3" />
      {/* Arrow loops in towers */}
      <path d="M15 45 L15 55" strokeWidth="1.2" />
      <path d="M85 45 L85 55" strokeWidth="1.2" />
    </g>
  </svg>
)

// 3. Moat - defensive water-filled ditch
const MoatSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="moat-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#moat-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Castle wall */}
      <path d="M30 15 L30 55 L70 55 L70 15" />
      {/* Battlements */}
      <path d="M30 15 L30 8 L38 8 L38 13 L46 13 L46 8 L54 8 L54 13 L62 13 L62 8 L70 8 L70 15" />
      {/* Inner bank slope */}
      <path d="M25 55 L15 70" />
      <path d="M75 55 L85 70" />
      {/* Moat water */}
      <path d="M5 70 L95 70" strokeWidth="2" />
      <path d="M5 75 L95 75" strokeWidth="1.5" />
      <path d="M5 80 L95 80" strokeWidth="1" />
      {/* Water ripples */}
      <path d="M15 72 Q20 70, 25 72 Q30 74, 35 72" opacity="0.5" />
      <path d="M45 73 Q50 71, 55 73 Q60 75, 65 73" opacity="0.5" />
      <path d="M70 72 Q75 70, 80 72 Q85 74, 90 72" opacity="0.5" />
      {/* Outer bank slope */}
      <path d="M5 85 L15 70" />
      <path d="M95 85 L85 70" />
      {/* Outer ground */}
      <path d="M5 85 L5 95 L95 95 L95 85" opacity="0.3" />
      {/* Moat bottom (dashed) */}
      <path d="M15 82 L85 82" strokeDasharray="3,3" opacity="0.3" />
      {/* Revetment stones on wall base */}
      <path d="M28 55 L28 58 L72 58 L72 55" opacity="0.5" />
      {/* Section label - cross hatching for water */}
      <path d="M20 75 L25 70" opacity="0.2" />
      <path d="M30 80 L40 70" opacity="0.2" />
      <path d="M50 80 L60 70" opacity="0.2" />
      <path d="M70 80 L80 70" opacity="0.2" />
    </g>
  </svg>
)

// 4. Portcullis - heavy sliding gate
const PortcullisSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="portcullis-halo" intensity={1} />}
    <g filter={showHalo ? "url(#portcullis-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Gate archway */}
      <path d="M15 95 L15 35 Q50 10, 85 35 L85 95" />
      <path d="M20 92 L20 38 Q50 18, 80 38 L80 92" />
      {/* Slot for portcullis */}
      <path d="M17 35 L17 95" strokeWidth="0.4" />
      <path d="M83 35 L83 95" strokeWidth="0.4" />
      {/* The portcullis grid - vertical bars */}
      {[28, 38, 50, 62, 72].map((x, i) => (
        <path key={i} d={`M${x} 25 L${x} 90`} strokeWidth="1.5" />
      ))}
      {/* Horizontal bars */}
      {[35, 50, 65, 80].map((y, i) => (
        <path key={i} d={`M25 ${y} L75 ${y}`} strokeWidth="1.2" />
      ))}
      {/* Pointed bottoms on vertical bars */}
      {[28, 38, 50, 62, 72].map((x, i) => (
        <path key={i} d={`M${x-2} 90 L${x} 95 L${x+2} 90`} />
      ))}
      {/* Lifting chains */}
      <path d="M35 20 L35 8 L40 8" strokeDasharray="1,1" />
      <path d="M65 20 L65 8 L60 8" strokeDasharray="1,1" />
      {/* Winch mechanism suggestion above */}
      <path d="M40 5 L60 5 L60 10 L40 10 Z" opacity="0.5" />
      <circle cx="50" cy="7.5" r="2" opacity="0.5" />
      {/* Stonework around arch */}
      <path d="M12 95 L12 33 Q50 5, 88 33 L88 95" strokeWidth="0.4" />
    </g>
  </svg>
)

// 5. Tower - defensive vertical structure
const TowerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tower-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#tower-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Main tower body */}
      <path d="M25 95 L25 35 L75 35 L75 95" />
      {/* Battlements */}
      <path d="M23 35 L23 25 L32 25 L32 32 L42 32 L42 25 L52 25 L52 32 L62 32 L62 25 L72 25 L72 32 L77 32 L77 35" />
      {/* Machicolations */}
      <path d="M20 40 L25 40 L25 35" />
      <path d="M80 40 L75 40 L75 35" />
      <path d="M22 40 L22 45 L25 45" />
      <path d="M78 40 L78 45 L75 45" />
      {/* Arrow slits at various levels */}
      <path d="M35 50 L35 60" strokeWidth="1.5" />
      <path d="M50 50 L50 60" strokeWidth="1.5" />
      <path d="M65 50 L65 60" strokeWidth="1.5" />
      <path d="M42 70 L42 80" strokeWidth="1.5" />
      <path d="M58 70 L58 80" strokeWidth="1.5" />
      {/* Entrance at base */}
      <path d="M40 78 L40 95 L60 95 L60 78 Q50 72, 40 78" />
      {/* Conical roof (typical for towers) */}
      <path d="M20 35 L50 10 L80 35" strokeDasharray="2,2" opacity="0.5" />
      {/* Stone courses */}
      <path d="M25 55 L75 55" strokeWidth="0.4" opacity="0.4" />
      <path d="M25 75 L40 75" strokeWidth="0.4" opacity="0.4" />
      <path d="M60 75 L75 75" strokeWidth="0.4" opacity="0.4" />
      {/* Corner quoins */}
      <path d="M25 40 L28 40 L28 48 L25 48" opacity="0.5" />
      <path d="M72 40 L75 40 L75 48 L72 48" opacity="0.5" />
      <path d="M25 85 L28 85 L28 92 L25 92" opacity="0.5" />
      <path d="M72 85 L75 85 L75 92 L72 92" opacity="0.5" />
    </g>
  </svg>
)

// Export mapping for all fortification elements
export const FORTIFICATION_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'battlement': BattlementSVG,
  'drawbridge': DrawbridgeSVG,
  'moat': MoatSVG,
  'portcullis': PortcullisSVG,
  'tower': TowerSVG,
}

export {
  BattlementSVG,
  DrawbridgeSVG,
  MoatSVG,
  PortcullisSVG,
  TowerSVG,
}
