import { Skeleton, SkeletonText, SkeletonButton } from '@/components/ui/Skeleton'

export default function StructuralLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="border-b bg-gradient-to-r from-blue-900/20 via-background to-indigo-900/20">
        <div className="container py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-36" />
          </div>

          {/* Title area */}
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-2xl" />
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-80" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container py-8">
        {/* Game mode cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-muted">
              <Skeleton className="w-12 h-12 rounded-xl mb-4" />
              <Skeleton className="h-6 w-32 mb-2" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>

        {/* Category overview */}
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/50 border">
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
