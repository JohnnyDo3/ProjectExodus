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

// 1. Apse - semicircular recess at end of church
const ApseSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="apse-halo" intensity={1} />}
    <g filter={showHalo ? "url(#apse-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Nave walls leading to apse */}
      <path d="M20 90 L20 40" />
      <path d="M80 90 L80 40" />
      {/* Semi-circular apse */}
      <path d="M20 40 Q20 10, 50 10 Q80 10, 80 40" />
      {/* Conch (semi-dome) lines */}
      <path d="M25 38 Q25 18, 50 18 Q75 18, 75 38" />
      <path d="M30 36 Q30 25, 50 25 Q70 25, 70 36" />
      {/* Radiating ribs in conch */}
      <path d="M50 10 L50 40" />
      <path d="M35 15 L40 40" />
      <path d="M65 15 L60 40" />
      {/* High altar position */}
      <path d="M40 50 L40 45 L60 45 L60 50" />
      <path d="M42 45 L42 42 L58 42 L58 45" />
      {/* Floor pattern */}
      <path d="M30 90 L30 50 Q50 45, 70 50 L70 90" strokeDasharray="2,2" opacity="0.3" />
      {/* Windows in apse */}
      <path d="M35 25 L35 35 Q38 32, 35 25" />
      <path d="M50 18 L50 35 Q53 30, 50 18" />
      <path d="M65 25 L65 35 Q62 32, 65 25" />
    </g>
  </svg>
)

// 2. Altar - sacred table for worship
const AltarSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="altar-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#altar-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Mensa (altar table top) */}
      <path d="M15 45 L85 45 L85 52 L15 52 Z" />
      <path d="M18 48 L82 48" strokeWidth="0.4" />
      {/* Altar frontal/antependium */}
      <path d="M18 52 L18 82 L82 82 L82 52" />
      {/* Decorative panels */}
      <path d="M25 58 L25 76 L45 76 L45 58 Z" />
      <path d="M55 58 L55 76 L75 76 L75 58 Z" />
      {/* Cross on front panel */}
      <path d="M35 62 L35 72" strokeWidth="1" />
      <path d="M31 66 L39 66" strokeWidth="1" />
      <path d="M65 62 L65 72" strokeWidth="1" />
      <path d="M61 66 L69 66" strokeWidth="1" />
      {/* Predella (altar step) */}
      <path d="M12 82 L88 82 L88 90 L12 90 Z" />
      {/* Altar crucifix */}
      <path d="M50 25 L50 45" strokeWidth="1.2" />
      <path d="M42 32 L58 32" strokeWidth="1.2" />
      {/* Candlesticks */}
      <path d="M25 40 L25 45" />
      <path d="M23 38 L27 38 L26 40 L24 40 Z" />
      <path d="M24 35 L25 38" />
      <path d="M75 40 L75 45" />
      <path d="M73 38 L77 38 L76 40 L74 40 Z" />
      <path d="M74 35 L75 38" />
    </g>
  </svg>
)

// 3. Baptistery - building/area for baptisms
const BaptisterySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="baptistery-halo" intensity={1} />}
    <g filter={showHalo ? "url(#baptistery-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Octagonal plan outline */}
      <path d="M50 10 L75 20 L85 45 L75 70 L50 80 L25 70 L15 45 L25 20 Z" />
      {/* Inner octagon */}
      <path d="M50 18 L68 26 L76 45 L68 64 L50 72 L32 64 L24 45 L32 26 Z" />
      {/* Central font (circular) */}
      <circle cx="50" cy="45" r="15" />
      <circle cx="50" cy="45" r="12" />
      {/* Water indication */}
      <path d="M42 45 Q45 42, 50 45 Q55 48, 58 45" opacity="0.5" />
      {/* Font pedestal */}
      <path d="M44 60 L44 65 L56 65 L56 60" />
      <path d="M42 65 L42 72 L58 72 L58 65" />
      {/* Dome indication above */}
      <path d="M30 15 Q50 0, 70 15" strokeDasharray="2,2" />
      {/* Niches in walls */}
      <path d="M76 35 Q82 45, 76 55" />
      <path d="M24 35 Q18 45, 24 55" />
      {/* Entry */}
      <path d="M45 80 L45 90 L55 90 L55 80" />
      {/* Steps around font */}
      <ellipse cx="50" cy="50" rx="20" ry="12" strokeDasharray="3,3" opacity="0.4" />
    </g>
  </svg>
)

