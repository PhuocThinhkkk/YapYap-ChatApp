"use client"

import { MapPin, Crown, Users, Home, UserPlus, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserDB } from "@/type"


export function UserCard({ user }: {user : UserDB}) {
  const getRoleBadgeStyle = (role: string | undefined) => {
    if (!role) {
        return ""
    }
    switch (role) {
      case "Enterprise Plan":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0"
      case "Premium Plan":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
      case "Pro Plan":
        return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleAddFriend = () => {
    console.log(`Adding ${user.name} as friend`)
  }

  return (
    <div className="group relative">
      <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

        <CardContent className="relative p-6 z-10">
          {/* Header with Avatar and Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Avatar with glow effect */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <Avatar className="relative h-14 w-14 ring-2 ring-white/50 shadow-md">
                  <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></div>
              </div>

              {/* Name and Email */}
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-lg text-gray-900 truncate group-hover:text-indigo-600 transition-colors duration-200">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500 truncate font-medium">{user.email}</p>
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex-shrink-0">
              <Badge className={`text-xs font-semibold px-3 py-1 ${getRoleBadgeStyle(user?.role)} shadow-md`}>
                <Crown className="h-3 w-3 mr-1" />
                {user?.role?.replace(" Plan", "")}
              </Badge>
            </div>
          </div>

          {/* Location */}
          {user.location && (
            <div className="flex items-center text-gray-600 text-sm mb-3 bg-gray-50/80 rounded-lg px-3 py-2">
              <MapPin className="h-4 w-4 mr-2 text-indigo-500 flex-shrink-0" />
              <span className="truncate font-medium">{user.location}</span>
            </div>
          )}

          {/* Bio */}
          {user.bio && (
            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed bg-gradient-to-r from-gray-50/80 to-indigo-50/80 rounded-lg p-3 border-l-4 border-indigo-200">
                {user.bio}
              </p>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center text-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mr-2">
                <Home className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">{user?.roomsOwn?.length}</div>
                <div className="text-xs text-gray-500">owned</div>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-2">
                <Users className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">{user?.rooms?.length}</div>
                <div className="text-xs text-gray-500">joined</div>
              </div>
            </div>
          </div>

          {/* Add Friend Button - Full Width */}
          <Button
            onClick={handleAddFriend}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-2.5 rounded-xl font-semibold"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Friend
          </Button>

          {/* Floating star decoration */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
