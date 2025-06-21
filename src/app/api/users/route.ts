
import { get6RandomUsers, get6RandomUsersNotIncludeCurrentUser } from "@/lib/db/userdb";
import { getUserIdInSession } from "@/lib/session";
import { NextResponse } from "next/server";



export async function GET (){
    try{
        const userId = await getUserIdInSession();
        let users
        if (!userId) {
           users = await get6RandomUsers()
        }else{
            users = await get6RandomUsersNotIncludeCurrentUser(userId)
        }
        if (!users) {
            return NextResponse.json( {message: "No users found."}, { status: 400 } )
        }
        return NextResponse.json( users, { status: 200 } )
    }catch(e){
        return NextResponse.json( {message: `${e}`}, { status: 500 } )
    }
}