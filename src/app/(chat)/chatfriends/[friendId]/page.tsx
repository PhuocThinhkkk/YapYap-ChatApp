import ChatRoomFriend from "@/components/ChatRoomFriend";
import { getUserIdInSession } from "@/lib/session";
import { UIError } from "@/components/ui-error";
import { getFriendById } from "@/lib/db/friend";



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
    console.log("user Id", userIdInSession)
    const relation = await getFriendById(friendId)
    console.log(relation)
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

    return (
      <ChatRoomFriend currentUser={currentUser} ortherUser={ortherUser} friendId={friendId}></ChatRoomFriend>
    )
  }catch(e){
    console.error(e)
    return <UIError className="w-full" title={`${e}`}/>
  }
 
}
