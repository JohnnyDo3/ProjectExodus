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

// 1. Awning - Retractable fabric canopy projection
// Architectural reference: Commercial building weather protection, originated in 19th century storefronts
const AwningSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="awning-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#awning-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Building facade === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M15 25 L15 90 L85 90 L85 25" />
        <path d="M25 45 L25 85 L75 85 L75 45 Z" />
        <path d="M25 45 L75 45 L75 50 L25 50 Z" />
      </g>

      {/* === PRIMARY: Awning structure === */}
      <g strokeWidth="0.8">
        {/* Wall attachment bar */}
        <path d="M15 25 L85 25" strokeWidth="1.2" />
        {/* Awning fabric with scalloped valance */}
        <path d="M15 25 L15 45 Q25 55, 35 45 Q45 55, 50 50 Q55 55, 65 45 Q75 55, 85 45 L85 25" strokeWidth="1" />
        {/* Side support arms */}
        <path d="M15 25 L15 50" strokeWidth="1.1" />
        <path d="M85 25 L85 50" strokeWidth="1.1" />
        {/* Structural ribs */}
        <path d="M25 25 L20 48" strokeWidth="0.7" />
        <path d="M40 25 L35 48" strokeWidth="0.7" />
        <path d="M55 25 L55 50" strokeWidth="0.7" />
        <path d="M70 25 L75 48" strokeWidth="0.7" />
        {/* Diagonal support arms to wall */}
        <path d="M15 35 L5 55" strokeWidth="0.9" />
        <path d="M85 35 L95 55" strokeWidth="0.9" />
        {/* Valance scallop details */}
        <path d="M18 45 Q22 48, 25 45" strokeWidth="0.6" />
        <path d="M38 45 Q42 48, 45 45" strokeWidth="0.6" />
        <path d="M55 45 Q58 48, 62 45" strokeWidth="0.6" />
        <path d="M72 45 Q76 48, 80 45" strokeWidth="0.6" />
        {/* Bottom edge cord */}
        <path d="M15 50 L85 50" strokeDasharray="2 2" opacity="0.6" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// 2. Bay Window - Projecting multi-faceted window structure
// Architectural reference: Victorian and Edwardian domestic architecture, provides expanded interior space
const BayWindowSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bay-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#bay-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Main wall === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M10 15 L10 85 L30 85 L30 15 Z" />
        <path d="M70 15 L70 85 L90 85 L90 15 Z" />
        <path d="M15 30 L25 30" />
        <path d="M75 30 L85 30" />
        <path d="M15 60 L25 60" />
        <path d="M75 60 L85 60" />
      </g>

      {/* === PRIMARY: Bay window projection === */}
      <g strokeWidth="0.8">
        {/* Bay roof */}
        <path d="M25 15 L30 10 L50 5 L70 10 L75 15 Z" strokeWidth="1.1" />
        <path d="M28 15 L50 8 L72 15" strokeWidth="0.5" opacity="0.6" />
        {/* Main angular projection */}
        <path d="M30 15 L30 80 L40 85 L50 87 L60 85 L70 80 L70 15" strokeWidth="1.2" />
        {/* Front central window */}
        <path d="M42 20 L42 75 L58 75 L58 20 Z" strokeWidth="0.9" />
        <path d="M50 20 L50 75" strokeWidth="0.7" />
        <path d="M42 45 L58 45" strokeWidth="0.7" />
        {/* Left angled window */}
        <path d="M32 20 L32 75 L40 78 L40 20 Z" strokeWidth="0.9" />
        <path d="M36 20 L36 76" strokeWidth="0.6" />
        <path d="M32 45 L40 47" strokeWidth="0.6" />
        {/* Right angled window */}
        <path d="M60 20 L60 78 L68 75 L68 20 Z" strokeWidth="0.9" />
        <path d="M64 20 L64 76" strokeWidth="0.6" />
        <path d="M60 47 L68 45" strokeWidth="0.6" />
        {/* Projecting sill/base */}
        <path d="M28 80 L40 87 L50 90 L60 87 L72 80" strokeWidth="1.1" />
        <path d="M30 82 L40 88 L50 91 L60 88 L70 82" strokeWidth="0.6" opacity="0.7" />
        {/* Decorative corbel supports */}
        <path d="M33 82 Q35 86, 38 85" strokeWidth="0.7" />
        <path d="M67 82 Q65 86, 62 85" strokeWidth="0.7" />
      </g>
    </g>
  </svg>
)

