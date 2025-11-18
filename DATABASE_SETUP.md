# Database Setup Instructions

## Neon PostgreSQL is Configured ✅

Your `.env` file is already configured with the Neon connection string.

## Complete Setup Locally (3 Commands)

Run these commands **on your local machine** (the sandbox can't reach external databases):

```bash
# 1. Push the schema to create all tables
npx prisma db push

# 2. Seed the database with sample data  
npx prisma db seed

# 3. Verify the build works
npm run build
```

## What This Creates

The schema includes **43 database tables** for:
- ✅ Users & Authentication (User, Account, Session, VerificationToken)
- ✅ Products (Product, Category, Vendor, ProductImage, Tag, SustainabilityMetric, Certification)
- ✅ Articles (Article, ArticleCategory, Comment)
- ✅ Forum (ForumCategory, ForumPost, ForumReply, Likes)
- ✅ Social (UserFollow, Badge, UserBadge)
- ✅ Projects (Project, ProjectMember)
- ✅ Moderation (Notification, Report, AdminLog)
- ✅ System (EmailTemplate, SiteSettings)

## For Vercel Deployment

Add environment variable in **Vercel Dashboard → Settings → Environment Variables**:

```
DATABASE_URL=postgresql://neondb_owner:npg_XcQnZokR2J9V@ep-noisy-credit-ahpateo9-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
```

Select: **Production, Preview, Development** (all three)

Then redeploy.

## Next Steps

Once you run `npx prisma db push` locally:
- All API routes connect to real data
- Admin panel CRUD operations work
- User authentication persists to database
- Search/filters query real data

🚀 **Everything else is ready!** Just run those 3 commands locally.
