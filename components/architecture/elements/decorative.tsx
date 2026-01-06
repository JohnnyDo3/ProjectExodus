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

// 1. Acroterion - ornament at roof corners/apex
const AcroterionSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="acroterion-halo" intensity={1} />}
    <g filter={showHalo ? "url(#acroterion-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Pediment roof line */}
      <path d="M10 75 L50 55 L90 75" />
      {/* Center acroterion - palmette style */}
      <path d="M45 55 L45 20 L55 20 L55 55" />
      <path d="M50 20 L50 8" />
      {/* Central palmette leaves */}
      <path d="M50 8 Q55 15, 58 25 Q55 22, 50 20" />
      <path d="M50 8 Q45 15, 42 25 Q45 22, 50 20" />
      <path d="M50 10 Q60 18, 62 30" />
      <path d="M50 10 Q40 18, 38 30" />
      {/* Side volutes */}
      <path d="M42 35 Q38 30, 35 35 Q32 42, 38 45" />
      <path d="M58 35 Q62 30, 65 35 Q68 42, 62 45" />
      {/* Corner acroteria - smaller */}
      <path d="M8 75 L8 65 L15 65 L15 75" />
      <path d="M11 65 L11 58 Q12 55, 11.5 52" />
      <path d="M92 75 L92 65 L85 65 L85 75" />
      <path d="M89 65 L89 58 Q88 55, 88.5 52" />
      {/* Base moldings */}
      <path d="M43 55 L43 58 L57 58 L57 55" />
    </g>
  </svg>
)

// 2. Baluster - shaped spindle/pillar
const BalusterSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="baluster-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#baluster-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Top rail */}
      <path d="M30 12 L70 12 L70 18 L30 18 Z" />
      {/* Bottom rail */}
      <path d="M30 82 L70 82 L70 88 L30 88 Z" />
      {/* Classical baluster profile - vase shape */}
      <path d="M42 18 L42 22 Q38 25, 38 32 Q40 38, 45 42" />
      <path d="M58 18 L58 22 Q62 25, 62 32 Q60 38, 55 42" />
      {/* Neck */}
      <path d="M45 42 Q44 45, 44 50 Q44 55, 45 58" />
      <path d="M55 42 Q56 45, 56 50 Q56 55, 55 58" />
      {/* Belly (widest part) */}
      <path d="M45 58 Q38 62, 38 70 Q40 78, 45 80" />
      <path d="M55 58 Q62 62, 62 70 Q60 78, 55 80" />
      {/* Base */}
      <path d="M45 80 L42 82" />
      <path d="M55 80 L58 82" />
      {/* Profile rings */}
      <path d="M44 24 L56 24" />
      <path d="M45 42 L55 42" />
      <path d="M44 50 L56 50" />
      <path d="M43 70 L57 70" />
      {/* Side balusters (smaller) */}
      <path d="M32 18 L32 82" strokeWidth="0.5" opacity="0.5" />
      <path d="M68 18 L68 82" strokeWidth="0.5" opacity="0.5" />
    </g>
  </svg>
)

// 3. Balustrade - row of balusters with rail
const BalustradeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="balustrade-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#balustrade-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Top handrail */}
      <path d="M8 20 L92 20 L92 26 L8 26 Z" />
      <path d="M10 23 L90 23" strokeWidth="0.4" />
      {/* Bottom rail */}
      <path d="M8 80 L92 80 L92 86 L8 86 Z" />
      {/* Multiple balusters */}
      {[15, 30, 45, 60, 75].map((x, i) => (
        <g key={i}>
          <path d={`M${x-3} 26 L${x-3} 30 Q${x-5} 35, ${x-4} 42`} />
          <path d={`M${x+3} 26 L${x+3} 30 Q${x+5} 35, ${x+4} 42`} />
          <path d={`M${x-4} 42 Q${x-5} 50, ${x-3} 55`} />
          <path d={`M${x+4} 42 Q${x+5} 50, ${x+3} 55`} />
          <path d={`M${x-3} 55 Q${x-6} 65, ${x-4} 75 L${x-4} 80`} />
          <path d={`M${x+3} 55 Q${x+6} 65, ${x+4} 75 L${x+4} 80`} />
        </g>
      ))}
      {/* End posts */}
      <path d="M5 15 L5 90 L11 90 L11 15 Z" />
      <path d="M89 15 L89 90 L95 90 L95 15 Z" />
      {/* Post caps */}
      <path d="M4 12 L12 12 L12 15 L4 15 Z" />
      <path d="M88 12 L96 12 L96 15 L88 15 Z" />
      <path d="M8 10 Q8 8, 8 10" />
    </g>
  </svg>
)

