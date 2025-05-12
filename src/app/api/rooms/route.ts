export const dynamic = 'force-dynamic'

import connectDB from "@/lib/mongoDb";
import Room from "@/schema/room";
import { type NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        await connectDB();

        const rooms = await Room.find({ users : userId })
        if(rooms.length == 0) {
            console.log("rooms length 0")
            return NextResponse.json({message: 'you dont have any room. '}, {status: 400})
        }
        console.log("rooms in route handler",rooms)
        return NextResponse.json(rooms,{status: 200})
    }catch(err){
        return NextResponse.json({message: `something wrong with server ${err}`}, {status: 500})
    }
}