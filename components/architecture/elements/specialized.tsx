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

// 1. Abutment - support at end of arch/bridge
const AbutmentSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="abutment-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#abutment-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M15 25 L15 90 L45 90 L45 50" />
      <path d="M45 50 Q65 30, 85 50" strokeDasharray="2,2" />
      <path d="M45 50 L50 45 L55 42" />
      <path d="M18 30 L18 87 L42 87 L42 52" />
      <path d="M20 40 L40 40" opacity="0.4" />
      <path d="M20 55 L40 55" opacity="0.4" />
      <path d="M20 70 L40 70" opacity="0.4" />
      <path d="M5 90 L95 90" strokeWidth="1" />
      <path d="M10 25 L50 25 L50 35 L10 35 Z" />
    </g>
  </svg>
)

// 2. Ambulatory - walkway around space
const AmbulatorySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="ambulatory-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#ambulatory-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M50 10 Q85 10, 90 50 Q90 90, 50 90 Q10 90, 10 50 Q10 10, 50 10" />
      <path d="M50 25 Q72 25, 75 50 Q75 75, 50 75 Q25 75, 25 50 Q25 25, 50 25" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + 32 * Math.cos(rad)
        const y1 = 50 + 32 * Math.sin(rad)
        const x2 = 50 + 20 * Math.cos(rad)
        const y2 = 50 + 20 * Math.sin(rad)
        return <circle key={i} cx={(x1+x2)/2} cy={(y1+y2)/2} r="2" />
      })}
      <circle cx="50" cy="50" r="10" strokeDasharray="2,2" opacity="0.5" />
    </g>
  </svg>
)

// 3. Balcony - projecting platform
const BalconySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="balcony-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#balcony-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 15 L10 90 L90 90 L90 15" opacity="0.3" />
      <path d="M25 45 L25 70 L75 70 L75 45" />
      <path d="M10 45 L90 45" strokeWidth="1" />
      <path d="M10 50 L25 50 L25 55 L75 55 L75 50 L90 50" />
      <path d="M25 38 L75 38" />
      <path d="M25 45 L75 45" />
      {[30, 40, 50, 60, 70].map((x, i) => (
        <path key={i} d={`M${x} 38 Q${x-1} 41.5, ${x} 45`} />
      ))}
      <path d="M28 55 Q40 62, 50 58 Q60 54, 72 55" />
      <path d="M10 90 L90 90" strokeWidth="1" />
    </g>
  </svg>
)

// 4. Basement - below-ground level
const BasementSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="basement-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#basement-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 40 L90 40" strokeWidth="1.2" />
      <path d="M15 40 L15 85 L85 85 L85 40" />
      <path d="M5 40 L5 35 L95 35 L95 40" opacity="0.3" />
      <path d="M20 50 L20 65 L35 65 L35 50 Z" />
      <path d="M65 50 L65 65 L80 65 L80 50 Z" />
      <path d="M40 60 L40 85 L60 85 L60 60" />
      <path d="M15 55 L85 55" strokeDasharray="3,3" opacity="0.3" />
      <path d="M15 70 L85 70" strokeDasharray="3,3" opacity="0.3" />
      <path d="M5 30 L5 10" opacity="0.2" />
      <path d="M95 30 L95 10" opacity="0.2" />
    </g>
  </svg>
)

// 5. Capital - decorative column top
const CapitalSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="capital-halo" intensity={1} />}
    <g filter={showHalo ? "url(#capital-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M20 20 L80 20 L80 28 L20 28 Z" />
      <path d="M25 28 L25 40 Q50 55, 75 40 L75 28" />
      <path d="M30 40 Q35 48, 40 45 Q45 50, 50 47 Q55 50, 60 45 Q65 48, 70 40" />
      <path d="M28 45 Q25 50, 22 55 Q20 60, 25 60" />
      <path d="M72 45 Q75 50, 78 55 Q80 60, 75 60" />
      <path d="M33 50 L33 58" opacity="0.5" />
      <path d="M50 52 L50 60" opacity="0.5" />
      <path d="M67 50 L67 58" opacity="0.5" />
      <path d="M30 60 L70 60" />
      <path d="M35 60 L35 90" strokeWidth="1.5" />
      <path d="M65 60 L65 90" strokeWidth="1.5" />
    </g>
  </svg>
)