// 3. Canopy - Permanent roof projection over entrance
// Architectural reference: Modern commercial and institutional buildings, typically supported by columns
const CanopySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="canopy-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#canopy-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Building wall and entrance === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M10 20 L10 90 L90 90 L90 20 Z" />
        <path d="M25 25 L25 35 L40 35 L40 25 Z" />
        <path d="M60 25 L60 35 L75 35 L75 25 Z" />
        <path d="M35 50 L35 88 L65 88 L65 50 Z" />
      </g>

      {/* === PRIMARY: Canopy structure === */}
      <g strokeWidth="0.8">
        {/* Canopy roof surface */}
        <path d="M15 35 L85 35 L88 40 L12 40 Z" strokeWidth="1" />
        {/* Fascia edge */}
        <path d="M12 40 L88 40 L90 45 L10 45 Z" strokeWidth="1.2" />
        {/* Support columns */}
        <path d="M20 45 L20 88" strokeWidth="1.5" />
        <path d="M80 45 L80 88" strokeWidth="1.5" />
        {/* Column bases */}
        <path d="M17 88 L23 88 L23 90 L17 90 Z" strokeWidth="0.9" />
        <path d="M77 88 L83 88 L83 90 L77 90 Z" strokeWidth="0.9" />
        {/* Column capitals */}
        <path d="M18 45 L22 45 L22 48 L18 48 Z" strokeWidth="0.8" />
        <path d="M78 45 L82 45 L82 48 L78 48 Z" strokeWidth="0.8" />
        {/* Decorative roof brackets */}
        <path d="M15 35 Q12 32, 15 30" strokeWidth="0.9" />
        <path d="M85 35 Q88 32, 85 30" strokeWidth="0.9" />
        {/* Entry door beneath */}
        <path d="M40 55 L40 88 L60 88 L60 55 Z" strokeWidth="0.9" />
        <path d="M50 55 L50 88" strokeWidth="0.7" />
        <circle cx="57" cy="72" r="1.5" strokeWidth="0.6" />
        {/* Drainage downspouts */}
        <path d="M10 45 L8 50 L8 75" strokeDasharray="2 2" opacity="0.5" strokeWidth="0.5" />
        <path d="M90 45 L92 50 L92 75" strokeDasharray="2 2" opacity="0.5" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// 4. Cornice - Projecting horizontal crown molding
// Architectural reference: Classical architecture crown element, defines building roofline with decorative profile
const CorniceSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cornice-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#cornice-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Building wall below === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M15 60 L15 95 L85 95 L85 60 Z" />
        <path d="M25 70 L25 90 L40 90 L40 70 Z" />
        <path d="M60 70 L60 90 L75 90 L75 70 Z" />
        <path d="M20 80 L20 85" />
        <path d="M80 80 L80 85" />
      </g>

      {/* === PRIMARY: Cornice assembly === */}
      <g strokeWidth="0.8">
        {/* Main cornice projection */}
        <path d="M10 45 L90 45 L95 55 L5 55 Z" strokeWidth="1.2" />
        {/* Corona (projecting slab) */}
        <path d="M8 55 L92 55 L92 60 L8 60 Z" strokeWidth="1.1" />
        {/* Soffit underside */}
        <path d="M12 55 L12 58 L88 58 L88 55" strokeDasharray="2 2" opacity="0.5" strokeWidth="0.5" />
        {/* Cymatium (top crown molding) */}
        <path d="M10 42 Q30 38, 50 42 Q70 46, 90 42" strokeWidth="0.9" />
        <path d="M10 45 L90 45" strokeWidth="0.6" opacity="0.7" />
        {/* Bed mold beneath corona */}
        <path d="M10 60 Q30 63, 50 60 Q70 57, 90 60" strokeWidth="0.9" />
        {/* Dentil course */}
        {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
          <path key={i} d={`M${x-3} 52 L${x-3} 48 L${x+1} 48 L${x+1} 52 Z`} strokeWidth="0.7" />
        ))}
        {/* Modillions (scroll brackets) */}
        {[20, 40, 60, 80].map((x, i) => (
          <path key={i} d={`M${x-4} 55 L${x-4} 58 Q${x-6} 62, ${x-4} 65 L${x+2} 65 Q${x+4} 62, ${x+2} 58 L${x+2} 55 Z`} strokeWidth="0.8" />
        ))}
        {/* Frieze below */}
        <path d="M12 65 L88 65 L88 75 L12 75 Z" strokeWidth="0.9" />
        {/* Architrave base */}
        <path d="M13 75 L87 75 L87 82 L13 82 Z" strokeWidth="0.9" />
        <path d="M15 78 L85 78" strokeWidth="0.4" opacity="0.6" />
      </g>
    </g>
  </svg>
)

