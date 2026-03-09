'use client'

import {
  ChevronLeft,
  ChevronRight,
  Users,
  User,
  Target,
  Play,
  Compass,
  Leaf,
  TreePine,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { JoinProjectButton } from '@/components/projects/JoinProjectButton'
import React, { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProjectRow {
  title: string
  subtitle: string
  projects: any[]
  ghostCount: number
}

// ─── Status config ───────────────────────────────────────────────────────────
// Each status maps to an Exodus narrative beat:
//   ACTIVE  → growing / in motion  (living green)
//   PLANNING → seeds not yet sown   (warm amber)
//   COMPLETED → harvested / fulfilled (steady blue)

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string; glow: string }> = {
  ACTIVE:    { bg: '#059669', text: '#ffffff', label: 'Active',    glow: 'rgba(5,150,105,0.25)' },
  COMPLETED: { bg: '#3b82f6', text: '#ffffff', label: 'Completed', glow: 'rgba(59,130,246,0.25)' },
  PLANNING:  { bg: '#d97706', text: '#ffffff', label: 'Planning',  glow: 'rgba(217,119,6,0.25)' },
}

// ─── SVG Illustrations ───────────────────────────────────────────────────────

// Generative landscape for no-image project cards — each seed produces
// a unique terrain of contour lines, hills, scattered flora, and a small sun.
function CardLandscape({ seed = 0 }: { seed?: number }) {
  const a = (seed * 37) % 100
  const b = (seed * 53) % 80
  const c = (seed * 71) % 60
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.09]" viewBox="0 0 300 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sun / moon */}
      <circle cx={240 - a * 0.5} cy={35 + b * 0.2} r="14" fill="var(--primary)" fillOpacity="0.15" />
      <circle cx={240 - a * 0.5} cy={35 + b * 0.2} r="18" fill="none" stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="0.5" />
      {/* Contour lines */}
      <path d={`M0,${95+a*0.3} Q60,${65+b*0.4} 150,${95+a*0.2} T300,${80+b*0.3}`} fill="none" stroke="var(--foreground)" strokeWidth="0.9" />
      <path d={`M0,${115+a*0.2} Q90,${80+b*0.3} 200,${125-a*0.15} T300,${108+b*0.2}`} fill="none" stroke="var(--foreground)" strokeWidth="0.7" />
      <path d={`M0,${135+a*0.1} Q120,${108+b*0.2} 220,${140-a*0.1} T300,${130+b*0.15}`} fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
      <path d={`M0,${152+c*0.1} Q150,${140+a*0.08} 250,${155-b*0.05} T300,${148+c*0.1}`} fill="none" stroke="var(--foreground)" strokeWidth="0.4" />
      {/* Small trees / flora along the middle contour */}
      <line x1={45+a*0.3} y1={110+b*0.15} x2={45+a*0.3} y2={100+b*0.15} stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.8" />
      <circle cx={45+a*0.3} cy={97+b*0.15} r="4" fill="var(--primary)" fillOpacity="0.08" />
      <line x1={130+c*0.4} y1={105+a*0.12} x2={130+c*0.4} y2={93+a*0.12} stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="0.8" />
      <circle cx={130+c*0.4} cy={90+a*0.12} r="5" fill="var(--primary)" fillOpacity="0.06" />
      <line x1={210-b*0.3} y1={118+c*0.1} x2={210-b*0.3} y2={108+c*0.1} stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.8" />
      <circle cx={210-b*0.3} cy={105+c*0.1} r="3.5" fill="var(--primary)" fillOpacity="0.07" />
      {/* Distant birds — two small V shapes */}
      <path d={`M${70+c*0.5},${45+a*0.15} l-3,3 l3,-1 l3,1 l-3,-3`} fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
      <path d={`M${95+c*0.4},${40+a*0.1} l-2.5,2.5 l2.5,-0.8 l2.5,0.8 l-2.5,-2.5`} fill="none" stroke="var(--foreground)" strokeWidth="0.4" />
      {/* Ground texture dots */}
      <circle cx={25+a*0.2} cy={160+b*0.1} r="1" fill="var(--foreground)" fillOpacity="0.06" />
      <circle cx={80+c*0.3} cy={155+a*0.08} r="0.8" fill="var(--foreground)" fillOpacity="0.05" />
      <circle cx={170+b*0.2} cy={162+c*0.06} r="1.2" fill="var(--foreground)" fillOpacity="0.05" />
      <circle cx={260-a*0.15} cy={158+b*0.05} r="0.7" fill="var(--foreground)" fillOpacity="0.06" />
      {/* Compass rose — small, in the corner */}
      <g transform={`translate(${270-a*0.1}, ${25+b*0.05})`} opacity="0.06">
        <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--foreground)" strokeWidth="0.6" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--foreground)" strokeWidth="0.6" />
        <polygon points="0,-8 -2,-2 0,-3 2,-2" fill="var(--foreground)" />
      </g>
    </svg>
  )
}

// Ghost card illustration — a seed in soil with roots reaching down
// and a tiny sprout breaking the surface, surrounded by soil particles.
function GhostSeedScene({ index = 0 }: { index?: number }) {
  const drift = (index * 23) % 40
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-25">
      {/* Soil line */}
      <path d={`M8,36 Q15,${34+drift*0.05} 30,36 Q45,${37-drift*0.04} 52,35.5`} stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Seed body underground */}
      <ellipse cx="30" cy="40" rx="5" ry="3.5" fill="var(--foreground)" fillOpacity="0.1" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.6" />
      {/* Root tendrils */}
      <path d="M28,43 Q26,48 24,52" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
      <path d="M30,43.5 Q30,49 29,54" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="0.5" fill="none" />
      <path d="M32,43 Q34,47 36,51" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
      {/* Sprout emerging */}
      <path d="M30,37 Q30,32 30,28" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.7" fill="none" />
      {/* Two tiny unfurling leaves */}
      <path d="M30,30 Q26,27 28,24" stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="0.6" fill="none" />
      <path d="M30,30 Q34,27 32,24" stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="0.6" fill="none" />
      <ellipse cx="27" cy="25" rx="2.5" ry="1.5" transform="rotate(-20 27 25)" fill="var(--primary)" fillOpacity="0.08" />
      <ellipse cx="33" cy="25" rx="2.5" ry="1.5" transform="rotate(20 33 25)" fill="var(--primary)" fillOpacity="0.08" />
      {/* Soil particles */}
      <circle cx={18+drift*0.2} cy="38" r="0.8" fill="var(--foreground)" fillOpacity="0.1" />
      <circle cx={42-drift*0.15} cy="37" r="0.6" fill="var(--foreground)" fillOpacity="0.08" />
      <circle cx="22" cy={41+drift*0.03} r="0.5" fill="var(--foreground)" fillOpacity="0.08" />
      <circle cx="38" cy={40+drift*0.02} r="0.7" fill="var(--foreground)" fillOpacity="0.09" />
      {/* Water droplet approaching */}
      <path d={`M${20+drift*0.3},${18-drift*0.1} Q${21+drift*0.3},${15-drift*0.1} ${20+drift*0.3},${13-drift*0.1}`} stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="0.5" fill="none" />
      <circle cx={20+drift*0.3} cy={13-drift*0.1} r="1" fill="var(--accent)" fillOpacity="0.1" />
    </svg>
  )
}

// Empty state — a barren landscape with a single path leading to the horizon,
// a sun low on the skyline, and wind lines suggesting openness / potential.
function EmptyLandscape() {
  return (
    <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 mx-auto">
      {/* Sky */}
      {/* Sun on horizon */}
      <circle cx="100" cy="52" r="16" fill="var(--primary)" fillOpacity="0.12" />
      <circle cx="100" cy="52" r="22" fill="none" stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="0.5" />
      <circle cx="100" cy="52" r="28" fill="none" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" />
      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 100 + Math.cos(rad) * 20
        const y1 = 52 - Math.sin(rad) * 20
        const x2 = 100 + Math.cos(rad) * 32
        const y2 = 52 - Math.sin(rad) * 32
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="0.5" />
      })}
      {/* Horizon line */}
      <line x1="0" y1="60" x2="200" y2="60" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.6" />
      {/* Rolling hills */}
      <path d="M0,65 Q30,55 60,62 Q90,50 120,60 Q150,52 180,58 L200,62 L200,120 L0,120Z" fill="var(--primary)" fillOpacity="0.03" />
      <path d="M0,72 Q50,62 100,70 Q150,60 200,68 L200,120 L0,120Z" fill="var(--primary)" fillOpacity="0.025" />
      {/* Path leading to horizon — converging perspective lines */}
      <path d="M85,120 Q95,85 100,60" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.6" fill="none" />
      <path d="M115,120 Q105,85 100,60" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.6" fill="none" />
      {/* Path dashes */}
      <line x1="97" y1="90" x2="103" y2="90" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="98" y1="80" x2="102" y2="80" stroke="var(--foreground)" strokeOpacity="0.05" strokeWidth="0.5" />
      <line x1="99" y1="70" x2="101" y2="70" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      {/* Wind lines */}
      <path d="M10,40 Q25,38 40,40" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.4" fill="none" />
      <path d="M20,44 Q30,42 45,44" stroke="var(--foreground)" strokeOpacity="0.05" strokeWidth="0.4" fill="none" />
      <path d="M155,38 Q170,36 185,38" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.4" fill="none" />
      <path d="M160,42 Q172,40 190,43" stroke="var(--foreground)" strokeOpacity="0.05" strokeWidth="0.4" fill="none" />
      {/* Lone tree at the edge of the path */}
      <line x1="130" y1="65" x2="130" y2="52" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="0.7" />
      <circle cx="130" cy="49" r="5" fill="var(--primary)" fillOpacity="0.06" />
      <circle cx="130" cy="49" r="3" fill="var(--primary)" fillOpacity="0.04" />
      {/* Small birds */}
      <path d="M55,30 l-2,2 l2,-0.7 l2,0.7 l-2,-2" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.4" fill="none" />
      <path d="M62,26 l-1.5,1.5 l1.5,-0.5 l1.5,0.5 l-1.5,-1.5" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.3" fill="none" />
      <path d="M145,28 l-2,2 l2,-0.7 l2,0.7 l-2,-2" stroke="var(--foreground)" strokeOpacity="0.07" strokeWidth="0.4" fill="none" />
    </svg>
  )
}