// 6. Chimney - smoke outlet structure
const ChimneySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="chimney-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#chimney-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M35 30 L35 75 L65 75 L65 30" />
      <path d="M32 30 L68 30 L68 35 L32 35 Z" />
      <path d="M38 35 L38 72 L62 72 L62 35" strokeWidth="0.4" />
      <path d="M30 75 L30 90 L70 90 L70 75" />
      <path d="M35 80 L65 80" strokeWidth="0.4" />
      <path d="M35 85 L65 85" strokeWidth="0.4" />
      <path d="M45 25 Q50 15, 55 25" strokeDasharray="2,2" opacity="0.4" />
      <path d="M48 20 Q52 10, 56 20" strokeDasharray="2,2" opacity="0.3" />
      <path d="M20 90 L80 90" strokeWidth="1" />
    </g>
  </svg>
)

// 7. Console - projecting bracket
const ConsoleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="console-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#console-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M15 15 L15 85" opacity="0.3" />
      <path d="M20 25 L80 25 L80 32 L20 32 Z" />
      <path d="M20 32 L20 75" strokeWidth="1.2" />
      <path d="M20 32 Q45 35, 55 50 Q65 65, 55 80 Q45 90, 20 75" />
      <path d="M23 38 Q42 40, 50 52 Q58 64, 50 75 Q42 84, 23 72" />
      <path d="M55 80 Q62 76, 60 70 Q58 65, 52 68" />
      <path d="M28 48 Q35 46, 38 52" />
      <path d="M30 58 Q38 55, 42 62" />
    </g>
  </svg>
)

// 8. Coping - protective top of wall
const CopingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="coping-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#coping-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M5 40 L95 40 L95 50 L5 50 Z" strokeWidth="1" />
      <path d="M5 42 Q50 38, 95 42" />
      <path d="M8 50 L92 50" strokeWidth="0.4" />
      <path d="M10 50 L10 90 L90 90 L90 50" />
      <path d="M15 55 L30 55" opacity="0.4" />
      <path d="M40 55 L60 55" opacity="0.4" />
      <path d="M70 55 L85 55" opacity="0.4" />
      <path d="M20 70 L45 70" opacity="0.4" />
      <path d="M55 70 L80 70" opacity="0.4" />
      <path d="M15 85 L40 85" opacity="0.4" />
      <path d="M60 85 L85 85" opacity="0.4" />
    </g>
  </svg>
)

// 9. Eave - roof overhang
const EaveSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="eave-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#eave-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M5 50 L50 20 L95 50" strokeWidth="1.2" />
      <path d="M10 52 L50 25 L90 52" strokeWidth="0.5" />
      <path d="M5 50 L5 55 L15 55 L15 50" />
      <path d="M95 50 L95 55 L85 55 L85 50" />
      <path d="M15 55 L15 90 L85 90 L85 55" />
      {[20, 30, 40, 50, 60, 70, 80].map((x, i) => (
        <path key={i} d={`M${x} 50 L${x} 55`} strokeWidth="0.5" />
      ))}
      <path d="M8 52 L92 52" strokeWidth="0.4" />
      <path d="M10 55 L90 55" strokeWidth="1" />
    </g>
  </svg>
)

// 10. Gutter - water channel
const GutterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gutter-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#gutter-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 35 L50 15 L90 35" />
      <path d="M10 35 L10 42 L15 42 L15 35" />
      <path d="M5 42 L95 42" strokeWidth="1.2" />
      <path d="M5 42 L5 50 L95 50 L95 42" />
      <path d="M8 45 L92 45" strokeWidth="0.4" />
      <path d="M15 50 L15 90" strokeWidth="1.2" />
      <path d="M18 50 L18 90" strokeWidth="0.8" />
      <path d="M15 90 L15 95 L20 95 L20 90" />
      <path d="M16 60 Q20 62, 16 65" opacity="0.4" />
      <path d="M16 72 Q20 74, 16 77" opacity="0.4" />
    </g>
  </svg>
)

