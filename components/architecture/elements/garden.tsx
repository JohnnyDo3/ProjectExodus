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
 * ARBOR - Garden Archway Structure
 * Architectural garden feature with trained climbing plants
 * Reference: Renaissance pergola design, classical garden architecture
 */
const ArborSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="arbor-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#arbor-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding garden and ground plane */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 90 L95 90" />
        <path d="M10 88 Q20 85, 30 88" />
        <path d="M70 88 Q80 85, 90 88" />
        <ellipse cx="15" cy="75" rx="8" ry="5" />
        <ellipse cx="85" cy="75" rx="8" ry="5" />
        <path d="M30 93 L70 93" />
      </g>

      {/* PRIMARY: Arbor structure */}
      <g strokeWidth="0.8">
        {/* Main vertical posts */}
        <path d="M20 30 L20 90" strokeWidth="1.2" />
        <path d="M25 30 L25 90" strokeWidth="1.2" />
        <path d="M75 30 L75 90" strokeWidth="1.2" />
        <path d="M80 30 L80 90" strokeWidth="1.2" />

        {/* Arched overhead structure */}
        <path d="M20 30 Q50 5, 80 30" strokeWidth="1.2" />
        <path d="M25 30 Q50 10, 75 30" strokeWidth="1.2" />

        {/* Cross lattice on arch */}
        <path d="M30 25 Q50 8, 70 25" />
        <path d="M35 22 Q50 12, 65 22" />

        {/* Vertical slats */}
        <path d="M40 18 L40 30" />
        <path d="M50 12 L50 30" />
        <path d="M60 18 L60 30" />

        {/* Climbing vines - trained growth */}
        <path d="M22 50 Q27 45, 24 55 Q30 52, 28 62 Q33 58, 30 68" opacity="0.6" />
        <path d="M78 50 Q73 45, 76 55 Q70 52, 72 62 Q67 58, 70 68" opacity="0.6" />
        <path d="M35 20 Q40 15, 45 18 Q50 12, 55 18 Q60 15, 65 20" opacity="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * COLONNADE - Classical Column Arcade
 * Series of regularly spaced columns supporting an entablature
 * Reference: Greek stoa, Roman portico, Renaissance loggia
 */
const ColonnadeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="colonnade-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#colonnade-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Garden beyond columns */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M10 50 Q25 48, 40 50 Q55 52, 70 50 Q85 48, 95 50" />
        <ellipse cx="30" cy="60" rx="10" ry="6" />
        <ellipse cx="70" cy="65" rx="12" ry="7" />
        <path d="M5 90 L5 20" />
        <path d="M95 90 L95 20" />
      </g>

      {/* PRIMARY: Colonnade structure */}
      <g strokeWidth="0.8">
        {/* Entablature */}
        <path d="M5 20 L95 20" strokeWidth="1.5" />
        <path d="M5 25 L95 25" strokeWidth="1" />

        {/* Individual columns with classical details */}
        {[15, 35, 55, 75].map((x, i) => (
          <g key={i}>
            {/* Column shaft */}
            <path d={`M${x-3} 25 L${x-3} 85 Q${x} 88, ${x+3} 85 L${x+3} 25`} strokeWidth="1" />

            {/* Capital */}
            <path d={`M${x-5} 25 L${x+5} 25 L${x+4} 28 L${x-4} 28 Z`} strokeWidth="1" />

            {/* Base */}
            <path d={`M${x-4} 85 L${x+4} 85 L${x+5} 90 L${x-5} 90 Z`} strokeWidth="1" />

            {/* Entasis line */}
            <path d={`M${x} 30 L${x} 82`} strokeWidth="0.3" opacity="0.3" />
          </g>
        ))}

        {/* Stylobate/floor */}
        <path d="M5 90 L95 90" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * ESPALIER - Trained Flat Fruit Tree
 * Horticultural technique for growing trees in formal flat planes
 * Reference: French parterre gardens, Renaissance villa gardens
 */
const EspalierSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="espalier-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#espalier-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Wall and garden setting */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M10 10 L90 10 L90 85 L10 85 Z" />
        <path d="M5 85 L5 10" />
        <path d="M95 85 L95 10" />
        <path d="M15 88 Q25 86, 35 88" />
        <path d="M65 88 Q75 86, 85 88" />
      </g>

      {/* PRIMARY: Espalier training structure */}
      <g strokeWidth="0.8">
        {/* Main trunk */}
        <path d="M50 85 L50 25" strokeWidth="1.5" />

        {/* Horizontal trained branches */}
        <path d="M20 70 L80 70" strokeWidth="1.2" />
        <path d="M25 50 L75 50" strokeWidth="1.2" />
        <path d="M30 35 L70 35" strokeWidth="1.2" />

        {/* Training wire supports */}
        <path d="M50 25 L35 35" strokeWidth="0.5" opacity="0.6" />
        <path d="M50 25 L65 35" strokeWidth="0.5" opacity="0.6" />
        <path d="M35 35 L20 50" strokeWidth="0.4" opacity="0.6" />
        <path d="M65 35 L80 50" strokeWidth="0.4" opacity="0.6" />

        {/* Fruit positions */}
        <circle cx="25" cy="70" r="3" strokeWidth="1" />
        <circle cx="40" cy="70" r="3" strokeWidth="1" />
        <circle cx="60" cy="70" r="3" strokeWidth="1" />
        <circle cx="75" cy="70" r="3" strokeWidth="1" />
        <circle cx="30" cy="50" r="2.5" strokeWidth="1" />
        <circle cx="50" cy="50" r="2.5" strokeWidth="1" />
        <circle cx="70" cy="50" r="2.5" strokeWidth="1" />
        <circle cx="35" cy="35" r="2" strokeWidth="1" />
        <circle cx="55" cy="35" r="2" strokeWidth="1" />

        {/* Ground line */}
        <path d="M10 85 L90 85" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * FOLLY - Decorative Ruined Structure
 * Ornamental garden building, often mimicking classical ruins
 * Reference: 18th century picturesque landscape design, romantic gardens
 */
const FollySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="folly-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#folly-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Romantic landscape setting */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 88 Q15 86, 25 88 Q40 90, 55 88" />
        <path d="M70 88 Q80 86, 90 88" />
        <ellipse cx="85" cy="70" rx="8" ry="5" />
        <path d="M5 75 Q10 72, 15 75" />
        <path d="M5 90 L95 90" />
      </g>

      {/* PRIMARY: Folly structure - ruined temple */}
      <g strokeWidth="0.8">
        {/* Standing columns */}
        <path d="M15 35 L15 85" strokeWidth="1.5" />
        <path d="M35 35 L35 85" strokeWidth="1.5" />
        <path d="M55 40 L55 85" strokeWidth="1.2" />

        {/* Broken column with capital */}
        <path d="M75 60 L75 85" strokeWidth="1.2" />
        <path d="M75 55 Q78 52, 77 48 L72 46" strokeWidth="1" />
        <path d="M72 55 L78 55 L79 58 L71 58 Z" strokeWidth="0.8" />

        {/* Partial pediment */}
        <path d="M10 35 L25 20 L40 35" strokeWidth="1" />
        <path d="M10 35 L40 35" strokeWidth="1.2" />
        <path d="M22 27 L28 27" strokeWidth="0.5" opacity="0.5" />

        {/* Fallen architectural fragments */}
        <path d="M60 82 L68 80 L70 85 L62 87 Z" strokeWidth="0.8" />
        <path d="M78 78 L82 76 L85 80 L81 82 Z" strokeWidth="0.8" />

        {/* Vegetation growing on ruins */}
        <path d="M35 45 Q40 42, 38 48 Q42 46, 40 52" opacity="0.5" />
        <path d="M15 50 Q12 48, 14 45 Q11 43, 13 40" opacity="0.5" />
        <path d="M56 50 Q58 47, 60 50" opacity="0.5" />

        {/* Base platform */}
        <path d="M8 85 L92 85" strokeWidth="1" />
        <path d="M8 88 L92 88" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * GAZEBO - Octagonal Garden Pavilion
 * Freestanding open-sided structure for viewing garden
 * Reference: Victorian garden architecture, Chinese pagoda influence
 */
const GazeboSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gazebo-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#gazebo-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding garden paths and lawn */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 95 L20 95" />
        <path d="M80 95 L95 95" />
        <ellipse cx="15" cy="85" rx="10" ry="5" />
        <ellipse cx="85" cy="85" rx="10" ry="5" />
        <path d="M40 98 Q50 96, 60 98" />
      </g>

      {/* PRIMARY: Gazebo structure */}
      <g strokeWidth="0.8">
        {/* Octagonal roof outline */}
        <path d="M50 10 L70 25 L80 50 L70 60 L50 65 L30 60 L20 50 L30 25 Z" strokeWidth="1" />

        {/* Roof structural lines */}
        <path d="M50 10 L50 65" strokeWidth="0.4" />
        <path d="M70 25 L30 60" strokeWidth="0.4" />
        <path d="M80 50 L20 50" strokeWidth="0.4" />
        <path d="M70 60 L30 25" strokeWidth="0.4" />

        {/* Decorative roof finial */}
        <path d="M50 10 L50 5" strokeWidth="1.2" />
        <circle cx="50" cy="4" r="2" strokeWidth="1" />
        <path d="M48 6 L52 6" strokeWidth="0.8" />

        {/* Supporting posts */}
        <path d="M30 60 L30 90" strokeWidth="1.2" />
        <path d="M50 65 L50 90" strokeWidth="1.2" />
        <path d="M70 60 L70 90" strokeWidth="1.2" />

        {/* Railings */}
        <path d="M30 78 L50 80 L70 78" strokeWidth="1" />
        <path d="M30 85 L50 87 L70 85" strokeWidth="1" />

        {/* Balusters */}
        <path d="M38 78 L38 85" strokeWidth="0.6" />
        <path d="M43 79 L43 86" strokeWidth="0.6" />
        <path d="M58 79 L58 86" strokeWidth="0.6" />
        <path d="M63 78 L63 85" strokeWidth="0.6" />

        {/* Floor platform */}
        <path d="M25 90 L75 90 L78 93 L22 93 Z" strokeWidth="1" />

        {/* Entry steps */}
        <path d="M45 93 L45 98 L55 98 L55 93" strokeWidth="1" />
        <path d="M47 95 L53 95" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * GROTTO - Artificial Cave Structure
 * Ornamental cave with water features, often decorated with shells
 * Reference: Renaissance nymphaeum, Baroque garden grottos
 */
const GrottoSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="grotto-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#grotto-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding rock formation and landscape */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 85 L5 70 Q8 60, 12 55" />
        <path d="M95 85 L95 70 Q92 60, 88 55" />
        <path d="M5 85 L15 85" />
        <path d="M85 85 L95 85" />
        <ellipse cx="12" cy="88" rx="8" ry="4" />
        <ellipse cx="88" cy="88" rx="8" ry="4" />
      </g>

      {/* PRIMARY: Grotto structure */}
      <g strokeWidth="0.8">
        {/* Outer rocky opening */}
        <path d="M15 85 L10 60 Q15 40, 30 30 Q50 15, 70 30 Q85 40, 90 60 L85 85" strokeWidth="1.2" />

        {/* Inner cave chamber */}
        <path d="M25 82 L22 65 Q30 50, 45 42 Q55 38, 70 50 Q78 62, 75 82" strokeWidth="1" />

        {/* Rock texture and fissures */}
        <path d="M18 55 L25 58 L23 62" strokeWidth="0.6" />
        <path d="M35 35 L40 40 L38 44" strokeWidth="0.6" />
        <path d="M65 38 L70 45 L68 48" strokeWidth="0.6" />
        <path d="M80 58 L75 62 L77 66" strokeWidth="0.6" />

        {/* Stalactites */}
        <path d="M35 45 L37 52 L36 54" strokeWidth="0.8" />
        <path d="M50 40 L52 50 L51 53" strokeWidth="0.8" />
        <path d="M62 45 L60 52 L61 55" strokeWidth="0.8" />

        {/* Water pool at base */}
        <ellipse cx="50" cy="80" rx="25" ry="8" strokeWidth="1" />
        <path d="M35 78 Q45 82, 55 78 Q65 74, 75 78" strokeWidth="0.5" opacity="0.5" />
        <path d="M40 79 Q50 80, 60 79" strokeWidth="0.4" opacity="0.4" />

        {/* Shell and mineral decorations */}
        <circle cx="28" cy="70" r="3" strokeWidth="0.8" />
        <path d="M26 70 L30 70" strokeWidth="0.4" />
        <circle cx="72" cy="70" r="3" strokeWidth="0.8" />
        <path d="M70 70 L74 70" strokeWidth="0.4" />

        {/* Ground line */}
        <path d="M5 85 L95 85" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * HEDGE - Formally Trimmed Garden Boundary
 * Shaped and maintained evergreen planting for structure
 * Reference: French formal gardens, Tudor knot gardens, parterres
 */
const HedgeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="hedge-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#hedge-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding garden beds and paths */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 85 L10 85" />
        <path d="M90 85 L95 85" />
        <path d="M5 50 L8 50" />
        <path d="M92 50 L95 50" />
        <ellipse cx="25" cy="90" rx="12" ry="4" />
        <ellipse cx="75" cy="90" rx="12" ry="4" />
      </g>

      {/* PRIMARY: Formal hedge structure */}
      <g strokeWidth="0.8">
        {/* Main hedge outline - rectangular with scalloped top */}
        <path d="M10 40 L10 85 L90 85 L90 40 Q80 35, 70 40 Q60 35, 50 40 Q40 35, 30 40 Q20 35, 10 40" strokeWidth="1.2" />

        {/* Top trimmed surface */}
        <path d="M12 42 Q20 38, 30 42 Q40 38, 50 42 Q60 38, 70 42 Q80 38, 88 42" strokeWidth="1" />

        {/* Foliage texture details */}
        <path d="M20 50 Q25 48, 28 52 Q26 55, 30 54" strokeWidth="0.5" opacity="0.5" />
        <path d="M40 55 Q45 52, 48 56 Q46 59, 50 58" strokeWidth="0.5" opacity="0.5" />
        <path d="M60 48 Q65 45, 68 50 Q66 53, 70 52" strokeWidth="0.5" opacity="0.5" />
        <path d="M75 60 Q80 57, 82 62 Q80 65, 84 64" strokeWidth="0.5" opacity="0.5" />
        <path d="M30 70 Q35 68, 38 72 Q36 75, 40 74" strokeWidth="0.5" opacity="0.5" />
        <path d="M55 75 Q60 72, 63 76 Q61 79, 65 78" strokeWidth="0.5" opacity="0.5" />

        {/* Arched opening in hedge */}
        <path d="M40 85 L40 55 Q50 50, 60 55 L60 85" strokeWidth="1" />

        {/* Vertical depth lines */}
        <path d="M15 50 L15 80" strokeWidth="0.4" opacity="0.4" />
        <path d="M25 45 L25 82" strokeWidth="0.4" opacity="0.4" />
        <path d="M75 45 L75 82" strokeWidth="0.4" opacity="0.4" />
        <path d="M85 50 L85 80" strokeWidth="0.4" opacity="0.4" />

        {/* Ground line */}
        <path d="M8 85 L92 85" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * LABYRINTH - Ornamental Garden Maze
 * Complex path system for contemplation and entertainment
 * Reference: Hampton Court maze, classical Cretan labyrinth, medieval church labyrinths
 */
const LabyrinthSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="labyrinth-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#labyrinth-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Outer grounds and viewing areas */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 5 L5 95 L10 95 L10 5 Z" />
        <path d="M90 5 L90 95 L95 95 L95 5 Z" />
        <path d="M10 5 L90 5" />
        <ellipse cx="50" cy="3" rx="8" ry="2" />
        <path d="M20 92 Q30 90, 40 92" />
        <path d="M60 92 Q70 90, 80 92" />
      </g>

      {/* PRIMARY: Labyrinth maze structure */}
      <g strokeWidth="0.8">
        {/* Outer boundary wall */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.2" />

        {/* Entrance opening */}
        <path d="M48 90 L52 90" strokeWidth="0" />

        {/* Maze path walls - classical pattern */}
        <path d="M50 85 L50 75" strokeWidth="1" />
        <path d="M20 75 L80 75" strokeWidth="1" />
        <path d="M20 75 L20 25" strokeWidth="1" />
        <path d="M20 25 L80 25" strokeWidth="1" />
        <path d="M80 25 L80 65" strokeWidth="1" />
        <path d="M80 65 L30 65" strokeWidth="1" />
        <path d="M30 65 L30 35" strokeWidth="1" />
        <path d="M30 35 L70 35" strokeWidth="1" />
        <path d="M70 35 L70 55" strokeWidth="1" />
        <path d="M70 55 L40 55" strokeWidth="1" />
        <path d="M40 55 L40 45" strokeWidth="1" />
        <path d="M40 45 L60 45" strokeWidth="1" />
        <path d="M60 45 L60 50" strokeWidth="1" />

        {/* Center goal marker */}
        <circle cx="50" cy="50" r="5" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="3" strokeWidth="0.6" />

        {/* Hedge texture suggestions */}
        <path d="M25 30 Q28 28, 30 30 Q32 29, 34 31" strokeWidth="0.4" opacity="0.4" />
        <path d="M55 40 Q58 38, 60 40 Q62 39, 64 41" strokeWidth="0.4" opacity="0.4" />
        <path d="M35 60 Q38 58, 40 60 Q42 59, 44 61" strokeWidth="0.4" opacity="0.4" />
        <path d="M75 30 Q77 29, 78 31" strokeWidth="0.4" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * OBELISK - Tapering Stone Monument
 * Ancient Egyptian form adapted for garden focal point
 * Reference: Egyptian temple obelisks, Georgian garden monuments, Place de la Concorde
 */
const ObeliskSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="obelisk-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#obelisk-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding plaza and garden */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M20 95 L30 95" />
        <path d="M70 95 L80 95" />
        <ellipse cx="25" cy="92" rx="10" ry="3" />
        <ellipse cx="75" cy="92" rx="10" ry="3" />
        <path d="M50 95 L75 92 L77 95" />
        <path d="M30 93 L45 93" />
        <path d="M55 93 L70 93" />
      </g>

      {/* PRIMARY: Obelisk monument */}
      <g strokeWidth="0.8">
        {/* Pyramidion (capstone) */}
        <path d="M50 5 L45 20 L55 20 Z" strokeWidth="1.2" />
        <path d="M50 5 L50 20" strokeWidth="0.4" />

        {/* Main tapering shaft */}
        <path d="M45 20 L42 75 L58 75 L55 20" strokeWidth="1.2" />
        <path d="M50 20 L50 75" strokeWidth="0.4" opacity="0.3" />

        {/* Base section */}
        <path d="M40 75 L40 82 L60 82 L60 75" strokeWidth="1" />
        <path d="M38 82 L38 88 L62 88 L62 82" strokeWidth="1" />

        {/* Plinth foundation */}
        <path d="M35 88 L35 95 L65 95 L65 88" strokeWidth="1.2" />
        <path d="M37 91 L63 91" strokeWidth="0.5" />

        {/* Hieroglyphic inscriptions */}
        <path d="M47 30 L47 35 L53 35 L53 30 Z" strokeWidth="0.6" opacity="0.5" />
        <path d="M48 40 L52 45" strokeWidth="0.6" opacity="0.5" />
        <path d="M52 40 L48 45" strokeWidth="0.6" opacity="0.5" />
        <path d="M47 55 L53 55" strokeWidth="0.6" opacity="0.5" />
        <path d="M47 60 L47 65" strokeWidth="0.6" opacity="0.5" />
        <path d="M53 60 L53 65" strokeWidth="0.6" opacity="0.5" />
        <path d="M50 62 L50 63" strokeWidth="0.6" opacity="0.5" />

        {/* Side face indication */}
        <path d="M55 20 L58 75" strokeWidth="0.4" opacity="0.4" />

        {/* Ground reference */}
        <path d="M20 95 L80 95" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * PARTERRE - Formal Ornamental Garden Bed
 * Geometric plant beds forming decorative patterns
 * Reference: Versailles gardens, Tudor knot gardens, Italian Renaissance parterres
 */
const ParterreSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="parterre-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#parterre-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding grounds and viewing paths */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 5 L5 95" />
        <path d="M95 5 L95 95" />
        <path d="M5 5 L95 5" />
        <path d="M5 95 L10 95" />
        <path d="M90 95 L95 95" />
        <path d="M50 5 L50 10" />
        <ellipse cx="3" cy="50" rx="2" ry="8" />
        <ellipse cx="97" cy="50" rx="2" ry="8" />
      </g>

      {/* PRIMARY: Parterre pattern */}
      <g strokeWidth="0.8">
        {/* Overall border hedge */}
        <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.2" />

        {/* Central circular bed */}
        <circle cx="50" cy="50" r="15" strokeWidth="1" />
        <circle cx="50" cy="50" r="10" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="5" strokeWidth="0.6" />

        {/* Corner scrollwork beds - baroque pattern */}
        <path d="M15 15 Q25 25, 15 35 Q25 35, 35 25 Q35 15, 25 15 Q15 25, 15 15" strokeWidth="0.8" />
        <path d="M85 15 Q75 25, 85 35 Q75 35, 65 25 Q65 15, 75 15 Q85 25, 85 15" strokeWidth="0.8" />
        <path d="M15 85 Q25 75, 15 65 Q25 65, 35 75 Q35 85, 25 85 Q15 75, 15 85" strokeWidth="0.8" />
        <path d="M85 85 Q75 75, 85 65 Q75 65, 65 75 Q65 85, 75 85 Q85 75, 85 85" strokeWidth="0.8" />

        {/* Connecting gravel paths */}
        <path d="M50 35 L50 10" strokeWidth="1.5" />
        <path d="M50 65 L50 90" strokeWidth="1.5" />
        <path d="M35 50 L10 50" strokeWidth="1.5" />
        <path d="M65 50 L90 50" strokeWidth="1.5" />

        {/* Accent topiary positions */}
        <circle cx="30" cy="50" r="3" strokeWidth="0.8" opacity="0.5" />
        <circle cx="70" cy="50" r="3" strokeWidth="0.8" opacity="0.5" />
        <circle cx="50" cy="30" r="3" strokeWidth="0.8" opacity="0.5" />
        <circle cx="50" cy="70" r="3" strokeWidth="0.8" opacity="0.5" />

        {/* Internal bed divisions */}
        <path d="M20 20 Q25 30, 30 20" strokeWidth="0.5" opacity="0.5" />
        <path d="M70 20 Q75 30, 80 20" strokeWidth="0.5" opacity="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * PERGOLA - Garden Walkway with Overhead Structure
 * Post and beam framework supporting climbing plants
 * Reference: Italian villa gardens, Arts & Crafts garden design
 */
const PergolaSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pergola-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#pergola-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding garden and ground plane */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 90 L10 90" />
        <path d="M90 90 L95 90" />
        <ellipse cx="8" cy="75" rx="6" ry="8" />
        <ellipse cx="92" cy="75" rx="6" ry="8" />
        <path d="M20 92 L25 88 L80 88 L85 92" />
        <path d="M10 88 Q25 86, 40 88" />
        <path d="M60 88 Q75 86, 90 88" />
      </g>

      {/* PRIMARY: Pergola structure */}
      <g strokeWidth="0.8">
        {/* Vertical posts with bases */}
        <path d="M15 30 L15 90" strokeWidth="1.5" />
        <path d="M40 30 L40 90" strokeWidth="1.5" />
        <path d="M60 30 L60 90" strokeWidth="1.5" />
        <path d="M85 30 L85 90" strokeWidth="1.5" />

        {/* Post capitals */}
        <path d="M13 30 L17 30 L17 32 L13 32 Z" strokeWidth="0.6" />
        <path d="M38 30 L42 30 L42 32 L38 32 Z" strokeWidth="0.6" />
        <path d="M58 30 L62 30 L62 32 L58 32 Z" strokeWidth="0.6" />
        <path d="M83 30 L87 30 L87 32 L83 32 Z" strokeWidth="0.6" />

        {/* Main longitudinal beams */}
        <path d="M10 30 L90 30" strokeWidth="1.5" />
        <path d="M10 35 L90 35" strokeWidth="1.5" />

        {/* Cross rafters */}
        {[18, 28, 38, 48, 58, 68, 78, 88].map((x, i) => (
          <path key={i} d={`M${x} 25 L${x} 40`} strokeWidth="1" />
        ))}

        {/* Climbing plants on posts */}
        <path d="M15 50 Q20 45, 18 55 Q23 52, 20 62 Q25 58, 22 68" strokeWidth="0.6" opacity="0.6" />
        <path d="M85 50 Q80 45, 82 55 Q77 52, 80 62 Q75 58, 78 68" strokeWidth="0.6" opacity="0.6" />

        {/* Vines on overhead beams */}
        <path d="M25 28 Q32 25, 35 30 Q42 27, 45 32" strokeWidth="0.6" opacity="0.6" />
        <path d="M65 28 Q72 25, 75 30 Q80 27, 82 32" strokeWidth="0.6" opacity="0.6" />

        {/* Ground line */}
        <path d="M5 90 L95 90" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * SUNDIAL - Garden Timepiece Monument
 * Solar timekeeping device on ornamental pedestal
 * Reference: Classical horologium, Renaissance garden instruments
 */
const SundialSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="sundial-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#sundial-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding paved area and garden */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M20 95 L30 95" />
        <path d="M70 95 L80 95" />
        <path d="M15 92 Q25 90, 35 92" />
        <path d="M65 92 Q75 90, 85 92" />
        <ellipse cx="20" cy="88" rx="8" ry="4" />
        <ellipse cx="80" cy="88" rx="8" ry="4" />
      </g>

      {/* PRIMARY: Sundial structure */}
      <g strokeWidth="0.8">
        {/* Base plinth */}
        <path d="M32 90 L68 90 L70 95 L30 95 Z" strokeWidth="1" />

        {/* Pedestal shaft */}
        <path d="M35 90 L35 70 L65 70 L65 90" strokeWidth="1.2" />
        <path d="M37 80 L63 80" strokeWidth="0.4" opacity="0.3" />

        {/* Column section of pedestal */}
        <path d="M38 70 L38 55 Q50 50, 62 55 L62 70" strokeWidth="1" />
        <path d="M40 62 L60 62" strokeWidth="0.4" opacity="0.3" />

        {/* Dial plate (in perspective) */}
        <ellipse cx="50" cy="45" rx="25" ry="12" strokeWidth="1.2" />
        <ellipse cx="50" cy="45" rx="22" ry="10" strokeWidth="0.6" />

        {/* Hour lines radiating from center */}
        {[0, 30, 60, 90, 120, 150].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 50 + 8 * Math.cos(rad)
          const y1 = 45 + 4 * Math.sin(rad)
          const x2 = 50 + 20 * Math.cos(rad)
          const y2 = 45 + 9 * Math.sin(rad)
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} strokeWidth="0.6" />
        })}

        {/* Gnomon (shadow-casting style) */}
        <path d="M50 45 L50 25" strokeWidth="1.2" />
        <path d="M50 45 L55 35 L50 25" strokeWidth="0.8" />
        <path d="M48 35 L52 35" strokeWidth="0.5" />

        {/* Shadow indication */}
        <path d="M50 45 L65 50 L68 52" strokeWidth="0.6" opacity="0.5" />

        {/* Roman numeral markers */}
        <circle cx="72" cy="45" r="2" strokeWidth="0.6" opacity="0.4" />
        <circle cx="50" cy="55" r="2" strokeWidth="0.6" opacity="0.4" />
        <circle cx="28" cy="45" r="2" strokeWidth="0.6" opacity="0.4" />
        <circle cx="50" cy="36" r="2" strokeWidth="0.6" opacity="0.4" />
      </g>
    </g>
  </svg>
)

