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
 * BEAM - Tudor great hall with massive hammer beam roof
 * Reference: Westminster Hall, London - iconic hammer beam
 * Shows: Looking UP at ornate timber beam with angel brackets
 * Unique view: Worm's eye perspective of structural masterpiece
 */
const BeamSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="beam-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#beam-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Room walls converging below */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        <path d="M5 95 L5 50" />
        <path d="M95 95 L95 50" />
        <path d="M5 95 L95 95" />
        {/* Wall arcade arches hint */}
        <path d="M10 80 Q20 70, 30 80" />
        <path d="M70 80 Q80 70, 90 80" />
      </g>

      {/* PRIMARY - Hammer beam ceiling structure */}
      <g strokeWidth="1.2">
        {/* Central ridge beam */}
        <path d="M35 8 L65 8 L65 15 L35 15 Z" strokeWidth="1.5" />
        <path d="M40 10 L60 10" strokeWidth="0.8" opacity="0.5" />

        {/* Main hammer beams projecting from walls */}
        <path d="M5 45 L35 45 L35 52 L5 52" strokeWidth="1.8" />
        <path d="M65 45 L95 45 L95 52 L65 52" strokeWidth="1.8" />

        {/* Hammer posts (vertical from beam) */}
        <path d="M30 30 L30 45" strokeWidth="2" />
        <path d="M70 30 L70 45" strokeWidth="2" />
        <path d="M28 32 L32 32 L32 43 L28 43 Z" strokeWidth="1" />
        <path d="M68 32 L72 32 L72 43 L68 43 Z" strokeWidth="1" />

        {/* Curved braces (arch braces) */}
        <path d="M5 50 Q20 35, 30 30" strokeWidth="1.5" />
        <path d="M95 50 Q80 35, 70 30" strokeWidth="1.5" />

        {/* Collar beam connecting posts */}
        <path d="M30 30 L70 30" strokeWidth="1.5" />
        <path d="M32 28 L68 28" strokeWidth="0.8" />

        {/* Principal rafters rising to ridge */}
        <path d="M30 30 L50 8" strokeWidth="1.5" />
        <path d="M70 30 L50 8" strokeWidth="1.5" />

        {/* Angel bracket decorations */}
        <path d="M25 45 Q22 38, 28 35" strokeWidth="1" />
        <circle cx="24" cy="40" r="2" strokeWidth="0.8" />
        <path d="M75 45 Q78 38, 72 35" strokeWidth="1" />
        <circle cx="76" cy="40" r="2" strokeWidth="0.8" />

        {/* Wood grain on beams */}
        <path d="M12 48 L20 49" opacity="0.4" strokeWidth="0.6" />
        <path d="M75 48 L85 49" opacity="0.4" strokeWidth="0.6" />
        <path d="M40 12 L52 13" opacity="0.4" strokeWidth="0.6" />

        {/* Purlins (horizontal roof members) */}
        <path d="M38 20 L62 20" strokeWidth="0.8" />
        <path d="M20 55 L35 40" strokeWidth="0.8" opacity="0.6" />
        <path d="M80 55 L65 40" strokeWidth="0.8" opacity="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * COFFER - Pantheon dome looking UP into coffered interior
 * Reference: The Pantheon, Rome - iconic coffered dome with oculus
 * Shows: Concentric rings of recessed coffers radiating from oculus
 * Unique view: Standing in center looking straight up
 */
const CofferSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="coffer-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#coffer-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Dome base ring */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        <circle cx="50" cy="50" r="47" />
        {/* Cornice at base */}
        <circle cx="50" cy="50" r="45" />
      </g>

      {/* PRIMARY - Coffered dome structure */}
      <g strokeWidth="1">
        {/* Oculus (open to sky) */}
        <circle cx="50" cy="50" r="8" strokeWidth="2" />
        <circle cx="50" cy="50" r="6" strokeWidth="1" opacity="0.6" />

        {/* Concentric coffer rings */}
        <circle cx="50" cy="50" r="15" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="24" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="33" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="42" strokeWidth="1.5" />

        {/* Radial coffer divisions (28 coffers per ring historically) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x1 = 50 + 15 * Math.cos(angle)
          const y1 = 50 + 15 * Math.sin(angle)
          const x2 = 50 + 42 * Math.cos(angle)
          const y2 = 50 + 42 * Math.sin(angle)
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} strokeWidth="1" />
        })}

        {/* Inner recess detail on select coffers */}
        {/* Top coffer detail */}
        <path d="M47 18 L53 18 L54 23 L46 23 Z" strokeWidth="0.8" />
        <path d="M48 19 L52 19 L52.5 22 L47.5 22 Z" strokeWidth="0.5" opacity="0.6" />

        {/* Side coffer detail */}
        <path d="M18 47 L18 53 L23 54 L23 46 Z" strokeWidth="0.8" />
        <path d="M82 47 L82 53 L77 54 L77 46 Z" strokeWidth="0.8" />

        {/* Bottom coffer detail */}
        <path d="M47 82 L53 82 L54 77 L46 77 Z" strokeWidth="0.8" />

        {/* Central rosettes in coffers (bronze originally) */}
        <circle cx="50" cy="28" r="1.5" strokeWidth="0.7" />
        <circle cx="28" cy="50" r="1.5" strokeWidth="0.7" />
        <circle cx="72" cy="50" r="1.5" strokeWidth="0.7" />
        <circle cx="50" cy="72" r="1.5" strokeWidth="0.7" />

        {/* Light beam from oculus */}
        <path d="M50 42 L45 35" strokeDasharray="2 2" opacity="0.3" strokeWidth="0.5" />
        <path d="M50 42 L55 35" strokeDasharray="2 2" opacity="0.3" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * DROP CEILING - Modern office with suspended T-bar grid
 * Reference: Contemporary commercial interior
 * Shows: T-bar grid with one tile removed showing plenum space
 * Unique view: Looking up at office ceiling with light fixtures
 */
const DropCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="drop-halo" intensity={0.75} />}
    <g filter={showHalo ? "url(#drop-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Room walls */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        <path d="M5 5 L95 5 L95 95 L5 95 Z" />
        {/* Wall molding */}
        <path d="M8 8 L92 8" />
        <path d="M8 8 L8 92" />
        <path d="M92 8 L92 92" />
      </g>

      {/* PRIMARY - Suspended ceiling grid */}
      <g strokeWidth="1">
        {/* Main T-bar grid */}
        <path d="M10 10 L90 10" strokeWidth="1.5" />
        <path d="M10 30 L90 30" strokeWidth="1.5" />
        <path d="M10 50 L90 50" strokeWidth="1.5" />
        <path d="M10 70 L90 70" strokeWidth="1.5" />
        <path d="M10 90 L90 90" strokeWidth="1.5" />

        <path d="M10 10 L10 90" strokeWidth="1.5" />
        <path d="M30 10 L30 90" strokeWidth="1.5" />
        <path d="M50 10 L50 90" strokeWidth="1.5" />
        <path d="M70 10 L70 90" strokeWidth="1.5" />
        <path d="M90 10 L90 90" strokeWidth="1.5" />

        {/* Acoustic tiles (shown as slightly recessed) */}
        <path d="M12 12 L28 12 L28 28 L12 28 Z" strokeWidth="0.8" />
        <path d="M32 12 L48 12 L48 28 L32 28 Z" strokeWidth="0.8" />
        <path d="M52 12 L68 12 L68 28 L52 28 Z" strokeWidth="0.8" />
        <path d="M72 12 L88 12 L88 28 L72 28 Z" strokeWidth="0.8" />

        <path d="M12 32 L28 32 L28 48 L12 48 Z" strokeWidth="0.8" />
        {/* Fluorescent light fixture */}
        <path d="M32 32 L68 32 L68 48 L32 48 Z" strokeWidth="1.2" />
        <path d="M35 35 L65 35 L65 45 L35 45 Z" strokeWidth="0.8" opacity="0.5" />
        <path d="M38 40 L62 40" strokeWidth="0.6" opacity="0.4" />
        <path d="M72 32 L88 32 L88 48 L72 48 Z" strokeWidth="0.8" />

        {/* Missing tile showing plenum space */}
        <path d="M12 52 L28 52 L28 68 L12 68 Z" strokeDasharray="3 2" strokeWidth="0.8" opacity="0.5" />
        {/* Ductwork visible in plenum */}
        <path d="M14 55 L26 55 L26 60 L14 60" strokeDasharray="2 1" opacity="0.4" strokeWidth="0.6" />
        <path d="M20 60 L20 66" strokeDasharray="2 1" opacity="0.4" strokeWidth="0.6" />
        {/* Suspension wire visible */}
        <path d="M20 52 L20 48" strokeDasharray="1 1" opacity="0.3" strokeWidth="0.5" />

        <path d="M32 52 L48 52 L48 68 L32 68 Z" strokeWidth="0.8" />
        <path d="M52 52 L68 52 L68 68 L52 68 Z" strokeWidth="0.8" />
        {/* Air return grille */}
        <path d="M72 52 L88 52 L88 68 L72 68 Z" strokeWidth="1" />
        <path d="M75 55 L85 55" strokeWidth="0.6" />
        <path d="M75 58 L85 58" strokeWidth="0.6" />
        <path d="M75 61 L85 61" strokeWidth="0.6" />
        <path d="M75 64 L85 64" strokeWidth="0.6" />

        {/* Bottom row tiles */}
        <path d="M12 72 L28 72 L28 88 L12 88 Z" strokeWidth="0.8" />
        <path d="M32 72 L48 72 L48 88 L32 88 Z" strokeWidth="0.8" />
        {/* Sprinkler head */}
        <circle cx="60" cy="80" r="2" strokeWidth="0.8" />
        <path d="M52 72 L68 72 L68 88 L52 88 Z" strokeWidth="0.8" />
        <path d="M72 72 L88 72 L88 88 L72 88 Z" strokeWidth="0.8" />

        {/* Tile texture on one panel */}
        <path d="M34 74 L46 74" opacity="0.2" strokeWidth="0.4" />
        <path d="M34 78 L46 78" opacity="0.2" strokeWidth="0.4" />
        <path d="M34 82 L46 82" opacity="0.2" strokeWidth="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * EXPOSED BEAM - Medieval tithe barn with exposed timber structure
 * Reference: Great Coxwell Barn, England - massive oak structure
 * Shows: Looking up at spectacular open timber roof
 * Unique view: Interior of barn with cruck frame visible
 */
const ExposedBeamSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="exposed-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#exposed-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Stone walls of barn */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        <path d="M5 95 L5 55" />
        <path d="M95 95 L95 55" />
        <path d="M5 95 L95 95" />
        {/* Stone texture hint */}
        <path d="M7 70 L10 72" />
        <path d="M7 80 L11 81" />
        <path d="M90 75 L93 74" />
      </g>

      {/* PRIMARY - Exposed timber frame */}
      <g strokeWidth="1.2">
        {/* Ridge beam at apex */}
        <path d="M40 12 L60 12 L60 18 L40 18 Z" strokeWidth="1.5" />

        {/* Principal rafters (massive timbers) */}
        <path d="M8 55 L50 12" strokeWidth="2" />
        <path d="M92 55 L50 12" strokeWidth="2" />
        {/* Rafter thickness shown */}
        <path d="M12 55 L50 15" strokeWidth="1" opacity="0.6" />
        <path d="M88 55 L50 15" strokeWidth="1" opacity="0.6" />

        {/* Tie beam across */}
        <path d="M8 55 L92 55" strokeWidth="2.5" />
        <path d="M8 58 L92 58" strokeWidth="1" opacity="0.5" />

        {/* King post from tie beam to ridge */}
        <path d="M47 55 L47 18" strokeWidth="1.8" />
        <path d="M53 55 L53 18" strokeWidth="1.8" />
        <path d="M47 55 L53 55 L53 18 L47 18 Z" strokeWidth="0.5" opacity="0.3" />

        {/* Struts from king post to rafters */}
        <path d="M47 35 L25 50" strokeWidth="1.2" />
        <path d="M53 35 L75 50" strokeWidth="1.2" />

        {/* Common rafters (smaller) */}
        <path d="M20 62 L35 30" strokeWidth="0.9" />
        <path d="M35 65 L45 22" strokeWidth="0.9" />
        <path d="M55 22 L65 65" strokeWidth="0.9" />
        <path d="M65 30 L80 62" strokeWidth="0.9" />

        {/* Purlins (horizontal between rafters) */}
        <path d="M18 48 L42 28" strokeWidth="1" />
        <path d="M58 28 L82 48" strokeWidth="1" />
        <path d="M25 38 L40 22" strokeWidth="0.8" />
        <path d="M60 22 L75 38" strokeWidth="0.8" />

        {/* Roof boarding above rafters */}
        <path d="M15 52 L38 25" opacity="0.3" strokeWidth="0.5" />
        <path d="M62 25 L85 52" opacity="0.3" strokeWidth="0.5" />

        {/* Wood grain texture */}
        <path d="M25 56 L40 57" opacity="0.4" strokeWidth="0.5" />
        <path d="M60 56 L75 57" opacity="0.4" strokeWidth="0.5" />
        <path d="M48 35 L51 38" opacity="0.4" strokeWidth="0.5" />

        {/* Timber joint pegs */}
        <circle cx="50" cy="55" r="1.5" strokeWidth="0.8" />
        <circle cx="50" cy="18" r="1.5" strokeWidth="0.8" />
        <circle cx="25" cy="50" r="1" strokeWidth="0.6" />
        <circle cx="75" cy="50" r="1" strokeWidth="0.6" />

        {/* Wall plate where beams rest */}
        <path d="M5 55 L8 55 L8 60 L5 60" strokeWidth="1" />
        <path d="M92 55 L95 55 L95 60 L92 60" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * TRAY CEILING - Art Deco theater with illuminated stepped ceiling
 * Reference: Radio City Music Hall - spectacular coved ceiling
 * Shows: Concentric illuminated bands stepping up to center
 * Unique view: Theater interior looking up at dramatic ceiling
 */
const TrayCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tray-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#tray-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Theater proscenium arch hint */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Side walls */}
        <path d="M5 5 L5 95" />
        <path d="M95 5 L95 95" />
        {/* Stage area at bottom */}
        <path d="M20 92 L80 92 L80 98 L20 98 Z" />
        {/* Balcony rail hint */}
        <path d="M5 85 Q50 80, 95 85" />
      </g>

      {/* PRIMARY - Stepped illuminated tray ceiling */}
      <g strokeWidth="1">
        {/* Outermost ceiling level */}
        <path d="M8 8 L92 8 L92 85 L8 85 Z" strokeWidth="1.5" />

        {/* First step inward - Art Deco curve */}
        <path d="M15 15 Q50 12, 85 15 L85 78 Q50 82, 15 78 Z" strokeWidth="1.3" />
        {/* Cove lighting channel */}
        <path d="M16 16 Q50 13, 84 16" strokeDasharray="4 2" opacity="0.5" strokeWidth="0.6" />

        {/* Second step */}
        <path d="M22 22 Q50 18, 78 22 L78 72 Q50 76, 22 72 Z" strokeWidth="1.2" />
        <path d="M23 23 Q50 19, 77 23" strokeDasharray="4 2" opacity="0.5" strokeWidth="0.6" />

        {/* Third step */}
        <path d="M30 28 Q50 24, 70 28 L70 65 Q50 70, 30 65 Z" strokeWidth="1.1" />
        <path d="M31 29 Q50 25, 69 29" strokeDasharray="4 2" opacity="0.5" strokeWidth="0.6" />

        {/* Central medallion area */}
        <path d="M38 35 Q50 32, 62 35 L62 58 Q50 62, 38 58 Z" strokeWidth="1.2" />

        {/* Grand chandelier (simplified) */}
        <circle cx="50" cy="46" r="8" strokeWidth="1.5" />
        <circle cx="50" cy="46" r="5" strokeWidth="1" />
        <circle cx="50" cy="46" r="2" strokeWidth="0.8" />
        {/* Chandelier arms */}
        <path d="M42 46 L38 46" strokeWidth="0.8" />
        <path d="M58 46 L62 46" strokeWidth="0.8" />
        <path d="M50 38 L50 35" strokeWidth="0.8" />
        <path d="M50 54 L50 58" strokeWidth="0.8" />
        {/* Crystal drops */}
        <path d="M44 50 L44 52" strokeWidth="0.5" />
        <path d="M56 50 L56 52" strokeWidth="0.5" />

        {/* Art Deco sunburst rays from center */}
        <path d="M50 35 L50 28" strokeWidth="0.6" />
        <path d="M50 58 L50 65" strokeWidth="0.6" />
        <path d="M38 46 L30 46" strokeWidth="0.6" />
        <path d="M62 46 L70 46" strokeWidth="0.6" />
        <path d="M42 38 L35 32" strokeWidth="0.5" />
        <path d="M58 38 L65 32" strokeWidth="0.5" />
        <path d="M42 54 L35 60" strokeWidth="0.5" />
        <path d="M58 54 L65 60" strokeWidth="0.5" />

        {/* Decorative corner fans (Art Deco) */}
        <path d="M10 10 L18 18" strokeWidth="0.8" />
        <path d="M10 15 L15 18" strokeWidth="0.6" />
        <path d="M15 10 L18 15" strokeWidth="0.6" />
        <path d="M90 10 L82 18" strokeWidth="0.8" />
        <path d="M85 10 L82 15" strokeWidth="0.6" />
        <path d="M90 15 L85 18" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * VAULTED CEILING - Gothic cathedral with ribbed vault
 * Reference: Notre-Dame de Paris - quadripartite ribbed vault
 * Shows: Looking up at intersection of pointed arches
 * Unique view: Standing in nave looking at vault above
 */
const VaultedCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="vaulted-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#vaulted-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Column capitals and arcade below */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Column capitals at corners */}
        <path d="M8 88 L8 95 L15 95 L15 88" />
        <path d="M85 88 L85 95 L92 95 L92 88" />
        {/* Arcade arches below */}
        <path d="M5 95 Q25 85, 50 95" />
        <path d="M50 95 Q75 85, 95 95" />
        {/* Clerestory window hint */}
        <path d="M40 80 L40 88 L60 88 L60 80 Q50 75, 40 80" />
      </g>

      {/* PRIMARY - Gothic ribbed vault */}
      <g strokeWidth="1.2">
        {/* Central keystone boss */}
        <circle cx="50" cy="50" r="5" strokeWidth="2" />
        <circle cx="50" cy="50" r="3" strokeWidth="1" />
        {/* Decorative carving on boss */}
        <path d="M48 48 L52 52" strokeWidth="0.6" />
        <path d="M52 48 L48 52" strokeWidth="0.6" />

        {/* Main diagonal ribs (ogives) crossing at boss */}
        <path d="M5 90 Q30 20, 50 50 Q70 20, 95 90" strokeWidth="2" />
        <path d="M95 90 Q70 20, 50 50 Q30 20, 5 90" strokeWidth="2" />

        {/* Transverse arch (across nave) */}
        <path d="M5 90 Q50 5, 95 90" strokeWidth="1.8" />

        {/* Wall arches (formerets) on sides */}
        <path d="M5 5 Q5 50, 5 90" strokeWidth="1.5" />
        <path d="M95 5 Q95 50, 95 90" strokeWidth="1.5" />

        {/* Secondary ribs (tiercerons) */}
        <path d="M50 50 L50 5" strokeWidth="1.2" />
        <path d="M50 50 L5 50" strokeWidth="1" />
        <path d="M50 50 L95 50" strokeWidth="1" />

        {/* Vault webbing (panels between ribs) */}
        <path d="M20 70 Q35 35, 50 50" opacity="0.4" strokeWidth="0.6" />
        <path d="M80 70 Q65 35, 50 50" opacity="0.4" strokeWidth="0.6" />
        <path d="M30 25 Q40 35, 50 50" opacity="0.4" strokeWidth="0.6" />
        <path d="M70 25 Q60 35, 50 50" opacity="0.4" strokeWidth="0.6" />

        {/* Rib profile detail (molded stone) */}
        <path d="M25 70 L28 72" strokeWidth="0.5" />
        <path d="M72 70 L75 72" strokeWidth="0.5" />

        {/* Springer points where ribs meet columns */}
        <circle cx="8" cy="88" r="3" strokeWidth="1.5" />
        <circle cx="92" cy="88" r="3" strokeWidth="1.5" />

        {/* Tas-de-charge (stone blocks) */}
        <path d="M5 85 L12 85 L12 92 L5 92" strokeWidth="1" />
        <path d="M88 85 L95 85 L95 92 L88 92" strokeWidth="1" />

        {/* Small bosses at rib intersections */}
        <circle cx="30" cy="68" r="2" strokeWidth="0.8" />
        <circle cx="70" cy="68" r="2" strokeWidth="0.8" />
        <circle cx="50" cy="25" r="2" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
)

