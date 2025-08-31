import jwt from "jsonwebtoken";
import { SessionPayload } from "./SessionPayload";

interface ConnectionHandler {
  validate(): Promise<boolean>;
}

export abstract class BaseConn implements ConnectionHandler {
  protected payload: SessionPayload;
  protected roomId: string;

  constructor(sessionCookie: string, roomId: string) {
    const validated = this.validateToken(sessionCookie);
    if (!validated) throw new Error("Invalid token");
    this.payload = validated;
    this.roomId = roomId
  }

  private validateToken(userToken: string): SessionPayload {
      try {
          const secretKey = process.env.SESSION_SECRET;
          if (!secretKey) {
              throw new Error("cant read secret key");
          }
          const decoded = jwt.verify(userToken, secretKey) as SessionPayload;
          console.log("user pay load: ", decoded);

          if (decoded.expiresAt <= new Date()) {
              throw new Error("expired token");
          }
          return decoded as SessionPayload;
      } catch (e) {
          throw new Error(`error in validate token: ${e}`);
      }
  }

  abstract validate(): Promise<boolean>; 

  public getUserId(){
      return this.payload.userId
  }
  public getRoomID(){
      return this.roomId
  }
}

