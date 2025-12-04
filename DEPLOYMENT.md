# Deployment Guide - projxodus.com

## Production Domain Configuration

### Vercel Environment Variables

⚠️ **CRITICAL - Required for app to run:**

Set these in your Vercel dashboard (Settings → Environment Variables → Production):

```
# REQUIRED - App will not start without these
NEXTAUTH_URL=https://projxodus.com
NEXT_PUBLIC_API_URL=https://projxodus.com
DATABASE_URL=<your-production-database-url>
AUTH_SECRET=<generate-with: openssl rand -base64 32>
```

**Optional - OAuth & Features:**

```
# OAuth Providers (optional - email/password auth works without these)
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>

# Real-time messaging (optional)
PUSHER_APP_ID=<your-pusher-app-id>
PUSHER_SECRET=<your-pusher-secret>
NEXT_PUBLIC_PUSHER_KEY=<your-pusher-key>
NEXT_PUBLIC_PUSHER_CLUSTER=<your-pusher-cluster>
```

### Domain Setup

1. **Add Custom Domain in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add `projxodus.com` and `www.projxodus.com`
   - Vercel will provide DNS records to configure

2. **DNS Configuration:**
   - Add the DNS records provided by Vercel to your domain registrar
   - A record: Point to Vercel's IP
   - CNAME record: Point www to cname.vercel-dns.com

3. **Production Branch:**
   - Current deployment branch: `claude/fix-server-functions-01DvJR9AwEzksmzDEWimg94y`
   - For production deployment, consider creating a `main` branch
   - Configure production branch in Vercel → Settings → Git

### Deployment Checklist

- [x] vercel.json configured with production URLs
- [x] .env.example updated with production values
- [ ] Set environment variables in Vercel dashboard
- [ ] Add custom domain in Vercel
- [ ] Configure DNS records
- [ ] SSL certificate (automatically handled by Vercel)
- [ ] Test deployment at projxodus.com

### Current Branch Strategy

This project uses feature branches for deployment. To deploy to production:

**Option 1: Deploy from current branch**
- Configure Vercel to use `claude/fix-server-functions-01DvJR9AwEzksmzDEWimg94y` as production branch

**Option 2: Create main branch (recommended)**
```bash
git checkout -b main
git push -u origin main
```
Then set `main` as production branch in Vercel settings.

### Deployment URL

- **Production**: https://projxodus.com
- **Preview**: Auto-generated for each branch/PR

### Build Command

```bash
npm run vercel-build
```

This runs: `prisma db push --accept-data-loss && prisma generate && next build`