/**
 * TOPIARY - Sculpted Ornamental Shrub
 * Trained and trimmed plant in geometric forms
 * Reference: Renaissance Italian gardens, Dutch formal gardens, Versailles
 */
const TopiarySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="topiary-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#topiary-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding garden and plantings */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M20 95 L28 95" />
        <path d="M72 95 L80 95" />
        <ellipse cx="15" cy="90" rx="10" ry="4" />
        <ellipse cx="85" cy="90" rx="10" ry="4" />
        <path d="M10 88 Q15 86, 20 88" />
        <path d="M80 88 Q85 86, 90 88" />
      </g>

      {/* PRIMARY: Topiary sculpture */}
      <g strokeWidth="0.8">
        {/* Ornamental pot/container */}
        <path d="M35 85 L30 95 L70 95 L65 85" strokeWidth="1" />
        <path d="M33 85 L67 85 L68 88 L32 88 Z" strokeWidth="1" />
        <path d="M34 86 L66 86" strokeWidth="0.4" opacity="0.3" />

        {/* Trunk stems */}
        <path d="M48 85 L48 70" strokeWidth="1.2" />
        <path d="M52 85 L52 70" strokeWidth="1.2" />

        {/* Bottom sphere (largest) */}
        <circle cx="50" cy="62" r="15" strokeWidth="1.2" />
        <path d="M38 55 Q42 52, 48 55 Q54 53, 60 56" strokeWidth="0.5" opacity="0.5" />
        <path d="M40 62 Q50 60, 60 62" strokeWidth="0.5" opacity="0.5" />
        <path d="M42 68 Q50 66, 58 68" strokeWidth="0.5" opacity="0.5" />

        {/* Connecting stem */}
        <path d="M50 47 L50 50" strokeWidth="1" />

        {/* Middle sphere */}
        <circle cx="50" cy="38" r="12" strokeWidth="1.2" />
        <path d="M42 35 Q46 32, 50 35 Q54 33, 58 36" strokeWidth="0.5" opacity="0.5" />
        <path d="M43 42 Q50 40, 57 42" strokeWidth="0.5" opacity="0.5" />

        {/* Connecting stem */}
        <path d="M50 26 L50 30" strokeWidth="0.8" />

        {/* Top sphere (smallest) */}
        <circle cx="50" cy="18" r="8" strokeWidth="1.2" />
        <path d="M45 16 Q48 14, 52 16 Q54 15, 56 17" strokeWidth="0.5" opacity="0.5" />
        <path d="M46 20 Q50 19, 54 20" strokeWidth="0.5" opacity="0.5" />

        {/* Ground line */}
        <path d="M20 95 L80 95" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * TRELLIS - Lattice Framework for Climbing Plants
 * Structural support creating vertical garden interest
 * Reference: Gothic quatrefoil patterns, Renaissance espalier supports
 */
const TrellisSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="trellis-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#trellis-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">

      {/* CONTEXT: Surrounding garden bed and ground */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.6">
        <path d="M5 90 L15 90" />
        <path d="M85 90 L95 90" />
        <path d="M5 50 L10 50" />
        <path d="M90 50 L95 50" />
        <ellipse cx="10" cy="92" rx="8" ry="3" />
        <ellipse cx="90" cy="92" rx="8" ry="3" />
        <path d="M15 88 Q25 86, 35 88" />
        <path d="M65 88 Q75 86, 85 88" />
      </g>

      {/* PRIMARY: Trellis lattice structure */}
      <g strokeWidth="0.8">
        {/* Outer frame */}
        <path d="M15 10 L15 90" strokeWidth="1.2" />
        <path d="M85 10 L85 90" strokeWidth="1.2" />
        <path d="M15 10 L85 10" strokeWidth="1.2" />
        <path d="M15 90 L85 90" strokeWidth="1.2" />

        {/* Diamond lattice pattern - diagonal lines */}
        <path d="M15 30 L50 10 L85 30" strokeWidth="0.8" />
        <path d="M15 50 L50 30 L85 50" strokeWidth="0.8" />
        <path d="M15 70 L50 50 L85 70" strokeWidth="0.8" />
        <path d="M15 90 L50 70 L85 90" strokeWidth="0.8" />

        <path d="M15 30 L50 50 L85 30" strokeWidth="0.8" />
        <path d="M15 50 L50 70 L85 50" strokeWidth="0.8" />
        <path d="M15 70 L50 90 L85 70" strokeWidth="0.8" />
        <path d="M15 10 L50 30 L85 10" strokeWidth="0.8" />

        {/* Climbing vine with organic curves */}
        <path d="M20 85 Q25 75, 30 80 Q35 70, 40 75 Q50 60, 55 65 Q65 50, 70 55 Q75 45, 78 50" strokeWidth="0.8" opacity="0.6" />

        {/* Leaf clusters */}
        <circle cx="30" cy="78" r="3" strokeWidth="0.8" opacity="0.5" />
        <circle cx="38" cy="73" r="2.5" strokeWidth="0.8" opacity="0.5" />
        <circle cx="45" cy="68" r="3" strokeWidth="0.8" opacity="0.5" />
        <circle cx="54" cy="63" r="2.5" strokeWidth="0.8" opacity="0.5" />
        <circle cx="60" cy="58" r="3" strokeWidth="0.8" opacity="0.5" />
        <circle cx="68" cy="53" r="2.5" strokeWidth="0.8" opacity="0.5" />

        {/* Flower suggestions */}
        <circle cx="33" cy="76" r="2" strokeWidth="0.6" opacity="0.4" />
        <circle cx="48" cy="66" r="2" strokeWidth="0.6" opacity="0.4" />
        <circle cx="63" cy="56" r="2" strokeWidth="0.6" opacity="0.4" />

        {/* Ground reference */}
        <path d="M10 90 L90 90" strokeWidth="1" />
      </g>
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
