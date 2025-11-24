-- Migration: Add networking features and resume field
-- Run this SQL against your database to apply the schema changes
-- Note: UserFollow table should already exist. If not, it will be created by Prisma.

-- Add resume column to User table (skip if already exists)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "resume" TEXT;

-- Create ConnectionStatus enum (skip if already exists)
DO $$ BEGIN
    CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Connection table
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "connectedUserId" TEXT NOT NULL,
    "status" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint and indexes for Connection
CREATE UNIQUE INDEX "Connection_userId_connectedUserId_key" ON "Connection"("userId", "connectedUserId");
CREATE INDEX "Connection_userId_idx" ON "Connection"("userId");
CREATE INDEX "Connection_connectedUserId_idx" ON "Connection"("connectedUserId");
CREATE INDEX "Connection_status_idx" ON "Connection"("status");

-- Add foreign key constraints for Connection
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_connectedUserId_fkey" FOREIGN KEY ("connectedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create Endorsement table
CREATE TABLE "Endorsement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "endorserId" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Endorsement_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint and indexes for Endorsement
CREATE UNIQUE INDEX "Endorsement_userId_endorserId_skill_key" ON "Endorsement"("userId", "endorserId", "skill");
CREATE INDEX "Endorsement_userId_idx" ON "Endorsement"("userId");
CREATE INDEX "Endorsement_endorserId_idx" ON "Endorsement"("endorserId");
CREATE INDEX "Endorsement_skill_idx" ON "Endorsement"("skill");