// 11. Jamb - vertical door/window side
const JambSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="jamb-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#jamb-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 10 L10 90 L40 90 L40 10" opacity="0.3" />
      <path d="M25 15 L25 85 L35 85 L35 15 Z" strokeWidth="1.2" />
      <path d="M27 18 L27 82 L33 82 L33 18 Z" strokeWidth="0.5" />
      <path d="M40 25 L40 75 L80 75 L80 25" strokeDasharray="2,2" opacity="0.4" />
      <path d="M35 25 L40 25" />
      <path d="M35 75 L40 75" />
      <path d="M25 15 L15 15" />
      <path d="M25 85 L15 85" />
      <path d="M30 35 L30 40" strokeWidth="1.5" />
      <path d="M30 50 L30 55" strokeWidth="1.5" />
      <path d="M30 65 L30 70" strokeWidth="1.5" />
    </g>
  </svg>
)

// 12. Joist - horizontal support beam
const JoistSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="joist-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#joist-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 40 L90 40" strokeWidth="1.5" />
      <path d="M10 48 L90 48" strokeWidth="1.5" />
      {[20, 35, 50, 65, 80].map((x, i) => (
        <g key={i}>
          <path d={`M${x-3} 40 L${x-3} 90`} />
          <path d={`M${x+3} 40 L${x+3} 90`} />
          <path d={`M${x-3} 90 L${x+3} 90`} />
        </g>
      ))}
      <path d="M5 35 L5 50 L10 50 L10 35" opacity="0.4" />
      <path d="M90 35 L90 50 L95 50 L95 35" opacity="0.4" />
    </g>
  </svg>
)

// 13. Louver - slatted opening
const LouverSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="louver-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#louver-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M25 15 L25 85 L75 85 L75 15 Z" />
      {[22, 32, 42, 52, 62, 72].map((y, i) => (
        <path key={i} d={`M28 ${y} L72 ${y+6}`} strokeWidth="1" />
      ))}
      <path d="M30 20 L30 82 L70 82 L70 20 Z" strokeWidth="0.4" />
      <path d="M20 10 L20 90 L80 90 L80 10 Z" opacity="0.3" />
    </g>
  </svg>
)

// 14. Newel - staircase post
const NewelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="newel-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#newel-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M40 15 L60 15 L62 20 L38 20 Z" />
      <path d="M42 20 L42 75 Q50 80, 58 75 L58 20" />
      <path d="M45 25 Q50 30, 55 25" />
      <path d="M44 35 L44 45 Q50 50, 56 45 L56 35" />
      <path d="M44 55 L44 65 Q50 70, 56 65 L56 55" />
      <path d="M38 75 L38 85 L62 85 L62 75" />
      <path d="M35 85 L35 92 L65 92 L65 85" />
      <path d="M65 50 L90 35" />
      <path d="M65 55 L90 40" />
      <path d="M5 90 L95 90" strokeWidth="1" />
    </g>
  </svg>
)

// 15. Pedestal - support base
const PedestalSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pedestal-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#pedestal-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M30 20 L70 20 L72 25 L28 25 Z" />
      <path d="M32 25 L32 70 L68 70 L68 25" />
      <path d="M28 70 L28 78 L72 78 L72 70" />
      <path d="M25 78 L25 85 L75 85 L75 78" />
      <path d="M35 30 L35 65 L65 65 L65 30" strokeWidth="0.4" />
      <path d="M40 40 L40 55 L60 55 L60 40 Z" opacity="0.3" />
      <ellipse cx="50" cy="15" rx="12" ry="5" strokeDasharray="2,2" opacity="0.4" />
      <path d="M20 85 L80 85" strokeWidth="1" />
    </g>
  </svg>
)

