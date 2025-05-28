export const dynamic = 'force-dynamic'

import connectDB from "@/lib/mongoDb"
import { getUserInSession } from "@/lib/auth";
import Room from "@/schema/room";
import User from "@/schema/user";
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
 
    const leader = await getUserInSession();
    if(!leader) return NextResponse.json({message: "user dont have session."}, {status: 400})
    
    console.log("user cookie in api route: ",leader)
    const leaderId = leader._id;

    const userdb = await User.findById(leaderId);
    if(!userdb) return NextResponse.json({message: "no user in db. "}, {status: 400})
    

    console.log("Creating room with:", {
      roomName: room.roomName,
      password: room.password,
      maxPeople: room.maxPeople,
      leaderId,
      users: [leaderId],
    });

  
    const res = await Room.create({
      roomName : room.roomName,
      password : room.password,
      maxPeople : room.maxPeople,
      leaderId,
      users: [leaderId],
    });

    console.log("new room have been created successfully");
    return NextResponse.json({ ...res, status: 200 });
  }
  catch (error){
    console.error(error);
  }
  
}