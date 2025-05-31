import { NextRequest, NextResponse } from "next/server";
import User from "@/schema/user";
import { getUserInSession } from "@/lib/auth";
import { UserDB } from "@/type";
import connectDB from "@/lib/mongoDb";


export async function POST (req : NextRequest, { params } : {params: Promise<{userId: string}>}){
    const userRole = await req.json()
    const { userId } = await params;
    await connectDB();
    const userdb = await User.findById(userId).lean();
    if (!userdb) {
        return NextResponse.json( { message: "user not found!" } , { status: 400 } )
    }
    const user : UserDB = JSON.parse(JSON.stringify(userdb));
    const userInSession = await getUserInSession();
    if(!userInSession) return NextResponse.json({message: 'you dont have session.'}, {status: 401})
    if(userInSession._id != user._id) return NextResponse.json({message: 'You are not alow to do this'}, {status: 401})
    
    User.findByIdAndUpdate(user._id, 
        {$set : {role : userRole}}
    )

    return NextResponse.json( {message: "success!"}, { status: 200 } )

}