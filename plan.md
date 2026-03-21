# Plan: Move Community Page to "Current Events" in Dropdown

## What We're Doing

The `/community` page (the "Exodus Chronicle" — the newspaper-style community dashboard) currently has two access points:
1. Clicking the "Community" text in the header navigates directly to `/community`
2. The Community dropdown shows: Discussions, Initiatives, Fish Tank

**Goal:** Make the "Community" header link NOT navigate directly to `/community`. Instead, add the Chronicle page as the **first item** in the Community dropdown, titled **"Current Events"**. The "Community" text in the header should only open the dropdown (not navigate anywhere on click).

This mirrors how the Learn dropdown works — "Learn" in the header is a dropdown trigger with "Sustainability" as the first item linking to `/learn`.

## Changes

### File: `components/layout/Header.tsx`

#### 1. Update `communityMenuItems` array (line 159-163)
Add "Current Events" as the **first item**, pointing to `/community`:

```ts
const communityMenuItems = [
  { label: 'Current Events', href: '/community', myLabel: 'Current Events' },
  { label: 'Discussions', href: '/community/discussions', myLabel: 'Discussions' },
  { label: 'Initiatives', href: '/community/projects', myLabel: 'Initiatives' },
  { label: 'Fish Tank', href: '/fishbowl', myLabel: 'Fish Tank' },
]
```

#### 2. Change desktop Community link behavior (lines 314-315)
Currently it's `<Link href="/community">` which navigates on click. Change it to a `<button>` that only toggles the dropdown — just like Learn works as a dropdown-only trigger.

Before:
```tsx
<Link href="/community" className="...">
  Community
  <ChevronDown ... />
</Link>
```

After:
```tsx
<button onClick={() => setCommunityMenuOpen(!communityMenuOpen)} className="...">
  Community
  <ChevronDown ... />
</button>
```

#### 3. Update mobile menu (around line 626-656)
The mobile "Community Features" section already maps over `communityMenuItems` — adding "Current Events" to the array means it will automatically appear there as the first item too. No extra changes needed.

## What Does NOT Change
- The `/community` page itself — it stays as-is (the Exodus Chronicle)
- The route `/community` still works if navigated to directly
- All other dropdown items stay the same
- The Learn dropdown stays the same
- The top 10 leaderboard in the Community dropdown stays

## Summary
- **1 file changed:** `components/layout/Header.tsx`
- Add "Current Events" → `/community` as first community dropdown item
- Make "Community" header text a hover-only dropdown trigger (no direct navigation on click)
