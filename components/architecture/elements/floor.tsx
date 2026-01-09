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
 * ATRIUM - Roman house central court viewed from above
 * Reference: House of the Vettii, Pompeii - bird's eye into open court
 * Shows: Impluvium pool, surrounding peristyle columns, compluvium opening
 * Unique view: Looking DOWN into the atrium space
 */
const AtriumSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="atrium-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#atrium-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Roof opening (compluvium) frame looking down */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        <path d="M5 5 L95 5 L95 95 L5 95 Z" />
        <path d="M5 5 L20 20" />
        <path d="M95 5 L80 20" />
        <path d="M5 95 L20 80" />
        <path d="M95 95 L80 80" />
        {/* Roof tiles suggestion */}
        <path d="M10 8 L15 8" />
        <path d="M85 8 L90 8" />
        <path d="M8 50 L5 50" />
        <path d="M95 50 L92 50" />
      </g>

      {/* PRIMARY - Atrium floor plan from above */}
      <g strokeWidth="1.2">
        {/* Outer atrium floor boundary */}
        <path d="M20 20 L80 20 L80 80 L20 80 Z" strokeWidth="1.5" />

        {/* Impluvium (central pool) - the defining feature */}
        <path d="M35 35 L65 35 L65 65 L35 65 Z" strokeWidth="2" />
        <path d="M38 38 L62 38 L62 62 L38 62 Z" strokeWidth="1" />
        {/* Water ripple lines */}
        <path d="M42 50 Q50 47, 58 50" opacity="0.5" strokeWidth="0.8" />
        <path d="M45 55 Q50 53, 55 55" opacity="0.4" strokeWidth="0.6" />

        {/* Peristyle columns around atrium (plan view - circles) */}
        <circle cx="25" cy="25" r="2.5" strokeWidth="1.3" />
        <circle cx="50" cy="22" r="2.5" strokeWidth="1.3" />
        <circle cx="75" cy="25" r="2.5" strokeWidth="1.3" />
        <circle cx="22" cy="50" r="2.5" strokeWidth="1.3" />
        <circle cx="78" cy="50" r="2.5" strokeWidth="1.3" />
        <circle cx="25" cy="75" r="2.5" strokeWidth="1.3" />
        <circle cx="50" cy="78" r="2.5" strokeWidth="1.3" />
        <circle cx="75" cy="75" r="2.5" strokeWidth="1.3" />

        {/* Mosaic floor pattern around impluvium */}
        <path d="M22 30 L33 30" strokeWidth="0.7" />
        <path d="M67 30 L78 30" strokeWidth="0.7" />
        <path d="M22 70 L33 70" strokeWidth="0.7" />
        <path d="M67 70 L78 70" strokeWidth="0.7" />

        {/* Drain channel from impluvium */}
        <path d="M50 65 L50 78" strokeWidth="0.8" opacity="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * CHECKERBOARD - Medieval cathedral nave floor in perspective
 * Reference: Siena Cathedral, Florence Duomo nave
 * Shows: Black/white marble squares receding toward altar
 * Unique view: One-point perspective down cathedral nave
 */
const CheckerboardSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="checker-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#checker-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Cathedral columns and vaulting */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Left arcade columns */}
        <path d="M5 95 L5 40 L15 30" />
        <path d="M15 95 L20 50 L28 35" />
        {/* Right arcade columns */}
        <path d="M95 95 L95 40 L85 30" />
        <path d="M85 95 L80 50 L72 35" />
        {/* Vanishing point area - altar */}
        <path d="M45 25 L55 25 L55 32 L45 32 Z" />
        <path d="M50 20 L50 25" />
      </g>

      {/* PRIMARY - Checkerboard floor in perspective */}
      <g strokeWidth="1">
        {/* Floor boundary converging to vanishing point */}
        <path d="M0 95 L50 30 L100 95 Z" strokeWidth="1.5" />

        {/* Horizontal lines (rows) - closer spacing near vanishing point */}
        <path d="M8 90 L92 90" strokeWidth="1.2" />
        <path d="M18 82 L82 82" strokeWidth="1.1" />
        <path d="M25 74 L75 74" strokeWidth="1" />
        <path d="M32 66 L68 66" strokeWidth="0.9" />
        <path d="M37 58 L63 58" strokeWidth="0.8" />
        <path d="M41 50 L59 50" strokeWidth="0.7" />
        <path d="M44 42 L56 42" strokeWidth="0.6" />
        <path d="M47 36 L53 36" strokeWidth="0.5" />

        {/* Vertical lines converging */}
        <path d="M50 30 L50 95" strokeWidth="1.2" />
        <path d="M50 30 L25 95" strokeWidth="1" />
        <path d="M50 30 L75 95" strokeWidth="1" />
        <path d="M50 30 L0 95" strokeWidth="1" />
        <path d="M50 30 L100 95" strokeWidth="1" />
        <path d="M50 30 L12 95" strokeWidth="0.8" />
        <path d="M50 30 L88 95" strokeWidth="0.8" />
        <path d="M50 30 L38 95" strokeWidth="0.8" />
        <path d="M50 30 L62 95" strokeWidth="0.8" />

        {/* Dark squares indicated with X marks (alternating) */}
        <path d="M30 87 L36 91" opacity="0.4" strokeWidth="0.6" />
        <path d="M36 87 L30 91" opacity="0.4" strokeWidth="0.6" />
        <path d="M54 87 L60 91" opacity="0.4" strokeWidth="0.6" />
        <path d="M60 87 L54 91" opacity="0.4" strokeWidth="0.6" />
        <path d="M78 87 L84 91" opacity="0.4" strokeWidth="0.6" />
        <path d="M84 87 L78 91" opacity="0.4" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * COURTYARD - Moorish palace courtyard with reflecting pool
 * Reference: Court of the Lions, Alhambra - iconic Islamic courtyard
 * Shows: Central fountain, arcade shadows, geometric paving
 * Unique view: Corner perspective showing two arcade walls
 */
const CourtyardSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="courtyard-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#courtyard-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Surrounding arcade arches */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Left arcade wall */}
        <path d="M5 30 L5 95" />
        <path d="M5 30 Q12 20, 20 30 L20 50" />
        <path d="M5 50 Q12 40, 20 50 L20 70" />
        <path d="M5 70 Q12 60, 20 70 L20 95" />
        {/* Back arcade wall */}
        <path d="M20 30 L95 30" />
        <path d="M30 30 Q40 20, 50 30" />
        <path d="M55 30 Q65 20, 75 30" />
        {/* Muqarnas detail hint */}
        <path d="M12 22 L12 28" />
        <path d="M42 22 L42 28" />
      </g>

      {/* PRIMARY - Courtyard floor and fountain */}
      <g strokeWidth="1.2">
        {/* Courtyard floor plane */}
        <path d="M20 95 L20 50 L95 50 L95 95 Z" strokeWidth="1.5" />

        {/* Central reflecting pool/fountain */}
        <path d="M40 62 L75 62 L75 85 L40 85 Z" strokeWidth="1.8" />
        <path d="M43 65 L72 65 L72 82 L43 82 Z" strokeWidth="1" />

        {/* Lion fountain in center (Alhambra reference) */}
        <circle cx="57" cy="73" r="5" strokeWidth="1.5" />
        <circle cx="57" cy="73" r="2" strokeWidth="1" />
        {/* Water jet */}
        <path d="M57 68 L57 63" strokeWidth="0.8" />
        <path d="M55 64 L57 62 L59 64" strokeWidth="0.6" />

        {/* Geometric tile channels (water runnels) */}
        <path d="M57 85 L57 95" strokeWidth="1" />
        <path d="M40 73 L30 73 L30 95" strokeWidth="1" />
        <path d="M75 73 L85 73 L85 95" strokeWidth="1" />

        {/* Courtyard geometric paving */}
        <path d="M22 55 L35 55 L35 60 L22 60 Z" strokeWidth="0.8" />
        <path d="M80 55 L93 55 L93 60 L80 60 Z" strokeWidth="0.8" />
        <path d="M22 88 L35 88 L35 93 L22 93 Z" strokeWidth="0.8" />
        <path d="M80 88 L93 88 L93 93 L80 93 Z" strokeWidth="0.8" />

        {/* Orange tree positions (circles in plan) */}
        <circle cx="28" cy="72" r="3" strokeWidth="0.9" opacity="0.6" />
        <circle cx="86" cy="72" r="3" strokeWidth="0.9" opacity="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * FLAGSTONE - Garden path winding through cottage garden
 * Reference: English cottage garden path, Sissinghurst
 * Shows: Irregular stones with plants growing between, garden beds alongside
 * Unique view: Winding path perspective with overhanging plants
 */
const FlagstoneSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="flagstone-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#flagstone-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Garden beds and plants alongside */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Left garden bed with plants */}
        <path d="M5 20 Q10 15, 15 20 Q20 25, 15 30" />
        <path d="M8 45 Q15 40, 20 48" />
        <path d="M3 70 Q10 65, 12 72" />
        {/* Right garden bed with plants */}
        <path d="M85 15 Q90 10, 95 18" />
        <path d="M80 40 Q88 35, 92 42" />
        <path d="M88 70 Q94 65, 97 72" />
        {/* Fence/border hint */}
        <path d="M2 5 L2 95" />
        <path d="M98 5 L98 95" />
      </g>

      {/* PRIMARY - Winding flagstone path */}
      <g strokeWidth="1.2">
        {/* Path boundary - organic winding shape */}
        <path d="M30 5 Q25 15, 35 25 Q45 35, 38 45 Q30 55, 40 65 Q50 75, 45 85 Q40 95, 50 100" strokeWidth="1.5" />
        <path d="M60 5 Q65 15, 55 25 Q45 35, 55 45 Q65 55, 55 65 Q45 75, 55 85 Q60 95, 55 100" strokeWidth="1.5" />

        {/* Individual flagstones - irregular shapes */}
        <path d="M35 8 L50 10 L52 18 L38 20 L33 15 Z" strokeWidth="1.3" />
        <path d="M40 22 L55 20 L58 28 L52 32 L42 30 Z" strokeWidth="1.3" />
        <path d="M38 34 L48 32 L52 42 L45 48 L35 44 Z" strokeWidth="1.3" />
        <path d="M48 50 L58 48 L60 55 L55 62 L45 58 Z" strokeWidth="1.3" />
        <path d="M42 64 L52 60 L58 68 L52 75 L40 72 Z" strokeWidth="1.3" />
        <path d="M45 78 L55 76 L58 85 L50 90 L42 86 Z" strokeWidth="1.3" />

        {/* Moss/plants in gaps */}
        <path d="M44 28 Q46 26, 48 28" opacity="0.5" strokeWidth="0.6" />
        <path d="M50 45 Q52 43, 54 46" opacity="0.5" strokeWidth="0.6" />
        <path d="M48 70 Q50 68, 52 70" opacity="0.5" strokeWidth="0.6" />

        {/* Stone texture marks */}
        <path d="M42 14 L45 16" opacity="0.4" strokeWidth="0.5" />
        <path d="M48 38 L51 40" opacity="0.4" strokeWidth="0.5" />
        <path d="M52 82 L55 84" opacity="0.4" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * FOUNDATION - Building section showing below-grade construction
 * Reference: Vitruvian foundation principles, Roman construction
 * Shows: Cut-away view with soil, footing, foundation wall, floor slab
 * Unique view: Cross-section through building edge
 */
const FoundationSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="foundation-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#foundation-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Building above and soil pattern */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Wall above grade */}
        <path d="M30 10 L30 40" />
        <path d="M45 10 L45 40" />
        <path d="M30 10 L45 10" />
        {/* Window in wall */}
        <path d="M33 18 L42 18 L42 30 L33 30 Z" />
        {/* Soil layers - left side */}
        <path d="M5 50 L5 95" />
        <path d="M8 55 L12 58" />
        <path d="M6 70 L10 72" />
        <path d="M8 85 L11 88" />
        {/* Gravel/drainage layer dots */}
        <circle cx="18" cy="78" r="1" />
        <circle cx="22" cy="82" r="1" />
        <circle cx="20" cy="86" r="1" />
      </g>

      {/* PRIMARY - Foundation system cross-section */}
      <g strokeWidth="1.2">
        {/* Grade line (ground level) */}
        <path d="M5 40 L95 40" strokeWidth="2" />
        <path d="M3 40 L5 38 L7 40 L9 38 L11 40" strokeWidth="0.8" /> {/* Grass tufts */}

        {/* Foundation wall */}
        <path d="M25 40 L25 75 L50 75 L50 40" strokeWidth="1.8" />

        {/* Footing (wider base) */}
        <path d="M18 75 L18 88 L57 88 L57 75" strokeWidth="2" />
        <path d="M18 75 L25 75" strokeWidth="1.5" />
        <path d="M50 75 L57 75" strokeWidth="1.5" />

        {/* Floor slab */}
        <path d="M50 50 L85 50 L85 55 L50 55 Z" strokeWidth="1.5" />

        {/* Gravel bed under slab */}
        <path d="M52 55 L52 60 L83 60 L83 55" strokeWidth="1" />
        <path d="M55 57 L58 58" opacity="0.5" strokeWidth="0.6" />
        <path d="M70 57 L73 58" opacity="0.5" strokeWidth="0.6" />

        {/* Rebar in foundation */}
        <path d="M28 78 L47 78" strokeWidth="0.8" />
        <path d="M28 85 L47 85" strokeWidth="0.8" />
        <path d="M32 75 L32 88" strokeWidth="0.6" />
        <path d="M43 75 L43 88" strokeWidth="0.6" />

        {/* Waterproofing membrane */}
        <path d="M25 42 L25 75" strokeWidth="0.5" strokeDasharray="1 1" />

        {/* Dimension lines */}
        <path d="M60 75 L60 88" strokeWidth="0.5" />
        <path d="M58 88 L62 88" strokeWidth="0.5" />
        <path d="M58 75 L62 75" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * GEOMETRIC - Islamic geometric star pattern in mosque
 * Reference: Alhambra, Sheikh Zayed Mosque floor
 * Shows: 8-point star interlocking pattern with border
 * Unique view: Close-up of intricate geometric tilework
 */
const GeometricSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="geometric-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#geometric-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Mosque architecture hint */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Mihrab niche at top */}
        <path d="M35 5 Q50 2, 65 5 L65 15 Q50 12, 35 15 Z" />
        {/* Column bases at sides */}
        <circle cx="10" cy="50" r="4" />
        <circle cx="90" cy="50" r="4" />
        {/* Prayer rug positions */}
        <path d="M20 85 L30 85 L30 95 L20 95 Z" />
        <path d="M70 85 L80 85 L80 95 L70 95 Z" />
      </g>

      {/* PRIMARY - Islamic geometric floor pattern */}
      <g strokeWidth="1">
        {/* Outer border frame */}
        <path d="M15 20 L85 20 L85 95 L15 95 Z" strokeWidth="1.5" />
        <path d="M18 23 L82 23 L82 92 L18 92 Z" strokeWidth="1" />

        {/* Central 8-point star (main motif) */}
        <path d="M50 30 L58 42 L72 42 L62 52 L66 66 L50 58 L34 66 L38 52 L28 42 L42 42 Z" strokeWidth="1.8" />

        {/* Inner star detail */}
        <path d="M50 38 L54 46 L62 46 L56 52 L58 60 L50 54 L42 60 L44 52 L38 46 L46 46 Z" strokeWidth="1" />

        {/* Corner stars (quarter patterns) */}
        <path d="M22 28 L30 36 L22 44 L26 36 Z" strokeWidth="1.2" />
        <path d="M78 28 L70 36 L78 44 L74 36 Z" strokeWidth="1.2" />
        <path d="M22 78 L30 70 L22 62 L26 70 Z" strokeWidth="1.2" />
        <path d="M78 78 L70 70 L78 62 L74 70 Z" strokeWidth="1.2" />

        {/* Interlocking bands */}
        <path d="M28 42 L22 36" strokeWidth="1.2" />
        <path d="M72 42 L78 36" strokeWidth="1.2" />
        <path d="M34 66 L26 72" strokeWidth="1.2" />
        <path d="M66 66 L74 72" strokeWidth="1.2" />

        {/* Arabesque border detail */}
        <path d="M30 23 Q35 20, 40 23" strokeWidth="0.8" />
        <path d="M50 23 Q55 20, 60 23" strokeWidth="0.8" />
        <path d="M70 23 Q75 20, 80 23" strokeWidth="0.8" />

        {/* Central medallion */}
        <circle cx="50" cy="50" r="4" strokeWidth="1.3" />
      </g>
    </g>
  </svg>
)

/**
 * HERRINGBONE - Tudor great hall with brick herringbone floor
 * Reference: Hampton Court Palace great hall
 * Shows: Herringbone brick pattern with fireplace at end
 * Unique view: Room perspective with massive fireplace
 */
const HerringboneSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="herringbone-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#herringbone-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Tudor hall with fireplace */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Left wall with paneling */}
        <path d="M5 20 L5 95" />
        <path d="M8 25 L8 90" />
        <path d="M8 40 L5 40" />
        <path d="M8 60 L5 60" />
        {/* Right wall */}
        <path d="M95 20 L95 95" />
        <path d="M92 25 L92 90" />
        {/* Fireplace at end */}
        <path d="M30 20 L30 45 L70 45 L70 20" />
        <path d="M35 25 L35 42 L65 42 L65 25" />
        {/* Mantle */}
        <path d="M28 45 L72 45" strokeWidth="1" />
        <path d="M25 48 L75 48" strokeWidth="0.8" />
        {/* Fire glow suggestion */}
        <path d="M45 35 Q50 28, 55 35" />
      </g>

      {/* PRIMARY - Herringbone brick floor */}
      <g strokeWidth="1">
        {/* Floor plane */}
        <path d="M10 95 L10 50 L90 50 L90 95 Z" strokeWidth="1.5" />

        {/* Herringbone pattern - V-shapes */}
        {/* Row 1 */}
        <path d="M15 55 L22 62 L15 69" strokeWidth="1.2" />
        <path d="M22 62 L29 55 L36 62 L29 69 L22 62" strokeWidth="1.2" />
        <path d="M36 62 L43 55 L50 62 L43 69 L36 62" strokeWidth="1.2" />
        <path d="M50 62 L57 55 L64 62 L57 69 L50 62" strokeWidth="1.2" />
        <path d="M64 62 L71 55 L78 62 L71 69 L64 62" strokeWidth="1.2" />
        <path d="M78 62 L85 55 L85 69 L78 62" strokeWidth="1.2" />

        {/* Row 2 */}
        <path d="M15 69 L22 76 L15 83" strokeWidth="1.2" />
        <path d="M22 76 L29 69 L36 76 L29 83 L22 76" strokeWidth="1.2" />
        <path d="M36 76 L43 69 L50 76 L43 83 L36 76" strokeWidth="1.2" />
        <path d="M50 76 L57 69 L64 76 L57 83 L50 76" strokeWidth="1.2" />
        <path d="M64 76 L71 69 L78 76 L71 83 L64 76" strokeWidth="1.2" />
        <path d="M78 76 L85 69 L85 83 L78 76" strokeWidth="1.2" />

        {/* Row 3 */}
        <path d="M15 83 L22 90 L15 95" strokeWidth="1.2" />
        <path d="M22 90 L29 83 L36 90 L29 95" strokeWidth="1.2" />
        <path d="M36 90 L43 83 L50 90 L43 95" strokeWidth="1.2" />
        <path d="M50 90 L57 83 L64 90 L57 95" strokeWidth="1.2" />
        <path d="M64 90 L71 83 L78 90 L71 95" strokeWidth="1.2" />
        <path d="M78 90 L85 83 L85 95" strokeWidth="1.2" />

        {/* Individual brick texture */}
        <path d="M24 58 L26 60" opacity="0.4" strokeWidth="0.5" />
        <path d="M52 72 L54 74" opacity="0.4" strokeWidth="0.5" />
        <path d="M38 86 L40 88" opacity="0.4" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * INLAY - Baroque palazzo with elaborate floor medallion
 * Reference: Palazzo Reale di Caserta, Italian intarsia
 * Shows: Ornate central medallion with radiating design
 * Unique view: Grand salon with doorway and chandelier shadow
 */
const InlaySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="inlay-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#inlay-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Palazzo room */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Doorway at top */}
        <path d="M35 5 L35 25 L65 25 L65 5" />
        <path d="M38 8 L38 22 L62 22 L62 8" />
        {/* Door pediment */}
        <path d="M32 25 L50 18 L68 25" />
        {/* Chandelier shadow (oval) */}
        <ellipse cx="50" cy="55" rx="8" ry="3" />
        {/* Wall moldings */}
        <path d="M5 30 L5 95" />
        <path d="M95 30 L95 95" />
      </g>

      {/* PRIMARY - Inlay floor with central medallion */}
      <g strokeWidth="1">
        {/* Floor boundary */}
        <path d="M10 30 L90 30 L90 95 L10 95 Z" strokeWidth="1.5" />

        {/* Decorative border band */}
        <path d="M15 35 L85 35 L85 90 L15 90 Z" strokeWidth="1.2" />
        <path d="M18 38 L82 38 L82 87 L18 87 Z" strokeWidth="0.8" />

        {/* Central medallion - large ornate circle */}
        <circle cx="50" cy="62" r="22" strokeWidth="1.8" />
        <circle cx="50" cy="62" r="18" strokeWidth="1.2" />
        <circle cx="50" cy="62" r="12" strokeWidth="1" />

        {/* Radiating compass rose / sunburst */}
        <path d="M50 40 L50 50" strokeWidth="1.3" />
        <path d="M50 74 L50 84" strokeWidth="1.3" />
        <path d="M28 62 L38 62" strokeWidth="1.3" />
        <path d="M62 62 L72 62" strokeWidth="1.3" />
        {/* Diagonal rays */}
        <path d="M35 47 L42 54" strokeWidth="1.1" />
        <path d="M65 47 L58 54" strokeWidth="1.1" />
        <path d="M35 77 L42 70" strokeWidth="1.1" />
        <path d="M65 77 L58 70" strokeWidth="1.1" />

        {/* Floral inlay in center */}
        <path d="M50 56 Q54 60, 50 64 Q46 60, 50 56" strokeWidth="1.1" />
        <path d="M44 62 Q48 58, 50 62 Q48 66, 44 62" strokeWidth="0.9" />
        <path d="M56 62 Q52 58, 50 62 Q52 66, 56 62" strokeWidth="0.9" />

        {/* Corner flourishes */}
        <path d="M20 40 Q25 45, 22 50" strokeWidth="1" />
        <path d="M80 40 Q75 45, 78 50" strokeWidth="1" />
        <path d="M20 85 Q25 80, 22 75" strokeWidth="1" />
        <path d="M80 85 Q75 80, 78 75" strokeWidth="1" />

        {/* Scroll border detail */}
        <path d="M30 35 Q32 33, 35 35" strokeWidth="0.7" />
        <path d="M60 35 Q62 33, 65 35" strokeWidth="0.7" />
      </g>
    </g>
  </svg>
)