// 5. Entablature - Classical three-part horizontal superstructure
// Architectural reference: Greek and Roman temple architecture - cornice, frieze, and architrave over columns
const EntablatureSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="entablature-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#entablature-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Column capitals below === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M15 75 L15 95" />
        <path d="M85 75 L85 95" />
        <path d="M12 75 L18 75 L18 78 L12 78 Z" />
        <path d="M82 75 L88 75 L88 78 L82 78 Z" />
        <path d="M18 85 L12 85" />
        <path d="M82 85 L88 85" />
      </g>

      {/* === PRIMARY: Entablature assembly === */}
      <g strokeWidth="0.8">
        {/* CORNICE (top section) */}
        <path d="M5 15 L95 15 L98 22 L2 22 Z" strokeWidth="1.2" />
        <path d="M3 22 L97 22 L97 28 L3 28 Z" strokeWidth="1.1" />
        {/* Cornice cyma reversa molding */}
        <path d="M5 12 Q50 8, 95 12" strokeWidth="0.8" />
        {/* Mutules (projecting blocks) */}
        {[15, 30, 45, 60, 75, 85].map((x, i) => (
          <path key={i} d={`M${x-3} 22 L${x-3} 26 L${x+3} 26 L${x+3} 22 Z`} opacity="0.7" strokeWidth="0.7" />
        ))}

        {/* FRIEZE (middle section) */}
        <path d="M8 30 L92 30 L92 50 L8 50 Z" strokeWidth="1" />
        {/* Triglyphs (vertical grooved tablets) */}
        {[20, 40, 60, 80].map((x, i) => (
          <g key={i}>
            <path d={`M${x-5} 32 L${x-5} 48 L${x+5} 48 L${x+5} 32 Z`} strokeWidth="0.9" />
            <path d={`M${x-3} 32 L${x-3} 48`} strokeWidth="0.5" />
            <path d={`M${x} 32 L${x} 48`} strokeWidth="0.5" />
            <path d={`M${x+3} 32 L${x+3} 48`} strokeWidth="0.5" />
          </g>
        ))}
        {/* Metopes (panels between triglyphs) */}
        <path d="M28 36 L28 44 L35 44 L35 36 Z" opacity="0.5" strokeWidth="0.6" />
        <path d="M48 36 L48 44 L55 44 L55 36 Z" opacity="0.5" strokeWidth="0.6" />
        <path d="M68 36 L68 44 L75 44 L75 36 Z" opacity="0.5" strokeWidth="0.6" />

        {/* ARCHITRAVE (bottom section - three fasciae) */}
        <path d="M10 52 L90 52 L90 58 L10 58 Z" strokeWidth="0.9" />
        <path d="M10 58 L90 58 L90 63 L10 63 Z" strokeWidth="0.9" />
        <path d="M10 63 L90 63 L90 68 L10 68 Z" strokeWidth="0.9" />
        {/* Taenia and regulae */}
        <path d="M10 68 L90 68 L90 72 L10 72 Z" strokeWidth="0.8" />
        <path d="M10 72 L90 72" strokeWidth="1.3" />
      </g>
    </g>
  </svg>
)

