import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import { cancelRequest, isFollowingExist, isFriendExist, sendRequest } from "@/lib/db/friend";
import { getUserById } from "@/lib/db/userdb";

export async function POST(req : NextRequest) {
    try{
        
        const followerId = await getUserIdInSession()
        if (!followerId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }

        const isFollowerUserExist = await getUserById(followerId);
        if (!isFollowerUserExist) {
            return NextResponse.json({message: 'You are not in our db. '}, {status: 400})
        }

        const targetId = await req.json()
        if ( !targetId ) {
            return NextResponse.json({message: 'missing field. '}, {status: 400})
        }
        const isTargetUserExist = await getUserById(followerId);
        console.log(isTargetUserExist)//
        if (!isTargetUserExist) {
            return NextResponse.json({message: 'Target user are not in our db. '}, {status: 400})
        }
 
        const isExistFollowing = await isFollowingExist(followerId, targetId) 
        if (isExistFollowing) {
            return NextResponse.json({message: 'You have sent that. '}, {status: 400})
        }

        const isExistFriend =  await isFriendExist(followerId, targetId)
        if (isExistFriend) {
            return NextResponse.json({message: 'You two have been friend. '}, {status: 400})
        }

        const result = await sendRequest(followerId, targetId);
        
        return NextResponse.json( result ,{status: 200})
    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}

export async function DELETE(req : NextRequest){
    try{
        
        const followerId = await getUserIdInSession()
        if (!followerId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }

        const targetId = await req.json()
        if ( !targetId ) {
          return NextResponse.json({message: 'missing field. '}, {status: 400})
        }
 
        const result = await cancelRequest(followerId, targetId)
        if (result.deletedCount == 0) {
            return NextResponse.json({message: 'You havent sent it'}, {status: 400})
        }
        
        return NextResponse.json( result ,{status: 200})
    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}