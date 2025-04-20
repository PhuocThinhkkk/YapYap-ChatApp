
import connectDB from "@/lib/mongoDb"
import Room from "@/schema/room";
import { cookies } from "next/headers";
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
    const cookieStore = await cookies()
    const leader = cookieStore.get('user')
    if(!leader) return NextResponse.json({message: "user didnt have cookies."}, {status: 400})
    console.log("user cookie in api route: ",leader)
    const leaderId = JSON.parse(leader.value)._id;

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

    console.log("new room sign up successfully");
    return NextResponse.json({ ...res, status: 200 });
  }
  catch (error){
    console.error(error);
  }
  
}