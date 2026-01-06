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

// 1. Atrium - central open court
const AtriumSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="atrium-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#atrium-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Perspective floor */}
      <path d="M10 85 L50 45 L90 85" />
      <path d="M10 85 L90 85" />
      {/* Floor tiles in perspective */}
      <path d="M25 85 L50 60 L75 85" />
      <path d="M35 85 L50 70 L65 85" />
      <path d="M30 70 L50 55 L70 70" opacity="0.7" />
      {/* Impluvium (pool) in center */}
      <path d="M35 72 L50 62 L65 72 L65 80 L35 80 Z" />
      <path d="M40 75 L50 67 L60 75" opacity="0.5" />
      {/* Columns around atrium */}
      <path d="M20 48 L20 85" strokeWidth="1.2" />
      <path d="M80 48 L80 85" strokeWidth="1.2" />
      <path d="M35 40 L35 72" strokeWidth="0.8" />
      <path d="M65 40 L65 72" strokeWidth="0.8" />
      {/* Open roof (compluvium) */}
      <path d="M30 35 L50 25 L70 35" />
      <path d="M28 37 L50 27 L72 37" strokeWidth="0.5" />
      {/* Surrounding rooms indicated */}
      <path d="M5 50 L20 50 L20 85 L5 85" opacity="0.3" />
      <path d="M80 50 L95 50 L95 85 L80 85" opacity="0.3" />
    </g>
  </svg>
)

// 2. Checkerboard floor pattern
const CheckerboardSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="checker-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#checker-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Checkerboard grid */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
          const x = 10 + col * 10
          const y = 10 + row * 10
          const isDark = (row + col) % 2 === 0
          return (
            <g key={`${row}-${col}`}>
              <path d={`M${x} ${y} L${x+10} ${y} L${x+10} ${y+10} L${x} ${y+10} Z`} />
              {isDark && (
                <>
                  <path d={`M${x+2} ${y+2} L${x+8} ${y+8}`} opacity="0.3" />
                  <path d={`M${x+2} ${y+8} L${x+8} ${y+2}`} opacity="0.3" />
                </>
              )}
            </g>
          )
        })
      )}
      {/* Border */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="1.2" />
    </g>
  </svg>
)

// 3. Courtyard
const CourtyardSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="courtyard-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#courtyard-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Surrounding walls */}
      <path d="M10 10 L10 90 L90 90 L90 10 Z" />
      <path d="M20 20 L20 80 L80 80 L80 20 Z" />
      {/* Covered walkways (arcade) */}
      <path d="M10 10 L20 20" />
      <path d="M90 10 L80 20" />
      <path d="M10 90 L20 80" />
      <path d="M90 90 L80 80" />
      {/* Open courtyard center */}
      <path d="M30 30 L30 70 L70 70 L70 30 Z" strokeDasharray="2,2" />
      {/* Central fountain/feature */}
      <circle cx="50" cy="50" r="10" />
      <circle cx="50" cy="50" r="5" />
      {/* Paths to center */}
      <path d="M50 30 L50 40" />
      <path d="M50 60 L50 70" />
      <path d="M30 50 L40 50" />
      <path d="M60 50 L70 50" />
      {/* Planting beds */}
      <path d="M32 32 L32 45 L45 45 L45 32 Z" opacity="0.4" />
      <path d="M55 32 L55 45 L68 45 L68 32 Z" opacity="0.4" />
      <path d="M32 55 L32 68 L45 68 L45 55 Z" opacity="0.4" />
      <path d="M55 55 L55 68 L68 68 L68 55 Z" opacity="0.4" />
      {/* Column indications in arcade */}
      {[25, 40, 60, 75].map((pos, i) => (
        <g key={i}>
          <circle cx={pos} cy="15" r="2" opacity="0.5" />
          <circle cx={pos} cy="85" r="2" opacity="0.5" />
          <circle cx="15" cy={pos} r="2" opacity="0.5" />
          <circle cx="85" cy={pos} r="2" opacity="0.5" />
        </g>
      ))}
    </g>
  </svg>
)

