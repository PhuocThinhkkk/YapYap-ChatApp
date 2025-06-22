import connectDB from "@/lib/mongoDb";
import FriendRequest from "@/schema/friendrequest";
import Friend from "@/schema/friend";
import mongoose from "mongoose";
import { SmallUserInforType } from "@/type";



export async function getFriends(userId : string) {
    await connectDB();
    
    const friends = await Friend.aggregate([
    {
        $match: {
        $or: [
            { user1: new mongoose.Types.ObjectId(userId) },
            { user2: new mongoose.Types.ObjectId(userId) }
        ]
        }
    },
    {
        $addFields: {
        friendId: {
            $cond: [
            { $eq: ['$user1', new mongoose.Types.ObjectId(userId)] },
            '$user2',
            '$user1'
            ]
        }
        }
    },
    {
        $lookup: {
        from: 'users', // collection name in lowercase
        localField: 'friendId',
        foreignField: '_id',
        as: 'friend'
        }
    },
    {
        $unwind: '$friend'
    },
    {
        $project: {
            _id: { $toString: '$_id' },
            name: 1,
            avatarUrl: 1,
            email: 1,
            role : 1,
        }
    },
    {
        $replaceRoot: { newRoot: '$friend' }
    }
    ]);

    
    return friends as SmallUserInforType[]
}

export async function getFollowing(userId : string) {
    await connectDB();
    
    const followings = await FriendRequest.aggregate([
    {
        $match: {
            from: new mongoose.Types.ObjectId(userId),
            $or : [
                {status: "pending"},
                {status: "rejected"}
            ],
        }
    },
    {
        $lookup: {
            from: 'users',
            localField: 'following',
            foreignField: '_id',
            as: 'user'
        }
    },
    {
        $unwind: '$user'
    },
    {
        $replaceRoot: { newRoot: '$user' }
    },
    {
        $project: {
            _id: { $toString: '$_id' },
            name: 1,
            avatarUrl: 1,
            email: 1,
            role : 1,
        }
    }
    ]);

    
    return followings as SmallUserInforType[]
}


export async function getFollower(userId : string) {
    await connectDB();
    
    const followers = await FriendRequest.aggregate([
    {
        $match: {
            to : new mongoose.Types.ObjectId(userId),
            $or : [
                {status: "pending"},
                {status: "rejected"}
            ],
        }
    },
    {
        $lookup: {
            from: 'users',
            localField: 'following',
            foreignField: '_id',
            as: 'user'
        }
    },
    {
        $unwind: '$user'
    },
    {
        $replaceRoot: { newRoot: '$user' }
    },
    {
        $project: {
            _id: { $toString: '$_id' },
            name: 1,
            avatarUrl: 1,
            email: 1,
            role : 1,
        }
    }
    ]);

    
    return followers as SmallUserInforType[]
}


export async function getPendingRequest(userId : string){
    await connectDB()
    const requests = await FriendRequest.aggregate([
        {
            $match: {
            to: new mongoose.Types.ObjectId(userId),
            status: 'pending'
            }
        },
        {
            $lookup: {
            from: 'users',
            localField: 'from',
            foreignField: '_id',
            as: 'user'
            }
        },
        { $unwind: '$user' },
        { $replaceRoot: { newRoot: '$user' } },
        {
            $project: {
            _id: { $toString: '$_id' },
            name: 1,
            avatarUrl: 1,
            email: 1,
            role : 1,
            }
        }
    ]);
    return requests as SmallUserInforType[]
}


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
        status : "pending",
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