// 16. Pier - vertical support
const PierSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pier-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#pier-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M30 15 L70 15 L70 20 L30 20 Z" />
      <path d="M32 20 L32 80 L68 80 L68 20" strokeWidth="1.2" />
      <path d="M35 25 L35 75" strokeWidth="0.4" />
      <path d="M65 25 L65 75" strokeWidth="0.4" />
      <path d="M28 80 L28 90 L72 90 L72 80" />
      <path d="M15 15 L30 15 L30 20 L15 20" strokeDasharray="2,2" opacity="0.4" />
      <path d="M70 15 L85 15 L85 20 L70 20" strokeDasharray="2,2" opacity="0.4" />
      <path d="M10 90 L90 90" strokeWidth="1" />
    </g>
  </svg>
)

// 17. Pillar - freestanding column
const PillarSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pillar-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#pillar-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M35 20 L65 20 L68 25 L32 25 Z" />
      <path d="M38 25 L38 75 Q50 78, 62 75 L62 25" strokeWidth="1.2" />
      <path d="M42 30 L42 72" strokeWidth="0.4" />
      <path d="M50 28 L50 75" strokeWidth="0.4" />
      <path d="M58 30 L58 72" strokeWidth="0.4" />
      <path d="M35 75 L35 82 L65 82 L65 75" />
      <path d="M32 82 L32 88 L68 88 L68 82" />
      <path d="M30 88 L30 92 L70 92 L70 88" />
      <ellipse cx="50" cy="15" rx="10" ry="4" opacity="0.4" />
      <path d="M25 92 L75 92" strokeWidth="1" />
    </g>
  </svg>
)

// 18. Quoin - corner stones
const QuoinSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="quoin-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#quoin-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M25 10 L25 90 L90 90 L90 10" opacity="0.3" />
      <path d="M25 10 L25 22 L40 22 L40 10 Z" />
      <path d="M25 25 L25 37 L35 37 L35 25 Z" />
      <path d="M25 40 L25 52 L40 52 L40 40 Z" />
      <path d="M25 55 L25 67 L35 67 L35 55 Z" />
      <path d="M25 70 L25 82 L40 82 L40 70 Z" />
      <path d="M25 85 L25 90 L35 90 L35 85 Z" />
      <path d="M28 13 L37 19" opacity="0.3" />
      <path d="M28 43 L37 49" opacity="0.3" />
      <path d="M28 73 L37 79" opacity="0.3" />
    </g>
  </svg>
)

// 19. Rafter - sloping roof beam
const RafterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rafter-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rafter-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M50 15 L10 70" strokeWidth="1.5" />
      <path d="M50 15 L90 70" strokeWidth="1.5" />
      <path d="M10 70 L90 70" strokeWidth="1" />
      {[20, 32, 44, 56, 68, 80].map((x, i) => {
        const y = 70 - (Math.abs(50-x) / 40) * 55
        return <path key={i} d={`M${x} ${y} L${x} 70`} strokeWidth="1" />
      })}
      <path d="M50 15 L53 20 L47 20 Z" />
      <path d="M7 70 L7 85" opacity="0.4" />
      <path d="M93 70 L93 85" opacity="0.4" />
    </g>
  </svg>
)

// 20. Rail - horizontal bar
const RailSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rail-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rail-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 35 L90 35" strokeWidth="2" />
      <path d="M10 32 L90 32" strokeWidth="0.5" />
      <path d="M10 38 L90 38" strokeWidth="0.5" />
      <path d="M10 60 L90 60" strokeWidth="1" />
      <path d="M15 38 L15 60" />
      <path d="M30 38 L30 60" />
      <path d="M45 38 L45 60" />
      <path d="M60 38 L60 60" />
      <path d="M75 38 L75 60" />
      <path d="M10 35 L10 65 L15 65 L15 35" opacity="0.5" />
      <path d="M85 35 L85 65 L90 65 L90 35" opacity="0.5" />
      <path d="M5 65 L95 65" strokeWidth="1" />
    </g>
  </svg>
)

