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

// 1. Arcade - covered passage with shops
const ArcadeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arcade-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#arcade-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Perspective view into arcade */}
      <path d="M5 15 L30 30 L30 70 L5 85" />
      <path d="M95 15 L70 30 L70 70 L95 85" />
      <path d="M30 30 L70 30" />
      <path d="M30 70 L70 70" />
      {/* Arched ceiling */}
      <path d="M30 30 Q50 20, 70 30" />
      <path d="M35 32 Q50 24, 65 32" opacity="0.5" />
      {/* Shop fronts along sides */}
      <path d="M10 25 L10 75 L28 68 L28 35 Z" opacity="0.4" />
      <path d="M90 25 L90 75 L72 68 L72 35 Z" opacity="0.4" />
      {/* Shop windows */}
      <path d="M12 35 L12 55 L26 52 L26 38 Z" />
      <path d="M88 35 L88 55 L74 52 L74 38 Z" />
      {/* Back wall with shops */}
      <path d="M35 35 L35 65 L48 65 L48 35 Z" />
      <path d="M52 35 L52 65 L65 65 L65 35 Z" />
      {/* Floor tiles in perspective */}
      <path d="M20 85 L40 70" strokeDasharray="2,2" opacity="0.3" />
      <path d="M50 85 L50 70" strokeDasharray="2,2" opacity="0.3" />
      <path d="M80 85 L60 70" strokeDasharray="2,2" opacity="0.3" />
      {/* Glass roof suggestion */}
      <path d="M30 30 L50 25 L70 30" strokeDasharray="3,3" opacity="0.4" />
    </g>
  </svg>
)

// 2. Boulevard - wide tree-lined street
const BoulevardSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="boulevard-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#boulevard-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Roadway in perspective */}
      <path d="M10 90 L40 40 L60 40 L90 90" />
      {/* Center median */}
      <path d="M45 90 L48 40" />
      <path d="M55 90 L52 40" />
      {/* Trees along boulevard */}
      <circle cx="20" cy="75" r="8" opacity="0.5" />
      <path d="M20 83 L20 90" strokeWidth="1" />
      <circle cx="30" cy="60" r="6" opacity="0.5" />
      <path d="M30 66 L30 72" strokeWidth="1" />
      <circle cx="80" cy="75" r="8" opacity="0.5" />
      <path d="M80 83 L80 90" strokeWidth="1" />
      <circle cx="70" cy="60" r="6" opacity="0.5" />
      <path d="M70 66 L70 72" strokeWidth="1" />
      {/* Central tree line */}
      <circle cx="50" cy="55" r="5" opacity="0.4" />
      <path d="M50 60 L50 65" strokeWidth="0.8" />
      {/* Buildings on sides */}
      <path d="M5 50 L5 90 L15 90 L15 65" opacity="0.3" />
      <path d="M95 50 L95 90 L85 90 L85 65" opacity="0.3" />
      {/* Sidewalks */}
      <path d="M12 90 L38 45" strokeWidth="0.5" />
      <path d="M88 90 L62 45" strokeWidth="0.5" />
    </g>
  </svg>
)

// 3. Bridge - structure spanning gap
const BridgeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bridge-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#bridge-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Arched bridge */}
      <path d="M5 60 Q50 20, 95 60" strokeWidth="1.2" />
      <path d="M5 65 Q50 28, 95 65" strokeWidth="0.5" />
      {/* Bridge deck */}
      <path d="M5 55 L95 55" />
      <path d="M5 60 L95 60" />
      {/* Balustrade */}
      <path d="M10 50 L90 50" />
      <path d="M10 55 L90 55" />
      {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
        <path key={i} d={`M${x} 50 L${x} 55`} />
      ))}
      {/* Arch voussoirs */}
      <path d="M20 52 Q35 35, 50 30 Q65 35, 80 52" strokeDasharray="3,3" opacity="0.4" />
      {/* Piers/abutments */}
      <path d="M5 60 L5 90 L15 90 L15 65" />
      <path d="M95 60 L95 90 L85 90 L85 65" />
      {/* Water below */}
      <path d="M10 85 Q30 82, 50 85 Q70 88, 90 85" opacity="0.4" />
      <path d="M15 90 Q35 87, 55 90 Q75 93, 85 90" opacity="0.3" />
      {/* Keystone */}
      <path d="M47 30 L50 25 L53 30" strokeWidth="1" />
    </g>
  </svg>
)

