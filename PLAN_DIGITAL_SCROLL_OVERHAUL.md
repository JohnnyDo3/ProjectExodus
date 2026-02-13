# Digital Scroll Overhaul - Implementation Plan

## Overview
Complete overhaul of the Digital Scroll learning experience based on audit findings. Replacing Guardian theming with Learning Stages, implementing real Pusher discussions, expanding content, and fixing critical issues.

## Decisions
- **Ribbon Theming**: Learning Stages (Foundation, Growth, Mastery, etc.)
- **Discussion**: Implement real-time with Pusher
- **Database Sync**: Later (localStorage is fine for now)
- **Scope**: Full plan - all phases
- **Fun Facts**: Expand to all topics + AI generation capability

---

## Phase 1: Critical Fixes (Foundation)

### 1.1 Split DigitalScroll.tsx into Smaller Components
**Current**: 1,982 lines, unmaintainable monolith
**Action**: Extract page rendering into separate components

Create new files:
- `components/learning/DigitalScroll/pages/CoverPage.tsx`
- `components/learning/DigitalScroll/pages/InsideCoverPage.tsx`
- `components/learning/DigitalScroll/pages/TOCPage.tsx`
- `components/learning/DigitalScroll/pages/LearningMissionPage.tsx`
- `components/learning/DigitalScroll/pages/ChapterDividerPage.tsx`
- `components/learning/DigitalScroll/pages/ChapterIntroPage.tsx`
- `components/learning/DigitalScroll/pages/ContentPage.tsx`
- `components/learning/DigitalScroll/pages/ChapterReviewPage.tsx`
- `components/learning/DigitalScroll/pages/NotesEnhancedPage.tsx`
- `components/learning/DigitalScroll/pages/GamesPage.tsx`
- `components/learning/DigitalScroll/pages/QuizPage.tsx`
- `components/learning/DigitalScroll/pages/index.ts` (barrel export)

Each component receives props:
```typescript
interface PageProps {
  page: ScrollContent
  topic: TopicDefinition
  modules: Module[]
  selectedLevel: LearningLevel
  currentRibbon: RibbonConfig | null
  pageNotes: Record<string, string>
  saveNote: (key: string, value: string) => void
  goToPage: (index: number) => void
  goToChapter: (index: number) => void
  // ... other necessary callbacks
}
```

### 1.2 Add HTML Sanitization
**Current**: `dangerouslySetInnerHTML={{ __html: page.content }}` with no sanitization
**Action**: Install and use DOMPurify

```bash
npm install dompurify @types/dompurify
```

Create utility:
```typescript
// lib/utils/sanitizeHtml.ts
import DOMPurify from 'dompurify'

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
                   'strong', 'em', 'a', 'blockquote', 'code', 'pre', 'br', 'hr',
                   'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'id', 'target', 'rel'],
  })
}
```

### 1.3 Fix HieroglyphicDivider Random Symbol Flicker
**Current**: Random symbol selected on every render
**Action**: Use useMemo with stable seed

```typescript
function HieroglyphicDivider({ color, seed = 0 }: { color?: string; seed?: number }) {
  const symbol = useMemo(() => {
    const symbols = ['☥', '𓂀', '☀', '✦', '◈', '❋', '⚜']
    return symbols[seed % symbols.length]
  }, [seed])
  // ...
}
```

### 1.4 Move Decorative Components to Separate File
**Current**: `AncientBorder`, `HieroglyphicDivider`, `AncientPageNumber` inline in main file
**Action**: Move to `components/learning/DigitalScroll/DecorativeElements.tsx`

---

## Phase 2: Theming & UX Cleanup

### 2.1 Replace Guardian Theming with Learning Stages
**Current**:
```typescript
const GUARDIAN_RIBBONS = {
  michael: { name: 'Michael', value: 'STRENGTH', colors: { from: '#dc2626', ... } },
  gabriel: { name: 'Gabriel', value: 'REVELATION', ... },
  // ...
}
```

