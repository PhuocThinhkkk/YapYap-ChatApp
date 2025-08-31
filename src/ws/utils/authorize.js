import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { areFriends, checkUserRoom } from "./db";

dotenv.config();

export async function validateUserRoomAccess(userToken, roomId) {
  try {
    const secretKey = process.env.SESSION_SECRET;
    if (!secretKey) {
      console.error("cant read secret key");
      return;
    }
    const decoded = jwt.verify(userToken, secretKey);
    console.log("user pay load: ", decoded);
    const isValid = await checkUserRoom(decoded._id, roomId);
    return isValid;
  } catch (e) {
    console.error(`${e}`);
  }
}

export async function validateFriend(userToken, friendRoom) {
  try {
    const [id1, id2] = friendRoom.split("-");
    const secretKey = process.env.SESSION_SECRET;
    if (!secretKey) {
      console.error("cant read secret key");
      return;
    }
    const decoded = jwt.verify(userToken, secretKey);
    console.log("user pay load: ", decoded);
    if(decoded._id !== id1 && decoded._id !== id2){
        return false
    }
    const isFriend = areFriends(id1, id2)
    return isFriend
  } catch (e) {
    console.error(`${e}`);
  }
}
