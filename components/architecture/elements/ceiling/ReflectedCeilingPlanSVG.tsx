import React from 'react'

interface ReflectedCeilingPlanSVGProps {
  className?: string
  showHalo?: boolean
}

export const ReflectedCeilingPlanSVG: React.FC<ReflectedCeilingPlanSVGProps> = ({
  className = '',
  showHalo = false,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
    >
      {/* Halo filter for highlighted elements */}
      {showHalo && (
        <defs>
          <filter id="rcp-halo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.96
                      0 0 0 0 0.62
                      0 0 0 0 0.04
                      0 0 0 0.7 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      {/* Room outline (walls) - dashed to show context */}
      <rect
        x="20"
        y="20"
        width="160"
        height="160"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.5"
      />

      {/* Ceiling Grid - 2'x2' acoustical tile pattern */}
      <g opacity="0.3" strokeWidth="0.5">
        {/* Vertical grid lines */}
        {[40, 60, 80, 100, 120, 140, 160].map((x) => (
          <line key={`v-${x}`} x1={x} y1="20" x2={x} y2="180" />
        ))}
        {/* Horizontal grid lines */}
        {[40, 60, 80, 100, 120, 140, 160].map((y) => (
          <line key={`h-${y}`} x1="20" y1={y} x2="180" y2={y} />
        ))}
      </g>

      {/* RECESSED LIGHTS - highlighted */}
      <g filter={showHalo ? 'url(#rcp-halo)' : undefined} strokeWidth="2">
        {/* Top row lights */}
        <g>
          <circle cx="50" cy="50" r="6" />
          <line x1="47" y1="47" x2="53" y2="53" />
          <line x1="47" y1="53" x2="53" y2="47" />
        </g>
        <g>
          <circle cx="100" cy="50" r="6" />
          <line x1="97" y1="47" x2="103" y2="53" />
          <line x1="97" y1="53" x2="103" y2="47" />
        </g>
        <g>
          <circle cx="150" cy="50" r="6" />
          <line x1="147" y1="47" x2="153" y2="53" />
          <line x1="147" y1="53" x2="153" y2="47" />
        </g>

        {/* Middle row lights */}
        <g>
          <circle cx="50" cy="100" r="6" />
          <line x1="47" y1="97" x2="53" y2="103" />
          <line x1="47" y1="103" x2="53" y2="97" />
        </g>
        <g>
          <circle cx="150" cy="100" r="6" />
          <line x1="147" y1="97" x2="153" y2="103" />
          <line x1="147" y1="103" x2="153" y2="97" />
        </g>

        {/* Bottom row lights */}
        <g>
          <circle cx="50" cy="150" r="6" />
          <line x1="47" y1="147" x2="53" y2="153" />
          <line x1="47" y1="153" x2="53" y2="147" />
        </g>
        <g>
          <circle cx="100" cy="150" r="6" />
          <line x1="97" y1="147" x2="103" y2="153" />
          <line x1="97" y1="153" x2="103" y2="147" />
        </g>
        <g>
          <circle cx="150" cy="150" r="6" />
          <line x1="147" y1="147" x2="153" y2="153" />
          <line x1="147" y1="153" x2="153" y2="147" />
        </g>
      </g>

      {/* HVAC SUPPLY DIFFUSERS - linear diffusers (highlighted) */}
      <g filter={showHalo ? 'url(#rcp-halo)' : undefined} strokeWidth="1.5">
        {/* Left diffuser */}
        <rect x="32" y="95" width="12" height="10" rx="1" />
        <line x1="33" y1="97" x2="43" y2="97" opacity="0.6" />
        <line x1="33" y1="100" x2="43" y2="100" opacity="0.6" />
        <line x1="33" y1="103" x2="43" y2="103" opacity="0.6" />

        {/* Right diffuser */}
        <rect x="156" y="95" width="12" height="10" rx="1" />
        <line x1="157" y1="97" x2="167" y2="97" opacity="0.6" />
        <line x1="157" y1="100" x2="167" y2="100" opacity="0.6" />
        <line x1="157" y1="103" x2="167" y2="103" opacity="0.6" />
      </g>

      {/* RETURN AIR GRILLES - troffer style */}
      <g strokeWidth="1.5" opacity="0.7">
        <rect x="95" y="90" width="10" height="20" rx="1" />
        <line x1="96" y1="92" x2="104" y2="92" strokeWidth="0.5" />
        <line x1="96" y1="95" x2="104" y2="95" strokeWidth="0.5" />
        <line x1="96" y1="98" x2="104" y2="98" strokeWidth="0.5" />
        <line x1="96" y1="101" x2="104" y2="101" strokeWidth="0.5" />
        <line x1="96" y1="104" x2="104" y2="104" strokeWidth="0.5" />
        <line x1="96" y1="107" x2="104" y2="107" strokeWidth="0.5" />
      </g>

      {/* SPRINKLER HEADS - with coverage radius */}
      <g filter={showHalo ? 'url(#rcp-halo)' : undefined}>
        {/* Top left sprinkler */}
        <circle cx="50" cy="70" r="3" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="70" r="1" strokeWidth="1" fill="currentColor" />
        <line x1="47" y1="70" x2="44" y2="70" strokeWidth="1" />
        <line x1="53" y1="70" x2="56" y2="70" strokeWidth="1" />
        <line x1="50" y1="67" x2="50" y2="64" strokeWidth="1" />
        <line x1="50" y1="73" x2="50" y2="76" strokeWidth="1" />
        {/* Coverage radius (dashed) */}
        <circle cx="50" cy="70" r="15" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />

        {/* Top right sprinkler */}
        <circle cx="150" cy="70" r="3" strokeWidth="1.5" fill="none" />
        <circle cx="150" cy="70" r="1" strokeWidth="1" fill="currentColor" />
        <line x1="147" y1="70" x2="144" y2="70" strokeWidth="1" />
        <line x1="153" y1="70" x2="156" y2="70" strokeWidth="1" />
        <line x1="150" y1="67" x2="150" y2="64" strokeWidth="1" />
        <line x1="150" y1="73" x2="150" y2="76" strokeWidth="1" />
        <circle cx="150" cy="70" r="15" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />

        {/* Bottom left sprinkler */}
        <circle cx="50" cy="130" r="3" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="130" r="1" strokeWidth="1" fill="currentColor" />
        <line x1="47" y1="130" x2="44" y2="130" strokeWidth="1" />
        <line x1="53" y1="130" x2="56" y2="130" strokeWidth="1" />
        <line x1="50" y1="127" x2="50" y2="124" strokeWidth="1" />
        <line x1="50" y1="133" x2="50" y2="136" strokeWidth="1" />
        <circle cx="50" cy="130" r="15" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />

        {/* Bottom right sprinkler */}
        <circle cx="150" cy="130" r="3" strokeWidth="1.5" fill="none" />
        <circle cx="150" cy="130" r="1" strokeWidth="1" fill="currentColor" />
        <line x1="147" y1="130" x2="144" y2="130" strokeWidth="1" />
        <line x1="153" y1="130" x2="156" y2="130" strokeWidth="1" />
        <line x1="150" y1="127" x2="150" y2="124" strokeWidth="1" />
        <line x1="150" y1="133" x2="150" y2="136" strokeWidth="1" />
        <circle cx="150" cy="130" r="15" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
      </g>

      {/* SMOKE DETECTORS */}
      <g strokeWidth="1.5" opacity="0.8">
        {/* Top center smoke detector */}
        <circle cx="100" cy="30" r="4" fill="none" />
        <line x1="98" y1="30" x2="102" y2="30" strokeWidth="1.2" />
        <line x1="100" y1="28" x2="100" y2="32" strokeWidth="1.2" />

        {/* Bottom center smoke detector */}
        <circle cx="100" cy="170" r="4" fill="none" />
        <line x1="98" y1="170" x2="102" y2="170" strokeWidth="1.2" />
        <line x1="100" y1="168" x2="100" y2="172" strokeWidth="1.2" />
      </g>

      {/* ELECTRICAL CIRCUIT LINE - connecting lights to switch */}
      <g strokeWidth="1" strokeDasharray="3 2" opacity="0.5">
        {/* Circuit connecting top row lights */}
        <path
          d="M 50 50 Q 75 45, 100 50 Q 125 55, 150 50"
          fill="none"
        />
        {/* Circuit line to switch (off-plan, shown going to wall) */}
        <line x1="100" y1="50" x2="100" y2="20" />
      </g>

      {/* SWITCH SYMBOL (on wall) */}
      <g strokeWidth="1.5">
        <circle cx="100" cy="20" r="2.5" fill="currentColor" opacity="0.6" />
        <text
          x="100"
          y="14"
          fontSize="6"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.7"
        >
          S
        </text>
      </g>

      {/* EXIT SIGN (emergency lighting) */}
      <g opacity="0.6">
        <rect x="88" y="175" width="24" height="6" strokeWidth="1" rx="1" />
        <text
          x="100"
          y="180"
          fontSize="4"
          textAnchor="middle"
          fill="currentColor"
          fontWeight="bold"
        >
          EXIT
        </text>
      </g>

      {/* SPEAKER (PA system) */}
      <g strokeWidth="1.2" opacity="0.6">
        <circle cx="30" cy="30" r="3.5" />
        <circle cx="30" cy="30" r="2" />
        <circle cx="30" cy="30" r="0.8" fill="currentColor" />
      </g>

      {/* LEGEND/TITLE BLOCK (small) */}
      <g opacity="0.5">
        <text x="22" y="192" fontSize="5" fill="currentColor">
          REFLECTED CEILING PLAN
        </text>
      </g>
    </svg>
  )
}

export default ReflectedCeilingPlanSVG
