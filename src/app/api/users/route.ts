
import { processingRelation } from "@/lib/db/friend";
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
        for (let index = 0; index < users.length; index++) {
            await processingRelation(users[index], userId)
        }
    
        return NextResponse.json( users, { status: 200 } )
    }catch(e){
        return NextResponse.json( {message: `${e}`}, { status: 500 } )
    }
}