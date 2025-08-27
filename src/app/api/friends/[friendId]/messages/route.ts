export const dynamic = 'force-dynamic'
import  { NextResponse, type NextRequest } from "next/server";
import MESSAGE from "@/schema/message";
import connectDB from "@/lib/mongoDb";
import { getUserIdInSession } from "@/lib/session";
import { getMessagesByFriendId,  } from "@/lib/db/message";
import { getFriendById } from "@/lib/db/friend";


export async function GET( req : NextRequest , {params} : {params : Promise<{friendId : string}>}){
  try{
    const {friendId} = await params;
    const userIdInSession = await getUserIdInSession();
    if (!userIdInSession) {
      return NextResponse.json({messages: "Unauthorize."}, {status : 400});
    }
    const relationship = await getFriendById(friendId)
    if(!relationship){
      return NextResponse.json({messages: "Unauthorize."}, {status : 400});
    }
    if (!(relationship.user1._id === userIdInSession) && !(relationship.user2._id === userIdInSession)) {
      return NextResponse.json({messages: "Unauthorize."}, {status : 400});
    }

    const messages = await getMessagesByFriendId(friendId)
    return NextResponse.json(messages, {status: 200})

  }catch(err){
    console.log("error when getting room's messages :", err);
    return NextResponse.json({message: `error when getting room's messages ${err}`}, {status: 500});
  }
}


export async function POST( req : NextRequest ) { 
  try{
    const data = await req.json();
    if(!data)  return NextResponse.json({ message: 'Content is required' },{ status: 400 });
    const { userId , friendId , info,  } : {userId: string, friendId : string, info: string,}= data;

    await connectDB(); 

    await MESSAGE.create(
      {
        user : userId,
        friendId,
        info,
      }
    );

    return NextResponse.json({message: `create message to db`}, {status: 200});
  }catch(err){
    console.log("error: ", err);
    return NextResponse.json({message: `error ${err} when create message`}, {status: 500 })
  }

}