// Loading illustration — a seed cracking open with energy lines
function LoadingSeed() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      {/* Ground line */}
      <path d="M10,32 Q24,30 38,32" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Seed splitting open */}
      <path d="M22,33 Q20,29 22,26" stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
      <path d="M26,33 Q28,29 26,26" stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
      <ellipse cx="21" cy="34" rx="4" ry="2.5" transform="rotate(-10 21 34)" fill="var(--primary)" fillOpacity="0.15" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.5" />
      <ellipse cx="27" cy="34" rx="4" ry="2.5" transform="rotate(10 27 34)" fill="var(--primary)" fillOpacity="0.15" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.5" />
      {/* Sprout emerging */}
      <path d="M24,28 Q24,22 24,16" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
      {/* Unfurling leaf */}
      <path d="M24,20 Q20,16 21,12" stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
      <ellipse cx="20.5" cy="13" rx="3" ry="1.8" transform="rotate(-25 20.5 13)" fill="var(--primary)" fillOpacity="0.12" />
      <path d="M24,22 Q28,18 27,14" stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
      <ellipse cx="27.5" cy="15" rx="2.5" ry="1.5" transform="rotate(25 27.5 15)" fill="var(--primary)" fillOpacity="0.1" />
      {/* Energy / growth lines radiating */}
      <line x1="24" y1="11" x2="24" y2="7" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" />
      <line x1="18" y1="13" x2="15" y2="10" stroke="var(--primary)" strokeOpacity="0.1" strokeWidth="0.4" />
      <line x1="30" y1="13" x2="33" y2="10" stroke="var(--primary)" strokeOpacity="0.1" strokeWidth="0.4" />
      {/* Root hints */}
      <path d="M22,36 Q20,40 19,44" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.4" fill="none" />
      <path d="M26,36 Q28,39 29,43" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.4" fill="none" />
    </svg>
  )
}

// ─── Row Header Illustrations ────────────────────────────────────────────────
// Small thematic drawings beside each row title.

// Active row — a young tree with spreading branches, leaves, and a small bird perched
function ActiveRowIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <line x1="18" y1="34" x2="18" y2="14" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="1.2" />
      {/* Roots */}
      <path d="M18,34 Q14,36 12,35" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.6" fill="none" />
      <path d="M18,34 Q22,36 24,35" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.6" fill="none" />
      {/* Branches */}
      <path d="M18,22 Q12,18 8,16" stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
      <path d="M18,18 Q24,14 28,13" stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
      <path d="M18,26 Q24,24 26,22" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.7" fill="none" />
      {/* Leaf clusters */}
      <circle cx="8" cy="15" r="3.5" fill="var(--primary)" fillOpacity="0.15" />
      <circle cx="11" cy="13" r="2.5" fill="var(--primary)" fillOpacity="0.12" />
      <circle cx="28" cy="12" r="3" fill="var(--primary)" fillOpacity="0.15" />
      <circle cx="25" cy="10" r="2.5" fill="var(--primary)" fillOpacity="0.1" />
      <circle cx="18" cy="12" r="3.5" fill="var(--primary)" fillOpacity="0.18" />
      <circle cx="15" cy="10" r="2" fill="var(--primary)" fillOpacity="0.1" />
      <circle cx="26" cy="21" r="2.5" fill="var(--primary)" fillOpacity="0.12" />
      {/* Small bird on branch */}
      <ellipse cx="26" cy="13" rx="1.8" ry="1.2" fill="var(--foreground)" fillOpacity="0.2" />
      <path d="M27.5,12.5 l1.5,-0.5" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.4" />
      <circle cx="25.5" cy="12.5" r="0.4" fill="var(--foreground)" fillOpacity="0.3" />
    </svg>
  )
}

// Planning row — an open seed packet with seeds spilling out and dotted growth lines
function PlanningRowIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      {/* Seed packet body */}
      <rect x="8" y="10" width="14" height="18" rx="2" fill="var(--foreground)" fillOpacity="0.06" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.6" />
      {/* Packet flap (open) */}
      <path d="M8,14 Q15,8 22,14" fill="var(--foreground)" fillOpacity="0.04" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.6" />
      {/* Tiny leaf icon on packet */}
      <path d="M13,20 Q15,17 17,18 Q15,19 13,20Z" fill="var(--primary)" fillOpacity="0.25" />
      <line x1="15" y1="19" x2="15" y2="23" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.4" />
      {/* Seeds spilling out */}
      <ellipse cx="24" cy="24" rx="1.8" ry="1.2" transform="rotate(20 24 24)" fill="var(--foreground)" fillOpacity="0.15" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.4" />
      <ellipse cx="27" cy="27" rx="1.5" ry="1" transform="rotate(-15 27 27)" fill="var(--foreground)" fillOpacity="0.12" stroke="var(--foreground)" strokeOpacity="0.18" strokeWidth="0.4" />
      <ellipse cx="26" cy="22" rx="1.3" ry="0.9" transform="rotate(40 26 22)" fill="var(--foreground)" fillOpacity="0.1" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.4" />
      <ellipse cx="29" cy="25" rx="1.2" ry="0.8" fill="var(--foreground)" fillOpacity="0.08" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="0.3" />
      {/* Dotted growth trajectory from a seed */}
      <path d="M27,27 Q30,22 32,14" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="1.5 2" fill="none" />
      {/* Tiny sprout at end of trajectory */}
      <path d="M32,14 Q31,11 32,9" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.5" fill="none" />
      <ellipse cx="31" cy="9.5" rx="1.5" ry="1" transform="rotate(-20 31 9.5)" fill="var(--primary)" fillOpacity="0.12" />
      <ellipse cx="33" cy="9.5" rx="1.5" ry="1" transform="rotate(20 33 9.5)" fill="var(--primary)" fillOpacity="0.12" />
    </svg>
  )
}

// Completed row — a basket/bushel overflowing with harvested produce
function CompletedRowIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      {/* Basket body */}
      <path d="M6,18 Q7,30 18,32 Q29,30 30,18" fill="var(--foreground)" fillOpacity="0.05" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="0.7" />
      {/* Basket weave lines */}
      <path d="M8,22 Q18,24 28,22" stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="0.4" fill="none" />
      <path d="M9,26 Q18,28 27,26" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.4" fill="none" />
      {/* Handle */}
      <path d="M10,18 Q18,8 26,18" fill="none" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.7" />
      {/* Overflowing produce — round fruits/vegetables */}
      <circle cx="13" cy="16" r="3" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" />
      <circle cx="18" cy="14" r="3.5" fill="var(--primary)" fillOpacity="0.25" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" />
      <circle cx="23" cy="16" r="2.8" fill="var(--primary)" fillOpacity="0.18" stroke="var(--primary)" strokeOpacity="0.12" strokeWidth="0.4" />
      <circle cx="16" cy="12" r="2" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="0.3" />
      <circle cx="21" cy="12" r="2.2" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeOpacity="0.12" strokeWidth="0.3" />
      {/* Little leaf on top */}
      <path d="M18,11 Q17,8 19,7" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.5" fill="none" />
      <ellipse cx="19.5" cy="7.5" rx="1.5" ry="0.8" transform="rotate(30 19.5 7.5)" fill="var(--primary)" fillOpacity="0.15" />
    </svg>
  )
}