// 4. Flagstone
const FlagstoneSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="flagstone-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#flagstone-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Irregular flagstone pattern */}
      <path d="M5 15 L25 10 L35 20 L30 35 L10 30 Z" />
      <path d="M25 10 L50 5 L55 22 L35 20 Z" />
      <path d="M50 5 L80 8 L75 25 L55 22 Z" />
      <path d="M80 8 L95 15 L92 35 L75 25 Z" />
      <path d="M10 30 L30 35 L28 55 L8 50 Z" />
      <path d="M30 35 L35 20 L55 22 L60 40 L35 50 L28 55 Z" />
      <path d="M55 22 L75 25 L78 45 L60 40 Z" />
      <path d="M75 25 L92 35 L90 55 L78 45 Z" />
      <path d="M8 50 L28 55 L25 75 L5 72 Z" />
      <path d="M28 55 L35 50 L45 70 L25 75 Z" />
      <path d="M35 50 L60 40 L65 65 L45 70 Z" />
      <path d="M60 40 L78 45 L82 68 L65 65 Z" />
      <path d="M78 45 L90 55 L95 75 L82 68 Z" />
      <path d="M5 72 L25 75 L22 92 L8 95 Z" />
      <path d="M25 75 L45 70 L50 90 L22 92 Z" />
      <path d="M45 70 L65 65 L75 88 L50 90 Z" />
      <path d="M65 65 L82 68 L88 92 L75 88 Z" />
      <path d="M82 68 L95 75 L95 95 L88 92 Z" />
      {/* Texture marks */}
      <path d="M18 22 L22 25" opacity="0.3" />
      <path d="M42 35 L48 38" opacity="0.3" />
      <path d="M68 55 L72 52" opacity="0.3" />
    </g>
  </svg>
)

// 5. Foundation
const FoundationSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="foundation-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#foundation-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Ground level */}
      <path d="M5 45 L95 45" strokeWidth="1.2" />
      {/* Foundation wall section */}
      <path d="M20 45 L20 85 L80 85 L80 45" />
      {/* Footing (wider base) */}
      <path d="M15 85 L15 95 L85 95 L85 85" />
      <path d="M15 85 L20 85" />
      <path d="M80 85 L85 85" />
      {/* Foundation layers */}
      <path d="M20 55 L80 55" strokeDasharray="3,3" opacity="0.4" />
      <path d="M20 65 L80 65" strokeDasharray="3,3" opacity="0.4" />
      <path d="M20 75 L80 75" strokeDasharray="3,3" opacity="0.4" />
      {/* Soil around */}
      <path d="M5 45 L5 95 L15 95 L15 85 L20 85 L20 45" opacity="0.3" />
      <path d="M80 45 L80 85 L85 85 L85 95 L95 95 L95 45" opacity="0.3" />
      {/* Soil texture */}
      <path d="M8 55 L12 58" opacity="0.2" />
      <path d="M8 70 L12 68" opacity="0.2" />
      <path d="M88 55 L92 58" opacity="0.2" />
      <path d="M88 70 L92 68" opacity="0.2" />
      {/* Wall above ground */}
      <path d="M25 45 L25 25 L75 25 L75 45" strokeDasharray="2,2" />
      {/* Dimension lines */}
      <path d="M50 85 L50 95" strokeWidth="0.4" />
    </g>
  </svg>
)

