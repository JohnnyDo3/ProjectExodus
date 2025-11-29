import { Skeleton } from './Skeleton'

export function SkeletonActivityCard() {
  return (
    <div className="flex gap-3 p-3 rounded-lg border-2 border-[var(--border)] bg-[var(--card)]">
      {/* User Avatar */}
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Text lines */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />

        {/* Tags/Buttons */}
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-lg" />
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[var(--border)]">
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  )
}
