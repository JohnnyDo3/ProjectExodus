import { Skeleton } from './Skeleton'

export function SkeletonUserCard() {
  return (
    <div className="p-5 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] hover:shadow-lg transition-all">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <Skeleton className="w-16 h-16 rounded-full mb-3" />

        {/* Name */}
        <Skeleton className="h-5 w-32 mb-1" />

        {/* Headline */}
        <Skeleton className="h-4 w-40 mb-3" />

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
