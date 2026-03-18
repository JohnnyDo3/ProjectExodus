# Architecture Globe Landing — FINAL SPEC v5

## All Decisions (every round consolidated)

| # | Decision | Choice |
|---|----------|--------|
| 1 | Auto-play | Cinematic intro, auto-spin + timeline progression |
| 2 | Globe surface | Real Earth continents + **clearly visible** country borders |
| 3 | Arc accumulation | Cumulative — all connections from prehistory to slider position |
| 4 | Click behavior | **Close zoom** + **fly-back** on exit (1.5s smooth animation) |
| 5 | Arc differentiation | **Material Evolution + Altitude** combined |
| 6 | Layout | **Immersive Hero** — globe fills ~85% viewport |
| 7 | Night/dark theme | NASA Black Marble (night lights) + amber/gold border lines |
| 8 | Day/light theme | NASA Blue Marble + dark border lines |
| 9 | Mobile | Static hero (auto-generated via Puppeteer at build), tap anywhere + pulse hint to activate 3D |
| 10 | Arc brightness | All equally bright, differentiated by color + altitude only |
| 11 | Border visibility | Clearly visible — educational, identifiable countries |
| 12 | Auto-play start | 1-2 second pause, empty globe breathes, then arcs bloom |
| 13 | Zoom fly-back | X on region card + click empty globe — both trigger fly-back |
| 14 | Title style | Mixed case elegant ("Architecture") — match site fonts |
| 15 | Subtitle | Dynamic: "Gothic · 1150 CE / 3500 BCE – 1150 CE · 4,650 Years / From First Shelters to Skyscrapers" |
| 16 | Scroll hint | None — no scroll indicator |
| 17 | Loading skeleton | Wireframe sphere with amber wireframe → texture fill transition |
| 18 | Info panel (default) | Mini stats dashboard: connection count + region count (animated counters) |
| 19 | Info panel (zoomed) | Transforms to region card: name, connections (inbound/outbound), active periods, iconic buildings, X to close |
| 20 | Arc hover | Glow + thicken arc + era-colored tooltip (periods + years + regions) |
| 21 | Theme transition | **Full terminator simulation** — custom Three.js shader, day/night boundary from SunCalc via TimeThemeProvider |
| 22 | Speed control | 3 buttons: 1x / 2x / 4x next to play/pause |
| 23 | Glass-morphism | Subtle (8px blur) on all panels |
| 24 | Scroll transition | **Parallax** — fixed globe, content slides over, full size behind content |
| 25 | Content divider | **Skyline silhouette** (static) — pyramid, columns, dome, gothic spire, skyscraper as SVG |
| 26 | Auto-play pause | Pauses only when user touches the timeline slider directly |
| 27 | Auto-play end | Loops back to beginning |
| 28 | Auto-play speed | Configurable (1x/2x/4x buttons) |
| 29 | Region dots | Appear with first connection — dot triggers regional shockwave |
| 30 | Shockwave style | Expanding ring from origin, era material color, ~1.5s, fading as it spreads |
| 31 | Timeline track | Era-colored segments with major era labels (Ancient, Classical, Medieval, Renaissance, Modern) |
| 32 | Auto-play pacing | Fast through prehistory (15s for 12,000–3,500 BCE), normal for rest (45s for 3,500 BCE–2025 CE) |
| 33 | Period boundary | Constant speed + shockwave pulses at each new period |
| 34 | Arc animation | Grow from source → target over ~1 second |
| 35 | Globe start angle | Facing Europe/Mediterranean |
| 36 | Auto-rotation | Follow the action — center newest arc's target region |
| 37 | Drag freedom | Free 360° + snap tilt back (only during auto-play) |
| 38 | Dot labels | Show region name on hover only |
| 39 | Timeline range | **12,000 BCE → 2025 CE** (14,000 years) |
| 40 | Prehistoric data | All 6 periods added to periods.ts |
| 41 | New regions | Add 'levant' and 'anatolia' as new region IDs |
| 42 | Prehistoric arcs | Both internal chains + bridge to existing periods |
| 43 | Material tiers | 7 tiers: Earth/Hide → Bone/Wood → Stone → Bronze → Copper → Gold → Steel |
| 44 | Contemporary merge | Merge Sustainable + Parametricism into 'Contemporary' |
| 45 | Keyboard | Full: ←/→ timeline, ↑/↓ zoom, Tab cycle dots, Enter zoom in, Esc fly back, Space play/pause, 1/2/4 speed |
| 46 | ARIA | Full screen reader labels on all interactive elements |
| 47 | Tooltip style | Era-colored background, tooltip near cursor |
| 48 | Mobile long-press | Region tooltip (name + connection count) |
| 49 | Mobile touch | Standard gestures + long-press info |
| 50 | Fly-back speed | Smooth 1.5 second animation |
| 51 | Region card close | Animate back to stats dashboard |
| 52 | Sound | Skip for v1 |
| 53 | GeoJSON detail | Standard ~100KB |
| 54 | Texture quality | 4K (high quality) |
| 55 | Follow action | Center newest arc's target region |
| 56 | Build screenshot | Puppeteer headless render at build time |