// 4. Bell Tower / Campanile
const BellTowerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="belltower-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#belltower-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Tower base */}
      <path d="M30 95 L30 70 L70 70 L70 95" />
      {/* First tier */}
      <path d="M28 70 L28 50 L72 50 L72 70" />
      <path d="M25 70 L75 70" strokeWidth="1.2" />
      {/* Second tier (belfry) */}
      <path d="M30 50 L30 30 L70 30 L70 50" />
      <path d="M27 50 L73 50" strokeWidth="1.2" />
      {/* Belfry openings (arched) */}
      <path d="M35 35 L35 48 Q40 42, 45 48 L45 35" />
      <path d="M55 35 L55 48 Q60 42, 65 48 L65 35" />
      {/* Bell inside */}
      <path d="M48 38 Q50 35, 52 38 L54 45 L46 45 Z" opacity="0.6" />
      {/* Pyramidal roof */}
      <path d="M30 30 L50 10 L70 30" />
      <path d="M35 30 L50 14 L65 30" strokeWidth="0.5" />
      {/* Cross finial */}
      <path d="M50 10 L50 5" strokeWidth="1" />
      <path d="M47 7 L53 7" strokeWidth="1" />
      {/* Window in lower tier */}
      <path d="M45 75 L45 85 L55 85 L55 75 Q50 72, 45 75" />
      {/* String courses */}
      <path d="M28 55 L72 55" strokeWidth="0.4" />
      <path d="M28 60 L72 60" strokeWidth="0.4" />
    </g>
  </svg>
)

// 5. Chancel - area around altar
const ChancelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="chancel-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#chancel-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Chancel walls */}
      <path d="M25 90 L25 40" />
      <path d="M75 90 L75 40" />
      {/* East end (apse suggestion) */}
      <path d="M25 40 Q50 25, 75 40" />
      {/* Chancel arch (from nave) */}
      <path d="M20 90 Q20 75, 30 75 L70 75 Q80 75, 80 90" />
      <path d="M30 75 Q50 65, 70 75" strokeWidth="1.2" />
      {/* Altar */}
      <path d="M40 50 L60 50 L60 55 L40 55 Z" />
      <path d="M42 55 L42 60 L58 60 L58 55" />
      {/* Altar rails */}
      <path d="M30 65 L70 65" />
      <path d="M30 68 L70 68" />
      {[35, 45, 55, 65].map((x, i) => (
        <path key={i} d={`M${x} 65 L${x} 68`} />
      ))}
      {/* Choir stalls indication */}
      <path d="M28 72 L28 85 L35 85 L35 72" opacity="0.5" />
      <path d="M65 72 L65 85 L72 85 L72 72" opacity="0.5" />
      {/* Reredos behind altar */}
      <path d="M35 42 L35 50 L65 50 L65 42 Q50 35, 35 42" />
      {/* Floor tiles */}
      <path d="M30 78 L70 78" strokeDasharray="2,2" opacity="0.3" />
      <path d="M30 85 L70 85" strokeDasharray="2,2" opacity="0.3" />
    </g>
  </svg>
)