// 4. Bracket - projecting support element
const BracketSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="bracket-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#bracket-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Wall surface */}
      <path d="M10 10 L10 90 L25 90 L25 10" opacity="0.3" />
      {/* Supported element (shelf/cornice) */}
      <path d="M25 25 L90 25 L90 35 L25 35" />
      {/* Main bracket shape - scrolled */}
      <path d="M25 35 L25 75" strokeWidth="1.2" />
      <path d="M25 35 Q45 38, 55 50 Q65 62, 55 75 Q45 85, 25 75" />
      {/* Inner scroll detail */}
      <path d="M28 40 Q40 42, 48 50 Q55 58, 50 68 Q45 76, 30 72" />
      {/* Scroll volute */}
      <path d="M55 75 Q60 72, 58 68 Q55 65, 52 68" />
      {/* Acanthus leaf detail */}
      <path d="M30 50 Q35 48, 38 52" />
      <path d="M32 58 Q38 55, 42 60" />
      <path d="M30 65 Q36 63, 40 68" />
      {/* Top attachment */}
      <path d="M25 32 L35 32 L35 38 L25 38" />
      {/* Side profile lines */}
      <path d="M23 35 L23 75" strokeWidth="0.4" />
    </g>
  </svg>
)

// 5. Cartouche - ornamental frame/shield
const CartoucheSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="cartouche-halo" intensity={1} />}
    <g filter={showHalo ? "url(#cartouche-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Main shield shape - baroque style */}
      <path d="M50 10 Q75 15, 85 35 Q90 55, 75 75 Q60 90, 50 92 Q40 90, 25 75 Q10 55, 15 35 Q25 15, 50 10" />
      {/* Inner border */}
      <path d="M50 18 Q68 22, 77 38 Q82 52, 70 68 Q58 80, 50 82 Q42 80, 30 68 Q18 52, 23 38 Q32 22, 50 18" />
      {/* Scrollwork on sides */}
      <path d="M15 35 Q8 40, 10 50 Q8 55, 15 58" />
      <path d="M85 35 Q92 40, 90 50 Q92 55, 85 58" />
      {/* Top decoration */}
      <path d="M45 10 Q50 5, 55 10" />
      <path d="M50 5 L50 2" />
      {/* Bottom flourish */}
      <path d="M50 92 L50 98" />
      <path d="M45 95 Q50 100, 55 95" />
      {/* Interior field for text/emblem */}
      <ellipse cx="50" cy="50" rx="20" ry="25" opacity="0.3" />
      {/* Decorative curls */}
      <path d="M25 20 Q20 25, 22 30" />
      <path d="M75 20 Q80 25, 78 30" />
      <path d="M20 70 Q15 75, 20 80" />
      <path d="M80 70 Q85 75, 80 80" />
    </g>
  </svg>
)

