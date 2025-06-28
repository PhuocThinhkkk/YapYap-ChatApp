"use client"
import type React from "react"
import { useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Search, Plus, ArrowLeftFromLine } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"
import Cookie from "js-cookie"
import { useParams, useRouter } from "next/navigation"
import { UIError } from "@/components/ui-error"
import type { RoomDb } from "@/type"

const LeftSideBar = ({ isOpen }: { isOpen: boolean }) => {
  const [conversations, setConversations] = useState<RoomDb[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const params = useParams<{ roomid: string }>()
  const [activeConversation, setActiveConversation] = useState<RoomDb | null>(null)
  const [isError, setIsError] = useState(false)
  const route = useRouter()

  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) {
      return conversations
    }

    return conversations.filter((conversation) =>
      conversation.roomName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [conversations, searchTerm])

  useEffect(() => {
    const userCookie = Cookie.get("user")
    if (!userCookie) {
      alert("you need to sign in to continue !")
      return
    }
    const parsed = JSON.parse(userCookie)
    const userId = parsed._id
    console.log("user cookie :", userId)
    async function fetchData() {
      const res = await fetch(`/api/rooms?userId=${userId}`, { next: { revalidate: 30 } })
      if (!res.ok) {
        setIsError(true)
        return
      }
      const data = await res.json()
      console.log(data)
      setConversations(data)
      for (let i = 0; i < conversations.length; i++) {
        if (params.roomid === conversations[i].roomName) {
          setActiveConversation(conversations[i])
          return
        }
      }
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div
      className={`fixed lg:block lg:static z-20 w-80 h-screen ${isOpen ? "-translate-x-0" : "-translate-x-full"} transition-transform transform duration-300 lg:translate-x-0`}
    >
      <div className="grid-cols-1 h-screen w-full max-w-xs border-r bg-background">
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
        {isError ? (
          <UIError title="Failed to get rooms" description="Maybe server is down, please wait and then try again." />
        ) : (
          <ScrollArea className="h-[calc(100vh-1500px)]">
            <div className="px-2 py-2">
              {filteredConversations.length === 0 && searchTerm ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <p>No conversations found</p>
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