---

## Library: `react-globe.gl`

- Declarative React wrapper around Three.js globe
- `arcsData`, `pointsData`, `ringsData`, `polygonsData` props
- Auto-rotation, zoom, drag built in
- Custom globe image texture + polygon overlays for borders
- Custom `globeMaterial()` for terminator shader
- Next.js: `dynamic(() => import(...), { ssr: false })`
- Install: `npm install react-globe.gl`

---

## Globe Textures (theme-aware)

### Night/Dark Mode
- **Base:** NASA Black Marble 4K (Earth at Night) — city lights glowing
- **Borders:** GeoJSON country polygons as thin amber/gold lines
- **Atmosphere:** Warm amber glow halo

### Day/Light Mode
- **Base:** NASA Blue Marble 4K — blue oceans, green/brown land
- **Borders:** GeoJSON country polygons as thin dark lines
- **Atmosphere:** Soft white/blue glow

### Terminator Simulation (v1)
Custom Three.js shader that blends both textures on the globe simultaneously:
- Uses `coords` + `sunAltitude` from `useTimeTheme()` (TimeThemeProvider)
- Day/night boundary (terminator line) positioned at real sun position via SunCalc
- Half the globe shows Blue Marble, half shows Black Marble
- Boundary shifts in real-time as sun moves
- Smooth gradient at the terminator line (not a hard edge)
- Override via `globeMaterial()` prop on react-globe.gl

### Border Overlay
- Standard ~100KB countries GeoJSON
- `polygonsData` with stroke-only rendering
- Night: amber/gold lines. Day: dark lines
- Clearly visible — educational, identifiable countries

---

## Material Evolution Tiers (7 levels)

| Era | Years | Color | Material | Arc Altitude | Arc grows from |
|-----|-------|-------|----------|-------------|---------------|
| Early Prehistoric | -12,000 to -6,000 | `#6B4423` | Earth/hide | 0.05 | source → target |
| Late Prehistoric | -6,000 to -3,500 | `#8B7355` | Bone/wood | 0.08 | source → target |
| Ancient | -3,500 to -500 | `#C4A882` | Stone | 0.12 | source → target |
| Classical | -500 to 500 | `#CD7F32` | Bronze | 0.2 | source → target |
| Medieval | 500 to 1,400 | `#4A9E8E` | Copper/verdigris | 0.35 | source → target |
| Renaissance–Colonial | 1,400 to 1,800 | `#D4A54A` | Gold/gilt | 0.5 | source → target |
| Modern | 1,800 to 2,025 | `#B8C4D0` | Steel/chrome | 0.7 | source → target |

All arcs: animated dashes, same dash speed, ~1 second grow animation from source → target.

---

## Full Period Timeline (27 periods)

### Prehistoric (NEW — 6 periods)
| Period | Start | End | Regions | Influences |
|--------|-------|-----|---------|------------|
| Natufian Settlements | -12,000 | -9,500 | levant | → PPNA |
| Pre-Pottery Neolithic A (Gobekli Tepe) | -9,500 | -8,500 | anatolia, levant | Natufian → PPNB |
| Pre-Pottery Neolithic B | -8,500 | -6,000 | levant, anatolia, middle-east | PPNA → Catalhoyuk, Mehrgarh, Mesopotamian |
| Catalhoyuk / Proto-Urban | -7,500 | -5,700 | anatolia | PPNB → Megalithic |
| Early Indus (Mehrgarh) | -7,000 | -3,300 | south-asia | PPNB → (future Indus) |
| Megalithic Traditions | -5,000 | -2,500 | western-europe, mediterranean, north-africa | Catalhoyuk → Classical Greek |