// 6. Festoon - carved garland decoration
const FestoonSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="festoon-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#festoon-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Hanging points - rosettes */}
      <circle cx="15" cy="20" r="6" />
      <circle cx="15" cy="20" r="3" />
      <circle cx="85" cy="20" r="6" />
      <circle cx="85" cy="20" r="3" />
      {/* Main swag curve */}
      <path d="M15 26 Q25 35, 35 55 Q45 70, 50 72 Q55 70, 65 55 Q75 35, 85 26" />
      {/* Leaf/flower details along swag */}
      <path d="M22 38 Q25 42, 28 38" />
      <path d="M32 52 Q35 57, 38 52" />
      <path d="M45 65 Q48 70, 50 68 Q52 70, 55 65" />
      <path d="M62 52 Q65 57, 68 52" />
      <path d="M72 38 Q75 42, 78 38" />
      {/* Fruit clusters */}
      <circle cx="30" cy="48" r="3" />
      <circle cx="33" cy="52" r="2.5" />
      <circle cx="70" cy="48" r="3" />
      <circle cx="67" cy="52" r="2.5" />
      {/* Ribbon tails */}
      <path d="M15 26 L12 35 Q10 45, 15 50" />
      <path d="M85 26 L88 35 Q90 45, 85 50" />
      {/* Depth lines */}
      <path d="M20 32 Q35 45, 50 60 Q65 45, 80 32" opacity="0.4" />
      {/* Central bow/knot at bottom */}
      <path d="M46 72 Q50 78, 54 72" />
      <path d="M48 75 L48 82" />
      <path d="M52 75 L52 82" />
    </g>
  </svg>
)

// 7. Finial - decorative terminating element
const FinialSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="finial-halo" intensity={1} />}
    <g filter={showHalo ? "url(#finial-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Base/post */}
      <path d="M40 90 L40 75 L60 75 L60 90" />
      <path d="M35 90 L65 90" strokeWidth="1.2" />
      {/* Lower bulb */}
      <path d="M42 75 Q35 70, 35 62 Q35 54, 42 50" />
      <path d="M58 75 Q65 70, 65 62 Q65 54, 58 50" />
      {/* Neck */}
      <path d="M42 50 Q40 48, 42 45" />
      <path d="M58 50 Q60 48, 58 45" />
      {/* Upper bulb - fluted */}
      <path d="M42 45 Q32 40, 32 30 Q32 20, 45 15" />
      <path d="M58 45 Q68 40, 68 30 Q68 20, 55 15" />
      {/* Flute lines */}
      <path d="M38 35 L42 25" strokeWidth="0.4" />
      <path d="M50 42 L50 20" strokeWidth="0.4" />
      <path d="M62 35 L58 25" strokeWidth="0.4" />
      {/* Pointed top */}
      <path d="M45 15 Q50 5, 55 15" />
      <path d="M50 5 L50 2" strokeWidth="1" />
      {/* Ring details */}
      <path d="M42 45 L58 45" />
      <path d="M42 50 L58 50" />
      <path d="M40 75 L60 75" />
      {/* Decorative ball suggestion */}
      <circle cx="50" cy="58" r="2" opacity="0.5" />
    </g>
  </svg>
)

// 8. Frieze - horizontal decorative band
const FriezeSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="frieze-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#frieze-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Upper cornice */}
      <path d="M5 30 L95 30" strokeWidth="1.5" />
      <path d="M5 33 L95 33" />
      {/* Main frieze band */}
      <path d="M5 35 L5 65 L95 65 L95 35 Z" />
      {/* Lower architrave */}
      <path d="M5 67 L95 67" />
      <path d="M5 70 L95 70" strokeWidth="1.5" />
      {/* Frieze decoration - running pattern (Greek key/meander) */}
      <path d="M10 42 L10 50 L18 50 L18 42 L10 42" />
      <path d="M18 50 L18 58 L26 58" />
      <path d="M26 58 L26 50 L34 50 L34 58 L26 58" />
      <path d="M34 50 L34 42 L42 42" />
      <path d="M42 42 L42 50 L50 50 L50 42 L42 42" />
      <path d="M50 50 L50 58 L58 58" />
      <path d="M58 58 L58 50 L66 50 L66 58 L58 58" />
      <path d="M66 50 L66 42 L74 42" />
      <path d="M74 42 L74 50 L82 50 L82 42 L74 42" />
      <path d="M82 50 L82 58 L90 58" />
      {/* Dentil molding below */}
      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
        <path key={i} d={`M${x-3} 67 L${x-3} 63 L${x+1} 63 L${x+1} 67`} />
      ))}
    </g>
  </svg>
)