// 6. Chapel - small church or side room
const ChapelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="chapel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#chapel-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Simple rectangular structure */}
      <path d="M20 35 L20 90 L80 90 L80 35" />
      {/* Gabled roof */}
      <path d="M18 35 L50 15 L82 35" />
      <path d="M22 35 L50 18 L78 35" strokeWidth="0.5" />
      {/* Cross on gable */}
      <path d="M50 15 L50 8" strokeWidth="1" />
      <path d="M47 11 L53 11" strokeWidth="1" />
      {/* Door */}
      <path d="M40 60 L40 88 L60 88 L60 60 Q50 55, 40 60" />
      {/* Door panels */}
      <path d="M50 60 L50 88" />
      <circle cx="56" cy="75" r="1.5" />
      {/* Rose window above door */}
      <circle cx="50" cy="45" r="8" />
      <path d="M50 37 L50 53" strokeWidth="0.4" />
      <path d="M42 45 L58 45" strokeWidth="0.4" />
      <path d="M44 39 L56 51" strokeWidth="0.4" />
      <path d="M44 51 L56 39" strokeWidth="0.4" />
      {/* Side windows */}
      <path d="M25 50 L25 70 L32 70 L32 50 Q28.5 47, 25 50" />
      <path d="M68 50 L68 70 L75 70 L75 50 Q71.5 47, 68 50" />
      {/* Bell cote */}
      <path d="M47 18 L47 22 L53 22 L53 18" />
      <path d="M45 22 L50 15 L55 22" strokeWidth="0.5" />
    </g>
  </svg>
)

// 7. Choir - seating area for singers
const ChoirSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="choir-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#choir-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Church interior context */}
      <path d="M15 15 L15 85 L85 85 L85 15" opacity="0.2" />
      {/* Choir screen */}
      <path d="M20 30 L80 30" />
      <path d="M20 30 L20 85" />
      <path d="M80 30 L80 85" />
      {/* North choir stalls */}
      <path d="M22 35 L22 75 L35 75 L35 35 Z" />
      <path d="M24 40 L33 40" />
      <path d="M24 48 L33 48" />
      <path d="M24 56 L33 56" />
      <path d="M24 64 L33 64" />
      {/* South choir stalls */}
      <path d="M65 35 L65 75 L78 75 L78 35 Z" />
      <path d="M67 40 L76 40" />
      <path d="M67 48 L76 48" />
      <path d="M67 56 L76 56" />
      <path d="M67 64 L76 64" />
      {/* Misericords suggestion */}
      <path d="M24 72 L33 72" strokeWidth="1.2" />
      <path d="M67 72 L76 72" strokeWidth="1.2" />
      {/* Lecterns */}
      <path d="M42 50 L42 60 L48 60 L48 50 Z" />
      <path d="M45 45 L42 50" />
      <path d="M45 45 L48 50" />
      <path d="M52 50 L52 60 L58 60 L58 50 Z" />
      <path d="M55 45 L52 50" />
      <path d="M55 45 L58 50" />
      {/* Central aisle */}
      <path d="M50 30 L50 85" strokeDasharray="3,3" opacity="0.3" />
    </g>
  </svg>
)

