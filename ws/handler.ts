import { Server, Socket } from "socket.io";
import { parse } from "cookie";
import { connFactory } from "./connection/ConnectionFactory";

const socketHandler = (socket: Socket, io: Server) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (roomId) => {
    try {
      const cookies = parse(socket.handshake.headers.cookie || "");
      if (!cookies) return;
      const sessionCookie = cookies["session"];
      if (!sessionCookie) return;

      const conn = connFactory(sessionCookie, roomId)
      const isValid = conn.validate()
      if(!isValid) return

      socket.join(roomId);
      console.log(` user ${socket.id} has joined ${roomId}`);
    } catch (e) {
      return;
    }
  });
  socket.on("sendMessage", ({ roomId, message }) => {
    socket.to(roomId).emit("sendMessage", message);
    console.log("message: ");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
};

export default socketHandler;
