import { Skeleton } from './Skeleton'

interface SkeletonCardProps {
  showImage?: boolean
  lines?: number
}

export function SkeletonCard({ showImage = false, lines = 3 }: SkeletonCardProps) {
  return (
    <div className="p-4 rounded-xl border-2 border-[var(--border)] bg-[var(--card)]">
      {showImage && <Skeleton className="h-40 w-full mb-4 rounded-lg" />}

      <Skeleton className="h-6 w-3/4 mb-3" />

      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 mb-2 ${i === lines - 1 ? 'w-1/2' : 'w-full'}`}
        />
      ))}

      <div className="flex gap-2 mt-4">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  )
}
