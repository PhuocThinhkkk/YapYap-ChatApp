import Friend from "@/schema/friend";
import connectDB from "../mongoDb";
import Room from "@/schema/room";
import mongoose from "mongoose";
import { Conversations } from "@/type";
const ObjectId = mongoose.Types.ObjectId;

export async function getFriendsAndRooms(userId : string) : Promise<Conversations[]>{
    await connectDB()
    const userObjectId = new ObjectId(userId);
        // 1. Aggregate friends where userId is either user1 or user2
    const friendsAggregation = Friend.aggregate([
        {
        $match: {
            $or: [
            { user1: userObjectId },
            { user2: userObjectId }
            ]
        }
        },
        // Lookup user1 details
        {
        $lookup: {
            from: 'users',
            localField: 'user1',
            foreignField: '_id',
            as: 'user1Details'
        }
        },
        {
        $unwind: '$user1Details'
        },
        // Lookup user2 details
        {
        $lookup: {
            from: 'users',
            localField: 'user2',
            foreignField: '_id',
            as: 'user2Details'
        }
        },
        {
        $unwind: '$user2Details'
        },
        // Project to required shape
        {
        $project: {
            _id: { $toString: '$_id' },
            user1: {
            _id: { $toString: '$user1Details._id' },
            name: '$user1Details.name',
            email: '$user1Details.email',
            avatarUrl: '$user1Details.avatarUrl'
            },
            user2: {
            _id: { $toString: '$user2Details._id' },
            name: '$user2Details.name',
            email: '$user2Details.email',
            avatarUrl: '$user2Details.avatarUrl'
            },
            createdAt: 1,
            type: { $literal: 'friend' } // add type field friend
        }
        }
    ]);

    // 2. Aggregate rooms where user is in room.users
    const roomsAggregation = Room.aggregate([
        {
        $match: {
            users: userObjectId
        }
        },
        {
        $project: {
            _id: { $toString: '$_id' },
            roomName: 1,
            password: 1,
            maxPeople: 1,
            createdAt: 1,
            type: { $literal: 'room' } // add type field room
            // skip users and leaderId as requested
        }
        }
    ]);

    // Run aggregations in parallel
    const [friends, rooms] = await Promise.all([
        friendsAggregation.exec(),
        roomsAggregation.exec()
    ]);

    return [...friends, ...rooms] as Conversations[]
}
