import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import {   accepteRequest, addFriend, } from "@/lib/db/friend";

export async function  POST(req : NextRequest) { 
    try{
        const userId = await getUserIdInSession();
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        const { requestId, fromUserId } = await req.json()
        if (!requestId || !fromUserId) {
            return NextResponse.json({message: 'missing information. '}, {status: 401})
        }
        const res = await accepteRequest(requestId, userId)
        
        if (!res) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        await addFriend( fromUserId, userId)

        return NextResponse.json( { message: "success" } ,{status: 200})
    }catch(e){
        console.error(e)
        return NextResponse.json( { message: "Server Error" } ,{status: 500})
    }
}