// 8. Cloister - covered walkway around courtyard
const CloisterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cloister-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#cloister-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Outer walls */}
      <path d="M10 10 L10 90 L90 90 L90 10 Z" />
      {/* Inner courtyard (garth) */}
      <path d="M25 25 L25 75 L75 75 L75 25 Z" />
      {/* Arcade columns */}
      {/* Top side */}
      {[30, 42, 54, 66].map((x, i) => (
        <g key={`t${i}`}>
          <path d={`M${x} 25 L${x} 15`} />
          <path d={`M${x-2} 25 Q${x} 22, ${x+4} 25`} />
        </g>
      ))}
      {/* Bottom side */}
      {[30, 42, 54, 66].map((x, i) => (
        <g key={`b${i}`}>
          <path d={`M${x} 75 L${x} 85`} />
          <path d={`M${x-2} 75 Q${x} 78, ${x+4} 75`} />
        </g>
      ))}
      {/* Left side */}
      {[32, 44, 56, 68].map((y, i) => (
        <g key={`l${i}`}>
          <path d={`M25 ${y} L15 ${y}`} />
          <path d={`M25 ${y-2} Q22 ${y}, 25 ${y+4}`} />
        </g>
      ))}
      {/* Right side */}
      {[32, 44, 56, 68].map((y, i) => (
        <g key={`r${i}`}>
          <path d={`M75 ${y} L85 ${y}`} />
          <path d={`M75 ${y-2} Q78 ${y}, 75 ${y+4}`} />
        </g>
      ))}
      {/* Garden/fountain in center */}
      <circle cx="50" cy="50" r="10" strokeDasharray="2,2" />
      <circle cx="50" cy="50" r="3" />
      {/* Paths */}
      <path d="M50 40 L50 25" strokeDasharray="2,2" opacity="0.4" />
      <path d="M50 60 L50 75" strokeDasharray="2,2" opacity="0.4" />
      <path d="M40 50 L25 50" strokeDasharray="2,2" opacity="0.4" />
      <path d="M60 50 L75 50" strokeDasharray="2,2" opacity="0.4" />
    </g>
  </svg>
)

// 9. Crossing - intersection of nave and transept
const CrossingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="crossing-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#crossing-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Nave (north-south) */}
      <path d="M40 5 L40 95" />
      <path d="M60 5 L60 95" />
      {/* Transept (east-west) */}
      <path d="M5 40 L95 40" />
      <path d="M5 60 L95 60" />
      {/* Crossing square (emphasized) */}
      <path d="M40 40 L60 40 L60 60 L40 60 Z" strokeWidth="1.5" />
      {/* Crossing piers at corners */}
      <path d="M38 38 L42 38 L42 42 L38 42 Z" />
      <path d="M58 38 L62 38 L62 42 L58 42 Z" />
      <path d="M38 58 L42 58 L42 62 L38 62 Z" />
      <path d="M58 58 L62 58 L62 62 L58 62 Z" />
      {/* Tower/dome above crossing suggestion */}
      <circle cx="50" cy="50" r="8" strokeDasharray="2,2" />
      {/* Pendentives/squinches */}
      <path d="M42 42 Q46 46, 50 42" opacity="0.5" />
      <path d="M58 42 Q54 46, 50 42" opacity="0.5" />
      <path d="M42 58 Q46 54, 50 58" opacity="0.5" />
      <path d="M58 58 Q54 54, 50 58" opacity="0.5" />
      {/* Labels */}
      <path d="M50 15 L50 5" strokeWidth="0.4" opacity="0.3" />
      <path d="M50 85 L50 95" strokeWidth="0.4" opacity="0.3" />
      <path d="M15 50 L5 50" strokeWidth="0.4" opacity="0.3" />
      <path d="M85 50 L95 50" strokeWidth="0.4" opacity="0.3" />
    </g>
  </svg>
)

// 10. Minaret - tower for call to prayer
const MinaretSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="minaret-halo" intensity={1} />}
    <g filter={showHalo ? "url(#minaret-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Base */}
      <path d="M35 95 L35 80 L65 80 L65 95" />
      <path d="M32 95 L68 95" strokeWidth="1.2" />
      {/* Main shaft (tapering) */}
      <path d="M38 80 L40 35" />
      <path d="M62 80 L60 35" />
      {/* Balcony (şerefe) */}
      <path d="M35 38 L35 32 L65 32 L65 38" />
      <path d="M32 38 L68 38" strokeWidth="1" />
      {/* Balcony railing */}
      <path d="M35 35 L65 35" />
      {[40, 48, 56].map((x, i) => (
        <path key={i} d={`M${x} 32 L${x} 38`} />
      ))}
      {/* Upper shaft */}
      <path d="M42 32 L44 18" />
      <path d="M58 32 L56 18" />
      {/* Petek (upper gallery) */}
      <path d="M40 20 L40 15 L60 15 L60 20" />
      <path d="M38 20 L62 20" />
      {/* Conical cap */}
      <path d="M42 15 L50 5 L58 15" />
      {/* Alem (finial) */}
      <path d="M50 5 L50 2" />
      <circle cx="50" cy="2" r="1.5" />
      {/* Door at base */}
      <path d="M45 85 L45 95 L55 95 L55 85 Q50 82, 45 85" />
      {/* Decorative bands */}
      <path d="M38 50 L62 50" strokeWidth="0.4" />
      <path d="M39 60 L61 60" strokeWidth="0.4" />
      <path d="M37 70 L63 70" strokeWidth="0.4" />
    </g>
  </svg>
)

