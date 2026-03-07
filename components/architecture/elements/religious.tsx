'use client'

import React from 'react'
import { S } from './svgStyleTokens'

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
// Reference: Notre-Dame de Paris - Eastern apse with radiating chapels
const ApseSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="apse-halo" intensity={1} />}
    <g filter={showHalo ? "url(#apse-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Church nave structure */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M20 95 L20 90" />
        <path d="M80 95 L80 90" />
        <path d="M15 90 L85 90" />
        <path d="M10 50 L10 90 L15 90" />
        <path d="M90 50 L90 90 L85 90" />
      </g>

      {/* PRIMARY: Apse structure */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Nave walls leading to apse */}
        <path d="M20 90 L20 40" />
        <path d="M80 90 L80 40" />

        {/* Semi-circular apse */}
        <path d="M20 40 Q20 10, 50 10 Q80 10, 80 40" strokeWidth="1.2" />

        {/* Conch (semi-dome) lines */}
        <path d="M25 38 Q25 18, 50 18 Q75 18, 75 38" />
        <path d="M30 36 Q30 25, 50 25 Q70 25, 70 36" />

        {/* Radiating ribs in conch */}
        <path d="M50 10 L50 40" strokeWidth="0.8" />
        <path d="M35 15 L40 40" strokeWidth="0.8" />
        <path d="M65 15 L60 40" strokeWidth="0.8" />
        <path d="M30 20 L35 40" strokeWidth="0.6" />
        <path d="M70 20 L65 40" strokeWidth="0.6" />

        {/* High altar position */}
        <path d="M40 50 L40 45 L60 45 L60 50 Z" strokeWidth="1.2" />
        <path d="M42 45 L42 42 L58 42 L58 45" />

        {/* Ambulatory windows in apse */}
        <path d="M35 25 L35 35" />
        <path d="M50 18 L50 32" />
        <path d="M65 25 L65 35" />
      </g>
    </g>
  </svg>
)

// 2. Altar - sacred table for worship
// Reference: St. Peter's Basilica - Papal altar under baldacchino
const AltarSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="altar-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#altar-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Sanctuary floor outline */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 90 L95 90" />
        <path d="M5 25 L5 90" />
        <path d="M95 25 L95 90" />
        <path d="M5 25 Q50 10, 95 25" />
      </g>

      {/* PRIMARY: Altar structure */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Mensa (altar table top) */}
        <path d="M15 45 L85 45 L85 52 L15 52 Z" strokeWidth="1.2" />
        <path d="M18 48 L82 48" strokeWidth="0.5" />

        {/* Altar frontal/antependium */}
        <path d="M18 52 L18 82 L82 82 L82 52" />

        {/* Decorative panels */}
        <path d="M25 58 L25 76 L45 76 L45 58 Z" />
        <path d="M55 58 L55 76 L75 76 L75 58 Z" />

        {/* Cross on front panels */}
        <path d="M35 62 L35 72" strokeWidth="1.2" />
        <path d="M31 66 L39 66" strokeWidth="1.2" />
        <path d="M65 62 L65 72" strokeWidth="1.2" />
        <path d="M61 66 L69 66" strokeWidth="1.2" />

        {/* Predella (altar step) */}
        <path d="M12 82 L88 82 L88 90 L12 90 Z" />

        {/* Altar crucifix */}
        <path d="M50 25 L50 45" strokeWidth="1.4" />
        <path d="M42 32 L58 32" strokeWidth="1.4" />

        {/* Candlesticks - left */}
        <path d="M25 40 L25 45" strokeWidth="0.8" />
        <path d="M23 38 L27 38 L26 40 L24 40 Z" />
        <path d="M24 35 L25 38" />

        {/* Candlesticks - right */}
        <path d="M75 40 L75 45" strokeWidth="0.8" />
        <path d="M73 38 L77 38 L76 40 L74 40 Z" />
        <path d="M74 35 L75 38" />
      </g>
    </g>
  </svg>
)

