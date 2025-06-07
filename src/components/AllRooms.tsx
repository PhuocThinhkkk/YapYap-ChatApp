import { Card, CardContent, CardFooter} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import ButtonJoinRoom from "@/components/ButtonJoinRoom"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import connectDB from "@/lib/mongoDb"
import Room from "@/schema/room"
import User from "@/schema/user"
import { getUserIdInSession } from "@/lib/session";
import { cookies } from "next/headers"
import { UIError } from "./ui-error"
import { MessageCircle, Users, Zap, TrendingUp } from "lucide-react"
import { RoomDb } from "@/type"
import MESSAGE from "@/schema/message"




export const revalidate = 180

const AllRooms = async () => {
    await cookies();
    await connectDB();
    const userIdInSession = await getUserIdInSession();
    if(!userIdInSession) {
      console.log("unauthorize")
      return <UIError className="w-full text-center" title="Please sign in to see this page"/>
    }
   
    console.log("user cookies : ",userIdInSession)

    const roomIdDb : RoomDb[] = await Room.find({ users : userIdInSession });
    console.log("roomIdDb :",roomIdDb)
    
    const user  = await User.findById(userIdInSession)
    if(!user) {
      return <UIError className="w-full text-center" title="There is something wrong "/>
    }
    let isChange : boolean = false;
    const rooms : string[] = user.rooms;
    const roomsOwn : string[] = user.roomsOwn;
    const roomsFull : RoomDb[] = [];
    for (let i = 0; i < rooms.length; i++) {
      const room = await Room.findById(rooms[i]);
      if(room) {
        roomsFull.push(room);
      }
      if(room && room.leaderId == userIdInSession && !roomsOwn.toString().includes(room._id)){
        roomsOwn.push(room._id);
        isChange = true;
      }
    }
    console.log("rooms :",rooms)
    
  
    
    for (let i = 0; i < roomIdDb.length; i++) {
      if(!rooms.toString().includes(roomIdDb[i]._id.toString()) ) {
        rooms.push(roomIdDb[i]._id);
        roomsFull.push(roomIdDb[i]);
        isChange = true;
      }
    
    }
  
    for (let i = 0; i < rooms.length; i++) {
      for(let j = 0; j < i; j++){
        if(rooms[i].toString() == rooms[j].toString()){
          rooms.splice(i, 1);
          isChange = true;
        }
      }
    }
    
      
  
    if(isChange) {
      await User.updateOne({ _id: userIdInSession }, { $set: { rooms, roomsOwn } });
      console.log("rooms after update :",rooms)
    }

    return (
    <>
      <RoomsStats rooms={roomsFull} userId={userIdInSession}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {roomsFull?.map((room , index) =>
            <Card className="m-4" key={index}>
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
        )}
    </div>
    
    </>  
   
       
        
    )
}

async function RoomsStats ({ rooms, userId } : { rooms : RoomDb[], userId : string}) {
  await connectDB()
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(24, 0, 0, 0));

  const countMessage = await MESSAGE.countDocuments({
    userId: userId,
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay
    }
});
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2 mx-4">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Rooms</p>
              <p className="text-3xl font-bold">{rooms.length}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Maximum Users</p>
              <p className="text-3xl font-bold">{rooms.reduce((sum, room) => sum + room.maxPeople, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Members</p>
              <p className="text-3xl font-bold">{rooms.reduce((sum, room) => sum + room.users.length, 0)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Messages Today</p>
              <p className="text-3xl font-bold">{countMessage}</p>
            </div>
            <Zap className="w-8 h-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>
    </div>

  )
}

export default AllRooms