// 11. Narthex - entrance hall/porch
const NarthexSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="narthex-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#narthex-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Church body (nave) behind */}
      <path d="M20 10 L20 50 L80 50 L80 10" opacity="0.3" />
      {/* Narthex walls */}
      <path d="M15 50 L15 90 L85 90 L85 50" />
      <path d="M15 50 L85 50" strokeWidth="1.2" />
      {/* Main entrance doors into nave */}
      <path d="M35 50 L35 35 Q50 25, 65 35 L65 50" />
      <path d="M50 35 L50 50" />
      {/* External entrance */}
      <path d="M40 75 L40 90 L60 90 L60 75 Q50 70, 40 75" />
      <path d="M50 75 L50 90" />
      {/* Interior columns */}
      <circle cx="30" cy="70" r="3" />
      <circle cx="70" cy="70" r="3" />
      {/* Vaulting suggestion */}
      <path d="M15 55 Q50 48, 85 55" strokeDasharray="2,2" opacity="0.4" />
      {/* Side doors */}
      <path d="M18 65 L18 80 L25 80 L25 65 Q21.5 62, 18 65" />
      <path d="M75 65 L75 80 L82 80 L82 65 Q78.5 62, 75 65" />
      {/* Floor pattern */}
      <path d="M25 90 L25 55 L75 55 L75 90" strokeDasharray="3,3" opacity="0.3" />
    </g>
  </svg>
)

// 12. Nave - main body of church
const NaveSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="nave-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#nave-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Nave walls */}
      <path d="M20 10 L20 90" />
      <path d="M80 10 L80 90" />
      {/* Arcade columns */}
      {[25, 40, 55, 70, 85].map((y, i) => (
        <g key={i}>
          <circle cx="25" cy={y} r="3" />
          <circle cx="75" cy={y} r="3" />
        </g>
      ))}
      {/* Arcade arches */}
      {[25, 40, 55, 70].map((y, i) => (
        <g key={i}>
          <path d={`M25 ${y} Q25 ${y+7.5}, 25 ${y+15}`} opacity="0.3" />
          <path d={`M75 ${y} Q75 ${y+7.5}, 75 ${y+15}`} opacity="0.3" />
        </g>
      ))}
      {/* Aisles */}
      <path d="M10 10 L10 90" opacity="0.5" />
      <path d="M90 10 L90 90" opacity="0.5" />
      {/* Central axis */}
      <path d="M50 10 L50 90" strokeDasharray="3,3" opacity="0.3" />
      {/* Pews suggestion */}
      {[30, 42, 54, 66, 78].map((y, i) => (
        <g key={i}>
          <path d={`M32 ${y} L48 ${y}`} />
          <path d={`M52 ${y} L68 ${y}`} />
        </g>
      ))}
      {/* Clerestory windows suggestion */}
      <path d="M22 18 L22 22" opacity="0.4" />
      <path d="M22 35 L22 39" opacity="0.4" />
      <path d="M78 18 L78 22" opacity="0.4" />
      <path d="M78 35 L78 39" opacity="0.4" />
    </g>
  </svg>
)

