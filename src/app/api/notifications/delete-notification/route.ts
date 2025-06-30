import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import {   deleteRequestByTarget,} from "@/lib/db/friend";

export async function  DELETE(req : NextRequest) { 
    try{
        const userId = await getUserIdInSession();
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        const { requestId } = await req.json()
        const res = await deleteRequestByTarget(requestId, userId)
        if (!res.acknowledged) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        return NextResponse.json( { message: "success" } ,{status: 200})
    }catch(e){
        console.error(e)
        return NextResponse.json( { message: "Server Error" } ,{status: 500})
    }
}
