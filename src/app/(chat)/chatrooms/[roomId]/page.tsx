
import ChatRoom from "@/components/ChatRoom";
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "@/components/ui-error";
import { getUserAndRoomById } from "@/lib/db/userdb";



export default async function Page({
  params,
}: {
  params: Promise<{ roomId : string }>
}) {
  try{
    const { roomId } = await params
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
      <ChatRoom user={user} room={roomData}></ChatRoom>
    )
  }catch(e){
    console.error(e)
    return <UIError className="w-full" title={`${e}`}/>
  }
 
}
