// ============================================
// CONTENT TERM EXTRACTOR
// Extracts key terms and definitions from lesson HTML content
// for use in interactive learning games
// ============================================

import type { LearningLevel } from '@/types/learning'
import type { Module } from '@/types/modules'

export interface ExtractedTerm {
  id: string
  term: string
  definition: string
  hint?: string
  source: 'strong' | 'list' | 'table' | 'heading' | 'manual'
}

/**
 * Extract key terms from HTML lesson content
 * Looks for patterns like:
 * - <strong>Term:</strong> definition
 * - <li><strong>Term:</strong> definition</li>
 * - Table rows with term/definition columns
 * - Key concept boxes
 */
export function extractTermsFromContent(
  htmlContent: string,
  moduleTitle: string,
  lessonTitle: string
): ExtractedTerm[] {
  const terms: ExtractedTerm[] = []
  const seenTerms = new Set<string>()

  // Pattern 1: <strong>Term:</strong> Definition (or <strong>Term</strong> — Definition)
  const strongPattern = /<strong>([^<]+)<\/strong>[\s:—–-]+([^<]+)/gi
  let match
  while ((match = strongPattern.exec(htmlContent)) !== null) {
    const term = match[1].trim().replace(/:$/, '')
    const definition = match[2].trim()

    if (term.length >= 3 && term.length <= 50 && definition.length >= 10 && !seenTerms.has(term.toLowerCase())) {
      seenTerms.add(term.toLowerCase())
      terms.push({
        id: `term-${terms.length}`,
        term,
        definition: truncateDefinition(definition),
        hint: lessonTitle,
        source: 'strong'
      })
    }
  }

  // Pattern 2: List items with terms - <li><strong>Term</strong>: Definition</li>
  const listPattern = /<li[^>]*>\s*<strong>([^<]+)<\/strong>[\s:—–-]*([^<]*)/gi
  while ((match = listPattern.exec(htmlContent)) !== null) {
    const term = match[1].trim().replace(/:$/, '')
    const definition = match[2].trim()

    if (term.length >= 3 && term.length <= 50 && definition.length >= 5 && !seenTerms.has(term.toLowerCase())) {
      seenTerms.add(term.toLowerCase())
      terms.push({
        id: `term-${terms.length}`,
        term,
        definition: truncateDefinition(definition),
        hint: moduleTitle,
        source: 'list'
      })
    }
  }

  // Pattern 3: Table rows - <tr><td>Term</td><td>Definition</td></tr>
  const tableRowPattern = /<tr[^>]*>\s*<td[^>]*>([^<]+)<\/td>\s*<td[^>]*>([^<]+)<\/td>/gi
  while ((match = tableRowPattern.exec(htmlContent)) !== null) {
    const term = match[1].trim()
    const definition = match[2].trim()

    // Skip header rows
    if (term.toLowerCase() === 'component' || term.toLowerCase() === 'technology' || term.toLowerCase() === 'term') continue

    if (term.length >= 2 && term.length <= 40 && definition.length >= 5 && !seenTerms.has(term.toLowerCase())) {
      seenTerms.add(term.toLowerCase())
      terms.push({
        id: `term-${terms.length}`,
        term,
        definition: truncateDefinition(definition),
        hint: lessonTitle,
        source: 'table'
      })
    }
  }

  return terms
}

/**
 * Extract terms from an entire module across all lessons
 */
export function extractTermsFromModule(
  module: Module,
  level: LearningLevel,
  maxTerms: number = 15
): ExtractedTerm[] {
  const allTerms: ExtractedTerm[] = []

  for (const lesson of module.lessons) {
    const content = lesson.content[level] || lesson.content.HIGH_SCHOOL
    if (content) {
      const lessonTerms = extractTermsFromContent(content, module.title, lesson.title)
      allTerms.push(...lessonTerms)
    }
  }

  // Deduplicate and limit
  const uniqueTerms = deduplicateTerms(allTerms)
  return uniqueTerms.slice(0, maxTerms)
}

/**
 * Generate crossword-friendly terms (single words or short phrases)
 */
export function extractCrosswordTerms(
  module: Module,
  level: LearningLevel,
  maxTerms: number = 10
): ExtractedTerm[] {
  const allTerms = extractTermsFromModule(module, level, 50)

  // Filter for crossword-suitable terms (no spaces, reasonable length)
  const crosswordTerms = allTerms.filter(t => {
    const cleanTerm = t.term.replace(/[^a-zA-Z]/g, '')
    return cleanTerm.length >= 4 && cleanTerm.length <= 12 && !t.term.includes(' ')
  })

  return crosswordTerms.slice(0, maxTerms)
}

/**
 * Generate fill-in-the-blank questions from content
 */
