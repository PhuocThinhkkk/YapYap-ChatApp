export const dynamic = "force-dynamic";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Input } from "@/components/ui/input"
import { MessageCircle, LucideSendHorizonal } from "lucide-react"

import ButtonCreateRoom from "./ButtonCreateRoom"
import connectDB from "@/lib/mongoDb"
import Room from "@/schema/room"
import { cookies } from "next/headers"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import ButtonJoinRoom from "./ButtonJoinRoom"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@/components/ui/avatar"


interface ROOM {
  _id: string;
  roomName: string;
  maxPeople: number,
  leaderId: string;
}


const page = async () => {
  await connectDB();
  const cookieStore = await cookies()
  const leader = cookieStore.get('user')
  if(!leader) return;
  console.log("user cookies : ",leader)
  
  const leaderId = JSON.parse(leader.value)._id;
  const rooms : ROOM[] = await Room.find({ leaderId })
  console.log("rooms  :",rooms)

  
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
            <div className="relative w-2/3 h-12">
                <MessageCircle className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" ></MessageCircle>
                
                <Input
                type="text"
                placeholder="Rooms name: "
                className="pl-10 w-full h-full"/>
               
               
                <LucideSendHorizonal className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-blue-800 text-9xl" ></LucideSendHorizonal>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {rooms?.map((room) =>
            <Card className="m-4" key={room._id.toString()}>
              <div className="flex h-15 m-4">
                <div className="w-15">
                  <Avatar>
                  <AvatarFallback>{room.roomName.charAt(0)}</AvatarFallback>
                </Avatar>
                </div>
                
                <CardHeader className=" items-end text-2xl font-bold" >       
                  {room.roomName}
                </CardHeader>
              </div>
              
              <CardContent >Max people : {room.maxPeople}</CardContent>
              <CardFooter>
                <ButtonJoinRoom roomName = {room.roomName}></ButtonJoinRoom>
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