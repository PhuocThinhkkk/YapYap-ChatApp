import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";

export async function POST(req : NextRequest) {
    try{
        
        const followerId = await getUserIdInSession()
        if (!followerId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }

        const user2Id = await req.json()
        if ( !user2Id ) {
          return NextResponse.json({message: 'missing field. '}, {status: 400})
        }
 
        const result = "test"

        
        return NextResponse.json( result ,{status: 200})
    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}