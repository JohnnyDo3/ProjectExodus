# Architecture Globe Landing — Implementation Plan

## Concept
A full-viewport 3D rotating globe (Been app style) showing architectural influence connections as animated arcs between world regions. A draggable timeline slider (prehistory → today) reveals connections as they formed throughout history. The globe is interactive — rotate, zoom, 360-degree view.

---

## Library Choice: `react-globe.gl`

**Why:** First-class arc connections, dark aesthetic by default, declarative React props, proven Next.js pattern (`dynamic` + `ssr: false`). ~113K weekly downloads, actively maintained.

**Install:** `npm install react-globe.gl`

---

## Data Pipeline (already exists in codebase)

### Source data:
- `data/architecture/periods.ts` — 40+ periods with `startYear`, `endYear`, `primaryRegions[]`, `influencedBy[]`, `influenced[]`, and `color`
- `data/architecture/regions.ts` — 13 regions with colors and sub-regions

### Derived connection data (new file):
Create `data/architecture/globeConnections.ts` that:
1. Maps each region to a lat/lng centroid (e.g., MEDITERRANEAN → [41.9, 12.5], EAST_ASIA → [35.8, 104.1])
2. Iterates every period's `influencedBy[]` relationships
3. For each influence edge: looks up the source period's `primaryRegions` and the target period's `primaryRegions`
4. Produces arc objects: `{ fromLat, fromLng, toLat, toLng, startYear, endYear, sourcePeriod, targetPeriod, color }`
5. Deduplicates region-to-region arcs that share the same time window

**Result:** ~100-200 arc connections spanning 3100 BCE → 2025 CE

---

## Components

### 1. `ArchitectureGlobe.tsx` (new)
Client-only component wrapping `react-globe.gl`:
- **Globe setup:** Dark sphere, subtle atmosphere halo (amber/gold tint to match architecture theme), no texture or just a subtle land outline
- **Arcs layer:** `arcsData` filtered by current timeline year. Animated dashed arcs with period colors
- **Points layer:** `pointsData` — region centroids as glowing dots, sized by number of active connections
- **Labels layer:** Region names appearing on hover
- **Ring pulses:** When a new connection appears (timeline crosses a period start), a ring pulse animates at both endpoints
- **Controls:** Auto-rotation (slow), user can drag to rotate, scroll to zoom, double-click to reset view

### 2. `GlobeTimeline.tsx` (new)
Horizontal slider at the bottom of the viewport:
- Range: -3500 (Mesopotamian) → 2025 (today)
- Styled as a gold/amber track with period-colored segments
- Draggable thumb with year label
- Auto-play button (slowly advances through time)
- Period name label updates as you cross boundaries ("Ancient Egyptian → Classical Greek → ...")
- Tick marks at major period boundaries

### 3. `GlobeInfoPanel.tsx` (new)
Floating panel (top-right or bottom-left) that shows:
- Current era name + date range
- Number of active connections
- When user hovers an arc: shows source period → target period, what was influenced
- Subtle, glass-morphism style panel

### 4. Updated `app/architecture/page.tsx`
- The empty `h-screen` placeholder section gets filled with the globe
- Globe loads via `dynamic(() => import(...), { ssr: false })` with a loading skeleton
- Title "ARCHITECTURE" overlaid on the globe (top or center, semi-transparent)
- Subtitle: "5,000 Years of Connected Design"
- Scroll indicator at bottom
- All existing content remains below the fold

---

## Layout (above the fold)

```
┌─────────────────────────────────────────┐
│                                         │
│            A R C H I T E C T U R E      │  ← overlaid title
│       5,000 Years of Connected Design   │
│                                         │
│              ╭─────────╮                │
│           ╭──│  🌍     │──╮             │  ← 3D globe with arcs
│          │   │  ╱╲ ╱╲  │   │            │
│           ╰──│         │──╯             │
│              ╰─────────╯                │
│                                         │
│  [info panel]              [controls]   │
│                                         │
│  ──●━━━━━━━━━━━━━━━━━━━●──────────── │  ← timeline slider
│   -3500    "Gothic (1150)"        2025  │
│                                         │
│                ↓ scroll                  │
└─────────────────────────────────────────┘
```

---

## Timeline Interaction

1. **Page load:** Globe appears with auto-rotation, timeline at ~1200 CE (Gothic — lots of connections visible)
2. **Drag slider left:** Connections disappear as you go back in time. At -3000 only Egyptian→Mesopotamian arcs
3. **Drag slider right:** Connections multiply rapidly through Renaissance, Baroque, Colonial era
4. **Modern era (1900+):** Globe lights up — International Style connects every continent
5. **Auto-play mode:** Button starts slow animation from prehistory, arcs bloom across the globe

---

## Visual Style

- **Globe:** Dark/charcoal sphere with subtle country outlines (low-opacity land polygons)
- **Atmosphere:** Warm amber glow halo (matches architecture page theme)
- **Arcs:** Animated dashed lines using period colors, slight altitude curve
- **Points:** Glowing amber dots at region centroids
- **Background:** Very dark, almost black, with subtle radial gradient
- **Typography:** Same gold/amber palette as the existing architecture page
- **Timeline:** Gold track, glass-morphism panel, period colors as segment backgrounds

---

## Questions

1. **Auto-play default?** Should the timeline auto-advance on page load (cinematic intro), or start paused at a specific era?

2. **Globe texture:** Pure dark sphere with subtle land outlines, or completely abstract (just dots and arcs, no geography)?

3. **Arc detail level:** Show individual element connections (e.g., "Pointed Arch traveled from Islamic → Gothic") or keep it at the period level ("Islamic Architecture influenced Gothic Architecture")?

4. **Click interaction:** When you click a region dot, should it zoom in and show elements/periods specific to that region, or just show info in a panel?

---

## File Structure

```
components/architecture/globe/
  ArchitectureGlobe.tsx       — main globe component
  GlobeTimeline.tsx           — timeline slider
  GlobeInfoPanel.tsx          — floating info panel
  globeWrapper.tsx            — dynamic import wrapper for SSR

data/architecture/
  globeConnections.ts         — derived arc data from periods + regions
```

## Implementation Steps

1. `npm install react-globe.gl`
2. Create `globeConnections.ts` — derive arcs from existing period/region data
3. Create `ArchitectureGlobe.tsx` — globe + arcs + points
4. Create `GlobeTimeline.tsx` — slider component
5. Create `GlobeInfoPanel.tsx` — hover/click info display
6. Create `globeWrapper.tsx` — SSR-safe dynamic import
7. Wire into `app/architecture/page.tsx` — fill the empty hero section
8. Style and polish — title overlay, scroll indicator, loading state