// 9. Gargoyle - water spout sculpture
const GargoyleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="gargoyle-halo" intensity={1.1} />}
    <g filter={showHalo ? "url(#gargoyle-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Wall attachment */}
      <path d="M5 30 L5 70 L20 70 L20 30 Z" opacity="0.3" />
      {/* Body projecting from wall */}
      <path d="M20 35 Q35 30, 50 35 Q65 40, 75 50" />
      <path d="M20 65 Q35 70, 50 65 Q65 60, 75 50" />
      {/* Head */}
      <path d="M75 50 Q85 45, 90 48 Q95 50, 90 55 Q85 58, 75 50" />
      {/* Grotesque face */}
      <circle cx="85" cy="50" r="3" />
      <path d="M88 48 L92 46" />
      <path d="M88 52 L92 54" />
      {/* Open mouth (water spout) */}
      <path d="M90 50 L98 48 L98 52 Z" />
      {/* Water stream */}
      <path d="M98 50 Q102 52, 100 58 Q98 65, 95 75" strokeDasharray="2,2" opacity="0.5" />
      {/* Ears/horns */}
      <path d="M82 42 L85 35 L88 43" />
      {/* Wings folded */}
      <path d="M30 40 Q40 35, 50 40 Q45 38, 40 42" />
      <path d="M30 60 Q40 65, 50 60 Q45 62, 40 58" />
      {/* Claws gripping */}
      <path d="M20 42 L25 45 L22 48" />
      <path d="M20 58 L25 55 L22 52" />
      {/* Texture/scales */}
      <path d="M35 48 Q38 50, 35 52" />
      <path d="M45 46 Q48 50, 45 54" />
      <path d="M55 47 Q58 50, 55 53" />
      <path d="M65 48 Q68 50, 65 52" />
    </g>
  </svg>
)

// 10. Grotesque - decorative carved creature
const GrotesqueSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="grotesque-halo" intensity={1} />}
    <g filter={showHalo ? "url(#grotesque-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Architectural frame */}
      <path d="M20 15 L20 85 L80 85 L80 15" opacity="0.3" />
      {/* Face outline - Green Man style */}
      <ellipse cx="50" cy="50" rx="25" ry="30" />
      {/* Leaf/foliage emerging from face */}
      <path d="M25 45 Q15 40, 10 50 Q15 55, 20 52" />
      <path d="M75 45 Q85 40, 90 50 Q85 55, 80 52" />
      <path d="M30 25 Q25 15, 35 10 Q40 15, 38 22" />
      <path d="M70 25 Q75 15, 65 10 Q60 15, 62 22" />
      {/* Eyes - leaf shaped */}
      <path d="M40 42 Q45 38, 50 42 Q45 46, 40 42" />
      <path d="M50 42 Q55 38, 60 42 Q55 46, 50 42" />
      <circle cx="45" cy="42" r="1.5" />
      <circle cx="55" cy="42" r="1.5" />
      {/* Nose */}
      <path d="M50 45 L48 55 L52 55 Z" />
      {/* Mouth with foliage */}
      <path d="M40 62 Q45 68, 50 65 Q55 68, 60 62" />
      <path d="M45 65 Q42 75, 35 82" />
      <path d="M50 67 L50 85" />
      <path d="M55 65 Q58 75, 65 82" />
      {/* Vine tendrils */}
      <path d="M35 82 Q30 88, 25 85" />
      <path d="M65 82 Q70 88, 75 85" />
      {/* Cheek foliage */}
      <path d="M30 55 Q25 58, 28 63" />
      <path d="M70 55 Q75 58, 72 63" />
    </g>
  </svg>
)

