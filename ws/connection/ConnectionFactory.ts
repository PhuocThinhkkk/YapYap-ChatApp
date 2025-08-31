import { isRoomFriend } from "../utils/stupizfunc";
import { BaseConn } from "./BaseConnection";
import { FriendConn } from "./FriendConn";
import { RoomConn } from "./RoomConn";
export function connFactory (sessionCookie: string, roomId: string): BaseConn {
  if (isRoomFriend(roomId)) return new FriendConn(sessionCookie, roomId);
  return new RoomConn(sessionCookie, roomId);

}

