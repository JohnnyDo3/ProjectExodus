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

// 1. Arbor - garden archway with plants
const ArborSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arbor-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#arbor-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Side posts */}
      <path d="M20 30 L20 90" strokeWidth="1.2" />
      <path d="M25 30 L25 90" strokeWidth="1.2" />
      <path d="M75 30 L75 90" strokeWidth="1.2" />
      <path d="M80 30 L80 90" strokeWidth="1.2" />
      {/* Arched top */}
      <path d="M20 30 Q50 5, 80 30" strokeWidth="1.2" />
      <path d="M25 30 Q50 10, 75 30" strokeWidth="1.2" />
      {/* Cross lattice on arch */}
      <path d="M30 25 Q50 8, 70 25" />
      <path d="M35 22 Q50 12, 65 22" />
      {/* Vertical slats */}
      <path d="M40 18 L40 30" />
      <path d="M50 12 L50 30" />
      <path d="M60 18 L60 30" />
      {/* Climbing vines */}
      <path d="M22 50 Q30 45, 28 55 Q35 52, 32 62" opacity="0.5" />
      <path d="M78 50 Q70 45, 72 55 Q65 52, 68 62" opacity="0.5" />
      <path d="M35 20 Q40 15, 45 18 Q50 12, 55 18" opacity="0.5" />
      {/* Ground/path */}
      <path d="M10 90 L90 90" strokeWidth="1" />
      <path d="M30 90 L30 95" strokeDasharray="2,2" opacity="0.3" />
      <path d="M50 90 L50 95" strokeDasharray="2,2" opacity="0.3" />
      <path d="M70 90 L70 95" strokeDasharray="2,2" opacity="0.3" />
    </g>
  </svg>
)

// 2. Colonnade - row of columns
const ColonnadeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="colonnade-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#colonnade-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Entablature */}
      <path d="M5 20 L95 20" strokeWidth="1.5" />
      <path d="M5 25 L95 25" />
      {/* Columns */}
      {[15, 35, 55, 75].map((x, i) => (
        <g key={i}>
          <path d={`M${x-3} 25 L${x-3} 85 Q${x} 88, ${x+3} 85 L${x+3} 25`} />
          {/* Capital */}
          <path d={`M${x-5} 25 L${x+5} 25 L${x+4} 28 L${x-4} 28 Z`} />
          {/* Base */}
          <path d={`M${x-4} 85 L${x+4} 85 L${x+5} 90 L${x-5} 90 Z`} />
          {/* Entasis (slight curve) */}
          <path d={`M${x} 30 L${x} 82`} strokeWidth="0.3" opacity="0.3" />
        </g>
      ))}
      {/* Floor/stylobate */}
      <path d="M5 90 L95 90" strokeWidth="1.2" />
      {/* Garden beyond */}
      <path d="M20 45 Q30 42, 40 45" strokeDasharray="2,2" opacity="0.3" />
      <path d="M60 55 Q70 52, 80 55" strokeDasharray="2,2" opacity="0.3" />
    </g>
  </svg>
)

// 3. Espalier - trained flat tree/shrub
const EspalierSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="espalier-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#espalier-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Wall behind */}
      <path d="M10 10 L90 10 L90 85 L10 85 Z" opacity="0.2" />
      {/* Main trunk */}
      <path d="M50 85 L50 25" strokeWidth="1.5" />
      {/* Horizontal branches - trained pattern */}
      <path d="M20 70 L80 70" strokeWidth="1" />
      <path d="M25 50 L75 50" strokeWidth="1" />
      <path d="M30 35 L70 35" strokeWidth="1" />
      {/* Diagonal training wires */}
      <path d="M50 25 L35 35" strokeWidth="0.5" />
      <path d="M50 25 L65 35" strokeWidth="0.5" />
      {/* Fruit/leaves suggestion */}
      <circle cx="25" cy="70" r="3" opacity="0.5" />
      <circle cx="40" cy="70" r="3" opacity="0.5" />
      <circle cx="60" cy="70" r="3" opacity="0.5" />
      <circle cx="75" cy="70" r="3" opacity="0.5" />
      <circle cx="30" cy="50" r="2.5" opacity="0.5" />
      <circle cx="50" cy="50" r="2.5" opacity="0.5" />
      <circle cx="70" cy="50" r="2.5" opacity="0.5" />
      <circle cx="35" cy="35" r="2" opacity="0.5" />
      <circle cx="55" cy="35" r="2" opacity="0.5" />
      {/* Ground line */}
      <path d="M10 85 L90 85" strokeWidth="1" />
    </g>
  </svg>
)

