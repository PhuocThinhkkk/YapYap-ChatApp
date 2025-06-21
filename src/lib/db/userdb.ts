import 'server-only'
import { UserDB } from '@/type';
import User from '@/schema/user';
import connectDB from "@/lib/mongoDb"
import mongoose from 'mongoose';

export async function getUserById(id : string) : Promise<UserDB> {
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
    return user as UserDB

}





export async function getUserByIdWithRoom(userId : string){
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
            rooms: 1
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
                    createdAt: "$$room.createdAt",
                    users: "$$room.users",
                }
            }
            }
        }
    }
    ]); 
    const user = users[0]
    return user as UserDB

}

export async function get6RandomUsersNotIncludeCurrentUser(userId : string) {
  await connectDB();

  const users = await User.aggregate([
    { $match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } } },
    { $sample: { size: 6 } },
    {
      $project: {
        _id: { $toString: "$_id" },
        name: 1,
        email: 1,
        avatarUrl: 1,
        rooms: {
          $map: {
            input: "$rooms",
            as: "roomId",
            in: { $toString: "$$roomId" },
          },
        },
        roomsOwn: {
          $map: {
            input: "$roomsOwn",
            as: "ownId",
            in: { $toString: "$$ownId" },
          },
        },
        role: 1,
        location: 1,
      },
    },
  ]);

  return users as UserDB[];
}


export async function get6RandomUsers() {
  await connectDB();

  const users = await User.aggregate([
    { $sample: { size: 6 } },
    {
      $project: {
        _id: { $toString: "$_id" },
        name: 1,
        email: 1,
        avatarUrl: 1,
        rooms: {
          $map: {
            input: "$rooms",
            as: "roomId",
            in: { $toString: "$$roomId" },
          },
        },
        roomsOwn: {
          $map: {
            input: "$roomsOwn",
            as: "ownId",
            in: { $toString: "$$ownId" },
          },
        },
        role: 1,
        location: 1,
      },
    },
  ]);

  return users as UserDB[];
}


export async function searchForUsersByName (searchTerm: string){
  await connectDB();

  const users = await User.aggregate([
    {
      $match: {
        name: { $regex: searchTerm, $options: 'i' }, // 'i' = case-insensitive
      },
    },
    {
      $project: {
        _id: { $toString: "$_id" },
        name: 1,
        email: 1,
        avatarUrl: 1,
        rooms: {
          $map: {
            input: "$rooms",
            as: "roomId",
            in: { $toString: "$$roomId" },
          },
        },
        roomsOwn: {
          $map: {
            input: "$roomsOwn",
            as: "ownId",
            in: { $toString: "$$ownId" },
          },
        },
        role: 1,
        location: 1,
      },
    },
    {
      $limit: 20, // Optional: limit results to prevent over-fetching
    },
  ]);

  return users as UserDB[];
};



export async function searchForUsersByNameNotIncludeCurrentUser (searchTerm: string, userId : string){
  await connectDB();

  const users = await User.aggregate([
    {
      $match: {
        name: { $regex: searchTerm, $options: 'i' }, // 'i' = case-insensitive
        _id: { $ne: new mongoose.Types.ObjectId(userId) },
      },
    },
    {
      $project: {
        _id: { $toString: "$_id" },
        name: 1,
        email: 1,
        avatarUrl: 1,
        rooms: {
          $map: {
            input: "$rooms",
            as: "roomId",
            in: { $toString: "$$roomId" },
          },
        },
        roomsOwn: {
          $map: {
            input: "$roomsOwn",
            as: "ownId",
            in: { $toString: "$$ownId" },
          },
        },
        role: 1,
        location: 1,
      },
    },
    {
      $limit: 20, // Optional: limit results to prevent over-fetching
    },
  ]);

  return users as UserDB[];
};
