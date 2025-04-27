
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import ButtonJoinRoom from "./ButtonJoinRoom"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongoDb"
import Room from "@/schema/room"
import User from "@/schema/user"
import { getUserInSession } from "@/lib/session";



interface ROOM {
    _id: string;
    roomName: string;
    maxPeople: number,
    leaderId: string;
    users: string[];
    createdAt: Date;
}


 

const AllRooms = async () => {

    await connectDB();
    const leader = await getUserInSession();
    if(!leader) {
      console.log("no user in cookies")
      redirect('/sign-in')
    }
   
    console.log("user cookies : ",leader)
  
    const leaderId = leader.userId;
  
    const roomIdDb : ROOM[] = await Room.find({ users : leaderId });
    console.log("roomIdDb :",roomIdDb)
  
    const user  = await User.findById(leaderId)
    if(!user) {
      return
    }
    const roomsId = user.rooms;
    const rooms : string[] = [];
    const roomsFull : ROOM[] = [];
    for (let i = 0; i < roomsId.length; i++) {
      const room = await Room.findById(roomsId[i]);
      if(room) {
        rooms.push(room._id);
        roomsFull.push(room);
      }
    }
    console.log("rooms :",rooms)
  
    let isChange : boolean = false;
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
      await User.updateOne({ _id: leaderId }, { $set: { rooms } });
      console.log("rooms after update :",rooms)
    }

    return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {roomsFull?.map((room , index) =>
            <Card className="m-4" key={index}>
                <div className="flex h-15 m-4">
                <div className="w-15 h-15">
                    <Avatar>
                    <AvatarFallback>{room.roomName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
                
                <CardHeader  className=" items-end text-2xl font-bold" >       
                    {room.roomName}
                </CardHeader>
                </div>
                <CardContent >Max people : {room.maxPeople}</CardContent>
                <CardFooter>
                <ButtonJoinRoom roomId = {room._id}></ButtonJoinRoom>
                </CardFooter>
            </Card>
        )}
    </div>
    
       
        
    )
}

export default AllRooms