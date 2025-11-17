'use client'

import { Button } from './Button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <div className="flex items-center justify-center gap-2">
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          className="hidden sm:flex"
        >
          First
        </Button>
      )}

      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="sr-only sm:not-sr-only sm:ml-2">Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <div
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-earth-500"
              >
                <MoreHorizontal className="w-4 h-4" />
              </div>
            )
          }

          const pageNumber = page as number
          const isActive = pageNumber === currentPage

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`
                w-10 h-10 rounded-lg font-medium transition-colors
                ${
                  isActive
                    ? 'bg-moss-600 text-white'
                    : 'bg-white text-earth-700 hover:bg-sand-100 border border-sand-300'
                }
              `}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="sr-only sm:not-sr-only sm:mr-2">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className="hidden sm:flex"
        >
          Last
        </Button>
      )}
    </div>
  )
}

// Simple pagination info component
export function PaginationInfo({
  currentPage,
  pageSize,
  totalItems,
}: {
  currentPage: number
  pageSize: number
  totalItems: number
}) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  return (
    <p className="text-sm text-earth-600">
      Showing <span className="font-medium">{start}</span> to{' '}
      <span className="font-medium">{end}</span> of{' '}
      <span className="font-medium">{totalItems}</span> results
    </p>
  )
}