// 6. Facade - Principal front elevation of building
// Architectural reference: Complete building front face, typically most ornate and formally designed elevation
const FacadeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="facade-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#facade-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Ground and side context === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M0 90 L10 90" />
        <path d="M90 90 L100 90" />
        <path d="M5 92 L10 92" />
        <path d="M90 92 L95 92" />
      </g>

      {/* === PRIMARY: Facade composition === */}
      <g strokeWidth="0.8">
        {/* Main building envelope */}
        <path d="M10 15 L10 90 L90 90 L90 15 Z" strokeWidth="1.2" />
        {/* Pediment roof */}
        <path d="M10 15 L50 5 L90 15" strokeWidth="1.1" />
        <path d="M15 15 L50 8 L85 15" strokeWidth="0.5" opacity="0.6" />
        {/* Cornice line */}
        <path d="M8 15 L92 15" strokeWidth="1.3" />

        {/* Second floor windows */}
        <path d="M18 22 L18 38 L35 38 L35 22 Z" strokeWidth="0.9" />
        <path d="M42 22 L42 38 L58 38 L58 22 Z" strokeWidth="0.9" />
        <path d="M65 22 L65 38 L82 38 L82 22 Z" strokeWidth="0.9" />
        {/* Window muntins */}
        <path d="M26 22 L26 38" strokeWidth="0.6" />
        <path d="M50 22 L50 38" strokeWidth="0.6" />
        <path d="M73 22 L73 38" strokeWidth="0.6" />
        <path d="M18 30 L35 30" strokeWidth="0.5" opacity="0.7" />
        <path d="M42 30 L58 30" strokeWidth="0.5" opacity="0.7" />
        <path d="M65 30 L82 30" strokeWidth="0.5" opacity="0.7" />

        {/* String course (horizontal band) */}
        <path d="M10 42 L90 42" strokeWidth="1" />

        {/* First floor windows */}
        <path d="M18 48 L18 72 L35 72 L35 48 Z" strokeWidth="0.9" />
        <path d="M65 48 L65 72 L82 72 L82 48 Z" strokeWidth="0.9" />
        <path d="M26 48 L26 72" strokeWidth="0.6" />
        <path d="M73 48 L73 72" strokeWidth="0.6" />
        <path d="M18 60 L35 60" strokeWidth="0.5" opacity="0.7" />
        <path d="M65 60 L82 60" strokeWidth="0.5" opacity="0.7" />

        {/* Central entrance door with arch */}
        <path d="M40 50 L40 88 L60 88 L60 50 Q50 45, 40 50" strokeWidth="1.1" />
        <path d="M50 50 L50 88" strokeWidth="0.7" />
        <circle cx="56" cy="70" r="1.5" strokeWidth="0.6" />
        {/* Door pediment */}
        <path d="M38 50 L50 42 L62 50 Z" strokeWidth="0.9" />

        {/* Corner quoins (alternating stone blocks) */}
        <path d="M10 20 L15 20 L15 30 L10 30 Z" opacity="0.6" strokeWidth="0.7" />
        <path d="M10 35 L15 35 L15 45 L10 45 Z" opacity="0.6" strokeWidth="0.7" />
        <path d="M10 50 L15 50 L15 60 L10 60 Z" opacity="0.6" strokeWidth="0.7" />
        <path d="M85 20 L90 20 L90 30 L85 30 Z" opacity="0.6" strokeWidth="0.7" />
        <path d="M85 35 L90 35 L90 45 L85 45 Z" opacity="0.6" strokeWidth="0.7" />
        <path d="M85 50 L90 50 L90 60 L85 60 Z" opacity="0.6" strokeWidth="0.7" />

        {/* Water table/base course */}
        <path d="M10 90 L90 90" strokeWidth="1.4" />
      </g>
    </g>
  </svg>
)

