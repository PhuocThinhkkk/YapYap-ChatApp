
import { NextResponse } from "next/server";
import User from "@/schema/user";
import { getUserIdInSession } from "@/lib/session";
import connectDB from "@/lib/mongoDb";


export async function GET (){
    try{
        const userIdInSession : string | null = await getUserIdInSession();
        if(!userIdInSession) return NextResponse.json({message: 'you dont have session.'}, {status: 401})
        
        await connectDB();
        const user = await User.findById(userIdInSession);
        if (!user || user.role != "Admin") {
            throw new Error("unauthorized")
        }
        const users = await User.find();
        return NextResponse.json( users, { status: 200 } )
    }catch(e){
        return NextResponse.json( {message: `${e}`}, { status: 200 } )
    }
}