// 3. Baptistery - building/area for baptisms
// Reference: Florence Baptistery - Octagonal plan with dome
const BaptisterySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="baptistery-halo" intensity={1} />}
    <g filter={showHalo ? "url(#baptistery-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Surrounding church complex */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 85 L15 85 L15 95" />
        <path d="M85 85 L95 85 L95 95" />
        <path d="M50 5 Q30 0, 15 10" />
        <path d="M50 5 Q70 0, 85 10" />
      </g>

      {/* PRIMARY: Baptistery structure */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Octagonal plan outline */}
        <path d="M50 10 L75 20 L85 45 L75 70 L50 80 L25 70 L15 45 L25 20 Z" strokeWidth="1.2" />

        {/* Inner octagon */}
        <path d="M50 18 L68 26 L76 45 L68 64 L50 72 L32 64 L24 45 L32 26 Z" />

        {/* Central font (circular) */}
        <circle cx="50" cy="45" r="15" strokeWidth="1.2" />
        <circle cx="50" cy="45" r="12" strokeWidth="0.8" />

        {/* Water indication */}
        <path d="M42 45 Q45 42, 50 45 Q55 48, 58 45" opacity="0.6" strokeWidth="0.6" />
        <path d="M40 46 Q43 43, 48 46" opacity="0.4" strokeWidth="0.5" />

        {/* Font pedestal */}
        <path d="M44 60 L44 65 L56 65 L56 60" />
        <path d="M42 65 L42 72 L58 72 L58 65" />

        {/* Dome ribs indication above */}
        <path d="M30 15 Q50 5, 70 15" strokeWidth="0.6" opacity="0.5" />
        <path d="M35 18 Q50 10, 65 18" strokeWidth="0.5" opacity="0.4" />

        {/* Niches in walls */}
        <path d="M76 35 Q82 45, 76 55" />
        <path d="M24 35 Q18 45, 24 55" />
        <path d="M50 73 Q50 80, 55 78" />

        {/* Entry */}
        <path d="M45 80 L45 85 L55 85 L55 80" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

// 4. Bell Tower / Campanile
// Reference: Campanile di Giotto, Florence - Freestanding bell tower
const BellTowerSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="belltower-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#belltower-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Cathedral body */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M75 50 L95 50 L95 95 L75 95" />
        <path d="M5 70 L25 70 L25 95 L5 95" />
        <path d="M75 45 Q85 30, 95 45" />
      </g>

      {/* PRIMARY: Bell tower */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Tower base */}
        <path d="M30 95 L30 70 L70 70 L70 95" />

        {/* First tier */}
        <path d="M28 70 L28 50 L72 50 L72 70" />
        <path d="M25 70 L75 70" strokeWidth="1.3" />

        {/* Second tier (belfry) */}
        <path d="M30 50 L30 30 L70 30 L70 50" />
        <path d="M27 50 L73 50" strokeWidth="1.3" />

        {/* Belfry openings (arched) */}
        <path d="M35 35 L35 48 Q40 42, 45 48 L45 35" strokeWidth="1.2" />
        <path d="M55 35 L55 48 Q60 42, 65 48 L65 35" strokeWidth="1.2" />

        {/* Bell inside */}
        <path d="M48 38 Q50 35, 52 38 L54 45 L46 45 Z" opacity="0.7" strokeWidth="0.8" />
        <path d="M50 35 L50 38" strokeWidth="0.5" />

        {/* Pyramidal roof */}
        <path d="M30 30 L50 10 L70 30" strokeWidth="1.2" />
        <path d="M35 30 L50 14 L65 30" strokeWidth="0.6" />
        <path d="M50 10 L50 30" strokeWidth="0.5" opacity="0.5" />

        {/* Cross finial */}
        <path d="M50 10 L50 5" strokeWidth="1.3" />
        <path d="M47 7 L53 7" strokeWidth="1.3" />

        {/* Window in lower tier */}
        <path d="M45 75 L45 85 L55 85 L55 75 Q50 72, 45 75" />

        {/* String courses */}
        <path d="M28 55 L72 55" strokeWidth="0.5" />
        <path d="M28 60 L72 60" strokeWidth="0.5" />
        <path d="M28 65 L72 65" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// 5. Chancel - area around altar
// Reference: Canterbury Cathedral - Choir and high altar area
const ChancelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="chancel-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#chancel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Nave beyond chancel arch */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M35 90 L35 95" />
        <path d="M65 90 L65 95" />
        <path d="M25 90 L25 95" />
        <path d="M75 90 L75 95" />
        <path d="M10 92 L90 92" />
      </g>

      {/* PRIMARY: Chancel area */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Chancel walls */}
        <path d="M25 90 L25 40" strokeWidth="1.2" />
        <path d="M75 90 L75 40" strokeWidth="1.2" />

        {/* East end (apse suggestion) */}
        <path d="M25 40 Q50 25, 75 40" strokeWidth="1.2" />

        {/* Chancel arch (from nave) */}
        <path d="M20 90 Q20 78, 28 78 L72 78 Q80 78, 80 90" />
        <path d="M28 78 Q50 68, 72 78" strokeWidth="1.3" />

        {/* Altar */}
        <path d="M40 50 L60 50 L60 55 L40 55 Z" strokeWidth="1.2" />
        <path d="M42 55 L42 60 L58 60 L58 55" />

        {/* Altar rails */}
        <path d="M30 65 L70 65" strokeWidth="1.2" />
        <path d="M30 68 L70 68" />
        {[35, 45, 55, 65].map((x, i) => (
          <path key={i} d={`M${x} 65 L${x} 68`} strokeWidth="0.8" />
        ))}

        {/* Choir stalls indication */}
        <path d="M28 72 L28 85 L35 85 L35 72" opacity="0.6" />
        <path d="M65 72 L65 85 L72 85 L72 72" opacity="0.6" />
        <path d="M30 76 L33 76" strokeWidth="0.6" />
        <path d="M30 80 L33 80" strokeWidth="0.6" />
        <path d="M67 76 L70 76" strokeWidth="0.6" />
        <path d="M67 80 L70 80" strokeWidth="0.6" />

        {/* Reredos behind altar */}
        <path d="M35 42 L35 50 L65 50 L65 42 Q50 35, 35 42" />
        <path d="M40 45 L40 50" strokeWidth="0.5" />
        <path d="M50 38 L50 50" strokeWidth="0.5" />
        <path d="M60 45 L60 50" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// 6. Chapel - small church or side room
// Reference: Sainte-Chapelle, Paris - Royal chapel with rose window
const ChapelSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="chapel-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#chapel-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Courtyard or church grounds */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 90 L15 90 L15 95" />
        <path d="M85 90 L95 90 L95 95" />
        <path d="M5 50 L15 50 L15 60" />
        <path d="M85 50 L95 50 L95 60" />
      </g>

      {/* PRIMARY: Chapel structure */}
      <g strokeWidth="1">
        {/* Rectangular structure */}
        <path d="M20 35 L20 90 L80 90 L80 35" strokeWidth="1.2" />

        {/* Gabled roof */}
        <path d="M18 35 L50 15 L82 35" strokeWidth="1.2" />
        <path d="M22 35 L50 18 L78 35" strokeWidth="0.6" />
        <path d="M50 15 L50 35" strokeWidth="0.5" opacity="0.5" />

        {/* Cross on gable */}
        <path d="M50 15 L50 8" strokeWidth="1.3" />
        <path d="M47 11 L53 11" strokeWidth="1.3" />

        {/* Door */}
        <path d="M40 60 L40 88 L60 88 L60 60 Q50 55, 40 60" strokeWidth="1.2" />
        <path d="M50 60 L50 88" strokeWidth="0.8" />
        <circle cx="56" cy="75" r="1.5" fill="currentColor" />

        {/* Rose window above door */}
        <circle cx="50" cy="45" r="8" strokeWidth="1.2" />
        <path d="M50 37 L50 53" strokeWidth="0.5" />
        <path d="M42 45 L58 45" strokeWidth="0.5" />
        <path d="M44 39 L56 51" strokeWidth="0.4" />
        <path d="M44 51 L56 39" strokeWidth="0.4" />
        <circle cx="50" cy="45" r="3" strokeWidth="0.5" />

        {/* Side windows */}
        <path d="M25 50 L25 70 L32 70 L32 50 Q28.5 47, 25 50" />
        <path d="M28.5 55 L28.5 68" strokeWidth="0.4" />
        <path d="M68 50 L68 70 L75 70 L75 50 Q71.5 47, 68 50" />
        <path d="M71.5 55 L71.5 68" strokeWidth="0.4" />

        {/* Bell cote */}
        <path d="M47 18 L47 22 L53 22 L53 18" />
        <path d="M45 22 L50 15 L55 22" strokeWidth="0.6" />
        <circle cx="50" cy="20" r="1" opacity="0.6" />
      </g>
    </g>
  </svg>
)

