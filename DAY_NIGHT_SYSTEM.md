# 🌅 Day/Night System - Living, Breathing Themes

Project Exodus now features a **fully automatic time-based theme system** that adapts to your local sunrise and sunset times!

## 🌍 How It Works

The website automatically changes its appearance based on **your actual location's sunrise/sunset times** using the `suncalc` library and browser geolocation.

### Four Time Periods

1. **🌅 Sunrise** (1 hour before → 1 hour after sunrise)
   - Soft golden dawn colors
   - Warm, gentle awakening energy
   - Perfect for early morning browsing

2. **☀️ Day** (After sunrise period → Before sunset period)
   - Bright, vibrant, full of life
   - Fresh moss greens and natural tones
   - Energizing and clear

3. **🌇 Sunset** (1 hour before → 1 hour after sunset)
   - Warm terracotta and golden hour vibes
   - Peaceful transition energy
   - Cozy evening atmosphere

4. **🌙 Night** (After sunset period → Before sunrise period)
   - Deep earth tones
   - Restful darkness
   - Easy on the eyes

## 🎮 User Controls

Users can choose between three modes via the theme toggle in the header:

- **Auto Mode** (🕐): Automatically syncs with local time (uses geolocation for real sunrise/sunset)
- **Morning Mode** (☀️): Locks to bright day theme
- **Night Mode** (🌙): Locks to dark theme

Preferences are saved in `localStorage`.

## 🎨 Technical Implementation

### CSS Variables

All themes use CSS variables that automatically update:

```css
--background
--foreground
--primary
--secondary
--accent
--muted
--card
--border
```

### Key Components

1. **TimeThemeProvider** (`components/providers/TimeThemeProvider.tsx`)
   - Handles geolocation
   - Calculates sunrise/sunset with `suncalc`
   - Updates theme every minute
   - Fallback to time-based calculation if location unavailable

2. **ThemeToggle** (`components/ui/ThemeToggle.tsx`)
   - Beautiful dropdown with 3 mode options
   - Shows current theme status
   - Saves user preference

3. **Theme-Aware Components**
   - Button, Card, Input components use CSS variables
   - Header and navigation adapt to time
   - Smooth 1.2s transitions between themes

### Utility Classes

New theme-adaptive classes available:

```css
.bg-theme-primary
.text-theme-primary
.border-theme-primary
.shadow-theme
.glass-theme
/* and more... */
```

### Smooth Transitions

All theme changes feature organic 1200ms transitions with easing for a natural, breathing feel.

## 🚀 What's Covered

- ✅ All UI components (Button, Card, Input, etc.)
- ✅ Header and Footer
- ✅ Navigation
- ✅ Form elements
- ✅ Backgrounds and text
- ✅ Borders and shadows
- ✅ Smooth transitions

## 🌱 The Vibe

The entire site now **breathes with nature** - adapting to the natural light cycle just like the real world. It's a living, organic experience that makes sustainability feel... sustainable.

---

**Made with 🌱 by Sage**
