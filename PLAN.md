# Architecture Globe Landing — Final Plan v3

## All Decisions (locked in)

| Decision | Choice |
|----------|--------|
| Auto-play | Yes — cinematic intro, auto-spin + timeline progression |
| Globe surface | Real Earth continents with country borders |
| Arc accumulation | Cumulative — all connections from prehistory to slider position |
| Click behavior | Zoom into clicked region |
| Arc differentiation | **Material Evolution + Altitude** — color shifts stone→bronze→copper→gold→steel AND older arcs hug surface, newer soar higher |
| Layout | **Immersive Hero** — globe fills ~85% viewport, title top-left, info top-right, timeline bottom |
| Night/dark theme | NASA night lights + country border overlays |
| Day/light theme | NASA Blue Marble + country border overlays |
| Mobile | Static pre-rendered hero image, tap to activate 3D |
| Arc brightness | All equally bright, differentiated by color + altitude only |

---

## Library: `react-globe.gl`

- Declarative React wrapper around Three.js globe
- `arcsData`, `pointsData`, `ringsData`, `polygonsData` props
- Auto-rotation, zoom, drag built in
- Custom globe image texture + polygon overlays for borders
- Next.js: `dynamic(() => import(...), { ssr: false })`
- Install: `npm install react-globe.gl`

---

## Globe Textures (theme-aware)

### Night/Dark Mode
- **Base:** NASA Black Marble (Earth at Night) — city lights glowing
- **Borders:** GeoJSON country polygons rendered as thin amber/gold lines over the dark surface
- **Atmosphere:** Warm amber glow halo

### Day/Light Mode
- **Base:** NASA Blue Marble — classic bright Earth with blue oceans, green/brown land
- **Borders:** GeoJSON country polygons as thin dark lines
- **Atmosphere:** Soft white/blue glow

### Border Overlay Approach
react-globe.gl supports `polygonsData` with GeoJSON — we load a lightweight countries GeoJSON (~50KB simplified) and render as stroke-only polygons on top of the texture. This gives us real country outlines that work with any base texture.

---

## Arc Age Differentiation: Material Evolution + Altitude

### Color by era (material metaphor):
| Era | Years | Color | Material | Arc Altitude |
|-----|-------|-------|----------|-------------|
| Ancient | -3500 to -500 | `#C4A882` | Stone/sandstone | 0.1 (hugs surface) |
| Classical | -500 to 500 | `#CD7F32` | Bronze | 0.2 |
| Medieval | 500 to 1400 | `#4A9E8E` | Copper/verdigris | 0.35 |
| Renaissance–Colonial | 1400 to 1800 | `#D4A54A` | Gold/gilt | 0.5 |
| Modern | 1800 to 2025 | `#B8C4D0` | Steel/chrome | 0.7 (soars high) |

Arc color is determined by `startYear` of the connection, NOT the period's own color.
This creates visible geological layers — ancient stone-colored arcs carpet the surface while modern steel arcs tower above.

### Dash animation
All arcs use animated dashes flowing from source → target. Same dash speed regardless of era.

---

## Data Pipeline

### Region centroids (kebab-case → lat/lng):
```
'north-africa'     → { lat: 31.0, lng: 2.0 }
'middle-east'      → { lat: 33.3, lng: 44.4 }
'mediterranean'    → { lat: 41.9, lng: 12.5 }
'western-europe'   → { lat: 48.8, lng: 2.3 }
'eastern-europe'   → { lat: 55.7, lng: 37.6 }
'east-asia'        → { lat: 35.7, lng: 104.1 }
'south-asia'       → { lat: 20.6, lng: 78.9 }
'southeast-asia'   → { lat: 13.7, lng: 100.5 }
'east-africa'      → { lat: 9.0, lng: 38.7 }
'iberia'           → { lat: 40.4, lng: -3.7 }
'north-america'    → { lat: 40.7, lng: -74.0 }
'south-america'    → { lat: -23.5, lng: -46.6 }
'global'           → SKIP
```

### Arc generation:
```
For each period P:
  For each source period S in P.influencedBy:
    For each R_source in S.primaryRegions:
      For each R_target in P.primaryRegions:
        if R_source !== R_target AND neither is 'global':
          arc = {
            fromLat, fromLng, toLat, toLng,
            startYear: P.startYear,
            eraColor: getEraColor(P.startYear),
            eraAltitude: getEraAltitude(P.startYear),
            sourcePeriodName: S.name,
            targetPeriodName: P.name,
          }
```

**Filter:** `arcsData = allArcs.filter(arc => arc.startYear <= currentYear)`

---

## Components

### 1. `ArchitectureGlobe.tsx`
Props: `{ currentYear, onRegionClick, theme: 'day' | 'night' }`

- **Texture:** Switches between Blue Marble (day) and Black Marble (night) based on site theme
- **Borders:** GeoJSON polygons rendered as stroke-only country outlines
- **Atmosphere:** Amber (night) or soft blue (day)
- **Auto-rotation:** `autoRotationSpeed: 0.3`, pauses on user interaction
- **Arcs:** Filtered by `currentYear`. Era-colored, era-altitude, animated dashes
- **Points:** Region centroids as glowing dots. Amber (night) / dark gold (day)
- **Click:** `onPointClick` → `pointOfView({ lat, lng, altitude: 1.5 })` zooms in

### 2. `GlobeTimeline.tsx`
Props: `{ currentYear, onChange, isPlaying, onTogglePlay }`

