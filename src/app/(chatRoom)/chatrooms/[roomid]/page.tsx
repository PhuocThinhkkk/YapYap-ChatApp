export const dynamic = 'force-dynamic'

import { SocketProvider } from "@/components/socketProvider";
import LiveChat from "@/components/LiveChat";
import connectDB from "@/lib/mongoDb.js";
import { Suspense } from "react";
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "@/components/ui-error";
import User from "@/schema/user";

const Page = async ( {params} : {params : Promise<{ roomid : string }>}) => {

  const roomId = (await params).roomid;
  await connectDB()
  
  const userIdInSession = getUserIdInSession
  if (!userIdInSession) {
    return <UIError title="You dont have session. Please sign in to continue."/>
  }
  const user = await User.findById(userIdInSession).populate(
   {
    path: "rooms",
    match: {_id : roomId}
   }
  )
  if ( user?.rooms || user?.rooms?.length == 0 ) {
    return <UIError title="Unauthorize."/>
  }

  const roomData = user.rooms[0]
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