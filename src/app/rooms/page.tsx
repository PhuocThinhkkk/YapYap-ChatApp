export const dynamic = "force-dynamic";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


import ButtonCreateRoom from "./ButtonCreateRoom"
import connectDB from "@/lib/mongoDb"
import Room from "@/schema/room"
import User from "@/schema/user"
import { cookies } from "next/headers"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import ButtonJoinRoom from "./ButtonJoinRoom"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { redirect } from "next/navigation";
import SearchRoom from "./SearchRoom";



interface ROOM {
  _id: string;
  roomName: string;
  maxPeople: number,
  leaderId: string;
  users: string[];
  createdAt: Date;
}

const page = async () => {
  await connectDB();
  const cookieStore = await cookies()
  const leader = cookieStore.get('user') 
  if(!leader) {
    console.log("no user in cookies")
    redirect('/sign-in')
  }
 
  console.log("user cookies : ",leader)

  const leaderId = JSON.parse(leader.value)._id;

  const roomIdDb : ROOM[] = await Room.find({ users : leaderId });
  console.log("roomIdDb :",roomIdDb)

  const roomsId  = await User.findById(leaderId).select('rooms');
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
    if(!rooms.includes(roomIdDb[i]._id) ) {
      rooms.push(roomIdDb[i]._id);
      roomsFull.push(roomIdDb[i]);
      isChange = true;
    }
    
  }

  if(isChange) {
    await User.updateOne({ _id: leaderId }, { $set: { rooms } });
    console.log("rooms after update :",rooms)
  }
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header with trigger for mobile */}
        <header className="relative flex h-18 items-center border-b px-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="ml-2 text-lg font-semibold">Rooms</h1>
          <div className="absolute right-7 h-full  top-4">
            <ButtonCreateRoom></ButtonCreateRoom>
          </div>
        </header>
        {/* Main content */}
        <div className="space-y-8">
         
        <p className="m-4 text-center text-3xl font-bold "> Enter your rooms name:</p>
        <div className="flex justify-center min-w-full">
            <div className="relative w-4/5 lg:w-2/3 h-12 mx-auto">
               <SearchRoom/>
            </div>
        </div>
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
     
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default page