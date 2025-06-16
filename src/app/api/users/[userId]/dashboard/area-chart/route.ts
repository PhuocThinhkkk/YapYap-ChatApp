export const dynamic = 'force-dynamic'

import connectDB from "@/lib/mongoDb";
import User from "@/schema/user";

import MESSAGE from "@/schema/message";
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import { roomMessageChartData, MessageDB } from "@/type"

const dayWeek = ["Sunday","Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"] as const


export async function GET( res : NextRequest, { params } : {params: Promise<{userId: string}>}){
    const { userId } = await params;
    
    const userIdInSession = await getUserIdInSession();
    
    if (  (userIdInSession != userId) ) {

        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    await connectDB();
    
    const user = await User.findById(userId);
    if(!user) return NextResponse.json({message: "No user like this in database."}, {status: 401});

    const rooms : string[] = user.rooms;
    const roomsOwn : string[] = user.roomsOwn;
    const roomsOrther : string[] = [];
    for (let i = 0; i < rooms.length; i++) {
        if (!roomsOwn.toString().includes(rooms[i].toString())) {
            roomsOrther.push(rooms[i]);
        }
        
    }

    const sevenDaysAgo = dayjs().subtract(7, 'day').toDate();
    const allMessage : MessageDB[] = await MESSAGE.find({user: userId, createdAt: {$gte : sevenDaysAgo}})
    if (allMessage.length == 0) {
        return NextResponse.json({message: "You havent have any messages in the last 7 days."}, {status: 404});
    }

    const chartDataMap : Record<string, roomMessageChartData> = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
    
        const dateStr = date.toISOString().split('T')[0];
        const dayInWeek = dayWeek[date.getUTCDay()] as roomMessageChartData["dayInWeek"];
    
        chartDataMap[dateStr] = {
            date: dateStr,
            dayInWeek: dayInWeek,
            yourRoom: 0,
            orthersRoom: 0,
        };
    }

    for (let i = 0; i < allMessage.length; i++) {
        const msg = allMessage[i];
        if(!msg.createdAt) {
            console.error("msg.createAt :", msg.createdAt)
            return NextResponse.json({message: 'Server error!'}, {status: 500})
        }
        const dateObj : Date = new Date(msg.createdAt)  
        const dateStr : string = dateObj.toISOString().split("T")[0];

        if (!chartDataMap[dateStr]) {  // sometime it wont have
           continue;
        }

        if (allMessage[i].user.toString() == userId) {
            chartDataMap[dateStr].yourRoom += 1;
        }else{
            chartDataMap[dateStr].orthersRoom += 1;
        }
    }

    const chartDataArray : roomMessageChartData[] = Object.values(chartDataMap);
    return NextResponse.json(chartDataArray, {status: 200})

}