export function generateFillInBlankQuestions(
  module: Module,
  level: LearningLevel,
  maxQuestions: number = 5
): { question: string; answer: string; hint: string }[] {
  const questions: { question: string; answer: string; hint: string }[] = []

  for (const lesson of module.lessons) {
    const content = lesson.content[level] || lesson.content.HIGH_SCHOOL
    if (!content) continue

    // Find sentences with key terms to create blanks
    const strongPattern = /<p[^>]*>([^<]*<strong>([^<]+)<\/strong>[^<]*)<\/p>/gi
    let match

    while ((match = strongPattern.exec(content)) !== null && questions.length < maxQuestions) {
      const sentence = stripHtml(match[1])
      const term = match[2].trim()

      if (term.length >= 3 && sentence.length >= 20 && sentence.length <= 200) {
        const blankSentence = sentence.replace(term, '_'.repeat(term.length))
        questions.push({
          question: blankSentence,
          answer: term,
          hint: lesson.title
        })
      }
    }
  }

  return questions
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function truncateDefinition(text: string, maxLength: number = 100): string {
  const cleaned = stripHtml(text).trim()
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

function deduplicateTerms(terms: ExtractedTerm[]): ExtractedTerm[] {
  const seen = new Set<string>()
  return terms.filter(t => {
    const key = t.term.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// ============================================
// PREDEFINED KEY TERMS BY TOPIC
// Fallback terms for when extraction yields few results
// ============================================

export const KEY_TERMS_BY_TOPIC: Record<string, ExtractedTerm[]> = {
  'renewable-energy': [
    { id: 'solar-1', term: 'Photovoltaic', definition: 'Converting light directly into electricity using semiconductors', source: 'manual' },
    { id: 'solar-2', term: 'Solar Panel', definition: 'A device that converts sunlight into electrical energy', source: 'manual' },
    { id: 'solar-3', term: 'Inverter', definition: 'Converts DC electricity from panels to AC for home use', source: 'manual' },
    { id: 'solar-4', term: 'P-N Junction', definition: 'The boundary in a solar cell where positive and negative silicon meet', source: 'manual' },
    { id: 'solar-5', term: 'Electron', definition: 'Tiny charged particle that flows to create electricity', source: 'manual' },
    { id: 'wind-1', term: 'Turbine', definition: 'Machine that converts wind energy into rotational motion', source: 'manual' },
    { id: 'wind-2', term: 'Wind Farm', definition: 'Collection of wind turbines generating electricity together', source: 'manual' },
    { id: 'wind-3', term: 'Nacelle', definition: 'Housing at the top of a wind turbine containing the generator', source: 'manual' },
    { id: 'grid-1', term: 'Grid', definition: 'Network that delivers electricity from producers to consumers', source: 'manual' },
    { id: 'grid-2', term: 'Net Metering', definition: 'Selling excess solar electricity back to the utility', source: 'manual' },
    { id: 'storage-1', term: 'Battery Storage', definition: 'Systems that store electricity for later use', source: 'manual' },
    { id: 'efficiency-1', term: 'Efficiency', definition: 'Percentage of energy successfully converted to electricity', source: 'manual' },
  ],
  'water-systems': [
    { id: 'water-1', term: 'Watershed', definition: 'Area of land where all water drains to a common outlet', source: 'manual' },
    { id: 'water-2', term: 'Aquifer', definition: 'Underground layer of rock that holds groundwater', source: 'manual' },
    { id: 'water-3', term: 'Rainwater Harvesting', definition: 'Collecting and storing rain for later use', source: 'manual' },
    { id: 'water-4', term: 'Greywater', definition: 'Wastewater from sinks and showers that can be reused', source: 'manual' },
    { id: 'water-5', term: 'Drip Irrigation', definition: 'Watering system that delivers water directly to plant roots', source: 'manual' },
    { id: 'water-6', term: 'Permeable', definition: 'Allowing water to pass through', source: 'manual' },
    { id: 'water-7', term: 'Cistern', definition: 'Tank for storing harvested rainwater', source: 'manual' },
    { id: 'water-8', term: 'Swale', definition: 'Shallow channel designed to slow and capture runoff', source: 'manual' },
    { id: 'water-9', term: 'Bioswale', definition: 'Vegetated channel that filters pollutants from stormwater', source: 'manual' },
    { id: 'water-10', term: 'Water Table', definition: 'Top level of underground water saturation', source: 'manual' },
  ],
  'regenerative-agriculture': [
    { id: 'regen-1', term: 'Permaculture', definition: 'Design system mimicking natural ecosystems', source: 'manual' },
    { id: 'regen-2', term: 'Cover Crop', definition: 'Plants grown to protect and enrich soil between harvests', source: 'manual' },
    { id: 'regen-3', term: 'Composting', definition: 'Breaking down organic matter into nutrient-rich soil', source: 'manual' },
    { id: 'regen-4', term: 'No-Till', definition: 'Farming without disturbing soil through plowing', source: 'manual' },
    { id: 'regen-5', term: 'Carbon Sequestration', definition: 'Capturing and storing carbon dioxide in soil', source: 'manual' },
    { id: 'regen-6', term: 'Biodiversity', definition: 'Variety of plant and animal species in an ecosystem', source: 'manual' },
    { id: 'regen-7', term: 'Mulching', definition: 'Covering soil with organic material to retain moisture', source: 'manual' },
    { id: 'regen-8', term: 'Crop Rotation', definition: 'Alternating different crops to maintain soil health', source: 'manual' },
    { id: 'regen-9', term: 'Mycorrhizae', definition: 'Beneficial fungi that help plants absorb nutrients', source: 'manual' },
    { id: 'regen-10', term: 'Humus', definition: 'Dark, nutrient-rich organic matter in soil', source: 'manual' },
  ],
  'zero-waste': [
    { id: 'zero-1', term: 'Circular Economy', definition: 'System where waste is eliminated through reuse and recycling', source: 'manual' },
    { id: 'zero-2', term: 'Composting', definition: 'Turning food scraps into nutrient-rich soil', source: 'manual' },
    { id: 'zero-3', term: 'Upcycling', definition: 'Transforming waste into higher-value products', source: 'manual' },
    { id: 'zero-4', term: 'Landfill', definition: 'Site where waste is buried underground', source: 'manual' },
    { id: 'zero-5', term: 'Single-Use', definition: 'Items designed to be thrown away after one use', source: 'manual' },
    { id: 'zero-6', term: 'Biodegradable', definition: 'Materials that naturally break down over time', source: 'manual' },
    { id: 'zero-7', term: 'Reduce', definition: 'Using less to create less waste', source: 'manual' },
    { id: 'zero-8', term: 'Reuse', definition: 'Using items multiple times instead of discarding', source: 'manual' },
    { id: 'zero-9', term: 'Recycle', definition: 'Processing materials into new products', source: 'manual' },
    { id: 'zero-10', term: 'Extended Producer', definition: 'Making manufacturers responsible for product disposal', source: 'manual' },
  ],
  'green-building': [
    { id: 'green-1', term: 'Passive Solar', definition: 'Using building design to capture sunlight for heating', source: 'manual' },
    { id: 'green-2', term: 'Insulation', definition: 'Material that slows heat transfer through walls and roofs', source: 'manual' },
    { id: 'green-3', term: 'LEED', definition: 'Leadership in Energy and Environmental Design certification', source: 'manual' },
    { id: 'green-4', term: 'Thermal Mass', definition: 'Materials that absorb and slowly release heat', source: 'manual' },
    { id: 'green-5', term: 'R-Value', definition: 'Measure of how well insulation resists heat flow', source: 'manual' },
    { id: 'green-6', term: 'Net-Zero', definition: 'Building that produces as much energy as it uses', source: 'manual' },
    { id: 'green-7', term: 'Green Roof', definition: 'Roof covered with plants for insulation and habitat', source: 'manual' },
    { id: 'green-8', term: 'Air Sealing', definition: 'Preventing unwanted air leaks in a building', source: 'manual' },
    { id: 'green-9', term: 'Embodied Carbon', definition: 'Carbon emissions from manufacturing building materials', source: 'manual' },
    { id: 'green-10', term: 'Daylighting', definition: 'Using natural light to illuminate indoor spaces', source: 'manual' },
  ],
  'food-sovereignty': [
    { id: 'food-1', term: 'Food Sovereignty', definition: 'Right of communities to control their own food systems', source: 'manual' },
    { id: 'food-2', term: 'Seed Saving', definition: 'Collecting and storing seeds for future planting', source: 'manual' },
    { id: 'food-3', term: 'Food Miles', definition: 'Distance food travels from farm to plate', source: 'manual' },
    { id: 'food-4', term: 'Urban Farming', definition: 'Growing food in cities and towns', source: 'manual' },
    { id: 'food-5', term: 'Food Desert', definition: 'Area with limited access to affordable, healthy food', source: 'manual' },
    { id: 'food-6', term: 'CSA', definition: 'Community Supported Agriculture subscription model', source: 'manual' },
    { id: 'food-7', term: 'Heirloom', definition: 'Traditional plant varieties passed down through generations', source: 'manual' },
    { id: 'food-8', term: 'Local Food', definition: 'Food produced and consumed within a region', source: 'manual' },
    { id: 'food-9', term: 'Food Security', definition: 'Reliable access to sufficient nutritious food', source: 'manual' },
    { id: 'food-10', term: 'Agroecology', definition: 'Applying ecological principles to farming', source: 'manual' },
  ],
}

export default extractTermsFromModule
