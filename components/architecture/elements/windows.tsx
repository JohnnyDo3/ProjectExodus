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

// 1. Casement Window - side-hinged window that opens outward
const CasementSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="casement-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#casement-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Outer frame */}
      <path d="M22 15 L22 85 M78 15 L78 85" />
      <path d="M20 15 Q50 13, 80 15" />
      <path d="M20 85 Q50 87, 80 85" />
      {/* Center mullion */}
      <path d="M49.5 15 L50.5 85" />
      {/* Left casement - slightly open */}
      <path d="M24 18 L24 82 L47 80 L47 20 Z" />
      <path d="M35 48 L40 50 L35 52" />
      {/* Right casement */}
      <path d="M53 18 L53 82 L76 82 L76 18 Z" />
      <path d="M60 48 L65 50 L60 52" />
      {/* Glass panes - left */}
      <path d="M27 22 L27 48 L44 47 L44 22 Z" />
      <path d="M27 52 L27 78 L44 77 L44 52 Z" />
      {/* Glass panes - right */}
      <path d="M56 22 L56 48 L73 48 L73 22 Z" />
      <path d="M56 52 L56 78 L73 78 L73 52 Z" />
      {/* Hinges */}
      <circle cx="24" cy="30" r="1.5" />
      <circle cx="24" cy="70" r="1.5" />
      <circle cx="76" cy="30" r="1.5" />
      <circle cx="76" cy="70" r="1.5" />
    </g>
  </svg>
)

// 2. Clerestory Window - high windows above eye level
const ClerestorySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="clerestory-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#clerestory-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Wall section below */}
      <path d="M10 60 L10 95 L90 95 L90 60" />
      <path d="M15 65 L15 90 L40 90 L40 65" />
      <path d="M60 65 L60 90 L85 90 L85 65" />
      {/* Clerestory level */}
      <path d="M10 20 L10 55 L90 55 L90 20" />
      {/* Row of clerestory windows */}
      <path d="M15 25 L15 50 L30 50 L30 25 Z" />
      <path d="M35 25 L35 50 L50 50 L50 25 Z" />
      <path d="M55 25 L55 50 L70 50 L70 25 Z" />
      <path d="M75 25 L75 50 L88 50 L88 25 Z" />
      {/* Light rays streaming in */}
      <path d="M22 50 L18 65" strokeDasharray="2,2" opacity="0.5" />
      <path d="M42 50 L38 65" strokeDasharray="2,2" opacity="0.5" />
      <path d="M62 50 L58 65" strokeDasharray="2,2" opacity="0.5" />
      <path d="M82 50 L78 65" strokeDasharray="2,2" opacity="0.5" />
      {/* Roofline indication */}
      <path d="M5 20 Q50 12, 95 20" />
    </g>
  </svg>
)

// 3. Dormer Window - window projecting from sloped roof
const DormerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="dormer-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#dormer-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Main roof slope */}
      <path d="M5 85 L50 35 L95 85" />
      {/* Dormer structure */}
      <path d="M30 70 L30 45 L50 30 L70 45 L70 70" />
      {/* Dormer roof */}
      <path d="M28 45 L50 28 L72 45" />
      <path d="M26 47 L50 26 L74 47" />
      {/* Window in dormer */}
      <path d="M35 48 L35 68 L65 68 L65 48 Z" />
      {/* Window panes */}
      <path d="M50 48 L50 68" />
      <path d="M35 58 L65 58" />
      {/* Window details */}
      <path d="M38 51 L38 55 L47 55 L47 51" />
      <path d="M53 51 L53 55 L62 55 L62 51" />
      <path d="M38 61 L38 65 L47 65 L47 61" />
      <path d="M53 61 L53 65 L62 65 L62 61" />
      {/* Side walls */}
      <path d="M30 70 L22 78" />
      <path d="M70 70 L78 78" />
      {/* Roof tiles indication */}
      <path d="M15 75 Q50 68, 85 75" strokeDasharray="3,3" opacity="0.4" />
    </g>
  </svg>
)

// 4. Lunette - semicircular or crescent window
const LunetteSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="lunette-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#lunette-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Semicircular frame */}
      <path d="M15 65 Q15 25, 50 20 Q85 25, 85 65" />
      <path d="M15 65 L85 65" />
      {/* Inner frame */}
      <path d="M20 63 Q20 32, 50 27 Q80 32, 80 63" />
      {/* Radiating mullions (fan pattern) */}
      <path d="M50 65 L50 27" />
      <path d="M50 65 L28 35" />
      <path d="M50 65 L72 35" />
      <path d="M50 65 L20 50" />
      <path d="M50 65 L80 50" />
      {/* Decorative keystone */}
      <path d="M45 25 L50 18 L55 25" />
      <path d="M47 22 L50 19 L53 22" />
      {/* Wall below */}
      <path d="M10 65 L10 90 L90 90 L90 65" />
      <path d="M35 70 L35 85 L65 85 L65 70" />
    </g>
  </svg>
)

