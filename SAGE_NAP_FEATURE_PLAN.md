# Sage Nap Feature - Implementation Plan

## Overview
Add a "nap" feature to Sage AI where she can float up to the header logo and sleep, showing zzz animations until awakened by clicking the header icon.

## Behavior Summary

### Awake State (Default)
- Sage floats in bottom-right corner as usual
- Hover reveals a small moon icon to trigger nap
- Chat functionality works normally

### Nap Animation
1. User clicks moon icon on Sage button
2. Store Sage's current position in memory
3. Sage icon animates in an arc trajectory up to the header logo
4. Sage "merges" with the header leaf icon (same icon, perfect overlay)
5. Floating Sage button disappears
6. Header logo starts showing zzz animation

### Napping State
- Sage button is hidden
- Header leaf icon shows floating "z z z" animation
- Header icon is clickable to wake Sage
- PROJECT EXODUS text still links to home (icon does NOT)

### Wake Animation
1. User clicks the sleeping header icon
2. Sage icon "pops" out of header position
3. Animates in arc trajectory back to last saved position
4. Floating Sage button reappears
5. zzz animation stops

### Session Behavior
- **Page refresh**: Sage wakes up in default position
- **No localStorage persistence**: Session-only state

## Files to Create

### 1. `components/ai/SageContext.tsx`
React context for sharing nap state between Header and ProjectExodusAI.

```typescript
interface SageContextValue {
  // State
  isNapping: boolean
  isAnimating: boolean
  animationPhase: 'idle' | 'going-to-nap' | 'waking-up'
  lastPosition: { x: number; y: number } | null

  // Refs for animation coordinates
  sageButtonRef: React.RefObject<HTMLButtonElement | null>
  headerLogoRef: React.RefObject<HTMLDivElement | null>

  // Actions
  startNap: () => void
  wakeUp: () => void
  setLastPosition: (pos: { x: number; y: number }) => void
  onAnimationComplete: () => void
}
```

### 2. `components/ai/SageTeleportAnimation.tsx`
Portal-rendered flying Sage animation during transitions.

- Uses Framer Motion for smooth arc animation
- Renders via React Portal to escape any overflow:hidden containers
- Fixed positioning, animates between coordinates
- Shows the same leaf icon during flight

## Files to Modify

### 1. `components/ai/ProjectExodusAI.tsx`

Changes:
- Import and use SageContext
- Add moon icon sleep button (appears on hover)
- Hide Sage button when napping (after animation)
- Register button ref with context
- Close chat if open before napping

New elements:
```tsx
{/* Sleep button - same size as notification badge (w-5 h-5) */}
{/* Positioned opposite corner from notification */}
<button
  onClick={startNap}
  className="absolute -top-1 -left-1 w-5 h-5 rounded-full
             bg-gradient-to-br from-indigo-500 to-purple-600
             flex items-center justify-center shadow-lg
             opacity-0 group-hover:opacity-100 transition-opacity"
  title="Let Sage nap"
>
  <Moon className="w-2.5 h-2.5 text-white" />
</button>
```

Position logic:
- Notification badge: `-top-1 -right-1` (top-right corner)
- Sleep button: `-top-1 -left-1` (top-left corner, opposite side)

### 2. `components/layout/Header.tsx`

Changes:
- Import and use SageContext
- Separate logo icon from text link
- Add ref to logo div for animation coordinates
- Add zzz animation elements when napping
- Make logo clickable to wake when napping
- Prevent home navigation on icon click

Structure change:
```tsx
{/* BEFORE */}
<Link href="/" className="flex items-center gap-2">
  <div className="logo-icon">
    <Leaf />
  </div>
  <span>PROJECT EXODUS</span>
</Link>

{/* AFTER */}
<div className="flex items-center gap-2">
  <div
    ref={headerLogoRef}
    onClick={isNapping ? wakeUp : undefined}
    className={isNapping ? 'cursor-pointer' : ''}
  >
    <Leaf />
    {isNapping && <ZzzAnimation />}
  </div>
  <Link href="/">
    <span>PROJECT EXODUS</span>
  </Link>
</div>
```

### 3. `app/layout.tsx`

Add SageProvider to the provider stack:
```tsx
<SessionProvider>
  <SageProvider>
    <TimeThemeProvider>
      ...
    </TimeThemeProvider>
  </SageProvider>
</SessionProvider>
```

### 4. `app/globals.css`

Add zzz animation keyframes:
```css
@keyframes sage-zzz-float {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(0) scale(0.5);
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-16px) translateX(8px) scale(1);
  }
}

.sage-zzz {
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  pointer-events: none;
}

.sage-zzz-1 {
  top: -4px;
  right: -2px;
  animation: sage-zzz-float 2s ease-out infinite;
}
.sage-zzz-2 {
  top: -8px;
  right: 2px;
  animation: sage-zzz-float 2s ease-out 0.6s infinite;
}
.sage-zzz-3 {
  top: -4px;
  right: 6px;
  animation: sage-zzz-float 2s ease-out 1.2s infinite;
}
```

## Animation Details

### Arc Trajectory
Using Framer Motion keyframes for natural arc:

```typescript
// Nap: Sage → Header
animate={{
  x: [startX, midX, endX],
  y: [startY, midY - 80, endY], // Arc upward
  scale: [1, 1.15, 0.9], // Slight grow then shrink to header size
}}
transition={{
  duration: 0.7,
  ease: [0.34, 1.56, 0.64, 1], // Custom bounce easing
}}

// Wake: Header → Sage
animate={{
  x: [startX, midX, endX],
  y: [startY, midY + 40, endY], // Arc downward
  scale: [0.9, 1.1, 1],
}}
```

### Coordinate Calculation
```typescript
const getSagePosition = () => {
  const rect = sageButtonRef.current?.getBoundingClientRect()
  return rect ? {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  } : null
}

const getHeaderPosition = () => {
  const rect = headerLogoRef.current?.getBoundingClientRect()
  return rect ? {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  } : null
}
```

## Edge Cases

1. **Chat window open when napping**
   - Close chat window first, then start nap animation

2. **Animation interrupted by page navigation**
   - Let Next.js handle cleanup, state resets on new page

3. **Header hidden while napping (Digital Scroll open)**
   - Sage stays "napping" conceptually
   - When header becomes visible again, zzz still shows
   - Could optionally show a small wake indicator at bottom-right

4. **Mobile viewport**
   - Same behavior, animation arc adjusts to screen size
   - Sleep button may need larger touch target

5. **Reduced motion preference**
   - Check `prefers-reduced-motion`
   - If enabled, instant position change instead of animation

## Implementation Order

1. Create `SageContext.tsx` with all state and actions
2. Create `SageTeleportAnimation.tsx` with Framer Motion
3. Add CSS keyframes to `globals.css`
4. Modify `Header.tsx` to separate icon from text link, add zzz
5. Modify `ProjectExodusAI.tsx` to add sleep button and consume context
6. Add `SageProvider` to `layout.tsx`
7. Test all animations and edge cases

## Testing Checklist

- [ ] Sage nap animation plays smoothly
- [ ] Sage merges perfectly with header icon position
- [ ] Zzz animation visible and properly positioned
- [ ] Clicking header icon wakes Sage
- [ ] Sage returns to last position on wake
- [ ] PROJECT EXODUS text still links to home
- [ ] Header icon does NOT link to home
- [ ] Page refresh resets Sage to default position
- [ ] Chat closes before nap animation
- [ ] Works on mobile viewport
- [ ] Respects reduced motion preference
