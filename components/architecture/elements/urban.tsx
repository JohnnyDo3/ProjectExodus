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

/**
 * ARCADE - Covered Commercial Passage
 * Architectural Reference: Galleria Vittorio Emanuele II (Milan), Burlington Arcade (London)
 * A covered passageway with arched glass ceiling and shop fronts along both sides
 */
const ArcadeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arcade-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#arcade-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Surrounding streets and buildings */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M2 10 L2 90 M98 10 L98 90" />
        <path d="M2 15 L10 20 M98 15 L90 20" />
        <path d="M2 85 L10 80 M98 85 L90 80" />
      </g>

      {/* PRIMARY - Arcade structure */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Main perspective walls */}
        <path d="M5 15 L30 30 L30 70 L5 85" />
        <path d="M95 15 L70 30 L70 70 L95 85" />
        <path d="M30 30 L70 30" />
        <path d="M30 70 L70 70" />

        {/* Arched glass ceiling */}
        <path d="M30 30 Q50 20, 70 30" strokeWidth={S.P.strokeWidth} />
        <path d="M35 32 Q50 24, 65 32" strokeWidth="0.8" opacity="0.6" />

        {/* Shop fronts along sides */}
        <path d="M10 25 L10 75 L28 68 L28 35 Z" strokeWidth="0.8" />
        <path d="M90 25 L90 75 L72 68 L72 35 Z" strokeWidth="0.8" />

        {/* Shop windows */}
        <path d="M12 35 L12 55 L26 52 L26 38 Z" />
        <path d="M88 35 L88 55 L74 52 L74 38 Z" />

        {/* Back wall shops */}
        <path d="M35 35 L35 65 L48 65 L48 35 Z" strokeWidth="0.8" />
        <path d="M52 35 L52 65 L65 65 L65 35 Z" strokeWidth="0.8" />

        {/* DETAIL: Glass roof ribs */}
        <path d="M30 30 L50 25 L70 30" strokeWidth={S.D.strokeWidthFine} />
        <path d="M40 30 L50 26 L60 30" strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacity} />
      </g>

      {/* DETAIL: Floor paving */}
      <g opacity={S.D.opacitySubtle} strokeWidth={S.D.strokeWidthFine}>
        <path d="M20 85 L40 70" />
        <path d="M50 85 L50 70" />
        <path d="M80 85 L60 70" />
      </g>
    </g>
  </svg>
)

/**
 * BOULEVARD - Tree-Lined Grand Avenue
 * Architectural Reference: Champs-Élysées (Paris), La Rambla (Barcelona)
 * Wide urban thoroughfare with central median and tree-lined pedestrian zones
 */
const BoulevardSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="boulevard-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#boulevard-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Flanking buildings and cityscape */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 50 L5 90 L15 90 L15 65" />
        <path d="M95 50 L95 90 L85 90 L85 65" />
        <path d="M10 20 L10 45 M90 20 L90 45" />
        <path d="M35 25 L65 25" />
      </g>

      {/* PRIMARY - Boulevard roadway */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Main roadway in perspective */}
        <path d="M10 90 L40 40 L60 40 L90 90" strokeWidth={S.P.strokeWidth} />

        {/* Center median */}
        <path d="M45 90 L48 40" strokeWidth="1" />
        <path d="M55 90 L52 40" strokeWidth="1" />
        <path d="M47 85 L53 85" strokeWidth="0.8" />

        {/* Sidewalks */}
        <path d="M12 90 L38 45" strokeWidth="0.8" />
        <path d="M88 90 L62 45" strokeWidth="0.8" />
      </g>

      {/* Trees along boulevard */}
      <g strokeWidth="0.8">
        <circle cx="20" cy="75" r="8" opacity="0.5" />
        <path d="M20 83 L20 90" strokeWidth="1.2" />
        <circle cx="30" cy="60" r="6" opacity="0.5" />
        <path d="M30 66 L30 72" strokeWidth="1" />
        <circle cx="80" cy="75" r="8" opacity="0.5" />
        <path d="M80 83 L80 90" strokeWidth="1.2" />
        <circle cx="70" cy="60" r="6" opacity="0.5" />
        <path d="M70 66 L70 72" strokeWidth="1" />
        <circle cx="50" cy="55" r="5" opacity="0.4" />
        <path d="M50 60 L50 65" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
)

