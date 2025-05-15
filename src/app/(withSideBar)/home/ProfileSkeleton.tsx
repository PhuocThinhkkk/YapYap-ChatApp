import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


export default function ProfileSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="border-none shadow-sm">
        {/* Cover Image Skeleton */}
        <Skeleton className="h-48 w-full rounded-t-lg" />

        {/* Profile Header Skeleton */}
        <div className="relative px-6">
          <div className="flex flex-col sm:flex-row gap-6 -mt-12 sm:-mt-16">
            {/* Avatar Skeleton */}
            <Skeleton className="relative bottom-5 h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-background" />

            <div className="flex-1 pt-4 sm:pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {/* Name Skeleton */}
                  <Skeleton className="h-8 w-48 mb-2" />
                  {/* Handle and Role Skeleton */}
                  <Skeleton className="h-4 w-36" />
                </div>
                <div className="flex gap-2">
                  {/* Button Skeletons */}
                  <Skeleton className="h-9 w-32" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                {/* Contact Info Skeletons */}
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            {/* Bio Skeleton */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {/* Badge Skeletons */}
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-22" />
            <Skeleton className="h-6 w-28" />
          </div>

          <div className="flex flex-wrap gap-6 mt-6 pb-4 border-b">
            {/* Stats Skeletons */}
            <div className="text-center">
              <Skeleton className="h-6 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
            <div className="text-center">
              <Skeleton className="h-6 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
            <div className="text-center">
              <Skeleton className="h-6 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          </div>
        </div>
    </Card>
    </div>
  )
}