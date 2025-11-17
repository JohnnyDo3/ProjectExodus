# 🗄️ Database Setup Guide

Complete guide to setting up your Project Exodus database.

## Quick Start (5 minutes)

### 1. Create a Free Neon Database

1. Go to [neon.tech](https://neon.tech)
2. Sign up for free (no credit card required)
3. Create a new project named "project-exodus"
4. Copy your connection string

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your database URL:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/project-exodus?sslmode=require"
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Push Schema to Database

```bash
npm run db:push
```

### 5. Seed with Real Data

```bash
npm run db:seed
```

### 6. View Your Data (Optional)

```bash
npm run db:studio
```

Opens Prisma Studio at http://localhost:5555

---

## What Gets Seeded

Our seed script adds REAL sustainability products and content:

### Products
- ✅ Goal Zero Yeti 1500X - Portable solar power station
- ✅ Big Berkey Water Filter - Gravity-fed filtration system

### Categories
- Renewable Energy
- Water Systems
- Sustainable Materials
- Organic Products

### Articles
- Solar Power for Beginners guide

### Metadata
- Tags, vendors, sustainability metrics

All with **actual specifications** and **real sustainability data**!

---

## Alternative: Local PostgreSQL

If you prefer local development:

```bash
# Install PostgreSQL locally
# macOS
brew install postgresql@15

# Ubuntu/Debian
sudo apt install postgresql

# Start PostgreSQL
brew services start postgresql  # macOS
sudo service postgresql start   # Linux

# Create database
createdb project-exodus

# Update .env
DATABASE_URL="postgresql://localhost:5432/project-exodus"
```

---

## Common Commands

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Re-seed database
npm run db:seed

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

---

## Troubleshooting

### "Environment variable not found: DATABASE_URL"
- Make sure `.env` file exists
- Check that `DATABASE_URL` is set correctly
- Restart your dev server after changing `.env`

### "Can't reach database server"
- Check your internet connection (for Neon)
- Verify connection string is correct
- Ensure Neon project is active

### "Relation does not exist"
- Run `npm run db:push` to sync schema
- Schema might be out of date

### "Seed fails on duplicate keys"
- Database already seeded
- Use `npx prisma migrate reset` to start fresh

---

## Production Deployment

For production (Vercel):

1. Add `DATABASE_URL` to Vercel environment variables
2. Prisma will auto-generate client during build
3. Database schema is pushed via migrations

---

## Next Steps

After setup:
1. ✅ Database is running
2. ✅ Schema is synced
3. ✅ Real data is seeded
4. 🔄 Start building features!

Run `npm run dev` and visit your site!
