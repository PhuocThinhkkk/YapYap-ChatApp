import connectDB from "@/lib/mongoDb";
import FriendRequest from "@/schema/friendrequest";
import Friend from "@/schema/friend";



export async function isFollowingExist(followerId : string, targetId : string ){
    await connectDB();
    const existing = await FriendRequest.findOne({
        $or: [
            { from: followerId, to: targetId },
            { from: targetId, to: followerId }
        ],
        status: { $in: ['pending', 'accepted'] }
    });
    return existing;

}

export async function isFriendExist(user1 : string, user2 : string ){
    await connectDB();
    const existing = await Friend.findOne({
        $or: [
            { user1: user1, user2: user2 },
            { user2: user1, user1: user2 }
        ],
        status: { $in: ['pending', 'accepted'] }
    });
    return existing;

}


export async function sendRequest(followerId : string, targetId : string ){
    await connectDB();
    const result = await FriendRequest.create({
        from: followerId,
        to: targetId,
    })
    return result;
}


export async function addFriend(followerId : string, targetId : string ){
    await connectDB();
    const result = await Friend.deleteOne({
        user1: followerId,
        user2: targetId,
    })
    return result;
}

export async function unFriend(user1 : string, user2 : string ){
    await connectDB();
    const result = await Friend.deleteOne({
        $or: [
            { user1: user1, user2: user2 },
            { user2: user1, user1: user2 }
    ],})
    return result;
}



export async function cancelRequest(followerId : string, targetId : string ){
   await connectDB();
    const result = await FriendRequest.deleteOne({
        from: followerId,
        to: targetId,
    })
    return result;
}

export async function rejecteRequest(followerId : string, targetId : string ){
    await connectDB();
    const result = await FriendRequest.findOneAndUpdate({
        from: followerId,
        to: targetId,
    },{
        $set: {
            status : "rejected",
        }
    })
    return result;
}

export async function accepteRequest(followerId : string, targetId : string ){
    await connectDB();
    const result = await FriendRequest.findOneAndUpdate({
        from: followerId,
        to: targetId,
    },{
        $set: {
            status : "accepted",
        }
    })
    return result;
}


