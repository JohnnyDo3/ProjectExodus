import { describe, it, expect } from 'vitest'
import {
  getRandomElements,
  getRandomWrongOptions,
  ALL_ELEMENTS,
  getElementById,
} from '@/data/architecture/elements'

describe('Element Randomization', () => {
  describe('getRandomElements', () => {
    it('returns the requested number of elements', () => {
      const elements = getRandomElements(10)
      expect(elements.length).toBe(10)
    })

    it('excludes specified element IDs', () => {
      const exclude = ['keystone', 'pointed-arch', 'dome']
      const elements = getRandomElements(20, exclude)

      const ids = elements.map(e => e.id)
      exclude.forEach(id => {
        expect(ids).not.toContain(id)
      })
    })

    it('distributes elements across multiple categories when balanceByCategory is true', () => {
      const elements = getRandomElements(24, [], true)
      const categories = new Set(elements.map(e => e.category))

      // With 24 elements and ~24 categories, we should see many different categories
      expect(categories.size).toBeGreaterThanOrEqual(15)
    })

    it('can return pure random selection when balanceByCategory is false', () => {
      // With pure random, there's more variance, so we just verify it returns elements
      const elements = getRandomElements(10, [], false)
      expect(elements.length).toBe(10)
    })

    it('handles edge case when count exceeds available elements', () => {
      // Request more than available (should return all available)
      const allExceptOne = ALL_ELEMENTS.slice(1).map(e => e.id)
      const elements = getRandomElements(100, allExceptOne)

      expect(elements.length).toBe(1) // Only one element available
    })

    it('returns empty array when no elements available', () => {
      const allIds = ALL_ELEMENTS.map(e => e.id)
      const elements = getRandomElements(10, allIds)

      expect(elements.length).toBe(0)
    })

    it('ensures good category variety for game sessions', () => {
      // Simulate typical game - 10 elements for a session
      const elements = getRandomElements(10)
      const categories = new Set(elements.map(e => e.category))

      // Should have at least 7 different categories out of 10 elements
      expect(categories.size).toBeGreaterThanOrEqual(7)
    })
  })

  describe('getRandomWrongOptions', () => {
    it('returns the requested number of wrong options', () => {
      const correct = getElementById('keystone')!
      const wrongOptions = getRandomWrongOptions(3, correct)

      expect(wrongOptions.length).toBe(3)
    })

    it('excludes the correct answer', () => {
      const correct = getElementById('keystone')!
      const wrongOptions = getRandomWrongOptions(3, correct)

      const ids = wrongOptions.map(e => e.id)
      expect(ids).not.toContain(correct.id)
    })

    it('excludes additional specified IDs', () => {
      const correct = getElementById('keystone')!
      const exclude = ['pointed-arch', 'dome', 'corinthian-column']
      const wrongOptions = getRandomWrongOptions(3, correct, exclude)

      const ids = wrongOptions.map(e => e.id)
      exclude.forEach(id => {
        expect(ids).not.toContain(id)
      })
    })

    it('prefers elements from different categories than the correct answer', () => {
      const correct = getElementById('keystone')! // category: "Arches"
      const wrongOptions = getRandomWrongOptions(3, correct)

      // Most wrong options should be from different categories
      const differentCategory = wrongOptions.filter(e => e.category !== correct.category)
      expect(differentCategory.length).toBeGreaterThanOrEqual(2)
    })

    it('falls back to same category if needed', () => {
      // This is more of a robustness check - ensure it still works
      const correct = getElementById('keystone')!
      // Request a lot of wrong options
      const wrongOptions = getRandomWrongOptions(10, correct)

      expect(wrongOptions.length).toBeLessThanOrEqual(ALL_ELEMENTS.length - 1)
      expect(wrongOptions.every(e => e.id !== correct.id)).toBe(true)
    })

    it('provides variety across categories for better learning', () => {
      const correct = getElementById('dome')! // category: "Domes"
      const wrongOptions = getRandomWrongOptions(3, correct)

      const categories = new Set(wrongOptions.map(e => e.category))

      // Should have elements from at least 2 different categories
      expect(categories.size).toBeGreaterThanOrEqual(2)
    })
  })

  describe('category distribution statistics', () => {
    it('all categories have at least some elements', () => {
      const byCategory = new Map<string, number>()

      ALL_ELEMENTS.forEach(el => {
        byCategory.set(el.category, (byCategory.get(el.category) || 0) + 1)
      })

      // Every category should have at least 1 element
      byCategory.forEach((count, category) => {
        expect(count, `Category ${category} should have elements`).toBeGreaterThan(0)
      })
    })

    it('no single category dominates the selection', () => {
      // Run multiple selections and track category frequencies
      const categoryFrequency = new Map<string, number>()

      for (let i = 0; i < 10; i++) {
        const elements = getRandomElements(20)
        elements.forEach(e => {
          categoryFrequency.set(e.category, (categoryFrequency.get(e.category) || 0) + 1)
        })
      }

      // 200 total selections, no category should have more than 20% (40 elements)
      categoryFrequency.forEach((count, category) => {
        expect(count, `Category ${category} should not dominate`).toBeLessThan(40)
      })
    })
  })
})