### Ancient (existing + adjusted — 4 periods)
| Period | Start | End | Regions |
|--------|-------|-----|---------|
| Mesopotamian | -3,500 | -539 | middle-east |
| Ancient Egyptian | -3,100 | -30 | north-africa, middle-east |
| Classical Greek | -900 | -30 | mediterranean |
| Roman | -500 | 476 | mediterranean, western-europe, middle-east, north-africa |

### Medieval (existing — 5 periods)
| Period | Start | End | Regions |
|--------|-------|-----|---------|
| Byzantine | 330 | 1,453 | eastern-europe, middle-east, mediterranean |
| Early Islamic | 650 | 1,000 | middle-east, north-africa |
| Romanesque | 1,000 | 1,200 | western-europe |
| Medieval Ethiopian | 1,137 | 1,270 | east-africa |
| Gothic | 1,150 | 1,500 | western-europe |

### Renaissance–Colonial (existing — 5 periods)
| Period | Start | End | Regions |
|--------|-------|-----|---------|
| Renaissance | 1,400 | 1,600 | mediterranean, western-europe |
| Ottoman Classical | 1,453 | 1,703 | middle-east, eastern-europe, north-africa |
| Isabelline Gothic | 1,474 | 1,516 | iberia |
| Baroque | 1,600 | 1,750 | western-europe, mediterranean, south-america |
| Neoclassical | 1,750 | 1,850 | western-europe, north-america |

### Modern (existing, merged — 7 periods)
| Period | Start | End | Regions |
|--------|-------|-----|---------|
| Art Nouveau | 1,890 | 1,910 | western-europe, north-america |
| Art Deco | 1,920 | 1,940 | north-america, western-europe, global |
| International Style | 1,920 | 1,970 | global |
| Brutalism | 1,950 | 1,980 | global |
| Postmodernism | 1,970 | 2,000 | global |
| Deconstructivism | 1,980 | 2,025 | global |
| Contemporary (merged Sustainable + Parametricism) | 2,000 | 2,025 | global |

---

## Region Centroids (14 regions)