// 13. Sanctuary - holiest part of church
const SanctuarySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sanctuary-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#sanctuary-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Apse/sanctuary area */}
      <path d="M25 85 L25 35 Q50 15, 75 35 L75 85" />
      {/* Sanctuary step */}
      <path d="M20 85 L80 85" strokeWidth="1.2" />
      <path d="M22 88 L78 88" />
      {/* High altar */}
      <path d="M40 55 L60 55 L60 62 L40 62 Z" strokeWidth="1" />
      <path d="M42 62 L42 68 L58 68 L58 62" />
      {/* Tabernacle on altar */}
      <path d="M47 50 L47 55 L53 55 L53 50 Q50 47, 47 50" />
      {/* Altar cross */}
      <path d="M50 35 L50 48" strokeWidth="1" />
      <path d="M45 40 L55 40" strokeWidth="1" />
      {/* Sanctuary lamp */}
      <path d="M65 40 L65 45" />
      <ellipse cx="65" cy="47" rx="3" ry="2" />
      {/* Credence table */}
      <path d="M30 60 L30 70 L38 70 L38 60 Z" />
      {/* Sedilia (priest seats) */}
      <path d="M78 50 L78 75 L72 75 L72 50" opacity="0.6" />
      {/* Reredos */}
      <path d="M35 35 Q50 28, 65 35" />
      {/* Sacred rays */}
      <path d="M50 25 L50 30" strokeDasharray="1,2" opacity="0.4" />
      <path d="M45 27 L47 32" strokeDasharray="1,2" opacity="0.4" />
      <path d="M55 27 L53 32" strokeDasharray="1,2" opacity="0.4" />
    </g>
  </svg>
)

// 14. Spire - tall pointed structure on tower
const SpireSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="spire-halo" intensity={1} />}
    <g filter={showHalo ? "url(#spire-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Tower base */}
      <path d="M30 95 L30 60 L70 60 L70 95" />
      <path d="M25 95 L75 95" strokeWidth="1.2" />
      {/* Tower top/belfry */}
      <path d="M32 60 L32 45 L68 45 L68 60" />
      <path d="M28 60 L72 60" strokeWidth="1" />
      {/* Belfry openings */}
      <path d="M38 50 L38 58 Q43 54, 48 58 L48 50" />
      <path d="M52 50 L52 58 Q57 54, 62 58 L62 50" />
      {/* Spire (octagonal pyramidal) */}
      <path d="M32 45 L50 5 L68 45" />
      {/* Spire edges showing octagonal form */}
      <path d="M35 45 L50 8 L65 45" strokeWidth="0.4" />
      <path d="M50 5 L50 45" strokeWidth="0.4" opacity="0.3" />
      {/* Lucarnes (dormer windows on spire) */}
      <path d="M40 35 L42 30 L44 35" />
      <path d="M56 35 L58 30 L60 35" />
      {/* Cross finial */}
      <path d="M50 5 L50 0" strokeWidth="1.2" />
      <path d="M47 2 L53 2" strokeWidth="1.2" />
      {/* Crockets on edges */}
      <path d="M38 38 Q36 36, 38 34" />
      <path d="M42 28 Q40 26, 42 24" />
      <path d="M62 38 Q64 36, 62 34" />
      <path d="M58 28 Q60 26, 58 24" />
      {/* Tower window */}
      <path d="M45 70 L45 85 L55 85 L55 70 Q50 67, 45 70" />
    </g>
  </svg>
)

