# Architecture Globe Landing — Final Plan

## Concept
Full-viewport 3D rotating Earth (real continents) showing architectural influence as animated arcs between regions. Timeline slider from prehistory → today. **Cumulative display** — at any slider position, ALL connections from the beginning of time up to that year are visible. Auto-plays on load with cinematic timeline progression. Click a region to zoom in.

---

## Decisions (confirmed)

1. **Auto-play on load** — globe spins, timeline auto-advances from -3500 BCE → 2025 CE
2. **Real Earth** — actual continent geography, dark-themed (NASA night-lights style or dark political map)
3. **Cumulative arcs** — slider at 1800 CE = all connections from prehistory through 1800
4. **Click to zoom** — clicking a region dot zooms the globe to that region (expandable later)

---

## Library: `react-globe.gl`

- Declarative React wrapper around Three.js globe
- First-class `arcsData`, `pointsData`, `ringsData` props
- Auto-rotation, zoom, manual drag built in
- Custom globe image texture (dark Earth map)
- Next.js: `dynamic(() => import(...), { ssr: false })`
- Install: `npm install react-globe.gl`

---

## Data Pipeline

### Region ID mismatch (important)
Periods use lowercase kebab-case: `'western-europe'`, `'north-africa'`, `'iberia'`
Region definitions use uppercase: `'MEDITERRANEAN'`, `'MIDDLE_EAST'`

**Solution:** `globeConnections.ts` creates a mapping table:
```
'north-africa'     → { lat: 31.0, lng: 2.0 }    (Cairo area)
'middle-east'      → { lat: 33.3, lng: 44.4 }    (Baghdad area)
'mediterranean'    → { lat: 41.9, lng: 12.5 }    (Rome area)
'western-europe'   → { lat: 48.8, lng: 2.3 }     (Paris area)
'eastern-europe'   → { lat: 55.7, lng: 37.6 }    (Moscow area)
'east-asia'        → { lat: 35.7, lng: 104.1 }   (Central China)
'south-asia'       → { lat: 20.6, lng: 78.9 }    (Central India)
'southeast-asia'   → { lat: 13.7, lng: 100.5 }   (Bangkok area)
'east-africa'      → { lat: 9.0, lng: 38.7 }     (Addis Ababa area)
'iberia'           → { lat: 40.4, lng: -3.7 }    (Madrid area)
'north-america'    → { lat: 40.7, lng: -74.0 }   (New York area)
'south-america'    → { lat: -23.5, lng: -46.6 }  (São Paulo area)
'global'           → SKIP (not a real location)
```

### Arc generation logic:
```
For each period P:
  For each source period S in P.influencedBy:
    For each region R_source in S.primaryRegions:
      For each region R_target in P.primaryRegions:
        if R_source !== R_target AND neither is 'global':
          Create arc {
            fromLat, fromLng (R_source centroid)
            toLat, toLng (R_target centroid)
            startYear: P.startYear (when the influence began)
            sourcePeriodName: S.name
            targetPeriodName: P.name
            color: P.color
          }
```

**Filtering:** `arcsData = allArcs.filter(arc => arc.startYear <= currentYear)`

---

## Components

### 1. `components/architecture/globe/ArchitectureGlobe.tsx`
The main globe. Props: `{ currentYear, onRegionClick }`

- **Texture:** Dark Earth image (NASA Blue Marble night or stylized dark map)
- **Atmosphere:** Warm amber halo (`atmosphereColor: '#D4A54A'`)
- **Auto-rotation:** `autoRotationSpeed={0.3}`, pauses when user drags
- **Arcs:** Filtered by `currentYear`. Dashed animation, period `color`, altitude proportional to distance
- **Points:** Region centroids as amber glowing dots. Size scales with active connection count.
- **Rings:** Pulse animation at points that just received a new connection
- **Click:** `onPointClick` → zooms globe to that region's lat/lng via `pointOfView()`

### 2. `components/architecture/globe/GlobeTimeline.tsx`
Props: `{ currentYear, onChange, isPlaying, onTogglePlay }`

- Horizontal slider: -3500 → 2025
- **Track:** Dark with amber fill for elapsed portion
- **Thumb:** Gold circle with year label above
- **Period markers:** Colored tick marks at each period's startYear
- **Active period label:** Shows current period name (e.g., "Gothic · 1150–1500")
- **Play/pause button:** Toggles auto-advance
- **Speed control:** 1x / 2x / 4x buttons (optional)
- **BCE/CE formatting:** -3100 displays as "3100 BCE", 1400 displays as "1400 CE"

