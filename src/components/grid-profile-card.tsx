import { UserCard } from "@/components/UserCard"
import { UserCardSkeleton } from "@/components/UserCard-skeleton"
import {  UserSearchingType } from "@/type"

interface UserGridProps {
  users: UserSearchingType[]
  isLoading?: boolean
}

export function UserGrid({ users, isLoading = false }: UserGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-8">
          <div className="text-8xl mb-4">🔍</div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-3">No users found</h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Try adjusting your search terms or explore different keywords to find the perfect match.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {users.map((user, index) => (
        <div
          key={user._id}
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>
  )
}
