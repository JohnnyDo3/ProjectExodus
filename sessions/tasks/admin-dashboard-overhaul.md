# Admin Dashboard Overhaul

**Created:** December 8, 2025
**Status:** In Progress
**Priority:** High

---

## Objective

Build a comprehensive, full-featured admin dashboard with:
- Real-time WebSocket updates via Pusher
- Granular RBAC permissions system
- Unified moderation queue
- Full audit logging
- Analytics with Recharts
- CSV/PDF exports
- Admin alert system (email + in-app)
- Collapsible sidebar navigation

---

## Current State

### Existing Admin Pages
- `/admin` - Dashboard (placeholder with hardcoded zeros)
- `/admin/products` - Product review (FUNCTIONAL)
- `/admin/products/new` - Create product (FUNCTIONAL)
- `/admin/articles/new` - Create article (FUNCTIONAL)
- `/admin/categories` - Category CRUD (FUNCTIONAL)
- `/admin/tags` - Tag CRUD (FUNCTIONAL)
- `/admin/vendors` - Vendor CRUD (FUNCTIONAL)
- `/admin/users` - User management (UI ONLY - no backend)
- `/admin/settings` - Settings (UI ONLY - no backend)

### Existing API Endpoints
- `GET/POST /api/admin/products` - Product listing
- `POST /api/admin/products/review` - Approve/reject products

### Existing Models
- `AdminLog` - Audit logging with action types
- `Report` - User reports with status tracking
- `Notification` - System notifications
- User roles: USER, EDITOR, MODERATOR, ADMIN, SUPER_ADMIN

---

## Work Log

### Session 1 - December 8, 2025
- [x] Created task file
- [x] Explored current admin system
- [x] Designed comprehensive plan
- [ ] Installing dependencies
- [ ] Adding schema models
- [ ] Implementation in progress...

---

## Implementation Phases

1. **Phase 1** - Layout + Sidebar + Basic RBAC
2. **Phase 2** - Dashboard with real stats + real-time
3. **Phase 4** - User management backend (high priority)
4. **Phase 3** - Moderation queue
5. **Phase 5** - Audit log system
6. **Phase 6** - Analytics
7. **Phase 7** - Exports
8. **Phase 8** - Admin alerts
9. **Phase 9** - Settings backend

---

## Files Created

*(Will be updated as implementation progresses)*

### New Files
- [ ] `app/admin/layout.tsx`
- [ ] `components/admin/AdminSidebar.tsx`
- [ ] `components/admin/AdminHeader.tsx`
- [ ] `components/admin/AdminAlertBell.tsx`
- [ ] `components/admin/AdminPusherProvider.tsx`
- [ ] `app/admin/moderation/page.tsx`
- [ ] `app/admin/audit/page.tsx`
- [ ] `app/admin/analytics/page.tsx`
- [ ] `app/api/admin/stats/route.ts`
- [ ] `app/api/admin/users/route.ts`
- [ ] `app/api/admin/users/[id]/route.ts`
- [ ] `app/api/admin/users/[id]/ban/route.ts`
- [ ] `app/api/admin/reports/route.ts`
- [ ] `app/api/admin/audit/route.ts`
- [ ] `app/api/admin/analytics/route.ts`
- [ ] `app/api/admin/export/route.ts`
- [ ] `app/api/admin/alerts/route.ts`
- [ ] `app/api/admin/settings/route.ts`
- [ ] `app/api/admin/permissions/route.ts`
- [ ] `lib/permissions.ts`
- [ ] `lib/audit.ts`
- [ ] `lib/exports.ts`
- [ ] `lib/admin-emails.ts`

### Modified Files
- [ ] `prisma/schema.prisma`
- [ ] `app/admin/page.tsx`
- [ ] `app/admin/users/page.tsx`
- [ ] `app/admin/settings/page.tsx`