// ─── Section Divider ─────────────────────────────────────────────────────────
// An organic vine line with small leaves connecting sections.
function VineDivider() {
  return (
    <div className="flex items-center justify-center px-8 py-2">
      <svg width="100%" height="24" viewBox="0 0 800 24" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-2xl opacity-30">
        {/* Main vine line */}
        <path d="M0,12 Q100,6 200,12 Q300,18 400,12 Q500,6 600,12 Q700,18 800,12" stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
        {/* Small leaves along the vine */}
        <ellipse cx="100" cy="8" rx="4" ry="2" transform="rotate(-30 100 8)" fill="var(--primary)" fillOpacity="0.15" />
        <ellipse cx="200" cy="12" rx="3.5" ry="1.8" transform="rotate(15 200 12)" fill="var(--primary)" fillOpacity="0.12" />
        <ellipse cx="300" cy="16" rx="4" ry="2" transform="rotate(-20 300 16)" fill="var(--primary)" fillOpacity="0.13" />
        <ellipse cx="400" cy="12" rx="3" ry="1.5" transform="rotate(25 400 12)" fill="var(--primary)" fillOpacity="0.1" />
        <ellipse cx="500" cy="8" rx="3.5" ry="1.8" transform="rotate(-15 500 8)" fill="var(--primary)" fillOpacity="0.14" />
        <ellipse cx="600" cy="12" rx="4" ry="2" transform="rotate(20 600 12)" fill="var(--primary)" fillOpacity="0.11" />
        <ellipse cx="700" cy="16" rx="3" ry="1.5" transform="rotate(-25 700 16)" fill="var(--primary)" fillOpacity="0.12" />
        {/* Tiny buds / berries */}
        <circle cx="150" cy="10" r="1.5" fill="var(--accent)" fillOpacity="0.2" />
        <circle cx="350" cy="15" r="1.2" fill="var(--accent)" fillOpacity="0.15" />
        <circle cx="550" cy="9" r="1.3" fill="var(--accent)" fillOpacity="0.18" />
        <circle cx="650" cy="14" r="1" fill="var(--accent)" fillOpacity="0.15" />
        {/* Tendrils curling off */}
        <path d="M150,10 Q145,5 148,3" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" fill="none" />
        <path d="M450,10 Q455,5 452,3" stroke="var(--primary)" strokeOpacity="0.12" strokeWidth="0.4" fill="none" />
        <path d="M650,14 Q645,19 648,21" stroke="var(--primary)" strokeOpacity="0.12" strokeWidth="0.4" fill="none" />
      </svg>
    </div>
  )
}

// ─── Floating Margin Illustrations ───────────────────────────────────────────
// Small decorative drawings that float in the page margins.

// A small mushroom cluster
function MarginMushrooms({ className = '' }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.12] ${className}`}>
      {/* Large mushroom */}
      <line x1="20" y1="36" x2="20" y2="24" stroke="var(--foreground)" strokeWidth="1.2" />
      <path d="M10,24 Q14,14 20,14 Q26,14 30,24Z" fill="var(--foreground)" fillOpacity="0.15" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.6" />
      <circle cx="16" cy="19" r="1" fill="var(--foreground)" fillOpacity="0.1" />
      <circle cx="22" cy="17" r="1.3" fill="var(--foreground)" fillOpacity="0.08" />
      <circle cx="18" cy="22" r="0.8" fill="var(--foreground)" fillOpacity="0.1" />
      {/* Small mushroom */}
      <line x1="30" y1="36" x2="30" y2="28" stroke="var(--foreground)" strokeWidth="0.8" />
      <path d="M24,28 Q27,22 30,22 Q33,22 36,28Z" fill="var(--foreground)" fillOpacity="0.1" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.5" />
      {/* Ground line */}
      <path d="M8,36 Q20,34 32,36 Q38,37 42,36" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.5" fill="none" />
      {/* Grass tufts */}
      <path d="M12,36 Q11,32 12,30" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.4" fill="none" />
      <path d="M14,36 Q15,33 14,31" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" fill="none" />
      <path d="M36,36 Q35,33 36,31" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" fill="none" />
    </svg>
  )
}

// A butterfly with dotted flight path
function MarginButterfly({ className = '' }: { className?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.12] ${className}`}>
      {/* Flight path */}
      <path d="M4,38 Q10,30 16,32 Q22,28 26,22 Q30,16 28,12" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.4" strokeDasharray="2 3" fill="none" />
      {/* Butterfly body */}
      <line x1="28" y1="14" x2="28" y2="8" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="0.6" />
      {/* Wings */}
      <ellipse cx="24" cy="10" rx="4.5" ry="3" transform="rotate(-20 24 10)" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" />
      <ellipse cx="32" cy="10" rx="4.5" ry="3" transform="rotate(20 32 10)" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" />
      <ellipse cx="25" cy="13" rx="3" ry="2" transform="rotate(-15 25 13)" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="0.3" />
      <ellipse cx="31" cy="13" rx="3" ry="2" transform="rotate(15 31 13)" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="0.3" />
      {/* Antennae */}
      <path d="M28,8 Q26,4 24,3" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.3" fill="none" />
      <path d="M28,8 Q30,4 32,3" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.3" fill="none" />
      <circle cx="24" cy="3" r="0.6" fill="var(--foreground)" fillOpacity="0.2" />
      <circle cx="32" cy="3" r="0.6" fill="var(--foreground)" fillOpacity="0.2" />
    </svg>
  )
}

