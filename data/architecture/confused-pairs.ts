/**
 * Commonly confused architectural element pairs
 * These are elements that students often mix up
 */

export interface ConfusedPair {
  id: string
  element1Id: string
  element1Name: string
  element2Id: string
  element2Name: string
  keyDifferences: string[]
  memoryTrick: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export const CONFUSED_PAIRS: ConfusedPair[] = [
  {
    id: 'column-vs-pilaster',
    element1Id: 'column',
    element1Name: 'Column',
    element2Id: 'pilaster',
    element2Name: 'Pilaster',
    keyDifferences: [
      'Column: Freestanding, circular or rounded',
      'Pilaster: Attached to wall, rectangular projection',
      'Column: Full 3D form, structural',
      'Pilaster: Mostly decorative, shallow relief',
    ],
    memoryTrick: 'Pilaster is PLASTERED to the wall!',
    category: 'structural',
    difficulty: 'easy',
  },
  {
    id: 'architrave-vs-frieze',
    element1Id: 'architrave',
    element1Name: 'Architrave',
    element2Id: 'frieze',
    element2Name: 'Frieze',
    keyDifferences: [
      'Architrave: Bottom horizontal band above columns',
      'Frieze: Middle band, often decorated',
      'Architrave: Plain, structural appearance',
      'Frieze: Decorative, may have sculptures/reliefs',
    ],
    memoryTrick: 'Architrave is ARCH-level, Frieze is FREE to decorate',
    category: 'structural',
    difficulty: 'medium',
  },
  {
    id: 'dome-vs-vault',
    element1Id: 'dome',
    element1Name: 'Dome',
    element2Id: 'barrel-vault',
    element2Name: 'Barrel Vault',
    keyDifferences: [
      'Dome: Hemispherical, covers circular space',
      'Vault: Elongated arch, covers rectangular space',
      'Dome: Radial symmetry from center point',
      'Vault: Linear, extends in one direction',
    ],
    memoryTrick: 'Dome is a BALL, Vault is a BARREL',
    category: 'ceiling',
    difficulty: 'easy',
  },
  {
    id: 'ionic-vs-corinthian',
    element1Id: 'ionic-capital',
    element1Name: 'Ionic Capital',
    element2Id: 'corinthian-capital',
    element2Name: 'Corinthian Capital',
    keyDifferences: [
      'Ionic: Simple scrolls (volutes)',
      'Corinthian: Elaborate acanthus leaves',
      'Ionic: Two prominent volutes',
      'Corinthian: Multiple rows of leaves, smaller volutes',
    ],
    memoryTrick: 'Corinthian is the CROWN of capitals (most ornate)',
    category: 'capital',
    difficulty: 'easy',
  },
  {
    id: 'pediment-vs-tympanum',
    element1Id: 'pediment',
    element1Name: 'Pediment',
    element2Id: 'tympanum',
    element2Name: 'Tympanum',
    keyDifferences: [
      'Pediment: Entire triangular gable (frame + field)',
      'Tympanum: Just the triangular field inside',
      'Pediment: Includes the horizontal cornice',
      'Tympanum: Recessed area, often decorated',
    ],
    memoryTrick: 'Tympanum is the FILLED-IN triangle, pediment is the FRAME',
    category: 'decorative',
    difficulty: 'medium',
  },
  {
    id: 'baluster-vs-newel',
    element1Id: 'baluster',
    element1Name: 'Baluster',
    element2Id: 'newel-post',
    element2Name: 'Newel Post',
    keyDifferences: [
      'Baluster: Thin vertical support, many in a row',
      'Newel: Thick main post at corners/ends',
      'Baluster: Decorative, repetitive',
      'Newel: Structural anchor point',
    ],
    memoryTrick: 'Newel is NEW and LARGER, baluster is smaller',
    category: 'floor',
    difficulty: 'easy',
  },
  {
    id: 'mullion-vs-muntin',
    element1Id: 'mullion',
    element1Name: 'Mullion',
    element2Id: 'muntin',
    element2Name: 'Muntin',
    keyDifferences: [
      'Mullion: Vertical divider between windows',
      'Muntin: Small divider within a single window',
      'Mullion: Structural, separates window units',
      'Muntin: Decorative, divides glass panes',
    ],
    memoryTrick: 'Mullion is MAIN division, Muntin is MINI division',
    category: 'window',
    difficulty: 'hard',
  },
  {
    id: 'lintel-vs-architrave',
    element1Id: 'lintel',
    element1Name: 'Lintel',
    element2Id: 'architrave',
    element2Name: 'Architrave',
    keyDifferences: [
      'Lintel: Horizontal beam over any opening',
      'Architrave: Specific decorative molding in classical orders',
      'Lintel: Purely structural function',
      'Architrave: Part of entablature system',
    ],
    memoryTrick: 'Lintel is LITERAL support, architrave is ARCHITECTURAL style',
    category: 'structural',
    difficulty: 'medium',
  },
  {
    id: 'buttress-vs-pilaster',
    element1Id: 'buttress',
    element1Name: 'Buttress',
    element2Id: 'pilaster',
    element2Name: 'Pilaster',
    keyDifferences: [
      'Buttress: Structural support projecting from wall',
      'Pilaster: Decorative column attached to wall',
      'Buttress: Thick, angled, exterior support',
      'Pilaster: Thin, vertical, interior or exterior',
    ],
    memoryTrick: 'Buttress BRACES the wall, pilaster PRETENDS to be a column',
    category: 'structural',
    difficulty: 'medium',
  },
  {
    id: 'rose-window-vs-oculus',
    element1Id: 'rose-window',
    element1Name: 'Rose Window',
    element2Id: 'oculus',
    element2Name: 'Oculus',
    keyDifferences: [
      'Rose Window: Large, circular, intricate tracery',
      'Oculus: Simple circular opening',
      'Rose Window: Stained glass, petal patterns',
      'Oculus: Plain opening, may be open or glazed',
    ],
    memoryTrick: 'Rose has PETALS (complex), Oculus is just an EYE (simple)',
    category: 'window',
    difficulty: 'easy',
  },
]

export function getRandomConfusedPairs(count: number): ConfusedPair[] {
  const shuffled = [...CONFUSED_PAIRS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, CONFUSED_PAIRS.length))
}

export function getPairsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): ConfusedPair[] {
  return CONFUSED_PAIRS.filter(pair => pair.difficulty === difficulty)
}
