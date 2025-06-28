import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RoomDb } from "@/type"
import ButtonJoinRoom from "./ButtonJoinRoom"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { MapPin, Crown, Users } from "lucide-react"

const RoomCard = ({
    room
}: {
    room: RoomDb
}) => {const memberPercentage = (room.users.length / room.maxPeople) * 100

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 border-slate-200 hover:border-slate-300">
      <CardHeader className="pb-3">
        {/* Room Header with Avatar and Name */}
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={room.avatarUrl} alt={room.roomName} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                {room.roomName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-lg text-slate-900 truncate leading-tight">{room.roomName}</h3>
              {room.category && (
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {room.category}
                </Badge>
              )}
            </div>
            {room.description && <p className="text-sm text-slate-600 mt-1 line-clamp-2">{room.description}</p>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Member Count with Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-slate-600">
              <Users className="w-4 h-4" />
              <span>Members</span>
            </div>
            <span className="font-medium text-slate-900">
              {room.users.length}/{room.maxPeople}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                memberPercentage >= 90 ? "bg-red-500" : memberPercentage >= 70 ? "bg-yellow-500" : "bg-green-500",
              )}
              style={{ width: `${Math.min(memberPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Leader Info */}
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
          <Avatar className="h-6 w-6">
            <AvatarImage src={room.leaderId.avatarUrl} alt={room.leaderId.name} />
            <AvatarFallback className="text-xs">{room.leaderId.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500">Room Leader</p>
            <p className="text-sm font-medium text-slate-900 truncate">{room.leaderId.name}</p>
          </div>
          <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
        </div>

        {/* Additional Info */}
        <div className="space-y-1 text-xs text-slate-500">
          {room.createdAt && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Created {room.createdAt?.toDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <ButtonJoinRoom roomId={room._id} className="w-full hover:cursor-pointer duration-300 bg-blue-600" />
      </CardFooter>
    </Card>
  )
}

export default RoomCard