/**
 * WOODEN CEILING - Scandinavian cabin with warm wood planks
 * Reference: Traditional Nordic stave construction
 * Shows: Tongue-and-groove planks with exposed beams
 * Unique view: Cozy interior looking up at sloped wood ceiling
 */
const WoodenCeilingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="wooden-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#wooden-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Cabin walls with window */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Side walls */}
        <path d="M5 95 L5 35" />
        <path d="M95 95 L95 35" />
        {/* Window in gable */}
        <path d="M40 25 L40 40 L60 40 L60 25" />
        <path d="M42 27 L42 38 L58 38 L58 27" />
        <path d="M50 25 L50 40" />
        {/* Log wall texture hint */}
        <path d="M6 60 L8 60" />
        <path d="M6 70 L9 70" />
        <path d="M6 80 L8 80" />
      </g>

      {/* PRIMARY - Wooden plank ceiling with beams */}
      <g strokeWidth="1">
        {/* Sloped ceiling following roof line */}
        <path d="M5 35 L50 10 L95 35" strokeWidth="1.5" />

        {/* Main ridge beam */}
        <path d="M45 10 L55 10 L55 15 L45 15 Z" strokeWidth="1.2" />

        {/* Exposed ceiling beams (rafters) */}
        <path d="M15 32 L45 12" strokeWidth="1.8" />
        <path d="M30 35 L48 14" strokeWidth="1.8" />
        <path d="M55 12 L85 32" strokeWidth="1.8" />
        <path d="M52 14 L70 35" strokeWidth="1.8" />

        {/* Tongue and groove planks between beams */}
        {/* Left slope */}
        <path d="M8 34 L43 11" strokeWidth="0.7" />
        <path d="M10 35 L44 12" strokeWidth="0.7" />
        <path d="M16 38 L46 15" strokeWidth="0.7" />
        <path d="M20 40 L47 17" strokeWidth="0.7" />
        <path d="M25 43 L48 20" strokeWidth="0.7" />
        <path d="M31 47 L49 23" strokeWidth="0.7" />

        {/* Right slope */}
        <path d="M52 11 L92 34" strokeWidth="0.7" />
        <path d="M53 13 L90 35" strokeWidth="0.7" />
        <path d="M54 16 L86 38" strokeWidth="0.7" />
        <path d="M55 19 L82 40" strokeWidth="0.7" />
        <path d="M56 22 L78 43" strokeWidth="0.7" />
        <path d="M57 25 L74 47" strokeWidth="0.7" />

        {/* Wood grain on beams */}
        <path d="M20 28 L28 24" opacity="0.4" strokeWidth="0.5" />
        <path d="M35 25 L42 20" opacity="0.4" strokeWidth="0.5" />
        <path d="M60 20 L68 24" opacity="0.4" strokeWidth="0.5" />
        <path d="M75 25 L82 28" opacity="0.4" strokeWidth="0.5" />

        {/* Knots in wood */}
        <circle cx="22" cy="30" r="1.5" opacity="0.5" strokeWidth="0.6" />
        <circle cx="65" cy="28" r="1.5" opacity="0.5" strokeWidth="0.6" />
        <circle cx="48" cy="18" r="1" opacity="0.5" strokeWidth="0.5" />

        {/* Beam ends at wall plate */}
        <path d="M5 35 L5 38 L15 38 L15 32" strokeWidth="1" />
        <path d="M95 35 L95 38 L85 38 L85 32" strokeWidth="1" />

        {/* Collar tie beam */}
        <path d="M25 45 L75 45" strokeWidth="1.5" />
        <path d="M25 48 L75 48" strokeWidth="0.8" opacity="0.5" />

        {/* Pendant light from ridge */}
        <path d="M50 15 L50 25" strokeWidth="0.8" />
        <path d="M46 25 L54 25 L52 32 L48 32 Z" strokeWidth="0.8" />
      </g>
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
