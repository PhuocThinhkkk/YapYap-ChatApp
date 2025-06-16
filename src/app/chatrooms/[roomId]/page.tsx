export const dynamic = 'force-dynamic'

import { SocketProvider } from "@/components/socketProvider";
import LiveChat from "@/components/LiveChat";
import connectDB from "@/lib/mongoDb.js";
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "@/components/ui-error";

import mongoose from "mongoose";
import { getUserAndRoomById } from "@/lib/db/userdb";




const Page = async ( {params} : {params : Promise<{ roomId : string }>}) => {
  try{
    const roomId = (await params).roomId;
    await connectDB()
    console.log("Registered models:", Object.keys(mongoose.models));
    const userIdInSession = await getUserIdInSession()
    if (!userIdInSession) {
     throw new Error("You dont have session. Please sign in to continue.")
    }
    console.log("user Id", userIdInSession)
    const user = await getUserAndRoomById(userIdInSession, roomId)
    console.log(user)
    if ( !user.rooms?.[0] ) {
      throw new Error("Unauthorize.")
    }

    const roomData = user.rooms[0]  

    return (
      <SocketProvider>
        <LiveChat userId={user._id} room={roomData}></LiveChat>
      </SocketProvider>
    )
  }catch(e){
    console.error(e)
    return <UIError className="w-full" title={`${e}`}/>
  }
 
}

export default Page