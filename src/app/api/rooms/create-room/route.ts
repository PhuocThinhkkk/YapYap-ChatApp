export const dynamic = 'force-dynamic'

import connectDB from "@/lib/mongoDb"
import { getUserIdInSession } from "@/lib/session";
import Room from "@/schema/room";
import User from "@/schema/user";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";




export async function POST( req : NextRequest ) {
  try { 
    const room = await req.json()
    room.maxPeople = Number(room.maxPeople)
    console.log(room)
    await connectDB();
    
    const isExist = await Room.findOne({ roomName : room.roomName } );
    if(isExist){
      console.log("room name exist");
      return NextResponse.json({ message: "room name exist" }, { status: 400 });
    }
 
    const userIdInSession = await getUserIdInSession();
    if(!userIdInSession) return NextResponse.json({message: "user dont have session."}, {status: 400})
    
    console.log("user cookie in api route: ",userIdInSession)
  
    const userdb = await User.findById(userIdInSession);
    if(!userdb) return NextResponse.json({message: "no user in db. "}, {status: 400})
    

    console.log("Creating room with:", {
      roomName: room.roomName,
      password: room.password,
      maxPeople: room.maxPeople,
      userIdInSession,
      users: [userIdInSession],
    });

  
    const res = await Room.create({
      roomName : room.roomName,
      password : room.password,
      maxPeople : room.maxPeople,
      userIdInSession,
      users: [userIdInSession],
    });

    console.log("new room have been created successfully");
    revalidatePath("/rooms")
    return NextResponse.json({ ...res, status: 200 });
  }
  catch (error){
    console.error(error);
  }
  
}