/**
 * BRIDGE - Arched Crossing Structure
 * Architectural Reference: Ponte Vecchio (Florence), Rialto Bridge (Venice)
 * Stone arch bridge spanning water with balustrade and abutments
 */
const BridgeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bridge-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#bridge-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Water and riverbanks */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 70 L5 95 L95 95 L95 70" />
        <path d="M10 85 Q30 82, 50 85 Q70 88, 90 85" />
        <path d="M15 90 Q35 87, 55 90 Q75 93, 85 90" />
        <path d="M2 60 L15 60 M85 60 L98 60" />
      </g>

      {/* PRIMARY - Bridge structure */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Main arch */}
        <path d="M5 60 Q50 20, 95 60" strokeWidth={S.P.strokeWidth} />
        <path d="M5 65 Q50 28, 95 65" strokeWidth="0.8" />

        {/* Bridge deck */}
        <path d="M5 55 L95 55" strokeWidth={S.P.strokeWidth} />
        <path d="M5 60 L95 60" strokeWidth="0.8" />

        {/* Balustrade */}
        <path d="M10 50 L90 50" strokeWidth="1" />
        <path d="M10 55 L90 55" strokeWidth="0.6" />
        {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
          <path key={i} d={`M${x} 50 L${x} 55`} strokeWidth="0.8" />
        ))}

        {/* Arch structure lines */}
        <path d="M20 52 Q35 35, 50 30 Q65 35, 80 52" strokeDasharray="4 2" opacity="0.6" strokeWidth="0.6" />

        {/* Abutments */}
        <path d="M5 60 L5 90 L15 90 L15 65" strokeWidth="1" />
        <path d="M95 60 L95 90 L85 90 L85 65" strokeWidth="1" />

        {/* Keystone */}
        <path d="M47 30 L50 25 L53 30 Z" strokeWidth={S.P.strokeWidth} />
      </g>
    </g>
  </svg>
)

/**
 * FOUNTAIN - Tiered Water Feature
 * Architectural Reference: Trevi Fountain (Rome), Bethesda Fountain (NYC)
 * Multi-tiered fountain with cascading water in plaza setting
 */
const FountainSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="fountain-halo" intensity={1} />}
    <g filter={showHalo ? "url(#fountain-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Surrounding plaza */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 92 L95 92" />
        <path d="M10 90 L20 80 M90 90 L80 80" />
        <ellipse cx="50" cy="80" rx="42" ry="14" />
      </g>

      {/* PRIMARY - Fountain structure */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Base basin */}
        <ellipse cx="50" cy="80" rx="35" ry="12" strokeWidth={S.P.strokeWidth} />
        <ellipse cx="50" cy="80" rx="30" ry="10" strokeWidth="0.6" />

        {/* Middle tier */}
        <ellipse cx="50" cy="55" rx="20" ry="7" strokeWidth="1" />
        <path d="M30 55 L30 65 Q50 70, 70 65 L70 55" strokeWidth="1" />

        {/* Top tier */}
        <ellipse cx="50" cy="35" rx="12" ry="4" strokeWidth="1" />
        <path d="M38 35 L38 42 Q50 48, 62 42 L62 35" strokeWidth="1" />

        {/* Central spout */}
        <path d="M50 35 L50 15" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="15" r="1.5" />
      </g>

      {/* EFFECTS: Water effects */}
      <g strokeDasharray={S.E.dash} opacity={S.E.opacityModerate} strokeWidth={S.E.strokeWidth}>
        {/* Water jets */}
        <path d="M50 15 Q55 10, 60 20 Q62 30, 58 40" />
        <path d="M50 15 Q45 10, 40 20 Q38 30, 42 40" />
        <path d="M50 15 Q50 8, 50 18" />
        {/* Cascading water */}
        <path d="M62 42 Q65 48, 68 55" />
        <path d="M38 42 Q35 48, 32 55" />
        <path d="M70 60 Q75 68, 78 75" />
        <path d="M30 60 Q25 68, 22 75" />
      </g>

      {/* Ground line */}
      <path d="M10 92 L90 92" strokeWidth="1" />
    </g>
  </svg>
)