// 21. Reveal - recessed surface
const RevealSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="reveal-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#reveal-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 15 L10 85 L90 85 L90 15" opacity="0.3" />
      <path d="M25 25 L25 75 L75 75 L75 25 Z" />
      <path d="M25 25 L30 30" />
      <path d="M75 25 L70 30" />
      <path d="M25 75 L30 70" />
      <path d="M75 75 L70 70" />
      <path d="M30 30 L30 70 L70 70 L70 30 Z" strokeDasharray="2,2" opacity="0.5" />
      <path d="M27 30 L27 70" strokeWidth="0.4" />
      <path d="M30 72 L70 72" strokeWidth="0.4" />
      <path d="M73 30 L73 70" strokeWidth="0.4" />
      <path d="M30 28 L70 28" strokeWidth="0.4" />
    </g>
  </svg>
)

// 22. Ridgepole - peak beam
const RidgepoleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="ridgepole-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#ridgepole-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 70 L50 30 L90 70" />
      <path d="M50 25 L50 35" strokeWidth="2" />
      <path d="M48 27 L52 27" />
      <path d="M48 33 L52 33" />
      <path d="M30 50 L50 30 L70 50" strokeDasharray="2,2" opacity="0.5" />
      <path d="M10 70 L10 75" />
      <path d="M90 70 L90 75" />
      <path d="M30 50 L30 75" strokeWidth="0.5" />
      <path d="M70 50 L70 75" strokeWidth="0.5" />
      <path d="M5 75 L95 75" strokeWidth="1" />
    </g>
  </svg>
)

// 23. Riser - vertical stair face
const RiserSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="riser-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#riser-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M15 85 L35 85 L35 70 L55 70 L55 55 L75 55 L75 40 L90 40" />
      <path d="M35 85 L35 70" strokeWidth="1.5" />
      <path d="M55 70 L55 55" strokeWidth="1.5" />
      <path d="M75 55 L75 40" strokeWidth="1.5" />
      <path d="M32 70 L32 85" strokeWidth="0.4" />
      <path d="M52 55 L52 70" strokeWidth="0.4" />
      <path d="M72 40 L72 55" strokeWidth="0.4" />
      <path d="M20 85 L20 78" strokeDasharray="2,2" opacity="0.3" />
      <path d="M45 70 L45 62" strokeDasharray="2,2" opacity="0.3" />
      <path d="M10 85 L95 85" strokeWidth="1" />
    </g>
  </svg>
)

// 24. Sill - base of window/door
const SillSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sill-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#sill-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M20 60 L80 60 L82 68 L18 68 Z" strokeWidth="1" />
      <path d="M22 62 L78 62" strokeWidth="0.4" />
      <path d="M20 65 L80 65" strokeWidth="0.4" />
      <path d="M18 68 L18 70 L82 70 L82 68" />
      <path d="M25 35 L25 60 L75 60 L75 35" strokeDasharray="2,2" opacity="0.4" />
      <path d="M15 70 L15 90 L85 90 L85 70" opacity="0.3" />
      <path d="M30 68 L30 72" strokeWidth="0.4" />
      <path d="M50 68 L50 72" strokeWidth="0.4" />
      <path d="M70 68 L70 72" strokeWidth="0.4" />
    </g>
  </svg>
)

// 25. Soffit - underside surface
const SoffitSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="soffit-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#soffit-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M5 40 L50 20 L95 40" />
      <path d="M5 40 L5 48 L20 48 L20 40" />
      <path d="M95 40 L95 48 L80 48 L80 40" />
      <path d="M5 48 L95 48" strokeWidth="1.2" />
      <path d="M10 48 L10 52" />
      <path d="M90 48 L90 52" />
      <path d="M10 52 L90 52" />
      <path d="M20 48 L20 52 L80 52 L80 48" opacity="0.4" />
      {[25, 35, 45, 55, 65, 75].map((x, i) => (
        <path key={i} d={`M${x} 48 L${x} 52`} strokeWidth="0.4" />
      ))}
      <path d="M20 52 L20 90" opacity="0.3" />
      <path d="M80 52 L80 90" opacity="0.3" />
    </g>
  </svg>
)

