import ChatRoomFriend from "@/components/ChatRoomFriend";
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "@/components/ui-error";
import { getFriendById } from "@/lib/db/friend";
import { getFriendRoom } from "@/lib/utils";



export default async function Page({
  params,
}: {
  params: Promise<{ friendId : string }>
}) {
  try{
    const { friendId } = await params
    const userIdInSession = await getUserIdInSession()
    if (!userIdInSession) {
     throw new Error("You dont have session. Please sign in to continue.")
    }
    const relation = await getFriendById(friendId)

    let currentUser
    let ortherUser
    if(relation.user1._id == userIdInSession){
      currentUser = relation.user1
      ortherUser = relation.user2
    }
     if(relation.user2._id == userIdInSession){
      currentUser = relation.user2
      ortherUser = relation.user1
    }
    if ( !currentUser || !ortherUser ) {
      throw new Error("Unauthorize.")
    }

    if(!currentUser?._id || !ortherUser?._id ){
        throw new Error("Some information is missing.")
    }

    if(currentUser._id === ortherUser._id){
        throw new Error("You cant chat with yourself.")
    }

    const FriendRoom = getFriendRoom(currentUser._id, ortherUser._id)
    return (
      <ChatRoomFriend currentUser={currentUser} ortherUser={ortherUser} friendId={friendId} FriendRoom={FriendRoom}></ChatRoomFriend>
    )
  }catch(e){
    console.error(e)
    return <UIError className="w-full" title={`${e}`}/>
  }
 
}
