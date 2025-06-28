"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FriendRequestType } from "@/type"
import { toast } from "sonner"
import FriendRequestNotification from "@/components/FriendRequestNotification"

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<FriendRequestType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const unreadCount = notifications.filter((n) => n.isNewToTarget).length
  
  useEffect(()=>{
    async function initialFetching(){
      try{
        const response = await fetch("/api/notifications")
        
        if (!response.ok) {
          throw new Error("Failed to update notifications")
        }

        const result = await response.json()
        setNotifications(result)
      } catch (error) {
        console.error("Failed to mark notifications as read:", error)
        toast.error('Failed to get notifications')
    }}
    initialFetching()
  },[])



  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isNewToTarget: true })))
  }

  const markAllAsReadOnClose = async () => {
    if (unreadCount > 0 && !isUpdating) {
      setIsUpdating(true)

      // Store original state in case we need to revert
      const originalNotifications = [...notifications]

      // Mark all as read locally first for immediate UI feedback
      setNotifications((prev) => prev.map((notification) => ({ ...notification, isNewToTarget: false })))

      try {
        const response = await fetch("/api/notifications/mark-all-read", {
          method: "PUT",
        })

        if (!response.ok) {
          throw new Error("Failed to update notifications")
        }

        const result = await response.json()
        console.log(result)
      } catch (error) {
        console.error("Failed to mark notifications as read:", error)
        setNotifications(originalNotifications)
        toast.error('Failed to update notifications')
      } finally {
        setIsUpdating(false)
      }
    }
  }
  console.log("notisajdf",notifications)

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        // When popover closes, mark all as read
        if (!open && isOpen) {
          markAllAsReadOnClose()
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:cursor-pointer">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "No unread notifications"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                    notification.isNewToTarget ? "bg-blue-50/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {notification.isNewToTarget && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />}
                    <FriendRequestNotification notification={notification} setNotifications={setNotifications}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
