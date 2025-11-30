import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { handlePrismaError } from '@/lib/utils/prisma-errors'

// DELETE /api/endorsements/[id] - Remove an endorsement
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Find the endorsement
    const endorsement = await prisma.endorsement.findUnique({
      where: { id }
    })

    if (!endorsement) {
      return NextResponse.json(
        { success: false, error: 'Endorsement not found' },
        { status: 404 }
      )
    }

    // Verify user owns this endorsement
    if (endorsement.endorserId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only remove your own endorsements' },
        { status: 403 }
      )
    }

    // Delete the endorsement
    await prisma.endorsement.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Endorsement removed successfully'
    })
  } catch (error) {
    return handlePrismaError(error, 'delete endorsement')
  }
}
