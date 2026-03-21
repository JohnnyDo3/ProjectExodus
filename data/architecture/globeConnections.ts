// Globe Connections - Derives arc data from architectural periods for the 3D globe visualization
// Maps region IDs to lat/lng centroids, generates influence arcs, and provides era-based styling

import { ARCHITECTURAL_PERIODS, type PeriodDefinition } from './periods'

// =============================================================================
// REGION CENTROIDS (14 regions)
// =============================================================================

export interface RegionCentroid {
  lat: number
  lng: number
  name: string
}

export const REGION_CENTROIDS: Record<string, RegionCentroid> = {
  // Prehistoric regions
  'levant':         { lat: 31.8, lng: 35.2, name: 'Levant' },
  'anatolia':       { lat: 37.2, lng: 38.9, name: 'Anatolia' },
  // Major regions
  'north-africa':   { lat: 31.0, lng: 2.0, name: 'North Africa' },
  'middle-east':    { lat: 33.3, lng: 44.4, name: 'Middle East' },
  'mediterranean':  { lat: 41.9, lng: 12.5, name: 'Mediterranean' },
  'western-europe': { lat: 48.8, lng: 2.3, name: 'Western Europe' },
  'eastern-europe': { lat: 55.7, lng: 37.6, name: 'Eastern Europe' },
  'east-asia':      { lat: 35.7, lng: 104.1, name: 'East Asia' },
  'south-asia':     { lat: 20.6, lng: 78.9, name: 'South Asia' },
  'southeast-asia': { lat: 13.7, lng: 100.5, name: 'Southeast Asia' },
  'east-africa':    { lat: 9.0, lng: 38.7, name: 'East Africa' },
  'iberia':         { lat: 40.4, lng: -3.7, name: 'Iberia' },
  'north-america':  { lat: 40.7, lng: -74.0, name: 'North America' },
  'south-america':  { lat: -23.5, lng: -46.6, name: 'South America' },
  // New regions
  'central-asia':   { lat: 39.6, lng: 66.9, name: 'Central Asia' },        // Samarkand area
  'korea':          { lat: 37.6, lng: 127.0, name: 'Korea' },
  'japan':          { lat: 35.0, lng: 135.8, name: 'Japan' },               // Kyoto area
  'west-africa':    { lat: 12.0, lng: -1.5, name: 'West Africa' },          // Sahel/Timbuktu
  'southern-africa':{ lat: -20.3, lng: 30.9, name: 'Southern Africa' },     // Great Zimbabwe
  'scandinavia':    { lat: 59.9, lng: 10.7, name: 'Scandinavia' },          // Oslo area
  'oceania':        { lat: -17.7, lng: -149.4, name: 'Oceania' },           // Polynesia
  'mesoamerica':    { lat: 19.4, lng: -99.1, name: 'Mesoamerica' },         // Mexico City area
  'sw-north-america': { lat: 36.0, lng: -108.7, name: 'SW North America' }, // Pueblo region
}

// =============================================================================
// MATERIAL ERA TIERS (7 tiers)
// =============================================================================

export interface EraTier {
  name: string
  material: string
  color: string
  minYear: number
  maxYear: number
  altitude: number
}

export const ERA_TIERS: EraTier[] = [
  { name: 'Early Prehistoric', material: 'Earth/Hide', color: '#6B4423', minYear: -12000, maxYear: -6000, altitude: 0.05 },
  { name: 'Late Prehistoric',  material: 'Bone/Wood',  color: '#8B7355', minYear: -6000,  maxYear: -3500, altitude: 0.08 },
  { name: 'Ancient',           material: 'Stone',      color: '#C4A882', minYear: -3500,  maxYear: -500,  altitude: 0.12 },
  { name: 'Classical',         material: 'Bronze',     color: '#CD7F32', minYear: -500,   maxYear: 500,   altitude: 0.2 },
  { name: 'Medieval',          material: 'Copper',     color: '#4A9E8E', minYear: 500,    maxYear: 1400,  altitude: 0.35 },
  { name: 'Renaissance',       material: 'Gold',       color: '#D4A54A', minYear: 1400,   maxYear: 1800,  altitude: 0.5 },
  { name: 'Modern',            material: 'Steel',      color: '#B8C4D0', minYear: 1800,   maxYear: 2025,  altitude: 0.7 },
]

export function getEraTier(year: number): EraTier {
  for (let i = ERA_TIERS.length - 1; i >= 0; i--) {
    if (year >= ERA_TIERS[i].minYear) return ERA_TIERS[i]
  }
  return ERA_TIERS[0]
}

export function getEraColor(year: number): string {
  return getEraTier(year).color
}

export function getEraAltitude(year: number): number {
  return getEraTier(year).altitude
}

// =============================================================================
// ARC DATA GENERATION
// =============================================================================

export interface GlobeArc {
  id: string
  fromLat: number
  fromLng: number
  toLat: number
  toLng: number
  startYear: number
  eraColor: string
  eraAltitude: number
  eraMaterial: string
  sourcePeriodId: string
  sourcePeriodName: string
  targetPeriodId: string
  targetPeriodName: string
  sourceRegion: string
  targetRegion: string
}

