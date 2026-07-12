import 'server-only'
import User from '@/schema/user';
import Room from '@/schema/room';
import Friend from '@/schema/friend';
import MESSAGE from '@/schema/message';
import connectDB from "@/lib/mongoDb"
import mongoose from 'mongoose';
import { UserHomeStats } from '@/type';

export async function getPlatformStats() {
  try {
    await connectDB();
    
    const [totalUsers, totalRooms] = await Promise.all([
      User.countDocuments(),
      Room.countDocuments()
    ]);
    
    return {
      totalUsers,
      totalRooms
    };
  } catch (error) {
    console.error("Failed to fetch platform stats:", error);
    return {
      totalUsers: 0,
      totalRooms: 0
    };
  }
}

const emptyHomeStats: UserHomeStats = {
  friendCount: 0,
  roomCount: 0,
  messagesSent: 0,
  topInteractions: [],
  recentMessages: [],
}


export async function getUserHomeStats(
  userId: string
): Promise<UserHomeStats> {
  try {
    await connectDB();

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const [
      user,
      friendCount,
      messagesSent,
      roomStats,
      friendStats,
      recentMessages,
    ] = await Promise.all([
      User.findById(userId).select("rooms").lean(),

      Friend.countDocuments({
        $or: [{ user1: userObjectId }, { user2: userObjectId }],
      }),

      MESSAGE.countDocuments({
        user: userObjectId,
      }),

      MESSAGE.aggregate([
        {
          $match: {
            user: userObjectId,
            room: { $ne: null },
          },
        },
        {
          $group: {
            _id: "$room",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 2 },
      ]),

      MESSAGE.aggregate([
        {
          $match: {
            user: userObjectId,
            friendId: { $ne: null },
          },
        },
        {
          $group: {
            _id: "$friendId",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 3 },
      ]),

      MESSAGE.find({
        user: userObjectId,
      })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean(),
    ]);

    const roomCount = Array.isArray(user?.rooms) ? user.rooms.length : 0;


    const rooms = await Room.find({
      _id: { $in: roomStats.map((r) => r._id) },
    })
      .select("roomName")
      .lean();

    const roomMap = new Map(
      rooms.map((room) => [room._id.toString(), room.roomName])
    );

    const topRooms = roomStats.map((room) => ({
      _id: room._id.toString(),
      name: roomMap.get(room._id.toString()) ?? "Unknown room",
      count: room.count,
      type: "room" as const,
    }));

    // ---------------- Friends ----------------

    const relations = await Friend.find({
      _id: { $in: friendStats.map((f) => f._id) },
    }).lean();

    const partnerIds = relations.map((relation) =>
      relation.user1.equals(userObjectId)
        ? relation.user2
        : relation.user1
    );

    const partners = await User.find({
      _id: { $in: partnerIds },
    })
      .select("name")
      .lean();

    const partnerMap = new Map(
      partners.map((user) => [user._id.toString(), user.name])
    );

    const friendCountMap = new Map(
      friendStats.map((f) => [f._id.toString(), f.count])
    );

    const topFriends = relations.map((relation) => {
      const partnerId = relation.user1.equals(userObjectId)
        ? relation.user2
        : relation.user1;

      return {
        _id: relation._id.toString(),
        name: partnerMap.get(partnerId.toString()) ?? "Unknown",
        count: friendCountMap.get(relation._id.toString()) ?? 0,
        type: "friend" as const,
      };
    });

    // ---------------- Recent Messages ----------------

    const recentMessagesFormatted = recentMessages.map((msg) => ({
      _id: msg._id.toString(),
      info: msg.info,
      createdAt: msg.createdAt,
      context: msg.room
        ? roomMap.get(msg.room.toString()) ?? "Room chat"
        : "Direct message",
    }));

    const topInteractions = [...topRooms, ...topFriends]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      friendCount,
      roomCount,
      messagesSent,
      topInteractions,
      recentMessages: recentMessagesFormatted,
    };
  } catch (error) {
    console.error("Failed to fetch user home stats:", error);
    return emptyHomeStats;
  }
}
