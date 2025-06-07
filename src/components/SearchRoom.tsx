'use client'
import { Input } from "@/components/ui/input"
import { MessageCircle} from "lucide-react"
import JoinRoomPopup from "@/components/JoinRoomPopup";
import { useState } from "react";


const SearchRoom = () => {
    const [roomName, setRoomName] = useState<string>("");
  return (
 
  <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
      <div className="relative flex-1">
        <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" ></MessageCircle>
        <Input
        type="text"
        placeholder="Rooms name: "
        className="pl-12 h-14 text-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        name="roomName"
        />
      </div>
      <JoinRoomPopup  roomName={roomName} />
  </div>

  )
}

export default SearchRoom