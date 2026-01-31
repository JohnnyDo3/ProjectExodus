# Real-Time Collaboration Deployment Guide

This guide walks you through deploying the Hocuspocus collaboration server for Project Exodus.

## Prerequisites

- Git repository access
- Database migration completed (`npx prisma migrate dev`)
- Vercel project deployed

## Quick Start

### Option 1: Railway (Recommended - 5 minutes)

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   cd collaboration-server
   ./deploy.sh railway
   ```

3. **Configure Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_HOCUSPOCUS_URL` = `wss://your-app.railway.app`
   - Redeploy your Vercel app

### Option 2: Render (10 minutes)

1. **Deploy:**
   ```bash
   cd collaboration-server
   ./deploy.sh render
   ```

2. Follow the on-screen instructions to deploy via Render dashboard

3. **Configure Vercel:**
   - Add: `NEXT_PUBLIC_HOCUSPOCUS_URL` = `wss://your-service.onrender.com`
   - Redeploy

### Option 3: Fly.io (10 minutes)

1. **Deploy:**
   ```bash
   cd collaboration-server
   ./deploy.sh fly
   ```

2. **Configure Vercel:**
   - Add: `NEXT_PUBLIC_HOCUSPOCUS_URL` = `wss://your-app.fly.dev`
   - Redeploy

### Option 4: Docker (Development)

1. **Run locally:**
   ```bash
   cd collaboration-server
   ./deploy.sh docker
   ```

2. **Configure local environment:**
   - In `.env.local`: `NEXT_PUBLIC_HOCUSPOCUS_URL=ws://localhost:1234`

## Database Migration

Before deploying, run this migration to add Y.js state columns:

```bash
npx prisma migrate dev --name add-yjs-state
```

This adds:
- `yjsState` column to `Document` table
- `yjsState` column to `MindMap` table
- `version` column to `Document` table

## Environment Variables

### Collaboration Server

Set these in your deployment platform:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | WebSocket port | `1234` (auto-set by platform) |
| `DATABASE_URL` | Yes | PostgreSQL connection | From your database |
| `HOCUSPOCUS_SECRET` | Recommended | Auth secret | Generate with `openssl rand -hex 32` |
| `NODE_ENV` | No | Environment | `production` |

### Vercel (Next.js App)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_HOCUSPOCUS_URL` | Yes | WebSocket server URL | `wss://exodus-collab.railway.app` |

## Verifying Deployment

### 1. Check Server Health

```bash
curl https://your-server.com/health
```

Should return 200 OK.

### 2. Test WebSocket Connection

```bash
wscat -c wss://your-server.com
```

Should connect successfully.

### 3. Test in Application

1. Create a new document in a project
2. Open the document
3. Check browser console for:
   ```
   [Hocuspocus] Connected to collaboration server
   ```
4. Open the same document in another browser/tab
5. Edit the document - changes should sync in real-time

## Monitoring

### View Logs

**Railway:**
```bash
railway logs
```

**Render:**
- Dashboard → Logs tab

**Fly.io:**
```bash
fly logs
```

**Docker:**
```bash
docker logs -f exodus-collaboration
```

### Monitor Metrics

Track these key metrics:
- **Active Connections:** Number of concurrent users
- **Document Operations:** Edits per second
- **Memory Usage:** Should stay under 512MB
- **Database Queries:** Monitor slow queries

### Alerts

Set up alerts for:
- Server downtime
- High memory usage (>80%)
- Database connection errors
- WebSocket connection failures

## Scaling

### Horizontal Scaling

For high traffic, deploy multiple instances:

1. Deploy multiple Hocuspocus servers
2. Add Redis adapter for cross-instance sync
3. Use load balancer (Railway/Fly.io handle this)

### Vertical Scaling

Increase server resources:
- **Railway:** Upgrade plan in dashboard
- **Render:** Upgrade to standard/pro plan
- **Fly.io:** Update `fly.toml` with larger VM

## Troubleshooting

### Connection Refused

**Problem:** WebSocket connection fails

**Solutions:**
1. Check `NEXT_PUBLIC_HOCUSPOCUS_URL` is correct
2. Verify server is running: `curl https://your-server.com/health`
3. Check CORS settings in `server.ts`
4. Ensure port 1234 is exposed

### Documents Not Persisting

**Problem:** Changes lost after refresh

**Solutions:**
1. Verify `DATABASE_URL` is set
2. Check database migration completed
3. Review server logs for database errors
4. Ensure `yjsState` columns exist

### High Latency

**Problem:** Slow real-time updates

**Solutions:**
1. Choose server region close to users
2. Enable database connection pooling
3. Add Redis caching
4. Check network latency

### Memory Leaks

**Problem:** Server memory grows over time

**Solutions:**
1. Enable database persistence (stores in DB not memory)
2. Implement document cleanup for inactive sessions
3. Add connection limits
4. Restart server periodically

## Production Checklist

- [ ] Database migration completed
- [ ] `HOCUSPOCUS_SECRET` set to strong random value
- [ ] `DATABASE_URL` points to production database
- [ ] SSL/TLS enabled (wss:// not ws://)
- [ ] CORS configured for production domain
- [ ] Monitoring and alerts set up
- [ ] Backup strategy in place
- [ ] Load testing completed
- [ ] `NEXT_PUBLIC_HOCUSPOCUS_URL` set in Vercel
- [ ] Vercel redeployed after env var change

## Security

### Authentication

The server currently uses a simple secret-based auth. For production, implement JWT:

```typescript
// In server.ts
async onAuthenticate({ token }) {
  const decoded = await verifyJWT(token)
  return { user: decoded }
}
```

### Rate Limiting

Add rate limiting to prevent abuse:

```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

### CORS

Restrict to your domain:

```typescript
response.setHeader('Access-Control-Allow-Origin', 'https://your-domain.com')
```

## Cost Estimates

### Railway
- **Free Tier:** 500 hours/month, $5 credit
- **Hobby:** $5/month for 500 hours
- **Pro:** $20/month unlimited

### Render
- **Free Tier:** 750 hours/month (sleeps after 15 min)
- **Starter:** $7/month (always on)
- **Standard:** $25/month (more resources)

### Fly.io
- **Free Tier:** 3 shared VMs, 3GB storage
- **Paid:** ~$2-10/month depending on usage

### Hocuspocus Cloud
- **Managed Service:** $29/month (includes hosting, monitoring, support)

## Support

- **Hocuspocus Docs:** https://hocuspocus.dev/
- **Y.js Docs:** https://docs.yjs.dev/
- **Project Issues:** https://github.com/your-org/project-exodus/issues

## Next Steps

After deployment:
1. Test real-time collaboration
2. Monitor server performance
3. Set up error tracking (Sentry)
4. Configure backups
5. Document for your team

---

**Need Help?** Check the [collaboration-server/README.md](./collaboration-server/README.md) for detailed documentation.