**New**:
```typescript
// scrollConstants.ts
export const LEARNING_STAGE_RIBBONS = {
  foundation: {
    name: 'Foundation',
    description: 'Building core understanding',
    icon: '🌱',
    colors: { from: '#10b981', to: '#059669', gradient: 'linear-gradient(135deg, #10b981, #059669)' }
  },
  growth: {
    name: 'Growth',
    description: 'Expanding knowledge',
    icon: '🌿',
    colors: { from: '#0ea5e9', to: '#0284c7', gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }
  },
  connection: {
    name: 'Connection',
    description: 'Linking concepts together',
    icon: '🔗',
    colors: { from: '#8b5cf6', to: '#7c3aed', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }
  },
  application: {
    name: 'Application',
    description: 'Putting knowledge into practice',
    icon: '⚡',
    colors: { from: '#f59e0b', to: '#d97706', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' }
  },
  mastery: {
    name: 'Mastery',
    description: 'Deep expertise',
    icon: '🏆',
    colors: { from: '#ec4899', to: '#db2777', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' }
  },
  innovation: {
    name: 'Innovation',
    description: 'Creating new solutions',
    icon: '💡',
    colors: { from: '#6366f1', to: '#4f46e5', gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)' }
  },
  leadership: {
    name: 'Leadership',
    description: 'Teaching and guiding others',
    icon: '🌟',
    colors: { from: '#dc2626', to: '#b91c1c', gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)' }
  },
}

export const STAGE_ORDER = ['foundation', 'growth', 'connection', 'application', 'mastery', 'innovation', 'leadership'] as const
```

Update all references from `GUARDIAN_RIBBONS` to `LEARNING_STAGE_RIBBONS`.

### 2.2 Rename "Verse" to "Lesson"
**Files to update**:
- `DigitalScroll.tsx` - type definitions, comments
- `ScrollPage.tsx` - VerseHeader → LessonHeader
- `useScrollState.ts` - position tracking
- Any other files referencing "verse"

### 2.3 Switch Roman Numerals to Arabic Numbers
**Current**:
```typescript
function AncientPageNumber({ number, total }) {
  const toRoman = (num: number): string => { ... }
  return <span>{toRoman(number)} · {toRoman(total)}</span>
}
```

**New**:
```typescript
function PageNumber({ number, total }) {
  return <span className="...">{number} of {total}</span>
}
```

### 2.4 Add "Skip to Quiz" Option
**Current**: Quiz locked until games completed
**Action**: Add bypass with warning

```typescript
// In QuizPage.tsx
{!isQuizUnlocked && (
  <div className="...">
    <p>Complete Practice Activities to unlock quiz</p>
    <button onClick={() => setCompletedGames(prev => ({ ...prev, [chapterIdx]: true }))}>
      Skip Practice (not recommended)
    </button>
  </div>
)}
```

### 2.5 Remove Rapid Flip Animation Delay
**Current**: 1 second animation when jumping chapters
**Action**: Make instant or reduce to 200ms max

```typescript
// In goToChapter callback
if (Math.abs(pageIndex - currentPageIndex) > 5) {
  // Instead of setIsRapidFlipping with 1000ms timeout
  setCurrentPageIndex(pageIndex)
  playPageTurn()
}
```

### 2.6 Update Guardian Quotes to Learning Stage Quotes
**Current**:
```typescript
function getGuardianQuote(chapterIndex: number): string {
  const quotes = {
    0: "Stand firm in the face of challenge, for strength is found in perseverance.",
    // ... religious/spiritual quotes
  }
}
```

**New**:
```typescript
function getLearningStageQuote(chapterIndex: number): string {
  const quotes = {
    0: "Every expert was once a beginner. The foundation you build today supports everything that follows.",
    1: "Growth happens at the edge of comfort. Embrace the challenge of new understanding.",
    2: "Knowledge becomes powerful when we see how ideas connect across boundaries.",
    3: "Theory without practice is empty. Apply what you learn to make it real.",
    4: "Mastery isn't perfection—it's the confidence to navigate complexity.",
    5: "Innovation emerges when we question assumptions and explore new possibilities.",
    6: "The greatest learning comes from teaching others. Share what you know.",
  }
  return quotes[chapterIndex] || "Learning is a journey, not a destination."
}
```

---

## Phase 3: Core Features

### 3.1 Implement Real Discussion with Pusher
**Files to create/modify**:
- `components/learning/DigitalScroll/DiscussionPanel.tsx` (new)
- `app/api/scroll-discussions/route.ts` (new)
- `app/api/scroll-discussions/[topicId]/route.ts` (new)
- `prisma/schema.prisma` (add ScrollDiscussion model)

**Database model**:
```prisma
model ScrollDiscussion {
  id        String   @id @default(cuid())
  topicId   String
  chapterId Int?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([topicId, chapterId])
  @@index([userId])
}
```

**Pusher channels**:
- `scroll-discussion-{topicId}` - topic-level discussions
- Events: `new-message`, `message-deleted`

**Component structure**:
```typescript
// DiscussionPanel.tsx
export function DiscussionPanel({
  topicId,
  chapterId,
  isOpen,
  onClose,
  position,
  onPositionChange
}: DiscussionPanelProps) {
  // Fetch existing messages
  // Subscribe to Pusher channel
  // Handle new message submission
  // Draggable modal UI
}
```

