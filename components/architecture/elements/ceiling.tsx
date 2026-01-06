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

// 1. Beam - structural ceiling member
const BeamSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="beam-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#beam-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Ceiling plane */}
      <path d="M10 30 L90 30" opacity="0.3" />
      {/* Main beam - 3D perspective */}
      <path d="M10 35 L10 50 L90 50 L90 35" />
      <path d="M10 35 L15 30 L95 30 L90 35" />
      <path d="M90 35 L95 30 L95 45 L90 50" />
      {/* Beam bottom face */}
      <path d="M10 50 L90 50" strokeWidth="1.2" />
      {/* Wood grain */}
      <path d="M20 40 L25 42" opacity="0.3" />
      <path d="M45 38 L52 41" opacity="0.3" />
      <path d="M70 39 L78 42" opacity="0.3" />
      {/* Supporting wall indication */}
      <path d="M8 35 L8 90 L12 90 L12 50" opacity="0.4" />
      <path d="M88 35 L88 90 L92 90 L92 50" opacity="0.4" />
      {/* Cross-section view (inset) */}
      <path d="M72 60 L72 80 L88 80 L88 60 Z" strokeWidth="0.6" />
      <path d="M75 63 L75 77 L85 77 L85 63 Z" strokeWidth="0.4" />
      {/* Dimension indication */}
      <path d="M50 52 L50 58" strokeWidth="0.4" />
      <path d="M45 55 L55 55" strokeWidth="0.4" />
    </g>
  </svg>
)

// 2. Coffer - recessed panel in ceiling
const CofferSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="coffer-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#coffer-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Grid of coffered panels */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const x = 10 + col * 27
          const y = 10 + row * 27
          return (
            <g key={`${row}-${col}`}>
              {/* Outer frame */}
              <path d={`M${x} ${y} L${x+27} ${y} L${x+27} ${y+27} L${x} ${y+27} Z`} />
              {/* Inner recessed panel */}
              <path d={`M${x+4} ${y+4} L${x+23} ${y+4} L${x+23} ${y+23} L${x+4} ${y+23} Z`} />
              {/* Beveled edges */}
              <path d={`M${x} ${y} L${x+4} ${y+4}`} />
              <path d={`M${x+27} ${y} L${x+23} ${y+4}`} />
              <path d={`M${x} ${y+27} L${x+4} ${y+23}`} />
              <path d={`M${x+27} ${y+27} L${x+23} ${y+23}`} />
              {/* Central rosette */}
              <circle cx={x+13.5} cy={y+13.5} r="4" />
            </g>
          )
        })
      )}
      {/* Outer border */}
      <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="1" />
    </g>
  </svg>
)

// 3. Drop Ceiling - suspended ceiling grid
const DropCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="drop-halo" intensity={0.75} />}
    <g filter={showHalo ? "url(#drop-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Perspective grid */}
      <path d="M5 20 L50 10 L95 20" />
      <path d="M5 20 L5 80 L50 95 L95 80 L95 20" />
      <path d="M5 80 L95 80" />
      {/* T-bar grid - horizontal */}
      <path d="M5 35 L95 35" />
      <path d="M5 50 L95 50" />
      <path d="M5 65 L95 65" />
      {/* T-bar grid - vertical */}
      <path d="M28 20 L28 80" />
      <path d="M50 10 L50 95" />
      <path d="M72 20 L72 80" />
      {/* Ceiling tiles (some displaced to show system) */}
      <path d="M7 22 L26 22 L26 33 L7 33 Z" />
      <path d="M30 22 L48 22 L48 33 L30 33 Z" />
      {/* One tile lifted */}
      <path d="M52 18 L70 15 L70 28 L52 31 Z" strokeDasharray="2,2" />
      <path d="M52 22 L70 22 L70 33 L52 33 Z" opacity="0.5" />
      {/* Light fixture */}
      <path d="M30 52 L48 52 L48 63 L30 63 Z" strokeWidth="1" />
      <path d="M33 55 L45 55 L45 60 L33 60 Z" opacity="0.5" />
      {/* Suspension wires */}
      <path d="M28 10 L28 20" strokeDasharray="2,2" opacity="0.4" />
      <path d="M72 10 L72 20" strokeDasharray="2,2" opacity="0.4" />
    </g>
  </svg>
)

// 4. Exposed Beam ceiling
const ExposedBeamSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="exposed-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#exposed-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Ceiling deck between beams */}
      <path d="M5 15 L95 15" opacity="0.3" />
      <path d="M10 18 L90 18" opacity="0.2" />
      {/* Main beams (exposed) */}
      <path d="M15 15 L15 35 L20 35 L20 15" strokeWidth="1" />
      <path d="M40 15 L40 35 L45 35 L45 15" strokeWidth="1" />
      <path d="M65 15 L65 35 L70 35 L70 15" strokeWidth="1" />
      <path d="M85 15 L85 30 L90 30 L90 15" strokeWidth="1" />
      {/* Wood grain texture */}
      <path d="M16 20 L19 22" opacity="0.4" />
      <path d="M16 28 L19 30" opacity="0.4" />
      <path d="M41 22 L44 24" opacity="0.4" />
      <path d="M66 25 L69 27" opacity="0.4" />
      {/* Cross beams/joists */}
      <path d="M15 25 L40 25" strokeWidth="0.6" />
      <path d="M45 25 L65 25" strokeWidth="0.6" />
      <path d="M70 25 L90 25" strokeWidth="0.6" />
      {/* Ceiling planks direction */}
      {[22, 30, 38, 46, 54, 62, 70, 78].map((x, i) => (
        <path key={i} d={`M${x} 15 L${x} 18`} opacity="0.3" />
      ))}
      {/* Room walls */}
      <path d="M5 15 L5 90" opacity="0.3" />
      <path d="M95 15 L95 90" opacity="0.3" />
      {/* Connection details */}
      <path d="M15 15 L15 12 L20 12 L20 15" strokeWidth="0.4" />
      <path d="M40 15 L40 12 L45 12 L45 15" strokeWidth="0.4" />
    </g>
  </svg>
)

