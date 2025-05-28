
import { NextRequest, NextResponse } from "next/server";
import User from "@/schema/user";
import { getUserInSession } from "@/lib/auth";
import { UserDB } from "@/type";


export async function GET (req : NextRequest, { params } : {params: Promise<{userId: string}>}){
    const { userId } = await params;

    const userdb = await User.findById(userId).lean();
    if (!userdb) {
        return NextResponse.json( { message: "user not found!" } , { status: 400 } )
    }
    
    const payload = await getUserInSession();
    if(!payload) return NextResponse.json({message: 'you dont have session.'}, {status: 401})
    const user : UserDB = JSON.parse(JSON.stringify(userdb));
    return NextResponse.json( user, { status: 200 } )

}