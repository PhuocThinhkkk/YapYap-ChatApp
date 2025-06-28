"use client"
import { X, Check} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { FriendRequestType } from "@/type"
import { useQueryClient } from "@tanstack/react-query"

const FriendRequestNotification = ({
  notification, setNotifications
} : {
  notification : FriendRequestType, 
  setNotifications : (value: FriendRequestType[] | ((prev: FriendRequestType[]) => FriendRequestType[])) => void
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const clientQuery = useQueryClient();
  const handleAcceptRequest = async (notificationId: string, fromUserId : string) => {
    try {
      const response = await fetch("/api/friend-requests/accept", {
        method: "POST",
        body: JSON.stringify({ 
          requestId : notificationId,
          fromUserId : fromUserId
        })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to accept friend request")
      }

      setNotifications((prev ) => prev.filter((n : FriendRequestType) => n._id !== notificationId)) 
      clientQuery.invalidateQueries({ queryKey: ["Friends"] });
      console.log("Friend request accepted successfully")
    } catch (error) {
      console.error("Failed to accept friend request:", error)
    }
      
  }

  const handleRejectRequest = async (notificationId: string) => {
    

    try {
      const response = await fetch("/api/friend-requests/reject", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId : notificationId,
        }
      )})

      if (!response.ok) {
        throw new Error("Failed to reject friend request")
      }

      setNotifications((prev) => prev.filter((n) => n._id !== notificationId))

      console.log("Friend request rejected successfully")
    } catch (error) {
      console.error("Failed to reject friend request:", error)
      
    } 
  }

  const handleDeleteNotification = async (notificationId: string) => {
    setIsProcessing(true)

    try {
      const response = await fetch("/api/notifications/delete-notification", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId : notificationId,
        })
      })

      if (!response.ok) {
        throw new Error("Failed to delete notification")
      }

      setNotifications((prev) => prev.filter((n) => n._id !== notificationId))

      console.log("Notification deleted successfully")
    } catch (error) {
      console.error("Failed to delete notification:", error)
    } 
  }
  return (
    <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage
          src={notification.fromUser.avatarUrl}
          alt={notification.fromUser.name}
        />
        <AvatarFallback>
            {notification.fromUser.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
            <div>
            <p className="text-sm font-medium text-foreground">
                <span className="font-semibold">{notification.fromUser.name}</span> sent you a friend
                request
            </p>
            <p className="text-xs text-muted-foreground mt-1">{notification.createdAt.toString()}</p>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="hover:cursor-pointer h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteNotification(notification._id)
                }}
                disabled={isProcessing}
                >
            <X className="h-3 w-3" />
            </Button>
        </div>
        <div className="flex gap-2 mt-3">
            <Button
                size="sm"
                className="flex-1 hover:cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation()
                    handleAcceptRequest(notification._id, notification.fromUser._id)
                }}
                disabled={isProcessing}
                >
                <Check className="h-3 w-3 mr-1" />
                    Accept
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="flex-1 hover:cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation()
                    handleRejectRequest(notification._id)
                }}
                disabled={isProcessing}
            >
            <X className="h-3 w-3 mr-1" />
                Reject
            </Button>
        </div>
        </div>
        </div>

  )
}

export default FriendRequestNotification