// 11. Medallion - circular decorative element
const MedallionSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="medallion-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#medallion-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Outer circle frame */}
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="37" />
      {/* Decorative border - egg and dart */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 50 + 38.5 * Math.cos(rad)
        const y = 50 + 38.5 * Math.sin(rad)
        return <circle key={i} cx={x} cy={y} r="2" opacity="0.6" />
      })}
      {/* Inner field */}
      <circle cx="50" cy="50" r="30" />
      {/* Central motif - classical profile */}
      <path d="M40 35 Q45 30, 55 32 Q60 35, 58 42" />
      <path d="M58 42 Q56 48, 50 55" />
      <path d="M50 55 Q45 58, 42 55" />
      <path d="M42 55 Q38 50, 40 42 Q40 38, 40 35" />
      {/* Profile details */}
      <path d="M52 38 L55 40" />
      <circle cx="48" cy="40" r="1.5" />
      <path d="M45 48 Q48 50, 50 48" />
      {/* Hair/laurel wreath */}
      <path d="M40 35 Q35 32, 38 28 Q42 25, 48 27" />
      <path d="M48 27 Q55 25, 60 30 Q58 33, 55 32" />
      {/* Ribbon below */}
      <path d="M35 70 Q50 75, 65 70" />
      <path d="M38 68 L32 75" />
      <path d="M62 68 L68 75" />
    </g>
  </svg>
)

// 12. Molding - shaped decorative strip
const MoldingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="molding-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#molding-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Multiple molding profiles stacked */}
      {/* Cyma recta (top) */}
      <path d="M10 15 Q30 12, 50 15 Q70 18, 90 15" />
      <path d="M10 20 Q30 17, 50 20 Q70 23, 90 20" />
      {/* Ovolo (quarter round) */}
      <path d="M10 25 L90 25" />
      <path d="M10 25 Q10 32, 15 32 L85 32 Q90 32, 90 25" />
      {/* Fillet (flat band) */}
      <path d="M10 35 L90 35" />
      <path d="M10 40 L90 40" />
      {/* Bead molding */}
      {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
        <circle key={i} cx={x} cy="47" r="4" />
      ))}
      {/* Cavetto (concave) */}
      <path d="M10 55 Q10 62, 15 65 L85 65 Q90 62, 90 55" />
      <path d="M10 55 L90 55" />
      {/* Dentil course */}
      {[12, 22, 32, 42, 52, 62, 72, 82].map((x, i) => (
        <path key={i} d={`M${x} 70 L${x} 78 L${x+6} 78 L${x+6} 70`} />
      ))}
      {/* Fascia (flat face) */}
      <path d="M10 82 L90 82" />
      <path d="M10 90 L90 90" strokeWidth="1.2" />
      {/* Profile section view */}
      <path d="M95 20 L98 20 Q100 25, 98 30 L100 35 L98 40 L100 47 L98 55 Q96 60, 98 65 L95 70 L98 82 L95 90" strokeWidth="1.5" opacity="0.5" />
    </g>
  </svg>
)