// 6. Geometric floor pattern
const GeometricSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="geometric-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#geometric-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Outer border */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" />
      <path d="M15 15 L85 15 L85 85 L15 85 Z" />
      {/* Octagon center */}
      <path d="M35 25 L65 25 L80 40 L80 60 L65 75 L35 75 L20 60 L20 40 Z" />
      {/* Star pattern inside */}
      <path d="M50 30 L55 45 L70 45 L58 55 L62 70 L50 60 L38 70 L42 55 L30 45 L45 45 Z" />
      {/* Corner triangles */}
      <path d="M15 15 L35 25 L20 40 Z" />
      <path d="M85 15 L65 25 L80 40 Z" />
      <path d="M15 85 L35 75 L20 60 Z" />
      <path d="M85 85 L65 75 L80 60 Z" />
      {/* Side rectangles */}
      <path d="M35 15 L65 15 L65 25 L35 25 Z" />
      <path d="M35 75 L65 75 L65 85 L35 85 Z" />
      <path d="M15 40 L20 40 L20 60 L15 60 Z" />
      <path d="M80 40 L85 40 L85 60 L80 60 Z" />
      {/* Inner detail */}
      <circle cx="50" cy="50" r="8" />
    </g>
  </svg>
)

// 7. Herringbone pattern
const HerringboneSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="herringbone-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#herringbone-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Herringbone brick pattern */}
      {[0, 20, 40, 60, 80].map((baseY, rowIdx) => (
        <g key={rowIdx}>
          {/* Angled bricks going right */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 10 + i * 20
            const y = baseY + 10
            return (
              <g key={`r${i}`}>
                <path d={`M${x} ${y} L${x+15} ${y-8} L${x+18} ${y-5} L${x+3} ${y+3} Z`} />
              </g>
            )
          })}
          {/* Angled bricks going left */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 10 + i * 20
            const y = baseY + 18
            return (
              <g key={`l${i}`}>
                <path d={`M${x} ${y} L${x+15} ${y+8} L${x+18} ${y+5} L${x+3} ${y-3} Z`} />
              </g>
            )
          })}
        </g>
      ))}
      {/* Border */}
      <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="1" />
    </g>
  </svg>
)

// 8. Inlay floor work
const InlaySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="inlay-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#inlay-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Base floor */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" />
      {/* Ornate inlay border */}
      <path d="M18 18 L82 18 L82 82 L18 82 Z" />
      {/* Scrollwork corners */}
      <path d="M20 20 Q25 25, 20 30 Q15 25, 20 20" />
      <path d="M80 20 Q75 25, 80 30 Q85 25, 80 20" />
      <path d="M20 80 Q25 75, 20 70 Q15 75, 20 80" />
      <path d="M80 80 Q75 75, 80 70 Q85 75, 80 80" />
      {/* Central medallion */}
      <circle cx="50" cy="50" r="20" />
      <circle cx="50" cy="50" r="15" />
      {/* Floral/vine inlay */}
      <path d="M50 35 Q55 40, 50 45 Q45 40, 50 35" />
      <path d="M50 55 Q55 60, 50 65 Q45 60, 50 55" />
      <path d="M35 50 Q40 55, 45 50 Q40 45, 35 50" />
      <path d="M55 50 Q60 55, 65 50 Q60 45, 55 50" />
      {/* Connecting vines */}
      <path d="M30 50 L35 50" />
      <path d="M65 50 L70 50" />
      <path d="M50 30 L50 35" />
      <path d="M50 65 L50 70" />
      {/* Border detail */}
      <path d="M25 18 Q27 15, 30 18" />
      <path d="M45 18 Q47 15, 50 18" />
      <path d="M65 18 Q67 15, 70 18" />
    </g>
  </svg>
)

// 9. Marble floor
const MarbleSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="marble-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#marble-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Large marble slabs */}
      <path d="M10 10 L50 10 L50 50 L10 50 Z" />
      <path d="M50 10 L90 10 L90 50 L50 50 Z" />
      <path d="M10 50 L50 50 L50 90 L10 90 Z" />
      <path d="M50 50 L90 50 L90 90 L50 90 Z" />
      {/* Marble veining */}
      <path d="M15 20 Q25 25, 20 35 Q30 40, 25 48" opacity="0.4" />
      <path d="M35 15 Q40 30, 45 25" opacity="0.4" />
      <path d="M55 22 Q70 18, 75 30 Q80 38, 85 35" opacity="0.4" />
      <path d="M65 40 Q60 45, 70 48" opacity="0.4" />
      <path d="M18 55 Q25 65, 20 75 Q30 80, 35 85" opacity="0.4" />
      <path d="M40 60 Q45 70, 42 80" opacity="0.4" />
      <path d="M58 55 Q65 60, 60 70 Q75 72, 70 85" opacity="0.4" />
      <path d="M80 55 Q78 65, 85 75" opacity="0.4" />
      {/* Border trim */}
      <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="1.2" />
    </g>
  </svg>
)

