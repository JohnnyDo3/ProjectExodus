# Plan: Simplify Architecture Globe — Instant Load + Loading Screen

## Current State
- **55-second cinematic intro**: 8s shard build → 3.5s earth reveal → 1.5s crossfade → 1.5s pause → 42s timeline sweep
- 4 animation phases managed across GlobeLanding, ArchitectureGlobe, and useShardBuildMaterial
- Globe starts at year -3500 and sweeps to 2025 over 42 seconds
- Timeline slider locked until sweep finishes

## Goal
Replace the entire animation sequence with:
1. A 2-second branded loading overlay (while globe textures load)
2. Globe appears instantly with earth texture, all arcs (year = 2025), auto-rotating
3. Explanatory text near the stats section describing what the globe/connections represent
4. Timeline slider immediately interactive so users can explore history

---

## Changes

### 1. `GlobeLanding.tsx` — Gut the phase state machine
- Remove `introPhase` state and all phase transition callbacks (`onBuildComplete`, `onRevealComplete`, pause timer, sweep rAF loop)
- Remove `SWEEP_DURATION`, `SWEEP_START_YEAR`, `SWEEP_END_YEAR`, `PAUSE_DURATION` constants
- Add a simple `isReady` boolean state (default false)
- Start `currentYear` at **2025** (present day, all arcs visible)
- Add a 2-second loading overlay:
  - Dark bg, centered "ARCHITECTURE" title in golden tones, subtle pulsing spinner
  - After globe textures load OR 2s timer (whichever is later), fade out the overlay
- Pass NO `introPhase` to ArchitectureGlobe — globe renders in idle mode immediately
- Timeline slider visible and interactive from the start (no slide-up animation delay)
- Add small descriptive text block below the timeline or near the stats section

### 2. `ArchitectureGlobe.tsx` — Remove all phase-dependent logic
- Remove `introPhase` and `onBuildComplete`/`onRevealComplete` props
- Remove phase-dependent camera altitude lerping (just use idle altitude: 2.2)
- Remove phase-dependent rotation speed logic (just use idle speed)
- Remove shard build material usage entirely — always use `useThemeGlobeMaterial`
- Remove polygon border opacity ramping (just use final value: 0.6)
- Simplify to: load globe → apply theme material → render arcs/points for currentYear → auto-rotate
- Fire an `onReady` callback once the globe ref is available (signals textures loaded)

### 3. `useShardBuildMaterial.ts` — Delete entirely
- No longer needed — the cinematic shard/reveal/crossfade shader is removed
- This removes ~300 lines of GLSL shader code

### 4. `GlobeTimeline.tsx` — Minor cleanup
- Remove the `introPhase` conditional that disables pointer events during sweep
- Timeline is always interactive
- No other changes needed (era styling, slider UI stays the same)

### 5. `app/architecture/page.tsx` — Add globe explanation text
- Add a small text section near the existing stats/hero area explaining:
  - "The globe shows the flow of architectural knowledge across civilizations..."
  - "Each arc represents influence between regions. Adjust the timeline to explore how building techniques spread through history."
- Keep it concise — 2-3 sentences max

### 6. Files touched summary
| File | Action |
|------|--------|
| `components/architecture/globe/GlobeLanding.tsx` | Major rewrite — loading overlay, remove phases |
| `components/architecture/globe/ArchitectureGlobe.tsx` | Simplify — remove phases, always idle mode |
| `components/architecture/globe/useShardBuildMaterial.ts` | **Delete** |
| `components/architecture/globe/GlobeTimeline.tsx` | Minor — remove introPhase guard |
| `app/architecture/page.tsx` | Add explanatory text section |

### What stays the same
- `useThemeGlobeMaterial.ts` — unchanged, still handles day/night texture
- `MobileGlobeFallback.tsx` — unchanged, still handles weak GPU/mobile
- `globeConnections.ts` — unchanged, arc/point data untouched
- All arc rendering, era colors, region centroids, timeline slider styling
- Auto-rotation behavior in idle mode