// 5. Mullion - vertical bar dividing window panes
const MullionSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="mullion-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#mullion-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Large window frame */}
      <path d="M15 15 L15 85 L85 85 L85 15 Z" />
      {/* Vertical mullions (emphasized) */}
      <path d="M38 15 L38 85" strokeWidth="1.5" />
      <path d="M61 15 L61 85" strokeWidth="1.5" />
      {/* Mullion detail - profile view on side */}
      <path d="M36 15 L36 85" strokeWidth="0.5" />
      <path d="M40 15 L40 85" strokeWidth="0.5" />
      <path d="M59 15 L59 85" strokeWidth="0.5" />
      <path d="M63 15 L63 85" strokeWidth="0.5" />
      {/* Horizontal transom */}
      <path d="M15 50 L85 50" />
      {/* Glass panes */}
      <path d="M18 18 L18 47 L35 47 L35 18" opacity="0.4" />
      <path d="M41 18 L41 47 L58 47 L58 18" opacity="0.4" />
      <path d="M64 18 L64 47 L82 47 L82 18" opacity="0.4" />
      <path d="M18 53 L18 82 L35 82 L35 53" opacity="0.4" />
      <path d="M41 53 L41 82 L58 82 L58 53" opacity="0.4" />
      <path d="M64 53 L64 82 L82 82 L82 53" opacity="0.4" />
      {/* Cross-section detail */}
      <path d="M92 40 L92 60" strokeWidth="2" />
      <path d="M90 42 L94 42 L94 58 L90 58 Z" opacity="0.3" />
    </g>
  </svg>
)

// 6. Oriel Window - bay window projecting from wall
const OrielWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="oriel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#oriel-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Wall face */}
      <path d="M10 15 L10 85 L25 85 L25 15" />
      <path d="M75 15 L75 85 L90 85 L90 15" />
      {/* Oriel projection - 3D effect */}
      <path d="M25 25 L25 75 L35 80 L50 82 L65 80 L75 75 L75 25 L65 20 L50 18 L35 20 Z" />
      {/* Front face of oriel */}
      <path d="M40 22 L40 78 L60 78 L60 22 Z" />
      {/* Side panels */}
      <path d="M25 25 L35 20 L35 80 L25 75" />
      <path d="M75 25 L65 20 L65 80 L75 75" />
      {/* Window panes - front */}
      <path d="M43 25 L43 50 L57 50 L57 25" />
      <path d="M43 53 L43 75 L57 75 L57 53" />
      <path d="M50 25 L50 75" />
      {/* Window panes - sides */}
      <path d="M28 28 L28 72 L33 75 L33 23 Z" opacity="0.6" />
      <path d="M72 28 L72 72 L67 75 L67 23 Z" opacity="0.6" />
      {/* Corbel support */}
      <path d="M35 82 Q42 88, 50 90 Q58 88, 65 82" />
      <path d="M40 84 L40 88 L50 92 L60 88 L60 84" />
    </g>
  </svg>
)

// 7. Palladian Window - tripartite window with arched center
const PalladianWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="palladian-halo" intensity={1} />}
    <g filter={showHalo ? "url(#palladian-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Base line */}
      <path d="M10 85 L90 85" />
      {/* Left rectangular section */}
      <path d="M12 40 L12 83 L32 83 L32 40 Z" />
      <path d="M15 43 L15 80 L29 80 L29 43 Z" />
      <path d="M22 43 L22 80" />
      {/* Center arched section (taller) */}
      <path d="M34 85 L34 35 Q50 15, 66 35 L66 85" />
      <path d="M37 82 L37 38 Q50 20, 63 38 L63 82" />
      {/* Arch keystone */}
      <path d="M47 20 L50 15 L53 20" />
      {/* Center window divisions */}
      <path d="M50 22 L50 82" />
      <path d="M37 55 L63 55" />
      {/* Right rectangular section */}
      <path d="M68 40 L68 83 L88 83 L88 40 Z" />
      <path d="M71 43 L71 80 L85 80 L85 43 Z" />
      <path d="M78 43 L78 80" />
      {/* Pilasters between sections */}
      <path d="M32 38 L32 85" strokeWidth="1.2" />
      <path d="M34 38 L34 85" strokeWidth="0.5" />
      <path d="M66 38 L66 85" strokeWidth="0.5" />
      <path d="M68 38 L68 85" strokeWidth="1.2" />
      {/* Impost blocks */}
      <path d="M32 38 L36 38 L36 42 L32 42" />
      <path d="M64 38 L68 38 L68 42 L64 42" />
    </g>
  </svg>
)

