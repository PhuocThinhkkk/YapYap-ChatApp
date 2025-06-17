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
    // Optional: project only fields you want
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