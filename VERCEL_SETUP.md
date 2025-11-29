# Vercel Deployment Setup Guide

## Initial Setup

### 1. Configure Environment Variables in Vercel

Go to your Vercel project settings and add these environment variables:

#### Required Variables:
```bash
DATABASE_URL="postgresql://user:password@host.region.neon.tech/database?sslmode=require"
NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_API_URL="https://your-domain.vercel.app"
```

#### Get your Neon Database URL:
1. Go to your [Neon Console](https://console.neon.tech)
2. Select your project
3. Click "Connection Details"
4. Copy the connection string (make sure it includes `?sslmode=require`)

### 2. First Deployment

Push your code to trigger a Vercel build:
```bash
git push origin main
```

The build should now succeed with the TypeScript fix.

### 3. Seed Your Database

**Option A: Using Vercel CLI (Recommended)**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link your project:
```bash
vercel link
```

4. Pull environment variables:
```bash
vercel env pull .env.local
```

5. Run the database setup:
```bash
npm run setup:db
```

**Option B: Manual Seed (Local)**

1. Pull your environment variables locally (as in Option A step 4)

2. Run the seed script:
```bash
npm run db:seed
```

### 4. Verify Your Data

After seeding, visit your deployed app:
- `/products` - Should show 2 sample products
- `/learn` - Should show 1 sample article
- `/community/forum` - Should show forum posts

## Database Schema Updates

When you update your Prisma schema:

1. Push schema changes:
```bash
npx prisma db push
```

2. Generate Prisma Client:
```bash
npx prisma generate
```

3. Commit the changes and deploy:
```bash
git add .
git commit -m "Update database schema"
git push
```

Vercel will automatically run `prisma generate` during build (via the `postbuild` script).

## Common Issues

### Build Fails with "Can't reach database server"
- Make sure `DATABASE_URL` is set in Vercel environment variables
- Check that your Neon database is not paused (it auto-pauses after inactivity)

### Products/Articles Not Showing
- Database needs to be seeded (see Section 3 above)
- Check Vercel function logs for API errors

### TypeScript Errors
- Run `npm run build` locally first to catch errors before deploying
- Make sure all dependencies are installed

## Production Best Practices

1. **Seed Data**: Only seed once during initial setup
2. **Migrations**: Use `prisma migrate` for production schema changes
3. **Environment Variables**: Never commit `.env` files
4. **Database Backups**: Enable automatic backups in Neon
5. **Connection Pooling**: Consider using Prisma Data Proxy for serverless optimization

## Useful Commands

```bash
# Local development
npm run dev                    # Start dev server
npm run db:studio             # Open Prisma Studio

# Database operations
npm run db:generate           # Generate Prisma Client
npm run db:push              # Push schema to database
npm run db:seed              # Seed database with sample data
npm run setup:db             # Full setup (push + seed)

# Deployment
vercel                        # Deploy to preview
vercel --prod                # Deploy to production
vercel logs                  # View deployment logs
```

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