// 4. Folly - decorative garden building
const FollySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="folly-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#folly-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Ruined temple folly */}
      <path d="M15 35 L15 85" strokeWidth="1.5" />
      <path d="M35 35 L35 85" strokeWidth="1.5" />
      <path d="M55 40 L55 85" strokeWidth="1.2" />
      {/* Broken column */}
      <path d="M75 60 L75 85" strokeWidth="1.2" />
      <path d="M75 55 Q78 52, 77 48" opacity="0.6" />
      {/* Partial pediment */}
      <path d="M10 35 L25 20 L40 35" />
      <path d="M10 35 L40 35" strokeWidth="1" />
      {/* Fallen stones */}
      <path d="M60 82 L68 80 L70 85 L62 87 Z" opacity="0.5" />
      <path d="M78 78 L82 76 L85 80 L81 82 Z" opacity="0.5" />
      {/* Vegetation growing on ruins */}
      <path d="M35 45 Q40 42, 38 48" opacity="0.4" />
      <path d="M15 50 Q12 48, 14 45" opacity="0.4" />
      {/* Base/platform */}
      <path d="M8 85 L92 85" strokeWidth="1" />
      <path d="M8 90 L92 90" strokeWidth="0.5" />
      {/* Romantic landscape suggestion */}
      <path d="M5 88 Q15 86, 25 88" strokeDasharray="2,2" opacity="0.3" />
    </g>
  </svg>
)

// 5. Gazebo - garden pavilion
const GazeboSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gazebo-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#gazebo-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Octagonal roof */}
      <path d="M50 10 L70 25 L80 50 L70 60 L50 65 L30 60 L20 50 L30 25 Z" />
      <path d="M50 10 L50 65" strokeWidth="0.4" />
      <path d="M70 25 L30 60" strokeWidth="0.4" />
      <path d="M80 50 L20 50" strokeWidth="0.4" />
      <path d="M70 60 L30 25" strokeWidth="0.4" />
      {/* Roof finial */}
      <path d="M50 10 L50 5" strokeWidth="1" />
      <circle cx="50" cy="4" r="2" />
      {/* Posts */}
      <path d="M30 60 L30 90" strokeWidth="1" />
      <path d="M50 65 L50 90" strokeWidth="1" />
      <path d="M70 60 L70 90" strokeWidth="1" />
      {/* Railings */}
      <path d="M30 78 L50 80" />
      <path d="M50 80 L70 78" />
      <path d="M30 85 L50 87" />
      <path d="M50 87 L70 85" />
      {/* Balusters */}
      <path d="M38 78 L38 85" />
      <path d="M58 79 L58 86" />
      {/* Floor platform */}
      <path d="M25 90 L75 90 L78 93 L22 93 Z" />
      {/* Steps */}
      <path d="M45 93 L45 98 L55 98 L55 93" />
    </g>
  </svg>
)

// 6. Grotto - cave-like garden structure
const GrottoSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="grotto-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#grotto-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Rocky opening */}
      <path d="M15 85 L10 60 Q15 40, 30 30 Q50 15, 70 30 Q85 40, 90 60 L85 85" />
      {/* Inner cave */}
      <path d="M25 82 L22 65 Q30 50, 45 42 Q55 38, 70 50 Q78 62, 75 82" />
      {/* Rock texture */}
      <path d="M18 55 L25 58" opacity="0.5" />
      <path d="M35 35 L40 40" opacity="0.5" />
      <path d="M65 38 L70 45" opacity="0.5" />
      <path d="M80 58 L75 62" opacity="0.5" />
      {/* Stalactites */}
      <path d="M35 45 L37 52" />
      <path d="M50 40 L52 50" />
      <path d="M62 45 L60 52" />
      {/* Water pool at base */}
      <ellipse cx="50" cy="80" rx="25" ry="8" />
      <path d="M35 78 Q45 82, 55 78 Q65 74, 75 78" opacity="0.4" />
      {/* Shells/decoration */}
      <circle cx="28" cy="70" r="3" opacity="0.4" />
      <circle cx="72" cy="70" r="3" opacity="0.4" />
      {/* Ground */}
      <path d="M5 85 L95 85" strokeWidth="1" />
    </g>
  </svg>
)

