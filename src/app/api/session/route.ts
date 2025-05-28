export const dynamic = 'force-dynamic'

import connectDB from "@/lib/mongoDb";
import {  getUserInSession } from "@/lib/auth";
import {  NextResponse } from "next/server";
import User from "@/schema/user";

export const GET = async () =>{
    try{
        const user = await getUserInSession();
        if(!user) return NextResponse.json({ message: "You dont have session!" }, {status: 404})
        await connectDB()
        const isUserExist = await User.findById(user._id)
        if (!isUserExist) {
            return NextResponse.json({ message: "you didnt have an account!" }, { status: 400 })
        }

        return NextResponse.json( user, { status: 200 } )
    }catch(err){
        console.log("session route err: ", err)
        return NextResponse.json({ message: "there is something wrong with server!" }, { status: 500 })
    }
}