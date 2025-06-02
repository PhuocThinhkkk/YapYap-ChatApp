export const dynamic = 'force-dynamic'
import  { NextResponse, type NextRequest } from "next/server";
import connectDB from "@/lib/mongoDb";
import User from "@/schema/user";
import { getUserIdInSession } from "@/lib/session";




export async function GET( req : NextRequest , {params} : {params : Promise<{roomid : string}>}){
  try{
    const { roomid } = await params;
    console.log("room id ", roomid)
    await connectDB()
    
    const userIdInSession = getUserIdInSession()
    if (!userIdInSession) {
      return NextResponse.json({message : " no room like this "}, {status : 400});
    }
    
    const user = await User.findById(userIdInSession)
    .populate(
      {
        path: "rooms",
        match: {_id : roomid}
      }
    )
    if (!user?.rooms) {
      return NextResponse.json({message : " unauthorize. "}, {status : 400});
    }

    const roomsData = user.rooms;
    console.log(roomsData)
    return NextResponse.json(roomsData, {status: 200})

  }catch(err){
    console.log("error when getting room's roomData :", err);
    return NextResponse.json({message : `error when getting room's roomData ${err}`}, {status: 500});
  }
}