// 8. Rose Window - circular ornamental window
const RoseWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="rose-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#rose-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Outer circle */}
      <circle cx="50" cy="50" r="38" />
      <circle cx="50" cy="50" r="35" />
      {/* Inner circles */}
      <circle cx="50" cy="50" r="10" />
      <circle cx="50" cy="50" r="7" />
      {/* Radiating petals - 12 divisions */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + 10 * Math.cos(rad)
        const y1 = 50 + 10 * Math.sin(rad)
        const x2 = 50 + 33 * Math.cos(rad)
        const y2 = 50 + 33 * Math.sin(rad)
        return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} />
      })}
      {/* Petal shapes between spokes */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 50 + 22 * Math.cos(rad)
        const cy = 50 + 22 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="6" opacity="0.7" />
      })}
      {/* Trefoil details in petals */}
      {[15, 75, 135, 195, 255, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = 50 + 22 * Math.cos(rad)
        const cy = 50 + 22 * Math.sin(rad)
        return <circle key={i} cx={cx} cy={cy} r="2" />
      })}
    </g>
  </svg>
)

// 9. Sash Window - vertically sliding window
const SashWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sash-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#sash-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Outer frame */}
      <path d="M20 12 L20 88 L80 88 L80 12 Z" />
      {/* Upper sash (lowered to show it slides) */}
      <path d="M23 15 L23 52 L77 52 L77 15 Z" />
      <path d="M23 52 L23 55 L77 55 L77 52" strokeWidth="1.2" />
      {/* Lower sash (raised) */}
      <path d="M23 48 L23 85 L77 85 L77 48 Z" />
      <path d="M23 48 L23 45 L77 45 L77 48" strokeWidth="1.2" />
      {/* Upper sash panes (6 over 6 style) */}
      <path d="M23 32 L77 32" />
      <path d="M40 15 L40 52" />
      <path d="M60 15 L60 52" />
      {/* Lower sash panes */}
      <path d="M23 66 L77 66" />
      <path d="M40 48 L40 85" />
      <path d="M60 48 L60 85" />
      {/* Meeting rail detail */}
      <path d="M21 48 L79 48" strokeWidth="1.5" />
      {/* Sash weights indication (on sides) */}
      <path d="M18 30 L18 50" strokeDasharray="2,2" opacity="0.4" />
      <path d="M82 30 L82 50" strokeDasharray="2,2" opacity="0.4" />
      {/* Sash lift */}
      <path d="M45 72 L55 72" strokeWidth="1.2" />
      <path d="M48 71 L48 73" />
      <path d="M52 71 L52 73" />
    </g>
  </svg>
)

// 10. Shutter - hinged cover for windows
const ShutterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="shutter-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#shutter-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Window opening */}
      <path d="M30 15 L30 85 L70 85 L70 15 Z" />
      {/* Left shutter (open) */}
      <path d="M8 18 L8 82 L28 82 L28 18 Z" />
      {/* Left shutter louvers */}
      {[25, 32, 39, 46, 53, 60, 67, 74].map((y, i) => (
        <path key={i} d={`M10 ${y} L26 ${y + 3}`} />
      ))}
      {/* Right shutter (partially closed) */}
      <path d="M72 18 L72 82 L92 82 L92 18 Z" />
      {/* Right shutter louvers */}
      {[25, 32, 39, 46, 53, 60, 67, 74].map((y, i) => (
        <path key={i} d={`M74 ${y} L90 ${y + 3}`} />
      ))}
      {/* Hinges */}
      <circle cx="28" cy="30" r="2" />
      <circle cx="28" cy="70" r="2" />
      <circle cx="72" cy="30" r="2" />
      <circle cx="72" cy="70" r="2" />
      {/* Window glass */}
      <path d="M33 18 L33 82 L67 82 L67 18" opacity="0.4" />
      <path d="M50 18 L50 82" opacity="0.3" />
      <path d="M33 50 L67 50" opacity="0.3" />
      {/* Shutter dogs/holdbacks */}
      <path d="M5 50 L8 48 L8 52 Z" />
      <path d="M95 50 L92 48 L92 52 Z" />
    </g>
  </svg>
)