// Wildflowers cluster
function MarginFlowers({ className = '' }: { className?: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.12] ${className}`}>
      {/* Stems */}
      <path d="M16,48 Q14,38 16,28" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.6" fill="none" />
      <path d="M26,48 Q26,36 26,24" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.6" fill="none" />
      <path d="M36,48 Q38,38 36,30" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.6" fill="none" />
      {/* Leaves on stems */}
      <ellipse cx="13" cy="36" rx="3" ry="1.5" transform="rotate(-30 13 36)" fill="var(--primary)" fillOpacity="0.15" />
      <ellipse cx="29" cy="34" rx="2.5" ry="1.3" transform="rotate(25 29 34)" fill="var(--primary)" fillOpacity="0.12" />
      <ellipse cx="39" cy="36" rx="2.5" ry="1.3" transform="rotate(30 39 36)" fill="var(--primary)" fillOpacity="0.13" />
      {/* Flower 1 — simple daisy */}
      <circle cx="16" cy="26" r="2" fill="var(--accent)" fillOpacity="0.25" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = (a * Math.PI) / 180
        return <ellipse key={a} cx={16 + Math.cos(rad) * 3.5} cy={26 + Math.sin(rad) * 3.5} rx="2" ry="1" transform={`rotate(${a} ${16 + Math.cos(rad) * 3.5} ${26 + Math.sin(rad) * 3.5})`} fill="var(--primary)" fillOpacity="0.12" />
      })}
      {/* Flower 2 — tall simple bloom */}
      <circle cx="26" cy="22" r="2.5" fill="var(--primary)" fillOpacity="0.2" />
      <circle cx="26" cy="22" r="4.5" fill="none" stroke="var(--primary)" strokeOpacity="0.1" strokeWidth="0.4" />
      {/* Flower 3 — bell shape */}
      <path d="M33,30 Q36,24 39,30" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="0.4" />
      <path d="M34,30 Q36,26 38,30" fill="var(--accent)" fillOpacity="0.1" />
      {/* Ground texture */}
      <path d="M6,48 Q26,46 46,48" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.4" fill="none" />
    </svg>
  )
}

// ─── Footer Landscape ────────────────────────────────────────────────────────
// A wide closing illustration — a river winding through a valley with scattered
// settlements, fields, and the faint outline of a new city on the horizon.
function FooterLandscape() {
  return (
    <div className="w-full overflow-hidden">
      <svg width="100%" height="120" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.15]">
        {/* Distant hills */}
        <path d="M0,50 Q100,30 200,45 Q350,25 500,40 Q650,28 800,42 Q950,30 1100,38 L1200,45 L1200,120 L0,120Z" fill="var(--primary)" fillOpacity="0.15" />
        <path d="M0,60 Q150,45 300,55 Q500,40 700,52 Q900,42 1100,50 L1200,55 L1200,120 L0,120Z" fill="var(--primary)" fillOpacity="0.1" />

        {/* River winding through */}
        <path d="M-10,80 Q100,65 200,75 Q350,85 500,70 Q650,60 800,72 Q950,82 1100,68 L1210,75" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M-10,84 Q100,70 200,79 Q350,88 500,74 Q650,64 800,76 Q950,86 1100,72 L1210,78" fill="none" stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="1" />

        {/* Small trees along the riverbank */}
        {[80, 180, 320, 480, 620, 750, 920, 1050].map((x, i) => {
          const y = 55 + (i % 3) * 5
          const h = 6 + (i % 2) * 3
          return (
            <g key={x}>
              <line x1={x} y1={y + 3} x2={x} y2={y - h + 3} stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="0.6" />
              <circle cx={x} cy={y - h + 1} r={2 + (i % 2)} fill="var(--primary)" fillOpacity="0.12" />
            </g>
          )
        })}

        {/* Field patterns — small dashed lines suggesting cultivated land */}
        <g opacity="0.15">
          <line x1="150" y1="90" x2="250" y2="90" stroke="var(--primary)" strokeWidth="0.4" strokeDasharray="3 4" />
          <line x1="155" y1="94" x2="245" y2="94" stroke="var(--primary)" strokeWidth="0.3" strokeDasharray="3 4" />
          <line x1="160" y1="98" x2="240" y2="98" stroke="var(--primary)" strokeWidth="0.3" strokeDasharray="3 4" />
        </g>
        <g opacity="0.12">
          <line x1="700" y1="88" x2="780" y2="88" stroke="var(--primary)" strokeWidth="0.4" strokeDasharray="3 4" />
          <line x1="705" y1="92" x2="775" y2="92" stroke="var(--primary)" strokeWidth="0.3" strokeDasharray="3 4" />
          <line x1="710" y1="96" x2="770" y2="96" stroke="var(--primary)" strokeWidth="0.3" strokeDasharray="3 4" />
        </g>

        {/* Distant settlement — tiny rectangles on the horizon */}
        <g opacity="0.12">
          <rect x="420" y="38" width="4" height="8" fill="var(--foreground)" />
          <rect x="426" y="35" width="3" height="11" fill="var(--foreground)" />
          <rect x="431" y="37" width="5" height="9" fill="var(--foreground)" />
          <rect x="438" y="33" width="3" height="13" fill="var(--foreground)" />
          <rect x="443" y="36" width="4" height="10" fill="var(--foreground)" />
        </g>

        {/* Windmill */}
        <g opacity="0.15">
          <line x1="900" y1="55" x2="900" y2="40" stroke="var(--foreground)" strokeWidth="0.8" />
          <line x1="895" y1="40" x2="905" y2="40" stroke="var(--foreground)" strokeWidth="0.4" />
          <line x1="900" y1="36" x2="900" y2="44" stroke="var(--foreground)" strokeWidth="0.4" />
          <line x1="896" y1="37" x2="904" y2="43" stroke="var(--foreground)" strokeWidth="0.3" />
          <line x1="904" y1="37" x2="896" y2="43" stroke="var(--foreground)" strokeWidth="0.3" />
        </g>

        {/* Birds heading toward the horizon */}
        <path d="M550,20 l-3,2.5 l3,-1 l3,1 l-3,-2.5" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.5" fill="none" />
        <path d="M560,17 l-2.5,2 l2.5,-0.8 l2.5,0.8 l-2.5,-2" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.4" fill="none" />
        <path d="M555,23 l-2,1.5 l2,-0.6 l2,0.6 l-2,-1.5" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="0.3" fill="none" />

        {/* Ground texture */}
        <path d="M0,105 Q300,100 600,105 Q900,100 1200,105" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
        <path d="M0,112 Q400,108 800,112 Q1000,108 1200,112" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.4" fill="none" />

        {/* Dragonflies near the river */}
        <g opacity="0.25">
          {/* Dragonfly 1 */}
          <g transform="translate(350, 60)">
            <line x1="0" y1="0" x2="8" y2="0" stroke="var(--accent)" strokeWidth="0.5" />
            <ellipse cx="-1" cy="0" rx="2" ry="0.8" fill="var(--accent)" fillOpacity="0.3" />
            <ellipse cx="2" cy="-2" rx="4" ry="1.2" transform="rotate(-15 2 -2)" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="0.3" />
            <ellipse cx="2" cy="2" rx="4" ry="1.2" transform="rotate(15 2 2)" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="0.3" />
          </g>
          {/* Dragonfly 2 */}
          <g transform="translate(850, 55) scale(-1,1)">
            <line x1="0" y1="0" x2="7" y2="0" stroke="var(--accent)" strokeWidth="0.4" />
            <ellipse cx="-1" cy="0" rx="1.5" ry="0.6" fill="var(--accent)" fillOpacity="0.25" />
            <ellipse cx="2" cy="-1.5" rx="3.5" ry="1" transform="rotate(-15 2 -1.5)" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="0.3" />
            <ellipse cx="2" cy="1.5" rx="3.5" ry="1" transform="rotate(15 2 1.5)" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeOpacity="0.15" strokeWidth="0.3" />
          </g>
        </g>

        {/* Cattails by the river */}
        <g opacity="0.15">
          <line x1="560" y1="72" x2="560" y2="58" stroke="var(--primary)" strokeWidth="0.5" />
          <ellipse cx="560" cy="57" rx="1.5" ry="4" fill="var(--foreground)" fillOpacity="0.3" />
          <line x1="564" y1="74" x2="564" y2="62" stroke="var(--primary)" strokeWidth="0.5" />
          <ellipse cx="564" cy="61" rx="1.3" ry="3.5" fill="var(--foreground)" fillOpacity="0.25" />
          <line x1="556" y1="73" x2="556" y2="64" stroke="var(--primary)" strokeWidth="0.4" />
          <path d="M556,64 Q554,60 556,58" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.3" fill="none" />
        </g>

        {/* Stone bridge */}
        <g opacity="0.12">
          <path d="M470,72 Q490,62 510,72" fill="none" stroke="var(--foreground)" strokeWidth="1" />
          <line x1="475" y1="72" x2="475" y2="78" stroke="var(--foreground)" strokeWidth="0.5" />
          <line x1="505" y1="72" x2="505" y2="78" stroke="var(--foreground)" strokeWidth="0.5" />
          {/* Stone texture */}
          <path d="M480,68 Q490,65 500,68" stroke="var(--foreground)" strokeWidth="0.3" fill="none" />
        </g>
      </svg>
    </div>
  )
}

// ─── Topographic Background ──────────────────────────────────────────────────
// Subtle contour lines that fill the page background behind the rows.
function TopographicTexture() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      {/* Large sweeping contour lines */}
      <path d="M0,100 Q200,80 400,120 Q600,90 800,130 Q1000,100 1200,110" fill="none" stroke="var(--foreground)" strokeOpacity="0.02" strokeWidth="0.8" />
      <path d="M0,200 Q300,170 500,210 Q700,180 900,220 Q1100,190 1200,200" fill="none" stroke="var(--foreground)" strokeOpacity="0.018" strokeWidth="0.7" />
      <path d="M0,320 Q200,300 450,340 Q650,310 850,350 Q1050,320 1200,330" fill="none" stroke="var(--foreground)" strokeOpacity="0.015" strokeWidth="0.6" />
      <path d="M0,450 Q250,420 500,460 Q750,430 1000,470 Q1150,440 1200,450" fill="none" stroke="var(--foreground)" strokeOpacity="0.018" strokeWidth="0.7" />
      <path d="M0,580 Q300,560 600,590 Q800,565 1000,595 Q1150,575 1200,580" fill="none" stroke="var(--foreground)" strokeOpacity="0.015" strokeWidth="0.6" />
      <path d="M0,700 Q200,680 400,710 Q600,685 800,720 Q1000,695 1200,710" fill="none" stroke="var(--foreground)" strokeOpacity="0.02" strokeWidth="0.8" />
      {/* Circular contours — like a topographic hill */}
      <circle cx="900" cy="350" r="80" fill="none" stroke="var(--foreground)" strokeOpacity="0.012" strokeWidth="0.5" />
      <circle cx="900" cy="350" r="120" fill="none" stroke="var(--foreground)" strokeOpacity="0.01" strokeWidth="0.5" />
      <circle cx="300" cy="600" r="100" fill="none" stroke="var(--foreground)" strokeOpacity="0.012" strokeWidth="0.5" />
      <circle cx="300" cy="600" r="150" fill="none" stroke="var(--foreground)" strokeOpacity="0.008" strokeWidth="0.5" />
    </svg>
  )
}

// ─── Animated Fireflies ──────────────────────────────────────────────────────
// Tiny glowing dots that drift and pulse across the page. Pure CSS animation.
function Fireflies() {
  const flies = [
    { x: '12%', y: '18%', delay: '0s', dur: '6s', size: 3 },
    { x: '78%', y: '25%', delay: '1.5s', dur: '7s', size: 2.5 },
    { x: '35%', y: '42%', delay: '0.8s', dur: '5.5s', size: 2 },
    { x: '62%', y: '58%', delay: '2.2s', dur: '8s', size: 3.5 },
    { x: '88%', y: '35%', delay: '3s', dur: '6.5s', size: 2 },
    { x: '22%', y: '72%', delay: '1s', dur: '7.5s', size: 2.5 },
    { x: '50%', y: '15%', delay: '4s', dur: '6s', size: 2 },
    { x: '92%', y: '68%', delay: '0.5s', dur: '5s', size: 3 },
    { x: '8%', y: '50%', delay: '2.8s', dur: '7s', size: 2 },
    { x: '45%', y: '82%', delay: '1.8s', dur: '6.5s', size: 2.5 },
    { x: '70%', y: '45%', delay: '3.5s', dur: '5.5s', size: 2 },
    { x: '30%', y: '90%', delay: '0.3s', dur: '8s', size: 3 },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {flies.map((f, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: f.x,
            top: f.y,
            width: f.size,
            height: f.size,
            background: 'var(--primary)',
            boxShadow: `0 0 ${f.size * 2}px ${f.size}px var(--primary)`,
            animation: `firefly-float ${f.dur} ease-in-out infinite alternate, firefly-glow ${f.dur} ease-in-out infinite`,
            animationDelay: f.delay,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

// ─── Drifting Clouds ─────────────────────────────────────────────────────────
// Soft cloud shapes that drift slowly across the billboard.
function DriftingClouds() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Cloud 1 — large, slow */}
      <svg className="absolute" style={{ top: '8%', left: '-10%', animation: 'cloud-drift-1 45s linear infinite', opacity: 0.04 }} width="200" height="60" viewBox="0 0 200 60" fill="none">
        <ellipse cx="100" cy="35" rx="80" ry="20" fill="var(--foreground)" />
        <ellipse cx="70" cy="28" rx="50" ry="22" fill="var(--foreground)" />
        <ellipse cx="130" cy="25" rx="55" ry="25" fill="var(--foreground)" />
        <ellipse cx="100" cy="20" rx="40" ry="18" fill="var(--foreground)" />
      </svg>
      {/* Cloud 2 — smaller, faster */}
      <svg className="absolute" style={{ top: '15%', left: '-5%', animation: 'cloud-drift-2 35s linear infinite', animationDelay: '10s', opacity: 0.03 }} width="140" height="45" viewBox="0 0 140 45" fill="none">
        <ellipse cx="70" cy="28" rx="55" ry="14" fill="var(--foreground)" />
        <ellipse cx="50" cy="22" rx="35" ry="16" fill="var(--foreground)" />
        <ellipse cx="90" cy="18" rx="40" ry="18" fill="var(--foreground)" />
      </svg>
      {/* Cloud 3 — wispy, high */}
      <svg className="absolute" style={{ top: '4%', left: '-8%', animation: 'cloud-drift-3 55s linear infinite', animationDelay: '20s', opacity: 0.025 }} width="180" height="30" viewBox="0 0 180 30" fill="none">
        <ellipse cx="90" cy="18" rx="80" ry="8" fill="var(--foreground)" />
        <ellipse cx="60" cy="14" rx="40" ry="10" fill="var(--foreground)" />
        <ellipse cx="130" cy="12" rx="45" ry="11" fill="var(--foreground)" />
      </svg>
    </div>
  )
}

// ─── Wildlife Silhouettes ────────────────────────────────────────────────────
// A fox and deer silhouette in the billboard landscape.
function WildlifeSilhouettes() {
  return (
    <>
      {/* Fox — small, sitting on the right hillside */}
      <g transform="translate(1000, 252)" opacity="0.06">
        <path d="M0,0 Q-2,-8 -1,-12 L2,-15 L3,-10 Q5,-12 7,-15 L8,-10 Q9,-8 8,0 Q6,-2 4,-2 Q2,-2 0,0Z" fill="var(--foreground)" />
        {/* Tail */}
        <path d="M-1,0 Q-6,-2 -8,-5 Q-6,-3 -3,-1" fill="var(--foreground)" />
      </g>
      {/* Deer — standing on distant ridge */}
      <g transform="translate(420, 225)" opacity="0.04">
        {/* Body */}
        <ellipse cx="0" cy="0" rx="8" ry="4" fill="var(--foreground)" />
        {/* Neck & head */}
        <path d="M6,-3 Q8,-10 7,-14" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
        <circle cx="7" cy="-15" r="2.5" fill="var(--foreground)" />
        {/* Antlers */}
        <path d="M6,-17 Q4,-22 2,-24" stroke="var(--foreground)" strokeWidth="0.6" fill="none" />
        <path d="M3,-22 Q1,-23 0,-22" stroke="var(--foreground)" strokeWidth="0.4" fill="none" />
        <path d="M8,-17 Q10,-22 12,-24" stroke="var(--foreground)" strokeWidth="0.6" fill="none" />
        <path d="M11,-22 Q13,-23 14,-22" stroke="var(--foreground)" strokeWidth="0.4" fill="none" />
        {/* Legs */}
        <line x1="-4" y1="3" x2="-5" y2="10" stroke="var(--foreground)" strokeWidth="0.8" />
        <line x1="-2" y1="3" x2="-2" y2="10" stroke="var(--foreground)" strokeWidth="0.8" />
        <line x1="3" y1="3" x2="2" y2="10" stroke="var(--foreground)" strokeWidth="0.8" />
        <line x1="5" y1="3" x2="6" y2="10" stroke="var(--foreground)" strokeWidth="0.8" />
      </g>
    </>
  )
}

// ─── Shooting Star ───────────────────────────────────────────────────────────
// A brief streak across the billboard sky, animated.
function ShootingStar() {
  return (
    <div className="absolute pointer-events-none" style={{ top: '10%', left: '20%', animation: 'shooting-star 8s ease-in infinite', animationDelay: '3s' }}>
      <svg width="80" height="2" viewBox="0 0 80 2" fill="none" className="opacity-[0.15]">
        <line x1="0" y1="1" x2="80" y2="1" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="0" y1="1" x2="30" y2="1" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  )
}

// ─── Large Decorative Compass Rose ───────────────────────────────────────────
// A detailed compass rose that sits between the billboard and the rows.
function DecorativeCompassRose() {
  return (
    <div className="flex items-center justify-center py-6">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.08]">
        {/* Outer ring */}
        <circle cx="40" cy="40" r="36" fill="none" stroke="var(--foreground)" strokeWidth="0.6" />
        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--foreground)" strokeWidth="0.3" />
        {/* Degree tick marks */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = i * 10
          const rad = (angle * Math.PI) / 180
          const r1 = i % 9 === 0 ? 30 : 33
          const r2 = 36
          return (
            <line
              key={i}
              x1={40 + Math.cos(rad) * r1}
              y1={40 - Math.sin(rad) * r1}
              x2={40 + Math.cos(rad) * r2}
              y2={40 - Math.sin(rad) * r2}
              stroke="var(--foreground)"
              strokeWidth={i % 9 === 0 ? '0.6' : '0.3'}
            />
          )
        })}
        {/* Cardinal points — elongated diamonds */}
        {/* North */}
        <polygon points="40,6 37,36 40,30 43,36" fill="var(--foreground)" fillOpacity="0.5" />
        <polygon points="40,6 37,36 40,42 43,36" fill="var(--foreground)" fillOpacity="0.15" />
        {/* South */}
        <polygon points="40,74 37,44 40,50 43,44" fill="var(--foreground)" fillOpacity="0.15" />
        <polygon points="40,74 37,44 40,38 43,44" fill="var(--foreground)" fillOpacity="0.35" />
        {/* East */}
        <polygon points="74,40 44,37 50,40 44,43" fill="var(--foreground)" fillOpacity="0.15" />
        <polygon points="74,40 44,37 38,40 44,43" fill="var(--foreground)" fillOpacity="0.3" />
        {/* West */}
        <polygon points="6,40 36,37 30,40 36,43" fill="var(--foreground)" fillOpacity="0.3" />
        <polygon points="6,40 36,37 42,40 36,43" fill="var(--foreground)" fillOpacity="0.15" />
        {/* Intercardinal lines */}
        {[45, 135, 225, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          return (
            <line
              key={angle}
              x1={40 + Math.cos(rad) * 8}
              y1={40 - Math.sin(rad) * 8}
              x2={40 + Math.cos(rad) * 26}
              y2={40 - Math.sin(rad) * 26}
              stroke="var(--foreground)"
              strokeWidth="0.4"
            />
          )
        })}
        {/* Center circle */}
        <circle cx="40" cy="40" r="3" fill="var(--foreground)" fillOpacity="0.15" stroke="var(--foreground)" strokeWidth="0.5" />
        <circle cx="40" cy="40" r="1" fill="var(--foreground)" fillOpacity="0.4" />
        {/* Cardinal letters */}
        <text x="40" y="4" textAnchor="middle" fontSize="5" fontWeight="bold" fill="var(--foreground)" fillOpacity="0.7">N</text>
        <text x="40" y="79" textAnchor="middle" fontSize="4" fill="var(--foreground)" fillOpacity="0.5">S</text>
        <text x="78" y="42" textAnchor="end" fontSize="4" fill="var(--foreground)" fillOpacity="0.5">E</text>
        <text x="2" y="42" textAnchor="start" fontSize="4" fill="var(--foreground)" fillOpacity="0.5">W</text>
      </svg>
    </div>
  )
}

// ─── Additional Margin Illustrations ─────────────────────────────────────────

// A snail on a leaf
function MarginSnail({ className = '' }: { className?: string }) {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.1] ${className}`}>
      {/* Leaf platform */}
      <path d="M4,24 Q20,18 36,24" fill="var(--primary)" fillOpacity="0.15" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.5" />
      <line x1="20" y1="21" x2="20" y2="28" stroke="var(--primary)" strokeOpacity="0.1" strokeWidth="0.3" />
      {/* Snail body */}
      <path d="M14,22 Q12,20 14,18 Q16,16 18,18" fill="var(--foreground)" fillOpacity="0.12" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.5" />
      {/* Shell spiral */}
      <circle cx="20" cy="18" r="4" fill="var(--foreground)" fillOpacity="0.08" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.5" />
      <path d="M20,14 Q22,16 20,18 Q18,17 19,15" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.3" fill="none" />
      {/* Antennae */}
      <path d="M14,18 Q12,14 11,12" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.3" fill="none" />
      <circle cx="11" cy="12" r="0.6" fill="var(--foreground)" fillOpacity="0.2" />
      <path d="M15,17 Q14,14 13,13" stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="0.3" fill="none" />
      <circle cx="13" cy="13" r="0.5" fill="var(--foreground)" fillOpacity="0.2" />
    </svg>
  )
}