// 7. Hedge - shaped garden boundary
const HedgeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="hedge-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#hedge-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Formally trimmed hedge - rectangular */}
      <path d="M10 40 L10 85 L90 85 L90 40 Q80 35, 70 40 Q60 35, 50 40 Q40 35, 30 40 Q20 35, 10 40" />
      {/* Top surface - slightly wavy */}
      <path d="M12 42 Q20 38, 30 42 Q40 38, 50 42 Q60 38, 70 42 Q80 38, 88 42" />
      {/* Foliage texture */}
      <path d="M20 50 Q25 48, 28 52" opacity="0.4" />
      <path d="M40 55 Q45 52, 48 56" opacity="0.4" />
      <path d="M60 48 Q65 45, 68 50" opacity="0.4" />
      <path d="M75 60 Q80 57, 82 62" opacity="0.4" />
      <path d="M30 70 Q35 68, 38 72" opacity="0.4" />
      <path d="M55 75 Q60 72, 63 76" opacity="0.4" />
      {/* Base/ground */}
      <path d="M8 85 L92 85" strokeWidth="1" />
      {/* Opening/arch in hedge */}
      <path d="M40 85 L40 55 Q50 50, 60 55 L60 85" strokeDasharray="2,2" />
      {/* Depth indication */}
      <path d="M15 50 L15 80" strokeWidth="0.4" opacity="0.3" />
      <path d="M85 50 L85 80" strokeWidth="0.4" opacity="0.3" />
    </g>
  </svg>
)

// 8. Labyrinth - maze garden
const LabyrinthSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="labyrinth-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#labyrinth-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Outer boundary */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" />
      {/* Entrance */}
      <path d="M50 90 L50 85" strokeWidth="0" />
      {/* Maze paths - classical labyrinth pattern */}
      <path d="M50 85 L50 75" />
      <path d="M20 75 L80 75" />
      <path d="M20 75 L20 25" />
      <path d="M20 25 L80 25" />
      <path d="M80 25 L80 65" />
      <path d="M80 65 L30 65" />
      <path d="M30 65 L30 35" />
      <path d="M30 35 L70 35" />
      <path d="M70 35 L70 55" />
      <path d="M70 55 L40 55" />
      <path d="M40 55 L40 45" />
      <path d="M40 45 L60 45" />
      <path d="M60 45 L60 50" />
      {/* Center goal */}
      <circle cx="50" cy="50" r="5" />
      {/* Hedge texture suggestion */}
      <path d="M25 30 Q28 28, 30 30" opacity="0.3" />
      <path d="M55 40 Q58 38, 60 40" opacity="0.3" />
      <path d="M35 60 Q38 58, 40 60" opacity="0.3" />
    </g>
  </svg>
)

// 9. Obelisk - tall tapering monument
const ObeliskSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="obelisk-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#obelisk-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Pyramidion (top) */}
      <path d="M50 5 L45 20 L55 20 Z" />
      {/* Main shaft */}
      <path d="M45 20 L42 75 L58 75 L55 20" />
      {/* Base */}
      <path d="M40 75 L40 82 L60 82 L60 75" />
      <path d="M38 82 L38 88 L62 88 L62 82" />
      {/* Plinth */}
      <path d="M35 88 L35 95 L65 95 L65 88" />
      {/* Hieroglyphic suggestion */}
      <path d="M47 30 L47 35 L53 35 L53 30" opacity="0.4" />
      <path d="M48 40 L52 45" opacity="0.4" />
      <path d="M47 55 L53 55" opacity="0.4" />
      <path d="M47 60 L47 65" opacity="0.4" />
      <path d="M53 60 L53 65" opacity="0.4" />
      {/* Side face indication */}
      <path d="M55 20 L58 75" strokeWidth="0.4" />
      {/* Ground */}
      <path d="M20 95 L80 95" strokeWidth="1" />
      {/* Shadow */}
      <path d="M50 95 L75 92 L77 95" opacity="0.3" />
    </g>
  </svg>
)

