export const dynamic = 'force-dynamic'
import  { NextResponse, type NextRequest } from "next/server";
import MESSAGE from "@/schema/message";
import connectDB from "@/lib/mongoDb";
import { getUserIdInSession } from "@/lib/session";
import Room from "@/schema/room";  
import { getUserAndRoomById } from "@/lib/db/userdb";
import { getMessagesWithUserByRoomId } from "@/lib/db/message";


export async function GET( req : NextRequest , {params} : {params : Promise<{roomid : string}>}){
  try{
    const { roomid } = await params;
    console.log("room id ", roomid)
    await connectDB();

    const userIdInSession = await getUserIdInSession();
    if (!userIdInSession) {
      return NextResponse.json({messages: "Unauthorize."}, {status : 400});
    }
    console.log(!!Room)
    console.log(!!MESSAGE)
    const user = await getUserAndRoomById(userIdInSession, roomid)
    if (!user.rooms || user?.rooms.length === 0) {
      return NextResponse.json({messages: "Unauthorize."}, {status : 400});
    }

    const messages = await getMessagesWithUserByRoomId(roomid)
    if(messages.length === 0 || !messages ) return NextResponse.json({messages: "no data in this room"}, {status : 400});
    console.log("messages in route handler: ",messages)
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
    const { userId , roomName, info, roomId } : {userId: string, roomName: string, info: string, roomId : string }= data;

    await connectDB(); 

    await MESSAGE.create(
      {
        user : userId,
        roomName,
        info,
        room: roomId,
      }
    );

    return NextResponse.json({message: `create message to db`}, {status: 200});
  }catch(err){
    console.log("error: ", err);
    return NextResponse.json({message: `error ${err} when create message`}, {status: 500 })
  }

}