// 13. Parapet - low protective wall
const ParapetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="parapet-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#parapet-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Roof surface below */}
      <path d="M5 85 L95 85" opacity="0.3" />
      <path d="M10 90 L90 90" opacity="0.2" />
      {/* Main parapet wall */}
      <path d="M8 45 L8 85 L92 85 L92 45" />
      {/* Coping (top cap) */}
      <path d="M5 42 L95 42 L95 48 L5 48 Z" />
      <path d="M5 45 L95 45" strokeWidth="0.4" />
      {/* Decorative openings - quatrefoil pattern */}
      <circle cx="25" cy="65" r="8" />
      <path d="M25 57 Q30 62, 25 67 Q20 62, 25 57" />
      <path d="M17 65 Q22 60, 27 65 Q22 70, 17 65" />
      <circle cx="50" cy="65" r="8" />
      <path d="M50 57 Q55 62, 50 67 Q45 62, 50 57" />
      <path d="M42 65 Q47 60, 52 65 Q47 70, 42 65" />
      <circle cx="75" cy="65" r="8" />
      <path d="M75 57 Q80 62, 75 67 Q70 62, 75 57" />
      <path d="M67 65 Q72 60, 77 65 Q72 70, 67 65" />
      {/* End piers */}
      <path d="M5 38 L5 85 L12 85 L12 38 Z" />
      <path d="M88 38 L88 85 L95 85 L95 38 Z" />
      {/* Pier caps */}
      <path d="M3 35 L14 35 L14 40 L3 40 Z" />
      <path d="M86 35 L97 35 L97 40 L86 40 Z" />
    </g>
  </svg>
)

// 14. Pinnacle - pointed ornamental termination
const PinnacleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="pinnacle-halo" intensity={1} />}
    <g filter={showHalo ? "url(#pinnacle-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Base buttress */}
      <path d="M30 90 L30 70 L70 70 L70 90" />
      <path d="M25 90 L75 90" strokeWidth="1.2" />
      {/* Pinnacle body - octagonal */}
      <path d="M35 70 L35 45 L40 40 L60 40 L65 45 L65 70" />
      <path d="M40 40 L40 70" strokeWidth="0.4" />
      <path d="M60 40 L60 70" strokeWidth="0.4" />
      {/* Crockets (decorative buds) on edges */}
      <path d="M35 55 Q32 52, 35 50" />
      <path d="M35 45 Q32 42, 35 40" />
      <path d="M65 55 Q68 52, 65 50" />
      <path d="M65 45 Q68 42, 65 40" />
      {/* Spire */}
      <path d="M40 40 L50 8 L60 40" />
      <path d="M50 8 L50 5" strokeWidth="1.2" />
      {/* Crockets on spire */}
      <path d="M44 30 Q41 28, 44 25" />
      <path d="M47 20 Q44 18, 47 15" />
      <path d="M56 30 Q59 28, 56 25" />
      <path d="M53 20 Q56 18, 53 15" />
      {/* Finial cross at top */}
      <path d="M48 5 L52 5" />
      <path d="M50 3 L50 7" />
      {/* Gabled canopies */}
      <path d="M38 50 L42 45 L46 50" />
      <path d="M54 50 L58 45 L62 50" />
      {/* Base moldings */}
      <path d="M32 70 L68 70" strokeWidth="0.5" />
      <path d="M33 73 L67 73" strokeWidth="0.5" />
    </g>
  </svg>
)

// Export mapping for all decorative elements
export const DECORATIVE_ELEMENTS: Record<string, React.FC<SVGProps>> = {
  'acroterion': AcroterionSVG,
  'baluster': BalusterSVG,
  'balustrade': BalustradeSVG,
  'bracket': BracketSVG,
  'cartouche': CartoucheSVG,
  'festoon': FestoonSVG,
  'finial': FinialSVG,
  'frieze': FriezeSVG,
  'gargoyle': GargoyleSVG,
  'grotesque': GrotesqueSVG,
  'medallion': MedallionSVG,
  'molding': MoldingSVG,
  'parapet': ParapetSVG,
  'pinnacle': PinnacleSVG,
}

export {
  AcroterionSVG,
  BalusterSVG,
  BalustradeSVG,
  BracketSVG,
  CartoucheSVG,
  FestoonSVG,
  FinialSVG,
  FriezeSVG,
  GargoyleSVG,
  GrotesqueSVG,
  MedallionSVG,
  MoldingSVG,
  ParapetSVG,
  PinnacleSVG,
}
