import  { NextResponse, type NextRequest } from "next/server";
import connectDB from "@/lib/mongoDb";
import Room from "@/schema/room";



export async function GET( req : NextRequest , {params} : {params : Promise<{roomid : string}>}){
  try{
    const { roomid } = await params;
    console.log("room id ", roomid)
    await connectDB()
    const roomData = await Room.findById(roomid);
    if( !roomData ) return NextResponse.json({message : " no room like this "}, {status : 400});
    console.log(roomData)
    return NextResponse.json(roomData, {status: 200})

  }catch(err){
    console.log("error when getting room's roomData :", err);
    return NextResponse.json({message : `error when getting room's roomData ${err}`}, {status: 500});
  }
}


