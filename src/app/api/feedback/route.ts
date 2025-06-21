import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";

import { createFeedback } from "@/lib/db/feedback";
import type {  FeedbackFormType } from "@/type";
export async function POST(req : NextRequest) {
    try{
        
        const userId = await getUserIdInSession()
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }

        const data = await req.json()
        if ( !data.title || !data.message || !data.rating || !data.category ) {
          return NextResponse.json({message: 'missing field. '}, {status: 400})
        }
        data.rating = parseInt(data.rating)
        
        const result = await createFeedback(userId, data as FeedbackFormType); 

        
        return NextResponse.json( result ,{status: 200})
    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}