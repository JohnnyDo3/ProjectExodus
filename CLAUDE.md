# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Project Exodus is a sustainability hub platform featuring products, articles, community forums, learning modules, and social networking with an automatic day/night theme system based on real solar times.

## Narrative Summary

The application is built on Next.js 14+ App Router with React 19. Authentication uses NextAuth v5 (beta) with a split configuration pattern - `auth.config.ts:5-37` handles Edge-compatible middleware config while `auth.ts:9-102` contains the full Node.js implementation with Prisma and bcrypt. JWT sessions are used with 30-day expiry.

The theme system is the most architecturally unique feature. `TimeThemeProvider` (`components/providers/TimeThemeProvider.tsx:1-292`) uses the suncalc library with browser geolocation to calculate real sunrise/sunset times. It exposes theme phase, twilight progress, and sun altitude through context. The `smoothThemeEngine` (`lib/smoothThemeEngine.ts:1-841`) handles continuous color interpolation between theme states (dawn, sunrise, morning, day, afternoon, dusk, sunset, evening, night, midnight). CSS variables are dynamically updated for seamless transitions.

Database access uses a Prisma singleton pattern (`lib/db/prisma.ts:1-38`) with a build-time mock fallback to handle builds without DATABASE_URL.

## Key Files

- `app/layout.tsx:58-171` - Root layout with provider stack
- `auth.ts:9-102` - Full NextAuth configuration
- `auth.config.ts:5-37` - Edge-compatible auth config for middleware
- `middleware.ts:1-13` - Route protection (admin, auth, profile)
- `prisma/schema.prisma:1-973` - Complete database schema (30+ models)
- `lib/smoothThemeEngine.ts:1-841` - Theme color interpolation engine
- `components/providers/TimeThemeProvider.tsx:1-292` - Solar-based theme provider
- `components/theme/SkyBackground.tsx` - Animated sky background
- `lib/db/prisma.ts:1-38` - Database singleton

## API Endpoints

69 route handlers in `app/api/`. Key groups:
- `app/api/auth/` - Registration, NextAuth handlers
- `app/api/products/` - Product CRUD with sustainability metrics
- `app/api/articles/` - Article management with read tracking
- `app/api/users/` - Profile management
- `app/api/connections/` - Social connections system
- `app/api/learn/` - Learning modules progress
- `app/api/messages/` - Direct messaging (Pusher real-time)

## Integration Points

### External Services
- PostgreSQL via Prisma (Neon serverless recommended)
- Pusher for real-time messaging (`lib/pusher.ts`)
- Optional OAuth: Google, GitHub

### Provider Stack (app/layout.tsx:128-166)
SessionProvider → TimeThemeProvider → SkyThemeProvider wraps the entire app

## Configuration

Required env vars: `DATABASE_URL`, `AUTH_SECRET`
Optional: `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`, `PUSHER_*`

See `.env.example` for full list with setup instructions.

## Commands Reference

Development: `npm run dev`
Build: `npm run build`
Lint: `npm run lint`
Database: `npm run db:generate`, `npm run db:push`, `npm run db:studio`, `npm run db:seed`

## Key Patterns

- Auth split pattern for Edge compatibility - see `auth.config.ts` vs `auth.ts`
- Theme system uses CSS variables (`--background`, `--foreground`, `--primary`, etc.) - see `app/globals.css`
- Theme classes on html element: `.day`, `.night`, `.sunrise`, `.sunset` - see `app/layout.tsx:72-122`
- User roles: USER, EDITOR, MODERATOR, ADMIN, SUPER_ADMIN - see `prisma/schema.prisma:95-100`

## Related Documentation

- `DAY_NIGHT_SYSTEM.md` - Theme system explanation
- `DATABASE_SETUP.md` - Database configuration
- `DEPLOYMENT.md` - Vercel deployment guide
- `LEARNING_MODULES_GUIDE.md` - Learning system documentation
