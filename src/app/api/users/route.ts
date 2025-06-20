
import { get6RandomUsers } from "@/lib/db/userdb";
import { NextResponse } from "next/server";



export async function GET (){
    try{
        const users = await get6RandomUsers()
        return NextResponse.json( users, { status: 200 } )
    }catch(e){
        return NextResponse.json( {message: `${e}`}, { status: 200 } )
    }
}