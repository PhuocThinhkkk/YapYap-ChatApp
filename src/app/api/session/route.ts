export const dynamic = 'force-dynamic'
import {  getUserIdInSession } from "@/lib/session";
import {  NextResponse } from "next/server";


export const GET = async () =>{
    try{
        const userId = await getUserIdInSession();
        if(!userId) return NextResponse.json({ message: "You dont have session!" }, {status: 404})
            
        return NextResponse.json( userId, { status: 200 } )
    }catch(err){
        console.log("session route err: ", err)
        return NextResponse.json({ message: "there is something wrong with server!" }, { status: 500 })
    }
}