"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Plus, MoreVertical, Search} from "lucide-react"

// Sample data for conversations
const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, how's it going?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can we meet tomorrow?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Team Alpha",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "David: Let's finalize the project",
    time: "Monday",
    unread: 0,
  },
  {
    id: 5,
    name: "Jessica Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Looking forward to seeing you",
    time: "Monday",
    unread: 0,
  },
]

// Sample messages for a conversation
const sampleMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hey, how's it going?",
    time: "10:30 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Pretty good! Just working on that project we discussed.",
    time: "10:32 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    content: "That sounds great! How's the progress so far?",
    time: "10:33 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Me",
    content: "I've completed about 70% of it. Should be done by tomorrow.",
    time: "10:35 AM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Sarah Johnson",
    content: "Perfect! Let me know if you need any help or resources.",
    time: "10:36 AM",
    isMe: false,
  },
]

export default function MessagingPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState(sampleMessages)

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Me",
        content: messageInput,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      }
      setMessages([...messages, newMessage])
      setMessageInput("")
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-full max-w-xs border-r bg-background">
        <div className="flex h-16 items-center justify-between px-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations" className="pl-8" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="px-2 py-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`flex w-full items-center gap-3 rounded-lg p-2 text-left ${
                  activeConversation.id === conversation.id ? "bg-muted" : "hover:bg-muted/50"
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <Avatar>
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{conversation.name}</span>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {conversation.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Conversation Header */}
        <div className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
              <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{activeConversation.name}</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-right text-xs ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
