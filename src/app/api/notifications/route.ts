import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import { getPendingRequest, } from "@/lib/db/friend";


export async function GET(req : NextRequest) {  //eslint-disable-line
    try{
        
        const userId = await getUserIdInSession()
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }

        const requests = await getPendingRequest(userId);

        
        return NextResponse.json( requests ,{status: 201})
    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}