// 11. Stained Glass - decorative colored glass
const StainedGlassSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="stained-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#stained-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Gothic pointed arch frame */}
      <path d="M15 90 L15 40 Q50 5, 85 40 L85 90 Z" />
      {/* Lead came lines - horizontal */}
      <path d="M15 70 L85 70" strokeWidth="1" />
      <path d="M15 50 Q50 45, 85 50" strokeWidth="1" />
      <path d="M25 30 Q50 20, 75 30" strokeWidth="1" />
      {/* Lead came lines - vertical */}
      <path d="M35 90 L35 55 Q40 35, 50 25" strokeWidth="1" />
      <path d="M65 90 L65 55 Q60 35, 50 25" strokeWidth="1" />
      <path d="M50 90 L50 25" strokeWidth="1" />
      {/* Decorative central motif */}
      <circle cx="50" cy="60" r="8" />
      <path d="M50 52 L50 40" />
      <path d="M42 60 L35 60" />
      <path d="M58 60 L65 60" />
      <path d="M50 68 L50 75" />
      {/* Glass piece textures */}
      <path d="M20 75 L30 80" opacity="0.4" />
      <path d="M70 75 L80 80" opacity="0.4" />
      <path d="M40 35 L45 38" opacity="0.4" />
      <path d="M55 35 L60 38" opacity="0.4" />
      {/* Border detail */}
      <path d="M18 88 L18 42 Q50 10, 82 42 L82 88" opacity="0.5" />
    </g>
  </svg>
)

// 12. Tracery - ornamental stone/wood patterns in windows
const TracerySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tracery-halo" intensity={1} />}
    <g filter={showHalo ? "url(#tracery-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Pointed arch frame */}
      <path d="M12 90 L12 35 Q50 0, 88 35 L88 90" />
      {/* Main mullions */}
      <path d="M35 90 L35 45" strokeWidth="1" />
      <path d="M65 90 L65 45" strokeWidth="1" />
      {/* Tracery head - intersecting arches */}
      <path d="M35 45 Q50 25, 65 45" />
      <path d="M12 35 Q35 50, 35 45" />
      <path d="M88 35 Q65 50, 65 45" />
      {/* Cusped trefoils */}
      <circle cx="50" cy="35" r="10" />
      <path d="M45 28 Q50 35, 55 28" />
      <path d="M55 28 Q50 22, 45 28" />
      {/* Side trefoils */}
      <circle cx="25" cy="45" r="7" />
      <circle cx="75" cy="45" r="7" />
      {/* Quatrefoil at top */}
      <path d="M50 12 Q55 17, 50 22 Q45 17, 50 12" />
      <path d="M45 17 Q50 12, 55 17 Q50 22, 45 17" />
      {/* Lower lancets */}
      <path d="M15 88 L15 50 L32 50 L32 88" />
      <path d="M38 88 L38 50 L62 50 L62 88" />
      <path d="M68 88 L68 50 L85 50 L85 88" />
      {/* Small cusp details */}
      <path d="M23 55 Q23.5 52, 24 55" />
      <path d="M50 55 Q50.5 52, 51 55" />
      <path d="M76 55 Q76.5 52, 77 55" />
    </g>
  </svg>
)

// 13. Transom - horizontal bar across window top
const TransomWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="transom-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#transom-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Overall frame */}
      <path d="M15 15 L15 85 L85 85 L85 15 Z" />
      {/* Transom bar (emphasized) */}
      <path d="M15 35 L85 35" strokeWidth="2" />
      <path d="M15 33 L85 33" strokeWidth="0.5" />
      <path d="M15 37 L85 37" strokeWidth="0.5" />
      {/* Transom window above */}
      <path d="M18 18 L18 32 L82 32 L82 18 Z" />
      {/* Transom light divisions */}
      <path d="M35 18 L35 32" />
      <path d="M50 18 L50 32" />
      <path d="M65 18 L65 32" />
      {/* Main window below transom */}
      <path d="M18 40 L18 82 L82 82 L82 40 Z" />
      {/* Main window divisions */}
      <path d="M50 40 L50 82" />
      <path d="M18 60 L82 60" />
      {/* Glass pane details */}
      <path d="M22 22 L32 28" opacity="0.3" />
      <path d="M52 22 L62 28" opacity="0.3" />
      <path d="M22 45 L32 55" opacity="0.3" />
      <path d="M54 65 L64 75" opacity="0.3" />
      {/* Transom profile view */}
      <path d="M90 33 L95 33 L95 37 L90 37" strokeWidth="1.5" />
    </g>
  </svg>
)

// Export mapping for all window elements
export const WINDOW_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'casement': CasementSVG,
  'clerestory': ClerestorySVG,
  'dormer': DormerSVG,
  'lunette': LunetteSVG,
  'mullion': MullionSVG,
  'oriel-window': OrielWindowSVG,
  'palladian-window': PalladianWindowSVG,
  'rose-window': RoseWindowSVG,
  'sash-window': SashWindowSVG,
  'shutter': ShutterSVG,
  'stained-glass': StainedGlassSVG,
  'tracery': TracerySVG,
  'transom': TransomWindowSVG,
}

export {
  CasementSVG,
  ClerestorySVG,
  DormerSVG,
  LunetteSVG,
  MullionSVG,
  OrielWindowSVG,
  PalladianWindowSVG,
  RoseWindowSVG,
  SashWindowSVG,
  ShutterSVG,
  StainedGlassSVG,
  TracerySVG,
  TransomWindowSVG,
}
