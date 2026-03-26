# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Project Exodus is a sustainability hub platform featuring products, articles, community forums, learning modules, collaborative documents, architecture games, mind maps, gamification, and social networking with an automatic day/night theme system based on real solar times.

## Architecture Overview

The application is built on **Next.js 16+ App Router** with **React 19**. Authentication uses **NextAuth v5 (beta)** with a split configuration pattern - `auth.config.ts` handles Edge-compatible middleware config while `auth.ts` contains the full Node.js implementation with Prisma and bcrypt. JWT sessions are used with 30-day expiry.

The theme system is the most architecturally unique feature. `TimeThemeProvider` (`components/providers/TimeThemeProvider.tsx`) uses the suncalc library with browser geolocation to calculate real sunrise/sunset times. It exposes theme phase, twilight progress, and sun altitude through context. The `smoothThemeEngine` (`lib/smoothThemeEngine.ts`, ~1,021 lines) handles continuous color interpolation between 24 keyframes across theme states (dawn, sunrise, morning, day, afternoon, dusk, sunset, evening, night, midnight). CSS variables are dynamically updated for seamless transitions.

Real-time collaboration uses **PartyKit + Yjs** for documents and **Pusher** for messaging.

Database access uses a Prisma singleton pattern (`lib/db/prisma.ts`) with a build-time mock fallback to handle builds without DATABASE_URL.

## Key Files

- `app/layout.tsx` - Root layout with provider stack (~147 lines)
- `auth.ts` - Full NextAuth configuration (~161 lines)
- `auth.config.ts` - Edge-compatible auth config for middleware (~82 lines)
- `middleware.ts` - Route protection for admin, auth, profile (~23 lines)
- `prisma/schema.prisma` - Complete database schema (115 models, 51 enums, ~3,340 lines)
- `lib/smoothThemeEngine.ts` - Theme color interpolation engine (~1,021 lines)
- `components/providers/TimeThemeProvider.tsx` - Solar-based theme provider (~235 lines)
- `components/theme/SkyBackground.tsx` - Animated sky background
- `lib/db/prisma.ts` - Database singleton (~40 lines)

## App Routes

35 page routes under `app/` including:
- **Core**: about, admin, dashboard, settings, profile
- **Content**: articles, products, learn, videos, resources
- **Community**: community, discussions, events, network, messages
- **Features**: architecture (games/globe), exodology, explore, fishbowl, marketplace, mindmaps, tools, volition (analytics)
- **Legal/Info**: accessibility, careers, contact, cookies, faq, press, privacy, returns, shipping, support, terms

## API Endpoints

~205 route handlers in `app/api/`. Key groups:
- `auth/` - Registration, NextAuth handlers, email verification
- `products/` - Product CRUD with sustainability metrics
- `articles/` - Article management with read tracking, chunked upload, PDF/DOCX parsing
- `users/` - Profile management
- `connections/` - Social connections system
- `learn/` - Learning modules progress
- `messages/` - Direct messaging (Pusher real-time)
- `admin/` - Analytics, moderation, alerts, reports, audit, user management
- `architecture/` - Games, leaderboard, stats
- `community/` - Forums
- `documents/` - Collaborative document system
- `exodology/` - Certification and progress
- `gamification/` - Points, achievements, badges, streaks
- `mindmaps/` - Mind map CRUD
- `network/` - Social networking
- `projects/` - Project management
- `search/` - Site-wide search
- `social/` - Social posts and interactions
- `vendors/` - Vendor management

## Provider Stack (app/layout.tsx)

```
SessionProvider → TimeThemeProvider → SkyThemeProvider → DigitalScrollProvider → SageProvider → MainLayoutWrapper → Toaster
```

## Integration Points

### External Services
- **PostgreSQL** via Prisma (Neon serverless recommended)
- **Pusher** for real-time messaging (`lib/pusher.ts`)
- **PartyKit + Yjs** for real-time document collaboration
- **Cloudinary** for image hosting (`lib/cloudinary.ts`)
- **UploadThing** for file uploads (`lib/uploadthing.ts`)
- **Optional OAuth**: Google, GitHub

### Major Dependencies
- **Framework**: Next.js 16, React 19
- **Auth**: next-auth 5.0.0-beta.30, @auth/prisma-adapter
- **Database**: Prisma 6.19
- **Rich Text**: @tiptap/* (full editor with tables, links, images, collaboration)
- **UI**: @radix-ui/*, framer-motion, gsap
- **Visualization**: three.js, react-globe.gl, force-graph, recharts
- **Forms**: react-hook-form, zod
- **Drag & Drop**: @dnd-kit/*

## Configuration

Required env vars: `DATABASE_URL`, `AUTH_SECRET`
Optional: `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`, `PUSHER_*`, `CLOUDINARY_*`, `UPLOADTHING_*`

See `.env.example` for full list with setup instructions.

## Commands Reference

Development: `npm run dev`
Build: `npm run build`
Lint: `npm run lint`
Database: `npm run db:generate`, `npm run db:push`, `npm run db:studio`, `npm run db:seed`, `npm run db:seed:products`, `npm run db:seed:expansion`
PartyKit: `npm run party:dev`, `npm run party:deploy`

## Key Patterns

- **Auth split pattern** for Edge compatibility - `auth.config.ts` vs `auth.ts`
- **Theme system** uses CSS variables (`--background`, `--foreground`, `--primary`, etc.) - see `app/globals.css`
- **Theme classes** on html element: `.day`, `.night`, `.sunrise`, `.sunset` - see `app/layout.tsx`
- **User roles**: USER, EDITOR, MODERATOR, ADMIN, SUPER_ADMIN - see `prisma/schema.prisma`
- **Server-side learning content** - 16K+ lines of learning content loaded server-side to reduce client bundle
- **Chunked file uploads** for articles (PDF, DOCX parsing)
- **Gamification** throughout: points, achievements, streaks, badges, leaderboards

## Related Documentation

- `DAY_NIGHT_SYSTEM.md` - Theme system explanation
- `DATABASE_SETUP.md` - Database configuration
- `DEPLOYMENT.md` - Vercel deployment guide
- `LEARNING_MODULES_GUIDE.md` - Learning system documentation
