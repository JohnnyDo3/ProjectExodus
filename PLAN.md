# Discussions Hub Redesign: "The Living Pulse"

## Concept

A curvilinear, organic activity hub that aggregates ALL platform activity into a living, breathing page. Not a forum. Not a feed. A **living organism** that shows the heartbeat of the entire community.

Think: if the Daily Prophet met a bioluminescent coral reef that reacts to touch.

---

## Available Data Sources (from codebase audit)

| Source | API | What it gives us |
|--------|-----|-----------------|
| Unified Activity | `/api/activity/feed` | new_user, new_post, new_project, new_article, new_event, new_follow, new_comment (7 days) |
| Social Feed | `/api/social/feed` | Posts with comments, likes, hashtags, mentions, media |
| Trending | `/api/social/trending` | Trending hashtags with counts |
| Forum | `/api/forum` | Categories with post/reply counts |
| Project Discussions | `/api/projects/[id]/discussions` | Project-level threads |
| Learning Discussions | `/api/learning/modules/[id]/discussions` | Module Q&A threads |
| Article Comments | Article endpoints | Comments, peer reviews, ratings |
| Notifications | `/api/notifications` | All user alerts |
| Pusher | `lib/pusher.ts` | Real-time WebSocket channels |

---

## Layout Architecture: 5 Zones

### Zone 1: "The Pulse" (Top — Activity Heartbeat)
- Concentric rings that pulse faster/slower based on live activity rate
- Center shows "X active now" count
- Surrounding arc heatmap: 24-hour activity intensity on a curved timeline
- Ticker tape below: smooth auto-scrolling latest activity one-liners
- The rings use the theme system — warm amber at dawn, bright green at day, deep blue at night

### Zone 2: "The Archipelago" (Category Navigation)
- Organic blob-shaped category islands scattered in a non-grid arrangement
- Each island: blob border-radius, slight rotation, gentle floating animation
- Categories: Discussions, Articles, Projects, Learning, Ratings, New Members
- Island SIZE scales with activity volume (busier = bigger)
- Clicking an island filters Zone 3 to that category
- Thin curved SVG lines connect related islands (constellation effect)

### Zone 3: "The River" (Main Content — Curved Bento Grid)
- Bento grid with VARIED border-radius on each card (not uniform rectangles)
- Card shapes cycle: organic rounded, pill-ish, diamond-ish, circle-ish
- Featured/high-engagement items span 2x2 cells
- Cards stagger-animate in on load and when new items arrive
- Gentle "breathing" idle animation (0.5% scale oscillation, 6s cycle)
- New items slide in from the right with a spring animation
- Cover images get the Daily Prophet treatment (Ken Burns hover)
- Wave-shaped clip-path dividers between content zones
- Justified text with Lora serif for post previews

### Zone 4: "The Constellation" (Thread Connections — Optional Toggle)
- Force-directed node graph showing discussion clusters
- Each node = a discussion/post, sized by engagement
- Lines between nodes = replies/connections, thickness = reply count
- Color-coded by category (uses theme CSS vars)
- At night theme: nodes literally glow against dark background
- Hovering a node shows preview tooltip, clicking navigates
- D3 force layout for physics, React SVG for rendering

### Zone 5: "The Shore" (Footer CTA)
- Wave clip-path top edge
- Simple serif CTA: "Start a Discussion" + "Explore Forums"
- Community guidelines note

---

## Moving Parts (Meaningful Motion)

| Animation | Where | Technique | Distracting? |
|-----------|-------|-----------|--------------|
| Pulse rings | Zone 1 | CSS `animate-ping` with dynamic speed | No — ambient, peripheral |
| Ticker scroll | Zone 1 | CSS `translateX` infinite, pauses on hover | No — expected UX pattern |
| Island float | Zone 2 | CSS `translateY` 4px oscillation, 8s ease, staggered | No — very subtle, different timing per island |
| Blob morph | Zone 2 dividers | CSS `border-radius` animation, 10s cycle | No — subconscious only |
| Card stagger entrance | Zone 3 | Motion staggerChildren, spring physics | No — happens once on load |
| Card breathing | Zone 3 | CSS scale 1→1.005, 6s cycle | No — imperceptible unless you stare |
| Ken Burns on images | Zone 3 | CSS `transform: scale(1.05)` over 6s on hover | No — user-triggered only |
| Ripple on new activity | Zone 3 | CSS expanding ring, 1.5s, on new item arrival | No — brief, informational |
| Constellation drift | Zone 4 | D3 force simulation, nodes settle then idle | No — opt-in view only |
| All animations | Everywhere | Disabled via `prefers-reduced-motion` | Accessible |

---

## Curvilinear CSS Techniques

1. **Blob shapes**: `border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%` with keyframe morphing
2. **Wave dividers**: `clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 75% 90%, 50% 95%, 25% 88%, 0% 92%)`
3. **Curved bento cards**: Varied `rounded-[2rem_1rem_2rem_1rem]` per card type
4. **Arc heatmap**: Absolute-positioned cells using `cos/sin` for semicircle placement
5. **River path**: SVG `<path>` with cubic beziers as background decoration

---

## Files to Create/Modify

### New files:
- `app/community/discussions/page.tsx` — Main hub page
- `components/discussions/PulseHeader.tsx` — Zone 1: heartbeat + ticker
- `components/discussions/Archipelago.tsx` — Zone 2: category islands
- `components/discussions/ActivityRiver.tsx` — Zone 3: bento grid
- `components/discussions/ConstellationMap.tsx` — Zone 4: thread graph
- `components/discussions/ActivityCard.tsx` — Shared card component
- `app/api/discussions/hub/route.ts` — Aggregated hub API endpoint

### Modified files:
- `app/globals.css` — Blob keyframes, wave clip-paths, breathing animation
- `package.json` — Add `d3-force` + `@types/d3-force` for constellation (if Zone 4 approved)

---

## Questions for User

See below — need decisions on scope and visual direction before building.
