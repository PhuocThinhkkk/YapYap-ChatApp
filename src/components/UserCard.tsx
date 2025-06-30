"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, MapPin, MessageCircle, UserPlus, UserMinus, UserCheck, Users } from 'lucide-react'
import { toast } from "sonner"
import { UserSearchingType } from "@/type"
import { useQueryClient } from "@tanstack/react-query"

export function UserCard({ user }: { user: UserSearchingType }) {
  const [relationshipState, setRelationshipState] = useState({
    isFriend: user.isFriend,
    isFollowing: user.isFollowing,
    isFollower: user.isFollower
  })
  const [isLoading, setIsLoading] = useState(false)
  const clientQuery = useQueryClient()
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  async function handleAddFriend() {
    setIsLoading(true)
    const userFollowingId = user._id;
    if (!userFollowingId) {
      toast.error("Something wrong happened")
      return
    }
    const preRelatetionShip = { ...relationshipState }
    setRelationshipState(prev => ({ ...prev, isFollowing: true }))
    try {
      const res = await fetch(`/api/friend-requests`, {
        method: "POST",
        body: JSON.stringify({
          toUserId: userFollowingId,
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Server error.")
      }

      toast.success("Friend request sent!")

    } catch (e) {
      console.error(e);
      toast.error(`${e}`)
      setRelationshipState(preRelatetionShip)
    } finally{
      setIsLoading(false)
    }
  }

  async function handleRemoveFriend() {
    setIsLoading(true)
    if (!relationshipState.isFriend) {
      toast.error("You guys are not friend yet to remove.")
    }
    const preRelatetionShip = { ...relationshipState }
    setRelationshipState(prev => ({ ...prev, isFriend: false }))
    try {
      const res = await fetch(`/api/friends`, {
        method: "DELETE",
        body : JSON.stringify({
          friendId : user._id,
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Server error.")
      }

      clientQuery.invalidateQueries({ queryKey: ["Friends"] });
      toast.success("Friend removed")
    } catch (e) {
      console.error(e);
      toast.error(`${e}`)
      setRelationshipState(preRelatetionShip)
    }finally{
      setIsLoading(false)
    }
  }

  async function cancelRequest() {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/friend-requests`, {
        method: "DELETE",
        body : JSON.stringify({
          toUserId : user._id,
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Server error.")
      }

      toast.success("Unfollowed")
      setRelationshipState(prev => ({ ...prev, isFollowing: false }))

    } catch (e) {
      console.error(e);
      toast.error(`${e}`)
    } finally{
      setIsLoading(false)
    }
  }

  async function handleAccept() {
    setIsLoading(true)
    if (!relationshipState.isFollower) {
      toast.error("This person didnt send you request.")
    }
    const preRelatetionShip = { ...relationshipState }
    setRelationshipState(prev => ({ ...prev, isFriend: true }))
    try {
      const res = await fetch(`/api/friend-requests/accept`, {
        method: "POST",
        body: JSON.stringify({
          requestId : user.requestId,
          fromUserId : user._id,
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Server error.")
      }

      toast.success("you two now are friend!")
      setRelationshipState(prev => ({ ...prev, isFollowing: true }))

      clientQuery.invalidateQueries({ queryKey: ["Friends"] });
    } catch (e) {
      console.error(e);
      toast.error(`${e}`)
      setRelationshipState(preRelatetionShip)
    } finally{
      setIsLoading(false)
    }
  }

  const renderActionButton = () => {
    if (relationshipState.isFriend) {
      return (
        <Button 
        disabled = {isLoading}
          onClick={handleRemoveFriend} 
          className="flex-1 hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white"
        >
          <UserMinus className="h-4 w-4 mr-2" />
          UnFriend
        </Button>
      )
    }

    if (relationshipState.isFollowing) {
      return (
        <Button 
        disabled = {isLoading}
          onClick={cancelRequest} 
          variant="outline" 
          className="flex-1 hover:cursor-pointer  bg-red-500 hover:bg-red-600 border-orange-200 "
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Cancel request
        </Button>
      )
    }

    if (relationshipState.isFollower && !relationshipState.isFollowing) {
      return (
        <Button 
        disabled = {isLoading}
          onClick={handleAccept} 
          className="flex-1 hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Users className="h-4 w-4 mr-2" />
          Accept
        </Button>
      )
    }

    return (
      <Button 
      disabled = {isLoading}
        onClick={handleAddFriend} 
        className="flex-1 bg-lime-500 hover:cursor-pointer hover:bg-lime-700 text-white"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        Add Friend
      </Button>
    )
  }

  return (
    <Card className="bg-white border-2 border-gray-300 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-200 rounded-lg">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-orange-200">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-orange-500 text-white">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-xl text-gray-900 mb-1">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email || "unknown email"}</p>
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
            <div className="font-bold text-lg text-gray-900">{user?.roomsOwn?.length || 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Owned</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900">{user?.rooms?.length || 0}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Joined</div>
          </div>
        </div>

        <div className="flex gap-2">
          {renderActionButton()}
          <Button variant="outline" size="icon" className=" hover:cursor-pointer border-orange-200 hover:bg-orange-50">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