function getPeriodMap(): Map<string, PeriodDefinition> {
  const map = new Map<string, PeriodDefinition>()
  for (const period of ARCHITECTURAL_PERIODS) {
    map.set(period.id, period)
  }
  return map
}

export function generateAllArcs(): GlobeArc[] {
  const periodMap = getPeriodMap()
  const arcs: GlobeArc[] = []
  const seen = new Set<string>()

  for (const period of ARCHITECTURAL_PERIODS) {
    for (const sourceId of period.influencedBy) {
      const sourcePeriod = periodMap.get(sourceId)
      if (!sourcePeriod) continue

      for (const sourceRegion of sourcePeriod.primaryRegions) {
        if (sourceRegion === 'global') continue
        const fromCentroid = REGION_CENTROIDS[sourceRegion]
        if (!fromCentroid) continue

        for (const targetRegion of period.primaryRegions) {
          if (targetRegion === 'global') continue
          if (sourceRegion === targetRegion) continue
          const toCentroid = REGION_CENTROIDS[targetRegion]
          if (!toCentroid) continue

          // Deduplicate: same region pair + same start year
          const key = `${sourceRegion}-${targetRegion}-${period.startYear}`
          if (seen.has(key)) continue
          seen.add(key)

          const tier = getEraTier(period.startYear)

          arcs.push({
            id: `${sourcePeriod.id}-${period.id}-${sourceRegion}-${targetRegion}`,
            fromLat: fromCentroid.lat,
            fromLng: fromCentroid.lng,
            toLat: toCentroid.lat,
            toLng: toCentroid.lng,
            startYear: period.startYear,
            eraColor: tier.color,
            eraAltitude: tier.altitude,
            eraMaterial: tier.material,
            sourcePeriodId: sourcePeriod.id,
            sourcePeriodName: sourcePeriod.name,
            targetPeriodId: period.id,
            targetPeriodName: period.name,
            sourceRegion,
            targetRegion,
          })
        }
      }
    }
  }

  return arcs.sort((a, b) => a.startYear - b.startYear)
}

// Pre-generate all arcs for performance
export const ALL_ARCS = generateAllArcs()

// =============================================================================
// HELPERS
// =============================================================================

export function getArcsForYear(year: number): GlobeArc[] {
  return ALL_ARCS.filter(arc => arc.startYear <= year)
}

export function getActiveRegionsForYear(year: number): Set<string> {
  const regions = new Set<string>()
  const arcs = getArcsForYear(year)
  for (const arc of arcs) {
    regions.add(arc.sourceRegion)
    regions.add(arc.targetRegion)
  }
  return regions
}

export function getActivePeriodsForYear(year: number): PeriodDefinition[] {
  return ARCHITECTURAL_PERIODS.filter(p =>
    p.startYear <= year && p.endYear >= year
  )
}

export function getCurrentPeriodForYear(year: number): PeriodDefinition | undefined {
  const active = getActivePeriodsForYear(year)
  if (active.length === 0) {
    // Return the most recent period that has started
    const started = ARCHITECTURAL_PERIODS.filter(p => p.startYear <= year)
    return started[started.length - 1]
  }
  // Return the one that started most recently
  return active.reduce((latest, p) =>
    p.startYear > latest.startYear ? p : latest
  )
}

export function formatYear(year: number): string {
  if (year < 0) {
    return `${Math.abs(year).toLocaleString()} BCE`
  }
  return `${year.toLocaleString()} CE`
}

export function getYearDuration(fromYear: number, toYear: number): string {
  const duration = Math.abs(toYear - fromYear)
  return duration.toLocaleString()
}

// Get all unique region points that have at least one connection at the given year
export interface GlobePoint {
  lat: number
  lng: number
  region: string
  name: string
  connectionCount: number
}

/**
 * Returns the weighted centroid of all active arcs for a given year.
 * Weights each region by its connection count so the camera centers
 * on the most architecturally dense area.
 */
export function getDensityCenterForYear(year: number): { lat: number; lng: number } | null {
  const points = getPointsForYear(year)
  if (points.length === 0) return null

  let totalWeight = 0
  let wLat = 0
  let wLng = 0

  for (const p of points) {
    const w = p.connectionCount
    wLat += p.lat * w
    wLng += p.lng * w
    totalWeight += w
  }

  return { lat: wLat / totalWeight, lng: wLng / totalWeight }
}

export function getPointsForYear(year: number): GlobePoint[] {
  const arcs = getArcsForYear(year)
  const regionCounts = new Map<string, number>()

  for (const arc of arcs) {
    regionCounts.set(arc.sourceRegion, (regionCounts.get(arc.sourceRegion) || 0) + 1)
    regionCounts.set(arc.targetRegion, (regionCounts.get(arc.targetRegion) || 0) + 1)
  }

  const points: GlobePoint[] = []
  for (const [region, count] of regionCounts) {
    const centroid = REGION_CENTROIDS[region]
    if (centroid) {
      points.push({
        lat: centroid.lat,
        lng: centroid.lng,
        region,
        name: centroid.name,
        connectionCount: count,
      })
    }
  }

  return points
}
