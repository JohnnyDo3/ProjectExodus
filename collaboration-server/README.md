# Project Exodus - Collaboration Server

This is the real-time collaboration server for Project Exodus, powered by [Hocuspocus](https://hocuspocus.dev/) and [Y.js](https://yjs.dev/).

## What It Does

- Enables real-time collaborative editing of documents and mind maps
- Syncs changes between users instantly using CRDTs (Conflict-free Replicated Data Types)
- Persists Y.js documents to PostgreSQL database
- Handles user awareness (cursors, presence indicators)
- Supports offline editing with automatic conflict resolution

## Architecture

```
┌─────────────┐         WebSocket         ┌──────────────────┐
│   Next.js   │ ◄──────────────────────► │   Hocuspocus     │
│   (Vercel)  │                           │    Server        │
└─────────────┘                           └──────────────────┘
      │                                            │
      │                                            │
      └────────────────────────────────────────────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  PostgreSQL  │
                  │   Database   │
                  └──────────────┘
```

## Deployment Options

### Option 1: Railway (Recommended - Easiest)

1. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Create a new project:
   ```bash
   cd collaboration-server
   railway init
   ```

4. Add PostgreSQL database:
   ```bash
   railway add --database postgresql
   ```

5. Set environment variables:
   ```bash
   railway variables set HOCUSPOCUS_SECRET=<your-secret-key>
   ```

6. Deploy:
   ```bash
   railway up
   ```

7. Get your deployment URL:
   ```bash
   railway domain
   ```

8. Update Vercel environment variable:
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Set `NEXT_PUBLIC_HOCUSPOCUS_URL` to `wss://your-railway-domain.railway.app`

**Cost:** Free tier available (500 hours/month)

### Option 2: Render

1. Create account at [render.com](https://render.com)

2. Click "New +" → "Web Service"

3. Connect your GitHub repository

4. Configure:
   - **Name:** exodus-collaboration-server
   - **Region:** Choose closest to your users
   - **Branch:** main
   - **Root Directory:** collaboration-server
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build && npx prisma generate`
   - **Start Command:** `npm start`

5. Add environment variables:
   - `DATABASE_URL` - (will be set automatically if you add PostgreSQL)
   - `HOCUSPOCUS_SECRET` - Generate a random secret
   - `PORT` - 1234

6. Add PostgreSQL database:
   - Click "New +" → "PostgreSQL"
   - Link it to your web service

7. Deploy and copy the service URL

8. Update Vercel:
   - Set `NEXT_PUBLIC_HOCUSPOCUS_URL` to `wss://your-service.onrender.com`

**Cost:** Free tier available (750 hours/month)

### Option 3: Fly.io

1. Install Fly CLI:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. Login:
   ```bash
   fly auth login
   ```

3. Launch app:
   ```bash
   cd collaboration-server
   fly launch
   ```

4. Add PostgreSQL:
   ```bash
   fly postgres create
   fly postgres attach <postgres-app-name>
   ```

5. Set secrets:
   ```bash
   fly secrets set HOCUSPOCUS_SECRET=<your-secret-key>
   ```

6. Deploy:
   ```bash
   fly deploy
   ```

**Cost:** Free tier available (3 shared VMs)

### Option 4: Hocuspocus Cloud (Managed Service)

1. Sign up at [hocuspocus.cloud](https://hocuspocus.cloud)
2. Create a new application
3. Copy your WebSocket URL
4. Update Vercel environment variable

**Cost:** Starts at $29/month (fully managed)

### Option 5: Docker Compose (Self-Hosted)

1. Create `docker-compose.yml` in project root:
   ```yaml
   version: '3.8'

   services:
     collaboration:
       build: ./collaboration-server
       ports:
         - "1234:1234"
       environment:
         - DATABASE_URL=postgresql://postgres:password@db:5432/exodus
         - HOCUSPOCUS_SECRET=your-secret-here
       depends_on:
         - db
       restart: unless-stopped

     db:
       image: postgres:15-alpine
       environment:
         - POSTGRES_DB=exodus
         - POSTGRES_PASSWORD=password
       volumes:
         - postgres_data:/var/lib/postgresql/data
       restart: unless-stopped

   volumes:
     postgres_data:
   ```

2. Start services:
   ```bash
   docker-compose up -d
   ```

3. Access at `ws://localhost:1234`

## Environment Variables

Set these in your deployment platform:

- `PORT` - WebSocket server port (default: 1234)
- `DATABASE_URL` - PostgreSQL connection string (optional but recommended)
- `HOCUSPOCUS_SECRET` - Secret key for authentication (optional but recommended)
- `NODE_ENV` - Set to `production` in production

## Connecting from Next.js

After deployment, update your Vercel environment variables:

```env
NEXT_PUBLIC_HOCUSPOCUS_URL=wss://your-server.com
```

The Next.js app will automatically connect to this server for real-time collaboration.

## Database Schema

The server requires these columns in your Prisma schema (already added):

```prisma
model Document {
  // ... other fields
  yjsState Bytes? // Y.js document state
}

model MindMap {
  // ... other fields
  yjsState Bytes? // Y.js document state
}
```

Run migration if not already done:
```bash
npx prisma migrate dev
```

## Monitoring

### Health Check

The server exposes a health endpoint:
```
GET http://your-server.com/health
```

### Logs

View logs based on your platform:
- **Railway:** `railway logs`
- **Render:** Dashboard → Logs tab
- **Fly.io:** `fly logs`
- **Docker:** `docker-compose logs -f collaboration`

### Metrics

Monitor these key metrics:
- Active connections
- Document operations/second
- Memory usage
- Database query performance

## Troubleshooting

### WebSocket connection fails

1. Check CORS settings in `server.ts`
2. Verify `NEXT_PUBLIC_HOCUSPOCUS_URL` is set correctly
3. Ensure WebSocket port (1234) is exposed
4. Check if your platform supports WebSocket connections

### Documents not persisting

1. Verify `DATABASE_URL` is set
2. Check database connection
3. Ensure Prisma schema is migrated
4. Review server logs for errors

### High memory usage

1. Enable database persistence (stores documents in DB instead of memory)
2. Implement document cleanup for old/inactive documents
3. Add connection limits
4. Scale horizontally (multiple server instances)

## Development

Run locally:

```bash
cd collaboration-server
npm install
npm run dev
```

The server will start on `ws://localhost:1234`

Update your local `.env.local`:
```env
NEXT_PUBLIC_HOCUSPOCUS_URL=ws://localhost:1234
```

## Production Considerations

### Security

1. **Enable authentication:** Implement JWT token verification in `onAuthenticate`
2. **Set HOCUSPOCUS_SECRET:** Use a strong random secret
3. **Rate limiting:** Add rate limiting to prevent abuse
4. **CORS:** Configure allowed origins

### Performance

1. **Database indexing:** Ensure proper indexes on document IDs
2. **Connection pooling:** Use Prisma connection pooling
3. **Caching:** Consider Redis for hot documents
4. **Load balancing:** Use multiple server instances behind a load balancer

### Scaling

For high traffic, consider:
- Multiple Hocuspocus instances with shared database
- Redis adapter for cross-instance communication
- CDN for static assets
- Database read replicas

## Support

- [Hocuspocus Documentation](https://hocuspocus.dev/)
- [Y.js Documentation](https://docs.yjs.dev/)
- [Project Exodus Issues](https://github.com/your-org/project-exodus/issues)

## License

Same as Project Exodus main application
