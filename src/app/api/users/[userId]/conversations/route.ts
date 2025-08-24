export const dynamic = 'force-dynamic'
import  { NextResponse, type NextRequest } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import { getFriendsAndRooms } from "@/lib/db/consversations";


export async function GET( req : NextRequest , {params} : {params : Promise<{userId: string}>}){
  try{
    const { userId } = await params;
    const userIdInSession = await getUserIdInSession();
    if (!userIdInSession || userIdInSession !== userId) {
      return NextResponse.json({messages: "Unauthorize."}, {status : 400});
    }
    const conversations = await getFriendsAndRooms(userId)
    return NextResponse.json(conversations, {status : 200});
  }catch(err){
    console.log("error when getting room's messages :", err);
    return NextResponse.json({message: `error when getting room's messages ${err}`}, {status: 500});
  }
}
