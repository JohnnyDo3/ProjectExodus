#!/usr/bin/env tsx

/**
 * Database Setup Script
 *
 * This script handles database migrations and seeding.
 * Can be run manually or as part of deployment process.
 *
 * Usage:
 *   npm run setup:db              # Run migrations and seed
 *   npm run setup:db -- --no-seed # Only run migrations
 */

import { execSync } from 'child_process'

const args = process.argv.slice(2)
const skipSeed = args.includes('--no-seed')

console.log('🔧 Setting up database...\n')

try {
  // Step 1: Generate Prisma Client
  console.log('📦 Generating Prisma Client...')
  execSync('npx prisma generate', { stdio: 'inherit' })
  console.log('✓ Prisma Client generated\n')

  // Step 2: Push database schema (creates/updates tables)
  console.log('🗄️  Pushing database schema...')
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit' })
  console.log('✓ Database schema updated\n')

  // Step 3: Seed database (if not skipped)
  if (!skipSeed) {
    console.log('🌱 Seeding database...')
    execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' })
    console.log('✓ Database seeded\n')
  }

  console.log('✅ Database setup complete!')
} catch (error) {
  console.error('❌ Database setup failed:', error)
  process.exit(1)
}
