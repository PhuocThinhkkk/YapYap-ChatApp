import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, UserPlus } from "lucide-react"

// Enhanced sample data with role, location, and email
const friends = [
  {
    id: 1,
    name: "Alice Johnson",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Pro Plan",
    location: "New York, USA",
    email: "alice.johnson@example.com",
    status: "online",
    lastSeen: "now",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Free Plan",
    location: "London, UK",
    email: "bob.smith@example.com",
    status: "offline",
    lastSeen: "2 hours ago",
  },
  {
    id: 3,
    name: "Carol Davis",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Pro Plan",
    location: "Toronto, Canada",
    email: "carol.davis@example.com",
    status: "online",
    lastSeen: "now",
  },
  {
    id: 4,
    name: "David Wilson",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    role: "Free Plan",
    location: "Sydney, Australia",
    email: "david.wilson@example.com",
    status: "away",
    lastSeen: "5 minutes ago",
  },
]

export default function FriendsList() {
  return (
    <div className="space-y-3">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-start justify-between p-4 rounded-lg bg-white border border-slate-100 hover:border-slate-200 transition-colors"
        >
          <div className="flex items-start space-x-3 flex-1">
            <div className="relative flex-shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={friend.avatarUrl || "/placeholder.svg"} alt={friend.name} />
                <AvatarFallback>
                  {friend.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  friend.status === "online"
                    ? "bg-green-500"
                    : friend.status === "away"
                      ? "bg-yellow-500"
                      : "bg-slate-400"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-slate-900 truncate">{friend.name}</p>
                <Badge variant={friend.role === "Pro Plan" ? "default" : "secondary"} className="text-xs flex-shrink-0">
                  {friend.role}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 truncate mb-1">{friend.email}</p>
              <p className="text-xs text-slate-500 truncate mb-1">{friend.location}</p>
              <p className="text-xs text-slate-500">
                {friend.status === "online" ? "Online now" : `Last seen ${friend.lastSeen}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-3">
            <Badge variant={friend.status === "online" ? "default" : "secondary"} className="text-xs">
              {friend.status}
            </Badge>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {friends.length === 0 && (
        <div className="text-center py-8">
          <UserPlus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No friends yet</p>
          <p className="text-sm text-slate-500">Start connecting with people!</p>
        </div>
      )}
    </div>
  )
}