```
'levant'           → { lat: 31.8, lng: 35.2 }    (Jericho)        NEW
'anatolia'         → { lat: 37.2, lng: 38.9 }    (Gobekli Tepe)   NEW
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

---

## Components

### 1. `ArchitectureGlobe.tsx`
Props: `{ currentYear, onRegionClick, onArcHover, zoomedRegion }`

- **Texture:** Terminator shader — blends Blue Marble + Black Marble using SunCalc sun position from TimeThemeProvider
- **Borders:** GeoJSON polygons, clearly visible, amber (night side) / dark (day side)
- **Atmosphere:** Amber (night side) / blue (day side)
- **Auto-rotation:** Follow the action — centers newest arc's target region. Pauses only on slider touch.
- **Arcs:** Filtered by `currentYear`. Era-colored, era-altitude, animated dashes, grow from source ~1s
- **Points:** Region centroids. Appear when first connection arrives. Dot appearance triggers expanding ring shockwave.
- **Point labels:** Region name on hover only
- **Click:** `onPointClick` → close zoom (altitude 0.8), info panel transforms to region card
- **Fly-back:** Click empty globe OR X on region card → smooth 1.5s fly-back to default altitude (~2.5)
- **Drag:** Free 360°, tilt snaps back only during auto-play
- **Start angle:** Facing Europe/Mediterranean
- **Period transitions:** Expanding ring shockwave at origin region, era material color, ~1.5s fade
- **Loading:** Amber wireframe sphere → texture fills in

### 2. `GlobeTimeline.tsx`
Props: `{ currentYear, onChange, isPlaying, onTogglePlay, speed, onSpeedChange }`

- Range: **-12,000 → 2,025**
- **Track:** Era-colored segments (Earth/Hide | Bone/Wood | Stone | Bronze | Copper | Gold | Steel)
- **Labels:** Major era labels only (Prehistoric, Ancient, Classical, Medieval, Renaissance, Modern)
- **Thumb:** Gold circle with floating year label above
- **Play/pause button** (left side)
- **Speed buttons:** 1x / 2x / 4x (next to play/pause)
- **BCE/CE formatting:** -12000 → "12,000 BCE", 1400 → "1,400 CE"
- **Auto-play pacing:** Fast through prehistory (15s for 12,000–3,500 BCE), normal for rest (45s)
- **Auto-play end:** Loops back to -12,000 BCE

### 3. `GlobeInfoPanel.tsx`
Props: `{ currentYear, activeConnections, regionCount, hoveredArc, zoomedRegion, onCloseRegion }`

**Default state (mini stats dashboard):**
- Glass-morphism (8px blur), floating top-right
- Animated counter: connection count + active region count
- No era indicator (timeline handles it)

**Zoomed state (region card):**
- Transforms from stats → region card with smooth animation
- Region name + X close button
- Connection count (inbound ↔ outbound breakdown)
- Active periods at current year
- Iconic buildings from those periods
- X click → animate back to stats + trigger fly-back

**Arc hover state:**
- Arc glows brighter + thickens
- Era-colored tooltip near cursor: source → target period names, year range, regions

### 4. `GlobeLanding.tsx`
Composes everything into the hero section:

- `h-screen` full viewport, `position: sticky` for parallax
- Globe fills ~85% viewport, centered
- Title "Architecture" top-left (mixed case, elegant, site fonts)
- Dynamic subtitle (3 lines):
  - Line 1: `{currentPeriod} · {currentYear} CE/BCE`
  - Line 2: `12,000 BCE – {currentYear} · {duration} Years`
  - Line 3: `From First Shelters to Skyscrapers`
- Info panel top-right
- Timeline pinned to bottom with play/pause + speed controls
- No scroll indicator
- Loading: amber wireframe sphere → texture fill
- Mobile: static image (Puppeteer at build) + pulse hint + tap anywhere to activate 3D
- Mobile touch: standard gestures + long-press for region tooltip

### 5. `SkylineDivider.tsx`
SVG component placed at the boundary between globe section and content below:
- Static silhouette: pyramid → Greek columns → Roman dome → Gothic spire → minaret → modern skyscraper
- Subtle, dark, architectural motif
- Works as a thematic transition from the globe to the content

### 6. `TerminatorShader.ts`
Custom Three.js shader material:
- Loads both Blue Marble and Black Marble textures
- Uniform: `sunDirection` (vec3) calculated from TimeThemeProvider coords + sunAltitude
- Blends textures based on dot product of surface normal and sun direction
- Smooth gradient at terminator line (not hard edge)
- Applied via `globeMaterial()` prop

---

## Immersive Hero Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│ Architecture              ┌──────────────────┐  │
│ Gothic · 1150 CE          │ 47 connections   │  │
│ 3500 BCE – 1150 CE        │ 12 regions       │  │
│ 4,650 Years               └──────────────────┘  │
│ From First Shelters                              │
│ to Skyscrapers       ╭──────────────────╮       │
│                   ╭──│                  │──╮    │
│                 ╭─│  │                  │  │─╮  │
│                 │ │  │  🌍 GLOBE 85%    │  │ │  │
│                 │ │  │  terminator      │  │ │  │
│                 │ │  │  shader          │  │ │  │
│                 ╰─│  │                  │  │─╯  │
│                   ╰──│                  │──╯    │
│                      ╰──────────────────╯       │
│                                                 │
│  ▶ [1x][2x][4x]                                │
│  [Earth|Bone|Stone|Bronze|Copper|Gold|Steel]    │
│  ━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│   12,000    Prehistoric  Ancient  ...    2025    │
└─────────────────────────────────────────────────┘
    ╱╲    ║║  ╭╮  /|\   ◊  ╭╮  ┃┃         ← skyline divider SVG
───╱──╲───║║──╰╯─/─|─\──◊──╰╯──┃┃─────────
┌─────────────────────────────────────────────────┐
│  Content below (articles, periods, etc.)        │
│  Scrolls OVER the fixed globe (parallax)        │
└─────────────────────────────────────────────────┘
```

---

## Auto-play Sequence (60 seconds, loops)

