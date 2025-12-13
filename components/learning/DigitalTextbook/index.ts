// ============================================
// THE SACRED DIGITAL TEXTBOOK
// Central Exports
// ============================================

// Main Component
export { DigitalTextbook, default } from './DigitalTextbook'

// Book Container & Structure
export {
  BookContainer,
  BookWrapper,
  PageContainer,
  BookSpine,
  PageEdges,
} from './BookContainer'

// Book Cover
export { BookCover, InsideCover } from './BookCover'

// Book Pages
export {
  BookPage,
  PageContent,
  VerseHeader,
  ChapterDivider,
} from './BookPage'

// Page Flip Animation
export {
  PageFlip,
  RapidPageFlip,
  usePageTurnSound,
} from './PageFlip'

// Ribbon Bookmarks
export { RibbonBookmarks } from './RibbonBookmarks'

// Opening Animation
export { BookOpenAnimation } from './BookOpenAnimation'

// State Management
export { useBookState, type UseBookStateReturn } from './useBookState'
export type { ReadingPosition, TopicProgress, BookUnlockState, BookPreferences, BookState } from './useBookState'

// Constants
export {
  // Guardian Ribbons
  GUARDIAN_RIBBONS,
  RIBBON_ORDER,
  YIN_YANG_RIBBON,
  type GuardianRibbon,

  // Book Dimensions
  BOOK_DIMENSIONS,

  // Animation Timings
  ANIMATION_TIMINGS,

  // Theme Colors
  BOOK_THEME,
  BOOK_CSS_VARS,

  // Perspective
  PERSPECTIVE_CONFIG,

  // Watermark
  WATERMARK_CONFIG,

  // Sound
  SOUND_CONFIG,

  // Accessibility
  A11Y_CONFIG,

  // Storage
  STORAGE_KEYS,

  // Topic Icons
  CORE_TOPIC_ICONS,

  // Helpers
  getRibbonForChapter,
  getChapterTitle,
  getDeviceType,
  getDimensions,
} from './bookConstants'