// 4. Fountain - water feature
const FountainSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="fountain-halo" intensity={1} />}
    <g filter={showHalo ? "url(#fountain-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Base basin */}
      <ellipse cx="50" cy="80" rx="35" ry="12" />
      <ellipse cx="50" cy="80" rx="30" ry="10" strokeWidth="0.5" />
      {/* Middle tier */}
      <ellipse cx="50" cy="55" rx="20" ry="7" />
      <path d="M30 55 L30 65 Q50 70, 70 65 L70 55" />
      {/* Top tier */}
      <ellipse cx="50" cy="35" rx="12" ry="4" />
      <path d="M38 35 L38 42 Q50 48, 62 42 L62 35" />
      {/* Central spout */}
      <path d="M50 35 L50 15" strokeWidth="1" />
      {/* Water jets */}
      <path d="M50 15 Q55 10, 60 20 Q62 30, 58 40" strokeDasharray="2,2" opacity="0.5" />
      <path d="M50 15 Q45 10, 40 20 Q38 30, 42 40" strokeDasharray="2,2" opacity="0.5" />
      <path d="M50 15 Q50 8, 50 18" strokeDasharray="2,2" opacity="0.5" />
      {/* Cascading water */}
      <path d="M62 42 Q65 48, 68 55" strokeDasharray="2,2" opacity="0.4" />
      <path d="M38 42 Q35 48, 32 55" strokeDasharray="2,2" opacity="0.4" />
      <path d="M70 60 Q75 68, 78 75" strokeDasharray="2,2" opacity="0.4" />
      <path d="M30 60 Q25 68, 22 75" strokeDasharray="2,2" opacity="0.4" />
      {/* Ground */}
      <path d="M10 92 L90 92" strokeWidth="1" />
    </g>
  </svg>
)

// 5. Kiosk - small structure
const KioskSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="kiosk-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#kiosk-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Domed roof */}
      <path d="M20 35 Q50 10, 80 35" />
      <path d="M25 35 Q50 15, 75 35" strokeWidth="0.5" />
      {/* Finial */}
      <path d="M50 10 L50 5" strokeWidth="1" />
      <circle cx="50" cy="4" r="2" />
      {/* Main body - octagonal */}
      <path d="M25 35 L25 75 L35 80 L65 80 L75 75 L75 35" />
      {/* Counter opening */}
      <path d="M30 45 L30 70 L70 70 L70 45" />
      <path d="M32 47 L68 47" strokeWidth="0.5" />
      {/* Shelves inside */}
      <path d="M35 55 L65 55" opacity="0.4" />
      <path d="M35 62 L65 62" opacity="0.4" />
      {/* Side panels */}
      <path d="M20 35 L20 75 L25 75" opacity="0.5" />
      <path d="M80 35 L80 75 L75 75" opacity="0.5" />
      {/* Base */}
      <path d="M18 75 L82 75 L85 85 L15 85 Z" />
      {/* Ground */}
      <path d="M10 85 L90 85" strokeWidth="1" />
      {/* Items/products suggestion */}
      <path d="M40 58 L45 58 L45 62 L40 62 Z" opacity="0.3" />
      <path d="M55 58 L60 58 L60 62 L55 62 Z" opacity="0.3" />
    </g>
  </svg>
)

