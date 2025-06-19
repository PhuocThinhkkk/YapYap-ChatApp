import { Card, CardContent, CardFooter} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RoomDb } from "@/type"
import ButtonJoinRoom from "./ButtonJoinRoom"
import { cn } from "@/lib/utils"
const RoomCard = ({
    room
}: {
    room: RoomDb
}) => {
  return (
   <Card className="m-4">
        <div className="flex h-15 m-4">
        <div className="w-15 h-15">
            <Avatar>
                <AvatarFallback>{room.roomName.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
        <span  className={cn(
                "m-4 leading-none items-end text-2xl font-bold"
                )} >       
            {room.roomName}
        </span>
        </div>
        <CardContent >Max people : {room.maxPeople}</CardContent>
        <CardFooter>
            <ButtonJoinRoom roomId = {room._id}></ButtonJoinRoom>
        </CardFooter>
    </Card>
  )
}

export default RoomCard