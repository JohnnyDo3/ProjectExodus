import { Skeleton } from './Skeleton'

export function SkeletonProjectCard() {
  return (
    <div className="p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] hover:shadow-lg transition-all">
      {/* Project Name */}
      <Skeleton className="h-7 w-3/4 mb-3" />

      {/* Description */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />

      {/* Status & Members */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      {/* Action Button */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}