### 3.2 Add Search Functionality
**Files to create**:
- `components/learning/DigitalScroll/SearchPanel.tsx`

**Features**:
- Search across all lessons in current topic
- Highlight matches
- Click to jump to page containing match
- Recent searches

**Implementation**:
```typescript
// Build search index on mount
const searchIndex = useMemo(() => {
  return modules.flatMap((module, chapterIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      chapterIndex,
      lessonIndex,
      title: lesson.title,
      content: lesson.content[selectedLevel] || lesson.content.HIGH_SCHOOL,
    }))
  )
}, [modules, selectedLevel])

// Search function
const search = (query: string) => {
  const lowerQuery = query.toLowerCase()
  return searchIndex.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.content.toLowerCase().includes(lowerQuery)
  )
}
```

### 3.3 Add Content Bookmarking
**Files to modify**:
- `useScrollState.ts` - add bookmarks to state
- `ScrollPage.tsx` - add bookmark button
- Create `BookmarksList.tsx` component

**State structure**:
```typescript
interface Bookmark {
  id: string
  topicId: string
  chapterIndex: number
  lessonIndex: number
  pageIndex: number
  note?: string
  createdAt: number
}

// In useScrollState
const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
  const newBookmark = {
    ...bookmark,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  }
  setBookmarks(prev => [...prev, newBookmark])
}

const removeBookmark = (id: string) => {
  setBookmarks(prev => prev.filter(b => b.id !== id))
}
```

### 3.4 Add Skip-to-Lesson Navigation
**Files to create**:
- `components/learning/DigitalScroll/LessonNavigator.tsx`

**Features**:
- Dropdown/modal showing all chapters and lessons
- Current position indicator
- Direct jump to any lesson
- Keyboard shortcut (Cmd/Ctrl + G)

---

## Phase 4: Accessibility & Polish

### 4.1 Text-to-Speech
**Files to create**:
- `components/learning/DigitalScroll/TextToSpeech.tsx`
- `hooks/useTextToSpeech.ts`

**Implementation using Web Speech API**:
```typescript
// hooks/useTextToSpeech.ts
export function useTextToSpeech() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.onend = () => setIsPlaying(false)
      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
    }
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
  }

  const resume = () => {
    window.speechSynthesis.resume()
    setIsPaused(false)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  return { speak, pause, resume, stop, isPlaying, isPaused }
}
```

**UI**: Play/pause button on content pages, speed control.

### 4.2 Mobile Browser Chrome Fix
**Current**: `100vw/100vh` causes issues with mobile browser UI
**Action**: Use CSS safe-area-inset and dvh units

