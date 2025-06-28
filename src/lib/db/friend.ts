import connectDB from "@/lib/mongoDb";
import FriendRequest from "@/schema/friendrequest";
import Friend from "@/schema/friend";
import mongoose from "mongoose";
import { FriendRequestType, FriendUser, UserDB, UserSearchingType } from "@/type";


export async function getFriends(userId: string) {
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
                from: 'users',
                localField: 'friendId',
                foreignField: '_id',
                as: 'friend'
            }
        },
        {
            $unwind: {
                path: '$friend',
                preserveNullAndEmptyArrays: false // <-- filter out missing
            }
        },
        {
            $replaceRoot: { newRoot: '$friend' } // now safe
        },
        {
            $project: {
                _id: { $toString: '$_id' },
                name: 1,
                avatarUrl: 1,
                email: 1,
                role: 1,
            }
        }
    ]);

    return friends as FriendUser[];
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

    
    return followings as FriendUser[]
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

    
    return followers as FriendUser[]
}

export async function getPendingRequest(userId: string) {
  await connectDB();

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
        as: 'fromUser'
      }
    },
    { $unwind: '$fromUser' },
    {
      $project: {
        _id: { $toString: '$_id' },
        status: 1,
        createdAt: 1,
        isNewToTarget: 1,

        // Embed full info of `fromUser`
        fromUser: {
          _id: { $toString: '$fromUser._id' },
          name: '$fromUser.name',
          email: '$fromUser.email',
          avatarUrl: '$fromUser.avatarUrl',
          role: '$fromUser.role',
        }
      }
    }
  ]);

  return requests as FriendRequestType[];
}


export async function processingRelation(userNeedSearching : UserDB, userId : string | null | undefined) : Promise<void>{
    await connectDB()
    const user = userNeedSearching as UserSearchingType
    user.isFriend = false
    user.isFollower = false
    user.isFollowing = false
    user.requestId = undefined
    if (!userId) {
        return
    }
    const isFriend = await isFriendExist(userId, user._id)
    if (isFriend) {
        user.isFriend = true;
        return              // dont need following or follower if they were friend
    }
    const isExistFollow = await isFollowExist(userId, user._id)
    if (isExistFollow) {
        if (user._id == isExistFollow.from) {
            user.isFollower = true
            user.requestId = isExistFollow._id
        }
        if (user._id == isExistFollow.to) {
            user.isFollowing = true
            user.requestId = isExistFollow._id
        }
    }
}

export async function updateIsReadByUserId(userId : string){
    await connectDB();
    const result = await FriendRequest.updateMany(
    { to: userId, isNewToTarget: true }, // filter: unread requests sent **to** the user
    { $set: { isNewToTarget: false } }     // update: mark them as read
  );

  return result;
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
    });
    return existing;

}
export async function isFollowExist(user1 : string, user2 : string ){
    await connectDB();
    const existing = await FriendRequest.findOne({
        $or: [
            { from : user1, to: user2 },
            { to : user1, from: user2 }
        ],
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
    const result = await Friend.create({
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



export async function deleteRequestByTarget(requestId: string, targetId : string ){
   await connectDB();
    const result = await FriendRequest.deleteOne({
        _id: requestId,
        to : targetId,
    })
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


export async function rejecteRequest(requestId : string, targetId : string ){
    await connectDB();
    const result = await FriendRequest.findOneAndUpdate({
        _id: requestId,
        to: targetId,
    },{
        $set: {
            status : "rejected",
        }
    })
    console.log(result)
    return result;
    
}

export async function accepteRequest(requestId : string, targetId : string ){
    await connectDB();
    const result = await FriendRequest.findOneAndUpdate({
        _id : requestId,
        to: targetId,
    },{
        $set: {
            status : "accepted",
        }
    })
    return result;
}