// 10. Marquetry (wood inlay)
const MarquetrySVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="marquetry-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#marquetry-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Wood panel base */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" />
      {/* Central floral design */}
      <ellipse cx="50" cy="50" rx="25" ry="20" />
      {/* Flower petals */}
      <path d="M50 30 Q60 40, 50 50 Q40 40, 50 30" />
      <path d="M30 50 Q40 60, 50 50 Q40 40, 30 50" />
      <path d="M50 70 Q40 60, 50 50 Q60 60, 50 70" />
      <path d="M70 50 Q60 40, 50 50 Q60 60, 70 50" />
      {/* Stem and leaves */}
      <path d="M50 70 L50 82" />
      <path d="M45 75 Q42 78, 40 75 Q43 72, 45 75" />
      <path d="M55 75 Q58 78, 60 75 Q57 72, 55 75" />
      {/* Corner decorations */}
      <path d="M15 15 Q20 20, 25 15 Q20 10, 15 15" />
      <path d="M75 15 Q80 20, 85 15 Q80 10, 75 15" />
      <path d="M15 85 Q20 80, 25 85 Q20 90, 15 85" />
      <path d="M75 85 Q80 80, 85 85 Q80 90, 75 85" />
      {/* Border inlay */}
      <path d="M15 10 L15 90" strokeWidth="0.4" />
      <path d="M85 10 L85 90" strokeWidth="0.4" />
      <path d="M10 15 L90 15" strokeWidth="0.4" />
      <path d="M10 85 L90 85" strokeWidth="0.4" />
      {/* Wood grain suggestion */}
      <path d="M20 25 L25 28" opacity="0.3" />
      <path d="M78 72 L82 75" opacity="0.3" />
    </g>
  </svg>
)

// 11. Mosaic
const MosaicSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="mosaic-halo" intensity={0.95} />}
    <g filter={showHalo ? "url(#mosaic-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round">
      {/* Grid of small tesserae */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => {
          const x = 10 + col * 8
          const y = 10 + row * 8
          return <path key={`${row}-${col}`} d={`M${x} ${y} L${x+7} ${y} L${x+7} ${y+7} L${x} ${y+7} Z`} />
        })
      )}
      {/* Central design - fish (common Roman mosaic) */}
      <path d="M35 45 Q50 35, 65 45 Q70 50, 65 55 Q50 65, 35 55 Q30 50, 35 45" strokeWidth="1" />
      <path d="M70 50 L78 45 L78 55 Z" strokeWidth="1" />
      <circle cx="40" cy="50" r="2" strokeWidth="1" />
      {/* Fin detail */}
      <path d="M50 40 L50 35 L55 42" strokeWidth="0.8" />
      <path d="M50 60 L50 65 L55 58" strokeWidth="0.8" />
      {/* Border */}
      <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="1" />
      <path d="M12 12 L88 12 L88 88 L12 88 Z" strokeWidth="0.8" />
    </g>
  </svg>
)

