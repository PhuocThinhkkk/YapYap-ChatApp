'use client'
import { Input } from "@/components/ui/input"
import { MessageCircle} from "lucide-react"
import JoinRoomPopup from "./JoinRoomPopup";
import { useState } from "react";


const SearchRoom = () => {
    const [roomName, setRoomName] = useState<string>("");
  return (
    <div className="grid grid-cols-7 gap-4 items-center relative w-full h-12 ">
        <MessageCircle className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" ></MessageCircle>
        <Input
        type="text"
        placeholder="Rooms name: "
        className="col-span-5 lg:col-span-6 pl-10 w-full h-full"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        name="roomName"
        />
        <JoinRoomPopup  roomName={roomName} />
    </div>
  )
}

export default SearchRoom