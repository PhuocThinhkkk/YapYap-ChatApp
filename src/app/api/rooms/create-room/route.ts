export const dynamic = 'force-dynamic'

import connectDB from "@/lib/mongoDb"
import { getUserIdInSession } from "@/lib/session";
import Room from "@/schema/room";
import User from "@/schema/user";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";




export async function POST( req : NextRequest ) {
  try { 
    const proPlan = [25, 50, 100];
    const room = await req.json()
    room.maxPeople = Number(room.maxPeople)
    
    await connectDB();
    
    const isExist = await Room.findOne({ roomName : room.roomName } );
    if(isExist){

      return NextResponse.json({ message: "room name exist" }, { status: 400 });
    }
 
    const userIdInSession = await getUserIdInSession();
    if(!userIdInSession) return NextResponse.json({message: "user dont have session."}, {status: 400})
    
  
  
    const userdb = await User.findById(userIdInSession);
    if(!userdb) return NextResponse.json({message: "no user in db. "}, {status: 400})
    
    if (userdb.role == "Free Plan" ) {
      for (let index = 0; index < proPlan.length; index++) {
        if (room.maxPeople == proPlan[index]) {
          return NextResponse.json({message: "Unauthorize."}, {status: 404})
        }
      }
    }

   
    const res = await Room.create({
      roomName : room.roomName,
      password : room.password,
      maxPeople : room.maxPeople,
      userIdInSession,
      users: [userIdInSession],
    });

    await User.updateOne({ _id: userIdInSession },
      { $push:{ 
        rooms: res._id ,
        roomsOwn: res._id 
      }}
    )

    
    revalidatePath("/rooms")
    return NextResponse.json({ ...res, status: 200 });
  }
  catch (error){
    
    return NextResponse.json({message: error}, {status: 500} );
  }
  
}