// 12. Parquet
const ParquetSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="parquet-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#parquet-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Versailles pattern parquet */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const x = 10 + col * 27
          const y = 10 + row * 27
          return (
            <g key={`${row}-${col}`}>
              {/* Square frame */}
              <path d={`M${x} ${y} L${x+27} ${y} L${x+27} ${y+27} L${x} ${y+27} Z`} />
              {/* Inner square rotated 45 degrees */}
              <path d={`M${x+13.5} ${y+4} L${x+23} ${y+13.5} L${x+13.5} ${y+23} L${x+4} ${y+13.5} Z`} />
              {/* Corner triangles */}
              <path d={`M${x} ${y} L${x+13.5} ${y+4} L${x+4} ${y+13.5} Z`} opacity="0.5" />
              <path d={`M${x+27} ${y} L${x+23} ${y+13.5} L${x+13.5} ${y+4} Z`} opacity="0.5" />
            </g>
          )
        })
      )}
      {/* Border */}
      <path d="M8 8 L92 8 L92 92 L8 92 Z" strokeWidth="1" />
    </g>
  </svg>
)

// 13. Paving
const PavingSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="paving-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#paving-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Running bond brick pattern */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
        const offset = row % 2 === 0 ? 0 : 10
        return [0, 1, 2, 3, 4].map((col) => {
          const x = 5 + offset + col * 20
          const y = 10 + row * 10
          return <path key={`${row}-${col}`} d={`M${x} ${y} L${x+18} ${y} L${x+18} ${y+8} L${x} ${y+8} Z`} />
        })
      })}
      {/* Joint lines emphasized */}
      {[18, 28, 38, 48, 58, 68, 78, 88].map((y, i) => (
        <path key={i} d={`M5 ${y} L95 ${y}`} strokeWidth="0.4" opacity="0.5" />
      ))}
      {/* Outer border */}
      <path d="M5 10 L95 10 L95 90 L5 90 Z" strokeWidth="1" />
    </g>
  </svg>
)

// 14. Plinth
const PlinthSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="plinth-halo" intensity={0.9} />}
    <g filter={showHalo ? "url(#plinth-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Column/statue above */}
      <path d="M40 30 L40 55 L60 55 L60 30" strokeDasharray="2,2" opacity="0.5" />
      {/* Plinth top */}
      <path d="M35 55 L65 55 L70 60 L30 60 Z" />
      {/* Main plinth body */}
      <path d="M30 60 L30 80 L70 80 L70 60" />
      {/* Base molding */}
      <path d="M28 80 L28 85 L72 85 L72 80" />
      <path d="M25 85 L25 90 L75 90 L75 85" />
      {/* Floor line */}
      <path d="M10 90 L90 90" strokeWidth="1.2" />
      {/* Plinth detail - moldings */}
      <path d="M30 65 L70 65" strokeWidth="0.4" />
      <path d="M30 75 L70 75" strokeWidth="0.4" />
      {/* Side profile lines */}
      <path d="M32 60 L32 80" strokeWidth="0.4" />
      <path d="M68 60 L68 80" strokeWidth="0.4" />
      {/* Text/inscription area */}
      <path d="M35 68 L65 68 L65 73 L35 73 Z" opacity="0.3" />
    </g>
  </svg>
)

// 15. Podium
const PodiumSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="podium-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#podium-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Temple/structure above */}
      <path d="M25 35 L25 55" strokeDasharray="2,2" opacity="0.4" />
      <path d="M40 35 L40 55" strokeDasharray="2,2" opacity="0.4" />
      <path d="M60 35 L60 55" strokeDasharray="2,2" opacity="0.4" />
      <path d="M75 35 L75 55" strokeDasharray="2,2" opacity="0.4" />
      {/* Podium top surface */}
      <path d="M15 55 L85 55" strokeWidth="1.5" />
      {/* Podium sides */}
      <path d="M15 55 L15 75 L85 75 L85 55" />
      {/* Steps on front */}
      <path d="M35 75 L35 82 L65 82 L65 75" />
      <path d="M32 82 L32 89 L68 89 L68 82" />
      <path d="M29 89 L29 95 L71 95 L71 89" />
      {/* Ground */}
      <path d="M10 95 L90 95" strokeWidth="1" />
      {/* Podium moldings */}
      <path d="M15 60 L85 60" strokeWidth="0.4" />
      <path d="M15 70 L35 70" strokeWidth="0.4" />
      <path d="M65 70 L85 70" strokeWidth="0.4" />
      {/* Side returns */}
      <path d="M17 55 L17 75" strokeWidth="0.4" />
      <path d="M83 55 L83 75" strokeWidth="0.4" />
    </g>
  </svg>
)