// 7. Choir - seating area for singers
// Reference: Westminster Abbey - Choir stalls with misericords
const ChoirSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="choir-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#choir-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Church interior walls */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M15 15 L15 85 L85 85 L85 15 L15 15" />
        <path d="M15 30 L85 30" />
      </g>

      {/* PRIMARY: Choir stalls and area */}
      <g strokeWidth="1">
        {/* Choir screen */}
        <path d="M20 30 L80 30" strokeWidth="1.2" />
        <path d="M20 30 L20 85" />
        <path d="M80 30 L80 85" />

        {/* North choir stalls */}
        <path d="M22 35 L22 75 L35 75 L35 35 Z" strokeWidth="1.2" />
        <path d="M24 40 L33 40" strokeWidth="0.8" />
        <path d="M24 48 L33 48" strokeWidth="0.8" />
        <path d="M24 56 L33 56" strokeWidth="0.8" />
        <path d="M24 64 L33 64" strokeWidth="0.8" />

        {/* Stall backs */}
        <path d="M22 35 L24 32 L33 32 L35 35" />

        {/* South choir stalls */}
        <path d="M65 35 L65 75 L78 75 L78 35 Z" strokeWidth="1.2" />
        <path d="M67 40 L76 40" strokeWidth="0.8" />
        <path d="M67 48 L76 48" strokeWidth="0.8" />
        <path d="M67 56 L76 56" strokeWidth="0.8" />
        <path d="M67 64 L76 64" strokeWidth="0.8" />

        {/* Stall backs */}
        <path d="M65 35 L67 32 L76 32 L78 35" />

        {/* Misericords suggestion */}
        <path d="M24 72 L33 72" strokeWidth="1.3" />
        <path d="M67 72 L76 72" strokeWidth="1.3" />

        {/* Lecterns */}
        <path d="M42 50 L42 60 L48 60 L48 50 Z" strokeWidth="1.1" />
        <path d="M45 45 L42 50" strokeWidth="0.8" />
        <path d="M45 45 L48 50" strokeWidth="0.8" />

        <path d="M52 50 L52 60 L58 60 L58 50 Z" strokeWidth="1.1" />
        <path d="M55 45 L52 50" strokeWidth="0.8" />
        <path d="M55 45 L58 50" strokeWidth="0.8" />

        {/* Central aisle */}
        <path d="M50 30 L50 85" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