```css
/* In ScrollContainer */
.scroll-container {
  height: 100dvh; /* Dynamic viewport height */
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 4.3 Performance Optimization
**Actions**:
1. Create single resize context provider
2. Add React.memo to page components
3. Virtualize page list for very long scrolls
4. Lazy load game components

```typescript
// contexts/ViewportContext.tsx
export const ViewportProvider = ({ children }) => {
  const [viewport, setViewport] = useState({ width: 0, height: 0, deviceType: 'desktop' })

  useEffect(() => {
    const update = () => setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      deviceType: getDeviceType(),
    })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return <ViewportContext.Provider value={viewport}>{children}</ViewportContext.Provider>
}
```

---

## Phase 5: Advanced Features

### 5.1 Spaced Repetition Integration
**Files to modify**:
- `hooks/useSpacedRepetitionStore.ts`
- `ScrollGames.tsx` - GradedQuiz component

**On quiz completion**:
```typescript
// In GradedQuiz onComplete
const handleQuizComplete = (score: number, total: number) => {
  // Add terms to SRS based on performance
  const incorrectTerms = answers
    .filter(a => !a.correct)
    .map(a => items.find(i => i.id === a.questionId))
    .filter(Boolean)

  // Add to spaced repetition for review
  incorrectTerms.forEach(term => {
    srsStore.addCard({
      front: term.term,
      back: term.definition,
      topicId: topic.id,
      chapterIndex,
    })
  })

  onComplete?.(score, total)
}
```

### 5.2 PDF Export
**Files to create**:
- `lib/pdfExport.ts`
- `components/learning/DigitalScroll/ExportButton.tsx`

**Using @react-pdf/renderer**:
```bash
npm install @react-pdf/renderer
```

Generate PDF of current chapter with:
- Chapter title and intro
- All lesson content
- Key terms
- Summary points

### 5.3 Annotations/Highlighting
**Files to create**:
- `components/learning/DigitalScroll/AnnotationLayer.tsx`
- `hooks/useAnnotations.ts`

**Features**:
- Text selection creates highlight
- Click highlight to add note
- Different highlight colors
- Export annotations

**Data structure**:
```typescript
interface Annotation {
  id: string
  topicId: string
  chapterIndex: number
  lessonIndex: number
  startOffset: number
  endOffset: number
  selectedText: string
  note?: string
  color: 'yellow' | 'green' | 'blue' | 'pink'
  createdAt: number
}
```

---

## Phase 6: Content Expansion

### 6.1 Expand Fun Facts to All Topics
Create comprehensive fun facts for all topics at all levels.

**Topics to cover**:
- renewable-energy (exists)
- zero-waste (exists)
- water-conservation (new)
- green-building (new)
- sustainable-agriculture (new)
- sustainable-fashion (new)
- food-sovereignty (new)
- circular-economy (new)

**File**: `data/learning/funFacts.ts`

### 6.2 AI-Generated Content Enhancement
**Files to create**:
- `app/api/ai/generate-facts/route.ts`
- `lib/ai/contentGenerator.ts`

**Features**:
- Generate level-appropriate fun facts from lesson content
- Generate discussion questions
- Generate additional examples
- Cache generated content

**Implementation**:
```typescript
// app/api/ai/generate-facts/route.ts
export async function POST(req: Request) {
  const { topicId, chapterContent, level } = await req.json()

  // Use Claude API to generate facts
  const response = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: `Generate 5 fun facts about the following sustainability topic for a ${level} student.
      Make them engaging and memorable. Format as a JSON array of strings.

      Content: ${chapterContent}`
    }]
  })

  return Response.json({ facts: JSON.parse(response.content[0].text) })
}
```

---

## File Structure After Implementation

```
components/learning/DigitalScroll/
├── DigitalScroll.tsx (main orchestrator, ~400 lines)
├── pages/
│   ├── index.ts
│   ├── CoverPage.tsx
│   ├── InsideCoverPage.tsx
│   ├── TOCPage.tsx
│   ├── LearningMissionPage.tsx
│   ├── ChapterDividerPage.tsx
│   ├── ChapterIntroPage.tsx
│   ├── ContentPage.tsx
│   ├── ChapterReviewPage.tsx
│   ├── NotesEnhancedPage.tsx
│   ├── GamesPage.tsx
│   └── QuizPage.tsx
├── DecorativeElements.tsx
├── DiscussionPanel.tsx (new)
├── SearchPanel.tsx (new)
├── LessonNavigator.tsx (new)
├── BookmarksList.tsx (new)
├── TextToSpeech.tsx (new)
├── AnnotationLayer.tsx (new)
├── ExportButton.tsx (new)
├── ScrollContainer.tsx
├── ScrollCover.tsx
├── ScrollPage.tsx
├── PageFlip.tsx
├── RibbonBookmarks.tsx
├── ScrollGames.tsx
├── ScrollOpenAnimation.tsx
├── CrosswordPuzzle.tsx
├── ActivitySelector.tsx
├── scrollConstants.ts (updated with Learning Stages)
├── useScrollState.ts
└── DigitalScrollContext.tsx
```

---

## Implementation Order

1. **Phase 1.1-1.4**: Split components, add sanitization, fix bugs (~2-3 hours)
2. **Phase 2.1-2.6**: Theme replacement, UX fixes (~2 hours)
3. **Phase 3.1**: Pusher discussion implementation (~2-3 hours)
4. **Phase 3.2-3.4**: Search, bookmarks, navigation (~2 hours)
5. **Phase 4.1-4.3**: TTS, mobile fix, performance (~1-2 hours)
6. **Phase 5.1-5.3**: SRS integration, PDF, annotations (~3-4 hours)
7. **Phase 6.1-6.2**: Content expansion, AI generation (~2-3 hours)

**Total estimated effort**: 14-19 hours of implementation

---

## Success Criteria

- [ ] DigitalScroll.tsx under 500 lines
- [ ] All page types in separate components
- [ ] No XSS vulnerabilities (HTML sanitized)
- [ ] Guardian theming fully replaced with Learning Stages
- [ ] Real-time discussion working with Pusher
- [ ] Search returns relevant results
- [ ] Bookmarks persist across sessions
- [ ] Text-to-speech works on content pages
- [ ] Mobile experience smooth (no browser chrome issues)
- [ ] Fun facts available for all topics
- [ ] Quiz results integrate with SRS