// 10. Parterre - formal garden bed pattern
const ParterreSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="parterre-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#parterre-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Overall border */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" />
      {/* Central circular bed */}
      <circle cx="50" cy="50" r="15" />
      <circle cx="50" cy="50" r="10" strokeDasharray="2,2" />
      {/* Corner beds - scrollwork pattern */}
      <path d="M15 15 Q25 25, 15 35 Q25 35, 35 25 Q35 15, 25 15 Q15 25, 15 15" />
      <path d="M85 15 Q75 25, 85 35 Q75 35, 65 25 Q65 15, 75 15 Q85 25, 85 15" />
      <path d="M15 85 Q25 75, 15 65 Q25 65, 35 75 Q35 85, 25 85 Q15 75, 15 85" />
      <path d="M85 85 Q75 75, 85 65 Q75 65, 65 75 Q65 85, 75 85 Q85 75, 85 85" />
      {/* Connecting paths */}
      <path d="M35 50 L35 50" />
      <path d="M50 35 L50 10" strokeDasharray="2,2" />
      <path d="M50 65 L50 90" strokeDasharray="2,2" />
      <path d="M35 50 L10 50" strokeDasharray="2,2" />
      <path d="M65 50 L90 50" strokeDasharray="2,2" />
      {/* Small accent plants */}
      <circle cx="30" cy="50" r="3" opacity="0.4" />
      <circle cx="70" cy="50" r="3" opacity="0.4" />
      <circle cx="50" cy="30" r="3" opacity="0.4" />
      <circle cx="50" cy="70" r="3" opacity="0.4" />
    </g>
  </svg>
)

// 11. Pergola - garden structure with posts and beams
const PergolaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pergola-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#pergola-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Posts */}
      <path d="M15 30 L15 90" strokeWidth="1.5" />
      <path d="M40 30 L40 90" strokeWidth="1.5" />
      <path d="M60 30 L60 90" strokeWidth="1.5" />
      <path d="M85 30 L85 90" strokeWidth="1.5" />
      {/* Main beams */}
      <path d="M10 30 L90 30" strokeWidth="1.5" />
      <path d="M10 35 L90 35" strokeWidth="1.5" />
      {/* Cross rafters */}
      {[20, 30, 45, 55, 70, 80].map((x, i) => (
        <path key={i} d={`M${x} 25 L${x} 40`} strokeWidth="1" />
      ))}
      {/* Climbing plants */}
      <path d="M15 50 Q20 45, 18 55 Q25 52, 22 62" opacity="0.5" />
      <path d="M85 50 Q80 45, 82 55 Q75 52, 78 62" opacity="0.5" />
      <path d="M30 28 Q35 25, 38 30" opacity="0.5" />
      <path d="M65 28 Q70 25, 72 30" opacity="0.5" />
      {/* Shadow on ground */}
      <path d="M20 90 L25 88 L80 88 L85 90" strokeDasharray="3,3" opacity="0.3" />
      {/* Ground */}
      <path d="M5 90 L95 90" strokeWidth="1" />
    </g>
  </svg>
)

// 12. Sundial - time-telling garden feature
const SundialSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sundial-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#sundial-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Pedestal */}
      <path d="M35 90 L35 70 L65 70 L65 90" />
      <path d="M32 90 L68 90 L70 95 L30 95 Z" />
      {/* Column of pedestal */}
      <path d="M38 70 L38 55 Q50 50, 62 55 L62 70" />
      {/* Dial plate (elliptical in perspective) */}
      <ellipse cx="50" cy="45" rx="25" ry="12" />
      <ellipse cx="50" cy="45" rx="22" ry="10" strokeWidth="0.5" />
      {/* Hour lines on dial */}
      {[0, 30, 60, 90, 120, 150].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + 8 * Math.cos(rad)
        const y1 = 45 + 4 * Math.sin(rad)
        const x2 = 50 + 20 * Math.cos(rad)
        const y2 = 45 + 9 * Math.sin(rad)
        return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} strokeWidth="0.5" />
      })}
      {/* Gnomon (shadow caster) */}
      <path d="M50 45 L50 25" strokeWidth="1" />
      <path d="M50 45 L55 35 L50 25" strokeWidth="0.5" />
      {/* Shadow */}
      <path d="M50 45 L65 50" strokeDasharray="2,2" opacity="0.4" />
      {/* Roman numerals suggestion */}
      <circle cx="72" cy="45" r="2" opacity="0.3" />
      <circle cx="50" cy="55" r="2" opacity="0.3" />
      <circle cx="28" cy="45" r="2" opacity="0.3" />
    </g>
  </svg>
)

