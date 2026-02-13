# Minimal View Redesign Plan

## Summary
Redesign the volition page minimal view to show a grid of clickable chips instead of horizontal scrolling lanes. Remove the footer from the volition page for all view modes.

## Requirements
- **Minimal view**: Grid of chips (3 cols desktop, 2 tablet, 1 mobile)
- **Chips show**: Icon, lane title, item count
- **Click behavior**: Expand content below the clicked chip, pushing other chips down
- **Single expansion**: Only one lane expanded at a time
- **Footer**: Remove from volition page for ALL view modes (expanded, compact, minimal)
- **Dynamic height**: Page extends to fit all content, no cut-off

---

## Implementation Steps

### Phase 1: Create MinimalChipGrid Component
**File: `components/volition/MinimalChipGrid.tsx`**

1. Create new component that receives:
   - `lanes` - array of lane configs (id, title, icon, gradient, count)
   - `expandedLaneId` - which lane is currently expanded (or null)
   - `onChipClick` - callback when chip is clicked
   - `renderLaneContent` - function to render expanded content for a lane

2. Render responsive grid of chips:
   ```
   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
   ```

3. Each chip renders:
   - Gradient background matching lane color
   - Icon + Title + Count
   - Visual indicator when expanded (arrow, highlight)

4. Below each chip, conditionally render expanded content panel with animation

### Phase 2: Update Volition Page for Minimal View
**File: `app/my/volition/page.tsx`**

1. Add state for `expandedLaneId` (string | null)

2. In the main content area, check if `viewMode === 'minimal'`:
   - Render `<MinimalChipGrid>` instead of `<SortableLaneContainer>`
   - Pass lane data with counts
   - Pass `renderLaneContent` function that returns the lane's cards

3. Handle chip click:
   - If same lane clicked, collapse (set to null)
   - If different lane clicked, expand that one

### Phase 3: Remove Footer from Volition Page
**File: `app/my/volition/page.tsx`**

1. Locate and remove any footer component or footer JSX
2. Ensure the main container has no `max-height` or `overflow: hidden`
3. Use `min-h-screen` instead of fixed heights
4. Remove any bottom padding that was accounting for footer

### Phase 4: Ensure Dynamic Page Height
**File: `app/my/volition/page.tsx`**

1. Main container: `min-h-screen` with no max-height
2. Content area: `flex-1` or `flex-grow` to fill available space
3. No `overflow: hidden` on parent containers
4. Expanded content animates height with `framer-motion`

---

## Component Structure (Minimal View)

```
┌─────────────────────────────────────────────────────────┐
│ Header (sticky)                                         │
├─────────────────────────────────────────────────────────┤
│ Dynamic Spotlight                                       │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│ │ Identity(1) │ │ Projects(3) │ │ Articles(2) │        │
│ └─────────────┘ └─────────────┘ └─────────────┘        │
│                 ┌─────────────────────────────┐        │
│                 │ [Expanded Project Cards]    │        │
│                 │ • Project 1                 │        │
│                 │ • Project 2                 │        │
│                 │ • Project 3                 │        │
│                 └─────────────────────────────┘        │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│ │ Learning(5) │ │ Network(12) │ │ Feed(4)     │        │
│ └─────────────┘ └─────────────┘ └─────────────┘        │
│ ┌─────────────┐                                        │
│ │ Impact(-)   │                                        │
│ └─────────────┘                                        │
│                                                         │
│ Quick Actions Bar (fixed bottom)                        │
└─────────────────────────────────────────────────────────┘
```

---

## Files to Modify/Create

| File | Action |
|------|--------|
| `components/volition/MinimalChipGrid.tsx` | CREATE - New chip grid component |
| `app/my/volition/page.tsx` | MODIFY - Add minimal view logic, remove footer |
| `components/volition/MinimalLaneChip.tsx` | CREATE - Individual chip component |

---

## Animation Details

- Chip hover: subtle scale + shadow
- Chip click: brief press animation
- Expand: height animates from 0 with opacity fade-in
- Collapse: reverse of expand

---

## Responsive Breakpoints

- Mobile (< 640px): 1 column
- Tablet (640px - 1024px): 2 columns
- Desktop (> 1024px): 3 columns

---

## Estimated Changes

- ~150 lines: MinimalChipGrid.tsx
- ~50 lines: MinimalLaneChip.tsx
- ~100 lines: volition/page.tsx modifications