// 26. Spandrel - triangular space
const SpandrelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="spandrel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#spandrel-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 70 L10 20 L90 20 L90 70" />
      <path d="M10 70 Q50 30, 90 70" strokeWidth="1.2" />
      <path d="M15 22 L15 65 Q25 55, 30 62" />
      <path d="M85 22 L85 65 Q75 55, 70 62" />
      <circle cx="25" cy="35" r="8" />
      <circle cx="75" cy="35" r="8" />
      <path d="M25 27 L25 43" strokeWidth="0.4" />
      <path d="M17 35 L33 35" strokeWidth="0.4" />
      <path d="M75 27 L75 43" strokeWidth="0.4" />
      <path d="M67 35 L83 35" strokeWidth="0.4" />
      <path d="M5 70 L95 70" strokeWidth="1" />
    </g>
  </svg>
)

// 27. Staircase - flight of stairs
const StaircaseSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="staircase-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#staircase-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M20 85 L20 75 L30 75 L30 65 L40 65 L40 55 L50 55 L50 45 L60 45 L60 35 L70 35 L70 25 L80 25 L80 15" />
      <path d="M20 85 L85 85 L85 15" opacity="0.3" />
      <path d="M15 75 L15 90" strokeWidth="1.2" />
      <path d="M12 72 L18 72 L18 75 L12 75 Z" />
      <path d="M85 12 L85 22 L88 22 L88 12 Z" />
      <path d="M15 75 L90 25" />
      <path d="M15 80 L90 30" />
      {[25, 35, 45, 55, 65, 75].map((x, i) => (
        <path key={i} d={`M${x-5} ${85-i*10} L${x-5} ${75-i*10}`} strokeWidth="0.5" />
      ))}
    </g>
  </svg>
)

// 28. Strut - diagonal support
const StrutSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="strut-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#strut-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M20 20 L80 20" strokeWidth="1.5" />
      <path d="M20 80 L80 80" strokeWidth="1.5" />
      <path d="M20 20 L20 80" strokeWidth="1.2" />
      <path d="M80 20 L80 80" strokeWidth="1.2" />
      <path d="M25 25 L75 75" strokeWidth="1.5" />
      <path d="M23 27 L73 77" strokeWidth="0.5" />
      <path d="M27 23 L77 73" strokeWidth="0.5" />
      <circle cx="25" cy="25" r="4" />
      <circle cx="75" cy="75" r="4" />
    </g>
  </svg>
)

// 29. String Course - horizontal band
const StringCourseSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="string-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#string-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 20 L10 80 L90 80 L90 20" opacity="0.3" />
      <path d="M8 45 L92 45" strokeWidth="1.5" />
      <path d="M8 52 L92 52" strokeWidth="1.5" />
      <path d="M8 45 L8 52" />
      <path d="M92 45 L92 52" />
      <path d="M10 47 L90 47" strokeWidth="0.4" />
      <path d="M10 50 L90 50" strokeWidth="0.4" />
      <path d="M15 25 L15 42 L35 42 L35 25" opacity="0.4" />
      <path d="M65 25 L65 42 L85 42 L85 25" opacity="0.4" />
      <path d="M15 55 L15 75 L35 75 L35 55" opacity="0.4" />
      <path d="M65 55 L65 75 L85 75 L85 55" opacity="0.4" />
    </g>
  </svg>
)

// 30. Truss - triangular framework
const TrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="truss-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#truss-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 70 L50 20 L90 70 Z" strokeWidth="1.2" />
      <path d="M10 70 L90 70" strokeWidth="1.5" />
      <path d="M50 20 L50 70" strokeWidth="1" />
      <path d="M30 45 L70 45" strokeWidth="1" />
      <path d="M30 45 L10 70" strokeWidth="0.8" />
      <path d="M70 45 L90 70" strokeWidth="0.8" />
      <path d="M30 45 L50 70" strokeWidth="0.8" />
      <path d="M70 45 L50 70" strokeWidth="0.8" />
      <circle cx="10" cy="70" r="3" />
      <circle cx="90" cy="70" r="3" />
      <circle cx="50" cy="20" r="3" />
      <circle cx="30" cy="45" r="2" />
      <circle cx="70" cy="45" r="2" />
      <circle cx="50" cy="70" r="2" />
    </g>
  </svg>
)

