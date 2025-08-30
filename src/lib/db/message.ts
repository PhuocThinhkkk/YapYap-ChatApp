import mongoose from "mongoose";
import MESSAGE from "@/schema/message";
import connectDB from "../mongoDb";
import { MessageDB } from "@/type";

export async function getMessagesWithUserByRoomId(roomId : string) {
    await connectDB()
    const messages = await MESSAGE.aggregate([
    { $match: { room: new mongoose.Types.ObjectId(roomId) } },
    {
        $lookup: {
            from: 'users', // collection name in MongoDB (lowercase + plural)
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }
    },
    { $unwind: '$user' }, // flatten array
    {
        $project: {
            info: 1,
            createdAt: 1,
            room: 1,
            'user.name': 1, // example
            'user.email': 1,
            'user._id': 1, 
            'user.avatarUrl': 1, 
        }
    }
    ]);
    return messages as MessageDB[]
}
export async function getMessagesByFriendId(friendId: string) {
  await connectDB();
  const messages = await MESSAGE.aggregate([
    { $match: { friendId: new mongoose.Types.ObjectId(friendId)  } },
    {
      $addFields: {
        _id: { $toString: '$_id' },
        room: {
          $cond: [
            { $eq: ['$room', null] },
            null,
            { $toString: '$room' }
          ]
        },
        friendId: {
          $cond: [
            { $eq: ['$friendId', null] },
            null,
            { $toString: '$friendId' }
          ]
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        info: 1,
        createdAt: 1,
        room: 1,
        friendId: 1,
        roomName: 1,
        user: {
          _id: { $toString: '$user._id' },
          createdAt: 1,
          name: 1,
          email: 1,
          avatarUrl: 1,
          role: 1,
          bio: 1,
          location: 1,
          backgroundUrl: 1
        }
      }
    },
    { $sort: { createdAt: 1 } }
  ]);

  return messages as MessageDB[];
}
