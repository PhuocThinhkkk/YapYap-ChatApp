export const dynamic = 'force-dynamic'

import { SocketProvider } from "@/components/socketProvider";
import LiveChat from "@/components/LiveChat";
import connectDB from "@/lib/mongoDb.js";
import { Suspense } from "react";
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "@/components/ui-error";
import Room from "@/schema/room";
import User from "@/schema/user";
import mongoose from "mongoose";


const Page = async ( {params} : {params : Promise<{ roomid : string }>}) => {

  const roomId = (await params).roomid;
  await connectDB()
  console.log(!!Room)
  console.log("Registered models:", Object.keys(mongoose.models));
  const userIdInSession = await getUserIdInSession()
  if (!userIdInSession) {
    return <UIError title="You dont have session. Please sign in to continue."/>
  }
  console.log("user Id", userIdInSession)
  const user = await User.findById(userIdInSession).populate({
    path: "rooms",
    match: {_id : roomId}
  })
 
  if ( !user?.rooms || user?.rooms?.length == 0 ) {
    return <UIError title="Unauthorize."/>
  }

  const roomData = user.rooms[0]  
  const roomName = roomData.roomName;

  return (
    <Suspense fallback={<div>loading</div>}>
      <SocketProvider>
        <LiveChat  roomId={roomId} roomName={roomName}></LiveChat>
     </SocketProvider>
    </Suspense>
   
  )
}

export default Page