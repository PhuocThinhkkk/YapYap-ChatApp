import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { SimpleUserType } from "@/type"


interface ChatUserHeaderProps {
  user: SimpleUserType
}

export function ChatUserHeader({ user }: ChatUserHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const truncateBio = (bio: string, maxLength = 50) => {
    if (bio.length <= maxLength) return bio
    return bio.slice(0, maxLength) + "..."
  }

  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="flex items-center gap-3 p-3 px-4 sm:px-6 lg:px-8">
        {/* Avatar */}
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className="bg-blue-100 text-blue-700">{getInitials(user.name)}</AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-semibold text-lg text-gray-900 truncate">{user.name}</h1>
            {user.role && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                {user.role}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{user.location}</span>
              </div>
            )}
            {user.bio && (
              <div className="hidden sm:block flex-1 min-w-0">
                <span className="truncate block">{truncateBio(user.bio)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex-shrink-0">
          <div className="h-3 w-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
        </div>
      </div>
    </div>
  )
}
