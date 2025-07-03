"use client"
import type React from "react"
import { useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Search, Plus, ArrowLeftFromLine, Loader2 } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"
import Cookie from "js-cookie"
import { useParams, useRouter } from "next/navigation"
import { UIError } from "@/components/ui-error"
import type { Conversations, FriendType, RoomDb } from "@/type"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

type ParamsType = {
  roomId? : string,
  friendId? : string
}

const LeftSideBar = ({ isOpen }: { isOpen: boolean }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const params = useParams<ParamsType>()
  const [userId, setUserId] = useState<string | null>(null)
  const { data, isLoading, error } = useQuery({
    queryKey: ['UserInfor', userId],
    enabled: !!userId,
    queryFn: async () => {
        const response = await fetch(`/api/users/${userId}/data`)
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Network response was not ok')
        }
        return data as Conversations[];
    },
  })
  const route = useRouter()
  
  const isRoomRoute = params.roomId ? true : false

   useEffect(()=>{
    try {
      const userCookie = Cookie.get('user')
      if (!userCookie) {
        throw new Error("Please sign in to continue")
      }
      const user = JSON.parse(userCookie);
      if (!user?._id) {
        throw new Error("Please sign in to continue")
      }
      setUserId(user._id)
    } catch (error) {
      toast.error(`${error}`)
    }
  },[])

  let activeConversation : Conversations;
  if (data) {
    for (let index = 0; index < data.length; index++) {
      if (isRoomRoute && data[index]._id === params.roomId) {
        activeConversation = data[index]
        break;
      }
      if (!isRoomRoute && data[index]._id === params.friendId) {
        activeConversation = data[index]
        break;
      }
    
    }
  }
  

  const filteredConversations = useMemo(() => {
    if (!data) {
      return
    }
    if (!searchTerm.trim()) {
      return data
    }

      return data.filter((conversation) => {
      if (conversation.type === 'room') {
        const temp = conversation as RoomDb
        return temp.roomName 
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }

      if (conversation.type === 'friend') {
        const temp = conversation as FriendType
        const otherUser =
          temp.user1._id === userId
            ? temp.user2
            : temp.user1;

        return otherUser.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }

      return false;
    });
  }, [data, searchTerm])

  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div
      className={`top-0 h-[calc(100vh-7rem)] fixed lg:block lg:static z-20 w-80 ${isOpen ? "-translate-x-0" : "-translate-x-full"} transition-transform transform duration-300 lg:translate-x-0`}
    >
      <div className="grid-cols-1 h-full w-full max-w-xs border-r bg-background">
        <Link href="/rooms">
          <Button className="hover:bg-slate-50 hover:cursor-pointer w-15 h-7 bg-background text-black border-0">
            <ArrowLeftFromLine />
          </Button>
        </Link>
        <div className="flex h-16 items-center justify-between px-4">
          <div className="w-5"></div>
          <h2 className="text-lg text-center font-semibold">Messages</h2>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-slate-50 hover:cursor-pointer"
            onClick={() => route.push("/create-room")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations"
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-6 w-6 p-0 hover:bg-muted"
                onClick={clearSearch}
              >
                ×
              </Button>
            )}
          </div>
        </div>
        {isLoading && <div className="h-full w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-primary h-10 w-10 " />
          </div>
        }
        {error ? (
          <UIError title="Failed to get rooms" description="Maybe server is down, please wait and then try again." />
        ) : (
          <ScrollArea className="h-[calc(100vh-1500px)]">
            <div className="px-2 py-2">
              {data?.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <p>No data found</p>
                  <p className="text-sm">Adding new friends or joining rooms to start chatting</p>
                </div>
              ) : null}
              {(filteredConversations?.length === 0 && searchTerm) ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <p>No data found</p>
                  <p className="text-sm">{"Try searching for something else"}</p>
                </div>
              ) : (
                filteredConversations?.map((conversation) => (
                  <button
                    key={conversation._id.toString()}
                    className={`flex w-full items-center gap-3 rounded-lg p-2 text-left hover:cursor-pointer h-15 ${
                      activeConversation?._id.toString() === conversation?._id.toString()
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => route.push(`/chatrooms/${conversation._id}`)}
                  >
                    <div className="w-10 h-10 flex justify-center items-center border text-xl rounded-full font-bold hover:cursor-pointer">
                      <Avatar>
                        <AvatarFallback>{conversation.roomName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {searchTerm ? (
                            <HighlightText text={conversation.roomName} highlight={searchTerm} />
                          ) : (
                            conversation.roomName
                          )}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}

// Helper component to highlight search terms
const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 text-yellow-900 rounded px-1">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </span>
  )
}

export default LeftSideBar