### 3. `components/architecture/globe/GlobeInfoPanel.tsx`
Props: `{ currentYear, activeConnections, hoveredArc }`

- Floating glass-morphism panel (top-left)
- Shows: current era, year, total active connections
- On arc hover: source → target, period names, what was influenced
- Compact — doesn't obscure the globe

### 4. `components/architecture/globe/GlobeLanding.tsx`
The full landing section that composes everything:

- Full viewport (`h-screen`)
- Globe centered, fills ~70% of viewport
- Title "ARCHITECTURE" top-center, semi-transparent white/gold
- Subtitle "5,000 Years of Connected Design"
- Timeline slider fixed at bottom
- Info panel floating top-left
- Scroll indicator at very bottom
- Loading skeleton while globe initializes

### 5. `data/architecture/globeConnections.ts`
- Region centroid mapping
- Arc derivation from periods
- Helper: `getArcsForYear(year: number)` → filtered arcs
- Helper: `getActivePeriodsForYear(year: number)` → current period label

---

## Layout

```
┌─────────────────────────────────────────────┐
│  [info panel]     A R C H I T E C T U R E   │
│  Gothic · 1150   5,000 Years of Connected   │
│  47 connections   Design                     │
│                                              │
│                  ╭──────────╮                │
│               ╭──│ 🌍       │──╮             │
│              │   │  arcs    │   │            │
│               ╰──│  glow    │──╯             │
│                  ╰──────────╯                │
│                                              │
│                                              │
│  ▶ ──●━━━━━━━━━━━━━━━━━━━━━●──────────────  │
│   -3500  ▲ "Gothic (1150)"          2025     │
│          thumb                               │
│                    ↓ scroll                   │
└─────────────────────────────────────────────┘
```

---

## Auto-play Sequence

1. **0s:** Globe fades in, dark Earth visible, no arcs. Timeline at -3500.
2. **0–2s:** Globe starts rotating. First arcs appear (Egyptian → Greek).
3. **2–15s:** Timeline advances through ancient world. Roman connections spread across Mediterranean.
4. **15–30s:** Medieval era. Byzantine, Islamic, Gothic arcs web across Europe/Middle East.
5. **30–45s:** Renaissance → Baroque. Europe lights up. Colonial connections reach Americas.
6. **45–55s:** Modern era. International Style connects every continent. Globe is webbed.
7. **55–60s:** Timeline reaches 2025. Auto-play pauses. User can now drag/interact.

Speed: ~5500 years / 60 seconds ≈ 92 years per second

---

## Earth Texture

Using a dark/night Earth image. Options:
- NASA Blue Marble Night (real city lights — stunning but might distract from arcs)
- Stylized dark political map (muted gray continents on near-black oceans)
- Low-poly dark Earth (geometric, matches a design-forward aesthetic)

---

## File Structure

```
components/architecture/globe/
  GlobeLanding.tsx          — full landing section compositor
  ArchitectureGlobe.tsx     — 3D globe + arcs + points
  GlobeTimeline.tsx         — timeline slider
  GlobeInfoPanel.tsx        — floating info panel

data/architecture/
  globeConnections.ts       — region centroids + derived arc data
```

---

## Implementation Steps

1. `npm install react-globe.gl`
2. Create `data/architecture/globeConnections.ts` — centroids + arc derivation
3. Create `ArchitectureGlobe.tsx` — globe with arcs, points, zoom-on-click
4. Create `GlobeTimeline.tsx` — styled slider with play/pause and period labels
5. Create `GlobeInfoPanel.tsx` — floating stats panel
6. Create `GlobeLanding.tsx` — compose all components into full-viewport section
7. Wire into `app/architecture/page.tsx` — replace empty hero with GlobeLanding
8. Add dark Earth texture image to `public/`
9. Polish: loading state, scroll indicator, mobile fallback

---

## Questions

1. **Earth texture style?** Which vibe for the globe surface:
   - NASA night lights (real city lights glowing against dark Earth)
   - Dark political map (muted gray continents, near-black oceans, clean)
   - Low-poly / geometric dark Earth (modern design feel)

2. **Arc aging:** Should older connections fade/dim as time progresses (so recent ones pop more), or all arcs equally bright regardless of age?

3. **Mobile:** 3D globe is GPU-heavy. Should mobile get a simplified 2D flat map fallback, or still attempt the 3D globe (smaller, less arcs)?

4. **Globe size:** Should the globe fill most of the viewport (immersive, Been-style), or sit smaller in the center with more breathing room for UI elements?
