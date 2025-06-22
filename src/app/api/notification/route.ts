import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import { getPendingRequest,} from "@/lib/db/friend";


export async function GET(req : NextRequest) {  //eslint-disable-line
    try{
        
        const userId = await getUserIdInSession()
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }

        const friends = await getPendingRequest(userId);

        
        return NextResponse.json( friends ,{status: 201})
    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}
