export const dynamic = 'force-dynamic'
import { getUserIdInSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import User from "@/schema/user";
import MESSAGE from "@/schema/message";
import Room from "@/schema/room";
import connectDB from "@/lib/mongoDb";
import { MessageDB } from "@/type";


export async function GET (req : NextRequest, {params}:  { params : Promise<{userId : string}>}) {
    try{
        const { userId } = await params;
        const userIdSession = await getUserIdInSession()

        if(userId != userIdSession) {
            return NextResponse.json({message: "unauthorized "}, {status: 400})
        }
        await connectDB()
        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({message: "unauthorized "}, {status: 400})
        }

        const arrUserRooms : string[] = user.roomsOwn;
        if(arrUserRooms.length == 0) return NextResponse.json({message: "create a room to see data."}, {status: 400})

           
        const letters = '0123456789ABCDEF';
        const result = [];
        
        for (let i = 0; i < arrUserRooms.length; i++) {
            const room = await Room.findById(arrUserRooms[i])
            if (!room) {
                return NextResponse.json({message: "something not very good!"}, {status: 400})
            }

            let count ;
            const messages : MessageDB[] | null = await MESSAGE.find({roomId : arrUserRooms[i]})
            if(!messages) count = 0;
            else{
                count = messages.length
            }

            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        
            
            result.push(
                {   
                    id : room._id.toString(),
                    roomName : room.roomName,
                    count,
                    fill : color,
                }
            )


        }
        return NextResponse.json(result, {status: 200})
    }catch(e){
        console.log("error in the pie chart api route : ",e)
        return NextResponse.json({message: "something not very good!"}, {status: 500})
    }
}