- Range: -3500 → 2025
- Dark track with amber fill (elapsed portion)
- Gold thumb with floating year label
- Play/pause button (left side)
- Active period name label
- BCE/CE formatting: -3100 → "3100 BCE", 1400 → "1400 CE"

### 3. `GlobeInfoPanel.tsx`
Props: `{ currentYear, activeConnections, hoveredArc }`

- Glass-morphism floating panel (top-right)
- Current era name + year
- Active connection count
- On arc hover: "Egyptian → Greek" with description
- Compact, doesn't obscure globe

### 4. `GlobeLanding.tsx`
Composes everything into the hero section:

- `h-screen` full viewport
- Globe fills ~85% of viewport, centered
- Title "ARCHITECTURE" top-left corner
- Subtitle "5,000 Years of Connected Design" below title
- Info panel top-right
- Timeline slider pinned to bottom
- Scroll indicator (↓ chevron) at very bottom
- Loading state: dark background + subtle pulse animation
- Mobile: static image with "Tap to explore" overlay

---

## Immersive Hero Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│ ARCHITECTURE              ┌──────────────────┐  │
│ 5,000 Years of            │ Gothic · 1150 CE │  │
│ Connected Design          │ 47 connections   │  │
│                           └──────────────────┘  │
│                                                 │
│            ╭────────────────────╮               │
│         ╭──│                    │──╮            │
│       ╭─│  │                    │  │─╮          │
│       │ │  │    🌍 GLOBE        │  │ │          │
│       │ │  │    fills ~85%      │  │ │          │
│       │ │  │    of viewport     │  │ │          │
│       ╰─│  │                    │  │─╯          │
│         ╰──│                    │──╯            │
│            ╰────────────────────╯               │
│                                                 │
│                                                 │
│  ▶ ━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━  │
│    3500 BCE    "Gothic · 1150 CE"      2025 CE  │
│                       ↓                         │
└─────────────────────────────────────────────────┘
```

- Title + subtitle: top-left, `absolute`, `z-10`, semi-transparent white/gold text
- Info panel: top-right, `absolute`, `z-10`, glass-morphism backdrop-blur
- Globe: centered, fills container, `z-0`
- Timeline: bottom, `absolute`, `z-10`, full width with padding
- Scroll indicator: bottom-center, subtle bounce animation

---

## Auto-play Sequence

| Time | Year Range | What Happens |
|------|-----------|--------------|
| 0s | -3500 | Globe fades in, dark Earth, no arcs |
| 0–2s | -3500 → -3000 | Globe starts rotating, first stone arcs (Egyptian → Mesopotamian) |
| 2–15s | -3000 → -200 | Ancient world lights up. Low stone/bronze arcs across Mediterranean |
| 15–30s | -200 → 1400 | Classical → Medieval. Copper arcs web Europe/Middle East. Byzantine, Islamic, Gothic. |
| 30–45s | 1400 → 1800 | Renaissance → Colonial. Gold arcs reach Americas. Globe filling up. |
| 45–55s | 1800 → 2025 | Modern era. Steel arcs soar high, connecting every continent. |
| 55–60s | 2025 | Auto-play pauses. Full web of layered arcs visible. User takes over. |

---

## Mobile Strategy

- **Detection:** Check `window.innerWidth < 768` or `navigator.maxTouchPoints > 0`
- **Static hero:** Pre-rendered dark globe image (screenshot of the 3D globe with arcs at ~1500 CE)
- **Overlay:** "Tap to explore in 3D" button centered on the static image
- **On tap:** Lazy-load the full react-globe.gl component, replace static image
- **Timeline:** Still functional on mobile, just controls the static → 3D transition triggers the interactive version
- **Benefits:** Zero GPU cost on initial load, instant page render, user opts into heavy 3D

---

## File Structure

```
components/architecture/globe/
  GlobeLanding.tsx          — full hero section compositor
  ArchitectureGlobe.tsx     — 3D globe + arcs + points + borders
  GlobeTimeline.tsx         — timeline slider with play/pause
  GlobeInfoPanel.tsx        — floating info panel

data/architecture/
  globeConnections.ts       — region centroids + arc derivation

public/globe/
  earth-night.jpg           — NASA Black Marble texture
  earth-day.jpg             — NASA Blue Marble texture
  earth-topology.json       — Simplified countries GeoJSON (~50KB)
  globe-static.jpg          — Pre-rendered static image for mobile
```

---

## Implementation Steps

1. `npm install react-globe.gl`
2. Download and add globe textures to `public/globe/`
3. Create `data/architecture/globeConnections.ts` — centroids + arc generation + era helpers
4. Create `ArchitectureGlobe.tsx` — globe, textures, theme switching, arcs, points, borders, zoom
5. Create `GlobeTimeline.tsx` — styled slider with auto-play, period labels, BCE/CE formatting
6. Create `GlobeInfoPanel.tsx` — glass-morphism floating panel
7. Create `GlobeLanding.tsx` — compose hero section with all components + mobile static fallback
8. Wire into `app/architecture/page.tsx` — replace empty hero section
9. Polish: loading skeleton, scroll indicator, auto-play timing, mobile static image

---

## Open Questions

1. **Country borders thickness/color:** Should borders be very faint (just enough to see countries) or clearly visible? Faint keeps focus on arcs; visible makes the geography more educational.

2. **Auto-play trigger:** Should auto-play start immediately on page load, or after a brief pause (1-2 seconds) to let the user see the empty globe first? The pause creates a "wow" moment when arcs start appearing.

3. **Zoom-on-click depth:** When clicking a region dot, how close should we zoom? Close enough to see individual country borders in that region, or just a moderate zoom to center the region?
