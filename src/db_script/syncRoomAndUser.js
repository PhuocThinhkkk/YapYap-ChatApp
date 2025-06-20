import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function syncRoomUserRefs() {
  try {
    await client.connect();
    const db = client.db();

    const usersCol = db.collection('users');
    const roomsCol = db.collection('rooms');

    const users = await usersCol.find().toArray();
    const rooms = await roomsCol.find().toArray();

    for (const user of users) {
      const userId = toObjectId(user._id);

      // Rooms that actually contain this user
      const actualRooms = rooms.filter(room =>
        (room.users || []).some(id => toObjectId(id).equals(userId))
      );

      // Rooms that this user actually owns
      const ownedRooms = rooms.filter(room =>
        room.leaderId && toObjectId(room.leaderId).equals(userId)
      );

      // Sync `rooms`
      const actualRoomIds = actualRooms.map(r => r._id.toString());
      const userRoomIds = (user.rooms || []).map(id => id.toString());
      if (!arraysEqual(actualRoomIds, userRoomIds)) {
        await usersCol.updateOne(
          { _id: userId },
          { $set: { rooms: actualRooms.map(r => toObjectId(r._id)) } }
        );
      }

      // Sync `roomsOwn`
      const ownedRoomIds = ownedRooms.map(r => r._id.toString());
      const userOwnedIds = (user.roomsOwn || []).map(id => id.toString());
      if (!arraysEqual(ownedRoomIds, userOwnedIds)) {
        await usersCol.updateOne(
          { _id: userId },
          { $set: { roomsOwn: ownedRooms.map(r => toObjectId(r._id)) } }
        );
      }
    }

    for (const room of rooms) {
      const roomId = toObjectId(room._id);

      // Validate users in room
      const validUserIds = (room.users || []).filter(userId => {
        const user = users.find(u => toObjectId(u._id).equals(toObjectId(userId)));
        return user && (user.rooms || []).some(rid => toObjectId(rid).equals(roomId));
      });

      if (!arraysEqual(validUserIds.map(id => id.toString()), (room.users || []).map(id => id.toString()))) {
        await roomsCol.updateOne(
          { _id: roomId },
          { $set: { users: validUserIds.map(toObjectId) } }
        );
      }

      // Validate leaderId
      if (room.leaderId) {
        const leader = users.find(u =>
          toObjectId(u._id).equals(toObjectId(room.leaderId)) &&
          (u.roomsOwn || []).some(rid => toObjectId(rid).equals(roomId))
        );

        if (!leader) {
          await roomsCol.updateOne(
            { _id: roomId },
            { $unset: { leaderId: "" } }
          );
        }
      }
    }

    console.log("✔ Sync completed successfully");
  } catch (error) {
    console.error("❌ Error syncing references:", error);
  } finally {
    await client.close();
  }
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const aSorted = [...a].sort();
  const bSorted = [...b].sort();
  return aSorted.every((val, i) => val === bSorted[i]);
}

function toObjectId(id) {
  return typeof id === 'string' ? new ObjectId(id) : id;
}

syncRoomUserRefs();
