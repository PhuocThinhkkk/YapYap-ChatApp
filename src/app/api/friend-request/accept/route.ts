import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import {   accepteRequest, addFriend, } from "@/lib/db/friend";

export async function  POST(req : NextRequest) { //eslint-disable-line
    try{
        const userId = await getUserIdInSession();
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        const { requestId, fromUserId } = await req.json()
        const res = await accepteRequest(requestId, userId)
        if (!res.acknowledged) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        await addFriend(requestId, fromUserId)

        return NextResponse.json( { message: "success" } ,{status: 200})
    }catch(e){
        console.error(e)
        return NextResponse.json( { message: "Server Error" } ,{status: 500})
    }
}