// 5. Tray Ceiling - recessed ceiling with stepped edges
const TrayCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tray-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#tray-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Outer ceiling plane */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" />
      {/* First step inward */}
      <path d="M20 20 L80 20 L80 80 L20 80 Z" />
      {/* Beveled transition */}
      <path d="M10 10 L20 20" />
      <path d="M90 10 L80 20" />
      <path d="M10 90 L20 80" />
      <path d="M90 90 L80 80" />
      {/* Inner recessed area */}
      <path d="M30 30 L70 30 L70 70 L30 70 Z" />
      {/* Second bevel */}
      <path d="M20 20 L30 30" />
      <path d="M80 20 L70 30" />
      <path d="M20 80 L30 70" />
      <path d="M80 80 L70 70" />
      {/* Central medallion/fixture location */}
      <circle cx="50" cy="50" r="10" />
      <circle cx="50" cy="50" r="6" strokeDasharray="2,2" />
      {/* Cove lighting indication */}
      <path d="M25 25 L75 25" strokeDasharray="3,3" opacity="0.4" />
      <path d="M25 75 L75 75" strokeDasharray="3,3" opacity="0.4" />
      <path d="M25 25 L25 75" strokeDasharray="3,3" opacity="0.4" />
      <path d="M75 25 L75 75" strokeDasharray="3,3" opacity="0.4" />
      {/* Crown molding detail */}
      <path d="M12 12 L18 18" strokeWidth="0.4" />
      <path d="M88 12 L82 18" strokeWidth="0.4" />
    </g>
  </svg>
)

// 6. Vaulted Ceiling
const VaultedCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="vaulted-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#vaulted-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Room walls */}
      <path d="M10 85 L10 50" />
      <path d="M90 85 L90 50" />
      {/* Vaulted ceiling curve */}
      <path d="M10 50 Q50 10, 90 50" />
      {/* Ridge line */}
      <path d="M50 15 L50 85" strokeDasharray="3,3" opacity="0.3" />
      {/* Ceiling curve detail lines */}
      <path d="M15 55 Q50 20, 85 55" opacity="0.5" />
      <path d="M20 60 Q50 30, 80 60" opacity="0.3" />
      {/* Cross-vault ribs (if groin vault) */}
      <path d="M10 50 Q50 35, 90 85" strokeDasharray="2,2" opacity="0.4" />
      <path d="M90 50 Q50 35, 10 85" strokeDasharray="2,2" opacity="0.4" />
      {/* Springer points */}
      <circle cx="10" cy="50" r="2" />
      <circle cx="90" cy="50" r="2" />
      {/* Light fixture */}
      <path d="M48 25 L48 35 L52 35 L52 25" />
      <ellipse cx="50" cy="38" rx="5" ry="3" />
      {/* Floor line */}
      <path d="M5 85 L95 85" strokeWidth="1" />
      {/* Window in gable end suggestion */}
      <circle cx="50" cy="35" r="8" strokeDasharray="2,2" opacity="0.4" />
    </g>
  </svg>
)

// 7. Wooden Ceiling (plank ceiling)
const WoodenCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="wooden-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#wooden-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Individual planks */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const y = 10 + i * 10
        return (
          <g key={i}>
            <path d={`M10 ${y} L90 ${y} L90 ${y+9} L10 ${y+9} Z`} />
            {/* Wood grain */}
            <path d={`M15 ${y+3} L25 ${y+5}`} opacity="0.3" />
            <path d={`M40 ${y+2} L55 ${y+6}`} opacity="0.3" />
            <path d={`M70 ${y+4} L85 ${y+3}`} opacity="0.3" />
            {/* Knots */}
            {i % 3 === 0 && <circle cx={30 + i * 8} cy={y + 5} r="2" opacity="0.4" />}
          </g>
        )
      })}
      {/* Edge trim */}
      <path d="M8 10 L8 90" strokeWidth="1" />
      <path d="M92 10 L92 90" strokeWidth="1" />
      {/* Tongue and groove detail (edge) */}
      <path d="M10 19 L12 19 L12 20 L10 20" opacity="0.5" />
      <path d="M10 29 L12 29 L12 30 L10 30" opacity="0.5" />
      <path d="M10 39 L12 39 L12 40 L10 40" opacity="0.5" />
      {/* Board end stagger */}
      <path d="M45 10 L45 20" strokeWidth="0.5" />
      <path d="M60 20 L60 30" strokeWidth="0.5" />
      <path d="M35 30 L35 40" strokeWidth="0.5" />
    </g>
  </svg>
)

// Export mapping for all ceiling elements
export const CEILING_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'beam': BeamSVG,
  'coffer': CofferSVG,
  'drop-ceiling': DropCeilingSVG,
  'exposed-beam': ExposedBeamSVG,
  'tray-ceiling': TrayCeilingSVG,
  'vaulted-ceiling': VaultedCeilingSVG,
  'wooden-ceiling': WoodenCeilingSVG,
}

export {
  BeamSVG,
  CofferSVG,
  DropCeilingSVG,
  ExposedBeamSVG,
  TrayCeilingSVG,
  VaultedCeilingSVG,
  WoodenCeilingSVG,
}
