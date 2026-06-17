import { Server } from "socket.io";
import { registerChatHandlers } from "./chat";
export function registerSocketMiddleware(io: Server) {
  io.on("connection", (socket) => {
    const user = socket.data.user;
    console.log(`User ${user.id} connected`);
    const joinId = `user_${user.id}`;
    socket.join(joinId);
    registerChatHandlers(io, socket, joinId);
    socket.on("disconnect", () => {
      console.log(`User ${user.id} disconnected`);
    })
  })
}