// 7. Loggia - Covered exterior corridor with colonnade
// Architectural reference: Italian Renaissance architecture, open-air gallery with arched openings
const LoggiaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="loggia-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#loggia-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Building structure === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 10 L5 25 L95 25 L95 10 Z" />
        <path d="M15 35 L15 70" />
        <path d="M50 35 L50 70" />
        <path d="M82 35 L82 70" />
        <path d="M5 10 L5 5 L95 5 L95 10" />
      </g>

      {/* === PRIMARY: Loggia arcade === */}
      <g strokeWidth="0.8">
        {/* Entablature/cornice */}
        <path d="M5 25 L95 25" strokeWidth="1.6" />
        <path d="M3 28 L97 28" strokeWidth="1.1" />

        {/* Arcade arches (rounded classical arches) */}
        <path d="M8 28 L8 85 Q25 50, 42 85 L42 28" strokeWidth="1.2" />
        <path d="M42 28 L42 85 Q58 50, 75 85 L75 28" strokeWidth="1.2" />
        <path d="M75 28 L75 85 Q92 50, 92 85" strokeWidth="1.2" />

        {/* Columns */}
        <path d="M8 28 L8 88" strokeWidth="1.8" />
        <path d="M42 28 L42 88" strokeWidth="1.8" />
        <path d="M75 28 L75 88" strokeWidth="1.8" />
        <path d="M92 28 L92 88" strokeWidth="1.8" />

        {/* Column bases (Attic style) */}
        <path d="M5 88 L11 88 L11 92 L5 92 Z" strokeWidth="0.9" />
        <path d="M39 88 L45 88 L45 92 L39 92 Z" strokeWidth="0.9" />
        <path d="M72 88 L78 88 L78 92 L72 92 Z" strokeWidth="0.9" />
        <path d="M89 88 L95 88 L95 92 L89 92 Z" strokeWidth="0.9" />

        {/* Capitals (simplified Doric) */}
        <path d="M5 28 L11 28 L12 32 L4 32 Z" strokeWidth="0.9" />
        <path d="M39 28 L45 28 L46 32 L38 32 Z" strokeWidth="0.9" />
        <path d="M72 28 L78 28 L79 32 L71 32 Z" strokeWidth="0.9" />
        <path d="M89 28 L95 28 L96 32 L88 32 Z" strokeWidth="0.9" />

        {/* Balustrade in first bay */}
        <path d="M12 75 L38 75" strokeWidth="0.8" />
        <path d="M12 85 L38 85" strokeWidth="0.8" />
        {[18, 25, 32].map((x, i) => (
          <path key={i} d={`M${x} 75 Q${x-2} 80, ${x} 85`} strokeWidth="0.6" />
        ))}

        {/* Arch keystones */}
        <path d="M24 50 L26 50 L26 55 L24 55 Z" strokeWidth="0.6" opacity="0.7" />
        <path d="M58 50 L60 50 L60 55 L58 55 Z" strokeWidth="0.6" opacity="0.7" />
      </g>
    </g>
  </svg>
)

