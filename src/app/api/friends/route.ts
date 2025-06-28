import { type NextRequest, NextResponse } from "next/server";
import { getUserIdInSession } from "@/lib/session";
import { accepteRequest, addFriend, getFriends, isFollowingExist, isFriendExist, unFriend } from "@/lib/db/friend";




export async function GET(req : NextRequest) {  //eslint-disable-line
    try{
        
        const userId = await getUserIdInSession()
        if (!userId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }

        const friends = await getFriends(userId);

        
        return NextResponse.json( friends ,{status: 201})
    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}


export async function POST(req : NextRequest) {
    try{
        
        const targetId = await getUserIdInSession()
        if (!targetId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }

        const followerId = await req.json()
        if ( !followerId ) {
          return NextResponse.json({message: 'missing field. '}, {status: 400})
        }
        
        const isExistFollowing = await isFollowingExist(followerId, targetId) 
        if (isExistFollowing) {
            return NextResponse.json({message: 'You have sent that. '}, {status: 400})
        }

        const isExistFriend =  await isFriendExist(followerId, targetId)
        if (isExistFriend) {
            return NextResponse.json({message: 'You two have been friend. '}, {status: 400})
        }

        await accepteRequest(followerId, targetId);
        const result = await addFriend(followerId, targetId)
        
        return NextResponse.json( result ,{status: 201})
    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}

export async function DELETE(req : NextRequest){
    try{
        
        const targetId = await getUserIdInSession()
        if (!targetId) {
            return NextResponse.json({message: 'unauthorize. '}, {status: 400})
        }
        const { friendId } = await req.json()
        const followerId = friendId
        if ( !followerId ) {
          return NextResponse.json({message: 'missing field. '}, {status: 400})
        }

        const result = await unFriend(followerId, targetId)
        if (!result?.deletedCount) {
            return NextResponse.json({message: 'You two are not friend. '}, {status: 400})
        }
        
        return NextResponse.json( result ,{status: 201})

    }catch(err){
        console.error(err)
        return NextResponse.json({message: `Server error.`}, {status: 500})
    }
}