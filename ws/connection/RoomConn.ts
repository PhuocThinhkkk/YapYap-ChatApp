import { BaseConn } from "./BaseConnection";
import { checkUserRoom } from "../utils/db";

export class RoomConn extends BaseConn {
  async validate(): Promise<boolean> {
    try {
      const userId = this.getUserId();
      const roomId = this.getRoomID();
      const isValid = await checkUserRoom(userId, roomId);
      return isValid;
    } catch (e) {
      console.error(`${e}`);
      return false;
    }
  }
}