// 8. Marquee - Projecting canopy over theater/commercial entrance
// Architectural reference: 20th century cinema and theater architecture, typically illuminated with signage
const MarqueeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="marquee-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#marquee-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Theater facade === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M20 15 L20 90 L80 90 L80 15 Z" />
        <path d="M25 20 L25 30 L35 30 L35 20 Z" />
        <path d="M65 20 L65 30 L75 30 L75 20 Z" />
        <path d="M30 60 L30 70 L42 70 L42 60 Z" />
        <path d="M58 60 L58 70 L70 70 L70 60 Z" />
      </g>

      {/* === PRIMARY: Marquee structure === */}
      <g strokeWidth="0.8">
        {/* Main canopy projection */}
        <path d="M15 40 L85 40 L88 48 L12 48 Z" strokeWidth="1.2" />
        {/* Stepped fascia edge */}
        <path d="M12 48 L12 52 L88 52 L88 48" strokeWidth="1.1" />
        <path d="M15 52 L15 55 L85 55 L85 52" strokeWidth="1" />

        {/* Decorative light bulbs */}
        {[20, 30, 40, 50, 60, 70, 80].map((x, i) => (
          <circle key={i} cx={x} cy="50" r="2" strokeWidth="0.7" />
        ))}

        {/* Wall mounting brackets */}
        <path d="M20 40 L20 35 Q18 33, 20 32" strokeWidth="1" />
        <path d="M80 40 L80 35 Q82 33, 80 32" strokeWidth="1" />

        {/* Vertical blade sign */}
        <path d="M45 25 L45 40 L55 40 L55 25 Z" strokeWidth="1.1" />
        <path d="M48 28 L48 38" strokeWidth="0.6" opacity="0.6" />
        <path d="M52 28 L52 38" strokeWidth="0.6" opacity="0.6" />

        {/* Theater name panels */}
        <path d="M25 42 L40 42 L40 46 L25 46 Z" opacity="0.6" strokeWidth="0.7" />
        <path d="M60 42 L75 42 L75 46 L60 46 Z" opacity="0.6" strokeWidth="0.7" />

        {/* Entry doors beneath */}
        <path d="M35 58 L35 88 L65 88 L65 58 Z" strokeWidth="1" />
        {/* Double door division */}
        <path d="M38 62 L38 88 L50 88 L50 62 Z" strokeWidth="0.9" />
        <path d="M50 62 L50 88 L62 88 L62 62 Z" strokeWidth="0.9" />
        <circle cx="47" cy="75" r="1.5" strokeWidth="0.6" />
        <circle cx="53" cy="75" r="1.5" strokeWidth="0.6" />

        {/* Neon accent edges */}
        <path d="M12 48 L12 55" strokeWidth="2" opacity="0.7" />
        <path d="M88 48 L88 55" strokeWidth="2" opacity="0.7" />

        {/* Art Deco corner details */}
        <path d="M15 40 L12 40 L12 43" strokeWidth="0.6" opacity="0.6" />
        <path d="M85 40 L88 40 L88 43" strokeWidth="0.6" opacity="0.6" />
      </g>
    </g>
  </svg>
)

// 9. Portico - Columned porch forming entrance
// Architectural reference: Classical Greek and Roman temple fronts, monumental entrance feature
const PorticoSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="portico-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#portico-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Main building === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M25 20 L25 90 L75 90 L75 20 Z" />
        <path d="M30 30 L30 50 L45 50 L45 30 Z" />
        <path d="M55 30 L55 50 L70 50 L70 30 Z" />
        <path d="M35 60 L35 80 L45 80 L45 60" />
        <path d="M55 60 L55 80 L65 80 L65 60" />
      </g>

      {/* === PRIMARY: Portico structure === */}
      <g strokeWidth="0.8">
        {/* Triangular pediment */}
        <path d="M10 25 L50 8 L90 25 Z" strokeWidth="1.3" />
        <path d="M15 25 L50 12 L85 25" strokeWidth="0.5" opacity="0.6" />
        {/* Tympanum ornament */}
        <circle cx="50" cy="20" r="4" strokeWidth="0.7" />

        {/* Entablature */}
        <path d="M8 25 L92 25" strokeWidth="1.7" />
        <path d="M10 28 L90 28 L90 35 L10 35 Z" strokeWidth="1" />

        {/* Four columns (Ionic order) */}
        <path d="M18 35 L18 85" strokeWidth="2.2" />
        <path d="M38 35 L38 85" strokeWidth="2.2" />
        <path d="M62 35 L62 85" strokeWidth="2.2" />
        <path d="M82 35 L82 85" strokeWidth="2.2" />

        {/* Ionic capitals with volutes */}
        {[18, 38, 62, 82].map((x, i) => (
          <g key={i}>
            <path d={`M${x-5} 35 L${x+5} 35`} strokeWidth="1" />
            {/* Left volute */}
            <path d={`M${x-6} 38 Q${x-8} 36, ${x-8} 38 Q${x-8} 40, ${x-6} 38`} strokeWidth="0.6" />
            {/* Right volute */}
            <path d={`M${x+6} 38 Q${x+8} 36, ${x+8} 38 Q${x+8} 40, ${x+6} 38`} strokeWidth="0.6" />
          </g>
        ))}

        {/* Column bases (Attic style) */}
        {[18, 38, 62, 82].map((x, i) => (
          <path key={i} d={`M${x-4} 85 L${x+4} 85 L${x+5} 88 L${x-5} 88 Z`} strokeWidth="0.9" />
        ))}

        {/* Stylobate (stepped platform) */}
        <path d="M5 88 L95 88" strokeWidth="1.2" />
        <path d="M3 92 L97 92" strokeWidth="1.1" />
        <path d="M0 96 L100 96" strokeWidth="1.3" />

        {/* Door behind columns */}
        <path d="M42 45 L42 85 L58 85 L58 45 Q50 40, 42 45" opacity="0.6" strokeWidth="0.8" />
        <path d="M50 45 L50 85" opacity="0.5" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// 10. Storefront - Commercial ground floor facade system
