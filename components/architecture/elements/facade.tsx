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
      {/* === CONTEXT: Parisian Haussmann café building — mansard roof, wrought-iron balcony, zinc roofline === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Mansard roof with zinc panels and dormer window */}
        <path d="M12 8 L15 2 L85 2 L88 8 Z" />
        <path d="M42 3 L42 7 L58 7 L58 3" />
        <path d="M50 3 Q50 5, 50 7" />
        {/* Chimney pots */}
        <path d="M22 2 L22 -2 L26 -2 L26 2" />
        <path d="M74 2 L74 -2 L78 -2 L78 2" />
        {/* Upper floor stone facade with tall windows */}
        <path d="M15 8 L15 25 L85 25 L85 8" />
        <path d="M22 10 L22 22 L36 22 L36 10" />
        <path d="M64 10 L64 22 L78 22 L78 10" />
        {/* Wrought-iron continuous balcony railing with scroll brackets */}
        <path d="M15 25 L85 25" strokeWidth="0.8" />
        <path d="M15 23 L85 23" strokeWidth="0.5" />
        <path d="M20 23 Q18 21, 20 19" />
        <path d="M40 23 Q38 21, 40 19" />
        <path d="M60 23 Q58 21, 60 19" />
        <path d="M80 23 Q78 21, 80 19" />
        {/* Cafe level — lower wall with wainscoting */}
        <path d="M15 45 L15 90 L85 90 L85 45" />
        <path d="M15 80 L85 80" />
        {/* Cobblestone street suggestion */}
        <path d="M5 92 Q15 94, 25 92 Q35 94, 45 92 Q55 94, 65 92 Q75 94, 85 92 Q95 94, 100 92" />
        {/* Bistro table and chair on sidewalk */}
        <circle cx="8" cy="86" r="3" />
        <path d="M8 89 L8 92" />
        <path d="M2 85 L2 92" />
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
      {/* === CONTEXT: Victorian Painted Lady row house — steep gable, fish-scale shingles, ornate bargeboard === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Steep gable roof with decorative ridge finial */}
        <path d="M5 15 L50 -2 L95 15" />
        <path d="M50 -2 L50 -6" />
        <path d="M48 -6 L52 -6 L50 -9 Z" />
        {/* Fish-scale shingle pattern in gable */}
        <path d="M25 8 Q30 5, 35 8 Q40 5, 45 8 Q50 5, 55 8 Q60 5, 65 8 Q70 5, 75 8" />
        <path d="M30 11 Q35 8, 40 11 Q45 8, 50 11 Q55 8, 60 11 Q65 8, 70 11" />
        {/* Ornate bargeboard (gingerbread trim) */}
        <path d="M8 15 Q15 10, 20 15" />
        <path d="M80 15 Q85 10, 92 15" />
        {/* Clapboard siding on flanking walls */}
        <path d="M5 15 L5 90 L28 90 L28 15" />
        <path d="M72 15 L72 90 L95 90 L95 15" />
        {[25, 35, 45, 55, 65, 75].map((y, i) => (
          <g key={i}>
            <path d={`M5 ${y} L28 ${y}`} strokeWidth="0.3" />
            <path d={`M72 ${y} L95 ${y}`} strokeWidth="0.3" />
          </g>
        ))}
        {/* Decorative window with hood mold — left */}
        <path d="M10 25 L10 40 L23 40 L23 25 Z" />
        <path d="M8 25 L25 25" />
        {/* Decorative window — right */}
        <path d="M77 25 L77 40 L90 40 L90 25 Z" />
        <path d="M75 25 L92 25" />
        {/* Neighboring house silhouette hint */}
        <path d="M-2 20 L-2 92" strokeWidth="0.4" opacity="0.2" />
        <path d="M98 18 L98 92" strokeWidth="0.4" opacity="0.2" />
        {/* Foundation and sidewalk */}
        <path d="M3 90 L97 90" />
        <path d="M0 94 L100 94" />
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
      {/* === CONTEXT: Mid-century modern hotel — glass curtain wall, flagpoles, terrazzo entry === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Flat roof parapet with thin coping */}
        <path d="M10 18 L90 18 L90 20 L10 20 Z" />
        {/* Glass curtain wall grid — horizontal spandrel bands and vertical mullions */}
        <path d="M10 20 L10 90 L90 90 L90 20" />
        {[28, 36, 44, 52, 60, 68, 76, 84].map((y, i) => (
          <path key={`h${i}`} d={`M10 ${y} L90 ${y}`} strokeWidth="0.3" />
        ))}
        {[22, 34, 46, 58, 70, 82].map((x, i) => (
          <path key={`v${i}`} d={`M${x} 20 L${x} 90`} strokeWidth="0.3" />
        ))}
        {/* Flagpoles flanking entrance */}
        <path d="M5 10 L5 90" strokeWidth="0.5" />
        <path d="M3 10 L5 12 L7 10 Z" />
        <path d="M95 10 L95 90" strokeWidth="0.5" />
        <path d="M93 10 L95 12 L97 10 Z" />
        {/* Driveway approach with curb */}
        <path d="M0 92 L100 92" />
        <path d="M25 92 Q50 96, 75 92" strokeWidth="0.4" />
        {/* Planter box */}
        <path d="M3 82 L3 90 L9 90 L9 82 Z" />
        <path d="M4 80 Q6 76, 8 80" />
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
      {/* === CONTEXT: Beaux-Arts apartment — mansard roof with dormers, oeil-de-boeuf, rusticated base === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Mansard roof slope with slate pattern above cornice */}
        <path d="M12 30 L12 42 L88 42 L88 30 Q50 22, 12 30" />
        <path d="M20 33 L20 40" strokeWidth="0.3" />
        <path d="M35 31 L35 40" strokeWidth="0.3" />
        <path d="M65 31 L65 40" strokeWidth="0.3" />
        <path d="M80 33 L80 40" strokeWidth="0.3" />
        {/* Dormer windows in mansard */}
        <path d="M28 32 L28 40 L38 40 L38 32 Q33 28, 28 32" />
        <path d="M62 32 L62 40 L72 40 L72 32 Q67 28, 62 32" />
        {/* Oeil-de-boeuf (oval attic window) */}
        <ellipse cx="50" cy="35" rx="5" ry="3.5" />
        {/* Building wall below with tall windows and pediment headers */}
        <path d="M15 60 L15 97 L85 97 L85 60" />
        {/* Windows with triangular pediments */}
        <path d="M22 66 L22 88 L38 88 L38 66 Z" />
        <path d="M20 66 L30 62 L40 66" />
        <path d="M62 66 L62 88 L78 88 L78 66 Z" />
        <path d="M60 66 L70 62 L80 66" />
        {/* Rusticated stone base course */}
        <path d="M15 88 L85 88" />
        <path d="M15 92 L85 92" />
        <path d="M25 88 L25 92" strokeWidth="0.4" />
        <path d="M40 88 L40 92" strokeWidth="0.4" />
        <path d="M60 88 L60 92" strokeWidth="0.4" />
        <path d="M75 88 L75 92" strokeWidth="0.4" />
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
      {/* === CONTEXT: Greek Doric temple — fluted column shafts, stepped crepidoma, landscape === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Full fluted column shafts descending from architrave */}
        <path d="M15 72 L15 88" strokeWidth="1.4" />
        <path d="M13 74 L13 88" strokeWidth="0.3" />
        <path d="M17 74 L17 88" strokeWidth="0.3" />
        <path d="M50 72 L50 88" strokeWidth="1.4" />
        <path d="M48 74 L48 88" strokeWidth="0.3" />
        <path d="M52 74 L52 88" strokeWidth="0.3" />
        <path d="M85 72 L85 88" strokeWidth="1.4" />
        <path d="M83 74 L83 88" strokeWidth="0.3" />
        <path d="M87 74 L87 88" strokeWidth="0.3" />
        {/* Doric capitals — abacus and echinus */}
        <path d="M11 72 L19 72 L19 75 L11 75 Z" />
        <path d="M46 72 L54 72 L54 75 L46 75 Z" />
        <path d="M81 72 L89 72 L89 75 L81 75 Z" />
        {/* Three-stepped crepidoma platform */}
        <path d="M8 88 L92 88" strokeWidth="0.8" />
        <path d="M5 92 L95 92" strokeWidth="0.8" />
        <path d="M2 96 L98 96" strokeWidth="0.9" />
        {/* Landscape — olive tree silhouette and rocky ground */}
        <path d="M-2 96 Q3 92, 0 88 Q-2 84, 2 82 Q5 80, 3 78 Q0 76, 4 74" strokeWidth="0.4" opacity="0.25" />
        <path d="M96 96 Q98 90, 100 86 Q102 82, 98 80" strokeWidth="0.4" opacity="0.25" />
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
      {/* === CONTEXT: Georgian streetscape — neighboring townhouses, iron lamp, street tree === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Left neighboring building — slightly taller, different proportions */}
        <path d="M-5 10 L-5 92 L8 92 L8 10 Z" />
        <path d="M-3 20 L-3 35 L6 35 L6 20 Z" strokeWidth="0.3" />
        <path d="M-3 45 L-3 60 L6 60 L6 45 Z" strokeWidth="0.3" />
        <path d="M-5 10 L1 6 L8 10" />
        {/* Right neighboring building — shorter */}
        <path d="M92 22 L92 92 L105 92 L105 22 Z" />
        <path d="M94 30 L94 45 L103 45 L103 30 Z" strokeWidth="0.3" />
        <path d="M94 55 L94 70 L103 70 L103 55 Z" strokeWidth="0.3" />
        {/* Cast-iron lamp post */}
        <path d="M-2 60 L-2 92" strokeWidth="0.5" />
        <path d="M-4 60 L-2 56 L0 60" />
        <path d="M-4 92 L0 92" />
        {/* Street tree */}
        <path d="M96 92 L96 70" strokeWidth="0.5" />
        <path d="M96 70 Q90 60, 96 55 Q102 50, 96 45 Q90 40, 96 38" strokeWidth="0.4" />
        {/* Sidewalk and curb */}
        <path d="M-5 92 L105 92" strokeWidth="0.8" />
        <path d="M-5 95 L105 95" strokeWidth="0.5" />
        {/* Iron area railing in front of basement */}
        <path d="M10 90 L10 95" strokeWidth="0.4" />
        <path d="M90 90 L90 95" strokeWidth="0.4" />
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
      {/* === CONTEXT: Italian Renaissance palazzo — rusticated ground, piano nobile, rooftop balustrade === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Rooftop balustrade with finial urns */}
        <path d="M5 3 L95 3" />
        <path d="M5 7 L95 7" />
        {[15, 30, 45, 60, 75, 85].map((x, i) => (
          <path key={i} d={`M${x} 3 Q${x-1} 5, ${x} 7`} strokeWidth="0.4" />
        ))}
        {/* Corner finial urns */}
        <path d="M8 3 L8 0 Q10 -2, 12 0 L12 3" />
        <path d="M88 3 L88 0 Q90 -2, 92 0 L92 3" />
        {/* Heavy cornice */}
        <path d="M3 7 L97 7 L97 10 L3 10 Z" />
        {/* Piano nobile — upper floor with pedimented windows */}
        <path d="M5 10 L5 25 L95 25 L95 10" />
        <path d="M15 13 L15 22 L30 22 L30 13 Z" />
        <path d="M13 13 L22 9 L32 13" />
        <path d="M40 13 L40 22 L55 22 L55 13 Z" />
        <path d="M38 13 L47 9 L57 13" />
        <path d="M65 13 L65 22 L80 22 L80 13 Z" />
        <path d="M63 13 L72 9 L82 13" />
        {/* String course between floors */}
        <path d="M5 25 L95 25" strokeWidth="0.8" />
        {/* Courtyard pavement — herringbone hint */}
        <path d="M5 92 L95 92" />
        <path d="M20 92 L22 96 L24 92 L26 96 L28 92" strokeWidth="0.3" />
        <path d="M60 92 L62 96 L64 92 L66 96 L68 92" strokeWidth="0.3" />
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
      {/* === CONTEXT: 1920s Art Deco cinema — vertical tower, sunburst, zigzag ornament, ticket booth === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Tall vertical tower/pylon rising above roofline */}
        <path d="M42 -5 L42 15 L58 15 L58 -5 Z" />
        <path d="M44 -3 L44 12 L56 12 L56 -3 Z" strokeWidth="0.4" />
        {/* Sunburst/fan motif in tower */}
        <path d="M50 2 L46 8" strokeWidth="0.3" />
        <path d="M50 2 L50 9" strokeWidth="0.3" />
        <path d="M50 2 L54 8" strokeWidth="0.3" />
        <path d="M50 2 L44 6" strokeWidth="0.3" />
        <path d="M50 2 L56 6" strokeWidth="0.3" />
        {/* Main facade wall with stepped parapet */}
        <path d="M20 15 L20 90 L80 90 L80 15" />
        <path d="M15 18 L20 18 L20 15 L42 15" />
        <path d="M58 15 L80 15 L80 18 L85 18" />
        {/* Zigzag Deco chevron band */}
        <path d="M22 20 L26 17 L30 20 L34 17 L38 20 L42 17" strokeWidth="0.4" />
        <path d="M58 17 L62 20 L66 17 L70 20 L74 17 L78 20" strokeWidth="0.4" />
        {/* Decorative vertical pilasters with stepped capitals */}
        <path d="M20 15 L20 90" strokeWidth="0.8" />
        <path d="M80 15 L80 90" strokeWidth="0.8" />
        <path d="M22 15 L22 90" strokeWidth="0.3" />
        <path d="M78 15 L78 90" strokeWidth="0.3" />
        {/* Ticket booth */}
        <path d="M12 72 L12 88 L18 88 L18 72 Z" />
        <path d="M13 76 L17 76 L17 82 L13 82 Z" />
        <circle cx="15" cy="79" r="1.5" />
        {/* Sidewalk */}
        <path d="M5 90 L95 90" />
        <path d="M5 93 L95 93" strokeWidth="0.4" />
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
      {/* === CONTEXT: Neoclassical courthouse — central dome, symmetrical wings, grand approach === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Central dome rising behind pediment */}
        <path d="M35 5 Q50 -10, 65 5" />
        <path d="M37 5 Q50 -8, 63 5" strokeWidth="0.3" />
        {/* Dome lantern/cupola */}
        <path d="M47 -5 L47 -8 L53 -8 L53 -5" />
        <path d="M50 -8 L50 -11" />
        {/* Drum with small windows */}
        <path d="M40 2 L40 5 L60 5 L60 2 Q50 -2, 40 2" />
        {/* Main building body behind portico */}
        <path d="M25 20 L25 90 L75 90 L75 20" />
        {/* Symmetrical wing — left */}
        <path d="M-5 25 L-5 92 L25 92 L25 25 Z" />
        <path d="M0 35 L0 55 L12 55 L12 35 Z" strokeWidth="0.3" />
        <path d="M0 65 L0 85 L12 85 L12 65 Z" strokeWidth="0.3" />
        {/* Symmetrical wing — right */}
        <path d="M75 25 L75 92 L105 92 L105 25 Z" />
        <path d="M88 35 L88 55 L100 55 L100 35 Z" strokeWidth="0.3" />
        <path d="M88 65 L88 85 L100 85 L100 65 Z" strokeWidth="0.3" />
        {/* Grand approach — formal path */}
        <path d="M40 96 L35 100" strokeWidth="0.3" />
        <path d="M60 96 L65 100" strokeWidth="0.3" />
        {/* Lawn/landscape */}
        <path d="M-5 96 L105 96" strokeWidth="0.4" />
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
      {/* === CONTEXT: SoHo cast-iron building — ornate upper facade, fire escape, decorative brackets === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Ornate pressed-metal cornice at roofline */}
        <path d="M8 5 L92 5 L94 8 L6 8 Z" />
        <path d="M6 8 L94 8 L94 10 L6 10 Z" />
        {/* Decorative bracket pairs under cornice */}
        <path d="M15 10 Q13 13, 15 15" strokeWidth="0.4" />
        <path d="M25 10 Q23 13, 25 15" strokeWidth="0.4" />
        <path d="M75 10 Q73 13, 75 15" strokeWidth="0.4" />
        <path d="M85 10 Q83 13, 85 15" strokeWidth="0.4" />
        {/* Cast-iron upper facade with arched windows */}
        <path d="M10 10 L10 30 L90 30 L90 10" />
        {/* Arched window bays with Corinthian pilasters */}
        <path d="M15 13 L15 27 L32 27 L32 13 Q23 8, 15 13" />
        <path d="M38 13 L38 27 L55 27 L55 13 Q47 8, 38 13" />
        <path d="M62 13 L62 27 L78 27 L78 13 Q70 8, 62 13" />
        {/* Pilaster columns between bays */}
        <path d="M10 10 L10 30" strokeWidth="0.8" />
        <path d="M35 10 L35 30" strokeWidth="0.8" />
        <path d="M58 10 L58 30" strokeWidth="0.8" />
        <path d="M85 10 L85 30" strokeWidth="0.8" />
        <path d="M90 10 L90 30" strokeWidth="0.8" />
        {/* Fire escape — zigzag ladder and platform */}
        <path d="M82 14 L88 14 L88 18 L82 18 Z" strokeWidth="0.4" />
        <path d="M85 18 L85 24" strokeWidth="0.3" />
        <path d="M83 19 L87 21" strokeWidth="0.3" />
        <path d="M87 19 L83 21" strokeWidth="0.3" />
        {/* Sidewalk with tree pit */}
        <path d="M5 92 L95 92" />
        <path d="M2 92 L2 72" strokeWidth="0.4" />
        <path d="M2 72 Q-1 65, 2 60 Q5 55, 2 50" strokeWidth="0.4" opacity="0.25" />
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
      {/* === CONTEXT: Southern antebellum plantation — hip roof, dormers, shutters, live oak === */}
      <g strokeDasharray="3 2" opacity="0.35" strokeWidth="0.6">
        {/* Hip roof with wide overhang */}
        <path d="M20 8 L50 0 L80 8 L95 15 L5 15 Z" />
        {/* Central dormer with arched window */}
        <path d="M44 5 L44 12 L56 12 L56 5 Q50 1, 44 5" />
        <path d="M48 6 L48 11 L52 11 L52 6" strokeWidth="0.3" />
        {/* Chimney */}
        <path d="M78 2 L78 -3 L82 -3 L82 2" />
        {/* Main house wall — double-height with tall windows */}
        <path d="M25 15 L25 90 L75 90 L75 15" />
        {/* Upper windows with louvered shutters */}
        <path d="M30 20 L30 38 L43 38 L43 20 Z" />
        <path d="M27 20 L30 20 L30 38 L27 38 Z" strokeWidth="0.3" />
        <path d="M43 20 L46 20 L46 38 L43 38 Z" strokeWidth="0.3" />
        <path d="M28 24 L29 24" strokeWidth="0.2" />
        <path d="M28 28 L29 28" strokeWidth="0.2" />
        <path d="M28 32 L29 32" strokeWidth="0.2" />
        <path d="M57 20 L57 38 L70 38 L70 20 Z" />
        <path d="M54 20 L57 20 L57 38 L54 38 Z" strokeWidth="0.3" />
        <path d="M70 20 L73 20 L73 38 L70 38 Z" strokeWidth="0.3" />
        {/* Lower windows */}
        <path d="M30 50 L30 68 L43 68 L43 50 Z" />
        <path d="M57 50 L57 68 L70 68 L70 50 Z" />
        {/* Live oak tree silhouette to the side */}
        <path d="M-5 92 L-5 55" strokeWidth="0.5" opacity="0.25" />
        <path d="M-5 55 Q-15 40, -5 35 Q5 30, -2 25 Q-10 20, 0 18 Q10 15, 5 20 Q15 25, 10 30" strokeWidth="0.5" opacity="0.2" />
        {/* Hanging moss suggestion */}
        <path d="M0 30 L-2 38" strokeWidth="0.2" opacity="0.15" />
        <path d="M5 28 L3 36" strokeWidth="0.2" opacity="0.15" />
        {/* Ground/lawn */}
        <path d="M-10 92 L110 92" />
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
