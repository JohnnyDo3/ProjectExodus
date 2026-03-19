# Globe Rebuild Plan

## Vision
Blank space → shards appear one-by-one forming the globe (starting near first connection region) → once built, first arcs appear → globe rotates at real Earth's 24h rate → user can drag freely, snaps back in 1-2s → timeline slider controls which arcs/connections are visible by year.

---

## Phase 1: Strip Down

### Remove completely:
- `GlobeInfoPanel.tsx` — stats panel, region cards, tooltips gone
- Play/pause/speed controls from GlobeLanding
- Region camera cycling system
- Logarithmic time pacing / animation frame playback
- Keyboard scrubbing (Space, arrows, +/-)
- Era-based material switching logic

### Keep as-is:
- `useTerminatorMaterial.ts` — real sun position day/night shader
- `globeConnections.ts` — arc data, region centroids, era tiers
- `MobileGlobeFallback.tsx` — mobile SVG fallback
- `countries.geojson` — country borders
- Earth textures (blue marble, night lights)

---

## Phase 2: Shard Build Animation

### Rework `usePrehistoryMaterial.ts` → `useShardBuildMaterial.ts`
- **Purpose**: Intro-only animation (not tied to timeline)
- **Behavior**:
  - Globe starts invisible (alpha 0)
  - Voronoi shards appear one by one over ~8-10 seconds
  - Shards nearest the first connection's region appear FIRST
  - Shards radiate outward from that region
  - Each shard fades in with a subtle glow edge effect
  - Once all shards filled → transition to terminator material
- **Uniforms**: `progress` (0→1 driven by time), `seedPoint` (first connection region UV), `time` (for glow pulse)
- No dependency on timeline year — purely an entrance animation

---

## Phase 3: Real-Time Earth Rotation

### In rebuilt `ArchitectureGlobe.tsx`:
- **Rotation rate**: 360° / 86400s = 0.00417°/s (Earth's actual sidereal rate)
- **Starting position**: Globe faces the first connection's region after build completes
- **Implementation**:
  - Track a `baseRotation` from real UTC time
  - On each frame: `globe.rotation.y = baseRotation + (Date.now() / 86400000) * 2π`
  - This means the globe's orientation always reflects real Earth time

### User Interaction + Snap-back:
- On pointer down: pause real rotation, let user drag freely
- On pointer up: record `userOffset` (difference between current rotation and real-time rotation)
- Animate `userOffset → 0` over 1-2 seconds using ease-out
- During snap-back: `rotation = realTimeRotation + userOffset * (1 - t)`
- Result: globe smoothly returns to real-time position

---

## Phase 4: Timeline-Controlled Arcs

### Simplified `GlobeLanding.tsx`:
- State: just `timelineYear` (number)
- Default: year of first arc in data (earliest `startYear` from globeConnections)
- Pass `timelineYear` to ArchitectureGlobe
- No play/pause, no speed controls, no animation loop

### Simplified `GlobeTimeline.tsx`:
- Range slider: min = first arc year, max = 2025
- Displays current year and era name
- Era-colored gradient background (keep this — it's useful context)
- No play/pause buttons, no speed buttons

### In `ArchitectureGlobe.tsx`:
- `getArcsForYear(timelineYear)` → render these arcs
- `getPointsForYear(timelineYear)` → render these points
- Arcs appear with a brief grow animation when timeline changes
- Points pulse briefly when they first appear

---

## Phase 5: Sequence of Events (User Experience)

1. Page loads → blank dark space
2. ~0.5s pause → first shard appears near Levant region (first connection)
3. Shards radiate outward, filling globe over ~8 seconds
4. Shard material crossfades to day/night terminator material (~1s)
5. First arcs appear (for the default timeline year), centered on screen
6. Globe begins real-time rotation (matching Earth)
7. User can drag globe freely, it snaps back in 1-2s
8. User slides timeline → arcs update to show that era's connections

---

## File Changes Summary

| File | Action |
|------|--------|
| `ArchitectureGlobe.tsx` | **Rewrite** — shard intro, real rotation, snap-back, timeline arcs |
| `GlobeLanding.tsx` | **Rewrite** — minimal orchestrator, just timeline year state |
| `GlobeTimeline.tsx` | **Simplify** — slider only, no play/pause/speed |
| `usePrehistoryMaterial.ts` | **Rework** → `useShardBuildMaterial.ts` — intro-only shard effect |
| `useTerminatorMaterial.ts` | **Keep** — untouched |
| `globeConnections.ts` | **Keep** — untouched |
| `MobileGlobeFallback.tsx` | **Keep** — untouched |
| `GlobeInfoPanel.tsx` | **Delete** |
| `app/architecture/page.tsx` | **Minor update** — remove GlobeInfoPanel import if present |