// Architectural reference: 19th-20th century commercial architecture, maximizes display window area
const StorefrontSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="storefront-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#storefront-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: Upper floors === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M10 10 L10 30 L90 30 L90 10 Z" />
        <path d="M18 15 L18 25 L35 25 L35 15 Z" />
        <path d="M42 15 L42 25 L58 25 L58 15 Z" />
        <path d="M65 15 L65 25 L82 25 L82 15 Z" />
        <path d="M27 15 L27 25" />
        <path d="M50 15 L50 25" />
        <path d="M73 15 L73 25" />
      </g>

      {/* === PRIMARY: Storefront system === */}
      <g strokeWidth="0.8">
        {/* Cornice/signband */}
        <path d="M8 30 L92 30 L92 40 L8 40 Z" strokeWidth="1.2" />
        <path d="M15 33 L85 33 L85 38 L15 38 Z" opacity="0.6" strokeWidth="0.7" />

        {/* Large display windows */}
        <path d="M12 43 L12 82 L42 82 L42 43 Z" strokeWidth="1.1" />
        <path d="M58 43 L58 82 L88 82 L88 43 Z" strokeWidth="1.1" />

        {/* Vertical mullions */}
        <path d="M27 43 L27 82" strokeWidth="0.9" />
        <path d="M73 43 L73 82" strokeWidth="0.9" />

        {/* Transom windows above */}
        <path d="M12 43 L42 43 L42 52 L12 52 Z" strokeWidth="0.9" />
        <path d="M58 43 L88 43 L88 52 L58 52 Z" strokeWidth="0.9" />
        <path d="M27 43 L27 52" strokeWidth="0.6" />
        <path d="M73 43 L73 52" strokeWidth="0.6" />

        {/* Recessed entry door */}
        <path d="M44 50 L44 88 L56 88 L56 50 Z" strokeWidth="1" />
        <path d="M46 53 L46 88 L54 88 L54 53 Z" strokeWidth="1" />
        <circle cx="52" cy="72" r="1.5" strokeWidth="0.6" />
        {/* Door push bar */}
        <path d="M48 70 L52 70" strokeWidth="0.5" opacity="0.6" />

        {/* Bulkhead/kickplate panels */}
        <path d="M12 82 L42 82 L42 88 L12 88 Z" strokeWidth="0.9" />
        <path d="M58 82 L88 82 L88 88 L58 88 Z" strokeWidth="0.9" />
        <path d="M27 82 L27 88" strokeWidth="0.6" />
        <path d="M73 82 L73 88" strokeWidth="0.6" />

        {/* Sidewalk/threshold */}
        <path d="M5 88 L95 88" strokeWidth="1.4" />
        <path d="M5 92 L95 92" strokeWidth="0.6" opacity="0.6" />

        {/* Display merchandise suggestion */}
        <path d="M18 70 L22 65 L26 70 Z" opacity="0.5" strokeWidth="0.6" />
        <path d="M64 68 L68 62 L72 68 Z" opacity="0.5" strokeWidth="0.6" />
        <path d="M32 72 L36 67 L32 72" opacity="0.4" strokeWidth="0.5" />
        <path d="M78 70 L82 65 L78 70" opacity="0.4" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// 11. Veranda - Roofed open gallery along building exterior
