import { areFriends } from "../utils/db";
import { BaseConn } from "./BaseConnection";

export class FriendConn extends BaseConn {
  async validate(): Promise<boolean> {
    try {
      const friendRoom = this.getRoomID();
      const userId = this.getUserId()
      const [id1, id2] = friendRoom.split("-");
      if (userId !== id1 && userId !== id2) {
        return false;
      }
      const isFriend = await areFriends(id1, id2);
      return isFriend;
    } catch (e) {
      console.error(`${e}`);
      return false;
    }
  }
}
