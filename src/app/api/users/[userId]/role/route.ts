import { NextRequest, NextResponse } from "next/server";
import User from "@/schema/user";
import { getUserIdInSession } from "@/lib/session";
import connectDB from "@/lib/mongoDb";


export async function POST (req : NextRequest, { params } : {params: Promise<{userId: string}>}){
    try{
        const userRole = await req.json();
        console.log("role : ", userRole);
        const { userId } = await params;
        await connectDB();
        const userDdInSession = await getUserIdInSession();
        if(!userDdInSession) return NextResponse.json({message: 'you dont have session.'}, {status: 401})
        if(userDdInSession != userId) return NextResponse.json({message: 'You are not alow to do this'}, {status: 401})
            
        const result = await User.updateOne( 
            {_id : userId}, 
            { $set : {role : userRole} } 
        )
        console.log("result update db: ", result)
        return NextResponse.json({message: "success!"}, { status: 200 })
    }catch(e){
        return NextResponse.json( {message: `There is something wrong: ${e}`}, { status: 500 } )
    }
}