// Architectural reference: Colonial and vernacular architecture, provides shaded outdoor living space
const VerandaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="veranda-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#veranda-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* === CONTEXT: House wall === */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M25 15 L25 90 L75 90 L75 15 Z" />
        <path d="M30 25 L30 45 L45 45 L45 25 Z" />
        <path d="M55 25 L55 45 L70 45 L70 25 Z" />
        <path d="M35 55 L35 75 L45 75 L45 55" />
        <path d="M55 55 L55 75 L65 75 L65 55" />
      </g>

      {/* === PRIMARY: Veranda structure === */}
      <g strokeWidth="0.8">
        {/* Sloped roof */}
        <path d="M5 25 L50 15 L95 25 L95 35 L5 35 Z" strokeWidth="1.2" />
        <path d="M8 30 Q50 22, 92 30" strokeWidth="0.5" opacity="0.6" />

        {/* Exposed rafters */}
        {[15, 30, 50, 70, 85].map((x, i) => (
          <path key={i} d={`M${x} 25 L${x} 35`} opacity="0.5" strokeWidth="0.6" />
        ))}

        {/* Fascia board */}
        <path d="M5 35 L95 35" strokeWidth="1.2" />

        {/* Decorative fretwork/valance */}
        <path d="M8 38 Q15 42, 22 38 Q29 42, 36 38 Q43 42, 50 38 Q57 42, 64 38 Q71 42, 78 38 Q85 42, 92 38" strokeWidth="0.8" />

        {/* Vertical support posts */}
        <path d="M12 35 L12 85" strokeWidth="1.4" />
        <path d="M35 35 L35 85" strokeWidth="1.4" />
        <path d="M65 35 L65 85" strokeWidth="1.4" />
        <path d="M88 35 L88 85" strokeWidth="1.4" />

        {/* Decorative post brackets */}
        {[12, 35, 65, 88].map((x, i) => (
          <g key={i}>
            <path d={`M${x} 38 Q${x-4} 42, ${x-4} 48`} strokeWidth="0.7" />
            <path d={`M${x} 38 Q${x+4} 42, ${x+4} 48`} strokeWidth="0.7" />
          </g>
        ))}

        {/* Railing system */}
        <path d="M12 65 L88 65" strokeWidth="1" />
        <path d="M12 82 L88 82" strokeWidth="1" />

        {/* Turned balusters */}
        {[20, 28, 42, 50, 58, 72, 80].map((x, i) => (
          <path key={i} d={`M${x} 65 Q${x-1} 73, ${x} 82`} strokeWidth="0.7" />
        ))}

        {/* Deck floor */}
        <path d="M5 85 L95 85" strokeWidth="1.4" />
        <path d="M8 88 L92 88" strokeWidth="0.7" opacity="0.7" />

        {/* Floorboard lines */}
        {[15, 25, 40, 60, 75, 90].map((x, i) => (
          <path key={i} d={`M${x} 85 L${x} 88`} strokeWidth="0.4" opacity="0.4" />
        ))}

        {/* Entry steps */}
        <path d="M40 85 L40 92 L60 92 L60 85" strokeWidth="0.9" />
        <path d="M42 88 L58 88" strokeWidth="0.5" opacity="0.6" />
      </g>
    </g>
  </svg>
)

// Export mapping for all facade elements
export const FACADE_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'awning': AwningSVG,
  'bay-window': BayWindowSVG,
  'canopy': CanopySVG,
  'cornice': CorniceSVG,
  'entablature': EntablatureSVG,
  'facade': FacadeSVG,
  'loggia': LoggiaSVG,
  'marquee': MarqueeSVG,
  'portico': PorticoSVG,
  'storefront': StorefrontSVG,
  'veranda': VerandaSVG,
}

export {
  AwningSVG,
  BayWindowSVG,
  CanopySVG,
  CorniceSVG,
  EntablatureSVG,
  FacadeSVG,
  LoggiaSVG,
  MarqueeSVG,
  PorticoSVG,
  StorefrontSVG,
  VerandaSVG,
}
