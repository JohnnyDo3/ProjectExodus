# Globe Timeline Sections & Detailed Locations Plan

## Overview
Enhance the architecture globe with clickable period markers on the timeline, sub-region/iconic building locations, and auto-zoom-to-fit when a period is selected.

---

## 1. Add Sub-Regions & Iconic Building Locations

**File: `data/architecture/globeConnections.ts`**

- Expand `REGION_CENTROIDS` with ~30-40 sub-region entries for specific cities/sites:
  - `'levant-jericho': { lat: 31.87, lng: 35.44, name: 'Jericho' }`
  - `'mediterranean-athens': { lat: 37.97, lng: 23.72, name: 'Athens' }`
  - `'mediterranean-rome': { lat: 41.9, lng: 12.5, name: 'Rome' }`
  - `'western-europe-paris': { lat: 48.86, lng: 2.35, name: 'Paris' }`
  - `'east-asia-beijing': { lat: 39.9, lng: 116.4, name: 'Beijing' }`
  - etc.
- Keep existing broad region centroids (arc generation still uses `primaryRegions`)
- Add a new `BuildingPoint` interface and `getBuildingPointsForPeriod(periodId)` / `getBuildingPointsForYear(year)` helpers
- Add `getRegionBoundsForPeriod(periodId)` helper that collects all lat/lng from the period's regions + buildings and returns bounding box + computed camera altitude

**File: `data/architecture/periods.ts`**

- Add `lat`/`lng` coordinates to each `iconicBuildings` entry (currently has `name`, `location`, `year`)
- This gives us ~150+ precise pin locations for iconic buildings across all periods

---

## 2. Period Selection State & Filtered Data

**File: `components/architecture/globe/GlobeLanding.tsx`**

- Add state: `selectedPeriod: PeriodDefinition | null`
- When a period is selected:
  - Filter arcs to show ONLY that period's connections (not cumulative)
  - Compute bounding box of all involved regions + iconic buildings
  - Pass filtered data + building points to ArchitectureGlobe
- When deselected (click again or "Show All"), revert to cumulative arc view at slider year
- Pass `selectedPeriod` + callbacks to both ArchitectureGlobe and GlobeTimeline

---

## 3. Globe Zoom-to-Fit Logic

**File: `components/architecture/globe/ArchitectureGlobe.tsx`**

- New props: `selectedPeriod`, `buildingPoints`
- When `selectedPeriod` changes:
  - Animate `pointOfView()` to fit all related regions (center lat/lng + altitude calculated from geographic span)
  - Use `globe.pointOfView({ lat, lng, altitude }, 1500)` for smooth 1.5s transition
  - Show building points as a secondary points layer (smaller golden dots with name labels)
- When deselected, animate back to density center or previous position

---

## 4. Holographic Period Markers on Timeline

**File: `components/architecture/globe/GlobeTimeline.tsx`**

- New props: `onPeriodSelect(period | null)`, `selectedPeriod`
- Render period markers ABOVE the slider track at each period's `startYear` position:
  - Small diamond/dot shapes colored by era
  - On hover: expand to holographic tooltip showing period name + icon
  - On click: select that period
  - Selected: glows brighter, name stays visible, thin vertical line connects to track
- Clustering: periods too close together show a grouped marker, expand on hover
- Holographic style:
  - Semi-transparent `backdrop-blur` background
  - Golden border glow (`rgba(212,165,74,...)`)
  - Subtle CSS scan-line gradient overlay
  - Gentle floating animation (translateY oscillation)

**New file: `components/architecture/globe/PeriodMarker.tsx`**

- Individual holographic marker component with hover/select states
- Shows: icon, shortName, year range
- Connected to timeline track via thin golden vertical line

---

## 5. Period Detail Panel (when selected)

**New file: `components/architecture/globe/PeriodDetailPanel.tsx`**

- Compact holographic info panel in top-left (replaces simple title when period selected)
- Contents:
  - Period name, icon, year range
  - Key characteristics (2-3 bullets)
  - Regions involved (with sub-region names)
  - "Influenced by" / "Influenced" links (clickable → navigates to those periods)
  - Iconic buildings list (clickable → zooms globe to that building)
- Close/deselect button
- Holographic styling matching the markers

---

## 6. File Changes Summary

| File | Action |
|------|--------|
| `data/architecture/periods.ts` | Add lat/lng to iconicBuildings entries |
| `data/architecture/globeConnections.ts` | Add sub-regions, building point helpers, bounds calculation |
| `components/architecture/globe/GlobeLanding.tsx` | Add selectedPeriod state, filtered data logic |
| `components/architecture/globe/ArchitectureGlobe.tsx` | Camera fit logic, building points layer, selectedPeriod prop |
| `components/architecture/globe/GlobeTimeline.tsx` | Period markers above slider, selection callbacks |
| `components/architecture/globe/PeriodMarker.tsx` | **NEW** - Holographic marker component |
| `components/architecture/globe/PeriodDetailPanel.tsx` | **NEW** - Period detail overlay |
| `components/architecture/globe/MobileGlobeFallback.tsx` | Update for period selection + building points |

---

## 7. Implementation Order

1. **Data layer** — Add coords to iconicBuildings, add sub-regions + helpers to globeConnections
2. **Globe zoom** — Implement fitBounds and camera animation in ArchitectureGlobe
3. **Period selection** — State management in GlobeLanding, filtered arcs/points
4. **Timeline markers** — PeriodMarker component, integrate into GlobeTimeline
5. **Detail panel** — PeriodDetailPanel component, integrate into GlobeLanding
6. **Mobile fallback** — Update MobileGlobeFallback for period selection
7. **Polish** — Transitions, holographic effects, clustering, edge cases