| Time | Year Range | Speed | What Happens |
|------|-----------|-------|--------------|
| 0s | -12,000 | — | Globe fades in from wireframe. Empty Earth with borders. 1-2s pause. |
| 1–2s | -12,000 | — | Pause. User sees beautiful empty globe. |
| 2–4s | -12,000 → -9,500 | fast | First dot (Levant) appears with shockwave. Natufian arcs grow. Earth/hide tier. |
| 4–8s | -9,500 → -6,000 | fast | Anatolia lights up (Gobekli Tepe). PPNA/PPNB bone/wood arcs. Globe rotates to follow. |
| 8–12s | -6,000 → -3,500 | fast | Megalithic arcs reach W. Europe. South Asia dot appears (Mehrgarh). |
| 12–17s | -3,500 → -500 | moderate | Mesopotamian + Egyptian stone arcs. Mediterranean lights up (Greek). |
| 17–27s | -500 → 500 | normal | Classical era. Bronze arcs. Roman connections spread across Mediterranean + W. Europe. |
| 27–37s | 500 → 1,400 | normal | Medieval. Copper arcs. Byzantine, Islamic, Gothic web Europe/Middle East. |
| 37–47s | 1,400 → 1,800 | normal | Renaissance → Colonial. Gold arcs reach Americas. |
| 47–57s | 1,800 → 2,025 | normal | Modern. Steel arcs soar high. Every continent connected. |
| 57–60s | 2,025 → loop | — | Brief pause at full web, then resets to -12,000 and repeats. |

---

## Keyboard & Accessibility

| Key | Action |
|-----|--------|
| ← / → | Timeline ±100 years |
| ↑ / ↓ | Zoom in / out |
| Tab | Cycle through region dots |
| Enter | Zoom into focused dot |
| Escape | Fly back / exit zoom |
| Space | Play / pause auto-play |
| 1 / 2 / 4 | Set speed 1x / 2x / 4x |

All interactive elements have ARIA labels. Globe has `role="application"` with descriptive `aria-label`.

---

## Mobile Strategy

- **Detection:** `window.innerWidth < 768`
- **Static hero:** Puppeteer headless render at build time (globe at ~1500 CE with arcs)
- **Pulse hint:** Subtle pulsing ring on globe center, no explicit button
- **Activation:** Tap anywhere on globe image → lazy-load react-globe.gl, replace static
- **Touch gestures:** Single drag = rotate, pinch = zoom, tap dot = zoom in, long-press = region tooltip
- **Timeline:** Still functional on mobile

---

## File Structure

```
components/architecture/globe/
  GlobeLanding.tsx          — full hero section compositor
  ArchitectureGlobe.tsx     — 3D globe + arcs + points + borders
  GlobeTimeline.tsx         — timeline slider with play/pause + speed
  GlobeInfoPanel.tsx        — floating info/stats/region panel
  SkylineDivider.tsx        — SVG skyline silhouette border
  TerminatorShader.ts       — custom Three.js day/night shader

data/architecture/
  globeConnections.ts       — region centroids + arc derivation + era helpers
  prehistoricPeriods.ts     — 6 new prehistoric period entries (added to periods.ts)

public/globe/
  earth-night.jpg           — NASA Black Marble 4K texture
  earth-day.jpg             — NASA Blue Marble 4K texture
  countries.geojson         — Standard ~100KB countries GeoJSON
  globe-static.jpg          — Puppeteer-generated mobile fallback

scripts/
  generate-globe-static.ts  — Puppeteer build script for mobile screenshot
```

---

## Implementation Steps

1. `npm install react-globe.gl three @types/three`
2. Add 6 prehistoric periods to `data/architecture/periods.ts` + influence chains
3. Merge Sustainable + Parametricism into Contemporary
4. Download 4K globe textures + GeoJSON to `public/globe/`
5. Create `data/architecture/globeConnections.ts` — 14 region centroids + arc generation + 7 era tier helpers
6. Create `TerminatorShader.ts` — custom day/night shader using SunCalc data
7. Create `ArchitectureGlobe.tsx` — globe, terminator shader, arcs, points, shockwaves, zoom, fly-back, keyboard
8. Create `GlobeTimeline.tsx` — era-colored segments, play/pause, speed control, BCE/CE, variable pacing
9. Create `GlobeInfoPanel.tsx` — stats dashboard ↔ region card transitions, arc hover tooltip
10. Create `SkylineDivider.tsx` — static SVG skyline silhouette
11. Create `GlobeLanding.tsx` — compose hero, parallax sticky, subtitle, mobile fallback, wireframe loader
12. Wire into `app/architecture/page.tsx` — replace empty hero section
13. Create `scripts/generate-globe-static.ts` — Puppeteer mobile screenshot
14. Polish: ARIA labels, keyboard nav, loading transitions, auto-play timing
15. Test: desktop, mobile, theme transitions, performance

---

## Status: READY TO BUILD