// An acorn with a sprouting root
function MarginAcorn({ className = '' }: { className?: string }) {
  return (
    <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.1] ${className}`}>
      {/* Cap */}
      <path d="M8,16 Q8,10 16,10 Q24,10 24,16" fill="var(--foreground)" fillOpacity="0.12" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.5" />
      <path d="M10,14 Q16,12 22,14" stroke="var(--foreground)" strokeOpacity="0.08" strokeWidth="0.3" fill="none" />
      {/* Stem */}
      <line x1="16" y1="10" x2="16" y2="6" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="0.6" />
      {/* Body */}
      <path d="M8,16 Q8,26 16,28 Q24,26 24,16" fill="var(--foreground)" fillOpacity="0.08" stroke="var(--foreground)" strokeOpacity="0.18" strokeWidth="0.5" />
      {/* Root sprouting from bottom */}
      <path d="M16,28 Q15,34 14,38" stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="0.5" fill="none" />
      <path d="M14,38 Q12,40 10,41" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" fill="none" />
      <path d="M14,36 Q16,38 18,40" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" fill="none" />
      {/* Tiny root hairs */}
      <path d="M10,41 Q9,42 8,42" stroke="var(--primary)" strokeOpacity="0.1" strokeWidth="0.3" fill="none" />
      <path d="M18,40 Q19,42 20,42" stroke="var(--primary)" strokeOpacity="0.1" strokeWidth="0.3" fill="none" />
    </svg>
  )
}

// An unfurling fern frond
function MarginFern({ className = '' }: { className?: string }) {
  return (
    <svg width="36" height="56" viewBox="0 0 36 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.1] ${className}`}>
      {/* Main stem curling upward */}
      <path d="M18,54 Q16,40 18,28 Q20,18 22,12 Q24,8 22,6" stroke="var(--primary)" strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
      {/* Fiddlehead curl at top */}
      <path d="M22,6 Q18,4 18,8 Q18,10 20,10" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="0.6" fill="none" />
      {/* Left leaflets */}
      <path d="M17,44 Q12,42 10,40" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.4" fill="none" />
      <ellipse cx="10" cy="40" rx="2.5" ry="1" transform="rotate(-30 10 40)" fill="var(--primary)" fillOpacity="0.1" />
      <path d="M17,38 Q11,35 9,33" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.4" fill="none" />
      <ellipse cx="9" cy="33" rx="2.5" ry="1" transform="rotate(-25 9 33)" fill="var(--primary)" fillOpacity="0.1" />
      <path d="M18,32 Q13,28 11,26" stroke="var(--primary)" strokeOpacity="0.18" strokeWidth="0.4" fill="none" />
      <ellipse cx="11" cy="26" rx="2" ry="0.8" transform="rotate(-20 11 26)" fill="var(--primary)" fillOpacity="0.08" />
      <path d="M19,26 Q15,22 14,20" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" fill="none" />
      <ellipse cx="14" cy="20" rx="1.5" ry="0.7" transform="rotate(-15 14 20)" fill="var(--primary)" fillOpacity="0.07" />
      {/* Right leaflets */}
      <path d="M19,44 Q24,42 26,41" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.4" fill="none" />
      <ellipse cx="26" cy="41" rx="2.5" ry="1" transform="rotate(30 26 41)" fill="var(--primary)" fillOpacity="0.1" />
      <path d="M19,38 Q25,36 27,35" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="0.4" fill="none" />
      <ellipse cx="27" cy="35" rx="2.5" ry="1" transform="rotate(25 27 35)" fill="var(--primary)" fillOpacity="0.1" />
      <path d="M20,32 Q25,30 27,28" stroke="var(--primary)" strokeOpacity="0.18" strokeWidth="0.4" fill="none" />
      <ellipse cx="27" cy="28" rx="2" ry="0.8" transform="rotate(20 27 28)" fill="var(--primary)" fillOpacity="0.08" />
      <path d="M21,26 Q25,24 26,22" stroke="var(--primary)" strokeOpacity="0.15" strokeWidth="0.4" fill="none" />
      <ellipse cx="26" cy="22" rx="1.5" ry="0.7" transform="rotate(15 26 22)" fill="var(--primary)" fillOpacity="0.07" />
      {/* Ground moss dots */}
      <circle cx="14" cy="52" r="1" fill="var(--primary)" fillOpacity="0.1" />
      <circle cx="20" cy="53" r="0.8" fill="var(--primary)" fillOpacity="0.08" />
      <circle cx="24" cy="51" r="1.2" fill="var(--primary)" fillOpacity="0.08" />
    </svg>
  )
}

