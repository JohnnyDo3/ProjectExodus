# Theme Preference System - Migration Guide

## Overview

This document describes the new user theme preference system that allows users to choose their preferred visual theme and persist it across sessions.

## Database Changes

### New Field Added to User Model

```prisma
model User {
  // ... existing fields ...
  themePreference String?   @default("auto") // Theme mode: auto, light, dark, sunrise, sunset, dusk
  // ... rest of fields ...
}
```

## Migration Steps

### 1. Generate Prisma Client

```bash
npm run db:generate
```

### 2. Push Schema to Database

```bash
npm run db:push
```

**OR** if using migrations:

```bash
npx prisma migrate dev --name add_theme_preference
```

### 3. Verify Migration

Check that the `themePreference` column exists in the `User` table:

```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'User' AND column_name = 'themePreference';
```

## Available Theme Modes

1. **auto** - Follows solar cycle based on user's location (default)
2. **light** - Always bright/day theme
3. **dark** - Always dark/night theme
4. **sunrise** - Fixed warm morning golden hour
5. **sunset** - Fixed beautiful evening colors
6. **dusk** - Fixed peaceful twilight mood

## API Endpoints

### GET /api/users/theme
Retrieves the current user's theme preference.

**Response:**
```json
{
  "themePreference": "auto"
}
```

### PUT /api/users/theme
Updates the current user's theme preference.

**Request:**
```json
{
  "themePreference": "dark"
}
```

**Response:**
```json
{
  "success": true,
  "themePreference": "dark"
}
```

## How It Works

1. **Guest Users**: Theme preference stored in browser localStorage only
2. **Logged-in Users**: Theme preference stored in both localStorage AND database
3. **On Login**: Database preference syncs to localStorage automatically
4. **On Theme Change**: Saves to both localStorage (instant) and database (for persistence)

## User Interface

The theme selector is located in the header navigation:
- Desktop: Top-right area, next to user profile
- Mobile: In the mobile menu

The interface uses simple, child-friendly language:
- "Auto (Follows Sun)" - Changes with real sunrise and sunset
- "Light (Always Day)" - Bright and sunny, all the time
- "Dark (Always Night)" - Dark and starry, all the time
- "Sunrise" - Warm morning golden hour
- "Sunset" - Beautiful evening colors
- "Dusk" - Peaceful twilight mood

## Technical Implementation

### Key Files Modified

1. **prisma/schema.prisma** - Added themePreference field
2. **lib/smoothThemeEngine.ts** - Updated UserPreferences type and added getFixedModeColors()
3. **components/providers/TimeThemeProvider.tsx** - Added database sync on login
4. **components/ui/ThemeToggle.tsx** - Enhanced with all 6 theme options and database saving
5. **app/api/users/theme/route.ts** - New API endpoint for theme management

## Rollback

If you need to rollback this feature:

```sql
ALTER TABLE "User" DROP COLUMN "themePreference";
```

Then regenerate Prisma client:

```bash
npm run db:generate
```
