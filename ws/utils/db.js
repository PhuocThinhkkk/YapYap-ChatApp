import User from "../schema/user.js";
import Friend from "../schema/friend.js"; // adjust path
import Room from "../schema/room.js";

export async function checkUserRoom(userId, roomId) {
  try {
    const [user, room] = await Promise.all([
      User.findById(userId).lean(),
      Room.findById(roomId).lean(),
    ]);

    if (!user) {
      console.error(`User with id ${userId} does not exist.`);
      return false;
    }

    if (!room) {
      console.error(`Room with id ${roomId} does not exist.`);
      return false;
    }

    const userHasRoom = user.rooms.some((rId) => rId.toString() === roomId);
    if (!userHasRoom) {
      console.error(
        `User ${userId} does not have room ${roomId} in their rooms array.`,
      );
      return false;
    }

    const roomHasUser = room.users.some((uId) => uId.toString() === userId);
    if (!roomHasUser) {
      console.error(
        `Room ${roomId} does not contain user ${userId} in its users array.`,
      );
      return false;
    }

    return userHasRoom && roomHasUser;
  } catch (err) {
    console.error("Error checking user-room relationship:", err);
    return false;
  }
}

export async function areFriends(userId1, userId2) {
  try {
    const exists = await Friend.exists({
      $or: [
        { user1: userId1, user2: userId2 },
        { user1: userId2, user2: userId1 },
      ],
    });

    return !!exists;
  } catch (err) {
    console.error("Error checking friendship:", err);
    return false;
  }
}