// ─── Waypoint Trail ──────────────────────────────────────────────────────────
// A vertical dotted path with waypoint markers connecting the page sections.
function WaypointTrail() {
  return (
    <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-0">
      <svg width="20" height="100%" viewBox="0 0 20 600" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.06]">
        {/* Dotted vertical trail */}
        <line x1="10" y1="0" x2="10" y2="600" stroke="var(--foreground)" strokeWidth="0.8" strokeDasharray="4 8" />
        {/* Waypoint markers */}
        <circle cx="10" cy="60" r="3" fill="none" stroke="var(--primary)" strokeWidth="0.8" />
        <circle cx="10" cy="60" r="1" fill="var(--primary)" />
        <circle cx="10" cy="240" r="3" fill="none" stroke="var(--primary)" strokeWidth="0.8" />
        <circle cx="10" cy="240" r="1" fill="var(--primary)" />
        <circle cx="10" cy="420" r="3" fill="none" stroke="var(--primary)" strokeWidth="0.8" />
        <circle cx="10" cy="420" r="1" fill="var(--primary)" />
        {/* Small diamond markers between waypoints */}
        <polygon points="10,145 12,150 10,155 8,150" fill="var(--foreground)" fillOpacity="0.3" />
        <polygon points="10,325 12,330 10,335 8,330" fill="var(--foreground)" fillOpacity="0.3" />
        <polygon points="10,510 12,515 10,520 8,515" fill="var(--foreground)" fillOpacity="0.3" />
      </svg>
    </div>
  )
}

// Row icon map for each row type
const ROW_ICONS: Record<string, () => React.JSX.Element> = {
  'Active Initiatives': ActiveRowIcon,
  'In Planning': PlanningRowIcon,
  'Completed': CompletedRowIcon,
}

// ─── Ghost Card ──────────────────────────────────────────────────────────────
// Each ghost is a dormant seed — a project waiting to exist.

