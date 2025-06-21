import { searchForUsersByName, searchForUsersByNameNotIncludeCurrentUser } from "@/lib/db/userdb";
import { getUserIdInSession } from "@/lib/session";
import { type NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try{
        const { searchParams } = new URL(req.url);
        const userName = searchParams.get('userName');
        if (!userName) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        const userId = await getUserIdInSession()
        let users
        if (!userId) {
            users = await searchForUsersByName(userName)
        }else{
            users = await searchForUsersByNameNotIncludeCurrentUser(userName, userId)
        }

        return NextResponse.json( users ,{status: 200})
    }catch(err){
        return NextResponse.json({message: `something wrong with server ${err}`}, {status: 500})
    }
}