/**
 * MARBLE - Pantheon interior with oculus light on floor
 * Reference: The Pantheon, Rome - light through oculus
 * Shows: Circular floor pattern with light beam from oculus
 * Unique view: Looking down at coffered dome shadow on marble
 */
const MarbleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="marble-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#marble-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Coffered dome shadow pattern */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Circular coffer shadows */}
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="38" />
        <circle cx="50" cy="50" r="31" />
        {/* Radial coffer divisions */}
        <path d="M50 5 L50 19" />
        <path d="M50 81 L50 95" />
        <path d="M5 50 L19 50" />
        <path d="M81 50 L95 50" />
        <path d="M18 18 L28 28" />
        <path d="M72 28 L82 18" />
        <path d="M18 82 L28 72" />
        <path d="M72 72 L82 82" />
      </g>

      {/* PRIMARY - Marble floor with oculus light */}
      <g strokeWidth="1.2">
        {/* Circular marble floor pattern */}
        <circle cx="50" cy="50" r="42" strokeWidth="1.8" />

        {/* Concentric marble bands (Pantheon floor) */}
        <circle cx="50" cy="50" r="35" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="28" strokeWidth="1" />
        <circle cx="50" cy="50" r="20" strokeWidth="1" />

        {/* Oculus light beam (ellipse on floor) */}
        <ellipse cx="50" cy="50" r="12" ry="10" strokeWidth="2" />
        <ellipse cx="50" cy="50" r="8" ry="6" strokeWidth="1" opacity="0.6" />

        {/* Radial marble divisions */}
        <path d="M50 8 L50 30" strokeWidth="1.3" />
        <path d="M50 70 L50 92" strokeWidth="1.3" />
        <path d="M8 50 L30 50" strokeWidth="1.3" />
        <path d="M70 50 L92 50" strokeWidth="1.3" />

        {/* Diagonal divisions */}
        <path d="M20 20 L35 35" strokeWidth="1.1" />
        <path d="M80 20 L65 35" strokeWidth="1.1" />
        <path d="M20 80 L35 65" strokeWidth="1.1" />
        <path d="M80 80 L65 65" strokeWidth="1.1" />

        {/* Marble veining in light area */}
        <path d="M45 48 Q50 45, 55 48" opacity="0.4" strokeWidth="0.6" />
        <path d="M47 52 Q52 55, 54 52" opacity="0.4" strokeWidth="0.6" />

        {/* Porphyry disc accents */}
        <circle cx="50" cy="30" r="3" strokeWidth="1" />
        <circle cx="50" cy="70" r="3" strokeWidth="1" />
        <circle cx="30" cy="50" r="3" strokeWidth="1" />
        <circle cx="70" cy="50" r="3" strokeWidth="1" />
      </g>
    </g>
  </svg>
)

/**
 * MARQUETRY - Versailles salon corner with parquet de Versailles
 * Reference: Hall of Mirrors, Versailles - wood inlay artistry
 * Shows: Elaborate wood inlay with gilded wall panel reflection
 * Unique view: Corner detail showing floor meeting ornate wall
 */
const MarquetrySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="marquetry-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#marquetry-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Versailles wall paneling */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Back wall with gilded panel */}
        <path d="M10 10 L10 50 L90 50" />
        <path d="M15 15 L15 45 L50 45 L50 15 Z" />
        {/* Panel molding details */}
        <path d="M20 20 L20 40 L45 40 L45 20 Z" />
        {/* Sconce/mirror suggestion */}
        <ellipse cx="32" cy="30" rx="6" ry="8" />
        {/* Side wall */}
        <path d="M90 50 L90 10" />
        <path d="M60 15 L85 15 L85 45 L60 45 Z" />
      </g>

      {/* PRIMARY - Marquetry wood floor */}
      <g strokeWidth="1">
        {/* Floor plane in perspective */}
        <path d="M10 50 L90 50 L90 95 L10 95 Z" strokeWidth="1.5" />

        {/* Parquet de Versailles panels */}
        {/* Panel 1 */}
        <path d="M12 52 L42 52 L42 72 L12 72 Z" strokeWidth="1.3" />
        <path d="M27 52 L27 72" strokeWidth="1" />
        <path d="M12 62 L42 62" strokeWidth="1" />
        {/* Inner diamond pattern */}
        <path d="M17 57 L22 52 L27 57 L22 62 Z" strokeWidth="0.9" />
        <path d="M27 57 L32 52 L37 57 L32 62 Z" strokeWidth="0.9" />
        <path d="M17 67 L22 62 L27 67 L22 72 Z" strokeWidth="0.9" />
        <path d="M27 67 L32 62 L37 67 L32 72 Z" strokeWidth="0.9" />

        {/* Panel 2 */}
        <path d="M48 52 L78 52 L78 72 L48 72 Z" strokeWidth="1.3" />
        <path d="M63 52 L63 72" strokeWidth="1" />
        <path d="M48 62 L78 62" strokeWidth="1" />
        <path d="M53 57 L58 52 L63 57 L58 62 Z" strokeWidth="0.9" />
        <path d="M63 57 L68 52 L73 57 L68 62 Z" strokeWidth="0.9" />

        {/* Panel 3 */}
        <path d="M12 75 L42 75 L42 93 L12 93 Z" strokeWidth="1.3" />
        <path d="M27 75 L27 93" strokeWidth="1" />
        <path d="M12 84 L42 84" strokeWidth="1" />
        <path d="M17 79 L22 75 L27 79 L22 84 Z" strokeWidth="0.9" />

        {/* Panel 4 */}
        <path d="M48 75 L78 75 L78 93 L48 93 Z" strokeWidth="1.3" />
        <path d="M63 75 L63 93" strokeWidth="1" />
        <path d="M48 84 L78 84" strokeWidth="1" />

        {/* Decorative border strip */}
        <path d="M10 50 L10 95" strokeWidth="1.8" />
        <path d="M85 52 L85 93" strokeWidth="1.2" />

        {/* Wood grain direction marks */}
        <path d="M19 59 L21 57" opacity="0.3" strokeWidth="0.5" />
        <path d="M55 79 L57 81" opacity="0.3" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * MOSAIC - Roman bath floor with Neptune mosaic
 * Reference: Baths of Neptune, Ostia Antica
 * Shows: Figurative mosaic with sea creature, bath pool edge
 * Unique view: Looking down at thermae floor with pool boundary
 */
const MosaicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="mosaic-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#mosaic-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Bath pool edge and columns */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Pool (frigidarium) at top */}
        <path d="M20 5 L80 5 L80 20 L20 20 Z" />
        <path d="M25 10 L75 10 L75 18 L25 18 Z" />
        {/* Water suggestion */}
        <path d="M30 14 Q50 12, 70 14" />
        {/* Column bases */}
        <circle cx="10" cy="50" r="4" />
        <circle cx="90" cy="50" r="4" />
        <circle cx="10" cy="85" r="4" />
        <circle cx="90" cy="85" r="4" />
      </g>

      {/* PRIMARY - Mosaic floor with Neptune/sea design */}
      <g strokeWidth="1">
        {/* Floor boundary */}
        <path d="M15 25 L85 25 L85 95 L15 95 Z" strokeWidth="1.5" />

        {/* Mosaic border - Greek key pattern simplified */}
        <path d="M18 28 L82 28 L82 92 L18 92 Z" strokeWidth="1.2" />
        <path d="M22 32 L78 32 L78 88 L22 88 Z" strokeWidth="1" />
        {/* Key pattern on border */}
        <path d="M25 28 L25 30 L28 30 L28 32" strokeWidth="0.7" />
        <path d="M40 28 L40 30 L43 30 L43 32" strokeWidth="0.7" />
        <path d="M55 28 L55 30 L58 30 L58 32" strokeWidth="0.7" />
        <path d="M70 28 L70 30 L73 30 L73 32" strokeWidth="0.7" />

        {/* Central mosaic - Dolphin (common Roman motif) */}
        <path d="M35 55 Q50 45, 65 55 Q70 60, 65 65 Q55 72, 45 65 Q38 60, 35 55" strokeWidth="1.8" />
        {/* Dolphin tail */}
        <path d="M32 58 L25 52 L28 60 L25 68 L35 62" strokeWidth="1.5" />
        {/* Dolphin eye */}
        <circle cx="58" cy="58" r="2" strokeWidth="1.2" />
        {/* Dolphin fin */}
        <path d="M48 52 L50 45 L55 52" strokeWidth="1.2" />

        {/* Wave patterns around dolphin */}
        <path d="M30 45 Q35 42, 40 45" strokeWidth="0.9" />
        <path d="M60 45 Q65 42, 70 45" strokeWidth="0.9" />
        <path d="M30 75 Q35 72, 40 75" strokeWidth="0.9" />
        <path d="M60 75 Q65 72, 70 75" strokeWidth="0.9" />

        {/* Tesserae suggestion (tiny squares) */}
        <path d="M26 40 L28 40 L28 42 L26 42 Z" strokeWidth="0.6" />
        <path d="M72 40 L74 40 L74 42 L72 42 Z" strokeWidth="0.6" />
        <path d="M26 78 L28 78 L28 80 L26 80 Z" strokeWidth="0.6" />
        <path d="M72 78 L74 78 L74 80 L72 80 Z" strokeWidth="0.6" />
        <path d="M48 82 L50 82 L50 84 L48 84 Z" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * PARQUET - Grand ballroom with Versailles pattern
 * Reference: Schönbrunn Palace ballroom
 * Shows: Elaborate parquet with mirrored wall, chandelier
 * Unique view: Wide ballroom perspective with dancing space
 */
const ParquetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="parquet-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#parquet-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Ballroom mirrors and chandelier */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Mirror wall at back */}
        <path d="M15 10 L85 10 L85 35 L15 35 Z" />
        <path d="M20 15 L40 15 L40 32 L20 32 Z" />
        <path d="M45 15 L55 15 L55 32 L45 32 Z" />
        <path d="M60 15 L80 15 L80 32 L60 32 Z" />
        {/* Chandelier shadow/reflection */}
        <ellipse cx="50" cy="60" rx="10" ry="4" />
        {/* Crystal drops suggestion */}
        <path d="M45 58 L45 62" />
        <path d="M50 57 L50 63" />
        <path d="M55 58 L55 62" />
      </g>

      {/* PRIMARY - Ballroom parquet floor */}
      <g strokeWidth="1">
        {/* Floor expanse */}
        <path d="M5 40 L95 40 L95 95 L5 95 Z" strokeWidth="1.5" />

        {/* Parquet de Versailles pattern - 3x3 grid */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const x = 8 + col * 22
            const y = 43 + row * 17
            return (
              <g key={`${row}-${col}`}>
                {/* Panel frame */}
                <path d={`M${x} ${y} L${x+20} ${y} L${x+20} ${y+15} L${x} ${y+15} Z`} strokeWidth="1.2" />
                {/* Inner rotated square */}
                <path d={`M${x+10} ${y+2} L${x+18} ${y+7.5} L${x+10} ${y+13} L${x+2} ${y+7.5} Z`} strokeWidth="1" />
                {/* Corner triangles */}
                <path d={`M${x} ${y} L${x+10} ${y+2} L${x+2} ${y+7.5} Z`} opacity="0.5" strokeWidth="0.7" />
                <path d={`M${x+20} ${y} L${x+18} ${y+7.5} L${x+10} ${y+2} Z`} opacity="0.5" strokeWidth="0.7" />
              </g>
            )
          })
        )}

        {/* Border strip */}
        <path d="M5 40 L5 95" strokeWidth="1.8" />
        <path d="M95 40 L95 95" strokeWidth="1.8" />

        {/* Wood grain accent */}
        <path d="M15 50 L17 52" opacity="0.3" strokeWidth="0.5" />
        <path d="M60 70 L62 72" opacity="0.3" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

/**
 * PAVING - Roman street (via) with raised sidewalks
 * Reference: Via dell'Abbondanza, Pompeii
 * Shows: Large basalt pavers, stepping stones, drainage channel
 * Unique view: Street perspective with building facades
 */
const PavingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="paving-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#paving-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Building facades on either side */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Left building facade */}
        <path d="M5 20 L5 70" />
        <path d="M8 25 L8 65" />
        {/* Doorway */}
        <path d="M5 45 L12 45 L12 65 L5 65" />
        {/* Right building facade */}
        <path d="M95 20 L95 70" />
        <path d="M92 25 L92 65" />
        {/* Shop front */}
        <path d="M88 40 L95 40 L95 60 L88 60" />
        {/* Upper story windows */}
        <path d="M6 30 L10 30 L10 38 L6 38" />
        <path d="M90 30 L94 30 L94 38 L90 38" />
      </g>

      {/* PRIMARY - Roman street paving */}
      <g strokeWidth="1.2">
        {/* Raised sidewalks (crepido) */}
        <path d="M5 70 L18 70 L18 95 L5 95 Z" strokeWidth="1.5" />
        <path d="M82 70 L95 70 L95 95 L82 95 Z" strokeWidth="1.5" />
        {/* Curb edge */}
        <path d="M18 70 L18 95" strokeWidth="1.8" />
        <path d="M82 70 L82 95" strokeWidth="1.8" />

        {/* Street surface - large irregular basalt pavers */}
        <path d="M20 72 L35 70 L38 78 L22 80 Z" strokeWidth="1.3" />
        <path d="M35 70 L55 68 L58 76 L38 78 Z" strokeWidth="1.3" />
        <path d="M55 68 L78 70 L80 78 L58 76 Z" strokeWidth="1.3" />
        <path d="M22 80 L38 78 L40 88 L24 90 Z" strokeWidth="1.3" />
        <path d="M38 78 L58 76 L60 86 L40 88 Z" strokeWidth="1.3" />
        <path d="M58 76 L80 78 L78 88 L60 86 Z" strokeWidth="1.3" />
        <path d="M24 90 L40 88 L42 95 L26 95 Z" strokeWidth="1.3" />
        <path d="M40 88 L60 86 L62 95 L42 95 Z" strokeWidth="1.3" />
        <path d="M60 86 L78 88 L76 95 L62 95 Z" strokeWidth="1.3" />

        {/* Stepping stones across street */}
        <path d="M28 78 L32 78 L32 82 L28 82 Z" strokeWidth="1.5" />
        <path d="M48 76 L52 76 L52 80 L48 80 Z" strokeWidth="1.5" />
        <path d="M68 78 L72 78 L72 82 L68 82 Z" strokeWidth="1.5" />

        {/* Central drainage channel */}
        <path d="M48 70 L52 70 L52 95" strokeWidth="0.8" opacity="0.6" />

        {/* Wheel ruts worn in stone */}
        <path d="M30 72 L30 95" opacity="0.4" strokeWidth="0.6" />
        <path d="M70 72 L70 95" opacity="0.4" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * PLINTH - Classical column base detail on plinth
 * Reference: Ionic column base, Erechtheion
 * Shows: Column base moldings sitting on square plinth
 * Unique view: Close-up architectural detail of base
 */
const PlinthSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="plinth-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#plinth-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Column shaft above and pavement */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Column shaft (fluted) */}
        <path d="M35 5 L35 35" />
        <path d="M40 5 L40 35" />
        <path d="M45 5 L45 35" />
        <path d="M50 5 L50 35" />
        <path d="M55 5 L55 35" />
        <path d="M60 5 L60 35" />
        <path d="M65 5 L65 35" />
        {/* Entasis curve hint */}
        <path d="M33 5 Q32 20, 34 35" />
        <path d="M67 5 Q68 20, 66 35" />
        {/* Adjacent pavement */}
        <path d="M5 90 L25 90 L25 95 L5 95" />
        <path d="M75 90 L95 90 L95 95 L75 95" />
      </g>

      {/* PRIMARY - Column base and plinth */}
      <g strokeWidth="1.2">
        {/* Torus (upper round molding) */}
        <ellipse cx="50" cy="38" rx="18" ry="4" strokeWidth="1.5" />
        <path d="M32 38 Q32 42, 50 44 Q68 42, 68 38" strokeWidth="1.2" />

        {/* Scotia (concave molding) */}
        <path d="M34 44 Q34 50, 50 52 Q66 50, 66 44" strokeWidth="1.3" />
        <path d="M36 48 L64 48" strokeWidth="0.7" />

        {/* Lower torus */}
        <ellipse cx="50" cy="55" rx="20" ry="5" strokeWidth="1.5" />
        <path d="M30 55 Q30 60, 50 62 Q70 60, 70 55" strokeWidth="1.2" />

        {/* Plinth (square base block) */}
        <path d="M25 65 L75 65 L75 85 L25 85 Z" strokeWidth="2" />
        {/* Plinth top surface */}
        <path d="M25 65 L30 60 L70 60 L75 65" strokeWidth="1.5" />
        <path d="M30 60 L30 62" strokeWidth="1" />
        <path d="M70 60 L70 62" strokeWidth="1" />

        {/* Floor level */}
        <path d="M10 85 L90 85" strokeWidth="1.8" />

        {/* Plinth shadow */}
        <path d="M75 85 L80 90 L80 85" opacity="0.4" strokeWidth="0.8" />

        {/* Molding profile detail lines */}
        <path d="M32 40 L32 44" strokeWidth="0.6" />
        <path d="M68 40 L68 44" strokeWidth="0.6" />
        <path d="M30 57 L30 65" strokeWidth="0.6" />
        <path d="M70 57 L70 65" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * PODIUM - Roman temple front with monumental steps
 * Reference: Maison Carrée, Nîmes - temple podium approach
 * Shows: High podium with grand staircase, colonnade above
 * Unique view: Looking up at temple entrance
 */
const PodiumSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="podium-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#podium-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Temple colonnade and pediment above */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Pediment */}
        <path d="M20 8 L50 2 L80 8" />
        <path d="M25 8 L50 4 L75 8" />
        {/* Entablature */}
        <path d="M15 8 L85 8 L85 15 L15 15 Z" />
        {/* Column tops */}
        <path d="M22 15 L22 30" />
        <path d="M38 15 L38 30" />
        <path d="M50 15 L50 30" />
        <path d="M62 15 L62 30" />
        <path d="M78 15 L78 30" />
        {/* Cella door */}
        <path d="M42 18 L58 18 L58 28 L42 28" />
      </g>

      {/* PRIMARY - Temple podium and steps */}
      <g strokeWidth="1.2">
        {/* Podium top platform */}
        <path d="M15 30 L85 30 L88 35 L12 35 Z" strokeWidth="1.8" />

        {/* Podium body - high Roman style */}
        <path d="M12 35 L12 60 L88 60 L88 35" strokeWidth="1.5" />

        {/* Podium moldings */}
        <path d="M10 60 L10 65 L90 65 L90 60" strokeWidth="1.3" />
        <path d="M12 55 L88 55" strokeWidth="0.8" />
        <path d="M12 45 L88 45" strokeWidth="0.6" />

        {/* Central staircase */}
        <path d="M35 60 L35 68 L65 68 L65 60" strokeWidth="1.5" />
        <path d="M33 68 L33 76 L67 76 L67 68" strokeWidth="1.5" />
        <path d="M31 76 L31 84 L69 84 L69 76" strokeWidth="1.5" />
        <path d="M29 84 L29 92 L71 92 L71 84" strokeWidth="1.5" />

        {/* Step treads */}
        <path d="M35 65 L65 65" strokeWidth="1" />
        <path d="M33 73 L67 73" strokeWidth="1" />
        <path d="M31 81 L69 81" strokeWidth="1" />
        <path d="M29 89 L71 89" strokeWidth="1" />

        {/* Ground level */}
        <path d="M5 92 L95 92" strokeWidth="2" />

        {/* Approach pavement */}
        <path d="M25 92 L25 98" strokeWidth="0.8" />
        <path d="M50 92 L50 98" strokeWidth="0.8" />
        <path d="M75 92 L75 98" strokeWidth="0.8" />
      </g>
    </g>
  </svg>
)

/**
 * STEP - Grand staircase with balustrade and newel
 * Reference: Paris Opera House grand escalier
 * Shows: Sweeping stairs with ornate balustrade, newel post
 * Unique view: Looking up the grand stair from below
 */
const StepSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="step-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#step-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Upper landing and chandelier */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Upper landing */}
        <path d="M25 15 L75 15 L80 20 L20 20 Z" />
        {/* Archway at top */}
        <path d="M35 5 Q50 2, 65 5 L65 15 L35 15 Z" />
        {/* Chandelier */}
        <ellipse cx="50" cy="35" rx="6" ry="3" />
        <path d="M50 10 L50 32" />
        <path d="M47 35 L47 38" />
        <path d="M53 35 L53 38" />
      </g>

      {/* PRIMARY - Grand staircase with balustrade */}
      <g strokeWidth="1.2">
        {/* Main stair treads in perspective */}
        <path d="M20 20 L80 20 L85 28 L15 28 Z" strokeWidth="1.5" />
        <path d="M15 28 L85 28 L88 36 L12 36 Z" strokeWidth="1.5" />
        <path d="M12 36 L88 36 L90 44 L10 44 Z" strokeWidth="1.5" />
        <path d="M10 44 L90 44 L92 52 L8 52 Z" strokeWidth="1.5" />
        <path d="M8 52 L92 52 L94 60 L6 60 Z" strokeWidth="1.5" />
        <path d="M6 60 L94 60 L95 68 L5 68 Z" strokeWidth="1.5" />

        {/* Left balustrade */}
        <path d="M20 20 L5 68" strokeWidth="1.8" />
        {/* Right balustrade */}
        <path d="M80 20 L95 68" strokeWidth="1.8" />

        {/* Balusters (simplified) */}
        <path d="M18 24 L13 40" strokeWidth="0.9" />
        <path d="M15 32 L10 48" strokeWidth="0.9" />
        <path d="M12 40 L8 56" strokeWidth="0.9" />
        <path d="M82 24 L87 40" strokeWidth="0.9" />
        <path d="M85 32 L90 48" strokeWidth="0.9" />
        <path d="M88 40 L92 56" strokeWidth="0.9" />

        {/* Newel posts */}
        <path d="M5 65 L5 75 L10 75 L10 68 L5 68" strokeWidth="1.5" />
        <circle cx="7" cy="63" r="3" strokeWidth="1.3" />
        <path d="M95 65 L95 75 L90 75 L90 68 L95 68" strokeWidth="1.5" />
        <circle cx="93" cy="63" r="3" strokeWidth="1.3" />

        {/* Landing floor */}
        <path d="M5 75 L95 75 L95 95 L5 95 Z" strokeWidth="1.5" />

        {/* Carpet runner indicated */}
        <path d="M35 20 L35 68 L30 75" strokeWidth="0.8" opacity="0.5" />
        <path d="M65 20 L65 68 L70 75" strokeWidth="0.8" opacity="0.5" />

        {/* Step nosing detail */}
        <path d="M15 30 L85 30" strokeWidth="0.6" />
        <path d="M12 38 L88 38" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * TERRACE - Italian Renaissance terrace overlooking landscape
 * Reference: Villa d'Este, Tivoli - belvedere terrace
 * Shows: Balustraded terrace with urns, distant view
 * Unique view: Standing on terrace looking at panorama
 */
const TerraceSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="terrace-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#terrace-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Distant landscape view */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Distant hills */}
        <path d="M0 25 Q25 15, 50 22 Q75 18, 100 25" />
        <path d="M0 30 Q30 22, 60 28 Q80 24, 100 30" />
        {/* Cypress trees in distance */}
        <path d="M20 25 L20 35 L18 35 L20 22 L22 35 L20 35" />
        <path d="M70 28 L70 38 L68 38 L70 25 L72 38 L70 38" />
        {/* Villa in distance */}
        <path d="M40 28 L55 28 L55 35 L40 35 Z" />
        <path d="M42 28 L47 24 L53 28" />
      </g>

      {/* PRIMARY - Terrace with balustrade */}
      <g strokeWidth="1.2">
        {/* Balustrade rail */}
        <path d="M5 40 L95 40" strokeWidth="2" />
        <path d="M5 45 L95 45" strokeWidth="1.5" />

        {/* Balusters */}
        {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
          <path key={i} d={`M${x} 45 Q${x-2} 50, ${x} 55 Q${x+2} 60, ${x} 65`} strokeWidth="1" />
        ))}

        {/* Balustrade base */}
        <path d="M5 65 L95 65" strokeWidth="1.5" />

        {/* Corner piers with urns */}
        <path d="M5 35 L5 70 L15 70 L15 40" strokeWidth="1.5" />
        <path d="M85 35 L85 70 L95 70 L95 40" strokeWidth="1.5" />
        {/* Decorative urns on piers */}
        <path d="M7 30 L13 30 L12 35 L8 35 Z" strokeWidth="1.2" />
        <path d="M10 27 L10 30" strokeWidth="1" />
        <path d="M8 28 L10 25 L12 28" strokeWidth="0.8" />
        <path d="M87 30 L93 30 L92 35 L88 35 Z" strokeWidth="1.2" />
        <path d="M90 27 L90 30" strokeWidth="1" />

        {/* Terrace floor with stone pavers */}
        <path d="M5 70 L95 70 L95 95 L5 95 Z" strokeWidth="1.5" />
        {/* Paver pattern */}
        <path d="M5 80 L95 80" strokeWidth="0.8" />
        <path d="M5 90 L95 90" strokeWidth="0.8" />
        <path d="M25 70 L25 95" strokeWidth="0.8" />
        <path d="M50 70 L50 95" strokeWidth="0.8" />
        <path d="M75 70 L75 95" strokeWidth="0.8" />

        {/* Steps down from terrace */}
        <path d="M40 95 L40 98 L60 98 L60 95" strokeWidth="1.2" />
      </g>
    </g>
  </svg>
)

/**
 * TERRAZZO - Mid-century modern lobby with brass strips
 * Reference: 1950s Miami Beach hotel lobby
 * Shows: Terrazzo with brass dividers, period furniture silhouette
 * Unique view: Hotel lobby entrance perspective
 */
const TerrazzoSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="terrazzo-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#terrazzo-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Mid-century lobby elements */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Reception desk silhouette */}
        <path d="M60 25 L85 25 L85 45 L60 45 Z" />
        <path d="M62 30 L62 43" />
        {/* Pendant light */}
        <path d="M30 10 L30 20" />
        <path d="M25 20 Q30 25, 35 20" />
        {/* Potted plant */}
        <path d="M15 35 L20 35 L20 45 L15 45 Z" />
        <path d="M12 30 Q17 25, 17 35" />
        <path d="M23 30 Q18 25, 18 35" />
        {/* Sputnik chandelier hint */}
        <circle cx="50" cy="15" r="3" />
        <path d="M47 12 L45 8" />
        <path d="M53 12 L55 8" />
        <path d="M50 18 L50 22" />
      </g>

      {/* PRIMARY - Terrazzo floor with brass dividers */}
      <g strokeWidth="1.2">
        {/* Floor plane */}
        <path d="M5 50 L95 50 L95 95 L5 95 Z" strokeWidth="1.5" />

        {/* Brass divider strips - geometric pattern */}
        <path d="M5 72 L95 72" strokeWidth="2" />
        <path d="M50 50 L50 95" strokeWidth="2" />
        <path d="M27 50 L27 95" strokeWidth="1.5" />
        <path d="M73 50 L73 95" strokeWidth="1.5" />

        {/* Diagonal brass strip accent */}
        <path d="M5 50 L50 72" strokeWidth="1.5" />
        <path d="M95 50 L50 72" strokeWidth="1.5" />

        {/* Aggregate chips - various sizes */}
        {/* Top left quadrant */}
        <path d="M12 55 L15 57 L13 60 Z" strokeWidth="0.9" />
        <path d="M20 62 L23 60 L24 64 L21 65 Z" strokeWidth="0.9" />
        <path d="M35 54 L38 56 L36 59 Z" strokeWidth="0.9" />
        <path d="M18 54 L20 56" strokeWidth="0.8" />

        {/* Top right quadrant */}
        <path d="M55 58 L58 55 L60 59 Z" strokeWidth="0.9" />
        <path d="M68 54 L72 56 L70 60 L66 58 Z" strokeWidth="0.9" />
        <path d="M82 62 L85 60 L86 64 Z" strokeWidth="0.9" />

        {/* Bottom left quadrant */}
        <path d="M10 78 L13 76 L15 80 L12 82 Z" strokeWidth="0.9" />
        <path d="M22 85 L25 83 L27 87 Z" strokeWidth="0.9" />
        <path d="M38 76 L41 78 L39 82 Z" strokeWidth="0.9" />
        <path d="M15 90 L18 88 L19 92 Z" strokeWidth="0.9" />

        {/* Bottom right quadrant */}
        <path d="M55 80 L58 78 L60 82 L57 84 Z" strokeWidth="0.9" />
        <path d="M70 88 L73 86 L75 90 Z" strokeWidth="0.9" />
        <path d="M85 78 L88 80 L86 84 Z" strokeWidth="0.9" />
        <path d="M62 90 L65 88 L66 92 Z" strokeWidth="0.9" />

        {/* Polished surface gleam */}
        <path d="M30 65 L32 67" opacity="0.3" strokeWidth="0.6" />
        <path d="M78 85 L80 87" opacity="0.3" strokeWidth="0.6" />
      </g>
    </g>
  </svg>
)

/**
 * THRESHOLD - Ancient temple threshold with pivot holes
 * Reference: Greek temple threshold, Parthenon doorway
 * Shows: Massive threshold stone with door pivot sockets
 * Unique view: Looking down at threshold stone detail
 */
const ThresholdSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="threshold-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#threshold-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Door jambs and interior/exterior */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Left door jamb */}
        <path d="M15 10 L15 45" />
        <path d="M20 10 L20 45" />
        <path d="M15 10 L20 10" />
        {/* Right door jamb */}
        <path d="M80 10 L80 45" />
        <path d="M85 10 L85 45" />
        <path d="M80 10 L85 10" />
        {/* Interior space beyond */}
        <path d="M25 15 L75 15" />
        <path d="M30 20 L70 20 L70 40 L30 40 Z" />
        {/* Exterior pavement */}
        <path d="M10 90 L10 95 L90 95 L90 90" />
        <path d="M25 92 L35 92" />
        <path d="M65 92 L75 92" />
      </g>

      {/* PRIMARY - Monumental threshold stone */}
      <g strokeWidth="1.2">
        {/* Main threshold block */}
        <path d="M10 45 L90 45 L90 85 L10 85 Z" strokeWidth="2" />

        {/* Threshold top surface detail */}
        <path d="M12 47 L88 47 L88 83 L12 83 Z" strokeWidth="1" />

        {/* Door pivot sockets (circular depressions) */}
        <circle cx="22" cy="55" r="6" strokeWidth="1.8" />
        <circle cx="22" cy="55" r="3" strokeWidth="1" />
        <circle cx="78" cy="55" r="6" strokeWidth="1.8" />
        <circle cx="78" cy="55" r="3" strokeWidth="1" />

        {/* Wear pattern from centuries of footsteps */}
        <path d="M30 60 Q50 72, 70 60" strokeWidth="1.5" />
        <path d="M35 65 Q50 74, 65 65" strokeWidth="1" opacity="0.6" />

        {/* Threshold center channel (water/drainage) */}
        <path d="M40 47 L40 83" strokeWidth="0.8" />
        <path d="M60 47 L60 83" strokeWidth="0.8" />

        {/* Stone clamp holes (for lifting) */}
        <path d="M25 75 L30 75 L30 80 L25 80 Z" strokeWidth="0.9" />
        <path d="M70 75 L75 75 L75 80 L70 80 Z" strokeWidth="0.9" />

        {/* Mason's marks */}
        <path d="M48 78 L52 78 L50 75 Z" opacity="0.5" strokeWidth="0.7" />

        {/* Edge shadow/depth */}
        <path d="M10 85 L10 88 L90 88 L90 85" strokeWidth="1.3" />

        {/* Floor on either side meeting threshold */}
        <path d="M5 45 L10 45" strokeWidth="1.5" />
        <path d="M90 45 L95 45" strokeWidth="1.5" />
        <path d="M5 85 L10 85" strokeWidth="1.5" />
        <path d="M90 85 L95 85" strokeWidth="1.5" />
      </g>
    </g>
  </svg>
)

/**
 * TILE - Dutch kitchen with Delft blue tiles
 * Reference: 17th century Dutch interior, Vermeer paintings
 * Shows: Blue and white tiles on wall/floor, kitchen elements
 * Unique view: Corner of Dutch kitchen with tile dado
 */
const TileSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tile-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#tile-halo)" : undefined} fill="none" stroke="currentColor" strokeLinecap="round">
      {/* CONTEXT - Dutch kitchen elements */}
      <g strokeDasharray="3 2" opacity="0.4" strokeWidth="0.8">
        {/* Window with leaded glass */}
        <path d="M60 5 L60 35 L90 35 L90 5 Z" />
        <path d="M65 5 L65 35" />
        <path d="M75 5 L75 35" />
        <path d="M85 5 L85 35" />
        <path d="M60 15 L90 15" />
        <path d="M60 25 L90 25" />
        {/* Copper pot on shelf */}
        <path d="M15 20 Q20 15, 25 20 L25 28 L15 28 Z" />
        <path d="M12 20 L28 20" />
        {/* Shelf bracket */}
        <path d="M8 20 L8 30 L12 30" />
      </g>

      {/* PRIMARY - Delft tile pattern */}
      <g strokeWidth="1">
        {/* Tile dado on wall (vertical tiles) */}
        <path d="M5 35 L55 35 L55 55 L5 55 Z" strokeWidth="1.5" />

        {/* Individual wall tiles with Delft motifs */}
        {[0, 1, 2, 3, 4].map((col) => {
          const x = 7 + col * 10
          return (
            <g key={col}>
              <path d={`M${x} 37 L${x+8} 37 L${x+8} 53 L${x} 53 Z`} strokeWidth="1.1" />
              {/* Different motif for each tile */}
              {col % 3 === 0 && (
                // Windmill
                <g>
                  <path d={`M${x+4} 42 L${x+4} 50`} strokeWidth="0.8" />
                  <path d={`M${x+2} 44 L${x+6} 44`} strokeWidth="0.8" />
                  <path d={`M${x+4} 44 L${x+2} 42 L${x+4} 44 L${x+6} 42`} strokeWidth="0.6" />
                </g>
              )}
              {col % 3 === 1 && (
                // Flower
                <circle cx={x+4} cy={45} r="2" strokeWidth="0.8" />
              )}
              {col % 3 === 2 && (
                // Ship
                <path d={`M${x+2} 48 Q${x+4} 44, ${x+6} 48`} strokeWidth="0.8" />
              )}
              {/* Corner ornaments */}
              <circle cx={x+1} cy={38} r="0.8" strokeWidth="0.5" />
              <circle cx={x+7} cy={38} r="0.8" strokeWidth="0.5" />
              <circle cx={x+1} cy={52} r="0.8" strokeWidth="0.5" />
              <circle cx={x+7} cy={52} r="0.8" strokeWidth="0.5" />
            </g>
          )
        })}

        {/* Floor tiles */}
        <path d="M5 60 L95 60 L95 95 L5 95 Z" strokeWidth="1.5" />

        {/* Floor tile grid */}
        {[0, 1, 2, 3, 4, 5].map((row) =>
          [0, 1, 2, 3, 4, 5, 6].map((col) => {
            const x = 7 + col * 13
            const y = 62 + row * 5.5
            return (
              <g key={`${row}-${col}`}>
                <path d={`M${x} ${y} L${x+12} ${y} L${x+12} ${y+5} L${x} ${y+5} Z`} strokeWidth="0.9" />
                {/* Alternating pattern */}
                {(row + col) % 2 === 0 && (
                  <path d={`M${x+6} ${y+1} L${x+10} ${y+2.5} L${x+6} ${y+4} L${x+2} ${y+2.5} Z`}
                        opacity="0.5" strokeWidth="0.6" />
                )}
              </g>
            )
          })
        )}

        {/* Baseboard transition */}
        <path d="M5 55 L55 55 L55 60 L5 60 Z" strokeWidth="1.2" />

        {/* Light reflection on tiles */}
        <path d="M70 75 L72 77" opacity="0.3" strokeWidth="0.5" />
        <path d="M30 85 L32 87" opacity="0.3" strokeWidth="0.5" />
      </g>
    </g>
  </svg>
)

// Export mapping for all floor elements
export const FLOOR_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'atrium': AtriumSVG,
  'checkerboard': CheckerboardSVG,
  'courtyard': CourtyardSVG,
  'flagstone': FlagstoneSVG,
  'foundation': FoundationSVG,
  'geometric': GeometricSVG,
  'herringbone': HerringboneSVG,
  'inlay': InlaySVG,
  'marble': MarbleSVG,
  'marquetry': MarquetrySVG,
  'mosaic': MosaicSVG,
  'parquet': ParquetSVG,
  'paving': PavingSVG,
  'plinth': PlinthSVG,
  'podium': PodiumSVG,
  'step': StepSVG,
  'terrace': TerraceSVG,
  'terrazzo': TerrazzoSVG,
  'threshold': ThresholdSVG,
  'tile': TileSVG,
}

export {
  AtriumSVG,
  CheckerboardSVG,
  CourtyardSVG,
  FlagstoneSVG,
  FoundationSVG,
  GeometricSVG,
  HerringboneSVG,
  InlaySVG,
  MarbleSVG,
  MarquetrySVG,
  MosaicSVG,
  ParquetSVG,
  PavingSVG,
  PlinthSVG,
  PodiumSVG,
  StepSVG,
  TerraceSVG,
  TerrazzoSVG,
  ThresholdSVG,
  TileSVG,
}