// 31. Turret - small tower
const TurretSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="turret-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#turret-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M35 90 L35 50 L65 50 L65 90" />
      <path d="M32 50 L32 45 L38 45 L38 50" />
      <path d="M45 50 L45 45 L55 45 L55 50" />
      <path d="M62 50 L62 45 L68 45 L68 50" />
      <path d="M30 50 L70 50" strokeWidth="1" />
      <path d="M35 50 L50 25 L65 50" />
      <path d="M50 25 L50 20" strokeWidth="1" />
      <path d="M48 22 L52 22" />
      <path d="M40 60 L40 72 L48 72 L48 60 Q44 57, 40 60" />
      <path d="M52 70 L52 82 L60 82 L60 70 Q56 68, 52 70" />
      <path d="M25 90 L25 70 L35 70" opacity="0.3" />
      <path d="M75 90 L75 70 L65 70" opacity="0.3" />
      <path d="M20 90 L80 90" strokeWidth="1" />
    </g>
  </svg>
)

// 32. Wainscot - lower wall paneling
const WainscotSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="wainscot-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#wainscot-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d="M10 10 L10 90 L90 90 L90 10" opacity="0.2" />
      <path d="M10 45 L90 45" strokeWidth="1.5" />
      <path d="M10 48 L90 48" strokeWidth="0.5" />
      <path d="M10 48 L10 88 L90 88 L90 48" />
      <path d="M15 52 L15 84 L35 84 L35 52 Z" />
      <path d="M40 52 L40 84 L60 84 L60 52 Z" />
      <path d="M65 52 L65 84 L85 84 L85 52 Z" />
      <path d="M18 55 L18 81 L32 81 L32 55 Z" strokeWidth="0.4" />
      <path d="M43 55 L43 81 L57 81 L57 55 Z" strokeWidth="0.4" />
      <path d="M68 55 L68 81 L82 81 L82 55 Z" strokeWidth="0.4" />
      <path d="M10 88 L90 88" strokeWidth="1" />
    </g>
  </svg>
)

// Export mapping for all specialized elements
export const SPECIALIZED_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'abutment': AbutmentSVG,
  'ambulatory': AmbulatorySVG,
  'balcony': BalconySVG,
  'basement': BasementSVG,
  'capital': CapitalSVG,
  'chimney': ChimneySVG,
  'console': ConsoleSVG,
  'coping': CopingSVG,
  'eave': EaveSVG,
  'gutter': GutterSVG,
  'jamb': JambSVG,
  'joist': JoistSVG,
  'louver': LouverSVG,
  'newel': NewelSVG,
  'pedestal': PedestalSVG,
  'pier': PierSVG,
  'pillar': PillarSVG,
  'quoin': QuoinSVG,
  'rafter': RafterSVG,
  'rail': RailSVG,
  'reveal': RevealSVG,
  'ridgepole': RidgepoleSVG,
  'riser': RiserSVG,
  'sill': SillSVG,
  'soffit': SoffitSVG,
  'spandrel': SpandrelSVG,
  'staircase': StaircaseSVG,
  'strut': StrutSVG,
  'string-course': StringCourseSVG,
  'truss': TrussSVG,
  'turret': TurretSVG,
  'wainscot': WainscotSVG,
}

export {
  AbutmentSVG,
  AmbulatorySVG,
  BalconySVG,
  BasementSVG,
  CapitalSVG,
  ChimneySVG,
  ConsoleSVG,
  CopingSVG,
  EaveSVG,
  GutterSVG,
  JambSVG,
  JoistSVG,
  LouverSVG,
  NewelSVG,
  PedestalSVG,
  PierSVG,
  PillarSVG,
  QuoinSVG,
  RafterSVG,
  RailSVG,
  RevealSVG,
  RidgepoleSVG,
  RiserSVG,
  SillSVG,
  SoffitSVG,
  SpandrelSVG,
  StaircaseSVG,
  StrutSVG,
  StringCourseSVG,
  TrussSVG,
  TurretSVG,
  WainscotSVG,
}
