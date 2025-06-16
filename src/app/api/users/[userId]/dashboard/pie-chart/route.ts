export const dynamic = 'force-dynamic'
import { getUserIdInSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import User from "@/schema/user";
import MESSAGE from "@/schema/message";
import Room from "@/schema/room";
import connectDB from "@/lib/mongoDb";
import {  resPieChart } from "@/type";


    const beautifulColors = [
        { name: "Lavender", hex: "#E6E6FA" },
        { name: "Mint Green", hex: "#98FB98" },
        { name: "Coral", hex: "#FF7F50" },
        { name: "Sky Blue", hex: "#87CEEB" },
        { name: "Peach", hex: "#FFDAB9" },
        { name: "Lilac", hex: "#C8A2C8" },
        { name: "Turquoise", hex: "#40E0D0" },
        { name: "Salmon", hex: "#FA8072" },
        { name: "Periwinkle", hex: "#CCCCFF" },
        { name: "Mauve", hex: "#E0B0FF" },
        { name: "Teal", hex: "#008080" },
        { name: "Rose Gold", hex: "#B76E79" },
        { name: "Sage Green", hex: "#BCB88A" },
        { name: "Powder Blue", hex: "#B0E0E6" },
        { name: "Blush Pink", hex: "#FFB6C1" },
    ]

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

           
    const result: resPieChart[] = [];
    const currentYear = new Date().getFullYear();

// rooms message current year
    const roomsWithCounts = await Promise.all(
        arrUserRooms.map(async (roomId) => {
            const room = await Room.findById(roomId);
            if (!room) return null;

            const messages = await MESSAGE.find({
            room: roomId,
            createdAt: { 
                $gte: new Date(`${currentYear}-01-01`), 
                $lt: new Date(`${currentYear + 1}-01-01`)
            }
            });

            return {
            id: room._id.toString(),
            roomName: room.roomName,
            count: messages?.length || 0
            };
        })
    );

    const validRooms = roomsWithCounts.filter(Boolean) as {
        id: string;
        roomName: string;
        count: number;
    }[];

    validRooms.sort((a, b) => b.count - a.count);

    
    let othersCount = 0;

    for (let i = 0; i < validRooms.length; i++) {
    if (i < 3) {
        const color = findColor(result);
        result.push({
        id: validRooms[i].id,
        roomName: validRooms[i].roomName,
        count: validRooms[i].count,
        fill: color
        });
    } else {
        othersCount += validRooms[i].count;
    }
    }

    // Others category
    if (validRooms.length > 3) {
    const color = findColor(result);
    result.push({
        id: "others",
        roomName: "Other rooms",
        count: othersCount,
        fill: color
    });
    }

        return NextResponse.json(result, {status: 200})
    }catch(e){
        console.log("error in the pie chart api route : ",e)
        return NextResponse.json({message: "something not very good!"}, {status: 500})
    }
}



function findColor( result : resPieChart[] ) : string {
    const newColor = beautifulColors[Math.floor(Math.random() *15)].hex;
    for (let index = 0; index < result.length; index++) {
        if (result.length > 3) {
            console.log("rooms in pie chart : ", result.length)
        }
        const oldColor = result[index]?.fill;
        if (oldColor == newColor) {
            return findColor(result)
        }
    }
    return newColor;
}