function GhostCard({ index = 0 }: { index?: number }) {
  return (
    <Link href="/community/projects/new" className="flex-shrink-0 w-[260px] sm:w-[300px] group/ghost">
      <div className="aspect-[16/10] rounded-lg overflow-hidden relative border border-dashed border-[var(--border)] transition-colors duration-300 group-hover/ghost:border-[var(--primary)]/40"
        style={{ background: 'linear-gradient(160deg, var(--muted) 0%, var(--background) 100%)' }}
      >
        {/* Background landscape */}
        <CardLandscape seed={index * 17 + 3} />

        {/* Seed scene */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-opacity duration-300 group-hover/ghost:opacity-0">
          <div
            style={{ animation: `gentle-sway ${3 + index * 0.4}s ease-in-out infinite alternate` }}
          >
            <GhostSeedScene index={index} />
          </div>
          <span className="text-[10px] font-medium text-[var(--muted-foreground)]/50 tracking-widest uppercase">
            Awaiting
          </span>
        </div>

        {/* Create overlay on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover/ghost:opacity-100 transition-all duration-300 bg-[var(--card)]/60 backdrop-blur-[2px]">
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-[var(--primary)]/50 flex items-center justify-center bg-[var(--primary)]/10 transition-transform duration-300 group-hover/ghost:scale-110">
            <Plus className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest">
            Create Your Own
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: any; index: number }) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.ACTIVE

  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[300px] group relative">
      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[var(--muted)] relative cursor-pointer transition-shadow duration-300 group-hover:shadow-lg"
        style={{ boxShadow: `0 0 0 0 ${status.glow}` }}
      >
        {/* Background */}
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              background: `linear-gradient(145deg, var(--card) 0%, var(--muted) 60%, var(--card) 100%)`,
            }}
          >
            <CardLandscape seed={index} />
          </div>
        )}

        {/* Persistent gradient veil at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/20 to-transparent" />

        {/* Status pill with subtle glow */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full"
            style={{
              background: status.bg,
              color: status.text,
              boxShadow: `0 0 8px ${status.glow}`,
            }}
          >
            {status.label}
          </span>
        </div>

        {/* Member count */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-[var(--card)]/80 backdrop-blur-sm text-[var(--card-foreground)] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[var(--border)]/50">
          <Users className="w-3 h-3" />
          {project._count.members}
        </div>

        {/* Always-visible bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3 className="text-[var(--foreground)] font-bold text-sm leading-tight truncate">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {project.creator?.name || 'Anonymous'}
            </span>
            {project.goal && (
              <>
                <span className="text-[var(--border)]">|</span>
                <span className="flex items-center gap-1 truncate">
                  <Target className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{project.goal}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Hover reveal */}
        <div className="absolute inset-0 bg-[var(--card)]/70 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 z-20">
          {project.description && (
            <p className="text-xs text-[var(--muted-foreground)] text-center px-5 line-clamp-3 leading-relaxed max-w-[90%]">
              {project.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Link href={`/community/projects/${project.slug}`}>
              <Button
                size="sm"
                className="h-8 text-[11px] font-bold uppercase tracking-wider rounded-full px-4"
              >
                View Initiative
              </Button>
            </Link>
            <JoinProjectButton projectId={project.id} projectName={project.name} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Scrollable Row ──────────────────────────────────────────────────────────

function ScrollRow({ title, subtitle, projects, ghostCount }: ProjectRow) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll, projects])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const totalCards = projects.length + ghostCount
  if (totalCards === 0) return null

  return (
    <section className="relative group/row">
      {/* Row header */}
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {ROW_ICONS[title] && React.createElement(ROW_ICONS[title])}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
              {title}
            </h2>
            <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5 tracking-wide">
              {subtitle}
            </p>
          </div>
        </div>
        {projects.length > 0 && (
          <span className="text-xs text-[var(--muted-foreground)] font-medium tabular-nums">
            {projects.length}
          </span>
        )}
      </div>

      {/* Scroll container */}
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 w-14 z-20 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shadow-md">
              <ChevronLeft className="w-4 h-4 text-[var(--foreground)]" />
            </div>
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 w-14 z-20 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center shadow-md">
              <ChevronRight className="w-4 h-4 text-[var(--foreground)]" />
            </div>
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project: any, i: number) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          {Array.from({ length: ghostCount }).map((_, i) => (
            <GhostCard key={`ghost-${i}`} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Billboard / The Horizon ─────────────────────────────────────────────────
// The featured project is the guiding star — the first light on the horizon
// of a new world. This is what an Exodus looks like from the front of the line.

function Billboard({ project, totalProjects, totalContributors }: {
  project: any
  totalProjects: number
  totalContributors: number
}) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.ACTIVE

  return (
    <div className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(400px, 60vh, 700px)' }}
    >
      {/* Background layer */}
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 80%, var(--primary)/0.12 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 20%, var(--accent)/0.08 0%, transparent 70%),
            linear-gradient(175deg, var(--background) 0%, var(--muted) 40%, var(--card) 70%, var(--background) 100%)
          `
        }}>
          {/* Full landscape illustration */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">

            {/* Sun / celestial body */}
            <circle cx="900" cy="120" r="45" fill="var(--primary)" fillOpacity="0.06" />
            <circle cx="900" cy="120" r="60" fill="none" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.8" />
            <circle cx="900" cy="120" r="80" fill="none" stroke="var(--primary)" strokeOpacity="0.02" strokeWidth="0.5" />
            {/* Sun rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
              const rad = (angle * Math.PI) / 180
              return <line key={angle} x1={900 + Math.cos(rad) * 50} y1={120 - Math.sin(rad) * 50} x2={900 + Math.cos(rad) * 75} y2={120 - Math.sin(rad) * 75} stroke="var(--primary)" strokeOpacity="0.03" strokeWidth="0.5" />
            })}

            {/* Distant mountain range */}
            <path
              d="M0,280 Q100,220 200,260 Q350,180 450,240 Q550,200 650,230 Q750,170 850,220 Q950,195 1050,240 Q1150,210 1200,250 L1200,400 L0,400Z"
              fill="var(--primary)"
              fillOpacity="0.04"
            />
            {/* Second mountain layer — closer, slightly darker */}
            <path
              d="M0,300 Q80,270 180,290 Q280,260 380,285 Q500,250 600,275 Q720,255 840,280 Q940,260 1060,278 Q1140,265 1200,275 L1200,400 L0,400Z"
              fill="var(--primary)"
              fillOpacity="0.025"
            />

            {/* Horizon glow line */}
            <line x1="0" y1="265" x2="1200" y2="265" stroke="var(--primary)" strokeOpacity="0.12" strokeWidth="1" />

            {/* Winding path through the landscape */}
            <path
              d="M500,400 Q480,370 510,340 Q540,310 520,285 Q500,265 530,250"
              fill="none" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="1.5"
            />
            <path
              d="M540,400 Q520,370 550,340 Q580,310 560,285 Q540,265 530,250"
              fill="none" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="1.5"
            />
            {/* Path dashes getting smaller toward horizon */}
            <line x1="520" y1="360" x2="535" y2="360" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.6" />
            <line x1="525" y1="330" x2="538" y2="330" stroke="var(--foreground)" strokeOpacity="0.035" strokeWidth="0.5" />
            <line x1="528" y1="300" x2="537" y2="300" stroke="var(--foreground)" strokeOpacity="0.03" strokeWidth="0.4" />

            {/* Trees along the path — varying sizes for depth */}
            {/* Large foreground tree (left) */}
            <line x1="180" y1="310" x2="180" y2="280" stroke="var(--primary)" strokeOpacity="0.08" strokeWidth="1.5" />
            <circle cx="180" cy="274" r="12" fill="var(--primary)" fillOpacity="0.04" />
            <circle cx="180" cy="274" r="8" fill="var(--primary)" fillOpacity="0.03" />
            {/* Medium tree */}
            <line x1="350" y1="295" x2="350" y2="272" stroke="var(--primary)" strokeOpacity="0.07" strokeWidth="1.2" />
            <circle cx="350" cy="268" r="9" fill="var(--primary)" fillOpacity="0.035" />
            {/* Small distant tree */}
            <line x1="680" y1="270" x2="680" y2="258" stroke="var(--primary)" strokeOpacity="0.06" strokeWidth="0.8" />
            <circle cx="680" cy="255" r="6" fill="var(--primary)" fillOpacity="0.03" />
            {/* Tiny trees on the ridge */}
            <line x1="850" y1="260" x2="850" y2="252" stroke="var(--primary)" strokeOpacity="0.05" strokeWidth="0.6" />
            <circle cx="850" cy="250" r="4" fill="var(--primary)" fillOpacity="0.025" />
            <line x1="1020" y1="265" x2="1020" y2="258" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" />
            <circle cx="1020" cy="256" r="3.5" fill="var(--primary)" fillOpacity="0.02" />
            {/* Tree cluster right side */}
            <line x1="1080" y1="268" x2="1080" y2="255" stroke="var(--primary)" strokeOpacity="0.05" strokeWidth="0.7" />
            <circle cx="1080" cy="252" r="5" fill="var(--primary)" fillOpacity="0.025" />
            <line x1="1095" y1="270" x2="1095" y2="260" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.6" />
            <circle cx="1095" cy="258" r="4" fill="var(--primary)" fillOpacity="0.02" />

            {/* Birds in formation */}
            <g opacity="0.06">
              <path d="M300,150 l-4,4 l4,-1.5 l4,1.5 l-4,-4" stroke="var(--foreground)" strokeWidth="0.8" fill="none" />
              <path d="M320,143 l-3.5,3.5 l3.5,-1.2 l3.5,1.2 l-3.5,-3.5" stroke="var(--foreground)" strokeWidth="0.7" fill="none" />
              <path d="M312,155 l-3,3 l3,-1 l3,1 l-3,-3" stroke="var(--foreground)" strokeWidth="0.6" fill="none" />
              <path d="M335,148 l-3,3 l3,-1 l3,1 l-3,-3" stroke="var(--foreground)" strokeWidth="0.6" fill="none" />
              <path d="M325,158 l-2.5,2.5 l2.5,-0.8 l2.5,0.8 l-2.5,-2.5" stroke="var(--foreground)" strokeWidth="0.5" fill="none" />
            </g>
            {/* Second bird group, farther */}
            <g opacity="0.04">
              <path d="M750,100 l-3,3 l3,-1 l3,1 l-3,-3" stroke="var(--foreground)" strokeWidth="0.6" fill="none" />
              <path d="M765,95 l-2.5,2.5 l2.5,-0.8 l2.5,0.8 l-2.5,-2.5" stroke="var(--foreground)" strokeWidth="0.5" fill="none" />
              <path d="M758,105 l-2,2 l2,-0.7 l2,0.7 l-2,-2" stroke="var(--foreground)" strokeWidth="0.4" fill="none" />
            </g>

            {/* Scattered waypoint markers */}
            <circle cx="180" cy="258" r="2" fill="var(--primary)" fillOpacity="0.2" />
            <circle cx="480" cy="238" r="1.5" fill="var(--accent)" fillOpacity="0.2" />
            <circle cx="780" cy="218" r="2" fill="var(--primary)" fillOpacity="0.15" />
            <circle cx="1020" cy="242" r="1.5" fill="var(--accent)" fillOpacity="0.15" />

            {/* Ground contour lines */}
            <path d="M0,320 Q200,300 400,315 Q600,295 800,310 Q1000,290 1200,305" fill="none" stroke="var(--foreground)" strokeOpacity="0.025" strokeWidth="0.8" />
            <path d="M0,345 Q250,330 500,342 Q750,325 1000,338 Q1100,332 1200,340" fill="none" stroke="var(--foreground)" strokeOpacity="0.02" strokeWidth="0.6" />

            {/* Small plants / grass tufts in foreground */}
            <path d="M60,350 Q62,342 60,338" stroke="var(--primary)" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
            <path d="M63,350 Q65,344 67,340" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
            <path d="M150,340 Q152,333 150,328" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
            <path d="M820,345 Q822,338 820,333" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />
            <path d="M823,345 Q826,340 828,335" stroke="var(--primary)" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
            <path d="M1150,335 Q1152,328 1150,324" stroke="var(--primary)" strokeOpacity="0.04" strokeWidth="0.5" fill="none" />

            {/* Compass rose — bottom right */}
            <g transform="translate(1130, 370)" opacity="0.05">
              <line x1="0" y1="-12" x2="0" y2="12" stroke="var(--foreground)" strokeWidth="0.8" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="var(--foreground)" strokeWidth="0.8" />
              <polygon points="0,-12 -3,-3 0,-5 3,-3" fill="var(--foreground)" />
              <text x="0" y="-15" textAnchor="middle" fontSize="4" fill="var(--foreground)" fillOpacity="0.8">N</text>
            </g>

            {/* Wildlife silhouettes */}
            <WildlifeSilhouettes />

            {/* Moon / second celestial hint (faint crescent far left) */}
            <g opacity="0.03">
              <circle cx="120" cy="80" r="18" fill="var(--foreground)" />
              <circle cx="126" cy="76" r="16" fill="var(--background)" />
            </g>

            {/* Constellation dots — tiny star pattern */}
            <g opacity="0.04">
              <circle cx="200" cy="60" r="1" fill="var(--foreground)" />
              <circle cx="220" cy="50" r="0.8" fill="var(--foreground)" />
              <circle cx="240" cy="65" r="1.2" fill="var(--foreground)" />
              <circle cx="215" cy="75" r="0.7" fill="var(--foreground)" />
              <circle cx="235" cy="45" r="0.9" fill="var(--foreground)" />
              <line x1="200" y1="60" x2="220" y2="50" stroke="var(--foreground)" strokeWidth="0.2" />
              <line x1="220" y1="50" x2="240" y2="65" stroke="var(--foreground)" strokeWidth="0.2" />
              <line x1="240" y1="65" x2="215" y2="75" stroke="var(--foreground)" strokeWidth="0.2" />
              <line x1="215" y1="75" x2="200" y2="60" stroke="var(--foreground)" strokeWidth="0.2" />
              <line x1="220" y1="50" x2="235" y2="45" stroke="var(--foreground)" strokeWidth="0.2" />
            </g>

            {/* Pond/lake in the middle distance */}
            <ellipse cx="720" cy="285" rx="35" ry="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeOpacity="0.04" strokeWidth="0.5" />
            <ellipse cx="720" cy="287" rx="25" ry="4" fill="var(--accent)" fillOpacity="0.03" />

            {/* Fence line along a field */}
            <g opacity="0.035">
              <line x1="100" y1="305" x2="100" y2="295" stroke="var(--foreground)" strokeWidth="0.6" />
              <line x1="120" y1="303" x2="120" y2="293" stroke="var(--foreground)" strokeWidth="0.6" />
              <line x1="140" y1="301" x2="140" y2="291" stroke="var(--foreground)" strokeWidth="0.6" />
              <line x1="100" y1="297" x2="140" y2="293" stroke="var(--foreground)" strokeWidth="0.3" />
              <line x1="100" y1="301" x2="140" y2="297" stroke="var(--foreground)" strokeWidth="0.3" />
            </g>
          </svg>

          {/* Drifting clouds overlay */}
          <DriftingClouds />

          {/* Shooting star */}
          <ShootingStar />
        </div>
      )}

      {/* Gradient veils */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/70 to-[var(--background)]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/90 via-[var(--background)]/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <div className="max-w-2xl">
            {/* Exodus compass mark */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full border border-[var(--primary)]/50 flex items-center justify-center bg-[var(--primary)]/20">
                <Compass className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full"
                  style={{ background: status.bg, color: status.text, boxShadow: `0 0 12px ${status.glow}` }}
                >
                  {status.label}
                </span>
                <span className="text-[10px] font-bold text-[var(--foreground)]/70 uppercase tracking-widest">
                  Featured
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--foreground)] leading-[1.05] tracking-tight drop-shadow-md">
              {project.name}
            </h1>

            {project.description && (
              <p className="text-sm sm:text-base text-[var(--foreground)]/80 mt-3 leading-relaxed line-clamp-2 max-w-lg font-medium">
                {project.description}
              </p>
            )}

            {/* Action row */}
            <div className="flex items-center gap-3 mt-6">
              <Link href={`/community/projects/${project.slug}`}>
                <Button
                  size="lg"
                  className="h-10 text-sm font-bold uppercase tracking-wider rounded-full gap-2 px-6"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Explore
                </Button>
              </Link>
              <Link href="/community/projects/new">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-10 text-sm font-bold uppercase tracking-wider rounded-full gap-2 px-6 border-[var(--primary)]/50 hover:bg-[var(--primary)]/20"
                >
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
              </Link>
              <JoinProjectButton projectId={project.id} projectName={project.name} />
            </div>

            {/* Journey stats */}
            <div className="flex items-center gap-6 mt-5 text-xs text-[var(--foreground)]/70 font-medium">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
                <strong className="text-[var(--foreground)] font-bold">{project._count.members}</strong> contributors
              </span>
              <span className="text-[var(--foreground)]/30">|</span>
              <span className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[var(--primary)]" />
                <strong className="text-[var(--foreground)] font-bold">{totalProjects}</strong> initiatives
              </span>
              <span className="text-[var(--foreground)]/30">|</span>
              <span className="flex items-center gap-1.5">
                <TreePine className="w-3.5 h-3.5 text-[var(--primary)]" />
                <strong className="text-[var(--foreground)] font-bold">{totalContributors}</strong> members
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        setProjects(data.success ? data.data : [])
      } catch {
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  // ─── Loading state ─────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-pulse">
            <LoadingSeed />
          </div>
          <p className="text-xs text-[var(--muted-foreground)] tracking-widest uppercase">Loading initiatives...</p>
        </div>
      </div>
    )
  }

  // ─── Build rows ────────────────────────────────────────────────────────

  const active = projects.filter((p) => p.status === 'ACTIVE')
  const planning = projects.filter((p) => p.status === 'PLANNING')
  const completed = projects.filter((p) => p.status === 'COMPLETED')

  const featured = [...active].sort((a, b) => (b._count?.members || 0) - (a._count?.members || 0))[0]
    || projects[0]

  const activeWithoutFeatured = featured ? active.filter((p) => p.id !== featured.id) : active

  const CARDS_PER_ROW = 7
  const ghostsFor = (arr: any[]) => Math.max(CARDS_PER_ROW - arr.length, 2)

  const rows: ProjectRow[] = [
    {
      title: 'Active Initiatives',
      subtitle: 'Active initiatives shaping the path forward',
      projects: activeWithoutFeatured,
      ghostCount: ghostsFor(activeWithoutFeatured),
    },
    {
      title: 'In Planning',
      subtitle: 'Ideas taking root \u2014 join early and help them grow',
      projects: planning,
      ghostCount: ghostsFor(planning),
    },
    {
      title: 'Completed',
      subtitle: 'Completed journeys and the impact they left behind',
      projects: completed,
      ghostCount: ghostsFor(completed),
    },
  ]

  const totalContributors = projects.reduce((sum, p) => sum + (p._count?.members || 0), 0)

  // ─── Empty state ───────────────────────────────────────────────────────

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center space-y-5 px-4 max-w-md">
          <EmptyLandscape />
          <div>
            <h2 className="text-2xl font-black text-[var(--foreground)]">No Initiatives Yet</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
              The land is open. Be the first to plant a seed and start building.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <Link href="/community/projects/new">
              <Button className="font-bold text-sm uppercase tracking-wider rounded-full px-6 gap-2">
                <Plus className="w-4 h-4" />
                Create Initiative
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" className="font-bold text-sm uppercase tracking-wider rounded-full px-6">
                Go to Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      {/* Keyframes for animations */}
      <style>{`
        @keyframes gentle-sway {
          0% { transform: rotate(-3deg) translateY(0); }
          100% { transform: rotate(3deg) translateY(-2px); }
        }
        @keyframes firefly-float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(12px, -18px); }
          50% { transform: translate(-8px, -30px); }
          75% { transform: translate(15px, -12px); }
          100% { transform: translate(-5px, 6px); }
        }
        @keyframes firefly-glow {
          0%, 100% { opacity: 0; }
          15% { opacity: 0.6; }
          30% { opacity: 0.2; }
          50% { opacity: 0.8; }
          70% { opacity: 0.3; }
          85% { opacity: 0.7; }
        }
        @keyframes cloud-drift-1 {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        @keyframes cloud-drift-2 {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 150px)); }
        }
        @keyframes cloud-drift-3 {
          0% { transform: translateX(-180px); }
          100% { transform: translateX(calc(100vw + 180px)); }
        }
        @keyframes shooting-star {
          0%, 90%, 100% { opacity: 0; transform: translate(0, 0) rotate(-25deg); }
          92% { opacity: 0.3; }
          95% { opacity: 0; transform: translate(200px, 80px) rotate(-25deg); }
        }
      `}</style>

      {/* ═══ TOPOGRAPHIC BACKGROUND ═══ */}
      <TopographicTexture />

      {/* ═══ THE HORIZON ═══ */}
      {featured && (
        <Billboard
          project={featured}
          totalProjects={projects.length}
          totalContributors={totalContributors}
        />
      )}

      {/* ═══ COMPASS TRANSITION ═══ */}
      <DecorativeCompassRose />

      {/* ═══ THE JOURNEY ═══ */}
      <main className="relative py-10">
        {/* Animated fireflies scattered across the section */}
        <Fireflies />

        {/* Vertical waypoint trail down the center */}
        <WaypointTrail />

        {/* Floating margin illustrations — positioned absolutely for decoration */}
        <div className="hidden lg:block absolute top-16 right-6 xl:right-12">
          <MarginButterfly />
        </div>
        <div className="hidden lg:block absolute top-[20%] left-4 xl:left-10">
          <MarginFern />
        </div>
        <div className="hidden lg:block absolute top-[35%] left-4 xl:left-10">
          <MarginMushrooms />
        </div>
        <div className="hidden lg:block absolute top-[48%] right-6 xl:right-12">
          <MarginSnail />
        </div>
        <div className="hidden lg:block absolute top-[65%] right-8 xl:right-14">
          <MarginFlowers />
        </div>
        <div className="hidden lg:block absolute top-[78%] left-6 xl:left-12">
          <MarginAcorn />
        </div>
        <div className="hidden lg:block absolute bottom-32 left-6 xl:left-12">
          <MarginButterfly className="opacity-[0.08] -scale-x-100" />
        </div>
        <div className="hidden lg:block absolute bottom-16 right-6 xl:right-10">
          <MarginFern className="opacity-[0.08] -scale-x-100" />
        </div>

        {/* Rows with vine dividers between them */}
        <div className="space-y-2">
          {rows.map((row, i) => (
            <React.Fragment key={row.title}>
              {i > 0 && <VineDivider />}
              <ScrollRow
                title={row.title}
                subtitle={row.subtitle}
                projects={row.projects}
                ghostCount={row.ghostCount}
              />
            </React.Fragment>
          ))}
        </div>
      </main>

      {/* ═══ CLOSING LANDSCAPE ═══ */}
      <FooterLandscape />
    </div>
  )
}