// 13. Topiary - shaped shrub
const TopiarySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="topiary-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#topiary-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Pot/container */}
      <path d="M35 85 L30 95 L70 95 L65 85" />
      <path d="M33 85 L67 85 L68 88 L32 88 Z" />
      {/* Trunk */}
      <path d="M48 85 L48 70" strokeWidth="1.2" />
      <path d="M52 85 L52 70" strokeWidth="1.2" />
      {/* Bottom sphere */}
      <circle cx="50" cy="62" r="15" />
      <path d="M38 55 Q42 52, 48 55" opacity="0.4" />
      <path d="M52 68 Q58 65, 62 68" opacity="0.4" />
      {/* Middle sphere (smaller) */}
      <circle cx="50" cy="38" r="12" />
      <path d="M42 35 Q46 32, 50 35" opacity="0.4" />
      {/* Top sphere (smallest) */}
      <circle cx="50" cy="18" r="8" />
      <path d="M45 16 Q48 14, 52 16" opacity="0.4" />
      {/* Connecting stems */}
      <path d="M50 47 L50 50" strokeWidth="0.8" />
      <path d="M50 26 L50 30" strokeWidth="0.8" />
      {/* Ground */}
      <path d="M20 95 L80 95" strokeWidth="1" />
    </g>
  </svg>
)

// 14. Trellis - lattice plant support
const TrellisSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="trellis-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#trellis-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Frame */}
      <path d="M15 10 L15 90" strokeWidth="1.2" />
      <path d="M85 10 L85 90" strokeWidth="1.2" />
      <path d="M15 10 L85 10" strokeWidth="1.2" />
      <path d="M15 90 L85 90" strokeWidth="1.2" />
      {/* Diamond lattice pattern */}
      <path d="M15 30 L50 10 L85 30" />
      <path d="M15 50 L50 30 L85 50" />
      <path d="M15 70 L50 50 L85 70" />
      <path d="M15 90 L50 70 L85 90" />
      <path d="M15 30 L50 50 L85 30" />
      <path d="M15 50 L50 70 L85 50" />
      <path d="M15 70 L50 90 L85 70" />
      <path d="M15 10 L50 30 L85 10" />
      {/* Climbing vine */}
      <path d="M20 85 Q25 75, 30 80 Q35 70, 40 75 Q50 60, 55 65 Q65 50, 70 55" opacity="0.5" />
      {/* Leaves */}
      <circle cx="30" cy="78" r="3" opacity="0.4" />
      <circle cx="45" cy="68" r="3" opacity="0.4" />
      <circle cx="60" cy="58" r="3" opacity="0.4" />
      {/* Ground */}
      <path d="M10 90 L90 90" strokeWidth="1" />
    </g>
  </svg>
)

// Export mapping for all garden elements
export const GARDEN_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'arbor': ArborSVG,
  'colonnade': ColonnadeSVG,
  'espalier': EspalierSVG,
  'folly': FollySVG,
  'gazebo': GazeboSVG,
  'grotto': GrottoSVG,
  'hedge': HedgeSVG,
  'labyrinth': LabyrinthSVG,
  'obelisk': ObeliskSVG,
  'parterre': ParterreSVG,
  'pergola': PergolaSVG,
  'sundial': SundialSVG,
  'topiary': TopiarySVG,
  'trellis': TrellisSVG,
}

export {
  ArborSVG,
  ColonnadeSVG,
  EspalierSVG,
  FollySVG,
  GazeboSVG,
  GrottoSVG,
  HedgeSVG,
  LabyrinthSVG,
  ObeliskSVG,
  ParterreSVG,
  PergolaSVG,
  SundialSVG,
  TopiarySVG,
  TrellisSVG,
}