/**
 * KIOSK - Small Retail Pavilion
 * Architectural Reference: Paris Metro Kiosks, News Stands
 * Freestanding domed structure with open counter for retail
 */
const KioskSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="kiosk-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#kiosk-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Surrounding street */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M10 85 L90 85" />
        <path d="M5 80 L15 80 M85 80 L95 80" />
        <path d="M15 30 L15 35 M85 30 L85 35" />
      </g>

      {/* PRIMARY - Kiosk structure */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Domed roof */}
        <path d="M20 35 Q50 10, 80 35" strokeWidth={S.P.strokeWidth} />
        <path d="M25 35 Q50 15, 75 35" strokeWidth="0.6" />

        {/* Finial */}
        <path d="M50 10 L50 5" strokeWidth={S.P.strokeWidth} />
        <circle cx="50" cy="4" r="2" strokeWidth="0.8" />

        {/* Main body - octagonal form */}
        <path d="M25 35 L25 75 L35 80 L65 80 L75 75 L75 35" strokeWidth={S.P.strokeWidth} />

        {/* Counter opening */}
        <path d="M30 45 L30 70 L70 70 L70 45" strokeWidth="1" />
        <path d="M32 47 L68 47" strokeWidth="0.6" />

        {/* Side panels */}
        <path d="M20 35 L20 75 L25 75" strokeWidth="0.8" opacity="0.5" />
        <path d="M80 35 L80 75 L75 75" strokeWidth="0.8" opacity="0.5" />

        {/* Base */}
        <path d="M18 75 L82 75 L85 85 L15 85 Z" strokeWidth="1" />
      </g>

      {/* DETAIL: Interior shelves */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M35 55 L65 55" />
        <path d="M35 62 L65 62" />
        <path d="M40 58 L45 58 L45 62 L40 62 Z" opacity="0.5" />
        <path d="M55 58 L60 58 L60 62 L55 62 Z" opacity="0.5" />
      </g>

      {/* Ground line */}
      <path d="M10 85 L90 85" strokeWidth="1" />
    </g>
  </svg>
)

/**
 * PLAZA - Open Urban Square
 * Architectural Reference: Piazza del Campo (Siena), Times Square (NYC)
 * Open paved public space with central monument and surrounding buildings
 */
const PlazaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="plaza-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#plaza-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Surrounding buildings */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 30 L5 75 L15 70 L15 40" />
        <path d="M95 30 L95 75 L85 70 L85 40" />
        <path d="M35 25 L35 40 L65 40 L65 25" />
        <path d="M20 35 L20 40 M80 35 L80 40" />
      </g>

      {/* PRIMARY - Plaza paving and space */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Main plaza boundary in perspective */}
        <path d="M10 80 L50 40 L90 80" strokeWidth={S.P.strokeWidth} />
        <path d="M10 80 L90 80" strokeWidth={S.P.strokeWidth} />

        {/* Paving pattern grid */}
        <path d="M25 80 L50 55 L75 80" strokeWidth="0.8" />
        <path d="M35 80 L50 65 L65 80" strokeWidth="0.8" />
        <path d="M20 65 L80 65" strokeWidth="0.6" opacity="0.5" />
        <path d="M30 55 L70 55" strokeWidth="0.6" opacity="0.5" />

        {/* Central monument/statue */}
        <path d="M45 50 L45 65 L55 65 L55 50" strokeWidth={S.P.strokeWidth} />
        <path d="M47 45 Q50 40, 53 45 L53 50 L47 50 Z" strokeWidth="0.8" opacity="0.6" />
        <path d="M43 65 L43 68 L57 68 L57 65" strokeWidth="1" />
      </g>

      {/* Benches and trees */}
      <g strokeWidth="0.8">
        <path d="M20 72 L30 68 L30 72 L20 75 Z" opacity="0.5" />
        <path d="M70 72 L80 68 L80 72 L70 75 Z" opacity="0.5" />
        <circle cx="18" cy="58" r="5" opacity="0.4" />
        <circle cx="82" cy="58" r="5" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * PROMENADE - Elevated Waterfront Walk
 * Architectural Reference: Brooklyn Heights Promenade, Nice Promenade
 * Elevated pedestrian walkway with balustrade overlooking water or landscape
 */
const PromenadeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="promenade-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#promenade-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Sea/view beyond and landscape */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M30 25 Q50 20, 70 25" />
        <path d="M35 30 Q50 26, 65 30" />
        <path d="M20 35 L20 45 M80 35 L80 45" />
        <path d="M5 85 L95 85" />
      </g>

      {/* PRIMARY - Promenade walkway */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Walkway deck in perspective */}
        <path d="M5 85 L40 45 L60 45 L95 85" strokeWidth={S.P.strokeWidth} />
        <path d="M5 85 L95 85" strokeWidth={S.P.strokeWidth} />

        {/* Balustrade */}
        <path d="M5 80 L95 80" strokeWidth="1" />
        <path d="M5 75 L95 75" strokeWidth="0.8" />
        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
          <path key={i} d={`M${x} 75 L${x} 80`} strokeWidth="0.8" />
        ))}

        {/* Lamp posts */}
        <path d="M20 65 L20 75" strokeWidth="1.2" />
        <ellipse cx="20" cy="63" rx="3" ry="2" strokeWidth="0.8" />
        <path d="M80 65 L80 75" strokeWidth="1.2" />
        <ellipse cx="80" cy="63" rx="3" ry="2" strokeWidth="0.8" />

        {/* Benches */}
        <path d="M35 78 L45 78 L45 82 L35 82 Z" strokeWidth="0.8" />
        <path d="M55 78 L65 78 L65 82 L55 82 Z" strokeWidth="0.8" />
      </g>

      {/* DETAIL: Paving lines */}
      <g opacity={S.D.opacitySubtle} strokeWidth={S.D.strokeWidthFine}>
        <path d="M50 85 L50 50" />
        <path d="M25 82 L30 60 M75 82 L70 60" />
      </g>

      {/* View edge */}
      <path d="M40 45 L40 30 M60 45 L60 30" opacity="0.3" strokeWidth="0.8" />
    </g>
  </svg>
)

/**
 * SQUARE - Urban Public Space
 * Architectural Reference: Trafalgar Square (London), Place des Vosges (Paris)
 * Formal public square with central monument and symmetrical layout
 */
const SquareSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="square-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#square-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Surrounding street */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M0 5 L100 5" />
        <path d="M0 95 L100 95" />
      </g>

      {/* PRIMARY - Formal public square with building facades */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Building facades enclosing the square (Place des Vosges style) */}
        {/* Left facade with arcade */}
        <path d="M5 10 L5 90" strokeWidth={S.P.strokeWidthBold} />
        <path d="M15 10 L15 90" strokeWidth={S.P.strokeWidth} />
        {/* Arcade arches */}
        <path d="M5 25 Q10 20, 15 25" strokeWidth="0.8" />
        <path d="M5 40 Q10 35, 15 40" strokeWidth="0.8" />
        <path d="M5 55 Q10 50, 15 55" strokeWidth="0.8" />
        <path d="M5 70 Q10 65, 15 70" strokeWidth="0.8" />
        {/* Upper windows */}
        <path d="M7 15 L13 15 L13 22 L7 22 Z" strokeWidth="0.5" opacity="0.5" />

        {/* Right facade with arcade */}
        <path d="M85 10 L85 90" strokeWidth={S.P.strokeWidth} />
        <path d="M95 10 L95 90" strokeWidth={S.P.strokeWidthBold} />
        <path d="M85 25 Q90 20, 95 25" strokeWidth="0.8" />
        <path d="M85 40 Q90 35, 95 40" strokeWidth="0.8" />
        <path d="M85 55 Q90 50, 95 55" strokeWidth="0.8" />
        <path d="M85 70 Q90 65, 95 70" strokeWidth="0.8" />
        <path d="M87 15 L93 15 L93 22 L87 22 Z" strokeWidth="0.5" opacity="0.5" />

        {/* Top facade */}
        <path d="M15 10 L85 10" strokeWidth={S.P.strokeWidth} />
        <path d="M15 18 L85 18" strokeWidth={S.P.strokeWidthLight} />
        <path d="M25 10 Q30 6, 35 10" strokeWidth="0.7" />
        <path d="M45 10 Q50 6, 55 10" strokeWidth="0.7" />
        <path d="M65 10 Q70 6, 75 10" strokeWidth="0.7" />

        {/* Bottom facade */}
        <path d="M15 90 L85 90" strokeWidth={S.P.strokeWidth} />
        <path d="M15 82 L85 82" strokeWidth={S.P.strokeWidthLight} />
        <path d="M25 90 Q30 86, 35 90" strokeWidth="0.7" />
        <path d="M45 90 Q50 86, 55 90" strokeWidth="0.7" />
        <path d="M65 90 Q70 86, 75 90" strokeWidth="0.7" />

        {/* Central monument/equestrian statue */}
        <path d="M45 42 L45 62 L55 62 L55 42" strokeWidth={S.P.strokeWidth} />
        <path d="M42 62 L42 68 L58 68 L58 62" strokeWidth="1" />
        <path d="M50 42 L50 32" strokeWidth={S.P.strokeWidth} />
        <path d="M47 34 L53 34" strokeWidth="1" />
        <circle cx="50" cy="32" r="2" strokeWidth="0.8" />
      </g>

      {/* DETAIL: Paths crossing square in cruciform */}
      <g strokeWidth={S.D.strokeWidth} opacity={S.D.opacity}>
        <path d="M50 18 L50 42" />
        <path d="M50 68 L50 82" />
        <path d="M15 50 L42 50" />
        <path d="M58 50 L85 50" />
      </g>

      {/* DETAIL: Formal garden beds in quadrants */}
      <g strokeWidth={S.D.strokeWidthFine} opacity={S.D.opacitySubtle}>
        <path d="M22 26 L38 26 L38 42 L22 42 Z" />
        <path d="M62 26 L78 26 L78 42 L62 42 Z" />
        <path d="M22 58 L38 58 L38 74 L22 74 Z" />
        <path d="M62 58 L78 58 L78 74 L62 74 Z" />
        {/* Hedge/tree dots */}
        <circle cx="30" cy="34" r="4" />
        <circle cx="70" cy="34" r="4" />
        <circle cx="30" cy="66" r="4" />
        <circle cx="70" cy="66" r="4" />
      </g>
    </g>
  </svg>
)

/**
 * STREET - Urban Roadway
 * Architectural Reference: Typical city street section with buildings
 * Perspective view of urban street with buildings, sidewalks, and infrastructure
 */
const StreetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="street-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#street-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (near): Flanking buildings */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M5 40 L5 90 L18 90 L18 55" />
        <path d="M95 40 L95 90 L82 90 L82 55" />
        <path d="M2 35 L8 45 M98 35 L92 45" />
      </g>

      {/* PRIMARY - Street roadway */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Street edges in perspective */}
        <path d="M20 90 L45 30" strokeWidth={S.P.strokeWidth} />
        <path d="M80 90 L55 30" strokeWidth={S.P.strokeWidth} />

        {/* Center line */}
        <path d="M50 90 L50 30" strokeDasharray="5 5" strokeWidth="1" />

        {/* Sidewalks */}
        <path d="M10 90 L40 30" strokeWidth="0.8" />
        <path d="M90 90 L60 30" strokeWidth="0.8" />
      </g>

      {/* Buildings - windows */}
      <g strokeWidth="0.8">
        <path d="M8 45 L8 60 L15 58 L15 48 Z" />
        <path d="M8 65 L8 85 L15 82 L15 62 Z" />
        <path d="M92 45 L92 60 L85 58 L85 48 Z" />
        <path d="M92 65 L92 85 L85 82 L85 62 Z" />
      </g>

      {/* Street infrastructure */}
      <g strokeWidth="0.8">
        {/* Street lamps */}
        <path d="M25 65 L25 75" strokeWidth="1" />
        <circle cx="25" cy="63" r="2" />
        <path d="M75 65 L75 75" strokeWidth="1" />
        <circle cx="75" cy="63" r="2" />

        {/* Crosswalk */}
        <path d="M35 85 L65 85" strokeWidth="1" />
        <path d="M36 87 L64 87" strokeWidth="1" />
        <path d="M37 89 L63 89" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * WATERFRONT - Harbor Edge Development
 * Architectural Reference: Sydney Harbor, San Francisco Embarcadero
 * Quay/wharf with promenade, buildings behind, and water access
 */
const WaterfrontSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="waterfront-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#waterfront-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT (far): Water and distant shore */}
      <g strokeDasharray={S.CF.dash} opacity={S.CF.opacity} strokeWidth={S.CF.strokeWidth}>
        <path d="M5 65 Q20 62, 35 65 Q50 68, 65 65 Q80 62, 95 65" />
        <path d="M5 75 Q25 72, 45 75 Q65 78, 85 75" />
        <path d="M5 85 Q30 82, 55 85 Q80 88, 95 85" />
        <path d="M5 95 L95 95" />
      </g>

      {/* CONTEXT (near): Buildings behind */}
      <g strokeDasharray={S.CN.dash} opacity={S.CN.opacity} strokeWidth={S.CN.strokeWidth}>
        <path d="M10 25 L10 50 L30 50 L30 30" />
        <path d="M35 20 L35 50 L55 50 L55 25" />
        <path d="M60 30 L60 50 L85 50 L85 35" />
      </g>

      {/* PRIMARY - Quay/dock edge and promenade */}
      <g strokeWidth={S.P.strokeWidthLight}>
        {/* Quay edge */}
        <path d="M5 55 L95 55" strokeWidth={S.P.strokeWidthBold} />
        <path d="M5 58 L95 58" strokeWidth="1" />

        {/* Promenade */}
        <path d="M5 50 L95 50" strokeWidth={S.P.strokeWidth} />

        {/* Bollards */}
        <path d="M15 52 L15 55" strokeWidth={S.P.strokeWidthBold} />
        <path d="M35 52 L35 55" strokeWidth={S.P.strokeWidthBold} />
        <path d="M55 52 L55 55" strokeWidth={S.P.strokeWidthBold} />
        <path d="M75 52 L75 55" strokeWidth={S.P.strokeWidthBold} />
        <circle cx="15" cy="51" r="2" strokeWidth="0.8" />
        <circle cx="35" cy="51" r="2" strokeWidth="0.8" />
        <circle cx="55" cy="51" r="2" strokeWidth="0.8" />
        <circle cx="75" cy="51" r="2" strokeWidth="0.8" />

        {/* Lamp posts */}
        <path d="M25 42 L25 50" strokeWidth="1" />
        <ellipse cx="25" cy="40" rx="3" ry="2" strokeWidth="0.8" />
        <path d="M65 42 L65 50" strokeWidth="1" />
        <ellipse cx="65" cy="40" rx="3" ry="2" strokeWidth="0.8" />
      </g>

      {/* Boat/vessel */}
      <g strokeWidth="0.8">
        <path d="M65 70 Q70 65, 80 68 Q85 72, 80 75 L68 75 Q62 72, 65 70" />
        <path d="M72 68 L72 60" strokeWidth="1" />
        <path d="M72 60 L76 62" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

// Export mapping for all urban elements
export const URBAN_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'arcade': ArcadeSVG,
  'boulevard': BoulevardSVG,
  'bridge': BridgeSVG,
  'fountain': FountainSVG,
  'kiosk': KioskSVG,
  'plaza': PlazaSVG,
  'promenade': PromenadeSVG,
  'square': SquareSVG,
  'street': StreetSVG,
  'waterfront': WaterfrontSVG,
}

export {
  ArcadeSVG,
  BoulevardSVG,
  BridgeSVG,
  FountainSVG,
  KioskSVG,
  PlazaSVG,
  PromenadeSVG,
  SquareSVG,
  StreetSVG,
  WaterfrontSVG,
}
