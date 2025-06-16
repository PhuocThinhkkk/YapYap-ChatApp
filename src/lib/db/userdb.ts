import 'server-only'
import { UserDB } from '@/type';
import User from '@/schema/user';
import connectDB from "@/lib/mongoDb"
import mongoose from 'mongoose';

export async function getUserById(id : string) : Promise<UserDB | null> {
    await connectDB()
    const userdb = await User.findById(id).select('-password')
    if (!userdb) {
        throw new Error('There is no one like that in db.')
    }
    const user = JSON.parse(JSON.stringify(userdb)) 
    const createdAt = new Date(user.createdAt)
    user.createdAt = createdAt
    return user as UserDB
}

export async function getUserAndRoomById(userId : string, roomId : string){
    const users = await User.aggregate([
    {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
    },
    {
        $lookup: {
            from: "rooms", 
            localField: "rooms",
            foreignField: "_id",
            as: "rooms"
        }
    },
    {
        $project: {
            _id: { $toString: "$_id" },
            name: 1, 
            rooms: {
                $filter: {
                input: "$rooms",
                as: "room",
                cond: { $eq: [ "$$room._id", new mongoose.Types.ObjectId(roomId) ] }
                }
            }
        }
    },
    {
        $addFields: {
            rooms: {
            $map: {
                input: "$rooms",
                as: "room",
                in: {
                _id: { $toString: "$$room._id" },
                roomName: "$$room.roomName",
                leaderId: { $toString: "$$room.leaderId" },
                password: "$$room.password",
                maxPeople: "$$room.maxPeople",
                createdAt: "$$room.createdAt"
                }
            }
            }
        }
    }
    ]); 
    const user = users[0]
    if (!user) {
        throw new Error('Unauthorize.')
        
    }
    return user as UserDB

}