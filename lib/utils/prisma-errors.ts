import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

export function handlePrismaError(error: unknown, operation: string = 'operation') {
  console.error(`Error during ${operation}:`, error)

  // Handle Prisma-specific errors
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        // Unique constraint violation
        const target = error.meta?.target as string[] | undefined
        const field = target?.[0] || 'field'
        return NextResponse.json(
          {
            success: false,
            error: `A record with this ${field} already exists`,
            code: 'DUPLICATE_ERROR'
          },
          { status: 409 }
        )

      case 'P2025':
        // Record not found
        return NextResponse.json(
          {
            success: false,
            error: 'Record not found',
            code: 'NOT_FOUND'
          },
          { status: 404 }
        )

      case 'P2003':
        // Foreign key constraint violation
        return NextResponse.json(
          {
            success: false,
            error: 'Related record not found',
            code: 'FOREIGN_KEY_ERROR'
          },
          { status: 400 }
        )

      case 'P2014':
        // Required relation violation
        return NextResponse.json(
          {
            success: false,
            error: 'The change violates a required relation',
            code: 'RELATION_ERROR'
          },
          { status: 400 }
        )

      default:
        return NextResponse.json(
          {
            success: false,
            error: `Database error: ${error.message}`,
            code: 'DATABASE_ERROR'
          },
          { status: 500 }
        )
    }
  }

  // Handle validation errors
  if (error instanceof PrismaClientValidationError) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid data provided',
        code: 'VALIDATION_ERROR'
      },
      { status: 400 }
    )
  }

  // Generic error fallback
  return NextResponse.json(
    {
      success: false,
      error: `Failed to complete ${operation}`,
      code: 'INTERNAL_ERROR'
    },
    { status: 500 }
  )
}
