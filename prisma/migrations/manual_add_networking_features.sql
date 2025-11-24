-- Migration: Add networking features and resume field
-- Run this SQL against your database to apply the schema changes

-- Add resume column to User table
ALTER TABLE "User" ADD COLUMN "resume" TEXT;

-- Create Follower table
CREATE TABLE "Follower" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint and indexes for Follower
CREATE UNIQUE INDEX "Follower_followerId_followingId_key" ON "Follower"("followerId", "followingId");
CREATE INDEX "Follower_followerId_idx" ON "Follower"("followerId");
CREATE INDEX "Follower_followingId_idx" ON "Follower"("followingId");

-- Create ConnectionStatus enum
CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

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