// 15. Steeple - tower and spire together
const SteepleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="steeple-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#steeple-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Church body */}
      <path d="M5 75 L5 95 L40 95 L40 75" opacity="0.3" />
      <path d="M60 75 L60 95 L95 95 L95 75" opacity="0.3" />
      {/* Tower base */}
      <path d="M35 95 L35 55 L65 55 L65 95" />
      {/* Clock stage */}
      <path d="M33 55 L33 42 L67 42 L67 55" />
      <path d="M30 55 L70 55" strokeWidth="1" />
      {/* Clock face */}
      <circle cx="50" cy="48" r="5" />
      <path d="M50 45 L50 48 L52 50" strokeWidth="0.5" />
      {/* Belfry */}
      <path d="M36 42 L36 32 L64 32 L64 42" />
      <path d="M33 42 L67 42" strokeWidth="1" />
      {/* Louvered openings */}
      <path d="M40 35 L40 40 L48 40 L48 35" />
      <path d="M52 35 L52 40 L60 40 L60 35" />
      {/* Spire */}
      <path d="M36 32 L50 8 L64 32" />
      {/* Weathervane */}
      <path d="M50 8 L50 3" strokeWidth="1" />
      <path d="M47 5 L53 5 L50 3 Z" />
      {/* Window below */}
      <path d="M45 65 L45 80 L55 80 L55 65 Q50 62, 45 65" />
      {/* Entry at base */}
      <path d="M43 85 L43 95 L57 95 L57 85 Q50 82, 43 85" />
      {/* Cornice details */}
      <path d="M30 42 L70 42" strokeWidth="0.5" />
      <path d="M33 32 L67 32" strokeWidth="0.5" />
    </g>
  </svg>
)

// 16. Transept - cross arms of cruciform church
const TranseptSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="transept-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#transept-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Nave (vertical) */}
      <path d="M40 5 L40 95" />
      <path d="M60 5 L60 95" />
      {/* Transept arms (horizontal) - emphasized */}
      <path d="M5 35 L95 35" strokeWidth="1.2" />
      <path d="M5 55 L95 55" strokeWidth="1.2" />
      {/* North transept end */}
      <path d="M5 35 L5 55" strokeWidth="1" />
      {/* South transept end */}
      <path d="M95 35 L95 55" strokeWidth="1" />
      {/* Crossing */}
      <path d="M40 35 L60 35 L60 55 L40 55 Z" strokeWidth="1.5" />
      {/* Transept windows */}
      <path d="M10 40 L10 50 Q15 45, 10 40" />
      <path d="M85 40 L85 50 Q90 45, 85 40" />
      {/* Rose windows at transept ends */}
      <circle cx="12" cy="45" r="6" strokeDasharray="2,2" />
      <circle cx="88" cy="45" r="6" strokeDasharray="2,2" />
      {/* Altars in transept */}
      <path d="M15 50 L25 50 L25 53 L15 53 Z" />
      <path d="M75 50 L85 50 L85 53 L75 53 Z" />
      {/* Aisles parallel to transept */}
      <path d="M5 30 L40 30" opacity="0.4" />
      <path d="M60 30 L95 30" opacity="0.4" />
      <path d="M5 60 L40 60" opacity="0.4" />
      <path d="M60 60 L95 60" opacity="0.4" />
    </g>
  </svg>
)

// Export mapping for all religious elements
export const RELIGIOUS_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'apse': ApseSVG,
  'altar': AltarSVG,
  'baptistery': BaptisterySVG,
  'bell-tower': BellTowerSVG,
  'chancel': ChancelSVG,
  'chapel': ChapelSVG,
  'choir': ChoirSVG,
  'cloister': CloisterSVG,
  'crossing': CrossingSVG,
  'minaret': MinaretSVG,
  'narthex': NarthexSVG,
  'nave': NaveSVG,
  'sanctuary': SanctuarySVG,
  'spire': SpireSVG,
  'steeple': SteepleSVG,
  'transept': TranseptSVG,
}

export {
  ApseSVG,
  AltarSVG,
  BaptisterySVG,
  BellTowerSVG,
  ChancelSVG,
  ChapelSVG,
  ChoirSVG,
  CloisterSVG,
  CrossingSVG,
  MinaretSVG,
  NarthexSVG,
  NaveSVG,
  SanctuarySVG,
  SpireSVG,
  SteepleSVG,
  TranseptSVG,
}
