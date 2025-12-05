# Peer Reviews System Implementation

**Status:** Completed
**Date:** December 5, 2025

## Summary

Implemented a Reddit-style peer review system for articles with threaded comments, author badges, and unlimited reply depth.

## Problem

The peer review system was completely broken:
- `PeerReviewWidget` was calling `/api/articles/${articleId}/reviews` - an endpoint that didn't exist
- No `ArticlePeerReview` model in the database schema
- Article API didn't return `peerReviews`
- UI always showed "No peer reviews yet" because data was always empty

## Solution

### Database Changes

Added `ArticlePeerReview` model to `prisma/schema.prisma`:
- Self-referencing for unlimited nested replies (`parentId` -> `parent`/`replies`)
- Rating fields (overall, accuracy, clarity, relevance) for top-level reviews
- Replies don't require ratings (just content)
- Relations to `Article` and `User` models

### API Endpoints

Created `/api/articles/[slug]/reviews/route.ts`:
- `GET` - Fetch all peer reviews with nested tree structure
- `POST` - Create review or reply (requires auth)
- `DELETE` - Delete own review (cascades to replies)

Features:
- Returns `articleAuthorId` for author badge logic
- Users can only submit one top-level review per article
- Replies require only content (no ratings)

### Frontend Components

1. **`PeerReviewWidget.tsx`** (sidebar summary):
   - Shows average ratings (overall, accuracy, clarity, relevance)
   - Displays review count and reply count
   - Preview of latest review
   - "View All Reviews" button scrolls to full section

2. **`ArticleReviewSection.tsx`** (full Reddit-style):
   - Recursive `ReviewThread` component for unlimited nesting
   - Gold star badge + "Author" label for article author
   - Reply button on each comment
   - Delete button for own reviews
   - Collapse/expand nested threads
   - Rating form for new reviews
   - Simple text form for replies

### Article Page Updates

Updated `app/articles/[slug]/page.tsx`:
- Added `ArticleReviewSection` below article content
- Kept `PeerReviewWidget` in sidebar
- Pass `articleAuthorId` for author badge logic

## Files Modified

1. `prisma/schema.prisma` - Added ArticlePeerReview model + relations
2. `app/api/articles/[slug]/reviews/route.ts` - NEW - CRUD for reviews
3. `app/api/articles/[slug]/route.ts` - Include peerReviews in response
4. `components/article/PeerReviewWidget.tsx` - Simplified to summary widget
5. `components/article/ArticleReviewSection.tsx` - NEW - Full Reddit-style section
6. `app/articles/[slug]/page.tsx` - Added review section, pass authorId

## Design Decisions

- **Layout:** Summary in sidebar + full Reddit-style section below article
- **Reply Depth:** Unlimited nesting (like Reddit)
- **One Review Per User:** Users can submit one top-level review per article
- **Replies:** Unlimited replies, no ratings required
- **Author Badge:** Gold gradient with Award icon + "Author" text

## Testing

- Build passes (`npm run build`)
- TypeScript compiles without errors
- Database schema synced successfully
