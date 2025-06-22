"use client"

import { MapPin, Crown, UserPlus, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserDB } from "@/type"
import { toast } from "sonner"


export function UserCard({ user }: {user : UserDB}) {

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  async function handleAddFriend() {
    try{
      const userFollowingId = user._id;
      if (!userFollowingId) {
        toast.error("Something wrong happended")
        return
      }

      const res = await fetch(`/api/add-friend`,
        {
          method: "POST",
          body: userFollowingId,
        }
      )
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Server error.")
      }
      
    }catch(e){
      console.error(e);
      toast.error(`${e}`)
    }
  }

  return (
  <Card className="bg-white border-2 border-gray-300 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-200 rounded-lg">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-orange-200">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-orange-500 text-white">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-xl text-gray-900 mb-1">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <Badge className="mt-2 bg-orange-100 text-orange-800 border-orange-200">
            {user.role == "Pro Plan" && <Crown className="h-3 w-3 mr-1" />}
            {user?.role?.replace(" Plan", "")}
          </Badge>
        </div>

        {user.location && (
          <div className="flex items-center justify-center text-gray-600 text-sm mb-4 p-2 bg-gray-50 rounded">
            <MapPin className="h-4 w-4 mr-2 text-orange-500" />
            <span>{user.location}</span>
          </div>
        )}

        <div className="flex justify-center gap-8 mb-4 p-3 border border-gray-200 rounded">
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900">{user?.roomsOwn?.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Owned</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900">{user?.rooms?.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Joined</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAddFriend} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
            <UserPlus className=  "h-4 w-4 mr-2" />
            Add Friend
          </Button>
          <Button variant="outline" size="icon" className="border-orange-200 hover:bg-orange-50">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
