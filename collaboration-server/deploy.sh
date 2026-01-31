#!/bin/bash

# Hocuspocus Collaboration Server - Quick Deploy Script

set -e

echo "🚀 Project Exodus - Collaboration Server Deployment"
echo "=================================================="
echo ""

# Check if platform is specified
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh [railway|render|fly|docker]"
  echo ""
  echo "Available deployment options:"
  echo "  railway - Deploy to Railway.app (recommended, easiest)"
  echo "  render  - Deploy to Render.com"
  echo "  fly     - Deploy to Fly.io"
  echo "  docker  - Build and run with Docker locally"
  echo ""
  exit 1
fi

PLATFORM=$1

case $PLATFORM in
  railway)
    echo "📡 Deploying to Railway.app..."
    echo ""

    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
      echo "❌ Railway CLI not found. Installing..."
      npm i -g @railway/cli
    fi

    echo "🔐 Logging into Railway..."
    railway login

    echo "🎬 Initializing project..."
    railway init

    echo "💾 Adding PostgreSQL database..."
    railway add --database postgresql

    echo "🔑 Setting environment variables..."
    read -p "Enter HOCUSPOCUS_SECRET (or press Enter to generate): " secret
    if [ -z "$secret" ]; then
      secret=$(openssl rand -hex 32)
      echo "Generated secret: $secret"
    fi
    railway variables set HOCUSPOCUS_SECRET="$secret"

    echo "🚢 Deploying..."
    railway up

    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "Next steps:"
    echo "1. Get your WebSocket URL:"
    echo "   railway domain"
    echo ""
    echo "2. Update Vercel environment variable:"
    echo "   NEXT_PUBLIC_HOCUSPOCUS_URL=wss://your-domain.railway.app"
    echo ""
    ;;

  render)
    echo "📡 Deploying to Render.com..."
    echo ""
    echo "Please follow these steps:"
    echo ""
    echo "1. Go to https://render.com"
    echo "2. Click 'New +' → 'Web Service'"
    echo "3. Connect your GitHub repository"
    echo "4. Configure:"
    echo "   - Root Directory: collaboration-server"
    echo "   - Build Command: npm install && npm run build && npx prisma generate"
    echo "   - Start Command: npm start"
    echo ""
    echo "5. Add environment variables:"
    echo "   - DATABASE_URL (from PostgreSQL database)"
    echo "   - HOCUSPOCUS_SECRET (generate with: openssl rand -hex 32)"
    echo "   - PORT=1234"
    echo ""
    echo "6. Add PostgreSQL database and link it"
    echo ""
    echo "7. Deploy!"
    echo ""
    ;;

  fly)
    echo "📡 Deploying to Fly.io..."
    echo ""

    # Check if Fly CLI is installed
    if ! command -v fly &> /dev/null; then
      echo "❌ Fly CLI not found. Installing..."
      curl -L https://fly.io/install.sh | sh
    fi

    echo "🔐 Logging into Fly.io..."
    fly auth login

    echo "🎬 Launching app..."
    fly launch

    echo "💾 Creating PostgreSQL database..."
    read -p "Enter a name for your Postgres app: " postgres_name
    fly postgres create --name "$postgres_name"
    fly postgres attach "$postgres_name"

    echo "🔑 Setting secrets..."
    read -p "Enter HOCUSPOCUS_SECRET (or press Enter to generate): " secret
    if [ -z "$secret" ]; then
      secret=$(openssl rand -hex 32)
      echo "Generated secret: $secret"
    fi
    fly secrets set HOCUSPOCUS_SECRET="$secret"

    echo "🚢 Deploying..."
    fly deploy

    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "Your WebSocket URL: wss://your-app-name.fly.dev"
    echo ""
    echo "Update Vercel environment variable:"
    echo "NEXT_PUBLIC_HOCUSPOCUS_URL=wss://your-app-name.fly.dev"
    echo ""
    ;;

  docker)
    echo "🐳 Building and running with Docker..."
    echo ""

    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
      echo "❌ Docker not found. Please install Docker first."
      exit 1
    fi

    echo "🔧 Building Docker image..."
    docker build -t exodus-collaboration-server .

    echo "▶️  Starting container..."
    docker run -d \
      -p 1234:1234 \
      -e DATABASE_URL="${DATABASE_URL:-postgresql://user:password@localhost:5432/exodus}" \
      -e HOCUSPOCUS_SECRET="${HOCUSPOCUS_SECRET:-dev-secret}" \
      --name exodus-collaboration \
      exodus-collaboration-server

    echo ""
    echo "✅ Container started!"
    echo ""
    echo "WebSocket URL: ws://localhost:1234"
    echo ""
    echo "To view logs:"
    echo "  docker logs -f exodus-collaboration"
    echo ""
    echo "To stop:"
    echo "  docker stop exodus-collaboration"
    echo ""
    ;;

  *)
    echo "❌ Unknown platform: $PLATFORM"
    echo "Please use: railway, render, fly, or docker"
    exit 1
    ;;
esac
