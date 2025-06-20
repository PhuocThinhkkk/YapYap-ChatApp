import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function UserCardSkeleton() {
  return (
    <div className="group relative">
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          {/* Header with Avatar and Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Avatar Skeleton */}
              <div className="relative flex-shrink-0">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-200 rounded-full"></div>
              </div>

              {/* Name and Email Skeleton */}
              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            {/* Badge Skeleton */}
            <div className="flex-shrink-0">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>

          {/* Location Skeleton */}
          <div className="bg-gray-50/80 rounded-lg px-3 py-2 mb-3">
            <Skeleton className="h-4 w-28" />
          </div>

          {/* Bio Skeleton */}
          <div className="bg-gray-50/80 rounded-lg p-3 mb-4">
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Stats Skeleton */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Skeleton className="w-8 h-8 rounded-lg mr-2" />
              <div>
                <Skeleton className="h-4 w-4 mb-1" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
            <div className="flex items-center">
              <Skeleton className="w-8 h-8 rounded-lg mr-2" />
              <div>
                <Skeleton className="h-4 w-4 mb-1" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <Skeleton className="h-10 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  )
}
