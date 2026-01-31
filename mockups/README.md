# Project Exodus - Design Mockups

Comprehensive visual mockups and design system documentation for the Project Exodus sustainability platform.

## 📁 Files

### `index.html` - Interactive Mockup Viewer
**[OPEN THIS FILE TO VIEW MOCKUPS]**

An interactive showcase featuring:

- **Homepage** - Main landing page with hero, features, and impact stats
- **Exodology Hub** - Learning platform with course cards and progress tracking
- **Community Newspaper** - Unique newspaper-style layout with featured content and sidebar
- **Sustainable Marketplace** - Product grid with sustainability scores
- **User Dashboard** - Personalized hub with learning progress and projects

**Features:**
- ☀️ Day/Night theme toggle to see the time-based color system
- 🖥️ Browser chrome simulation for realistic presentation
- 📱 Responsive design patterns
- ✨ Interactive hover states and animations

### `design-system.html` - Design System Guide
Complete documentation of the design language including:

- **Design Principles** - Living & breathing, earthy & organic, bold & confident
- **Color Palette** - All color families (Moss Green, Terracotta, Ocean Blue, Earth Brown, Sand, Night)
- **Living Theme System** - Day/night comparison and time-based phases
- **Typography** - Complete type scale with specifications
- **Components** - Buttons, cards, badges with code specs
- **Spacing System** - Visual spacing scale
- **Iconography** - Icon library with semantic meanings

## 🎨 Design Highlights

### Time-Based Theme System
The most unique feature of Project Exodus is its **living theme system** that adapts throughout the day:

- **Dawn (5-7am)** - Pink & coral hues
- **Sunrise (7-10am)** - Golden morning light
- **Day (10am-3pm)** - Bright & vibrant
- **Afternoon (3pm-6pm)** - Warm light
- **Dusk (6-8pm)** - Deep orange
- **Sunset (8pm-10pm)** - Terracotta warmth
- **Night (10pm-2am)** - Cosmic galaxy blues
- **Midnight (2am-5am)** - Deep space

Colors smoothly interpolate every 30 seconds using real solar calculations based on geolocation.

### Key Visual Elements

1. **Bold Typography** - 900 font-weight headings with gradient effects
2. **Thick Borders** - 4px borders on all interactive elements
3. **Earthy Colors** - Moss green (#36763d), Terracotta (#d46643), Ocean blue (#429393)
4. **Card Design** - Gradient top accent bars, hover lift effects
5. **Organic Shapes** - Rounded corners (12-16px), flowing animations

### Component Patterns

- **Hero Sections** - Full viewport with gradient backgrounds and sun ray effects
- **Card Grids** - 3-column responsive layouts with thick colored borders
- **Learning Cards** - Gradient headers, progress bars, badge tags
- **Gamification** - Points, leaderboards, achievement badges
- **Newspaper Layout** - 2-column grid (featured + sidebar)

## 🚀 How to View

### Option 1: Open in Browser
Simply open `index.html` in any modern web browser to explore the interactive mockups.

### Option 2: Local Server
```bash
# From the mockups directory
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

## 📐 Technical Specifications

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large: > 1280px

### Container Max-Widths
- Default: 1280px (6xl)
- Narrow: 900px (for article content)

### Touch Targets
- Minimum: 44px × 44px (WCAG AAA compliance)

### Accessibility
- Color contrast ratios: 4.5:1 minimum for text
- Focus states: 2px solid outline with offset
- Semantic HTML throughout
- Screen reader friendly labels

## 🎯 Use Cases

These mockups demonstrate:

1. **Visual Design Language** - How colors, typography, and spacing work together
2. **Component Library** - Reusable UI patterns across pages
3. **Layout Patterns** - Grid systems and responsive behavior
4. **Theme System** - Day/night mode transitions
5. **User Flows** - Navigation and information architecture
6. **Brand Identity** - Consistent earthy, sustainable aesthetic

## 📝 Notes for Developers

- CSS uses custom properties (CSS variables) for theming
- All animations use `cubic-bezier(0.4, 0, 0.2, 1)` easing
- Transitions: 300-600ms for interactions, 800ms for theme changes
- Gradient backgrounds use `linear-gradient(135deg, ...)` consistently
- Card hover states: `translateY(-4px)` + shadow expansion

## 🌟 Future Enhancements

Potential additions to mockups:
- Mobile-specific views
- Animation demos
- Micro-interaction examples
- Form designs
- Error states
- Loading states
- Empty states
- Onboarding flows

---

**Built for Project Exodus** - A sustainability hub platform with a living, breathing design system 🌍
