import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import {  rejecteRequest,} from "@/lib/db/friend";

export async function  PUT(req : NextRequest) { //eslint-disable-line
    try{
        const userId = await getUserIdInSession();
        if (!userId) {
            console.log("1")
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        const requestId = await req.json()
        const res = await rejecteRequest(requestId, userId)
        if (!res.acknowledged) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        return NextResponse.json( { message: "success" } ,{status: 200})
    }catch(e){
        console.error(e)
        return NextResponse.json( { message: "Server Error" } ,{status: 500})
    }
}