// 6. Plaza - open public square
const PlazaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="plaza-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#plaza-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Paving pattern - perspective */}
      <path d="M10 80 L50 40 L90 80" />
      <path d="M10 80 L90 80" />
      {/* Grid lines */}
      <path d="M25 80 L50 55 L75 80" />
      <path d="M35 80 L50 65 L65 80" />
      <path d="M20 65 L80 65" opacity="0.5" />
      <path d="M30 55 L70 55" opacity="0.5" />
      {/* Central feature - statue */}
      <path d="M45 50 L45 65 L55 65 L55 50" />
      <path d="M47 45 Q50 40, 53 45 L53 50 L47 50 Z" opacity="0.6" />
      {/* Surrounding buildings */}
      <path d="M5 30 L5 75 L15 70 L15 40" opacity="0.3" />
      <path d="M95 30 L95 75 L85 70 L85 40" opacity="0.3" />
      <path d="M35 25 L35 40 L65 40 L65 25" opacity="0.3" />
      {/* Benches */}
      <path d="M20 72 L30 68 L30 72 L20 75 Z" opacity="0.5" />
      <path d="M70 72 L80 68 L80 72 L70 75 Z" opacity="0.5" />
      {/* Trees */}
      <circle cx="18" cy="58" r="5" opacity="0.4" />
      <circle cx="82" cy="58" r="5" opacity="0.4" />
    </g>
  </svg>
)

// 7. Promenade - walkway
const PromenadeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="promenade-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#promenade-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Walkway in perspective */}
      <path d="M5 85 L40 45 L60 45 L95 85" />
      <path d="M5 85 L95 85" strokeWidth="1" />
      {/* Balustrade */}
      <path d="M5 80 L95 80" />
      <path d="M5 75 L95 75" />
      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
        <path key={i} d={`M${x} 75 L${x} 80`} />
      ))}
      {/* View/sea beyond */}
      <path d="M40 45 L40 30" opacity="0.3" />
      <path d="M60 45 L60 30" opacity="0.3" />
      <path d="M30 25 Q50 20, 70 25" strokeDasharray="2,2" opacity="0.3" />
      {/* Lamp posts */}
      <path d="M20 65 L20 75" strokeWidth="1" />
      <ellipse cx="20" cy="63" rx="3" ry="2" />
      <path d="M80 65 L80 75" strokeWidth="1" />
      <ellipse cx="80" cy="63" rx="3" ry="2" />
      {/* Benches */}
      <path d="M35 78 L45 78 L45 82 L35 82 Z" />
      <path d="M55 78 L65 78 L65 82 L55 82 Z" />
      {/* Paving pattern */}
      <path d="M50 85 L50 50" strokeDasharray="3,3" opacity="0.3" />
    </g>
  </svg>
)

// 8. Square - urban open space
const SquareSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="square-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#square-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Square boundary */}
      <path d="M15 15 L15 85 L85 85 L85 15 Z" />
      {/* Buildings around square */}
      <path d="M5 10 L5 90 L15 90 L15 15 L5 10" opacity="0.3" />
      <path d="M95 10 L95 90 L85 90 L85 15 L95 10" opacity="0.3" />
      <path d="M15 10 L85 10 L85 15 L15 15 Z" opacity="0.3" />
      {/* Central monument */}
      <path d="M45 40 L45 65 L55 65 L55 40" />
      <path d="M42 65 L42 72 L58 72 L58 65" />
      <path d="M50 40 L50 30" strokeWidth="1" />
      <path d="M47 32 L53 32" />
      {/* Paths crossing square */}
      <path d="M50 15 L50 40" strokeDasharray="2,2" />
      <path d="M50 72 L50 85" strokeDasharray="2,2" />
      <path d="M15 50 L42 50" strokeDasharray="2,2" />
      <path d="M58 50 L85 50" strokeDasharray="2,2" />
      {/* Corner areas (gardens) */}
      <circle cx="30" cy="30" r="8" opacity="0.3" />
      <circle cx="70" cy="30" r="8" opacity="0.3" />
      <circle cx="30" cy="70" r="8" opacity="0.3" />
      <circle cx="70" cy="70" r="8" opacity="0.3" />
    </g>
  </svg>
)

