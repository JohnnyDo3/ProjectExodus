import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getPronunciation, PHONETICS } from '@/hooks/useTextToSpeech'

// Note: useTextToSpeech hook relies on browser SpeechSynthesis API
// which is not available in jsdom. We test the utility functions
// and phonetics data instead.

describe('Phonetics', () => {
  describe('PHONETICS constant', () => {
    it('contains bracing pronunciations', () => {
      expect(PHONETICS['diagonal-bracing']).toBe('die-AG-uh-nul BRAY-sing')
      expect(PHONETICS['x-bracing']).toBe('ex BRAY-sing')
      expect(PHONETICS['k-bracing']).toBe('kay BRAY-sing')
      expect(PHONETICS['v-bracing']).toBe('vee BRAY-sing')
      expect(PHONETICS['chevron-bracing']).toBe('SHEV-ron BRAY-sing')
      expect(PHONETICS['eccentric-bracing']).toBe('ek-SEN-trik BRAY-sing')
      expect(PHONETICS['knee-bracing']).toBe('nee BRAY-sing')
      expect(PHONETICS['zipper-bracing']).toBe('ZIP-er BRAY-sing')
      expect(PHONETICS['mega-bracing']).toBe('MEG-uh BRAY-sing')
      expect(PHONETICS['outrigger']).toBe('OUT-rig-er')
    })

    it('contains truss pronunciations', () => {
      expect(PHONETICS['king-post']).toBe('king pohst')
      expect(PHONETICS['queen-post']).toBe('kween pohst')
      expect(PHONETICS['howe-truss']).toBe('how truss')
      expect(PHONETICS['pratt-truss']).toBe('prat truss')
      expect(PHONETICS['warren-truss']).toBe('WAR-en truss')
      expect(PHONETICS['fink-truss']).toBe('fink truss')
      expect(PHONETICS['gambrel']).toBe('GAM-brel')
      expect(PHONETICS['scissor-truss']).toBe('SIZ-er truss')
      expect(PHONETICS['bowstring-truss']).toBe('BOH-string truss')
      expect(PHONETICS['vierendeel']).toBe('VEER-en-deel')
      expect(PHONETICS['lattice-truss']).toBe('LAT-iss truss')
      expect(PHONETICS['space-frame']).toBe('spays fraym')
    })

    it('contains foundation pronunciations', () => {
      expect(PHONETICS['spread-footing']).toBe('spred FOOT-ing')
      expect(PHONETICS['mat-foundation']).toBe('mat foun-DAY-shun')
      expect(PHONETICS['pile-foundation']).toBe('pyle foun-DAY-shun')
      expect(PHONETICS['drilled-shaft']).toBe('drild shaft')
      expect(PHONETICS['caisson']).toBe('KAY-son')
      expect(PHONETICS['strip-footing']).toBe('strip FOOT-ing')
      expect(PHONETICS['raft-foundation']).toBe('raft foun-DAY-shun')
      expect(PHONETICS['micropile']).toBe('MY-kro-pyle')
      expect(PHONETICS['helical-pile']).toBe('HEL-ih-kul pyle')
      expect(PHONETICS['pier-foundation']).toBe('peer foun-DAY-shun')
      expect(PHONETICS['combined-footing']).toBe('kom-BYND FOOT-ing')
    })

    it('contains load type pronunciations', () => {
      expect(PHONETICS['dead-load']).toBe('ded lohd')
      expect(PHONETICS['live-load']).toBe('lyv lohd')
      expect(PHONETICS['wind-load']).toBe('wind lohd')
      expect(PHONETICS['seismic-load']).toBe('SYZ-mik lohd')
      expect(PHONETICS['snow-load']).toBe('snoh lohd')
      expect(PHONETICS['impact-load']).toBe('IM-pakt lohd')
      expect(PHONETICS['thermal-load']).toBe('THER-mul lohd')
      expect(PHONETICS['hydrostatic']).toBe('HY-droh-STAT-ik')
      expect(PHONETICS['soil-pressure']).toBe('soyl PRESH-er')
      expect(PHONETICS['dynamic-load']).toBe('dy-NAM-ik lohd')
      expect(PHONETICS['fatigue-load']).toBe('fuh-TEEG lohd')
    })

    it('has consistent phonetic format', () => {
      // All phonetics should be strings
      Object.values(PHONETICS).forEach(phonetic => {
        expect(typeof phonetic).toBe('string')
        expect(phonetic.length).toBeGreaterThan(0)
      })
    })

    it('covers all structural element categories', () => {
      const categories = {
        bracing: ['diagonal-bracing', 'x-bracing', 'chevron-bracing'],
        trusses: ['king-post', 'warren-truss', 'vierendeel'],
        foundations: ['caisson', 'micropile', 'mat-foundation'],
        loads: ['seismic-load', 'dead-load', 'live-load']
      }

      Object.entries(categories).forEach(([category, terms]) => {
        terms.forEach(term => {
          expect(PHONETICS[term]).toBeDefined()
        })
      })
    })
  })

  describe('getPronunciation', () => {
    it('returns pronunciation for known bracing term', () => {
      expect(getPronunciation('diagonal-bracing')).toBe('die-AG-uh-nul BRAY-sing')
      expect(getPronunciation('x-bracing')).toBe('ex BRAY-sing')
    })

    it('returns pronunciation for known truss term', () => {
      expect(getPronunciation('king-post')).toBe('king pohst')
      expect(getPronunciation('warren-truss')).toBe('WAR-en truss')
      expect(getPronunciation('vierendeel')).toBe('VEER-en-deel')
    })

    it('returns pronunciation for known foundation term', () => {
      expect(getPronunciation('caisson')).toBe('KAY-son')
      expect(getPronunciation('micropile')).toBe('MY-kro-pyle')
    })

    it('returns pronunciation for known load term', () => {
      expect(getPronunciation('seismic-load')).toBe('SYZ-mik lohd')
      expect(getPronunciation('hydrostatic')).toBe('HY-droh-STAT-ik')
    })

    it('returns undefined for unknown term', () => {
      expect(getPronunciation('unknown-term')).toBeUndefined()
      expect(getPronunciation('')).toBeUndefined()
      expect(getPronunciation('nonexistent')).toBeUndefined()
    })

    it('is case-sensitive', () => {
      expect(getPronunciation('King-Post')).toBeUndefined()
      expect(getPronunciation('KING-POST')).toBeUndefined()
      expect(getPronunciation('King-post')).toBeUndefined()
    })

    it('requires exact hyphenated format', () => {
      // The function expects exact key matches
      expect(getPronunciation('king post')).toBeUndefined() // space instead of hyphen
      expect(getPronunciation('kingpost')).toBeUndefined() // no separator
      expect(getPronunciation('king-post')).toBe('king pohst') // correct format
    })
  })
})

describe('PHONETICS data integrity', () => {
  it('has expected number of entries', () => {
    const entryCount = Object.keys(PHONETICS).length
    // Should have entries for bracing (10), trusses (12), foundations (11), loads (11)
    expect(entryCount).toBeGreaterThanOrEqual(40)
  })

  it('all keys are lowercase with hyphens', () => {
    Object.keys(PHONETICS).forEach(key => {
      expect(key).toBe(key.toLowerCase())
      expect(key).not.toContain(' ')
      // Most keys contain hyphens (except single words like 'outrigger')
    })
  })

  it('all values are non-empty strings', () => {
    Object.values(PHONETICS).forEach(value => {
      expect(typeof value).toBe('string')
      expect(value.trim().length).toBeGreaterThan(0)
    })
  })

  it('phonetic values use consistent syllable markers', () => {
    // Check for consistent use of capitalization for stressed syllables
    const stressedPattern = /[A-Z]{2,}/
    const hasStressMarkers = Object.values(PHONETICS).filter(p => stressedPattern.test(p))

    // Most multi-syllable words should have stress markers
    expect(hasStressMarkers.length).toBeGreaterThan(20)
  })
})
