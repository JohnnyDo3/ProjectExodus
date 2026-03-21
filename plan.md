# Plan: Netflix Billboard + Real-Content Living Archives on Exodus Chronicle

## What We're Doing

Add a **Netflix-style auto-switching billboard** below the Guitar Hero feed on the Community page (Exodus Chronicle) showing real sustainable technology innovations. Keep the Living Archives section below it but update it to show real site content and real sustainability trends.

## Billboard Design (Split Layout)

Each slide is a full-width card with:
- **Left side**: Gradient visual/illustration with tech category icon
- **Right side**: Title, description (2-3 sentences of real info), source/credit, "Learn More" or "Read Article" CTA
- **Auto-rotates every 6 seconds** with progress indicator dots at bottom
- **Manual navigation**: dots clickable, swipe on touch
- **Smooth crossfade transition** between slides

## Content (Real Sustainable Tech — Starter Set)

Research-backed content for the initial billboard slides:

1. **BioCarbon Engineering / Artificial Trees** — Mechanical trees that capture CO₂ 1,000x faster than real trees. Arizona State University's Klaus Lackner developed these using sorbent material that absorbs CO₂ from ambient air.

2. **System 3E (Poland)** — Modular building system using hemp-lime bio-composite walls, achieving near-zero energy certification. Polish company pioneering affordable passive housing with natural materials.

3. **Hemp Insulation (HempWool / Hempitecture)** — R-3.5 per inch, carbon-negative insulation. Absorbs 1.62 tons of CO₂ per ton of hemp grown. Fire-resistant, mold-resistant, breathable. Already used in commercial buildings.

4. **Climeworks (Direct Air Capture)** — World's largest DAC plant "Mammoth" in Iceland. Captures 36,000 tons CO₂/year, stores it underground as rock via Carbfix process. Operational since 2024.

5. **Solein (Solar Foods, Finland)** — Protein powder made from air, water, and electricity via microbial fermentation. Uses 100x less land than soy, 10x less water. EU approved for human consumption 2024.

6. **Seabin Project** — Floating trash collectors for marinas and ports. Each unit removes 1.4 tons of debris/year including microplastics. 900+ units deployed in 52 countries.

## Living Archives Update

Keep the 3-column grid but make content dynamic/real:

1. **Trending Streams** → Show actual trending topics from site articles/discussions (or curated sustainability news topics with real stats)
2. **Recent Milestones** → Show actual site metrics (real user count, article count, project count) instead of static placeholder badges
3. **This Cycle** → Show curated upcoming real-world sustainability events or link to recent site activity

## Changes

### New File: `components/community/SustainableTechBillboard.tsx`
- Self-contained billboard component
- Hardcoded initial content (user will add more later)
- Auto-rotation with pause on hover
- Split layout: visual left, text right
- Progress dots navigation
- Touch swipe support
- Responsive (stacks on mobile)

### Modified: `components/community/CommunityNewspaper.tsx`
- Import and render `SustainableTechBillboard` between Guitar Hero feed and Living Archives
- Update Living Archives to show real content where possible

### No route changes, no new dependencies needed