// 16. Step
const StepSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="step-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#step-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Series of steps in perspective */}
      <path d="M15 85 L85 85 L85 75 L15 75 Z" />
      <path d="M20 75 L80 75 L80 65 L20 65 Z" />
      <path d="M25 65 L75 65 L75 55 L25 55 Z" />
      <path d="M30 55 L70 55 L70 45 L30 45 Z" />
      <path d="M35 45 L65 45 L65 35 L35 35 Z" />
      {/* Rise lines */}
      <path d="M15 85 L20 75" />
      <path d="M85 85 L80 75" />
      <path d="M20 75 L25 65" />
      <path d="M80 75 L75 65" />
      <path d="M25 65 L30 55" />
      <path d="M75 65 L70 55" />
      <path d="M30 55 L35 45" />
      <path d="M70 55 L65 45" />
      <path d="M35 45 L40 35" />
      <path d="M65 45 L60 35" />
      {/* Landing at top */}
      <path d="M35 35 L65 35 L70 25 L30 25 Z" opacity="0.5" />
      {/* Tread nosing detail */}
      <path d="M15 85 L15 83 L85 83 L85 85" strokeWidth="0.4" />
      <path d="M20 75 L20 73 L80 73 L80 75" strokeWidth="0.4" />
    </g>
  </svg>
)

// 17. Terrace
const TerraceSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="terrace-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#terrace-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Raised terrace platform */}
      <path d="M10 60 L90 60 L90 70 L10 70 Z" />
      <path d="M10 70 L10 95" />
      <path d="M90 70 L90 95" />
      {/* Terrace surface with pavers */}
      <path d="M15 62 L35 62 L35 68 L15 68 Z" />
      <path d="M40 62 L60 62 L60 68 L40 68 Z" />
      <path d="M65 62 L85 62 L85 68 L65 68 Z" />
      {/* Balustrade */}
      <path d="M10 55 L90 55" />
      <path d="M10 50 L90 50" />
      {[20, 35, 50, 65, 80].map((x, i) => (
        <path key={i} d={`M${x} 50 Q${x-2} 52.5, ${x} 55`} />
      ))}
      {/* End posts */}
      <path d="M10 45 L10 60" strokeWidth="1.2" />
      <path d="M90 45 L90 60" strokeWidth="1.2" />
      {/* View beyond */}
      <path d="M20 40 Q50 35, 80 40" strokeDasharray="2,2" opacity="0.3" />
      {/* Steps down */}
      <path d="M40 70 L40 80 L60 80 L60 70" />
      <path d="M38 80 L38 90 L62 90 L62 80" />
      {/* Ground level */}
      <path d="M5 95 L95 95" strokeWidth="1" />
    </g>
  </svg>
)