// 8. Cloister - covered walkway around courtyard
// Reference: Abbey of Mont Saint-Michel - Monastic cloister
const CloisterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cloister-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#cloister-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Monastery outer walls */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 5 L5 95 L10 95 L10 5 Z" />
        <path d="M90 5 L95 5 L95 95 L90 95" />
        <path d="M5 5 L95 5" />
        <path d="M5 90 L10 90" />
        <path d="M90 90 L95 90" />
      </g>

      {/* PRIMARY: Cloister structure */}
      <g strokeWidth="1">
        {/* Outer walls */}
        <path d="M10 10 L10 90 L90 90 L90 10 Z" strokeWidth="1.2" />

        {/* Inner courtyard (garth) */}
        <path d="M25 25 L25 75 L75 75 L75 25 Z" strokeWidth="1.2" />

        {/* Arcade columns - Top side */}
        {[30, 42, 54, 66].map((x, i) => (
          <g key={`t${i}`}>
            <path d={`M${x} 25 L${x} 15`} strokeWidth="1" />
            <path d={`M${x-2} 25 Q${x} 22, ${x+4} 25`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Arcade columns - Bottom side */}
        {[30, 42, 54, 66].map((x, i) => (
          <g key={`b${i}`}>
            <path d={`M${x} 75 L${x} 85`} strokeWidth="1" />
            <path d={`M${x-2} 75 Q${x} 78, ${x+4} 75`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Arcade columns - Left side */}
        {[32, 44, 56, 68].map((y, i) => (
          <g key={`l${i}`}>
            <path d={`M25 ${y} L15 ${y}`} strokeWidth="1" />
            <path d={`M25 ${y-2} Q22 ${y}, 25 ${y+4}`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Arcade columns - Right side */}
        {[32, 44, 56, 68].map((y, i) => (
          <g key={`r${i}`}>
            <path d={`M75 ${y} L85 ${y}`} strokeWidth="1" />
            <path d={`M75 ${y-2} Q78 ${y}, 75 ${y+4}`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Garden/fountain in center */}
        <circle cx="50" cy="50" r="10" strokeWidth="1" />
        <circle cx="50" cy="50" r="3" strokeWidth="1.2" />
        <path d="M47 50 Q48 47, 50 50 Q52 47, 53 50" strokeWidth="0.5" opacity="0.6" />

        {/* Paths */}
        <path d="M50 40 L50 25" strokeWidth="0.6" />
        <path d="M50 60 L50 75" strokeWidth="0.6" />
        <path d="M40 50 L25 50" strokeWidth="0.6" />
        <path d="M60 50 L75 50" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

// 9. Crossing - intersection of nave and transept
// Reference: Durham Cathedral - Norman crossing with tower above
const CrossingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="crossing-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#crossing-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Extended nave and transept */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M40 0 L40 5" />
        <path d="M60 0 L60 5" />
        <path d="M40 95 L40 100" />
        <path d="M60 95 L60 100" />
        <path d="M0 40 L5 40" />
        <path d="M0 60 L5 60" />
        <path d="M95 40 L100 40" />
        <path d="M95 60 L100 60" />
      </g>

      {/* PRIMARY: Crossing structure */}
      <g strokeWidth="1">
        {/* Nave (north-south) */}
        <path d="M40 5 L40 95" strokeWidth="1.2" />
        <path d="M60 5 L60 95" strokeWidth="1.2" />

        {/* Transept (east-west) */}
        <path d="M5 40 L95 40" strokeWidth="1.2" />
        <path d="M5 60 L95 60" strokeWidth="1.2" />

        {/* Crossing square (emphasized) */}
        <path d="M40 40 L60 40 L60 60 L40 60 Z" strokeWidth="1.8" />

        {/* Crossing piers at corners */}
        <path d="M38 38 L42 38 L42 42 L38 42 Z" strokeWidth="1.2" />
        <path d="M58 38 L62 38 L62 42 L58 42 Z" strokeWidth="1.2" />
        <path d="M38 58 L42 58 L42 62 L38 62 Z" strokeWidth="1.2" />
        <path d="M58 58 L62 58 L62 62 L58 62 Z" strokeWidth="1.2" />

        {/* Tower/dome above crossing suggestion */}
        <circle cx="50" cy="50" r="8" strokeWidth="0.8" opacity="0.5" />
        <circle cx="50" cy="50" r="6" strokeWidth="0.6" opacity="0.4" />

        {/* Pendentives/squinches */}
        <path d="M42 42 Q46 46, 50 42" opacity="0.6" strokeWidth="0.8" />
        <path d="M58 42 Q54 46, 50 42" opacity="0.6" strokeWidth="0.8" />
        <path d="M42 58 Q46 54, 50 58" opacity="0.6" strokeWidth="0.8" />
        <path d="M58 58 Q54 54, 50 58" opacity="0.6" strokeWidth="0.8" />

        {/* Diagonal ribs */}
        <path d="M42 42 L58 58" strokeWidth="0.5" opacity="0.4" />
        <path d="M58 42 L42 58" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

// 10. Minaret - tower for call to prayer
// Reference: Sultan Hassan Mosque, Cairo - Mamluk minaret
const MinaretSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="minaret-halo" intensity={1} />}
    <g filter={showHalo ? "url(#minaret-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Mosque outline */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 70 L30 70 L30 95 L5 95" />
        <path d="M70 70 L95 70 L95 95 L70 95" />
        <path d="M5 65 Q15 55, 30 65" />
        <path d="M70 65 Q85 55, 95 65" />
      </g>

      {/* PRIMARY: Minaret structure */}
      <g strokeWidth="1">
        {/* Base */}
        <path d="M35 95 L35 80 L65 80 L65 95" strokeWidth="1.2" />
        <path d="M32 95 L68 95" strokeWidth="1.3" />

        {/* Main shaft (tapering) */}
        <path d="M38 80 L40 35" strokeWidth="1.2" />
        <path d="M62 80 L60 35" strokeWidth="1.2" />

        {/* Balcony (şerefe) */}
        <path d="M35 38 L35 32 L65 32 L65 38" strokeWidth="1.2" />
        <path d="M32 38 L68 38" strokeWidth="1.3" />

        {/* Balcony railing */}
        <path d="M35 35 L65 35" strokeWidth="0.8" />
        {[40, 48, 56].map((x, i) => (
          <path key={i} d={`M${x} 32 L${x} 38`} strokeWidth="0.8" />
        ))}

        {/* Upper shaft */}
        <path d="M42 32 L44 18" strokeWidth="1.2" />
        <path d="M58 32 L56 18" strokeWidth="1.2" />

        {/* Petek (upper gallery) */}
        <path d="M40 20 L40 15 L60 15 L60 20" strokeWidth="1.2" />
        <path d="M38 20 L62 20" strokeWidth="1.2" />
        {[45, 50, 55].map((x, i) => (
          <path key={i} d={`M${x} 15 L${x} 20`} strokeWidth="0.6" />
        ))}

        {/* Conical cap */}
        <path d="M42 15 L50 5 L58 15" strokeWidth="1.2" />
        <path d="M44 15 L50 7 L56 15" strokeWidth="0.6" />

        {/* Alem (finial) */}
        <path d="M50 5 L50 2" strokeWidth="1.2" />
        <circle cx="50" cy="2" r="1.5" strokeWidth="1" />

        {/* Door at base */}
        <path d="M45 85 L45 95 L55 95 L55 85 Q50 82, 45 85" strokeWidth="1.1" />

        {/* Decorative bands */}
        <path d="M38 50 L62 50" strokeWidth="0.6" />
        <path d="M39 60 L61 60" strokeWidth="0.6" />
        <path d="M37 70 L63 70" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

// 11. Narthex - entrance hall/porch
// Reference: Hagia Sophia - Outer narthex vestibule
const NarthexSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="narthex-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#narthex-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Church nave beyond */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M20 10 L20 50 L80 50 L80 10 L20 10" />
        <path d="M35 10 L35 30" />
        <path d="M65 10 L65 30" />
      </g>

      {/* PRIMARY: Narthex vestibule */}
      <g strokeWidth="1">
        {/* Narthex walls */}
        <path d="M15 50 L15 90 L85 90 L85 50" strokeWidth="1.2" />
        <path d="M15 50 L85 50" strokeWidth="1.3" />

        {/* Main entrance doors into nave */}
        <path d="M35 50 L35 35 Q50 25, 65 35 L65 50" strokeWidth="1.2" />
        <path d="M50 35 L50 50" strokeWidth="0.8" />
        <path d="M40 40 L40 50" strokeWidth="0.5" opacity="0.5" />
        <path d="M60 40 L60 50" strokeWidth="0.5" opacity="0.5" />

        {/* External entrance */}
        <path d="M40 75 L40 90 L60 90 L60 75 Q50 70, 40 75" strokeWidth="1.2" />
        <path d="M50 75 L50 90" strokeWidth="0.8" />

        {/* Interior columns */}
        <circle cx="30" cy="70" r="3" strokeWidth="1.1" />
        <circle cx="70" cy="70" r="3" strokeWidth="1.1" />
        <path d="M30 67 L30 90" strokeWidth="0.5" />
        <path d="M70 67 L70 90" strokeWidth="0.5" />

        {/* Vaulting suggestion */}
        <path d="M15 55 Q50 48, 85 55" strokeWidth="0.6" opacity="0.5" />
        <path d="M20 60 Q50 53, 80 60" strokeWidth="0.5" opacity="0.4" />

        {/* Side doors */}
        <path d="M18 65 L18 80 L25 80 L25 65 Q21.5 62, 18 65" />
        <path d="M75 65 L75 80 L82 80 L82 65 Q78.5 62, 75 65" />
      </g>
    </g>
  </svg>
)

// 12. Nave - main body of church
// Reference: Reims Cathedral - Gothic nave with arcade and clerestory
const NaveSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="nave-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#nave-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Aisles and outer walls */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M10 10 L10 90" />
        <path d="M90 10 L90 90" />
        <path d="M5 90 L95 90" />
        <path d="M5 10 L10 10" />
        <path d="M90 10 L95 10" />
      </g>

      {/* PRIMARY: Nave structure */}
      <g strokeWidth="1">
        {/* Nave walls */}
        <path d="M20 10 L20 90" strokeWidth="1.2" />
        <path d="M80 10 L80 90" strokeWidth="1.2" />

        {/* Arcade columns */}
        {[25, 40, 55, 70, 85].map((y, i) => (
          <g key={i}>
            <circle cx="25" cy={y} r="3" strokeWidth="1" />
            <circle cx="75" cy={y} r="3" strokeWidth="1" />
          </g>
        ))}

        {/* Arcade arches - spanning horizontally between nave wall and column */}
        {[25, 40, 55, 70].map((y, i) => (
          <g key={i}>
            {/* Left arcade: arch from wall (x=20) to column (x=25), shown as pointed arch viewed from above */}
            <path d={`M20 ${y+1} Q22 ${y-2}, 25 ${y+1}`} strokeWidth="0.9" />
            <path d={`M20 ${y+14} Q22 ${y+11}, 25 ${y+14}`} strokeWidth="0.9" />
            {/* Left: inner arch ring */}
            <path d={`M20 ${y+1} L20 ${y+14}`} strokeWidth="0.6" opacity="0.5" />

            {/* Right arcade: arch from column (x=75) to wall (x=80) */}
            <path d={`M75 ${y+1} Q78 ${y-2}, 80 ${y+1}`} strokeWidth="0.9" />
            <path d={`M75 ${y+14} Q78 ${y+11}, 80 ${y+14}`} strokeWidth="0.9" />
            {/* Right: inner arch ring */}
            <path d={`M80 ${y+1} L80 ${y+14}`} strokeWidth="0.6" opacity="0.5" />
          </g>
        ))}

        {/* Central axis */}
        <path d="M50 10 L50 90" strokeWidth="0.5" opacity="0.3" />

        {/* Pews suggestion */}
        {[30, 42, 54, 66, 78].map((y, i) => (
          <g key={i}>
            <path d={`M32 ${y} L48 ${y}`} strokeWidth="0.8" />
            <path d={`M52 ${y} L68 ${y}`} strokeWidth="0.8" />
          </g>
        ))}

        {/* Clerestory windows suggestion */}
        <path d="M22 18 L22 22" opacity="0.5" strokeWidth="0.7" />
        <path d="M22 35 L22 39" opacity="0.5" strokeWidth="0.7" />
        <path d="M22 52 L22 56" opacity="0.5" strokeWidth="0.7" />
        <path d="M78 18 L78 22" opacity="0.5" strokeWidth="0.7" />
        <path d="M78 35 L78 39" opacity="0.5" strokeWidth="0.7" />
        <path d="M78 52 L78 56" opacity="0.5" strokeWidth="0.7" />

        {/* Vault ribs suggestion */}
        <path d="M20 15 Q50 12, 80 15" strokeWidth="0.5" opacity="0.4" />
        <path d="M20 30 Q50 27, 80 30" strokeWidth="0.5" opacity="0.4" />
        <path d="M20 45 Q50 42, 80 45" strokeWidth="0.5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

// 13. Sanctuary - holiest part of church
// Reference: Chartres Cathedral - Sanctuary with high altar
const SanctuarySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sanctuary-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#sanctuary-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Chancel arch and floor */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M20 90 L80 90" />
        <path d="M15 85 Q15 80, 20 80 L80 80 Q85 80, 85 85" />
        <path d="M10 90 L10 85" />
        <path d="M90 90 L90 85" />
      </g>

      {/* PRIMARY: Sanctuary area */}
      <g strokeWidth="1">
        {/* Apse/sanctuary area */}
        <path d="M25 85 L25 35 Q50 15, 75 35 L75 85" strokeWidth="1.2" />

        {/* Sanctuary step */}
        <path d="M20 85 L80 85" strokeWidth="1.3" />
        <path d="M22 88 L78 88" />

        {/* High altar */}
        <path d="M40 55 L60 55 L60 62 L40 62 Z" strokeWidth="1.3" />
        <path d="M42 62 L42 68 L58 68 L58 62" strokeWidth="1.1" />
        <path d="M43 58 L57 58" strokeWidth="0.5" />

        {/* Tabernacle on altar */}
        <path d="M47 50 L47 55 L53 55 L53 50 Q50 47, 47 50" strokeWidth="1.2" />
        <circle cx="50" cy="52" r="1" strokeWidth="0.6" />

        {/* Altar cross */}
        <path d="M50 35 L50 48" strokeWidth="1.4" />
        <path d="M45 40 L55 40" strokeWidth="1.4" />

        {/* Sanctuary lamp */}
        <path d="M65 40 L65 45" strokeWidth="0.8" />
        <ellipse cx="65" cy="47" rx="3" ry="2" strokeWidth="0.9" />
        <path d="M63 47 Q65 45, 67 47" strokeWidth="0.4" opacity="0.6" />

        {/* Credence table */}
        <path d="M30 60 L30 70 L38 70 L38 60 Z" />
        <path d="M32 65 L36 65" strokeWidth="0.5" />

        {/* Sedilia (priest seats) */}
        <path d="M78 50 L78 75 L72 75 L72 50" opacity="0.7" strokeWidth="0.9" />
        <path d="M75 55 L75 72" strokeWidth="0.5" />
        <path d="M75 60 L75 65" strokeWidth="0.6" />

        {/* Reredos */}
        <path d="M35 35 Q50 28, 65 35" strokeWidth="1.1" />
        <path d="M40 33 L40 40" strokeWidth="0.5" />
        <path d="M50 30 L50 40" strokeWidth="0.5" />
        <path d="M60 33 L60 40" strokeWidth="0.5" />

        {/* Sacred rays */}
        <path d="M50 25 L50 30" strokeWidth="0.6" opacity="0.5" />
        <path d="M45 27 L47 32" strokeWidth="0.5" opacity="0.5" />
        <path d="M55 27 L53 32" strokeWidth="0.5" opacity="0.5" />
        <path d="M43 30 L45 34" strokeWidth="0.4" opacity="0.4" />
        <path d="M57 30 L55 34" strokeWidth="0.4" opacity="0.4" />
      </g>
    </g>
  </svg>
)

// 14. Spire - tall pointed structure on tower
// Reference: Salisbury Cathedral - England's tallest spire (404 ft)
const SpireSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="spire-halo" intensity={1} />}
    <g filter={showHalo ? "url(#spire-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Tower base */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M25 95 L75 95" />
        <path d="M25 85 L25 95" />
        <path d="M75 85 L75 95" />
      </g>

      {/* PRIMARY: Spire structure */}
      <g strokeWidth="1">
        {/* Tower base */}
        <path d="M30 95 L30 60 L70 60 L70 95" strokeWidth="1.2" />
        <path d="M25 95 L75 95" strokeWidth="1.3" />

        {/* Tower top/belfry */}
        <path d="M32 60 L32 45 L68 45 L68 60" strokeWidth="1.2" />
        <path d="M28 60 L72 60" strokeWidth="1.3" />

        {/* Belfry openings */}
        <path d="M38 50 L38 58 Q43 54, 48 58 L48 50" strokeWidth="1.1" />
        <path d="M52 50 L52 58 Q57 54, 62 58 L62 50" strokeWidth="1.1" />

        {/* Spire (octagonal pyramidal) */}
        <path d="M32 45 L50 5 L68 45" strokeWidth="1.3" />

        {/* Spire edges showing octagonal form */}
        <path d="M35 45 L50 8 L65 45" strokeWidth="0.7" />
        <path d="M50 5 L50 45" strokeWidth="0.6" opacity="0.4" />
        <path d="M38 45 L50 10" strokeWidth="0.5" opacity="0.3" />
        <path d="M62 45 L50 10" strokeWidth="0.5" opacity="0.3" />

        {/* Lucarnes (dormer windows on spire) */}
        <path d="M40 35 L42 30 L44 35" strokeWidth="0.9" />
        <path d="M56 35 L58 30 L60 35" strokeWidth="0.9" />
        <path d="M46 25 L48 20 L50 25" strokeWidth="0.8" />
        <path d="M50 25 L52 20 L54 25" strokeWidth="0.8" />

        {/* Cross finial */}
        <path d="M50 5 L50 0" strokeWidth="1.4" />
        <path d="M47 2 L53 2" strokeWidth="1.4" />

        {/* Crockets on edges */}
        <path d="M38 38 Q36 36, 38 34" strokeWidth="0.7" />
        <path d="M42 28 Q40 26, 42 24" strokeWidth="0.7" />
        <path d="M46 18 Q44 16, 46 14" strokeWidth="0.6" />
        <path d="M62 38 Q64 36, 62 34" strokeWidth="0.7" />
        <path d="M58 28 Q60 26, 58 24" strokeWidth="0.7" />
        <path d="M54 18 Q56 16, 54 14" strokeWidth="0.6" />

        {/* Tower window */}
        <path d="M45 70 L45 85 L55 85 L55 70 Q50 67, 45 70" />
        <path d="M50 70 L50 82" strokeWidth="0.4" />
      </g>
    </g>
  </svg>
)

// 15. Steeple - tower and spire together
// Reference: Old North Church, Boston - Colonial church steeple
const SteepleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="steeple-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#steeple-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Church body */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 75 L5 95 L40 95 L40 75" />
        <path d="M60 75 L60 95 L95 95 L95 75" />
        <path d="M5 70 L40 70" />
        <path d="M60 70 L95 70" />
      </g>

      {/* PRIMARY: Steeple structure */}
      <g strokeWidth="1">
        {/* Tower base */}
        <path d="M35 95 L35 55 L65 55 L65 95" strokeWidth="1.2" />

        {/* Clock stage */}
        <path d="M33 55 L33 42 L67 42 L67 55" strokeWidth="1.2" />
        <path d="M30 55 L70 55" strokeWidth="1.3" />

        {/* Clock face */}
        <circle cx="50" cy="48" r="5" strokeWidth="1.1" />
        <path d="M50 45 L50 48 L52 50" strokeWidth="0.7" />
        <circle cx="50" cy="48" r="1" strokeWidth="0.5" />

        {/* Belfry */}
        <path d="M36 42 L36 32 L64 32 L64 42" strokeWidth="1.2" />
        <path d="M33 42 L67 42" strokeWidth="1.3" />

        {/* Louvered openings */}
        <path d="M40 35 L40 40 L48 40 L48 35" strokeWidth="1" />
        <path d="M52 35 L52 40 L60 40 L60 35" strokeWidth="1" />
        <path d="M42 37 L46 37" strokeWidth="0.4" />
        <path d="M54 37 L58 37" strokeWidth="0.4" />

        {/* Spire */}
        <path d="M36 32 L50 8 L64 32" strokeWidth="1.3" />
        <path d="M38 32 L50 10 L62 32" strokeWidth="0.6" />
        <path d="M50 8 L50 32" strokeWidth="0.5" opacity="0.4" />

        {/* Weathervane */}
        <path d="M50 8 L50 3" strokeWidth="1.2" />
        <path d="M47 5 L53 5 L50 3 Z" strokeWidth="1" />
        <path d="M48 5 L45 5" strokeWidth="0.7" />

        {/* Window below */}
        <path d="M45 65 L45 80 L55 80 L55 65 Q50 62, 45 65" />
        <path d="M50 65 L50 78" strokeWidth="0.4" />

        {/* Entry at base */}
        <path d="M43 85 L43 95 L57 95 L57 85 Q50 82, 43 85" strokeWidth="1.1" />
        <path d="M50 85 L50 95" strokeWidth="0.6" />

        {/* Cornice details */}
        <path d="M30 42 L70 42" strokeWidth="0.6" />
        <path d="M33 32 L67 32" strokeWidth="0.6" />
        <path d="M30 55 L70 55" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// 16. Transept - cross arms of cruciform church
// Reference: York Minster - Gothic transept with rose windows
const TranseptSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="transept-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#transept-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Nave extension */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M40 0 L40 5" />
        <path d="M60 0 L60 5" />
        <path d="M40 95 L40 100" />
        <path d="M60 95 L60 100" />
      </g>

      {/* PRIMARY: Transept arms */}
      <g strokeWidth="1">
        {/* Nave (vertical) */}
        <path d="M40 5 L40 95" strokeWidth="1.2" />
        <path d="M60 5 L60 95" strokeWidth="1.2" />

        {/* Transept arms (horizontal) - emphasized */}
        <path d="M5 35 L95 35" strokeWidth="1.4" />
        <path d="M5 55 L95 55" strokeWidth="1.4" />

        {/* North transept end */}
        <path d="M5 35 L5 55" strokeWidth="1.3" />

        {/* South transept end */}
        <path d="M95 35 L95 55" strokeWidth="1.3" />

        {/* Crossing */}
        <path d="M40 35 L60 35 L60 55 L40 55 Z" strokeWidth="1.6" />

        {/* Transept windows */}
        <path d="M10 40 L10 50 Q15 45, 10 40" strokeWidth="1" />
        <path d="M85 40 L85 50 Q90 45, 85 40" strokeWidth="1" />

        {/* Rose windows at transept ends */}
        <circle cx="12" cy="45" r="6" strokeWidth="1.1" />
        <path d="M12 39 L12 51" strokeWidth="0.5" />
        <path d="M6 45 L18 45" strokeWidth="0.5" />
        <path d="M8 40 L16 50" strokeWidth="0.4" />
        <path d="M8 50 L16 40" strokeWidth="0.4" />

        <circle cx="88" cy="45" r="6" strokeWidth="1.1" />
        <path d="M88 39 L88 51" strokeWidth="0.5" />
        <path d="M82 45 L94 45" strokeWidth="0.5" />
        <path d="M84 40 L92 50" strokeWidth="0.4" />
        <path d="M84 50 L92 40" strokeWidth="0.4" />

        {/* Altars in transept chapels */}
        <path d="M15 50 L25 50 L25 53 L15 53 Z" strokeWidth="0.9" />
        <path d="M75 50 L85 50 L85 53 L75 53 Z" strokeWidth="0.9" />

        {/* Aisles parallel to transept */}
        <path d="M5 30 L40 30" opacity="0.5" strokeWidth="0.7" />
        <path d="M60 30 L95 30" opacity="0.5" strokeWidth="0.7" />
        <path d="M5 60 L40 60" opacity="0.5" strokeWidth="0.7" />
        <path d="M60 60 L95 60" opacity="0.5" strokeWidth="0.7" />

        {/* Vault ribs in transept */}
        <path d="M40 40 L60 50" strokeWidth="0.5" opacity="0.4" />
        <path d="M40 50 L60 40" strokeWidth="0.5" opacity="0.4" />
      </g>
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