// 9. Street - urban roadway
const StreetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="street-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#street-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Street in perspective */}
      <path d="M20 90 L45 30" />
      <path d="M80 90 L55 30" />
      {/* Center line */}
      <path d="M50 90 L50 30" strokeDasharray="5,5" />
      {/* Sidewalks */}
      <path d="M10 90 L40 30" strokeWidth="0.5" />
      <path d="M90 90 L60 30" strokeWidth="0.5" />
      {/* Buildings left */}
      <path d="M5 40 L5 90 L18 90 L18 55" opacity="0.4" />
      <path d="M8 45 L8 60 L15 58 L15 48 Z" />
      <path d="M8 65 L8 85 L15 82 L15 62 Z" />
      {/* Buildings right */}
      <path d="M95 40 L95 90 L82 90 L82 55" opacity="0.4" />
      <path d="M92 45 L92 60 L85 58 L85 48 Z" />
      <path d="M92 65 L92 85 L85 82 L85 62 Z" />
      {/* Street lamps */}
      <path d="M25 65 L25 75" strokeWidth="0.8" />
      <circle cx="25" cy="63" r="2" />
      <path d="M75 65 L75 75" strokeWidth="0.8" />
      <circle cx="75" cy="63" r="2" />
      {/* Crosswalk */}
      <path d="M35 85 L65 85" />
      <path d="M36 87 L64 87" />
      <path d="M37 89 L63 89" />
    </g>
  </svg>
)

// 10. Waterfront - edge along water
const WaterfrontSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="waterfront-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#waterfront-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Quay/dock edge */}
      <path d="M5 55 L95 55" strokeWidth="1.5" />
      <path d="M5 58 L95 58" />
      {/* Water */}
      <path d="M5 65 Q20 62, 35 65 Q50 68, 65 65 Q80 62, 95 65" opacity="0.5" />
      <path d="M5 75 Q25 72, 45 75 Q65 78, 85 75" opacity="0.4" />
      <path d="M5 85 Q30 82, 55 85 Q80 88, 95 85" opacity="0.3" />
      {/* Bollards */}
      <path d="M15 52 L15 55" strokeWidth="1.5" />
      <path d="M35 52 L35 55" strokeWidth="1.5" />
      <path d="M55 52 L55 55" strokeWidth="1.5" />
      <path d="M75 52 L75 55" strokeWidth="1.5" />
      {/* Buildings behind */}
      <path d="M10 25 L10 50 L30 50 L30 30" opacity="0.3" />
      <path d="M35 20 L35 50 L55 50 L55 25" opacity="0.3" />
      <path d="M60 30 L60 50 L85 50 L85 35" opacity="0.3" />
      {/* Boat */}
      <path d="M65 70 Q70 65, 80 68 Q85 72, 80 75 L68 75 Q62 72, 65 70" />
      <path d="M72 68 L72 60" />
      {/* Promenade */}
      <path d="M5 50 L95 50" />
      {/* Lamp posts */}
      <path d="M25 42 L25 50" />
      <ellipse cx="25" cy="40" rx="3" ry="2" />
    </g>
  </svg>
)

// Export mapping for all urban elements
export const URBAN_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'arcade': ArcadeSVG,
  'boulevard': BoulevardSVG,
  'bridge': BridgeSVG,
  'fountain': FountainSVG,
  'kiosk': KioskSVG,
  'plaza': PlazaSVG,
  'promenade': PromenadeSVG,
  'square': SquareSVG,
  'street': StreetSVG,
  'waterfront': WaterfrontSVG,
}

export {
  ArcadeSVG,
  BoulevardSVG,
  BridgeSVG,
  FountainSVG,
  KioskSVG,
  PlazaSVG,
  PromenadeSVG,
  SquareSVG,
  StreetSVG,
  WaterfrontSVG,
}
