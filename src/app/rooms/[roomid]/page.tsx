import { SocketProvider } from "@/components/socketProvider";
import LiveChat from "./LiveChat";
import connectDB from "@/lib/mongoDb.js";

import { protectRoom } from "@/lib/protectRoom";
import Room from "@/schema/room";
import { Suspense } from "react";

const Page = async ( {params} : {params : Promise<{ roomid : string }>}) => {

  const roomId = (await params).roomid;
  await connectDB()
  
  const authorization = await protectRoom(roomId);
  if(authorization != "success"){
    console.log("authorization failed")
    return <div> you are not alow to see this </div>
  }
  console.log("authorization success")
  const roomData = await Room.findById(roomId);
  if( !roomData ) return <div> no room like this </div>
  console.log(roomData)
  const roomName = roomData.roomName;
  console.log("room name: ", roomName)

  return (
    <Suspense fallback={<div>loading</div>}>

    
      <SocketProvider>
        <LiveChat  roomId={roomId} roomName={roomName}></LiveChat>
     </SocketProvider>
    </Suspense>
   
  )
}

export default Page