// 18. Terrazzo
const TerrazzoSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="terrazzo-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#terrazzo-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Border */}
      <path d="M10 10 L90 10 L90 90 L10 90 Z" />
      {/* Dividing strips (brass/zinc) */}
      <path d="M10 50 L90 50" strokeWidth="1.2" />
      <path d="M50 10 L50 90" strokeWidth="1.2" />
      {/* Random aggregate chips */}
      {/* Top left quadrant */}
      <path d="M15 20 L18 22 L16 25 Z" />
      <path d="M25 15 L28 18 L24 20 Z" />
      <path d="M35 30 L38 28 L40 32 L37 34 Z" />
      <path d="M22 35 L24 38 L20 40 Z" />
      <path d="M40 18 L44 20 L42 24 Z" />
      {/* Top right quadrant */}
      <path d="M58 22 L62 20 L64 25 Z" />
      <path d="M72 15 L76 18 L73 22 Z" />
      <path d="M65 35 L68 32 L70 36 L67 38 Z" />
      <path d="M80 28 L84 30 L82 34 Z" />
      {/* Bottom left quadrant */}
      <path d="M18 58 L22 56 L24 60 L20 62 Z" />
      <path d="M30 68 L33 65 L36 68 L33 72 Z" />
      <path d="M15 78 L18 75 L22 78 L19 82 Z" />
      <path d="M38 55 L42 58 L40 62 Z" />
      {/* Bottom right quadrant */}
      <path d="M60 65 L64 62 L67 66 L63 68 Z" />
      <path d="M75 72 L78 68 L82 72 L79 76 Z" />
      <path d="M55 80 L58 77 L62 80 L59 84 Z" />
      <path d="M82 60 L86 62 L84 66 Z" />
      {/* Polished surface indication */}
      <path d="M30 25 L32 27" opacity="0.2" />
      <path d="M70 42 L72 44" opacity="0.2" />
      <path d="M25 75 L27 77" opacity="0.2" />
      <path d="M75 82 L77 84" opacity="0.2" />
    </g>
  </svg>
)

// 19. Threshold
const ThresholdSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="threshold-halo" intensity={0.85} />}
    <g filter={showHalo ? "url(#threshold-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Door frame */}
      <path d="M20 15 L20 85" strokeWidth="1.5" />
      <path d="M80 15 L80 85" strokeWidth="1.5" />
      <path d="M20 15 L80 15" strokeWidth="1.5" />
      {/* Threshold stone */}
      <path d="M15 80 L85 80 L85 90 L15 90 Z" strokeWidth="1.2" />
      {/* Threshold wear pattern */}
      <path d="M25 82 Q50 88, 75 82" opacity="0.4" />
      {/* Threshold molding detail */}
      <path d="M15 83 L85 83" strokeWidth="0.4" />
      <path d="M15 87 L85 87" strokeWidth="0.4" />
      {/* Door suggestion */}
      <path d="M25 20 L25 78 L75 78 L75 20" strokeDasharray="2,2" opacity="0.4" />
      {/* Floor on either side */}
      <path d="M5 90 L15 90 L15 95 L5 95 Z" opacity="0.3" />
      <path d="M85 90 L95 90 L95 95 L85 95 Z" opacity="0.3" />
      {/* Interior/exterior indication */}
      <path d="M40 92 L60 92" strokeDasharray="2,2" opacity="0.3" />
      {/* Pivot points */}
      <circle cx="23" cy="25" r="2" opacity="0.5" />
      <circle cx="23" cy="75" r="2" opacity="0.5" />
    </g>
  </svg>
)

// 20. Tile
const TileSVG: React.FC<SVGProps> = ({ showHalo }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {showHalo && <HaloFilter id="tile-halo" intensity={0.8} />}
    <g filter={showHalo ? "url(#tile-halo)" : undefined} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      {/* Square tile grid */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const x = 12 + col * 19
          const y = 12 + row * 19
          return (
            <g key={`${row}-${col}`}>
              <path d={`M${x} ${y} L${x+18} ${y} L${x+18} ${y+18} L${x} ${y+18} Z`} />
              {/* Decorative pattern on alternate tiles */}
              {(row + col) % 2 === 0 && (
                <>
                  <path d={`M${x+9} ${y+3} L${x+15} ${y+9} L${x+9} ${y+15} L${x+3} ${y+9} Z`} opacity="0.5" />
                </>
              )}
            </g>
          )
        })
      )}
      {/* Grout lines emphasized */}
      <path d="M12 12 L88 12 L88 88 L12 88 Z" strokeWidth="1" />
      {/* Individual tile sheen */}
      <path d="M15 15 L18 18" opacity="0.2" />
      <path d="M53 34 L56 37" opacity="0.2" />
      <path d="M34 72 L37 75" opacity="0.2" />
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
