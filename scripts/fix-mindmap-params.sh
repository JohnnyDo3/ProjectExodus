#!/bin/bash

# Fix mind map API routes for Next.js 15+ (params as Promise)

echo "Fixing mind map API route params..."

# Fix single param routes (just id)
find app/api/mindmaps -name "route.ts" -exec sed -i \
  's/{ params }: { params: { id: string } }/{ params }: { params: Promise<{ id: string }> }/g' {} \;

# Fix dual param routes
find app/api/mindmaps -name "route.ts" -exec sed -i \
  's/{ params }: { params: { id: string; nodeId: string } }/{ params }: { params: Promise<{ id: string; nodeId: string }> }/g' {} \;

find app/api/mindmaps -name "route.ts" -exec sed -i \
  's/{ params }: { params: { id: string; commentId: string } }/{ params }: { params: Promise<{ id: string; commentId: string }> }/g' {} \;

find app/api/mindmaps -name "route.ts" -exec sed -i \
  's/{ params }: { params: { id: string; connectionId: string } }/{ params }: { params: Promise<{ id: string; connectionId: string }> }/g' {} \;

find app/api/mindmaps -name "route.ts" -exec sed -i \
  's/{ params }: { params: { id: string; userId: string } }/{ params }: { params: Promise<{ id: string; userId: string }> }/g' {} \;

# Add await params destructuring after auth (for single id routes)
find app/api/mindmaps -name "route.ts" -exec sed -i \
  '/const session = await auth()/a\    const { id } = await params' {} \;

# Remove duplicate destructuring lines (cleanup from previous attempts)
find app/api/mindmaps -name "route.ts" -exec sed -i \
  '/const { id } = await params/!b; n; /const { id } = await params/d' {} \;

echo "Done! Mind map routes updated for Next.js 15+"
