import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

/**
 * Skill endorsements for a user.
 *
 *   GET /api/profile/:userId/endorsements
 *     Returns an aggregate count per skill the user has in their
 *     expertise array, plus whether the caller has already endorsed
 *     each skill (so the UI can toggle "Endorse" vs "Endorsed ✓").
 *
 *   POST /api/profile/:userId/endorsements   { skill: string }
 *     Idempotent toggle: if the caller has already endorsed that
 *     (user, skill) pair, the endorsement is removed. Otherwise a
 *     new endorsement row is created. Self-endorsements rejected.
 */

const postBody = z.object({
  skill: z.string().min(1).max(60),
})

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params
  const session = await auth()

  // Only operate against the user's declared expertise list so a
  // troll can't spam endorsements for arbitrary made-up skills.
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { expertise: true },
  })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  const skills = Array.isArray(user.expertise) ? (user.expertise as string[]) : []
  if (skills.length === 0) {
    return NextResponse.json({ skills: [] })
  }

  const grouped = await prisma.endorsement.groupBy({
    by: ['skill'],
    where: { userId, skill: { in: skills } },
    _count: { skill: true },
  })
  const countBySkill = new Map(grouped.map(g => [g.skill, g._count.skill]))

  let mineSet: Set<string> = new Set()
  if (session?.user?.id) {
    const mine = await prisma.endorsement.findMany({
      where: { userId, endorserId: session.user.id, skill: { in: skills } },
      select: { skill: true },
    })
    mineSet = new Set(mine.map(e => e.skill))
  }

  return NextResponse.json({
    skills: skills.map(skill => ({
      skill,
      count: countBySkill.get(skill) ?? 0,
      endorsedByMe: mineSet.has(skill),
    })),
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { userId } = await params
  if (userId === session.user.id) {
    return NextResponse.json({ error: 'You can\'t endorse yourself.' }, { status: 400 })
  }

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  const parsed = postBody.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
  }
  const skill = parsed.data.skill.trim()

  // Verify the endorsee actually has this skill in their expertise list.
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { expertise: true },
  })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  const skills = Array.isArray(user.expertise) ? (user.expertise as string[]) : []
  if (!skills.includes(skill)) {
    return NextResponse.json({ error: 'That skill isn\'t listed on this profile.' }, { status: 400 })
  }

  // Toggle.
  const existing = await prisma.endorsement.findUnique({
    where: {
      userId_endorserId_skill: { userId, endorserId: session.user.id, skill },
    },
  })

  if (existing) {
    await prisma.endorsement.delete({ where: { id: existing.id } })
    const count = await prisma.endorsement.count({ where: { userId, skill } })
    return NextResponse.json({ endorsedByMe: false, count })
  }

  await prisma.endorsement.create({
    data: { userId, endorserId: session.user.id, skill },
  })
  const count = await prisma.endorsement.count({ where: { userId, skill } })
  return NextResponse.json({ endorsedByMe: true, count })
}
