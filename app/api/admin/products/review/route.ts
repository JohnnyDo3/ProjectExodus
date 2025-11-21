import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    // Check if user is authenticated and is an admin
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user to check role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
    }

    const { productId, action, rejectionReason, affiliateLink } = await request.json()

    // Validation
    if (!productId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json({ error: 'Invalid action. Must be "approve" or "reject"' }, { status: 400 })
    }

    if (action === 'reject' && !rejectionReason) {
      return NextResponse.json({ error: 'Rejection reason is required' }, { status: 400 })
    }

    // Find the product
    const product = await prisma.userProduct.findUnique({
      where: { id: productId },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Update product based on action
    const updatedProduct = await prisma.userProduct.update({
      where: { id: productId },
      data: {
        approvalStatus: action === 'approve' ? 'APPROVED' : 'REJECTED',
        rejectionReason: action === 'reject' ? rejectionReason : null,
        affiliateLink: action === 'approve' && affiliateLink ? affiliateLink : null,
        reviewedBy: session.user.id,
        reviewedAt: new Date()
      }
    })

    // Log admin action
    await prisma.adminLog.create({
      data: {
        action: action === 'approve' ? 'PRODUCT_APPROVED' : 'PRODUCT_REJECTED',
        description: `${action === 'approve' ? 'Approved' : 'Rejected'} product "${product.name}" by ${product.seller.name || 'Unknown'}`,
        metadata: {
          productId: product.id,
          productName: product.name,
          sellerId: product.sellerId,
          sellerName: product.seller.name,
          rejectionReason: action === 'reject' ? rejectionReason : null,
          affiliateLink: action === 'approve' ? affiliateLink : null
        },
        userId: session.user.id
      }
    })

    // Create notification for seller
    await prisma.notification.create({
      data: {
        type: action === 'approve' ? 'PRODUCT_APPROVED' : 'SYSTEM',
        title: action === 'approve' ? 'Product Approved! 🎉' : 'Product Needs Revision',
        message: action === 'approve'
          ? `Your product "${product.name}" has been approved and is now live on the marketplace!`
          : `Your product "${product.name}" needs some revisions. Please check the feedback and resubmit.`,
        link: '/profile/products',
        userId: product.sellerId
      }
    })

    return NextResponse.json({
      success: true,
      product: updatedProduct,
      message: action === 'approve' ? 'Product approved successfully' : 'Product rejected with feedback'
    })

  } catch (error) {
    console.error('Error reviewing product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
