import { getUserById } from "@/lib/db/userdb";
import { getUserIdInSession } from "@/lib/session";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, ) {  //eslint-disable-line
  try{
    const userId = await getUserIdInSession()
    if(!userId){
        return NextResponse.json({message: "no session"}, {status: 400})
    }
    const result = await getUserById(userId)
    return NextResponse.json(result, { status: 200 });
  }catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}