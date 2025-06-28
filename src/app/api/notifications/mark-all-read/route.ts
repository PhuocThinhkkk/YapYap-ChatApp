import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import {  updateIsReadByUserId,} from "@/lib/db/friend";

export async function  PUT(req : NextRequest) { //eslint-disable-line
    try{
        const userId = await getUserIdInSession();
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        const res = await updateIsReadByUserId(userId)
        return NextResponse.json( { message: res.modifiedCount } ,{status: 200})
    }catch(e){
        console.error(e)
        return NextResponse.json( { message: "Server Error" } ,{status: 500})
    }
}
