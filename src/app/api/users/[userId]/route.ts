import { NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import { getUserById } from "@/lib/db/userdb";


export async function GET (){
    try{
        const userIdInSession : string | null = await getUserIdInSession();
        if(!userIdInSession) return NextResponse.json({message: 'you dont have session.'}, {status: 401})
        const user = await getUserById(userIdInSession)
        return NextResponse.json( user, { status: 200 })
    }catch(e){
        return NextResponse.json( {message: `${e}`}, { status: 500 } )
    }
}