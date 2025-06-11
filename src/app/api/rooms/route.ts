import connectDB from "@/lib/mongoDb";
import Room from "@/schema/room";
import { type NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


export async function GET(req : NextRequest) {
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        await connectDB();
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const rooms = await Room.find({ users: { $in: [userObjectId] } });

        if(rooms.length == 0) {
            console.log("rooms length 0")
            return NextResponse.json({message: 'you dont have any room. '}, {status: 400})
        }
        console.log("rooms in route handler",rooms)
        return NextResponse.json( rooms ,{status: 200})
    }catch(err){
        return NextResponse.json({message: `something wrong with server ${err}`}, {status: 500})
    }
}