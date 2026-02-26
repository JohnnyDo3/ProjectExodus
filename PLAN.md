# Projects Page Redesign: "Daily Prophet" Newspaper Layout

## Design Decisions (from user)
- Keep all 4 views — polish each with newspaper treatment
- No photo frame when project has no cover image
- Broadsheet dense: 6-column grid, tight gutters, justified text
- Start with Playfair Display + Lora fonts, ask user to evaluate vs system serif after

---

## Plan

### Step 1: Typography Foundation
- Add `Playfair Display` (headline/masthead) and `Lora` (body text) via `next/font/google` in layout
- Define CSS custom properties: `--font-newspaper-headline`, `--font-newspaper-body`
- Add utility classes to `globals.css`
- Replace all inline `fontFamily: serif` with proper font classes

### Step 2: Redesign Masthead (Hero Section)
- Compact ~180px masthead, not a large hero
- Centered `Playfair Display Black` title: "COMMUNITY PROJECTS"
- Dateline below: "Est. 2024 | Vol. II | February 25, 2026"
- Thin 1px rules above and below (replace 4px/8px double borders)
- Italic serif subtitle
- Responsive headline: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`

### Step 3: Polish All 4 Views with Newspaper Treatment

**Newspaper View (primary/default)**
- 6-column CSS Grid broadsheet layout
- Lead project spans 3+ columns with large headline
- Secondary projects in 2-column cards with thin column rules
- Sidebar briefs for remaining projects
- Column rules via `border-right: 1px solid var(--border)`
- Justified text with `hyphens: auto`

**Grid View**
- 3-column grid (responsive: 1→2→3 columns)
- Each card: bordered newspaper "box", serif headlines, thin rules
- Compact info: title, byline, status badge

**Compact/List View**
- Dense single-column list
- Each row: horizontal rule separator, title, creator, status, member count inline
- Newspaper classified-ad density

**Magazine View**
- 2-column layout with larger images
- Cards have more breathing room but still newspaper typography
- Pull-quote style descriptions

### Step 4: Redesign Project Cards
- Remove drop caps entirely
- Headline in Playfair Display (size varies by grid position)
- Byline: "By {Creator} | {Members} contributors | {Status}"
- Description in Lora with `text-align: justify` and `hyphens: auto`
- Mission/goal as indented pull quote with left border accent
- Thin 1px horizontal rules between cards

### Step 5: "Daily Prophet" Photo Frames (only when image exists)
- Bordered container with `overflow: hidden`
- On hover: slow Ken Burns zoom (`scale(1.05)` over 6s ease)
- When no image: no frame shown at all — text flows naturally
- `prefers-reduced-motion`: disable hover animations

### Step 6: Stats Section Cleanup
- Thin single-line borders (not double)
- Responsive: `grid-cols-1 sm:grid-cols-3`
- Numbers in Playfair Display, labels in small caps

### Step 7: Simplify CTAs
- One "Start a Project" button in masthead area
- One "classified ad" style CTA at bottom
- Remove redundant CTAs from cards

### Step 8: Border/Color Cleanup
- Replace `border-4`, `border-8`, `border-double` with 1px borders
- `border-double` ONLY on masthead outer frame
- Warm `var(--muted)` for sections
- No gradient backgrounds

### Step 9: View Selector Cleanup
- Keep floating widget but simplify styling
- Remove `animate-pulse` from active icon
- Clean transitions

### Step 10: Empty State
- Clean serif headline, thin borders, single CTA

---

## Files to Modify
1. `app/layout.tsx` — Add Playfair Display + Lora fonts, set CSS vars
2. `app/globals.css` — Newspaper utility classes, font vars
3. `app/community/projects/page.tsx` — Full page rewrite with all 4 polished views
