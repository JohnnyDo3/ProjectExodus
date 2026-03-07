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

/**
 * ABUTMENT - Structural support at the end of an arch or bridge
 * Technical reference: Load-bearing masonry foundation transferring lateral thrust to ground
 * Blueprint convention: Solid lines for abutment mass, dashed for arch/bridge context
 */
const AbutmentSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="abutment-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#abutment-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Bridge/arch structure */}
      <path d="M45 50 Q65 30, 85 50" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M85 50 L85 90" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M5 90 L95 90" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />

      {/* PRIMARY: Abutment mass */}
      <path d="M15 25 L15 90 L45 90 L45 50" strokeWidth="1.2" />
      <path d="M18 30 L18 87 L42 87 L42 52" strokeWidth="1" />
      <path d="M45 50 L50 45 L55 42" strokeWidth="1" />
      <path d="M10 25 L50 25 L50 35 L10 35 Z" strokeWidth="1" />

      {/* Detail: Stone courses */}
      <path d="M20 40 L40 40" strokeWidth="0.6" opacity="0.5" />
      <path d="M20 55 L40 55" strokeWidth="0.6" opacity="0.5" />
      <path d="M20 70 L40 70" strokeWidth="0.6" opacity="0.5" />
    </g>
  </svg>
)

/**
 * AMBULATORY - Covered walkway encircling a sacred or central space
 * Technical reference: Circulation path around apse/sanctuary in religious architecture
 * Blueprint convention: Solid for walkway corridor, dashed for central space
 */
const AmbulatorySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="ambulatory-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#ambulatory-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Central sanctuary/apse with altar */}
      <g strokeDasharray="3 2" opacity="0.4">
        <circle cx="50" cy="50" r="12" strokeWidth="0.8" />
        <path d="M47 48 L53 48 L53 52 L47 52 Z" strokeWidth="0.5" />
      </g>

      {/* PRIMARY: Ambulatory - semicircular walkway around apse */}
      {/* Outer wall of ambulatory */}
      <path d="M50 5 Q90 5, 95 50 Q95 95, 50 95 Q5 95, 5 50 Q5 5, 50 5" strokeWidth="1.8" />
      {/* Inner wall of ambulatory (sanctuary boundary) */}
      <path d="M50 20 Q75 20, 78 50 Q78 80, 50 80 Q22 80, 22 50 Q22 20, 50 20" strokeWidth="1.5" />

      {/* Arcade columns separating ambulatory from sanctuary */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 50 + 27 * Math.cos(rad)
        const cy = 50 + 27 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="2.5" strokeWidth="1.2" />
      })}

      {/* Vault ribs spanning across corridor width */}
      {[20, 60, 100, 140, 180, 220, 260, 300, 340].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + 22 * Math.cos(rad)
        const y1 = 50 + 22 * Math.sin(rad)
        const x2 = 50 + 42 * Math.cos(rad)
        const y2 = 50 + 42 * Math.sin(rad)
        return <path key={i} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`} strokeWidth="0.7" opacity="0.5" />
      })}

      {/* Radiating chapels off the ambulatory (3 semicircular apsidioles) */}
      <path d="M95 42 Q102 50, 95 58" strokeWidth="1" opacity="0.7" />
      <path d="M72 92 Q78 100, 85 93" strokeWidth="1" opacity="0.7" />
      <path d="M15 93 Q22 100, 28 92" strokeWidth="1" opacity="0.7" />

      {/* Floor paving in corridor */}
      <path d="M50 8 Q88 8, 92 50" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3" />
      <path d="M92 50 Q92 92, 50 92" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 3" />
    </g>
  </svg>
)

/**
 * BALCONY - Cantilevered platform projecting from building facade
 * Technical reference: Elevated exterior platform with railing, accessible from interior
 * Blueprint convention: Solid for balcony structure, dashed for building context
 */
const BalconySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="balcony-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#balcony-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Building facade */}
      <path d="M10 15 L10 90 L90 90 L90 15" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M10 45 L90 45" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M10 90 L90 90" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />

      {/* PRIMARY: Balcony platform and railing */}
      <path d="M10 50 L25 50 L25 55 L75 55 L75 50 L90 50" strokeWidth="1.2" />
      <path d="M25 38 L75 38" strokeWidth="1" />
      <path d="M25 45 L75 45" strokeWidth="1" />
      <path d="M25 45 L25 70 L75 70 L75 45" strokeWidth="1.2" />

      {/* Detail: Balustrade */}
      {[30, 40, 50, 60, 70].map((x, i) => (
        <path key={i} d={`M${x} 38 Q${x-1} 41.5, ${x} 45`} strokeWidth="0.8" />
      ))}
      <path d="M28 55 Q40 62, 50 58 Q60 54, 72 55" strokeWidth="0.6" opacity="0.6" />
    </g>
  </svg>
)

/**
 * BASEMENT - Below-grade story providing foundation and service space
 * Technical reference: Subterranean level with foundation walls and slab
 * Blueprint convention: Solid for basement walls, dashed for grade line and above-ground context
 */
const BasementSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="basement-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#basement-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Above-ground structure */}
      <path d="M5 40 L5 35 L95 35 L95 40" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M5 30 L5 10" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M95 30 L95 10" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />

      {/* PRIMARY: Grade line */}
      <path d="M10 40 L90 40" strokeWidth="1.5" />

      {/* PRIMARY: Basement walls and spaces */}
      <path d="M15 40 L15 85 L85 85 L85 40" strokeWidth="1.2" />
      <path d="M20 50 L20 65 L35 65 L35 50 Z" strokeWidth="1" />
      <path d="M65 50 L65 65 L80 65 L80 50 Z" strokeWidth="1" />
      <path d="M40 60 L40 85 L60 85 L60 60" strokeWidth="1" />

      {/* Detail: Floor joists */}
      <path d="M15 55 L85 55" strokeWidth="0.5" opacity="0.5" />
      <path d="M15 70 L85 70" strokeWidth="0.5" opacity="0.5" />
    </g>
  </svg>
)

/**
 * CAPITAL - Ornamental crowning element of a column
 * Technical reference: Transitional element between shaft and entablature, often decorated
 * Blueprint convention: Solid for capital detail, dashed for column shaft context
 */
const CapitalSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="capital-halo" intensity={1} />}
    <g filter={showHalo ? "url(#capital-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Column shaft below */}
      <path d="M35 60 L35 90" strokeDasharray="3 2" strokeWidth="1" opacity="0.4" />
      <path d="M65 60 L65 90" strokeDasharray="3 2" strokeWidth="1" opacity="0.4" />

      {/* PRIMARY: Capital abacus */}
      <path d="M20 20 L80 20 L80 28 L20 28 Z" strokeWidth="1.2" />

      {/* PRIMARY: Capital body */}
      <path d="M25 28 L25 40 Q50 55, 75 40 L75 28" strokeWidth="1" />
      <path d="M30 40 Q35 48, 40 45 Q45 50, 50 47 Q55 50, 60 45 Q65 48, 70 40" strokeWidth="1" />
      <path d="M28 45 Q25 50, 22 55 Q20 60, 25 60" strokeWidth="1" />
      <path d="M72 45 Q75 50, 78 55 Q80 60, 75 60" strokeWidth="1" />
      <path d="M30 60 L70 60" strokeWidth="1" />

      {/* Detail: Decorative fluting */}
      <path d="M33 50 L33 58" strokeWidth="0.6" opacity="0.5" />
      <path d="M50 52 L50 60" strokeWidth="0.6" opacity="0.5" />
      <path d="M67 50 L67 58" strokeWidth="0.6" opacity="0.5" />
    </g>
  </svg>
)

/**
 * CHIMNEY - Vertical flue structure for smoke and gas exhaust
 * Technical reference: Masonry or metal stack extending above roofline with flue liner
 * Blueprint convention: Solid for chimney mass, dashed for smoke and roof context
 */
const ChimneySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="chimney-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#chimney-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Smoke/exhaust */}
      <path d="M45 25 Q50 15, 55 25" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M48 20 Q52 10, 56 20" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />

      {/* CONTEXT: Roof structure */}
      <path d="M20 90 L80 90" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Chimney cap */}
      <path d="M32 30 L68 30 L68 35 L32 35 Z" strokeWidth="1.2" />

      {/* PRIMARY: Chimney stack */}
      <path d="M35 30 L35 75 L65 75 L65 30" strokeWidth="1.2" />
      <path d="M30 75 L30 90 L70 90 L70 75" strokeWidth="1" />

      {/* Detail: Flue liner and brick courses */}
      <path d="M38 35 L38 72 L62 72 L62 35" strokeWidth="0.5" opacity="0.5" />
      <path d="M35 80 L65 80" strokeWidth="0.5" />
      <path d="M35 85 L65 85" strokeWidth="0.5" />
    </g>
  </svg>
)

/**
 * CONSOLE - Decorative projecting bracket supporting cornice or balcony
 * Technical reference: Cantilevered corbel with ornamental scrollwork
 * Blueprint convention: Solid for bracket profile, dashed for wall context
 */
const ConsoleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="console-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#console-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall surface */}
      <path d="M15 15 L15 85" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Supported element */}
      <path d="M20 25 L80 25 L80 32 L20 32 Z" strokeWidth="1.2" />

      {/* PRIMARY: Console bracket */}
      <path d="M20 32 L20 75" strokeWidth="1.5" />
      <path d="M20 32 Q45 35, 55 50 Q65 65, 55 80 Q45 90, 20 75" strokeWidth="1.2" />
      <path d="M23 38 Q42 40, 50 52 Q58 64, 50 75 Q42 84, 23 72" strokeWidth="1" />

      {/* Detail: Decorative volutes */}
      <path d="M55 80 Q62 76, 60 70 Q58 65, 52 68" strokeWidth="0.8" />
      <path d="M28 48 Q35 46, 38 52" strokeWidth="0.6" />
      <path d="M30 58 Q38 55, 42 62" strokeWidth="0.6" />
    </g>
  </svg>
)

/**
 * COPING - Protective cap on top of wall preventing water infiltration
 * Technical reference: Sloped or curved masonry/metal cap with drip edge
 * Blueprint convention: Solid for coping profile, dashed for wall context
 */
const CopingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="coping-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#coping-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall masonry */}
      <path d="M10 50 L10 90 L90 90 L90 50" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M15 55 L30 55" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M40 55 L60 55" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M70 55 L85 55" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M20 70 L45 70" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M55 70 L80 70" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M15 85 L40 85" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M60 85 L85 85" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />

      {/* PRIMARY: Coping stone */}
      <path d="M5 40 L95 40 L95 50 L5 50 Z" strokeWidth="1.5" />
      <path d="M5 42 Q50 38, 95 42" strokeWidth="1" />
      <path d="M8 50 L92 50" strokeWidth="0.6" />
    </g>
  </svg>
)

/**
 * EAVE - Horizontal lower edge of roof overhanging the wall
 * Technical reference: Roof projection providing weather protection for walls and openings
 * Blueprint convention: Solid for eave structure, dashed for wall context
 */
const EaveSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="eave-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#eave-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall below */}
      <path d="M15 55 L15 90 L85 90 L85 55" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Roof plane */}
      <path d="M5 50 L50 20 L95 50" strokeWidth="1.5" />
      <path d="M10 52 L50 25 L90 52" strokeWidth="1" />

      {/* PRIMARY: Eave overhang structure */}
      <path d="M5 50 L5 55 L15 55 L15 50" strokeWidth="1" />
      <path d="M95 50 L95 55 L85 55 L85 50" strokeWidth="1" />
      <path d="M10 55 L90 55" strokeWidth="1.2" />

      {/* Detail: Rafter tails */}
      {[20, 30, 40, 50, 60, 70, 80].map((x, i) => (
        <path key={i} d={`M${x} 50 L${x} 55`} strokeWidth="0.8" />
      ))}
      <path d="M8 52 L92 52" strokeWidth="0.5" opacity="0.5" />
    </g>
  </svg>
)

/**
 * GUTTER - Channel collecting and directing roof water drainage
 * Technical reference: Linear trough at eave with downspout connection
 * Blueprint convention: Solid for gutter profile, dashed for roof context
 */
const GutterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gutter-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#gutter-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Roof above */}
      <path d="M10 35 L50 15 L90 35" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M10 35 L10 42 L15 42 L15 35" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />

      {/* PRIMARY: Gutter channel */}
      <path d="M5 42 L95 42" strokeWidth="1.5" />
      <path d="M5 42 L5 50 L95 50 L95 42" strokeWidth="1.2" />
      <path d="M8 45 L92 45" strokeWidth="0.6" />

      {/* PRIMARY: Downspout */}
      <path d="M15 50 L15 90" strokeWidth="1.5" />
      <path d="M18 50 L18 90" strokeWidth="1" />
      <path d="M15 90 L15 95 L20 95 L20 90" strokeWidth="1" />

      {/* Detail: Water flow */}
      <path d="M16 60 Q20 62, 16 65" strokeWidth="0.6" opacity="0.5" />
      <path d="M16 72 Q20 74, 16 77" strokeWidth="0.6" opacity="0.5" />
    </g>
  </svg>
)

/**
 * JAMB - Vertical framing member forming the side of a door or window opening
 * Technical reference: Structural and finish element at opening edge, receives door/window frame
 * Blueprint convention: Solid for jamb detail, dashed for wall and opening context
 */
const JambSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="jamb-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#jamb-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall */}
      <path d="M10 10 L10 90 L40 90 L40 10" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* CONTEXT: Opening/window */}
      <path d="M40 25 L40 75 L80 75 L80 25" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Jamb detail */}
      <path d="M25 15 L25 85 L35 85 L35 15 Z" strokeWidth="1.5" />
      <path d="M27 18 L27 82 L33 82 L33 18 Z" strokeWidth="0.8" />

      {/* Detail: Connections */}
      <path d="M35 25 L40 25" strokeWidth="1" />
      <path d="M35 75 L40 75" strokeWidth="1" />
      <path d="M25 15 L15 15" strokeWidth="0.8" />
      <path d="M25 85 L15 85" strokeWidth="0.8" />

      {/* Detail: Hardware prep */}
      <path d="M30 35 L30 40" strokeWidth="1.2" />
      <path d="M30 50 L30 55" strokeWidth="1.2" />
      <path d="M30 65 L30 70" strokeWidth="1.2" />
    </g>
  </svg>
)

/**
 * JOIST - Horizontal structural member supporting floor or ceiling loads
 * Technical reference: Repetitive framing spanning between bearing walls or beams
 * Blueprint convention: Solid for joists, dashed for bearing supports
 */
const JoistSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="joist-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#joist-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Bearing walls on left and right */}
      <path d="M5 15 L5 90 L10 90 L10 15" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M90 15 L90 90 L95 90 L95 15" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      {/* Subfloor/sheathing on top */}
      <path d="M10 15 L90 15" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.3" />

      {/* PRIMARY: Multiple parallel floor joists spanning between walls */}
      {[22, 34, 46, 58, 70, 82].map((y, i) => (
        <g key={i}>
          <path d={`M10 ${y} L90 ${y}`} strokeWidth="1.8" />
          <path d={`M10 ${y+4} L90 ${y+4}`} strokeWidth="1" opacity="0.6" />
        </g>
      ))}

      {/* PRIMARY: Cross bridging between joists (X-bracing) */}
      {[22, 34, 46, 58, 70].map((y, i) => (
        <g key={i}>
          <path d={`M50 ${y+4} L50 ${y+8}`} strokeWidth="0.8" opacity="0.7" />
          <path d={`M48 ${y+4} L52 ${y+8}`} strokeWidth="0.6" opacity="0.5" />
          <path d={`M52 ${y+4} L48 ${y+8}`} strokeWidth="0.6" opacity="0.5" />
        </g>
      ))}
    </g>
  </svg>
)

/**
 * LOUVER - Slatted opening allowing ventilation while restricting water entry
 * Technical reference: Angled blades in frame for air circulation and light control
 * Blueprint convention: Solid for louver assembly, dashed for wall context
 */
const LouverSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="louver-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#louver-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall opening */}
      <path d="M20 10 L20 90 L80 90 L80 10 Z" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Louver frame */}
      <path d="M25 15 L25 85 L75 85 L75 15 Z" strokeWidth="1.2" />
      <path d="M30 20 L30 82 L70 82 L70 20 Z" strokeWidth="0.6" />

      {/* PRIMARY: Louver blades */}
      {[22, 32, 42, 52, 62, 72].map((y, i) => (
        <path key={i} d={`M28 ${y} L72 ${y+6}`} strokeWidth="1.2" />
      ))}
    </g>
  </svg>
)

/**
 * NEWEL - Primary structural post at staircase landings and turns
 * Technical reference: Vertical element anchoring handrail and balustrade system
 * Blueprint convention: Solid for newel post, dashed for stair context
 */
const NewelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="newel-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#newel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Stair railing and floor */}
      <path d="M65 50 L90 35" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M65 55 L90 40" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M5 90 L95 90" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Newel cap */}
      <path d="M40 15 L60 15 L62 20 L38 20 Z" strokeWidth="1.2" />

      {/* PRIMARY: Newel shaft */}
      <path d="M42 20 L42 75 Q50 80, 58 75 L58 20" strokeWidth="1.5" />
      <path d="M45 25 Q50 30, 55 25" strokeWidth="1" />
      <path d="M44 35 L44 45 Q50 50, 56 45 L56 35" strokeWidth="1" />
      <path d="M44 55 L44 65 Q50 70, 56 65 L56 55" strokeWidth="1" />

      {/* PRIMARY: Newel base */}
      <path d="M38 75 L38 85 L62 85 L62 75" strokeWidth="1.2" />
      <path d="M35 85 L35 92 L65 92 L65 85" strokeWidth="1.2" />
    </g>
  </svg>
)

/**
 * PEDESTAL - Architectural base supporting column, statue, or urn
 * Technical reference: Three-part composition (base, die, cap) raising element above floor
 * Blueprint convention: Solid for pedestal components, dashed for supported object
 */
const PedestalSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pedestal-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#pedestal-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Supported element */}
      <ellipse cx="50" cy="15" rx="12" ry="5" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* CONTEXT: Floor */}
      <path d="M20 85 L80 85" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Pedestal cap */}
      <path d="M30 20 L70 20 L72 25 L28 25 Z" strokeWidth="1.2" />

      {/* PRIMARY: Pedestal die (shaft) */}
      <path d="M32 25 L32 70 L68 70 L68 25" strokeWidth="1.5" />
      <path d="M35 30 L35 65 L65 65 L65 30" strokeWidth="0.6" />

      {/* PRIMARY: Pedestal base */}
      <path d="M28 70 L28 78 L72 78 L72 70" strokeWidth="1.2" />
      <path d="M25 78 L25 85 L75 85 L75 78" strokeWidth="1.2" />

      {/* Detail: Panel recess */}
      <path d="M40 40 L40 55 L60 55 L60 40 Z" strokeWidth="0.5" opacity="0.4" />
    </g>
  </svg>
)

/**
 * PIER - Vertical structural support, typically rectangular and heavier than column
 * Technical reference: Load-bearing masonry or concrete element, often at bridge/arcade
 * Blueprint convention: Solid for pier mass, dashed for supported structure
 */
const PierSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pier-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#pier-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Supported beams/arches */}
      <path d="M15 15 L30 15 L30 20 L15 20" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M70 15 L85 15 L85 20 L70 20" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* CONTEXT: Ground */}
      <path d="M10 90 L90 90" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Pier cap */}
      <path d="M30 15 L70 15 L70 20 L30 20 Z" strokeWidth="1.2" />

      {/* PRIMARY: Pier shaft */}
      <path d="M32 20 L32 80 L68 80 L68 20" strokeWidth="1.5" />

      {/* PRIMARY: Pier base */}
      <path d="M28 80 L28 90 L72 90 L72 80" strokeWidth="1.2" />

      {/* Detail: Pilaster indication */}
      <path d="M35 25 L35 75" strokeWidth="0.6" opacity="0.5" />
      <path d="M65 25 L65 75" strokeWidth="0.6" opacity="0.5" />
    </g>
  </svg>
)

/**
 * PILLAR - Freestanding vertical support element, often ornamental
 * Technical reference: Cylindrical or faceted column with base and capital
 * Blueprint convention: Solid for pillar profile, dashed for surrounding context
 */
const PillarSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pillar-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#pillar-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Supported element above */}
      <ellipse cx="50" cy="15" rx="10" ry="4" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* CONTEXT: Floor plane */}
      <path d="M25 92 L75 92" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Capital */}
      <path d="M35 20 L65 20 L68 25 L32 25 Z" strokeWidth="1.2" />

      {/* PRIMARY: Shaft with entasis */}
      <path d="M38 25 L38 75 Q50 78, 62 75 L62 25" strokeWidth="1.5" />

      {/* PRIMARY: Base assembly */}
      <path d="M35 75 L35 82 L65 82 L65 75" strokeWidth="1.2" />
      <path d="M32 82 L32 88 L68 88 L68 82" strokeWidth="1.2" />
      <path d="M30 88 L30 92 L70 92 L70 88" strokeWidth="1.2" />

      {/* Detail: Fluting */}
      <path d="M42 30 L42 72" strokeWidth="0.5" opacity="0.5" />
      <path d="M50 28 L50 75" strokeWidth="0.5" opacity="0.5" />
      <path d="M58 30 L58 72" strokeWidth="0.5" opacity="0.5" />
    </g>
  </svg>
)

/**
 * QUOIN - Emphasized corner stones providing structural and decorative articulation
 * Technical reference: Alternating large/small ashlar blocks at building corner
 * Blueprint convention: Solid for quoin stones, dashed for wall context
 */
const QuoinSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="quoin-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#quoin-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall planes */}
      <path d="M25 10 L25 90 L90 90 L90 10" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Quoin stones - alternating sizes */}
      <path d="M25 10 L25 22 L40 22 L40 10 Z" strokeWidth="1.2" />
      <path d="M25 25 L25 37 L35 37 L35 25 Z" strokeWidth="1.2" />
      <path d="M25 40 L25 52 L40 52 L40 40 Z" strokeWidth="1.2" />
      <path d="M25 55 L25 67 L35 67 L35 55 Z" strokeWidth="1.2" />
      <path d="M25 70 L25 82 L40 82 L40 70 Z" strokeWidth="1.2" />
      <path d="M25 85 L25 90 L35 90 L35 85 Z" strokeWidth="1.2" />

      {/* Detail: Stone tooling marks */}
      <path d="M28 13 L37 19" strokeWidth="0.5" opacity="0.4" />
      <path d="M28 43 L37 49" strokeWidth="0.5" opacity="0.4" />
      <path d="M28 73 L37 79" strokeWidth="0.5" opacity="0.4" />
    </g>
  </svg>
)

/**
 * RAFTER - Sloping structural member supporting roof covering
 * Technical reference: Inclined framing spanning from ridge to eave
 * Blueprint convention: Solid for rafters, dashed for wall supports
 */
const RafterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rafter-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rafter-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Walls */}
      <path d="M7 70 L7 85" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M93 70 L93 85" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Main rafters */}
      <path d="M50 15 L10 70" strokeWidth="1.8" />
      <path d="M50 15 L90 70" strokeWidth="1.8" />

      {/* PRIMARY: Ridge connection */}
      <path d="M50 15 L53 20 L47 20 Z" strokeWidth="1.2" />

      {/* PRIMARY: Ceiling/collar ties */}
      <path d="M10 70 L90 70" strokeWidth="1.2" />

      {/* PRIMARY: Intermediate rafters - parallel diagonal members following roof slope */}
      {/* Left side rafters (parallel to main left rafter M50 15 L10 70) */}
      <path d="M42 22 L18 70" strokeWidth="1.2" />
      <path d="M34 29 L26 70" strokeWidth="1.2" />
      {/* Right side rafters (parallel to main right rafter M50 15 L90 70) */}
      <path d="M58 22 L82 70" strokeWidth="1.2" />
      <path d="M66 29 L74 70" strokeWidth="1.2" />
    </g>
  </svg>
)

/**
 * RAIL - Horizontal protective or decorative barrier element
 * Technical reference: Top member of railing system with balusters below
 * Blueprint convention: Solid for rail assembly, dashed for post context
 */
const RailSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rail-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#rail-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Newel posts */}
      <path d="M10 35 L10 65 L15 65 L15 35" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M85 35 L85 65 L90 65 L90 35" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* CONTEXT: Floor/deck */}
      <path d="M5 65 L95 65" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Top rail */}
      <path d="M10 35 L90 35" strokeWidth="2" />
      <path d="M10 32 L90 32" strokeWidth="0.6" />
      <path d="M10 38 L90 38" strokeWidth="0.6" />

      {/* PRIMARY: Bottom rail */}
      <path d="M10 60 L90 60" strokeWidth="1.2" />

      {/* PRIMARY: Balusters */}
      <path d="M15 38 L15 60" strokeWidth="1" />
      <path d="M30 38 L30 60" strokeWidth="1" />
      <path d="M45 38 L45 60" strokeWidth="1" />
      <path d="M60 38 L60 60" strokeWidth="1" />
      <path d="M75 38 L75 60" strokeWidth="1" />
    </g>
  </svg>
)

/**
 * REVEAL - Recessed depth of wall at window or door opening
 * Technical reference: Wall thickness exposed at jamb, showing construction depth
 * Blueprint convention: Solid for reveal edges, dashed for opening and wall context
 */
const RevealSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="reveal-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#reveal-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Outer wall plane */}
      <path d="M10 15 L10 85 L90 85 L90 15" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* CONTEXT: Window/door */}
      <path d="M30 30 L30 70 L70 70 L70 30 Z" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Outer opening frame */}
      <path d="M25 25 L25 75 L75 75 L75 25 Z" strokeWidth="1.5" />

      {/* PRIMARY: Reveal depth shown by connecting lines */}
      <path d="M25 25 L30 30" strokeWidth="1.2" />
      <path d="M75 25 L70 30" strokeWidth="1.2" />
      <path d="M25 75 L30 70" strokeWidth="1.2" />
      <path d="M75 75 L70 70" strokeWidth="1.2" />

      {/* Detail: Reveal surfaces */}
      <path d="M27 30 L27 70" strokeWidth="0.6" />
      <path d="M30 72 L70 72" strokeWidth="0.6" />
      <path d="M73 30 L73 70" strokeWidth="0.6" />
      <path d="M30 28 L70 28" strokeWidth="0.6" />
    </g>
  </svg>
)

/**
 * RIDGEPOLE - Horizontal beam at roof apex receiving rafter ends
 * Technical reference: Primary longitudinal structural member at roof peak
 * Blueprint convention: Solid for ridgepole, dashed for roof plane context
 */
const RidgepoleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="ridgepole-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#ridgepole-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Roof slopes meeting at ridge */}
      <g strokeDasharray="3 2" opacity="0.4">
        <path d="M5 75 L5 80" strokeWidth="0.6" />
        <path d="M95 75 L95 80" strokeWidth="0.6" />
        <path d="M0 80 L100 80" strokeWidth="0.8" />
        {/* Left roof slope */}
        <path d="M5 75 L30 40" strokeWidth="0.8" />
        {/* Right roof slope */}
        <path d="M95 75 L70 40" strokeWidth="0.8" />
      </g>

      {/* PRIMARY: Ridgepole - horizontal beam at roof apex, shown in perspective receding */}
      {/* Main ridgepole beam - thick horizontal member */}
      <path d="M15 32 L85 42" strokeWidth="4" />
      {/* Top face of beam (showing 3D depth) */}
      <path d="M15 30 L85 40" strokeWidth="1" />
      <path d="M15 30 L15 32" strokeWidth="1.5" />
      {/* Wood grain along length */}
      <path d="M20 33 L40 36" strokeWidth="0.5" opacity="0.5" />
      <path d="M45 37 L70 40" strokeWidth="0.5" opacity="0.5" />
      <path d="M25 35 L55 38" strokeWidth="0.4" opacity="0.4" />

      {/* Rafters meeting the ridgepole from both sides */}
      <path d="M20 34 L5 60" strokeWidth="1.2" opacity="0.7" />
      <path d="M40 37 L25 63" strokeWidth="1.2" opacity="0.7" />
      <path d="M60 39 L45 65" strokeWidth="1.2" opacity="0.7" />
      <path d="M80 42 L65 68" strokeWidth="1.2" opacity="0.7" />
      <path d="M20 34 L35 60" strokeWidth="1.2" opacity="0.7" />
      <path d="M40 37 L55 63" strokeWidth="1.2" opacity="0.7" />
      <path d="M60 39 L75 65" strokeWidth="1.2" opacity="0.7" />
      <path d="M80 42 L95 68" strokeWidth="1.2" opacity="0.7" />

      {/* Notch/birdsmouth joint detail at one rafter */}
      <path d="M39 36 L41 38 L39 38" strokeWidth="0.8" opacity="0.6" />
    </g>
  </svg>
)

/**
 * RISER - Vertical face of stair step between treads
 * Technical reference: Height component of step, perpendicular to tread
 * Blueprint convention: Solid for risers, dashed for wall context
 */
const RiserSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="riser-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#riser-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall/support */}
      <path d="M20 85 L20 78" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M45 70 L45 62" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />

      {/* CONTEXT: Floor */}
      <path d="M10 85 L95 85" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Stair profile with treads */}
      <path d="M15 85 L35 85 L35 70 L55 70 L55 55 L75 55 L75 40 L90 40" strokeWidth="1" />

      {/* PRIMARY: Risers (vertical faces) */}
      <path d="M35 85 L35 70" strokeWidth="1.8" />
      <path d="M55 70 L55 55" strokeWidth="1.8" />
      <path d="M75 55 L75 40" strokeWidth="1.8" />

      {/* Detail: Riser thickness */}
      <path d="M32 70 L32 85" strokeWidth="0.6" />
      <path d="M52 55 L52 70" strokeWidth="0.6" />
      <path d="M72 40 L72 55" strokeWidth="0.6" />
    </g>
  </svg>
)

/**
 * SILL - Horizontal member at base of window or door opening
 * Technical reference: Weathering element projecting beyond wall, sloped for drainage
 * Blueprint convention: Solid for sill profile, dashed for wall and opening context
 */
const SillSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sill-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#sill-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Window above */}
      <path d="M25 35 L25 60 L75 60 L75 35" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* CONTEXT: Wall below */}
      <path d="M15 70 L15 90 L85 90 L85 70" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Sill with drip edge */}
      <path d="M20 60 L80 60 L82 68 L18 68 Z" strokeWidth="1.5" />
      <path d="M22 62 L78 62" strokeWidth="0.6" />
      <path d="M20 65 L80 65" strokeWidth="0.6" />
      <path d="M18 68 L18 70 L82 70 L82 68" strokeWidth="1.2" />

      {/* Detail: Drainage grooves */}
      <path d="M30 68 L30 72" strokeWidth="0.6" />
      <path d="M50 68 L50 72" strokeWidth="0.6" />
      <path d="M70 68 L70 72" strokeWidth="0.6" />
    </g>
  </svg>
)

/**
 * SOFFIT - Underside of architectural element (eave, arch, beam, stair)
 * Technical reference: Exposed underside surface, often finished or ventilated
 * Blueprint convention: Solid for soffit plane, dashed for roof and wall context
 */
const SoffitSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="soffit-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#soffit-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Roof above */}
      <path d="M5 40 L50 20 L95 40" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* CONTEXT: Walls */}
      <path d="M20 52 L20 90" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M80 52 L80 90" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Eave overhang */}
      <path d="M5 40 L5 48 L20 48 L20 40" strokeWidth="1" />
      <path d="M95 40 L95 48 L80 48 L80 40" strokeWidth="1" />
      <path d="M5 48 L95 48" strokeWidth="1.5" />

      {/* PRIMARY: Soffit panel */}
      <path d="M10 48 L10 52" strokeWidth="1" />
      <path d="M90 48 L90 52" strokeWidth="1" />
      <path d="M10 52 L90 52" strokeWidth="1.5" />
      <path d="M20 48 L20 52 L80 52 L80 48" strokeWidth="0.5" opacity="0.5" />

      {/* Detail: Vent slots */}
      {[25, 35, 45, 55, 65, 75].map((x, i) => (
        <path key={i} d={`M${x} 48 L${x} 52`} strokeWidth="0.6" />
      ))}
    </g>
  </svg>
)

/**
 * SPANDREL - Triangular space between arch shoulder and rectangular frame
 * Technical reference: Decorative or structural infill at arch extrados
 * Blueprint convention: Solid for spandrel decoration, dashed for arch context
 */
const SpandrelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="spandrel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#spandrel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Rectangular frame */}
      <path d="M10 70 L10 20 L90 20 L90 70" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M5 70 L95 70" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Main arch */}
      <path d="M10 70 Q50 30, 90 70" strokeWidth="1.5" />

      {/* PRIMARY: Spandrel zones with ornament */}
      <path d="M15 22 L15 65 Q25 55, 30 62" strokeWidth="1.2" />
      <path d="M85 22 L85 65 Q75 55, 70 62" strokeWidth="1.2" />

      {/* PRIMARY: Decorative rosettes in spandrels */}
      <circle cx="25" cy="35" r="8" strokeWidth="1.2" />
      <circle cx="75" cy="35" r="8" strokeWidth="1.2" />
      <path d="M25 27 L25 43" strokeWidth="0.6" />
      <path d="M17 35 L33 35" strokeWidth="0.6" />
      <path d="M75 27 L75 43" strokeWidth="0.6" />
      <path d="M67 35 L83 35" strokeWidth="0.6" />
    </g>
  </svg>
)

/**
 * STAIRCASE - Complete flight of steps with structural supports
 * Technical reference: Series of treads and risers with stringers and railing
 * Blueprint convention: Solid for stair structure, dashed for enclosing walls
 */
const StaircaseSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="staircase-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#staircase-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Enclosing walls/well */}
      <path d="M20 85 L85 85 L85 15" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Stair profile */}
      <path d="M20 85 L20 75 L30 75 L30 65 L40 65 L40 55 L50 55 L50 45 L60 45 L60 35 L70 35 L70 25 L80 25 L80 15" strokeWidth="1.5" />

      {/* PRIMARY: Newel posts */}
      <path d="M15 75 L15 90" strokeWidth="1.5" />
      <path d="M12 72 L18 72 L18 75 L12 75 Z" strokeWidth="1.2" />
      <path d="M85 12 L85 22 L88 22 L88 12 Z" strokeWidth="1.2" />

      {/* PRIMARY: Handrail */}
      <path d="M15 75 L90 25" strokeWidth="1.2" />
      <path d="M15 80 L90 30" strokeWidth="1.2" />

      {/* Detail: Riser centers */}
      {[25, 35, 45, 55, 65, 75].map((x, i) => (
        <path key={i} d={`M${x-5} ${85-i*10} L${x-5} ${75-i*10}`} strokeWidth="0.8" />
      ))}
    </g>
  </svg>
)

/**
 * STRUT - Diagonal compression member in structural frame
 * Technical reference: Angled brace resisting lateral or vertical loads
 * Blueprint convention: Solid for strut, dashed for frame context optional
 */
const StrutSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="strut-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#strut-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* PRIMARY: Frame members */}
      <path d="M20 20 L80 20" strokeWidth="1.8" />
      <path d="M20 80 L80 80" strokeWidth="1.8" />
      <path d="M20 20 L20 80" strokeWidth="1.5" />
      <path d="M80 20 L80 80" strokeWidth="1.5" />

      {/* PRIMARY: Diagonal strut */}
      <path d="M25 25 L75 75" strokeWidth="1.8" />
      <path d="M23 27 L73 77" strokeWidth="0.8" />
      <path d="M27 23 L77 73" strokeWidth="0.8" />

      {/* PRIMARY: Connections */}
      <circle cx="25" cy="25" r="4" strokeWidth="1.2" />
      <circle cx="75" cy="75" r="4" strokeWidth="1.2" />
    </g>
  </svg>
)

/**
 * STRING COURSE - Continuous horizontal band projecting from wall facade
 * Technical reference: Molded belt dividing stories, often at floor levels
 * Blueprint convention: Solid for course projection, dashed for wall context
 */
const StringCourseSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="string-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#string-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall plane and windows */}
      <path d="M10 20 L10 80 L90 80 L90 20" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M15 25 L15 42 L35 42 L35 25" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M65 25 L65 42 L85 42 L85 25" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M15 55 L15 75 L35 75 L35 55" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />
      <path d="M65 55 L65 75 L85 75 L85 55" strokeDasharray="3 2" strokeWidth="0.6" opacity="0.4" />

      {/* PRIMARY: String course projection */}
      <path d="M8 45 L92 45" strokeWidth="1.8" />
      <path d="M8 52 L92 52" strokeWidth="1.8" />
      <path d="M8 45 L8 52" strokeWidth="1.2" />
      <path d="M92 45 L92 52" strokeWidth="1.2" />

      {/* Detail: Molding profile */}
      <path d="M10 47 L90 47" strokeWidth="0.6" />
      <path d="M10 50 L90 50" strokeWidth="0.6" />
    </g>
  </svg>
)

/**
 * TRUSS - Triangulated structural framework distributing loads
 * Technical reference: Web of compression/tension members forming rigid geometry
 * Blueprint convention: Solid for all truss members and connections
 */
const TrussSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="truss-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#truss-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* PRIMARY: Truss perimeter */}
      <path d="M10 70 L50 20 L90 70 Z" strokeWidth="1.5" />
      <path d="M10 70 L90 70" strokeWidth="1.8" />

      {/* PRIMARY: Web members */}
      <path d="M50 20 L50 70" strokeWidth="1.2" />
      <path d="M30 45 L70 45" strokeWidth="1.2" />
      <path d="M30 45 L10 70" strokeWidth="1" />
      <path d="M70 45 L90 70" strokeWidth="1" />
      <path d="M30 45 L50 70" strokeWidth="1" />
      <path d="M70 45 L50 70" strokeWidth="1" />

      {/* PRIMARY: Connections (gusset plates) */}
      <circle cx="10" cy="70" r="3" strokeWidth="1.2" />
      <circle cx="90" cy="70" r="3" strokeWidth="1.2" />
      <circle cx="50" cy="20" r="3" strokeWidth="1.2" />
      <circle cx="30" cy="45" r="2" strokeWidth="1" />
      <circle cx="70" cy="45" r="2" strokeWidth="1" />
      <circle cx="50" cy="70" r="2" strokeWidth="1" />
    </g>
  </svg>
)

/**
 * TURRET - Small projecting tower, often corbelled from corner
 * Technical reference: Cylindrical or polygonal tower element with conical roof
 * Blueprint convention: Solid for turret mass, dashed for building context
 */
const TurretSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="turret-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#turret-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Building walls */}
      <path d="M25 90 L25 70 L35 70" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M75 90 L75 70 L65 70" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />
      <path d="M20 90 L80 90" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Turret shaft */}
      <path d="M35 90 L35 50 L65 50 L65 90" strokeWidth="1.5" />

      {/* PRIMARY: Crenellations */}
      <path d="M30 50 L70 50" strokeWidth="1.2" />
      <path d="M32 50 L32 45 L38 45 L38 50" strokeWidth="1" />
      <path d="M45 50 L45 45 L55 45 L55 50" strokeWidth="1" />
      <path d="M62 50 L62 45 L68 45 L68 50" strokeWidth="1" />

      {/* PRIMARY: Conical roof */}
      <path d="M35 50 L50 25 L65 50" strokeWidth="1.2" />
      <path d="M50 25 L50 20" strokeWidth="1.2" />
      <path d="M48 22 L52 22" strokeWidth="0.8" />

      {/* PRIMARY: Window openings */}
      <path d="M40 60 L40 72 L48 72 L48 60 Q44 57, 40 60" strokeWidth="1" />
      <path d="M52 70 L52 82 L60 82 L60 70 Q56 68, 52 70" strokeWidth="1" />
    </g>
  </svg>
)

/**
 * WAINSCOT - Protective wood paneling on lower portion of interior wall
 * Technical reference: Chair-rail height panel system with cap molding
 * Blueprint convention: Solid for wainscot assembly, dashed for wall above
 */
const WainscotSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="wainscot-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#wainscot-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT: Wall above wainscot */}
      <path d="M10 10 L10 90 L90 90 L90 10" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.4" />

      {/* PRIMARY: Chair rail cap */}
      <path d="M10 45 L90 45" strokeWidth="1.8" />
      <path d="M10 48 L90 48" strokeWidth="0.8" />

      {/* PRIMARY: Wainscot panel frame */}
      <path d="M10 48 L10 88 L90 88 L90 48" strokeWidth="1.2" />

      {/* PRIMARY: Individual panels */}
      <path d="M15 52 L15 84 L35 84 L35 52 Z" strokeWidth="1.2" />
      <path d="M40 52 L40 84 L60 84 L60 52 Z" strokeWidth="1.2" />
      <path d="M65 52 L65 84 L85 84 L85 52 Z" strokeWidth="1.2" />

      {/* Detail: Panel insets */}
      <path d="M18 55 L18 81 L32 81 L32 55 Z" strokeWidth="0.6" />
      <path d="M43 55 L43 81 L57 81 L57 55 Z" strokeWidth="0.6" />
      <path d="M68 55 L68 81 L82 81 L82 55 Z" strokeWidth="0.6" />

      {/* PRIMARY: Baseboard */}
      <path d="M10 88 L90 88" strokeWidth="1.2" />
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
