export const dynamic = 'force-dynamic'

import  { NextResponse, type NextRequest } from "next/server";
import MESSAGE from "@/schema/message";
import connectDB from "@/lib/mongoDb";
import { protectRoom } from "@/lib/protectRoom";


export async function GET( req : NextRequest , {params} : {params : Promise<{roomid : string}>}){
  try{
    const { roomid } = await params;
    console.log("room id ", roomid)
    await connectDB();

    const authorization = await protectRoom(roomid);
    if(authorization != "success"){
      return NextResponse.json({message : authorization}, {status : 401});
    }
    
    const messages = await MESSAGE.find({ roomId : roomid });
    if(messages.length === 0 ) return NextResponse.json({messages: "no data in this room"}, {status : 400});
    console.log(messages)
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
        userId,
        roomName,
        info,
        roomId,
      }
    );

    return NextResponse.json({message: `create message to db`}, {status: 200});
  }catch(err){
    console.log("error: ", err);
    return NextResponse.json({message: `error ${err} when create message`}, {status: 500 })
  }

}